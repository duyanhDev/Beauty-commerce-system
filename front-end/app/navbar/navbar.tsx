"use client";

import { useState } from "react";
import Link from "next/link";

const categories = [
  { label: "Sale", href: "/sale", highlight: true },
  { label: "Tất cả", href: "/san-pham" },
  { label: "Chăm sóc da", href: "/cham-soc-da" },
  { label: "Trang điểm", href: "/trang-diem" },
  { label: "Chăm sóc tóc", href: "/cham-soc-toc" },
  { label: "Nước hoa", href: "/nuoc-hoa" },
  { label: "Dưỡng thể", href: "/duong-the" },
  { label: "Chống nắng", href: "/chong-nang" },
  { label: "Thương hiệu", href: "/thuong-hieu" },
  { label: "Mới về", href: "/moi-ve" },
];

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const cartCount = 3;

  return (
    <header className="w-full bg-white border-b border-[#f0d5c8]" style={{ fontFamily: "Georgia, serif" }}>
      {/* Top bar */}
      <div className="bg-[#3d1f10] px-6 py-1.5 flex items-center justify-between">
        <span className="text-[#e8c4a8] text-[11px] tracking-[1.5px] uppercase">
          Miễn phí vận chuyển đơn từ 299.000đ &nbsp;|&nbsp; Giao hàng toàn quốc
        </span>
        <div className="flex items-center gap-4 text-[#e8c4a8] text-[11px] tracking-[1px]">
          <Link href="/theo-doi-don" className="hover:text-white transition-colors">Theo dõi đơn hàng</Link>
          <span className="opacity-40">|</span>
          <Link href="/cua-hang" className="hover:text-white transition-colors">Cửa hàng</Link>
          <span className="opacity-40">|</span>
          <Link href="/blog" className="hover:text-white transition-colors">Blog làm đẹp</Link>
        </div>
      </div>

      {/* Main nav */}
      <div className="px-6 h-16 flex items-center gap-0">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 mr-8 no-underline">
          <div className="w-9 h-9 border border-[#c07050] rounded-full flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <ellipse cx="12" cy="12" rx="5" ry="7" stroke="#c07050" strokeWidth="1.5" />
              <path d="M7 12 C5 9 5 6 8 5" stroke="#c07050" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M17 12 C19 9 19 6 16 5" stroke="#c07050" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="12" cy="12" r="2" fill="#e8a080" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[18px] tracking-[3px] text-[#3d1f10] uppercase font-normal">Lumière</span>
            <span className="text-[9px] tracking-[2px] text-[#b07060] uppercase">Beauty &amp; Skincare</span>
          </div>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-sm relative mx-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm sản phẩm, thương hiệu..."
            className="w-full py-2 pl-3.5 pr-10 border border-[#eacfbf] rounded-full text-[13px] text-[#3d1f10] bg-[#fffaf8] outline-none focus:border-[#c07050] transition-colors"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c07050] bg-none border-none cursor-pointer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 ml-auto">
          {/* Account */}
          <Link href="/tai-khoan" className="flex flex-col items-center gap-0.5 px-2.5 py-1.5 text-[#5a3020] hover:text-[#c07050] transition-colors no-underline">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
            <span className="text-[10px] tracking-[0.5px] whitespace-nowrap">Tài khoản</span>
          </Link>

          {/* Wishlist */}
          <Link href="/yeu-thich" className="flex flex-col items-center gap-0.5 px-2.5 py-1.5 text-[#5a3020] hover:text-[#c07050] transition-colors no-underline">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="text-[10px] tracking-[0.5px] whitespace-nowrap">Yêu thích</span>
          </Link>

          {/* Cart */}
          <Link href="/gio-hang" className="flex flex-col items-center gap-0.5 px-2.5 py-1.5 text-[#5a3020] hover:text-[#c07050] transition-colors no-underline">
            <div className="relative">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#c07050] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-[0.5px] whitespace-nowrap">Giỏ hàng</span>
          </Link>
        </div>
      </div>

      {/* Category bar */}
      <nav className="bg-[#fdf6f0] border-t border-[#f0d5c8] px-6 flex items-center overflow-x-auto scrollbar-none">
        {categories.map((cat, i) => (
          <div key={cat.label} className="flex items-center shrink-0">
            {i > 0 && <div className="w-px h-3.5 bg-[#eacfbf] mx-1" />}
            <button
              onClick={() => setActiveCategory(cat.label)}
              className={[
                "px-4 py-2.5 text-[12px] uppercase tracking-[0.8px] whitespace-nowrap border-b-2 transition-all duration-200 bg-transparent cursor-pointer",
                cat.highlight
                  ? "text-[#c07050] border-transparent hover:border-[#c07050]"
                  : activeCategory === cat.label
                  ? "text-[#c07050] border-[#c07050] font-medium"
                  : "text-[#5a3020] border-transparent hover:text-[#c07050] hover:border-[#c07050]",
              ].join(" ")}
            >
              {cat.label}
            </button>
          </div>
        ))}
      </nav>
    </header>
  );
}