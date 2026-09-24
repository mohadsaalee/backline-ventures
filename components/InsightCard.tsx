"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Insight } from "@/lib/data/insights";

export default function InsightCard({
  insight,
  index,
}: {
  insight: Insight;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
    >
      <Link
        href={`/insights/${insight.slug}`}
        className="group block py-8 hairline"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10">
          <div className="flex items-center gap-3 md:w-40 shrink-0">
            <span className="text-xs text-ink-faint">{insight.date}</span>
          </div>
          <div className="flex-1">
            <p className="eyebrow mb-2">{insight.topic}</p>
            <h3 className="font-display text-xl md:text-2xl leading-snug group-hover:text-ink-soft transition-colors">
              {insight.title}
            </h3>
          </div>
          <span className="hidden md:flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink-soft group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
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
      </Link>
    </motion.div>
  );
}
