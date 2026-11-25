"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { navLinks, legalLinks } from "./nav-links";
import { siteContent } from "@/lib/content";
import { JuLogo, KernelLogo } from "@/components/brand/logos";
import { scrollToElement } from "@/lib/scroll";

const COMPETITIONS = [
  { label: "Hack Sangram (Hackathon)", href: "/events/hack-sangram" },
  { label: "Mogoj Dholai (CP Contest)", href: "/events/mogoj-dholai" },
  { label: "Data Nilaam (ML Auction)", href: "/events/data-nilaam" },
  { label: "Hojohborolo (Tech Sprint)", href: "/events/hojohborolo" },
  { label: "BGMI (Esports)", href: "/events/bgmi" },
  { label: "Real Cricket (Esports)", href: "/events/real-cricket" },
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

              {/* Contact Email & Discord Highlight */}
              <div className="space-y-2.5 max-w-sm">
                <div className="rounded-lg border border-white/10 bg-forest/80 p-3.5 backdrop-blur-sm">
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

                <a
                  href="https://discord.gg/XTCetvVU5Y"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg border border-[#5865F2]/35 bg-[#5865F2]/10 px-3.5 py-2.5 font-mono text-xs font-bold text-sand transition-all hover:border-[#5865F2] hover:bg-[#5865F2]/20 group"
                >
                  <span className="flex items-center gap-2.5">
                    <svg className="h-4 w-4 shrink-0 text-[#7289da]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                    <span>JOIN OFFICIAL DISCORD</span>
                  </span>
                  <span aria-hidden className="text-sand-dim group-hover:text-white group-hover:translate-x-0.5 transition-all">↗</span>
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
                {COMPETITIONS.map((ev) => (
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
