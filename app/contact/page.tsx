import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with BACKLINE VENTURES about what your business could build next.",
};

export default function ContactPage() {
  return (
    <section className="container-px pt-40 pb-28 md:pt-52 md:pb-36">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24">
        <div>
          <Reveal>
            <p className="eyebrow">Contact</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-[2.2rem] sm:text-[2.8rem] md:text-[3.4rem] leading-[1.08] tracking-[-0.01em] mt-6">
              Let&apos;s build
              <br />
              <span className="text-accent">what&apos;s next.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-7 text-ink-soft leading-relaxed max-w-sm">
              Tell us about your business and the opportunity you&apos;re
              exploring. We&apos;ll follow up to start the conversation.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
