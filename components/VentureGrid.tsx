import { Venture } from "@/lib/data/ventures";
import VentureCard from "./VentureCard";

export default function VentureGrid({ ventures }: { ventures: Venture[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 items-stretch gap-6 md:gap-8">
      {ventures.map((v, i) => (
        <VentureCard venture={v} index={i} key={v.slug} />
      ))}
    </div>
  );
}