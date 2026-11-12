import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps
  extends HTMLAttributes<HTMLDivElement> {
  title: string;
  kicker?: string;
  index?: string | number;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  kicker,
  index,
  description,
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
      {...props}
    >
      {(index !== undefined || kicker) && (
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-[#B77CFF]">
          {index !== undefined && (
            <span aria-label={`Section ${index}`}>
              {String(index).padStart(2, "0")}
            </span>
          )}

          {index !== undefined && kicker && (
            <span aria-hidden="true" className="text-[#B6B39F]">
              /
            </span>
          )}

          {kicker && <span>{kicker}</span>}
        </div>
      )}

      <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#EEE5D0] sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="max-w-2xl text-sm leading-7 text-[#B6B39F] sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
