"use client";

import { useEffect } from "react";
import { Auth } from "@/services/auth.service";
import { useAuthStore } from "@/store/useAuthStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((s) => s.setUser);
  const setHydrated = useAuthStore((s) => s.setHydrated);
  const hydrated = useAuthStore((s) => s.hydrated);
  const _hasHydrated = useAuthStore((s) => s._hasHydrated);
  console.log(
    "🟡 AuthProvider - _hasHydrated:",
    _hasHydrated,
    "hydrated:",
    hydrated,
    "user:",
    useAuthStore.getState().user,
  );
  useEffect(() => {
    if (!_hasHydrated) return; // chờ persist đọc xong localStorage
    if (hydrated) return; // đã fetch rồi thì thôi

    const fetchMe = async () => {
      try {
        const res = await Auth.getCurrentUser();
        setUser(res.data.user ?? null);
      } catch (error: any) {
        if (error?.response?.status === 401) {
          setUser(null);
        }
      } finally {
        setHydrated(true);
      }
    };

    fetchMe();
  }, [_hasHydrated, hydrated]);

  return <>{children}</>;
}
