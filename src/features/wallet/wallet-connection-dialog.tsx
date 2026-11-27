"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ArrowRightLeft,
  Check,
  Copy,
  LoaderCircle,
  Wallet,
  X,
} from "lucide-react";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import {
  defaultWalletNetwork,
  getWalletNetwork,
  shortenWalletAddress,
  walletNetworks,
} from "@/services/wallet/wallet-connector";
import type { WalletConnection } from "./use-wallet-connection";

type WalletConnectionDialogProps = {
  connection: WalletConnection;
  connectorAvailable: boolean;
  onClose: () => void;
  onConnect: () => void;
  onDisconnect: () => void;
  onSwitchNetwork: (chainId: number) => void;
};

function getAccount(connection: WalletConnection) {
  if (
    connection.status === "connected" ||
    connection.status === "switching" ||
    connection.status === "disconnecting"
  ) {
    return connection.account;
  }
  return undefined;
}

export function WalletConnectionDialog({
  connection,
  connectorAvailable,
  onClose,
  onConnect,
  onDisconnect,
  onSwitchNetwork,
}: WalletConnectionDialogProps) {
  const [selectedChainId, setSelectedChainId] = useState(defaultWalletNetwork.chainId);
  const [clipboardNotice, setClipboardNotice] = useState("");
  const account = getAccount(connection);
  const selectedNetwork =
    walletNetworks.find((network) => network.chainId === selectedChainId) ??
    defaultWalletNetwork;
  const activeNetwork = account ? getWalletNetwork(account.chainId) : undefined;
  const isBusy =
    connection.status === "connecting" ||
    connection.status === "switching" ||
    connection.status === "disconnecting";
  const wrongNetwork = Boolean(account && account.chainId !== selectedChainId);
  const connectionError =
    connection.status === "error"
      ? connection.message
      : connection.status === "connected"
        ? connection.error
        : undefined;

  async function copyAddress() {
    if (!account) return;
    try {
      await copyToClipboard(account.address);
      setClipboardNotice("Public wallet address copied.");
    } catch (error) {
      const detail =
        error instanceof Error ? error.message : "Unexpected clipboard failure.";
      setClipboardNotice(`Unable to copy the wallet address: ${detail}`);
    }
  }

  return (
    <div
      className="wallet-dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="wallet-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wallet-dialog-title"
      >
        <header className="wallet-dialog-heading">
          <div className="wallet-dialog-icon"><Wallet size={17} aria-hidden="true" /></div>
          <div>
            <span className="auth-eyebrow">WALLET ACCESS</span>
            <h2 id="wallet-dialog-title">Wallet connection</h2>
            <p>Connection shares public address and network only. It does not sign you in.</p>
          </div>
          <button type="button" className="icon-button" aria-label="Close wallet dialog" onClick={onClose}>
            <X size={17} aria-hidden="true" />
          </button>
        </header>

        <div className="wallet-dialog-content">
          <div className="wallet-connection-status">
            <span className={`wallet-status-indicator${account ? " is-connected" : ""}`}>
              <i />
              {connection.status === "connecting"
                ? "Connecting"
                : connection.status === "disconnecting"
                  ? "Disconnecting"
                  : account
                    ? "Connected"
                    : connection.status === "error"
                      ? "Connection unavailable"
                      : "Not connected"}
            </span>
            {account && (
              <div className="wallet-address-row">
                <span>
                  <small>Public address</small>
                  <code title={account.address}>{shortenWalletAddress(account.address)}</code>
                </span>
                <button type="button" className="icon-button wallet-copy-button" onClick={() => void copyAddress()} aria-label="Copy connected wallet address">
                  <Copy size={13} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>

          {!connectorAvailable && !account && (
            <div className="wallet-unavailable-note" role="note">
              <AlertTriangle size={15} aria-hidden="true" />
              <p>
                No wallet connector is installed. The connect action will report this limitation and will not open a wallet or claim a connection.
              </p>
            </div>
          )}

          {wrongNetwork && account && (
            <div className="wallet-network-warning" role="alert">
              <AlertTriangle size={15} aria-hidden="true" />
              <p>
                <strong>Wrong network.</strong> The connected wallet is on {activeNetwork?.name ?? `Chain ${account.chainId}`}; the selected VeriStream network is {selectedNetwork.name}.
              </p>
            </div>
          )}

          {connectionError && <p className="wallet-action-error" role="alert">{connectionError}</p>}

          <section className="wallet-network-panel" aria-labelledby="wallet-network-title">
            <div className="wallet-network-panel-heading">
              <div>
                <h3 id="wallet-network-title">Network information</h3>
                <p>{account ? "Reported by the connected wallet." : "Expected network profile; no chain is connected."}</p>
              </div>
              {account && activeNetwork && <span className="wallet-network-tag">{activeNetwork.type}</span>}
            </div>
            <div className="wallet-network-facts">
              <span>Selected network</span>
              <strong>{selectedNetwork.name}</strong>
              <span>Chain ID</span>
              <code>{account ? account.chainId : selectedNetwork.chainId}</code>
            </div>
            <label className="wallet-network-select">
              <span>Switch network to</span>
              <select
                value={selectedChainId}
                onChange={(event) => setSelectedChainId(Number(event.target.value))}
                aria-label="Select target wallet network"
              >
                {walletNetworks.map((network) => (
                  <option value={network.chainId} key={network.chainId}>
                    {network.name} · {network.type}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              className="secondary-button wallet-switch-button"
              disabled={!account || !wrongNetwork || isBusy}
              onClick={() => onSwitchNetwork(selectedChainId)}
            >
              {connection.status === "switching" ? (
                <><LoaderCircle size={14} className="auth-loading-icon" aria-hidden="true" />Switching network...</>
              ) : wrongNetwork ? (
                <>Switch to {selectedNetwork.name}<ArrowRightLeft size={13} aria-hidden="true" /></>
              ) : (
                <><Check size={13} aria-hidden="true" />{account ? "Already on selected network" : "Connect a wallet to switch networks"}</>
              )}
            </button>
          </section>

          <div className="wallet-dialog-actions">
            {account ? (
              <button
                type="button"
                className="secondary-button"
                disabled={isBusy}
                onClick={onDisconnect}
              >
                {connection.status === "disconnecting" ? "Disconnecting..." : "Disconnect wallet"}
              </button>
            ) : (
              <button
                type="button"
                className="primary-button"
                disabled={isBusy}
                onClick={onConnect}
              >
                {connection.status === "connecting" ? "Connecting..." : "Connect wallet"}
              </button>
            )}
            <button type="button" className="secondary-button" onClick={onClose}>Close</button>
          </div>

          {clipboardNotice && <p className="wallet-copy-notice" role="status">{clipboardNotice}</p>}

          <p className="wallet-security-note">
            No private key or seed phrase is requested or stored. Wallet connection never signs a message or sends a transaction.
          </p>
          <p className="wallet-transaction-note">
            No transaction has been submitted. Future transaction flows will show Submitted, Pending, Confirmed, and Failed as separate states.
          </p>
        </div>
      </section>
    </div>
  );
}
