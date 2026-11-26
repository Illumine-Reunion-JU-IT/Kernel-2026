"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Precision reticle + core dot cursor with tactile hover, click compression, and data-cursor badges. */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce || !ring.current || !dot.current) return;
    document.documentElement.classList.add("has-cursor");

    const rx = gsap.quickTo(ring.current, "x", { duration: 0.28, ease: "power3.out" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.28, ease: "power3.out" });
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.04, ease: "none" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.04, ease: "none" });
    gsap.set([ring.current, dot.current], { xPercent: -50, yPercent: -50, opacity: 0 });

    let activeScale = 1;

    const move = (e: PointerEvent) => {
      rx(e.clientX);
      ry(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
      const isInput = Boolean((e.target as HTMLElement | null)?.closest("input,textarea,select"));
      gsap.to([ring.current, dot.current], {
        opacity: isInput ? 0.2 : 1,
        duration: 0.18,
        overwrite: "auto",
      });
    };

    const over = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>("a,button,[role='button'],[data-cursor]");
      const text = el?.dataset.cursor;
      const hasLabel = Boolean(text && text !== "true");
      if (label.current) label.current.textContent = hasLabel ? text! : "";

      activeScale = el ? (hasLabel ? 2.15 : 1.45) : 1;
      gsap.to(ring.current, {
        scale: activeScale,
        borderColor: el ? "rgba(228, 9, 8, 0.95)" : "rgba(233, 223, 197, 0.65)",
        backgroundColor: hasLabel
          ? "rgba(228, 9, 8, 0.92)"
          : el
          ? "rgba(228, 9, 8, 0.14)"
          : "rgba(228, 9, 8, 0)",
        duration: 0.28,
        ease: "power3.out",
      });
      gsap.to(dot.current, {
        scale: hasLabel ? 0 : el ? 0.8 : 1,
        duration: 0.18,
      });
    };

    const down = () => {
      gsap.to(ring.current, { scale: activeScale * 0.82, duration: 0.1, ease: "power2.out" });
      gsap.to(dot.current, { scale: 1.35, duration: 0.1, ease: "power2.out" });
    };

    const up = () => {
      gsap.to(ring.current, { scale: activeScale, duration: 0.24, ease: "back.out(2)" });
      gsap.to(dot.current, { scale: activeScale > 1.8 ? 0 : activeScale > 1 ? 0.8 : 1, duration: 0.2 });
    };

    const leave = () => gsap.to([ring.current, dot.current], { opacity: 0, duration: 0.2 });

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[999] grid h-9 w-9 opacity-0 place-items-center rounded-full border border-sand/65 backdrop-blur-[1px]"
      >
        <span
          ref={label}
          className="font-mono text-[5px] font-bold uppercase tracking-[0.14em] text-white"
        />
      </div>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[999] h-2 w-2 opacity-0 rounded-full bg-signal shadow-[0_0_10px_rgba(228,9,8,0.85)] ring-1 ring-white/40"
      />
    </>
  );
}
