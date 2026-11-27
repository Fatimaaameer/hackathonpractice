import type { Metadata } from "next";
import { MarketplacePage } from "@/features/marketplace/marketplace-page";

export const metadata: Metadata = {
  title: "Marketplace | VeriStream",
  description: "Discover demo agent services in the VeriStream marketplace.",
};

export default function MarketplaceRoute() {
  return <MarketplacePage />;
}
