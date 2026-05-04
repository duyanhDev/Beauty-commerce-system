"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Globe,
  Heart,
  Leaf,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
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
}

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS: NavLinkItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories", hasDropdown: true },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const LANGUAGES: Language[] = [
  { value: "EN", label: "English", flag: "🇺🇸" },
  { value: "VI", label: "Tiếng Việt", flag: "🇻🇳" },
  { value: "JA", label: "日本語", flag: "🇯🇵" },
];

// ─── Fonts ────────────────────────────────────────────────────────────────────

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');`;

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo(): React.JSX.Element {
  return (
    <a href="/" className="flex items-center gap-3 group select-none shrink-0">
      <span className="relative flex items-center justify-center w-9 h-9 shrink-0">
        <span
          className="absolute inset-0 rounded-full border border-emerald-300/50
            bg-linear-to-br from-emerald-50 to-green-100
            group-hover:from-emerald-100 group-hover:to-green-200
            transition-all duration-500"
        />
        <Leaf
          size={16}
          strokeWidth={1.5}
          className="relative text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className="text-[9px] tracking-[0.3em] font-medium uppercase text-emerald-500/80
            group-hover:text-emerald-600 transition-colors duration-300"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          botanical · 2024
        </span>
        <span
          className="text-[22px] font-normal tracking-wide text-stone-800
            group-hover:text-stone-900 transition-colors duration-300"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Verdure
          <em className="not-italic text-emerald-600 font-normal">Lab</em>
        </span>
      </span>
    </a>
  );
}

// ─── Nav Link ─────────────────────────────────────────────────────────────────

