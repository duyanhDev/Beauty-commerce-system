"use client";

import { useEffect, useRef, useState } from "react";
import { X, Leaf, Eye, EyeOff, ArrowRight, Mail } from "lucide-react";
import { Auth } from "@/services/auth.service";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({
  open,
  onClose,
}: LoginModalProps): React.JSX.Element {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const { setUser } = useAuthStore();

  // Đóng khi click ra ngoài
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        overlayRef.current &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  // Khoá scroll body
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Đóng bằng Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Reset khi đổi mode
  const switchMode = (m: "login" | "register") => {
    setMode(m);
    setError(null);
    setEmail("");
    setPassword("");
    setName("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setLoading(true);
      e.preventDefault();
      setError(null);

      if (!email || !password) {
        toast.warning("Vui lòng điền đầy đủ thông tin.");
        setError("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      if (mode === "register") {
        if (!email || !password || !name) {
          toast.warning("Vui lòng điền đầy đủ thông tin.");
          setError("Vui lòng điền đầy đủ thông tin.");
          setLoading(false);
          return;
        }

        const res = await Auth.register(email, name, password);

        if (res && res.data && res.data.EC === 0) {
          toast.success("Tạo tài khoản thành công! Vui lòng đăng nhập.");
          switchMode("login");
          setLoading(false);
        }
      } else {
        const res = await Auth.login(email, password);

        if (res && res.data && res.data.EC === 0) {
          console.log(res.data);

          setUser(res.data.user);
          onClose();
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className={`fixed inset-0 z-50 transition-all duration-400
          bg-stone-900/30 backdrop-blur-sm
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Panel */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center px-4
          pointer-events-none`}
      >
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={mode === "login" ? "Đăng nhập" : "Đăng ký"}
          className={`
            relative w-full max-w-md pointer-events-auto
            bg-white/98 backdrop-blur-xl rounded-3xl
            shadow-2xl shadow-emerald-900/10
            border border-emerald-100/60
            transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            ${
              open
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-4"
            }
          `}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {/* Top gradient accent */}
          <div className="h-1 w-full rounded-t-3xl bg-linear-to-r from-emerald-400 via-green-500 to-emerald-600" />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Đóng"
            className="absolute top-5 right-5 p-2 rounded-full text-stone-300
              hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200"
          >
            <X size={17} strokeWidth={1.5} />
          </button>

          <div className="px-8 pt-7 pb-8">
            {/* Logo mini */}
            <div className="flex items-center gap-2.5 mb-7">
              <span className="relative flex items-center justify-center w-8 h-8 shrink-0">
                <span className="absolute inset-0 rounded-full border border-emerald-300/50 bg-linear-to-br from-emerald-50 to-green-100" />
                <Leaf
                  size={13}
                  strokeWidth={1.5}
                  className="relative text-emerald-600"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-[8px] tracking-[0.3em] font-medium uppercase text-emerald-500/80">
                  botanical · 2024
                </span>
                <span
                  className="text-[18px] font-normal tracking-wide text-stone-800"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Verdure<em className="not-italic text-emerald-600">Lab</em>
                </span>
              </span>
            </div>

            {/* Mode tabs */}
            <div className="flex gap-0 p-1 bg-stone-50 rounded-2xl mb-7 border border-stone-100">
              {(["login", "register"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => switchMode(m)}
                  className={`flex-1 py-2 rounded-xl text-[11px] tracking-widest uppercase
                    transition-all duration-250 font-medium
                    ${
                      mode === m
                        ? "bg-white text-emerald-700 shadow-sm shadow-emerald-100/80 border border-emerald-100/60"
                        : "text-stone-400 hover:text-stone-600"
                    }`}
                >
                  {m === "login" ? "Đăng nhập" : "Đăng ký"}
                </button>
              ))}
            </div>

            {/* Heading */}
            <div className="mb-6">
              <h2
                className="text-2xl font-normal text-stone-800 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {mode === "login" ? "Chào mừng trở lại" : "Tạo tài khoản"}
              </h2>
              <p className="text-[12px] text-stone-400 tracking-wide mt-1 font-light">
                {mode === "login"
                  ? "Đăng nhập để tiếp tục mua sắm"
                  : "Tham gia cộng đồng VerdureLab"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
              {/* Họ tên (chỉ register) */}
              {mode === "register" && (
                <div className="space-y-1.5">
                  <label className="text-[11px] tracking-widest uppercase text-stone-400 font-medium">
                    Họ tên
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full h-11 px-4 rounded-2xl bg-stone-50 border border-stone-200
                      text-[13px] text-stone-700 placeholder:text-stone-300
                      focus:outline-none focus:border-emerald-300 focus:bg-white focus:ring-2 focus:ring-emerald-100
                      transition-all duration-200"
                  />
                </div>
              )}

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[11px] tracking-widest uppercase text-stone-400 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full h-11 px-4 rounded-2xl bg-stone-50 border border-stone-200
                    text-[13px] text-stone-700 placeholder:text-stone-300
                    focus:outline-none focus:border-emerald-300 focus:bg-white focus:ring-2 focus:ring-emerald-100
                    transition-all duration-200"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] tracking-widest uppercase text-stone-400 font-medium">
                    Mật khẩu
                  </label>
                  {mode === "login" && (
                    <button
                      type="button"
                      className="text-[11px] text-emerald-500 hover:text-emerald-700
                        transition-colors duration-200 font-light tracking-wide"
                    >
                      Quên mật khẩu?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete={
                      mode === "login" ? "current-password" : "new-password"
                    }
                    className="w-full h-11 px-4 pr-11 rounded-2xl bg-stone-50 border border-stone-200
                      text-[13px] text-stone-700 placeholder:text-stone-300
                      focus:outline-none focus:border-emerald-300 focus:bg-white focus:ring-2 focus:ring-emerald-100
                      transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2
                      text-stone-300 hover:text-emerald-500 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff size={15} strokeWidth={1.5} />
                    ) : (
                      <Eye size={15} strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-[12px] text-red-400 bg-red-50 px-4 py-2.5 rounded-xl border border-red-100">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 mt-1 rounded-2xl
                  bg-linear-to-br from-emerald-500 via-green-500 to-emerald-600
                  hover:from-emerald-600 hover:to-emerald-700
                  active:scale-[0.98]
                  text-white text-[12px] tracking-[0.15em] uppercase font-medium
                  shadow-lg shadow-emerald-200
                  transition-all duration-300
                  flex items-center justify-center gap-2
                  disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Đang xử lý…
                  </span>
                ) : (
                  <>
                    {mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}
                    <ArrowRight size={14} strokeWidth={2} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-stone-100" />
              <span className="text-[10px] tracking-widest text-stone-300 uppercase">
                hoặc
              </span>
              <div className="flex-1 h-px bg-stone-100" />
            </div>

            {/* Social login */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <Mail size={15} strokeWidth={1.5} />, label: "Google" },
              ].map(({ icon, label }) => (
                <button
                  key={label}
                  type="button"
                  className="h-10 rounded-2xl border border-stone-200 bg-stone-50
                    hover:border-emerald-200 hover:bg-emerald-50/60 hover:text-emerald-700
                    text-stone-500 text-[12px] tracking-wide font-light
                    flex items-center justify-center gap-2
                    transition-all duration-200"
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>

            {/* Footer note */}
            <p className="text-center text-[11px] text-stone-300 mt-6 font-light leading-relaxed">
              {mode === "login" ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
              <button
                type="button"
                onClick={() =>
                  switchMode(mode === "login" ? "register" : "login")
                }
                className="text-emerald-500 hover:text-emerald-700 font-medium transition-colors duration-200"
              >
                {mode === "login" ? "Đăng ký ngay" : "Đăng nhập"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
