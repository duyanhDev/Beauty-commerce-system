"use client";
import { useState } from "react";

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div className="search-wrap">
      {open ? (
        <div className="search-box">
          <input
            autoFocus
            className="search-input"
            placeholder="Tìm kiếm sản phẩm..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="search-close"
            onClick={() => {
              setOpen(false);
              setQuery("");
            }}
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          className="icon-btn"
          onClick={() => setOpen(true)}
          aria-label="Search"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="22" y2="22" />
          </svg>
        </button>
      )}
    </div>
  );
}
