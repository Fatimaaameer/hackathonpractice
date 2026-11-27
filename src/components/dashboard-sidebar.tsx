"use client";

import { ArrowLeftFromLine, CircleHelp, Hexagon } from "lucide-react";
import Link from "next/link";
import { navigationItems } from "@/features/dashboard/dashboard-data";

const routeByLabel: Record<string, string> = {
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

type DashboardSidebarProps = {
  activeItem: string;
  onNavigate: (label: string) => void;
};

export function DashboardSidebar({
  activeItem,
  onNavigate,
}: DashboardSidebarProps) {
  return (
    <aside className="dashboard-sidebar">
      <Link
        className="brand-lockup"
        href="/"
        aria-label="VeriStream dashboard"
      >
        <span className="brand-mark" aria-hidden="true">
          <Hexagon size={20} strokeWidth={2.2} />
          <span />
        </span>
        <span className="brand-name">Veri<span>Stream</span></span>
      </Link>

      <div className="sidebar-workspace">
        <span className="workspace-avatar">VS</span>
        <span className="workspace-name">VeriStream Labs</span>
        <span className="workspace-plan">PRO</span>
      </div>

      <p className="sidebar-section-label">WORKSPACE</p>
      <nav className="sidebar-nav" aria-label="Main navigation">
        {navigationItems.map(({ label, icon: Icon }) => {
          const className = `sidebar-link${activeItem === label ? " is-active" : ""}`;
          const content = (
            <>
              <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
              <span>{label}</span>
              {label === "Payment Streams" && (
                <span className="nav-count" aria-label="3 active streams">3</span>
              )}
            </>
          );

          const route = routeByLabel[label];
          if (route) {
            return (
              <Link
                href={route}
                key={label}
                className={className}
                aria-current={activeItem === label ? "page" : undefined}
              >
                {content}
              </Link>
            );
          }

          return (
            <button
              type="button"
              key={label}
              className={className}
              onClick={() => onNavigate(label)}
              aria-current={activeItem === label ? "page" : undefined}
            >
              {content}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="network-health">
          <span className="health-dot" />
          <div>
            <span className="health-title">All systems operational</span>
            <span className="health-caption">Network status</span>
          </div>
        </div>
        <button className="sidebar-link utility-link" type="button" onClick={() => onNavigate("Help & support")}>
          <CircleHelp size={18} strokeWidth={1.8} aria-hidden="true" />
          <span>Help &amp; support</span>
        </button>
        <button className="collapse-link" type="button" onClick={() => onNavigate("Sidebar collapse")}>
          <ArrowLeftFromLine size={17} aria-hidden="true" />
          <span>Collapse sidebar</span>
        </button>
      </div>
    </aside>
  );
}
