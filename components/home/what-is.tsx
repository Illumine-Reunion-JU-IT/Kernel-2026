"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
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
const RADII = [186, 142, 98, 54];

function parseStat(v: string): { n: number; dec: number; suffix: string } {
  const m = v.match(/^([\d.]+)(.*)$/);
  if (!m) return { n: 0, dec: 0, suffix: v };
  return { n: parseFloat(m[1]), dec: (m[1].split(".")[1] || "").length, suffix: m[2] };
}

export function WhatIs() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);

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
      const rings = gsap.utils.toArray<SVGGElement>("[data-ring]");
      const nodes = gsap.utils.toArray<SVGGElement>("[data-node]");
      const blocks = gsap.utils.toArray<HTMLElement>("[data-layer]");
      const bars = gsap.utils.toArray<HTMLElement>("[data-pbar]");
      gsap.set(blocks, { position: "absolute", top: 0, left: 0, right: 0, autoAlpha: 0, y: 30 });
      let current = -1;
      const show = (i: number) => {
        if (i === current) return;
        current = i;
        blocks.forEach((b, j) => gsap.to(b, { autoAlpha: j === i ? 1 : 0, y: j === i ? 0 : j < i ? -30 : 30, duration: 0.5, ease: "power3.out", overwrite: true }));
        rings.forEach((g, j) => gsap.to(g.querySelector("circle"), { attr: { stroke: j === i ? "#E40908" : "rgba(233,223,197,0.35)", "stroke-width": j === i ? 4 : 1.5 }, duration: 0.4 }));
        nodes.forEach((g, j) => gsap.to(g.querySelector("circle"), { attr: { fill: j === i ? "#E40908" : "#050308" }, duration: 0.3 }));
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
      <div data-slab className="relative overflow-hidden bg-signal pb-[max(7rem,14vw)] pt-20 text-void [clip-path:polygon(0_0,100%_0,100%_100%,0_calc(100%-6vw))] md:pt-28">
        <div aria-hidden className="absolute inset-y-0 right-[8%] w-[2px] bg-void/25" />
        <div className="container relative">
          <h2 id="what-title" className="display text-[clamp(3.4rem,15vw,13rem)] leading-[0.82]">
            <span data-w1 className="block">What is</span>
            <span data-w2 className="block pl-[8vw] md:pl-[18vw]">Kernel<span className="text-sand">?</span></span>
          </h2>
          <p data-slab-copy className="mt-10 max-w-2xl text-xl font-semibold leading-snug md:text-3xl">
            The annual college event of Jadavpur University. A convergence of ideas, innovation, competition and culture, run by the Department of Information Technology.
          </p>
        </div>
      </div>

      {/* Pinned: four layers around the core */}
      <div ref={pin} id="about" data-anchor="four-layers" className="relative -mt-[6vw] h-[100svh] min-h-[640px] overflow-hidden bg-void scroll-mt-20">
        <div aria-hidden className="halftone absolute -right-10 top-0 h-2/3 w-[55vw] rotate-180 opacity-40" />
        <div className="container grid h-full items-center gap-4 pt-16 md:grid-cols-2 md:gap-10 md:pt-0">
          <div data-orbit className="relative mx-auto aspect-square w-[min(80vw,40svh)] md:w-[min(46vw,78svh)]">
            <svg viewBox="0 0 400 400" aria-hidden className="absolute inset-0 h-full w-full overflow-visible">
              {RADII.map((r, i) => (
                <g key={r} data-ring>
                  <circle cx="200" cy="200" r={r} fill="none" stroke="rgba(233,223,197,0.35)" strokeWidth="1.5" strokeDasharray={i % 2 ? "3 8" : undefined} />
                  <circle cx="200" cy={200 - r} r="5" fill="#E9DFC5" />
                  <circle cx={200 + r * Math.cos(2.4 + i)} cy={200 + r * Math.sin(2.4 + i)} r="3.5" fill="#E40908" />
                </g>
              ))}
              {RADII.map((r, i) => {
                const a = -0.95;
                return (
                  <g key={`n${r}`} data-node>
                    <circle cx={200 + r * Math.cos(a)} cy={200 + r * Math.sin(a)} r="13" fill="#050308" stroke="#E9DFC5" strokeWidth="1.5" />
                    <text x={200 + r * Math.cos(a)} y={200 + r * Math.sin(a) + 4.5} textAnchor="middle" fontSize="13" fontWeight="700" fill="#E9DFC5" style={{ fontFamily: "var(--font-mono)" }}>{i + 1}</text>
                  </g>
                );
              })}
            </svg>
            <div className="absolute left-1/2 top-1/2 aspect-square w-[27%] -translate-x-1/2 -translate-y-1/2"><KernelCore className="absolute inset-0" /></div>
          </div>

          <div className="pb-14 md:pb-0">
            <p className="mono-label mb-4 text-sand"><span className="slashes" />Four layers around the core</p>
            <div className="relative min-h-[15rem] md:min-h-[17rem]">
              {LAYERS.map((l, i) => (
                <div key={l.k} data-layer className="mb-8 md:mb-10">
                  <p className="condensed text-5xl leading-none text-signal md:text-7xl">0{i + 1}</p>
                  <h3 className="display mt-2 text-[clamp(2.2rem,5.6vw,4.6rem)]">{l.k}</h3>
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
        {siteContent.stats.map((s, i) => (
          <div key={s.label} data-stat-cell className={`flex flex-col-reverse justify-end border-l-4 border-signal pl-5 ${i % 2 ? "md:mt-10" : ""}`}>
            <dt className="mt-2 max-w-[16ch] text-sm font-semibold text-sand md:text-base">
              {s.label}
              {s.value === "50+" && (
                <span className="block text-[0.72rem] font-mono tracking-wider text-signal/80 uppercase mt-0.5 font-normal">
                  by the clubs
                </span>
              )}
            </dt>
            <dd data-stat={s.value} className="condensed text-[clamp(3.6rem,10vw,8rem)] leading-none text-sand">{s.value}</dd>
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