function NavLink({ link, active, onClick }: NavLinkProps): React.JSX.Element {
  return (
    <a
      href={link.href}
      onClick={onClick}
      className={`
        relative flex items-center gap-0.5 text-[12px] tracking-[0.12em] uppercase
        transition-all duration-300 group py-1 shrink-0
        ${
          active
            ? "text-emerald-700 font-medium"
            : "text-stone-500 hover:text-emerald-600 font-light"
        }
      `}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {link.label}
      {link.hasDropdown && (
        <ChevronDown
          size={11}
          className="opacity-50 group-hover:opacity-80 group-hover:translate-y-px transition-all duration-200"
        />
      )}
      {/* Animated underline */}
      <span
        className={`
          absolute -bottom-0.5 left-0 h-px rounded-full bg-emerald-500
          transition-all duration-300 ease-out
          ${active ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-50"}
        `}
      />
    </a>
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
      className={`
        relative flex items-center justify-center w-9 h-9 rounded-full
        text-stone-500 hover:text-emerald-700 hover:bg-emerald-50/80
        active:scale-95 transition-all duration-200
        ${className}
      `}
    >
      {children}
      {badge !== undefined && badge > 0 && (
        <span
          className="absolute -top-0.5 -right-0.5 flex items-center justify-center
            min-w-4 h-4 px-0.5 rounded-full
            bg-linear-to-br from-emerald-500 to-green-600
            text-white text-[9px] font-bold leading-none
            shadow-sm shadow-emerald-200"
        >
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
  const current: Language =
    LANGUAGES.find((l) => l.value === lang) ?? LANGUAGES[0];

  return (
    <Select value={lang} onValueChange={setLang}>
      <SelectTrigger
        className="
          h-8 w-auto gap-1 pl-2 pr-2 rounded-full
          border border-emerald-200/60 bg-emerald-50/40 backdrop-blur-sm
          text-[11px] font-medium tracking-[0.06em] text-stone-500
          hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700
          focus:ring-1 focus:ring-emerald-200 focus:ring-offset-0
          transition-all duration-200 shadow-none
          [&>svg]:w-3 [&>svg]:h-3 [&>svg]:text-emerald-400
        "
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <Globe size={12} className="text-emerald-400 shrink-0" />
        <SelectValue>
          <span className="flex items-center gap-1">
            <span className="text-sm leading-none">{current.flag}</span>
            <span className="tracking-wider">{current.value}</span>
          </span>
        </SelectValue>
      </SelectTrigger>

      <SelectContent
        className="
          min-w-40 rounded-2xl
          border border-emerald-100/80
          bg-white/95 backdrop-blur-xl
          shadow-xl shadow-emerald-100/40
          p-1.5 mt-1
        "
      >
        {LANGUAGES.map((l) => (
          <SelectItem
            key={l.value}
            value={l.value}
            className="
              rounded-xl px-3 py-2.5 text-[13px] font-light text-stone-600
              cursor-pointer select-none
              hover:bg-emerald-50 hover:text-emerald-700
              focus:bg-emerald-50 focus:text-emerald-700
              data-[state=checked]:bg-emerald-50/80 data-[state=checked]:text-emerald-600
              transition-colors duration-150
            "
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
      className="h-8 w-full flex items-center justify-center
       bg-linear-to-br from-emerald-800 via-green-700 to-emerald-800
        text-white/90 text-[10.5px] tracking-[0.2em] font-light uppercase"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <Leaf size={9} className="mr-2 opacity-60" fill="currentColor" />
      Free shipping on orders over $50 · 100% natural ingredients
      <Leaf size={9} className="ml-2 opacity-60" fill="currentColor" />
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
}: MobileDrawerProps): React.JSX.Element {
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        onClose();
      }
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

  return (
    <>
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-40 transition-all duration-400
          bg-stone-900/20 backdrop-blur-[2px]
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      <aside
        ref={drawerRef}
        className={`
          fixed top-0 right-0 h-full w-80 z-50 flex flex-col
          bg-white/98 backdrop-blur-xl
          shadow-2xl shadow-stone-900/10
          transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Decorative top accent */}
        <div className="h-1 w-fullbg-linear-to-br from-emerald-400 via-green-500 to-emerald-600" />

        <div className="flex items-center justify-between px-7 py-6">
          <Logo />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-full text-stone-400 hover:text-emerald-600
              hover:bg-emerald-50 transition-all duration-200 -mr-1"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="mx-7 h-pxbg-linear-to-br from-transparent via-emerald-200 to-transparent" />

        <nav className="flex-1 flex flex-col px-5 py-8 gap-1 overflow-y-auto">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                setActiveLink(link.label);
                onClose();
              }}
              className={`
                flex items-center justify-between px-4 py-3.5 rounded-2xl
                text-[12px] tracking-widest uppercase
                transition-all duration-200
                ${
                  activeLink === link.label
                    ? "bg-linear-to-r from-emerald-50 to-green-50/60 text-emerald-700 font-medium border border-emerald-100"
                    : "text-stone-500 hover:bg-stone-50/80 hover:text-stone-700 font-light"
                }
              `}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`w-5 text-[10px] font-light
                    ${activeLink === link.label ? "text-emerald-400" : "text-stone-300"}`}
                >
                  0{i + 1}
                </span>
                {link.label}
              </span>
              {activeLink === link.label && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              )}
            </a>
          ))}
        </nav>

        <div className="px-7 py-6 space-y-5">
          <div className="h-pxbg-linear-to-br from-transparent via-emerald-100 to-transparent" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IconButton label="Search" className="border border-stone-100">
                <Search size={16} strokeWidth={1.5} />
              </IconButton>
              <IconButton label="Wishlist" className="border border-stone-100">
                <Heart size={16} strokeWidth={1.5} />
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

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export default function Navbar(): React.JSX.Element {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [lang, setLang] = useState<string>("EN");
  const [cartCount] = useState<number>(3);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>("Home");
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{FONTS}</style>

      <div className="fixed top-0 inset-x-0 z-30 flex flex-col">
        {/* Announcement bar */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out
            ${scrolled ? "max-h-0 opacity-0" : "max-h-8 opacity-100"}`}
        >
          <AnnouncementBar />
        </div>

        {/* Header */}
        <header
          className={`
            transition-all duration-500
            ${
              scrolled
                ? "bg-white/94 backdrop-blur-xl shadow-[0_1px_40px_0_rgba(0,0,0,0.06)] py-3 border-b border-emerald-100/40"
                : "bg-white/80 backdrop-blur-md border-b border-emerald-100/60 py-4"
            }
          `}
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="flex items-center gap-6">
              {/* Logo */}
              <Logo />

              {/* Desktop nav */}
              <nav
                className="hidden lg:flex items-center gap-10 flex-1 justify-center"
                aria-label="Main navigation"
              >
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.label}
                    link={link}
                    active={activeLink === link.label}
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      e.preventDefault();
                      setActiveLink(link.label);
                    }}
                  />
                ))}
              </nav>

              {/* Right actions */}
              <div className="flex items-center gap-1 ml-auto lg:ml-0">
                {/* Expandable search */}
                <div className="hidden sm:flex items-center">
                  {searchOpen ? (
                    <div
                      className="flex items-center gap-2 bg-emerald-50/60 rounded-full
                        px-3.5 h-9 border border-emerald-200"
                    >
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
                        className="w-36 bg-transparent text-[13px] text-stone-600
                          placeholder:text-stone-300 outline-none"
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

                <IconButton label="Account" className="hidden sm:flex">
                  <User size={17} strokeWidth={1.5} />
                </IconButton>

                <IconButton
                  label="Cart"
                  badge={cartCount}
                  className="hidden sm:flex"
                >
                  <ShoppingBag size={17} strokeWidth={1.5} />
                </IconButton>

                {/* Divider */}
                <span className="hidden lg:block w-px h-5 bg-emerald-100 mx-1.5" />

                <div className="hidden sm:block">
                  <LanguageSwitcher lang={lang} setLang={setLang} />
                </div>

                {/* Hamburger */}
                <button
                  className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full
                    text-stone-500 hover:text-emerald-700 hover:bg-emerald-50
                    transition-all duration-200 ml-1"
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
        setActiveLink={setActiveLink}
        lang={lang}
        setLang={setLang}
        cartCount={cartCount}
      />

      {/* Page spacer */}
      <div className="h-26 lg:h-25" aria-hidden="true" />
    </>
  );
}
