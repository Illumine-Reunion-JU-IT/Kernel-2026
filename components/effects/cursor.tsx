"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Dot + ring cursor. Grows over interactive elements and shows a label via data-cursor="text". */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce || !ring.current || !dot.current) return;
    document.documentElement.classList.add("has-cursor");

    const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08 });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08 });
    gsap.set([ring.current, dot.current], { xPercent: -50, yPercent: -50, opacity: 0 });

    const move = (e: PointerEvent) => {
      rx(e.clientX); ry(e.clientY); dx(e.clientX); dy(e.clientY);
      gsap.to([ring.current, dot.current], { opacity: 1, duration: 0.2, overwrite: "auto" });
    };
    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("a,button,[data-cursor]");
      const text = el?.dataset.cursor;
      if (label.current) label.current.textContent = text && text !== "true" ? text : "";
      gsap.to(ring.current, {
        scale: el ? (text && text !== "true" ? 2.6 : 1.7) : 1,
        backgroundColor: el ? "rgba(255,45,45,0.9)" : "rgba(255,45,45,0)",
        duration: 0.35, ease: "power3.out"
      });
      gsap.to(dot.current, { scale: el ? 0 : 1, duration: 0.2 });
    };
    const leave = () => gsap.to([ring.current, dot.current], { opacity: 0, duration: 0.2 });
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    document.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <>
      <div ref={ring} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[90] grid h-10 opacity-0 w-10 place-items-center rounded-full border border-signal mix-blend-difference">
        <span ref={label} className="font-mono text-[6px] font-bold uppercase tracking-widest text-void" />
      </div>
      <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 opacity-0 w-1.5 rounded-full bg-signal" />
    </>
  );
}
