export type Partnership = {
  number: string;
  slug: string;
  title: string;
  headline: string;
  description: string;
  capabilities: string[];
};

export const partnerships: Partnership[] = [
  {
    number: "01",
    slug: "venture-partner",
    title: "Venture Partner",
    headline: "Build what's next, together.",
    description:
      "We partner with established businesses to identify the opportunities their existing strengths can't yet reach, and build a new venture — a new brand, product line or channel — around them.",
    capabilities: [
      "New Ventures",
      "New Brands",
      "New Products",
      "New Markets",
      "New Channels",
      "D2C",
      "E-commerce",
      "Business Models",
      "Joint Ventures",
      "Venture Development",
      "Market Expansion",
      "Export Opportunities",
    ],
  },
  {
    number: "02",
    slug: "managing-partner",
    title: "Managing Partner",
    headline: "Strengthen what's already working.",
    description:
      "For businesses that already have customers, products and revenue but are held back by management gaps, we step in as an operating partner — diagnosing, planning, executing and measuring alongside the existing team.",
    capabilities: [
      "Business Strategy",
      "Business Management",
      "Growth Strategy",
      "Operations",
      "SOPs",
      "Sales Systems",
      "Marketing Systems",
      "Brand Management",
      "Product Strategy",
      "Technology",
      "Digital Transformation",
      "Team Building",
      "Business Development",
      "Market Expansion",
      "Performance Improvement",
    ],
  },
  {
    number: "03",
    slug: "venture-incubation",
    title: "Venture Incubation",
    headline: "From idea to business.",
    description:
      "For founders and early-stage teams with a promising product but no market research, brand, technology or go-to-market plan, we help develop the opportunity — from validation through to a controlled launch.",
    capabilities: [
      "Idea Validation",
      "Market Research",
      "Branding",
      "Go-to-Market Strategy",
      "Early-Stage Support",
      "Product Development",
      "Sales Channels",
      "Business Structure",
    ],
  },
];

export type PartnershipModel = {
  number: string;
  title: string;
  description: string;
  bestFor: string;
  revenue: string;
};

export const partnershipModels: PartnershipModel[] = [
  {
    number: "01",
    title: "Venture Development",
    description:
      "The partner owns the venture outright. We're engaged to develop and execute it — strategy, brand, technology, marketing and operations — for a defined fee.",
    bestFor: "Businesses that want full ownership and a defined engagement.",
    revenue: "Development fee + management fee",
  },
  {
    number: "02",
    title: "Profit Partnership",
    description:
      "We build and operate the venture together. The partner contributes agreed resources, we contribute agreed capabilities, and we're paid a lower upfront fee against a share of profit.",
    bestFor: "Ventures where BACKLINE stays involved in execution and growth.",
    revenue: "Lower upfront fee + profit share",
  },
  {
    number: "03",
    title: "Venture Partnership",
    description:
      "A joint venture or equity partnership where both parties hold a stake in the new business, split according to capital, assets, IP and execution responsibility contributed by each side.",
    bestFor: "Long-term structures where the venture becomes a shared asset.",
    revenue: "Equity + profit distribution + possible management fee",
  },
];

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  { number: "01", title: "Business Audit", description: "We study the existing business — products, customers, revenue, margins, manufacturing, distribution, brand, digital presence, team and unused assets — to map where real opportunity sits." },
  { number: "02", title: "Opportunity Discovery", description: "We investigate market trends, consumer behaviour, competitors, pricing gaps and digital or geographic openings to build a portfolio of possible growth opportunities." },
  { number: "03", title: "Validation", description: "Not every idea becomes a venture. We test customer demand, product-market fit, price acceptance, margin and distribution feasibility before committing further." },
  { number: "04", title: "Venture Design", description: "We design the complete blueprint — business model, audience, product, brand, pricing, positioning, technology, team and financial model." },
  { number: "05", title: "Partnership Structure", description: "Before we build, both parties agree investment, equity, profit sharing, responsibilities, governance, IP ownership and exit mechanism — in writing." },
  { number: "06", title: "Build", description: "We bring together product, brand, packaging, technology, marketing systems, sales systems, hiring and SOPs to build the venture." },
  { number: "07", title: "Pilot", description: "We launch at a controlled scale and measure sales, acquisition, conversion, repeat purchase, margin and customer feedback before scaling further." },
  { number: "08", title: "Scale", description: "Once the venture proves its economics, we scale marketing, distribution, team, product range, geography and channel." },
];

export type Principle = {
  number: string;
  title: string;
  description: string;
};

export const principles: Principle[] = [
  { number: "01", title: "Existing Strength", description: "We don't start from a blank page. We build from the manufacturing, products, capital, customers and knowledge a business already has." },
  { number: "02", title: "Integrated Execution", description: "Strategy is connected to actual execution — one team carrying an opportunity from research through to an operating business, not a stack of recommendations handed off to someone else." },
  { number: "03", title: "Shared Risk", description: "Where the structure allows, we put our own fee, time or capital behind the venture — so both sides have a real reason to make it work." },
  { number: "04", title: "Shared Growth", description: "We're built to win when the venture wins — through profit share, equity or long-term operating partnership, not a single invoice." },
];

export type Risk = {
  risk: string;
  mitigation: string;
};

export const risks: Risk[] = [
  { risk: "Partner disagreement on pricing, product, marketing or hiring decisions", mitigation: "Clear governance and decision rights agreed before the venture is built." },
  { risk: "Committing significant time without adequate cash flow", mitigation: "A blend of development fee, operating fee and equity or profit share, sized to the engagement." },
  { risk: "The new venture fails to find real customer demand", mitigation: "Validation before large investment — we test before we build." },
  { risk: "The venture requires more capital than originally planned", mitigation: "Milestone-based funding, released as each stage is proven." },
  { risk: "Disagreement over what counts as distributable profit", mitigation: "Accounting rules, cost treatment and distribution terms defined in the partnership agreement." },
  { risk: "Disputes over brand, IP or customer-data ownership", mitigation: "Ownership defined and documented before launch, not after." },
  { risk: "The new venture simply moves existing customers rather than winning new ones", mitigation: "A clearly defined new-market thesis, with incremental customers measured from day one." },
];

export const idealPartners: string[] = [
  "Established Manufacturers",
  "Family-Owned Businesses",
  "SME Owners",
  "Promoter-Led Businesses",
  "Consumer Brands",
  "FMCG Companies",
  "Food Businesses",
  "Product Manufacturers",
  "Offline Businesses",
  "Businesses Entering Digital",
  "Businesses Entering New Markets",
  "Strong Products, Weak Branding",
  "Entrepreneurs With Promising Products",
  "Early-Stage Founders",
  "Businesses Requiring Professional Management",
];

export type SelectionCriterion = {
  number: string;
  title: string;
  question: string;
};

export const selectionCriteria: SelectionCriterion[] = [
  { number: "01", title: "Business Strength", question: "Does the business have a genuine foundation?" },
  { number: "02", title: "Market Opportunity", question: "Is there a real customer opportunity?" },
  { number: "03", title: "Product Potential", question: "Can the product compete?" },
  { number: "04", title: "Financial Capability", question: "Can the venture receive adequate working capital?" },
  { number: "05", title: "Owner Mindset", question: "Is the partner willing to collaborate professionally?" },
  { number: "06", title: "Strategic Fit", question: "Does the opportunity match BACKLINE's capabilities?" },
  { number: "07", title: "Growth Potential", question: "Can the venture become significantly larger?" },
  { number: "08", title: "Governance", question: "Can both parties agree on responsibilities and decision-making?" },
];