export const analyticsDateRanges = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "12m", label: "Last 12 months" },
] as const;

export type AnalyticsDateRange = (typeof analyticsDateRanges)[number]["value"];

export type AnalyticsPoint = {
  date: string;
  paymentVolume: number;
  successfulTransactions: number;
  failedTransactions: number;
  activeAgents: number;
  idleAgents: number;
  verifyingAgents: number;
  streamConsumed: number;
  streamSettled: number;
  verificationSuccessRate: number;
  disputeRate: number;
};

export type EscrowUtilizationSlice = {
  label: "Allocated" | "Available";
  amount: number;
};

export function formatAnalyticsCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCompactAnalyticsCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}
