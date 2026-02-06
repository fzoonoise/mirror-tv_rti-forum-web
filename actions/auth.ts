'use server'

import { cookies } from 'next/headers'

import { ENV, getServerEnv } from '@/config/environment-variables'
import { SESSION_COOKIE_NAME, SESSION_MAX_AGE } from '@/constants'
import type { Member } from '@/types/graphql'

// Plain string mutation — Server Actions run on the server and cannot use
// Apollo Client or gql DocumentNode. Fields are fixed to the 6 fields
// returned by the backend MemberSessionMember type.
const AUTHENTICATE_MUTATION = `
  mutation AuthenticateMemberWithFirebase(
    $data: AuthenticateMemberWithFirebaseInput!
  ) {
    authenticateMemberWithFirebase(data: $data) {
      sessionToken
      expiresAt
      member {
        id
        firebaseId
        customId
        name
        nickname
        email
      }
    }
  }
`

export async function loginWithFirebase(idToken: string): Promise<Member> {
  const { GRAPHQL_ENDPOINT } = getServerEnv()

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: AUTHENTICATE_MUTATION,
      variables: { data: { idToken } },
    }),
  })

  if (!response.ok) {
    throw new Error(`Authentication request failed: ${response.status}`)
  }

  const json = await response.json()

  if (json.errors) {
    throw new Error(json.errors[0]?.message ?? 'Authentication failed')
  }

  const { sessionToken, expiresAt, member } =
    json.data?.authenticateMemberWithFirebase ?? {}

  if (!sessionToken || !member) {
    throw new Error('Invalid response from authentication endpoint')
  }

  // Derive maxAge from backend expiresAt when available, fallback to default
  let maxAge = SESSION_MAX_AGE
  if (expiresAt) {
    const expiresAtMs = new Date(expiresAt).getTime()
    const remainingSeconds = Math.floor((expiresAtMs - Date.now()) / 1000)
    if (remainingSeconds <= 0) {
      throw new Error('Session token already expired')
    }
    maxAge = remainingSeconds
  }

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: ['staging', 'prod'].includes(ENV),
    sameSite: 'lax',
    path: '/',
    maxAge,
  })

  return member as Member
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}
