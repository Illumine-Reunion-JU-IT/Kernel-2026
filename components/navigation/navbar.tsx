"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "./nav-links";
import { MobileMenu } from "./mobile-menu";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/lib/content";
import { cn } from "@/lib/utils";
import { JuLogo, KernelLogo } from "@/components/brand/logos";

export function Navbar() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-snap",
        hidden ? "-translate-y-full" : "translate-y-0",
        solid ? "bg-void/80 backdrop-blur-md" : "bg-transparent"
      )}
      style={{ height: "var(--nav-h)" }}
    >
      <div className="container flex h-full items-center justify-between gap-6">
        <Link href="/" aria-label="KERNEL 1.0 home" data-cursor="Home" className="flex items-center gap-3">
          <JuLogo className="h-9 w-9 ring-1 ring-sand/30" />
          <span aria-hidden className="h-8 w-px bg-sand/30" />
          <KernelLogo priority className="h-11" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {navLinks.slice(1).map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className="group relative py-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-sand"
              >
                {link.label}
                <span className={cn("absolute inset-x-0 bottom-0 h-[2px] origin-left bg-signal transition-transform duration-500 ease-snap", active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100")} />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            {hasRegistration ? (
              <Button href={siteContent.registrationUrl!} external className="!px-5 !py-3 !text-[11px]">Register</Button>
            ) : (
              <Button disabled className="!px-5 !py-3 !text-[11px]">Registration soon</Button>
            )}
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
