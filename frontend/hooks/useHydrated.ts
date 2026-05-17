"use client";
import { useAuthStore } from "@/stores/auth.store";
export const useHydrated = () => {
  return useAuthStore((state) => state._hasHydrated);
};
