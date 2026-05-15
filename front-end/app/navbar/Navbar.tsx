"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Heart,
  Leaf,
  Settings,
  MapPin,
  LogOut,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoginModal from "@/components/auth/Loginmodal";
import { useAuthStore } from "@/store/useAuthStore";
import { Auth } from "@/services/auth.service";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavLinkItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}
interface Language {
  value: string;
  label: string;
  flag: string;
}
interface NavLinkProps {
  link: NavLinkItem;
  active: boolean;
  onClick: () => void;
}
interface IconButtonProps {
  children: React.ReactNode;
  label: string;
  badge?: number;
  onClick?: () => void;
  className?: string;
}
interface LanguageSwitcherProps {
  lang: string;
  setLang: (lang: string) => void;
}
interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  activeLink: string;
  setActiveLink: (link: string) => void;
  lang: string;
  setLang: (lang: string) => void;
  cartCount: number;
  onOpenLogin: () => void;
}
interface AuthUser {
  name: string;
  email?: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS: NavLinkItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/thuong-hieu" },
  { label: "Categories", href: "/categories", hasDropdown: true },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
const LANGUAGES: Language[] = [
  { value: "EN", label: "English", flag: "🇺🇸" },
  { value: "VI", label: "Tiếng Việt", flag: "🇻🇳" },
  { value: "JA", label: "日本語", flag: "🇯🇵" },
];

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo(): React.JSX.Element {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/")}
      className="flex items-center gap-3 select-none shrink-0"
    >
      <span className="relative flex items-center justify-center w-9 h-9 shrink-0">
        <span className="absolute inset-0 rounded-full border border-emerald-300/50 bg-gradient-to-br from-emerald-50 to-green-100" />
        <Leaf
          size={16}
          strokeWidth={1.5}
          className="relative text-emerald-600"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className="text-[9px] tracking-[0.3em] font-medium uppercase text-emerald-500/80"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          botanical · 2024
        </span>
        <span
          className="text-[22px] font-normal tracking-wide text-stone-800"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Verdure
          <em className="not-italic text-emerald-600 font-normal">Lab</em>
        </span>
      </span>
    </button>
  );
}

// ─── Nav Link ─────────────────────────────────────────────────────────────────

