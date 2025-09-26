// src/pages/MathPage.jsx
import React, { useState } from "react";
import MathVisualizer from "../components/MathVisualizer";
import { mathAlgorithms } from "../data/allCodes";
import "../styles/global-theme.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

const MathPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("gcdEuclidean"); // default algorithm

  const algorithmData = mathAlgorithms[selectedAlgorithm] || {};

  // Default problem sizes for visualizer
  const defaultSizes = {
    gcdEuclidean: 2,          // two numbers
    sieveOfEratosthenes: 30,  // n = 30
    modularExponentiation: 3, // a, b, mod
    fft: 8                     // array length
  };

  // Friendly names for display
  const displayName = {
    gcdEuclidean: "GCD (Euclidean Algorithm)",
    sieveOfEratosthenes: "Sieve of Eratosthenes",
    modularExponentiation: "Modular Exponentiation",
    fft: "Fast Fourier Transform (FFT)"
  };

  return (
    <div className="theme-container" data-aos="fade-up" data-aos-duration="1000">
      <h1 className="theme-title">Mathematical Algorithms Visualizer</h1>
      <p style={{
        textAlign: 'center',
        maxWidth: '700px',
        margin: '-2rem auto 2rem auto',
        color: 'var(--theme-text-secondary)'
      }}>
        Explore common mathematical algorithms step-by-step. Use the visualizer to understand how each algorithm works with sample inputs.
      </p>

      {/* Visualizer Component */}
      <div data-aos="fade-up" data-aos-delay="200">
        <MathVisualizer
          defaultAlgorithm={selectedAlgorithm}
          problemSize={defaultSizes[selectedAlgorithm] || 5}
          autoLoadExample={true}
        />
      </div>

      {/* Algorithm Selector */}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', margin: '1rem 0', flexWrap: 'wrap' }} data-aos="fade-up" data-aos-delay="300">
        {Object.keys(mathAlgorithms).map((algo) => (
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
          <h3>Mathematical Algorithm - Code Implementation</h3>
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
              {algorithmData[selectedLanguage]
                ? algorithmData[selectedLanguage]
                : `// Implementation in ${selectedLanguage.toUpperCase()} coming soon!`}
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
          <strong>Note:</strong> This is the actual implementation code for <strong>{displayName[selectedAlgorithm]}</strong> in <strong>{selectedLanguage.toUpperCase()}</strong>. You can copy and use it in your projects.
        </div>
      </div>
    </div>
  );
};

export default MathPage;
