"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ServiceExample } from "@/lib/data/services";

export default function ServiceExamples({ examples }: { examples: ServiceExample[] }) {
  const [active, setActive] = useState(0);
  const current = examples[active];

  return (
    <div className="mt-10 grid md:grid-cols-[1fr_1.4fr] gap-6 md:gap-10">
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
        {examples.map((ex, i) => (
          <button
            key={ex.number}
            onClick={() => setActive(i)}
            className={`text-left shrink-0 md:shrink rounded-xl border px-5 py-4 transition-colors duration-300 ${
              i === active ? "border-ink bg-ink text-bg" : "border-line hover:border-ink"
            }`}
          >
            <span
              className={`font-display text-xs block mb-1 ${
                i === active ? "text-bg/60" : "text-ink-faint"
              }`}
            >
              {ex.number}
            </span>
            <span className="font-display text-sm md:text-base leading-tight whitespace-nowrap md:whitespace-normal">
              {ex.title}
            </span>
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-line bg-card p-8 md:p-10 min-h-[320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.number}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4">
              <p className="font-display text-lg md:text-xl text-ink-soft">{current.from}</p>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
                <path
                  d="M1 9H17M17 9L11 3M17 9L11 15"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  className="text-ink-faint"
                />
              </svg>
              <p className="font-display text-lg md:text-xl">{current.to}</p>
            </div>

            <p className="mt-6 text-ink-soft leading-relaxed max-w-xl">{current.description}</p>

            <p className="eyebrow mt-8 mb-4">BACKLINE can create</p>
            <div className="flex flex-wrap gap-2">
              {current.builds.map((b) => (
                <span
                  key={b}
                  className="text-xs uppercase tracking-wider rounded-full border border-line px-3 py-1.5 text-ink-faint"
                >
                  {b}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}