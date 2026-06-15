"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface navItem {
  label: string;
  href: string;
  dropdown: string[];
  accent?: boolean;
}

const navItems: navItem[] = [
  {
    label: "Da Mặt",
    href: "/about",
    dropdown: [
      "Tẩy Trang",
      "Sữa Rửa Mặt",
      "Toner",
      "Serum",
      "Kem Dưỡng",
      "Kem Chống Nắng",
    ],
  },
  {
    label: "Trang Điểm",
    href: "/makeup",
    dropdown: [
      "Son Môi",
      "Kem Nền",
      "Phấn Mắt",
      "Mascara",
      "Má Hồng",
      "Setting Spray",
    ],
  },
  {
    label: "Nước Hoa",
    href: "/fragrance",
    dropdown: ["Nữ", "Nam", "Unisex", "Mini & Travel", "Gift Set"],
  },
  {
    label: "Chăm Sóc Cơ Thể",
    href: "/body",
    dropdown: ["Sữa Tắm", "Dưỡng Thể", "Tẩy Tế Bào Chết", "Chăm Sóc Tóc"],
  },
  { label: "Thương Hiệu", href: "/brands", dropdown: [] },
  { label: "SALE", href: "/sale", dropdown: [], accent: true },
];

export default function NavMenu() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <nav className="nav-menu">
      <ul className="nav-list">
        {navItems.map((item: navItem) => (
          <li
            key={item.label}
            className="nav-item"
            onMouseEnter={() => setActive(item.label)}
            onMouseLeave={() => setActive(null)}
          >
            <Link
              href={item.href}
              className={`nav-link ${item.accent ? "nav-link--accent" : ""}`}
            >
              {item.label}
              {item.dropdown.length > 0 && (
                <span className="nav-chevron">
                  <ChevronDown />
                </span>
              )}
            </Link>

            {item.dropdown.length > 0 && active === item.label && (
              <div className="dropdown">
                <div className="dropdown-inner">
                  {item.dropdown.map((sub) => (
                    <Link key={sub} href="#" className="dropdown-link">
                      {sub}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
