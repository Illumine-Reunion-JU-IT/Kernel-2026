"use client";
import Image from "next/image";
import { sponsors, publicOnly } from "@/lib/content";
import type { Sponsor } from "@/types";

/* ─── Sponsor tier config ─────────────────────────────────────────────── */
const TIER_CONFIG: Record<
  string,
  {
    label: string;
    badge: string;
    badgeBg: string;
    badgeText: string;
    glow: string;
    border: string;
    cardBg: string;
    logoBg: string;
    logoH: string;
    logoP: string;
    cols: string;
    maxW: string;
  }
> = {
  gold: {
    label: "Gold Sponsor",
    badge: "✦ GOLD",
    badgeBg: "linear-gradient(135deg,#b8860b,#ffd700,#b8860b)",
    badgeText: "#0a0800",
    glow: "rgba(255,215,0,0.25)",
    border: "rgba(255,215,0,0.5)",
    cardBg: "rgba(255,215,0,0.04)",
    logoBg: "rgba(255,255,255,0.97)",
    logoH: "h-24 sm:h-32 md:h-36",
    logoP: "p-6 sm:p-8",
    cols: "grid-cols-1 sm:grid-cols-1 md:grid-cols-1",
    maxW: "max-w-xs sm:max-w-sm md:max-w-md",
  },
  silver: {
    label: "Silver Sponsor",
    badge: "✦ SILVER",
    badgeBg: "linear-gradient(135deg,#8c8c8c,#e8e8e8,#8c8c8c)",
    badgeText: "#0a0a0a",
    glow: "rgba(200,200,200,0.2)",
    border: "rgba(200,200,200,0.45)",
    cardBg: "rgba(200,200,200,0.04)",
    logoBg: "rgba(255,255,255,0.95)",
    logoH: "h-20 sm:h-24 md:h-28",
    logoP: "p-5 sm:p-6",
    cols: "grid-cols-1 sm:grid-cols-2",
    maxW: "max-w-[26rem]",
  },
  partner: {
    label: "Official Partner",
    badge: "◈ PARTNER",
    badgeBg: "rgba(228,9,8,0.15)",
    badgeText: "#e40908",
    glow: "rgba(228,9,8,0.1)",
    border: "rgba(228,9,8,0.3)",
    cardBg: "rgba(228,9,8,0.03)",
    logoBg: "rgba(255,255,255,0.93)",
    logoH: "h-16 sm:h-20 md:h-24",
    logoP: "p-4 sm:p-5",
    cols: "grid-cols-2 sm:grid-cols-3",
    maxW: "",
  },
};

/* ─── SponsorCard ─────────────────────────────────────────────────────── */
function SponsorCard({ s }: { s: Sponsor }) {
  const cfg = TIER_CONFIG[s.tier] ?? TIER_CONFIG.partner;
  const inner = (
    <div
      className="group relative flex flex-col items-center gap-4 rounded-2xl p-5 transition-all duration-300 hover:scale-[1.03]"
      style={{
        background: cfg.cardBg,
        border: `1px solid ${cfg.border}`,
        boxShadow: `0 0 40px ${cfg.glow}, 0 4px 20px rgba(0,0,0,0.5)`,
      }}
    >
      {/* Tier badge */}
      <span
        className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-0.5 font-mono text-[9px] font-black tracking-[0.2em] uppercase"
        style={{
          background: cfg.badgeBg,
          color: cfg.badgeText,
          boxShadow: `0 2px 12px ${cfg.glow}`,
        }}
      >
        {cfg.badge}
      </span>

      {/* Logo box */}
      <div
        className={`relative w-full ${cfg.logoH} ${cfg.logoP} rounded-xl overflow-hidden flex items-center justify-center`}
        style={{
          background:
            s.id === "sponsor-edugraph"
              ? "#000000"
              : s.id === "sponsor-studio-one"
              ? "#eb5e0b"
              : s.id === "sponsor-unstop"
              ? "#ffffff"
              : cfg.logoBg,
        }}
      >
        <Image
          src={s.logoPath}
          alt={s.logoAlt}
          fill
          className="object-contain p-2 sm:p-3 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 25vw"
        />
      </div>

      {/* Name & category */}
      <div className="text-center">
        <p
          className="font-display font-black text-base uppercase tracking-wider"
          style={{ color: "#e9dfc5" }}
        >
          {s.name}
        </p>
        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest"
          style={{ color: "rgba(233,223,197,0.5)" }}>
          {s.category}
        </p>
      </div>

      {/* Hover shimmer line */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 scale-x-0 rounded-full transition-transform duration-500 group-hover:scale-x-100"
        style={{ background: cfg.border }}
      />
    </div>
  );

  return s.url ? (
    <a href={s.url} target="_blank" rel="noopener noreferrer" className="block">
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  );
}

/* ─── Section divider ─────────────────────────────────────────────────── */
function TierDivider({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-4 my-10">
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${color})` }} />
      <span
        className="font-mono text-[10px] font-black tracking-[0.3em] uppercase px-4 py-1.5 rounded-full border"
        style={{ color, borderColor: color, background: `${color}10` }}
      >
        {label}
      </span>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${color})` }} />
    </div>
  );
}

