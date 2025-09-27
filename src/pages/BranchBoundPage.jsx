// src/pages/BranchBoundPage.jsx
import React, { useState } from "react";
import BranchBoundVisualizer from "../components/BranchBoundVisualizer";
import { branchBoundAlgorithms } from "../data/allCodes";
import "../styles/global-theme.css";

import "aos/dist/aos.css";

const BranchBoundPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("tsp"); // default algorithm

  const algorithmData = branchBoundAlgorithms[selectedAlgorithm] || {};

  // Default sizes (if needed for visualizer)
  const defaultSizes = {
    tsp: 4,
    knapsack: 5,
  };

  // Friendly names
  const displayName = {
    tsp: "Traveling Salesman (TSP)",
    knapsack: "0/1 Knapsack",
  };

  return (
    <div
      className="theme-container"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <h1 className="theme-title">Branch & Bound Visualizer</h1>
      <p
        style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "-2rem auto 2rem auto",
          color: "var(--theme-text-secondary)",
        }}
      >
        Use the visualizer below to explore how Branch & Bound algorithms like
        TSP and Knapsack work step-by-step. You can load examples or check the
        source code.
      </p>

      {/* Visualizer */}
      <div data-aos="fade-up" data-aos-delay="200">
        <BranchBoundVisualizer
          defaultAlgorithm={selectedAlgorithm}
          boardSize={defaultSizes[selectedAlgorithm] || 4}
        />
      </div>

      {/* Algorithm Selector */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          justifyContent: "center",
          margin: "1rem 0",
          flexWrap: "wrap",
        }}
        data-aos="fade-up"
        data-aos-delay="300"
      >
        {Object.keys(branchBoundAlgorithms).map((algo) => (
          <button
            key={algo}
            className={`btn ${
              selectedAlgorithm === algo ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setSelectedAlgorithm(algo)}
          >
            {displayName[algo] || algo}
          </button>
        ))}
      </div>

      {/* Code Section */}
      <div
        className="theme-card"
        style={{ marginTop: "2rem" }}
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <div className="theme-card-header">
          <h3>Branch & Bound - Code Implementation</h3>
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
            padding: "1.5rem",
            overflow: "auto",
            maxHeight: "500px",
          }}
        >
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
              {algorithmData[selectedLanguage]
                ? algorithmData[selectedLanguage]
                : `// Branch & Bound implementation in ${selectedLanguage.toUpperCase()} coming soon!`}
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
          <strong>Note:</strong> This is the actual implementation code for the{" "}
          <strong>{displayName[selectedAlgorithm]}</strong> algorithm in{" "}
          <strong>{selectedLanguage.toUpperCase()}</strong>. You can copy and
          use this code in your projects.
        </div>
      </div>
    </div>
  );
};

export default BranchBoundPage;
