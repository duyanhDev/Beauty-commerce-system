import { Suspense } from "react";
import QueryProvider from "@/providers/query-provider";
import { AuthProvider } from "@/components/AuthProvider";
import "./globals.css";
import BfcacheHandler from "@/components/BfcacheHandler/BfcacheHandler";
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <Suspense fallback={null}>
            <AuthProvider>
              <BfcacheHandler />
              {children}
            </AuthProvider>
          </Suspense>
        </QueryProvider>
      </body>
    </html>
  );
}
