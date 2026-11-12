/**
 * Combines conditional Tailwind CSS class names.
 * Keeps shared styling logic in one place without extra dependencies.
 */
export type ClassValue = string | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
