"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import type { ContributionSide } from "@/lib/data/services";

export default function ContributionChart({
  left,
  right,
}: {
  left: ContributionSide;
  right: ContributionSide;
}) {
  const total = left.items.length + right.items.length;
  const leftPct = Math.max(25, Math.min(75, Math.round((left.items.length / total) * 100)));
  const rightPct = 100 - leftPct;

  return (
    <div className="mt-10">
      <div className="h-3 w-full rounded-full bg-line overflow-hidden flex">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${leftPct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full bg-ink-faint"
        />
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${rightPct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full bg-ink"
        />
      </div>

      <div className="mt-3 flex justify-between text-xs font-mono uppercase tracking-wider text-ink-faint">
        <span>{leftPct}%</span>
        <span>{rightPct}%</span>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-8 md:gap-14">
        <Reveal>
          <div className="flex items-center gap-2.5 mb-5">
            <span className="h-2.5 w-2.5 rounded-full bg-ink-faint" />
            <p className="eyebrow">{left.label}</p>
          </div>
          <ul className="space-y-3">
            {left.items.map((item) => (
              <li
                key={item}
                className="text-sm text-ink-soft leading-relaxed pl-4 border-l border-line"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex items-center gap-2.5 mb-5">
            <span className="h-2.5 w-2.5 rounded-full bg-ink" />
            <p className="eyebrow">{right.label}</p>
          </div>
          <ul className="space-y-3">
            {right.items.map((item) => (
              <li
                key={item}
                className="text-sm text-ink-soft leading-relaxed pl-4 border-l border-ink"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}