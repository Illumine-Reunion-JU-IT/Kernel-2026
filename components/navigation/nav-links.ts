export interface NavLink {
  label: string;
  href: string;
}

/** Every public KERNEL page. No login, cart, account or merch routes belong here. */
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Speakers", href: "/speakers" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Core Committee", href: "/core-committee" },
  { label: "Contact", href: "/contact" }
];

export const legalLinks: NavLink[] = [{ label: "Privacy Policy", href: "/privacy" }];
