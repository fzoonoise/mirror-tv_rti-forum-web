// GraphQL types will be defined here after backend schema is finalized
// This file is a placeholder for future GraphQL type definitions

export type Member = {
  id: string
  firebaseId: string
  customId: string
  name: string
  nickname: string
  email?: string
}

export type AuthResponse = {
  sessionToken: string
  expiresAt: string
  member: Member
}

// Additional types will be added as the backend schema is confirmed
