import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-px pt-48 pb-36 md:pt-60 md:pb-48 text-center">
      <p className="eyebrow">404</p>
      <h1 className="font-display text-[2.6rem] sm:text-[3.6rem] md:text-[4.6rem] leading-[1.05] tracking-[-0.02em] mt-6">
        This page hasn&apos;t
        <br />
        <span className="text-accent">been built yet.</span>
      </h1>
      <p className="mt-8 text-ink-soft max-w-sm mx-auto">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get
        you back to something real.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-accent text-white px-7 py-3.5 text-sm font-semibold hover:opacity-90 transition-opacity mt-10"
      >
        Back to home
      </Link>
    </section>
  );
}
