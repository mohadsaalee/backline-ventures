import Reveal from "./Reveal";

const locations = [
  {
    city: "Kozhikode",
    name: "Backline Ventures",
    address: [
      "Hilite Metromax N, On the road to H. Thondayad Bypass,",
      "Nellikkode, Kozhikode,",
      "Keralam 673016",
    ],
    query:
      "Backline Ventures, Hilite Metromax N, Thondayad Bypass, Nellikkode, Kozhikode, Kerala 673016",
  },
  {
    city: "Bengaluru",
    name: "Backline Ventures",
    address: [
      "Room No. 502, JP Plaza,",
      "Kada Agrahara, Sarjapur,",
      "Bengaluru, Karnataka - 562125",
    ],
    query:
      "Backline Ventures, Room No. 502, JP Plaza, Kada Agrahara, Sarjapur, Bengaluru, Karnataka 562125",
  },
];

export default function LocationMaps() {
  return (
    <div className="grid md:grid-cols-2 gap-6 md:gap-7">
      {locations.map((loc, i) => (
        <Reveal key={loc.city} delay={i * 0.1}>
          <div className="rounded-2xl border border-line bg-card p-3 md:p-4">
            <iframe
              title={`${loc.name}, ${loc.city}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                loc.query
              )}&output=embed`}
              className="h-[300px] md:h-[380px] w-full rounded-xl border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="px-2 pt-6 pb-3 md:px-3">
              <p className="eyebrow">{loc.city}</p>
              <h3 className="font-display text-xl md:text-2xl mt-3">
                {loc.name}
              </h3>
              <address className="mt-4 not-italic text-sm md:text-base leading-relaxed text-ink-soft">
                {loc.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}