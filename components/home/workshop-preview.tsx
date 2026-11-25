"use client";
import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { CROPS, cropStyle } from "@/lib/poster";

const WORKSHOP_MODULES = [
  {
    code: "W/01",
    title: "Hands-On Lab Session",
    desc: "Live guided build walkthrough with practical exercises — topic and problem domain to be unveiled soon.",
  },
  {
    code: "W/02",
    title: "Industry Mentor",
    desc: "Led by experienced engineers and practitioners sharing production workflows and real-world architecture.",
  },
  {
    code: "W/03",
    title: "Takeaways & Access",
    desc: "Includes starter repositories, live Q&A, and official KERNEL 1.0 workshop participation certificates.",
  },
];

export function WorkshopPreview() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        "[data-ws-statue]",
        { yPercent: 18, rotate: 6 },
        { yPercent: -16, rotate: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } }
      );
      gsap.fromTo(
        "[data-ws-bar]",
        { scaleY: 0 },
        { scaleY: 1, transformOrigin: "top", ease: "none", scrollTrigger: { trigger: el, start: "top 80%", end: "top 25%", scrub: true } }
      );
      gsap.from("[data-ws-card]", {
        y: 36,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 75%", once: true },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="workshop" aria-labelledby="workshop-title" className="relative overflow-hidden bg-void py-section">
      {/* Vertical signal slash + background poster shard */}
      <span aria-hidden data-ws-bar className="absolute right-[16%] top-0 h-[55%] w-[6vw] bg-signal/90" />
      <div
        aria-hidden
        data-ws-statue
        className="absolute -right-[6vw] top-[8%] w-[32vw] min-w-48 opacity-45 grayscale shard-b"
        style={cropStyle(CROPS.statue)}
      />

      <div className="container relative mx-auto px-4">
        <p className="mb-5 font-mono text-xs text-sand-dim">
          <span className="slashes" />Hands-on lab
        </p>
        <h2 id="workshop-title" className="display max-w-4xl text-[clamp(2.8rem,7vw,6.4rem)]">
          Live <span className="outline-text">Workshop</span>
        </h2>
        <p className="mt-5 max-w-lg text-sm sm:text-base text-sand-dim">
          An intensive, interactive technical workshop hosted at KERNEL 1.0. Full session details, speaker lineup, and registration schedule will be announced shortly.
        </p>

        {/* Main Asymmetric Workshop Showcase */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Left: Featured Workshop Blueprint Card */}
          <div
            data-ws-card
            className="relative lg:col-span-7 flex flex-col justify-between overflow-hidden border border-sand/20 bg-forest/90 p-6 sm:p-8 backdrop-blur-sm shard-a"
          >
            {/* Subtle background texture */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-15 grayscale"
              style={{ ...cropStyle(CROPS.building), aspectRatio: "auto", backgroundSize: "180% auto", backgroundPosition: "65% 30%" }}
            />
            <span
              aria-hidden
              className="absolute bottom-0 right-0 h-12 w-12 bg-signal [clip-path:polygon(100%_0,100%_100%,0_100%)]"
            />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="bg-signal px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-void">
                  COMING SOON // DETAILS TBA
                </span>
                <span className="condensed text-2xl text-sand/60">WORKSHOP // 01</span>
              </div>

              <h3 className="display mt-8 text-[clamp(1.8rem,3.6vw,3rem)] leading-[0.95] text-sand">
                Topic &amp; Mentor <span className="text-signal">To Be Announced</span>
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-sand-dim">
                Get ready for a practical, code-first deep dive designed for builders. Bring your laptop — seats and official problem tracks will go live soon.
              </p>
            </div>

            {/* 2x2 Spec Strip */}
            <div className="relative z-10 mt-8 grid grid-cols-2 gap-3 border-t border-sand/15 pt-6 font-mono text-xs sm:grid-cols-4">
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-sand-dim">Date</span>
                <span className="mt-1 block font-bold text-sand">TBA</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-sand-dim">Duration</span>
                <span className="mt-1 block font-bold text-sand">TBA</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-sand-dim">Venue</span>
                <span className="mt-1 block font-bold text-sand">JU Salt Lake</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-sand-dim">Entry</span>
                <span className="mt-1 block font-bold text-signal">Open + Certs</span>
              </div>
            </div>
          </div>

          {/* Right: 3 Staggered Module Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {WORKSHOP_MODULES.map((mod) => (
              <div
                key={mod.code}
                data-ws-card
                className="group relative border border-sand/15 border-l-2 border-l-signal bg-forest/70 p-5 backdrop-blur-sm transition-colors hover:border-sand/35"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-bold tracking-widest text-signal">{mod.code}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-sand-dim">TBA</span>
                </div>
                <h4 className="display mt-2 text-lg sm:text-xl text-sand">{mod.title}</h4>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-sand-dim">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
