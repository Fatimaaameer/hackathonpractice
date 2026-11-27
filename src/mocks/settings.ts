export const demoProfile = {
  fullName: "Alex Morgan",
  email: "alex@example.test",
  organization: "VeriStream Labs",
};

export const demoAccountPreferences = {
  language: "English",
  currency: "USD",
  timezone: "UTC",
};

export const accountPreferenceOptions = {
  languages: ["English", "Spanish", "French"],
  currencies: ["USD", "EUR", "GBP"],
  timezones: ["UTC", "America/New_York", "Europe/London"],
} as const;

export const demoNotificationPreferences = [
  {
    id: "task-updates",
    label: "Task updates",
    description: "Completion and verification status changes.",
    enabled: true,
  },
  {
    id: "payment-events",
    label: "Payment events",
    description: "Settlement, refund, and escrow status changes.",
    enabled: true,
  },
  {
    id: "security-alerts",
    label: "Security alerts",
    description: "Sign-in and account security notifications.",
    enabled: true,
  },
] as const;

export const demoNetworkPreferences = [
  "Avalanche Fuji (testnet)",
  "Avalanche C-Chain (mainnet)",
  "Ethereum Sepolia (testnet)",
] as const;

export const demoWallet = {
  address: "0x0123456789abcdef0123456789abcdef01234567",
  label: "Demo wallet profile",
};

export const demoSessions = [
  {
    id: "session-current",
    device: "Windows · Current browser",
    location: "This device",
    current: true,
    status: "Active",
  },
  {
    id: "session-sample",
    device: "macOS · Sample session",
    location: "Demo location",
    current: false,
    status: "Active",
  },
] as const;
