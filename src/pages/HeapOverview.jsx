// src/pages/HeapOverview.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeapVisualizer from "../components/Heap/HeapVisualizer";
import "../styles/global-theme.css";

// ─────────────────────────────────────────────────────────────
// Static content helpers
// ─────────────────────────────────────────────────────────────
const complexityRows = [
  { op: "Insert", min: "O(1)", avg: "O(log n)", worst: "O(log n)", note: "Heapify-up at most log₂(n) swaps" },
  { op: "Extract Min/Max", min: "O(log n)", avg: "O(log n)", worst: "O(log n)", note: "Heapify-down from root" },
  { op: "Peek Min/Max", min: "O(1)", avg: "O(1)", worst: "O(1)", note: "Root is always min/max" },
  { op: "Delete (arbitrary)", min: "O(log n)", avg: "O(log n)", worst: "O(log n)", note: "Replace + heapify-up or down" },
  { op: "Build Heap", min: "O(n)", avg: "O(n)", worst: "O(n)", note: "Floyd's bottom-up algorithm" },
  { op: "Search", min: "O(n)", avg: "O(n)", worst: "O(n)", note: "No ordering guarantee beyond root" },
  { op: "Space", min: "O(n)", avg: "O(n)", worst: "O(n)", note: "Stored as a flat array" },
];

const useCases = [
  {
    icon: "⚡",
    title: "Priority Queues",
    desc: "The canonical use case. Tasks are processed by priority (smallest or largest key) in O(log n) per operation.",
  },
  {
    icon: "🗺️",
    title: "Dijkstra's Shortest Path",
    desc: "A min-heap tracks the unvisited node with the smallest tentative distance, cutting the algorithm to O((V+E) log V).",
  },
  {
    icon: "🔢",
    title: "Heap Sort",
    desc: "Build a max-heap in O(n), then extract max n times for an in-place O(n log n) sort.",
  },
  {
    icon: "📊",
    title: "K-th Largest / Smallest",
    desc: "Maintain a heap of size k while streaming data to answer 'k-th largest element' queries in O(n log k).",
  },
  {
    icon: "🌿",
    title: "Prim's MST",
    desc: "A min-heap selects the cheapest edge to a non-tree vertex at each step of minimum spanning tree construction.",
  },
  {
    icon: "🏥",
    title: "Event-Driven Simulation",
    desc: "Events keyed by timestamp are popped in chronological order using a min-heap, enabling efficient discrete-event simulation.",
  },
];

// ─────────────────────────────────────────────────────────────
// Inline styles (reuse global-theme.css variables)
// ─────────────────────────────────────────────────────────────
const sectionTitle = {
  fontSize: "1.3rem",
  fontWeight: 700,
  marginBottom: "0.75rem",
  color: "var(--accent-primary, #5aa1ff)",
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: "1rem",
  marginTop: "1rem",
};

