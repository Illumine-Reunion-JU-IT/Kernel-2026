import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#0B241A] py-20">
      <Container className="flex flex-col items-center text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#B77CFF]">
          KERNEL 1.0 / ERROR 404
        </p>

        <h1 className="mt-6 text-6xl font-bold tracking-tight text-[#EEE5D0] sm:text-8xl">
          404<span className="text-[#B77CFF]">.</span>
        </h1>

        <h2 className="mt-4 text-xl font-semibold text-[#EEE5D0] sm:text-2xl">
          Page not found
        </h2>

        <p className="mt-4 max-w-md text-sm leading-7 text-[#B6B39F]">
          The page you are looking for does not exist, may have moved, or is
          temporarily unavailable.
        </p>

        <Link href="/" className={buttonVariants({ className: "mt-8" })}>
          Return to homepage <span aria-hidden="true">→</span>
        </Link>
      </Container>
    </main>
  );
}
