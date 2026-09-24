export type Venture = {
  slug: string;
  category: string;
  title: string;
  from: string;
  to: string;
  year: string;
  summary: string;
  detail: {
    partner: string;
    startingPoint: string;
    opportunity: string;
    thesis: string;
    venture: string;
    build: string;
    pilot: string;
    results: string;
    growth: string;
    partnership: string;
  };
};

export const ventures: Venture[] = [
  {
    slug: "new-brand",
    category: "New Brand",
    title: "Established manufacturer to new consumer brand",
    from: "Established manufacturer",
    to: "New consumer brand",
    year: "Venture Scenario",
    summary:
      "A conceptual scenario exploring how manufacturing capability and supply relationships can become the foundation of a standalone consumer brand.",
    detail: {
      partner: "[REAL CASE STUDY TO BE ADDED]",
      startingPoint:
        "An established manufacturer with deep production capability, supplier relationships and category knowledge, but no direct-to-consumer presence.",
      opportunity:
        "Existing production capacity and material expertise point toward a branded product line the business does not yet own.",
      thesis:
        "The manufacturer already builds the product for other brands. The opportunity is to build one of its own.",
      venture:
        "A new consumer brand designed around the manufacturer's existing production strengths and quality standards.",
      build: "[REAL CASE STUDY TO BE ADDED]",
      pilot: "[REAL CASE STUDY TO BE ADDED]",
      results: "[REAL CASE STUDY TO BE ADDED]",
      growth: "[REAL CASE STUDY TO BE ADDED]",
      partnership: "Venture Development",
    },
  },
  {
    slug: "new-channel",
    category: "New Channel",
    title: "Established offline business to direct-to-consumer venture",
    from: "Established offline business",
    to: "Direct-to-consumer venture",
    year: "Venture Scenario",
    summary:
      "A conceptual scenario exploring how a business built on offline distribution could extend into a direct relationship with its end customer.",
    detail: {
      partner: "[REAL CASE STUDY TO BE ADDED]",
      startingPoint:
        "A business with strong offline distribution and trade relationships, and limited direct visibility into end-customer demand.",
      opportunity:
        "Customer data and margin currently sit with intermediaries rather than the business itself.",
      thesis:
        "A direct channel can coexist with existing distribution while building a first-party customer relationship.",
      venture: "A direct-to-consumer venture built alongside the existing trade business, not in competition with it.",
      build: "[REAL CASE STUDY TO BE ADDED]",
      pilot: "[REAL CASE STUDY TO BE ADDED]",
      results: "[REAL CASE STUDY TO BE ADDED]",
      growth: "[REAL CASE STUDY TO BE ADDED]",
      partnership: "Profit Partnership",
    },
  },
  {
    slug: "new-market",
    category: "New Market",
    title: "Existing product to new geography",
    from: "Existing product",
    to: "New geography",
    year: "Venture Scenario",
    summary:
      "A conceptual scenario exploring how a proven product could be validated and launched in an adjacent geographic market.",
    detail: {
      partner: "[REAL CASE STUDY TO BE ADDED]",
      startingPoint: "A product with proven demand in one market and no presence in adjacent markets.",
      opportunity: "Comparable demand signals exist in a neighbouring geography with different regulatory and distribution conditions.",
      thesis: "Market expansion is structured as a venture, not a simple export exercise, given local complexity.",
      venture: "A market-entry venture with its own go-to-market, partnerships and operating structure.",
      build: "[REAL CASE STUDY TO BE ADDED]",
      pilot: "[REAL CASE STUDY TO BE ADDED]",
      results: "[REAL CASE STUDY TO BE ADDED]",
      growth: "[REAL CASE STUDY TO BE ADDED]",
      partnership: "Venture Partnership",
    },
  },
  {
    slug: "new-business-model",
    category: "New Business Model",
    title: "Existing capability to new recurring revenue model",
    from: "Existing capability",
    to: "New recurring revenue model",
    year: "Venture Scenario",
    summary:
      "A conceptual scenario exploring how a services capability could be restructured into a recurring, scalable revenue model.",
    detail: {
      partner: "[REAL CASE STUDY TO BE ADDED]",
      startingPoint: "A business with strong project-based delivery capability and inconsistent revenue predictability.",
      opportunity: "Elements of the delivery process are repeatable enough to be productised into a subscription or membership model.",
      thesis: "Recurring revenue does not require a new capability, only a new way of packaging an existing one.",
      venture: "A new recurring-revenue offer built from the business's existing delivery capability.",
      build: "[REAL CASE STUDY TO BE ADDED]",
      pilot: "[REAL CASE STUDY TO BE ADDED]",
      results: "[REAL CASE STUDY TO BE ADDED]",
      growth: "[REAL CASE STUDY TO BE ADDED]",
      partnership: "Profit Partnership",
    },
  },
];

export function getVenture(slug: string) {
  return ventures.find((v) => v.slug === slug);
}
