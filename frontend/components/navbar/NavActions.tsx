"use client";

import Link from "next/link";
import { useState } from "react";
import SearchBar from "./SearchBar";
import AuthModal from "./../auth/AuthModal";
import { useAuthStore } from "@/stores/auth.store";
import { useHydrated } from "@/hooks/useHydrated";

export default function NavActions() {
  const [showAuth, setShowAuth] = useState(false);
  const user = useAuthStore((state) => state.user);
  const hydrated = useHydrated();

  return (
    <>
      <div className="nav-actions">
        <SearchBar />

        <Link href="/wishlist" className="icon-btn" aria-label="Wishlist">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </Link>

        {user ? (
          <p className="text-black">{user.name}</p>
        ) : (
          <button
            className="icon-btn"
            aria-label="Account"
            onClick={() => setShowAuth(true)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        )}

        <Link href="/cart" className="icon-btn cart-btn" aria-label="Cart">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span className="cart-badge">3</span>
        </Link>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}
