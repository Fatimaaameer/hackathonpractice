"use client";

import { useState } from "react";
import { Plus, Radio, Search } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { demoPaymentStreams } from "@/mocks/payment-streams";
import {
  formatPaymentRate,
  formatStreamMoney,
  formatStreamStartTime,
  getStreamRemainingAmount,
  paymentStreamStatuses,
  type NewPaymentStream,
  type PaymentStream,
  type PaymentStreamStatus,
} from "./payment-streams-data";
import { StreamCreateDialog } from "./stream-create-dialog";
import { StreamDetailsDialog } from "./stream-details-dialog";

type StreamStatusBadgeProps = { status: PaymentStreamStatus };

function StreamStatusBadge({ status }: StreamStatusBadgeProps) {
  return (
    <span className={`ledger-status ledger-status-${status.toLowerCase()}`}>
      <i />
      {status}
    </span>
  );
}

export function PaymentStreamsPage() {
  const [streams, setStreams] = useState(demoPaymentStreams);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof paymentStreamStatuses)[number]>("All statuses");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();
  const visibleStreams = streams.filter((stream) => {
    const matchesStatus = status === "All statuses" || stream.status === status;
    const matchesQuery =
      !normalizedQuery ||
      [stream.id, stream.payer, stream.payee].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      );
    return matchesStatus && matchesQuery;
  });
  const selectedStream = streams.find((stream) => stream.id === selectedId);

  function addStream(details: NewPaymentStream) {
    const stream: PaymentStream = {
      ...details,
      id: `STR-DEMO-${String(streams.length + 1).padStart(4, "0")}`,
      consumedAmount: 0,
      status: "Active",
      lastSettlement: "No settlement yet",
      settlements: [],
    };
    setStreams((current) => [stream, ...current]);
    setCreating(false);
  }

  return (
    <DashboardShell title="Payment Streams" activeItem="Payment Streams">
      {(showNotice) => (
        <>
          <section className="ledger-page-heading">
            <div>
              <div className="ledger-title-line">
                <h2>Payment streams</h2>
                <span className="demo-label"><span className="demo-dot" />Demo data</span>
              </div>
              <p>Review sample usage accounting and settlement references.</p>
            </div>
            <button type="button" className="primary-button" onClick={() => setCreating(true)}>
              <Plus size={16} aria-hidden="true" /> Create stream
            </button>
          </section>

          <section className="ledger-layer-banner" aria-label="Stream accounting explanation">
            <Radio size={17} aria-hidden="true" />
            <p>
              <strong>Off-chain accounting, on-chain settlements.</strong> Rates, consumed totals, and remaining caps below are illustrative local records. Sample settlement references are not live transactions.
            </p>
          </section>

          <section className="ledger-list-panel" aria-label="Payment stream demo records">
            <div className="ledger-list-toolbar">
              <label className="ledger-search">
                <Search size={16} aria-hidden="true" />
                <span className="sr-only">Search streams by ID, payer, or payee</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search stream ID, payer, or payee"
                />
              </label>
              <div className="ledger-filters" role="group" aria-label="Filter streams by status">
                {paymentStreamStatuses.map((item) => (
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
              <span>Showing <strong>{visibleStreams.length}</strong> of <strong>{streams.length}</strong> demo streams</span>
              <span>Accounting values are not wallet balances.</span>
            </div>
            {visibleStreams.length ? (
              <div className="ledger-table-wrap">
                <table className="ledger-table stream-table">
                  <thead>
                    <tr>
                      <th scope="col">Stream ID</th>
                      <th scope="col">Payer / payee</th>
                      <th scope="col">Payment rate</th>
                      <th scope="col">Authorized</th>
                      <th scope="col">Consumed</th>
                      <th scope="col">Remaining</th>
                      <th scope="col">Status</th>
                      <th scope="col">Start time</th>
                      <th scope="col">Last settlement</th>
                      <th scope="col"><span className="sr-only">Details</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleStreams.map((stream) => (
                      <tr key={stream.id}>
                        <td><button type="button" className="ledger-id-button" onClick={() => setSelectedId(stream.id)}>{stream.id}</button></td>
                        <td>
                          <span className="ledger-party-pair"><strong>{stream.payer}</strong><span>to {stream.payee}</span></span>
                        </td>
                        <td>{formatPaymentRate(stream)}</td>
                        <td>{formatStreamMoney(stream.authorizedAmount)}</td>
                        <td>{formatStreamMoney(stream.consumedAmount)}</td>
                        <td className="ledger-amount-remaining">{formatStreamMoney(getStreamRemainingAmount(stream))}</td>
                        <td><StreamStatusBadge status={stream.status} /></td>
                        <td>{formatStreamStartTime(stream.startTime)}</td>
                        <td>{stream.lastSettlement}</td>
                        <td><button type="button" className="ledger-view-button" onClick={() => setSelectedId(stream.id)}>Details</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="ledger-empty-state">
                <Radio size={20} aria-hidden="true" />
                <h3>No matching streams</h3>
                <p>Try a different search or status filter.</p>
              </div>
            )}
          </section>

          <footer className="ledger-demo-note">
            Demo workspace only. Creating a stream adds a temporary local record; no wallet authorization, payment, or on-chain stream is created.
          </footer>

          {selectedStream && <StreamDetailsDialog stream={selectedStream} onClose={() => setSelectedId(null)} />}
          {creating && (
            <StreamCreateDialog
              onClose={() => setCreating(false)}
              onCreate={(stream) => {
                addStream(stream);
                showNotice("Demo stream added locally. No payment stream or on-chain action was created.");
              }}
            />
          )}
        </>
      )}
    </DashboardShell>
  );
}
