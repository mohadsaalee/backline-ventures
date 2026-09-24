export const buildOutcomes: string[] = [
  "New Ventures",
  "New Brands",
  "New Products",
  "New Markets",
  "New Channels",
  "New Business Models",
  "Digital Ventures",
  "Growth Platforms",
];

export type Capability = {
  title: string;
  description: string;
};

export const capabilities: Capability[] = [
  { title: "Strategy", description: "Business planning, growth strategy and business model design." },
  { title: "Research", description: "Market, customer and competitor research behind every venture." },
  { title: "Product", description: "Product positioning, development support and pricing." },
  { title: "Brand", description: "Naming, identity, packaging and brand guidelines." },
  { title: "Technology", description: "Website, e-commerce, automation and digital systems." },
  { title: "Marketing", description: "Performance marketing, content and customer acquisition." },
  { title: "Sales", description: "Sales strategy, systems, CRM and conversion." },
  { title: "Operations", description: "SOPs, team structure, hiring and process management." },
  { title: "People", description: "Team building and hiring across every venture stage." },
  { title: "Distribution", description: "Channel strategy, logistics and market reach." },
  { title: "Finance", description: "Financial modelling, unit economics and reporting." },
  { title: "Growth", description: "New markets, new products, export and expansion." },
];

export type OpportunityMapColumn = {
  label: string;
  items: string[];
};

export const opportunityMap: OpportunityMapColumn[] = [
  {
    label: "Existing Business",
    items: ["Customers", "Product", "Capital", "Manufacturing", "Distribution", "Knowledge"],
  },
  {
    label: "Untapped Opportunity",
    items: ["New Customer", "New Product", "New Market", "New Channel", "New Brand", "New Model"],
  },
  {
    label: "BACKLINE",
    items: ["Discover", "Validate", "Build", "Scale"],
  },
  {
    label: "New Venture",
    items: [],
  },
];