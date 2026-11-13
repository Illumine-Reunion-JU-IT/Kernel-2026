"use client";
import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { siteContent } from "@/lib/content";
import { isConfirmed } from "@/lib/utils";
import { BAR, POSTER } from "@/lib/poster";
import { Button } from "@/components/ui/button";

const SLICES = 12;
const poster = { backgroundImage: `url(${POSTER.src})` };

function introDelay() {
  return typeof window !== "undefined" && window.__booting ? 2.5 : 0.1;
}

function Details() {
  const { eventDates, venue } = siteContent;
  const known = isConfirmed(eventDates) && isConfirmed(venue);
  return (
    <div className="text-sm leading-relaxed text-sand md:text-base">
      {known ? (<><p className="font-semibold">{eventDates}</p><p className="text-sand-dim">{venue}</p></>) : (<><p className="font-semibold">Details to be announced</p><p className="text-sand-dim">Dates and venue appear here once confirmed.</p></>)}
    </div>
  );
}

/**
 * The poster assembles from twelve glitch slices, then scroll tears it apart while the red column
 * floods the whole screen. That red hands straight over to the "What is KERNEL" section.
 */
export function HeroSection() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const flood = useRef<HTMLDivElement>(null);
  const url = siteContent.registrationUrl;

  useEffect(() => {
    registerGsap();
    const el = root.current, st = stage.current;
    if (!el || !st) return;
    const mm = gsap.matchMedia();
    mm.add({ motion: "(prefers-reduced-motion: no-preference)", fine: "(hover: hover) and (pointer: fine)" }, (ctx) => {
      const { motion, fine } = ctx.conditions as { motion: boolean; fine: boolean };
      if (!motion) return;
      const cleanups: Array<() => void> = [];
      const slices = gsap.utils.toArray<HTMLElement>("[data-slice]");
      const d = introDelay();

      // 1. Intro: slices fly in from alternating sides and lock together.
      gsap.from(slices, { x: (i) => (i % 2 ? 1 : -1) * gsap.utils.random(45, 95) + "vw", opacity: 0, duration: 1.3, ease: "expo.out", stagger: { each: 0.05, from: "random" }, delay: d });
      gsap.from("[data-line]", { yPercent: 115, duration: 1.2, ease: "expo.out", stagger: 0.09, delay: d + 0.5 });
      gsap.from("[data-fade]", { opacity: 0, y: 24, duration: 1, stagger: 0.1, delay: d + 0.9 });

      // 2. Ghost layers: RGB-style split that kicks with pointer movement and scroll speed.
      const gx = gsap.quickTo("[data-ghost-a]", "x", { duration: 0.5, ease: "power3" });
      const gy = gsap.quickTo("[data-ghost-b]", "x", { duration: 0.5, ease: "power3" });
      const kick = (amount: number) => {
        gx(amount); gy(-amount);
        gsap.to("[data-ghost]", { opacity: Math.min(0.55, Math.abs(amount) / 28), duration: 0.15, overwrite: true });
        gsap.to("[data-ghost]", { opacity: 0, duration: 0.8, delay: 0.15 });
        gsap.delayedCall(0.2, () => { gx(0); gy(0); });
      };
      if (fine) {
        const rx = gsap.quickTo(st, "rotationX", { duration: 0.8, ease: "power3" });
        const ry = gsap.quickTo(st, "rotationY", { duration: 0.8, ease: "power3" });
        const move = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5, ny = e.clientY / window.innerHeight - 0.5;
          ry(nx * 14); rx(-ny * 10);
          if (Math.abs(e.movementX) > 14) kick(gsap.utils.clamp(-34, 34, e.movementX * 1.2));
        };
        window.addEventListener("pointermove", move);
        cleanups.push(() => window.removeEventListener("pointermove", move));
      }
      const vel = ScrollTrigger.create({ trigger: el, start: "top top", end: "bottom top", onUpdate: (s) => { const v = s.getVelocity(); if (Math.abs(v) > 900) kick(gsap.utils.clamp(-30, 30, v / 90)); } });
      cleanups.push(() => vel.kill());

      // 3. Pinned scroll: tear apart, then the red column floods the screen.
      const floodEl = flood.current, bar = barRef.current;
      const paint = (f: number) => {
        if (!floodEl || !bar) return;
        const r = bar.getBoundingClientRect(), vw = window.innerWidth, vh = window.innerHeight;
        const L = r.left * (1 - f), T = r.top * (1 - f), R = (vw - r.right) * (1 - f), B = (vh - r.bottom) * (1 - f);
        floodEl.style.clipPath = `inset(${T}px ${R}px ${B}px ${L}px)`;
        floodEl.style.opacity = String(Math.min(1, f * 14));
      };
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el, start: "top top", end: "+=260%", scrub: 0.7, pin: true, anticipatePin: 1,
          onUpdate: (self) => paint(gsap.utils.clamp(0, 1, (self.progress - 0.45) / 0.4)),
          onLeave: () => paint(1), onLeaveBack: () => paint(0)
        }
      });
      tl.to("[data-copy]", { yPercent: -30, opacity: 0, ease: "power2.in", duration: 0.2 }, 0)
        .to("[data-bgtext]", { xPercent: -40, duration: 1 }, 0)
        .to(st, { scale: 1.55, transformOrigin: "50% 42%", duration: 0.85, ease: "power1.in" }, 0.05)
        // First a small glitch shift that keeps the poster readable...
        .to(slices, { x: (i) => (i % 2 ? 1 : -1) * (1.2 + (i % 4) * 1.1) + "vw", duration: 0.3, ease: "power2.out" }, 0.05)
        // ...then the slices fly off while the red column floods the screen.
        .to(slices, { x: (i) => (i % 2 ? 1 : -1) * (55 + (i % 4) * 14) + "vw", duration: 0.45, ease: "power2.in", stagger: { each: 0.012, from: "center" } }, 0.42)
        .to("[data-hint]", { opacity: 0, duration: 0.08 }, 0.03);
      return () => cleanups.forEach((fn) => fn());
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative h-[100svh] min-h-[600px] overflow-hidden bg-void">
      <div aria-hidden className="halftone absolute -left-10 bottom-0 h-3/4 w-[60vw] opacity-50 md:w-[45vw]" />
      <div data-bgtext aria-hidden className="display absolute left-[-6vw] top-[38%] hidden -translate-y-1/2 select-none whitespace-nowrap text-[34vw] text-transparent [-webkit-text-stroke:1.5px_rgba(233,223,197,0.2)] md:block">KERNEL KERNEL</div>

      {/* Poster stage */}
      <div className="absolute inset-x-0 top-[76px] flex justify-center md:inset-y-0 md:top-0 md:items-center [perspective:1400px]">
        <div ref={stage} className="relative aspect-[2/3] h-[min(52svh,112vw)] [transform-style:preserve-3d] md:mt-6 md:h-[86vh]">
          {["a", "b"].map((k) => (
            <div key={k} {...{ [`data-ghost-${k}`]: true }} data-ghost aria-hidden className={`absolute inset-0 bg-cover opacity-0 mix-blend-screen ${k === "a" ? "[filter:grayscale(1)_sepia(1)_saturate(8)_hue-rotate(-50deg)]" : "[filter:grayscale(1)_brightness(1.5)]"}`} style={poster} />
          ))}
          <div role="img" aria-label={siteContent.heroImageAlt} className="absolute inset-0 flex flex-col">
            {Array.from({ length: SLICES }, (_, i) => (
              <div key={i} data-slice className="will-change-transform" style={{ ...poster, height: `calc(${100 / SLICES}% + 1px)`, marginBottom: -1, backgroundSize: `100% ${SLICES * 100}%`, backgroundPosition: `0 ${(i / (SLICES - 1)) * 100}%` }} />
            ))}
          </div>
          <div ref={barRef} aria-hidden className="pointer-events-none absolute" style={{ left: `${BAR.x1 * 100}%`, width: `${(BAR.x2 - BAR.x1) * 100}%`, top: `${BAR.y1 * 100}%`, height: `${(BAR.y2 - BAR.y1) * 100}%` }} />
        </div>
      </div>

      {/* Copy: sits below the poster on phones (on solid black, so it stays legible), flanks it on desktop */}
      <div data-copy className="absolute inset-x-5 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-10 md:inset-x-[4vw] md:bottom-[8vh] md:flex md:items-end md:justify-between">
        <div className="md:max-w-[38vw]">
          <p data-fade className="mono-label text-sand max-md:text-[0.7rem]"><span className="slashes" />{siteContent.department}</p>
          <h1 id="hero-title" className="display mt-3 text-[clamp(1.9rem,8.4vw,2.6rem)] text-sand md:mt-4 md:text-[clamp(2rem,3.7vw,3.6rem)]">
            <span className="sr-only">KERNEL 1.0. </span>
            {["The event that", "powers ideas"].map((r) => (<span key={r} className="block overflow-hidden pb-[0.08em]"><span data-line className="block">{r}</span></span>))}
          </h1>
        </div>
        <div data-fade className="mt-4 space-y-4 md:mt-0 md:flex md:flex-col md:items-end md:text-right">
          <Details />
          <div className="flex flex-wrap gap-3 md:justify-end max-md:[&_.kbtn]:!px-4 max-md:[&_.kbtn]:!py-3 max-md:[&_.kbtn]:!text-[0.7rem]">
            {url ? <Button href={url} external>Register</Button> : <Button disabled>Registration opens soon</Button>}
            <Button href="/events" variant="secondary">See the events</Button>
          </div>
        </div>
      </div>

      <div ref={flood} aria-hidden className="pointer-events-none absolute inset-0 z-20 bg-signal opacity-0 [clip-path:inset(50%)]" />
      <div data-hint aria-hidden className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-3 text-[11px] tracking-widest text-sand md:flex">
        Scroll
        <span className="relative block h-10 w-px bg-sand/30"><span className="absolute left-0 top-0 h-4 w-px animate-[hint_1.8s_ease-in-out_infinite] bg-signal" /></span>
      </div>
    </section>
  );
}
