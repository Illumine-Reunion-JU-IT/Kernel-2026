"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { sponsors, publicOnly, siteContent } from "@/lib/content";
import type { Sponsor } from "@/types";

function getLogoSurface(id: string) {
  if (id === "sponsor-edugraph") return "#000000";
  if (id === "sponsor-studio-one") return "#eb5e0b";
  return "#ffffff";
}

function CornerBrackets({ color }: { color: string }) {
  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 transition-all duration-300 group-hover:h-6 group-hover:w-6"
        style={{ borderColor: color }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 transition-all duration-300 group-hover:h-6 group-hover:w-6"
        style={{ borderColor: color }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 transition-all duration-300 group-hover:h-6 group-hover:w-6"
        style={{ borderColor: color }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 transition-all duration-300 group-hover:h-6 group-hover:w-6"
        style={{ borderColor: color }}
      />
    </>
  );
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

  const palette = {
    gold: {
      accent: "#E5C158",
      border: "rgba(229, 193, 88, 0.35)",
      hoverGlow: "0 18px 50px -18px rgba(229, 193, 88, 0.25)",
      logoHeight: "h-36 sm:h-44",
      padding: "p-7 sm:p-9",
      titleSize: "text-2xl sm:text-3xl",
    },
    silver: {
      accent: "#C8D0DA",
      border: "rgba(200, 208, 218, 0.32)",
      hoverGlow: "0 18px 50px -18px rgba(200, 208, 218, 0.2)",
      logoHeight: "h-28 sm:h-36",
      padding: "p-6 sm:p-8",
      titleSize: "text-xl sm:text-2xl",
    },
    partner: {
      accent: "#e40908",
      border: "rgba(233, 223, 197, 0.16)",
      hoverGlow: "0 14px 36px -18px rgba(228, 9, 8, 0.22)",
      logoHeight: "h-24 sm:h-28",
      padding: "p-5 sm:p-6",
      titleSize: "text-lg sm:text-xl",
    },
  }[variant];

  const card = (
    <article
      data-sponsor-tile
      className={`group relative flex h-full flex-col justify-between bg-forest/75 transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest ${palette.padding}`}
      style={{
        border: `1px solid ${palette.border}`,
        boxShadow: palette.hoverGlow,
      }}
    >
      <CornerBrackets color={palette.accent} />

      {/* Top metadata row */}
      <div className="flex items-center justify-between gap-3 border-b border-sand/10 pb-3.5">
        <div className="flex items-center gap-2.5">
          <span
            className="font-mono text-xs font-bold tracking-widest"
            style={{ color: palette.accent }}
          >
            {num}
          </span>
          <span aria-hidden className="h-3 w-px bg-sand/20" />
          <span
            className="font-mono text-[10px] font-bold uppercase tracking-[0.22em]"
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
            className="font-mono text-sm text-sand-dim transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{ color: palette.accent }}
          >
            ↗
          </span>
        )}
      </div>

      {/* Logo frame */}
      <div
        className={`relative my-6 w-full overflow-hidden border border-sand/15 ${palette.logoHeight}`}
        style={{ background: getLogoSurface(sponsor.id) }}
      >
        <Image
          src={sponsor.logoPath}
          alt={sponsor.logoAlt}
          fill
          className="object-contain p-4 sm:p-6 transition-transform duration-500 ease-snap group-hover:scale-[1.03]"
          sizes={
            variant === "gold"
              ? "(max-width: 768px) 92vw, 640px"
              : variant === "silver"
              ? "(max-width: 768px) 92vw, 520px"
              : "(max-width: 640px) 92vw, 30vw"
          }
        />
      </div>

      {/* Bottom title & tagline */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h3 className={`display text-sand ${palette.titleSize}`}>
            {sponsor.name}
          </h3>
          {sponsor.tagline && (
            <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-sand-dim/80">
              {sponsor.tagline}
            </p>
          )}
        </div>
        <span
          aria-hidden
          className="condensed text-2xl leading-none opacity-25 transition-opacity duration-300 group-hover:opacity-60"
          style={{ color: palette.accent }}
        >
          /{num}
        </span>
      </div>
    </article>
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
        <div className="flex flex-col gap-6 border-b border-sand/15 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-sand-dim">
              <span className="slashes" />
              Backed by
            </p>
            <h2
              id="sponsors-title"
              className="display max-w-4xl text-[clamp(2.8rem,7vw,6.2rem)]"
            >
              Partners &amp; <span className="outline-text">Sponsors</span>
            </h2>
          </div>
          <p className="max-w-sm font-mono text-xs leading-relaxed text-sand-dim">
            Organisations and platforms powering KERNEL 1.0 at Jadavpur
            University. Select any partner to visit their official site.
          </p>
        </div>

        {/* Tier 1: Gold Sponsor (Top Showcase) */}
        {gold.length > 0 && (
          <div className="mt-12">
            <div className="mb-4 flex items-center gap-4">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-[#E5C158]">
                /// Gold Sponsor
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
                /// Silver Sponsor
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
                /// Official &amp; Media Partners
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
