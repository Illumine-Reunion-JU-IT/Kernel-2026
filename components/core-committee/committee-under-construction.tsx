"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const DIVISIONS = [
  {
    code: "SEC_01",
    tier: "APEX LEADERSHIP",
    title: "Executive & Convenorship",
    description:
      "General convenor, joint convenors & advisory faculty heads overseeing festival operations, policy, and institutional governance.",
    status: "SEALED · EMBARGO ACTIVE",
    clearance: "LEVEL 5",
    icon: "🏛️",
  },
  {
    code: "SEC_02",
    tier: "CORE DEV & PLATFORMS",
    title: "Technical & DevOps",
    description:
      "Lead software architects, platform engineers, competitive coding problem authors, judge server admins & network infrastructure.",
    status: "ACTIVE · COMPILING 94%",
    clearance: "LEVEL 4",
    icon: "⚡",
  },
  {
    code: "SEC_03",
    tier: "VISUAL & MOTION ART",
    title: "Creative, UI & 3D Stage",
    description:
      "Brand directors, brutalist typography authors, 3D stage artists, motion graphic designers & festival media curators.",
    status: "FINALIZING · ASSET PIPELINE",
    clearance: "LEVEL 4",
    icon: "🎨",
  },
  {
    code: "SEC_04",
    tier: "OPERATIONS & ALLIANCE",
    title: "Sponsorship & Relations",
    description:
      "Corporate alliance directors, student hospitality liaisons, industry sponsor delegates & campus auditorium operations.",
    status: "VERIFIED · STAGING READY",
    clearance: "LEVEL 4",
    icon: "🌐",
  },
];

const TERMINAL_LOGS = [
  "[00:00:01] SYS_INIT: Jadavpur University Dept. of IT Kernel Core Engine v1.0",
  "[00:00:03] AUTH: Cryptographic handshake confirmed with Organizing Secretariat.",
  "[00:00:05] CATALOGUE: 42 Student Committee Members & Mentors indexed.",
  "[00:00:08] INGESTION: Hi-res photographic dossiers & portfolio links verified.",
  "[00:00:11] EMBARGO STATUS: Final operational sign-off in progress.",
  "[00:00:14] NOTICE: Public committee roster unlocks prior to KERNEL 1.0 opening bell.",
];

