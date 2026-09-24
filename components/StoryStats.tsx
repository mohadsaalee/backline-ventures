// components/StoryStats.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ to, suffix = "+" }: { to: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const duration = 1000;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setVal(Math.round(progress * to));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to]);

  return (
    <span className="font-display text-6xl sm:text-7xl leading-none">
      <span ref={ref}>{val}</span>
      {suffix}
    </span>
  );
}

export default function StoryStats({
  stats,
}: {
  stats: { value: number; suffix?: string; label: string }[];
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-10">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <Counter to={s.value} suffix={s.suffix} />
          <p className="mt-3 text-ink-soft text-sm max-w-[12rem] leading-relaxed">
            {s.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}