export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

/**
 * Authoritative public site navigation routes for KERNEL 1.0.
 * Reused across desktop navbar, mobile drawer, and site footer.
 */
export const NAV_LINKS: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Speakers", href: "/speakers" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Core Committee", href: "/core-committee" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Validated privacy policy route destination.
 */
export const PRIVACY_LINK: NavItem = {
  label: "Privacy Policy",
  href: "/privacy",
} as const;

/**
 * Official registration URL.
 * Set to null when unconfirmed. Per Issue #3 requirements, the Registration
 * CTA remains hidden until an authoritative registration URL is confirmed.
 */
export const REGISTRATION_URL: string | null = null;

/**
 * Official contact email.
 * Placeholder emails from prototypes are omitted until an authoritative
 * departmental or fest address is provided.
 */
export const CONTACT_EMAIL: string | null = null;

/**
 * Official social media destinations.
 * Omitted until authoritative accounts are confirmed in project documentation.
 */
export const SOCIAL_LINKS: readonly { name: string; href: string }[] = [];
