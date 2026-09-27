export type Company = {
  name: string;
  /** Path under /public to the real logo file. If omitted, name is rendered as a text wordmark. */
  logo?: string;
};

export const companies: Company[] = [
  { name: "Alzad", logo: "/patner/alzad.png" },
  { name: "Brandstrek", logo: "/patner/Brandstrek.png" },
  { name: "PichIn", logo: "/patner/pitchin.png" },
];