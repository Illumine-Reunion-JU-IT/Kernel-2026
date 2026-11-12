import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type TagVariant = "default" | "purple" | "beige" | "outline";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
}

const variants: Record<TagVariant, string> = {
  default: "border-[#B6B39F]/30 bg-[#183F30] text-[#EEE5D0]",
  purple: "border-[#9A4DFF]/40 bg-[#9A4DFF]/15 text-[#D9B9FF]",
  beige: "border-[#E9DFC5]/40 bg-[#E9DFC5] text-[#0B241A]",
  outline: "border-[#B6B39F]/50 bg-transparent text-[#B6B39F]"
};

export function Tag({
  variant = "default",
  className,
  children,
  ...props
}: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
