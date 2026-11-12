export interface SocialLinks {
  instagram: string | null;
  linkedin: string | null;
  youtube: string | null;
  website: string | null;
}

export interface SiteContent {
  eventName: string;
  edition: string;
  department: string;
  university: string;
  eventDates: string;
  venue: string;
  contactEmail: string;
  registrationUrl: string | null;
  socialLinks: SocialLinks;
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
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
  title: string;
  imagePath: string;
  altText: string;
  caption: string;
  url: string | null;
  isPlaceholder: boolean;
  organiserNote: string;
}
