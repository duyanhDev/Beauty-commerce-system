"use client";
import { useEffect, useState } from "react";
import TopBar from "./TopBar";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import NavActions from "./NavActions";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <TopBar />
      <div className="navbar">
        <div className="navbar-inner">
          {/* Mobile: hamburger + logo + cart */}
          <div className="mobile-left">
            <MobileMenu />
          </div>

          <Logo />

          <NavMenu />

          <NavActions />
        </div>
      </div>
    </header>
  );
}
