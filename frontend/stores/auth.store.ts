import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import User from "@/types/User";
import { Auth } from "@/services/auth";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isFetchingMe: boolean;
  authChecked: boolean;
  sessionId: string | null;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  setUser: (user: User) => void;
  fetchMe: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isFetchingMe: false,
      authChecked: false,
      sessionId: null,
      _hasHydrated: false,

      setHasHydrated: (state) => set({ _hasHydrated: state }),

      setUser: (user) => set({ user, isAuthenticated: true }),

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const res = await Auth.login(email, password);
          set({
            user: res.user,
            isAuthenticated: true,
            sessionId: res.sessionId,

            authChecked: true,
          });
        } catch (error) {
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      fetchMe: async () => {
        if (get().isFetchingMe) return;

        set({ isFetchingMe: true });
        try {
          const res = await Auth.fetchMe();
          set({
            user: res,
            isAuthenticated: true,
            authChecked: true,
          });
        } catch (error) {
          const isUnauthorized = (error as any)?.response?.status === 401;
          if (isUnauthorized) {
            set({
              user: null,
              isAuthenticated: false,
              sessionId: null,
            });
          }
          set({ authChecked: true });
        } finally {
          set({ isFetchingMe: false });
        }
      },

      logout: async () => {
        try {
          await Auth.logout();
        } finally {
          set({
            user: null,
            isAuthenticated: false,
            sessionId: null,
            authChecked: false,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage;
      }),

      // ✅ Persist thêm authChecked để tránh fetchMe không cần thiết
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        sessionId: state.sessionId,
        authChecked: state.authChecked,
      }),

      onRehydrateStorage: () => (state, error) => {
        console.log("🔁 onRehydrateStorage fired", { state, error }); // ← thêm dòng này
        if (state) {
          state.setHasHydrated(true);
        } else {
          useAuthStore.setState({ _hasHydrated: true, authChecked: true });
        }
      },
    },
  ),
);
