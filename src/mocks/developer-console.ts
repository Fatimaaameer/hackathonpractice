export const demoApiKey = {
  label: "Workspace demo key",
  maskedValue: "vs_demo_****************",
  createdAt: "Nov 18, 2026",
};

export const developerApiOverview = [
  {
    method: "GET",
    path: "/v1/agents",
    description: "List registered agents and their current status.",
  },
  {
    method: "POST",
    path: "/v1/agents",
    description: "Submit an agent registration request.",
  },
  {
    method: "POST",
    path: "/v1/tasks",
    description: "Create a task request for a marketplace service.",
  },
  {
    method: "GET",
    path: "/v1/transactions/{id}",
    description: "Retrieve a transaction and its verification references.",
  },
] as const;

export const agentRegistrationExample = `const response = await fetch(
  "https://api.demo.veristream.example/v1/agents",
  {
    method: "POST",
    headers: {
      "Authorization": \`Bearer \${process.env.VERISTREAM_API_KEY}\`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Research Alpha",
      walletAddress: "0xYOUR_PUBLIC_WALLET_ADDRESS",
      category: "Research",
    }),
  },
);

if (!response.ok) {
  throw new Error(\`Registration failed: \${response.status}\`);
}

const agent = await response.json();`;

export const demoContractAddresses = [
  {
    name: "Agent Registry",
    network: "Avalanche Fuji · illustrative",
    address: "0x1111111111111111111111111111111111111111",
  },
  {
    name: "Escrow Vault",
    network: "Avalanche Fuji · illustrative",
    address: "0x2222222222222222222222222222222222222222",
  },
  {
    name: "Settlement Router",
    network: "Avalanche Fuji · illustrative",
    address: "0x3333333333333333333333333333333333333333",
  },
] as const;

export const demoNetworkProfiles = [
  {
    name: "Avalanche Fuji",
    chainId: "43113",
    networkType: "Testnet",
    status: "Reference profile",
  },
  {
    name: "Avalanche C-Chain",
    chainId: "43114",
    networkType: "Mainnet",
    status: "Reference profile",
  },
  {
    name: "Ethereum Sepolia",
    chainId: "11155111",
    networkType: "Testnet",
    status: "Reference profile",
  },
] as const;

export const demoWebhookUrl = "https://example.test/webhooks/veristream";

export const demoWebhookEvents = [
  { id: "task.completed", label: "Task completed", enabled: true },
  { id: "verification.updated", label: "Verification updated", enabled: true },
  { id: "payment.settled", label: "Payment settled", enabled: false },
] as const;

export const demoApiRequestLogs = [
  {
    id: "req_demo_001",
    method: "GET",
    path: "/v1/agents",
    status: 200,
    duration: "84 ms",
    time: "2 min ago",
  },
  {
    id: "req_demo_002",
    method: "POST",
    path: "/v1/tasks",
    status: 202,
    duration: "126 ms",
    time: "18 min ago",
  },
  {
    id: "req_demo_003",
    method: "GET",
    path: "/v1/transactions/tx_demo_8f2a",
    status: 200,
    duration: "61 ms",
    time: "1 hr ago",
  },
  {
    id: "req_demo_004",
    method: "POST",
    path: "/v1/agents",
    status: 401,
    duration: "22 ms",
    time: "3 hr ago",
  },
] as const;
