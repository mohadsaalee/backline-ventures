"use client";

import { motion } from "framer-motion";
import { opportunityMap } from "@/lib/data/capabilities";

export default function OpportunityMap() {
  return (
    <div className="mt-16 flex flex-col lg:flex-row items-stretch gap-0">
      {opportunityMap.map((col, i) => (
        <div key={col.label} className="flex items-center flex-1">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className={`flex-1 rounded-2xl p-7 md:p-8 min-h-[220px] flex flex-col justify-between ${
              i === 2
                ? "bg-ink text-bg"
                : i === 3
                ? "bg-accent text-bg"
                : "bg-card border border-line"
            }`}
          >
            <p
              className={`eyebrow ${
                i === 2 || i === 3 ? "!text-bg/60" : ""
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="font-display text-xl md:text-2xl mt-4 mb-5 leading-tight">
              {col.label}
            </h3>
            {col.items.length > 0 && (
              <ul className="space-y-1.5">
                {col.items.map((item) => (
                  <li
                    key={item}
                    className={`text-sm ${
                      i === 2 || i === 3 ? "text-bg/75" : "text-ink-soft"
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>

          {i < opportunityMap.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 + 0.1 }}
              className="hidden lg:flex items-center justify-center w-10 flex-shrink-0 text-ink-faint"
            >
              <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
                <path
                  d="M1 7H23M23 7L17 1M23 7L17 13"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
              </svg>
            </motion.div>
          )}
          {i < opportunityMap.length - 1 && (
            <div className="flex lg:hidden items-center justify-center h-10 text-ink-faint">
              <svg width="14" height="24" viewBox="0 0 14 24" fill="none">
                <path
                  d="M7 1V23M7 23L1 17M7 23L13 17"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
