import { Network } from "lucide-react";
import { agentInitials } from "@/features/agents/agents-data";
import type { AgentNetworkVisualProps } from "./agent-network-types";

const fallbackLabels = {
  loading: "Loading 3D view · static preview",
  unavailable: "WebGL unavailable · static view",
  error: "3D view unavailable · static view",
} as const;

export function StaticAgentNetwork({
  nodes,
  selectedAgentId,
  fallbackReason = "unavailable",
  onHoverAgent,
  onSelectAgent,
}: AgentNetworkVisualProps) {
  return (
    <div className="network-static-fallback" aria-label="Interactive static agent network">
      <svg className="network-lines" viewBox="0 0 700 300" preserveAspectRatio="none" aria-hidden="true">
        {nodes.map(({ agent, x, y }) => (
          <line
            key={agent.id}
            x1="350"
            y1="150"
            x2={(x / 100) * 700}
            y2={(y / 100) * 300}
            className={`network-link-${agent.status.toLowerCase()}`}
          />
        ))}
      </svg>

      <div className="network-halo" />
      {nodes.map(({ agent, x, y, activity }) => (
        <button
          type="button"
          key={agent.id}
          className={`network-agent-node network-agent-node-${agent.status.toLowerCase()}${selectedAgentId === agent.id ? " is-selected" : ""}`}
          style={{ left: `${x}%`, top: `${y}%` }}
          aria-label={`${agent.name}, ${agent.status}. ${activity}. Open details.`}
          aria-pressed={selectedAgentId === agent.id}
          onMouseEnter={() => onHoverAgent(agent.id)}
          onMouseLeave={() => onHoverAgent(null)}
          onFocus={() => onHoverAgent(agent.id)}
          onBlur={() => onHoverAgent(null)}
          onClick={() => onSelectAgent(agent.id)}
        >
          {agentInitials(agent.name)}
        </button>
      ))}

      <div className="network-center">
        <div className="network-center-icon">
          <Network size={21} strokeWidth={1.7} aria-hidden="true" />
        </div>
        <span className="network-center-name">VeriStream core</span>
        <span className="network-center-count">{nodes.length} sample agents</span>
      </div>

      <span className="network-fallback-label">{fallbackLabels[fallbackReason]}</span>
    </div>
  );
}
