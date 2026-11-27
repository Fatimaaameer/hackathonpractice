"use client";

import { Check, Clock3, ExternalLink, X } from "lucide-react";
import { formatEscrowMoney, type EscrowRecord } from "./escrow-data";

type EscrowDetailsDialogProps = {
  escrow: EscrowRecord;
  onClose: () => void;
};

function EscrowStatus({ status }: { status: EscrowRecord["status"] }) {
  return (
    <span className={`ledger-status ledger-status-${status.toLowerCase().replace(/ /g, "-")}`}>
      <i />
      {status}
    </span>
  );
}

export function EscrowDetailsDialog({ escrow, onClose }: EscrowDetailsDialogProps) {
  return (
    <div
      className="ledger-dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="ledger-dialog escrow-details-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="escrow-details-title"
      >
        <header className="ledger-dialog-header">
          <div>
            <span className="eyebrow">ESCROW RECORD · DEMO</span>
            <h2 id="escrow-details-title">{escrow.id}</h2>
            <p>{escrow.payer} <span aria-hidden="true">→</span> {escrow.payee}</p>
          </div>
          <div className="ledger-dialog-header-actions">
            <EscrowStatus status={escrow.status} />
            <button type="button" className="icon-button" aria-label="Close dialog" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </header>

        <div className="ledger-dialog-content">
          <div className="ledger-layer-notice">
            <ExternalLink size={16} aria-hidden="true" />
            <p>
              <strong>Illustrative record only.</strong> No funds have been locked, released, or refunded.
              The contract address and transaction hashes below are sample placeholders, not live chain data.
            </p>
          </div>

          <section className="ledger-detail-section" aria-label="Escrow summary">
            <div className="ledger-facts-grid">
              <div><span>Amount</span><strong>{formatEscrowMoney(escrow.amount)}</strong></div>
              <div><span>Created</span><strong>{escrow.createdAt}</strong></div>
              <div className="ledger-contract-address">
                <span>Sample contract address · not deployed</span>
                <code>{escrow.contractAddress}</code>
              </div>
              <div><span>Release condition</span><strong>{escrow.releaseCondition}</strong></div>
              <div className="ledger-description-fact">
                <span>Expected deliverable</span><strong>{escrow.description}</strong>
              </div>
            </div>
          </section>

          <section className="ledger-detail-section">
            <div className="ledger-section-heading">
              <div><h3>Milestones</h3><p>Demo progress only</p></div>
            </div>
            {escrow.milestones.length ? (
              <ul className="ledger-milestone-list">
                {escrow.milestones.map((milestone) => (
                  <li key={milestone.id}>
                    <span className={`ledger-milestone-icon milestone-${milestone.status.toLowerCase().replace(/ /g, "-")}`}>
                      {milestone.status === "Completed" ? <Check size={13} /> : <Clock3 size={13} />}
                    </span>
                    <span className="ledger-history-main">
                      <strong>{milestone.title}</strong>
                      <small>{milestone.status}</small>
                    </span>
                    <span className="ledger-milestone-amount">
                      {milestone.amount === null ? "—" : formatEscrowMoney(milestone.amount)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="ledger-empty-inline">No milestones have been added to this draft.</p>
            )}
          </section>

          <section className="ledger-detail-section">
            <div className="ledger-section-heading">
              <div><h3>Associated transaction hashes</h3><p>Sample references · not verified on-chain</p></div>
            </div>
            {escrow.transactions.length ? (
              <ul className="ledger-reference-list">
                {escrow.transactions.map((transaction) => (
                  <li key={transaction.id}>
                    <span><strong>{transaction.type}</strong><small>{transaction.id} · {transaction.createdAt}</small></span>
                    <code title={transaction.hash}>{transaction.hash}</code>
                    <strong>{formatEscrowMoney(transaction.amount)}</strong>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="ledger-empty-inline">No sample transaction references. This draft has not been submitted to a chain.</p>
            )}
          </section>

          <section className="ledger-detail-section">
            <div className="ledger-section-heading">
              <div><h3>Settlement history</h3><p>Illustrative events from the local demo dataset</p></div>
            </div>
            {escrow.settlementHistory.length ? (
              <ul className="ledger-history-list">
                {escrow.settlementHistory.map((entry) => (
                  <li key={entry.id}>
                    <span className="ledger-history-icon"><Clock3 size={14} /></span>
                    <span className="ledger-history-main">
                      <strong>{entry.event}</strong>
                      <small>{entry.createdAt} · {entry.detail}</small>
                      {entry.transactionHash && <code title={entry.transactionHash}>{entry.transactionHash}</code>}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="ledger-empty-inline">No settlement history for this demo draft.</p>
            )}
          </section>
        </div>
      </section>
    </div>
  );
}