const useCaseCard = {
  background: "var(--card-bg, #111b2d)",
  border: "1px solid var(--border-color, #1d2b49)",
  borderRadius: "12px",
  padding: "1rem 1.2rem",
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────
export default function HeapOverview() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("min"); // "min" | "max"

  return (
    <div className="theme-container">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <h1 className="theme-title" style={{ marginTop: "3rem" }}>
        Heap{" "}
        <span style={{ color: "var(--accent-primary, #5aa1ff)" }}>
          Data Structure
        </span>
      </h1>

      <p
        style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "-1.5rem auto 2rem",
          color: "var(--theme-text-secondary)",
          lineHeight: 1.7,
        }}
      >
        A <strong>Heap</strong> is a complete binary tree that satisfies the{" "}
        <em>heap property</em>. It enables O(1) access to the global
        minimum or maximum and O(log n) insertions and deletions — making it
        the backbone of priority queues and many graph algorithms.
      </p>

      {/* ── Min vs Max tabs ────────────────────────────────────── */}
      <div className="theme-card" style={{ maxWidth: "1300px" }}>
        <div className="theme-card-header" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button
            className={`btn ${activeTab === "min" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setActiveTab("min")}
          >
            🔻 Min-Heap
          </button>
          <button
            className={`btn ${activeTab === "max" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setActiveTab("max")}
          >
            🔺 Max-Heap
          </button>
        </div>

        {activeTab === "min" ? (
          <div style={{ marginTop: "1rem" }}>
            <h3 style={sectionTitle}>Min-Heap</h3>
            <p style={{ color: "var(--theme-text-secondary)", lineHeight: 1.7 }}>
              In a <strong>min-heap</strong>, every parent node is{" "}
              <em>less than or equal to</em> its children. The{" "}
              <strong>minimum element</strong> is always at the root (index 0).
            </p>
            <ul style={{ color: "var(--theme-text-secondary)", lineHeight: 2, paddingLeft: "1.4rem" }}>
              <li>Parent at index <code>i</code> → children at <code>2i+1</code> (left) and <code>2i+2</code> (right).</li>
              <li>
                <strong>Heap property:</strong> <code>arr[parent] ≤ arr[child]</code> for all nodes.
              </li>
              <li>
                <strong>Insert:</strong> append to end, then <em>heapify-up</em> (swap with parent while parent &gt; new node).
              </li>
              <li>
                <strong>Extract-Min:</strong> remove root, move last element to root, then <em>heapify-down</em> (swap with smaller child).
              </li>
            </ul>

            <div
              style={{
                background: "var(--surface-bg, #0b1426)",
                border: "1px solid var(--border-color, #1d2b49)",
                borderRadius: "10px",
                padding: "1rem",
                marginTop: "1rem",
                fontFamily: "monospace",
                fontSize: "13px",
                color: "var(--theme-text-secondary)",
                overflowX: "auto",
              }}
            >
              <pre style={{ margin: 0 }}>
{`Example min-heap array: [1, 3, 2, 7, 5, 8, 4]

Visualized as a tree:
             1          ← minimum (root)
           /   \\
          3     2
         / \\   / \\
        7   5 8   4

Heap property: parent ≤ children at every node.`}
              </pre>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: "1rem" }}>
            <h3 style={sectionTitle}>Max-Heap</h3>
            <p style={{ color: "var(--theme-text-secondary)", lineHeight: 1.7 }}>
              In a <strong>max-heap</strong>, every parent node is{" "}
              <em>greater than or equal to</em> its children. The{" "}
              <strong>maximum element</strong> is always at the root (index 0).
            </p>
            <ul style={{ color: "var(--theme-text-secondary)", lineHeight: 2, paddingLeft: "1.4rem" }}>
              <li>Same array indexing: parent <code>i</code>, children <code>2i+1</code> / <code>2i+2</code>.</li>
              <li>
                <strong>Heap property:</strong> <code>arr[parent] ≥ arr[child]</code> for all nodes.
              </li>
              <li>
                <strong>Insert:</strong> append to end, then <em>heapify-up</em> (swap with parent while parent &lt; new node).
              </li>
              <li>
                <strong>Extract-Max:</strong> remove root, move last element to root, then <em>heapify-down</em> (swap with larger child).
              </li>
            </ul>

            <div
              style={{
                background: "var(--surface-bg, #0b1426)",
                border: "1px solid var(--border-color, #1d2b49)",
                borderRadius: "10px",
                padding: "1rem",
                marginTop: "1rem",
                fontFamily: "monospace",
                fontSize: "13px",
                color: "var(--theme-text-secondary)",
                overflowX: "auto",
              }}
            >
              <pre style={{ margin: 0 }}>
{`Example max-heap array: [8, 7, 4, 5, 3, 2, 1]

Visualized as a tree:
             8          ← maximum (root)
           /   \\
          7     4
         / \\   / \\
        5   3 2   1

Heap property: parent ≥ children at every node.`}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* ── Heap Properties ────────────────────────────────────── */}
      <div className="theme-card" style={{ maxWidth: "1300px" }}>
        <div className="theme-card-header">
          <h3>🌱 Key Properties</h3>
        </div>
        <ul className="search-points">
          <li>
            <strong>Complete binary tree:</strong> all levels fully filled except possibly the last,
            which is filled left-to-right. This guarantees O(log n) height.
          </li>
          <li>
            <strong>Array representation:</strong> no pointer overhead — parent of index <code>i</code>{" "}
            is at <code>⌊(i−1)/2⌋</code>; children at <code>2i+1</code> and <code>2i+2</code>.
          </li>
          <li>
            <strong>Heap property:</strong> min-heap → every parent ≤ children;
            max-heap → every parent ≥ children.
          </li>
          <li>
            <strong>Not fully sorted:</strong> the heap only guarantees the root is the global
            min/max. Siblings have no ordering relationship with each other.
          </li>
          <li>
            <strong>Cache-friendly:</strong> stored as a flat array, giving excellent spatial locality
            compared to pointer-based trees.
          </li>
          <li>
            <strong>Build in O(n):</strong> Floyd's bottom-up heapify constructs a valid heap from an
            arbitrary array in linear time — better than inserting n elements one-by-one (O(n log n)).
          </li>
        </ul>
      </div>

      {/* ── Complexity Table ───────────────────────────────────── */}
      <div className="theme-card" style={{ maxWidth: "1300px" }}>
        <div className="theme-card-header">
          <h3>⚡ Complexity Analysis</h3>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="table" style={{ minWidth: "580px" }}>
            <thead>
              <tr>
                <th>Operation</th>
                <th>Best</th>
                <th>Average</th>
                <th>Worst</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {complexityRows.map((row) => (
                <tr key={row.op}>
                  <td>
                    <strong>{row.op}</strong>
                  </td>
                  <td style={{ color: "var(--accent-primary, #5aa1ff)" }}>{row.min}</td>
                  <td style={{ color: "var(--accent-primary, #5aa1ff)" }}>{row.avg}</td>
                  <td style={{ color: "var(--accent-primary, #5aa1ff)" }}>{row.worst}</td>
                  <td style={{ color: "var(--theme-text-secondary)", fontSize: "0.88rem" }}>
                    {row.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Heapify-Up vs Heapify-Down ─────────────────────────── */}
      <div className="theme-card" style={{ maxWidth: "1300px" }}>
        <div className="theme-card-header">
          <h3>🔄 Heapify-Up vs Heapify-Down</h3>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div>
            <h4 style={{ color: "var(--accent-primary, #5aa1ff)", marginBottom: "0.6rem" }}>
              ↑ Heapify-Up (Bubble Up)
            </h4>
            <p style={{ color: "var(--theme-text-secondary)", lineHeight: 1.7, fontSize: "0.93rem" }}>
              Used after <strong>insertion</strong>. The new element is appended at the end of the
              array (last leaf), then compared with its parent. If the heap property is violated the
              two are swapped. This repeats until the element reaches the root or the heap property
              holds. At most <strong>O(log n)</strong> swaps.
            </p>
          </div>
          <div>
            <h4 style={{ color: "var(--hv-danger, #ff6b6b)", marginBottom: "0.6rem" }}>
              ↓ Heapify-Down (Sink Down)
            </h4>
            <p style={{ color: "var(--theme-text-secondary)", lineHeight: 1.7, fontSize: "0.93rem" }}>
              Used after <strong>extract</strong> and <strong>build-heap</strong>. The element at the
              current position is compared with its children. It swaps with the child that would
              satisfy the heap property (smallest for min-heap, largest for max-heap) and repeats
              until no swap is needed or a leaf is reached. At most <strong>O(log n)</strong> swaps.
            </p>
          </div>
        </div>
      </div>

      {/* ── Use Cases ─────────────────────────────────────────── */}
      <div className="theme-card" style={{ maxWidth: "1300px" }}>
        <div className="theme-card-header">
          <h3>🚀 Real-World Use Cases</h3>
        </div>
        <div style={cardGrid}>
          {useCases.map((uc) => (
            <div key={uc.title} style={useCaseCard}>
              <div style={{ fontSize: "1.6rem" }}>{uc.icon}</div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "var(--hv-text, #eef2f8)",
                }}
              >
                {uc.title}
              </div>
              <div
                style={{
                  fontSize: "0.87rem",
                  color: "var(--theme-text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                {uc.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Min vs Max Comparison Table ────────────────────────── */}
      <div className="theme-card" style={{ maxWidth: "1300px" }}>
        <div className="theme-card-header">
          <h3>⚖️ Min-Heap vs Max-Heap</h3>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Min-Heap 🔻</th>
                <th>Max-Heap 🔺</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Root element</td>
                <td>Smallest</td>
                <td>Largest</td>
              </tr>
              <tr>
                <td>Heap property</td>
                <td>parent ≤ children</td>
                <td>parent ≥ children</td>
              </tr>
              <tr>
                <td>Extract operation</td>
                <td>Extract-Min</td>
                <td>Extract-Max</td>
              </tr>
              <tr>
                <td>Priority queue variant</td>
                <td>Lowest-priority first</td>
                <td>Highest-priority first</td>
              </tr>
              <tr>
                <td>Common use</td>
                <td>Dijkstra, Prim, scheduling</td>
                <td>Heap sort, top-k largest</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Interactive Visualizer ─────────────────────────────── */}
      <div style={{ maxWidth: "1300px", margin: "0 auto 2rem", width: "100%" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--accent-primary, #5aa1ff)",
              marginBottom: "0.4rem",
            }}
          >
            🎮 Interactive Heap Visualizer
          </h2>
          <p style={{ color: "var(--theme-text-secondary)", fontSize: "0.95rem" }}>
            Insert values, extract min/max, build a heap, and watch every
            heapify-up / heapify-down step animate in real time.
            <br />
            Enable <strong>Step Mode</strong> to walk through each comparison and swap manually.
          </p>
          <button
            className="btn btn-primary"
            style={{ marginTop: "0.8rem" }}
            onClick={() => navigate("/data-structures/heap")}
          >
            Open Full Visualizer ↗
          </button>
        </div>
        <HeapVisualizer />
      </div>
    </div>
  );
}
