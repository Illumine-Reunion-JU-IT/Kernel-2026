"use client";

import Link from "next/link";
import Image from "next/image";
import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { gsap } from "@/lib/gsap";
import { EVENT_DOSSIERS, type EventDossier } from "@/data/event-dossiers";

/* ─── Types ──────────────────────────────────────────────────────── */
export interface EventFact {
  label: string;
  value: string;
}

export interface KernelEvent {
  id: string;
  title: string;
  slug: string;
  category: string;
  tagline: string;
  summary: string;
  facts: EventFact[];
  date: string;
  venue: string;
  imagePath: string;
  imageAlt: string;
  registrationUrl: string | null;
  isPlaceholder?: boolean;
  organiserNote?: string;
}

interface EventOrbitalStageProps {
  event: KernelEvent;
  indexNumber?: string;
  prevEvent: { slug: string; title: string } | null;
  nextEvent: { slug: string; title: string } | null;
  coordinators: string[];
}

interface OrbitConfig {
  radius: number;
  tiltX: number;
  tiltY: number;
  tiltZ: number;
  speed: number;       // seconds per 360° revolution
  initialAngle: number;
  color: string;
  icon: string;
}

/* ─── 3D Orbit Configurations ──────────────────────────────────────
   Each orbit ring has its own 3D inclination (tiltX, tiltY, tiltZ).
   From a face-down / flat view, their paths intersect and overlap.
   When rotating the 3D system, each ring's true 3D spatial orientation
   and depth separation becomes instantly visible!                  */
const ORBIT_CONFIGS: OrbitConfig[] = [
  {
    radius: 295,
    tiltX: 26,
    tiltY: -22,
    tiltZ: 10,
    speed: 28,
    initialAngle: 215,
    color: "#e40908", // Crimson
    icon: "◈",
  },
  {
    radius: 360,
    tiltX: -24,
    tiltY: 30,
    tiltZ: -14,
    speed: 36,
    initialAngle: 45,
    color: "#9a4dff", // Volt Purple
    icon: "⏱",
  },
  {
    radius: 420,
    tiltX: 30,
    tiltY: 22,
    tiltZ: -26,
    speed: 44,
    initialAngle: 135,
    color: "#00f0ff", // Cyan
    icon: "⊡",
  },
  {
    radius: 335,
    tiltX: -18,
    tiltY: -34,
    tiltZ: 18,
    speed: 22,
    initialAngle: 315,
    color: "#e01a88", // Magenta
    icon: "◉",
  },
];

/* Default system presentation tilt */
const DEF_SYS_RX = -22;
const DEF_SYS_RY = 12;

/* Default central card tilt */
const DEF_CARD_RX = 10;
const DEF_CARD_RY = -20;

/* ─── 3D Mathematical Helpers ────────────────────────────────────── */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Calculates the exact (x, y, z) coordinates of a point on a tilted 3D orbit ring.
 * Transformation order matches CSS: rotateZ -> rotateX -> rotateY.
 */
function getOrbitPoint(
  radius: number,
  angleDeg: number,
  tiltX: number,
  tiltY: number,
  tiltZ: number = 0
): { x: number; y: number; z: number } {
  const a = (angleDeg * Math.PI) / 180;
  const x0 = radius * Math.cos(a);
  const y0 = radius * Math.sin(a);
  const z0 = 0;

  // 1. Roll around Z
  const rz = (tiltZ * Math.PI) / 180;
  const cz = Math.cos(rz), sz = Math.sin(rz);
  const x1 = x0 * cz - y0 * sz;
  const y1 = x0 * sz + y0 * cz;
  const z1 = z0;

  // 2. Pitch around X
  const rx = (tiltX * Math.PI) / 180;
  const cx = Math.cos(rx), sx = Math.sin(rx);
  const x2 = x1;
  const y2 = y1 * cx - z1 * sx;
  const z2 = y1 * sx + z1 * cx;

  // 3. Yaw around Y
  const ry = (tiltY * Math.PI) / 180;
  const cy = Math.cos(ry), sy = Math.sin(ry);
  const x3 = x2 * cy + z2 * sy;
  const y3 = y2;
  const z3 = -x2 * sy + z2 * cy;

  return { x: x3, y: y3, z: z3 };
}

