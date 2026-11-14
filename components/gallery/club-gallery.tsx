"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gallery } from "@/lib/content";
import { galleryClubs } from "@/data/gallery-clubs";
import { gsap, registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const accentText = { signal: "text-signal", volt: "text-volt", sand: "text-sand" };
const accentWash = { signal: "bg-signal", volt: "bg-volt", sand: "bg-sand" };
const subscribeToNothing = () => () => {};
const getBrowserSnapshot = () => true;
const getServerSnapshot = () => false;

function wrapDelta(index: number, active: number, length: number) {
  let delta = index - active;
  if (delta > length / 2) delta -= length;
  if (delta < -length / 2) delta += length;
  return delta;
}

export function ClubGallery() {
  const [activeClubId, setActiveClubId] = useState(galleryClubs[0].id);
  const [activeFrame, setActiveFrame] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [pointerInsideStage, setPointerInsideStage] = useState(false);
  const portalReady = useSyncExternalStore(subscribeToNothing, getBrowserSnapshot, getServerSnapshot);
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const lightbox = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const lightboxTrigger = useRef<HTMLButtonElement | null>(null);
  const activeIndex = galleryClubs.findIndex((club) => club.id === activeClubId);
  const activeClub = galleryClubs[activeIndex] ?? galleryClubs[0];
  const activeItems = gallery.filter((item) => item.clubId === activeClub.id && !item.isPlaceholder);
  const current = activeItems[activeFrame] ?? activeItems[0];
  const count = activeItems.length;

  const step = useCallback((delta: number) => {
    if (!count) return;
    setActiveFrame((index) => (index + delta + count) % count);
  }, [count]);

  useEffect(() => {
    if (!autoplayEnabled || pointerInsideStage || lightboxOpen || count < 2) return;
    const timer = window.setInterval(() => step(1), 1000);
    return () => window.clearInterval(timer);
  }, [activeClubId, activeFrame, autoplayEnabled, count, lightboxOpen, pointerInsideStage, step]);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(el.querySelectorAll("[data-gallery-reveal]"),
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: "expo.out", clearProps: "transform,opacity", scrollTrigger: { trigger: el, start: "top 82%", once: true } }
      );
      const ghost = el.querySelector<HTMLElement>("[data-gallery-ghost]");
      if (ghost) gsap.to(ghost, { xPercent: -9, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    });
    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const priorFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lightbox.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setLightboxOpen(false); }
      if (event.key === "ArrowRight") { event.preventDefault(); step(1); }
      if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      priorFocus?.focus?.();
    };
  }, [lightboxOpen, step]);

  useEffect(() => {
    if (lightboxOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (!root.current?.contains(target) || target?.closest('[role="tablist"]')) return;
      if (target?.matches("input, textarea, select, [contenteditable='true']")) return;
      if (event.key === "ArrowRight") { event.preventDefault(); step(1); }
      if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, step]);

  const moveTab = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % galleryClubs.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + galleryClubs.length) % galleryClubs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = galleryClubs.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    setActiveClubId(galleryClubs[nextIndex].id);
    setActiveFrame(0);
    tabRefs.current[nextIndex]?.focus();
  };

  const selectClub = (clubId: string) => { setActiveClubId(clubId); setActiveFrame(0); };
  const beginDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragStart.current = { x: event.clientX, y: event.clientY };
    suppressClick.current = false;
  };
  const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStart.current) return;
    const dx = event.clientX - dragStart.current.x;
    const dy = event.clientY - dragStart.current.y;
    if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.15) {
      suppressClick.current = true;
      step(dx < 0 ? 1 : -1);
    }
    dragStart.current = null;
  };

  const openLightbox = (index: number, trigger: HTMLButtonElement) => {
    if (suppressClick.current) { suppressClick.current = false; return; }
    lightboxTrigger.current = trigger;
    setActiveFrame(index);
    setLightboxOpen(true);
  };

  return (
    <section ref={root} aria-labelledby="gallery-title" className="relative isolate overflow-hidden bg-void pb-20 pt-[calc(var(--nav-h)+2rem)] md:pb-28 md:pt-[calc(var(--nav-h)+3rem)]">
      <div aria-hidden data-gallery-ghost className="display outline-text pointer-events-none absolute left-[16vw] top-16 -z-10 select-none whitespace-nowrap text-[25vw] text-sand/[0.055]">AFTERIMAGE / AFTERIMAGE</div>
      <div className="container relative">
        <div className="grid items-end gap-5 pb-7 md:grid-cols-[1fr_auto] md:gap-10 md:pb-9" data-gallery-reveal>
          <div>
            <p className="mono-label text-[10px] text-sand-dim"><span className="slashes" />KERNEL / club archive / 2026</p>
            <h1 id="gallery-title" className="display mt-5 text-[clamp(3.2rem,8.4vw,7.7rem)] leading-[0.82]">Still in <span className="text-signal">the frame.</span></h1>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-sand-dim md:pb-1 md:text-base">Forty-five selected moments from the clubs that make campus move. Drag, swipe, or use the arrows to move through the archive.</p>
        </div>

        <div className="sticky top-[var(--nav-h)] z-30 -mx-3 border-y border-sand/15 bg-void/90 px-3 backdrop-blur-xl md:mx-0 md:px-0">
          <div role="tablist" aria-label="Choose a club archive" className="archive-tabs flex overflow-x-auto">
            {galleryClubs.map((club, index) => {
              const selected = club.id === activeClub.id;
              return <button key={club.id} ref={(node) => { tabRefs.current[index] = node; }} type="button" role="tab" id={`club-tab-${club.id}`} aria-selected={selected} aria-controls="club-gallery-panel" tabIndex={selected ? 0 : -1} onClick={() => selectClub(club.id)} onKeyDown={(event) => moveTab(event, index)} className={cn("group relative flex min-w-max items-center gap-3 px-5 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] transition-colors md:px-8", selected ? accentText[club.accent] : "text-sand-dim hover:text-sand")}>
                <span aria-hidden className="text-[10px] opacity-60">0{index + 1}</span>{club.name}
                <span aria-hidden className={cn("absolute inset-x-5 bottom-0 h-[2px] origin-left transition-transform duration-500 ease-snap md:inset-x-8", accentWash[club.accent], selected ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100")} />
              </button>;
            })}
            <span aria-hidden className="ml-auto hidden items-center pr-2 font-mono text-[10px] uppercase tracking-[0.15em] text-sand-dim/60 md:flex">03 clubs / 45 frames</span>
          </div>
        </div>

        <div id="club-gallery-panel" role="tabpanel" aria-labelledby={`club-tab-${activeClub.id}`} tabIndex={-1} className="outline-none">
          <div className="flex flex-wrap items-end justify-between gap-4 py-6 md:py-7" data-gallery-reveal>
            <div>
              <p className={cn("mono-label text-[10px]", accentText[activeClub.accent])}>Selected moments / 0{activeIndex + 1}</p>
              <h2 className="display mt-2 text-3xl md:text-5xl">{activeClub.name}</h2>
              <p className="mt-2 text-sm text-sand-dim">{activeClub.descriptor}</p>
            </div>
          </div>

          {current && <>
            <div className="mb-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.17em] text-sand-dim" data-gallery-reveal>
              <span className={accentText[activeClub.accent]}>Club archive / {activeClub.name}</span>
              <span>{String(activeFrame + 1).padStart(2,"0")} <span className="text-sand/35">/</span> {String(count).padStart(2,"0")}</span>
            </div>

            <div ref={stage} role="region" aria-label={`${activeClub.name} image coverflow. Use left and right arrow keys to browse.`} tabIndex={0} className="coverflow-stage relative h-[390px] overflow-hidden outline-none focus-visible:ring-1 focus-visible:ring-sand/30 sm:h-[470px] lg:h-[570px]" onPointerEnter={() => setPointerInsideStage(true)} onPointerLeave={() => setPointerInsideStage(false)} onFocus={() => setPointerInsideStage(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPointerInsideStage(false); }} onPointerDown={beginDrag} onPointerUp={finishDrag} onPointerCancel={() => { dragStart.current = null; }} data-gallery-reveal>
              <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[62%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-signal/10 blur-[90px]" />
              {activeItems.map((item, index) => {
                const distance = wrapDelta(index, activeFrame, count);
                const abs = Math.abs(distance);
                const visible = abs <= 2;
                const rotation = distance === 0 ? 0 : distance < 0 ? 22 : -22;
                const scale = distance === 0 ? 1 : abs === 1 ? 0.82 : 0.68;
                const depth = distance === 0 ? 55 : abs === 1 ? -30 : -115;
                return <button key={item.id} ref={distance === 0 ? (node) => { if (node) lightboxTrigger.current = node; } : undefined} type="button" aria-label={`Open image ${index + 1} of ${count}: ${item.title}`} aria-current={distance === 0 ? "true" : undefined} onClick={(event) => openLightbox(index, event.currentTarget)} className={cn("coverflow-card absolute left-1/2 top-1/2 block aspect-[4/3] w-[80vw] max-w-[520px] overflow-hidden rounded-sm bg-forest text-left outline-none focus-visible:ring-2 focus-visible:ring-sand", distance === 0 ? "cursor-zoom-in" : "cursor-pointer")} style={{ zIndex: 20 - abs, opacity: visible ? (abs === 2 ? 0.52 : 1) : 0, visibility: visible ? "visible" : "hidden", pointerEvents: visible ? "auto" : "none", transform: `translate3d(calc(-50% + ${distance * 25}vw), -50%, ${depth}px) rotateY(${rotation}deg) scale(${scale})`, filter: distance === 0 ? "none" : `brightness(${abs === 1 ? 0.76 : 0.52})`, boxShadow: abs === 0 ? "0 34px 100px rgba(0,0,0,.65), 0 8px 28px rgba(0,0,0,.55)" : "0 24px 54px rgba(0,0,0,.52)", transition: "transform 720ms cubic-bezier(.16,1,.3,1), opacity 520ms ease, filter 520ms ease, box-shadow 520ms ease", touchAction: "pan-y" }}>
                  <Image src={item.imagePath} alt={item.altText} fill priority={distance === 0} sizes="(min-width: 1024px) 520px, 82vw" draggable={false} className="pointer-events-none select-none object-cover" />
                  <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/90 via-transparent to-void/5" />
                  <span className="pointer-events-none absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7"><span className="mb-2 inline-flex border border-white/35 bg-void/35 px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">{item.eventName}</span><span className="display block text-2xl text-sand sm:text-4xl">{item.title}</span><span className="mt-1 block max-w-md text-[11px] leading-relaxed text-sand/75 sm:text-sm">{item.caption}</span></span>
                  <span className="pointer-events-none absolute right-4 top-4 border border-white/35 bg-void/30 px-2 py-1 font-mono text-[9px] tracking-[0.1em] text-white/85 backdrop-blur-sm">{String(index + 1).padStart(2,"0")}/{String(count).padStart(2,"0")}</span>
                  {distance === 0 && <span aria-hidden className="pointer-events-none absolute right-5 bottom-5 grid h-10 w-10 place-items-center rounded-full border border-white/40 bg-void/30 text-white backdrop-blur-md sm:right-7 sm:bottom-7">↗</span>}
                </button>;
              })}
            </div>

            <div className="mx-auto flex max-w-xl items-center justify-between gap-3 border-y border-sand/15 py-4" data-gallery-reveal>
              <button type="button" aria-label="Previous image" onClick={() => step(-1)} className="coverflow-arrow group grid h-11 w-11 shrink-0 place-items-center rounded-full border border-sand/25 text-xl text-sand transition-all hover:border-signal hover:bg-signal hover:text-void focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand">←</button>
              <div className="min-w-0 flex-1 text-center"><p className="display text-lg text-sand sm:text-xl">{activeClub.name} <span className="text-sand/35">/</span> {current.eventName}</p><div className="mx-auto mt-3 flex max-w-48 items-center justify-center gap-1">{activeItems.map((item, index) => <button key={item.id} type="button" aria-label={`Go to image ${index + 1}: ${item.title}`} aria-current={activeFrame === index ? "step" : undefined} onClick={() => setActiveFrame(index)} className={cn("h-[3px] flex-1 transition-colors", activeFrame === index ? accentWash[activeClub.accent] : "bg-sand/20 hover:bg-sand/55")} />)}</div><button type="button" aria-label={autoplayEnabled ? "Pause automatic slideshow" : "Play automatic slideshow"} aria-pressed={autoplayEnabled} onClick={() => setAutoplayEnabled((playing) => !playing)} className="mt-3 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-sand-dim transition-colors hover:text-sand focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sand"><span aria-hidden className="grid h-5 w-5 place-items-center rounded-full border border-sand/25 text-[9px] text-sand">{autoplayEnabled ? "Ⅱ" : "▶"}</span>{autoplayEnabled ? "Auto play · 1 sec" : "Paused"}</button></div>
              <button type="button" aria-label="Next image" onClick={() => step(1)} className="coverflow-arrow group grid h-11 w-11 shrink-0 place-items-center rounded-full border border-sand/25 text-xl text-sand transition-all hover:border-signal hover:bg-signal hover:text-void focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand">→</button>
            </div>
            <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-sand-dim/65" data-gallery-reveal>Drag to explore <span className="mx-2 text-sand/30">·</span> Click a frame to expand</p>
          </>}
        </div>
      </div>

      {portalReady && lightboxOpen && current && createPortal(
        <div className="gallery-lightbox fixed inset-0 z-[100] flex items-center justify-center bg-[#030706]/95 p-4 backdrop-blur-xl sm:p-8" onMouseDown={(event) => { if (event.target === event.currentTarget) setLightboxOpen(false); }}>
          <div ref={lightbox} role="dialog" aria-modal="true" aria-label={`${activeClub.name} photo viewer`} tabIndex={-1} className="relative flex h-full w-full max-w-[1500px] flex-col items-center justify-center outline-none">
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-4 py-2 sm:py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-sand/75">{activeClub.name} <span className="text-sand/35">/</span> {String(activeFrame + 1).padStart(2,"0")} of {String(count).padStart(2,"0")}</p>
              <button type="button" autoFocus aria-label="Close full-screen image viewer" onClick={() => setLightboxOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border border-sand/30 text-xl text-sand transition-colors hover:border-signal hover:bg-signal hover:text-void">×</button>
            </div>
            <div className="relative h-[min(78vh,900px)] w-full">
              <Image key={current.id} src={current.imagePath} alt={current.altText} fill priority sizes="96vw" className="gallery-lightbox-image object-contain" />
              <button type="button" aria-label="Previous image" onClick={() => step(-1)} className="absolute left-0 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/35 bg-void/55 text-xl text-white backdrop-blur-md transition-colors hover:border-signal hover:bg-signal hover:text-void sm:left-3 sm:h-14 sm:w-14">←</button>
              <button type="button" aria-label="Next image" onClick={() => step(1)} className="absolute right-0 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/35 bg-void/55 text-xl text-white backdrop-blur-md transition-colors hover:border-signal hover:bg-signal hover:text-void sm:right-3 sm:h-14 sm:w-14">→</button>
            </div>
            <div className="mt-4 max-w-2xl text-center"><p className="display text-2xl text-sand sm:text-3xl">{current.title}</p><p className="mt-2 text-sm text-sand-dim">{current.caption}</p><a href={current.url ?? undefined} target={current.url ? "_blank" : undefined} rel={current.url ? "noopener noreferrer" : undefined} className="mt-3 inline-block font-mono text-[9px] uppercase tracking-[0.14em] text-sand/55 underline decoration-sand/30 underline-offset-4 hover:text-signal">Open original in Drive ↗</a></div>
          </div>
        </div>, document.body
      )}
    </section>
  );
}
