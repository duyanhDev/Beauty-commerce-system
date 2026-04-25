"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import LoginAuth from "./auth/LoginAuth";
import { Button } from "@/components/ui/button";


export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open,setOpen] = useState<boolean>(false)

  const onClickDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const onOpenAuth = ()=>{
     setOpen(!open)
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className=" bg-zinc-50 dark:bg-black text-black dark:text-white">
        <Button onClick={onOpenAuth}>Login</Button>
       <LoginAuth open={open} setOpen={setOpen}/>
    </div>
  );
}
