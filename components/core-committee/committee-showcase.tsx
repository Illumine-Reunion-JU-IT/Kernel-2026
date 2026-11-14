"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/* ── Committee Structure in EXACT requested order ────────────── */
interface Member {
  id: string;
  name: string;
  role: string;
  year: string;
  imagePath: string;
}

interface Section {
  key: string;
  title: string;
  tagline: string;
  description: string;
  members: Member[];
}

const SECTIONS: Section[] = [
  {
    key: "secretary",
    title: "Secretary",
    tagline: "EXECUTIVE DIRECTIVE // CHIEF CONVENER",
    description:
      "General Secretary of the Department of Information Technology, Jadavpur University. Steering KERNEL 1.0 with vision, strategic governance, and campus-wide coordination.",
    members: [
      {
        id: "rishav-chowdhury",
        name: "Rishav Chowdhury",
        role: "Secretary",
        year: "UG4",
        imagePath: "/images/core-committee/rishav-chowdhury.jpg",
      },
    ],
  },
  {
    key: "treasury",
    title: "Treasurer",
    tagline: "FINANCIAL OPERATIONS // RESOURCE ALLOCATION",
    description:
      "Overseeing institutional budgeting, financial transparency, accounts auditing, and logistics capital for every arena of KERNEL 1.0.",
    members: [
      {
        id: "anuska-nath",
        name: "Anuska Nath",
        role: "Treasurer",
        year: "UG4",
        imagePath: "/images/core-committee/anuska-nath.jpg",
      },
      {
        id: "ansh-kumar-singh",
        name: "Ansh Kumar Singh",
        role: "Treasurer",
        year: "UG4",
        imagePath: "/images/core-committee/ansh-kumar-singh.jpg",
      },
      {
        id: "tanishq-majumder",
        name: "Tanishq Majumder",
        role: "Treasurer",
        year: "UG3",
        imagePath: "/images/core-committee/tanishq-majumder.jpg",
      },
    ],
  },
  {
    key: "tech-lead",
    title: "Tech Lead",
    tagline: "SYSTEM ARCHITECTURE // INFRASTRUCTURE LEAD",
    description:
      "Architecting the digital frontier: core portals, tournament engines, registration microservices, and server operations behind KERNEL 1.0.",
    members: [
      {
        id: "rahul-pandey",
        name: "Rahul Pandey",
        role: "Tech Lead",
        year: "UG4",
        imagePath: "/images/core-committee/rahul-pandey.jpg",
      },
    ],
  },
  {
    key: "event-coordinators",
    title: "Event Coordinators",
    tagline: "ARENA OPERATIONS // TOURNAMENT PROTOCOL",
    description:
      "Staging the battlegrounds — orchestrating hackathons, esport arenas, coding sprints, tech paper symposia, and live stage dynamics.",
    members: [
      {
        id: "debarun-patra",
        name: "Debarun Patra",
        role: "Event Coordinator",
        year: "UG3",
        imagePath: "/images/core-committee/debarun-patra.jpg",
      },
      {
        id: "saptarshi-sau",
        name: "Saptarshi Sau",
        role: "Event Coordinator",
        year: "UG3",
        imagePath: "/images/core-committee/saptarshi-sau.jpg",
      },
    ],
  },
  {
    key: "sponsorship",
    title: "Sponsorship Team",
    tagline: "CORPORATE PARTNERSHIPS // INDUSTRY ALLIANCES",
    description:
      "Fueling the fest: building corporate syndicates, industry grants, brand integrations, and venture associations for KERNEL 1.0.",
    members: [
      {
        id: "aritra-mondal",
        name: "Aritra Mondal",
        role: "Lead",
        year: "UG2",
        imagePath: "/images/core-committee/aritra-mondal.jpg",
      },
      {
        id: "syed-hasan-farhan",
        name: "Syed Hasan Farhan",
        role: "Coordinator",
        year: "UG2",
        imagePath: "/images/core-committee/syed-hasan-farhan.jpg",
      },
      {
        id: "yasir-ahmad",
        name: "Yasir Ahmad",
        role: "Coordinator",
        year: "UG2",
        imagePath: "/images/core-committee/yasir-ahmad.jpg",
      },
    ],
  },
  {
    key: "pr-team",
    title: "PR Team",
    tagline: "PUBLIC RELATIONS // BROADCAST & MEDIA MATRIX",
    description:
      "Powering outreach across academia and media — viral campaign execution, community mobilization, press relations, and campus ambassador networks.",
    members: [
      {
        id: "sourav-dutta",
        name: "Sourav Dutta",
        role: "Lead",
        year: "UG2",
        imagePath: "/images/core-committee/sourav-dutta.jpg",
      },
      {
        id: "reetabrata-mandal",
        name: "Reetabrata Mandal",
        role: "Coordinator",
        year: "UG2",
        imagePath: "/images/core-committee/reetabrata-mandal.jpg",
      },
      {
        id: "iman-rout",
        name: "Iman Rout",
        role: "Coordinator",
        year: "UG2",
        imagePath: "/images/core-committee/iman-rout.jpg",
      },
    ],
  },
];

