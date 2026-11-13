import { cn } from "@/lib/utils";

export function EmptyState({ title, message, action, className }: { title: string; message: string; action?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative border border-dashed border-sand/30 p-8 md:p-12", className)}>
      <span aria-hidden className="absolute -top-px left-8 h-[3px] w-16 bg-signal" />
      <p className="display text-2xl md:text-4xl">{title}</p>
      <p className="mt-4 max-w-md text-sand-dim">{message}</p>
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}
