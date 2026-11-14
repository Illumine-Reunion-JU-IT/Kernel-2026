"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { navLinks } from "./nav-links";
import { siteContent } from "@/lib/content";
import { cn } from "@/lib/utils";
import { JuLogo, KernelLogo } from "@/components/brand/logos";
import { scrollToElement } from "@/lib/scroll";

/** 
 * Mobile menu with React Portal to bypass header stacking context.
 * Guaranteed visible on all mobile viewports.
 */
export function MobileMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.__lenis?.start();
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    close();
    if (href.includes("#")) {
      e.preventDefault();
      const [targetPath, hash] = href.split("#");
      const targetEl = hash ? document.getElementById(hash) : null;
      if (targetEl && (hash === "contact" || pathname === (targetPath || "/"))) {
        setTimeout(() => {
          scrollToElement(targetEl, 72, 1.2);
        }, 150);
      } else if (hash) {
        try {
          sessionStorage.setItem("kernel_scroll_target", hash);
        } catch {}
        router.push(targetPath || "/");
      }
    }
  };

  const drawerContent = (
    <div
      id="mobile-nav-portal"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col justify-between bg-[#08050e] text-sand transition-opacity duration-300 overflow-y-auto px-6 py-6",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
      style={{
        minHeight: "100svh",
      }}
    >
      {/* Top Header inside Portal Drawer */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <JuLogo className="h-8 w-8 ring-1 ring-sand/30" />
          <span aria-hidden className="h-6 w-px bg-sand/30" />
          <KernelLogo className="h-9" />
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={close}
          aria-label="Close menu"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-sand/20 bg-void/80 text-sand hover:border-signal hover:text-signal transition-colors text-lg font-mono font-bold"
        >
          ✕
        </button>
      </div>

      {/* Navigation Routes List */}
      <nav aria-label="Mobile Routes" className="my-auto py-6">
        <ul className="flex flex-col space-y-1 divide-y divide-white/5">
          {navLinks.map((link, i) => {
            const isSection = link.href.includes("#");
            const active = isSection
              ? false
              : pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href + "/"));

            return (
              <li key={link.href} className="pt-2 pb-1">
                <Link
                  href={link.href}
                  scroll={!isSection}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between py-2 text-sand transition-all hover:text-signal group",
                    active ? "text-signal font-bold" : ""
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="font-mono text-xs font-bold text-signal/80 group-hover:text-signal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="display text-2xl sm:text-3xl tracking-wide group-hover:translate-x-1.5 transition-transform duration-200">
                      {link.label}
                    </span>
                  </div>
                  <span className="font-mono text-sm text-sand/40 group-hover:text-signal group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Area with Register CTA & Contact */}
      <div className="border-t border-white/10 pt-5 space-y-4">
        {siteContent.registrationUrl ? (
          <a
            href={siteContent.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="kbtn kbtn-primary w-full justify-center !py-3 text-xs"
          >
            Register Now
          </a>
        ) : (
          <div className="rounded border border-dashed border-white/15 bg-white/5 py-2.5 text-center font-mono text-[11px] font-bold uppercase tracking-wider text-sand-dim">
            Registration Opens Soon
          </div>
        )}

        <div className="flex flex-col gap-1 text-center font-mono text-[11px] text-sand-dim">
          <a
            href="mailto:kerneljuit@gmail.com"
            className="font-bold text-signal hover:underline"
          >
            kerneljuit@gmail.com
          </a>
          <span>{siteContent.department}, {siteContent.university}</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Hamburger Toggle Button in Navbar */}
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-portal"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((prev) => !prev)}
        className="relative z-50 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-lg border border-sand/20 bg-void/90 p-2 text-sand transition-all hover:border-signal hover:text-signal active:scale-95 lg:hidden"
      >
        <span className="relative block h-4 w-5" aria-hidden>
          <span
            className={cn(
              "absolute left-0 h-[2px] w-full bg-sand transition-all duration-300 ease-out",
              open ? "top-2 rotate-45 !bg-signal" : "top-0.5"
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-2 h-[2px] w-2/3 bg-signal transition-all duration-300 ease-out",
              open ? "opacity-0 -translate-x-2" : "opacity-100"
            )}
          />
          <span
            className={cn(
              "absolute left-0 h-[2px] w-full bg-sand transition-all duration-300 ease-out",
              open ? "top-2 -rotate-45 !bg-signal" : "top-3.5"
            )}
          />
        </span>
      </button>

      {/* Render drawer directly into document.body to avoid header CSS transform containment */}
      {mounted && createPortal(drawerContent, document.body)}
    </>
  );
}
