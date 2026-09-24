import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CTA from "@/components/CTA";
import { getInsight, insights } from "@/lib/data/insights";

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};
  return {
    title: insight.title,
    description: insight.excerpt,
  };
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  return (
    <>
      <article className="container-px pt-40 pb-24 md:pt-52 md:pb-32">
        <Reveal>
          <Link href="/insights" className="underline-link text-sm text-ink-soft">
            ← All insights
          </Link>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="eyebrow mt-8">
            {insight.topic} · {insight.date}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h1 className="font-display text-[2rem] sm:text-[2.8rem] md:text-[3.6rem] leading-[1.1] tracking-[-0.01em] mt-5 max-w-3xl">
            {insight.title}
          </h1>
        </Reveal>

        <div className="max-w-2xl mt-14 space-y-6">
          {insight.body.map((para, i) => (
            <Reveal key={i} delay={0.1 + i * 0.06}>
              <p className="text-ink-soft leading-relaxed text-[1.05rem]">
                {para}
              </p>
            </Reveal>
          ))}
        </div>
      </article>

      <CTA />
    </>
  );
}
