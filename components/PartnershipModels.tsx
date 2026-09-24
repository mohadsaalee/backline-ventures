import Link from "next/link";
import { PartnershipModel } from "@/lib/data/partnerships";
import Reveal from "./Reveal";

export default function PartnershipModels({
  models,
}: {
  models: PartnershipModel[];
}) {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-4">
      {models.map((m, i) => (
        <Reveal key={m.number} delay={i * 0.08}>
          <div className="h-full rounded-2xl border border-line bg-card p-8 flex flex-col justify-between min-h-[280px] hover:border-ink transition-colors duration-500">
            <div>
              <span className="eyebrow">{m.number}</span>
              <h3 className="font-display text-2xl mt-6 leading-tight">
                {m.title}
              </h3>
              <p className="mt-4 text-sm text-ink-soft leading-relaxed">
                {m.description}
              </p>
              <p className="mt-4 text-xs uppercase tracking-wide text-ink-faint">
                {m.bestFor}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-ink-faint">
                {m.revenue}
              </p>
            </div>
            <Link
              href="/contact"
              className="underline-link text-sm font-medium mt-8 inline-flex items-center gap-2"
            >
              Discuss a partnership
            </Link>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
