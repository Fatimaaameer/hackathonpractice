import type { Metadata } from "next";
import { DeveloperConsolePage } from "@/features/developer-console/developer-console-page";

export const metadata: Metadata = {
  title: "Developer Console | VeriStream",
  description: "Explore illustrative VeriStream API and integration settings.",
};

export default function DeveloperConsoleRoute() {
  return <DeveloperConsolePage />;
}
