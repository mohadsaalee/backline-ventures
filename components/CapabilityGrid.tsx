import Reveal from "./Reveal";
import type { Capability } from "@/lib/data/capabilities";

export default function CapabilityGrid({ items }: { items: Capability[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-line mt-4 rounded-2xl overflow-hidden">
      {items.map((item, i) => (
        <Reveal key={item.title} delay={i * 0.03} className="bg-bg">
          <div className="group relative p-6 md:p-8 h-full min-h-[110px] flex flex-col justify-end bg-bg overflow-hidden">
            {/* Diagonal fill animation: flows in from bottom-right, out toward top-left */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-black scale-0 origin-bottom-right transition-transform duration-500 ease-out group-hover:scale-150"
            />

            <span className="relative z-10 font-display text-lg md:text-xl text-ink transition-colors duration-300 group-hover:text-white">
              {item.title}
            </span>
            <span className="relative z-10 text-sm text-ink-soft mt-1 max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 overflow-hidden transition-all duration-300 group-hover:text-white">
              {item.description}
            </span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}