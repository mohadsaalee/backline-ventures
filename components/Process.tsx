import { ProcessStep } from "@/lib/data/partnerships";
import Reveal from "./Reveal";

export default function Process({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="mt-4">
      {steps.map((step, i) => (
        <Reveal key={step.number} delay={i * 0.05}>
          <div className="group grid grid-cols-[3.5rem_1fr] md:grid-cols-[6rem_1fr_2fr] items-start gap-x-6 py-8 hairline">
            <span className="font-display text-lg text-ink-faint pt-1">
              {step.number}
            </span>
            <h3 className="font-display text-2xl md:text-3xl tracking-tight">
              {step.title}
            </h3>
            <p className="text-ink-soft text-sm md:text-base leading-relaxed mt-2 md:mt-1 col-span-2 md:col-span-1">
              {step.description}
            </p>
          </div>
        </Reveal>
      ))}
      <div className="hairline" />
    </div>
  );
}
