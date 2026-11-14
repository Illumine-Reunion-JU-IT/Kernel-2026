"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { events, publicOnly } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Tag } from "@/components/ui/tag";
import { pad } from "@/lib/utils";

interface PathData {
  pathD: string;
  buttonPoint: { x: number; y: number } | null;
}

/**
 * An energetic, cybernetic curved signal spline weaves down the event lineup.
 * As the user scrolls, the signal traces the spline: each event station activates,
 * its node powers up, the title fills with color, and the card slides into place.
 * At the bottom, the spine terminates cleanly right at the top border of the "All events" button.
 */
export function EventsTimeline() {
  const root = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const buttonWrapRef = useRef<HTMLDivElement>(null);
  const fillPathRef = useRef<SVGPathElement>(null);
  const [pathData, setPathData] = useState<PathData>({
    pathD: "",
    buttonPoint: null,
  });

  const list = publicOnly(events);

  // Compute the cybernetic curved spline path based on live DOM positions
  useEffect(() => {
    registerGsap();
    const track = trackRef.current;
    const buttonWrap = buttonWrapRef.current;
    if (!track || list.length === 0) return;

    const compute = () => {
      const isWide = window.innerWidth >= 768;
      const trackRect = track.getBoundingClientRect();
      if (trackRect.width === 0) return;

      const rows = Array.from(track.querySelectorAll<HTMLElement>("[data-row]"));
      if (rows.length === 0) return;

      const nodePoints = rows.map((row) => {
        const nodeEl = row.querySelector<HTMLElement>("[data-node]");
        if (nodeEl) {
          const r = nodeEl.getBoundingClientRect();
          return {
            x: r.left - trackRect.left + r.width / 2,
            y: r.top - trackRect.top + r.height / 2,
          };
        }
        return {
          x: isWide ? trackRect.width / 2 : 16,
          y: row.offsetTop + (isWide ? 56 : 40),
        };
      });

      const btnEl = buttonWrap ? buttonWrap.querySelector<HTMLElement>(".kbtn") : null;
      let buttonY = track.offsetHeight;
      let targetButtonX = isWide ? trackRect.width / 2 : trackRect.width / 2;
      if (btnEl) {
        const btnRect = btnEl.getBoundingClientRect();
        buttonY = btnRect.top - trackRect.top;
        targetButtonX = btnRect.left - trackRect.left + btnRect.width / 2;
      }

      const d: string[] = [];
      const startX = nodePoints[0]?.x ?? (isWide ? trackRect.width / 2 : 16);
      d.push(`M ${startX.toFixed(1)} 0`);

      // Segment 0: Top to Node 0 (gentle intro curve)
      const firstNode = nodePoints[0];
      if (firstNode) {
        const dy = firstNode.y;
        const swing0 = isWide ? 35 : 10;
        const cp1x = startX + swing0;
        const cp1y = dy * 0.35;
        const cp2x = firstNode.x + swing0;
        const cp2y = dy * 0.65;
        d.push(
          `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${firstNode.x.toFixed(1)} ${firstNode.y.toFixed(1)}`
        );
      }

      // Segments between nodes (Node i to Node i+1)
      for (let i = 0; i < nodePoints.length - 1; i++) {
        const p0 = nodePoints[i];
        const p1 = nodePoints[i + 1];
        const dy = p1.y - p0.y;
        // Swing towards the card:
        // When i is even: Node 0 -> Node 1 (Event 1 card is on the LEFT). Swing left.
        // When i is odd: Node 1 -> Node 2 (Event 2 card is on the RIGHT). Swing right.
        const toLeft = i % 2 === 0;
        const swingMag = isWide ? 48 : 12;
        const swing = isWide ? (toLeft ? -swingMag : swingMag) : swingMag;

        const cp1x = p0.x + swing;
        const cp1y = p0.y + dy * 0.35;
        const cp2x = p1.x + swing;
        const cp2y = p0.y + dy * 0.65;
        d.push(
          `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`
        );
      }

      // Final Segment: From last node smoothly docking at the top border of the button
      const lastNode = nodePoints[nodePoints.length - 1];
      if (lastNode) {
        const dy = buttonY - lastNode.y;
        const cp1x = lastNode.x;
        const cp1y = lastNode.y + dy * (isWide ? 0.45 : 0.4);
        const cp2x = targetButtonX;
        const cp2y = lastNode.y + dy * (isWide ? 0.55 : 0.6);
        d.push(
          `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${targetButtonX.toFixed(1)} ${buttonY.toFixed(1)}`
        );
      }

      setPathData({
        pathD: d.join(" "),
        buttonPoint: { x: targetButtonX, y: buttonY },
      });
    };

    // Calculate after rendering
    compute();
    window.addEventListener("resize", compute);
    const ro = new ResizeObserver(compute);
    ro.observe(track);

    return () => {
      window.removeEventListener("resize", compute);
      ro.disconnect();
    };
  }, [list.length]);

  // GSAP animation for the curved SVG laser path
  useEffect(() => {
    if (!pathData.pathD) return;
    registerGsap();
    const fillPath = fillPathRef.current;
    const track = trackRef.current;
    if (!fillPath || !track) return;

    const mm = gsap.matchMedia();
    mm.add({ motion: "(prefers-reduced-motion: no-preference)" }, (ctx) => {
      const { motion } = ctx.conditions as { motion: boolean };
      const totalLen = fillPath.getTotalLength();
      if (!motion) {
        gsap.set(fillPath, { strokeDasharray: totalLen, strokeDashoffset: 0 });
        return;
      }

      gsap.set(fillPath, { strokeDasharray: totalLen, strokeDashoffset: totalLen });
      gsap.to(fillPath, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: track,
          start: "top 65%",
          end: "bottom 78%",
          scrub: 0.6,
        },
      });
    });

    return () => mm.revert();
  }, [pathData.pathD]);

  // GSAP animations for cards, titles, numbers, and live row toggles
  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el || list.length === 0) return;
    const mm = gsap.matchMedia();
    mm.add({ motion: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 768px)" }, (ctx) => {
      const { motion, wide } = ctx.conditions as { motion: boolean; wide: boolean };
      if (!motion) return;

      gsap.to("[data-bg-word]", { xPercent: -35, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });

      gsap.utils.toArray<HTMLElement>("[data-row]").forEach((row, i) => {
        const fromLeft = wide ? i % 2 === 1 : false;
        gsap.fromTo(
          row.querySelector("[data-card]"),
          { x: wide ? (fromLeft ? -120 : 120) : 60, opacity: 0, skewX: fromLeft ? 6 : -6 },
          { x: 0, opacity: 1, skewX: 0, ease: "none", scrollTrigger: { trigger: row, start: "top 90%", end: "top 55%", scrub: 0.6 } }
        );
        gsap.fromTo(
          row.querySelector("[data-fill]"),
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", ease: "none", scrollTrigger: { trigger: row, start: "top 65%", end: "top 35%", scrub: 0.6 } }
        );
        gsap.fromTo(
          row.querySelector("[data-num]"),
          { yPercent: 25 },
          { yPercent: -25, ease: "none", scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true } }
        );
        gsap.fromTo(
          row.querySelectorAll("[data-fact]"),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: row, start: "top 60%", end: "top 35%", scrub: 0.6 } }
        );
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
          <div ref={trackRef} data-track className="relative mt-20 md:mt-28">
            {/* SVG Curving Timeline Backbone */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible z-0"
            >
              <defs>
                <filter id="timeline-laser-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="timeline-laser-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e40908" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#ff3b30" stopOpacity="1" />
                  <stop offset="100%" stopColor="#e40908" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Background guide blueprint spline (dashed) */}
              {pathData.pathD && (
                <path
                  d={pathData.pathD}
                  fill="none"
                  stroke="rgba(233, 223, 197, 0.16)"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                />
              )}

              {/* Active animated signal laser spline */}
              {pathData.pathD && (
                <path
                  ref={fillPathRef}
                  d={pathData.pathD}
                  fill="none"
                  stroke="url(#timeline-laser-grad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  filter="url(#timeline-laser-glow)"
                />
              )}

              {/* Terminal docking node right at button top border */}
              {pathData.buttonPoint && (
                <g transform={`translate(${pathData.buttonPoint.x}, ${pathData.buttonPoint.y})`}>
                  <circle r="4.5" fill="#e40908" stroke="#050308" strokeWidth="1.5" />
                  <circle r="8" fill="none" stroke="#e40908" strokeWidth="1" opacity="0.6" className="animate-ping" />
                </g>
              )}
            </svg>

            <ol className="space-y-12 md:space-y-20 relative z-10">
              {list.map((ev, i) => {
                const right = i % 2 === 0;
                return (
                  <li key={ev.id} data-row className="group/row relative grid pl-12 md:grid-cols-2 md:gap-16 lg:gap-20 md:pl-0 items-center">
                    {/* Event station node along the spline */}
                    <div
                      data-node
                      aria-hidden
                      className="absolute left-4 top-10 z-10 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2 flex items-center justify-center select-none"
                    >
                      {/* Pulse aura */}
                      <span className="absolute h-8 w-8 rounded-full border border-signal/0 opacity-0 transition-all duration-500 group-[.is-live]/row:border-signal/60 group-[.is-live]/row:opacity-100 group-[.is-live]/row:animate-ping pointer-events-none" />
                      {/* Node diamond */}
                      <span className="h-3.5 w-3.5 rotate-45 border-2 border-sand bg-void transition-all duration-500 group-[.is-live]/row:scale-125 group-[.is-live]/row:border-signal group-[.is-live]/row:bg-signal group-[.is-live]/row:shadow-[0_0_16px_rgba(228,9,8,0.85)]" />
                      {/* Inner core */}
                      <span className="absolute h-1 w-1 rounded-full bg-sand transition-all duration-500 group-[.is-live]/row:bg-white" />
                    </div>

                    <div className={`relative hidden items-center md:flex ${right ? "md:order-1 md:justify-end" : "md:order-2"}`}>
                      <span data-num aria-hidden className={`condensed select-none text-[clamp(5.5rem,10vw,9.5rem)] leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(233,223,197,0.35)] transition-[-webkit-text-stroke-color] group-[.is-live]/row:[-webkit-text-stroke-color:var(--signal)]`}>{pad(i + 1)}</span>
                    </div>

                    <Link
                      href={`/events/${ev.slug}`}
                      data-card
                      data-cursor="Open"
                      className={`relative block border border-sand/15 bg-forest p-5 sm:p-6 md:p-6 lg:p-7 max-w-md xl:max-w-lg w-full transition-colors hover:border-signal ${right ? "md:order-2 md:justify-self-start shard-a" : "md:order-1 md:justify-self-end shard-b"}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="condensed text-xl text-signal md:hidden">{pad(i + 1)}</span>
                        <Tag tone="red">{ev.category}</Tag>
                      </div>
                      <h3 className="display relative mt-3.5 text-[clamp(1.5rem,2.8vw,2.25rem)] leading-tight">
                        <span className="outline-text block text-sand/80">{ev.title}</span>
                        <span aria-hidden data-fill className="absolute inset-0 block text-signal">{ev.title}</span>
                      </h3>
                      <p className="mt-2 font-mono text-xs font-bold text-sand">{ev.tagline}</p>
                      <p className="mt-2.5 max-w-sm text-xs sm:text-sm text-sand-dim leading-relaxed">{ev.summary}</p>
                      <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-sand/15 pt-3.5 font-mono text-[10.5px] sm:text-[11px]">
                        {ev.facts.slice(0, 4).map((f) => (
                          <li key={f.label} data-fact>
                            <span className="text-sand-dim">{f.label}</span>
                            <br />
                            <span className="font-bold text-sand">{f.value}</span>
                          </li>
                        ))}
                      </ul>
                    </Link>
                  </li>
                );
              })}
            </ol>

            {/* All Events CTA Button: line docks precisely at top border; button is solid void black so inside is 100% clean */}
            <div ref={buttonWrapRef} className="mt-16 md:mt-20 text-center relative z-20">
              <Button
                href="/events"
                variant="secondary"
                className="!bg-void relative z-20 shadow-[0_4px_24px_rgba(5,3,8,0.95)]"
              >
                All events
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
