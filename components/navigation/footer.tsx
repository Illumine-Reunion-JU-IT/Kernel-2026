"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { navLinks, legalLinks } from "./nav-links";
import { siteContent } from "@/lib/content";
import { isConfirmed } from "@/lib/utils";
import { gsap, registerGsap } from "@/lib/gsap";
import { JuLogo, KernelLogo } from "@/components/brand/logos";
import { CROPS, cropStyle } from "@/lib/poster";
import { scrollToElement } from "@/lib/scroll";
import { ContactSection } from "@/components/contact-section";

/**
 * Footer = the poster's red column turned into a mega menu. Every route is a giant row that
 * flips to black on hover; the statue rises out of the bottom edge as you arrive.
 */
export function Footer() {
  const router = useRouter();
  const root = useRef<HTMLElement>(null);
  const { socialLinks, contactEmail } = siteContent;
  const socials = (Object.entries(socialLinks) as [string, string | null][]).filter(([, url]) => Boolean(url));

  const handleFooterLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes("#")) {
      e.preventDefault();
      const [targetPath, hash] = href.split("#");
      const targetEl = hash ? document.getElementById(hash) : null;
      if (targetEl) {
        scrollToElement(targetEl, 72, 1.2);
      } else if (hash) {
        try {
          sessionStorage.setItem("kernel_scroll_target", hash);
        } catch {}
        router.push(targetPath || "/");
      }
    }
  };

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo("[data-f-statue]", { yPercent: 35 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: true } });
      gsap.from("[data-f-row]", { yPercent: 100, stagger: 0.07, duration: 1, ease: "expo.out", scrollTrigger: { trigger: "[data-f-menu]", start: "top 85%", once: true } });
      gsap.to("[data-f-spin]", { rotate: 360, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: true } });
    });
    return () => mm.revert();
  }, []);

  const backToTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.8 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <ContactSection />
      <footer ref={root} className="relative overflow-hidden bg-signal pt-[max(6rem,11vw)] text-void [clip-path:polygon(0_5vw,100%_0,100%_100%,0_100%)]">
      <div aria-hidden className="halftone-dark absolute inset-0" />
      <div data-f-statue aria-hidden className="pointer-events-none absolute -bottom-[4%] -right-[6vw] w-[46vw] min-w-56 mix-blend-screen grayscale opacity-60" style={cropStyle(CROPS.statue)} />

      <div className="container relative">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="shard-a bg-void p-3"><KernelLogo className="h-16 md:h-20" /></span>
            <JuLogo className="h-14 w-14 ring-2 ring-void md:h-16 md:w-16" />
          </div>
          <p className="max-w-xs text-base font-semibold md:text-right">{siteContent.department}, {siteContent.university}.</p>
        </div>

        <nav aria-label="Footer" data-f-menu className="mt-14 md:mt-20">
          <ul className="border-b-2 border-void">
            {navLinks.slice(1).map((l, i) => (
              <li key={l.href} className="overflow-hidden border-t-2 border-void">
                <Link
                  data-f-row
                  href={l.href}
                  scroll={!l.href.includes("#")}
                  onClick={(e) => handleFooterLinkClick(e, l.href)}
                  className="group relative flex items-baseline gap-4 overflow-hidden py-3 md:gap-8 md:py-4"
                >
                  <span aria-hidden className="absolute inset-0 -translate-x-full bg-void transition-transform duration-500 ease-snap group-hover:translate-x-0 group-focus-visible:translate-x-0" />
                  <span className="relative text-sm font-bold md:text-base"><span className="group-hover:text-signal group-focus-visible:text-signal">0{i + 1}</span></span>
                  <span className="display relative text-[clamp(2.2rem,9.5vw,8rem)] transition-colors duration-300 group-hover:text-sand group-focus-visible:text-sand group-hover:translate-x-4 group-focus-visible:translate-x-4 [transition-property:color,translate]">{l.label}</span>
                  <span aria-hidden className="relative ml-auto hidden text-3xl font-bold opacity-0 transition-opacity group-hover:text-signal group-hover:opacity-100 md:block">{"///"}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-8">
          <div className="space-y-2 text-sm font-bold">
            {isConfirmed(contactEmail) && <a href={`mailto:${contactEmail}`} className="block text-lg underline underline-offset-4">{contactEmail}</a>}
            {socials.map(([name, url]) => (<a key={name} href={url!} target="_blank" rel="noopener noreferrer" className="mr-5 inline-block uppercase tracking-widest hover:underline">{name}</a>))}
            {legalLinks.map((l) => (<Link key={l.href} href={l.href} className="inline-block uppercase tracking-widest hover:underline">{l.label}</Link>))}
          </div>
          <button type="button" onClick={backToTop} aria-label="Back to top" data-cursor="Top" className="relative grid h-28 w-28 place-items-center rounded-full bg-void text-sand md:h-32 md:w-32">
            <svg data-f-spin aria-hidden viewBox="0 0 120 120" className="absolute inset-0 h-full w-full">
              <defs><path id="fring" d="M60 60 m-47 0 a47 47 0 1 1 94 0 a47 47 0 1 1 -94 0" /></defs>
              <text className="fill-current text-[10.5px] font-bold tracking-[0.2em]" style={{ fontFamily: "var(--font-mono)" }}><textPath href="#fring">BACK TO TOP ✦ BACK TO TOP ✦ </textPath></text>
            </svg>
            <span aria-hidden className="relative text-3xl font-bold text-signal">↑</span>
          </button>
        </div>
      </div>

      <p aria-hidden className="display relative select-none whitespace-nowrap pt-10 text-center text-[clamp(3.5rem,15.5vw,18rem)] leading-[0.76] tracking-tight text-void">KERNEL</p>
      <div className="relative border-t-2 border-void py-5">
        <p className="container text-xs font-bold tracking-wider">KERNEL {siteContent.edition} / 2026. More than just an event.</p>
      </div>
    </footer>
  </div>
  );
}
