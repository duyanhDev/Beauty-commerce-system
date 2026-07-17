import { Suspense } from "react";
import QueryProvider from "@/providers/query-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-full bg-gray-100 flex flex-col">
        <Header />
        <QueryProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </QueryProvider>
      </body>
    </html>
  );
}
