"use client";

import type { ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  formatAnalyticsCurrency,
  formatCompactAnalyticsCurrency,
  type AnalyticsPoint,
  type EscrowUtilizationSlice,
} from "./analytics-data";

const tooltipStyle = {
  backgroundColor: "#101827",
  border: "1px solid #34445c",
  borderRadius: 6,
  color: "#e5edf7",
  fontSize: 11,
};

const tooltipLabelStyle = { color: "#a7b6c9", marginBottom: 4 };
const axisTick = { fill: "#8798ae", fontSize: 10 };
const gridStyle = { stroke: "#27374e", strokeDasharray: "3 3" };
const legendStyle = { fontSize: 10, paddingTop: 10 };
const panelColors = ["#3b82f6", "#22d3ee"];

function ChartPanel({
  title,
  description,
  children,
  wide = false,
}: {
  title: string;
  description: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <article className={`analytics-chart-panel${wide ? " is-wide" : ""}`}>
      <header className="analytics-chart-heading">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <span className="analytics-chart-sample">SAMPLE</span>
      </header>
      <div className="analytics-chart-canvas">{children}</div>
    </article>
  );
}

function CurrencyTooltip() {
  return (
    <Tooltip
      contentStyle={tooltipStyle}
      labelStyle={tooltipLabelStyle}
      formatter={(value) => formatAnalyticsCurrency(Number(value))}
    />
  );
}

function CountTooltip() {
  return (
    <Tooltip
      contentStyle={tooltipStyle}
      labelStyle={tooltipLabelStyle}
      formatter={(value) => Number(value).toLocaleString()}
    />
  );
}

function PercentTooltip() {
  return (
    <Tooltip
      contentStyle={tooltipStyle}
      labelStyle={tooltipLabelStyle}
      formatter={(value) => `${Number(value).toFixed(1)}%`}
    />
  );
}

export function AnalyticsCharts({
  data,
  escrowUtilization,
}: {
  data: AnalyticsPoint[];
  escrowUtilization: EscrowUtilizationSlice[];
}) {
  return (
    <section className="analytics-chart-grid" aria-label="Analytics charts (demo data)">
      <ChartPanel
        title="Payment volume over time"
        description="Sample completed settlement volume · USD"
        wide
      >
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <LineChart data={data} margin={{ top: 8, right: 18, left: 2, bottom: 0 }}>
            <CartesianGrid vertical={false} {...gridStyle} />
            <XAxis dataKey="date" tick={axisTick} tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
              tick={axisTick}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatCompactAnalyticsCurrency}
              width={52}
            />
            <CurrencyTooltip />
            <Legend wrapperStyle={legendStyle} />
            <Line
              type="monotone"
              dataKey="paymentVolume"
              name="Payment volume"
              stroke="#22d3ee"
              strokeWidth={2}
              dot={{ r: 2, fill: "#22d3ee", strokeWidth: 0 }}
              activeDot={{ r: 4, fill: "#22d3ee", stroke: "#0f172a", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartPanel>

      <ChartPanel
        title="Successful vs failed transactions"
        description="Sample transaction counts by date"
        wide
      >
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <BarChart data={data} margin={{ top: 8, right: 18, left: 2, bottom: 0 }}>
            <CartesianGrid vertical={false} {...gridStyle} />
            <XAxis dataKey="date" tick={axisTick} tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tick={axisTick} tickLine={false} axisLine={false} allowDecimals={false} width={42} />
            <CountTooltip />
            <Legend wrapperStyle={legendStyle} />
            <Bar dataKey="successfulTransactions" name="Successful" fill={panelColors[0]} radius={[3, 3, 0, 0]} />
            <Bar dataKey="failedTransactions" name="Failed" fill="#c77b86" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartPanel>

      <ChartPanel
        title="Escrow utilization"
        description="Sample allocation snapshot · USD"
      >
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <PieChart>
            <Pie
              data={escrowUtilization}
              dataKey="amount"
              nameKey="label"
              innerRadius="58%"
              outerRadius="78%"
              paddingAngle={3}
              stroke="none"
            >
              {escrowUtilization.map((slice, index) => (
                <Cell key={slice.label} fill={panelColors[index]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={tooltipStyle}
              labelStyle={tooltipLabelStyle}
              formatter={(value) => formatAnalyticsCurrency(Number(value))}
            />
            <Legend
              formatter={(value) => <span className="analytics-legend-label">{value}</span>}
              wrapperStyle={legendStyle}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartPanel>

      <ChartPanel
        title="Agent activity"
        description="Sample agent counts by status"
      >
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} {...gridStyle} />
            <XAxis dataKey="date" tick={axisTick} tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tick={axisTick} tickLine={false} axisLine={false} allowDecimals={false} width={36} />
            <CountTooltip />
            <Legend wrapperStyle={legendStyle} />
            <Line type="monotone" dataKey="activeAgents" name="Active" stroke="#3b82f6" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="idleAgents" name="Idle" stroke="#22d3ee" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="verifyingAgents" name="Verifying" stroke="#a78bfa" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartPanel>

      <ChartPanel
        title="Payment stream consumption"
        description="Off-chain usage vs sample on-chain settlements · USD"
      >
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <AreaChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} {...gridStyle} />
            <XAxis dataKey="date" tick={axisTick} tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tick={axisTick} tickLine={false} axisLine={false} tickFormatter={formatCompactAnalyticsCurrency} width={52} />
            <CurrencyTooltip />
            <Legend wrapperStyle={legendStyle} />
            <Area
              type="monotone"
              dataKey="streamConsumed"
              name="Off-chain consumed"
              stroke="#22d3ee"
              fill="#22d3ee"
              fillOpacity={0.12}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="streamSettled"
              name="Sample settlements"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.06}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartPanel>

      <ChartPanel
        title="Verification success rate"
        description="Sample verified records as a share of completed reviews"
      >
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} {...gridStyle} />
            <XAxis dataKey="date" tick={axisTick} tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
              domain={[80, 100]}
              tick={axisTick}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) => `${value}%`}
              width={40}
            />
            <PercentTooltip />
            <Legend wrapperStyle={legendStyle} />
            <Line
              type="monotone"
              dataKey="verificationSuccessRate"
              name="Verification success"
              stroke="#60a5fa"
              strokeWidth={2}
              dot={{ r: 2, fill: "#60a5fa", strokeWidth: 0 }}
              activeDot={{ r: 4, fill: "#60a5fa", stroke: "#0f172a", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartPanel>

      <ChartPanel
        title="Dispute rate"
        description="Sample disputed records as a share of completed reviews"
      >
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} {...gridStyle} />
            <XAxis dataKey="date" tick={axisTick} tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
              domain={[0, 6]}
              tick={axisTick}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) => `${value}%`}
              width={40}
            />
            <PercentTooltip />
            <Legend wrapperStyle={legendStyle} />
            <Line
              type="monotone"
              dataKey="disputeRate"
              name="Dispute rate"
              stroke="#d6a86a"
              strokeWidth={2}
              dot={{ r: 2, fill: "#d6a86a", strokeWidth: 0 }}
              activeDot={{ r: 4, fill: "#d6a86a", stroke: "#0f172a", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartPanel>
    </section>
  );
}
