// src/pages/KruskalPage.jsx
import React, { useState } from "react";
import KruskalVisualizer from "../components/KruskalVisualizer"; // create similar to PrimVisualizer
import { kruskalAlgorithms } from "../data/allCodes";
import "../styles/global-theme.css";

const KruskalPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("java");

  const algorithmData = kruskalAlgorithms.kruskal || {};

  return (
    <div className="theme-container">
      <h1 className="theme-title">Kruskal's Algorithm Visualizer</h1>

      {/* Kruskal's Algorithm Explanation */}
      <div className="theme-card" style={{ marginBottom: '2rem' }}>
        <div className="theme-card-header">
          <h3>Understanding Kruskal's Algorithm</h3>
        </div>
        <div style={{
          padding: '1.5rem',
          background: 'var(--surface-bg)',
          borderRadius: '8px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '1.5rem' }}>
            <div>
              <h4 style={{ color: 'var(--theme-primary)', marginBottom: '0.5rem' }}>🔍 What is Kruskal's Algorithm?</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                Kruskal's algorithm is a greedy algorithm that finds a Minimum Spanning Tree (MST) for a weighted undirected graph. It builds the MST by adding edges in order of increasing weight, ensuring no cycles are formed.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'var(--theme-primary)', marginBottom: '0.5rem' }}>🎯 Key Principle</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                <strong>Greedy Choice Property:</strong> At each step, choose the smallest edge that connects two different components. This ensures the total weight remains minimal while avoiding cycles.
              </p>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: 'var(--theme-primary)', marginBottom: '0.5rem' }}>🛠️ How Kruskal's Algorithm Works</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ background: 'var(--accent-bg)', padding: '1rem', borderRadius: '6px' }}>
                <h5 style={{ color: 'var(--theme-secondary)', margin: '0 0 0.5rem 0' }}>Phase 1: Sort Edges</h5>
                <ul style={{ color: 'var(--text-secondary)', margin: 0, paddingLeft: '1.2rem', lineHeight: '1.5' }}>
                  <li>Sort all edges by weight in ascending order</li>
                  <li>Initialize MST as empty</li>
                  <li>Create disjoint sets for each vertex</li>
                  <li>Set initial MST cost to 0</li>
                </ul>
              </div>
              <div style={{ background: 'var(--accent-bg)', padding: '1rem', borderRadius: '6px' }}>
                <h5 style={{ color: 'var(--theme-secondary)', margin: '0 0 0.5rem 0' }}>Phase 2: Build MST</h5>
                <ul style={{ color: 'var(--text-secondary)', margin: 0, paddingLeft: '1.2rem', lineHeight: '1.5' }}>
                  <li>Consider edges in sorted order</li>
                  <li>Add edge if it connects different components</li>
                  <li>Use Union-Find to merge components</li>
                  <li>Repeat until all vertices are connected</li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--success-bg)', borderRadius: '6px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>⏱️</div>
              <div style={{ fontWeight: 'bold', color: 'var(--theme-primary)' }}>O(E log E)</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Time Complexity</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--warning-bg)', borderRadius: '6px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>💾</div>
              <div style={{ fontWeight: 'bold', color: 'var(--theme-primary)' }}>O(V)</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Space Complexity</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--info-bg)', borderRadius: '6px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🎯</div>
              <div style={{ fontWeight: 'bold', color: 'var(--theme-primary)' }}>Greedy</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Algorithm Type</div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--surface-elevated)', borderRadius: '6px' }}>
            <h4 style={{ color: 'var(--theme-primary)', margin: '0 0 0.5rem 0' }}>💡 Key Technical Details</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <h5 style={{ color: 'var(--theme-secondary)', margin: '0 0 0.25rem 0', fontSize: '0.95rem' }}>Union-Find Structure</h5>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: '1.4' }}>
                  Uses disjoint set data structure with path compression and union by rank for efficient cycle detection and component merging.
                </p>
              </div>
              <div>
                <h5 style={{ color: 'var(--theme-secondary)', margin: '0 0 0.25rem 0', fontSize: '0.95rem' }}>Edge Sorting</h5>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: '1.4' }}>
                  Sorting edges by weight is crucial. The algorithm considers edges in increasing order of weight to ensure optimality.
                </p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <h4 style={{ color: 'var(--theme-primary)', margin: '0 0 0.5rem 0' }}>🚀 Real-World Applications</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', background: 'var(--accent-bg)', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>🏗️</div>
                <div style={{ fontWeight: 'bold', color: 'var(--theme-primary)', fontSize: '0.9rem' }}>Network Design</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Minimum cost networks</div>
              </div>
              <div style={{ padding: '0.75rem', background: 'var(--accent-bg)', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>🗺️</div>
                <div style={{ fontWeight: 'bold', color: 'var(--theme-primary)', fontSize: '0.9rem' }}>Road Networks</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Optimal path planning</div>
              </div>
              <div style={{ padding: '0.75rem', background: 'var(--accent-bg)', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>🧬</div>
                <div style={{ fontWeight: 'bold', color: 'var(--theme-primary)', fontSize: '0.9rem' }}>Biology</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Protein networks</div>
              </div>
              <div style={{ padding: '0.75rem', background: 'var(--accent-bg)', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>📊</div>
                <div style={{ fontWeight: 'bold', color: 'var(--theme-primary)', fontSize: '0.9rem' }}>Clustering</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Data analysis</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visualizer Component */}
      <KruskalVisualizer />

      {/* Code Implementation Section */}
      <div className="theme-card" style={{ marginTop: '2rem' }}>
        <div className="theme-card-header">
          <h3>Kruskal's Algorithm - Code Implementation</h3>
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
              {algorithmData[selectedLanguage]}
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
          <strong>Note:</strong> This is the actual implementation code for Kruskal's algorithm in <strong>{selectedLanguage.toUpperCase()}</strong>. You can copy and use this code in your projects.
        </div>
      </div>
    </div>
  );
};

export default KruskalPage;
