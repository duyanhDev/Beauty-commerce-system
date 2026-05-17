"use client";

import { useState } from "react";
import styles from "./../../styles/AuthModal.module.css";
import { useAuthStore } from "@/stores/auth.store";

type Tab = "login" | "register";

interface AuthModalProps {
  onClose: () => void;
}

interface LoginDTO {
  email: string;
  password: string;
}

interface RegisterDTO {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const [tab, setTab] = useState<Tab>("login");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formLogin, setFormLogin] = useState<LoginDTO>({
    email: "",
    password: "",
  });

  const [formRegister, setFormRegister] = useState<RegisterDTO>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const { login } = useAuthStore();

  // ── onChange chung ──────────────────────────────────────
  const onChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onChangeRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormRegister((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ── Login ───────────────────────────────────────────────
  const handleLogin = async () => {
    setError(null);
    if (!formLogin.email || !formLogin.password) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }
    setIsLoading(true);
    try {
      await login(formLogin.email, formLogin.password);
      alert("đăng nhâp thành công");
      onClose(); // đóng modal sau khi login thành công
    } catch (err: any) {
      setError(err?.response?.data?.message || "Đăng nhập thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  // ── Register ────────────────────────────────────────────
  const handleRegister = async () => {
    setError(null);
    if (formRegister.password !== formRegister.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }
    setIsLoading(true);
    try {
      // TODO: gọi Auth.register(formRegister)
      console.log("register", formRegister);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Đăng ký thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          ✕
        </button>

        <div className={styles.modalLogo}>
          <span className={styles.logoIcon}>✿</span>
          <span className={styles.logoBrand}>LUMIÈRE</span>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tab === "login" ? styles.active : ""}`}
            onClick={() => {
              setTab("login");
              setError(null);
            }}
          >
            Đăng Nhập
          </button>
          <button
            className={`${styles.tab} ${tab === "register" ? styles.active : ""}`}
            onClick={() => {
              setTab("register");
              setError(null);
            }}
          >
            Đăng Ký
          </button>
        </div>

        {/* Hiển thị lỗi */}
        {error && (
          <p style={{ color: "red", fontSize: 13, margin: "8px 0" }}>{error}</p>
        )}

        {/* ── Login Form ── */}
        {tab === "login" && (
          <div className={styles.form} key="login">
            <p className={styles.subtitle}>Chào mừng trở lại 👋</p>

            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                className={styles.input}
                type="email"
                name="email" // ✅ thêm name
                placeholder="example@email.com"
                value={formLogin.email} // ✅ controlled
                onChange={onChangeLogin}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Mật khẩu
                <a href="#" className={styles.forgot}>
                  Quên mật khẩu?
                </a>
              </label>
              <div className={styles.inputWrap}>
                <input
                  className={styles.input}
                  type={showPass ? "text" : "password"}
                  name="password" // ✅ thêm name
                  placeholder="••••••••"
                  value={formLogin.password} // ✅ controlled
                  onChange={onChangeLogin}
                />
                <button
                  className={styles.eye}
                  onClick={() => setShowPass(!showPass)}
                >
                  {/* icon giữ nguyên */}
                </button>
              </div>
            </div>

            <button
              className={styles.btnPrimary}
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? "Đang đăng nhập..." : "Đăng Nhập"}
            </button>
          </div>
        )}

        {/* ── Register Form ── */}
        {tab === "register" && (
          <div className={styles.form} key="register">
            <p className={styles.subtitle}>Tạo tài khoản mới ✨</p>

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Họ</label>
                <input
                  className={styles.input}
                  name="lastName"
                  placeholder="Nguyễn"
                  value={formRegister.lastName}
                  onChange={onChangeRegister}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Tên</label>
                <input
                  className={styles.input}
                  name="firstName"
                  placeholder="Lan Anh"
                  value={formRegister.firstName}
                  onChange={onChangeRegister}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                className={styles.input}
                type="email"
                name="email"
                placeholder="example@email.com"
                value={formRegister.email}
                onChange={onChangeRegister}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Số điện thoại</label>
              <input
                className={styles.input}
                type="tel"
                name="phone"
                placeholder="0912 345 678"
                value={formRegister.phone}
                onChange={onChangeRegister}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Mật khẩu</label>
              <input
                className={styles.input}
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Tối thiểu 8 ký tự"
                value={formRegister.password}
                onChange={onChangeRegister}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Xác nhận mật khẩu</label>
              <input
                className={styles.input}
                type="password"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                value={formRegister.confirmPassword}
                onChange={onChangeRegister}
              />
            </div>

            <button
              className={styles.btnPrimary}
              onClick={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Tạo Tài Khoản"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
