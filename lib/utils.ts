/** Join class names, skipping falsy values. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Organiser fields that still read "TBD: ..." are not public information yet. */
export function isConfirmed(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0 && !value.trim().toUpperCase().startsWith("TBD");
}

export function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
