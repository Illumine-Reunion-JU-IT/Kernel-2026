"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export interface ContactFormData {
  name: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactSectionProps {
  /** Optional statue/bust image path */
  statueImagePath?: string;
  /** Optional LinkedIn URL */
  linkedInUrl?: string;
  /** Optional custom submit handler; falls back to /api/contact */
  onSubmitMessage?: (data: ContactFormData) => Promise<void>;
}

export function ContactSection({
  statueImagePath = "/images/statue-bust.png",
  linkedInUrl = "https://www.linkedin.com/school/jadavpur-university/",
  onSubmitMessage,
}: ContactSectionProps) {
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "sent" | "error"
  >("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const email = "kerneljuit@gmail.com";

  /* Magnetic pull on the glowing circular SEND CTA button */
  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const qx = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const qy = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      qx((e.clientX - (r.left + r.width / 2)) * 0.35);
      qy((e.clientY - (r.top + r.height / 2)) * 0.35);
    };
    const reset = () => {
      qx(0);
      qy(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Fallback handled by browser mailto link
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      if (onSubmitMessage) {
        await onSubmitMessage(form);
      } else {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Failed to transmit");
      }
      setStatus("sent");
      setForm({ name: "", phone: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative w-full bg-void text-sand border-t border-white/10 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      {/* Subtle architectural grid lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      {/* Decorative corner crosshairs */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-6 right-8 font-mono text-xs text-signal/50 select-none"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 right-8 font-mono text-xs text-sand/20 select-none"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-6 left-8 font-mono text-xs text-sand/20 select-none"
      >
        +
      </span>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* ── LEFT COLUMN (6 cols): Crimson Editorial Monolith ────── */}
          <div className="relative lg:col-span-6 flex flex-col">
            <div
              className="relative flex-1 bg-[#c80807] text-void p-6 sm:p-8 md:p-9 pb-10 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(180,8,8,0.28)]"
              style={{
                clipPath:
                  "polygon(0 0, 75% 0, 79% 22px, 94% 22px, 100% 80px, 100% calc(100% - 44px), calc(100% - 44px) 100%, 0 100%)",
              }}
            >
              {/* Layer 1 (Bottom): Subtle halftone + dark vignette so red isn't glaring */}
              <div
                aria-hidden="true"
                className="halftone-dark pointer-events-none absolute inset-0 opacity-65 z-0"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_85%_85%,rgba(5,3,8,0.28),transparent_60%)]"
              />

              {/* Layer 2 (Middle): Prominent, solid classical marble bust statue */}
              {statueImagePath && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none select-none absolute -bottom-2 right-2 sm:right-4 w-32 sm:w-36 md:w-40 lg:w-44 z-20 opacity-100"
                >
                  <Image
                    src={statueImagePath}
                    alt=""
                    width={629}
                    height={848}
                    className="w-full h-auto grayscale contrast-125 brightness-105 drop-shadow-[0_14px_30px_rgba(5,3,8,0.75)]"
                    priority
                  />
                </div>
              )}

              {/* Layer 3 (Top): Writings, Ledger Table & Metadata */}
              <div className="relative z-30 flex flex-col justify-between h-full">
                <div className="pb-28 sm:pb-32">
                  <h2
                    id="contact-heading"
                    className="display section-title max-w-[72%] italic font-black uppercase text-void tracking-tight mb-5 sm:mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.1)]"
                  >
                    CONTACT US
                  </h2>

                  {/* Structured contact ledger */}
                  <dl className="border-2 border-void divide-y-2 divide-void bg-[#b00606]/30">
                    {/* Row 1: Located At */}
                    <div className="grid grid-cols-1 sm:grid-cols-[105px_1fr] md:grid-cols-[115px_1fr] sm:divide-x-2 sm:divide-void">
                      <dt className="p-3 sm:p-3.5 font-mono text-xs sm:text-[13px] md:text-sm font-black uppercase tracking-wider text-void flex items-center">
                        LOCATED AT:
                      </dt>
                      <dd className="p-3 sm:p-3.5 text-sm sm:text-[15px] md:text-base font-bold leading-snug text-void flex items-center">
                        Jadavpur University, Salt Lake Campus, Kolkata 700105
                      </dd>
                    </div>

                    {/* Row 2: Email Us */}
                    <div className="grid grid-cols-1 sm:grid-cols-[105px_1fr] md:grid-cols-[115px_1fr] sm:divide-x-2 sm:divide-void">
                      <dt className="p-3 sm:p-3.5 font-mono text-xs sm:text-[13px] md:text-sm font-black uppercase tracking-wider text-void flex items-center">
                        EMAIL US:
                      </dt>
                      <dd className="p-3 sm:p-3.5 text-sm sm:text-[15px] md:text-base font-bold flex flex-wrap items-center justify-between gap-2">
                        <a
                          href={`mailto:${email}`}
                          className="underline decoration-void/50 underline-offset-4 hover:decoration-void text-void transition-colors text-xs sm:text-[13px] md:text-sm font-bold whitespace-nowrap"
                        >
                          {email}
                        </a>
                        <button
                          type="button"
                          onClick={handleCopyEmail}
                          className="font-mono text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 border-2 border-void text-void hover:bg-void hover:text-sand transition-colors shrink-0 cursor-pointer shadow-sm active:scale-95 ml-auto"
                          title="Copy email to clipboard"
                        >
                          {copiedEmail ? "COPIED" : "COPY"}
                        </button>
                      </dd>
                    </div>

                    {/* Row 3: LinkedIn */}
                    <div className="grid grid-cols-1 sm:grid-cols-[105px_1fr] md:grid-cols-[115px_1fr] sm:divide-x-2 sm:divide-void">
                      <dt className="p-3 sm:p-3.5 font-mono text-xs sm:text-[13px] md:text-sm font-black uppercase tracking-wider text-void flex items-center">
                        FOLLOW US ON LINKEDIN:
                      </dt>
                      <dd className="p-3 sm:p-3.5 text-sm sm:text-[15px] md:text-base font-bold flex items-center">
                        <a
                          href={linkedInUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 underline decoration-void/50 underline-offset-4 hover:decoration-void text-void leading-snug transition-colors"
                        >
                          Jadavpur University - Information Technology
                          Department
                          <span aria-hidden="true" className="text-sm font-black shrink-0">
                            ↗
                          </span>
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Bottom footer text inside the monolith */}
                <div className="mt-10 sm:mt-14 pt-4 pr-32 sm:pr-44 flex items-end justify-start">
                  <p className="font-mono text-[10px] sm:text-[11px] font-black tracking-wider text-void/90 uppercase whitespace-nowrap mr-auto">
                    KERNEL &apos;26 <span className="mx-1.5">|</span> DEPT. OF
                    IT, JADAVPUR UNIVERSITY
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN (6 cols): Direct Architectural Message Form ─ */}
          <div className="relative lg:col-span-6 flex flex-col justify-center lg:pl-6 xl:pl-10">
            <div className="mb-6 sm:mb-8">
              <h3 className="display section-title italic font-black uppercase text-sand tracking-tight">
                SEND A MESSAGE
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <label className="block">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-sand/80 mb-2 block">
                    NAME *
                  </span>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full rounded-md bg-[#0c0a10] border border-[#26242c] px-4 py-3 text-sm text-sand placeholder:text-sand/30 focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal transition-colors"
                  />
                </label>

                <label className="block">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-sand/80 mb-2 block">
                    PHONE *
                  </span>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="+91 98XXX XXXXX"
                    className="w-full rounded-md bg-[#0c0a10] border border-[#26242c] px-4 py-3 text-sm text-sand placeholder:text-sand/30 focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal transition-colors"
                  />
                </label>
              </div>

              {/* Row 2: Subject */}
              <label className="block">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-sand/80 mb-2 block">
                  SUBJECT *
                </span>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  placeholder="Sponsorships, event query, or collaboration"
                  className="w-full rounded-md bg-[#0c0a10] border border-[#26242c] px-4 py-3 text-sm text-sand placeholder:text-sand/30 focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal transition-colors"
                />
              </label>

              {/* Row 3: Message */}
              <label className="block">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-sand/80 mb-2 block">
                  MESSAGE *
                </span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Write your message here..."
                  className="w-full resize-none rounded-md bg-[#0c0a10] border border-[#26242c] px-4 py-3 text-sm text-sand placeholder:text-sand/30 focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal transition-colors"
                />
              </label>

              {/* Submit Row: Status Feedback + Glowing Circular SEND Button */}
              <div className="pt-2 flex items-center justify-between gap-4">
                <div className="min-h-[24px] font-mono text-xs uppercase tracking-wider">
                  {status === "sent" && (
                    <span className="text-sand font-bold">
                      {"/// Transmission received. We'll respond shortly."}
                    </span>
                  )}
                  {status === "error" && (
                    <span className="text-signal font-bold">
                      {"/// Transmission failed. Please email us directly."}
                    </span>
                  )}
                </div>

                {/* Shard SEND Button matching site primary Register button */}
                <button
                  ref={buttonRef}
                  type="submit"
                  disabled={status === "submitting"}
                  className="kbtn kbtn-primary ml-auto cursor-pointer disabled:opacity-50"
                >
                  <span className="kbtn-label flex items-center gap-2">
                    {status === "submitting" ? "Sending..." : "Send"}
                    <span aria-hidden="true">→</span>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ── CAMPUS MAP UI/UX ──────────────────────────────────────── */}
        <div className="mt-10 lg:mt-12 overflow-hidden rounded-xl border border-sand/15 bg-forest/70 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sand/10 bg-void/70 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal" />
              </span>
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-sand">
                  {"/// Campus Location"}
                </p>
                <p className="mt-0.5 text-sm text-sand-dim">
                  Jadavpur University, Salt Lake Campus · Sector III, Block LB, Kolkata 700106
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <span className="hidden rounded-full border border-sand/15 bg-void/80 px-3 py-1 font-mono text-xs text-sand-dim sm:inline-block">
                22.5615° N · 88.4115° E
              </span>
              <a
                href="https://maps.google.com/?q=Jadavpur+University+Salt+Lake+Campus+Kolkata"
                target="_blank"
                rel="noopener noreferrer"
                className="kbtn kbtn-secondary !px-4 !py-2 !text-xs"
              >
                <span className="kbtn-label flex items-center gap-1.5">
                  Open in Maps <span aria-hidden="true">↗</span>
                </span>
              </a>
            </div>
          </div>

          <div className="relative h-64 w-full sm:h-72 lg:h-80 bg-void">
            <iframe
              title="Jadavpur University Salt Lake Campus Map"
              src="https://maps.google.com/maps?q=Jadavpur%20University%20Salt%20Lake%20Campus&t=&z=16&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0 [filter:invert(92%)_hue-rotate(180deg)_contrast(1.06)_saturate(0.75)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(5,3,8,0.65)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
