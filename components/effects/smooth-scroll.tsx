"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import { scrollToElement } from "@/lib/scroll";

declare global {
  interface Window { __lenis?: Lenis }
}

/** Lenis smooth scroll wired into GSAP's ticker so ScrollTrigger stays in sync. */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    registerGsap();
    if (typeof window !== "undefined") {
      history.scrollRestoration = "manual";
    }
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.085, anchors: false });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  /* Handle in-page section scrolling without exposing URL slugs / hashes */
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (pathname === "/") {
      let targetId: string | null = null;
      try {
        targetId = sessionStorage.getItem("kernel_scroll_target");
        if (targetId) {
          sessionStorage.removeItem("kernel_scroll_target");
        }
      } catch {}

      if (!targetId && window.location.hash) {
        targetId = window.location.hash.replace(/^#/, "");
      }

      // Ensure URL stays clean as "/" without any hash slugs
      if (window.location.hash) {
        window.history.replaceState(null, "", "/");
      }

      if (targetId) {
        let timer: NodeJS.Timeout | null = null;
        let attempts = 0;

        const doScroll = () => {
          attempts++;
          const target = document.getElementById(targetId!);
          if (!target) {
            if (attempts < 25) timer = setTimeout(doScroll, 80);
            return;
          }

          scrollToElement(target, 72, 1.2);

          // Account for intervening pinned sections by validating and settling final offset
          setTimeout(() => {
            const afterRect = target.getBoundingClientRect();
            if (Math.abs(afterRect.top - 72) > 60) {
              scrollToElement(target, 72, 0.8);
            }
          }, 1300);
        };

        timer = setTimeout(doScroll, 120);
        return () => {
          if (timer) clearTimeout(timer);
        };
      } else {
        // Direct visit or reload on "/" without a target: ensure page resets to the top hero
        window.scrollTo(0, 0);
        window.__lenis?.scrollTo(0, { immediate: true });
      }
    }
  }, [pathname]);

  /* Listen for window hashchange events and normalize URL to clean path */
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash) {
        const target = document.getElementById(hash);
        if (target) {
          scrollToElement(target, 72, 1.2);
          setTimeout(() => {
            const afterRect = target.getBoundingClientRect();
            if (Math.abs(afterRect.top - 72) > 60) {
              scrollToElement(target, 72, 0.8);
            }
          }, 1300);
        }
        if (window.location.pathname === "/") {
          window.history.replaceState(null, "", "/");
        }
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return null;
}
