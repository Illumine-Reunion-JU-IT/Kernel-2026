"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { KernelLogo } from "@/components/brand/logos";

declare global {
  interface Window { __booting?: boolean }
}

const LINES = ["loading ideas", "compiling competitions", "mounting community"];

/** One-time "boot sequence" on the first home visit of a session. The page underneath is fully rendered; this only covers it. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.location.pathname !== "/") return;
    let seen = false;
    try { seen = sessionStorage.getItem("kernel-boot") === "1"; } catch { /* storage blocked */ }
    let hasAnchor = false;
    try {
      hasAnchor = Boolean(sessionStorage.getItem("kernel_nav_anchor") || window.location.hash);
    } catch { /* storage blocked */ }

    if (seen || hasAnchor || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      try { sessionStorage.setItem("kernel-boot", "1"); } catch {}
      return;
    }
    try { sessionStorage.setItem("kernel-boot", "1"); } catch { /* storage blocked */ }

    window.__booting = true;
    el.hidden = false;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();

    const num = el.querySelector("[data-count]");
    const o = { v: 0 };
    const finish = () => {
      el.hidden = true;
      document.body.style.overflow = "";
      window.__lenis?.start();
      window.__booting = false;
    };
    const tl = gsap.timeline({ onComplete: finish });
    tl.from("[data-logo]", { scale: 0.6, opacity: 0, duration: 0.9, ease: "expo.out" }, 0)
      .from("[data-line]", { opacity: 0, x: -24, stagger: 0.3, duration: 0.35 }, 0.25)
      .to(o, { v: 100, duration: 1.8, ease: "power2.inOut", onUpdate: () => { if (num) num.textContent = String(Math.round(o.v)).padStart(3, "0"); } }, 0)
      .to("[data-bar]", { scaleX: 1, duration: 1.8, ease: "power2.inOut" }, 0)
      .to("[data-content]", { opacity: 0, y: -30, duration: 0.35 }, 1.95)
      .to("[data-top]", { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, 2.15)
      .to("[data-bottom]", { yPercent: 100, duration: 0.9, ease: "expo.inOut" }, 2.15);

    return () => { tl.kill(); finish(); };
  }, []);

  return (
    <div ref={root} hidden aria-hidden className="fixed inset-0 z-[200]">
      <div data-top className="absolute inset-x-0 top-0 h-1/2 bg-void" />
      <div data-bottom className="absolute inset-x-0 bottom-0 h-1/2 bg-void" />
      <div data-content className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6">
        <div data-logo><KernelLogo priority className="h-40 md:h-52" /></div>
        <ul className="font-mono text-xs text-sand md:text-sm">
          {LINES.map((l) => (<li key={l} data-line className="py-0.5"><span className="font-bold text-signal">[ OK ]</span> {l}</li>))}
        </ul>
        <div className="absolute inset-x-6 bottom-8 md:inset-x-12">
          <p className="condensed text-[clamp(3rem,10vw,7rem)] leading-none text-sand"><span data-count>000</span><span className="text-signal">%</span></p>
          <div className="mt-3 h-[3px] w-full bg-sand/15"><div data-bar className="h-full origin-left scale-x-0 bg-signal" /></div>
        </div>
      </div>
    </div>
  );
}
