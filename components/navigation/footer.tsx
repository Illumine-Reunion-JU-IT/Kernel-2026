"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { navLinks, legalLinks } from "./nav-links";
import { siteContent } from "@/lib/content";
import { JuLogo, KernelLogo } from "@/components/brand/logos";
import { scrollToElement } from "@/lib/scroll";
import { ContactSection } from "@/components/contact-section";

const FEATURED_EVENTS = [
  { label: "Hack Sangram (Hackathon)", href: "/events/hack-sangram" },
  { label: "Mogoj Dholai (CP Contest)", href: "/events/mogoj-dholai" },
  { label: "Data Nilaam (ML Auction)", href: "/events/data-nilaam" },
  { label: "Hojohborolo (Tech Sprint)", href: "/events/hojohborolo" },
  { label: "Speaker Sessions", href: "/events/speaker-session" },
];

export function Footer() {
  const router = useRouter();
  const contactEmail = siteContent.contactEmail || "kerneljuit@gmail.com";

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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

  const backToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <footer className="relative border-t border-white/10 bg-[#06040a] text-sand pt-12 pb-8 overflow-hidden">
        {/* Subtle accent glow line at the top */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-signal to-transparent opacity-80" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content Grid */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 pb-12">
            
            {/* Column 1: Brand & Bio (lg:col-span-4) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center gap-3">
                  <JuLogo className="h-10 w-10 ring-1 ring-sand/30" />
                  <span aria-hidden className="h-8 w-px bg-sand/30" />
                  <KernelLogo className="h-10" />
                </div>
                <p className="mt-4 text-xs sm:text-sm text-sand-dim leading-relaxed max-w-sm">
                  The official annual technology symposium of the Department of Information Technology, Jadavpur University. A festival of code, robotics, ML, and engineering excellence.
                </p>
              </div>

              {/* Contact Email Highlight */}
              <div className="rounded-lg border border-white/10 bg-forest/80 p-3.5 backdrop-blur-sm max-w-sm">
                <span className="font-mono text-[10px] font-bold tracking-widest text-sand-dim uppercase block mb-1">
                  OFFICIAL INQUIRIES & SPONSORSHIPS
                </span>
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-mono text-xs sm:text-sm font-bold text-signal hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <svg className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{contactEmail}</span>
                </a>
              </div>
            </div>

            {/* Column 2: Navigation Links (lg:col-span-3) */}
            <div className="lg:col-span-3">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-signal mb-4 flex items-center gap-2">
                <span>Navigation</span>
                <span className="h-px flex-1 bg-signal/20" />
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm font-mono">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      scroll={!link.href.includes("#")}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-sand-dim hover:text-sand hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                    >
                      <span className="text-signal/60 font-mono text-[10px]">›</span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Featured Events (lg:col-span-3) */}
            <div className="lg:col-span-3">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-signal mb-4 flex items-center gap-2">
                <span>Competitions</span>
                <span className="h-px flex-1 bg-signal/20" />
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm font-mono">
                {FEATURED_EVENTS.map((ev) => (
                  <li key={ev.href}>
                    <Link
                      href={ev.href}
                      className="text-sand-dim hover:text-sand hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                    >
                      <span className="text-signal/60 font-mono text-[10px]">›</span>
                      <span>{ev.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Location & Back to Top (lg:col-span-2) */}
            <div className="lg:col-span-2 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-signal mb-4 flex items-center gap-2">
                  <span>Venue</span>
                  <span className="h-px flex-1 bg-signal/20" />
                </h3>
                <address className="not-italic text-xs text-sand-dim leading-relaxed font-mono">
                  Department of IT,<br />
                  Jadavpur University<br />
                  Salt Lake Campus, Block LB,<br />
                  Sector III, Kolkata - 700106
                </address>
              </div>

              {/* Compact Back-to-Top Button */}
              <button
                type="button"
                onClick={backToTop}
                aria-label="Back to top of page"
                className="group inline-flex items-center gap-2 rounded border border-sand/20 bg-void/80 px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-sand transition-all hover:border-signal hover:bg-signal hover:text-white"
              >
                <span>Back to top</span>
                <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>
              </button>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Legal */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-sand-dim">
            <p className="text-center sm:text-left">
              © 2026 KERNEL {siteContent.edition} · {siteContent.department}, {siteContent.university}. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {legalLinks.map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-sand transition-colors underline-offset-4 hover:underline">
                  {l.label}
                </Link>
              ))}
              <span className="text-signal font-bold">KERNEL // MORE THAN JUST AN EVENT</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
