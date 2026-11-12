"use client";

import Link from "next/link";
import { NAV_LINKS, PRIVACY_LINK } from "./nav-links";

/**
 * Site-wide branded footer for KERNEL 1.0.
 * Includes university & department identification, centralized public page links,
 * confirmed privacy policy route, and accessible Back-to-top control.
 */
export default function Footer() {
  const handleScrollToTop = () => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <footer className="w-full border-t border-[var(--line)] bg-[#050505] text-[#B6B39F]">
      <div className="wrap py-8 md:py-10 flex flex-col gap-8">
        {/* Top row: Brand & Public Page Navigation */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[rgba(233,223,197,0.08)]">
          {/* Dual Brand Logos & Title */}
          <div className="flex items-center gap-3.5">
            <img
              src="/images/ju-seal.png"
              alt="Jadavpur University seal"
              className="w-[38px] h-[38px] rounded-full bg-white object-cover border border-[#E9DFC5]/40 flex-none"
            />
            <img
              src="/images/kernel-logo.png"
              alt="KERNEL logo"
              className="w-10 h-[34px] object-cover bg-black border border-[rgba(255,45,45,0.6)] flex-none"
            />
            <div>
              <span className="font-mono text-xs font-semibold tracking-wider text-[#EEE5D0] block">
                KERNEL 1.0
              </span>
              <span className="font-mono text-[10px] text-[#B6B39F] tracking-wide block">
                IT TECH FEST · JADAVPUR UNIVERSITY
              </span>
            </div>
          </div>

          {/* Site Navigation Links */}
          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-mono uppercase tracking-wider"
          >
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#c0cec7] hover:text-[#E9DFC5] transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77CFF] rounded-sm"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={PRIVACY_LINK.href}
              className="text-[#c0cec7] hover:text-[#E9DFC5] transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77CFF] rounded-sm"
            >
              {PRIVACY_LINK.label}
            </Link>
          </nav>
        </div>

        {/* Bottom row: Legal notice & Back to top button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px] tracking-wider text-[#B6B39F]">
          <div>
            © 2026 <strong className="text-[#E9DFC5] font-semibold">KERNEL 1.0</strong> · DEPT. OF INFORMATION TECHNOLOGY, JADAVPUR UNIVERSITY. ALL RIGHTS RESERVED.
          </div>

          <button
            type="button"
            onClick={handleScrollToTop}
            aria-label="Back to top of page"
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 border border-[var(--line)] text-[#EEE5D0] hover:text-[#E9DFC5] hover:border-[#E9DFC5] transition-all rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77CFF] cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
