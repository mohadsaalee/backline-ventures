import Link from "next/link";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section className="container-px py-14 md:py-20 text-center">
      <Reveal>
        <p className="eyebrow">The Next Chapter</p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-display text-[2.4rem] sm:text-[3.2rem] md:text-[4.2rem] leading-[1.05] tracking-[-0.02em] mt-6 max-w-3xl mx-auto">
          What could your business build next?
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-7 text-ink-soft max-w-md mx-auto text-[1.05rem] leading-relaxed">
          Tell us what your business already has. We&apos;ll explore what it
          could become.
        </p>
      </Reveal>
      <Reveal delay={0.3}>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-accent text-white px-7 py-3.5 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Start a conversation
          </Link>
          <Link href="/how-we-build" className="underline-link text-sm font-medium">
            Explore how we build
          </Link>
        </div>
      </Reveal>
    </section>
  );
}