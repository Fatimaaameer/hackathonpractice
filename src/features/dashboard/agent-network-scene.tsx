"use client";

import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import { DoubleSide, Quaternion, Shape, ShapeGeometry, Vector3 } from "three";
import type { AgentNetworkSceneProps, AgentNetworkNode } from "./agent-network-types";
import { StaticAgentNetwork } from "./static-agent-network";

const statusColors = {
  Active: "#42b7cb",
  Inactive: "#7d8ca1",
  Pending: "#c5a35b",
} as const;

const coreOrigin: [number, number, number] = [0, 0, 0];

function NetworkLink({
  from,
  to,
  color,
  opacity,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
  opacity: number;
}) {
  const { length, midpoint, rotation } = useMemo(() => {
    const start = new Vector3(...from);
    const end = new Vector3(...to);
    const direction = end.clone().sub(start);
    const length = direction.length();
    direction.normalize();

    return {
      length,
      midpoint: start.add(end).multiplyScalar(0.5),
      rotation: new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), direction),
    };
  }, [from, to]);

  return (
    <mesh position={midpoint} quaternion={rotation}>
      <cylinderGeometry args={[0.008, 0.008, length, 5]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function AgentNode({
  node,
  hoveredAgentId,
  selectedAgentId,
  onHoverAgent,
  onSelectAgent,
}: {
  node: AgentNetworkNode;
  hoveredAgentId: string | null;
  selectedAgentId: string | null;
  onHoverAgent: (agentId: string | null) => void;
  onSelectAgent: (agentId: string) => void;
}) {
  const { agent, position } = node;
  const color = statusColors[agent.status];
  const isActive = agent.status === "Active";
  const isHovered = hoveredAgentId === agent.id;
  const isSelected = selectedAgentId === agent.id;

  return (
    <group position={position} scale={isSelected ? 1.12 : 1}>
      <mesh
        scale={isHovered ? 1.18 : 1}
        onPointerOver={(event) => {
          event.stopPropagation();
          onHoverAgent(agent.id);
        }}
        onPointerOut={(event) => {
          event.stopPropagation();
          onHoverAgent(null);
        }}
        onClick={(event) => {
          event.stopPropagation();
          onSelectAgent(agent.id);
        }}
      >
        <icosahedronGeometry args={[isActive ? 0.22 : 0.19, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 0.22 : 0.08}
          roughness={0.48}
          metalness={0.12}
          transparent={!isActive}
          opacity={agent.status === "Inactive" ? 0.7 : 1}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.3, 0.012, 5, 28]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isHovered || isSelected ? 0.82 : 0.38}
        />
      </mesh>
    </group>
  );
}

function VerificationShield() {
  const shieldGeometry = useMemo(() => {
    const shape = new Shape();
    shape.moveTo(0, 0.28);
    shape.lineTo(0.23, 0.18);
    shape.lineTo(0.2, -0.07);
    shape.quadraticCurveTo(0.14, -0.23, 0, -0.31);
    shape.quadraticCurveTo(-0.14, -0.23, -0.2, -0.07);
    shape.lineTo(-0.23, 0.18);
    shape.closePath();
    return new ShapeGeometry(shape);
  }, []);

  return (
    <group position={[-0.95, 0.82, -0.15]} rotation={[0, 0, -0.12]}>
      <mesh geometry={shieldGeometry}>
        <meshStandardMaterial
          color="#284e72"
          emissive="#1c405b"
          emissiveIntensity={0.2}
          side={DoubleSide}
        />
      </mesh>
      <mesh position={[-0.035, -0.005, 0.035]} rotation={[0, 0, -0.75]}>
        <boxGeometry args={[0.045, 0.14, 0.025]} />
        <meshBasicMaterial color="#9bdde3" />
      </mesh>
      <mesh position={[0.04, -0.025, 0.045]} rotation={[0, 0, 0.7]}>
        <boxGeometry args={[0.045, 0.22, 0.025]} />
        <meshBasicMaterial color="#9bdde3" />
      </mesh>
    </group>
  );
}

function EscrowVault() {
  return (
    <group position={[1.05, -0.86, -0.1]}>
      <mesh>
        <boxGeometry args={[0.42, 0.38, 0.24]} />
        <meshStandardMaterial color="#334b65" metalness={0.35} roughness={0.55} />
      </mesh>
      <mesh position={[0, 0, 0.14]}>
        <cylinderGeometry args={[0.1, 0.1, 0.045, 12]} />
        <meshStandardMaterial color="#86a4bd" metalness={0.4} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.17]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial color="#b4c9d6" />
      </mesh>
    </group>
  );
}

function BlockchainCore() {
  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[0.58, 1]} />
        <meshStandardMaterial
          color="#1e4770"
          emissive="#153a62"
          emissiveIntensity={0.34}
          metalness={0.35}
          roughness={0.42}
        />
      </mesh>
      <mesh rotation={[0.75, 0.3, 0]}>
        <torusGeometry args={[0.78, 0.018, 6, 64]} />
        <meshBasicMaterial color="#4d9ac0" transparent opacity={0.64} />
      </mesh>
      <mesh rotation={[1.2, -0.45, 0.3]}>
        <torusGeometry args={[0.92, 0.01, 5, 64]} />
        <meshBasicMaterial color="#3671a0" transparent opacity={0.42} />
      </mesh>
    </group>
  );
}

function AgentNetworkObjects({
  nodes,
  hoveredAgentId,
  selectedAgentId,
  onHoverAgent,
  onSelectAgent,
}: AgentNetworkSceneProps) {
  return (
    <>
      <ambientLight intensity={0.85} />
      <pointLight position={[-3, 4, 5]} intensity={3.5} color="#8bbfe8" />
      <pointLight position={[3, -2, 3]} intensity={1.8} color="#43abc0" />

      {nodes.map((node) => (
        <NetworkLink
          key={`link-${node.agent.id}`}
          from={coreOrigin}
          to={node.position}
          color={statusColors[node.agent.status]}
          opacity={node.agent.status === "Active" ? 0.28 : 0.17}
        />
      ))}

      <BlockchainCore />
      <VerificationShield />
      <EscrowVault />
      {nodes.map((node) => (
        <AgentNode
          key={node.agent.id}
          node={node}
          hoveredAgentId={hoveredAgentId}
          selectedAgentId={selectedAgentId}
          onHoverAgent={onHoverAgent}
          onSelectAgent={onSelectAgent}
        />
      ))}
    </>
  );
}

export function AgentNetworkScene({
  nodes,
  hoveredAgentId,
  selectedAgentId,
  onHoverAgent,
  onSelectAgent,
  onSceneReady,
}: AgentNetworkSceneProps & { onSceneReady: () => void }) {
  return (
    <Canvas
      className="network-scene-canvas"
      camera={{ position: [0, 0, 9], fov: 30 }}
      dpr={[1, 1.35]}
      frameloop="demand"
      onCreated={() => onSceneReady()}
      onPointerMissed={() => onHoverAgent(null)}
      fallback={
        <StaticAgentNetwork
          nodes={nodes}
          hoveredAgentId={hoveredAgentId}
          selectedAgentId={selectedAgentId}
          fallbackReason="unavailable"
          onHoverAgent={onHoverAgent}
          onSelectAgent={onSelectAgent}
        />
      }
    >
      <AgentNetworkObjects
        nodes={nodes}
        hoveredAgentId={hoveredAgentId}
        selectedAgentId={selectedAgentId}
        onHoverAgent={onHoverAgent}
        onSelectAgent={onSelectAgent}
      />
    </Canvas>
  );
}
