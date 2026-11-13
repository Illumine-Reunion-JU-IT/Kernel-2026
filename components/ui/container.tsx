import { cn } from "@/lib/utils";

/** The one content-width wrapper: same gutters and max width on every page. */
export function Container({ children, className, as: Tag = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "section" | "header" | "footer" | "nav" }) {
  return <Tag className={cn("container", className)}>{children}</Tag>;
}
