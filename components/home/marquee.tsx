"use client";
import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";

/** Looping brochure verbs; scroll velocity skews the strip so it feels physically pushed. */
export function Marquee({ items }: { items: string[] }) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const setSkew = gsap.quickTo(wrap.current, "skewX", { duration: 0.4, ease: "power3" });
      const st = ScrollTrigger.create({
        onUpdate: (self) => setSkew(gsap.utils.clamp(-14, 14, self.getVelocity() / -140))
      });
      return () => st.kill();
    });
    return () => mm.revert();
  }, []);

  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <li key={t + i} className="flex items-center">
          <span className={`display px-6 text-[clamp(2.4rem,7vw,6rem)] ${i % 2 ? "outline-text text-sand" : "text-void"}`}>{t}</span>
          <span aria-hidden className="h-[0.9em] w-3 -skew-x-[20deg] bg-void/80 text-[clamp(2.4rem,7vw,6rem)]" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative -my-[1px] overflow-hidden bg-signal py-5 [clip-path:polygon(0_12%,100%_0,100%_88%,0_100%)]">
      <div ref={wrap} className="flex w-max animate-[marquee_28s_linear_infinite] motion-reduce:animate-none">
        {row(false)}{row(true)}
      </div>
    </div>
  );
}
