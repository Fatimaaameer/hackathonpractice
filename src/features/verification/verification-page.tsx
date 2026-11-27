"use client";

import { useState } from "react";
import { BadgeCheck, Search } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { demoVerifications } from "@/mocks/verification";
import {
  getEffectiveVerificationResult,
  verificationResults,
  type VerificationRecord,
} from "./verification-data";
import { VerificationDetailsDialog } from "./verification-details-dialog";

function ResultBadge({ result }: { result: ReturnType<typeof getEffectiveVerificationResult> }) {
  return (
    <span className={`ledger-status ledger-status-${result.toLowerCase()}`}>
      <i />
      {result}
    </span>
  );
}

export function VerificationPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<(typeof verificationResults)[number]>("All results");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const normalizedQuery = query.trim().toLowerCase();
  const visibleRecords = demoVerifications.filter((record) => {
    const effectiveResult = getEffectiveVerificationResult(record);
    const matchesResult = result === "All results" || effectiveResult === result;
    const matchesSearch =
      !normalizedQuery ||
      [
        record.id,
        record.task,
        record.provider,
        record.method,
        record.attestation.id,
      ].some((value) => value.toLowerCase().includes(normalizedQuery));
    return matchesResult && matchesSearch;
  });
  const selectedRecord = demoVerifications.find((record) => record.id === selectedId);

  return (
    <DashboardShell title="Verification" activeItem="Verification">
      {() => (
        <>
          <section className="ledger-page-heading">
            <div>
              <div className="ledger-title-line">
                <h2>Verification records</h2>
                <span className="demo-label"><span className="demo-dot" />Demo data</span>
              </div>
              <p>Inspect sample attestations, evidence, and backend confirmation state.</p>
            </div>
          </section>

          <section className="ledger-layer-banner verification-policy-notice" aria-label="Verification policy">
            <BadgeCheck size={17} aria-hidden="true" />
            <p>
              <strong>Evidence before status.</strong> An agent’s successful HTTP response is not a verification result. Verified records require independent evidence and backend confirmation; these demo fixtures do not verify real tasks.
            </p>
          </section>

          <section className="ledger-list-panel" aria-label="Verification demo records">
            <div className="ledger-list-toolbar">
              <label className="ledger-search">
                <Search size={16} aria-hidden="true" />
                <span className="sr-only">Search verification records</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search ID, task, provider, or attestation"
                />
              </label>
            </div>
            <div className="ledger-status-filter-row">
              <span>Result</span>
              <div className="ledger-filters verification-filters" role="group" aria-label="Filter verifications by result">
                {verificationResults.map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={`ledger-filter${result === item ? " is-selected" : ""}`}
                    onClick={() => setResult(item)}
                    aria-pressed={result === item}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="ledger-results-meta">
              <span>Showing <strong>{visibleRecords.length}</strong> of <strong>{demoVerifications.length}</strong> demo records</span>
              <span>Click a verification ID or Details to inspect evidence.</span>
            </div>
            {visibleRecords.length ? (
              <div className="ledger-table-wrap">
                <table className="ledger-table verification-table">
                  <thead>
                    <tr>
                      <th scope="col">Verification ID</th>
                      <th scope="col">Task</th>
                      <th scope="col">Provider</th>
                      <th scope="col">Method</th>
                      <th scope="col">Attestation</th>
                      <th scope="col">Timestamp</th>
                      <th scope="col">Result</th>
                      <th scope="col"><span className="sr-only">Details</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleRecords.map((record: VerificationRecord) => (
                      <tr key={record.id}>
                        <td><button type="button" className="ledger-id-button" onClick={() => setSelectedId(record.id)}>{record.id}</button></td>
                        <td>{record.task}</td>
                        <td>{record.provider}</td>
                        <td>{record.method}</td>
                        <td>
                          <span className="verification-attestation">
                            <strong>{record.attestation.id}</strong>
                            <small>{record.attestation.summary}</small>
                          </span>
                        </td>
                        <td>{record.timestamp}</td>
                        <td><ResultBadge result={getEffectiveVerificationResult(record)} /></td>
                        <td><button type="button" className="ledger-view-button" onClick={() => setSelectedId(record.id)}>Details</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="ledger-empty-state">
                <Search size={20} aria-hidden="true" />
                <h3>No matching verification records</h3>
                <p>Try a different search or result filter.</p>
              </div>
            )}
          </section>

          <footer className="ledger-demo-note">
            Demo workspace only. Attestations, evidence references, and confirmation IDs are illustrative; no real task verification is performed.
          </footer>

          {selectedRecord && (
            <VerificationDetailsDialog
              record={selectedRecord}
              onClose={() => setSelectedId(null)}
            />
          )}
        </>
      )}
    </DashboardShell>
  );
}
