"use client"

import Image from "next/image"
import { coreCommittee } from "@/lib/content"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

// Order of sections as requested
const SECTIONS = [
  { title: "Secretary", filter: (m:any) => m.role.toLowerCase().includes("secretary") },
  { title: "Treasury", filter: (m:any) => m.role.toLowerCase().includes("treasurer") },
  { title: "Tech Lead", filter: (m:any) => m.role.toLowerCase().includes("tech lead") },
  { title: "Event Coordinators", filter: (m:any) => m.role.toLowerCase().includes("event coordinator") },
  { title: "Sponsorship Team", filter: (m:any) => m.role.toLowerCase().includes("sponsorship") },
  { title: "PR Team", filter: (m:any) => m.role.toLowerCase().includes("pr") },
]

export function CommitteeEnhanced() {
  const [active, setActive] = useState<string | null>(null)

  // Fade‑in animation for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i:number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }),
  }

  return (
    <div className="relative min-h-screen bg-void pt-24 pb-12 text-sand overflow-hidden">
      {/* Subtle animated background */}
      <div className="pointer-events-none absolute -top-48 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(228,9,8,0.15),transparent_70%)] blur-[120px]" />

      <div className="container mx-auto space-y-12 relative z-10">
        {SECTIONS.map((sec, secIdx) => {
          const members = coreCommittee.filter(sec.filter)
          if (!members.length) return null
          return (
            <motion.section
              key={sec.title}
              custom={secIdx}
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
            >
              <h2 className="text-2xl font-black uppercase tracking-tight text-signal mb-6 drop-shadow-[0_2px_6px_rgba(228,9,8,0.4)]">
                {sec.title}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {members.map((member:any, idx:number) => (
                  <div
                    key={member.id}
                    className="group flex items-start gap-6 cursor-pointer"
                    onClick={() => setActive(member.id)}
                  >
                    {/* Image on the left with custom SVG mask */}
                    <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden border border-sand/20 bg-void group-hover:border-signal/60 transition-colors">
                      <Image
                        src={member.imagePath}
                        alt={member.imageAlt}
                        fill
                        className="object-cover mask-[url('/images/borders/custom-frame.svg')]"
                      />
                    </div>
                    {/* Text block on the right */}
                    <div className="flex flex-col justify-center">
                      <p className="text-lg font-medium text-sand group-hover:text-signal transition-colors">
                        {member.name}
                      </p>
                      <p className="text-sm text-sand/70 group-hover:text-signal/80 transition-colors">
                        {member.role.replace(/\(UG\d\)/, "").trim()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )
        })}
      </div>

      {/* Modal for poster view */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="relative max-w-3xl max-h-[90vh]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={`/images/core-committee/${active}-poster.png`}
                alt={`Poster of ${active}`}
                width={800}
                height={600}
                className="rounded-lg object-contain"
              />
              <button
                className="absolute top-2 right-2 text-white text-2xl"
                onClick={() => setActive(null)}
              >✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
