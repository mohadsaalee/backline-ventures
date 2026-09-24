import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import VentureGrid from "@/components/VentureGrid";
import CTA from "@/components/CTA";
import { ventures } from "@/lib/data/ventures";

export const metadata: Metadata = {
  title: "Ventures",
  description:
    "Businesses, ventures and opportunities built from existing strength — venture scenarios illustrating how BACKLINE VENTURES partners work.",
};

export default function VenturesPage() {
  return (
    <>
      <section className="container-px pt-28 pb-16 md:pt-36 md:pb-20">
        <Reveal>
          <p className="eyebrow">Ventures</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display text-[clamp(1.75rem,8.8vw,2.4rem)] sm:text-[3.4rem] md:text-[4.4rem] leading-[1.05] tracking-[-0.02em] mt-6 max-w-3xl">
            Businesses, ventures and
            <br />
            <span className="text-accent">
              opportunities built from existing strength.
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-xl text-ink-soft leading-relaxed text-sm">
            These are illustrative venture scenarios, clearly labeled, used
            to demonstrate how a BACKLINE partnership works in practice.
            Real case studies will appear here as ventures are built.
          </p>
        </Reveal>
      </section>

      <section className="container-px py-10 md:py-14">
        <VentureGrid ventures={ventures} />
      </section>

      <CTA />
    </>
  );
}