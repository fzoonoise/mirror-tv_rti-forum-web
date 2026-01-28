import { create } from 'zustand'

import type { Member } from '@/types/graphql'

type AuthState = {
  member: Member | null
  sessionToken: string | null
  isAuthenticated: boolean
  setAuth: (member: Member, sessionToken: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  member: null,
  sessionToken: null,
  isAuthenticated: false,
  setAuth: (member, sessionToken) => {
    // Store session token in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('sessionToken', sessionToken)
    }
    set({ member, sessionToken, isAuthenticated: true })
  },
  clearAuth: () => {
    // Remove session token from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sessionToken')
    }
    set({ member: null, sessionToken: null, isAuthenticated: false })
  },
}))
