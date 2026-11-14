export interface SocialLinks {
  instagram: string | null;
  linkedin: string | null;
  youtube: string | null;
  website: string | null;
}

export interface SiteStat {
  value: string;
  label: string;
}

export interface SiteContent {
  eventName: string;
  tagline: string;
  heroImage: string;
  heroImageAlt: string;
  /** Path under /public (e.g. /videos/kernel-aftermovie.mp4) or an https URL. null = "coming soon" state. */
  videoUrl: string | null;
  /** Still frame shown before the video loads (path under /public). */
  videoPoster: string;
  stats: SiteStat[];
  edition: string;
  department: string;
  university: string;
  eventDates: string;
  venue: string;
  contactEmail: string;
  registrationUrl: string | null;
  socialLinks: SocialLinks;
}

export interface EventFact {
  label: string;
  value: string;
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  tagline: string;
  summary: string;
  facts: EventFact[];
  date: string;
  venue: string;
  imagePath: string;
  imageAlt: string;
  registrationUrl: string | null;
  isPlaceholder: boolean;
  organiserNote: string;
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  organisation: string;
  imagePath: string;
  imageAlt: string;
  url: string | null;
  isPlaceholder: boolean;
  organiserNote: string;
}

export interface Sponsor {
  id: string;
  name: string;
  category: string;
  logoPath: string;
  logoAlt: string;
  url: string | null;
  isPlaceholder: boolean;
  organiserNote: string;
}

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  imagePath: string;
  imageAlt: string;
  url: string | null;
  isPlaceholder: boolean;
  organiserNote: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isPlaceholder: boolean;
  organiserNote: string;
}

export interface GalleryItem {
  id: string;
  clubId: string;
  clubName: string;
  eventName: string;
  title: string;
  imagePath: string;
  altText: string;
  caption: string;
  url: string | null;
  isPlaceholder: boolean;
  organiserNote: string;
}
