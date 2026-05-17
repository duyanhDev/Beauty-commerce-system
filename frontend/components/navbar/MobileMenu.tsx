"use client";
import { useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "Da Mặt", href: "/about" },
  { label: "Trang Điểm", href: "/makeup" },
  { label: "Nước Hoa", href: "/fragrance" },
  { label: "Chăm Sóc Cơ Thể", href: "/body" },
  { label: "Thương Hiệu", href: "/brands" },
  { label: "SALE", href: "/sale", accent: true },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="mobile-toggle icon-btn"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          {open ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-inner">
            <p className="mobile-drawer-title">Menu</p>
            <ul className="mobile-nav-list">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`mobile-nav-link ${item.accent ? "mobile-nav-link--accent" : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mobile-drawer-footer">
              <Link href="/account" className="mobile-footer-link">
                Tài Khoản
              </Link>
              <Link href="/wishlist" className="mobile-footer-link">
                Yêu Thích
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
