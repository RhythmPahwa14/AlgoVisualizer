import React, { useState } from "react";
import GraphVisualizer from "../components/GraphVisualizer";
import InputPanel from "../components/InputPanel";
import { graphAlgorithms } from "../data/allCodes";
import { getSampleData, getValidationRule } from "../data/sampleData";
import "../styles/global-theme.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

const GraphEulerianPath = () => {
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
      <h1 className="theme-title">Eulerian Path & Circuit</h1>
      <p style={{ textAlign: 'center', maxWidth: '700px', margin: '-2rem auto 2rem auto', color: 'var(--theme-text-secondary)' }}>
        An Eulerian path is a trail in a graph that visits every edge exactly once. An Eulerian circuit is an Eulerian path that starts and ends on the same vertex.
        This visualizer uses <strong>Hierholzer's algorithm</strong> to find an Eulerian path.
        <br/><br/>
        A graph has an Eulerian circuit if and only if every vertex has an even degree. A graph has an Eulerian path if it has at most two vertices of odd degree.
      </p>

      {/* Enhanced Input Panel */}
      <InputPanel
        dataType="graph"
        placeholder='Enter graph data. Example: {"nodes": [{"id": 0}, {"id": 1}], "edges": [{"from": 0, "to": 1}]}'
        acceptedFormats={['json']}
        sampleData={getSampleData('graph', 'eulerian')}
        validationRules={getValidationRule('graph')}
        onDataLoaded={handleGraphDataLoaded}
        className="graph-input-panel"
      />

      {/* Graph Visualizer */}
      <div data-aos="fade-up" data-aos-delay="300">
        <GraphVisualizer 
          defaultAlgorithm="Eulerian" 
          autoLoadExample={!customGraph}
          customGraph={customGraph} 
        />
      </div>

      {/* Code Implementation Section */}
      <div className="theme-card" style={{ marginTop: '2rem' }} data-aos="fade-up" data-aos-delay="400">
        <div className="theme-card-header">
          <h3>Hierholzer's Algorithm - Code Implementation</h3>
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
              {graphAlgorithms.hierholzer && graphAlgorithms.hierholzer[selectedLanguage] 
                ? graphAlgorithms.hierholzer[selectedLanguage]
                : `// Hierholzer's algorithm implementation in ${selectedLanguage.toUpperCase()} coming soon!`
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
          <strong>Note:</strong> This is an implementation of Hierholzer's algorithm for finding an Eulerian Path in {selectedLanguage.toUpperCase()}. 
          You can copy and use this code in your projects.
        </div>
      </div>
    </div>
  );
};

export default GraphEulerianPath;
