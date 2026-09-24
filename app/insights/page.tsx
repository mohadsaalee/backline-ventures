import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import InsightCard from "@/components/InsightCard";
import CTA from "@/components/CTA";
import { insights } from "@/lib/data/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Perspectives on venture building, business partnership and finding new growth inside established businesses.",
};

export default function InsightsPage() {
  return (
    <>
      <section className="container-px pt-28 pb-16 md:pt-36 md:pb-20">
        <Reveal>
          <p className="eyebrow">Insights</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display text-[2.4rem] sm:text-[3.4rem] md:text-[4.4rem] leading-[1.05] tracking-[-0.02em] mt-6 max-w-3xl">
            Perspectives on building
            <br />
            <span className="text-accent">what&apos;s next.</span>
          </h1>
        </Reveal>
      </section>

      <section className="container-px py-6 md:py-10">
        {insights.map((insight, i) => (
          <InsightCard insight={insight} index={i} key={insight.slug} />
        ))}
      </section>

      <CTA />
    </>
  );
}
