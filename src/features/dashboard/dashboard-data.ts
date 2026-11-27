import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BadgeCheck,
  Bot,
  ChartNoAxesCombined,
  CodeXml,
  LayoutDashboard,
  Radio,
  Settings,
  ShieldCheck,
  Store,
  WalletCards,
} from "lucide-react";

export type DashboardMetric = {
  label: string;
  value: string;
  change: string;
  direction: "up" | "down";
  icon: LucideIcon;
};

export type Transaction = {
  id: string;
  agent: string;
  initials: string;
  amount: string;
  status: "Settled" | "In escrow" | "Processing";
  timestamp: string;
};

export type AgentActivity = {
  name: string;
  initials: string;
  task: string;
  status: "Working" | "Idle" | "Verifying";
  color: string;
};

export type NavigationItem = {
  label: string;
  icon: LucideIcon;
};

export const navigationItems: NavigationItem[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Agents", icon: Bot },
  { label: "Marketplace", icon: Store },
  { label: "Payment Streams", icon: Radio },
  { label: "Escrow", icon: ShieldCheck },
  { label: "Transactions", icon: WalletCards },
  { label: "Verification", icon: BadgeCheck },
  { label: "Analytics", icon: ChartNoAxesCombined },
  { label: "Developer Console", icon: CodeXml },
  { label: "Settings", icon: Settings },
];

export const dashboardMetrics: DashboardMetric[] = [
  {
    label: "Total Escrow Balance",
    value: "$248,590.00",
    change: "12.8% this month",
    direction: "up",
    icon: ShieldCheck,
  },
  {
    label: "Total Payments",
    value: "$1,284,320",
    change: "8.2% this month",
    direction: "up",
    icon: ArrowUpRight,
  },
  {
    label: "Active Agents",
    value: "128",
    change: "14 new this week",
    direction: "up",
    icon: Bot,
  },
  {
    label: "Successful Settlements",
    value: "2,841",
    change: "0.4% this month",
    direction: "down",
    icon: BadgeCheck,
  },
];

export const recentTransactions: Transaction[] = [
  {
    id: "TX-8F2A91",
    agent: "Research Alpha",
    initials: "RA",
    amount: "$2,450.00",
    status: "Settled",
    timestamp: "Today, 10:42 AM",
  },
  {
    id: "TX-7D1B84",
    agent: "Data Oracle",
    initials: "DO",
    amount: "$890.50",
    status: "In escrow",
    timestamp: "Today, 10:18 AM",
  },
  {
    id: "TX-6C3E72",
    agent: "Code Sentinel",
    initials: "CS",
    amount: "$1,200.00",
    status: "Processing",
    timestamp: "Today, 09:56 AM",
  },
  {
    id: "TX-5A9F36",
    agent: "Market Scout",
    initials: "MS",
    amount: "$340.00",
    status: "Settled",
    timestamp: "Today, 09:32 AM",
  },
  {
    id: "TX-4E2D17",
    agent: "Signal Analyst",
    initials: "SA",
    amount: "$675.25",
    status: "Settled",
    timestamp: "Today, 09:14 AM",
  },
];

export const agentActivity: AgentActivity[] = [
  {
    name: "Research Alpha",
    initials: "RA",
    task: "Market research · 4 min ago",
    status: "Working",
    color: "blue",
  },
  {
    name: "Data Oracle",
    initials: "DO",
    task: "Data enrichment · 12 min ago",
    status: "Working",
    color: "cyan",
  },
  {
    name: "Code Sentinel",
    initials: "CS",
    task: "Contract audit · 18 min ago",
    status: "Verifying",
    color: "violet",
  },
  {
    name: "Market Scout",
    initials: "MS",
    task: "Waiting for a task",
    status: "Idle",
    color: "amber",
  },
];

export const agentAvatars = [
  { initials: "RA", className: "node-blue", x: 50, y: 14 },
  { initials: "DO", className: "node-cyan", x: 75, y: 30 },
  { initials: "CS", className: "node-violet", x: 81, y: 67 },
  { initials: "MS", className: "node-blue", x: 62, y: 83 },
  { initials: "SA", className: "node-cyan", x: 37, y: 83 },
  { initials: "VA", className: "node-violet", x: 19, y: 65 },
  { initials: "OA", className: "node-blue", x: 25, y: 31 },
];
