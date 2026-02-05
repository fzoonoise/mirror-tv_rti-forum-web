'use server'

import { cookies } from 'next/headers'

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
  const endpoint = process.env.GRAPHQL_ENDPOINT
  if (!endpoint) {
    throw new Error('GRAPHQL_ENDPOINT is not configured')
  }

  const response = await fetch(endpoint, {
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

  const { sessionToken, member } =
    json.data?.authenticateMemberWithFirebase ?? {}

  if (!sessionToken || !member) {
    throw new Error('Invalid response from authentication endpoint')
  }

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })

  return member as Member
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}
