import { create } from 'zustand'

interface AuthUser {
  accountNo: string
  name: string
  avatart: string | null
  email: string
  role: string[]
  exp: number
}

interface AuthState {
  auth: {
    user: AuthUser | null
    sessionId: string | null
    setUser: (user: AuthUser | null) => void
    setSessionId: (sessionId: string) => void
    reset: () => void
  }
}

export const useAuthStore = create<AuthState>()((set) => ({
  auth: {
    user: null,
    sessionId: null,

    setUser: (user) => set((state) => ({ auth: { ...state.auth, user } })),

    setSessionId: (sessionId) =>
      set((state) => ({ auth: { ...state.auth, sessionId } })),

    reset: () =>
      set((state) => ({
        auth: { ...state.auth, user: null, sessionId: null },
      })),
  },
}))
