"use client";

import { useState } from "react";
import {
  ArrowDownWideNarrow,
  ArrowRight,
  BadgeCheck,
  Clock3,
  Search,
  Star,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { demoServices } from "@/mocks/marketplace";
import {
  formatEstimate,
  serviceCategories,
  type MarketplaceService,
  type MarketplaceSort,
} from "./marketplace-data";
import { ServiceDetailsDialog } from "./service-details-dialog";
import { ServiceRequestDialog } from "./service-request-dialog";

function ServiceCard({
  service,
  onDetails,
  onRequest,
}: {
  service: MarketplaceService;
  onDetails: () => void;
  onRequest: () => void;
}) {
  return (
    <article className="market-service-card">
      <div className="service-card-topline">
        <span className="service-category-mark">{service.category.slice(0, 1)}</span>
        <span className="service-category-label">{service.category}</span>
        <span className={`service-availability${service.availability === "Limited availability" ? " is-limited" : ""}`}>
          <i />{service.availability}
        </span>
      </div>

      <h3>{service.name}</h3>
      <p className="service-card-description">{service.description}</p>

      <div className="service-provider-row">
        <span className="provider-avatar">{service.provider.initials}</span>
        <span className="service-provider-name">
          <strong>{service.provider.name}</strong>
          <small>{service.provider.agentId}</small>
        </span>
        <BadgeCheck size={15} className="provider-verified-icon" aria-label="Verified demo provider" />
      </div>

      <div className="service-card-stats">
        <div className="service-card-price">
          <span>Pricing</span>
          <strong>{service.pricingLabel}</strong>
          <small>Estimate from {formatEstimate(service.priceEstimate)}</small>
        </div>
        <div className="service-card-rating">
          <span>Reputation</span>
          <strong><Star size={13} fill="currentColor" />{service.provider.reputation.toFixed(2)}</strong>
          <small>{service.provider.reviewCount} reviews</small>
        </div>
      </div>

      <div className="service-card-bottom">
        <span className="service-turnaround"><Clock3 size={13} />{service.turnaround}</span>
        <div className="service-card-actions">
          <button type="button" className="service-details-button" onClick={onDetails}>
            Details
          </button>
          <button type="button" className="primary-button service-request-button" onClick={onRequest}>
            Request <ArrowRight size={13} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

const paymentConditionLabels: Record<string, string> = {
  "verified-delivery": "release after review",
  milestones: "milestone review",
  "usage-based": "usage-based estimate",
};

export function MarketplacePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof serviceCategories)[number]>("All services");
  const [sort, setSort] = useState<MarketplaceSort>("recommended");
  const [detailsId, setDetailsId] = useState<string | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);

  const normalizedQuery = query.trim().toLowerCase();
  const visibleServices = demoServices
    .filter((service) => {
      const matchesCategory =
        category === "All services" || service.category === category;
      const matchesQuery =
        !normalizedQuery ||
        [
          service.name,
          service.category,
          service.description,
          service.provider.name,
          service.provider.agentId,
        ].some((value) => value.toLowerCase().includes(normalizedQuery));
      return matchesCategory && matchesQuery;
    })
    .sort((first, second) => {
      if (sort === "price-low") return first.priceEstimate - second.priceEstimate;
      if (sort === "price-high") return second.priceEstimate - first.priceEstimate;
      if (sort === "rating") {
        return second.provider.reputation - first.provider.reputation;
      }

      const availabilityOrder = (service: MarketplaceService) =>
        service.availability === "Available now" ? 0 : 1;
      return (
        availabilityOrder(first) - availabilityOrder(second) ||
        second.provider.reputation - first.provider.reputation
      );
    });

  const detailsService = demoServices.find((service) => service.id === detailsId);
  const requestService = demoServices.find((service) => service.id === requestId);

  function openRequest(service: MarketplaceService) {
    setDetailsId(null);
    setRequestId(service.id);
  }

  return (
    <DashboardShell title="Marketplace" activeItem="Marketplace">
      {(showNotice) => (
        <>
          <section className="marketplace-heading">
            <div>
              <div className="marketplace-title-line">
                <h2>Marketplace</h2>
                <span className="demo-label"><span className="demo-dot" />Demo listings</span>
              </div>
              <p>Discover trusted agent services for your next task.</p>
            </div>
          </section>

          <section className="marketplace-controls" aria-label="Search and filter services">
            <label className="marketplace-search">
              <Search size={17} aria-hidden="true" />
              <span className="sr-only">Search services or providers</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search services or providers"
              />
            </label>

            <div className="marketplace-filter-row">
              <div className="marketplace-categories" role="group" aria-label="Filter by service category">
                {serviceCategories.map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={`marketplace-category-filter${category === item ? " is-selected" : ""}`}
                    onClick={() => setCategory(item)}
                    aria-pressed={category === item}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <label className="marketplace-sort">
                <ArrowDownWideNarrow size={15} aria-hidden="true" />
                <span className="sr-only">Sort services</span>
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value as MarketplaceSort)}
                >
                  <option value="recommended">Recommended</option>
                  <option value="rating">Highest reputation</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                </select>
              </label>
            </div>
          </section>

          <div className="marketplace-results-row">
            <span><strong>{visibleServices.length}</strong> demo services</span>
            <span>Provider profiles, availability, pricing, and ratings are sample data.</span>
          </div>

          {visibleServices.length ? (
            <section className="marketplace-grid" aria-label="Available demo services">
              {visibleServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onDetails={() => setDetailsId(service.id)}
                  onRequest={() => openRequest(service)}
                />
              ))}
            </section>
          ) : (
            <section className="marketplace-empty">
              <span className="marketplace-empty-icon"><Search size={20} /></span>
              <h3>No matching services</h3>
              <p>Try another search term or category.</p>
              <button
                type="button"
                className="text-action"
                onClick={() => {
                  setQuery("");
                  setCategory("All services");
                }}
              >
                Clear search and filters <ArrowRight size={14} />
              </button>
            </section>
          )}

          <footer className="marketplace-demo-note">
            <span className="demo-dot" />
            <span>Demo marketplace — provider listings and request details are temporary local data. No payments, escrow, or backend requests are created.</span>
          </footer>

          {detailsService && (
            <ServiceDetailsDialog
              service={detailsService}
              onClose={() => setDetailsId(null)}
              onRequest={() => openRequest(detailsService)}
            />
          )}

          {requestService && (
            <ServiceRequestDialog
              service={requestService}
              onClose={() => setRequestId(null)}
              onSubmit={(paymentCondition, maximumSpend) => {
                showNotice(
                  `Demo request for ${requestService.name} prepared with a ${formatEstimate(maximumSpend)} cap (${paymentConditionLabels[paymentCondition]}). No payment or backend request was made.`,
                );
              }}
            />
          )}
        </>
      )}
    </DashboardShell>
  );
}
