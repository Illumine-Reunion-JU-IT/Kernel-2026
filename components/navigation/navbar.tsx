"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, REGISTRATION_URL } from "./nav-links";
import MobileMenu from "./mobile-menu";

/**
 * Site-wide navigation header for KERNEL 1.0.
 * Includes department bar, university branding, centralized public page links,
 * active route indication, accessible focus indicators, and mobile menu trigger.
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu automatically on route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="relative w-full z-40">
      {/* Accessible Skip Navigation Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#E9DFC5] focus:text-[#0B241A] focus:font-mono focus:text-xs focus:font-bold focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#B77CFF]"
      >
        Skip to main content
      </a>

      {/* Top accent line */}
      <div className="topline" aria-hidden="true" />

      {/* Department bar */}
      <div className="deptbar">
        <div className="wrap">
          <span>Jadavpur University · Department of Information Technology</span>
          <span>
            <b>●</b> IT Tech Fest presents KERNEL 1.0
          </span>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="border-b border-[var(--line)] bg-[#0B241A]/95 backdrop-blur-sm">
        <div className="wrap nav flex items-center justify-between">
          {/* Brand logo area */}
          <Link
            href="/"
            onClick={closeMenu}
            className="brand flex items-center gap-3 font-bold tracking-tight text-xl text-[#EEE5D0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77CFF] rounded-sm py-1"
            aria-label="KERNEL 1.0 — Return to Homepage"
          >
            <span className="brand-logos flex items-center gap-3.5">
              <img
                className="ju-seal w-11 h-11 rounded-full bg-white object-cover border-2 border-[#E9DFC5] flex-none"
                src="/images/ju-seal.png"
                alt="Jadavpur University seal"
              />
              <span className="brand-sep w-px h-[34px] bg-[var(--line)]" aria-hidden="true" />
              <img
                className="k-mark w-[46px] h-10 object-cover bg-black border border-[rgba(255,45,45,0.7)] flex-none"
                src="/images/kernel-logo.png"
                alt="KERNEL logo"
              />
            </span>
            <span>
              KERNEL{" "}
              <small className="block text-[#B6B39F] font-mono text-[10px] tracking-[0.16em] mt-0.5 font-normal">
                IT TECH FEST · JADAVPUR UNIVERSITY
              </small>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-5 xl:gap-7"
          >
            {NAV_LINKS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`font-mono text-xs uppercase tracking-wider py-1.5 px-0.5 transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77CFF] rounded-sm ${
                    isActive
                      ? "text-[#E9DFC5] font-semibold"
                      : "text-[#c0cec7] hover:text-[#B77CFF]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E9DFC5]"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Optional Registration CTA (renders only when authoritative URL is configured) */}
          {REGISTRATION_URL ? (
            <a
              href={REGISTRATION_URL}
              className="nav-cta hidden lg:inline-flex items-center gap-2.5 px-4 py-2.5 border border-[#E9DFC5] text-[#0B241A] bg-[#E9DFC5] font-mono font-medium text-xs tracking-wider uppercase hover:bg-transparent hover:text-[#E9DFC5] transition-all rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77CFF]"
            >
              Register <span>↗</span>
            </a>
          ) : null}

          {/* Mobile menu trigger */}
          <button
            id="mobile-menu-trigger"
            type="button"
            className="menu !block lg:!hidden font-mono text-xs text-[#EEE5D0] border border-[var(--line)] px-3 py-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77CFF] hover:border-[#E9DFC5] transition-colors"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={toggleMenu}
          >
            {isMenuOpen ? "CLOSE −" : "MENU +"}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Drawer / Disclosure */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        activePath={pathname}
      />
    </header>
  );
}
