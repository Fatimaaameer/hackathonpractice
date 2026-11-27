import type { Metadata } from "next";
import { AnalyticsPage } from "@/features/analytics/analytics-page";

export const metadata: Metadata = {
  title: "Analytics | VeriStream",
  description: "Explore illustrative VeriStream analytics in the demo workspace.",
};

export default function AnalyticsRoute() {
  return <AnalyticsPage />;
}
