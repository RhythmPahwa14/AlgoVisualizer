// src/pages/BacktrackingPage.jsx
import React, { useState } from "react";
import BacktrackingVisualizer from "../components/BacktrackingVisualizer";
import { backtrackingAlgorithms } from "../data/allCodes";
import "../styles/global-theme.css";

import 'aos/dist/aos.css';

const BacktrackingPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("nQueens"); // default algorithm

  const algorithmData = backtrackingAlgorithms[selectedAlgorithm] || {};

  // Default board/problem sizes for each algorithm (for the visualizer)
  const defaultSizes = {
    nQueens: 8,
    sudoku: 9,
    ratInMaze: 5,
    combinationSum: 7,
    wordSearch: 5
  };

  // Friendly names for buttons
  const displayName = {
    nQueens: "N-Queens",
    sudoku: "Sudoku",
    ratInMaze: "Rat in a Maze",
    combinationSum: "Combination Sum",
    wordSearch: "Word Search"
  };

  return (
    <div className="theme-container" data-aos="fade-up" data-aos-duration="1000">
      <h1 className="theme-title">Backtracking Visualizer</h1>
      <p style={{
        textAlign: 'center',
        maxWidth: '700px',
        margin: '-2rem auto 2rem auto',
        color: 'var(--theme-text-secondary)'
      }}>
        Use the visualizer below to explore how backtracking algorithms work step-by-step. You can load examples or customize your own problem.
      </p>

      {/* Visualizer Component */}
      <div data-aos="fade-up" data-aos-delay="200">
        <BacktrackingVisualizer
          defaultAlgorithm={selectedAlgorithm}
          boardSize={defaultSizes[selectedAlgorithm] || 8}
          autoLoadExample={true}
        />
      </div>

      {/* Algorithm Selector */}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', margin: '1rem 0', flexWrap: 'wrap' }} data-aos="fade-up" data-aos-delay="300">
        {Object.keys(backtrackingAlgorithms).map((algo) => (
          <button
            key={algo}
            className={`btn ${selectedAlgorithm === algo ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedAlgorithm(algo)}
          >
            {displayName[algo] || algo}
          </button>
        ))}
      </div>

      {/* Code Implementation Section */}
      <div className="theme-card" style={{ marginTop: '2rem' }} data-aos="fade-up" data-aos-delay="400">
        <div className="theme-card-header">
          <h3>Backtracking - Code Implementation</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {["java", "python", "cpp", "javascript"].map((lang) => (
              <button
                key={lang}
                className={`btn ${selectedLanguage === lang ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedLanguage(lang)}
                style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          background: 'var(--surface-bg)',
          borderRadius: '8px',
          padding: '1.5rem',
          overflow: 'auto',
          maxHeight: '500px'
        }}>
          <pre style={{
            margin: 0,
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            fontSize: '0.9rem',
            lineHeight: '1.5',
            color: 'var(--text-primary)',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}>
            <code>
              {algorithmData[selectedLanguage]
                ? algorithmData[selectedLanguage]
                : `// Backtracking implementation in ${selectedLanguage.toUpperCase()} coming soon!`}
            </code>
          </pre>
        </div>

        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          background: 'var(--accent-warning-bg)',
          borderRadius: '6px',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)'
        }}>
          <strong>Note:</strong> This is the actual implementation code for the <strong>{displayName[selectedAlgorithm]}</strong> algorithm in <strong>{selectedLanguage.toUpperCase()}</strong>. You can copy and use this code in your projects.
        </div>
      </div>
    </div>
  );
};

export default BacktrackingPage;
