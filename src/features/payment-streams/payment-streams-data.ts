export const paymentStreamStatuses = [
  "All statuses",
  "Active",
  "Paused",
  "Completed",
  "Cancelled",
] as const;

export type PaymentStreamStatus =
  Exclude<(typeof paymentStreamStatuses)[number], "All statuses">;

export type StreamSettlement = {
  id: string;
  settledAt: string;
  amount: number;
  transactionHash: string;
};

export type PaymentStream = {
  id: string;
  payer: string;
  payee: string;
  paymentRate: number;
  rateUnit: "hour" | "minute";
  authorizedAmount: number;
  consumedAmount: number;
  status: PaymentStreamStatus;
  startTime: string;
  lastSettlement: string;
  settlements: StreamSettlement[];
};

export type NewPaymentStream = Pick<
  PaymentStream,
  "payer" | "payee" | "paymentRate" | "rateUnit" | "authorizedAmount" | "startTime"
>;

export function formatStreamMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatPaymentRate(stream: Pick<PaymentStream, "paymentRate" | "rateUnit">) {
  return `${formatStreamMoney(stream.paymentRate)} / ${stream.rateUnit}`;
}

export function getStreamRemainingAmount(stream: PaymentStream) {
  return Math.max(
    0,
    Math.round((stream.authorizedAmount - stream.consumedAmount) * 100) / 100,
  );
}

export function formatStreamStartTime(value: string) {
  if (!value.includes("T")) return value;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
