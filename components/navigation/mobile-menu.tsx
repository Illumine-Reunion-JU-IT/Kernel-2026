"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { NAV_LINKS, REGISTRATION_URL } from "./nav-links";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activePath: string;
}

/**
 * Accessible mobile navigation drawer / disclosure for KERNEL 1.0.
 * Supports keyboard navigation (Escape to close, focus return, visible focus rings)
 * and responsive scaling down to 320px viewport without overflow.
 */
export default function MobileMenu({
  isOpen,
  onClose,
  activePath,
}: MobileMenuProps) {
  const menuRef = useRef<HTMLElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Keyboard navigation: Escape key listener and focus management
  useEffect(() => {
    if (!isOpen) return;

    // Move focus to first navigation item when opened
    const timer = setTimeout(() => {
      firstLinkRef.current?.focus();
    }, 50);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        // Return focus to menu trigger button
        const trigger = document.getElementById("mobile-menu-trigger");
        trigger?.focus();
        return;
      }

      // Trap focus within mobile menu while open
      if (event.key === "Tab" && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <nav
      ref={menuRef}
      id="mobile-navigation"
      aria-label="Mobile Navigation"
      className="lg:hidden w-full border-b border-[rgba(233,223,197,0.17)] bg-[#102D21] px-4 py-5 shadow-2xl transition-all"
    >
      <div className="mx-auto flex max-w-[1160px] flex-col gap-1">
        <div className="pb-2 text-[10px] uppercase font-mono tracking-widest text-[#B6B39F] border-b border-[rgba(233,223,197,0.1)]">
          {"// Navigation Index"}
        </div>

        <ul className="flex flex-col divide-y divide-[rgba(233,223,197,0.08)]">
          {NAV_LINKS.map((item, index) => {
            const isActive =
              item.href === "/"
                ? activePath === "/"
                : activePath === item.href ||
                  activePath.startsWith(`${item.href}/`);

            return (
              <li key={item.href}>
                <Link
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive ? "page" : undefined}
                  className={`group flex items-center justify-between min-h-[44px] py-3 px-2 font-mono text-[13px] uppercase tracking-wider transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77CFF] focus-visible:ring-offset-1 focus-visible:ring-offset-[#102D21] ${
                    isActive
                      ? "text-[#E9DFC5] font-semibold bg-[rgba(233,223,197,0.06)]"
                      : "text-[#c0cec7] hover:text-[#B77CFF] hover:bg-[rgba(233,223,197,0.03)]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono ${
                        isActive ? "text-[#FF2D2D]" : "text-[#B6B39F]"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{item.label}</span>
                  </span>
                  <span
                    className={`text-[12px] transition-transform duration-150 group-hover:translate-x-0.5 ${
                      isActive ? "text-[#E9DFC5]" : "text-[#B6B39F]"
                    }`}
                  >
                    {isActive ? "●" : "→"}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Optional Registration CTA (renders only when authoritative URL is configured) */}
        {REGISTRATION_URL && (
          <div className="pt-3 mt-2 border-t border-[rgba(233,223,197,0.12)]">
            <a
              href={REGISTRATION_URL}
              onClick={onClose}
              className="flex items-center justify-center min-h-[44px] w-full px-4 py-3 bg-[#E9DFC5] text-[#0B241A] font-mono text-xs uppercase font-medium tracking-wider hover:bg-transparent hover:text-[#E9DFC5] border border-[#E9DFC5] transition-all rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77CFF]"
            >
              Register Interest ↗
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
