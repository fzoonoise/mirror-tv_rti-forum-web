import { create } from 'zustand'

import type { Member } from '@/types/graphql'

type AuthState = {
  member: Member | null
  isAuthenticated: boolean
  setAuth: (member: Member) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  member: null,
  isAuthenticated: false,
  setAuth: (member) => {
    set({ member, isAuthenticated: true })
  },
  clearAuth: () => {
    set({ member: null, isAuthenticated: false })
  },
}))
