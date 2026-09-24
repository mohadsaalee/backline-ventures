export type Insight = {
  slug: string;
  topic: string;
  date: string;
  title: string;
  excerpt: string;
  body: string[];
};

export const insights: Insight[] = [
  {
    slug: "finding-new-revenue-streams-inside-established-businesses",
    topic: "Venture Strategy",
    date: "Jan 2026",
    title: "Finding new revenue streams inside established businesses.",
    excerpt:
      "The next growth opportunity is often already inside the business — in underused assets, dormant capacity or unexplored customer relationships.",
    body: [
      "Most established businesses assume their next source of growth has to be found outside the business — a new market, a new acquisition, a new category entirely. In practice, some of the most durable opportunities are already inside the business, hidden in assets that are underused, capabilities that are undervalued, or customer relationships that have never been fully explored.",
      "The starting point is not a brainstorm. It is an inventory: what does the business actually own — in product, in production capacity, in customer trust, in distribution — that isn't yet being converted into revenue.",
      "Once that inventory exists, the opportunity usually becomes obvious. The harder work is building the discipline to validate it before committing serious capital.",
    ],
  },
  {
    slug: "when-a-new-product-should-become-a-new-brand",
    topic: "Brand Strategy",
    date: "Jan 2026",
    title: "When a new product should become a new brand.",
    excerpt:
      "Not every new product belongs under the existing brand. Here is how to decide when a new venture needs its own identity.",
    body: [
      "Launching a new product under an existing brand is often the default choice — it is faster and cheaper. But it is not always the right one.",
      "A new brand is usually justified when the new product targets a meaningfully different customer, competes on a different basis, or risks diluting the trust the existing brand has built in its core category.",
      "The decision should be made deliberately, weighing speed-to-market against long-term brand architecture, rather than defaulting to whichever option requires the least short-term effort.",
    ],
  },
  {
    slug: "building-d2c-from-an-established-business",
    topic: "Venture Strategy",
    date: "Dec 2025",
    title: "Building D2C from an established business.",
    excerpt:
      "A direct-to-consumer venture can complement an existing distribution business rather than cannibalise it — if it's structured correctly.",
    body: [
      "Established businesses are often hesitant to build a direct-to-consumer channel out of concern it will compete with existing distribution partners.",
      "In practice, a well-structured D2C venture can serve a different purpose entirely: building a first-party relationship with the end customer, generating data the business has never had access to, and testing new products before a wider rollout.",
      "The key is structuring the venture so it is additive to the existing business model, not a direct substitute for it.",
    ],
  },
  {
    slug: "new-venture-vs-new-product-line",
    topic: "Venture Strategy",
    date: "Dec 2025",
    title: "New venture vs new product line.",
    excerpt:
      "Not every opportunity needs a new venture structure. Knowing when to build inside versus outside the existing business matters.",
    body: [
      "One of the first strategic decisions in any growth opportunity is whether it should live inside the existing business as a new product line, or be structured as a separate venture.",
      "A new product line makes sense when the opportunity shares the same customer, economics and operating model as the core business. A separate venture makes sense when any of those differ significantly.",
      "Getting this decision wrong is one of the most common reasons promising opportunities stall — either constrained by a business model that doesn't fit, or isolated from resources the core business could have provided.",
    ],
  },
  {
    slug: "how-to-validate-a-new-business-before-investing-heavily",
    topic: "Venture Building",
    date: "Nov 2025",
    title: "How to validate a new business before investing heavily.",
    excerpt:
      "Validation is not a single step — it is a discipline that should run through discovery, design and the earliest pilot.",
    body: [
      "The biggest risk in building a new venture is not a bad idea — it is a good idea pursued with too much conviction and too little evidence.",
      "Validation should test market demand, customer economics and strategic fit before significant capital is committed, and should continue through the pilot stage rather than stopping once the venture is designed.",
      "Businesses that validate rigorously tend to move slower at the start and faster later, because they are not spending time and capital correcting assumptions that should have been tested earlier.",
    ],
  },
  {
    slug: "turning-unused-manufacturing-capacity-into-a-new-business",
    topic: "Venture Strategy",
    date: "Nov 2025",
    title: "Turning unused manufacturing capacity into a new business.",
    excerpt:
      "Idle capacity is a cost until it becomes the foundation of a new venture.",
    body: [
      "Unused manufacturing capacity is usually treated as an operational inefficiency to be minimised rather than an asset to be built on.",
      "In the right circumstances, that same capacity — combined with existing supplier relationships and process knowledge — can become the foundation of an entirely new product or brand.",
      "The opportunity is rarely obvious from inside day-to-day operations, which is why it often takes a structured, outside-in review to surface it.",
    ],
  },
  {
    slug: "when-an-established-company-should-enter-a-new-market",
    topic: "Market Expansion",
    date: "Oct 2025",
    title: "When an established company should enter a new market.",
    excerpt:
      "Market expansion should be evaluated as a venture decision, not a simple extension of the existing go-to-market plan.",
    body: [
      "Expanding into a new market is often framed as a scaling decision — do more of what is already working, somewhere else. That framing understates the complexity involved.",
      "A new market usually comes with different customer behaviour, different competitive dynamics and different regulatory conditions, which means it deserves the same discovery and validation discipline as an entirely new venture.",
      "Companies that treat market entry this way tend to build more durable positions than those that simply replicate an existing playbook and hope it transfers.",
    ],
  },
  {
    slug: "how-family-businesses-can-build-their-next-company",
    topic: "Venture Building",
    date: "Oct 2025",
    title: "How family businesses can build their next company.",
    excerpt:
      "Family businesses often sit on some of the strongest foundations for a new venture — reputation, relationships and operating discipline.",
    body: [
      "Family businesses frequently carry decades of accumulated trust, supplier relationships and operating knowledge that rarely make it onto a balance sheet, but represent real strategic assets.",
      "Building a new venture from that foundation requires balancing the discipline and reputation of the existing business with the different risk profile and pace of a new venture.",
      "Done well, it allows a family business to build its next chapter without putting the existing business at risk.",
    ],
  },
];

export function getInsight(slug: string) {
  return insights.find((i) => i.slug === slug);
}
