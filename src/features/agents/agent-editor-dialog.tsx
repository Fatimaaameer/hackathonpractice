"use client";

import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import {
  agentCategories,
  agentPermissions,
  type AgentRecord,
} from "./agents-data";

type AgentEditorDialogProps = {
  agent?: AgentRecord;
  onClose: () => void;
  onSave: (agent: AgentRecord) => string | null;
};

export function AgentEditorDialog({
  agent,
  onClose,
  onSave,
}: AgentEditorDialogProps) {
  const [permissions, setPermissions] = useState<string[]>(
    agent?.permissions ?? ["Read task listings"],
  );
  const [error, setError] = useState("");
  const editing = Boolean(agent);

  function togglePermission(permission: string) {
    setPermissions((current) =>
      current.includes(permission)
        ? current.filter((value) => value !== permission)
        : [...current, permission],
    );
    setError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (permissions.length === 0) {
      setError("Select at least one permission for this agent.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const savedAgent: AgentRecord = {
      id: String(formData.get("id")).trim().toLowerCase(),
      name: String(formData.get("name")).trim(),
      wallet: String(formData.get("wallet")).trim(),
      category: String(formData.get("category")),
      status: agent?.status ?? "Pending",
      reputation: agent?.reputation ?? null,
      transactionCount: agent?.transactionCount ?? 0,
      lastActivity: agent?.lastActivity ?? "Awaiting activation",
      spendingLimit: String(formData.get("spendingLimit")),
      permissions,
      taskHistory: agent?.taskHistory ?? [],
    };

    const saveError = onSave(savedAgent);
    if (saveError) {
      setError(saveError);
      return;
    }

    onClose();
  }

  return (
    <div
      className="agent-dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="agent-dialog agent-form-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="agent-form-title"
      >
        <div className="agent-dialog-heading">
          <div>
            <span className="eyebrow">{editing ? "AGENT SETTINGS" : "NEW AGENT"}</span>
            <h2 id="agent-form-title">{editing ? "Edit agent metadata" : "Register agent"}</h2>
            <p>
              {editing
                ? "Update this agent’s demo profile and permissions."
                : "Add an agent to this local demo directory."}
            </p>
          </div>
          <button type="button" className="icon-button" aria-label="Close dialog" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form className="agent-form" onSubmit={handleSubmit}>
          <label className="agent-field">
            <span>Agent name</span>
            <input
              name="name"
              type="text"
              required
              minLength={2}
              maxLength={60}
              autoComplete="off"
              defaultValue={agent?.name ?? ""}
              placeholder="e.g. Research Alpha"
            />
          </label>

          <label className="agent-field">
            <span>Agent ID</span>
            <input
              name="id"
              type="text"
              required
              minLength={7}
              maxLength={28}
              pattern="agt-[a-z0-9][a-z0-9\-]{2,23}"
              title="Use agt- followed by 3–24 lowercase letters, numbers, or hyphens."
              autoComplete="off"
              readOnly={editing}
              defaultValue={agent?.id ?? ""}
              placeholder="agt-your-agent-id"
            />
            <small>Use agt- followed by 3–24 lowercase letters, numbers, or hyphens.</small>
          </label>

          <label className="agent-field">
            <span>Wallet address</span>
            <input
              name="wallet"
              type="text"
              required
              pattern="0x[a-fA-F0-9]{40}"
              title="Enter a valid 0x-prefixed 40-character EVM address."
              autoComplete="off"
              defaultValue={agent?.wallet ?? ""}
              placeholder="0x followed by 40 hexadecimal characters"
            />
            <small>Demo only. No wallet is connected or verified.</small>
          </label>

          <div className="agent-form-row">
            <label className="agent-field">
              <span>Category</span>
              <select name="category" required defaultValue={agent?.category ?? ""}>
                <option value="" disabled>Select category</option>
                {agentCategories.map((category) => (
                  <option value={category} key={category}>{category}</option>
                ))}
              </select>
            </label>
            <label className="agent-field">
              <span>Spending limit (USDC / day)</span>
              <input
                name="spendingLimit"
                type="number"
                required
                min="0.01"
                max="10000000"
                step="0.01"
                defaultValue={agent?.spendingLimit ?? "1000"}
              />
            </label>
          </div>

          <fieldset className="permission-fieldset">
            <legend>Permissions</legend>
            <p>These are demo metadata only and do not grant on-chain access.</p>
            <div className="permission-options">
              {agentPermissions.map((permission) => (
                <label key={permission} className="permission-option">
                  <input
                    type="checkbox"
                    checked={permissions.includes(permission)}
                    onChange={() => togglePermission(permission)}
                  />
                  <span>{permission}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {error && <p className="agent-form-error" role="alert">{error}</p>}

          <div className="agent-dialog-actions">
            <button type="button" className="secondary-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary-button">
              {editing ? "Save metadata" : "Add to demo"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
