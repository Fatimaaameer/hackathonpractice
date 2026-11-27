"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Eye,
  Pencil,
  Power,
  Search,
  UserPlus,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { AgentDetailsDialog } from "./agent-details-dialog";
import { AgentEditorDialog } from "./agent-editor-dialog";
import {
  agentInitials,
  agentFilters,
  shortenWallet,
  type AgentFilter,
  type AgentRecord,
} from "./agents-data";
import { demoAgents } from "@/mocks/agents";

type AgentActionsProps = {
  agent: AgentRecord;
  onView: () => void;
  onEdit: () => void;
  onStatusChange: () => void;
};

function AgentActions({
  agent,
  onView,
  onEdit,
  onStatusChange,
}: AgentActionsProps) {
  return (
    <div className="agent-row-actions">
      <button type="button" className="row-action" onClick={onView} aria-label={`View ${agent.name}`}>
        <Eye size={14} aria-hidden="true" />
        <span>View</span>
      </button>
      <button type="button" className="row-action" onClick={onEdit} aria-label={`Edit ${agent.name}`}>
        <Pencil size={14} aria-hidden="true" />
        <span>Edit</span>
      </button>
      <button
        type="button"
        className={`row-action ${agent.status === "Active" ? "row-action-danger" : ""}`}
        onClick={onStatusChange}
        aria-label={`${agent.status === "Active" ? "Deactivate" : "Activate"} ${agent.name}`}
      >
        <Power size={14} aria-hidden="true" />
        <span>{agent.status === "Active" ? "Deactivate" : "Activate"}</span>
      </button>
    </div>
  );
}

function StatusBadge({ status }: { status: AgentRecord["status"] }) {
  return (
    <span className={`agent-status-pill status-pill-${status.toLowerCase()}`}>
      <i />
      {status}
    </span>
  );
}

