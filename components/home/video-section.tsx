"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { siteContent } from "@/lib/content";
import { CROPS, cropStyle } from "@/lib/poster";

/**
 * The aftermovie plays inside the poster's own red column, with the same collage pieces
 * (statue, building, crowd, rock) tucked behind it, so the video and the artwork read as one composition.
 * Replace public/videos/kernel-aftermovie.mp4 (9:16 portrait) to change it.
 */
export function VideoSection() {
  const root = useRef<HTMLElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(!siteContent.videoUrl);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;
    const vid = video.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Only play while on screen: saves battery and data on phones.
    let io: IntersectionObserver | undefined;
    if (vid && !reduce) {
      io = new IntersectionObserver(([e]) => { if (e.isIntersecting) void vid.play().catch(() => undefined); else vid.pause(); }, { threshold: 0.25 });
      io.observe(vid);
    }
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const sc = { trigger: "[data-stage]", start: "top 85%", end: "center 55%", scrub: 0.7 };
      const full = { trigger: "[data-stage]", start: "top bottom", end: "bottom top", scrub: true };
      gsap.fromTo("[data-vslab]", { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", ease: "none", scrollTrigger: sc });
      gsap.fromTo("[data-vbox]", { scale: 0.82, opacity: 0.3 }, { scale: 1, opacity: 1, ease: "none", scrollTrigger: sc });
      gsap.fromTo("[data-vtitle]", { xPercent: -30, opacity: 0 }, { xPercent: 0, opacity: 1, ease: "none", scrollTrigger: sc });
      const pieces: Array<[string, number, number]> = [["[data-p-statue]", -70, 90], ["[data-p-building]", 80, -50], ["[data-p-crowd]", -80, 70], ["[data-p-rock]", 70, 90]];
      pieces.forEach(([sel, x, y]) => {
        gsap.fromTo(sel, { x, y, opacity: 0 }, { x: 0, y: 0, opacity: 1, ease: "none", scrollTrigger: sc });
        gsap.fromTo(sel, { yPercent: 8 }, { yPercent: -8, ease: "none", scrollTrigger: full });
      });
      gsap.to("[data-badge]", { rotate: 360, ease: "none", scrollTrigger: full });
      gsap.from("[data-vhead] > *", { yPercent: 110, duration: 1.1, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: "[data-vhead]", start: "top 88%", once: true } });

      const t = tilt.current;
      if (t && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const rx = gsap.quickTo(t, "rotationX", { duration: 0.6, ease: "power3" });
        const ry = gsap.quickTo(t, "rotationY", { duration: 0.6, ease: "power3" });
        const move = (e: PointerEvent) => { const r = t.getBoundingClientRect(); ry(((e.clientX - r.left) / r.width - 0.5) * 12); rx(-((e.clientY - r.top) / r.height - 0.5) * 9); };
        const leave = () => { rx(0); ry(0); };
        t.addEventListener("pointermove", move);
        t.addEventListener("pointerleave", leave);
        return () => { t.removeEventListener("pointermove", move); t.removeEventListener("pointerleave", leave); };
      }
    });
    return () => { mm.revert(); io?.disconnect(); };
  }, []);

  const toggleSound = () => { const v = video.current; if (!v) return; v.muted = !v.muted; setMuted(v.muted); };
  const piece = "absolute z-10 grayscale-[0.15]";

  return (
    <section ref={root} id="video" aria-labelledby="video-title" className="relative overflow-hidden bg-void py-section">
      <div aria-hidden className="halftone absolute -left-10 top-1/3 h-2/3 w-[55vw] opacity-40" />
      <div className="container relative">
        <div data-vhead className="max-w-xl">
          <p className="mono-label mb-5 overflow-hidden text-sand"><span className="slashes block">Aftermovie</span></p>
          <h2 id="video-title" className="display overflow-hidden pb-[0.08em] text-[clamp(3rem,9vw,7.4rem)]">See it move</h2>
          <p className="mt-6 overflow-hidden text-lg text-sand md:text-xl">Fifty-plus events, one campus, thousands of people. A minute of what KERNEL feels like from the floor.</p>
        </div>
      </div>

      <div className="vwrap mt-6 md:mt-0" data-stage>
        <div className="vstage">
          {/* The red column: same shape language as the poster */}
          <div data-vslab aria-hidden className="absolute left-1/2 z-0 -translate-x-1/2 bg-signal" style={{ width: "var(--sw)", top: "var(--top)", height: "calc(var(--vh) + 2 * var(--pv))" }} />

          {/* Collage pieces, cut from the poster and tucked behind the video */}
          <div data-p-statue aria-hidden className={`${piece} shard-b`} style={{ ...cropStyle(CROPS.statue), width: "38cqw", right: "calc(50% + var(--sw) / 2 - 7cqw)", top: "calc(var(--top) + var(--vh) * 0.28)" }} />
          <div data-p-building aria-hidden className={`${piece} shard-a`} style={{ ...cropStyle(CROPS.building), width: "30cqw", left: "calc(50% + var(--sw) / 2 - 6cqw)", top: "calc(var(--top) + 2cqw)" }} />
          <div data-p-crowd aria-hidden className={`${piece} shard-b`} style={{ ...cropStyle(CROPS.crowd), width: "42cqw", right: "calc(50% + var(--sw) / 2 - 5cqw)", bottom: "1cqw" }} />
          <div data-p-rock aria-hidden className={piece} style={{ ...cropStyle(CROPS.rock), width: "24cqw", left: "calc(50% + var(--sw) / 2 - 5cqw)", bottom: "0" }} />

          {/* Video */}
          <div data-vbox className="absolute left-1/2 z-20 -translate-x-1/2 [perspective:1200px]" style={{ width: "var(--vw)", top: "calc(var(--top) + var(--pv))" }}>
            <div ref={tilt} className="relative overflow-hidden bg-void shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] [transform-style:preserve-3d]" style={{ height: "var(--vh)" }}>
              {failed ? (
                <>
                  <Image src={siteContent.videoPoster} alt="" fill sizes="30vw" className="object-cover" />
                  <div className="absolute inset-0 grid place-items-center bg-void/60 p-4 text-center"><p className="mono-label text-sand">Aftermovie<br />coming soon</p></div>
                </>
              ) : (
                <video ref={video} className="h-full w-full object-cover" src={siteContent.videoUrl!} poster={siteContent.videoPoster} muted loop playsInline preload="metadata" onError={() => setFailed(true)} aria-label="KERNEL aftermovie" />
              )}
              <span aria-hidden className="absolute left-3 top-3 flex items-center gap-2 bg-void/70 px-2 py-1 text-[11px] font-bold text-sand backdrop-blur"><span className="h-2 w-2 rounded-full bg-signal [animation:blink_1.2s_steps(1)_infinite]" />REC</span>
              {!failed && (
                <button type="button" onClick={toggleSound} aria-pressed={!muted} className="absolute bottom-3 right-3 bg-void/80 px-3 py-2 text-[11px] font-bold text-sand backdrop-blur hover:bg-signal hover:text-void">{muted ? "Sound off" : "Sound on"}</button>
              )}
            </div>
          </div>

          {/* Title crossing the column, like the poster wordmark */}
          <p data-vtitle aria-hidden className="display pointer-events-none absolute left-1/2 z-30 -translate-x-1/2 -rotate-[5deg] whitespace-nowrap text-[11.5cqw] text-sand [text-shadow:0_0_0_#050308,3px_3px_0_#050308] max-md:text-[13cqw]" style={{ top: "calc(var(--top) - 9cqw)" }}>Aftermovie</p>

          <svg data-badge aria-hidden viewBox="0 0 120 120" className="absolute z-30 h-[16cqw] w-[16cqw] text-sand" style={{ left: "calc(50% + var(--sw) / 2 - 6cqw)", top: "calc(var(--top) + var(--vh) * 0.62)" }}>
            <defs><path id="vring" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" /></defs>
            <circle cx="60" cy="60" r="58" className="fill-void" />
            <text className="fill-current text-[10.5px] font-bold tracking-[0.18em]" style={{ fontFamily: "var(--font-mono)" }}><textPath href="#vring">KERNEL AFTERMOVIE ✦ 2026 ✦ </textPath></text>
            <circle cx="60" cy="60" r="9" className="fill-signal" />
          </svg>
        </div>
      </div>
    </section>
  );
}
