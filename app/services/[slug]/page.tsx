import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Process from "@/components/Process";
import PartnershipModels from "@/components/PartnershipModels";
import ContributionChart from "@/components/ContributionChart";
import ServiceExamples from "@/components/ServiceExamples";
import CTA from "@/components/CTA";
import { services, getService } from "@/lib/data/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return { title: service.title, description: service.summary };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <section className="container-px pt-28 pb-16 md:pt-36 md:pb-20">
        <Reveal delay={0.15}>
          <h1 className="font-display text-[2.2rem] sm:text-[3.2rem] md:text-[4.2rem] leading-[1.05] tracking-[-0.02em] mt-5 max-w-3xl">
            {service.title}
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-5 text-lg text-ink-soft font-medium max-w-2xl">{service.headline}</p>
        </Reveal>
        <Reveal delay={0.28}>
          <p className="mt-6 max-w-xl text-ink-soft leading-relaxed">{service.summary}</p>
        </Reveal>
      </section>

      <section className="container-px pb-16 md:pb-20">
        <Reveal>
          <p className="eyebrow mb-5">Who This Is For</p>
        </Reveal>
        <div className="flex flex-wrap gap-3">
          {service.forWho.map((item, i) => (
            <Reveal key={item} delay={i * 0.04}>
              <span className="inline-block rounded-full border border-line px-5 py-2.5 text-sm text-ink-soft">
                {item}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-px py-16 md:py-20 border-t border-line">
        <SectionHeading eyebrow="The Equation" title="Existing strength + BACKLINE execution." />
        <ContributionChart left={service.left} right={service.right} />
      </section>

      <section className="container-px py-16 md:py-20">
        <SectionHeading eyebrow="Process" title="How it works, step by step." />
        <Process steps={service.process} />
      </section>

      {service.examples && (
        <section className="container-px py-16 md:py-20">
          <SectionHeading eyebrow="When It Makes Sense" title="Common venture partnership patterns." />
          <ServiceExamples examples={service.examples} />
        </section>
      )}

      {service.models && (
        <section className="container-px py-16 md:py-20">
          <SectionHeading
            eyebrow="Commercial Models"
            title="Five ways to structure the partnership."
            description="The exact structure is negotiated individually and documented legally, based on the contribution, risk and investment from each side."
          />
          <PartnershipModels models={service.models} />
        </section>
      )}

      <CTA />
    </>
  );
}