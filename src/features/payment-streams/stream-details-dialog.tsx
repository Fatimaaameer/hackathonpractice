"use client";

import { Clock3, ExternalLink, Radio, X } from "lucide-react";
import {
  formatPaymentRate,
  formatStreamMoney,
  getStreamRemainingAmount,
  type PaymentStream,
} from "./payment-streams-data";

type StreamDetailsDialogProps = {
  stream: PaymentStream;
  onClose: () => void;
};

function StreamStatus({ status }: { status: PaymentStream["status"] }) {
  return (
    <span className={`ledger-status ledger-status-${status.toLowerCase()}`}>
      <i />
      {status}
    </span>
  );
}

export function StreamDetailsDialog({
  stream,
  onClose,
}: StreamDetailsDialogProps) {
  return (
    <div
      className="ledger-dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="ledger-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="stream-details-title"
      >
        <header className="ledger-dialog-header">
          <div>
            <span className="eyebrow">PAYMENT STREAM · DEMO</span>
            <h2 id="stream-details-title">{stream.id}</h2>
            <p>{stream.payer} <span aria-hidden="true">→</span> {stream.payee}</p>
          </div>
          <div className="ledger-dialog-header-actions">
            <StreamStatus status={stream.status} />
            <button type="button" className="icon-button" aria-label="Close dialog" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </header>

        <div className="ledger-dialog-content">
          <div className="ledger-layer-notice">
            <Radio size={16} aria-hidden="true" />
            <p>
              Stream consumption is <strong>off-chain demo accounting</strong>. It records an
              illustrative rate and cap; it does not authorize or send a payment.
            </p>
          </div>

          <section className="ledger-detail-section" aria-labelledby="stream-accounting-heading">
            <div className="ledger-section-heading">
              <div>
                <h3 id="stream-accounting-heading">Off-chain accounting</h3>
                <p>Illustrative usage totals for this stream</p>
              </div>
              <span className="ledger-layer-label">OFF-CHAIN</span>
            </div>
            <div className="ledger-facts-grid">
              <div><span>Payment rate</span><strong>{formatPaymentRate(stream)}</strong></div>
              <div><span>Authorized amount</span><strong>{formatStreamMoney(stream.authorizedAmount)}</strong></div>
              <div><span>Consumed amount</span><strong>{formatStreamMoney(stream.consumedAmount)}</strong></div>
              <div><span>Remaining amount</span><strong>{formatStreamMoney(getStreamRemainingAmount(stream))}</strong></div>
              <div><span>Start time</span><strong>{stream.startTime}</strong></div>
              <div><span>Last settlement</span><strong>{stream.lastSettlement}</strong></div>
            </div>
          </section>

          <section className="ledger-detail-section" aria-labelledby="stream-settlements-heading">
            <div className="ledger-section-heading">
              <div>
                <h3 id="stream-settlements-heading">On-chain settlement history</h3>
                <p>Sample references only; none are verified on a live network</p>
              </div>
              <span className="ledger-layer-label is-onchain">ON-CHAIN · SAMPLE</span>
            </div>
            {stream.settlements.length ? (
              <ul className="ledger-history-list">
                {stream.settlements.map((settlement) => (
                  <li key={settlement.id}>
                    <span className="ledger-history-icon"><Clock3 size={14} /></span>
                    <span className="ledger-history-main">
                      <strong>{settlement.id} · {formatStreamMoney(settlement.amount)}</strong>
                      <small>{settlement.settledAt}</small>
                      <code title={settlement.transactionHash}>
                        <ExternalLink size={11} aria-hidden="true" />
                        {settlement.transactionHash}
                      </code>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="ledger-empty-inline">No sample settlements recorded for this stream.</p>
            )}
          </section>
          <p className="ledger-demo-disclaimer">
            Demo record only. On-chain references are placeholders; no stream or transfer was created.
          </p>
        </div>
      </section>
    </div>
  );
}