function getYearBadgeStyle(y: string) {
  if (y === "UG4") {
    return "text-signal border-signal/40 bg-signal/10 shadow-[0_0_12px_rgba(228,9,8,0.25)]";
  }
  if (y === "UG3") {
    return "text-amber-400 border-amber-400/40 bg-amber-400/10 shadow-[0_0_12px_rgba(251,191,36,0.25)]";
  }
  return "text-cyan-400 border-cyan-400/40 bg-cyan-400/10 shadow-[0_0_12px_rgba(34,211,238,0.25)]";
}

export function CommitteeShowcase() {
  const [activeKey, setActiveKey] = useState(SECTIONS[0].key);
  const [searchQuery, setSearchQuery] = useState("");

  const activeSection = useMemo(
    () => SECTIONS.find((s) => s.key === activeKey) || SECTIONS[0],
    [activeKey]
  );

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return SECTIONS;
    const q = searchQuery.toLowerCase();
    return SECTIONS.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.members.some(
          (m) =>
            m.name.toLowerCase().includes(q) ||
            m.role.toLowerCase().includes(q) ||
            m.year.toLowerCase().includes(q)
        )
    );
  }, [searchQuery]);

  const effectiveSection = useMemo(() => {
    if (filteredSections.some((s) => s.key === activeKey)) return activeSection;
    return filteredSections[0] || activeSection;
  }, [filteredSections, activeKey, activeSection]);

  const totalMembers = SECTIONS.reduce((acc, s) => acc + s.members.length, 0);

  return (
    <div className="relative min-h-screen bg-void text-sand overflow-hidden pt-[calc(var(--nav-h)+1.5rem)] pb-24">
      {/* ── Cyber Atmospheric Backdrops ────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(228,9,8,0.18),transparent_70%)] blur-[120px]"
      />
      <div
        aria-hidden
        className="halftone pointer-events-none absolute top-10 right-0 h-[600px] w-[40vw] opacity-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-[450px] w-[500px] bg-[radial-gradient(circle,rgba(154,77,255,0.08),transparent_70%)] blur-[100px]"
      />

      <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Top Header / Hero Section ──────────────────────── */}
        <div className="border-b border-sand/15 pb-6 mb-8">
          <div className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-widest text-signal uppercase mb-3">
            <span className="h-2 w-2 rounded-full bg-signal animate-pulse" />
            <span>KERNEL 1.0 // ORGANIZING COMMITTEE DIRECTORY</span>
            <span className="text-sand/30">|</span>
            <span className="text-sand/60">DEPARTMENT OF IT, JADAVPUR UNIVERSITY</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="display text-[clamp(2.5rem,7vw,5.5rem)] text-sand leading-[0.88] tracking-tight">
                <span className="outline-text text-sand/30">THE PEOPLE OF</span>{" "}
                <span className="text-signal drop-shadow-[0_4px_35px_rgba(228,9,8,0.5)]">
                  KERNEL
                </span>
              </h1>
              <div className="mt-3 flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase text-sand/60">
                <span className="text-sand font-bold">{totalMembers} CORE MEMBERS</span>
                <span className="text-signal font-bold">///</span>
                <span>{SECTIONS.length} STRATEGIC DIVISIONS</span>
              </div>
            </div>

            {/* Quick Live Filter Search */}
            <div className="w-full lg:w-80">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by name or division..."
                  className="w-full px-4 py-3 rounded-xl bg-void/80 border border-sand/20 text-sand placeholder:text-sand/40 font-mono text-xs tracking-wider focus:outline-none focus:border-signal focus:shadow-[0_0_20px_rgba(228,9,8,0.35)] transition-all"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sand/40 font-mono text-xs">
                  ⌘K
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Two-Column Master-Detail Layout ────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── LEFT COLUMN: Interactive Directory Index ──────── */}
          <aside className="lg:col-span-4 xl:col-span-4">
            <div className="sticky top-[calc(var(--nav-h)+1.5rem)] rounded-2xl border border-sand/15 bg-void/90 p-5 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.4)] space-y-2">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-sand/10">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-signal font-bold">
                  DIRECTIVE INDEX
                </span>
                <span className="font-mono text-[10px] text-sand/50">
                  {filteredSections.length} ROLES
                </span>
              </div>

              {filteredSections.map((sec, idx) => {
                const isActive = effectiveSection.key === sec.key;
                return (
                  <button
                    key={sec.key}
                    type="button"
                    onClick={() => setActiveKey(sec.key)}
                    className={cn(
                      "group w-full flex items-center justify-between p-3.5 rounded-xl text-left transition-all duration-300 border cursor-pointer",
                      isActive
                        ? "bg-gradient-to-r from-signal/25 via-signal/15 to-transparent border-signal text-sand shadow-[0_0_20px_rgba(228,9,8,0.25)] translate-x-1"
                        : "border-transparent bg-sand/[0.02] text-sand/65 hover:bg-sand/[0.06] hover:text-sand hover:border-sand/20"
                    )}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={cn(
                          "flex items-center justify-center w-7 h-7 rounded-lg font-mono text-xs font-bold transition-colors",
                          isActive
                            ? "bg-signal text-white shadow-[0_0_10px_rgba(228,9,8,0.6)]"
                            : "bg-sand/10 text-sand/60 group-hover:bg-sand/20 group-hover:text-sand"
                        )}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <div className="font-bold text-sm tracking-wide text-sand group-hover:text-white transition-colors">
                          {sec.title}
                        </div>
                        <div className="font-mono text-[10px] tracking-wider text-sand/45">
                          {sec.members.length} {sec.members.length === 1 ? "MEMBER" : "MEMBERS"}
                        </div>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "font-mono text-xs font-bold transition-transform duration-300",
                        isActive
                          ? "text-signal translate-x-0.5"
                          : "text-sand/30 group-hover:text-sand/70"
                      )}
                    >
                      ›
                    </div>
                  </button>
                );
              })}

              <div className="pt-4 mt-3 border-t border-sand/10 flex items-center justify-between font-mono text-[10px] tracking-wider text-sand/40">
                <span>KERNEL 1.0 CORE</span>
                <span>JU IT BATCH 2026-29</span>
              </div>
            </div>
          </aside>

          {/* ── RIGHT COLUMN: Directive Showcase Stage ───────── */}
          <main className="lg:col-span-8 xl:col-span-8 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={effectiveSection.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="rounded-3xl border border-sand/20 bg-void/90 p-6 sm:p-10 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden"
              >
                {/* Accent line & watermark */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-signal to-transparent" />
                <span className="pointer-events-none absolute -bottom-10 -right-6 font-mono text-[10rem] font-black text-sand/[0.015] select-none uppercase">
                  {effectiveSection.key}
                </span>

                {/* Directive Header */}
                <div className="mb-8 relative z-10 border-b border-sand/10 pb-6">
                  <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-signal font-bold uppercase mb-2">
                    <span>
                      {String(
                        SECTIONS.findIndex((s) => s.key === effectiveSection.key) + 1
                      ).padStart(2, "0")}{" "}
                      /// ACTIVE DIRECTIVE
                    </span>
                  </div>
                  <h2 className="display text-[clamp(2rem,5vw,3.8rem)] text-sand leading-none tracking-tight">
                    {effectiveSection.title}
                  </h2>
                  <div className="mt-2 font-mono text-xs tracking-wider text-signal/90 uppercase font-semibold">
                    {effectiveSection.tagline}
                  </div>
                  <p className="mt-3 max-w-2xl text-sm sm:text-base text-sand/70 leading-relaxed font-normal">
                    {effectiveSection.description}
                  </p>
                </div>

                {/* Directive Members Cards */}
                <div
                  className={cn(
                    "grid gap-6 relative z-10",
                    effectiveSection.members.length === 1
                      ? "grid-cols-1 max-w-md mx-auto sm:mx-0"
                      : effectiveSection.members.length === 2
                      ? "grid-cols-1 sm:grid-cols-2"
                      : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                  )}
                >
                  {effectiveSection.members.map((member, idx) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08, duration: 0.35 }}
                      className="group relative flex flex-col justify-between rounded-2xl border border-sand/15 bg-void/80 p-4 transition-all duration-300 hover:border-signal/80 hover:shadow-[0_0_35px_rgba(228,9,8,0.25)] hover:-translate-y-1"
                    >
                      {/* Top Cyber Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-[10px] font-bold tracking-widest text-signal uppercase">
                          {member.role}
                        </span>
                        <span className="font-mono text-[10px] text-sand/40">
                          #{String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Photo Area with Bespoke Frame */}
                      <div className="relative aspect-square w-full rounded-xl overflow-hidden border-2 border-sand/20 bg-void/90 group-hover:border-signal transition-colors duration-300">
                        <Image
                          src={member.imagePath}
                          alt={`${member.name} - ${member.role}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          priority={idx < 3}
                        />

                        {/* Subtle bottom vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-transparent to-transparent opacity-60" />

                        {/* Status Tag */}
                        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-full border border-sand/20 bg-void/85 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-sand backdrop-blur-md">
                          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                          <span>CORE 1.0</span>
                        </div>
                      </div>

                      {/* Member Info Block */}
                      <div className="mt-4 pt-3 border-t border-sand/10 flex items-end justify-between gap-2">
                        <div>
                          <h3 className="text-lg sm:text-xl font-black text-sand uppercase leading-tight group-hover:text-signal transition-colors duration-300">
                            {member.name}
                          </h3>
                          <div className="text-xs text-sand/55 font-mono mt-0.5">
                            Jadavpur University
                          </div>
                        </div>

                        <span
                          className={cn(
                            "shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase",
                            getYearBadgeStyle(member.year)
                          )}
                        >
                          {member.year}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
