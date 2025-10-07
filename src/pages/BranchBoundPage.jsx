// src/pages/BranchBoundPage.jsx
import React, { useState, useEffect } from "react";
import BranchBoundVisualizer from "../components/BranchBoundVisualizer";
import { branchBoundAlgorithms } from "../data/allCodes";
import "../styles/global-theme.css";

import "aos/dist/aos.css";

// 🎯 Debug logging helper
const logDebug = (message, data = null) => {
  console.log(`🌿 BranchBoundDebug: ${message}`, data ? data : '');
};

// 🎯 Performance monitoring helper
const trackPerformance = (operation, startTime) => {
  const duration = performance.now() - startTime;
  logDebug(`⏱️ ${operation} Performance`, { duration: `${duration.toFixed(2)}ms` });
  return duration;
};

const BranchBoundPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("tsp"); // default algorithm
  const [performanceMetrics, setPerformanceMetrics] = useState({
    algorithmSwitches: 0,
    languageChanges: 0,
    codeLoads: 0,
    interactions: 0,
    pageLoadTime: null
  });

  const algorithmData = branchBoundAlgorithms[selectedAlgorithm] || {};

  // 🎯 Component lifecycle logging
  useEffect(() => {
    const loadStartTime = performance.now();
    logDebug('🚀 BranchBoundPage mounted', { 
      initialAlgorithm: selectedAlgorithm,
      initialLanguage: selectedLanguage 
    });

    // Track page load performance
    const loadTimer = setTimeout(() => {
      const loadDuration = performance.now() - loadStartTime;
      setPerformanceMetrics(prev => ({
        ...prev,
        pageLoadTime: loadDuration
      }));
      logDebug('✅ Page fully loaded', {
        loadTime: `${loadDuration.toFixed(2)}ms`,
        availableAlgorithms: Object.keys(branchBoundAlgorithms).length
      });
    }, 100);

    return () => {
      clearTimeout(loadTimer);
      logDebug('🧹 BranchBoundPage unmounting', {
        totalAlgorithmSwitches: performanceMetrics.algorithmSwitches,
        totalLanguageChanges: performanceMetrics.languageChanges,
        totalInteractions: performanceMetrics.interactions
      });
    };
  }, []);

  // 🎯 Track algorithm performance
  useEffect(() => {
    if (performanceMetrics.algorithmSwitches > 0) {
      logDebug('🔄 Algorithm active', {
        algorithm: selectedAlgorithm,
        displayName: displayName[selectedAlgorithm],
        hasCode: !!algorithmData[selectedLanguage]
      });
    }
  }, [selectedAlgorithm, algorithmData, selectedLanguage, performanceMetrics.algorithmSwitches]);

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

  // 🎯 Algorithm selection handler with logging
  const handleAlgorithmSelect = (algo) => {
    const previousAlgorithm = selectedAlgorithm;
    const switchStartTime = performance.now();
    
    setSelectedAlgorithm(algo);
    setPerformanceMetrics(prev => ({
      ...prev,
      algorithmSwitches: prev.algorithmSwitches + 1,
      interactions: prev.interactions + 1
    }));

    const switchDuration = trackPerformance('Algorithm Switch', switchStartTime);
    
    logDebug('🎯 Algorithm selected', { 
      previous: previousAlgorithm,
      new: algo,
      displayName: displayName[algo],
      totalSwitches: performanceMetrics.algorithmSwitches + 1,
      switchTime: `${switchDuration.toFixed(2)}ms`
    });
  };

  // 🎯 Language selection handler with logging
  const handleLanguageSelect = (lang) => {
    const previousLanguage = selectedLanguage;
    const switchStartTime = performance.now();
    
    setSelectedLanguage(lang);
    setPerformanceMetrics(prev => ({
      ...prev,
      languageChanges: prev.languageChanges + 1,
      codeLoads: prev.codeLoads + 1,
      interactions: prev.interactions + 1
    }));

    const switchDuration = trackPerformance('Language Switch', switchStartTime);
    
    logDebug('🌐 Language selected', { 
      previous: previousLanguage,
      new: lang,
      algorithm: selectedAlgorithm,
      hasCode: !!algorithmData[lang],
      totalChanges: performanceMetrics.languageChanges + 1,
      switchTime: `${switchDuration.toFixed(2)}ms`
    });
  };

  // 🎯 Keyboard navigation support
  const handleKeyDown = (event, type, value) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (type === 'algorithm') {
        handleAlgorithmSelect(value);
      } else if (type === 'language') {
        handleLanguageSelect(value);
      }
    }
  };

  // 🎯 Get code statistics
  const getCodeStats = () => {
    if (!algorithmData[selectedLanguage]) return null;
    
    const code = algorithmData[selectedLanguage];
    const lines = code.split('\n').length;
    const words = code.split(/\s+/).filter(word => word.length > 0).length;
    const characters = code.length;
    
    return { lines, words, characters };
  };

  const codeStats = getCodeStats();

  return (
    <div
      className="theme-container"
      data-aos="fade-up"
      data-aos-duration="1000"
      role="main"
      aria-label="Branch and Bound Algorithm Visualizer"
    >
      <h1 className="theme-title">Branch & Bound Visualizer</h1>
      <p
        style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "-2rem auto 2rem auto",
          color: "var(--theme-text-secondary)",
        }}
        role="doc-abstract"
      >
        Use the visualizer below to explore how Branch & Bound algorithms like
        TSP and Knapsack work step-by-step. You can load examples or check the
        source code.
      </p>

      {/* 🎯 Performance Metrics (Debug View) */}
      {process.env.NODE_ENV === 'development' && (
        <div 
          style={{
            background: 'var(--accent-info-bg)',
            padding: '0.5rem',
            borderRadius: '6px',
            margin: '1rem auto',
            maxWidth: '500px',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            textAlign: 'center'
          }}
          data-aos="fade-up"
          data-aos-delay="150"
          role="complementary"
          aria-label="Performance Statistics"
        >
          <strong>📊 Debug Stats:</strong> {performanceMetrics.algorithmSwitches} algo switches •{' '}
          {performanceMetrics.languageChanges} lang changes • {performanceMetrics.interactions} interactions
        </div>
      )}

      {/* Visualizer */}
      <div 
        data-aos="fade-up" 
        data-aos-delay="200"
        role="region"
        aria-label="Algorithm Visualization"
      >
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
        role="toolbar"
        aria-label="Algorithm Selection"
      >
        {Object.keys(branchBoundAlgorithms).map((algo) => (
          <button
            key={algo}
            className={`btn ${
              selectedAlgorithm === algo ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => handleAlgorithmSelect(algo)}
            onKeyDown={(e) => handleKeyDown(e, 'algorithm', algo)}
            aria-pressed={selectedAlgorithm === algo}
            aria-label={`Select ${displayName[algo] || algo} algorithm`}
            tabIndex={0}
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
        role="region"
        aria-label="Code Implementation"
      >
        <div className="theme-card-header">
          <h3>Branch & Bound - Code Implementation</h3>
          <div 
            style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
            role="toolbar"
            aria-label="Programming Language Selection"
          >
            {["java", "python", "cpp", "javascript"].map((lang) => (
              <button
                key={lang}
                className={`btn ${
                  selectedLanguage === lang ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => handleLanguageSelect(lang)}
                onKeyDown={(e) => handleKeyDown(e, 'language', lang)}
                aria-pressed={selectedLanguage === lang}
                aria-label={`Select ${lang.toUpperCase()} programming language`}
                style={{ fontSize: "0.9rem", padding: "0.5rem 1rem" }}
                tabIndex={0}
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
          role="code"
          aria-label={`${displayName[selectedAlgorithm]} algorithm code in ${selectedLanguage.toUpperCase()}`}
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

        {/* 🎯 Code Statistics */}
        {codeStats && (
          <div
            style={{
              marginTop: "1rem",
              padding: "0.5rem",
              background: "var(--surface-bg)",
              borderRadius: "4px",
              fontSize: "0.8rem",
              color: "var(--text-secondary)",
              textAlign: "center"
            }}
            role="complementary"
            aria-label="Code Statistics"
          >
            <strong>📊 Code Stats:</strong> {codeStats.lines} lines •{' '}
            {codeStats.words} words • {codeStats.characters} characters
          </div>
        )}

        <div
          style={{
            marginTop: "1rem",
            padding: "0.75rem",
            background: "var(--accent-warning-bg)",
            borderRadius: "6px",
            fontSize: "0.9rem",
            color: "var(--text-secondary)",
          }}
          role="note"
          aria-label="Implementation note"
        >
          <strong>Note:</strong> This is the actual implementation code for the{" "}
          <strong>{displayName[selectedAlgorithm]}</strong> algorithm in{" "}
          <strong>{selectedLanguage.toUpperCase()}</strong>. You can copy and
          use this code in your projects.
        </div>
      </div>

      {/* 🎯 Algorithm Information Card */}
      <div
        className="theme-card"
        style={{ marginTop: "1.5rem" }}
        data-aos="fade-up"
        data-aos-delay="500"
        role="complementary"
        aria-label="Algorithm Information"
      >
        <div className="theme-card-header">
          <h3>About {displayName[selectedAlgorithm]}</h3>
        </div>
        <div style={{ color: "var(--theme-text-secondary)", lineHeight: 1.6 }}>
          {selectedAlgorithm === 'tsp' && (
            <p>
              The <strong>Traveling Salesman Problem (TSP)</strong> involves finding the shortest possible route 
              that visits each city exactly once and returns to the origin city. Branch and Bound reduces the 
              search space by calculating lower bounds and pruning unpromising paths.
            </p>
          )}
          {selectedAlgorithm === 'knapsack' && (
            <p>
              The <strong>0/1 Knapsack Problem</strong> involves selecting items with given weights and values 
              to maximize total value without exceeding the knapsack capacity. Branch and Bound explores 
              item selections while bounding based on remaining capacity and potential value.
            </p>
          )}
          
          <div style={{ 
            marginTop: '1rem', 
            padding: '0.75rem', 
            background: 'var(--surface-bg)',
            borderRadius: '4px',
            fontSize: '0.9rem'
          }}>
            <strong>💡 Tip:</strong> The efficiency of Branch and Bound depends heavily on the quality of 
            the bounding function. Better bounds lead to more pruning and faster solutions.
          </div>
        </div>
      </div>

      {/* 🎯 Accessibility Helper */}
      <div
        style={{
          marginTop: "1.5rem",
          padding: "1rem",
          background: "var(--accent-info-bg)",
          borderRadius: "8px",
          textAlign: "center",
          fontSize: "0.9rem",
          color: "var(--text-secondary)"
        }}
        data-aos="fade-up"
        data-aos-delay="600"
        role="complementary"
        aria-label="Accessibility Information"
      >
        <strong>♿ Accessibility:</strong> Use Tab to navigate and Space/Enter to select algorithms and programming languages. 
        All interactive elements are properly labeled for screen readers.
      </div>
    </div>
  );
};

// 🎯 Performance monitoring hook
export const useBranchBoundMetrics = () => {
  const [metrics, setMetrics] = useState({
    visualizationsStarted: 0,
    codeCopies: 0,
    errors: 0
  });

  const trackVisualization = () => {
    setMetrics(prev => ({
      ...prev,
      visualizationsStarted: prev.visualizationsStarted + 1
    }));
    logDebug('🎬 Visualization started', { 
      totalStarts: metrics.visualizationsStarted + 1 
    });
  };

  const trackCodeCopy = () => {
    setMetrics(prev => ({
      ...prev,
      codeCopies: prev.codeCopies + 1
    }));
    logDebug('📋 Code copied', { 
      totalCopies: metrics.codeCopies + 1 
    });
  };

  const trackError = (error, context) => {
    setMetrics(prev => ({
      ...prev,
      errors: prev.errors + 1
    }));
    console.error('❌ BranchBound error:', error);
    logDebug('🛑 Error occurred', { 
      error: error.message, 
      context,
      totalErrors: metrics.errors + 1 
    });
  };

  return { metrics, trackVisualization, trackCodeCopy, trackError };
};

export default BranchBoundPage;
