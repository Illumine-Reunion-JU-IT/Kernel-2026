"use client";
import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** "curtain" wipes the block open from the bottom edge; "slide" is a hard-edged mask slide for headings. */
  mode?: "curtain" | "slide";
  delay?: number;
  as?: "div" | "p" | "h2" | "h3" | "li";
}

/** Reduced-motion friendly reveal. Content is fully visible until JS runs and when motion is reduced. */
export function ScrollReveal({ children, className, mode = "curtain", delay = 0, as: Tag = "div" }: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const from = mode === "curtain"
        ? { clipPath: "inset(0 0 100% 0)", y: 40 }
        : { clipPath: "inset(0 100% 0 0)", x: -30 };
      gsap.fromTo(el, from, {
        clipPath: "inset(0 0 0% 0)", x: 0, y: 0, duration: 1.1, delay, ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true }
      });
    });
    return () => mm.revert();
  }, [mode, delay]);

  const Comp = Tag as React.ElementType;
  return <Comp ref={ref} className={className}>{children}</Comp>;
}
