// app/page.tsx
"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    console.log("🏠 Home page mounted");
  }, []);

  return <div>Home</div>;
}
