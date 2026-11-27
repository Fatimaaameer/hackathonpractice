import type { Metadata } from "next";
import { TransactionsPage } from "@/features/transactions/transactions-page";

export const metadata: Metadata = {
  title: "Transactions | VeriStream",
  description: "Review illustrative transaction records in the VeriStream demo workspace.",
};

export default function TransactionsRoute() {
  return <TransactionsPage />;
}
