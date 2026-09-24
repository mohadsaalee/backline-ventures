import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Process from "@/components/Process";
import CapabilityGrid from "@/components/CapabilityGrid";
import PartnershipModels from "@/components/PartnershipModels";
import CTA from "@/components/CTA";
import { processSteps, partnershipModels, principles, risks } from "@/lib/data/partnerships";
import { capabilities } from "@/lib/data/capabilities";

export const metadata: Metadata = {
  title: "How We Build",
  description:
    "From business audit to a scaled, operating venture — the eight-stage process, three partnership models and risk framework BACKLINE VENTURES uses to build new ventures from existing strength.",
};

export default function HowWeBuildPage() {
  return (
    <>
      <section className="container-px pt-28 pb-16 md:pt-36 md:pb-20">
        <Reveal>
          <p className="eyebrow">How We Build</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display text-[2.4rem] sm:text-[3.4rem] md:text-[4.6rem] leading-[1.05] tracking-[-0.02em] mt-6 max-w-3xl">
            From opportunity to
            <br />
            <span className="text-accent">operating business.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-xl text-ink-soft leading-relaxed">
            A disciplined, eight-stage process that takes an untapped
            opportunity from first audit through to a scaled, operating
            venture — without skipping the validation, or the agreement,
            that protects both sides along the way.
          </p>
        </Reveal>
      </section>

      <section className="container-px py-10 md:py-14">
        <Process steps={processSteps} />
      </section>

      {/* Partnership Models */}
      <section className="container-px py-24 md:py-32">
        <SectionHeading
          eyebrow="Partnership Models"
          title="Three ways we get paid."
          description="The exact structure depends on the opportunity — how much each side contributes, and how much risk each side is prepared to share."
        />
        <PartnershipModels models={partnershipModels} />
      </section>

      {/* Why BACKLINE / Principles */}
      <section className="container-px py-16 md:py-20">
        <Reveal>
          <p className="eyebrow mb-5">Why BACKLINE</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-12 mt-6">
          {principles.map((p, i) => (
            <Reveal key={p.number} delay={i * 0.08}>
              <div>
                <span className="eyebrow">{p.number}</span>
                <h3 className="font-display text-2xl mt-4">{p.title}</h3>
                <p className="mt-3 text-ink-soft text-sm leading-relaxed max-w-sm">
                  {p.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="container-px py-24 md:py-32">
        <SectionHeading
          eyebrow="Capabilities"
          title="Everything required to build."
          description="These are the capabilities BACKLINE brings to execute across all three partnership models — not a menu of standalone services."
        />
        <CapabilityGrid items={capabilities} />
      </section>

      {/* Risk framework */}
      <section className="container-px py-24 md:py-32">
        <SectionHeading
          eyebrow="Risk & Governance"
          title="What we plan for before we build."
          description="Every venture partnership carries risk. We'd rather name it and structure around it than pretend it isn't there."
        />
        <div className="mt-14 divide-y divide-line border-t border-b border-line">
          {risks.map((r, i) => (
            <Reveal key={r.risk} delay={i * 0.05}>
              <div className="grid md:grid-cols-[1fr_1fr] gap-3 md:gap-10 py-7">
                <p className="font-medium">{r.risk}</p>
                <p className="text-ink-soft leading-relaxed">{r.mitigation}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
