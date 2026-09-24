import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CTA from "@/components/CTA";
import { getVenture, ventures } from "@/lib/data/ventures";

export function generateStaticParams() {
  return ventures.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const venture = getVenture(slug);
  if (!venture) return {};
  return {
    title: venture.title,
    description: venture.summary,
  };
}

const rows: { key: keyof (typeof ventures)[number]["detail"]; label: string }[] = [
  { key: "partner", label: "Partner" },
  { key: "startingPoint", label: "Starting Point" },
  { key: "opportunity", label: "Opportunity" },
  { key: "thesis", label: "Thesis" },
  { key: "venture", label: "Venture" },
  { key: "build", label: "Build" },
  { key: "pilot", label: "Pilot" },
  { key: "results", label: "Results" },
  { key: "growth", label: "Growth" },
  { key: "partnership", label: "Partnership" },
];

export default async function VentureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const venture = getVenture(slug);
  if (!venture) notFound();

  return (
    <>
      <section className="container-px pt-28 pb-16 md:pt-36 md:pb-20">
        <Reveal delay={0.08}>
          <p className="eyebrow mt-8">{venture.category} · Venture Scenario</p>
        </Reveal>
        <Reveal delay={0.15}>
          <h1 className="font-display text-[2rem] sm:text-[2.8rem] md:text-[3.6rem] leading-[1.08] tracking-[-0.01em] mt-5 max-w-3xl">
            {venture.title}
          </h1>
        </Reveal>
        <Reveal delay={0.22}>
          <p className="mt-6 max-w-xl text-ink-soft leading-relaxed">
            {venture.summary}
          </p>
        </Reveal>
      </section>

      <section className="container-px pb-16 md:pb-20">
        <Reveal>
          <div className="aspect-[16/8] rounded-2xl bg-bg-warm noise flex items-center justify-center">
            <div className="text-center px-6">
              <p className="font-display text-3xl md:text-4xl text-ink-soft">
                {venture.from}
              </p>
              <div className="my-4 flex justify-center">
                <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                  <path d="M1 9H17M17 9L11 3M17 9L11 15" stroke="currentColor" strokeWidth="1.2" className="text-ink-faint" />
                </svg>
              </div>
              <p className="font-display text-3xl md:text-4xl">
                {venture.to}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="container-px py-10 md:py-14">
        {rows.map((row, i) => (
          <Reveal key={row.key} delay={i * 0.04}>
            <div className="grid md:grid-cols-[10rem_1fr] gap-3 md:gap-10 py-8 hairline">
              <span className="eyebrow pt-1">{row.label}</span>
              <p className="text-ink-soft leading-relaxed max-w-2xl">
                {venture.detail[row.key]}
              </p>
            </div>
          </Reveal>
        ))}
        <div className="hairline" />
      </section>

      <CTA />
    </>
  );
}
