import Link from "next/link";

/**
 * Branded 404 Not Found page for KERNEL 1.0.
 * Follows the project's terminal-inspired aesthetic and provides
 * accessible, clear pathways back to the primary application routes.
 */
export default function NotFound() {
  return (
    <section className="wrap min-h-[60vh] flex flex-col items-center justify-center text-center py-20 px-4">
      {/* Status indicator */}
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[rgba(255,45,45,0.12)] border border-[rgba(255,45,45,0.4)] text-[#FF2D2D] font-mono text-xs uppercase tracking-widest rounded-sm mb-6">
        <span className="w-2 h-2 rounded-full bg-[#FF2D2D] animate-pulse" aria-hidden="true" />
        <span>404 // SIGNAL LOST</span>
      </div>

      {/* Main heading */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#EEE5D0] mb-4">
        LOST IN <span className="glitch text-[#E9DFC5]">THE VOID.</span>
      </h1>

      {/* Descriptive explanation */}
      <p className="max-w-md text-sm sm:text-base text-[#c0cec7] mb-8 leading-relaxed">
        The coordinate you requested does not exist in the KERNEL 1.0 arena.
        It may have been deallocated, renamed, or never compiled into this build.
      </p>

      {/* Navigation recovery actions */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="btn inline-flex items-center justify-center gap-2.5 px-6 py-3.5 border border-[#E9DFC5] text-[#0B241A] bg-[#E9DFC5] font-mono text-xs uppercase tracking-wider font-medium hover:bg-transparent hover:text-[#E9DFC5] transition-all rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77CFF]"
        >
          <span>Return to Arena</span>
          <span aria-hidden="true">↗</span>
        </Link>
        <Link
          href="/events"
          className="inline-flex items-center justify-center gap-2 px-5 py-3.5 border border-[var(--line)] text-[#c0cec7] hover:text-[#E9DFC5] hover:border-[#E9DFC5] font-mono text-xs uppercase tracking-wider transition-all rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77CFF]"
        >
          Browse Events
        </Link>
      </div>

      {/* Terminal metadata footer */}
      <div className="mt-16 pt-6 border-t border-[rgba(233,223,197,0.1)] text-[#B6B39F] font-mono text-[10px] tracking-widest uppercase">
        SYS_STATUS: 404_NOT_FOUND · KERNEL 1.0 · JADAVPUR UNIVERSITY
      </div>
    </section>
  );
}
