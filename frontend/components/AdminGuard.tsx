"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isFetchingMe = useAuthStore((s) => s.isFetchingMe);
  const isAdmin = user?.role?.name === "admin";

  useEffect(() => {
    // Đang fetch thì chờ
    if (isFetchingMe) return;

    if (!isAuthenticated) {
      router.replace("/");
      return;
    }

    if (!isAdmin) {
      router.replace("/403");
    }
  }, [isFetchingMe, isAuthenticated, isAdmin, router]);

  // Đang verify token → hiện loading
  if (isFetchingMe) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Loading admin...</p>
      </div>
    );
  }

  // Chưa xác thực → null (đang redirect)
  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return <>{children}</>;
}
