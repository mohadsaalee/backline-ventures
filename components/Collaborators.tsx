"use client";

import { Company } from "@/lib/data/companies";
import { companies } from "@/lib/data/companies";

function LogoContent({ company }: { company: Company }) {
  if (company.logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={company.logo}
        alt={company.name}
        loading="lazy"
        decoding="async"
        className="max-h-10 md:max-h-14 w-auto object-contain grayscale opacity-80"
      />
    );
  }
  return (
    <span className="font-display text-sm md:text-base tracking-tight text-ink/80 whitespace-nowrap">
      {company.name}
    </span>
  );
}

export default function Collaborators() {
  const marqueeItems = [...companies, ...companies];

  return (
    <section className="bg-bg-warm py-14 md:py-16">
      <div className="container-px">
        <p className="text-center text-[0.7rem] md:text-xs font-mono tracking-[0.2em] uppercase text-ink-soft">
          Our Partners
        </p>

        {/* Mobile: single-line auto-scrolling marquee */}
        <div className="mt-8 md:hidden overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="marquee-track gap-3">
            {marqueeItems.map((company, i) => (
              <div
                key={`${company.name}-${i}`}
                className="flex items-center justify-center h-16 rounded-xl bg-bg shadow-sm px-6 shrink-0"
              >
                <LogoContent company={company} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop / tablet: static grid */}
        <div className="mt-8 hidden md:grid grid-cols-4 gap-4">
          {companies.map((company) => (
            <div
              key={company.name}
              className="flex items-center justify-center h-20 rounded-xl bg-bg shadow-sm px-4 overflow-hidden"
            >
              <LogoContent company={company} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}