export function AgentsPage() {
  const [agents, setAgents] = useState(demoAgents);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<AgentFilter>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingAgent, setEditingAgent] = useState<AgentRecord | undefined>();
  const [registering, setRegistering] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredAgents = agents.filter((agent) => {
    const matchesStatus = filter === "All" || agent.status === filter;
    const matchesSearch =
      !normalizedQuery ||
      [agent.name, agent.id, agent.wallet].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      );
    return matchesStatus && matchesSearch;
  });
  const selectedAgent = agents.find((agent) => agent.id === selectedId);

  function countForFilter(status: AgentFilter) {
    if (status === "All") return agents.length;
    return agents.filter((agent) => agent.status === status).length;
  }

  function saveAgent(updatedAgent: AgentRecord) {
    const duplicateId = agents.some(
      (agent) =>
        agent.id.toLowerCase() === updatedAgent.id.toLowerCase() &&
        agent.id !== editingAgent?.id,
    );
    if (duplicateId) return "An agent with this ID already exists in the demo directory.";

    if (editingAgent) {
      setAgents((current) =>
        current.map((agent) =>
          agent.id === editingAgent.id ? updatedAgent : agent,
        ),
      );
      setEditingAgent(undefined);
      return null;
    }

    setAgents((current) => [...current, { ...updatedAgent, status: "Pending" }]);
    setRegistering(false);
    return null;
  }

  function changeStatus(
    agent: AgentRecord,
    notify?: (message: string) => void,
    closeDetails = false,
  ) {
    const nextStatus = agent.status === "Active" ? "Inactive" : "Active";
    setAgents((current) =>
      current.map((item) =>
        item.id === agent.id ? { ...item, status: nextStatus } : item,
      ),
    );
    if (closeDetails) setSelectedId(null);
    notify?.(
      `Agent ${nextStatus === "Active" ? "activated" : "deactivated"} locally in the demo. No backend request was made.`,
    );
  }

  function openEditor(agent?: AgentRecord) {
    setSelectedId(null);
    setRegistering(false);
    setEditingAgent(agent);
  }

  function closeEditor() {
    setRegistering(false);
    setEditingAgent(undefined);
  }

  return (
    <DashboardShell title="Agents" activeItem="Agents">
      {(showNotice) => (
        <>
          <section className="agents-heading">
            <div>
              <div className="agents-title-line">
                <h2>Agent directory</h2>
                <span className="demo-label"><span className="demo-dot" />Demo data</span>
              </div>
              <p>Review agent profiles, access settings, and recent activity.</p>
            </div>
            <button
              type="button"
              className="primary-button register-agent-button"
              onClick={() => setRegistering(true)}
            >
              <UserPlus size={16} aria-hidden="true" />
              Register Agent
            </button>
          </section>

          <section className="agent-directory" aria-label="Agent directory demo data">
            <div className="agent-directory-toolbar">
              <label className="agent-search">
                <Search size={16} aria-hidden="true" />
                <span className="sr-only">Search agents by name, ID, or wallet address</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by name, agent ID, or wallet"
                />
              </label>
              <div className="agent-filters" role="group" aria-label="Filter agents by status">
                {agentFilters.map((status) => (
                  <button
                    type="button"
                    key={status}
                    className={`agent-filter${filter === status ? " is-selected" : ""}`}
                    onClick={() => setFilter(status)}
                    aria-pressed={filter === status}
                  >
                    {status}
                    <span>{countForFilter(status)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="agent-results-meta">
              <span>
                Showing <strong>{filteredAgents.length}</strong> of <strong>{agents.length}</strong> agents
              </span>
              <span>Changes on this page are temporary and are not saved to a backend.</span>
            </div>

            {filteredAgents.length === 0 ? (
              <div className="agent-empty-state">
                <span className="agent-empty-icon"><Search size={20} /></span>
                <h3>No agents found</h3>
                <p>Try a different search or status filter.</p>
                <button
                  type="button"
                  className="text-action"
                  onClick={() => {
                    setQuery("");
                    setFilter("All");
                  }}
                >
                  Clear search and filters <ArrowUpRight size={14} />
                </button>
              </div>
            ) : (
              <>
                <div className="agent-table-wrap">
                  <table className="agent-table">
                    <thead>
                      <tr>
                        <th scope="col">Agent</th>
                        <th scope="col">Wallet address</th>
                        <th scope="col">Category</th>
                        <th scope="col">Status</th>
                        <th scope="col">Reputation</th>
                        <th scope="col">Transactions</th>
                        <th scope="col">Last activity</th>
                        <th scope="col"><span className="sr-only">Actions</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAgents.map((agent) => (
                        <tr key={agent.id}>
                          <td>
                            <button
                              type="button"
                              className="agent-name-cell"
                              onClick={() => setSelectedId(agent.id)}
                            >
                              <span className="agent-avatar avatar-blue">
                                {agentInitials(agent.name)}
                              </span>
                              <span>
                                <strong>{agent.name}</strong>
                                <small>{agent.id}</small>
                              </span>
                            </button>
                          </td>
                          <td>
                            <code className="agent-wallet" title={agent.wallet}>
                              {shortenWallet(agent.wallet)}
                            </code>
                          </td>
                          <td><span className="agent-category">{agent.category}</span></td>
                          <td><StatusBadge status={agent.status} /></td>
                          <td>
                            <span className="agent-reputation">
                              {agent.reputation === null ? "—" : agent.reputation.toFixed(2)}
                              {agent.reputation !== null && <small>/ 5</small>}
                            </span>
                          </td>
                          <td className="agent-transaction-count">{agent.transactionCount.toLocaleString()}</td>
                          <td className="agent-last-activity">{agent.lastActivity}</td>
                          <td>
                            <AgentActions
                              agent={agent}
                              onView={() => setSelectedId(agent.id)}
                              onEdit={() => openEditor(agent)}
                              onStatusChange={() => changeStatus(agent, showNotice)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="agent-card-list">
                  {filteredAgents.map((agent) => (
                    <article className="agent-card" key={agent.id}>
                      <div className="agent-card-heading">
                        <span className="agent-avatar avatar-blue">
                          {agentInitials(agent.name)}
                        </span>
                        <div className="agent-card-name">
                          <strong>{agent.name}</strong>
                          <span>{agent.id}</span>
                        </div>
                        <StatusBadge status={agent.status} />
                      </div>
                      <div className="agent-card-details">
                        <span>Wallet <code>{shortenWallet(agent.wallet)}</code></span>
                        <span>Category <strong>{agent.category}</strong></span>
                        <span>Reputation <strong>{agent.reputation === null ? "—" : `${agent.reputation.toFixed(2)} / 5`}</strong></span>
                        <span>Transactions <strong>{agent.transactionCount.toLocaleString()}</strong></span>
                        <span>Last activity <strong>{agent.lastActivity}</strong></span>
                      </div>
                      <AgentActions
                        agent={agent}
                        onView={() => setSelectedId(agent.id)}
                        onEdit={() => openEditor(agent)}
                        onStatusChange={() => changeStatus(agent, showNotice)}
                      />
                    </article>
                  ))}
                </div>
              </>
            )}
          </section>

          <footer className="agents-demo-note">
            <span className="demo-dot" />
            <span>Demo workspace — registration, metadata edits, and status changes are temporary local interactions. No backend or wallet operation is performed.</span>
          </footer>

          {registering && (
            <AgentEditorDialog
              onClose={closeEditor}
              onSave={(agent) => {
                const error = saveAgent(agent);
                if (!error) {
                  showNotice("Agent added to the demo directory as pending. Nothing was sent to a backend.");
                }
                return error;
              }}
            />
          )}

          {editingAgent && (
            <AgentEditorDialog
              agent={editingAgent}
              onClose={closeEditor}
              onSave={(agent) => {
                const error = saveAgent(agent);
                if (!error) {
                  showNotice("Agent metadata updated locally in this demo only.");
                }
                return error;
              }}
            />
          )}

          {selectedAgent && (
            <AgentDetailsDialog
              agent={selectedAgent}
              onClose={() => setSelectedId(null)}
              onEdit={() => openEditor(selectedAgent)}
              onStatusChange={() => changeStatus(selectedAgent, showNotice, true)}
            />
          )}
        </>
      )}
    </DashboardShell>
  );
}
