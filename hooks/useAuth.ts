'use client'

import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useEffect } from 'react'

import { loginWithFirebase, logout as logoutAction } from '@/actions/auth'
import { GET_AUTHENTICATED_MEMBER } from '@/graphql/queries/auth'
import { apolloClient } from '@/lib/apollo'
import { getFirebaseAuth } from '@/lib/firebase'
import { useAuthStore } from '@/stores/authStore'
import type { Member } from '@/types/graphql'

export function useAuth() {
  const member = useAuthStore((state) => state.member)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  // Restore auth state after page refresh — if a valid session cookie exists
  // the proxy will forward it and the backend returns the current member.
  useEffect(() => {
    const { member: current, setAuth } = useAuthStore.getState()
    if (current) return

    apolloClient
      .query<{ authenticatedMember: Member | null }>({
        query: GET_AUTHENTICATED_MEMBER,
      })
      .then(({ data }) => {
        if (data?.authenticatedMember) {
          setAuth(data.authenticatedMember)
        }
      })
      .catch((error) => {
        console.error('Failed to restore auth session:', error)
      })
  }, [])

  const login = async (email: string, password: string) => {
    const firebaseAuth = getFirebaseAuth()

    let userCredential
    try {
      userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
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
    const memberData = await loginWithFirebase(idToken)
    useAuthStore.getState().setAuth(memberData)
  }

  const logout = async () => {
    await logoutAction()
    useAuthStore.getState().clearAuth()
    await signOut(getFirebaseAuth())
  }

  return { member, isAuthenticated, login, logout }
}
