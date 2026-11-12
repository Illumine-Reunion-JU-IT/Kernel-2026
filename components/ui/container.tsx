import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ContainerSize = "default" | "wide" | "narrow" | "full";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
}

const sizes: Record<ContainerSize, string> = {
  default: "max-w-[1160px]",
  wide: "max-w-[1360px]",
  narrow: "max-w-[760px]",
  full: "max-w-none"
};

export function Container({
  size = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-10",
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
