// store/useAuthStore.ts
import { AuthState } from "@/types/AuthState";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthStore extends AuthState {
  _hasHydrated: boolean;
  setHasHydrated: (val: boolean) => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      hydrated: false,
      _hasHydrated: false,

      setUser: (user) => set({ user }),
      logout: () => set({ user: null, hydrated: false }),
      setHydrated: (hydrated) => set({ hydrated }),
      setHasHydrated: (val) => set({ _hasHydrated: val }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, hydrated: state.hydrated }),
      onRehydrateStorage: () => (state) => {
        console.log("💾 onRehydrateStorage called, state:", state);
        state?.setHasHydrated(true);
      },
    },
  ),
);

export { useAuthStore };
export default useAuthStore;
