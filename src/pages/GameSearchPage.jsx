// src/pages/GameSearchPage.jsx
import React, { useState } from "react";
import GameSearchVisualizer from "../components/GameSearchVisualizer";
import { gameSearch } from "../data/allCodes";
import "../styles/global-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";

const GameSearchPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("minimax"); // default algorithm

  const algorithmData = gameSearch[selectedAlgorithm] || {};

  // Default problem sizes for visualizer
  const defaultSizes = {
    minimax: 3,
    alphaBetaPruning: 3,
    expectimax: 3,
    mcts: 10
  };

  // Friendly names for buttons
  const displayName = {
    minimax: "Minimax",
    alphaBetaPruning: "Alpha-Beta Pruning",
    expectimax: "Expectimax",
    mcts: "Monte Carlo Tree Search"
  };
  

  return (
    <div
      className="theme-container"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <h1 className="theme-title">Game Search Visualizer</h1>
      <p
        style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "-2rem auto 2rem auto",
          color: "var(--theme-text-secondary)"
        }}
      >
        Use the visualizer below to explore how game search algorithms work
        step-by-step. You can load examples or customize your own problem.
      </p>

      {/* Visualizer Component */}
      <div data-aos="fade-up" data-aos-delay="200">
        <GameSearchVisualizer
          defaultAlgorithm={selectedAlgorithm}
          boardSize={defaultSizes[selectedAlgorithm] || 3}
          autoLoadExample={false}
        />
      </div>

      {/* Algorithm Selector */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          justifyContent: "center",
          margin: "1rem 0",
          flexWrap: "wrap"
        }}
        data-aos="fade-up"
        data-aos-delay="300"
      >
        {Object.keys(gameSearch).map((algo) => (
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

      {/* Code Implementation Section */}
      <div
        className="theme-card"
        style={{ marginTop: "2rem" }}
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <div className="theme-card-header">
          <h3>Game Search - Code Implementation</h3>
          <div
            style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }} 
          >
            {["java", "python", "cpp", "javascript", "go"].map((lang) => (
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
            maxHeight: "500px"
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
              wordBreak: "break-word"
            }}
          >
            <code>
              {algorithmData[selectedLanguage] || `// Implementation in ${selectedLanguage.toUpperCase()} not found.`}
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
            color: "var(--text-secondary)"
          }}
        >
          <strong>Note:</strong> This is the actual implementation code for{" "}
          <strong>{displayName[selectedAlgorithm]}</strong> algorithm in{" "}
          <strong>{selectedLanguage.toUpperCase()}</strong>. You can copy and
          use this code in your projects.
        </div>
      </div>
    </div>
  );
};

export default GameSearchPage;
