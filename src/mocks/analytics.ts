import type {
  AnalyticsDateRange,
  AnalyticsPoint,
  EscrowUtilizationSlice,
} from "@/features/analytics/analytics-data";

type AnalyticsRow = [
  date: string,
  paymentVolume: number,
  successfulTransactions: number,
  failedTransactions: number,
  activeAgents: number,
  idleAgents: number,
  verifyingAgents: number,
  streamConsumed: number,
  streamSettled: number,
  verificationSuccessRate: number,
  disputeRate: number,
];

function toPoints(rows: AnalyticsRow[]): AnalyticsPoint[] {
  return rows.map(
    ([
      date,
      paymentVolume,
      successfulTransactions,
      failedTransactions,
      activeAgents,
      idleAgents,
      verifyingAgents,
      streamConsumed,
      streamSettled,
      verificationSuccessRate,
      disputeRate,
    ]) => ({
      date,
      paymentVolume,
      successfulTransactions,
      failedTransactions,
      activeAgents,
      idleAgents,
      verifyingAgents,
      streamConsumed,
      streamSettled,
      verificationSuccessRate,
      disputeRate,
    }),
  );
}

export const demoAnalyticsByRange: Record<AnalyticsDateRange, AnalyticsPoint[]> = {
  "7d": toPoints([
    ["Nov 22", 4500, 45, 3, 78, 22, 8, 720, 680, 94.1, 3.0],
    ["Nov 23", 5100, 52, 2, 80, 21, 9, 780, 748, 95.0, 2.4],
    ["Nov 24", 4600, 48, 4, 82, 20, 8, 690, 650, 93.8, 3.5],
    ["Nov 25", 6200, 65, 3, 84, 19, 9, 910, 884, 95.6, 2.2],
    ["Nov 26", 5700, 60, 2, 83, 21, 8, 850, 820, 96.2, 1.8],
    ["Nov 27", 6800, 69, 5, 86, 18, 10, 1040, 998, 94.7, 3.1],
    ["Nov 28", 7300, 74, 2, 88, 17, 10, 1150, 1108, 97.1, 1.4],
  ]),
  "30d": toPoints([
    ["Nov 1", 28600, 290, 15, 73, 25, 7, 4200, 3970, 93.9, 3.1],
    ["Nov 7", 32100, 325, 18, 76, 24, 8, 4680, 4430, 94.8, 2.8],
    ["Nov 13", 30400, 310, 20, 79, 22, 8, 4510, 4220, 93.6, 3.7],
    ["Nov 19", 36700, 371, 16, 82, 20, 9, 5320, 5060, 95.4, 2.4],
    ["Nov 25", 40300, 412, 17, 85, 19, 9, 6110, 5810, 96.1, 2.0],
    ["Nov 28", 14200, 143, 7, 88, 17, 10, 2190, 2106, 97.1, 1.4],
  ]),
  "90d": toPoints([
    ["Sep 1", 72400, 724, 48, 61, 31, 6, 10400, 9860, 92.4, 4.0],
    ["Sep 15", 76800, 782, 43, 64, 30, 7, 11100, 10520, 93.1, 3.8],
    ["Oct 1", 81200, 824, 46, 67, 28, 7, 11900, 11240, 93.8, 3.5],
    ["Oct 15", 87900, 896, 42, 70, 27, 8, 12800, 12180, 94.0, 3.2],
    ["Nov 1", 96500, 981, 39, 73, 25, 8, 14100, 13520, 94.8, 2.8],
    ["Nov 15", 108300, 1101, 37, 79, 22, 9, 15900, 15370, 95.7, 2.5],
    ["Nov 28", 80600, 824, 31, 88, 17, 10, 12180, 11766, 96.8, 1.7],
  ]),
  "12m": toPoints([
    ["Dec '25", 198000, 2021, 134, 42, 39, 5, 28600, 26700, 91.8, 4.6],
    ["Jan '26", 214000, 2180, 126, 46, 36, 6, 30900, 29100, 92.4, 4.2],
    ["Feb '26", 227000, 2310, 119, 49, 35, 6, 32800, 31100, 92.9, 3.9],
    ["Mar '26", 246000, 2502, 113, 52, 34, 7, 35700, 33900, 93.4, 3.6],
    ["Apr '26", 263000, 2674, 109, 55, 33, 7, 38300, 36500, 93.8, 3.4],
    ["May '26", 281000, 2850, 104, 58, 31, 7, 41000, 39100, 94.2, 3.1],
    ["Jun '26", 309000, 3132, 99, 61, 30, 8, 45100, 43100, 94.7, 2.9],
    ["Jul '26", 328000, 3321, 94, 65, 28, 8, 47900, 45900, 95.0, 2.7],
    ["Aug '26", 347000, 3510, 89, 68, 27, 8, 50600, 48600, 95.4, 2.4],
    ["Sep '26", 372000, 3764, 84, 72, 25, 9, 54400, 52400, 95.8, 2.2],
    ["Oct '26", 411000, 4153, 81, 79, 22, 9, 60100, 58100, 96.2, 1.9],
    ["Nov '26", 463000, 4691, 76, 88, 17, 10, 68400, 66200, 96.8, 1.7],
  ]),
};

export const demoEscrowUtilizationByRange: Record<
  AnalyticsDateRange,
  EscrowUtilizationSlice[]
> = {
  "7d": [
    { label: "Allocated", amount: 16900 },
    { label: "Available", amount: 22500 },
  ],
  "30d": [
    { label: "Allocated", amount: 24600 },
    { label: "Available", amount: 31800 },
  ],
  "90d": [
    { label: "Allocated", amount: 47200 },
    { label: "Available", amount: 56300 },
  ],
  "12m": [
    { label: "Allocated", amount: 88400 },
    { label: "Available", amount: 102500 },
  ],
};
