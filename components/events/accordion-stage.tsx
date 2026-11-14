"use client";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { EventItem } from "@/types";

/* ─── layout constants ──────────────────────────────────────────────── */
const SKEW = 8; // blade tilt in degrees — applied only on lg+
const ACTIVE_W = 65; // % of viewport taken by the open blade
const INACTIVE_W = (100 - ACTIVE_W) / 4; // % each collapsed blade takes

/* ─── per-event accent colours that bleed from each poster ──────────── */
const ACCENTS: Record<string, { from: string; via: string }> = {
  "mogoj-dholai":   { from: "#e84525", via: "#c0391e" },
  hojohborolo:      { from: "#f5c518", via: "#c9a010" },
  "data-nilaam":    { from: "#3b5bdb", via: "#6741d9" },
  "speaker-session":{ from: "#e40908", via: "#8b0000" },
  "hack-sangram":   { from: "#8b0000", via: "#350000" },
};

/* ─── small sub-components ──────────────────────────────────────────── */
function SpecGrid({ facts }: { facts: EventItem["facts"] }) {
  return (
    <div className="grid grid-cols-2 gap-px border border-sand/15 bg-sand/10 backdrop-blur-md">
      {facts.map((f) => (
        <div key={f.label} className="flex flex-col gap-0.5 bg-void/80 px-3 py-2.5 backdrop-blur-sm">
          <span className="font-mono text-[0.6rem] font-bold tracking-widest text-sand/60 uppercase">
            {f.label}:
          </span>
          <span className="font-mono text-[0.78rem] font-bold tracking-wide text-sand uppercase leading-tight drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            {f.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function QRDrawer({
  event,
  open,
  onClose,
}: {
  event: EventItem;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-label={`Quick register for ${event.title}`}
      aria-modal="true"
      className={cn(
        "absolute bottom-0 right-0 z-30 w-72 border border-sand/20 bg-void/90 p-5 backdrop-blur-md transition-transform duration-500",
        open ? "translate-y-0" : "translate-y-full"
      )}
      style={{ clipPath: "polygon(0 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%)" }}
    >
      <button
        onClick={onClose}
        aria-label="Close QR drawer"
        className="absolute right-3 top-3 font-mono text-[0.65rem] tracking-widest text-sand/50 hover:text-sand"
      >
        [ESC]
      </button>
      <p className="font-mono text-[0.65rem] font-bold tracking-widest text-signal uppercase">
        Quick Register // Scan QR
      </p>
      <div className="mt-3 flex gap-3">
        <div className="flex h-28 w-28 shrink-0 items-center justify-center border border-sand/20 bg-sand/5 p-1">
          <span className="font-mono text-[0.55rem] text-sand/40 text-center leading-relaxed">
            QR CODE<br />COMING<br />SOON
          </span>
        </div>
        <div className="flex flex-col justify-center gap-2">
          {event.registrationUrl ? (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="kbtn kbtn-primary !bg-signal !text-white py-3 px-4 text-[0.65rem] shadow-[0_4px_16px_rgba(228,9,8,0.4)]"
            >
              <span className="kbtn-label">Fill Team Form</span>
            </a>
          ) : (
            <span className="font-mono text-[0.65rem] text-sand/40 uppercase tracking-widest">
              Registration<br />opens soon
            </span>
          )}
        </div>
      </div>
      <p className="mt-3 font-mono text-[0.6rem] text-sand/30 tracking-wide uppercase">
        {event.title} · KERNEL 1.0
      </p>
    </div>
  );
}

/* ─── mobile accordion panel (shown below lg) ───────────────────────── */
interface MobilePanelProps {
  event: EventItem;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

function MobilePanel({ event, index, isActive, onClick }: MobilePanelProps) {
  const idx = String(index + 1).padStart(2, "0");

  return (
    <div className="border-b border-sand/10 last:border-b-0">
      {/* header row — always visible */}
      <button
        onClick={onClick}
        aria-expanded={isActive}
        className="flex w-full items-center gap-4 px-5 py-4 text-left focus-visible:outline-2 focus-visible:outline-signal"
      >
        <span className="font-mono text-[0.7rem] font-bold tracking-widest text-signal/70">{idx}</span>
        <span className="display flex-1 text-[1.1rem] leading-none text-sand">{event.title}</span>
        <span
          className="font-mono text-[0.7rem] text-sand/40 transition-transform duration-300"
          style={{ transform: isActive ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>

      {/* expandable body */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-500",
          isActive ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
        aria-hidden={!isActive}
      >
        {/* poster strip */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={event.imagePath}
            alt={event.imageAlt}
            fill
            sizes="100vw"
            className="object-cover object-top"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, transparent 40%, #050308 100%)`,
            }}
          />
          {/* prize badge if present */}
          {event.facts.find(f => f.label === "Prize Pool") && (
            <span className="absolute bottom-3 right-4 font-mono text-[0.9rem] font-black text-sand">
              {event.facts.find(f => f.label === "Prize Pool")!.value}
            </span>
          )}
        </div>

        <div className="px-5 pb-6 pt-4">
          <p className="font-mono text-[0.7rem] tracking-widest text-sand/50 uppercase mb-4">{event.tagline}</p>
          <SpecGrid facts={event.facts} />
          <div className="mt-5 flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
            <Link
              href={`/events/${event.slug}`}
              className="inline-flex items-center justify-center gap-2 w-full border border-signal bg-signal py-3 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_20px_rgba(228,9,8,0.4)] transition-all hover:bg-[#c80706]"
            >
              <span>Enter Arena / View Dossier</span>
              <span aria-hidden="true">→</span>
            </Link>
            {event.registrationUrl && (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center font-mono text-[11px] font-bold uppercase tracking-wider text-sand/60 hover:text-sand py-1 transition-colors"
              >
                Direct Form ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── blade glitch overlay ──────────────────────────────────────────── */
const GLITCH_SLICES = [
  { top: 0,   bottom: 91, x: "-65px", delay: "0ms" },
  { top: 8,   bottom: 82, x: "74px",  delay: "20ms" },
  { top: 16,  bottom: 74, x: "-55px", delay: "10ms" },
  { top: 25,  bottom: 66, x: "82px",  delay: "35ms" },
  { top: 33,  bottom: 58, x: "-75px", delay: "15ms" },
  { top: 41,  bottom: 49, x: "90px",  delay: "40ms" },
  { top: 50,  bottom: 41, x: "-62px", delay: "25ms" },
  { top: 58,  bottom: 33, x: "78px",  delay: "10ms" },
  { top: 66,  bottom: 24, x: "-84px", delay: "30ms" },
  { top: 74,  bottom: 16, x: "66px",  delay: "15ms" },
  { top: 82,  bottom: 8,  x: "-70px", delay: "35ms" },
  { top: 90,  bottom: 0,  x: "56px",  delay: "20ms" },
];

const GLITCH_BLOCKS = [
  { top: "5%",  left: "8%",  w: "180px", h: "20px", color: "var(--signal)", delay: "0ms" },
  { top: "16%", left: "42%", w: "260px", h: "30px", color: "var(--volt)",   delay: "25ms" },
  { top: "27%", left: "14%", w: "160px", h: "22px", color: "#00f0ff",        delay: "10ms" },
  { top: "38%", left: "60%", w: "310px", h: "36px", color: "var(--signal)", delay: "35ms" },
  { top: "49%", left: "22%", w: "190px", h: "18px", color: "var(--sand)",   delay: "15ms" },
  { top: "62%", left: "50%", w: "240px", h: "28px", color: "#00f0ff",        delay: "45ms" },
  { top: "73%", left: "12%", w: "210px", h: "24px", color: "var(--volt)",   delay: "20ms" },
  { top: "84%", left: "46%", w: "290px", h: "32px", color: "var(--signal)", delay: "30ms" },
  { top: "92%", left: "28%", w: "150px", h: "16px", color: "var(--sand)",   delay: "40ms" },
];

export function BladeGlitchOverlay({ imagePath }: { imagePath: string }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
    >
      {/* 1. Full-height vertical scanline beam sweep */}
      <div className="blade-scanline absolute inset-x-0 h-52 pointer-events-none" />

      {/* 2. Crimson, Cyan & Volt chromatic shear layers with lateral offsets */}
      <div
        className="blade-glitch-rgb absolute inset-0 bg-cover bg-top mix-blend-screen"
        style={{
          backgroundImage: `url(${imagePath})`,
          boxShadow: "inset 0 0 0 9999px rgba(228, 9, 8, 0.55)",
          transform: "translate3d(-28px, 0, 0)",
        }}
      />
      <div
        className="blade-glitch-rgb absolute inset-0 bg-cover bg-top mix-blend-screen"
        style={{
          backgroundImage: `url(${imagePath})`,
          boxShadow: "inset 0 0 0 9999px rgba(0, 240, 255, 0.5)",
          transform: "translate3d(28px, 0, 0)",
          animationDelay: "25ms",
        }}
      />
      <div
        className="blade-glitch-rgb absolute inset-0 bg-cover bg-top mix-blend-hard-light"
        style={{
          backgroundImage: `url(${imagePath})`,
          boxShadow: "inset 0 0 0 9999px rgba(154, 77, 255, 0.4)",
          transform: "translate3d(-14px, 0, 0)",
          animationDelay: "45ms",
        }}
      />

      {/* 3. Staggered full-coverage horizontal poster slices */}
      {GLITCH_SLICES.map((s, i) => (
        <div
          key={i}
          className="blade-glitch-slice absolute inset-0 bg-cover bg-top"
          style={
            {
              backgroundImage: `url(${imagePath})`,
              clipPath: `inset(${s.top}% 0 ${s.bottom}% 0)`,
              "--g-x": s.x,
              "--g-delay": s.delay,
            } as CSSProperties
          }
        />
      ))}

      {/* 4. KERNEL high-impact cyber pixel-blocks & horizontal data chunks */}
      {GLITCH_BLOCKS.map((b, i) => (
        <span
          key={i}
          className="blade-glitch-slice absolute block mix-blend-difference opacity-95 shadow-[0_0_14px_currentColor]"
          style={
            {
              top: b.top,
              left: b.left,
              width: b.w,
              height: b.h,
              background: b.color,
              color: b.color,
              "--g-x": i % 2 === 0 ? "52px" : "-52px",
              "--g-delay": b.delay,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

/* ─── desktop blade (shown on lg+) ──────────────────────────────────── */
interface BladeProps {
  event: EventItem;
  index: number;
  isActive: boolean;
  isGlitching: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}

function Blade({ event, index, isActive, isGlitching, onClick, onMouseEnter }: BladeProps) {
  const router = useRouter();
  const accent = ACCENTS[event.slug] ?? { from: "#e40908", via: "#8b0000" };
  const idx = String(index + 1).padStart(2, "0");
  const [qrOpen, setQrOpen] = useState(false);

  /* ESC to close QR */
  useEffect(() => {
    if (!qrOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setQrOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [qrOpen]);

  /*
   * The skew geometry:  outer container = skewX(-8deg), overflow:hidden.
   * The inner content counter-skews back by +8deg.
   * Problem: the outer's left boundary is a diagonal line. At height H,
   * the visible left edge at the top of the blade is H × tan(8°) ≈ 0.14H px
   * to the right of the bottom-left corner.
   * Fix: shift the inner div far enough left that its full width + right clearance
   * keeps content safe, then add an explicit left-pad inset on the copy column
   * to clear the worst-case diagonal bite (top of blade, left side).
   */
  const LEFT_OVERSHOOT = "-8%"; // extends inner div past the blade's left edge
  const INNER_WIDTH = "116%";   // compensates for the overshoot on both sides

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      aria-label={`Event ${idx}: ${event.title}${isActive ? ", expanded" : ", hover or click to expand"}`}
      onClick={() => {
        if (isActive) {
          router.push(`/events/${event.slug}`);
        } else {
          onClick();
        }
      }}
      onMouseEnter={onMouseEnter}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (isActive) {
            router.push(`/events/${event.slug}`);
          } else {
            onClick();
          }
        }
      }}
      className={cn(
        "blade relative h-full shrink-0 overflow-hidden",
        "cursor-pointer select-none outline-none",
        "focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-1",
      )}
      style={{
        flexBasis: isActive ? `${ACTIVE_W}%` : `${INACTIVE_W}%`,
        flexGrow: 0,
        flexShrink: 0,
        transform: `skewX(-${SKEW}deg)`,
        transformOrigin: "bottom left",
        transition: "flex-basis 0.55s cubic-bezier(0.7,0,0.1,1)",
      }}
      data-blade={event.slug}
    >
      {/* un-skew the inner content */}
      <div
        className="absolute inset-0"
        style={{
          transform: `skewX(${SKEW}deg)`,
          transformOrigin: "bottom left",
          left: LEFT_OVERSHOOT,
          width: INNER_WIDTH,
        }}
      >
        {/* poster image — desaturated when inactive */}
        <div
          className={cn(
            "absolute inset-0 transition-all duration-500",
            isActive ? "opacity-100 grayscale-0" : "opacity-30 grayscale"
          )}
        >
          <Image
            src={event.imagePath}
            alt={event.imageAlt}
            fill
            sizes={isActive ? "65vw" : "20vw"}
            className="object-cover object-top"
            priority={index === 0}
          />
        </div>

        {/* chromatic slice glitch burst on switch */}
        {isGlitching && (
          <BladeGlitchOverlay key={`${event.id}-${index}`} imagePath={event.imagePath} />
        )}

        {/* gradient overlay — translucent scrim so poster artwork spans throughout the blade */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: isActive
              ? `linear-gradient(105deg, rgba(5,3,8,0.74) 0%, rgba(5,3,8,0.56) 36%, ${accent.from}18 68%, transparent 100%)`
              : "linear-gradient(to right, #050308 25%, rgba(5,3,8,0.75) 100%)",
          }}
        />

        {/* halftone dot layer */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20 transition-opacity duration-500"
          style={{
            backgroundImage: `radial-gradient(${isActive ? accent.from : "#e40908"} 1.2px, transparent 1.6px)`,
            backgroundSize: "11px 11px",
            maskImage: "linear-gradient(115deg, #000 0%, transparent 55%)",
            WebkitMaskImage: "linear-gradient(115deg, #000 0%, transparent 55%)",
          }}
        />

        {/* ── COLLAPSED: vertical label ── */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-end gap-3 pb-6 transition-opacity duration-300",
            isActive ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
          aria-hidden={isActive}
        >
          <span className="font-mono text-[0.65rem] font-bold tracking-widest text-signal/80 uppercase">{idx}</span>
          <div
            className="display text-[clamp(0.85rem,1.3vw,1.3rem)] font-black text-sand/80 outline-text"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed", letterSpacing: "0.06em" }}
          >
            {event.title.toUpperCase()}
          </div>
        </div>

        {/* ── EXPANDED: detail panel ── */}
        <div
          className={cn(
            "absolute inset-0 flex transition-opacity duration-300 delay-100",
            isActive ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          aria-hidden={!isActive}
        >
          {/*
           * Left copy column.
           * pl-[15%] clears the diagonal bite:
           *   at blade height ≈ 85vh ≈ 765px,  tan(8°)×765 ≈ 108px
           *   108px / 65vw ≈ 11%, so 15% gives a comfortable safety margin.
           * We also keep pr-4 to avoid running into the poster half.
           */}
          <div className="flex h-full w-[48%] flex-col justify-end pb-10 pr-4 pl-[15%]">
            <div className="mb-4">
              <span className="font-mono text-[2.5rem] font-black leading-none text-signal/40 xl:text-[3.5rem] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                {idx}
              </span>
              <Link
                href={`/events/${event.slug}`}
                className="group/title block"
              >
                <h2
                  className={cn(
                    "display mt-1 text-[clamp(1.2rem,2.6vw,2.4rem)] leading-none text-sand group-hover/title:text-signal transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]",
                    isGlitching && "blade-title-glitch"
                  )}
                >
                  {event.title}
                </h2>
              </Link>
              {event.slug === "hojohborolo" && (
                <p className="mt-1 font-mono text-[0.9rem] text-sand/70 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">(হযবরল)</p>
              )}
              <p className="mt-2 font-mono text-[0.68rem] tracking-widest text-sand/65 uppercase drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                {event.tagline}
              </p>
            </div>

            <SpecGrid facts={event.facts} />

            <p className="mt-3 font-mono text-[0.58rem] tracking-wide text-sand/30 uppercase">
              {event.category}
            </p>

            <div className="mt-5 flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
              <Link
                href={`/events/${event.slug}`}
                data-cursor="Enter"
                className="inline-flex items-center gap-2 border border-signal bg-signal px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_20px_rgba(228,9,8,0.4)] transition-all hover:bg-[#c80706] hover:shadow-[0_6px_25px_rgba(228,9,8,0.6)] active:scale-95"
              >
                <span>Enter Arena</span>
                <span aria-hidden="true">→</span>
              </Link>
              {event.registrationUrl && (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] font-bold uppercase tracking-wider text-sand/60 hover:text-sand underline underline-offset-4 transition-colors"
                >
                  Direct Form ↗
                </a>
              )}
            </div>
          </div>

          {/* Right column: poster + QR trigger */}
          <div className="relative flex-1">
            <div
              className="absolute bottom-6 right-6 z-20 cursor-pointer"
              onClick={(e) => { e.stopPropagation(); setQrOpen((o) => !o); }}
            >
              <div className="flex flex-col items-end gap-1">
                <span className="font-mono text-[0.6rem] tracking-widest text-sand/40 uppercase">Register Now</span>
                <div className="flex h-20 w-20 items-center justify-center border border-sand/20 bg-void/60 p-1 backdrop-blur-sm">
                  <span className="font-mono text-[0.5rem] text-sand/30 text-center leading-relaxed">
                    QR<br />SOON
                  </span>
                </div>
              </div>
            </div>
            <QRDrawer event={event} open={isActive && qrOpen} onClose={() => setQrOpen(false)} />
          </div>
        </div>

        {/* active left-edge glow */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 border-l-2 transition-all duration-500",
            isActive ? "border-signal/70 shadow-[inset_2px_0_18px_rgba(228,9,8,0.18)]" : "border-sand/8"
          )}
          aria-hidden
        />
      </div>
    </div>
  );
}

/* ─── mobile event showcase (< lg) — full-screen card swipe ─────────── */
interface MobileShowcaseProps {
  events: EventItem[];
  active: number;
  setActive: (i: number) => void;
  isPaused: boolean;
  setIsPaused: (fn: ((p: boolean) => boolean) | boolean) => void;
  glitchingIndex: number | null;
}

function MobileEventShowcase({
  events,
  active,
  setActive,
  isPaused,
  setIsPaused,
  glitchingIndex,
}: MobileShowcaseProps) {
  const ev = events[active];
  const accent = ACCENTS[ev.slug] ?? { from: "#e40908", via: "#8b0000" };
  const touchStartX = useRef<number>(0);
  const AUTO_SCROLL_INTERVAL = 4500;

  /* touch-swipe navigation */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) < 40) return;
    setIsPaused(true);
    if (dx < 0) setActive((active + 1) % events.length);
    else setActive((active - 1 + events.length) % events.length);
  };

  /* auto-scroll */
  useEffect(() => {
    if (isPaused || events.length <= 1) return;
    const id = setInterval(() => {
      setActive((active + 1) % events.length);
    }, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(id);
  }, [isPaused, events.length, active, setActive]);

  return (
    <div
      className="lg:hidden relative min-h-[calc(100svh-var(--nav-h))] bg-void flex flex-col justify-between overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Background Poster with dynamic backdrop ── */}
      <div className="absolute inset-0 z-0">
        <Image
          key={ev.id}
          src={ev.imagePath}
          alt={ev.imageAlt}
          fill
          sizes="100vw"
          className="object-cover object-top filter brightness-[0.4] transition-all duration-700"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom,
              rgba(5,3,8,0.7) 0%,
              rgba(5,3,8,0.4) 30%,
              rgba(5,3,8,0.85) 60%,
              #050308 100%)`,
          }}
        />
      </div>

      {/* ── Progress bar (top) ── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[3px] bg-white/10">
        <div
          key={active + (isPaused ? "-p" : "-a")}
          className="h-full bg-signal shadow-[0_0_10px_rgba(228,9,8,0.9)]"
          style={{
            width: isPaused ? "100%" : "0%",
            opacity: isPaused ? 0.3 : 1,
            animation: isPaused
              ? "none"
              : `autoscrollProgress ${AUTO_SCROLL_INTERVAL}ms linear forwards`,
          }}
        />
      </div>

      {/* ── Top Header Bar on Mobile ── */}
      <div className="relative z-10 px-5 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-signal animate-pulse" />
          <span className="font-mono text-[10px] font-black tracking-widest text-signal uppercase">
            EVENT {String(active + 1).padStart(2, "0")} / {String(events.length).padStart(2, "0")}
          </span>
        </div>
        <span
          className="rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-widest uppercase backdrop-blur-md"
          style={{
            background: `${accent.from}30`,
            color: accent.from,
            border: `1px solid ${accent.from}60`,
          }}
        >
          {ev.category}
        </span>
      </div>

      {/* ── Center Arena: Featured Event Card ── */}
      <div className="relative z-10 px-5 py-4 flex flex-col items-center">
        <div className="relative w-full max-w-[280px] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-sand/20 shadow-[0_16px_40px_rgba(0,0,0,0.8)] group">
          <Image
            src={ev.imagePath}
            alt={ev.imageAlt}
            fill
            sizes="280px"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-80" />
          {ev.facts.find(f => f.label === "Prize Pool") && (
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-void/85 border border-sand/20 rounded-lg px-2.5 py-1 backdrop-blur-md">
              <span className="font-mono text-[9px] text-sand/60 uppercase">Prize Pool</span>
              <span className="font-mono text-xs font-black text-signal">
                {ev.facts.find(f => f.label === "Prize Pool")!.value}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Bottom Content Area ── */}
      <div className="relative z-10 px-5 pb-8 flex flex-col">
        {/* Title & Tagline */}
        <div className="text-center">
          <h1 className="display text-[clamp(2rem,9vw,3rem)] leading-none text-sand drop-shadow-[0_2px_18px_rgba(0,0,0,0.9)]">
            {ev.title}
          </h1>
          {ev.slug === "hojohborolo" && (
            <p className="font-mono text-xs text-sand/60 mt-0.5">(হযবরল)</p>
          )}
          <p className="mt-1 font-mono text-[11px] tracking-wider text-signal uppercase font-bold">
            {ev.tagline}
          </p>
        </div>

        {/* Spec Grid */}
        <div className="mt-4">
          <SpecGrid facts={ev.facts} />
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-col gap-2">
          <Link
            href={`/events/${ev.slug}`}
            className="flex items-center justify-center gap-2 rounded-lg border border-signal bg-signal py-3 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_24px_rgba(228,9,8,0.45)] transition-all active:scale-95"
          >
            Enter Arena / View Dossier →
          </Link>
          {ev.registrationUrl && (
            <a
              href={ev.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center font-mono text-[11px] font-bold uppercase tracking-wider text-sand/60 hover:text-sand py-1 transition-colors"
            >
              Direct Registration Form ↗
            </a>
          )}
        </div>

        {/* Navigation Dot controls */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {events.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to event ${i + 1}`}
                onClick={() => { setActive(i); setIsPaused(true); }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === active
                    ? "w-7 bg-signal shadow-[0_0_8px_rgba(228,9,8,0.8)]"
                    : "w-1.5 bg-sand/30 hover:bg-sand/60"
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setActive((active - 1 + events.length) % events.length);
                setIsPaused(true);
              }}
              className="w-8 h-8 rounded-full border border-sand/20 bg-void/80 text-sand flex items-center justify-center font-mono text-xs active:scale-90"
              aria-label="Previous event"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => {
                setActive((active + 1) % events.length);
                setIsPaused(true);
              }}
              className="w-8 h-8 rounded-full border border-sand/20 bg-void/80 text-sand flex items-center justify-center font-mono text-xs active:scale-90"
              aria-label="Next event"
            >
              →
            </button>
            <button
              type="button"
              onClick={() => setIsPaused((p: boolean) => !p)}
              className="ml-1 flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-sand/50 border border-sand/20 rounded-full px-2.5 py-1 bg-void/60 hover:text-sand"
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", isPaused ? "bg-sand/40" : "bg-signal animate-pulse")} />
              {isPaused ? "PLAY" : "PAUSE"}
            </button>
          </div>
        </div>

        <p className="mt-3 text-center font-mono text-[9px] tracking-widest text-sand/30 uppercase">
          ← Swipe or tap arrows to navigate →
        </p>
      </div>
    </div>
  );
}

/* ─── main accordion stage ──────────────────────────────────────────── */
export function AccordionStage({ events }: { events: EventItem[] }) {
  const [active, setActive] = useState(0);
  const [glitchingIndex, setGlitchingIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const hasMounted = useRef(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const AUTO_SCROLL_INTERVAL = 3800; // 3.8s short timer for automatic event showcase

  useEffect(() => {
    registerGsap();
  }, []);

  /* trigger 420ms glitch burst only during blade transitions */
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    setGlitchingIndex(active);
    const timer = window.setTimeout(() => setGlitchingIndex(null), 420);
    return () => window.clearTimeout(timer);
  }, [active]);

  const switchBlade = useCallback(
    (idx: number) => {
      if (idx === active) return;
      /* chromatic glitch flash */
      const blades = stageRef.current?.querySelectorAll<HTMLElement>("[data-blade]");
      if (blades) {
        gsap.killTweensOf(blades);
        gsap.set(blades, { clearProps: "x" });
        gsap.to(blades, {
          x: (i) => (i % 2 ? 8 : -8),
          duration: 0.08,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
          onComplete: () => gsap.set(blades, { clearProps: "x" }),
        });
      }
      setActive(idx);
    },
    [active]
  );

  /* Auto-scroll timer: cycles through events automatically */
  useEffect(() => {
    if (isPaused || events.length <= 1) return;
    const interval = setInterval(() => {
      setActive((curr) => {
        const next = (curr + 1) % events.length;
        const blades = stageRef.current?.querySelectorAll<HTMLElement>("[data-blade]");
        if (blades) {
          gsap.killTweensOf(blades);
          gsap.set(blades, { clearProps: "x" });
          gsap.to(blades, {
            x: (i) => (i % 2 ? 6 : -6),
            duration: 0.08,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
            onComplete: () => gsap.set(blades, { clearProps: "x" }),
          });
        }
        return next;
      });
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused, events.length]);

  /* keyboard: left/right arrow to cycle blades */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") switchBlade((active + 1) % events.length);
      if (e.key === "ArrowLeft")  switchBlade((active - 1 + events.length) % events.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, events.length, switchBlade]);

  return (
    <>
      {/* ── DESKTOP: diagonal accordion (lg+) ── */}
      <div
        ref={stageRef}
        className="events-stage relative hidden lg:flex"
        role="tablist"
        aria-label="KERNEL 1.0 events"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Subtle timer progress bar along the top edge */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-[3px] bg-white/10">
          <div
            key={active + (isPaused ? "-paused" : "-active")}
            className="h-full bg-signal shadow-[0_0_10px_rgba(228,9,8,0.9)]"
            style={{
              width: isPaused ? "100%" : "0%",
              opacity: isPaused ? 0.35 : 1,
              animation: isPaused ? "none" : `autoscrollProgress ${AUTO_SCROLL_INTERVAL}ms linear forwards`,
            }}
          />
        </div>

        {/* Floating auto-scroll indicator & controller */}
        <div className="pointer-events-auto absolute bottom-4 left-6 z-40 hidden lg:flex items-center gap-2.5 rounded-full border border-sand/20 bg-void/85 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-sand backdrop-blur-md">
          <span className={cn("h-2 w-2 rounded-full", isPaused ? "bg-sand/40" : "bg-signal animate-pulse")} />
          <span>
            {isPaused ? "Auto-play paused" : `Auto-scroll (${active + 1}/${events.length})`}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsPaused((p) => !p);
            }}
            className="ml-1 text-signal hover:text-white font-bold transition-colors cursor-pointer"
          >
            [{isPaused ? "RESUME" : "PAUSE"}]
          </button>
        </div>

        {events.map((ev, i) => (
          <Blade
            key={ev.id}
            event={ev}
            index={i}
            isActive={i === active}
            isGlitching={glitchingIndex === i}
            onClick={() => {
              switchBlade(i);
              setIsPaused(true);
            }}
            onMouseEnter={() => {
              switchBlade(i);
              setIsPaused(true);
            }}
          />
        ))}
      </div>

      {/* ── MOBILE / TABLET: full-screen card showcase (< lg) ── */}
      <MobileEventShowcase
        events={events}
        active={active}
        setActive={setActive}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        glitchingIndex={glitchingIndex}
      />
    </>
  );
}
