import type { PaymentStream } from "@/features/payment-streams/payment-streams-data";

const sampleHash = (digit: string) => `0x${digit.repeat(64)}`;

export const demoPaymentStreams: PaymentStream[] = [
  {
    id: "STR-DEMO-1042",
    payer: "VeriStream Labs",
    payee: "Research Alpha",
    paymentRate: 18,
    rateUnit: "hour",
    authorizedAmount: 750,
    consumedAmount: 284.5,
    status: "Active",
    startTime: "Nov 28, 2026 · 8:15 AM",
    lastSettlement: "Nov 28, 2026 · 10:30 AM",
    settlements: [
      {
        id: "SET-DEMO-204",
        settledAt: "Nov 28, 2026 · 10:30 AM",
        amount: 72,
        transactionHash: sampleHash("a"),
      },
      {
        id: "SET-DEMO-201",
        settledAt: "Nov 28, 2026 · 9:15 AM",
        amount: 54,
        transactionHash: sampleHash("b"),
      },
    ],
  },
  {
    id: "STR-DEMO-1041",
    payer: "Northstar Analytics",
    payee: "Data Oracle",
    paymentRate: 0.45,
    rateUnit: "minute",
    authorizedAmount: 420,
    consumedAmount: 196.2,
    status: "Paused",
    startTime: "Nov 27, 2026 · 2:10 PM",
    lastSettlement: "Nov 27, 2026 · 4:45 PM",
    settlements: [
      {
        id: "SET-DEMO-197",
        settledAt: "Nov 27, 2026 · 4:45 PM",
        amount: 88.2,
        transactionHash: sampleHash("c"),
      },
    ],
  },
  {
    id: "STR-DEMO-1038",
    payer: "VeriStream Labs",
    payee: "Code Sentinel",
    paymentRate: 42,
    rateUnit: "hour",
    authorizedAmount: 1000,
    consumedAmount: 1000,
    status: "Completed",
    startTime: "Nov 25, 2026 · 9:00 AM",
    lastSettlement: "Nov 25, 2026 · 1:32 PM",
    settlements: [
      {
        id: "SET-DEMO-183",
        settledAt: "Nov 25, 2026 · 1:32 PM",
        amount: 336,
        transactionHash: sampleHash("d"),
      },
    ],
  },
  {
    id: "STR-DEMO-1034",
    payer: "Meridian Research",
    payee: "QuantScope",
    paymentRate: 26.5,
    rateUnit: "hour",
    authorizedAmount: 600,
    consumedAmount: 121.25,
    status: "Cancelled",
    startTime: "Nov 22, 2026 · 11:20 AM",
    lastSettlement: "Nov 22, 2026 · 12:05 PM",
    settlements: [
      {
        id: "SET-DEMO-162",
        settledAt: "Nov 22, 2026 · 12:05 PM",
        amount: 53,
        transactionHash: sampleHash("e"),
      },
    ],
  },
];
