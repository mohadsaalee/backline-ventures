import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import PartnershipCard from "@/components/PartnershipCard";
import Process from "@/components/Process";
import OpportunityMap from "@/components/OpportunityMap";
import VentureGrid from "@/components/VentureGrid";
import CapabilityGrid from "@/components/CapabilityGrid";
import PartnershipModels from "@/components/PartnershipModels";
import InsightCard from "@/components/InsightCard";
import CTA from "@/components/CTA";
import AboutIntro from "@/components/AboutIntro";
import WhyBacklineSection from "@/components/sections/WhyBacklineSection";
import ExecutionCapabilities from "@/components/sections/ExecutionCapabilities";
import { partnerships, processSteps, principles, partnershipModels } from "@/lib/data/partnerships";
import { buildOutcomes, capabilities } from "@/lib/data/capabilities";
import { ventures } from "@/lib/data/ventures";
import Collaborators from "@/components/Collaborators";
import { insights } from "@/lib/data/insights";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <Collaborators />

      {/* About */}
      <AboutIntro />

      {/* Three Core Partnerships */}
      <section id="pillars" className="container-px py-16 md:py-20">
        <SectionHeading
          eyebrow="What We Do"
          title="Three ways we partner."
        />
        <div className="grid md:grid-cols-3 gap-6 md:gap-7 mt-14">
          {partnerships.map((p, i) => (
            <PartnershipCard partnership={p} index={i} key={p.slug} />
          ))}
        </div>
      </section>

      {/* What We Build */}
      {/* <section className="container-px py-24 md:py-32">
        <SectionHeading
          eyebrow="From Opportunity To Venture"
          title="What we build."
          description="These are outcomes, not isolated agency services — the tangible results of a partnership built around an existing business."
        />
        <div className="mt-14 flex flex-wrap gap-3">
          {buildOutcomes.map((item, i) => (
            <Reveal key={item} delay={i * 0.04}>
              <span className="inline-block rounded-full border border-line px-5 py-2.5 text-sm text-ink-soft hover:border-ink hover:text-ink transition-colors">
                {item}
              </span>
            </Reveal>
          ))}
        </div>
      </section> */}

      {/* How We Build (condensed) */}
      <section className="container-px py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            eyebrow="How We Build"
            title={"From opportunity to\noperating business."}
          />
          <Reveal delay={0.2}>
            <Link
              href="/how-we-build"
              className="underline-link text-sm font-medium whitespace-nowrap"
            >
              See the full process
            </Link>
          </Reveal>
        </div>
        <Process steps={processSteps} />
      </section>

      {/* Existing Strength -> New Opportunity map */}
      {/* <section className="container-px py-24 md:py-32">
        <SectionHeading
          eyebrow="The Model"
          title="Existing strength becomes new opportunity."
          description="A simple relationship: what your business already has, mapped to what it could become."
        />
        <OpportunityMap />
      </section> */}

      {/* Ventures */}
      {/* <section className="container-px py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            eyebrow="Ventures"
            title="Businesses, ventures and opportunities built from existing strength."
          />
          <Reveal delay={0.2}>
            <Link href="/ventures" className="underline-link text-sm font-medium whitespace-nowrap">
              View all ventures
            </Link>
          </Reveal>
        </div>
        <div className="mt-14">
          <VentureGrid ventures={ventures.slice(0, 4)} />
        </div>
      </section> */}

      {/* Why BACKLINE */}
      {/* <section className="container-px py-24 md:py-32">
        <SectionHeading eyebrow="Why BACKLINE" title="Why BACKLINE." />
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-12 mt-14">
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
      </section> */}

      {/* Partnership Models */}
      {/* <section className="container-px py-16 md:py-20">
        <SectionHeading
          eyebrow="Partnership Models"
          title="Built around partnership."
        />
        <PartnershipModels models={partnershipModels} />
      </section> */}

      {/* Capabilities */}
      <section className="container-px py-24 md:py-32">
        <SectionHeading
          eyebrow="Capabilities"
          title="Everything required to build."
        />
        <CapabilityGrid items={capabilities} />
      </section>

      {/* Execution Capabilities */}
      <ExecutionCapabilities />

      {/* Why Backline */}
      <WhyBacklineSection />

      {/* Positioning statement replacing testimonials */}
      {/* <section className="container-px py-24 md:py-32">
        <Reveal className="max-w-3xl mx-auto text-center">
          <p className="font-display text-2xl sm:text-3xl md:text-4xl leading-snug">
            Built for business owners asking a bigger question:
            <br />
            <span className="text-accent">
              What is the next growth opportunity my business isn&apos;t
              capturing?
            </span>
          </p>
        </Reveal>
      </section> */}

      {/* Insights */}
      {/* <section className="container-px py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading eyebrow="Insights" title="Insights." />
          <Reveal delay={0.2}>
            <Link href="/insights" className="underline-link text-sm font-medium whitespace-nowrap">
              All insights
            </Link>
          </Reveal>
        </div>
        <div className="mt-10">
          {insights.slice(0, 4).map((insight, i) => (
            <InsightCard insight={insight} index={i} key={insight.slug} />
          ))}
        </div>
      </section> */}

      <CTA />
    </>
  );
}