"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";


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
    navigator.clipboard.writeText("kerneljuit@gmail.com").then(() => {
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
