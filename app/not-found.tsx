import { Button } from "@/components/ui/button";
import { KernelLogo } from "@/components/brand/logos";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <span aria-hidden className="absolute inset-y-0 left-1/2 w-[18vw] min-w-24 -translate-x-1/2 bg-signal" />
      <div className="relative mix-blend-difference">
        <KernelLogo className="mx-auto mb-4 h-24" />
        <p className="display text-[clamp(7rem,30vw,22rem)] text-sand">404</p>
        <h1 className="display mt-2 text-[clamp(1.4rem,4vw,2.6rem)] text-sand">Kernel panic: page not found</h1>
      </div>
      <div className="relative mt-10">
        <Button href="/">Back to home</Button>
      </div>
    </main>
  );
}
