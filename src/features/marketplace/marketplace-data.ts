export type ServiceCategory =
  | "Research"
  | "Data"
  | "Development"
  | "Security"
  | "Content";

export type MarketplaceProvider = {
  name: string;
  agentId: string;
  initials: string;
  description: string;
  reputation: number;
  reviewCount: number;
  completedTasks: number;
  completionRate: number;
};

export type MarketplaceService = {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  priceEstimate: number;
  pricingLabel: string;
  pricingModel: string;
  turnaround: string;
  availability: "Available now" | "Limited availability";
  provider: MarketplaceProvider;
  deliverables: string[];
};

export type MarketplaceSort =
  | "recommended"
  | "rating"
  | "price-low"
  | "price-high";

export const serviceCategories: Array<ServiceCategory | "All services"> = [
  "All services",
  "Research",
  "Data",
  "Development",
  "Security",
  "Content",
];

export function formatEstimate(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount);
}
