"use client";
import { useState } from "react";

const announcements = [
  "✦ MIỄN PHÍ VẬN CHUYỂN cho đơn hàng từ 500K ✦",
  "✦ SALE đến 40% — Bộ sưu tập Hè 2025 ✦",
  "✦ Quà tặng kèm cho đơn hàng đầu tiên ✦",
];

export default function TopBar() {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((i) => (i - 1 + announcements.length) % announcements.length);
  const next = () => setIndex((i) => (i + 1) % announcements.length);

  return (
    <div className="topbar">
      <button className="topbar-arrow" onClick={prev} aria-label="Previous">
        ‹
      </button>
      <p className="topbar-text">{announcements[index]}</p>
      <button className="topbar-arrow" onClick={next} aria-label="Next">
        ›
      </button>
    </div>
  );
}
