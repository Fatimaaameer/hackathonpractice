import type { VerificationRecord } from "@/features/verification/verification-data";

export const demoVerifications: VerificationRecord[] = [
  {
    id: "VER-DEMO-3021",
    task: "Q4 market landscape analysis",
    provider: "Research Alpha",
    method: "Artifact review",
    attestation: {
      id: "ATT-DEMO-A21",
      summary: "Sample digest and review assertion for the requested report.",
    },
    timestamp: "Nov 28, 2026 · 10:42 AM",
    result: "Verified",
    evidence: [
      {
        id: "EVD-DEMO-A21",
        source: "Independent evidence",
        kind: "Sample artifact digest",
        summary: "Demo report digest was compared with the submitted deliverable.",
        reference: "sha256:demo-artifact-3021",
      },
    ],
    backendConfirmation: {
      reference: "demo-confirmation-3021",
      result: "Verified",
      confirmedAt: "Nov 28, 2026 · 10:42 AM",
    },
  },
  {
    id: "VER-DEMO-3020",
    task: "Normalize supplier records",
    provider: "Data Oracle",
    method: "Evidence review",
    attestation: {
      id: "ATT-DEMO-A20",
      summary: "Evidence collection is not yet complete.",
    },
    timestamp: "Nov 28, 2026 · 10:18 AM",
    result: "Pending",
    evidence: [
      {
        id: "EVD-DEMO-A20",
        source: "Agent response",
        kind: "Agent HTTP response",
        summary: "The agent returned HTTP 200; this response alone is not verification evidence.",
        reference: null,
      },
    ],
    backendConfirmation: null,
  },
  {
    id: "VER-DEMO-3018",
    task: "Review contract permissions",
    provider: "Code Sentinel",
    method: "Rule and artifact review",
    attestation: {
      id: "ATT-DEMO-A18",
      summary: "Sample review found a mismatch against the expected permission policy.",
    },
    timestamp: "Nov 27, 2026 · 4:36 PM",
    result: "Rejected",
    evidence: [
      {
        id: "EVD-DEMO-A18",
        source: "Independent evidence",
        kind: "Policy comparison",
        summary: "Sample permission output does not match the reference policy.",
        reference: "policy-demo://comparison/3018",
      },
    ],
    backendConfirmation: {
      reference: "demo-confirmation-3018",
      result: "Rejected",
      confirmedAt: "Nov 27, 2026 · 4:36 PM",
    },
  },
  {
    id: "VER-DEMO-3016",
    task: "Portfolio exposure snapshot",
    provider: "QuantScope",
    method: "Attestation expiry check",
    attestation: {
      id: "ATT-DEMO-A16",
      summary: "Sample attestation is outside its configured validity window.",
    },
    timestamp: "Nov 26, 2026 · 2:05 PM",
    result: "Expired",
    evidence: [],
    backendConfirmation: null,
  },
  {
    id: "VER-DEMO-3014",
    task: "Product copy localization",
    provider: "Verba Studio",
    method: "Human review",
    attestation: {
      id: "ATT-DEMO-A14",
      summary: "A sample reviewer has contested the localization result.",
    },
    timestamp: "Nov 25, 2026 · 11:20 AM",
    result: "Disputed",
    evidence: [
      {
        id: "EVD-DEMO-A14",
        source: "Independent evidence",
        kind: "Reviewer note",
        summary: "Sample review identified terminology that needs a second assessment.",
        reference: "review-demo://case/3014",
      },
    ],
    backendConfirmation: {
      reference: "demo-confirmation-3014",
      result: "Disputed",
      confirmedAt: "Nov 25, 2026 · 11:20 AM",
    },
  },
];
