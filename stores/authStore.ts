import { create } from 'zustand'

import type { Member } from '@/types/graphql'

export type AuthStatus = 'restoring' | 'authenticated' | 'unauthenticated'

type AuthState = {
  member: Member | null
  authStatus: AuthStatus
  setAuth: (member: Member) => void
  clearAuth: () => void
  finishSessionRestore: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  member: null,
  authStatus: 'restoring',
  setAuth: (member) => {
    set({ member, authStatus: 'authenticated' })
  },
  clearAuth: () => {
    set({ member: null, authStatus: 'unauthenticated' })
  },
  finishSessionRestore: () => {
    set({ authStatus: 'unauthenticated' })
  },
}))
