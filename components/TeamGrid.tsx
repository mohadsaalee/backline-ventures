// components/TeamGrid.tsx
"use client";

import { motion } from "framer-motion";

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Replace name/role and image src for each real team member once available.
const team = [
  { name: "Team Member", role: "Role to be added", image: "" },
  { name: "Team Member", role: "Role to be added", image: "" },
  { name: "Team Member", role: "Role to be added", image: "" },
];

export default function TeamGrid() {
  return (
    <section className="container-px py-20 md:py-28">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
        <Reveal>
          <h2 className="font-display text-[2.4rem] sm:text-[3.2rem] md:text-[4rem] leading-[0.95]">
            MEET THE
            <br />
            TEAM
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="md:text-right">
          <p className="text-ink-soft text-lg max-w-xs md:ml-auto">
            A small, focused team dedicated to clarity, discipline, and
            meaningful partnerships.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
        {team.map((member, i) => (
          <Reveal key={i} delay={0.1 + i * 0.08}>
            <div className="group">
              <div className="aspect-[3/3.5] w-full rounded-lg overflow-hidden bg-bg-warm relative">
                {member.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <span className="font-display text-5xl text-ink-faint">
                      {member.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </span>
                  </div>
                )}
              </div>
              <p className="mt-4 font-semibold">{member.name}</p>
              <p className="text-ink-soft text-sm">{member.role}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}