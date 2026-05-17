"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth.store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const fetchMe = useAuthStore((s) => s.fetchMe);
  const [hydrated, setHydrated] = useState(
    () => useAuthStore.persist.hasHydrated(), // ✅ check ngay lúc init
  );

  useEffect(() => {
    console.log("hydrated changed:", hydrated);

    if (!hydrated) return;

    const { isAuthenticated } = useAuthStore.getState();
    console.log("isAuthenticated after hydrate:", isAuthenticated);

    if (isAuthenticated) {
      fetchMe().catch(() => {});
    } else {
      useAuthStore.setState({ authChecked: true });
    }
  }, [hydrated]);
  useEffect(() => {
    if (!hydrated) return;

    const { isAuthenticated } = useAuthStore.getState();

    if (isAuthenticated) {
      fetchMe().catch(() => {});
    } else {
      useAuthStore.setState({ authChecked: true });
    }
  }, [hydrated]);

  return <>{children}</>;
}
