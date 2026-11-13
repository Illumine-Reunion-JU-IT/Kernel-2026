"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { events, publicOnly } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Tag } from "@/components/ui/tag";
import { pad } from "@/lib/utils";

/**
 * A signal line runs down the page like the poster's red column. As it fills, each event "boots":
 * its node lights up, the title fills with colour and the card slides in from its side.
 */
export function EventsTimeline() {
  const root = useRef<HTMLElement>(null);
  const list = publicOnly(events);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el || list.length === 0) return;
    const mm = gsap.matchMedia();
    mm.add({ motion: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 768px)" }, (ctx) => {
      const { motion, wide } = ctx.conditions as { motion: boolean; wide: boolean };
      if (!motion) return;

      gsap.fromTo("[data-spine-fill]", { scaleY: 0 }, { scaleY: 1, ease: "none", transformOrigin: "top", scrollTrigger: { trigger: "[data-track]", start: "top 60%", end: "bottom 60%", scrub: true } });
      gsap.to("[data-bg-word]", { xPercent: -35, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });

      gsap.utils.toArray<HTMLElement>("[data-row]").forEach((row, i) => {
        const fromLeft = wide ? i % 2 === 1 : false;
        gsap.fromTo(row.querySelector("[data-card]"), { x: wide ? (fromLeft ? -120 : 120) : 60, opacity: 0, skewX: fromLeft ? 6 : -6 }, { x: 0, opacity: 1, skewX: 0, ease: "none", scrollTrigger: { trigger: row, start: "top 90%", end: "top 55%", scrub: 0.6 } });
        gsap.fromTo(row.querySelector("[data-fill]"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", ease: "none", scrollTrigger: { trigger: row, start: "top 65%", end: "top 35%", scrub: 0.6 } });
        gsap.fromTo(row.querySelector("[data-num]"), { yPercent: 25 }, { yPercent: -25, ease: "none", scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.fromTo(row.querySelectorAll("[data-fact]"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: row, start: "top 60%", end: "top 35%", scrub: 0.6 } });
        // Node lights up while this event is the one in the middle of the screen.
        gsap.timeline({ scrollTrigger: { trigger: row, start: "top 55%", end: "bottom 55%", toggleClass: { targets: row, className: "is-live" } } });
      });
    });
    return () => mm.revert();
  }, [list.length]);

  return (
    <section ref={root} id="events" aria-labelledby="events-title" className="relative overflow-hidden bg-void py-section">
      <div aria-hidden data-bg-word className="display outline-text pointer-events-none absolute left-0 top-12 select-none whitespace-nowrap text-[24vw] text-sand/[0.1]">EVENTS EVENTS</div>

      <div className="container relative">
        <p className="mb-6 font-mono text-xs text-sand-dim"><span className="slashes" />The lineup</p>
        <h2 id="events-title" className="display max-w-4xl text-[clamp(2.6rem,7vw,6.4rem)]">Five ways to <span className="text-signal">compete</span></h2>

        {list.length === 0 ? (
          <EmptyState className="mt-14" title="Events to be announced" message="The full lineup will appear here once the organising team confirms it." action={<Button href="/events">Events page</Button>} />
        ) : (
          <div data-track className="relative mt-20 md:mt-28">
            <span aria-hidden className="absolute bottom-0 left-4 top-0 w-px bg-sand/20 md:left-1/2" />
            <span aria-hidden data-spine-fill className="absolute bottom-0 left-4 top-0 w-[3px] -translate-x-[1px] bg-signal md:left-1/2" />

            <ol className="space-y-16 md:space-y-28">
              {list.map((ev, i) => {
                const right = i % 2 === 0;
                return (
                  <li key={ev.id} data-row className="group/row relative grid pl-12 md:grid-cols-2 md:gap-24 md:pl-0">
                    <span aria-hidden className="absolute left-4 top-10 z-10 h-4 w-4 -translate-x-1/2 rotate-45 border-2 border-sand bg-void transition-all duration-500 group-[.is-live]/row:scale-150 group-[.is-live]/row:border-signal group-[.is-live]/row:bg-signal md:left-1/2 md:top-14" />

                    <div className={`relative hidden items-center md:flex ${right ? "md:order-1 md:justify-end" : "md:order-2"}`}>
                      <span data-num aria-hidden className={`condensed select-none text-[clamp(9rem,17vw,16rem)] leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(233,223,197,0.35)] transition-[-webkit-text-stroke-color] group-[.is-live]/row:[-webkit-text-stroke-color:var(--signal)]`}>{pad(i + 1)}</span>
                    </div>

                    <Link href={`/events/${ev.slug}`} data-card data-cursor="Open" className={`relative block border border-sand/15 bg-forest p-6 transition-colors hover:border-signal md:p-9 ${right ? "md:order-2 shard-a" : "md:order-1 shard-b"}`}>
                      <div className="flex items-center gap-3"><span className="condensed text-2xl text-signal md:hidden">{pad(i + 1)}</span><Tag tone="red">{ev.category}</Tag></div>
                      <h3 className="display relative mt-5 text-[clamp(2rem,4.4vw,3.8rem)]">
                        <span className="outline-text block text-sand/80">{ev.title}</span>
                        <span aria-hidden data-fill className="absolute inset-0 block text-signal">{ev.title}</span>
                      </h3>
                      <p className="mt-3 font-mono text-xs font-bold text-sand">{ev.tagline}</p>
                      <p className="mt-4 max-w-md text-sm text-sand-dim md:text-base">{ev.summary}</p>
                      <ul className="mt-6 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-sand/15 pt-5 font-mono text-[11px]">
                        {ev.facts.slice(0, 4).map((f) => (
                          <li key={f.label} data-fact><span className="text-sand-dim">{f.label}</span><br /><span className="font-bold text-sand">{f.value}</span></li>
                        ))}
                      </ul>
                    </Link>
                  </li>
                );
              })}
            </ol>
            <div className="mt-20 text-center"><Button href="/events" variant="secondary">All events</Button></div>
          </div>
        )}
      </div>
    </section>
  );
}
