// store/useAuthStore.ts
import { AuthState } from "@/types/AuthState";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      sessionId: null,
      setUser: (user, sessionId) => {
        set({ user, sessionId });
      },

      logout: () => {
        set({ user: null, sessionId: null });
      },
    }),
    {
      name: "auth-storage",
      skipHydration: true,
    },
  ),
);
