"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { navLinks } from "./nav-links";
import { siteContent } from "@/lib/content";
import { cn } from "@/lib/utils";
import { KernelLogo } from "@/components/brand/logos";
import { scrollToElement } from "@/lib/scroll";

/** Full-screen menu: focus-trapped, Esc to close, closes after navigation, labelled for screen readers. */
export function MobileMenu() {
  const pathname = usePathname();
  const router = useRouter();
  /* The menu is open only on the page where it was opened, so navigating closes it with no effect needed. */
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const panel = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpenPath(null), []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    const items = panel.current?.querySelectorAll("[data-item]");
    if (items && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(items, { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: 0.055, ease: "expo.out" });
    }
    panel.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { close(); toggle.current?.focus(); return; }
      if (e.key !== "Tab" || !panel.current) return;
      const f = [...panel.current.querySelectorAll<HTMLElement>("a,button")].concat(toggle.current ? [toggle.current] : []);
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.__lenis?.start();
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={toggle}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpenPath(open ? null : pathname)}
        className="relative z-[70] grid h-11 w-11 place-items-center lg:hidden"
      >
        <span className="relative block h-3.5 w-7" aria-hidden>
          <span className={cn("absolute left-0 h-[2px] w-full bg-sand transition-all duration-500 ease-snap", open ? "top-1.5 rotate-45" : "top-0")} />
          <span className={cn("absolute left-0 top-1.5 h-[2px] bg-signal transition-all duration-500 ease-snap", open ? "w-0 opacity-0" : "w-2/3")} />
          <span className={cn("absolute left-0 h-[2px] w-full bg-sand transition-all duration-500 ease-snap", open ? "top-1.5 -rotate-45" : "top-3")} />
        </span>
      </button>

      <div
        id="mobile-menu"
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        className="fixed inset-0 z-[65] overflow-y-auto bg-void px-6 pb-10 pt-28 lg:hidden"
      >
        <span aria-hidden className="pointer-events-none absolute bottom-0 right-[18%] top-0 w-[22vw] bg-signal/90 [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]" />
        <nav aria-label="Mobile" className="relative">
          <ul className="space-y-1">
            {navLinks.map((link, i) => (
              <li key={link.href} className="overflow-hidden">
                <Link
                  data-item
                  href={link.href}
                  scroll={!link.href.includes("#")}
                  onClick={(e) => {
                    close();
                    if (link.href.includes("#")) {
                      e.preventDefault();
                      const [targetPath, hash] = link.href.split("#");
                      const targetEl = hash ? document.getElementById(hash) : null;
                      if (targetEl && (hash === "contact" || pathname === (targetPath || "/"))) {
                        setTimeout(() => {
                          scrollToElement(targetEl, 72, 1.2);
                        }, 200);
                      } else if (hash) {
                        try {
                          sessionStorage.setItem("kernel_scroll_target", hash);
                        } catch {}
                        router.push(targetPath || "/");
                      }
                    }
                  }}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="display flex items-baseline gap-3 py-1 text-[clamp(2rem,10vw,3.4rem)] mix-blend-difference"
                >
                  <span className="font-mono text-xs not-italic [font-stretch:100%]">{String(i + 1).padStart(2, "0")}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <KernelLogo className="relative mt-10 h-20" />
        <p className="relative mt-4 font-mono text-xs text-sand-dim">
          {siteContent.department}, {siteContent.university}
        </p>
      </div>
    </>
  );
}
