import type { Metadata } from "next";
import { notFound } from "next/navigation";
import eventsJson from "@/data/events.json";
import { EventOrbitalStage, type KernelEvent } from "@/components/event-orbital-stage";

const events = eventsJson as KernelEvent[];

/** Extract coordinator names cleanly from organiserNote when present */
function extractCoordinators(note?: string): string[] {
  if (!note) return [];
  const match = note.match(/Contacts:\s*([^.]+)/i);
  if (!match) return [];
  return match[1]
    .split(",")
    .map((entry) => entry.replace(/\d+/g, "").trim())
    .filter(Boolean);
}

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return { title: "Event Not Found | KERNEL" };

  return {
    title: `${event.title} | KERNEL '26`,
    description: event.summary,
  };
}

export default async function EventSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const idx = events.findIndex((e) => e.slug === slug);
  if (idx === -1) notFound();

  const event = events[idx];
  const prevEvent = idx > 0 ? events[idx - 1] : null;
  const nextEvent = idx < events.length - 1 ? events[idx + 1] : null;
  const indexNumber = String(idx + 1).padStart(2, "0");
  const coordinators = extractCoordinators(event.organiserNote);

  return (
    <EventOrbitalStage
      event={event}
      indexNumber={indexNumber}
      prevEvent={prevEvent ? { slug: prevEvent.slug, title: prevEvent.title } : null}
      nextEvent={nextEvent ? { slug: nextEvent.slug, title: nextEvent.title } : null}
      coordinators={coordinators}
    />
  );
}
