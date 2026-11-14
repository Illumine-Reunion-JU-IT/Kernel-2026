import type { Metadata } from "next";
import { events, publicOnly } from "@/lib/content";
import { AccordionStage } from "@/components/events/accordion-stage";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Explore all KERNEL 1.0 events: Mogoj Dholai (CP), Hojohborolo (software challenge), Data Nilaam (ML), Speaker Session, and Hack Sangram (hackathon).",
};

export default function EventsPage() {
  const publicEvents = publicOnly(events);

  return (
    <main id="events-main" className="bg-void pt-[var(--nav-h)]">
      <AccordionStage events={publicEvents} />
    </main>
  );
}
