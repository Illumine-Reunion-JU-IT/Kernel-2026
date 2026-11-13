import { HeroSection } from "@/components/home/hero-section";
import { WhatIs } from "@/components/home/what-is";
import { VideoSection } from "@/components/home/video-section";
import { Marquee } from "@/components/home/marquee";
import { EventsTimeline } from "@/components/home/events-timeline";
import { SpeakersPreview } from "@/components/home/speakers-preview";
import { SponsorsPreview } from "@/components/home/sponsors-preview";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <WhatIs />
      <VideoSection />
      <Marquee items={["Compete", "Create", "Connect", "Build", "Ship", "Celebrate"]} />
      <EventsTimeline />
      <SpeakersPreview />
      <SponsorsPreview />
    </main>
  );
}
