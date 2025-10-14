import { useEffect, useState } from "react";
import Graph from "react-vis-network-graph";
import "../styles/graphEuler.css";
import "aos/dist/aos.css";

const EulerGraphVisualizer = ({ customGraph }) => {
  //   const containerRef = useRef(null);
  //   const networkRef = useRef(null);

  const defaultGraph = {
    nodes: [
      { id: 1, label: "A" },
      { id: 2, label: "B" },
      { id: 3, label: "C" },
      { id: 4, label: "D" }
    ],
    edges: [
      { id: "1-2", from: 1, to: 2 },
      { id: "2-3", from: 2, to: 3 },
      { id: "3-4", from: 3, to: 4 },
      { id: "4-1", from: 4, to: 1 }
    ]
  };

  const [graph, setGraph] = useState(customGraph || defaultGraph); 
  const [status, setStatus] = useState("");

  //   check for eulerian
  const checkEulerian = () => {
    const degree = {};
    graph.edges.forEach(({ from, to }) => {
      degree[from] = (degree[from] || 0) + 1;
      degree[to] = (degree[to] || 0) + 1;
    });

    const oddVertices = Object.values(degree).filter((deg) => deg % 2 !== 0);

    if (oddVertices.length === 0) return "✅ Eulerian Circuit (All vertices even)";
    if (oddVertices.length === 2) return "⚡ Eulerian Path (Exactly two odd vertices)";
    return "❌ Not Eulerian (More than two odd vertices)";
  };

  const animatePath = async () => {
    const edges = [...graph.edges];

    // Reset node labels to original (no degree)
    setGraph((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) => ({
        ...n,
        label: n.label.split(" ")[0],
        color: "#64748b"
      })),
      edges: prev.edges.map((e) => ({
        ...e,
        color: { color: "#aaa" },
        width: 2
      }))
    }));

    await new Promise((res) => setTimeout(res, 400)); // brief pause before start

    for (let i = 0; i < edges.length; i++) {
      // Take active edges up to index i
      const activeEdges = edges.slice(0, i + 1);

      // Compute degrees from active edges
      const degree = {};
      activeEdges.forEach(({ from, to }) => {
        degree[from] = (degree[from] || 0) + 1;
        degree[to] = (degree[to] || 0) + 1;
      });

      // Update nodes with degree
      const updatedNodes = graph.nodes.map((node) => ({
        ...node,
        label: `${node.label.split(" ")[0]} (${degree[node.id] || 0})`,
        color: degree[node.id] ? "#7c3aed" : "#64748b" // purple if touched
      }));

      // Update edges with current highlight
      const updatedEdges = edges.map((edge, idx) => ({
        ...edge,
        color: { color: idx <= i ? "#f59e0b" : "#aaa" },
        width: idx <= i ? 3 : 2
      }));

      // Single synchronized update 🔄
      setGraph((prev) => ({
        ...prev,
        nodes: updatedNodes,
        edges: updatedEdges
      }));

      // Delay between steps
      await new Promise((res) => setTimeout(res, 800));
    }
  };

  const handleCheck = async () => {
    const result = checkEulerian();
    setStatus(result);
    await animatePath(); // run animation after showing result
  };

  const options = {
    nodes: {
      shape: "circle",
      color: "#7c3aed",
      font: { color: "#fff", size: 18, bold: true },
      borderWidth: 2
    },
    edges: {
      color: { color: "#aaa" },
      width: 2,
      smooth: {
        type: "dynamic" // ✅ makes edges animate smoothly
      }
    },
    physics: {
      enabled: true,
      stabilization: { iterations: 200 },
      barnesHut: { gravitationalConstant: -4000 } // makes nodes float & move
    },
    interaction: { hover: true, dragNodes: true }
  };

  return (
    <div className="flex flex-col items-center mx-2 my-4 min-h-[600px] bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white p-6 border-0 rounded-xl opacity-90">
      <h1 className="text-3xl font-bold !my-4">Eulerian Graph Visualizer</h1>

      <button
        onClick={handleCheck}
        className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg !mb-4"
      >
        Check Eulerian
      </button>

      <div className="w-full max-w-2xl h-[400px] bg-slate-950 rounded-xl border border-white/10 shadow-lg mb-6">
        <Graph graph={graph} options={options} />
      </div>
      {status && (
        <div className="text-lg font-semibold text-center bg-slate-800 !px-4 !py-4 rounded-lg border border-white/10 !my-4">
          {status}
        </div>
      )}
    </div>
  );
};

