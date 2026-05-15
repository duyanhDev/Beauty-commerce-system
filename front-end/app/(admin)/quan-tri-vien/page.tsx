"use client";

import { useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.push("/")}>Back</button>
    </div>
  );
}
