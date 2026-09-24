// app/about/page.tsx
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import CTA from "@/components/CTA";
import TeamGrid from "@/components/TeamGrid";
import StoryStats from "@/components/StoryStats";
import SelectionCriteria from "@/components/SelectionCriteria";
import { idealPartners, selectionCriteria } from "@/lib/data/partnerships";
import ourTeam from "@/public/images/our-team.jpg";
import ModelFormula from "@/components/ModelFormula";
import ValuesSection from "@/components/ValuesSection"; 

export const metadata: Metadata = {
  title: "About",
  description:
    "BACKLINE VENTURES is a strategic venture partner to established businesses — built around existing strength, new opportunity and shared growth.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="container-px pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <Reveal>
            <h1 className="font-display text-[2.8rem] sm:text-[4rem] md:text-[5.2rem] leading-[0.95] tracking-[-0.02em]">
              ABOUT
              <br />
              BACKLINE
            </h1>
          </Reveal>
          <Reveal delay={0.15} className="md:text-right">
            <p className="text-ink-soft text-lg max-w-xs md:ml-auto">
              They built the business. We build what&apos;s next.
            </p>
          </Reveal>
        </div>
      </section>
      {/* Full-width banner */}
      <section className="container-px pb-20 md:pb-28">
        <Reveal delay={0.1}>
          <div className="relative w-full aspect-[21/9] rounded-lg overflow-hidden bg-ink">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/backline-image-2.avif"
              alt="BACKLINE VENTURES"
              decoding="async"
              fetchPriority="high"
              className="h-full w-full object-cover grayscale contrast-125 brightness-[0.55]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
          </div>
        </Reveal>
      </section>

      {/* Our Story */}
      <section className="container-px py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-x-10 gap-y-8">
          <Reveal>
            <p className="eyebrow">Our Story</p>
          </Reveal>

          <div>
            <Reveal delay={0.08}>
              <h2 className="font-display text-[2rem] sm:text-[2.6rem] md:text-[3.2rem] leading-[1.1]">
                WE BELIEVE GROWTH ISN&apos;T ABOUT STARTING FROM SCRATCH —
                IT&apos;S ABOUT WHAT ALREADY EXISTS.
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-8 max-w-2xl text-lg text-ink-soft leading-relaxed">
                Most established businesses already have real value sitting
                inside them — manufacturing capability, products, capital,
                suppliers, distribution, industry knowledge and customers who
                trust the name. What they often lack isn&apos;t opportunity.
                It&apos;s a structured way to find it, and the execution
                capability to build it. BACKLINE VENTURES exists to close
                that gap — as a venture partner, a business partner, or a
                selective investor, depending on what the opportunity needs.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <p className="mt-6 max-w-2xl text-lg text-ink-soft leading-relaxed">
                We don&apos;t replace the existing business — we build
                around its strengths. We don&apos;t only give
                recommendations — we execute. And where the structure is
                appropriate, we don&apos;t only charge for services — we
                share the risk, and the upside.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="container-px py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-x-10 gap-y-8">
          <Reveal>
            <p className="eyebrow">Mission & Vision</p>
          </Reveal>
          <div>
            <Reveal delay={0.08}>
              <p className="font-display text-xl sm:text-2xl md:text-3xl leading-snug max-w-3xl">
                To transform existing business strengths and promising
                opportunities into scalable ventures through strategy,
                execution and shared growth.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-8 max-w-2xl text-lg text-ink-soft leading-relaxed">
                Our long-term vision is to become the strategic backline
                behind the next generation of businesses — the partner
                established businesses and ambitious founders approach when
                they ask: &quot;What should we build next?&quot;
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The formula */}
      <section className="container-px py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-x-10 gap-y-8">
          <Reveal>
            <p className="eyebrow">Our Model</p>
          </Reveal>
          <div>
            <Reveal delay={0.08}>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl leading-snug max-w-3xl">
                Existing strength, built into a new venture.
              </h2>
            </Reveal>
            <ModelFormula />
          </div>
        </div>
      </section>



      {/* Core Values */}
      <ValuesSection />

      {/* Stat row */}
      <section className="container-px pb-24 md:pb-32">
        <StoryStats
          stats={[
            { value: 3, label: "Partnership models" },
            { value: 8, label: "Stages, audit to scale" },
            { value: 12, label: "Capabilities we bring" },
            { value: 8, label: "Insight topics published" },
          ]}
        />
      </section>

      {/* Who We Want to Work With */}
      <section className="container-px py-16 md:py-20">
        <Reveal>
          <div className="rounded-3xl bg-ink text-bg p-8 sm:p-12 md:p-16">
            <p className="eyebrow text-bg/50">Who We Partner With</p>

            <h2 className="font-display text-[2.2rem] sm:text-[3rem] md:text-[3.6rem] leading-[1.05] mt-5 max-w-2xl">
              We work best with businesses ready to build.
            </h2>

            <p className="mt-6 max-w-2xl text-bg/60 leading-relaxed">
              From established manufacturers to early-stage founders, BACKLINE
              VENTURES partners with businesses that already have real
              strength — a product, a customer base, capital or
              infrastructure — and are ready to turn it into a new venture.
            </p>

            <div className="mt-12 flex flex-wrap gap-3">
              {idealPartners.map((item, i) => (
                <Reveal key={item} delay={0.06 + i * 0.03}>
                  <span className="inline-block rounded-full border border-bg/25 px-5 py-2.5 text-sm text-bg/90 hover:border-bg hover:bg-bg hover:text-ink transition-colors duration-300">
                    {item}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* How We Select a Partner */}
      <section className="container-px py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <Reveal>
              <p className="eyebrow">How We Select a Partner</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-[2rem] sm:text-[2.6rem] md:text-[3.2rem] leading-[1.1] mt-4">
                Before we build, we evaluate.
              </h2>
            </Reveal>
          </div>
        </div>
        <SelectionCriteria items={selectionCriteria} />
      </section>

      <TeamGrid />

      <CTA />
    </>
  );
}