const GraphEulerian = () => {
  const [customGraph, setCustomGraph] = useState(null);
  const [inputText, setInputText] = useState("");
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };
  const handleLoadCustomGraph = () => {
    try {
      const parsed = JSON.parse(inputText);
      if (!parsed.nodes || !parsed.edges) {
        alert("Invalid graph format. Must contain 'nodes' and 'edges'.");
        return;
      } 
      setCustomGraph(parsed);
    } catch (err) {
      alert("Invalid JSON format.");
    }
  };
  return (
    <div className="theme-container opacity-90" data-aos="fade-up" data-aos-duration="1000">
      {/* head section */}
      <h1 className="theme-title">Eulerian graphs</h1>
      <p
        style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "5px auto 2rem auto",
          color: "var(--theme-text-secondary)",
          lineHeight: "1.5",
          letterSpacing: "2px"
        }}
      >
        The concept of Eulerian graphs originates from Leonhard Euler (1736) in his famous problem:
        The Seven Bridges of Königsberg
      </p>

      <div className="theme-card" style={{ marginBottom: "2rem" }}>
        <div className="theme-card-header">
          <h3 style={{ fontSize: "2rem", textAlign: "center" }}>Euler's Rule </h3>
        </div>
        <div className="card-table">
          <h1>🧮 UnDirected Graphs</h1>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Condition on Vertex Degrees</th>
                <th>Exists ?</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="type-circuit">Eulerian Circuit (Cycle)</td>
                <td className="badge">All vertices have even degree</td>
                <td>✅</td>
                <td className="desc">Start and end at same vertex</td>
              </tr>
              <tr>
                <td className="type-path">Eulerian Path (Trail)</td>
                <td className="badge">Exactly two vertices have odd degree</td>
                <td>✅</td>
                <td className="desc">Start and end are different</td>
              </tr>
              <tr>
                <td className="type-none">Non-Eulerian Graph</td>
                <td className="badge">More than two odd degree vertices</td>
                <td>❌</td>
                <td className="desc">No Eulerian path or cycle</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card-directed">
          <h1>🧮 Directed Graphs (for completeness)</h1>
          <p>Euler extended the idea to directed edges later: </p>
          <ul>
            <li>Every vertex must have equal in-degree and out-degree for a circuit.</li>
            <li>
              {" "}
              For a path, one vertex may have out-degree = in-degree + 1 (start), and another may
              have in-degree = out-degree + 1 (end).
            </li>
          </ul>
        </div>
      </div>

      {/* Custom Input Section */}
      <div
        style={{
          background: "var(--surface-bg)",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "1.5rem"
        }}
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <textarea
          value={inputText}
          onChange={handleInputChange}
          placeholder='Enter graph JSON: {"nodes":[...], "edges":[...]}'
          style={{
            width: "100%",
            minHeight: "200px",
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            fontSize: "0.9rem",
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid var(--border-primary)",
            marginBottom: "0.5rem",
            resize: "vertical"
          }}
        />
        <button
          onClick={handleLoadCustomGraph}
          style={{
            padding: "0.5rem 1rem",
            background: "var(--accent-primary-bg)",
            color: "var(--text-on-accent)",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Load Graph
        </button>
      </div>

      {/* euler visulization component */}
      <div data-aos="fade-up" data-aos-delay="300">
        <EulerGraphVisualizer customGraph={customGraph} />
      </div>
    </div>
  );
};

export default GraphEulerian;
