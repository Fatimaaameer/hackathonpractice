"use client";

import { useState } from "react";
import { ArrowDownWideNarrow, Search } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { demoTransactions } from "@/mocks/transactions";
import {
  formatTransactionAmount,
  transactionStatuses,
  transactionTypes,
  type TransactionRecord,
} from "./transactions-data";
import { TransactionDetailsDialog } from "./transaction-details-dialog";

function TransactionStatus({ status }: { status: TransactionRecord["status"] }) {
  return (
    <span className={`ledger-status ledger-status-${status.toLowerCase()}`}>
      <i />
      {status}
    </span>
  );
}

export function TransactionsPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<(typeof transactionTypes)[number]>("All types");
  const [status, setStatus] = useState<(typeof transactionStatuses)[number]>("All statuses");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const normalizedQuery = query.trim().toLowerCase();
  const visibleTransactions = demoTransactions.filter((transaction) => {
    const matchesType = type === "All types" || transaction.type === type;
    const matchesStatus = status === "All statuses" || transaction.status === status;
    const matchesSearch =
      !normalizedQuery ||
      [
        transaction.id,
        transaction.type,
        transaction.payer,
        transaction.payee,
        transaction.network,
      ].some((value) => value.toLowerCase().includes(normalizedQuery));
    return matchesType && matchesStatus && matchesSearch;
  });
  const selectedTransaction = demoTransactions.find(
    (transaction) => transaction.id === selectedId,
  );

  return (
    <DashboardShell title="Transactions" activeItem="Transactions">
      {() => (
        <>
          <section className="ledger-page-heading">
            <div>
              <div className="ledger-title-line">
                <h2>Transaction history</h2>
                <span className="demo-label"><span className="demo-dot" />Demo data</span>
              </div>
              <p>Review sample transaction records and related verification evidence.</p>
            </div>
          </section>

          <section className="ledger-layer-banner" aria-label="Transaction data disclaimer">
            <ArrowDownWideNarrow size={17} aria-hidden="true" />
            <p>
              <strong>Illustrative history only.</strong> Hashes and network statuses are not live chain results. Verification evidence must be independently assessed; an agent HTTP response alone is not proof of completion.
            </p>
          </section>

          <section className="ledger-list-panel" aria-label="Transaction demo records">
            <div className="ledger-list-toolbar transaction-toolbar">
              <label className="ledger-search">
                <Search size={16} aria-hidden="true" />
                <span className="sr-only">Search transactions</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search ID, payer, payee, or network"
                />
              </label>
              <label className="transaction-type-filter">
                <span>Type</span>
                <select
                  value={type}
                  onChange={(event) => setType(event.target.value as (typeof transactionTypes)[number])}
                  aria-label="Filter by transaction type"
                >
                  {transactionTypes.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
            </div>
            <div className="ledger-status-filter-row">
              <span>Status</span>
              <div className="ledger-filters" role="group" aria-label="Filter transactions by status">
                {transactionStatuses.map((item) => (
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
              <span>Showing <strong>{visibleTransactions.length}</strong> of <strong>{demoTransactions.length}</strong> demo transactions</span>
              <span>Click a transaction ID or Details to inspect the record.</span>
            </div>
            {visibleTransactions.length ? (
              <div className="ledger-table-wrap">
                <table className="ledger-table transaction-table">
                  <thead>
                    <tr>
                      <th scope="col">Transaction ID</th>
                      <th scope="col">Type</th>
                      <th scope="col">Payer</th>
                      <th scope="col">Payee</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Network</th>
                      <th scope="col">Status</th>
                      <th scope="col">Timestamp</th>
                      <th scope="col"><span className="sr-only">Details</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleTransactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td><button type="button" className="ledger-id-button" onClick={() => setSelectedId(transaction.id)}>{transaction.id}</button></td>
                        <td>{transaction.type}</td>
                        <td>{transaction.payer}</td>
                        <td>{transaction.payee}</td>
                        <td>{formatTransactionAmount(transaction.amount)}</td>
                        <td>{transaction.network}</td>
                        <td><TransactionStatus status={transaction.status} /></td>
                        <td>{transaction.timestamp}</td>
                        <td><button type="button" className="ledger-view-button" onClick={() => setSelectedId(transaction.id)}>Details</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="ledger-empty-state">
                <Search size={20} aria-hidden="true" />
                <h3>No matching transactions</h3>
                <p>Try a different search, type, or status filter.</p>
              </div>
            )}
          </section>

          <footer className="ledger-demo-note">
            Demo workspace only. Transaction hashes, contract addresses, block numbers, and explorer availability are sample fields, not proof of on-chain activity.
          </footer>

          {selectedTransaction && (
            <TransactionDetailsDialog
              transaction={selectedTransaction}
              onClose={() => setSelectedId(null)}
            />
          )}
        </>
      )}
    </DashboardShell>
  );
}
