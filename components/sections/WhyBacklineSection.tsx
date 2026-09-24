"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const cards = [
  {
    number: "01",
    title: "One Execution Partner",
    description:
      "Strategy, brand, technology, marketing, sales and operations — under one team, not five different agencies.",
    span: "md:col-span-4",
  },
  {
    number: "02",
    title: "We Start With What You Already Have",
    description:
      "We don't start from a blank page. We build from the customers, products, capital and knowledge already inside your business — and turn that strength into a new venture.",
    span: "md:col-span-8",
  },
  {
    number: "03",
    title: "Build to Operate",
    description:
      "We don't disappear after launch. Every venture we build comes with the team, systems and management behind it to actually run.",
    span: "md:col-span-12",
  },
  {
    number: "04",
    title: "Discipline, Not Guesswork",
    description:
      "We validate before we invest, track real performance once a venture launches, and only scale what the numbers prove is working.",
    span: "md:col-span-8",
  },
  {
    number: "05",
    title: "Long-Term Partnership",
    description:
      "We stay involved beyond the build — through profit share, equity or ongoing operating partnership, not a single invoice.",
    span: "md:col-span-4",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Shared card shell                                                   */
/* ------------------------------------------------------------------ */

function CardShell({
  number,
  title,
  description,
  visual,
  className = "",
}: {
  number?: string;
  title: string;
  description: string;
  visual: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-line bg-card p-2 ${className}`}
    >
      {/* inner inset border for layered depth */}
      <div className="pointer-events-none absolute inset-2 rounded-[1.4rem] border border-white/60" />

      <div
        aria-hidden
        className="relative flex min-h-[180px] items-center justify-center rounded-[1.4rem] bg-bg/60 px-6 pt-10 pb-6"
      >
        {visual}
      </div>

      <div className="relative px-6 pb-7 pt-6 md:px-8 md:pb-9">
        {number && <span className="eyebrow">{number}</span>}
        <h3 className={`font-display text-xl md:text-2xl normal-case tracking-[-0.01em] ${number ? "mt-4" : ""}`}>
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft max-w-md">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Diagram: Card 01 — One Execution Partner (radial node graph)        */
/* ------------------------------------------------------------------ */

function ExecutionPartnerDiagram() {
  const disciplines = [
    { label: "Strategy", x: 40, y: 30 },
    { label: "Product", x: 130, y: 22 },
    { label: "Marketing", x: 20, y: 100 },
    { label: "Operations", x: 150, y: 105 },
  ];
  return (
    <svg viewBox="0 0 170 130" className="w-full max-w-[220px] text-ink-faint">
      {disciplines.map((d, i) => (
        <motion.line
          key={d.label}
          x1="85"
          y1="65"
          x2={d.x}
          y2={d.y}
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
        />
      ))}
      {disciplines.map((d, i) => (
        <motion.g
          key={`node-${d.label}`}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
        >
          <motion.circle
            cx={d.x}
            cy={d.y}
            r="14"
            fill="var(--bg)"
            stroke="var(--line)"
            animate={{ cy: [d.y, d.y - 4, d.y] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
          <text
            x={d.x}
            y={d.y + 24}
            textAnchor="middle"
            fontSize="7"
            fill="var(--ink-soft)"
            className="uppercase tracking-wide"
          >
            {d.label}
          </text>
        </motion.g>
      ))}
      <motion.circle
        cx="85"
        cy="65"
        r="22"
        fill="var(--ink)"
        initial={{ scale: 0.85, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      />
      <motion.circle
        cx="85"
        cy="65"
        r="22"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0, 0.35] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
      />
      <text
        x="85"
        y="68"
        textAnchor="middle"
        fontSize="7.5"
        fontWeight={700}
        fill="var(--bg)"
        className="uppercase"
      >
        Backline
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Diagram: Card 02 — Built Around Your Business (stacked flow)        */
/* ------------------------------------------------------------------ */

function BuiltAroundDiagram() {
  const steps = ["Existing Strength", "Opportunity", "New Growth"];
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      {steps.map((s, i) => (
        <motion.div
          key={s}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.12 }}
          className="flex items-center gap-3"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-bg text-[0.65rem] font-semibold text-ink-soft">
            {i + 1}
          </span>
          <span className="flex-1 rounded-full border border-line bg-bg px-4 py-2 text-xs md:text-sm font-medium text-ink">
            {s}
          </span>
          {i < steps.length - 1 && (
            <span className="hidden text-ink-faint md:inline">→</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Diagram: Card 03 — Build to Operate (horizontal pipeline)           */
/* ------------------------------------------------------------------ */

function BuildToOperateDiagram() {
  const stages = ["Build", "Launch", "Operate", "Scale"];
  return (
    <div className="flex w-full max-w-2xl items-center justify-between px-2">
      {stages.map((s, i) => (
        <div key={s} className="flex flex-1 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.12 }}
            className="flex flex-col items-center gap-3"
          >
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.25,
              }}
              className="flex h-16 min-w-16 items-center justify-center rounded-full border border-line bg-bg px-4 text-xs md:text-sm font-semibold uppercase tracking-wide text-ink-soft whitespace-nowrap"
            >
              {s}
            </motion.span>
          </motion.div>
          {i < stages.length - 1 && (
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
              className="mx-2 h-px flex-1 origin-left bg-line"
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Diagram: Card 04 — Measurable Progress (growing bars)               */
/* ------------------------------------------------------------------ */

function MeasurableProgressDiagram() {
  const bars = [
    { label: "Build", h: 30 },
    { label: "Operate", h: 55 },
    { label: "Scale", h: 78 },
    { label: "Growth", h: 100 },
  ];
  return (
    <div className="flex w-full max-w-sm items-end justify-center gap-6">
      {bars.map((b, i) => (
        <div key={b.label} className="flex flex-col items-center gap-3">
          <div className="flex h-32 w-8 items-end overflow-hidden rounded-full bg-line/60">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${b.h}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full rounded-full bg-ink"
            >
              <motion.div
                animate={{ opacity: [0.85, 1, 0.85] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
                className="h-full w-full rounded-full bg-ink"
              />
            </motion.div>
          </div>
          <span className="text-xs uppercase tracking-wide text-ink-faint">
            {b.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Diagram: Card 05 — Long-Term Partnership (vertical connection)      */
/* ------------------------------------------------------------------ */

function LongTermPartnershipDiagram() {
  const nodes = ["Business", "Backline", "Build", "Operate", "Scale"];
  return (
    <div className="flex flex-col items-center gap-2">
      {nodes.map((n, i) => (
        <div key={n} className="flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={`rounded-full border px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-wide ${
              n === "Backline"
                ? "border-ink bg-ink text-bg"
                : "border-line bg-bg text-ink-soft"
            }`}
          >
            {n}
          </motion.span>
          {i < nodes.length - 1 && (
            <motion.span
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 + 0.1 }}
              className="my-1 h-4 w-px origin-top bg-line"
            />
          )}
        </div>
      ))}
    </div>
  );
}

const visuals = [
  ExecutionPartnerDiagram,
  BuiltAroundDiagram,
  BuildToOperateDiagram,
  MeasurableProgressDiagram,
  LongTermPartnershipDiagram,
];

/* ------------------------------------------------------------------ */
/* Section                                                              */
/* ------------------------------------------------------------------ */

export default function WhyBacklineSection() {
  return (
    <section id="why-backline" className="container-px py-24 md:py-32">
      <div className="max-w-2xl">
        <Reveal>
          <span className="eyebrow ">
            Why Backline
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-[2rem] leading-[1.1] sm:text-[2.6rem] md:text-[3.2rem] tracking-[-0.01em] mt-6 whitespace-pre-line">
            We don&apos;t hand off a strategy.{"\n"}We stay and build it.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 text-[1.05rem] leading-relaxed text-ink-soft">
            We bring strategy, people, systems and execution together to
            build, operate and scale what comes next.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
        {cards.map((c, i) => {
          const Visual = visuals[i];
          return (
            <CardShell
              key={c.number}
              title={c.title}
              description={c.description}
              visual={<Visual />}
              className={c.span}
            />
          );
        })}
      </div>
    </section>
  );
}