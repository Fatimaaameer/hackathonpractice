import type { AgentRecord } from "@/features/agents/agents-data";

export type AgentNetworkNode = {
  agent: AgentRecord;
  position: [number, number, number];
  x: number;
  y: number;
  activity: string;
};

export type AgentNetworkVisualProps = {
  nodes: AgentNetworkNode[];
  hoveredAgentId: string | null;
  selectedAgentId: string | null;
  fallbackReason?: "loading" | "unavailable" | "error";
  onHoverAgent: (agentId: string | null) => void;
  onSelectAgent: (agentId: string) => void;
};

export type AgentNetworkSceneProps = Omit<
  AgentNetworkVisualProps,
  "fallbackReason"
>;
