"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { sponsors, publicOnly, siteContent } from "@/lib/content";
import type { Sponsor } from "@/types";

function getLogoSurface(id: string) {
  if (id === "sponsor-studio-one") return "#eb5e0b";
  return "#ffffff";
}

function TierCard({
  sponsor,
  index,
  variant,
}: {
  sponsor: Sponsor;
  index: number;
  variant: "gold" | "silver" | "partner";
}) {
  const num = String(index + 1).padStart(2, "0");
  const cardRef = useRef<HTMLElement>(null);

  const palette = {
    gold: {
      accent: "#E5C158",
      spotlight: "rgba(229, 193, 88, 0.18)",
      rim: "rgba(229, 193, 88, 0.32)",
      logoHeight: "h-36 sm:h-40",
      padding: "p-6 sm:p-8",
      titleSize: "text-xl sm:text-2xl",
    },
    silver: {
      accent: "#C8D0DA",
      spotlight: "rgba(200, 208, 218, 0.16)",
      rim: "rgba(200, 208, 218, 0.26)",
      logoHeight: "h-28 sm:h-32",
      padding: "p-5 sm:p-7",
      titleSize: "text-lg sm:text-xl",
    },
    partner: {
      accent: "#e40908",
      spotlight: "rgba(228, 9, 8, 0.18)",
      rim: "rgba(228, 9, 8, 0.28)",
      logoHeight: "h-24 sm:h-28",
      padding: "p-5 sm:p-6",
      titleSize: "text-base sm:text-lg",
    },
  }[variant];

  const handlePointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;
    el.style.setProperty("--rx", `${(-py * 10).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * 12).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${x.toFixed(0)}px`);
    el.style.setProperty("--my", `${y.toFixed(0)}px`);
    el.style.setProperty("--spot-opacity", "1");
  };

  const handlePointerLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--spot-opacity", "0");
  };

  const card = (
    <div className="h-full [perspective:1100px]">
      <article
        ref={cardRef}
        data-sponsor-tile
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={`group relative flex h-full flex-col justify-between rounded-xl bg-gradient-to-br from-[#1b1b24] via-[#111117] to-[#08080c] transition-[transform,box-shadow,border-color] duration-300 ease-out [transform-style:preserve-3d] [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] ${palette.padding}`}
        style={{
          border: `1px solid ${palette.rim}`,
          boxShadow:
            "0 22px 45px -16px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.12), inset 0 -2px 0 rgba(0, 0, 0, 0.65)",
        }}
      >
        {/* Dynamic 3D cursor spotlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl opacity-[var(--spot-opacity,0)] transition-opacity duration-300"
          style={{
            background: `radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), ${palette.spotlight}, transparent 68%)`,
          }}
        />

        {/* Top bevel gloss */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />

        {/* Top metadata row — elevated in Z */}
        <div className="relative flex items-center justify-between gap-3 [transform:translateZ(18px)]">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <span
              className="font-mono text-[11px] font-bold tracking-widest"
              style={{ color: palette.accent }}
            >
              {num}
            </span>
            <span aria-hidden className="h-2.5 w-px bg-sand/20" />
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{
                color: variant === "partner" ? "#d2ccb6" : palette.accent,
              }}
            >
              {sponsor.category}
            </span>
          </div>

          {sponsor.url && (
            <span
              aria-hidden
              className="grid h-7 w-7 place-items-center rounded-full border border-white/15 bg-black/50 font-mono text-xs shadow-[0_4px_12px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:scale-110 group-hover:border-transparent group-hover:bg-signal group-hover:text-void group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{ color: palette.accent }}
            >
              ↗
            </span>
          )}
        </div>

        {/* Floating 3D Logo Pedestal */}
        <div className="relative my-5 [transform:translateZ(28px)]">
          <div
            className={`relative w-full overflow-hidden rounded-lg border border-white/20 shadow-[0_14px_28px_-10px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.6)] transition-all duration-300 group-hover:shadow-[0_22px_40px_-10px_rgba(0,0,0,0.9)] ${palette.logoHeight}`}
            style={{ background: getLogoSurface(sponsor.id) }}
          >
            <Image
              src={sponsor.logoPath}
              alt={sponsor.logoAlt}
              fill
              className="object-contain p-4 sm:p-5 transition-transform duration-500 ease-snap group-hover:scale-[1.06]"
              sizes={
                variant === "gold"
                  ? "(max-width: 768px) 92vw, 640px"
                  : variant === "silver"
                  ? "(max-width: 768px) 92vw, 520px"
                  : "(max-width: 640px) 92vw, 30vw"
              }
            />
          </div>
        </div>

        {/* Bottom title & tagline — elevated in Z */}
        <div className="relative flex items-end justify-between gap-4 pt-1 [transform:translateZ(18px)]">
          <div>
            <h3 className={`display text-sand transition-colors duration-300 group-hover:text-white ${palette.titleSize}`}>
              {sponsor.name}
            </h3>
            {sponsor.tagline && (
              <p className="mt-1 font-mono text-xs uppercase tracking-wider text-sand-dim/80 transition-colors duration-300 group-hover:text-sand-dim">
                {sponsor.tagline}
              </p>
            )}
          </div>
          <span
            aria-hidden
            className="condensed text-2xl leading-none opacity-30 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:opacity-80"
            style={{ color: palette.accent }}
          >
            /{num}
          </span>
        </div>
      </article>
    </div>
  );

  return sponsor.url ? (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="Visit"
      className="block h-full focus-visible:outline-none"
    >
      {card}
    </a>
  ) : (
    <div className="h-full">{card}</div>
  );
}

