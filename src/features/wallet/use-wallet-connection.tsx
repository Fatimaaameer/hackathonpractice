"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { getWalletConnector, type WalletAccount } from "@/services/wallet/wallet-connector";

export type WalletConnection =
  | { status: "disconnected" }
  | { status: "connecting" }
  | { status: "connected"; account: WalletAccount; error?: string }
  | { status: "switching"; account: WalletAccount; targetChainId: number }
  | { status: "disconnecting"; account: WalletAccount }
  | { status: "error"; message: string };

type WalletConnectionControls = ReturnType<typeof useWalletConnectionState>;

const WalletConnectionContext = createContext<WalletConnectionControls | null>(null);

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "The wallet operation failed unexpectedly.";
}

function useWalletConnectionState() {
  const [connection, setConnection] = useState<WalletConnection>({
    status: "disconnected",
  });
  const connectorAvailable = getWalletConnector() !== null;

  async function connect() {
    const connector = getWalletConnector();
    if (!connector) {
      setConnection({
        status: "error",
        message: "Wallet support is not configured in this build. No connection was made.",
      });
      return;
    }

    setConnection({ status: "connecting" });
    try {
      const account = await connector.connect();
      if (!/^0x[a-f\d]{40}$/i.test(account.address)) {
        throw new Error("The wallet returned an invalid EVM address.");
      }
      if (!Number.isSafeInteger(account.chainId) || account.chainId <= 0) {
        throw new Error("The wallet returned an invalid network identifier.");
      }
      setConnection({ status: "connected", account });
    } catch (error) {
      setConnection({ status: "error", message: errorMessage(error) });
    }
  }

  async function disconnect() {
    if (connection.status !== "connected") return;
    const account = connection.account;
    const connector = getWalletConnector();
    if (!connector) {
      setConnection({
        status: "connected",
        account,
        error: "Wallet support is unavailable; the active connection could not be changed.",
      });
      return;
    }

    setConnection({ status: "disconnecting", account });
    try {
      await connector.disconnect();
      setConnection({ status: "disconnected" });
    } catch (error) {
      setConnection({ status: "connected", account, error: errorMessage(error) });
    }
  }

  async function switchNetwork(chainId: number) {
    if (connection.status !== "connected") return;
    const account = connection.account;
    const connector = getWalletConnector();
    if (!connector) {
      setConnection({
        status: "connected",
        account,
        error: "Wallet support is unavailable; no network switch was requested.",
      });
      return;
    }

    setConnection({ status: "switching", account, targetChainId: chainId });
    try {
      const activeChainId = await connector.switchChain(chainId);
      if (activeChainId !== chainId) {
        throw new Error("The wallet did not switch to the selected network.");
      }
      setConnection({
        status: "connected",
        account: { ...account, chainId: activeChainId },
      });
    } catch (error) {
      setConnection({ status: "connected", account, error: errorMessage(error) });
    }
  }

  return { connection, connectorAvailable, connect, disconnect, switchNetwork };
}

export function WalletConnectionProvider({ children }: { children: ReactNode }) {
  const wallet = useWalletConnectionState();

  return (
    <WalletConnectionContext.Provider value={wallet}>
      {children}
    </WalletConnectionContext.Provider>
  );
}

export function useWalletConnection() {
  const wallet = useContext(WalletConnectionContext);
  if (!wallet) {
    throw new Error("useWalletConnection must be used within WalletConnectionProvider.");
  }
  return wallet;
}
