"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

type Phase = {
  number: string;
  title: string;
  description: string;
};

const phases: Phase[] = [
  {
    number: "01",
    title: "Existing Business",
    description:
      "The partner brings what they've already built — manufacturing, products, capital, infrastructure, supply chain, industry knowledge, distribution or an existing customer base.",
  },
  {
    number: "02",
    title: "Untapped Opportunity",
    description:
      "We identify the new customer segment, product, price point, market or channel the existing business hasn't been able to reach on its own.",
  },
  {
    number: "03",
    title: "Our Execution",
    description:
      "We bring market and consumer research, strategy, product and brand development, technology, marketing, sales systems, hiring, SOPs and growth strategy.",
  },
  {
    number: "04",
    title: "Shared Investment",
    description:
      "Where the structure allows, we put our own fee, time or capital behind the venture — through development fees, profit share, revenue share or equity.",
  },
];

const spring = { type: "spring", stiffness: 500, damping: 42, mass: 0.9 } as const;

export default function ModelPhases() {
  const [active, setActive] = useState(0);
  // Mobile-first: stacked cards with natural height. Desktop: side-by-side
  // accordion driven by flex-grow.
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <LayoutGroup>
      <div className="mt-10 flex flex-col md:flex-row gap-2 md:h-[420px] rounded-2xl overflow-hidden border border-line p-2 bg-bg-warm">
        {phases.map((phase, i) => {
          const isActive = i === active;
          return (
            <motion.div
              key={phase.number}
              layout={isDesktop}
              transition={spring}
              onMouseEnter={() => isDesktop && setActive(i)}
              onClick={() => setActive(i)}
              className={`relative cursor-pointer overflow-hidden rounded-xl flex flex-col justify-between p-5 md:p-8 min-h-[96px] md:min-h-0 ${
                isActive ? "bg-ink text-bg" : "bg-bg text-ink"
              }`}
              style={
                isDesktop
                  ? { flexGrow: isActive ? 3.4 : 1, flexBasis: 0 }
                  : undefined
              }
            >
              {/* Header row */}
              <motion.div
                layout={isDesktop ? "position" : false}
                className="flex items-center justify-between"
              >
                <span
                  className={`font-display text-sm md:text-base ${
                    isActive ? "text-white/80" : "text-ink-faint"
                  }`}
                >
                  Phase {phase.number}
                </span>

                {isActive && (
                  <div className="hidden md:flex items-center gap-1.5">
                    {phases.map((_, dotIndex) => (
                      <span
                        key={dotIndex}
                        className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
                          dotIndex === active ? "bg-emerald-400" : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Collapsed label (vertical on desktop, hidden when active) */}
              {!isActive && (
                <span className="hidden md:block font-display text-lg text-ink-faint [writing-mode:vertical-rl] rotate-180 self-center">
                  {phase.title}
                </span>
              )}

              {/* Expanded content */}
              <AnimatePresence
                mode={isDesktop ? "popLayout" : "sync"}
                initial={false}
              >
                {isActive && (
                  <motion.div
                    key="content"
                    initial={
                      isDesktop
                        ? { opacity: 0 }
                        : { opacity: 0, height: 0 }
                    }
                    animate={
                      isDesktop
                        ? { opacity: 1 }
                        : { opacity: 1, height: "auto" }
                    }
                    exit={
                      isDesktop
                        ? { opacity: 0 }
                        : { opacity: 0, height: 0 }
                    }
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="mt-4 md:mt-auto overflow-hidden md:overflow-visible"
                  >
                    <h3 className="font-display text-xl sm:text-2xl md:text-3xl leading-tight break-words">
                      {phase.title}
                    </h3>
                    <p className="mt-3 text-sm md:text-base leading-relaxed text-white/60 max-w-md">
                      {phase.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile: always show title */}
              {!isActive && (
                <span className="md:hidden mt-4 font-display text-lg text-ink-faint">
                  {phase.title}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </LayoutGroup>
  );
}