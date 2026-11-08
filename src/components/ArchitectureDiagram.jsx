import React from 'react';

const VIEW_W = 820;
const VIEW_H = 420;
const NODE_W = 150;
const NODE_H = 58;

export const KIND_COLORS = {
  client: '#6FFF00',
  service: '#22d3ee',
  data: '#f59e0b',
  ai: '#b724ff',
  edge: '#60a5fa',
  external: '#94a3b8',
};

export const KIND_LABELS = [
  { kind: 'client', label: 'Client' },
  { kind: 'service', label: 'Service' },
  { kind: 'data', label: 'Data' },
  { kind: 'ai', label: 'AI / ML' },
  { kind: 'edge', label: 'Edge' },
  { kind: 'external', label: 'External' },
];

function buildPositions(layers) {
  const positions = {};
  const columns = layers.map((layer) => {
    const count = layer.nodes.length;
    const step = VIEW_H / (count + 1);
    return layer.nodes.map((node, index) => {
      const pos = { ...node, x: layer.x, y: step * (index + 1) };
      positions[node.id] = pos;
      return pos;
    });
  });
  return { positions, columns };
}

function edgePath(source, target) {
  const goingRight = target.x >= source.x;
  const x1 = source.x + (goingRight ? NODE_W / 2 : -NODE_W / 2);
  const x2 = target.x + (goingRight ? -NODE_W / 2 : NODE_W / 2);
  const midX = (x1 + x2) / 2;
  return `M ${x1} ${source.y} C ${midX} ${source.y}, ${midX} ${target.y}, ${x2} ${target.y}`;
}

export default function ArchitectureDiagram({
  architecture,
  activeNodeId = null,
  highlightTech = null,
  onHoverNode,
}) {
  const { layers = [], edges = [] } = architecture || {};
  const { positions, columns } = buildPositions(layers);

  const highlightedTech = highlightTech ? highlightTech.toLowerCase() : null;
  const isNodeHighlighted = (node) =>
    node.id === activeNodeId ||
    (highlightedTech && String(node.tech).toLowerCase() === highlightedTech);

  const hasHighlight = Boolean(activeNodeId || highlightedTech);

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="h-auto w-full min-w-[560px] select-none sm:min-w-0"
      role="group"
      aria-label="System architecture diagram"
    >
      <defs>
        <marker
          id="arch-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.35)" />
        </marker>
        <marker
          id="arch-arrow-hot"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#6FFF00" />
        </marker>
        <filter id="arch-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Edges */}
      <g>
        {edges.map((edge, index) => {
          const source = positions[edge.from];
          const target = positions[edge.to];
          if (!source || !target) return null;

          const sourceHot = isNodeHighlighted(source);
          const targetHot = isNodeHighlighted(target);
          const hot = hasHighlight && (sourceHot || targetHot);

          return (
            <path
              key={`${edge.from}-${edge.to}-${index}`}
              d={edgePath(source, target)}
              fill="none"
              stroke={hot ? '#6FFF00' : 'rgba(255,255,255,0.16)'}
              strokeWidth={hot ? 2 : 1.4}
              strokeLinecap="round"
              markerEnd={hot ? 'url(#arch-arrow-hot)' : 'url(#arch-arrow)'}
              className="arch-edge transition-all duration-200"
              opacity={hasHighlight && !hot ? 0.25 : 1}
            />
          );
        })}
      </g>

      {/* Nodes */}
      <g>
        {columns.flat().map((node) => {
          const color = KIND_COLORS[node.kind] || KIND_COLORS.external;
          const highlighted = isNodeHighlighted(node);
          const dimmed = hasHighlight && !highlighted;
          const x = node.x - NODE_W / 2;
          const y = node.y - NODE_H / 2;

          return (
            <g
              key={node.id}
              onMouseEnter={() => onHoverNode?.(node.id)}
              onMouseLeave={() => onHoverNode?.(null)}
              onFocus={() => onHoverNode?.(node.id)}
              onBlur={() => onHoverNode?.(null)}
              tabIndex={0}
              role="group"
              aria-label={`${node.label} (${node.tech})`}
              className="cursor-pointer outline-none"
              style={{
                opacity: dimmed ? 0.4 : 1,
                transition: 'opacity 200ms ease',
              }}
            >
              <rect
                x={x}
                y={y}
                width={NODE_W}
                height={NODE_H}
                rx="10"
                fill={highlighted ? `${color}22` : 'rgba(255,255,255,0.04)'}
                stroke={highlighted ? color : 'rgba(255,255,255,0.16)'}
                strokeWidth={highlighted ? 1.8 : 1}
                filter={highlighted ? 'url(#arch-glow)' : undefined}
                style={{ transition: 'all 200ms ease' }}
              />
              <rect x={x} y={y} width="3" height={NODE_H} rx="1.5" fill={color} />
              <text
                x={node.x}
                y={node.y - 4}
                textAnchor="middle"
                fill="#EFF4FF"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              >
                {node.label}
              </text>
              <text
                x={node.x}
                y={node.y + 13}
                textAnchor="middle"
                fill={color}
                fontSize="8.5"
                fontWeight="600"
                letterSpacing="1"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              >
                {String(node.tech).toUpperCase()}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
