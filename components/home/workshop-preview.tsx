"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { CROPS, cropStyle } from "@/lib/poster";

const WORKSHOP_EXPECTATIONS = [
  {
    num: "01",
    title: "Live Build & Architecture",
    detail: "Hands-on walkthrough from zero to working system—no slide decks, only real engineering.",
  },
  {
    num: "02",
    title: "Guided Lab Exercises",
    detail: "Interactive checkpoints with direct mentor feedback during the session.",
  },
  {
    num: "03",
    title: "Takeaway Kit & Certificate",
    detail: "Starter repositories, reference notes, and official KERNEL 1.0 participation credentials.",
  },
];

const WORKSHOP_SPECS = [
  { label: "Topic", value: "To Be Announced" },
  { label: "Mentor", value: "Industry Practitioner (TBA)" },
  { label: "Format", value: "Offline Hands-On Lab" },
  { label: "Venue", value: "SMCC Building, JU Salt Lake" },
];

export function WorkshopPreview() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        wide: "(min-width: 768px)",
      },
      (ctx) => {
        const { motion } = ctx.conditions as { motion: boolean; wide: boolean };
        if (!motion) return;

        gsap.fromTo(
          "[data-ws-bar]",
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "top 20%",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          "[data-ws-statue]",
          { yPercent: 18, rotate: 6 },
          {
            yPercent: -14,
            rotate: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          "[data-ws-panel]",
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 75%", once: true },
          }
        );
      }
    );
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      id="workshop"
      aria-labelledby="workshop-title"
      className="relative overflow-hidden bg-void py-section border-t border-sand/10"
    >
      {/* Architectural red bar + poster collage accent matching KERNEL's visual system */}
      <span
        aria-hidden
        data-ws-bar
        className="absolute right-[14%] top-0 h-[52%] w-[6vw] bg-signal"
      />
      <div
        aria-hidden
        data-ws-statue
        className="pointer-events-none absolute -right-[5vw] top-[8%] w-[30vw] min-w-48 opacity-35 grayscale shard-b"
        style={cropStyle(CROPS.statue)}
      />
      <div
        aria-hidden
        className="halftone pointer-events-none absolute -left-8 bottom-0 h-80 w-80 opacity-25"
      />

      <div className="container relative">
        {/* Editorial header */}
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-sand-dim">
          <span className="slashes" />
          Hands-on lab
        </p>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2
            id="workshop-title"
            className="display max-w-4xl text-[clamp(2.8rem,7vw,6.4rem)]"
          >
            Build in <span className="outline-text">the lab</span>
          </h2>
          <p className="max-w-md font-mono text-xs leading-relaxed text-sand-dim">
            An intensive, practitioner-led technical workshop at KERNEL 1.0.
            Full topic, mentor lineup, and registration schedule dropping soon.
          </p>
        </div>

        {/* 12-column asymmetric poster layout */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left 7 cols: Hero Workshop Dossier */}
          <div
            data-ws-panel
            className="group relative flex flex-col justify-between overflow-hidden border border-sand/20 bg-forest/90 p-7 sm:p-10 shard-a lg:col-span-7"
          >
            {/* Subtle grid lines inside dossier */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #e9dfc5 1px, transparent 1px), linear-gradient(to bottom, #e9dfc5 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />

            {/* Top status strip */}
            <div className="relative flex flex-wrap items-center justify-between gap-4 border-b border-sand/15 pb-5">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 bg-signal px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-void">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-void animate-pulse"
                  />
                  Details Dropping Soon
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-sand-dim">
                  KERNEL // LAB
                </span>
              </div>
              <span aria-hidden className="condensed text-3xl leading-none text-sand/30">
                W/01
              </span>
            </div>

            {/* Centerpiece */}
            <div className="relative my-8 sm:my-10">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-signal">
                /// Featured Session
              </p>
              <h3 className="display mt-3 text-[clamp(2.1rem,4.5vw,3.8rem)] text-sand">
                Technical <span className="outline-text">Workshop</span>
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-sand-dim sm:text-base">
                Bring your laptop, ship real code, and learn directly from
                builders in the field. The exact domain, problem focus, and
                speaker profile will be unlocked shortly.
              </p>

              {/* Spec readout table */}
              <dl className="mt-8 grid grid-cols-1 gap-px border border-sand/15 bg-sand/15 sm:grid-cols-2">
                {WORKSHOP_SPECS.map((spec) => (
                  <div
                    key={spec.label}
                    className="bg-void/90 px-4 py-3.5 transition-colors group-hover:bg-void"
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-sand-dim/70">
                      {spec.label}
                    </dt>
                    <dd className="mt-1 font-mono text-xs font-bold uppercase tracking-wider text-sand">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Bottom bar + signature corner triangle */}
            <div className="relative flex flex-wrap items-center justify-between gap-4 border-t border-sand/15 pt-5 pr-8">
              <span className="font-mono text-[11px] uppercase tracking-widest text-sand-dim">
                Open to registered participants · Limited seats
              </span>
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-volt">
                Status: Placeholder
              </span>
            </div>

            <span
              aria-hidden
              className="absolute bottom-0 right-0 h-11 w-11 bg-signal [clip-path:polygon(100%_0,100%_100%,0_100%)]"
            />
          </div>

          {/* Right 5 cols: Stacked Tactical Modules */}
          <div className="flex flex-col justify-between gap-6 lg:col-span-5">
            {/* Module 1: What to expect */}
            <div
              data-ws-panel
              className="border border-sand/20 bg-forest/75 p-6 sm:p-7"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-sand-dim">
                <span className="slashes" />
                Session Blueprint
              </p>
              <ul className="mt-5 divide-y divide-sand/10">
                {WORKSHOP_EXPECTATIONS.map((item) => (
                  <li key={item.num} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-start gap-4">
                      <span className="condensed text-2xl leading-none text-signal">
                        {item.num}
                      </span>
                      <div>
                        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-sand">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-sand-dim">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Module 2: Updates & Actions */}
            <div
              data-ws-panel
              className="relative border border-sand/20 bg-forest/75 p-6 sm:p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-sand-dim">
                  <span className="slashes" />
                  Stay in the loop
                </p>
                <span className="font-mono text-[10px] uppercase tracking-widest text-signal">
                  TBA // 2026
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-sand-dim">
                Workshop registration and curriculum drops first on our official
                Discord server and events page.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="https://discord.gg/XTCetvVU5Y"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kbtn kbtn-primary"
                >
                  <span className="kbtn-label">Join Discord</span>
                  <span aria-hidden>↗</span>
                </a>
                <Link href="/events" className="kbtn kbtn-secondary">
                  <span className="kbtn-label">All Events</span>
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
