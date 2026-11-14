"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { speakers, publicOnly } from "@/lib/content";
import { CROPS, cropStyle } from "@/lib/poster";

const SLOTS = 4;

/**
 * Four portrait slots. Add a real speaker in data/speakers.json (isPlaceholder: false, name, role,
 * organisation, imagePath, imageAlt) and its slot flips from "Coming soon" to the photo automatically.
 */
export function SpeakersPreview() {
  const root = useRef<HTMLElement>(null);
  const real = publicOnly(speakers).slice(0, SLOTS);
  const slots = Array.from({ length: SLOTS }, (_, i) => real[i] ?? null);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add({ motion: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 768px)" }, (ctx) => {
      const { motion, wide } = ctx.conditions as { motion: boolean; wide: boolean };
      if (!motion) return;
      gsap.fromTo("[data-statue]", { yPercent: 20, rotate: 8 }, { yPercent: -18, rotate: 2, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo("[data-rock]", { yPercent: -30 }, { yPercent: 40, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo("[data-spk-bar]", { scaleY: 0 }, { scaleY: 1, transformOrigin: "top", ease: "none", scrollTrigger: { trigger: el, start: "top 80%", end: "top 20%", scrub: true } });
      gsap.utils.toArray<HTMLElement>("[data-slot]").forEach((s, i) => {
        gsap.fromTo(s, { y: 120, rotate: i % 2 ? 5 : -5, opacity: 0 }, { y: 0, rotate: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: s, start: "top 95%", end: "top 60%", scrub: 0.6 } });
        if (wide) gsap.to(s, { y: i % 2 ? -40 : 30, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="speakers" aria-labelledby="speakers-title" className="relative overflow-hidden bg-void py-section">
      <span aria-hidden data-spk-bar className="absolute right-[18%] top-0 h-[55%] w-[7vw] bg-signal" />
      <div aria-hidden data-statue className="absolute -right-[6vw] top-[6%] w-[34vw] min-w-48 grayscale shard-b" style={cropStyle(CROPS.statue)} />
      <div aria-hidden data-rock className="absolute -left-[4vw] bottom-[8%] w-[16vw] min-w-28 opacity-70 grayscale" style={cropStyle(CROPS.rock)} />

      <div className="container relative">
        <p className="mb-6 font-mono text-xs text-sand-dim"><span className="slashes" />On stage</p>
        <h2 id="speakers-title" className="display max-w-3xl text-[clamp(2.8rem,7vw,6.4rem)]">Voices from <span className="outline-text">the field</span></h2>
        <p className="mt-6 max-w-md text-sand-dim">Industry experts, researchers and alumni sharing what they have built and where computing is heading.</p>

        <ul className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-7">
          {slots.map((s, i) => (
            <li key={s?.id ?? `slot-${i}`} data-slot className={i % 2 ? "md:mt-16" : ""}>
              <div className="group relative aspect-[4/5] overflow-hidden bg-forest shard-a" data-cursor={s ? "" : "Soon"}>
                {s ? (
                  <Image src={s.imagePath} alt={s.imageAlt} fill sizes="(min-width:768px) 22vw, 45vw" className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                ) : (
                  <>
                    <div aria-hidden className="absolute inset-0 opacity-25 grayscale" style={{ ...cropStyle(CROPS.statue), aspectRatio: "auto", backgroundSize: "260% auto", backgroundPosition: `${20 + i * 22}% 35%` }} />
                    <span className="absolute left-3 top-3 bg-signal px-2 py-1 font-mono text-[10px] font-bold text-void">COMING SOON</span>
                  </>
                )}
                <span aria-hidden className="absolute bottom-0 right-0 h-10 w-10 bg-signal [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
                <span aria-hidden className="condensed absolute right-3 top-2 text-2xl text-sand/70">S/{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="display mt-4 text-lg md:text-xl">{s ? s.name : "Name to be announced"}</p>
              <p className="font-mono text-[11px] text-sand-dim">{s ? `${s.role}, ${s.organisation}` : "Role and organisation to follow"}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
