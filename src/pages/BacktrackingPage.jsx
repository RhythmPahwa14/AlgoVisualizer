// src/pages/BacktrackingPage.jsx
import React, { useState, useEffect } from "react";
import BacktrackingVisualizer from "../components/BacktrackingVisualizer";
import { backtrackingAlgorithms } from "../data/allCodes";
import "../styles/global-theme.css";

import 'aos/dist/aos.css';

// 🎯 Debug logging helper
const logDebug = (message, data = null) => {
  console.log(`🎨 BacktrackingDebug: ${message}`, data ? data : '');
};

const BacktrackingPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("nQueens"); // default algorithm
  const [performanceMetrics, setPerformanceMetrics] = useState({
    algorithmSwitches: 0,
    languageChanges: 0,
    lastSwitchTime: null
  });

  // 🎯 Component lifecycle logging
  useEffect(() => {
    logDebug('🚀 BacktrackingPage mounted', { 
      initialAlgorithm: selectedAlgorithm,
      initialLanguage: selectedLanguage 
    });

    return () => {
      logDebug('🧹 BacktrackingPage unmounting', {
        totalAlgorithmSwitches: performanceMetrics.algorithmSwitches,
        totalLanguageChanges: performanceMetrics.languageChanges
      });
    };
  }, []);

  const algorithmData = backtrackingAlgorithms[selectedAlgorithm] || {};

  // 🎯 Track algorithm performance
  useEffect(() => {
    if (performanceMetrics.lastSwitchTime) {
      const switchTime = Date.now() - performanceMetrics.lastSwitchTime;
      logDebug('🔄 Algorithm switched', {
        from: performanceMetrics.lastAlgorithm,
        to: selectedAlgorithm,
        switchTime: `${switchTime}ms`
      });
    }
  }, [selectedAlgorithm, performanceMetrics]);

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

  // 🎯 Algorithm selection handler with logging
  const handleAlgorithmSelect = (algo) => {
    const previousAlgorithm = selectedAlgorithm;
    setSelectedAlgorithm(algo);
    setPerformanceMetrics(prev => ({
      ...prev,
      algorithmSwitches: prev.algorithmSwitches + 1,
      lastSwitchTime: Date.now(),
      lastAlgorithm: previousAlgorithm
    }));
    logDebug('🎯 Algorithm selected', { 
      previous: previousAlgorithm,
      new: algo,
      totalSwitches: performanceMetrics.algorithmSwitches + 1
    });
  };

  // 🎯 Language selection handler with logging
  const handleLanguageSelect = (lang) => {
    const previousLanguage = selectedLanguage;
    setSelectedLanguage(lang);
    setPerformanceMetrics(prev => ({
      ...prev,
      languageChanges: prev.languageChanges + 1
    }));
    logDebug('🌐 Language selected', { 
      previous: previousLanguage,
      new: lang,
      totalChanges: performanceMetrics.languageChanges + 1
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

  return (
    <div 
      className="theme-container" 
      data-aos="fade-up" 
      data-aos-duration="1000"
      role="main"
      aria-label="Backtracking Algorithms Visualizer"
    >
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
      <div 
        data-aos="fade-up" 
        data-aos-delay="200"
        role="region"
        aria-label="Algorithm Visualization"
      >
        <BacktrackingVisualizer
          defaultAlgorithm={selectedAlgorithm}
          boardSize={defaultSizes[selectedAlgorithm] || 8}
          autoLoadExample={true}
        />
      </div>

      {/* Algorithm Selector */}
      <div 
        style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          justifyContent: 'center', 
          margin: '1rem 0', 
          flexWrap: 'wrap' 
        }} 
        data-aos="fade-up" 
        data-aos-delay="300"
        role="toolbar"
        aria-label="Algorithm Selection"
      >
        {Object.keys(backtrackingAlgorithms).map((algo) => (
          <button
            key={algo}
            className={`btn ${selectedAlgorithm === algo ? 'btn-primary' : 'btn-secondary'}`}
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

      {/* 🎯 Performance Stats (Debug View) */}
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
          data-aos-delay="350"
        >
          <strong>🎯 Debug Stats:</strong> {performanceMetrics.algorithmSwitches} algorithm switches, {performanceMetrics.languageChanges} language changes
        </div>
      )}

      {/* Code Implementation Section */}
      <div 
        className="theme-card" 
        style={{ marginTop: '2rem' }} 
        data-aos="fade-up" 
        data-aos-delay="400"
        role="region"
        aria-label="Code Implementation"
      >
        <div className="theme-card-header">
          <h3>Backtracking - Code Implementation</h3>
          <div 
            style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}
            role="toolbar"
            aria-label="Programming Language Selection"
          >
            {["java", "python", "cpp", "javascript"].map((lang) => (
              <button
                key={lang}
                className={`btn ${selectedLanguage === lang ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handleLanguageSelect(lang)}
                onKeyDown={(e) => handleKeyDown(e, 'language', lang)}
                aria-pressed={selectedLanguage === lang}
                aria-label={`Select ${lang.toUpperCase()} programming language`}
                style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                tabIndex={0}
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div 
          style={{
            background: 'var(--surface-bg)',
            borderRadius: '8px',
            padding: '1.5rem',
            overflow: 'auto',
            maxHeight: '500px'
          }}
          role="code"
          aria-label={`${displayName[selectedAlgorithm]} algorithm code in ${selectedLanguage.toUpperCase()}`}
        >
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

        <div 
          style={{
            marginTop: '1rem',
            padding: '0.75rem',
            background: 'var(--accent-warning-bg)',
            borderRadius: '6px',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)'
          }}
          role="note"
          aria-label="Implementation note"
        >
          <strong>Note:</strong> This is the actual implementation code for the <strong>{displayName[selectedAlgorithm]}</strong> algorithm in <strong>{selectedLanguage.toUpperCase()}</strong>. You can copy and use this code in your projects.
        </div>

        {/* 🎯 Code Statistics */}
        <div 
          style={{
            marginTop: '0.75rem',
            padding: '0.5rem',
            background: 'var(--surface-bg)',
            borderRadius: '4px',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            textAlign: 'center'
          }}
        >
          {algorithmData[selectedLanguage] ? (
            <>
              <strong>📊 Code Stats:</strong> {algorithmData[selectedLanguage].split('\n').length} lines •{' '}
              {algorithmData[selectedLanguage].split(' ').length} words •{' '}
              {algorithmData[selectedLanguage].length} characters
            </>
          ) : (
            '📊 Code stats unavailable'
          )}
        </div>
      </div>

      {/* 🎯 Accessibility Helper Text */}
      <div 
        style={{
          marginTop: '1rem',
          padding: '0.75rem',
          background: 'var(--accent-info-bg)',
          borderRadius: '6px',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
          textAlign: 'center'
        }}
        role="complementary"
        aria-label="Accessibility Information"
      >
        <strong>♿ Accessibility:</strong> Use Tab to navigate and Space/Enter to select algorithms and languages.
      </div>
    </div>
  );
};

// 🎯 Performance monitoring helper
export const useBacktrackingPerformance = () => {
  const [metrics, setMetrics] = useState({
    pageLoadTime: null,
    interactions: 0,
    errors: 0
  });

  useEffect(() => {
    const loadTime = performance.now();
    setMetrics(prev => ({ ...prev, pageLoadTime: loadTime }));
    logDebug('⏱️ Page performance tracked', { loadTime });

    return () => {
      logDebug('📊 Performance summary', metrics);
    };
  }, []);

  const trackInteraction = (type) => {
    setMetrics(prev => ({
      ...prev,
      interactions: prev.interactions + 1
    }));
    logDebug('👆 User interaction', { type, totalInteractions: metrics.interactions + 1 });
  };

  const trackError = (error) => {
    setMetrics(prev => ({
      ...prev,
      errors: prev.errors + 1
    }));
    console.error('❌ Backtracking error:', error);
    logDebug('🛑 Error occurred', { error: error.message, totalErrors: metrics.errors + 1 });
  };

  return { metrics, trackInteraction, trackError };
};

export default BacktrackingPage;
