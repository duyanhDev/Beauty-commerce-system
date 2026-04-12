"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const onClickDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-black text-black dark:text-white">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />

        <button
          className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black"
          onClick={onClickDarkMode}
        >
          Toggle Theme
        </button>
      </main>
    </div>
  );
}
