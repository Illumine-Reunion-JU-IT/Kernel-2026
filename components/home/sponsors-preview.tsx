"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { sponsors, publicOnly } from "@/lib/content";
import { CROPS, cropStyle } from "@/lib/poster";
import type { Sponsor } from "@/types";

const TIERS = [
  { key: "gold", index: "01", label: "Gold Sponsor", cols: "grid-cols-1 max-w-md mx-auto", plateH: "h-36 sm:h-44" },
  { key: "silver", index: "02", label: "Silver Sponsor", cols: "grid-cols-1 max-w-sm mx-auto", plateH: "h-28 sm:h-36" },
  { key: "partner", index: "03", label: "Official Partners", cols: "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto", plateH: "h-24 sm:h-32" },
] as const;

function getPlateBg(id: string): string {
  if (id === "sponsor-edugraph") return "#000000";
  if (id === "sponsor-studio-one") return "#eb5e0b";
  return "#ffffff";
}

function SponsorTile({ s, plateH, index }: { s: Sponsor; plateH: string; index: number }) {
  const card = (
    <article
      data-sp
      className={`group relative border border-sand/15 bg-forest/70 backdrop-blur-sm transition-colors duration-300 hover:border-signal/70 ${index % 2 ? "shard-b" : "shard-a"}`}
    >
      {/* Top signal accent strip */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-1 bg-sand/20 transition-colors duration-300 group-hover:bg-signal"
      />

      {/* Logo plate */}
      <div
        className={`relative w-full ${plateH} overflow-hidden border-b border-sand/10`}
        style={{ background: getPlateBg(s.id) }}
      >
        <Image
          src={s.logoPath}
          alt={s.logoAlt}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 32vw"
          className="object-contain p-5 sm:p-6 transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      {/* Metadata footer */}
      <div className="flex items-center justify-between gap-3 px-5 py-3.5">
        <div className="min-w-0">
          <p className="display truncate text-base sm:text-lg text-sand group-hover:text-white transition-colors">
            {s.name}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-sand-dim">
            {s.category}
          </p>
        </div>
        {s.url && (
          <span
            aria-hidden
            className="flex h-8 w-8 shrink-0 items-center justify-center border border-sand/20 font-mono text-xs text-sand transition-all duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-void"
          >
            ↗
          </span>
        )}
      </div>
    </article>
  );

  return s.url ? (
    <a href={s.url} target="_blank" rel="noopener noreferrer" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal">
      {card}
    </a>
  ) : (
    card
  );
}

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
        gsap.from(t.querySelectorAll("[data-sp]"), {
          y: 28,
          opacity: 0,
          stagger: 0.1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: t, start: "top 88%", once: true },
        });
        gsap.fromTo(
          t.querySelector("[data-tier-line]"),
          { scaleX: 0 },
          { scaleX: 1, transformOrigin: "left", ease: "none", scrollTrigger: { trigger: t, start: "top 92%", end: "top 60%", scrub: true } }
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="sponsors" aria-labelledby="sponsors-title" className="relative overflow-hidden bg-void py-section">
      {/* Subtle architectural poster shards matching rest of homepage */}
      <div aria-hidden data-bld className="absolute -left-[5vw] top-[4%] w-[26vw] min-w-40 rotate-[-4deg] opacity-55 grayscale shard-b" style={cropStyle(CROPS.building)} />
      <div aria-hidden data-crowd className="absolute -right-[4vw] bottom-[2%] w-[30vw] min-w-48 rotate-[3deg] opacity-40 grayscale shard-a" style={cropStyle(CROPS.crowd)} />

      <div className="container relative mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="mb-4 font-mono text-xs text-sand-dim">
            <span className="slashes" />Backed by
          </p>
          <h2 id="sponsors-title" className="display text-[clamp(2.8rem,7vw,6.4rem)]">
            Built with <span className="text-signal">our partners</span>
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-sm sm:text-base text-sand-dim">
            Organisations powering KERNEL 1.0 at Jadavpur University. Select any partner to visit their official site.
          </p>
        </div>

        <div className="mt-16 max-w-4xl mx-auto space-y-14">
          {TIERS.map((tier) => {
            const list = real.filter((s) => s.tier === tier.key);
            if (list.length === 0) return null;
            return (
              <div key={tier.key} data-tier>
                <div className="mb-6 flex items-center gap-4">
                  <span className="font-mono text-[11px] font-bold text-signal">{tier.index}</span>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-sand">
                    {tier.label}
                  </h3>
                  <span data-tier-line className="h-px flex-1 bg-sand/20" />
                </div>
                <div className={`grid gap-5 ${tier.cols}`}>
                  {list.map((s, i) => (
                    <SponsorTile key={s.id} s={s} plateH={tier.plateH} index={i} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
