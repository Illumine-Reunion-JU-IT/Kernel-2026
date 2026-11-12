export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Speakers", href: "/speakers" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Core Committee", href: "/core-committee" },
  { label: "Contact", href: "/contact" }
];
