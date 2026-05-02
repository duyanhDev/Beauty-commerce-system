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
  Sparkles,
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

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');`;

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo(): React.JSX.Element {
  return (
    <a href="/" className="flex items-center gap-3 group select-none shrink-0">
      <span className="relative flex items-center justify-center w-9 h-9 shrink-0">
        <span
          className="absolute inset-0 rounded-full border border-rose-300/60
            bg-gradient-to-br from-rose-50 to-pink-100
            group-hover:from-rose-100 group-hover:to-pink-200
            transition-all duration-500"
        />
        <Sparkles
          size={16}
          strokeWidth={1.5}
          className="relative text-rose-400 group-hover:text-rose-500 transition-colors duration-300"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className="text-[10px] tracking-[0.25em] font-medium uppercase text-rose-400/80
            group-hover:text-rose-500 transition-colors duration-300"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          est. 2024
        </span>
        <span
          className="text-[22px] font-light tracking-wide text-stone-800
            group-hover:text-stone-900 transition-colors duration-300"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Beauty<em className="not-italic text-rose-400 font-normal">Shop</em>
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
        relative flex items-center gap-0.5 text-[12.5px] tracking-[0.1em] uppercase
        transition-all duration-300 group py-1 shrink-0
        ${
          active
            ? "text-rose-500 font-medium"
            : "text-stone-500 hover:text-rose-400 font-light"
        }
      `}
      style={{ fontFamily: "'Jost', sans-serif" }}
    >
      {link.label}
      {link.hasDropdown && (
        <ChevronDown
          size={11}
          className="opacity-50 group-hover:opacity-80 group-hover:translate-y-px transition-all duration-200"
        />
      )}
      <span
        className={`
          absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-rose-400
          transition-all duration-300
          ${
            active
              ? "w-1 h-1 opacity-100"
              : "w-0 h-0 opacity-0 group-hover:w-1 group-hover:h-1 group-hover:opacity-60"
          }
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
        text-stone-500 hover:text-rose-500 hover:bg-rose-50/80
        active:scale-95 transition-all duration-200
        ${className}
      `}
    >
      {children}
      {badge !== undefined && badge > 0 && (
        <span
          className="absolute -top-0.5 -right-0.5 flex items-center justify-center
            min-w-[16px] h-4 px-0.5 rounded-full
            bg-gradient-to-br from-rose-400 to-pink-500
            text-white text-[9px] font-bold leading-none
            shadow-sm shadow-rose-200"
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
          border border-stone-200/80 bg-white/60 backdrop-blur-sm
          text-[11px] font-medium tracking-[0.06em] text-stone-500
          hover:bg-rose-50/80 hover:border-rose-200 hover:text-rose-500
          focus:ring-1 focus:ring-rose-200 focus:ring-offset-0
          transition-all duration-200 shadow-none
          [&>svg]:w-3 [&>svg]:h-3 [&>svg]:text-stone-400
        "
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        <Globe size={12} className="text-stone-400 shrink-0" />
        <SelectValue>
          <span className="flex items-center gap-1">
            <span className="text-sm leading-none">{current.flag}</span>
            <span className="tracking-wider">{current.value}</span>
          </span>
        </SelectValue>
      </SelectTrigger>

      <SelectContent
        className="
          min-w-[160px] rounded-2xl
          border border-rose-100/80
          bg-white/95 backdrop-blur-xl
          shadow-xl shadow-rose-100/40
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
              hover:bg-rose-50 hover:text-rose-600
              focus:bg-rose-50 focus:text-rose-600
              data-[state=checked]:bg-rose-50/80 data-[state=checked]:text-rose-500
              transition-colors duration-150
            "
            style={{ fontFamily: "'Jost', sans-serif" }}
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
        bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400
        text-white text-[11px] tracking-[0.18em] font-light uppercase"
      style={{ fontFamily: "'Jost', sans-serif" }}
    >
      <Heart size={9} className="mr-2 opacity-70" fill="currentColor" />
      Free shipping on orders over $50 · New arrivals every week
      <Heart size={9} className="ml-2 opacity-70" fill="currentColor" />
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
        <div className="flex items-center justify-between px-7 py-6">
          <Logo />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-full text-stone-400 hover:text-rose-400
              hover:bg-rose-50 transition-all duration-200 -mr-1"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="mx-7 h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent" />

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
                text-[12.5px] tracking-[0.08em] uppercase
                transition-all duration-200
                ${
                  activeLink === link.label
                    ? "bg-gradient-to-r from-rose-50 to-pink-50/60 text-rose-500 font-medium"
                    : "text-stone-500 hover:bg-stone-50/80 hover:text-stone-700 font-light"
                }
              `}
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`w-5 text-[10px] font-light
                    ${activeLink === link.label ? "text-rose-300" : "text-stone-300"}`}
                >
                  0{i + 1}
                </span>
                {link.label}
              </span>
              {activeLink === link.label && (
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              )}
            </a>
          ))}
        </nav>

        <div className="px-7 py-6 space-y-5">
          <div className="h-px bg-gradient-to-r from-transparent via-rose-100 to-transparent" />
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
            className="text-[11px] text-stone-300 tracking-[0.1em] text-center"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            © 2024 BeautyShop · All rights reserved
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
        {/* Announcement bar — collapses on scroll */}
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
                ? "bg-white/92 backdrop-blur-xl shadow-[0_1px_40px_0_rgba(0,0,0,0.06)] py-3"
                : "bg-white/75 backdrop-blur-md border-b border-stone-100/80 py-4"
            }
          `}
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="flex items-center gap-6">
              {/* Logo */}
              <Logo />

              {/* Desktop nav */}
              <nav
                className="hidden lg:flex items-center gap-9 flex-1 justify-center"
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
                      className="flex items-center gap-2 bg-stone-50/90 rounded-full
                        px-3.5 h-9 border border-stone-200"
                    >
                      <Search
                        size={14}
                        strokeWidth={1.5}
                        className="text-stone-400 shrink-0"
                      />
                      <input
                        autoFocus
                        type="text"
                        placeholder="Search products…"
                        onBlur={() => setSearchOpen(false)}
                        className="w-36 bg-transparent text-[13px] text-stone-600
                          placeholder:text-stone-300 outline-none"
                        style={{ fontFamily: "'Jost', sans-serif" }}
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

                <span className="hidden lg:block w-px h-5 bg-stone-200 mx-1.5" />

                <div className="hidden sm:block">
                  <LanguageSwitcher lang={lang} setLang={setLang} />
                </div>

                {/* Hamburger */}
                <button
                  className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full
                    text-stone-500 hover:text-rose-500 hover:bg-rose-50
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
      <div className="h-[104px] lg:h-[100px]" aria-hidden="true" />
    </>
  );
}
