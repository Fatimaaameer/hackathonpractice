"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, ShieldCheck, X } from "lucide-react";
import {
  formatEstimate,
  type MarketplaceService,
} from "./marketplace-data";

type ServiceRequestDialogProps = {
  service: MarketplaceService;
  onClose: () => void;
  onSubmit: (paymentCondition: string, maximumSpend: number) => void;
};

const paymentConditions = [
  {
    value: "verified-delivery",
    label: "Release after deliverable review",
    description: "Review the work before any settlement is considered.",
  },
  {
    value: "milestones",
    label: "Milestone review",
    description: "Request progress checkpoints for the task.",
  },
  {
    value: "usage-based",
    label: "Usage-based estimate",
    description: "Use the maximum spend as a demo spending cap.",
  },
];

export function ServiceRequestDialog({
  service,
  onClose,
  onSubmit,
}: ServiceRequestDialogProps) {
  const [maximumSpend, setMaximumSpend] = useState(
    String(Math.ceil(service.priceEstimate * 1.25)),
  );
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const spend = Number(formData.get("maximumSpend"));

    if (!Number.isFinite(spend) || spend < service.priceEstimate) {
      setError("Maximum authorized spend must be at least the estimated price.");
      return;
    }

    const paymentCondition = String(formData.get("paymentCondition") ?? "");
    if (!paymentConditions.some((condition) => condition.value === paymentCondition)) {
      setError("Choose a payment condition to continue.");
      return;
    }

    onSubmit(paymentCondition, spend);
    onClose();
  }

  return (
    <div
      className="market-dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="market-dialog request-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-service-title"
      >
        <div className="market-form-heading">
          <div>
            <span className="eyebrow">DEMO REQUEST</span>
            <h2 id="request-service-title">Request service</h2>
            <p>Describe the work and set a maximum demo spend.</p>
          </div>
          <button type="button" className="icon-button" aria-label="Close dialog" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form className="market-request-form" onSubmit={handleSubmit}>
          <div className="request-selected-service">
            <span className="service-category-mark">{service.category.slice(0, 1)}</span>
            <span>
              <strong>{service.name}</strong>
              <small>{service.category} · {service.provider.name}</small>
            </span>
          </div>

          <div className="request-form-grid">
            <label className="market-field">
              <span>Selected provider</span>
              <input name="provider" value={service.provider.name} readOnly />
            </label>
            <label className="market-field">
              <span>Estimated price</span>
              <input value={`${formatEstimate(service.priceEstimate)} USD`} readOnly />
            </label>
            <label className="market-field">
              <span>Maximum authorized spend (USD)</span>
              <input
                name="maximumSpend"
                type="number"
                min={service.priceEstimate}
                max="10000000"
                step="0.01"
                required
                value={maximumSpend}
                onChange={(event) => {
                  setMaximumSpend(event.target.value);
                  setError("");
                }}
              />
              <small>Must be at least the estimate. This does not authorize or send a payment.</small>
            </label>
          </div>

          <label className="market-field">
            <span>Expected deliverable</span>
            <textarea
              name="deliverable"
              required
              minLength={10}
              maxLength={500}
              rows={3}
              placeholder="Describe the outcome, format, and any acceptance criteria."
            />
            <small>10–500 characters. Be specific about what completion means.</small>
          </label>

          <fieldset className="payment-condition-fieldset">
            <legend>Payment conditions <span>Demo only</span></legend>
            <div className="payment-condition-options">
              {paymentConditions.map((condition, index) => (
                <label key={condition.value} className="payment-condition-option">
                  <input
                    type="radio"
                    name="paymentCondition"
                    value={condition.value}
                    defaultChecked={index === 0}
                    required
                  />
                  <span>
                    <strong>{condition.label}</strong>
                    <small>{condition.description}</small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {error && <p className="market-form-error" role="alert">{error}</p>}

          <div className="request-demo-note">
            <ShieldCheck size={15} aria-hidden="true" />
            <span>Submitting creates a temporary demo request only. No payment, escrow, or backend request will be made.</span>
          </div>

          <div className="market-dialog-actions market-form-actions">
            <button type="button" className="secondary-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary-button">
              Submit demo request <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
