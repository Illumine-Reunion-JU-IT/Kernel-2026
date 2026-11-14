"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gallery } from "@/lib/content";
import { gsap, registerGsap } from "@/lib/gsap";

const teaserIds = ["jugs-13", "ccjusl-07", "acm-08"];
const frames = teaserIds.map((id) => gallery.find((item) => item.id === id)).filter((item) => item !== undefined);

/** A small cut of the club archive between the lineup and speaker reveal. */
export function GalleryTeaser() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el.querySelectorAll("[data-teaser-frame]"),
        { y: 32, rotate: (i) => [-7, 4, 9][i] ?? 0, opacity: 0 },
        { y: 0, rotate: (i) => [-6, 3, 7][i] ?? 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 82%", once: true } }
      );
      gsap.to(el.querySelector("[data-teaser-orbit]"), {
        rotate: 55,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} aria-labelledby="gallery-teaser-title" className="relative overflow-hidden border-y border-sand/10 bg-forest/55 py-12 md:py-16">
      <div aria-hidden className="halftone absolute inset-y-0 left-0 w-1/2 opacity-20" />
      <div className="container relative grid items-center gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="mono-label text-[10px] text-sand-dim"><span className="slashes" />A little after the credits</p>
          <h2 id="gallery-teaser-title" className="display mt-5 max-w-3xl text-[clamp(2.5rem,6.4vw,5.7rem)]">The moments <span className="outline-text text-sand/80">between.</span></h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-sand-dim md:text-base">Three clubs. A lot of things worth remembering. Step into the hand-picked frames from campus events.</p>
          <Link href="/gallery" className="kbtn kbtn-secondary mt-7 !px-5 !py-4 !text-[10px]" data-cursor="Gallery">
            <span className="kbtn-label">Visit the club gallery <span aria-hidden>↗</span></span>
          </Link>
        </div>

        <div className="relative mx-auto h-48 w-full max-w-md md:col-span-5 md:h-56">
          <span data-teaser-orbit aria-hidden className="absolute left-[35%] top-1/2 aspect-square w-48 -translate-y-1/2 rounded-full border border-signal/60 md:w-56" />
          {frames.map((frame, index) => (
            <Link
              key={frame.id}
              href="/gallery"
              aria-label={`Open gallery featuring ${frame.clubName}`}
              data-teaser-frame
              className={`absolute top-1/2 aspect-[4/3] w-[44%] -translate-y-1/2 overflow-hidden border-[5px] border-sand bg-void shadow-2xl transition-transform duration-500 hover:z-20 hover:scale-105 ${index === 0 ? "left-[2%] z-[3]" : index === 1 ? "left-[29%] z-[2]" : "left-[56%] z-[1]"}`}
              style={{ rotate: `${[-6, 3, 7][index]}deg` }}
            >
              <Image src={frame.imagePath} alt="" fill sizes="(min-width: 768px) 18vw, 40vw" className="object-cover" />
              <span className="absolute bottom-0 inset-x-0 bg-void/80 px-2 py-1 font-mono text-[8px] font-bold tracking-[0.14em] text-sand">{frame.clubName} / 2026</span>
            </Link>
          ))}
          <span aria-hidden className="absolute right-0 top-0 z-10 font-mono text-[9px] tracking-[0.2em] text-signal">CONTACT SHEET / 03</span>
        </div>
      </div>
    </section>
  );
}