function NavLink({ link, active, onClick }: NavLinkProps): React.JSX.Element {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-0.5 text-[12px] tracking-[0.12em] uppercase py-1 shrink-0 ${
        active
          ? "text-emerald-700 font-medium"
          : "text-stone-500 hover:text-emerald-600 font-light"
      }`}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {link.label}
      {link.hasDropdown && <ChevronDown size={11} className="opacity-50" />}
      <span
        className={`absolute -bottom-0.5 left-0 h-px rounded-full bg-emerald-500 transition-all duration-200 ${
          active ? "w-full opacity-100" : "w-0 opacity-0"
        }`}
      />
    </button>
  );
}

// ─── Icon Button ──────────────────────────────────────────────────────────────

function IconButton({
  children,
  label,
  badge,
  onClick,
  className = "",
}: IconButtonProps): React.JSX.Element {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={`relative flex items-center justify-center w-9 h-9 rounded-full text-stone-500 hover:text-emerald-700 hover:bg-emerald-50/80 ${className}`}
    >
      {children}
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-4 h-4 px-0.5 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white text-[9px] font-bold leading-none shadow-sm shadow-emerald-200">
          {badge > 9 ? "9+" : badge}
        </span>
      )}
    </button>
  );
}

// ─── Language Switcher ────────────────────────────────────────────────────────

function LanguageSwitcher({
  lang,
  setLang,
}: LanguageSwitcherProps): React.JSX.Element {
  const current = LANGUAGES.find((l) => l.value === lang) ?? LANGUAGES[0];
  return (
    <Select value={lang} onValueChange={setLang}>
      <SelectTrigger
        className="h-7 w-7 p-0 rounded-full flex items-center justify-center border border-emerald-200/60 bg-emerald-50/40 hover:bg-emerald-50 hover:border-emerald-300 focus:ring-1 focus:ring-emerald-200 focus:ring-offset-0 shadow-none [&>svg]:hidden"
        aria-label={`Language: ${current.label}`}
      >
        <SelectValue>
          <span className="text-base leading-none">{current.flag}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="min-w-40 rounded-2xl border border-emerald-100/80 bg-white/95 backdrop-blur-xl shadow-xl shadow-emerald-100/40 p-1.5 mt-1">
        {LANGUAGES.map((l) => (
          <SelectItem
            key={l.value}
            value={l.value}
            className="rounded-xl px-3 py-2.5 text-[13px] font-light text-stone-600 cursor-pointer select-none hover:bg-emerald-50 hover:text-emerald-700 focus:bg-emerald-50 focus:text-emerald-700 data-[state=checked]:bg-emerald-50/80 data-[state=checked]:text-emerald-600"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <span className="flex items-center gap-2.5">
              <span className="text-base leading-none">{l.flag}</span>
              <span className="flex-1">{l.label}</span>
              <span className="text-[10px] text-stone-300 tracking-wider font-medium">
                {l.value}
              </span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// ─── Announcement Bar ─────────────────────────────────────────────────────────

function AnnouncementBar(): React.JSX.Element {
  return (
    <div
      className="h-8 w-full flex items-center justify-center bg-gradient-to-br from-emerald-800 via-green-700 to-emerald-800 text-white/90 text-[10.5px] tracking-[0.2em] font-light uppercase"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <Leaf size={9} className="mr-2 opacity-60" fill="currentColor" />
      Free shipping on orders over $50 · 100% natural ingredients
      <Leaf size={9} className="ml-2 opacity-60" fill="currentColor" />
    </div>
  );
}

// ─── User Dropdown ────────────────────────────────────────────────────────────

function UserDropdown({ user }: { user: AuthUser }): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleLogOut = async () => {
    try {
      const res = await Auth.logoutAuth();
      if (res) {
        logout?.();
        router.push("/");
      }
    } catch (error) {}
  };

  const handleNavigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const MENU_GROUPS = [
    [
      {
        icon: User,
        label: "Thông tin cá nhân",
        href: "/profile",
        badge: null as number | null,
      },
      {
        icon: ShoppingBag,
        label: "Đơn hàng của tôi",
        href: "/orders",
        badge: 3 as number | null,
      },
      {
        icon: Heart,
        label: "Yêu thích",
        href: "/wishlist",
        badge: null as number | null,
      },
    ],
    [
      {
        icon: Settings,
        label: "Cài đặt tài khoản",
        href: "/settings",
        badge: null as number | null,
      },
      {
        icon: MapPin,
        label: "Địa chỉ giao hàng",
        href: "/address",
        badge: null as number | null,
      },
    ],
  ];

  return (
    <div ref={ref} className="relative hidden sm:block">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 pl-1 pr-2.5 h-8 rounded-full border border-emerald-200/60 bg-emerald-50/40 hover:bg-emerald-50 hover:border-emerald-300"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <span className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[10px] font-semibold uppercase shrink-0">
          {user.name?.charAt(0)}
        </span>
        <span className="text-[12px] text-stone-600 hover:text-emerald-700 font-medium tracking-wide">
          {user.name}
        </span>
        <ChevronDown
          size={11}
          className={`text-stone-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border border-stone-100 shadow-xl shadow-stone-900/8 overflow-hidden z-50"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-stone-100">
            <span className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-semibold uppercase shrink-0">
              {user.name?.charAt(0)}
            </span>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-stone-800 truncate">
                {user.name}
              </p>
              {user.email && (
                <p className="text-[11px] text-stone-400 truncate">
                  {user.email}
                </p>
              )}
            </div>
          </div>

          {MENU_GROUPS.map((group, gi) => (
            <div key={gi} className="p-1.5 border-b border-stone-100">
              {group.map(({ icon: Icon, label, href, badge }) => (
                <button
                  key={href}
                  onClick={() => handleNavigate(href)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[12.5px] text-stone-600 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <Icon
                    size={15}
                    strokeWidth={1.5}
                    className="text-stone-400 shrink-0"
                  />
                  <span className="flex-1 text-left">{label}</span>
                  {badge !== null && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                      {badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ))}

          <div className="p-1.5">
            <button
              onClick={handleLogOut}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[12.5px] text-red-500 hover:bg-red-50"
            >
              <LogOut size={15} strokeWidth={1.5} className="shrink-0" />
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Mobile Drawer ────────────────────────────────────────────────────────────

function MobileDrawer({
  open,
  onClose,
  activeLink,
  setActiveLink,
  lang,
  setLang,
  cartCount,
  onOpenLogin,
}: MobileDrawerProps): React.JSX.Element {
  const drawerRef = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node))
        onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return <></>;

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-40 bg-stone-900/20 backdrop-blur-[2px]"
      />
      <aside
        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-80 z-50 flex flex-col bg-white/98 backdrop-blur-xl shadow-2xl shadow-stone-900/10"
      >
        <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600" />
        <div className="flex items-center justify-between px-7 py-6">
          <Logo />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-full text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 -mr-1"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>
        <nav className="flex-1 flex flex-col px-5 py-8 gap-1 overflow-y-auto">
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.label}
              onClick={() => {
                setActiveLink(link.label);
                router.push(link.href);
                onClose();
              }}
              className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-[12px] tracking-widest uppercase ${
                activeLink === link.label
                  ? "bg-gradient-to-r from-emerald-50 to-green-50/60 text-emerald-700 font-medium border border-emerald-100"
                  : "text-stone-500 hover:bg-stone-50/80 hover:text-stone-700 font-light"
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`w-5 text-[10px] font-light ${activeLink === link.label ? "text-emerald-400" : "text-stone-300"}`}
                >
                  0{i + 1}
                </span>
                {link.label}
              </span>
              {activeLink === link.label && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              )}
            </button>
          ))}
        </nav>
        <div className="px-7 py-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IconButton label="Search" className="border border-stone-100">
                <Search size={16} strokeWidth={1.5} />
              </IconButton>
              <IconButton label="Wishlist" className="border border-stone-100">
                <Heart size={16} strokeWidth={1.5} />
              </IconButton>
              <IconButton
                label="Account"
                className="border border-stone-100"
                onClick={() => {
                  onClose();
                  onOpenLogin();
                }}
              >
                <User size={16} strokeWidth={1.5} />
              </IconButton>
              <IconButton
                label="Cart"
                badge={cartCount}
                className="border border-stone-100"
              >
                <ShoppingBag size={16} strokeWidth={1.5} />
              </IconButton>
            </div>
            <LanguageSwitcher lang={lang} setLang={setLang} />
          </div>
          <p
            className="text-[11px] text-stone-300 tracking-widest text-center"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            © 2024 VerdureLab · All rights reserved
          </p>
        </div>
      </aside>
    </>
  );
}

