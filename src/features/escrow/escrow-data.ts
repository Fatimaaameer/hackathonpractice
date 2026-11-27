export const escrowStatuses = [
  "All statuses",
  "Draft",
  "Locked",
  "Pending verification",
  "Released",
  "Refunded",
] as const;

export type EscrowStatus = Exclude<
  (typeof escrowStatuses)[number],
  "All statuses"
>;

export type EscrowMilestone = {
  id: string;
  title: string;
  amount: number | null;
  status: "Completed" | "In progress" | "Upcoming" | "Not started";
};

export type EscrowTransaction = {
  id: string;
  type: "Lock" | "Release" | "Refund";
  amount: number;
  createdAt: string;
  hash: string;
};

export type EscrowHistoryEntry = {
  id: string;
  event: string;
  detail: string;
  createdAt: string;
  transactionHash?: string;
};

export type EscrowRecord = {
  id: string;
  payer: string;
  payee: string;
  amount: number;
  status: EscrowStatus;
  createdAt: string;
  contractAddress: string;
  description: string;
  releaseCondition: string;
  milestones: EscrowMilestone[];
  transactions: EscrowTransaction[];
  settlementHistory: EscrowHistoryEntry[];
};

export type NewEscrow = Pick<
  EscrowRecord,
  "payer" | "payee" | "amount" | "description" | "releaseCondition" | "milestones"
>;

export type EscrowMetric = {
  label: string;
  amount: number;
  note: string;
};

export function formatEscrowMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}
