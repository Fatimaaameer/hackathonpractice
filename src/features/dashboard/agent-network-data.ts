import { demoAgents } from "@/mocks/agents";
import type { AgentNetworkNode } from "./agent-network-types";

const agentPositions: Array<{
  position: [number, number, number];
  x: number;
  y: number;
}> = [
  { position: [0, 2.15, 0.2], x: 50, y: 15 },
  { position: [2.65, 1.1, -0.3], x: 78, y: 29 },
  { position: [2.75, -1.05, 0.2], x: 79, y: 69 },
  { position: [1.35, -1.8, -0.3], x: 62, y: 84 },
  { position: [-1.35, -1.8, 0.15], x: 38, y: 84 },
  { position: [-2.7, -0.75, -0.35], x: 21, y: 63 },
];

function activityForAgent(agent: (typeof demoAgents)[number]): string {
  if (agent.status === "Pending") return "Awaiting activation";
  if (agent.status === "Inactive") {
    return `No active task · Last activity ${agent.lastActivity}`;
  }

  const recentTask = agent.taskHistory[0]?.title;
  return recentTask
    ? `${recentTask} · ${agent.lastActivity}`
    : `Available · ${agent.lastActivity}`;
}

export const agentNetworkNodes: AgentNetworkNode[] = demoAgents
  .slice(0, agentPositions.length)
  .map((agent, index) => ({
    agent,
    ...agentPositions[index],
    activity: activityForAgent(agent),
  }));

export const agentNetworkCounts = {
  active: agentNetworkNodes.filter(({ agent }) => agent.status === "Active").length,
  inactive: agentNetworkNodes.filter(({ agent }) => agent.status === "Inactive").length,
  pending: agentNetworkNodes.filter(({ agent }) => agent.status === "Pending").length,
  total: agentNetworkNodes.length,
};
