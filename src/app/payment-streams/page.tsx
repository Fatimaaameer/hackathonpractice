import type { Metadata } from "next";
import { PaymentStreamsPage } from "@/features/payment-streams/payment-streams-page";

export const metadata: Metadata = {
  title: "Payment Streams | VeriStream",
  description: "Review illustrative payment stream accounting in the VeriStream demo workspace.",
};

export default function PaymentStreamsRoute() {
  return <PaymentStreamsPage />;
}
