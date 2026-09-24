"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Venture } from "@/lib/data/ventures";
import GLSLHills from "./GLSLHills";

export default function VentureCard({
  venture,
  index,
}: {
  venture: Venture;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <Link
        href={`/ventures/${venture.slug}`}
        className="group flex h-full flex-col rounded-2xl bg-white border border-black/15 shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden hover:border-ink transition-colors duration-500"
      >
        <div className="aspect-[16/11] w-full shrink-0 bg-bg-warm relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 noise opacity-40" />
          <div className="relative text-center px-6">
            <p className="font-display text-2xl md:text-3xl text-ink-soft">
              {venture.from}
            </p>
            <div className="my-3 flex justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M1 9H17M17 9L11 3M17 9L11 15"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  className="text-ink-faint"
                />
              </svg>
            </div>
            <p className="font-display text-xl md:text-2xl">
              {venture.to}
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between p-6 md:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">{venture.category}</p>
              <h3 className="font-display text-xl leading-snug">
                {venture.title}
              </h3>
            </div>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink-soft group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
              <svg
                width="13"
                height="13"
                viewBox="0 0 14 14"
                fill="none"
                className="transition-transform duration-500 group-hover:rotate-45"
              >
                <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </span>
          </div>
          <p className="mt-4 text-[0.65rem] uppercase tracking-[0.14em] text-ink-faint">
            {venture.year}
          </p>
        </div>

        {/* Animated background strip — visual only, no content change */}
        <div className="relative -mx-6 -mb-6 md:-mx-7 md:-mb-7 mt-2 h-14 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <GLSLHills width="100%" height="100%" cameraZ={70} planeSize={160} speed={0.25} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}