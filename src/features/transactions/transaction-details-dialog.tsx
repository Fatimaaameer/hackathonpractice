"use client";

import { ArrowUpRight, Clock3, ExternalLink, X } from "lucide-react";
import {
  formatTransactionAmount,
  getValidExplorerUrl,
  type TransactionRecord,
} from "./transactions-data";

type TransactionDetailsDialogProps = {
  transaction: TransactionRecord;
  onClose: () => void;
};

function TransactionStatus({ status }: { status: TransactionRecord["status"] }) {
  return (
    <span className={`ledger-status ledger-status-${status.toLowerCase()}`}>
      <i />
      {status}
    </span>
  );
}

export function TransactionDetailsDialog({
  transaction,
  onClose,
}: TransactionDetailsDialogProps) {
  const explorerUrl = getValidExplorerUrl(transaction.explorerUrl);

  return (
    <div
      className="ledger-dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="ledger-dialog transaction-details-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="transaction-details-title"
      >
        <header className="ledger-dialog-header">
          <div>
            <span className="eyebrow">TRANSACTION · DEMO RECORD</span>
            <h2 id="transaction-details-title">{transaction.id}</h2>
            <p>{transaction.payer} <span aria-hidden="true">→</span> {transaction.payee}</p>
          </div>
          <div className="ledger-dialog-header-actions">
            <TransactionStatus status={transaction.status} />
            <button type="button" className="icon-button" aria-label="Close dialog" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </header>

        <div className="ledger-dialog-content">
          <div className="ledger-layer-notice">
            <ExternalLink size={16} aria-hidden="true" />
            <p>
              <strong>Sample transaction only.</strong> Hashes, block numbers, addresses, and event
              history are illustrative and do not describe a verified on-chain transaction.
            </p>
          </div>

          <section className="ledger-detail-section" aria-label="Transaction details">
            <div className="ledger-facts-grid">
              <div><span>Transaction type</span><strong>{transaction.type}</strong></div>
              <div><span>Amount</span><strong>{formatTransactionAmount(transaction.amount)}</strong></div>
              <div><span>Network</span><strong>{transaction.network}</strong></div>
              <div><span>Timestamp</span><strong>{transaction.timestamp}</strong></div>
              <div><span>Block number</span><strong>{transaction.blockNumber ?? "Not available in demo record"}</strong></div>
              <div><span>Associated record</span><strong>{transaction.associatedRecord ? `${transaction.associatedRecord.type} · ${transaction.associatedRecord.id}` : "None assigned"}</strong></div>
              <div className="ledger-contract-address">
                <span>Sample transaction hash</span>
                <code>{transaction.transactionHash}</code>
              </div>
              <div className="ledger-contract-address">
                <span>Sample contract address</span>
                <code>{transaction.contractAddress ?? "Not available in demo record"}</code>
              </div>
            </div>
            {explorerUrl ? (
              <a className="ledger-explorer-link" href={explorerUrl} target="_blank" rel="noopener noreferrer">
                Open blockchain explorer <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            ) : (
              <p className="ledger-empty-inline">No valid blockchain explorer URL is available for this demo record.</p>
            )}
          </section>

          <section className="ledger-detail-section">
            <div className="ledger-section-heading">
              <div><h3>Verification evidence</h3><p>Evidence references shown here are sample data</p></div>
            </div>
            {transaction.verificationEvidence.length ? (
              <ul className="ledger-history-list">
                {transaction.verificationEvidence.map((evidence) => (
                  <li key={evidence.id}>
                    <span className="ledger-history-icon"><ExternalLink size={13} /></span>
                    <span className="ledger-history-main">
                      <strong>{evidence.title}</strong>
                      <small>{evidence.summary}</small>
                      {evidence.reference && <code>{evidence.reference}</code>}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="ledger-empty-inline">No verification evidence is attached to this sample record.</p>
            )}
          </section>

          <section className="ledger-detail-section">
            <div className="ledger-section-heading">
              <div><h3>Event history</h3><p>Illustrative record events · not chain-confirmed</p></div>
            </div>
            <ul className="ledger-history-list">
              {transaction.eventHistory.map((event) => (
                <li key={event.id}>
                  <span className="ledger-history-icon"><Clock3 size={14} /></span>
                  <span className="ledger-history-main">
                    <strong>{event.event}</strong>
                    <small>{event.timestamp} · {event.detail}</small>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </div>
  );
}
