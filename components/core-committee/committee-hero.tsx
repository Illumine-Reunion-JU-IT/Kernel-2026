"use client";

import Image from "next/image";
import { coreCommittee } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Group members by role category in the exact order required
const ROLE_ORDER = [
  { title: "Secretary", filter: (m:any) => m.role.toLowerCase().includes("secretary") },
  { title: "Treasury", filter: (m:any) => m.role.toLowerCase().includes("treasurer") },
  { title: "Tech Lead", filter: (m:any) => m.role.toLowerCase().includes("tech lead") },
  { title: "Event Coordinators", filter: (m:any) => m.role.toLowerCase().includes("event coordinator") },
  { title: "Sponsorship Team", filter: (m:any) => m.role.toLowerCase().includes("sponsorship") },
  { title: "PR Team", filter: (m:any) => m.role.toLowerCase().includes("pr") },
];

export function CommitteeHero() {
  const [activeMember, setActiveMember] = useState<any>(null);

  return (
    <div className="relative min-h-screen bg-void pt-[calc(var(--nav-h)+2rem)] pb-20 text-sand overflow-x-hidden">
      {/* Background ambience */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(228,9,8,0.2),transparent_70%)] blur-[120px]"/>
      <div className="container mx-auto relative z-10 space-y-12">
        {ROLE_ORDER.map((section) => {
          const members = coreCommittee.filter(section.filter);
          if (members.length === 0) return null;
          return (
            <section key={section.title} className="space-y-4">
              <h2 className="text-3xl font-black uppercase tracking-tight text-signal drop-shadow-[0_2px_6px_rgba(228,9,8,0.4)]">
                {section.title}
              </h2>
              <div className="flex gap-4 overflow-x-auto py-2 pb-4 -mx-2 px-2 scrollbar-none">
                {members.map((member:any, idx:number) => (
                  <div
                    key={member.id}
                    className="flex-shrink-0 w-48 cursor-pointer group"
                    onClick={() => setActiveMember(member)}
                  >
                    <div className="relative aspect-square rounded-xl overflow-hidden border border-sand/20 bg-void group-hover:border-signal/60 transition-colors">
                      <Image
                        src={member.imagePath}
                        alt={member.imageAlt}
                        fill
                        className="object-cover object-center mask-[url('/images/borders/custom-frame.svg')]"
                        priority={idx < 4}
                      />
                    </div>
                    <p className="mt-2 text-center text-sm font-medium text-sand group-hover:text-signal transition-colors">
                      {member.name}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Simple modal for poster view */}
      {activeMember && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setActiveMember(null)}>
          <div className="relative max-w-3xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={`/images/core-committee/${activeMember.id}-poster.png`}
              alt={`Poster of ${activeMember.name}`}
              width={800}
              height={600}
              className="object-contain rounded-lg"
            />
            <button
              className="absolute top-2 right-2 text-white text-2xl" 
              onClick={() => setActiveMember(null)}
            >✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
