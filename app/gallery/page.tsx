import type { Metadata } from "next";
import { ClubGallery } from "@/components/gallery/club-gallery";

export const metadata: Metadata = {
  title: "Club Gallery",
  description: "A curated look back at the events and campus moments organised by JUGS, CCJUSL, and ACM.",
};

export default function GalleryPage() {
  return <main><ClubGallery /></main>;
}