/* ─── Main component ──────────────────────────────────────────────────── */
export function SponsorsPreview() {
  const real = publicOnly(sponsors);

  const gold    = real.filter((s) => s.tier === "gold");
  const silver  = real.filter((s) => s.tier === "silver");
  const partner = real.filter((s) => s.tier === "partner");

  return (
    <section
      id="sponsors"
      aria-labelledby="sponsors-title"
      className="relative overflow-hidden py-24 bg-void"
    >
      {/* Background decorative grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(233,223,197,1) 1px, transparent 1px), linear-gradient(90deg, rgba(233,223,197,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full blur-[120px] opacity-10"
        style={{ background: "radial-gradient(circle, #e40908 0%, #9a4dff 45%, transparent 70%)" }}
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">

        {/* ── Heading ── */}
        <div className="text-center mb-4">
          <p className="font-mono text-xs text-signal uppercase tracking-[0.3em] mb-3">
            ◈ Powered by
          </p>
          <h2
            id="sponsors-title"
            className="display text-[clamp(2.4rem,6vw,5rem)] uppercase leading-none text-sand"
          >
            Our <span className="text-signal">Partners</span>
          </h2>
          <p className="mt-4 font-sans text-sm text-sand/60 max-w-md mx-auto">
            Brands and organisations making KERNEL&apos;26 possible. Click any logo to visit their official website.
          </p>
        </div>

        {/* ── Decorative top line ── */}
        <div className="mt-8 mx-auto max-w-xs h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(228,9,8,0.5), transparent)" }}
        />

        {/* ── Gold sponsors ── */}
        {gold.length > 0 && (
          <>
            <TierDivider label="Gold Sponsor" color="#ffd700" />
            <div className="flex flex-wrap justify-center gap-6">
              {gold.map((s) => (
                <div key={s.id} className="w-full max-w-sm">
                  <SponsorCard s={s} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Silver sponsors ── */}
        {silver.length > 0 && (
          <>
            <TierDivider label="Silver Sponsor" color="#c0c0c0" />
            <div className="flex flex-wrap justify-center gap-6">
              {silver.map((s) => (
                <div key={s.id} className="w-full max-w-xs sm:max-w-sm">
                  <SponsorCard s={s} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Partners ── */}
        {partner.length > 0 && (
          <>
            <TierDivider label="Official Partners" color="#e40908" />
            <div className="flex flex-wrap justify-center gap-6">
              {partner.map((s) => (
                <div key={s.id} className="w-full max-w-xs sm:max-w-[18rem] lg:max-w-[19rem]">
                  <SponsorCard s={s} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Bottom tag ── */}
        <div className="mt-16 text-center">
          <p className="font-mono text-[10px] text-sand/30 uppercase tracking-widest">
            KERNEL 1.0 &bull; Dept. of Information Technology &bull; Jadavpur University
          </p>
        </div>
      </div>
    </section>
  );
}
