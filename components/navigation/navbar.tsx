"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "./nav-links";
import { MobileMenu } from "./mobile-menu";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/lib/content";
import { cn } from "@/lib/utils";
import { JuLogo, KernelLogo } from "@/components/brand/logos";
import { scrollToElement } from "@/lib/scroll";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const hasRegistration = Boolean(siteContent.registrationUrl);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(y > last && y > 240);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Track which section is in view when on the home page */
  useEffect(() => {
    if (pathname !== "/") return;
    const sectionIds = ["about", "workshop", "sponsors", "contact"];
    const handleScroll = () => {
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom > 100) {
            setActiveSection(sectionIds[i]);
            return;
          }
        }
      }
      setActiveSection("");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes("#")) {
      e.preventDefault();
      const [targetPath, hash] = href.split("#");
      const targetEl = hash ? document.getElementById(hash) : null;
      if (targetEl && (hash === "contact" || pathname === (targetPath || "/"))) {
        scrollToElement(targetEl, 72, 1.2);
        setActiveSection(hash);
      } else if (hash) {
        try {
          sessionStorage.setItem("kernel_scroll_target", hash);
        } catch {}
        router.push(targetPath || "/");
      }
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-snap",
        hidden ? "-translate-y-full" : "translate-y-0",
        solid ? "bg-void/85 backdrop-blur-md" : "bg-transparent"
      )}
      style={{ height: "var(--nav-h)" }}
    >
      <div className="container flex h-full items-center justify-between gap-6">
        <Link href="/" aria-label="KERNEL 1.0 home" data-cursor="Home" className="flex items-center gap-3">
          <JuLogo className="h-9 w-9 ring-1 ring-sand/30" />
          <span aria-hidden className="h-8 w-px bg-sand/30" />
          <KernelLogo priority className="h-11" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 rounded-full border border-sand/15 bg-forest/75 px-2.5 py-1.5 backdrop-blur-md shadow-[0_6px_24px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)] lg:flex">
          {navLinks.slice(1).map((link) => {
            const isSectionLink = link.href.includes("#");
            const sectionHash = isSectionLink ? link.href.split("#")[1] : null;
            const active = isSectionLink
              ? pathname === "/" && activeSection === sectionHash
              : pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href + "/"));

            return (
              <Link
                key={link.href}
                href={link.href}
                scroll={!isSectionLink}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative rounded-full px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal/80",
                  active
                    ? "bg-signal text-white shadow-[0_0_18px_rgba(228,9,8,0.45)]"
                    : "text-sand/85 hover:bg-white/[0.08] hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-4">
          <div>
            {hasRegistration ? (
              <Button href={siteContent.registrationUrl!} external className="!px-4 !py-2 !text-xs sm:!px-5 sm:!py-2.5 sm:!text-[13px]">
                Register
              </Button>
            ) : (
              <Button disabled className="!px-4 !py-2 !text-xs sm:!px-5 sm:!py-2.5 sm:!text-[13px]">
                Register
              </Button>
            )}
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
