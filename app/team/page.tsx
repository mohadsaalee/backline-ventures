import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CTA from "@/components/CTA";
import TeamHeroBanner from "@/components/TeamHeroBanner";
import { leadership, team } from "@/lib/data/team";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "The people behind BACKLINE VENTURES — the leadership, venture, growth and operating team that builds, runs and scales every partnership.",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("");
}

export default function TeamPage() {
  return (
    <>
      <TeamHeroBanner />

      {/* Leadership — 3 per row */}
      <section className="container-px py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-14">
          {leadership.map((member, i) => (
            <Reveal key={`${member.name}-${i}`} delay={0.05 + i * 0.06}>
              <div className="group">
                <div className="aspect-[3/3.5] w-full rounded-lg overflow-hidden bg-bg-warm relative">
                  {member.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center transition-colors duration-500 group-hover:bg-ink">
                      <span className="font-display text-5xl text-ink-faint transition-colors duration-500 group-hover:text-bg">
                        {initials(member.name)}
                      </span>
                    </div>
                  )}
                </div>
                <p className="mt-4 font-semibold">{member.name}</p>
                <p className="text-ink-soft text-sm">{member.role}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-ink-faint">
                  {member.group}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Team — 4 per row */}
      <section className="container-px py-16 md:py-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14">
          {team.map((member, i) => (
            <Reveal key={`${member.name}-${i}`} delay={0.05 + i * 0.06}>
              <div className="group">
                <div className="aspect-[3/3.5] w-full rounded-lg overflow-hidden bg-bg-warm relative">
                  {member.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center transition-colors duration-500 group-hover:bg-ink">
                      <span className="font-display text-5xl text-ink-faint transition-colors duration-500 group-hover:text-bg">
                        {initials(member.name)}
                      </span>
                    </div>
                  )}
                </div>
                <p className="mt-4 font-semibold">{member.name}</p>
                <p className="text-ink-soft text-sm">{member.role}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-ink-faint">
                  {member.group}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Joining note */}
      <section className="container-px py-24 md:py-32">
        <SectionHeading
          eyebrow="Growing the team"
          title="We build the team around the venture."
          description="As new partnerships come on board, we bring in the specific brand, product, technology or legal capability each opportunity needs — rather than staffing up before there's a venture to staff for."
        />
      </section>

      <CTA />
    </>
  );
}