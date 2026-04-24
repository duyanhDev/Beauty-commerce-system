"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginAuth({ open, setOpen }: Props) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 overflow-hidden border-0 max-w-sm w-full rounded-2xl shadow-2xl">
        <VisuallyHidden>
          <DialogTitle>Đăng nhập / Đăng ký tài khoản</DialogTitle>
          <DialogDescription>Form đăng nhập hoặc tạo tài khoản mới cho website mỹ phẩm Lumière.</DialogDescription>
        </VisuallyHidden>
        {/* Background */}
        <div className="relative bg-linear-to-br from-[#fdf6f0] to-[#fce8e0] p-8">
          {/* Close */}
          <DialogClose className="absolute right-4 top-4 text-[#c09080] hover:text-[#8b4a30] transition-colors" />

          {/* Logo */}
          <div className="flex flex-col items-center mb-7">
            <div className="flex items-center gap-2 mb-3">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <ellipse cx="12" cy="12" rx="5" ry="7" stroke="#c07050" strokeWidth="1.5" />
                <path d="M7 12 C5 9 5 6 8 5" stroke="#c07050" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M17 12 C19 9 19 6 16 5" stroke="#c07050" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="12" cy="12" r="2" fill="#e8a080" />
              </svg>
              <span
                className="text-[17px] tracking-[3px] text-[#8b4a30] font-normal uppercase"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Lumière
              </span>
            </div>
            <h2
              className="text-[22px] font-normal text-[#3d1f10] mb-1 tracking-wide"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Chào mừng trở lại
            </h2>
            <p className="text-[13px] text-[#b07060] tracking-wide" style={{ fontFamily: "Georgia, serif" }}>
              Đăng nhập để khám phá vẻ đẹp của bạn
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-0 bg-[#fdf0ea] rounded-[10px] p-0.75 mb-5">
            <button
              onClick={() => setTab("login")}
              className="flex-1 py-2 rounded-[8px] text-[13px] transition-all duration-200 cursor-pointer"
              style={{
                fontFamily: "Georgia, serif",
                letterSpacing: "0.5px",
                background: tab === "login" ? "#c07050" : "transparent",
                color: tab === "login" ? "#fff" : "#b07060",
                border: "none",
              }}
            >
              Đăng nhập
            </button>
            <button
              onClick={() => setTab("register")}
              className="flex-1 py-2 rounded-[8px] text-[13px] transition-all duration-200 cursor-pointer"
              style={{
                fontFamily: "Georgia, serif",
                letterSpacing: "0.5px",
                background: tab === "register" ? "#c07050" : "transparent",
                color: tab === "register" ? "#fff" : "#b07060",
                border: "none",
              }}
            >
              Đăng ký
            </button>
          </div>

          {/* Login Form */}
          {tab === "login" && (
            <div>
              <div className="mb-4">
                <label
                  className="block text-[12px] text-[#8b5a45] tracking-[1px] uppercase mb-1.5"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="ten@email.com"
                  className="w-full px-3.5 py-2.5 border border-[#eacfbf] rounded-[10px] text-[14px] text-[#3d1f10] bg-[#fffaf8] outline-none focus:border-[#c07050] transition-colors"
                  style={{ fontFamily: "Georgia, serif" }}
                />
              </div>

              <div className="mb-2">
                <label
                  className="block text-[12px] text-[#8b5a45] tracking-[1px] uppercase mb-1.5"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 pr-10 border border-[#eacfbf] rounded-[10px] text-[14px] text-[#3d1f10] bg-[#fffaf8] outline-none focus:border-[#c07050] transition-colors"
                    style={{ fontFamily: "Georgia, serif" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c07050] bg-none border-none cursor-pointer text-[13px]"
                  >
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="text-right mb-5">
                <a
                  href="#"
                  className="text-[12px] text-[#c07050] no-underline tracking-wide hover:underline"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Quên mật khẩu?
                </a>
              </div>

              <button
                type="button"
                className="w-full py-3 rounded-[10px] text-white text-[14px] tracking-[1.5px] uppercase cursor-pointer transition-opacity hover:opacity-90 border-none"
                style={{
                  fontFamily: "Georgia, serif",
                  background: "linear-gradient(135deg, #c07050, #e8a080)",
                }}
              >
                Đăng nhập
              </button>
            </div>
          )}

          {/* Register Form */}
          {tab === "register" && (
            <div>
              <div className="mb-4">
                <label
                  className="block text-[12px] text-[#8b5a45] tracking-[1px] uppercase mb-1.5"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Họ và tên
                </label>
                <input
                  type="text"
                  placeholder="Nguyễn Thị Lan"
                  className="w-full px-3.5 py-2.5 border border-[#eacfbf] rounded-[10px] text-[14px] text-[#3d1f10] bg-[#fffaf8] outline-none focus:border-[#c07050] transition-colors"
                  style={{ fontFamily: "Georgia, serif" }}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-[12px] text-[#8b5a45] tracking-[1px] uppercase mb-1.5"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="ten@email.com"
                  className="w-full px-3.5 py-2.5 border border-[#eacfbf] rounded-[10px] text-[14px] text-[#3d1f10] bg-[#fffaf8] outline-none focus:border-[#c07050] transition-colors"
                  style={{ fontFamily: "Georgia, serif" }}
                />
              </div>
              <div className="mb-5">
                <label
                  className="block text-[12px] text-[#8b5a45] tracking-[1px] uppercase mb-1.5"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  placeholder="Tối thiểu 8 ký tự"
                  className="w-full px-3.5 py-2.5 border border-[#eacfbf] rounded-[10px] text-[14px] text-[#3d1f10] bg-[#fffaf8] outline-none focus:border-[#c07050] transition-colors"
                  style={{ fontFamily: "Georgia, serif" }}
                />
              </div>
              <button
                type="button"
                className="w-full py-3 rounded-[10px] text-white text-[14px] tracking-[1.5px] uppercase cursor-pointer transition-opacity hover:opacity-90 border-none"
                style={{
                  fontFamily: "Georgia, serif",
                  background: "linear-gradient(135deg, #c07050, #e8a080)",
                }}
              >
                Tạo tài khoản
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-2.5 my-4">
            <div className="flex-1 h-px bg-[#eacfbf]" />
            <span className="text-[12px] text-[#c09080]" style={{ fontFamily: "Georgia, serif" }}>hoặc</span>
            <div className="flex-1 h-px bg-[#eacfbf]" />
          </div>

          {/* Google Login */}
          <button
            type="button"
            className="w-full py-2.5 bg-white border border-[#eacfbf] rounded-[10px] text-[13px] text-[#5a3020] cursor-pointer flex items-center justify-center gap-2 hover:bg-[#fdf6f0] transition-colors"
            style={{ fontFamily: "Georgia, serif" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M5.27 9.76A7.08 7.08 0 0 1 12 4.9c1.76 0 3.35.65 4.57 1.71l3.4-3.4A11.94 11.94 0 0 0 12 1C8.16 1 4.83 3.01 2.96 6.01l2.31 3.75z" />
              <path fill="#34A853" d="M16.04 18.01A7.03 7.03 0 0 1 12 19.1c-2.93 0-5.44-1.79-6.58-4.35l-2.37 3.63C4.87 21.02 8.22 23 12 23c3.18 0 6.09-1.19 8.29-3.14l-4.25-1.85z" />
              <path fill="#4A90D9" d="M20.29 12.18c0-.68-.06-1.34-.17-1.97H12v3.73h4.65a3.98 3.98 0 0 1-1.72 2.62l4.25 1.85C20.8 16.71 22 14.6 22 12.18z" />
              <path fill="#FBBC05" d="M5.42 14.75A7.1 7.1 0 0 1 4.9 12c0-.96.17-1.89.47-2.75L3.06 5.5A11.88 11.88 0 0 0 1 12c0 1.99.49 3.87 1.35 5.52l3.07-2.77z" />
            </svg>
            Tiếp tục với Google
          </button>

          {/* Terms */}
          <p
            className="text-center text-[11px] text-[#c09080] mt-4 leading-relaxed"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Bằng cách đăng nhập, bạn đồng ý với{" "}
            <a href="#" className="text-[#c07050] hover:underline">Điều khoản</a>{" "}
            và{" "}
            <a href="#" className="text-[#c07050] hover:underline">Chính sách</a>{" "}
            của chúng tôi
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}