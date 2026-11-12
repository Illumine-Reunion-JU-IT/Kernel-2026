import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 border border-dashed border-[#B6B39F]/30 bg-[#123729] px-6 py-12 text-center sm:px-10",
        className
      )}
      {...props}
    >
      {icon && (
        <div
          aria-hidden="true"
          className="text-3xl text-[#B77CFF]"
        >
          {icon}
        </div>
      )}

      <h3 className="text-xl font-semibold text-[#EEE5D0]">
        {title}
      </h3>

      <p className="max-w-md text-sm leading-7 text-[#B6B39F]">
        {description}
      </p>

      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
