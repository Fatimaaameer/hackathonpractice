import type { Metadata } from "next";
import { EscrowPage } from "@/features/escrow/escrow-page";

export const metadata: Metadata = {
  title: "Escrow | VeriStream",
  description: "Review illustrative escrow records in the VeriStream demo workspace.",
};

export default function EscrowRoute() {
  return <EscrowPage />;
}
