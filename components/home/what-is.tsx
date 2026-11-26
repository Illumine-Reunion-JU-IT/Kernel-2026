"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { siteContent } from "@/lib/content";

const KernelCore = dynamic(() => import("@/components/effects/kernel-core").then((m) => m.KernelCore), { ssr: false });

/* The brochure's one-liner, split across four orbits of the "kernel": like an OS, the core is protected by layers. */
const LAYERS = [
  { k: "Ideas", d: "Creativity meets technology. KERNEL is where big ideas get built, tested and shown off." },
  { k: "Innovation", d: "Talent meets opportunity. Hackathons, builds and experiments on real problems." },
  { k: "Collaboration", d: "Students from across departments come together to build, learn and share the work." },
  { k: "Competition", d: "Contests, CTFs, esports and sprints. Healthy competition that pushes everyone further." }
];
const RADII = [188, 152, 116, 80];

function parseStat(v: string): { n: number; dec: number; suffix: string } {
  const m = v.match(/^([\d.]+)(.*)$/);
  if (!m) return { n: 0, dec: 0, suffix: v };
  return { n: parseFloat(m[1]), dec: (m[1].split(".")[1] || "").length, suffix: m[2] };
}

export function WhatIs() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState(0);

  useEffect(() => {
    registerGsap();
    const el = root.current, pn = pin.current;
    if (!el || !pn) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Red slab: the two headline words slide in from opposite sides as you scroll.
      gsap.fromTo("[data-w1]", { xPercent: -18 }, { xPercent: 0, ease: "none", scrollTrigger: { trigger: "[data-slab]", start: "top 85%", end: "center 45%", scrub: true } });
      gsap.fromTo("[data-w2]", { xPercent: 18 }, { xPercent: 0, ease: "none", scrollTrigger: { trigger: "[data-slab]", start: "top 85%", end: "center 45%", scrub: true } });
      gsap.from("[data-slab-copy]", { y: 40, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: "[data-slab-copy]", start: "top 90%", once: true } });

      // Pinned rings.
      const rings = gsap.utils.toArray<SVGGElement>("[data-ring]", el);
      const blocks = gsap.utils.toArray<HTMLElement>("[data-layer]", el);
      const bars = gsap.utils.toArray<HTMLElement>("[data-pbar]", el);
      gsap.set(blocks, { position: "absolute", top: 0, left: 0, right: 0, autoAlpha: 0, y: 30 });
      let current = -1;
      const show = (i: number) => {
        if (i === current) return;
        current = i;
        setActiveLayer(i);
        blocks.forEach((b, j) => gsap.to(b, { autoAlpha: j === i ? 1 : 0, y: j === i ? 0 : j < i ? -30 : 30, duration: 0.5, ease: "power3.out", overwrite: true }));
        bars.forEach((b, j) => gsap.to(b, { scaleX: j <= i ? 1 : 0.15, backgroundColor: j <= i ? "#E40908" : "rgba(233,223,197,0.3)", duration: 0.4 }));
      };
      show(0);
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: pn, start: "top top", end: "+=360%", scrub: 0.6, pin: true, anticipatePin: 1, onUpdate: (s) => show(Math.min(LAYERS.length - 1, Math.floor(s.progress * LAYERS.length))) }
      });
      rings.forEach((g, i) => tl.to(g, { rotate: (i % 2 ? -1 : 1) * (150 + i * 70), svgOrigin: "200 200", duration: 1 }, 0));
      gsap.from("[data-orbit]", { scale: 0.55, opacity: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: pn, start: "top 75%", once: true } });

      // Stats.
      el.querySelectorAll<HTMLElement>("[data-stat]").forEach((node) => {
        const { n, dec, suffix } = parseStat(node.dataset.stat || "");
        const o = { v: 0 };
        gsap.to(o, { v: n, duration: 2.2, ease: "power3.out", onUpdate: () => { node.textContent = o.v.toFixed(dec) + suffix; }, scrollTrigger: { trigger: node, start: "top 90%", once: true } });
      });
      gsap.from("[data-stat-cell]", { yPercent: 40, opacity: 0, stagger: 0.1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: "[data-stats]", start: "top 88%", once: true } });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="what-is" aria-labelledby="what-title">
      {/* Continues straight from the red flood that ends the hero */}
      <div data-slab className="relative overflow-hidden bg-signal pb-[max(4.5rem,9vw)] pt-12 text-void [clip-path:polygon(0_0,100%_0,100%_100%,0_calc(100%-6vw))] md:pt-16">
        <div aria-hidden className="absolute inset-y-0 right-[8%] w-[2px] bg-void/25" />
        <div className="container relative">
          <h2 id="what-title" className="display text-[clamp(2.2rem,6vw,4.75rem)] leading-[0.86]">
            <span data-w1 className="block">What is</span>
            <span data-w2 className="block pl-[8vw] md:pl-[18vw]">Kernel?</span>
          </h2>
          <p data-slab-copy className="mt-6 max-w-2xl text-lg font-semibold leading-snug md:text-2xl">
            The annual college event of Jadavpur University. A convergence of ideas, innovation, competition and culture, run by the Department of Information Technology.
          </p>
        </div>
      </div>

      {/* Pinned: four layers around the core */}
      <div ref={pin} id="about" data-anchor="four-layers" className="relative -mt-[6vw] h-[100svh] min-h-[640px] overflow-hidden bg-void scroll-mt-20">
        <div aria-hidden className="halftone absolute -right-10 top-0 h-2/3 w-[55vw] rotate-180 opacity-40" />
        <div className="container grid h-full items-center gap-4 pt-16 md:grid-cols-2 md:gap-10 md:pt-0">
          <div data-orbit className="relative mx-auto aspect-square w-[min(82vw,42svh)] md:w-[min(46vw,78svh)]">
            <div aria-hidden className="pointer-events-none absolute inset-6 rounded-full bg-[radial-gradient(circle,rgba(228,9,8,0.22)_0%,rgba(154,77,255,0.08)_42%,transparent_70%)]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 aspect-square w-[26%] -translate-x-1/2 -translate-y-1/2">
              <KernelCore className="absolute inset-0" />
            </div>
            <svg viewBox="0 0 400 400" aria-hidden className="relative z-10 h-full w-full overflow-visible">
              <defs>
                <filter id="orbit-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* Subtle radar crosshairs */}
              <g stroke="rgba(233,223,197,0.08)" strokeWidth="1" strokeDasharray="2 6">
                <line x1="200" y1="6" x2="200" y2="112" />
                <line x1="200" y1="288" x2="200" y2="394" />
                <line x1="6" y1="200" x2="112" y2="200" />
                <line x1="288" y1="200" x2="394" y2="200" />
              </g>
              {RADII.map((r, i) => {
                const isActive = activeLayer === i;
                return (
                  <g key={r} data-ring>
                    <g
                      style={{
                        transformOrigin: "200px 200px",
                        animation: `spin-slow ${36 - i * 6}s linear infinite`,
                        animationDirection: i % 2 ? "reverse" : "normal",
                      }}
                    >
                      {/* Active orbit outer glow aura */}
                      {isActive && (
                        <circle
                          cx="200"
                          cy="200"
                          r={r}
                          fill="none"
                          stroke="rgba(228, 9, 8, 0.35)"
                          strokeWidth="8"
                          filter="url(#orbit-glow)"
                        />
                      )}
                      <circle
                        cx="200"
                        cy="200"
                        r={r}
                        fill="none"
                        stroke={isActive ? "#E40908" : "rgba(233,223,197,0.32)"}
                        strokeWidth={isActive ? 3 : 1.5}
                        strokeDasharray={i % 2 && !isActive ? "3 8" : undefined}
                        className="transition-all duration-300"
                      />
                      {/* Primary sand satellite */}
                      <circle cx="200" cy={200 - r} r={isActive ? 10 : 8} fill={isActive ? "rgba(228,9,8,0.28)" : "rgba(233,223,197,0.14)"} />
                      <circle cx="200" cy={200 - r} r={isActive ? 5.5 : 4.5} fill={isActive ? "#ffffff" : "#E9DFC5"} />
                      {/* Secondary crimson satellite */}
                      <circle cx={200 + r * Math.cos(2.4 + i)} cy={200 + r * Math.sin(2.4 + i)} r={isActive ? 9 : 7} fill="rgba(228,9,8,0.28)" />
                      <circle cx={200 + r * Math.cos(2.4 + i)} cy={200 + r * Math.sin(2.4 + i)} r={isActive ? 4.5 : 3.5} fill="#E40908" />
                    </g>
                  </g>
                );
              })}
              {RADII.map((r, i) => {
                const a = -0.95;
                const nx = 200 + r * Math.cos(a);
                const ny = 200 + r * Math.sin(a);
                const isActive = activeLayer === i;
                return (
                  <g key={`n${r}`} data-node>
                    {isActive && (
                      <circle
                        cx={nx}
                        cy={ny}
                        r="21"
                        fill="rgba(228,9,8,0.22)"
                        stroke="rgba(228,9,8,0.75)"
                        strokeWidth="1.5"
                        filter="url(#orbit-glow)"
                      />
                    )}
                    <circle
                      cx={nx}
                      cy={ny}
                      r={isActive ? 15.5 : 13}
                      fill={isActive ? "#E40908" : "#050308"}
                      stroke={isActive ? "#ffffff" : "rgba(233,223,197,0.75)"}
                      strokeWidth={isActive ? 2 : 1.5}
                      className="transition-all duration-300"
                    />
                    <text
                      x={nx}
                      y={ny + 4.5}
                      textAnchor="middle"
                      fontSize={isActive ? "13.5" : "12"}
                      fontWeight="700"
                      fill={isActive ? "#ffffff" : "#E9DFC5"}
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {i + 1}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="pb-14 md:pb-0">
            <p className="mono-label mb-4 text-sand"><span className="slashes" />Four layers around the core</p>
            <div className="relative min-h-[15rem] md:min-h-[17rem]">
              {LAYERS.map((l, i) => (
                <div key={l.k} data-layer className="mb-8 md:mb-10">
                  <p className="condensed text-4xl leading-none text-signal md:text-5xl">0{i + 1}</p>
                  <h3 className="display mt-2 text-[clamp(1.75rem,3.8vw,3.25rem)]">{l.k}</h3>
                  <p className="mt-4 max-w-md text-lg leading-snug text-sand md:text-xl">{l.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-2" aria-hidden>
              {LAYERS.map((l) => (<span key={l.k} data-pbar className="h-1 w-12 origin-left bg-sand/30 md:w-16" />))}
            </div>
            <div className="mt-8 hidden md:block">
              <span className="inline-flex items-center justify-center px-7 py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-sand [clip-path:var(--shard)] shadow-[inset_0_0_0_1.5px_var(--sand)] select-none">
                About KERNEL
              </span>
            </div>
          </div>
        </div>
      </div>

      <dl data-stats className="container grid grid-cols-2 gap-y-12 py-section md:grid-cols-4">
        {siteContent.stats.map((s) => (
          <div key={s.label} data-stat-cell className="flex flex-col-reverse justify-end border-l-4 border-signal pl-5">
            <dt className="mt-2 max-w-[16ch] text-sm font-semibold text-sand md:text-base">
              {s.label}
              {s.value === "50+" && (
                <span className="mt-0.5 block text-xs font-normal text-sand-dim">
                  by the clubs
                </span>
              )}
            </dt>
            <dd data-stat={s.value} className="condensed text-[clamp(2.6rem,6.5vw,5rem)] leading-none text-sand">{s.value}</dd>
          </div>
        ))}
      </dl>
      <div className="container pb-section md:hidden">
        <span className="inline-flex items-center justify-center px-7 py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-sand [clip-path:var(--shard)] shadow-[inset_0_0_0_1.5px_var(--sand)] select-none">
          About KERNEL
        </span>
      </div>
    </section>
  );
}
