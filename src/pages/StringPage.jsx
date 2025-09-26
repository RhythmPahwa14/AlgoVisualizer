// src/pages/StringPage.jsx
import React, { useState } from "react";
import StringVisualizer from "../components/StringVisualizer";
import { stringAlgorithms } from "../data/allCodes";
import "../styles/global-theme.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

const StringPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("KMP"); // default algorithm

  const algorithmData = stringAlgorithms[selectedAlgorithm] || {};

  // Friendly names for buttons
const displayName = {
  kmp: "Knuth-Morris-Pratt",
  rabinKarp: "Rabin-Karp",
  zAlgorithm: "Z Algorithm",
  suffixArray: "Suffix Array"
};

  return (
    <div className="theme-container" data-aos="fade-up" data-aos-duration="1000">
      <h1 className="theme-title">String Algorithm Visualizer</h1>
      <p style={{
        textAlign: 'center',
        maxWidth: '700px',
        margin: '-2rem auto 2rem auto',
        color: 'var(--theme-text-secondary)'
      }}>
        Use the visualizer below to explore how string algorithms work step-by-step. You can load examples or customize your own text and pattern.
      </p>

      {/* Visualizer Component */}
      <div data-aos="fade-up" data-aos-delay="200">
        <StringVisualizer defaultAlgorithm={selectedAlgorithm} />
      </div>

      {/* Algorithm Selector */}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', margin: '1rem 0', flexWrap: 'wrap' }} data-aos="fade-up" data-aos-delay="300">
        {Object.keys(stringAlgorithms).map((algo) => (
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
          <h3>String Algorithm - Code Implementation</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {["java", "python", "cpp"].map((lang) => (
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
              {algorithmData[selectedLanguage] || `// Implementation not available in ${selectedLanguage.toUpperCase()}`}
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

export default StringPage;
