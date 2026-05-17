"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BfcacheHandler() {
  const router = useRouter();

  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        // Trang được restore từ bfcache → refresh lại router
        router.refresh();
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [router]);

  return null;
}
