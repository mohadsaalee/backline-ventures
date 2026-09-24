"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Reveal from "@/components/Reveal";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

type Capability = {
  id: string;
  title: string;
  description: string;
  steps: string[];
};

const capabilities: Capability[] = [
  {
    id: "research-strategy",
    title: "Research & Strategy",
    description:
      "We identify market opportunities, understand the customer, assess the competitive landscape and define the business opportunity worth pursuing.",
    steps: ["Market", "Customer", "Opportunity", "Thesis"],
  },
  {
    id: "brand-product",
    title: "Brand & Product",
    description:
      "We shape the proposition, brand, product and customer experience required to bring the opportunity to market.",
    steps: ["Idea", "Proposition", "Product", "Market"],
  },
  {
    id: "technology-systems",
    title: "Technology & Systems",
    description:
      "We build the digital infrastructure, technology, CRM, analytics and automation needed to support the business.",
    steps: ["CRM", "Analytics", "Automation", "Systems"],
  },
  {
    id: "marketing-acquisition",
    title: "Marketing & Customer Acquisition",
    description:
      "We create the marketing engine required to reach the right customers, generate demand and build sustainable acquisition channels.",
    steps: ["Audience", "Demand", "Acquisition", "Customer"],
  },
  {
    id: "sales-operations",
    title: "Sales & Operations",
    description:
      "We build sales processes, teams, SOPs and operating systems that turn a new opportunity into a functioning business.",
    steps: ["Team", "Process", "System", "Operate"],
  },
  {
    id: "growth-expansion",
    title: "Growth & Expansion",
    description:
      "We take what works into new customers, channels, markets, products and revenue opportunities.",
    steps: ["Business", "Channels", "Markets", "Growth"],
  },
];

/* ------------------------------------------------------------------ */
/* Left dynamic visual panel                                           */
/* ------------------------------------------------------------------ */

function CapabilityVisual({ capability }: { capability: Capability }) {
  return (
    <div className="relative flex h-full min-h-[320px] w-full flex-col items-center justify-center overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-10 md:p-12">
      {/* subtle grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={capability.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col items-start gap-0"
        >
          {capability.steps.map((step, i) => (
            <div key={step} className="flex flex-col items-start">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.08 + i * 0.09 }}
                className="flex items-center gap-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-[0.65rem] font-semibold text-white/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-2xl md:text-3xl uppercase tracking-[-0.01em] text-white">
                  {step}
                </span>
              </motion.div>
              {i < capability.steps.length - 1 && (
                <motion.span
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.35, delay: 0.14 + i * 0.09 }}
                  className="my-2 ml-[1.125rem] h-6 w-px origin-top bg-white/20"
                />
              )}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Accordion item                                                      */
/* ------------------------------------------------------------------ */

function AccordionItem({
  capability,
  isActive,
  onSelect,
}: {
  capability: Capability;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <div className="border-b border-white/15">
      <button
        type="button"
        onClick={onSelect}
        aria-expanded={isActive}
        aria-controls={`capability-panel-${capability.id}`}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span
          className={`font-display text-xl md:text-2xl tracking-[-0.01em] transition-colors duration-300 normal-case ${
            isActive ? "text-white" : "text-white/50 hover:text-white/80"
          }`}
        >
          {capability.title}
        </span>
        <span
          aria-hidden
          className="relative flex h-6 w-6 shrink-0 items-center justify-center text-white/70"
        >
          <span className="absolute h-px w-3.5 bg-current" />
          <motion.span
            animate={{ rotate: isActive ? 0 : 90, opacity: isActive ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="absolute h-px w-3.5 bg-current"
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            id={`capability-panel-${capability.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 max-w-lg text-sm md:text-[0.95rem] leading-relaxed text-white/60">
              {capability.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                              */
/* ------------------------------------------------------------------ */

export default function ExecutionCapabilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = capabilities[activeIndex];

  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="container-px">
        <Reveal>
          <span className="text-xs font-mono tracking-wide text-white/50">
            execution
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-[2rem] leading-[1.1] sm:text-[2.6rem] md:text-[3.2rem] tracking-[-0.01em] mt-4 max-w-4xl text-white normal-case">
            We don&apos;t just identify opportunities. We execute them.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-white/60">
            From strategy and product to people, systems, sales and growth,
            we bring the capabilities required to turn opportunity into an
            operating business.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2 md:gap-10">
          <Reveal delay={0.2} className="order-2 md:order-1">
            <CapabilityVisual capability={active} />
          </Reveal>

          <Reveal delay={0.24} className="order-1 md:order-2">
            <div className="border-t border-white/15">
              {capabilities.map((c, i) => (
                <AccordionItem
                  key={c.id}
                  capability={c}
                  isActive={i === activeIndex}
                  onSelect={() => setActiveIndex(i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}