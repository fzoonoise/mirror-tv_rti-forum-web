import { create } from 'zustand'

import type { Member } from '@/types/graphql'

type AuthState = {
  member: Member | null
  isAuthenticated: boolean
  isInitialized: boolean
  setAuth: (member: Member) => void
  clearAuth: () => void
  markInitialized: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  member: null,
  isAuthenticated: false,
  isInitialized: false,
  setAuth: (member) => {
    set({ member, isAuthenticated: true, isInitialized: true })
  },
  clearAuth: () => {
    set({ member: null, isAuthenticated: false, isInitialized: true })
  },
  markInitialized: () => {
    set({ isInitialized: true })
  },
}))
