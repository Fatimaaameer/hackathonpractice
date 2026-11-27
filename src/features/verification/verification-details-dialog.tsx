"use client";

import { BadgeCheck, CircleHelp, X } from "lucide-react";
import {
  getEffectiveVerificationResult,
  type VerificationRecord,
} from "./verification-data";

type VerificationDetailsDialogProps = {
  record: VerificationRecord;
  onClose: () => void;
};

function ResultBadge({ result }: { result: ReturnType<typeof getEffectiveVerificationResult> }) {
  return (
    <span className={`ledger-status ledger-status-${result.toLowerCase()}`}>
      <i />
      {result}
    </span>
  );
}

export function VerificationDetailsDialog({
  record,
  onClose,
}: VerificationDetailsDialogProps) {
  const result = getEffectiveVerificationResult(record);

  return (
    <div
      className="ledger-dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="ledger-dialog verification-details-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="verification-details-title"
      >
        <header className="ledger-dialog-header">
          <div>
            <span className="eyebrow">VERIFICATION RECORD · DEMO</span>
            <h2 id="verification-details-title">{record.id}</h2>
            <p>{record.task} <span aria-hidden="true">·</span> {record.provider}</p>
          </div>
          <div className="ledger-dialog-header-actions">
            <ResultBadge result={result} />
            <button type="button" className="icon-button" aria-label="Close dialog" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </header>

        <div className="ledger-dialog-content">
          <div className="ledger-layer-notice verification-policy-notice">
            <CircleHelp size={16} aria-hidden="true" />
            <p>
              <strong>Verification policy:</strong> an agent response, including HTTP 200, is not
              proof of completion. A verified result requires independent verification evidence
              and explicit backend confirmation. All items here are demo fixtures.
            </p>
          </div>

          <section className="ledger-detail-section" aria-label="Verification summary">
            <div className="ledger-facts-grid">
              <div><span>Task</span><strong>{record.task}</strong></div>
              <div><span>Provider</span><strong>{record.provider}</strong></div>
              <div><span>Verification method</span><strong>{record.method}</strong></div>
              <div><span>Timestamp</span><strong>{record.timestamp}</strong></div>
              <div><span>Attestation ID</span><strong>{record.attestation.id}</strong></div>
              <div className="ledger-description-fact"><span>Attestation</span><strong>{record.attestation.summary}</strong></div>
            </div>
          </section>

          <section className="ledger-detail-section">
            <div className="ledger-section-heading">
              <div><h3>Verification evidence</h3><p>Independent evidence is distinct from agent-reported status</p></div>
            </div>
            {record.evidence.length ? (
              <ul className="ledger-history-list">
                {record.evidence.map((evidence) => (
                  <li key={evidence.id}>
                    <span className="ledger-history-icon"><BadgeCheck size={14} /></span>
                    <span className="ledger-history-main">
                      <strong>{evidence.kind} · {evidence.source}</strong>
                      <small>{evidence.summary}</small>
                      {evidence.reference && <code>{evidence.reference}</code>}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="ledger-empty-inline">No independent verification evidence is attached.</p>
            )}
          </section>

          <section className="ledger-detail-section">
            <div className="ledger-section-heading">
              <div><h3>Backend confirmation</h3><p>Sample confirmation metadata; not connected to a live backend</p></div>
            </div>
            {record.backendConfirmation ? (
              <div className="verification-confirmation">
                <ResultBadge result={record.backendConfirmation.result} />
                <span>
                  <strong>{record.backendConfirmation.reference}</strong>
                  <small>Demo confirmation · {record.backendConfirmation.confirmedAt}</small>
                </span>
              </div>
            ) : (
              <p className="ledger-empty-inline">
                No backend confirmation is recorded. An agent response alone cannot move this record to Verified.
              </p>
            )}
          </section>

          <p className="ledger-demo-disclaimer">
            Demo status only. This interface does not verify work or create backend attestations.
          </p>
        </div>
      </section>
    </div>
  );
}
