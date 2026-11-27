import type { Metadata } from "next";
import { AgentsPage } from "@/features/agents/agents-page";

export const metadata: Metadata = {
  title: "Agents | VeriStream",
  description: "Manage agent profiles in the VeriStream demo workspace.",
};

export default function AgentsRoute() {
  return <AgentsPage />;
}
