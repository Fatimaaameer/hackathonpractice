export const verificationResults = [
  "All results",
  "Pending",
  "Verified",
  "Rejected",
  "Expired",
  "Disputed",
] as const;

export type VerificationResult = Exclude<
  (typeof verificationResults)[number],
  "All results"
>;

export type VerificationEvidence = {
  id: string;
  source: "Independent evidence" | "Agent response";
  kind: string;
  summary: string;
  reference: string | null;
};

export type VerificationBackendConfirmation = {
  reference: string;
  result: VerificationResult;
  confirmedAt: string;
};

export type VerificationRecord = {
  id: string;
  task: string;
  provider: string;
  method: string;
  attestation: { id: string; summary: string };
  timestamp: string;
  result: VerificationResult;
  evidence: VerificationEvidence[];
  backendConfirmation: VerificationBackendConfirmation | null;
};

export function getEffectiveVerificationResult(record: VerificationRecord) {
  if (record.result !== "Verified") return record.result;

  const hasIndependentEvidence = record.evidence.some(
    (item) => item.source === "Independent evidence" && Boolean(item.reference),
  );
  const hasBackendConfirmation = Boolean(
    record.backendConfirmation?.reference &&
      record.backendConfirmation.result === "Verified",
  );

  return hasIndependentEvidence && hasBackendConfirmation ? "Verified" : "Pending";
}
