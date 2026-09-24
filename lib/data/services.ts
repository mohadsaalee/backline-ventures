import type { ProcessStep, PartnershipModel } from "./partnerships";

export type ContributionSide = {
  label: string;
  items: string[];
};

export type ServiceExample = {
  number: string;
  from: string;
  to: string;
  title: string;
  description: string;
  builds: string[];
};

export type ServiceDetail = {
  slug: string;
  number: string;
  title: string;
  headline: string;
  summary: string;
  forWho: string[];
  left: ContributionSide;
  right: ContributionSide;
  process: ProcessStep[];
  examples?: ServiceExample[];
  models?: PartnershipModel[];
};

export const services: ServiceDetail[] = [
  {
    slug: "venture-partner",
    number: "01",
    title: "Venture Partnership",
    headline: "Build a new venture together.",
    summary:
      "Our flagship model. We partner with an entrepreneur or established business to identify a new market opportunity and create a new venture around it — the two sides working together from research through to a scaled, operating business.",
    forWho: [
      "Established manufacturers",
      "Family-owned businesses",
      "Consumer brands & FMCG companies",
      "Businesses with strong products but weak branding",
      "Businesses entering digital or new markets",
    ],
    left: {
      label: "What the partner brings",
      items: [
        "Product",
        "Manufacturing",
        "Capital",
        "Inventory",
        "Infrastructure",
        "Industry knowledge",
        "Supply chain (optional)",
        "Distribution (optional)",
        "Existing business resources (optional)",
      ],
    },
    right: {
      label: "What BACKLINE brings",
      items: [
        "Market & customer research",
        "Business & product strategy",
        "Brand development & packaging direction",
        "Technology & digital infrastructure",
        "Marketing & sales strategy",
        "Team development & SOPs",
        "Business management",
        "Growth strategy & expansion planning",
      ],
    },
    process: [
      { number: "01", title: "Research", description: "We study the market, the customer and the competition before committing to a direction." },
      { number: "02", title: "Strategy", description: "We shape the business model, positioning, pricing and go-to-market plan." },
      { number: "03", title: "Structure", description: "Both sides agree the partnership model, investment, equity or profit share, and governance — in writing." },
      { number: "04", title: "Build", description: "We build the brand, product, technology, marketing assets and sales systems together." },
      { number: "05", title: "Launch & Measure", description: "The venture enters the market at a controlled scale, and we track real performance against the thesis." },
      { number: "06", title: "Scale", description: "Once the model proves itself, we invest further — in distribution, new products, new markets and exports." },
    ],
    examples: [
      {
        number: "01",
        from: "Existing manufacturer",
        to: "New consumer brand",
        title: "Existing Manufacturer → New Consumer Brand",
        description: "A traditional manufacturer already has production capability but no modern brand for younger customers.",
        builds: ["Brand", "Product line", "Positioning", "Packaging", "Digital presence", "Marketing strategy", "E-commerce channel"],
      },
      {
        number: "02",
        from: "Existing offline business",
        to: "Digital business",
        title: "Existing Offline Business → Digital Business",
        description: "A business is strong offline but has weak digital penetration.",
        builds: ["Digital-first positioning", "Website", "E-commerce", "Social media", "Performance marketing", "Online sales systems", "Customer database"],
      },
      {
        number: "03",
        from: "Existing brand",
        to: "New market",
        title: "Existing Brand → New Market",
        description: "An existing brand has limitations in pricing, positioning, customer perception, product range or identity. Instead of changing it completely, a separate venture is developed for the new market.",
        builds: ["New positioning", "New pricing", "New product range", "Separate brand identity", "New customer segment"],
      },
    ],
    models: [
      { number: "A", title: "Service Partnership", description: "The partner owns the venture. BACKLINE receives development and management fees.", bestFor: "Businesses that want full ownership and a defined engagement.", revenue: "Development + management fees" },
      { number: "B", title: "Profit Sharing", description: "Both parties contribute resources and share the agreed profit.", bestFor: "Ventures where BACKLINE stays involved in execution and growth.", revenue: "Shared distributable profit" },
      { number: "C", title: "Equity Partnership", description: "Both parties receive ownership or equity in the new venture.", bestFor: "Long-term structures where the venture becomes a shared asset.", revenue: "Equity ownership" },
      { number: "D", title: "Joint Venture", description: "Both parties create and operate a new business together.", bestFor: "Opportunities that justify a fully shared operating structure.", revenue: "Shared ownership + operations" },
      { number: "E", title: "Hybrid Partnership", description: "A combination of service fee, equity and profit share — suitable when BACKLINE is committing significant time, resources, expertise and long-term execution.", bestFor: "Ventures requiring sustained, high-commitment execution.", revenue: "Fee + equity + profit share" },
    ],
  },
  {
    slug: "business-partner",
    number: "02",
    title: "Business Management",
    headline: "We don't only build businesses. We can also fix and operate them.",
    summary:
      "Many entrepreneurs have a good business but face management problems. BACKLINE VENTURES can step in as an operating and management partner — diagnosing what's slowing growth, then planning, executing, measuring and optimising alongside the existing team.",
    forWho: [
      "Businesses with customers, products and revenue already in place",
      "Owners without the time to manage day-to-day operations",
      "Businesses with team, SOP or reporting gaps",
      "Businesses with weak marketing or sales systems",
    ],
    left: {
      label: "What's already working",
      items: ["Customers", "Products", "Revenue", "Employees", "Infrastructure"],
    },
    right: {
      label: "What's holding growth back",
      items: [
        "Poor management",
        "Lack of time",
        "Weak marketing",
        "Poor sales systems",
        "Team issues",
        "No SOPs",
        "Lack of reporting",
        "Poor financial control",
        "Weak customer experience",
        "No growth strategy",
      ],
    },
    process: [
      { number: "01", title: "Diagnose", description: "We study finance, sales, marketing, operations, team, products, customers, technology, competition and processes." },
      { number: "02", title: "Plan", description: "We create the business strategy, growth strategy, marketing plan, sales plan, operational plan, team structure and KPI system." },
      { number: "03", title: "Execute", description: "We implement the plan — marketing, sales, hiring, SOP development, technology, customer systems, management systems and reporting." },
      { number: "04", title: "Measure", description: "We track revenue, profit, leads, sales, conversion, customer acquisition, retention and operational performance." },
      { number: "05", title: "Optimize", description: "We identify what's working and what isn't, and continuously improve the system." },
      { number: "06", title: "Scale or Transition", description: "Once the business is stable, we continue as operating partner, expand the partnership, scale the business, or transfer the management system back to the owner." },
    ],
  },
  {
    slug: "venture-incubation",
    number: "03",
    title: "Venture Incubation",
    headline: "From idea to business.",
    summary:
      "Designed for entrepreneurs, founders, product creators and early-stage startups. A founder may have a great product but lack the research, strategy, branding, technology or team to bring it to market — BACKLINE VENTURES helps develop the opportunity.",
    forWho: ["Entrepreneurs", "Founders", "Product creators", "Early-stage startups", "New business concepts"],
    left: {
      label: "What the founder has",
      items: ["A promising product or idea"],
    },
    right: {
      label: "What's often missing",
      items: [
        "Market research",
        "Business strategy",
        "Branding",
        "Technology",
        "Marketing",
        "Team",
        "Capital",
        "Sales channels",
        "Business structure",
      ],
    },
    process: [
      { number: "01", title: "Idea", description: "We understand the concept and the opportunity." },
      { number: "02", title: "Research", description: "We study the market, customer, competition, pricing, demand and trends." },
      { number: "03", title: "Validate", description: "We test whether customers actually want the product or service." },
      { number: "04", title: "Strategy", description: "We build the business model, positioning, pricing, go-to-market strategy and financial plan." },
      { number: "05", title: "Build", description: "We develop the brand, product, technology, marketing assets and sales systems." },
      { number: "06", title: "Launch", description: "We enter the market with a controlled launch." },
      { number: "07", title: "Measure", description: "We track real market performance." },
      { number: "08", title: "Scale", description: "We invest additional resources only once the model demonstrates potential." },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}