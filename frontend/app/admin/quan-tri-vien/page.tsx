"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";

export default function QuanTriVien() {
  const user = useAuthStore((state) => state.user);

  console.log(user);
  const router = useRouter();
  return (
    <div style={{ padding: "40px" }}>
      <button onClick={() => router.push("/")}>gg</button>
    </div>
  );
}
