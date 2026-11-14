"use client";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
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
  const diskWrapRef = useRef<HTMLDivElement>(null);

  const [failed, setFailed] = useState(!siteContent.videoUrl);
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const [restartCount, setRestartCount] = useState(0);

  const lastTimeRef = useRef(0);
  const restartTimerRef = useRef<NodeJS.Timeout | null>(null);

  const triggerRestart = useCallback(() => {
    setIsRestarting(true);
    setRestartCount((c) => c + 1);

    // Tactile needle bounce on the gramophone disk wrapper
    if (diskWrapRef.current) {
      gsap.killTweensOf(diskWrapRef.current);
      gsap.timeline()
        .to(diskWrapRef.current, {
          scale: 1.14,
          duration: 0.12,
          ease: "power2.out",
        })
        .to(diskWrapRef.current, {
          scale: 1,
          duration: 0.7,
          ease: "elastic.out(1.15, 0.4)",
        });
    }

    if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
    restartTimerRef.current = setTimeout(() => {
      setIsRestarting(false);
    }, 1200);
  }, []);

  const togglePlay = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      void v.play().then(() => setIsPlaying(true)).catch(() => undefined);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const restartVideo = () => {
    const v = video.current;
    if (!v) return;
    v.currentTime = 0;
    triggerRestart();
    if (v.paused) {
      void v.play().then(() => setIsPlaying(true)).catch(() => undefined);
    }
  };

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;
    const vid = video.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Only play while on screen: saves battery and data on phones.
    let io: IntersectionObserver | undefined;
    if (vid && !reduce) {
      io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          void vid.play().then(() => setIsPlaying(true)).catch(() => undefined);
        } else {
          vid.pause();
          setIsPlaying(false);
        }
      }, { threshold: 0.25 });
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

  // Synchronize playback events and loop detection
  useEffect(() => {
    const vid = video.current;
    if (!vid) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      triggerRestart();
    };

    const handleTimeUpdate = () => {
      const cur = vid.currentTime;
      // Loop restart detection:
      // When currentTime was > 1.5s and suddenly drops to < 0.6s
      if (lastTimeRef.current > 1.5 && cur < 0.6) {
        triggerRestart();
      }
      lastTimeRef.current = cur;
    };

    const handleSeeked = () => {
      if (vid.currentTime < 0.4 && lastTimeRef.current > 1.5) {
        triggerRestart();
      }
    };

    vid.addEventListener("play", handlePlay);
    vid.addEventListener("playing", handlePlay);
    vid.addEventListener("pause", handlePause);
    vid.addEventListener("ended", handleEnded);
    vid.addEventListener("timeupdate", handleTimeUpdate);
    vid.addEventListener("seeked", handleSeeked);

    // Initial check in case autoplay started before listeners attached
    if (!vid.paused && !vid.ended && vid.readyState > 2) {
      setIsPlaying(true);
    }

    return () => {
      vid.removeEventListener("play", handlePlay);
      vid.removeEventListener("playing", handlePlay);
      vid.removeEventListener("pause", handlePause);
      vid.removeEventListener("ended", handleEnded);
      vid.removeEventListener("timeupdate", handleTimeUpdate);
      vid.removeEventListener("seeked", handleSeeked);
      if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
    };
  }, [triggerRestart]);

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

          {/* Video Player */}
          <div data-vbox className="absolute left-1/2 z-20 -translate-x-1/2 [perspective:1200px]" style={{ width: "var(--vw)", top: "calc(var(--top) + var(--pv))" }}>
            <div
              ref={tilt}
              onClick={togglePlay}
              className="relative cursor-pointer overflow-hidden bg-void shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] [transform-style:preserve-3d]"
              style={{ height: "var(--vh)" }}
              title={isPlaying ? "Click to pause video" : "Click to play video"}
            >
              {failed ? (
                <>
                  <Image src={siteContent.videoPoster} alt="" fill sizes="30vw" className="object-cover" />
                  <div className="absolute inset-0 grid place-items-center bg-void/60 p-4 text-center"><p className="mono-label text-sand">Aftermovie<br />coming soon</p></div>
                </>
              ) : (
                <video
                  ref={video}
                  className="h-full w-full object-cover"
                  src={siteContent.videoUrl!}
                  poster={siteContent.videoPoster}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onError={() => setFailed(true)}
                  aria-label="KERNEL aftermovie"
                />
              )}
              <span aria-hidden className="absolute left-3 top-3 flex items-center gap-2 bg-void/75 px-2.5 py-1 text-[11px] font-bold text-sand backdrop-blur">
                <span className={`h-2 w-2 rounded-full ${isPlaying ? "bg-signal [animation:blink_1.2s_steps(1)_infinite]" : "bg-amber-500"}`} />
                {isPlaying ? "REC" : "PAUSED"}
              </span>
              {!failed && (
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); restartVideo(); }}
                    title="Restart video from 0:00"
                    className="bg-void/80 px-2.5 py-2 text-[11px] font-bold text-sand backdrop-blur hover:bg-signal hover:text-void transition-colors"
                  >
                    ⟳ Restart
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); toggleSound(); }}
                    aria-pressed={!muted}
                    className="bg-void/80 px-3 py-2 text-[11px] font-bold text-sand backdrop-blur hover:bg-signal hover:text-void transition-colors"
                  >
                    {muted ? "Sound off" : "Sound on"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Title crossing the column, like the poster wordmark */}
          <p data-vtitle aria-hidden className="display pointer-events-none absolute left-1/2 z-30 -translate-x-1/2 -rotate-[5deg] whitespace-nowrap text-[11.5cqw] text-sand [text-shadow:0_0_0_#050308,3px_3px_0_#050308] max-md:text-[13cqw]" style={{ top: "calc(var(--top) - 9cqw)" }}>Aftermovie</p>

          {/* Gramophone Vinyl Record Disk */}
          <div
            ref={diskWrapRef}
            onClick={togglePlay}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); togglePlay(); } }}
            title={isPlaying ? "Click disk to pause aftermovie" : "Click disk to play aftermovie"}
            aria-label={isPlaying ? "Gramophone disk spinning. Click to pause." : "Gramophone disk paused. Click to play."}
            className={`group absolute z-30 flex cursor-pointer select-none items-center justify-center transition-shadow duration-300 ${
              isRestarting
                ? "shadow-[0_0_35px_rgba(230,40,23,0.9)]"
                : "hover:shadow-[0_0_25px_rgba(230,40,23,0.35)]"
            }`}
            style={{
              width: "18cqw",
              height: "18cqw",
              minWidth: "140px",
              minHeight: "140px",
              maxWidth: "220px",
              maxHeight: "220px",
              left: "calc(50% + var(--sw) / 2 - 6.5cqw)",
              top: "calc(var(--top) + var(--vh) * 0.60)",
            }}
          >
            {/* Acoustic Shockwave Ripple Rings (Emitted from spindle on loop restart) */}
            {isRestarting && (
              <>
                <div
                  key={`pulse-1-${restartCount}`}
                  className="pointer-events-none absolute inset-0 -m-3 rounded-full border-2 border-signal shadow-[0_0_20px_rgba(230,40,23,0.95)] animate-[acoustic-pulse_0.85s_ease-out_forwards]"
                />
                <div
                  key={`pulse-2-${restartCount}`}
                  className="pointer-events-none absolute inset-0 -m-6 rounded-full border border-sand/70 animate-[acoustic-pulse_0.85s_ease-out_0.15s_forwards]"
                />
              </>
            )}

            {/* Responsive Status HUD Pill */}
            {isRestarting ? (
              <div className="pointer-events-none absolute -top-8 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-signal px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider text-void shadow-[0_0_20px_rgba(230,40,23,1)] animate-bounce">
                <span className="text-[11px] font-black">⟳</span> RESTART 0:00
              </div>
            ) : isPlaying ? (
              <div className="pointer-events-none absolute -top-7 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-signal/40 bg-void/90 px-2.5 py-0.5 font-mono text-[9px] font-bold tracking-wider text-sand shadow-[0_4px_12px_rgba(0,0,0,0.6)] backdrop-blur transition-opacity group-hover:border-signal">
                <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" /> PLAYING
              </div>
            ) : (
              <div className="pointer-events-none absolute -top-7 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-sand/20 bg-void/90 px-2 py-0.5 font-mono text-[9px] font-bold tracking-wider text-sand/75 shadow-[0_4px_12px_rgba(0,0,0,0.6)] backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> PAUSED · CLICK TO PLAY
              </div>
            )}

            {/* Spinning Gramophone Vinyl Disc Container */}
            <div
              className="relative h-full w-full rounded-full shadow-[0_15px_35px_-5px_rgba(0,0,0,0.9)]"
              style={{
                animation: "vinyl-spin 3.2s linear infinite",
                animationPlayState: isPlaying ? "running" : "paused",
              }}
            >
              <svg viewBox="0 0 240 240" className="h-full w-full select-none" aria-hidden>
                <defs>
                  {/* Brass Spindle Grommet Gradient */}
                  <linearGradient id="brassGrommet" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f7e4a1" />
                    <stop offset="35%" stopColor="#b48c35" />
                    <stop offset="65%" stopColor="#ffd980" />
                    <stop offset="100%" stopColor="#5d4514" />
                  </linearGradient>

                  {/* Crimson Center Label Gradient */}
                  <radialGradient id="labelGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f03828" />
                    <stop offset="65%" stopColor="#cf2012" />
                    <stop offset="100%" stopColor="#8c1208" />
                  </radialGradient>

                  {/* Vinyl Outer Edge Bevel Gradient */}
                  <radialGradient id="vinylRim" cx="50%" cy="50%" r="50%">
                    <stop offset="85%" stopColor="#08080a" />
                    <stop offset="97%" stopColor="#1a1a22" />
                    <stop offset="100%" stopColor="#30303c" />
                  </radialGradient>

                  {/* Circular text path for track title */}
                  <path
                    id="vinylTrackPath"
                    d="M120 120 m-86 0 a86 86 0 1 1 172 0 a86 86 0 1 1 -172 0"
                  />
                </defs>

                {/* Outer Vinyl LP Body */}
                <circle cx="120" cy="120" r="118" fill="url(#vinylRim)" stroke="#3a3a46" strokeWidth="1.2" />
                <circle cx="120" cy="120" r="115" fill="#09090c" />

                {/* Concentric Sound Microgrooves */}
                {/* Lead-in groove */}
                <circle cx="120" cy="120" r="113" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
                <circle cx="120" cy="120" r="110" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />

                {/* Outer Groove Band */}
                <circle cx="120" cy="120" r="106" fill="none" stroke="rgba(0,0,0,0.85)" strokeWidth="0.8" />
                <circle cx="120" cy="120" r="103" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                <circle cx="120" cy="120" r="99" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                <circle cx="120" cy="120" r="95" fill="none" stroke="rgba(0,0,0,0.9)" strokeWidth="0.7" />
                <circle cx="120" cy="120" r="91" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />

                {/* Track Gap Band */}
                <circle cx="120" cy="120" r="82" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />

                {/* Inner Groove Band */}
                <circle cx="120" cy="120" r="77" fill="none" stroke="rgba(0,0,0,0.85)" strokeWidth="0.7" />
                <circle cx="120" cy="120" r="73" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                <circle cx="120" cy="120" r="69" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.4" />
                <circle cx="120" cy="120" r="65" fill="none" stroke="rgba(0,0,0,0.75)" strokeWidth="0.6" />
                <circle cx="120" cy="120" r="61" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                <circle cx="120" cy="120" r="57" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="0.4" />

                {/* Run-out Dead Wax Zone */}
                <circle cx="120" cy="120" r="52" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" strokeDasharray="6 4" />
                <circle cx="120" cy="120" r="47" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                <circle cx="120" cy="120" r="43" fill="none" stroke="rgba(0,0,0,0.95)" strokeWidth="0.8" />
                <circle cx="120" cy="120" r="40" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.7" />

                {/* Curving Vinyl Track Typography */}
                <text
                  className="fill-sand text-[8.5px] font-bold tracking-[0.24em] uppercase"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  <textPath href="#vinylTrackPath">
                    KERNEL AFTERMOVIE ✦ 2026 ✦ STEREO ✦{" "}
                  </textPath>
                </text>

                {/* Center Paper Gramophone Label (Red Crimson) */}
                <circle cx="120" cy="120" r="38" fill="url(#labelGrad)" stroke="#f5ede0" strokeOpacity="0.45" strokeWidth="0.8" />
                <circle cx="120" cy="120" r="35" fill="none" stroke="#f5ede0" strokeOpacity="0.35" strokeWidth="0.5" />
                <circle cx="120" cy="120" r="23" fill="none" stroke="#f5ede0" strokeOpacity="0.25" strokeWidth="0.5" strokeDasharray="3 1.5" />

                {/* Center Label Text */}
                <text x="120" y="103" fill="#f5ede0" fontSize="7" fontWeight="900" textAnchor="middle" letterSpacing="0.08em" style={{ fontFamily: "var(--font-mono)" }}>
                  KERNEL
                </text>
                <text x="120" y="111" fill="#f5ede0" fontSize="4.2" fontWeight="700" textAnchor="middle" letterSpacing="0.06em" opacity="0.9" style={{ fontFamily: "var(--font-mono)" }}>
                  &apos;26 JU IT
                </text>
                <text x="120" y="132" fill="#f5ede0" fontSize="4" fontWeight="700" textAnchor="middle" letterSpacing="0.12em" opacity="0.9" style={{ fontFamily: "var(--font-mono)" }}>
                  SIDE A
                </text>
                <text x="120" y="138" fill="#f5ede0" fontSize="3.2" fontWeight="600" textAnchor="middle" letterSpacing="0.08em" opacity="0.75" style={{ fontFamily: "var(--font-mono)" }}>
                  STEREO
                </text>

                {/* Center Spindle Grommet & Hole */}
                <circle cx="120" cy="120" r="9" fill="url(#brassGrommet)" stroke="rgba(255,255,255,0.8)" strokeWidth="0.6" />
                <circle cx="120" cy="120" r="4.5" fill="#050308" stroke="#161616" strokeWidth="0.6" />
              </svg>

              {/* Vinyl Specular Reflection Sheen (Dual-cone vinyl reflection overlay) */}
              <div
                className="pointer-events-none absolute inset-0 rounded-full mix-blend-screen opacity-70"
                style={{
                  background:
                    "conic-gradient(from 45deg, transparent 0deg, rgba(255,255,255,0.06) 30deg, rgba(255,255,255,0.18) 45deg, rgba(255,255,255,0.06) 60deg, transparent 90deg, transparent 180deg, rgba(255,255,255,0.06) 210deg, rgba(255,255,255,0.18) 225deg, rgba(255,255,255,0.06) 240deg, transparent 270deg, transparent 360deg)",
                }}
              />

              {/* Loop Restart Red Flash Effect */}
              {isRestarting && (
                <div className="pointer-events-none absolute inset-0 rounded-full bg-signal/30 mix-blend-screen animate-pulse" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
