"use client";
import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";

/** A slim red bar on the right edge, the poster's red column turned into a progress meter. */
export function ScrollRail() {
  const fill = useRef<HTMLDivElement>(null);
  useEffect(() => {
    registerGsap();
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => gsap.set(fill.current, { scaleY: self.progress })
    });
    return () => st.kill();
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed right-0 top-0 z-[60] hidden h-screen w-[3px] bg-sand/10 md:block">
      <div ref={fill} className="h-full w-full origin-top scale-y-0 bg-signal" />
    </div>
  );
}
