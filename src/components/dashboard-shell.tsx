"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Bell, CircleHelp, Wallet } from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { WalletConnectionDialog } from "@/features/wallet/wallet-connection-dialog";
import { useWalletConnection } from "@/features/wallet/use-wallet-connection";
import { shortenWalletAddress } from "@/services/wallet/wallet-connector";

type DashboardShellProps = {
  title: string;
  activeItem: string;
  children: (
    showNotice: (message: string) => void,
    navigate: (label: string) => void,
  ) => ReactNode;
};

const routeByItem: Record<string, string> = {
  Dashboard: "/",
  Agents: "/agents",
  Marketplace: "/marketplace",
  "Payment Streams": "/payment-streams",
  Escrow: "/escrow",
  Transactions: "/transactions",
  Verification: "/verification",
  Analytics: "/analytics",
  "Developer Console": "/developer-console",
  Settings: "/settings",
};

export function DashboardShell({
  title,
  activeItem,
  children,
}: DashboardShellProps) {
  const router = useRouter();
  const [notice, setNotice] = useState("");
  const [walletDialogOpen, setWalletDialogOpen] = useState(false);
  const wallet = useWalletConnection();

  function navigate(label: string) {
    const route = routeByItem[label];

    if (route) {
      setNotice("");
      router.push(route);
      return;
    }

    setNotice(`${label} is not available in this demo workspace yet.`);
  }

  return (
    <div className="dashboard-shell">
      <DashboardSidebar activeItem={activeItem} onNavigate={navigate} />

      <main className="dashboard-main" id="dashboard">
        <header className="topbar">
          <div className="topbar-title">
            <span className="eyebrow">OVERVIEW</span>
            <h1>{title}</h1>
          </div>
          <div className="topbar-actions">
            <span className="network-indicator">
              <span className="avalanche-mark" aria-hidden="true">A</span>
              <span>Avalanche</span>
              <span className="network-dot" />
            </span>
            <span className="topbar-divider" />
            <button
              type="button"
              className="icon-button notification-button"
              aria-label="Notifications"
              onClick={() => setNotice("You’re all caught up on notifications.")}
            >
              <Bell size={18} aria-hidden="true" />
              <span className="notification-dot" />
            </button>
            <button
              type="button"
              className="wallet-button"
              aria-haspopup="dialog"
              onClick={() => setWalletDialogOpen(true)}
            >
              <Wallet size={16} aria-hidden="true" />
              <span>
                {wallet.connection.status === "connected"
                  ? shortenWalletAddress(wallet.connection.account.address)
                  : "Connect Wallet"}
              </span>
            </button>
            <button
              type="button"
              className="profile-button"
              aria-label="Profile: Alex Morgan"
              onClick={() =>
                setNotice("Profile settings are not available in this demo.")
              }
            >
              AM
            </button>
          </div>
        </header>

        <div className="dashboard-content">
          {notice && (
            <div className="dashboard-notice" role="status">
              <CircleHelp size={16} aria-hidden="true" />
              <span>{notice}</span>
              <button
                type="button"
                aria-label="Dismiss message"
                onClick={() => setNotice("")}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          )}
          {children(setNotice, navigate)}
        </div>
      </main>
      {walletDialogOpen && (
        <WalletConnectionDialog
          connection={wallet.connection}
          connectorAvailable={wallet.connectorAvailable}
          onClose={() => setWalletDialogOpen(false)}
          onConnect={() => void wallet.connect()}
          onDisconnect={() => void wallet.disconnect()}
          onSwitchNetwork={(chainId) => void wallet.switchNetwork(chainId)}
        />
      )}
    </div>
  );
}
