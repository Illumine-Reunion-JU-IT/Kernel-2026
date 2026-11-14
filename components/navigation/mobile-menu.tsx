"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { navLinks } from "./nav-links";
import { siteContent } from "@/lib/content";
import { cn } from "@/lib/utils";
import { JuLogo, KernelLogo } from "@/components/brand/logos";
import { scrollToElement } from "@/lib/scroll";

/** Full-screen mobile menu: accessible, clear contrast, smooth animations */
export function MobileMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();

    const items = panel.current?.querySelectorAll("[data-nav-item]");
    if (items && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(
        items,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.04,
          ease: "power2.out",
          clearProps: "transform,opacity",
        }
      );
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        toggle.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const f = [...panel.current.querySelectorAll<HTMLElement>("a,button")].concat(
        toggle.current ? [toggle.current] : []
      );
      const first = f[0],
        last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
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

  return (
    <>
      {/* Hamburger Toggle Button */}
      <button
        ref={toggle}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((prev) => !prev)}
        className="relative z-[80] grid h-11 w-11 place-items-center rounded-lg border border-sand/20 bg-void/80 p-2 text-sand transition-colors hover:border-signal hover:text-signal lg:hidden"
      >
        <span className="relative block h-4 w-6" aria-hidden>
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

      {/* Full-Screen Drawer */}
      <div
        id="mobile-menu"
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed inset-0 z-[75] flex flex-col justify-between overflow-y-auto bg-[#07050a]/98 px-6 pb-8 pt-24 backdrop-blur-2xl transition-all duration-300 lg:hidden",
          open
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 -translate-y-4"
        )}
      >
        {/* Subtle decorative glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 top-20 h-64 w-64 rounded-full bg-signal/15 blur-3xl"
        />

        {/* Header / Brand strip in mobile menu */}
        <div className="relative mb-6 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <JuLogo className="h-7 w-7 ring-1 ring-sand/30" />
            <span aria-hidden className="h-6 w-px bg-sand/30" />
            <KernelLogo className="h-8" />
          </div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-signal">
            KERNEL 1.0 // 2026
          </span>
        </div>

        {/* Clean, readable route list */}
        <nav aria-label="Mobile Navigation" className="relative flex-1">
          <ul className="divide-y divide-white/10">
            {navLinks.map((link, i) => {
              const isSection = link.href.includes("#");
              const active = isSection
                ? false
                : pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href + "/"));

              return (
                <li key={link.href} className="py-1">
                  <Link
                    data-nav-item
                    href={link.href}
                    scroll={!isSection}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group flex items-center justify-between py-2.5 text-sand transition-all hover:text-signal",
                      active ? "text-signal font-bold" : "text-sand"
                    )}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs font-bold text-signal/70 group-hover:text-signal">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="display text-2xl tracking-wide group-hover:translate-x-1.5 transition-transform duration-200">
                        {link.label}
                      </span>
                    </div>

                    <span
                      aria-hidden
                      className={cn(
                        "font-mono text-xs transition-transform duration-200",
                        active ? "text-signal translate-x-0" : "text-sand/40 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                      )}
                    >
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Area with Email & Details */}
        <div className="relative mt-8 space-y-4 border-t border-white/10 pt-5">
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
    </>
  );
}
