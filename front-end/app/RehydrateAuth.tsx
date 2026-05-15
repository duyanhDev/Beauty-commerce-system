"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export default function RehydrateAuth() {
  useEffect(() => {
    useAuthStore.persist?.rehydrate?.();
  }, []);

  return null;
}
