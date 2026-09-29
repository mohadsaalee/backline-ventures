export type Company = {
  name: string;
  /** Path under /public to the real logo file. If omitted, name is rendered as a text wordmark. */
  logo?: string;
};

export const companies: Company[] = [
  { name: "brandstrekcoders", logo: "/patner/brandstrekcoders.webp" },
  { name: "Alzad", logo: "/patner/alzad.webp" },
  { name: "availableo", logo: "/patner/availableo.webp" },
  { name: "kaffaway", logo: "/patner/kaffaway.webp" },
  { name: "xchool", logo: "/patner/xchool.webp" },
  { name: "workhex", logo: "/patner/workhex.webp" },
  { name: "planotech", logo: "/patner/planotech.webp" },
  { name: "brandstrekcreative", logo: "/patner/brandstrekLogo.webp" },
];