"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useMemo, useState, type ReactNode } from "react";
import { LockKeyhole, ShieldCheck, X } from "lucide-react";
import { agentNetworkNodes } from "./agent-network-data";
import type { AgentNetworkSceneProps } from "./agent-network-types";
import { StaticAgentNetwork } from "./static-agent-network";

type SceneComponentProps = AgentNetworkSceneProps & {
  onSceneReady: () => void;
};

const AgentNetworkScene = dynamic<SceneComponentProps>(
  () => import("./agent-network-scene").then((module) => module.AgentNetworkScene),
  { ssr: false, loading: () => null },
);

type SceneState = "checking" | "loading" | "ready" | "unavailable" | "error";

type ErrorBoundaryProps = {
  children: ReactNode;
  onError: (error: Error) => void;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class SceneErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Agent network 3D scene failed to render.", error);
    this.props.onError(error);
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl") ?? canvas.getContext("webgl2");
    if (!context) return false;
    context.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch (error) {
    console.warn("WebGL capability check failed; using the static agent network.", error);
    return false;
  }
}

export function AgentNetworkVisualization() {
  const [sceneState, setSceneState] = useState<SceneState>("checking");
  const [hoveredAgentId, setHoveredAgentId] = useState<string | null>(null);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setSceneState(isWebGLAvailable() ? "loading" : "unavailable");
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const hoveredNode = useMemo(
    () => agentNetworkNodes.find(({ agent }) => agent.id === hoveredAgentId),
    [hoveredAgentId],
  );
  const selectedNode = useMemo(
    () => agentNetworkNodes.find(({ agent }) => agent.id === selectedAgentId),
    [selectedAgentId],
  );

  const fallbackReason =
    sceneState === "error" || sceneState === "unavailable"
      ? sceneState
      : sceneState === "ready"
        ? undefined
        : "loading";

  return (
    <>
      <div className="network-visual network-scene-stage" role="group" aria-label="Interactive agent network demo">
        {sceneState !== "ready" && (
          <StaticAgentNetwork
            nodes={agentNetworkNodes}
            hoveredAgentId={hoveredAgentId}
            selectedAgentId={selectedAgentId}
            fallbackReason={fallbackReason}
            onHoverAgent={setHoveredAgentId}
            onSelectAgent={setSelectedAgentId}
          />
        )}

        {sceneState !== "checking" &&
          sceneState !== "unavailable" &&
          sceneState !== "error" && (
            <SceneErrorBoundary
              onError={() => setSceneState("error")}
            >
              <AgentNetworkScene
                nodes={agentNetworkNodes}
                hoveredAgentId={hoveredAgentId}
                selectedAgentId={selectedAgentId}
                onHoverAgent={setHoveredAgentId}
                onSelectAgent={setSelectedAgentId}
                onSceneReady={() => setSceneState("ready")}
              />
            </SceneErrorBoundary>
          )}

        <div className="network-service-markers" aria-label="Network services">
          <span><ShieldCheck size={12} aria-hidden="true" /> Verification</span>
          <span><LockKeyhole size={12} aria-hidden="true" /> Escrow</span>
        </div>

        <div className="network-payment-particles" aria-hidden="true">
          <i className="network-payment-particle network-payment-particle-one" />
          <i className="network-payment-particle network-payment-particle-two" />
          <i className="network-payment-particle network-payment-particle-three" />
        </div>

        {hoveredNode && (
          <div className="network-agent-tooltip" role="status">
            <strong>{hoveredNode.agent.name}</strong>
            <span className={`network-tooltip-status status-${hoveredNode.agent.status.toLowerCase()}`}>
              {hoveredNode.agent.status}
            </span>
            <p>{hoveredNode.activity}</p>
          </div>
        )}
      </div>

      <div className="network-agent-control">
        <label htmlFor="network-agent-select">Inspect sample agent</label>
        <select
          id="network-agent-select"
          value={selectedAgentId ?? ""}
          onFocus={(event) => {
            if (event.currentTarget.value) setHoveredAgentId(event.currentTarget.value);
          }}
          onBlur={() => setHoveredAgentId(null)}
          onChange={(event) => {
            const agentId = event.currentTarget.value;
            setSelectedAgentId(agentId || null);
            setHoveredAgentId(agentId || null);
          }}
        >
          <option value="">Select an agent</option>
          {agentNetworkNodes.map(({ agent }) => (
            <option key={agent.id} value={agent.id}>
              {agent.name} · {agent.status}
            </option>
          ))}
        </select>
      </div>

      {selectedNode && (
        <section className="network-agent-details" aria-live="polite" aria-label={`${selectedNode.agent.name} details`}>
          <div className="network-agent-details-heading">
            <div>
              <strong>{selectedNode.agent.name}</strong>
              <span>{selectedNode.agent.id}</span>
            </div>
            <span className={`network-tooltip-status status-${selectedNode.agent.status.toLowerCase()}`}>
              {selectedNode.agent.status}
            </span>
            <button
              type="button"
              className="network-agent-details-close"
              aria-label={`Close ${selectedNode.agent.name} details`}
              onClick={() => setSelectedAgentId(null)}
            >
              <X size={15} aria-hidden="true" />
            </button>
          </div>
          <p className="network-agent-details-activity">{selectedNode.activity}</p>
          <dl>
            <div><dt>Category</dt><dd>{selectedNode.agent.category}</dd></div>
            <div>
              <dt>Reputation</dt>
              <dd>{selectedNode.agent.reputation?.toFixed(2) ?? "Not rated"}</dd>
            </div>
            <div><dt>Transactions</dt><dd>{selectedNode.agent.transactionCount}</dd></div>
          </dl>
        </section>
      )}
    </>
  );
}
