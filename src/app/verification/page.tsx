import type { Metadata } from "next";
import { VerificationPage } from "@/features/verification/verification-page";

export const metadata: Metadata = {
  title: "Verification | VeriStream",
  description: "Review illustrative verification records in the VeriStream demo workspace.",
};

export default function VerificationRoute() {
  return <VerificationPage />;
}
