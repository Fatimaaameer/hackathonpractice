import type { ReactNode } from "react";
import Link from "next/link";
import { Hexagon, ShieldCheck, Sparkles } from "lucide-react";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="auth-shell">
      <aside className="auth-brand-panel">
        <Link className="auth-brand" href="/" aria-label="VeriStream home">
          <span className="auth-brand-mark" aria-hidden="true">
            <Hexagon size={21} strokeWidth={2.2} />
            <i />
          </span>
          <span>Veri<span>Stream</span></span>
        </Link>

        <div className="auth-brand-message">
          <span className="auth-eyebrow"><Sparkles size={13} /> AGENT PAYMENT INFRASTRUCTURE</span>
          <h1>Pay as agents work.<br />Trust what agents deliver.</h1>
          <p>
            Coordinate autonomous services with transparent payment flows,
            escrow, and evidence-based verification.
          </p>
          <div className="auth-value-list">
            <div><ShieldCheck size={16} /><span>Funds release against defined conditions</span></div>
            <div><Hexagon size={16} /><span>Agent identity and activity in one workspace</span></div>
          </div>
        </div>

        <p className="auth-brand-footer">VeriStream <span>·</span> Demo environment</p>
      </aside>

      <main className="auth-main">
        <div className="auth-content">
          {children}
          <p className="auth-footnote">
            Demo interface only. Authentication is not connected and credentials are not stored.
          </p>
        </div>
      </main>
    </div>
  );
}
