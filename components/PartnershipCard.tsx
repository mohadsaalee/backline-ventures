"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Partnership } from "@/lib/data/partnerships";
import GLSLHills from "./GLSLHills";

export default function PartnershipCard({
  partnership,
  index,
}: {
  partnership: Partnership;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/services/${partnership.slug}`}
        className="relative flex flex-col justify-between rounded-2xl bg-white border border-black/15 p-8 md:p-10 min-h-[360px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden"
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="eyebrow">{partnership.number}</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </span>
          </div>

          <h3 className="font-display text-2xl md:text-[1.7rem] mt-10 leading-tight">
            {partnership.title}
          </h3>
          <p className="text-lg text-ink-soft mt-2 font-medium">{partnership.headline}</p>
          <p className="mt-5 text-sm leading-relaxed text-ink-soft">{partnership.description}</p>
        </div>

        {/* Only this bottom tag section gets the animated background */}
        <div className="relative mt-8 -mx-8 -mb-8 md:-mx-10 md:-mb-10 px-8 pb-8 md:px-10 md:pb-10 pt-6 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <GLSLHills width="100%" height="100%" cameraZ={70} planeSize={160} speed={0.25} />
          </div>

          <div className="relative z-10 flex flex-wrap gap-2">
            {partnership.capabilities.slice(0, 4).map((c) => (
              <span
                key={c}
                className="text-[0.7rem] uppercase tracking-wider rounded-full border border-line px-3 py-1.5 text-ink-faint bg-white/70 backdrop-blur-sm"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}