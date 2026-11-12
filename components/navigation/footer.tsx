import Link from "next/link";
import { navLinks } from "./nav-links";

export function Footer() {
  return (
    <footer className="border-t border-[#EEE5D0]/15 bg-[#071B13]">
      <div className="mx-auto grid w-full max-w-[1360px] gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 lg:grid-cols-3 lg:px-10">
        <div>
          <Link
            href="/"
            className="text-3xl font-bold tracking-tight text-[#EEE5D0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77CFF]"
          >
            KERNEL<span className="text-[#B77CFF]">.</span>
          </Link>

          <p className="mt-4 max-w-xs text-sm leading-7 text-[#B6B39F]">
            The technology event of the Department of Information Technology,
            Jadavpur University.
          </p>
        </div>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-[#B77CFF]">
            Explore
          </h2>

          <nav aria-label="Footer navigation" className="mt-4 grid grid-cols-2 gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#B6B39F] transition hover:text-[#EEE5D0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77CFF]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-[#B77CFF]">
            Information
          </h2>

          <Link
            href="/privacy"
            className="mt-4 inline-block text-sm text-[#B6B39F] transition hover:text-[#EEE5D0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77CFF]"
          >
            Privacy Policy
          </Link>
        </div>
      </div>

      <div className="border-t border-[#EEE5D0]/10">
        <div className="mx-auto flex w-full max-w-[1360px] flex-col items-start justify-between gap-4 px-5 py-5 sm:px-8 md:flex-row md:items-center lg:px-10">
          <p className="font-mono text-[10px] tracking-wide text-[#B6B39F]">
            © {new Date().getFullYear()} KERNEL 1.0 · JADAVPUR UNIVERSITY
          </p>

          <a
            href="#top"
            className="font-mono text-[10px] tracking-wide text-[#B77CFF] transition hover:text-[#EEE5D0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77CFF]"
          >
            BACK TO TOP ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
