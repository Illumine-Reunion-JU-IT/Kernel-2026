import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  /** Short running label shown in a red tab, e.g. "About". Omit when the heading needs no label. */
  kicker?: string;
  /** Sequence number: only use where the sections truly are ordered. */
  index?: number;
  intro?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function SectionHeading({ title, kicker, index, intro, as: Tag = "h2", className }: SectionHeadingProps) {
  return (
    <header className={cn("max-w-4xl", className)}>
      {(kicker || index !== undefined) && (
        <p className="mb-5 flex items-center gap-3 font-mono text-xs font-bold text-sand">
          {index !== undefined && <span className="condensed text-2xl text-signal">{String(index).padStart(2, "0")}</span>}
          {kicker && <span className="bg-signal px-2 py-1 text-void">{kicker}</span>}
        </p>
      )}
      <Tag className="display text-[clamp(2.4rem,7vw,6rem)]">{title}</Tag>
      {intro && <p className="mt-6 max-w-xl text-base text-sand-dim md:text-lg">{intro}</p>}
    </header>
  );
}
