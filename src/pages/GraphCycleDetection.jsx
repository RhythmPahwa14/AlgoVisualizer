import React, { useState } from "react";
import "../styles/global-theme.css";
import "aos/dist/aos.css";
import {
  cycleDetectionDirected,
  cycleDetectionUndirected,
} from "../data/allCodes";
import DFSCycleVisualizer from "../components/DFSCycleVisualizer"; 
const GraphCycleDetection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const [customGraph, setCustomGraph] = useState(null);
  const [inputText, setInputText] = useState("");
  const [algo, setAlgo] = useState("");
  const [graphType, setGraphType] = useState("");
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
    <div
      className="theme-container"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      {/* head section */}
      <h1 className="theme-title">Cycle Detection</h1>
      <p
        style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "-2rem auto 2rem auto",
          color: "var(--theme-text-secondary)",
        }}
      >
        Visualize Cycle Detection on a graph. You can edit the graph JSON below
        and click "Load Graph".
      </p>

      {/* Custom Input Section */}
      <div
        style={{
          background: "var(--surface-bg)",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "1.5rem",
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
            minHeight: "120px",
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            fontSize: "0.9rem",
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid var(--border-primary)",
            marginBottom: "0.5rem",
            resize: "vertical",
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
            cursor: "pointer",
          }}
        >
          Load Graph
        </button>
      </div>

      

      {/* graph visualizer */}
      <div data-aos="fade-up" data-aos-delay="300">
        <DFSCycleVisualizer graphData={customGraph} />
      </div>

      {/* code implementation section */}
      <div
        className="theme-card"
        style={{ marginTop: "2rem" }}
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <div className="theme-card-header">
          <h3>Cycle Detection in : 
              <select
            value={graphType}
            onChange={(e) => setGraphType(e.target.value)}
          >
            <option value="Directed">Directed</option>
            <option value="UnDirected">UnDirected</option>
          </select>
          </h3> 
           
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {["java", "python", "cpp", "javascript"].map((lang) => (
              <button
                key={lang}
                className={`btn ${
                  selectedLanguage === lang ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => setSelectedLanguage(lang)}
                style={{ fontSize: "0.9rem", padding: "0.5rem 1rem" }}
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div
          style={{
            background: "var(--surface-bg)",
            borderRadius: "8px",
            padding: "1.2rem",
            overflow: "auto",
            maxHeight: "500px",
            marginLeft: "1rem",
          }}
        >
          <label style={{ marginRight: "5px", marginBottom: "1rem" }}>
            Algorithm:
          </label>
          <select
            value={algo}
            onChange={(e) => setAlgo(e.target.value)}
            style={{ marginBottom: "1rem" }}
          >
            <option value="BFS">BFS</option>
            <option value="DFS">DFS</option>
          </select>
          <pre
            style={{
              margin: 0,
              fontFamily: 'Consolas, Monaco, "Courier New", monospace',
              fontSize: "0.9rem",
              lineHeight: "1.5",
              color: "var(--text-primary)",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            <code>
              {graphType === "Directed"
                ? algo === "BFS"
                  ? cycleDetectionDirected.bfs[selectedLanguage]
                  : cycleDetectionDirected.dfs[selectedLanguage]
                : algo === "BFS"
                ? cycleDetectionUndirected.bfs[selectedLanguage]
                : cycleDetectionUndirected.dfs[selectedLanguage]}
            </code>
          </pre>
        </div>
        <div
          style={{
            marginTop: "1rem",
            padding: "0.75rem",
            background: "var(--accent-warning-bg)",
            borderRadius: "6px",
            fontSize: "0.9rem",
            color: "var(--text-secondary)",
          }}
        >
          <strong>Note:</strong> This is the actual implementation code for
          Depth-First Search in {selectedLanguage.toUpperCase()}. You can copy
          and use this code in your projects.
        </div>
      </div>
    </div>
  );
};

export default GraphCycleDetection;
