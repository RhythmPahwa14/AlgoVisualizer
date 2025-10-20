// src/pages/Prims.jsx
import { useState } from "react";
import "./Prims.css";

/**
 * 🌉 Prim’s Algorithm Visualization Component
 *
 * Interactive visualization and learning tool for Prim’s Minimum Spanning Tree (MST).
 *
 * @component
 * @returns {JSX.Element} Prim's Algorithm page
 */
export default function PrimsAlgorithm() {
  const [nodes, setNodes] = useState(["A", "B", "C", "D", "E"]);
  const [edges, setEdges] = useState([
    { from: "A", to: "B", weight: 2 },
    { from: "A", to: "C", weight: 3 },
    { from: "B", to: "C", weight: 1 },
    { from: "B", to: "D", weight: 4 },
    { from: "C", to: "D", weight: 5 },
    { from: "C", to: "E", weight: 6 },
    { from: "D", to: "E", weight: 7 },
  ]);

  const [mstEdges, setMstEdges] = useState([]);
  const [showCode, setShowCode] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);

  /**
   * 🧮 Prim's Algorithm Simulation
   */
  const runPrims = () => {
    let selected = new Set();
    let mst = [];
    let current = nodes[0];
    selected.add(current);

    while (selected.size < nodes.length) {
      let minEdge = null;

      edges.forEach((edge) => {
        if (
          selected.has(edge.from) &&
          !selected.has(edge.to)
        ) {
          if (!minEdge || edge.weight < minEdge.weight) minEdge = edge;
        }
        if (
          selected.has(edge.to) &&
          !selected.has(edge.from)
        ) {
          if (!minEdge || edge.weight < minEdge.weight)
            minEdge = { from: edge.to, to: edge.from, weight: edge.weight };
        }
      });

      if (!minEdge) break;
      mst.push(minEdge);
      selected.add(minEdge.to);
    }

    setMstEdges(mst);
    setStepIndex(0);
  };

  const reset = () => {
    setMstEdges([]);
    setStepIndex(0);
  };

  return (
    <div className="prims-page">
      {/* 🏷️ Header */}
      <header className="page-header">
        <h1>Prim’s Algorithm - Minimum Spanning Tree (MST)</h1>
        <p className="page-subtitle">
          Visualize how Prim’s Algorithm connects all vertices with minimum total edge weight.
        </p>
      </header>

      {/* 🎮 Controls */}
      <section className="controls-panel">
        <button onClick={runPrims} className="control-btn run-btn">
          Run Prim’s Algorithm
        </button>
        <button onClick={reset} className="control-btn reset-btn">
          Reset
        </button>
      </section>

      {/* 🎨 Graph Visualization */}
      <section className="graph-visualization">
        <h3>Graph Representation</h3>
        <div className="graph-container">
          {edges.map((edge, i) => (
            <div
              key={i}
              className={`edge ${
                mstEdges.find(
                  (e) =>
                    (e.from === edge.from && e.to === edge.to) ||
                    (e.from === edge.to && e.to === edge.from)
                )
                  ? "highlight"
                  : ""
              }`}
            >
              {edge.from} — {edge.to} ({edge.weight})
            </div>
          ))}
        </div>
      </section>

      {/* 📖 Theory Section */}
      <section className="documentation-section">
        <article className="ds-info">
          <h2>About Prim’s Algorithm</h2>
          <p>
            <strong>Prim’s Algorithm</strong> is a greedy algorithm that finds the{" "}
            <em>Minimum Spanning Tree (MST)</em> of a connected, weighted, undirected graph.
            It starts from any vertex and repeatedly adds the smallest-weight edge that expands the tree.
          </p>

          <h3>Algorithm Steps</h3>
          <ol>
            <li>Select any starting vertex.</li>
            <li>Choose the smallest edge connecting the tree to a new vertex.</li>
            <li>Add that edge to the MST.</li>
            <li>Repeat until all vertices are included.</li>
          </ol>

          <h3>Time & Space Complexity</h3>
          <table className="complexity-table">
            <thead>
              <tr>
                <th>Approach</th>
                <th>Time</th>
                <th>Space</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Using Adjacency Matrix</td>
                <td>O(V²)</td>
                <td>O(V)</td>
              </tr>
              <tr>
                <td>Using Min-Heap & Adjacency List</td>
                <td>O(E log V)</td>
                <td>O(V + E)</td>
              </tr>
            </tbody>
          </table>

          <h3>Pseudocode</h3>
          <pre className="pseudocode">{`Initialize MST = {}
Choose any starting vertex s
Mark s as visited

While (MST doesn't include all vertices):
    Find edge (u, v) with minimum weight
        where u is visited and v is not
    Add (u, v) to MST
    Mark v as visited

Return MST`}</pre>

          <h3>Real-World Applications</h3>
          <ul className="applications-list">
            <li>Network design (LAN, road, or pipeline connections)</li>
            <li>Approximation algorithms for NP-hard problems</li>
            <li>Cluster analysis in data mining</li>
            <li>Minimum cost spanning trees in electrical circuits</li>
          </ul>

          <h3>Code Snippets</h3>
          <div className="code-snippets-container">
            {[
              {
                operation: "Prim's (Adjacency Matrix)",
                code: `function primMST(graph, V) {
  let parent = Array(V).fill(-1);
  let key = Array(V).fill(Infinity);
  let mstSet = Array(V).fill(false);
  key[0] = 0;

  for (let count = 0; count < V - 1; count++) {
    let u = minKey(key, mstSet, V);
    mstSet[u] = true;

    for (let v = 0; v < V; v++) {
      if (graph[u][v] && !mstSet[v] && graph[u][v] < key[v]) {
        parent[v] = u;
        key[v] = graph[u][v];
      }
    }
  }
  return parent;
}`,
              },
            ].map(({ operation, code }) => (
              <div key={operation} className="code-snippet">
                <button
                  className="code-toggle-button"
                  onClick={() =>
                    setShowCode(showCode === operation ? null : operation)
                  }
                >
                  <span className="operation-name">{operation}</span>
                  <span className="toggle-icon">
                    {showCode === operation ? "▲" : "▼"}
                  </span>
                </button>
                {showCode === operation && (
                  <div className="code-content">
                    <pre className="implementation-code">{code}</pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* 💡 Tips */}
      <aside className="usage-tips">
        <h3>💡 Quick Tips</h3>
        <ul>
          <li>Prim’s and Kruskal’s both find MSTs, but Prim’s grows one tree.</li>
          <li>Use adjacency lists and min-heaps for large graphs.</li>
          <li>Prim’s works only for connected, undirected graphs.</li>
          <li>Perfect for dense graphs (many edges).</li>
        </ul>
      </aside>
    </div>
  );
}
