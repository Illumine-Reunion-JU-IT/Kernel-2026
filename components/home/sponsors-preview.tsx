"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { sponsors, publicOnly } from "@/lib/content";
import { CROPS, cropStyle } from "@/lib/poster";
import type { Sponsor } from "@/types";

/* Tier layout from the sponsorship deck: 1 Title, 2 Platinum, 3 Gold slots. */
const TIERS = [
  { key: "title", label: "Title partner", slots: 1, size: "h-40 md:h-56" },
  { key: "platinum", label: "Platinum", slots: 2, size: "h-32 md:h-40" },
  { key: "gold", label: "Gold", slots: 3, size: "h-24 md:h-32" }
];

/**
 * To add a sponsor: put an entry in data/sponsors.json with isPlaceholder: false, a name, a logo in
 * public/images/sponsors/ and category "Title", "Platinum" or "Gold". Its slot swaps from "Coming soon" to the logo.
 */
export function SponsorsPreview() {
  const root = useRef<HTMLElement>(null);
  const real = publicOnly(sponsors);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo("[data-bld]", { yPercent: 14 }, { yPercent: -12, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo("[data-crowd]", { yPercent: -20 }, { yPercent: 22, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.utils.toArray<HTMLElement>("[data-tier]").forEach((t) => {
        gsap.from(t.querySelectorAll("[data-sp]"), { scale: 0.8, opacity: 0, rotate: -4, stagger: 0.12, duration: 1, ease: "expo.out", scrollTrigger: { trigger: t, start: "top 85%", once: true } });
        gsap.fromTo(t.querySelector("[data-tier-line]"), { scaleX: 0 }, { scaleX: 1, transformOrigin: "left", ease: "none", scrollTrigger: { trigger: t, start: "top 90%", end: "top 55%", scrub: true } });
      });
    });
    return () => mm.revert();
  }, []);

  const byTier = (key: string): Sponsor[] => real.filter((s) => s.category.toLowerCase().includes(key));

  return (
    <section ref={root} id="sponsors" aria-labelledby="sponsors-title" className="relative overflow-hidden bg-void py-section">
      <div aria-hidden data-bld className="absolute -left-[5vw] top-[4%] w-[26vw] min-w-40 rotate-[-4deg] opacity-80 grayscale shard-b" style={cropStyle(CROPS.building)} />
      <div aria-hidden data-crowd className="absolute -right-[4vw] bottom-[2%] w-[30vw] min-w-48 rotate-[3deg] opacity-60 grayscale shard-a" style={cropStyle(CROPS.crowd)} />

      <div className="container relative mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="mb-4 font-mono text-xs text-sand-dim"><span className="slashes" />Backed by</p>
          <h2 id="sponsors-title" className="display text-[clamp(2.8rem,7vw,6.4rem)]">Built with <span className="text-signal">our partners</span></h2>
          <p className="mt-4 max-w-lg mx-auto text-sand-dim">Brands joining KERNEL appear here, tier by tier. Want yours in front of a highly talented student community?</p>
        </div>

        <div className="mt-16 max-w-4xl mx-auto space-y-12">
          {TIERS.map((tier) => {
            const have = byTier(tier.key).slice(0, tier.slots);
            const slots = Array.from({ length: tier.slots }, (_, i) => have[i] ?? null);
            return (
              <div key={tier.key} data-tier>
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="font-mono text-xs font-bold text-sand">{tier.label}</h3>
                  <span data-tier-line className="h-px flex-1 bg-sand/25" />
                </div>
                <ul className={`grid gap-4 ${tier.slots === 1 ? "grid-cols-1" : tier.slots === 2 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"}`}>
                  {slots.map((s, i) => (
                    <li key={s?.id ?? `${tier.key}-${i}`} data-sp className={`relative grid place-items-center overflow-hidden ${tier.size} ${tier.slots === 3 && i === 2 ? "col-span-2 md:col-span-1" : ""} ${s ? "bg-sand" : "border border-dashed border-sand/30 bg-forest/80 backdrop-blur-sm"} ${i % 2 ? "shard-b" : "shard-a"}`}>
                      {s ? (
                        <Image src={s.logoPath} alt={s.logoAlt} fill sizes="30vw" className="object-contain p-5" />
                      ) : (
                        <>
                          <span aria-hidden className="absolute left-0 top-0 h-full w-1.5 bg-signal" />
                          <p className="display text-lg text-sand/80 md:text-2xl">Coming soon</p>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
