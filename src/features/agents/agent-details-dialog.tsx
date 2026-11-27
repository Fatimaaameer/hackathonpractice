"use client";

import { ArrowUpRight, CheckCircle2, Clock3, ExternalLink, X } from "lucide-react";
import { agentInitials, type AgentRecord } from "./agents-data";

type AgentDetailsDialogProps = {
  agent: AgentRecord;
  onClose: () => void;
  onEdit: () => void;
  onStatusChange: () => void;
};

export function AgentDetailsDialog({
  agent,
  onClose,
  onEdit,
  onStatusChange,
}: AgentDetailsDialogProps) {
  return (
    <div
      className="agent-dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="agent-dialog agent-details-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="agent-details-title"
      >
        <div className="agent-dialog-heading">
          <div className="agent-detail-identity">
            <span className="agent-avatar avatar-blue">{agentInitials(agent.name)}</span>
            <div>
              <span className="eyebrow">AGENT PROFILE · DEMO</span>
              <h2 id="agent-details-title">{agent.name}</h2>
              <span className="detail-agent-id">{agent.id}</span>
            </div>
          </div>
          <button type="button" className="icon-button" aria-label="Close dialog" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="agent-detail-status-row">
          <span className={`agent-status-pill status-pill-${agent.status.toLowerCase()}`}>
            <i />{agent.status}
          </span>
          <span className="agent-detail-category">{agent.category}</span>
          <span className="demo-label"><span className="demo-dot" />Demo data</span>
        </div>

        <div className="agent-detail-grid">
          <div className="agent-detail-item agent-detail-wallet">
            <span>Wallet address</span>
            <code>{agent.wallet}</code>
            <span className="detail-caption"><ExternalLink size={12} /> Demo address · not connected</span>
          </div>
          <div className="agent-detail-item">
            <span>Daily spending limit</span>
            <strong>${Number(agent.spendingLimit).toLocaleString()} USDC</strong>
          </div>
          <div className="agent-detail-item">
            <span>Reputation</span>
            <strong>{agent.reputation === null ? "Not rated" : `${agent.reputation.toFixed(2)} / 5.00`}</strong>
          </div>
          <div className="agent-detail-item">
            <span>Transactions</span>
            <strong>{agent.transactionCount.toLocaleString()}</strong>
          </div>
          <div className="agent-detail-item agent-detail-permissions">
            <span>Permissions</span>
            {agent.permissions.length ? (
              <div className="permission-tags">
                {agent.permissions.map((permission) => (
                  <span key={permission}><CheckCircle2 size={13} />{permission}</span>
                ))}
              </div>
            ) : (
              <strong className="detail-caption">No permissions assigned</strong>
            )}
          </div>
        </div>

        <div className="agent-task-history">
          <div className="agent-history-heading">
            <div>
              <h3>Task history</h3>
              <p>Recent demo activity associated with this agent</p>
            </div>
            <Clock3 size={16} aria-hidden="true" />
          </div>
          {agent.taskHistory.length ? (
            <div className="agent-task-list">
              {agent.taskHistory.map((task) => (
                <div className="agent-task-row" key={`${task.title}-${task.date}`}>
                  <span className="task-marker" />
                  <div className="agent-task-main">
                    <strong>{task.title}</strong>
                    <span>{task.date}</span>
                  </div>
                  <span className={`task-status task-${task.status.toLowerCase().replace(" ", "-")}`}>
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="agent-task-empty">No task activity yet.</div>
          )}
        </div>

        <div className="agent-dialog-actions">
          <button type="button" className="secondary-button" onClick={onEdit}>Edit metadata</button>
          <button
            type="button"
            className={agent.status === "Active" ? "danger-button" : "primary-button"}
            onClick={onStatusChange}
          >
            {agent.status === "Active" ? "Deactivate agent" : "Activate agent"}
            <ArrowUpRight size={14} aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}
