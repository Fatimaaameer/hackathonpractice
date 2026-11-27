export const transactionTypes = [
  "All types",
  "Stream settlement",
  "Escrow funding",
  "Escrow release",
  "Escrow refund",
] as const;

export type TransactionType = Exclude<
  (typeof transactionTypes)[number],
  "All types"
>;

export const transactionStatuses = [
  "All statuses",
  "Pending",
  "Confirmed",
  "Failed",
  "Reverted",
] as const;

export type TransactionStatus = Exclude<
  (typeof transactionStatuses)[number],
  "All statuses"
>;

export type TransactionEvidence = {
  id: string;
  title: string;
  summary: string;
  reference: string | null;
};

export type TransactionEvent = {
  id: string;
  event: string;
  timestamp: string;
  detail: string;
};

export type TransactionRecord = {
  id: string;
  type: TransactionType;
  payer: string;
  payee: string;
  amount: number;
  network: string;
  status: TransactionStatus;
  timestamp: string;
  transactionHash: string;
  blockNumber: number | null;
  contractAddress: string | null;
  associatedRecord: { type: "Escrow" | "Payment Stream"; id: string } | null;
  verificationEvidence: TransactionEvidence[];
  eventHistory: TransactionEvent[];
  explorerUrl: string | null;
};

export function formatTransactionAmount(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function getValidExplorerUrl(value: string | null): string | null {
  if (!value) return null;

  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname ? url.toString() : null;
  } catch {
    return null;
  }
}
