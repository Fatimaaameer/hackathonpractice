"use client";

import {
  ArrowRight,
  BadgeCheck,
  Check,
  Clock3,
  Star,
  X,
} from "lucide-react";
import type { MarketplaceService } from "./marketplace-data";

type ServiceDetailsDialogProps = {
  service: MarketplaceService;
  onClose: () => void;
  onRequest: () => void;
};

export function ServiceDetailsDialog({
  service,
  onClose,
  onRequest,
}: ServiceDetailsDialogProps) {
  return (
    <div
      className="market-dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="market-dialog service-details-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-details-title"
      >
        <div className="market-dialog-header">
          <div className="service-category-mark">
            {service.category.slice(0, 1)}
          </div>
          <button type="button" className="icon-button" aria-label="Close dialog" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="service-detail-content">
          <div className="service-detail-title-row">
            <div>
              <span className="service-category-label">{service.category}</span>
              <h2 id="service-details-title">{service.name}</h2>
            </div>
            <span className={`service-availability${service.availability === "Limited availability" ? " is-limited" : ""}`}>
              <i />{service.availability}
            </span>
          </div>
          <p className="service-detail-description">{service.description}</p>

          <section className="service-provider-profile" aria-label="Provider information">
            <span className="provider-avatar provider-avatar-large">{service.provider.initials}</span>
            <div className="provider-profile-main">
              <span className="provider-profile-name">
                {service.provider.name}
                <BadgeCheck size={15} aria-label="Verified demo provider" />
              </span>
              <span className="provider-agent-id">{service.provider.agentId}</span>
              <p>{service.provider.description}</p>
            </div>
            <div className="provider-rating-block">
              <span><Star size={14} fill="currentColor" />{service.provider.reputation.toFixed(2)}</span>
              <small>{service.provider.reviewCount} reviews</small>
            </div>
          </section>

          <div className="service-detail-columns">
            <section className="service-detail-block">
              <h3>Pricing model</h3>
              <strong>{service.pricingLabel}</strong>
              <p>{service.pricingModel}</p>
              <div className="service-estimate-row">
                <span>Estimated starting price</span>
                <strong>${service.priceEstimate.toFixed(2)} USD</strong>
              </div>
            </section>
            <section className="service-detail-block">
              <h3>Provider track record</h3>
              <div className="provider-stat-row">
                <span>Completed tasks</span><strong>{service.provider.completedTasks.toLocaleString()}</strong>
              </div>
              <div className="provider-stat-row">
                <span>Completion rate</span><strong>{service.provider.completionRate.toFixed(1)}%</strong>
              </div>
              <div className="provider-stat-row">
                <span>Typical turnaround</span><strong>{service.turnaround.replace("Usually ", "")}</strong>
              </div>
            </section>
          </div>

          <section className="service-deliverables">
            <h3>Expected deliverables</h3>
            <ul>
              {service.deliverables.map((deliverable) => (
                <li key={deliverable}><Check size={14} aria-hidden="true" />{deliverable}</li>
              ))}
            </ul>
          </section>
          <p className="market-demo-disclaimer">
            Demo listing. Provider details, availability, reputation, and pricing are sample data.
          </p>
        </div>

        <div className="market-dialog-actions">
          <span className="service-turnaround"><Clock3 size={14} />{service.turnaround}</span>
          <button type="button" className="primary-button" onClick={onRequest}>
            Request service <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}
