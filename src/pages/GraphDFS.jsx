import React, { useState } from "react";
import GraphVisualizer from "../components/GraphVisualizer";
import InputPanel from "../components/InputPanel";
import { graphAlgorithms } from "../data/allCodes";
import { getSampleData, getValidationRule } from "../data/sampleData";
import "../styles/global-theme.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

const GraphDFS = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const [customGraph, setCustomGraph] = useState(null);
  const [inputText, setInputText] = useState("");

  // Enhanced handler for InputPanel
  const handleGraphDataLoaded = (graphData) => {
    setCustomGraph(graphData);
  };

  // Legacy handler to parse input (kept for backward compatibility)
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
    <div className="theme-container" data-aos="fade-up" data-aos-duration="1000">
      <h1 className="theme-title">Depth-First Search (DFS)</h1>
      <p style={{ textAlign: 'center', maxWidth: '700px', margin: '-2rem auto 2rem auto', color: 'var(--theme-text-secondary)' }}>
        Visualize DFS traversal on a graph. Use the input panel below to load your own graph data or sample graphs.
      </p>

      {/* Enhanced Input Panel */}
      <InputPanel
        dataType="graph"
        placeholder='Enter graph JSON: {"nodes":[{"id": 0, "label": "A"}, {"id": 1, "label": "B"}], "edges":[{"id": "0-1", "from": 0, "to": 1}]}'
        acceptedFormats={['json']}
        sampleData={getSampleData('graph', 'complex')}
        validationRules={getValidationRule('graph')}
        onDataLoaded={handleGraphDataLoaded}
        className="graph-input-panel"
      />

      {/* Legacy Custom Input Section (kept for backward compatibility) */}
      <div style={{
        background: 'var(--surface-bg)',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '1.5rem'
      }} data-aos="fade-up" data-aos-delay="200">
        <label style={{ fontWeight: 500, marginBottom: '0.5rem', display: 'block' }}>
          Legacy Text Input (use Input Panel above for better experience):
        </label>
        <textarea
          value={inputText}
          onChange={handleInputChange}
          placeholder='Enter graph JSON: {"nodes":[...], "edges":[...]}'
          style={{
            width: '100%',
            minHeight: '120px',
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            fontSize: '0.9rem',
            padding: '0.5rem',
            borderRadius: '6px',
            border: '1px solid var(--border-primary)',
            marginBottom: '0.5rem',
            resize: 'vertical'
          }}
        />
        <button
          onClick={handleLoadCustomGraph}
          style={{
            padding: '0.5rem 1rem',
            background: 'var(--accent-primary-bg)',
            color: 'var(--text-on-accent)',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Load Graph (Legacy)
        </button>
      </div>

      {/* Graph Visualizer */}
      <div data-aos="fade-up" data-aos-delay="300">
        <GraphVisualizer 
          defaultAlgorithm="DFS" 
          autoLoadExample={!customGraph} 
          customGraph={customGraph} 
        />
      </div>

      {/* Code Implementation Section */}
      <div className="theme-card" style={{ marginTop: '2rem' }} data-aos="fade-up" data-aos-delay="400">
        <div className="theme-card-header">
          <h3>DFS - Code Implementation</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {["java", "python", "cpp", "javascript"].map(lang => (
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
              {graphAlgorithms.dfs && graphAlgorithms.dfs[selectedLanguage] 
                ? graphAlgorithms.dfs[selectedLanguage]
                : `// DFS implementation in ${selectedLanguage.toUpperCase()} coming soon!`
              }
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
          <strong>Note:</strong> This is the actual implementation code for Depth-First Search in {selectedLanguage.toUpperCase()}. 
          You can copy and use this code in your projects.
        </div>
      </div>
    </div>
  );
};

export default GraphDFS;
