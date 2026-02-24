'use client'

import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useEffect } from 'react'

import { clearSessionCookie, loginWithFirebase } from '@/actions/auth'
import { GET_AUTHENTICATED_MEMBER } from '@/graphql/queries/auth'
import { apolloClient } from '@/lib/apollo'
import { getFirebaseAuth } from '@/lib/firebase'
import { useAuthStore } from '@/stores/authStore'
import type { Member } from '@/types/graphql'

export function useAuth() {
  const member = useAuthStore((state) => state.member)
  const authStatus = useAuthStore((state) => state.authStatus)

  // Restore auth state after page refresh — if a valid session cookie exists
  // the proxy will forward it and the backend returns the current member.
  useEffect(() => {
    // Skip if session restore already completed
    if (authStatus !== 'restoring') return

    const { setAuth, finishSessionRestore } = useAuthStore.getState()

    apolloClient
      .query<{ authenticatedMember: Member | null }>({
        query: GET_AUTHENTICATED_MEMBER,
        fetchPolicy: 'network-only', // Always fetch from network, not cache
      })
      .then(({ data }) => {
        if (data?.authenticatedMember) {
          setAuth(data.authenticatedMember)
        } else {
          finishSessionRestore()
        }
      })
      .catch((error) => {
        console.error('Failed to restore auth session:', error)
        finishSessionRestore()
      })
  }, [authStatus])

  const login = async (email: string, password: string) => {
    const firebaseAuth = getFirebaseAuth()

    let userCredential
    try {
      userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      )
    } catch (error) {
      const code = (error as { code?: string }).code
      if (
        code === 'auth/invalid-credential' ||
        code === 'auth/user-not-found' ||
        code === 'auth/wrong-password'
      ) {
        throw new Error('Email or password is incorrect')
      }
      throw error
    }

    const idToken = await userCredential.user.getIdToken()

    let memberData
    try {
      memberData = await loginWithFirebase(idToken)
    } catch (error) {
      // Backend session exchange failed — clean up the Firebase session
      // to avoid a phantom signed-in state
      await signOut(firebaseAuth).catch((e) => {
        console.error('Firebase sign-out cleanup failed:', e)
      })
      throw error
    }

    useAuthStore.getState().setAuth(memberData)
  }

  const logout = async () => {
    try {
      // Clear server session cookie
      await clearSessionCookie()

      // Sign out from Firebase
      await signOut(getFirebaseAuth())
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      // Always clear client state regardless of server/Firebase errors.
      // clearAuth sets authStatus='unauthenticated' to avoid re-triggering session restoration.
      useAuthStore.getState().clearAuth()
    }
  }

  return { member, authStatus, login, logout }
}
