"use client";

import { motion } from "framer-motion";

interface Node {
  id: string;
  x: number;
  y: number;
  r: number;
  label?: string;
}

const NODES: Node[] = [
  { id: "core", x: 260, y: 190, r: 22, label: "HR" },
  { id: "eng", x: 110, y: 100, r: 14 },
  { id: "prod", x: 420, y: 90, r: 14 },
  { id: "sales", x: 460, y: 240, r: 13 },
  { id: "design", x: 90, y: 260, r: 12 },
  { id: "fin", x: 300, y: 320, r: 13 },
  { id: "ops", x: 190, y: 330, r: 11 },
  { id: "cs", x: 400, y: 320, r: 11 },
  { id: "n1", x: 40, y: 170, r: 7 },
  { id: "n2", x: 500, y: 150, r: 7 },
  { id: "n3", x: 350, y: 40, r: 6 },
  { id: "n4", x: 150, y: 40, r: 6 },
];

const LINKS: [string, string][] = [
  ["core", "eng"],
  ["core", "prod"],
  ["core", "sales"],
  ["core", "design"],
  ["core", "fin"],
  ["core", "ops"],
  ["core", "cs"],
  ["eng", "n1"],
  ["prod", "n2"],
  ["prod", "n3"],
  ["design", "n4"],
  ["eng", "design"],
  ["sales", "cs"],
  ["fin", "ops"],
];

function findNode(id: string) {
  return NODES.find((n) => n.id === id)!;
}

export function HeroNetworkGraphic() {
  return (
    <svg
      viewBox="0 0 560 380"
      className="h-auto w-full"
      role="img"
      aria-label="Illustration of connected teams and departments radiating from a central HR hub"
    >
      <defs>
        <radialGradient id="hero-core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={260} cy={190} r={90} fill="url(#hero-core-glow)" />

      {LINKS.map(([a, b], i) => {
        const from = findNode(a);
        const to = findNode(b);
        return (
          <motion.line
            key={`${a}-${b}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="var(--color-border-strong)"
            strokeWidth={1.25}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.05, ease: "easeOut" }}
          />
        );
      })}

      {NODES.map((node, i) => (
        <g key={node.id}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill={node.id === "core" ? "var(--color-primary)" : "var(--color-card)"}
            stroke={node.id === "core" ? "var(--color-primary)" : "var(--color-primary)"}
            strokeWidth={node.id === "core" ? 0 : 1.5}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          />
          {node.id === "core" && (
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth={1.5}
              initial={{ opacity: 0.6, scale: 1 }}
              animate={{ opacity: 0, scale: 1.9 }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeOut",
                delay: 1.2,
              }}
            />
          )}
        </g>
      ))}

      <text
        x={260}
        y={195}
        textAnchor="middle"
        className="font-sans"
        fontSize={12}
        fontWeight={600}
        fill="var(--color-primary-foreground)"
      >
        Aura
      </text>
    </svg>
  );
}
