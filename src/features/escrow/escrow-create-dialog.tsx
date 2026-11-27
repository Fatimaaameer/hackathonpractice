"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, X } from "lucide-react";
import type { NewEscrow } from "./escrow-data";

type EscrowCreateDialogProps = {
  onClose: () => void;
  onCreate: (escrow: NewEscrow) => void;
};

export function EscrowCreateDialog({ onClose, onCreate }: EscrowCreateDialogProps) {
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payer = String(formData.get("payer") ?? "").trim();
    const payee = String(formData.get("payee") ?? "").trim();
    const milestones = String(formData.get("milestones") ?? "")
      .split("\n")
      .map((title) => title.trim())
      .filter(Boolean);

    if (payer.toLowerCase() === payee.toLowerCase()) {
      setError("Payer and payee must be different.");
      return;
    }
    if (milestones.length === 0) {
      setError("Add at least one milestone.");
      return;
    }

    onCreate({
      payer,
      payee,
      amount: Number(formData.get("amount")),
      description: String(formData.get("description") ?? "").trim(),
      releaseCondition: String(formData.get("releaseCondition") ?? ""),
      milestones: milestones.map((title, index) => ({
        id: `M${index + 1}`,
        title,
        amount: null,
        status: "Not started",
      })),
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
        aria-labelledby="escrow-create-title"
      >
        <header className="ledger-dialog-header">
          <div>
            <span className="eyebrow">DEMO CONFIGURATION</span>
            <h2 id="escrow-create-title">Initiate escrow</h2>
            <p>Prepare a local draft with a deliverable and review milestones.</p>
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
          <label className="ledger-field">
            <span>Escrow amount (USD)</span>
            <input name="amount" type="number" min="0.01" max="10000000" step="0.01" required />
            <small>Demo value only. Funds will not be locked or transferred.</small>
          </label>
          <label className="ledger-field">
            <span>Expected deliverable</span>
            <textarea name="description" rows={3} minLength={10} maxLength={500} required placeholder="Describe the outcome and acceptance criteria." />
          </label>
          <label className="ledger-field">
            <span>Release condition</span>
            <select name="releaseCondition" defaultValue="" required>
              <option value="" disabled>Select a demo condition</option>
              <option value="Release after deliverable verification">Release after deliverable verification</option>
              <option value="Milestone review">Milestone review</option>
            </select>
          </label>
          <label className="ledger-field">
            <span>Milestones</span>
            <textarea name="milestones" rows={3} minLength={3} maxLength={500} required placeholder={"One milestone per line\nExample: Review initial deliverable"} />
            <small>Enter at least one milestone, one per line.</small>
          </label>
          {error && <p className="ledger-form-error" role="alert">{error}</p>}
          <div className="ledger-form-disclaimer">
            Submitting creates a temporary local draft only. No contract is deployed and no real funds are locked, released, or refunded.
          </div>
          <div className="ledger-dialog-actions">
            <button type="button" className="secondary-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary-button">Add demo draft <ArrowRight size={14} /></button>
          </div>
        </form>
      </section>
    </div>
  );
}
