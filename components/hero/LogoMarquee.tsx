"use client";

import type { ReactNode } from "react";

/**
 * Infinite logo strip. Scrolls left -> right (like the reference
 * recording) with soft-faded edges. Swap the entries in LOGOS for your
 * own partner marks — each item is just a ReactNode.
 */

const glyph = "h-[1.15em] w-[1.15em] shrink-0";

const LOGOS: { key: string; node: ReactNode }[] = [
  {
    key: "zapier",
    node: (
      <span className="text-[1.4rem] font-bold italic tracking-tight">
        _zapier
      </span>
    ),
  },
  {
    key: "snowflake",
    node: (
      <span className="flex items-center gap-2 text-[1.05rem] font-light tracking-tight">
        <svg viewBox="0 0 24 24" className={glyph} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7M9 3.5l3 2 3-2M9 20.5l3-2 3 2" />
        </svg>
        snowflake
      </span>
    ),
  },
  {
    key: "aws",
    node: (
      <span className="flex items-center gap-4">
        <span className="relative text-[1.55rem] font-medium leading-none tracking-tight">
          aws
          <svg viewBox="0 0 40 8" className="absolute -bottom-2 left-0 h-2 w-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M2 2c10 6 26 6 36 0" />
          </svg>
        </span>
        <span className="h-7 w-px bg-current opacity-60" />
        <span className="text-[1.55rem] font-bold leading-none">S3</span>
      </span>
    ),
  },
  {
    key: "stripe",
    node: (
      <span className="flex items-center gap-2 text-[1.55rem] font-bold tracking-tight">
        <span className="h-6 w-6 bg-current opacity-80" />
        stripe
      </span>
    ),
  },
  {
    key: "vercel",
    node: (
      <span className="flex items-center gap-2 text-[1.55rem] font-bold tracking-tight">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M12 3l10 18H2z" />
        </svg>
        Vercel
      </span>
    ),
  },
  {
    key: "bigquery",
    node: (
      <span className="flex items-center gap-3">
        <svg viewBox="0 0 24 24" className="h-9 w-9" fill="currentColor">
          <path d="M12 1.5l9.5 5.5v11L12 23.5 2.5 18V7z" />
        </svg>
        <span className="text-[0.85rem] font-medium leading-[1.05]">
          Google
          <br />
          BigQuery
        </span>
      </span>
    ),
  },
  {
    key: "slack",
    node: (
      <span className="flex items-center gap-2 text-[1.55rem] font-bold tracking-tight">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M9 3L7 21M17 3l-2 18M3 9h18M3 16h18" />
        </svg>
        slack
      </span>
    ),
  },
  {
    key: "supabase",
    node: (
      <span className="flex items-center gap-2 text-[1.15rem] font-semibold tracking-tight">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M13.5 2L4 14h7l-1 8 10-13h-7z" />
        </svg>
        supabase
      </span>
    ),
  },
  {
    key: "github",
    node: (
      <span className="flex items-center gap-2 text-[1.55rem] font-bold tracking-tight">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <circle cx="12" cy="12" r="10" />
        </svg>
        GitHub
      </span>
    ),
  },
  {
    key: "hubspot",
    node: (
      <span className="text-[1.55rem] font-bold tracking-tight">HubSpot</span>
    ),
  },
];

export default function LogoMarquee() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)",
      }}
    >
      <style>{`
        @keyframes hero-marquee-right {
          from { transform: translate3d(-50%, 0, 0); }
          to   { transform: translate3d(0, 0, 0); }
        }
        .hero-marquee-track {
          display: flex;
          width: max-content;
          animation: hero-marquee-right 42s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-marquee-track { animation: none; }
        }
      `}</style>

      <div className="hero-marquee-track items-center text-white/60">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center gap-16 pr-16 md:gap-24 md:pr-24"
          >
            {LOGOS.map((l) => (
              <div key={`${copy}-${l.key}`} className="shrink-0 whitespace-nowrap">
                {l.node}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}