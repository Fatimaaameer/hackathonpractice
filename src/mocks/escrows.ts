import type { EscrowMetric, EscrowRecord } from "@/features/escrow/escrow-data";

const sampleHash = (digit: string) => `0x${digit.repeat(64)}`;
const sampleAddress = (digit: string) => `0x${digit.repeat(40)}`;

export const demoEscrowMetrics: EscrowMetric[] = [
  { label: "Total locked funds", amount: 16900, note: "Illustrative current ledger" },
  { label: "Available funds", amount: 22500, note: "Sample workspace balance" },
  { label: "Released funds", amount: 38700, note: "Illustrative lifetime total" },
  { label: "Refunded funds", amount: 3250, note: "Illustrative lifetime total" },
  { label: "Pending verification", amount: 2400, note: "Included in locked total" },
];

export const demoEscrows: EscrowRecord[] = [
  {
    id: "ESC-DEMO-2041",
    payer: "VeriStream Labs",
    payee: "Research Alpha",
    amount: 8400,
    status: "Locked",
    createdAt: "Nov 28, 2026",
    contractAddress: sampleAddress("1"),
    description: "Source-linked quarterly market landscape and competitor analysis.",
    releaseCondition: "Release after deliverable verification",
    milestones: [
      { id: "M1", title: "Research scope approved", amount: 2100, status: "Completed" },
      { id: "M2", title: "Draft analysis delivered", amount: 3150, status: "In progress" },
      { id: "M3", title: "Final report accepted", amount: 3150, status: "Upcoming" },
    ],
    transactions: [
      {
        id: "TX-DEMO-881",
        type: "Lock",
        amount: 8400,
        createdAt: "Nov 28, 2026 · 8:42 AM",
        hash: sampleHash("a"),
      },
    ],
    settlementHistory: [
      {
        id: "H-DEMO-881",
        event: "Escrow record initiated",
        detail: "Sample lock event; no funds were deposited.",
        createdAt: "Nov 28, 2026 · 8:42 AM",
        transactionHash: sampleHash("a"),
      },
      {
        id: "H-DEMO-882",
        event: "Milestone 1 verified",
        detail: "Scope approval recorded in demo data.",
        createdAt: "Nov 28, 2026 · 9:15 AM",
      },
    ],
  },
  {
    id: "ESC-DEMO-2040",
    payer: "Northstar Analytics",
    payee: "Data Oracle",
    amount: 2400,
    status: "Pending verification",
    createdAt: "Nov 27, 2026",
    contractAddress: sampleAddress("2"),
    description: "Normalize and validate a sample supplier dataset.",
    releaseCondition: "Release after dataset review",
    milestones: [
      { id: "M1", title: "Normalize source records", amount: 1200, status: "Completed" },
      { id: "M2", title: "Deliver validation report", amount: 1200, status: "In progress" },
    ],
    transactions: [
      {
        id: "TX-DEMO-874",
        type: "Lock",
        amount: 2400,
        createdAt: "Nov 27, 2026 · 3:26 PM",
        hash: sampleHash("b"),
      },
    ],
    settlementHistory: [
      {
        id: "H-DEMO-874",
        event: "Escrow record initiated",
        detail: "Sample lock event; no funds were deposited.",
        createdAt: "Nov 27, 2026 · 3:26 PM",
        transactionHash: sampleHash("b"),
      },
      {
        id: "H-DEMO-875",
        event: "Verification requested",
        detail: "Awaiting a demo reviewer decision.",
        createdAt: "Nov 28, 2026 · 9:02 AM",
      },
    ],
  },
  {
    id: "ESC-DEMO-2038",
    payer: "Meridian Research",
    payee: "Code Sentinel",
    amount: 4800,
    status: "Released",
    createdAt: "Nov 24, 2026",
    contractAddress: sampleAddress("3"),
    description: "Scoped software review with prioritized findings.",
    releaseCondition: "Release after review acceptance",
    milestones: [
      { id: "M1", title: "Review scope confirmed", amount: 1600, status: "Completed" },
      { id: "M2", title: "Findings delivered", amount: 3200, status: "Completed" },
    ],
    transactions: [
      {
        id: "TX-DEMO-860",
        type: "Lock",
        amount: 4800,
        createdAt: "Nov 24, 2026 · 11:10 AM",
        hash: sampleHash("c"),
      },
      {
        id: "TX-DEMO-867",
        type: "Release",
        amount: 4800,
        createdAt: "Nov 25, 2026 · 4:18 PM",
        hash: sampleHash("d"),
      },
    ],
    settlementHistory: [
      {
        id: "H-DEMO-860",
        event: "Escrow record initiated",
        detail: "Sample lock event; no funds were deposited.",
        createdAt: "Nov 24, 2026 · 11:10 AM",
        transactionHash: sampleHash("c"),
      },
      {
        id: "H-DEMO-867",
        event: "Demo release recorded",
        detail: "Sample status only; no transfer was made.",
        createdAt: "Nov 25, 2026 · 4:18 PM",
        transactionHash: sampleHash("d"),
      },
    ],
  },
  {
    id: "ESC-DEMO-2037",
    payer: "VeriStream Labs",
    payee: "BuildWorks",
    amount: 1100,
    status: "Refunded",
    createdAt: "Nov 21, 2026",
    contractAddress: sampleAddress("4"),
    description: "Small API integration prototype.",
    releaseCondition: "Release after acceptance",
    milestones: [
      { id: "M1", title: "Integration prototype", amount: 1100, status: "Completed" },
    ],
    transactions: [
      {
        id: "TX-DEMO-845",
        type: "Lock",
        amount: 1100,
        createdAt: "Nov 21, 2026 · 10:05 AM",
        hash: sampleHash("e"),
      },
      {
        id: "TX-DEMO-849",
        type: "Refund",
        amount: 1100,
        createdAt: "Nov 21, 2026 · 1:55 PM",
        hash: sampleHash("f"),
      },
    ],
    settlementHistory: [
      {
        id: "H-DEMO-845",
        event: "Escrow record initiated",
        detail: "Sample lock event; no funds were deposited.",
        createdAt: "Nov 21, 2026 · 10:05 AM",
        transactionHash: sampleHash("e"),
      },
      {
        id: "H-DEMO-849",
        event: "Demo refund recorded",
        detail: "Sample status only; no transfer was made.",
        createdAt: "Nov 21, 2026 · 1:55 PM",
        transactionHash: sampleHash("f"),
      },
    ],
  },
  {
    id: "ESC-DEMO-2035",
    payer: "Northstar Analytics",
    payee: "QuantScope",
    amount: 6100,
    status: "Locked",
    createdAt: "Nov 20, 2026",
    contractAddress: sampleAddress("5"),
    description: "Portfolio exposure snapshot using provided sample data.",
    releaseCondition: "Milestone review",
    milestones: [
      { id: "M1", title: "Data source check", amount: 1830, status: "Completed" },
      { id: "M2", title: "Exposure analysis", amount: 2440, status: "In progress" },
      { id: "M3", title: "Final snapshot", amount: 1830, status: "Upcoming" },
    ],
    transactions: [
      {
        id: "TX-DEMO-839",
        type: "Lock",
        amount: 6100,
        createdAt: "Nov 20, 2026 · 2:37 PM",
        hash: sampleHash("7"),
      },
    ],
    settlementHistory: [
      {
        id: "H-DEMO-839",
        event: "Escrow record initiated",
        detail: "Sample lock event; no funds were deposited.",
        createdAt: "Nov 20, 2026 · 2:37 PM",
        transactionHash: sampleHash("7"),
      },
    ],
  },
];
