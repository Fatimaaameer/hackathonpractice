"use client";

import { ChartNoAxesCombined, Clock3 } from "lucide-react";
import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import {
  analyticsDateRanges,
  type AnalyticsDateRange,
} from "./analytics-data";
import {
  demoAnalyticsByRange,
  demoEscrowUtilizationByRange,
} from "@/mocks/analytics";
import { AnalyticsCharts } from "./analytics-charts";

export function AnalyticsPage() {
  const [range, setRange] = useState<AnalyticsDateRange>("30d");
  const selectedRange = analyticsDateRanges.find((item) => item.value === range);

  return (
    <DashboardShell title="Analytics" activeItem="Analytics">
      {() => (
        <>
          <section className="analytics-page-heading">
            <div>
              <div className="analytics-title-line">
                <h2>Analytics overview</h2>
                <span className="demo-label"><span className="demo-dot" />Demo data</span>
              </div>
              <p>Explore sample payment, agent, escrow, and verification trends.</p>
            </div>
            <label className="analytics-range-filter">
              <Clock3 size={15} aria-hidden="true" />
              <span>Date range</span>
              <select
                aria-label="Analytics date range"
                value={range}
                onChange={(event) => setRange(event.target.value as AnalyticsDateRange)}
              >
                {analyticsDateRanges.map((item) => (
                  <option value={item.value} key={item.value}>{item.label}</option>
                ))}
              </select>
            </label>
          </section>

          <div className="analytics-demo-banner" role="note">
            <ChartNoAxesCombined size={16} aria-hidden="true" />
            <p>
              <strong>Illustrative metrics only.</strong> Charts use centralized demo fixtures for {selectedRange?.label.toLowerCase()}. They do not represent production or live blockchain activity.
            </p>
          </div>

          <AnalyticsCharts
            data={demoAnalyticsByRange[range]}
            escrowUtilization={demoEscrowUtilizationByRange[range]}
          />

          <footer className="ledger-demo-note analytics-demo-note">
            Analytics data is synthetic and for interface demonstration only. No financial, settlement, verification, or dispute outcome should be inferred from these charts.
          </footer>
        </>
      )}
    </DashboardShell>
  );
}
