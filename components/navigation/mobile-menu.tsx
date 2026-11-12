"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./nav-links";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (isOpen) {
      firstLinkRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <div className="relative lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center border border-[#B6B39F]/40 text-[#EEE5D0] transition hover:border-[#B77CFF] hover:text-[#B77CFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77CFF]"
      >
        <span className="sr-only">
          {isOpen ? "Close menu" : "Open menu"}
        </span>

        <svg
          aria-hidden="true"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          {isOpen ? (
            <path d="M18 6 6 18M6 6l12 12" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="absolute right-0 top-[calc(100%+12px)] z-50 flex w-[min(280px,calc(100vw-40px))] flex-col border border-[#B6B39F]/30 bg-[#0B241A] p-3 shadow-2xl"
        >
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              ref={index === 0 ? firstLinkRef : undefined}
              href={link.href}
              onClick={closeMenu}
              aria-current={pathname === link.href ? "page" : undefined}
              className="border-b border-[#B6B39F]/10 px-4 py-3 font-mono text-xs tracking-wide text-[#EEE5D0] transition last:border-b-0 hover:bg-[#183F30] hover:text-[#B77CFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77CFF]"
            >
              {link.label}
              {pathname === link.href && (
                <span className="sr-only"> (current page)</span>
              )}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
