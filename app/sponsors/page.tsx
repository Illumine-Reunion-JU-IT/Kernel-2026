import Link from "next/link";

export default function Page() {
  return (
    <main className="container flex min-h-screen flex-col items-start justify-center">
      <p className="font-mono text-sm tracking-widest text-purple-400">
        KERNEL 1.0
      </p>
      <h1 className="mt-5 text-5xl font-bold">Sponsors</h1>
      <p className="mt-4 max-w-xl text-gray-400">
        This section is being prepared by the organising team.
        Official information will be published here.
      </p>
      <Link href="/" className="mt-8 text-purple-400 hover:underline">
        ← Back to home
      </Link>
    </main>
  );
}
