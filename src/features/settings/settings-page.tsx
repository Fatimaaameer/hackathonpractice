"use client";

import { useState, type FormEvent } from "react";
import {
  Bell,
  Copy,
  Globe2,
  Laptop,
  LockKeyhole,
  Network,
  Save,
  ShieldCheck,
  UserRound,
  WalletCards,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import {
  accountPreferenceOptions,
  demoAccountPreferences,
  demoNetworkPreferences,
  demoNotificationPreferences,
  demoProfile,
  demoSessions,
  demoWallet,
} from "@/mocks/settings";

type NotificationPreference = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
};

type DemoSession = {
  id: string;
  device: string;
  location: string;
  current: boolean;
  status: "Active" | "Ended";
};

function SettingsSectionHeading({
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

export function SettingsPage() {
  const [profile, setProfile] = useState(demoProfile);
  const [preferences, setPreferences] = useState(demoAccountPreferences);
  const [notifications, setNotifications] = useState<NotificationPreference[]>(() =>
    demoNotificationPreferences.map((item) => ({ ...item })),
  );
  const [network, setNetwork] = useState<string>(demoNetworkPreferences[0]);
  const [twoStepPreference, setTwoStepPreference] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("30 minutes");
  const [sessions, setSessions] = useState<DemoSession[]>(() =>
    demoSessions.map((session) => ({ ...session })),
  );

  function saveLocally(
    event: FormEvent<HTMLFormElement>,
    message: string,
    showNotice: (message: string) => void,
  ) {
    event.preventDefault();
    showNotice(`${message} This change is local to the demo and was not sent to a backend.`);
  }

  async function copyWallet(showNotice: (message: string) => void) {
    try {
      await copyToClipboard(demoWallet.address);
      showNotice("Sample public wallet address copied.");
    } catch (error) {
      const detail =
        error instanceof Error ? error.message : "Unexpected clipboard failure.";
      showNotice(`Unable to copy the sample address: ${detail}`);
    }
  }

  function toggleNotification(id: string) {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  }

  function endOtherSessions(showNotice: (message: string) => void) {
    setSessions((current) =>
      current.map((session) =>
        session.current ? session : { ...session, status: "Ended" },
      ),
    );
    showNotice("Other sample sessions were marked ended locally. No real session was signed out.");
  }

  const hasOtherActiveSessions = sessions.some(
    (session) => !session.current && session.status === "Active",
  );

  return (
    <DashboardShell title="Settings" activeItem="Settings">
      {(showNotice) => (
        <>
          <section className="workspace-page-heading">
            <div>
              <div className="workspace-title-line">
                <h2>Settings</h2>
                <span className="demo-label"><span className="demo-dot" />Demo preferences</span>
              </div>
              <p>Manage your profile, workspace preferences, and security options.</p>
            </div>
          </section>

          <div className="workspace-demo-banner" role="note">
            <ShieldCheck size={16} aria-hidden="true" />
            <p>
              <strong>Local demo settings.</strong> Changes update this page only; no account, wallet, network, notification, or security service is connected.
            </p>
          </div>

          <div className="workspace-grid settings-grid">
            <section className="workspace-section" aria-labelledby="settings-profile-title">
              <SettingsSectionHeading
                id="settings-profile-title"
                icon={UserRound}
                title="Profile information"
                description="Example workspace identity."
              />
              <form
                className="workspace-form"
                onSubmit={(event) => saveLocally(event, "Profile updated locally.", showNotice)}
              >
                <label className="workspace-field">
                  <span>Full name</span>
                  <input
                    type="text"
                    required
                    minLength={2}
                    maxLength={80}
                    value={profile.fullName}
                    onChange={(event) => setProfile((current) => ({ ...current, fullName: event.target.value }))}
                  />
                </label>
                <label className="workspace-field">
                  <span>Email address</span>
                  <input
                    type="email"
                    required
                    value={profile.email}
                    onChange={(event) => setProfile((current) => ({ ...current, email: event.target.value }))}
                  />
                </label>
                <label className="workspace-field">
                  <span>Organization</span>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={profile.organization}
                    onChange={(event) => setProfile((current) => ({ ...current, organization: event.target.value }))}
                  />
                </label>
                <div className="workspace-form-actions">
                  <button type="submit" className="primary-button">
                    <Save size={13} aria-hidden="true" />
                    Save profile locally
                  </button>
                </div>
              </form>
            </section>

            <section className="workspace-section" aria-labelledby="settings-account-title">
              <SettingsSectionHeading
                id="settings-account-title"
                icon={Globe2}
                title="Account preferences"
                description="Formatting preferences for the demo workspace."
              />
              <form
                className="workspace-form"
                onSubmit={(event) => saveLocally(event, "Account preferences updated locally.", showNotice)}
              >
                <label className="workspace-field">
                  <span>Language</span>
                  <select
                    value={preferences.language}
                    onChange={(event) => setPreferences((current) => ({ ...current, language: event.target.value }))}
                  >
                    {accountPreferenceOptions.languages.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <label className="workspace-field">
                  <span>Display currency</span>
                  <select
                    value={preferences.currency}
                    onChange={(event) => setPreferences((current) => ({ ...current, currency: event.target.value }))}
                  >
                    {accountPreferenceOptions.currencies.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <label className="workspace-field">
                  <span>Time zone</span>
                  <select
                    value={preferences.timezone}
                    onChange={(event) => setPreferences((current) => ({ ...current, timezone: event.target.value }))}
                  >
                    {accountPreferenceOptions.timezones.map((option) => (
                      <option key={option} value={option}>{option.replace(/_/g, " ")}</option>
                    ))}
                  </select>
                </label>
                <div className="workspace-form-actions">
                  <button type="submit" className="secondary-button">
                    <Save size={13} aria-hidden="true" />
                    Save preferences
                  </button>
                </div>
              </form>
            </section>

            <section className="workspace-section" aria-labelledby="settings-notifications-title">
              <SettingsSectionHeading
                id="settings-notifications-title"
                icon={Bell}
                title="Notification preferences"
                description="Choose which sample notifications are enabled."
              />
              <div className="settings-toggle-list">
                {notifications.map((item) => (
                  <label className="settings-toggle-row" key={item.id}>
                    <span>
                      <strong>{item.label}</strong>
                      <small>{item.description}</small>
                    </span>
                    <input
                      type="checkbox"
                      checked={item.enabled}
                      onChange={() => toggleNotification(item.id)}
                      aria-label={`${item.label} notifications`}
                    />
                  </label>
                ))}
              </div>
              <button
                type="button"
                className="secondary-button settings-save-button"
                onClick={() => showNotice("Notification preferences updated locally. No notification service was contacted.")}
              >
                <Save size={13} aria-hidden="true" />
                Save notification preferences
              </button>
            </section>

            <section className="workspace-section" aria-labelledby="settings-wallet-title">
              <SettingsSectionHeading
                id="settings-wallet-title"
                icon={WalletCards}
                title="Connected wallet"
                description="A sample public address for display only."
                label="NOT CONNECTED"
              />
              <div className="settings-wallet-card">
                <span className="settings-wallet-icon"><WalletCards size={17} aria-hidden="true" /></span>
                <div>
                  <strong>{demoWallet.label}</strong>
                  <small>Wallet connection is not enabled in this demo.</small>
                </div>
              </div>
              <div className="settings-wallet-address">
                <code>{demoWallet.address}</code>
                <button
                  type="button"
                  className="icon-button console-copy-button"
                  aria-label="Copy sample wallet address"
                  onClick={() => void copyWallet(showNotice)}
                >
                  <Copy size={13} aria-hidden="true" />
                </button>
              </div>
              <form
                className="workspace-form settings-network-form"
                onSubmit={(event) => saveLocally(event, "Network preference updated locally.", showNotice)}
              >
                <label className="workspace-field">
                  <span>Preferred network</span>
                  <select value={network} onChange={(event) => setNetwork(event.target.value)}>
                    {demoNetworkPreferences.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <small>Changing this preference does not connect a wallet or switch chains.</small>
                </label>
                <div className="workspace-form-actions">
                  <button type="submit" className="secondary-button">
                    <Network size={13} aria-hidden="true" />
                    Save network preference
                  </button>
                </div>
              </form>
            </section>

            <section className="workspace-section workspace-section-wide" aria-labelledby="settings-security-title">
              <SettingsSectionHeading
                id="settings-security-title"
                icon={LockKeyhole}
                title="Security and sessions"
                description="Security controls are preference examples; no authentication service is connected."
              />
              <div className="settings-security-grid">
                <div className="settings-security-preferences">
                  <label className="settings-toggle-row">
                    <span>
                      <strong>Two-step verification preference</strong>
                      <small>This toggle does not configure or enforce real two-factor authentication.</small>
                    </span>
                    <input
                      type="checkbox"
                      checked={twoStepPreference}
                      onChange={(event) => setTwoStepPreference(event.target.checked)}
                    />
                  </label>
                  <label className="workspace-field">
                    <span>Demo session timeout</span>
                    <select value={sessionTimeout} onChange={(event) => setSessionTimeout(event.target.value)}>
                      <option>15 minutes</option>
                      <option>30 minutes</option>
                      <option>1 hour</option>
                      <option>4 hours</option>
                    </select>
                  </label>
                  <button
                    type="button"
                    className="secondary-button settings-save-button"
                    onClick={() => showNotice("Security preferences updated locally. No authentication or session policy changed.")}
                  >
                    <Save size={13} aria-hidden="true" />
                    Save security preferences
                  </button>
                </div>

                <div className="settings-session-list">
                  <div className="settings-session-heading">
                    <div>
                      <strong>Sample sessions</strong>
                      <small>These entries do not represent authenticated sessions.</small>
                    </div>
                    <button
                      type="button"
                      className="workspace-text-action"
                      onClick={() => endOtherSessions(showNotice)}
                      disabled={!hasOtherActiveSessions}
                    >
                      End other sessions
                    </button>
                  </div>
                  {sessions.map((session) => (
                    <div className="settings-session-row" key={session.id}>
                      <span className="settings-session-icon"><Laptop size={15} aria-hidden="true" /></span>
                      <span className="settings-session-details">
                        <strong>{session.device}</strong>
                        <small>{session.location}{session.current ? " · Current" : ""}</small>
                      </span>
                      <span className={`settings-session-status${session.status === "Ended" ? " is-ended" : ""}`}>
                        <i />{session.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="workspace-inline-note">
                Never share private wallet keys or recovery phrases. VeriStream does not request them in this demo.
              </p>
            </section>
          </div>

          <footer className="workspace-demo-note">
            <span className="demo-dot" />
            Profile, notification, network, and security preferences are temporary local interactions and are not saved to a real account.
          </footer>
        </>
      )}
    </DashboardShell>
  );
}
