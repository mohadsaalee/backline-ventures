"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { companies, Company } from "@/lib/data/companies";

const SLOT_COUNT = 8;
const FLIP_INTERVAL = 1800; // ms between flips, one slot at a time

function LogoContent({ company }: { company: Company }) {
  if (company.logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={company.logo}
        alt={company.name}
        loading="lazy"
        decoding="async"
        className="max-h-5 md:max-h-6 w-auto object-contain grayscale opacity-80"
      />
    );
  }
  return (
    <span className="font-display text-sm md:text-base tracking-tight text-ink/80">
      {company.name}
    </span>
  );
}

export default function Collaborators() {
  const [indices, setIndices] = useState<number[]>(() =>
    Array.from({ length: SLOT_COUNT }, (_, i) => i % companies.length)
  );

  useEffect(() => {
    let tick = 0;
    const timer = setInterval(() => {
      const slot = tick % SLOT_COUNT;
      setIndices((prev) => {
        const next = [...prev];
        next[slot] = (next[slot] + 1) % companies.length;
        return next;
      });
      tick += 1;
    }, FLIP_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-bg-warm py-14 md:py-16">
      <div className="container-px">
        <p className="text-center text-[0.7rem] md:text-xs font-mono tracking-[0.2em] uppercase text-ink-soft">
          Our Partners
        </p>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
          {indices.map((companyIndex, slot) => {
            const company = companies[companyIndex];
            return (
              <div
                key={slot}
                className="flex items-center justify-center h-16 md:h-20 rounded-xl bg-bg shadow-sm px-4 overflow-hidden"
                style={{ perspective: 1000 }}
              >
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={`${slot}-${company.name}`}
                    initial={{ rotateX: -100, opacity: 0, y: 6 }}
                    animate={{ rotateX: 0, opacity: 1, y: 0 }}
                    exit={{ rotateX: 100, opacity: 0, y: -6 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center justify-center"
                    style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
                  >
                    <LogoContent company={company} />
                  </motion.div>
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}