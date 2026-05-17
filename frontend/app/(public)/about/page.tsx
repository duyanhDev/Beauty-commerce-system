"use client";

import { useHydrated } from "@/hooks/useHydrated";
import { useAuthStore } from "@/stores/auth.store";

export default function HomePage() {
  const hydrated = useHydrated();

  const user = useAuthStore((state) => state.user);

  if (!hydrated) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>About</h1>

      <p>
        Xin chào:
        {user?.name || "Guest"}
      </p>
    </div>
  );
}
