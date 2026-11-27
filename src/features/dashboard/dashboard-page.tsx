"use client";

import {
  ArrowDownLeft,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Clock3,
  MoreHorizontal,
  ShieldCheck,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { agentNetworkCounts } from "./agent-network-data";
import { AgentNetworkVisualization } from "./agent-network-visualization";
import {
  agentActivity,
  dashboardMetrics,
  recentTransactions,
} from "./dashboard-data";

export function DashboardPage() {
  return (
    <DashboardShell title="Dashboard" activeItem="Dashboard">
      {(showNotice, navigate) => (
        <>
          <div className="welcome-row">
            <div>
              <h2>Good morning, Alex</h2>
              <p>Here&apos;s what&apos;s happening across your agent network.</p>
            </div>
            <div className="demo-label">
              <span className="demo-dot" />
              Demo data
            </div>
          </div>

          <section className="metrics-grid" aria-label="Overview metrics (demo data)">
            {dashboardMetrics.map(({ label, value, change, direction, icon: Icon }) => (
              <article className="metric-card" key={label}>
                <div className="metric-card-top">
                  <span>{label}</span>
                  <span className="metric-icon">
                    <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                </div>
                <p className="metric-value">{value}</p>
                <p className="metric-foot">
                  {direction === "up" ? (
                    <ArrowUpRight size={14} aria-hidden="true" />
                  ) : (
                    <ArrowDownRight size={14} aria-hidden="true" />
                  )}
                  <span className={direction === "up" ? "change-positive" : "change-neutral"}>
                    {change}
                  </span>
                  <span className="metric-period">vs last month</span>
                </p>
              </article>
            ))}
          </section>

          <section className="primary-grid" aria-label="Agent network and activity">
            <article className="panel network-panel">
              <div className="panel-heading">
                <div>
                  <div className="heading-with-icon">
                    <h2>Agent Network</h2>
                    <span className="network-demo-tag"><i /> DEMO</span>
                  </div>
                  <p>Interactive view of sample agents and payment paths</p>
                </div>
                <button
                  type="button"
                  className="subtle-select"
                  onClick={() => showNotice("Network filters are not available in this demo.")}
                >
                  All agents <ChevronDown size={14} aria-hidden="true" />
                </button>
              </div>

              <AgentNetworkVisualization />

              <div className="network-summary">
                <div><span className="summary-dot active-dot" /> <strong>{agentNetworkCounts.active}</strong><span>Active</span></div>
                <div><span className="summary-dot inactive-dot" /> <strong>{agentNetworkCounts.inactive}</strong><span>Inactive</span></div>
                <div><span className="summary-dot pending-dot" /> <strong>{agentNetworkCounts.pending}</strong><span>Pending</span></div>
                <button
                  type="button"
                  className="text-action"
                  onClick={() => navigate("Agents")}
                >
                  View agents <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>
            </article>

            <article className="panel activity-panel">
              <div className="panel-heading">
                <div>
                  <h2>Agent Activity</h2>
                  <p>Recent agent status</p>
                </div>
                <button
                  type="button"
                  className="icon-button more-button"
                  aria-label="More agent activity options"
                  onClick={() => showNotice("Additional activity options are not available in this demo.")}
                >
                  <MoreHorizontal size={19} />
                </button>
              </div>
              <div className="activity-list">
                {agentActivity.map((agent) => (
                  <div className="activity-row" key={agent.name}>
                    <span className={`agent-avatar avatar-${agent.color}`}>{agent.initials}</span>
                    <div className="activity-description">
                      <span className="activity-name">{agent.name}</span>
                      <span className="activity-task">{agent.task}</span>
                    </div>
                    <span className={`agent-status status-${agent.status.toLowerCase()}`}>
                      <i />{agent.status}
                    </span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="activity-footer"
                onClick={() => navigate("Agents")}
              >
                View all agents <ArrowRight size={14} aria-hidden="true" />
              </button>
            </article>
          </section>

          <section className="panel transactions-panel" aria-label="Recent transactions (demo data)">
            <div className="panel-heading transactions-heading">
              <div>
                <h2>Recent Transactions</h2>
                <p>Your latest agent payments and settlements</p>
              </div>
              <div className="transaction-actions">
                <span className="demo-table-label">Sample activity</span>
                <button
                  type="button"
                  className="filter-button"
                  onClick={() => showNotice("Transaction filters are not available in this demo.")}
                >
                  <Clock3 size={15} aria-hidden="true" />
                  Last 24 hours
                  <ChevronDown size={14} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="text-action all-transactions"
                  onClick={() => navigate("Transactions")}
                >
                  View all <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="table-scroll">
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th scope="col">Transaction ID</th>
                    <th scope="col">Agent</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                    <th scope="col">Timestamp</th>
                    <th scope="col"><span className="sr-only">Direction</span></th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td><span className="transaction-id">{transaction.id}</span></td>
                      <td>
                        <span className="transaction-agent">
                          <span className="transaction-avatar">{transaction.initials}</span>
                          {transaction.agent}
                        </span>
                      </td>
                      <td className="transaction-amount">{transaction.amount}</td>
                      <td>
                        <span className={`transaction-status transaction-${transaction.status.toLowerCase().replace(" ", "-")}`}>
                          <i />
                          {transaction.status}
                        </span>
                      </td>
                      <td className="transaction-time">{transaction.timestamp}</td>
                      <td className="transaction-direction">
                        {transaction.status === "Settled" ? (
                          <ArrowDownLeft size={16} aria-label="Payment received" />
                        ) : transaction.status === "In escrow" ? (
                          <ShieldCheck size={16} aria-label="Held in escrow" />
                        ) : (
                          <ArrowUpRight size={16} aria-label="Payment processing" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="transactions-mobile">
              {recentTransactions.map((transaction) => (
                <article className="mobile-transaction" key={transaction.id}>
                  <div className="mobile-transaction-top">
                    <span className="transaction-agent">
                      <span className="transaction-avatar">{transaction.initials}</span>
                      {transaction.agent}
                    </span>
                    <span className="transaction-amount">{transaction.amount}</span>
                  </div>
                  <div className="mobile-transaction-bottom">
                    <span className="transaction-id">{transaction.id}</span>
                    <span className={`transaction-status transaction-${transaction.status.toLowerCase().replace(" ", "-")}`}>
                      <i />{transaction.status}
                    </span>
                    <span className="transaction-time">{transaction.timestamp}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <footer className="dashboard-footer">
            <span>VeriStream <span className="footer-divider">·</span> Demo environment</span>
            <span className="footer-links">
              <button type="button" onClick={() => showNotice("Documentation is not available in this demo.")}>Documentation</button>
              <button type="button" onClick={() => showNotice("Support is not available in this demo.")}>Support</button>
            </span>
          </footer>
        </>
      )}
    </DashboardShell>
  );
}
