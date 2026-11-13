import { cn } from "@/lib/utils";

type Tone = "red" | "sand" | "volt" | "forest";
const tones: Record<Tone, string> = {
  red: "bg-signal text-void",
  sand: "bg-sand text-void",
  volt: "bg-volt text-void",
  forest: "bg-forest-soft text-sand ring-1 ring-sand/20"
};

export function Tag({ children, tone = "forest", className }: { children: React.ReactNode; tone?: Tone; className?: string }) {
  return (
    <span className={cn("inline-block px-2.5 py-1 font-mono text-[11px] font-bold leading-none tracking-wider [clip-path:polygon(0_0,100%_0,100%_70%,calc(100%-6px)_100%,0_100%)]", tones[tone], className)}>
      {children}
    </span>
  );
}
