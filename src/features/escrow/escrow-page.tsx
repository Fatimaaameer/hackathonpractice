"use client";

import { useState } from "react";
import {
  BadgeCheck,
  CircleDollarSign,
  Clock3,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { demoEscrowMetrics, demoEscrows } from "@/mocks/escrows";
import {
  escrowStatuses,
  formatEscrowMoney,
  type EscrowRecord,
  type EscrowStatus,
  type NewEscrow,
} from "./escrow-data";
import { EscrowCreateDialog } from "./escrow-create-dialog";
import { EscrowDetailsDialog } from "./escrow-details-dialog";

const metricIcons = [
  ShieldCheck,
  Wallet,
  CircleDollarSign,
  RotateCcw,
  Clock3,
];

function EscrowStatus({ status }: { status: EscrowStatus }) {
  return (
    <span className={`ledger-status ledger-status-${status.toLowerCase().replace(/ /g, "-")}`}>
      <i />
      {status}
    </span>
  );
}

export function EscrowPage() {
  const [escrows, setEscrows] = useState(demoEscrows);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof escrowStatuses)[number]>("All statuses");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();
  const visibleEscrows = escrows.filter((escrow) => {
    const matchesStatus = status === "All statuses" || escrow.status === status;
    const matchesQuery =
      !normalizedQuery ||
      [escrow.id, escrow.payer, escrow.payee].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      );
    return matchesStatus && matchesQuery;
  });
  const selectedEscrow = escrows.find((escrow) => escrow.id === selectedId);

  function addEscrow(details: NewEscrow) {
    const escrow: EscrowRecord = {
      ...details,
      id: `ESC-DEMO-${String(escrows.length + 1).padStart(4, "0")}`,
      status: "Draft",
      createdAt: new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date()),
      contractAddress: "Not deployed",
      transactions: [],
      settlementHistory: [],
    };
    setEscrows((current) => [escrow, ...current]);
    setCreating(false);
  }

  return (
    <DashboardShell title="Escrow" activeItem="Escrow">
      {(showNotice) => (
        <>
          <section className="ledger-page-heading">
            <div>
              <div className="ledger-title-line">
                <h2>Escrow</h2>
                <span className="demo-label"><span className="demo-dot" />Demo ledger</span>
              </div>
              <p>Review illustrative escrow records, milestones, and settlement history.</p>
            </div>
            <button type="button" className="primary-button" onClick={() => setCreating(true)}>
              <Plus size={16} aria-hidden="true" /> Initiate escrow
            </button>
          </section>

          <section className="ledger-layer-banner" aria-label="Escrow data disclaimer">
            <ShieldCheck size={17} aria-hidden="true" />
            <p>
              <strong>Sample ledger only.</strong> These amounts are not wallet balances. No real funds have been locked, released, or transferred; addresses and hashes are placeholders.
            </p>
          </section>

          <section className="ledger-metric-grid" aria-label="Illustrative demo escrow totals">
            {demoEscrowMetrics.map((metric, index) => {
              const Icon = metricIcons[index];
              return (
                <article className="ledger-metric" key={metric.label}>
                  <div className="ledger-metric-heading">
                    <span>{metric.label}</span>
                    <Icon size={15} aria-hidden="true" />
                  </div>
                  <strong>{formatEscrowMoney(metric.amount)}</strong>
                  <small>{metric.note}</small>
                </article>
              );
            })}
          </section>

          <section className="ledger-list-panel" aria-label="Escrow demo records">
            <div className="ledger-panel-heading">
              <div>
                <h3>Escrow records</h3>
                <span>Selected sample entries from the demo ledger</span>
              </div>
              <BadgeCheck size={16} aria-hidden="true" />
            </div>
            <div className="ledger-list-toolbar">
              <label className="ledger-search">
                <Search size={16} aria-hidden="true" />
                <span className="sr-only">Search escrows by ID, payer, or payee</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search escrow ID, payer, or payee"
                />
              </label>
              <div className="ledger-filters" role="group" aria-label="Filter escrows by status">
                {escrowStatuses.map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={`ledger-filter${status === item ? " is-selected" : ""}`}
                    onClick={() => setStatus(item)}
                    aria-pressed={status === item}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="ledger-results-meta">
              <span>Showing <strong>{visibleEscrows.length}</strong> of <strong>{escrows.length}</strong> demo records</span>
              <span>Summary metrics are illustrative aggregate figures.</span>
            </div>
            {visibleEscrows.length ? (
              <div className="ledger-table-wrap">
                <table className="ledger-table escrow-table">
                  <thead>
                    <tr>
                      <th scope="col">Escrow ID</th>
                      <th scope="col">Payer</th>
                      <th scope="col">Payee</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Status</th>
                      <th scope="col">Creation date</th>
                      <th scope="col"><span className="sr-only">Details</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleEscrows.map((escrow) => (
                      <tr key={escrow.id}>
                        <td><button type="button" className="ledger-id-button" onClick={() => setSelectedId(escrow.id)}>{escrow.id}</button></td>
                        <td>{escrow.payer}</td>
                        <td>{escrow.payee}</td>
                        <td>{formatEscrowMoney(escrow.amount)}</td>
                        <td><EscrowStatus status={escrow.status} /></td>
                        <td>{escrow.createdAt}</td>
                        <td><button type="button" className="ledger-view-button" onClick={() => setSelectedId(escrow.id)}>Details</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="ledger-empty-state">
                <Search size={20} aria-hidden="true" />
                <h3>No matching escrow records</h3>
                <p>Try a different search or status filter.</p>
              </div>
            )}
          </section>

          <footer className="ledger-demo-note">
            Demo workspace only. Records, amounts, contract addresses, and transaction hashes are illustrative placeholders. No funds or contracts exist on-chain.
          </footer>

          {selectedEscrow && <EscrowDetailsDialog escrow={selectedEscrow} onClose={() => setSelectedId(null)} />}
          {creating && (
            <EscrowCreateDialog
              onClose={() => setCreating(false)}
              onCreate={(escrow) => {
                addEscrow(escrow);
                showNotice("Demo escrow draft created locally. No contract was deployed and no funds were locked.");
              }}
            />
          )}
        </>
      )}
    </DashboardShell>
  );
}