export function CommitteeUnderConstruction() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard
      .writeText("illumine.reunion.ju.it@gmail.com")
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-void pt-[calc(var(--nav-h)+2.5rem)] pb-28 text-sand">
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(228,9,8,0.22),transparent_70%)] blur-[90px]"
      />
      <div
        aria-hidden
        className="halftone pointer-events-none absolute top-10 right-0 h-[650px] w-[45vw] opacity-25"
      />

      <div className="container relative z-10">
        {/* Top Badges & Status Strip */}
        <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-xs">
          <span className="flex items-center gap-2 rounded border border-signal/50 bg-signal/15 px-3 py-1 font-bold tracking-wider text-sand shadow-[0_0_15px_rgba(228,9,8,0.4)] backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-signal animate-ping" />
            <span>UNDER ACTIVE CONSTRUCTION</span>
          </span>
          <span className="hidden sm:inline-block rounded border border-white/10 bg-void/80 px-2.5 py-1 text-[11px] text-sand/60">
            SYS_REV: STAGING.2026.04
          </span>
        </div>

        {/* Hero Brutalist Title */}
        <div className="max-w-4xl">
          <h1
            className="display text-[clamp(2.9rem,8vw,6.8rem)] font-black uppercase leading-[0.9] tracking-tight drop-shadow-[0_0_35px_rgba(228,9,8,0.45)]"
            style={{
              background:
                "linear-gradient(180deg, #ffffff 0%, #ffd0d0 45%, #e40908 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Core Committee
          </h1>

          <p className="mt-5 font-display text-lg sm:text-2xl font-bold uppercase italic tracking-wide text-sand/90 drop-shadow-sm">
            THE ARCHITECTS BEHIND KERNEL &apos;26 ARE COMPILING
          </p>

          <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-sand/75 font-sans">
            The official student committee roster, organizing heads, and
            departmental portfolios are currently undergoing final institutional
            verification. Full executive dossiers and contact channels will
            unlock prior to festival inauguration.
          </p>
        </div>

        {/* Industrial Hazard Caution Ribbon / Construction Marquee */}
        <div
          className="my-10 relative overflow-hidden border-y-2 border-void bg-signal py-3.5 shadow-[0_0_30px_rgba(228,9,8,0.4)] [clip-path:polygon(0_6%,100%_0,100%_94%,0_100%)]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, rgba(5,3,8,0.2) 0, rgba(5,3,8,0.2) 16px, transparent 16px, transparent 32px)",
          }}
        >
          <div className="flex w-max animate-[marquee_22s_linear_infinite] motion-reduce:animate-none font-mono text-xs sm:text-sm font-black tracking-widest text-void uppercase">
            {[0, 1].map((copyIndex) => (
              <div
                key={copyIndex}
                className="flex items-center gap-8 px-4 shrink-0"
              >
                <span>⚠ UNDER ACTIVE CONSTRUCTION</span>
                <span>✦</span>
                <span>ROSTER STAGING IN PROGRESS</span>
                <span>✦</span>
                <span>DEPT. OF INFORMATION TECHNOLOGY</span>
                <span>✦</span>
                <span>JADAVPUR UNIVERSITY</span>
                <span>✦</span>
                <span>CLEARANCE PENDING</span>
                <span>✦</span>
                <span>KERNEL &apos;26 ARCHITECTS</span>
                <span>✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* Blueprint Dossier Pods (4 Divisions) */}
        <div className="mb-14">
          <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="mono-label text-xs sm:text-sm font-bold tracking-widest text-sand/90">
              <span className="text-signal">■</span> INCOMING PORTFOLIO DIVISIONS
            </h2>
            <span className="font-mono text-[11px] text-sand/60">4 DEPARTMENTS STAGED</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DIVISIONS.map((div) => (
              <div
                key={div.code}
                className="group relative flex flex-col justify-between overflow-hidden rounded-md border border-white/20 bg-[#110e1a] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-1 hover:border-signal hover:shadow-[0_12px_32px_rgba(228,9,8,0.45)]"
              >
                {/* Corner crosshairs */}
                <span className="pointer-events-none absolute right-2.5 top-2.5 font-mono text-xs text-white/30 group-hover:text-signal transition-colors">
                  +
                </span>
                <span className="pointer-events-none absolute left-2.5 bottom-2.5 font-mono text-xs text-white/30 group-hover:text-signal transition-colors">
                  +
                </span>

                {/* Subtle card glow */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-signal/10 blur-2xl group-hover:bg-signal/25 transition-all" />

                <div>
                  <div className="mb-3 flex items-center justify-between font-mono text-[11px]">
                    <span className="font-bold text-sand/70">{div.code}</span>
                    <span className="rounded border border-signal/40 bg-signal/20 px-2 py-0.5 text-[10px] font-bold text-signal">
                      {div.clearance}
                    </span>
                  </div>

                  <div className="mb-3 text-3xl">{div.icon}</div>

                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-signal">
                    {div.tier}
                  </p>
                  <h3 className="font-display text-xl font-black uppercase text-sand group-hover:text-white transition-colors">
                    {div.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-sand/80 font-sans">
                    {div.description}
                  </p>
                </div>

                <div className="mt-5 border-t border-white/10 pt-3.5">
                  <div className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-wider text-sand/90">
                    <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                    <span>{div.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Staging Telemetry Terminal */}
        <div className="mb-14 overflow-hidden rounded-lg border border-white/15 bg-[#09070e] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-signal" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span className="ml-2 font-mono text-xs font-bold text-sand/80">
                TERMINAL // JU_IT_COMMITTEE_DAEMON.SYS
              </span>
            </div>
            <span className="font-mono text-[10px] text-emerald-400 font-semibold tracking-wider">
              ● DAEMON_ONLINE
            </span>
          </div>

          {/* Terminal Console Logs */}
          <div className="p-5 font-mono text-xs space-y-2 text-sand/75">
            {TERMINAL_LOGS.map((log, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-signal select-none">&gt;</span>
                <span
                  className={
                    idx === TERMINAL_LOGS.length - 1
                      ? "text-signal font-bold"
                      : ""
                  }
                >
                  {log}
                </span>
              </div>
            ))}

            <div className="pt-2 text-[11px] text-sand/60">
              STAGING PROGRESS: [████████████████████████░░] 92% COMPLETED
              <span className="ml-1 inline-block h-3.5 w-2 bg-signal animate-pulse align-middle" />
            </div>
          </div>
        </div>

        {/* Action Hub / Navigation CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-lg border border-white/15 bg-white/[0.03] p-6 backdrop-blur-md">
          <div>
            <h4 className="font-display text-xl font-black uppercase text-sand">
              Want to get in touch with the organisers?
            </h4>
            <p className="mt-1 text-sm text-sand/70">
              For event inquiries, sponsorships, or partnership queries, contact
              the Department of IT directly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              href="/events"
              variant="primary"
              className="!px-6 !py-3 font-mono text-xs uppercase"
            >
              Explore Events →
            </Button>
            <Button
              href="/"
              variant="secondary"
              className="!px-5 !py-3 font-mono text-xs uppercase"
            >
              ← Return Home
            </Button>
            <button
              type="button"
              onClick={copyEmail}
              className="rounded border border-white/20 bg-void/80 px-4 py-3 font-mono text-xs font-bold text-sand/90 hover:border-signal hover:text-signal transition-colors backdrop-blur"
            >
              {copied ? "✓ Email Copied!" : "Copy Email"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
