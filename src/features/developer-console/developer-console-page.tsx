"use client";

import { useState, type FormEvent } from "react";
import {
  Activity,
  BookOpen,
  Clipboard,
  Code2,
  KeyRound,
  Network,
  RotateCw,
  ShieldCheck,
  Webhook,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import {
  agentRegistrationExample,
  demoApiKey,
  demoApiRequestLogs,
  demoContractAddresses,
  demoNetworkProfiles,
  demoWebhookEvents,
  demoWebhookUrl,
  developerApiOverview,
} from "@/mocks/developer-console";

type WebhookEvent = {
  id: string;
  label: string;
  enabled: boolean;
};

function SectionHeading({
  id,
  icon: Icon,
  title,
  description,
  label,
}: {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  label?: string;
}) {
  return (
    <div className="workspace-section-heading">
      <span className="workspace-section-icon">
        <Icon size={16} aria-hidden="true" />
      </span>
      <div>
        <h3 id={id}>{title}</h3>
        <p>{description}</p>
      </div>
      {label && <span className="workspace-section-label">{label}</span>}
    </div>
  );
}

export function DeveloperConsolePage() {
  const [keyVersion, setKeyVersion] = useState(1);
  const [keyActive, setKeyActive] = useState(true);
  const [webhookUrl, setWebhookUrl] = useState(demoWebhookUrl);
  const [webhookEnabled, setWebhookEnabled] = useState(false);
  const [webhookEvents, setWebhookEvents] = useState<WebhookEvent[]>(() =>
    demoWebhookEvents.map((event) => ({ ...event })),
  );
  const [webhookError, setWebhookError] = useState("");

  async function copyContent(
    value: string,
    label: string,
    showNotice: (message: string) => void,
  ) {
    try {
      await copyToClipboard(value);
      showNotice(`${label} copied to clipboard.`);
    } catch (error) {
      const detail =
        error instanceof Error ? error.message : "Unexpected clipboard failure.";
      showNotice(`Unable to copy ${label.toLowerCase()}: ${detail}`);
    }
  }

  function saveWebhook(event: FormEvent<HTMLFormElement>, showNotice: (message: string) => void) {
    event.preventDefault();
    if (!webhookEvents.some((item) => item.enabled)) {
      setWebhookError("Select at least one event for this demo webhook.");
      return;
    }

    setWebhookError("");
    showNotice(`Webhook settings ${webhookEnabled ? "enabled" : "saved disabled"} locally. No endpoint was contacted.`);
  }

  function toggleWebhookEvent(id: string) {
    setWebhookEvents((current) =>
      current.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item,
      ),
    );
    setWebhookError("");
  }

  return (
    <DashboardShell title="Developer Console" activeItem="Developer Console">
      {(showNotice) => (
        <>
          <section className="workspace-page-heading">
            <div>
              <div className="workspace-title-line">
                <h2>Developer Console</h2>
                <span className="demo-label"><span className="demo-dot" />Demo environment</span>
              </div>
              <p>Explore API patterns and integration settings for your agent services.</p>
            </div>
          </section>

          <div className="workspace-demo-banner" role="note">
            <ShieldCheck size={16} aria-hidden="true" />
            <p>
              <strong>Illustrative configuration only.</strong> API keys are masked placeholders, addresses are not deployed contracts, and no requests or blockchain operations are performed here.
            </p>
          </div>

          <div className="workspace-grid">
            <section className="workspace-section" aria-labelledby="console-keys-title">
              <SectionHeading
                id="console-keys-title"
                icon={KeyRound}
                title="API key management"
                description="Manage masked credentials for this demo workspace."
              />
              <div className="console-key-row">
                <div className="console-key-main">
                  <span className="console-key-name">{demoApiKey.label}</span>
                  <code>{demoApiKey.maskedValue}</code>
                  <small>Demo key v{String(keyVersion).padStart(2, "0")} · Created {demoApiKey.createdAt}</small>
                </div>
                <span className={`console-key-status${keyActive ? " is-active" : " is-revoked"}`}>
                  <i />{keyActive ? "Active demo" : "Revoked locally"}
                </span>
              </div>
              <div className="workspace-action-row">
                <button
                  type="button"
                  className="secondary-button workspace-action"
                  onClick={() => {
                    setKeyVersion((version) => version + 1);
                    setKeyActive(true);
                    showNotice("A new masked demo-key version is shown locally. No credential was generated.");
                  }}
                >
                  <RotateCw size={13} aria-hidden="true" />
                  Rotate demo key
                </button>
                <button
                  type="button"
                  className="workspace-text-action is-danger"
                  onClick={() => {
                    setKeyActive(false);
                    showNotice("The demo key was marked revoked locally. No real credential was changed.");
                  }}
                  disabled={!keyActive}
                >
                  Revoke locally
                </button>
              </div>
              <p className="workspace-inline-note">
                Never place API credentials in browser code. Use server-side environment variables for real integrations.
              </p>
            </section>

            <section className="workspace-section" aria-labelledby="console-api-overview-title">
              <SectionHeading
                id="console-api-overview-title"
                icon={BookOpen}
                title="API documentation overview"
                description="Illustrative request patterns. A live API is not connected."
                label="REFERENCE"
              />
              <div className="console-endpoint-list">
                {developerApiOverview.map((endpoint) => (
                  <div className="console-endpoint-row" key={`${endpoint.method}-${endpoint.path}`}>
                    <span className={`console-method method-${endpoint.method.toLowerCase()}`}>
                      {endpoint.method}
                    </span>
                    <div>
                      <code>{endpoint.path}</code>
                      <p>{endpoint.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="workspace-section workspace-section-wide" aria-labelledby="console-code-title">
              <SectionHeading
                id="console-code-title"
                icon={Code2}
                title="Agent registration example"
                description="Server-side example with an environment-variable placeholder. This endpoint is documentation-only."
                label="NODE.JS"
              />
              <div className="console-code-block">
                <div className="console-code-toolbar">
                  <span><i />agent-registration.example.ts</span>
                  <button
                    type="button"
                    className="icon-text-button"
                    onClick={() => void copyContent(agentRegistrationExample, "Code example", showNotice)}
                  >
                    <Clipboard size={13} aria-hidden="true" />
                    Copy example
                  </button>
                </div>
                <pre><code>{agentRegistrationExample}</code></pre>
              </div>
              <p className="workspace-inline-note">
                The <code>api.demo.veristream.example</code> hostname is reserved for examples; this snippet will not register an agent.
              </p>
            </section>

            <section className="workspace-section" aria-labelledby="console-contracts-title">
              <SectionHeading
                id="console-contracts-title"
                icon={ShieldCheck}
                title="Smart contract addresses"
                description="Copyable placeholders for interface testing."
                label="NOT DEPLOYED"
              />
              <div className="console-address-list">
                {demoContractAddresses.map((contract) => (
                  <div className="console-address-row" key={contract.name}>
                    <div className="console-address-heading">
                      <strong>{contract.name}</strong>
                      <span>{contract.network}</span>
                    </div>
                    <div className="console-address-value">
                      <code title={contract.address}>{contract.address}</code>
                      <button
                        type="button"
                        className="icon-button console-copy-button"
                        aria-label={`Copy sample ${contract.name} address`}
                        onClick={() => void copyContent(contract.address, "Sample public address", showNotice)}
                      >
                        <Clipboard size={13} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="workspace-section" aria-labelledby="console-networks-title">
              <SectionHeading
                id="console-networks-title"
                icon={Network}
                title="Network information"
                description="Reference chain IDs for demo profiles."
                label="NO CONNECTION"
              />
              <div className="console-network-list">
                {demoNetworkProfiles.map((network) => (
                  <div className="console-network-row" key={network.chainId}>
                    <div>
                      <strong>{network.name}</strong>
                      <span>{network.networkType} · {network.status}</span>
                    </div>
                    <code>{network.chainId}</code>
                  </div>
                ))}
              </div>
              <p className="workspace-inline-note">
                These profiles do not establish an RPC connection or indicate deployed VeriStream contracts.
              </p>
            </section>

            <section className="workspace-section" aria-labelledby="console-webhooks-title">
              <SectionHeading
                id="console-webhooks-title"
                icon={Webhook}
                title="Webhook configuration"
                description="Configure a local example endpoint and event selection."
              />
              <form className="workspace-form" onSubmit={(event) => saveWebhook(event, showNotice)}>
                <label className="workspace-field">
                  <span>Endpoint URL</span>
                  <input
                    type="url"
                    required
                    value={webhookUrl}
                    onChange={(event) => setWebhookUrl(event.target.value)}
                    placeholder="https://example.test/webhooks"
                  />
                </label>
                <label className="workspace-checkbox-row">
                  <input
                    type="checkbox"
                    checked={webhookEnabled}
                    onChange={(event) => setWebhookEnabled(event.target.checked)}
                  />
                  <span>Enable webhook in this demo</span>
                  <code>{webhookEnabled ? "Enabled" : "Disabled"}</code>
                </label>
                <div className="workspace-checkbox-list" role="group" aria-label="Webhook events">
                  {webhookEvents.map((item) => (
                    <label className="workspace-checkbox-row" key={item.id}>
                      <input
                        type="checkbox"
                        checked={item.enabled}
                        onChange={() => toggleWebhookEvent(item.id)}
                      />
                      <span>{item.label}</span>
                      <code>{item.id}</code>
                    </label>
                  ))}
                </div>
                {webhookError && <p className="workspace-form-error" role="alert">{webhookError}</p>}
                <div className="workspace-form-actions">
                  <button type="submit" className="primary-button">Save demo configuration</button>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => showNotice("A sample webhook event was simulated locally. No endpoint was contacted.")}
                  >
                    Send demo test event
                  </button>
                </div>
              </form>
            </section>

            <section className="workspace-section workspace-section-wide" aria-labelledby="console-logs-title">
              <SectionHeading
                id="console-logs-title"
                icon={Activity}
                title="Recent API request logs"
                description="Sample entries only; these are not requests made by this workspace."
                label="SAMPLE LOGS"
              />
              <div className="workspace-table-scroll">
                <table className="workspace-table console-log-table">
                  <thead>
                    <tr>
                      <th scope="col">Request</th>
                      <th scope="col">Method</th>
                      <th scope="col">Path</th>
                      <th scope="col">Sample status</th>
                      <th scope="col">Duration</th>
                      <th scope="col">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demoApiRequestLogs.map((request) => (
                      <tr key={request.id}>
                        <td><code>{request.id}</code></td>
                        <td><span className={`console-method method-${request.method.toLowerCase()}`}>{request.method}</span></td>
                        <td><code>{request.path}</code></td>
                        <td>
                          <span className={`console-log-status${request.status >= 400 ? " is-error" : ""}`}>
                            {request.status >= 400 ? "Error" : "OK"} · {request.status}
                          </span>
                        </td>
                        <td>{request.duration}</td>
                        <td>{request.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <footer className="workspace-demo-note">
            <span className="demo-dot" />
            Console controls only change local demo state. No API credentials, webhook calls, or blockchain operations are performed.
          </footer>
        </>
      )}
    </DashboardShell>
  );
}