function UserSkeleton(): React.JSX.Element {
  return (
    <div className="hidden sm:flex items-center gap-2 pl-1 pr-2.5 h-8 rounded-full border border-emerald-100 bg-emerald-50/20">
      {/* Bỏ animate-pulse để không bị nhấp nháy khi lag */}
      <span className="w-6 h-6 rounded-full bg-emerald-100" />
      <span className="w-16 h-3 rounded-full bg-emerald-100" />
    </div>
  );
}
// ─── Main Navbar ──────────────────────────────────────────────────────────────

export default function Navbar(): React.JSX.Element {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [lang, setLang] = useState<string>("EN");
  const [cartCount] = useState<number>(3);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const hydrated = useAuthStore((state) => state.hydrated);
  const user = useAuthStore((state) => state.user);

  console.log("🔵 Navbar render - user:", user, "hydrated:", hydrated);

  const pathname = usePathname();
  const router = useRouter();

  const activeLink = NAV_LINKS.find((l) => l.href === pathname)?.label ?? "";
  useEffect(() => {
    setMounted(true);
  }, []);

  const authContent = !hydrated ? (
    <UserSkeleton />
  ) : user ? (
    <UserDropdown user={user} />
  ) : (
    <button onClick={() => setLoginOpen(true)}>Sign in</button>
  );
  return (
    <>
      <div className="fixed top-0 inset-x-0 z-30 flex flex-col">
        <AnnouncementBar />
        <header className="bg-white/94 backdrop-blur-xl shadow-[0_1px_40px_0_rgba(0,0,0,0.06)] py-3 border-b border-emerald-100/40">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="flex items-center gap-6">
              <Logo />
              <nav
                className="hidden lg:flex items-center gap-10 flex-1 justify-center"
                aria-label="Main navigation"
              >
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.label}
                    link={link}
                    active={activeLink === link.label}
                    onClick={() => router.push(link.href)}
                  />
                ))}
              </nav>
              <div className="flex items-center gap-1 ml-auto lg:ml-0">
                <div className="hidden sm:flex items-center">
                  {searchOpen ? (
                    <div className="flex items-center gap-2 bg-emerald-50/60 rounded-full px-3.5 h-9 border border-emerald-200">
                      <Search
                        size={14}
                        strokeWidth={1.5}
                        className="text-emerald-400 shrink-0"
                      />
                      <input
                        autoFocus
                        type="text"
                        placeholder="Search products…"
                        onBlur={() => setSearchOpen(false)}
                        className="w-36 bg-transparent text-[13px] text-stone-600 placeholder:text-stone-300 outline-none"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      />
                    </div>
                  ) : (
                    <IconButton
                      label="Search"
                      onClick={() => setSearchOpen(true)}
                    >
                      <Search size={17} strokeWidth={1.5} />
                    </IconButton>
                  )}
                </div>
                <IconButton label="Wishlist" className="hidden sm:flex">
                  <Heart size={17} strokeWidth={1.5} />
                </IconButton>
                <IconButton
                  label="Cart"
                  badge={cartCount}
                  className="hidden sm:flex"
                >
                  <ShoppingBag size={17} strokeWidth={1.5} />
                </IconButton>
                <div className="hidden sm:flex items-center ml-1">
                  <LanguageSwitcher lang={lang} setLang={setLang} />
                </div>
                <span className="hidden lg:block w-px h-5 bg-emerald-100 mx-2" />
                {authContent}
                <button
                  className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 ml-1"
                  aria-label="Open menu"
                  onClick={() => setMenuOpen(true)}
                >
                  <Menu size={20} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>

      <MobileDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeLink={activeLink}
        setActiveLink={() => {}}
        lang={lang}
        setLang={setLang}
        cartCount={cartCount}
        onOpenLogin={() => setLoginOpen(true)}
      />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <div className="h-26 lg:h-25" aria-hidden="true" />
    </>
  );
}
