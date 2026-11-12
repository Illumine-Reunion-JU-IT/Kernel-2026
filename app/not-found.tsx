import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center text-center">
      <p className="font-mono text-sm tracking-widest text-purple-400">
        ERROR / 404
      </p>

      <h1 className="mt-6 text-7xl font-bold tracking-tight">
        PAGE NOT FOUND<span className="text-purple-400">.</span>
      </h1>

      <p className="mt-5 max-w-md text-gray-400">
        The page you are looking for does not exist or may have been moved.
      </p>

      <Link
        href="/"
        className="mt-8 bg-purple-400 px-6 py-3 font-mono text-sm font-semibold text-black transition hover:bg-amber-100"
      >
        BACK TO HOME →
      </Link>
    </main>
  );
}
