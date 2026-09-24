"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

type Value = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const icons = {
  partnership: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="3.2" />
      <circle cx="16" cy="16" r="3.2" />
      <path d="M10.3 10.3 13.7 13.7" />
    </svg>
  ),
  execution: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
    </svg>
  ),
  transparency: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8v4l3 2" />
    </svg>
  ),
  discipline: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 17 9 11l4 4 8-8" />
      <path d="M15 6h6v6" />
    </svg>
  ),
  experimentation: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 3h6M10 3v5.5L5.5 17a2 2 0 0 0 1.8 3h9.4a2 2 0 0 0 1.8-3L14 8.5V3" />
    </svg>
  ),
  longTerm: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    </svg>
  ),
  growth: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4v16h16" />
      <path d="M7 15l4-4 3 3 5-6" />
    </svg>
  ),
};

const values: Value[] = [
  {
    title: "Partnership",
    description: "We believe in building together.",
    icon: icons.partnership,
  },
  {
    title: "Execution",
    description: "Ideas are valuable only when they are executed.",
    icon: icons.execution,
  },
  {
    title: "Transparency",
    description: "Clear communication and financial transparency are essential.",
    icon: icons.transparency,
  },
  {
    title: "Discipline",
    description: "Every venture needs systems, measurement and accountability.",
    icon: icons.discipline,
  },
  {
    title: "Experimentation",
    description: "We validate before making large commitments.",
    icon: icons.experimentation,
  },
  {
    title: "Long-Term Thinking",
    description: "We focus on sustainable business value rather than short-term activity.",
    icon: icons.longTerm,
  },
  {
    title: "Shared Growth",
    description: "When our partners grow, BACKLINE grows.",
    icon: icons.growth,
  },
];

export default function ValuesSection() {
  return (
    <section className="container-px py-24 md:py-32">
      <Reveal>
        <p className="">
          What we value.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {values.map((v, i) => (
          <Reveal key={v.title} delay={0.05 + i * 0.06}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="rounded-2xl bg-ink text-bg p-7 md:p-8 min-h-[240px] flex flex-col justify-between"
            >
              <div className="mt-8">
                <h3 className="font-display text-lg md:text-xl leading-snug">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  {v.description}
                </p>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>

    </section>
  );
}