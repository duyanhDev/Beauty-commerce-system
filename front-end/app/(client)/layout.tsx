"use client";

import Navbar from "../navbar/Navbar";

import { Toaster } from "sonner";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      {children}

      <Toaster richColors position="top-right" />
    </>
  );
}
