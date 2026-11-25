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

function SponsorTile({
  sponsor,
  index,
  featured = false,
}: {
  sponsor: Sponsor;
  index: number;
  featured?: boolean;
}) {
  const num = String(index + 1).padStart(2, "0");
  const isGold = sponsor.tier === "gold";
  const isSilver = sponsor.tier === "silver";

  const content = (
    <article
      data-sponsor-tile
      className="group relative flex h-full flex-col justify-between bg-forest/70 p-6 sm:p-8 transition-colors duration-300 hover:bg-forest-soft"
    >
      {/* Top index + tier bar */}
      <div className="flex items-center justify-between gap-3 border-b border-sand/15 pb-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold tracking-widest text-signal">
            {num}
          </span>
          <span aria-hidden className="h-3 w-px bg-sand/20" />
          <span
            className={
              isGold
                ? "bg-signal px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-void"
                : isSilver
                ? "border border-sand/40 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-sand"
                : "font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-sand-dim"
            }
          >
            {sponsor.category}
          </span>
        </div>
        {sponsor.url && (
          <span
            aria-hidden
            className="font-mono text-sm text-sand-dim transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal"
          >
            ↗
          </span>
        )}
      </div>

      {/* Logo stage */}
      <div
        className={`relative my-6 w-full overflow-hidden border border-sand/10 ${
          featured ? "h-36 sm:h-44" : "h-24 sm:h-28"
        }`}
        style={{ background: getLogoSurface(sponsor.id) }}
      >
        <Image
          src={sponsor.logoPath}
          alt={sponsor.logoAlt}
          fill
          className="object-contain p-4 sm:p-6 transition-transform duration-500 ease-snap group-hover:scale-[1.04]"
          sizes={
            featured
              ? "(max-width: 768px) 92vw, 48vw"
              : "(max-width: 640px) 92vw, 30vw"
          }
        />
      </div>

      {/* Bottom editorial metadata */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h3
            className={`display text-sand ${
              featured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
            }`}
          >
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
          className="condensed text-2xl leading-none text-sand/15 transition-colors duration-300 group-hover:text-signal/50"
        >
          /{num}
        </span>
      </div>

      {/* Bottom wipe rule */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-signal transition-transform duration-500 ease-snap group-hover:scale-x-100"
      />
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
      {content}
    </a>
  ) : (
    <div className="h-full">{content}</div>
  );
}

export function SponsorsPreview() {
  const root = useRef<HTMLElement>(null);
  const real = publicOnly(sponsors);

  const principal = real.filter((s) => s.tier === "gold" || s.tier === "silver");
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
      {/* Subtle halftone corner accent matching brochure aesthetic */}
      <div
        aria-hidden
        className="halftone pointer-events-none absolute right-0 top-0 h-72 w-72 opacity-20"
      />

      <div className="container relative">
        {/* Editorial section header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-sand/15 pb-10">
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

        {/* Row 1: Principal Sponsors (Gold & Silver) */}
        {principal.length > 0 && (
          <div className="mt-10">
            <div className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-sand-dim">
              <span>/// Title &amp; Principal Tiers</span>
              <span>{String(principal.length).padStart(2, "0")} Featured</span>
            </div>
            <div className="grid grid-cols-1 gap-px bg-sand/15 border border-sand/15 md:grid-cols-12">
              {principal.map((s, idx) => (
                <div
                  key={s.id}
                  className={
                    principal.length === 2
                      ? idx === 0
                        ? "md:col-span-7"
                        : "md:col-span-5"
                      : "md:col-span-6"
                  }
                >
                  <SponsorTile sponsor={s} index={idx} featured />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Row 2: Official & Ecosystem Partners */}
        {partners.length > 0 && (
          <div className="mt-10">
            <div className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-sand-dim">
              <span>/// Ecosystem &amp; Media Partners</span>
              <span>{String(partners.length).padStart(2, "0")} Partners</span>
            </div>
            <div className="grid grid-cols-1 gap-px bg-sand/15 border border-sand/15 sm:grid-cols-2 lg:grid-cols-3">
              {partners.map((s, idx) => (
                <div key={s.id}>
                  <SponsorTile
                    sponsor={s}
                    index={principal.length + idx}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom inquiry strip */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-sand/15 pt-6 sm:flex-row sm:items-center">
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
