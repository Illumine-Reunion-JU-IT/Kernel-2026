import Image from "next/image";
import { cn } from "@/lib/utils";

/** Official KERNEL mark (transparent PNG, light lettering for dark backgrounds). */
export function KernelLogo({ className, priority }: { className?: string; priority?: boolean }) {
  return <Image src="/images/brand/kernel-logo.png" alt="KERNEL" width={622} height={522} priority={priority} className={cn("w-auto", className)} />;
}

/** Jadavpur University seal. It is a circular emblem, so it is masked to a circle. */
export function JuLogo({ className }: { className?: string }) {
  return <Image src="/images/brand/ju-logo.png" alt="Jadavpur University" width={200} height={200} className={cn("rounded-full", className)} />;
}
