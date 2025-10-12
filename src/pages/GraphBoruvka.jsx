import React, { useState } from "react";

// Sample graph data
const initialNodes = [
  { id: 0, x: 100, y: 100 },
  { id: 1, x: 300, y: 100 },
  { id: 2, x: 200, y: 300 },
  { id: 3, x: 400, y: 300 },
];

const initialEdges = [
  { from: 0, to: 1, weight: 4 },
  { from: 0, to: 2, weight: 3 },
  { from: 1, to: 2, weight: 1 },
  { from: 1, to: 3, weight: 2 },
  { from: 2, to: 3, weight: 5 },
];

const BoruvkaPage = () => {
  const [edges, setEdges] = useState(initialEdges);
  const [mstEdges, setMstEdges] = useState([]);

  // Union-Find Helper Functions
  const find = (parent, i) => {
    if (parent[i] === i) return i;
    return find(parent, parent[i]);
  };

  const union = (parent, x, y) => {
    const xRoot = find(parent, x);
    const yRoot = find(parent, y);
    parent[yRoot] = xRoot;
  };

  const runBoruvka = () => {
    const parent = initialNodes.map((_, i) => i);
    const numNodes = initialNodes.length;
    const mst = [];

    let numTrees = numNodes;

    while (numTrees > 1) {
      const cheapest = Array(numNodes).fill(null);

      edges.forEach((edge) => {
        const set1 = find(parent, edge.from);
        const set2 = find(parent, edge.to);

        if (set1 !== set2) {
          if (!cheapest[set1] || cheapest[set1].weight > edge.weight)
            cheapest[set1] = edge;
          if (!cheapest[set2] || cheapest[set2].weight > edge.weight)
            cheapest[set2] = edge;
        }
      });

      cheapest.forEach((edge) => {
        if (edge) {
          const set1 = find(parent, edge.from);
          const set2 = find(parent, edge.to);

          if (set1 !== set2) {
            mst.push(edge);
            union(parent, set1, set2);
            numTrees--;
          }
        }
      });
    }

    setMstEdges(mst);
  };

  return (
    <div className="algorithm-container">
      <h1>Borůvka’s Algorithm Visualization</h1>
      <p>
        This page visualizes the process of Borůvka’s Minimum Spanning Tree
        algorithm.
      </p>

      <button onClick={runBoruvka} style={{ marginBottom: "1rem" }}>
        Run Borůvka’s Algorithm
      </button>

      <svg width="500" height="400" style={{ border: "1px solid black" }}>
        {/* Draw edges */}
        {edges.map((edge, idx) => {
          const fromNode = initialNodes[edge.from];
          const toNode = initialNodes[edge.to];
          const isMST = mstEdges.includes(edge);
          return (
            <line
              key={idx}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke={isMST ? "green" : "gray"}
              strokeWidth={isMST ? 4 : 2}
            />
          );
        })}

        {/* Draw nodes */}
        {initialNodes.map((node) => (
          <g key={node.id}>
            <circle cx={node.x} cy={node.y} r={20} fill="lightblue" />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dy="0.35em"
              fontWeight="bold"
            >
              {node.id}
            </text>
          </g>
        ))}

        {/* Draw edge weights */}
        {edges.map((edge, idx) => {
          const fromNode = initialNodes[edge.from];
          const toNode = initialNodes[edge.to];
          return (
            <text
              key={idx}
              x={(fromNode.x + toNode.x) / 2}
              y={(fromNode.y + toNode.y) / 2 - 5}
              textAnchor="middle"
              fill="red"
            >
              {edge.weight}
            </text>
          );
        })}
      </svg>

      {mstEdges.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Minimum Spanning Tree Edges:</h3>
          <ul>
            {mstEdges.map((edge, idx) => (
              <li key={idx}>
                {edge.from} — {edge.to} (weight: {edge.weight})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BoruvkaPage;
