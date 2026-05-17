"use client";

import { useAuthStore } from "@/stores/auth.store";

export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  const _hasHydrated = useAuthStore((state) => state._hasHydrated);

  // Chờ localStorage hydrate xong mới render user
  if (!_hasHydrated) return null;

  return (
    <div style={{ padding: "40px" }}>
      <h1>Trang chủ</h1>
      <p>Xin chào: {user?.name || "Guest"}</p>
    </div>
  );
}
