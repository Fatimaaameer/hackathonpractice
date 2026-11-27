export type WalletAccount = {
  address: string;
  chainId: number;
};

export type WalletNetwork = {
  chainId: number;
  name: string;
  type: "Testnet" | "Mainnet";
};

export interface WalletConnector {
  connect(): Promise<WalletAccount>;
  disconnect(): Promise<void>;
  switchChain(chainId: number): Promise<number>;
}

export const walletNetworks: WalletNetwork[] = [
  { chainId: 43113, name: "Avalanche Fuji", type: "Testnet" },
  { chainId: 43114, name: "Avalanche C-Chain", type: "Mainnet" },
  { chainId: 11155111, name: "Ethereum Sepolia", type: "Testnet" },
];

export const defaultWalletNetwork = walletNetworks[0];

export function getWalletConnector(): WalletConnector | null {
  return null;
}

export function getWalletNetwork(chainId: number): WalletNetwork | undefined {
  return walletNetworks.find((network) => network.chainId === chainId);
}

export function shortenWalletAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
