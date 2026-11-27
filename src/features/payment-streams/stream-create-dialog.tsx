"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, X } from "lucide-react";
import type { NewPaymentStream } from "./payment-streams-data";

type StreamCreateDialogProps = {
  onClose: () => void;
  onCreate: (stream: NewPaymentStream) => void;
};

export function StreamCreateDialog({
  onClose,
  onCreate,
}: StreamCreateDialogProps) {
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payer = String(formData.get("payer") ?? "").trim();
    const payee = String(formData.get("payee") ?? "").trim();
    if (payer.toLowerCase() === payee.toLowerCase()) {
      setError("Payer and payee must be different.");
      return;
    }

    onCreate({
      payer,
      payee,
      paymentRate: Number(formData.get("paymentRate")),
      rateUnit: String(formData.get("rateUnit")) as NewPaymentStream["rateUnit"],
      authorizedAmount: Number(formData.get("authorizedAmount")),
      startTime: String(formData.get("startTime")),
    });
    onClose();
  }

  return (
    <div
      className="ledger-dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="ledger-dialog ledger-form-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="stream-create-title"
      >
        <header className="ledger-dialog-header">
          <div>
            <span className="eyebrow">DEMO CONFIGURATION</span>
            <h2 id="stream-create-title">Create payment stream</h2>
            <p>Set a sample payment rate and an off-chain spending cap.</p>
          </div>
          <button type="button" className="icon-button" aria-label="Close dialog" onClick={onClose}>
            <X size={18} />
          </button>
        </header>
        <form className="ledger-form" onSubmit={handleSubmit}>
          <div className="ledger-form-row">
            <label className="ledger-field">
              <span>Payer</span>
              <input name="payer" required minLength={2} maxLength={80} placeholder="Payer name" />
            </label>
            <label className="ledger-field">
              <span>Payee</span>
              <input name="payee" required minLength={2} maxLength={80} placeholder="Payee name" />
            </label>
          </div>
          <div className="ledger-form-row">
            <label className="ledger-field">
              <span>Payment rate (USD)</span>
              <input name="paymentRate" type="number" min="0.01" max="100000" step="0.01" required />
            </label>
            <label className="ledger-field">
              <span>Rate interval</span>
              <select name="rateUnit" defaultValue="hour" required>
                <option value="hour">Per hour</option>
                <option value="minute">Per minute</option>
              </select>
            </label>
          </div>
          <div className="ledger-form-row">
            <label className="ledger-field">
              <span>Authorized amount (USD)</span>
              <input name="authorizedAmount" type="number" min="0.01" max="10000000" step="0.01" required />
              <small>Demo cap only; no funds are authorized or reserved.</small>
            </label>
            <label className="ledger-field">
              <span>Start time</span>
              <input name="startTime" type="datetime-local" required />
            </label>
          </div>
          {error && <p className="ledger-form-error" role="alert">{error}</p>}
          <div className="ledger-form-disclaimer">
            This saves a temporary row in this browser session only. It does not start a stream or trigger an on-chain settlement.
          </div>
          <div className="ledger-dialog-actions">
            <button type="button" className="secondary-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary-button">Add demo stream <ArrowRight size={14} /></button>
          </div>
        </form>
      </section>
    </div>
  );
}
