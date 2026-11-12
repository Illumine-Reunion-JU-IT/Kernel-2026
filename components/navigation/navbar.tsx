import Link from "next/link";
import { navLinks } from "./nav-links";
import { MobileMenu } from "./mobile-menu";

export function Navbar() {
  return (
    <>
      <div className="h-1 bg-gradient-to-r from-[#B77CFF] via-[#9A4DFF] to-[#FF2D2D]" />

      <header className="sticky top-0 z-40 border-b border-[#EEE5D0]/15 bg-[#0B241A]/95 backdrop-blur-md">
        <div className="mx-auto flex min-h-[76px] w-full max-w-[1360px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
          <Link
            href="/"
            aria-label="KERNEL 1.0 home"
            className="flex shrink-0 items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77CFF]"
          >
            <span className="grid size-10 place-items-center border border-[#B77CFF] font-mono text-xl text-[#B77CFF]">
              K
            </span>

            <span className="text-lg font-bold tracking-tight text-[#EEE5D0]">
              KERNEL
              <span className="ml-1 text-[#B77CFF]">1.0</span>
              <span className="mt-0.5 block font-mono text-[9px] font-normal tracking-[0.16em] text-[#B6B39F]">
                JADAVPUR UNIVERSITY
              </span>
            </span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-5 lg:flex xl:gap-7"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap font-mono text-[11px] text-[#B6B39F] transition hover:text-[#B77CFF] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77CFF] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0B241A]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <MobileMenu />
        </div>
      </header>
    </>
  );
}
