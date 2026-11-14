import { registerGsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Calculates the exact scroll position in pixels for an element,
 * accurately taking into account all GSAP ScrollTrigger pin spacers above it.
 */
export function getScrollOffset(target: HTMLElement, offsetTop = 72): number {
  registerGsap();
  ScrollTrigger.refresh();
  const st = ScrollTrigger.create({
    trigger: target,
    start: `top ${offsetTop}px`,
  });
  const pos = st.start;
  st.kill();
  return pos;
}

/**
 * Smoothly scrolls to an element using Lenis if available or native smooth scroll,
 * resolving the exact pinned position.
 */
export function scrollToElement(target: HTMLElement, offsetTop = 72, duration = 1.2): number {
  const pos = getScrollOffset(target, offsetTop);
  if (typeof window !== "undefined" && window.__lenis) {
    window.__lenis.scrollTo(pos, { duration });
  } else if (typeof window !== "undefined") {
    window.scrollTo({ top: pos, behavior: "smooth" });
  }
  return pos;
}
