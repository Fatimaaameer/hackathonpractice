export type AgentStatus = "Active" | "Inactive" | "Pending";
export type AgentFilter = AgentStatus | "All";

export type AgentTask = {
  title: string;
  status: "Completed" | "In review" | "Escrowed";
  date: string;
};

export type AgentRecord = {
  id: string;
  name: string;
  wallet: string;
  category: string;
  status: AgentStatus;
  reputation: number | null;
  transactionCount: number;
  lastActivity: string;
  spendingLimit: string;
  permissions: string[];
  taskHistory: AgentTask[];
};

export const agentCategories = [
  "Research",
  "Data",
  "Development",
  "Finance",
  "Security",
  "Other",
];

export const agentPermissions = [
  "Read task listings",
  "Submit task results",
  "Initiate payment requests",
  "Use escrow",
];

export const agentFilters: AgentFilter[] = [
  "All",
  "Active",
  "Inactive",
  "Pending",
];

export function shortenWallet(wallet: string) {
  if (wallet.length <= 16) return wallet;
  return `${wallet.slice(0, 8)}…${wallet.slice(-6)}`;
}

export function agentInitials(name: string) {
  const words = name.trim().split(/\s+/);
  if (words.length > 1) {
    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
  }
  return words[0].slice(0, 2).toUpperCase();
}