export function SponsorsPreview() {
  const root = useRef<HTMLElement>(null);
  const real = publicOnly(sponsors);

  const gold = real.filter((s) => s.tier === "gold");
  const silver = real.filter((s) => s.tier === "silver");
  const partners = real.filter((s) => s.tier !== "gold" && s.tier !== "silver");
  const contactEmail = siteContent.contactEmail || "kerneljuit@gmail.com";

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add({ motion: "(prefers-reduced-motion: no-preference)" }, (ctx) => {
      const { motion } = ctx.conditions as { motion: boolean };
      if (!motion) return;
      gsap.fromTo(
        "[data-sponsor-tile]",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      id="sponsors"
      aria-labelledby="sponsors-title"
      className="relative overflow-hidden bg-void py-section border-t border-sand/10"
    >
      <div
        aria-hidden
        className="halftone pointer-events-none absolute right-0 top-0 h-72 w-72 opacity-20"
      />

      <div className="container relative">
        {/* Section header */}
        <div className="flex flex-col gap-6 border-b border-sand/15 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker mb-3 text-sand-dim">
              <span className="slashes" />
              Backed by
            </p>
            <h2
              id="sponsors-title"
              className="display section-title max-w-4xl"
            >
              Partners &amp; <span className="outline-text">Sponsors</span>
            </h2>
          </div>
          <p className="section-subtitle max-w-sm text-sand-dim">
            Organisations and platforms powering KERNEL 1.0 at Jadavpur
            University. Select any partner to visit their official site.
          </p>
        </div>

        {/* Tier 1: Gold Sponsor (Top Showcase) */}
        {gold.length > 0 && (
          <div className="mt-12">
            <div className="mb-4 flex items-center gap-4">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-[#E5C158]">
                {"/// Gold Sponsor"}
              </span>
              <span className="h-px flex-1 bg-[#E5C158]/25" />
            </div>
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6">
              {gold.map((s, idx) => (
                <TierCard key={s.id} sponsor={s} index={idx} variant="gold" />
              ))}
            </div>
          </div>
        )}

        {/* Tier 2: Silver Sponsor */}
        {silver.length > 0 && (
          <div className="mt-12">
            <div className="mb-4 flex items-center gap-4">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-[#C8D0DA]">
                {"/// Silver Sponsor"}
              </span>
              <span className="h-px flex-1 bg-[#C8D0DA]/25" />
            </div>
            <div
              className={`mx-auto grid gap-6 ${
                silver.length === 1
                  ? "max-w-lg grid-cols-1"
                  : "max-w-4xl grid-cols-1 sm:grid-cols-2"
              }`}
            >
              {silver.map((s, idx) => (
                <TierCard
                  key={s.id}
                  sponsor={s}
                  index={gold.length + idx}
                  variant="silver"
                />
              ))}
            </div>
          </div>
        )}

        {/* Tier 3: Official & Ecosystem Partners */}
        {partners.length > 0 && (
          <div className="mt-14">
            <div className="mb-4 flex items-center gap-4">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-sand-dim">
                {"/// Official & Media Partners"}
              </span>
              <span className="h-px flex-1 bg-sand/15" />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {partners.map((s, idx) => (
                <TierCard
                  key={s.id}
                  sponsor={s}
                  index={gold.length + silver.length + idx}
                  variant="partner"
                />
              ))}
            </div>
          </div>
        )}

        {/* Bottom inquiry strip */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-sand/15 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-xs uppercase tracking-widest text-sand-dim">
            Interested in partnering with KERNEL 1.0?
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={`mailto:${contactEmail}`}
              className="kbtn kbtn-text font-mono text-xs"
            >
              <span className="kbtn-label">{contactEmail}</span>
            </a>
            <Link href="/#contact" className="kbtn kbtn-secondary">
              <span className="kbtn-label">Become a sponsor</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