/* ─── Thumbnail Lightbox ─────────────────────────────────────────── */
function ThumbnailLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(5,3,8,0.9)", backdropFilter: "blur(14px)" }}
      onClick={onClose}
    >
      <div
        className="relative"
        style={{ maxWidth: "min(90vw, 640px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            border: "2.5px solid #ff3b30",
            boxShadow:
              "0 0 90px rgba(228,9,8,0.6), 0 0 30px rgba(228,9,8,0.4), inset 0 0 40px rgba(255,255,255,0.07)",
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={640}
            height={832}
            className="block w-full h-auto"
            style={{ maxHeight: "82vh", objectFit: "contain" }}
            unoptimized
          />
        </div>
        <button
          onClick={onClose}
          aria-label="Close poster"
          className="absolute -top-4 -right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-void/90 font-mono text-sm text-sand/80 hover:border-signal hover:text-signal transition-colors"
        >
          ✕
        </button>
        <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-sand/35">
          Click outside or press Esc to close
        </p>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────── */
export function EventOrbitalStage({
  event,
  prevEvent,
  nextEvent,
  coordinators,
}: EventOrbitalStageProps) {
  /* ── DOM refs ─────────────────────────────────────────────────── */
  const stageRef = useRef<HTMLDivElement>(null);      // Outer perspective stage
  const systemRef = useRef<HTMLDivElement>(null);     // Full 3D orbital space
  const cardWrapRef = useRef<HTMLDivElement>(null);   // Central 3D card wrap
  const cardInnerRef = useRef<HTMLDivElement>(null);  // Rotating card body
  const buttonRef = useRef<HTMLDivElement>(null);     // Magnetic CTA button
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const connRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);

  /* ── Interactive 3D Orientation & Orbit state refs ────────────── */
  // 3D System tilt
  const sysRx = useRef(DEF_SYS_RX);
  const sysRy = useRef(DEF_SYS_RY);
  const tgtSysRx = useRef(DEF_SYS_RX);
  const tgtSysRy = useRef(DEF_SYS_RY);

  // Card independent tilt & rotation
  const cardRx = useRef(DEF_CARD_RX);
  const cardRy = useRef(DEF_CARD_RY);
  const tgtCardRx = useRef(DEF_CARD_RX);
  const tgtCardRy = useRef(DEF_CARD_RY);
  const flippedR = useRef(false);

  // Badges orbital angles & auto-rotation flags
  const badgeAngles = useRef(ORBIT_CONFIGS.map((o) => o.initialAngle));
  const badgeAuto = useRef([true, true, true, true]);

  // rAF timing
  const masterRaf = useRef<number>(0);
  const lastT = useRef<number>(0);

  // Drag interaction states
  const dragMode = useRef<"none" | "sys" | "card" | "badge">("none");
  const badgeDragI = useRef(-1);
  const dragX0 = useRef(0);
  const dragY0 = useRef(0);
  const dragRx0 = useRef(0);
  const dragRy0 = useRef(0);
  const lastPointerAngle = useRef<number>(0);
  const dragDist = useRef(0);

  /* ── React state ──────────────────────────────────────────────── */
  const [isFlipped, setIsFlipped] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [draggingBadgeIdx, setDraggingBadgeIdx] = useState<number | null>(null);
  const [isScrolledToDetails, setIsScrolledToDetails] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const detailsEl = document.getElementById("event-details");
      if (!detailsEl) return;
      const rect = detailsEl.getBoundingClientRect();
      setIsScrolledToDetails(rect.top <= window.innerHeight * 0.45);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDetailsScroll = useCallback(() => {
    if (isScrolledToDetails) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById("event-details")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isScrolledToDetails]);

  const handleShare = useCallback(() => {
    if (typeof window !== "undefined" && navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2200);
      });
    }
  }, []);

  const dossier: EventDossier = EVENT_DOSSIERS[event.slug] || {
    edition: "KERNEL '26",
    categoryBadge: event.category.toUpperCase(),
    lastRegistrationDate: "1ST APRIL",
    mode: "On-Campus",
    teamSize: event.facts.find((f) => f.label.toLowerCase().includes("team"))?.value || "1-4",
    prizePool: event.facts.find((f) => f.label.toLowerCase().includes("prize"))?.value || "6,000",
    timeline: {
      prelims: event.date,
      finals: event.date,
      time: "10:00 am - 1:00 pm",
      venue: event.venue,
    },
    overviewSummary: [{ prefix: event.summary, highlight: "", suffix: "" }],
    rules: [
      { prefix: "Teams must adhere to all official event regulations and guidelines.", highlight: "", suffix: "" },
    ],
    format: [
      {
        roundTitle: "Phase 1: Main Challenge",
        points: [{ prefix: event.summary, highlight: "", suffix: "" }],
      },
    ],
    contacts: coordinators.map((c) => ({ name: c, phone: "Desk Contact" })),
  };

  /* Keep flipped state in sync */
  useEffect(() => {
    flippedR.current = isFlipped;
  }, [isFlipped]);

  /* ── Master rAF Render Loop ──────────────────────────────────────
     Drives:
     1. Smooth lerping of whole 3D orbital system orientation.
     2. Smooth lerping of independent central card tilt.
     3. Real-time auto-orbiting of badges & connector lines.
     4. Mathematical 3D point projection (x, y, z) for every badge.
     5. Billboard counter-rotation so HUD badges remain readable.     */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function tick(now: number) {
      const dt = lastT.current ? (now - lastT.current) / 1000 : 0;
      lastT.current = now;

      /* 1. System 3D orientation smooth interpolation */
      sysRx.current = lerp(sysRx.current, tgtSysRx.current, 0.08);
      sysRy.current = lerp(sysRy.current, tgtSysRy.current, 0.08);
      if (systemRef.current) {
        systemRef.current.style.transform = `rotateX(${sysRx.current}deg) rotateY(${sysRy.current}deg)`;
      }

      /* 2. Central card independent 3D rotation */
      cardRx.current = lerp(cardRx.current, tgtCardRx.current, 0.09);
      cardRy.current = lerp(cardRy.current, tgtCardRy.current, 0.09);
      if (cardInnerRef.current) {
        const flipOffset = flippedR.current ? 180 : 0;
        cardInnerRef.current.style.transform = `rotateX(${cardRx.current}deg) rotateY(${cardRy.current + flipOffset}deg)`;
      }

      /* 3. Orbit badges & connector lines in 3D */
      badgeAngles.current.forEach((ang, i) => {
        const config = ORBIT_CONFIGS[i];

        // Advance angle along orbit if not being held by user
        if (badgeAuto.current[i] && dt > 0) {
          badgeAngles.current[i] = (ang + (360 / config.speed) * dt) % 360;
        }

        // Calculate exact 3D position on the tilted orbit ring
        const pt = getOrbitPoint(
          config.radius,
          badgeAngles.current[i],
          config.tiltX,
          config.tiltY,
          config.tiltZ
        );

        // Update badge position and billboard counter-rotation
        const badge = badgeRefs.current[i];
        if (badge) {
          // Counter-rotate with system yaw/pitch so text remains readable
          badge.style.transform = `translate3d(calc(-50% + ${pt.x}px), calc(-50% + ${pt.y}px), ${pt.z}px) rotateY(${-sysRy.current}deg) rotateX(${-sysRx.current}deg)`;

          // Depth cue: slightly dimmer when in negative Z behind card
          const depthFactor = Math.max(0.75, Math.min(1, 0.75 + ((pt.z + 200) / 400) * 0.25));
          badge.style.opacity = String(depthFactor);

          // Proper layering relative to central card (z=0)
          badge.style.zIndex = pt.z > 0 ? "35" : "15";
        }

        // Update 3D connector line angle in its tilted ring plane
        const conn = connRefs.current[i];
        if (conn) {
          conn.style.transform = `translateY(-0.5px) rotate(${badgeAngles.current[i]}deg)`;
        }
      });

      masterRaf.current = requestAnimationFrame(tick);
    }

    masterRaf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(masterRaf.current);
  }, []);

  /* ── Interaction 1: Stage Background Drag → Free 3D System Rotation ── */
  const onStagePD = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragMode.current !== "none") return;
    dragMode.current = "sys";
    dragX0.current = e.clientX;
    dragY0.current = e.clientY;
    dragRx0.current = sysRx.current;
    dragRy0.current = sysRy.current;
    stageRef.current?.setPointerCapture(e.pointerId);
    if (stageRef.current) stageRef.current.style.cursor = "grabbing";
  }, []);

  const onStagePM = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragMode.current !== "sys") return;
    const dx = e.clientX - dragX0.current;
    const dy = e.clientY - dragY0.current;
    tgtSysRy.current = dragRy0.current + dx * 0.45;
    tgtSysRx.current = Math.max(-80, Math.min(80, dragRx0.current - dy * 0.45));
  }, []);

  const onStagePU = useCallback(() => {
    if (dragMode.current !== "sys") return;
    dragMode.current = "none";
    if (stageRef.current) stageRef.current.style.cursor = "grab";
  }, []);

  /* Reset 3D system orientation back to default presentation tilt */
  const reset3DView = useCallback(() => {
    tgtSysRx.current = DEF_SYS_RX;
    tgtSysRy.current = DEF_SYS_RY;
  }, []);

  /* ── Interaction 2: Central Card Drag → Independent Card Spin ──── */
  const onCardPD = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dragMode.current = "card";
    dragDist.current = 0;
    dragX0.current = e.clientX;
    dragY0.current = e.clientY;
    dragRx0.current = cardRx.current;
    dragRy0.current = cardRy.current;
    cardWrapRef.current?.setPointerCapture(e.pointerId);
    if (cardWrapRef.current) cardWrapRef.current.style.cursor = "grabbing";
  }, []);

  const onCardPM = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragMode.current !== "card") return;
    const dx = e.clientX - dragX0.current;
    const dy = e.clientY - dragY0.current;
    dragDist.current = Math.hypot(dx, dy);
    tgtCardRy.current = dragRy0.current + dx * 0.65;
    tgtCardRx.current = dragRx0.current - dy * 0.65;
  }, []);

  const onCardPU = useCallback(() => {
    if (dragMode.current !== "card") return;
    if (dragDist.current < 6) setLightboxOpen(true);
    dragMode.current = "none";
    tgtCardRx.current = DEF_CARD_RX;
    tgtCardRy.current = DEF_CARD_RY;
    if (cardWrapRef.current) cardWrapRef.current.style.cursor = "pointer";
  }, []);

  const onCardDbl = useCallback(() => {
    setIsFlipped((f) => !f);
    tgtCardRy.current += 180;
  }, []);

  /* ── Interaction 3: Orbit Box Drag → Slid Strictly Along 3D Orbit ── */
  const onBadgePD = useCallback((e: ReactPointerEvent<HTMLDivElement>, i: number) => {
    e.stopPropagation();
    dragMode.current = "badge";
    badgeDragI.current = i;
    badgeAuto.current[i] = false; // Pause auto-rotation while user holds box
    setDraggingBadgeIdx(i);

    // Record initial angular direction from stage center to pointer
    if (stageRef.current) {
      const rect = stageRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      lastPointerAngle.current = (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI;
    }

    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    (e.currentTarget as HTMLDivElement).style.cursor = "grabbing";
  }, []);

  const onBadgePM = useCallback((e: ReactPointerEvent<HTMLDivElement>, i: number) => {
    if (dragMode.current !== "badge" || badgeDragI.current !== i) return;

    if (stageRef.current) {
      const rect = stageRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const currentAngle = (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI;

      let delta = currentAngle - lastPointerAngle.current;
      // Handle +/- 180° boundary wrap
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;

      lastPointerAngle.current = currentAngle;

      // Update angle strictly along the orbit ring — mathematically cannot leave orbit
      badgeAngles.current[i] = (badgeAngles.current[i] + delta + 36000) % 360;
    }
  }, []);

  const onBadgePU = useCallback((e: ReactPointerEvent<HTMLDivElement>, i: number) => {
    if (dragMode.current !== "badge") return;
    dragMode.current = "none";
    badgeDragI.current = -1;
    badgeAuto.current[i] = true; // Resume smooth auto-orbit from current spot
    setDraggingBadgeIdx(null);
    (e.currentTarget as HTMLDivElement).style.cursor = "grab";
  }, []);

  /* ── CTA Magnetic Button ───────────────────────────────────────── */
  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const qx = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const qy = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
    const mv = (ev: PointerEvent) => {
      const r = el.getBoundingClientRect();
      qx((ev.clientX - (r.left + r.width / 2)) * 0.35);
      qy((ev.clientY - (r.top + r.height / 2)) * 0.35);
    };
    const rs = () => {
      qx(0);
      qy(0);
    };
    el.addEventListener("pointermove", mv);
    el.addEventListener("pointerleave", rs);
    return () => {
      el.removeEventListener("pointermove", mv);
      el.removeEventListener("pointerleave", rs);
    };
  }, []);

  const isRegistrationOpen = Boolean(event.registrationUrl);

  /* ── Badge HUD Card Component ─────────────────────────────────── */
  const renderBadgeContent = (fact: EventFact, i: number) => {
    const config = ORBIT_CONFIGS[i];
    const isGrabbed = draggingBadgeIdx === i;

    return (
      <div
        className="transition-shadow duration-200"
        style={{
          background: "rgba(5,3,8,0.94)",
          border: `1px solid ${config.color}${isGrabbed ? "bb" : "55"}`,
          borderRadius: 8,
          boxShadow: isGrabbed
            ? `0 0 32px ${config.color}55, 0 8px 36px rgba(0,0,0,0.96)`
            : `0 0 22px ${config.color}22, 0 4px 32px rgba(0,0,0,0.92)`,
          padding: "10px 14px 12px",
          minWidth: 152,
          position: "relative",
          overflow: "hidden",
          backdropFilter: "blur(8px)",
          transform: isGrabbed ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.15s ease-out, border-color 0.15s ease-out, box-shadow 0.15s ease-out",
        }}
      >
        {/* Top: Fact Label + Orbit Icon */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 6 }}>
          <span
            style={{
              fontFamily: "var(--font-mono,monospace)",
              fontSize: 9,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: "rgba(233,223,197,0.45)",
            }}
          >
            {fact.label}:
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono,monospace)",
              fontSize: 11,
              lineHeight: 1,
              opacity: 0.8,
              color: config.color,
            }}
          >
            {config.icon}
          </span>
        </div>

        {/* Value */}
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-mono,monospace)",
            fontSize: 18,
            fontWeight: 900,
            textTransform: "uppercase",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#e9dfc5",
          }}
        >
          {fact.value}
        </span>

        {/* Bottom neon accent gradient */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, ${config.color}${isGrabbed ? "ff" : "90"} 0%, transparent 80%)`,
          }}
        />

        {/* Decorative corner system telemetry */}
        <div
          style={{
            position: "absolute",
            right: 7,
            bottom: 8,
            fontFamily: "var(--font-mono,monospace)",
            fontSize: 7,
            opacity: 0.22,
            lineHeight: 1.2,
            textAlign: "right",
            color: config.color,
            whiteSpace: "pre",
          }}
        >
          {`ORB-0${i + 1}\nLOCKED`}
        </div>
      </div>
    );
  };

  /* ═════════════════════════════════════════════════════════════════
     RENDER
  ═════════════════════════════════════════════════════════════════ */
  return (
    <>
      {lightboxOpen && (
        <ThumbnailLightbox
          src={event.imagePath}
          alt={event.imageAlt}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <main className="relative min-h-screen w-full bg-void text-sand overflow-x-hidden pt-[var(--nav-h)]">
        {/* ── Atmospheric Sci-Fi Arena Lighting ───────────────────────── */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_75%_35%,rgba(228,9,8,0.22)_0%,rgba(180,20,10,0.08)_45%,transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_75%,rgba(228,9,8,0.12)_0%,transparent_50%)]"
        />
        <div aria-hidden className="halftone pointer-events-none absolute inset-0 opacity-20" />

        {/* ── Top Shard Navigation ────────────────────────────────────── */}
        <nav
          aria-label="Event navigation"
          className="relative z-30 mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 sm:px-8 pt-4 pb-2"
        >
          <Link
            href="/events"
            className="group relative inline-flex items-center px-4 sm:px-5 py-2 text-xs sm:text-[13px] font-mono font-bold tracking-widest text-black bg-white hover:bg-[#f3ede2] transition-all duration-200 active:scale-95 shadow-[0_2px_12px_rgba(255,255,255,0.18)]"
            style={{
              clipPath:
                "polygon(12px 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0% 50%)",
            }}
          >
            <span className="flex items-center gap-1.5">
              <span className="text-sm font-black transition-transform group-hover:-translate-x-0.5">‹</span>
              <span>ALL EVENTS</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {prevEvent && (
              <Link
                href={`/events/${prevEvent.slug}`}
                className="group relative inline-flex items-center px-3.5 sm:px-4 py-2 text-xs sm:text-[13px] font-mono font-bold tracking-widest text-black bg-white hover:bg-[#f3ede2] transition-all duration-200 active:scale-95 shadow-[0_2px_12px_rgba(255,255,255,0.18)]"
                style={{
                  clipPath:
                    "polygon(12px 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0% 50%)",
                }}
                title={`Previous: ${prevEvent.title}`}
              >
                <span className="flex items-center gap-1">
                  <span className="text-sm font-black transition-transform group-hover:-translate-x-0.5">‹</span>
                  <span>PREV</span>
                </span>
              </Link>
            )}

            {nextEvent && (
              <Link
                href={`/events/${nextEvent.slug}`}
                className="group relative inline-flex items-center px-3.5 sm:px-4 py-2 text-xs sm:text-[13px] font-mono font-bold tracking-widest text-black bg-white hover:bg-[#f3ede2] transition-all duration-200 active:scale-95 shadow-[0_2px_12px_rgba(255,255,255,0.18)]"
                style={{
                  clipPath:
                    "polygon(12px 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0% 50%)",
                }}
                title={`Next: ${nextEvent.title}`}
              >
                <span className="flex items-center gap-1">
                  <span>NEXT</span>
                  <span className="text-sm font-black transition-transform group-hover:translate-x-0.5">›</span>
                </span>
              </Link>
            )}
          </div>
        </nav>

        {/* ════ SECTION 1: 3D Orbital Poster Stage & Editorial Dossier ══ */}
        <section
          id="overview"
          className="relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 px-4 py-6 sm:px-8 lg:grid-cols-12 lg:gap-8 pb-14"
        >

          {/* ════ LEFT: 3D Orbital Stage (3D System & Interactions) ═══ */}
          <div
            ref={stageRef}
            className="relative lg:col-span-7 flex items-center justify-center min-h-[580px] sm:min-h-[700px] select-none"
            style={{
              perspective: "1900px",
              perspectiveOrigin: "50% 50%",
              cursor: "grab",
              touchAction: "none",
            }}
            onPointerDown={onStagePD}
            onPointerMove={onStagePM}
            onPointerUp={onStagePU}
            onPointerCancel={onStagePU}
            onDoubleClick={reset3DView}
            title="Drag space to rotate in 3D · Drag boxes along orbit rings · Double-click background to reset view"
          >

            {/* ── 3D System Container ──────────────────────────────────
                Rotates freely in 3D around X (pitch) and Y (yaw).
                Children with preserve-3d exist in genuine 3D space.    */}
            <div
              ref={systemRef}
              style={{
                position: "absolute",
                inset: 0,
                transformStyle: "preserve-3d",
                transform: `rotateX(${DEF_SYS_RX}deg) rotateY(${DEF_SYS_RY}deg)`,
              }}
            >

              {/* ── 3D Inclined Orbit Rings & Radial Connector Lines ───
                  Each ring is tilted in 3D by (tiltX, tiltY, tiltZ).
                  From the front they overlap/intersect; in 3D they are
                  spatially separated planar rings!                   */}
              {ORBIT_CONFIGS.map((config, i) => (
                <div
                  key={`orbit-plane-${i}`}
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transformStyle: "preserve-3d",
                    transform: `translate(-50%, -50%) rotateY(${config.tiltY}deg) rotateX(${config.tiltX}deg) rotateZ(${config.tiltZ}deg)`,
                    pointerEvents: "none",
                  }}
                >
                  {/* The circular orbit path in this 3D plane */}
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      width: config.radius * 2,
                      height: config.radius * 2,
                      transform: "translate(-50%, -50%)",
                      borderRadius: "50%",
                      border: i % 2 === 0
                        ? `1px solid rgba(233,223,197,0.14)`
                        : `1px dashed rgba(233,223,197,0.10)`,
                      boxShadow: `0 0 ${16 + i * 6}px ${config.color}15`,
                    }}
                  />

                  {/* 3D Connector line locked to this ring's exact plane */}
                  <div
                    ref={(el) => {
                      connRefs.current[i] = el;
                    }}
                    className="hidden lg:block"
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      width: Math.round(config.radius * 0.72), // Leaves visual clearance before badge
                      height: 1,
                      transformOrigin: "0% 50%",
                      transform: `translateY(-0.5px) rotate(${config.initialAngle}deg)`,
                      backgroundImage: `repeating-linear-gradient(90deg, ${config.color}66 0, ${config.color}66 4px, transparent 4px, transparent 9px)`,
                    }}
                  />
                </div>
              ))}

              {/* ── Central Crosshairs Reticle ──────────────────────── */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: "92%",
                  height: 1,
                  transform: "translate(-50%, -50%)",
                  background: "linear-gradient(90deg, transparent, rgba(233,223,197,0.08), transparent)",
                  pointerEvents: "none",
                }}
              />
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: 1,
                  height: "92%",
                  transform: "translate(-50%, -50%)",
                  background: "linear-gradient(180deg, transparent, rgba(233,223,197,0.08), transparent)",
                  pointerEvents: "none",
                }}
              />

              {/* ── 3D Orbiting Fact Badges (Desktop) ─────────────────
                  Positioned at (x, y, z) calculated from 3D orbital tilt.
                  Can be clicked, dragged, and held strictly along their
                  orbit paths!                                         */}
              {event.facts.slice(0, 4).map((fact, i) => {
                const config = ORBIT_CONFIGS[i];
                const pt = getOrbitPoint(
                  config.radius,
                  config.initialAngle,
                  config.tiltX,
                  config.tiltY,
                  config.tiltZ
                );

                return (
                  <div
                    key={fact.label}
                    ref={(el) => {
                      badgeRefs.current[i] = el;
                    }}
                    aria-label={`${fact.label}: ${fact.value}`}
                    className="hidden lg:block select-none"
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: `translate3d(calc(-50% + ${pt.x}px), calc(-50% + ${pt.y}px), ${pt.z}px) rotateY(${-DEF_SYS_RY}deg) rotateX(${-DEF_SYS_RX}deg)`,
                      cursor: "grab",
                      userSelect: "none",
                      willChange: "transform",
                      zIndex: 30,
                      touchAction: "none",
                    }}
                    onPointerDown={(e) => onBadgePD(e, i)}
                    onPointerMove={(e) => onBadgePM(e, i)}
                    onPointerUp={(e) => onBadgePU(e, i)}
                    onPointerCancel={(e) => onBadgePU(e, i)}
                  >
                    {renderBadgeContent(fact, i)}
                  </div>
                );
              })}

              {/* ── 3D Central Event Card ─────────────────────────────
                  Stationed at center (z = 0) with independent 3D tilt.
                  Double click to flip, click to open lightbox.         */}
              <div
                ref={cardWrapRef}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  transformStyle: "preserve-3d",
                  width: "clamp(260px, 34vw, 345px)",
                  aspectRatio: "4 / 5.4",
                  zIndex: 20,
                  cursor: "pointer",
                  touchAction: "none",
                }}
                onPointerDown={onCardPD}
                onPointerMove={onCardPM}
                onPointerUp={onCardPU}
                onPointerCancel={onCardPU}
                onDoubleClick={onCardDbl}
              >
                <div
                  ref={cardInnerRef}
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                    transform: `rotateX(${DEF_CARD_RX}deg) rotateY(${DEF_CARD_RY}deg)`,
                    willChange: "transform",
                  }}
                >
                  {/* FRONT FACE */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      overflow: "hidden",
                      borderRadius: 18,
                      border: "2.5px solid #ff3b30",
                      boxShadow:
                        "0 0 70px rgba(228,9,8,0.65), 0 0 28px rgba(228,9,8,0.45), inset 0 0 32px rgba(255,255,255,0.1)",
                    }}
                  >
                    <Image
                      src={event.imagePath}
                      alt={event.imageAlt}
                      fill
                      sizes="(max-width: 768px) 300px, 360px"
                      className="object-cover object-top"
                      priority
                      draggable={false}
                      unoptimized
                    />
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 45%, rgba(228,9,8,0.1) 100%)",
                        pointerEvents: "none",
                      }}
                    />
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        width: 28,
                        height: 28,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        background: "rgba(5,3,8,0.72)",
                        border: "1px solid rgba(228,9,8,0.4)",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      <span style={{ fontSize: 11, color: "#e40908" }}>⊕</span>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      overflow: "hidden",
                      borderRadius: 18,
                      border: "2.5px solid #9a4dff",
                      boxShadow:
                        "0 0 70px rgba(154,77,255,0.5), 0 0 28px rgba(154,77,255,0.35), inset 0 0 32px rgba(255,255,255,0.07)",
                    }}
                  >
                    <Image
                      src={event.imagePath}
                      alt={`${event.imageAlt} (back)`}
                      fill
                      sizes="(max-width: 768px) 300px, 360px"
                      className="object-cover object-top"
                      style={{ transform: "scaleX(-1)" }}
                      draggable={false}
                      unoptimized
                    />
                    <div style={{ position: "absolute", inset: 0, background: "rgba(5,3,8,0.70)" }} />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 12,
                        padding: "0 20px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono,monospace)",
                          fontSize: 9,
                          textTransform: "uppercase",
                          letterSpacing: "0.25em",
                          color: "rgba(233,223,197,0.45)",
                        }}
                      >
                        {event.category}
                      </span>
                      <h2
                        className="display text-center text-2xl uppercase leading-tight"
                        style={{
                          background: "linear-gradient(180deg,#fff 0%,#9a4dff 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {event.title}
                      </h2>
                      <p
                        style={{
                          textAlign: "center",
                          fontFamily: "var(--font-body,sans-serif)",
                          fontSize: 11,
                          lineHeight: 1.6,
                          color: "rgba(233,223,197,0.65)",
                          maxWidth: "90%",
                        }}
                      >
                        {event.tagline}
                      </p>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, width: "100%", marginTop: 8 }}>
                        {event.facts.slice(0, 4).map((f, i) => (
                          <div
                            key={f.label}
                            style={{
                              background: "rgba(5,3,8,0.80)",
                              border: `1px solid ${ORBIT_CONFIGS[i].color}40`,
                              borderRadius: 6,
                              padding: "8px 10px",
                              textAlign: "center",
                              backdropFilter: "blur(4px)",
                            }}
                          >
                            <span
                              style={{
                                display: "block",
                                fontFamily: "var(--font-mono,monospace)",
                                fontSize: 8,
                                textTransform: "uppercase",
                                letterSpacing: "0.18em",
                                color: "rgba(233,223,197,0.42)",
                              }}
                            >
                              {f.label}
                            </span>
                            <span
                              style={{
                                display: "block",
                                fontFamily: "var(--font-mono,monospace)",
                                fontSize: 12,
                                fontWeight: 900,
                                textTransform: "uppercase",
                                color: "#e9dfc5",
                                marginTop: 2,
                              }}
                            >
                              {f.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>{/* /system wrapper */}



            {/* ── Mobile Fact Grid (< lg) ──────────────────────────── */}
            <div className="lg:hidden absolute bottom-0 left-0 right-0 mt-6 grid grid-cols-2 gap-3 px-4 pb-4">
              {event.facts.slice(0, 4).map((fact, i) => (
                <div
                  key={fact.label}
                  style={{
                    background: "rgba(5,3,8,0.92)",
                    border: `1px solid ${ORBIT_CONFIGS[i].color}55`,
                    borderRadius: 7,
                    padding: "10px 14px 12px",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: `0 0 15px ${ORBIT_CONFIGS[i].color}18`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono,monospace)",
                        fontSize: 9,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.22em",
                        color: "rgba(233,223,197,0.45)",
                      }}
                    >
                      {fact.label}:
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono,monospace)",
                        fontSize: 11,
                        opacity: 0.65,
                        color: ORBIT_CONFIGS[i].color,
                      }}
                    >
                      {ORBIT_CONFIGS[i].icon}
                    </span>
                  </div>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono,monospace)",
                      fontSize: 16,
                      fontWeight: 900,
                      textTransform: "uppercase",
                      color: "#e9dfc5",
                      lineHeight: 1.1,
                    }}
                  >
                    {fact.value}
                  </span>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: `linear-gradient(90deg, ${ORBIT_CONFIGS[i].color}80 0%, transparent 80%)`,
                    }}
                  />
                </div>
              ))}
            </div>

          </div>{/* /stage */}

          {/* ════ RIGHT: Editorial Dossier (Overview Mode) ═══════════ */}
          <div className="relative z-20 lg:col-span-5 flex flex-col justify-center lg:pl-4 xl:pl-8">
            {/* Top Badges */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-[4px] border border-white/20 bg-white/[0.05] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-sand/85 backdrop-blur-sm">
                {dossier.edition}
              </span>
              <span className="rounded-[4px] border border-white/20 bg-white/[0.05] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-sand/85 backdrop-blur-sm">
                {dossier.categoryBadge}
              </span>
            </div>

            {/* Main Title */}
            <div className="relative mb-2">
              <h1
                className="display text-[clamp(2.1rem,3.4vw,3.8rem)] uppercase leading-[0.92] tracking-tight drop-shadow-[0_0_28px_rgba(228,9,8,0.5)] break-words max-w-full font-black"
                style={{
                  background: "linear-gradient(180deg,#ffffff 0%,#ffd0d0 45%,#e40908 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {event.title}
              </h1>
            </div>

            {/* Tagline */}
            <p className="font-display italic font-bold text-base sm:text-lg uppercase tracking-wide text-sand mb-4 drop-shadow-sm">
              {event.tagline}
            </p>

            {/* Rich Overview Summary with Highlighted Keywords */}
            <p className="text-sm sm:text-[15px] leading-relaxed text-sand/80 mb-6 max-w-prose font-sans">
              {dossier.overviewSummary.map((part, pIdx) => (
                <span key={pIdx}>
                  {part.prefix}
                  {part.highlight && (
                    <span className="text-[#ff453a] font-semibold">{part.highlight}</span>
                  )}
                  {part.suffix}
                </span>
              ))}
            </p>

            {/* Two-Column Event Details & Prize Pool */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 border-t border-white/10">
              {/* Event Details */}
              <div>
                <h2 className="font-display font-black text-base sm:text-lg uppercase tracking-widest text-[#ff3b30] border-b border-[#ff3b30]/40 pb-1.5 mb-3.5">
                  EVENT DETAILS
                </h2>
                <div className="space-y-3 font-mono text-sm sm:text-[15px] font-semibold text-sand/90">
                  {dossier.timeline.prelims && (
                    <div className="flex items-start gap-2.5">
                      <span className="text-base sm:text-lg text-[#ff3b30] shrink-0 leading-none mt-0.5">📅</span>
                      <span>Prelims: {dossier.timeline.prelims}</span>
                    </div>
                  )}
                  {(dossier.timeline.finals || dossier.timeline.date) && (
                    <div className="space-y-1.5">
                      <div className="flex items-start gap-2.5">
                        <span className="text-base sm:text-lg text-[#ff3b30] shrink-0 leading-none mt-0.5">📅</span>
                        <span>
                          {dossier.timeline.prelims
                            ? `Finals: ${dossier.timeline.finals}`
                            : `Date: ${dossier.timeline.date || dossier.timeline.finals}`}
                        </span>
                      </div>
                      <div className="pl-7 space-y-1.5 text-sand/80 text-xs sm:text-[13px] font-medium">
                        {dossier.timeline.time && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm">🕒</span>
                            <span>{dossier.timeline.time}</span>
                          </div>
                        )}
                        {dossier.timeline.venue && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm">📍</span>
                            <span>{dossier.timeline.venue}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2.5 pt-1 text-sand/90">
                    <span className="text-base sm:text-lg shrink-0 leading-none">🌐</span>
                    <span>{dossier.mode}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sand/90">
                    <span className="text-base sm:text-lg shrink-0 leading-none">👥</span>
                    <span>{dossier.teamSize}</span>
                  </div>
                </div>
              </div>

              {/* Prize Pool */}
              <div>
                <h2 className="font-display font-black text-base sm:text-lg uppercase tracking-widest text-[#ff3b30] border-b border-[#ff3b30]/40 pb-1.5 mb-3.5">
                  PRIZE POOL
                </h2>
                <div className="pt-2">
                  <span className="font-mono text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-white tracking-tight drop-shadow-[0_0_28px_rgba(228,9,8,0.5)] leading-none">
                    {dossier.prizePool.startsWith("₹") ? dossier.prizePool : `₹${dossier.prizePool}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════ SECTION 2: EVENT RULES, EVENT FORMAT & CONTACTS ═════════ */}
        <section
          id="event-details"
          className="relative z-10 mx-auto w-full max-w-[1360px] px-4 py-12 sm:px-8 pb-36 border-t border-white/10 mt-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left Column (~68%): Rules & Format */}
            <div className="lg:col-span-8 space-y-12">
              {/* Event Rules */}
              <div>
                <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-widest text-[#ff3b30] drop-shadow-[0_0_16px_rgba(255,59,48,0.35)]">
                  EVENT RULES
                </h2>
                <div className="h-0.5 w-full bg-[#ff3b30] mt-2.5 mb-6 shadow-[0_0_8px_#ff3b30]" />
                <ul className="space-y-4 font-sans text-sm sm:text-[15px] leading-relaxed text-sand/85">
                  {dossier.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-[#ff3b30] text-lg leading-none mt-0.5 select-none font-bold">
                        •
                      </span>
                      <span>
                        {rule.prefix}
                        {rule.highlight && (
                          <span className="text-[#ff453a] font-semibold">{rule.highlight}</span>
                        )}
                        {rule.suffix}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Event Format */}
              <div>
                <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-widest text-[#ff3b30] drop-shadow-[0_0_16px_rgba(255,59,48,0.35)]">
                  EVENT FORMAT
                </h2>
                <div className="h-0.5 w-full bg-[#ff3b30] mt-2.5 mb-6 shadow-[0_0_8px_#ff3b30]" />
                <div className="space-y-8">
                  {dossier.format.map((fmt, rIdx) => (
                    <div key={rIdx} className="space-y-3">
                      <h3 className="font-mono text-base sm:text-lg font-bold text-white tracking-wide flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#ff3b30] shadow-[0_0_8px_#ff3b30]" />
                        {fmt.roundTitle}
                      </h3>
                      <ul className="space-y-3 font-sans text-sm sm:text-[15px] leading-relaxed text-sand/80 pl-3">
                        {fmt.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-3">
                            <span className="text-[#ff3b30] text-lg leading-none mt-0.5 select-none font-bold">
                              •
                            </span>
                            <span>
                              {pt.prefix}
                              {pt.highlight && (
                                <span className="text-[#ff453a] font-semibold">
                                  {pt.highlight}
                                </span>
                              )}
                              {pt.suffix}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (~32%): Contacts */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-widest text-[#ff3b30] drop-shadow-[0_0_16px_rgba(255,59,48,0.35)]">
                  CONTACT
                </h2>
                <div className="h-0.5 w-full bg-[#ff3b30] mt-2.5 mb-6 shadow-[0_0_8px_#ff3b30]" />
                <div className="space-y-4 font-mono text-xs sm:text-sm">
                  {dossier.contacts.map((contact, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-4 py-3 border-b border-white/10 hover:border-[#ff3b30]/50 transition-colors"
                    >
                      <span className="text-sand/90 font-medium text-sm">{contact.name}</span>
                      <a
                        href={`tel:${contact.phone.replace(/\D/g, "").startsWith("91") ? "+" + contact.phone.replace(/\D/g, "") : "+91" + contact.phone.replace(/\D/g, "")}`}
                        className="flex items-center gap-1.5 text-sand/75 hover:text-[#ff3b30] transition-colors group"
                        title={`Call ${contact.name}`}
                      >
                        <span className="text-xs group-hover:scale-110 transition-transform">
                          📞
                        </span>
                        <span className="tracking-wider">{contact.phone}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Persistent Bottom HUD Bar ────────────────────────────── */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center gap-2.5 sm:gap-4 px-3 py-2 pointer-events-auto select-none">
          {/* Scroll toggle: DETAILS / OVERVIEW */}
          <button
            type="button"
            onClick={toggleDetailsScroll}
            className="group relative inline-flex items-center px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-mono font-black tracking-widest text-black bg-white hover:bg-[#f3ede2] transition-all duration-200 active:scale-95 shadow-[0_4px_24px_rgba(0,0,0,0.65)] cursor-pointer"
            style={{
              clipPath:
                "polygon(12px 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0% 50%)",
            }}
          >
            <span className="flex items-center gap-2">
              {!isScrolledToDetails ? (
                <>
                  <span>DETAILS</span>
                  <span className="text-sm">📄</span>
                </>
              ) : (
                <>
                  <span>OVERVIEW</span>
                  <span className="text-sm text-[#ff3b30]">✦</span>
                </>
              )}
            </span>
          </button>

          {/* SHARE Button */}
          <button
            type="button"
            onClick={handleShare}
            className="group relative inline-flex items-center px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-mono font-black tracking-widest text-black bg-white hover:bg-[#f3ede2] transition-all duration-200 active:scale-95 shadow-[0_4px_24px_rgba(0,0,0,0.65)] cursor-pointer"
            style={{
              clipPath:
                "polygon(12px 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0% 50%)",
            }}
          >
            <span className="flex items-center gap-2">
              {copiedLink ? (
                <>
                  <span className="text-emerald-700">COPIED!</span>
                  <span className="text-emerald-700">✓</span>
                </>
              ) : (
                <>
                  <span>SHARE</span>
                  <span className="text-sm">🔗</span>
                </>
              )}
            </span>
          </button>

          {/* Registration / Status Button */}
          {isRegistrationOpen && event.registrationUrl ? (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-mono font-black tracking-widest text-cyan-200 bg-[#0e1724]/95 hover:bg-[#152336] border border-cyan-500/50 hover:border-cyan-400 transition-all duration-200 active:scale-95 shadow-[0_0_24px_rgba(0,240,255,0.25)]"
              style={{
                clipPath:
                  "polygon(12px 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0% 50%)",
              }}
            >
              <span className="flex items-center gap-2.5">
                <span>REGISTER</span>
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f0ff]" />
              </span>
            </a>
          ) : (
            <button
              type="button"
              onClick={() =>
                alert("Registrations for this event are opening shortly. Stay tuned!")
              }
              className="group relative inline-flex items-center px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-mono font-black tracking-widest text-amber-200/90 bg-[#161208]/90 border border-amber-500/40 hover:border-amber-400/60 transition-all duration-200 cursor-pointer active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
              style={{
                clipPath:
                  "polygon(12px 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0% 50%)",
              }}
            >
              <span className="flex items-center gap-2">
                <span>COMING SOON</span>
                <span className="text-sm">⏳</span>
              </span>
            </button>
          )}
        </div>
      </main>
    </>
  );
}
