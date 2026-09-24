import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import PartnershipCard from "@/components/PartnershipCard";
import CTA from "@/components/CTA";
import { partnerships } from "@/lib/data/partnerships";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Three ways BACKLINE VENTURES partners with businesses and founders — venture partnership, business management and venture incubation.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="container-px pt-28 pb-16 md:pt-36 md:pb-20">
        {/* <Reveal>
          <p className="eyebrow">Services</p>
        </Reveal> */}
        <Reveal delay={0.1}>
          <h1 className="font-display text-[2.4rem] sm:text-[3.4rem] md:text-[4.6rem] leading-[1.05] tracking-[-0.02em] mt-6 max-w-3xl">
            Three ways we
            <br />
            <span className="text-accent">partner with a business.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-xl text-ink-soft leading-relaxed">
            Depending on where your business stands — a strong foundation
            looking for its next venture, an existing operation that needs
            professional management, or a promising idea still finding its
            shape — BACKLINE VENTURES works through one of three models.
          </p>
        </Reveal>
      </section>

      <section className="container-px py-10 md:py-14">
        <div className="grid md:grid-cols-3 gap-6 md:gap-7">
          {partnerships.map((p, i) => (
            <PartnershipCard partnership={p} index={i} key={p.slug} />
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}