"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function TeamHeroBanner() {
  const imgRef = useRef<HTMLDivElement>(null);
  const imgInView = useInView(imgRef, { once: true, amount: 0.05 });

  return (
    <section className="bg-ink text-white overflow-hidden">
      <div className="container-px pt-28 pb-16 md:pt-36 md:pb-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow text-white/50">Our Team</p>
          <h1 className="font-display text-[clamp(1.75rem,8.8vw,2.4rem)] sm:text-[3.2rem] md:text-[3.8rem] leading-[1.05] tracking-[-0.02em] mt-6">
            The people behind every partnership.
          </h1>
          <p className="mt-6 max-w-md text-white/60 leading-relaxed">
            A small, deliberately lean team — leadership, venture strategy,
            operations, growth and finance — built to execute across every
            stage of a partnership, not just advise on it.
          </p>
        </motion.div>

        <div ref={imgRef} className="w-full">
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            animate={imgInView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="aspect-[4/3] md:aspect-[16/12] w-full rounded-2xl overflow-hidden bg-white/5 group"
          >
          {/* eslint-disable-next-line @next/next/no-img-element */}

          <img

            src="/team.png"

            alt="Our team"

            decoding="async"

            fetchPriority="high"

            className="h-full w-full object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-105"

          />
          </motion.div>
        </div>
      </div>
    </section>
  );
}