export type Company = {
  name: string;
  /** Path under /public to the real logo file. If omitted, name is rendered as a text wordmark. */
  logo?: string;
};

export const companies: Company[] = [
  { name: "Alzad", logo: "/alzad.png" },
  { name: "Brandstrek", logo: "/brandstrek.png" },
  { name: "PitchIn", logo: "/pitchin.png" },
  { name: "Novara" },
  { name: "Kestrel & Co" },
  { name: "Meridian Foods" },
  { name: "Alto Works" },
  { name: "Fernbridge" },
];