import React, { useState } from 'react';
import ComplexityAnalyzer from './ComplexityAnalyzer';
import { performanceAlgorithms } from '../algorithms/performanceAlgorithms';

const cardStyle = {
  background: 'var(--surface)',
  color: 'var(--text)',
  borderRadius: '0.5rem',
  padding: '2rem', // increased padding for more space
  marginBottom: '2rem',
  border: '1px solid var(--border-color, #e0e0e0)',
  boxShadow: '0 4px 6px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.02)',
};

const PerformanceDashboard = () => {
  const [selectedAlgorithmName, setSelectedAlgorithmName] = useState('');

  const handleAlgorithmSelect = (e) => {
    const algorithmName = e.target.value;
    setSelectedAlgorithmName(algorithmName);
  };

  return (
    <div className="performance-dashboard w-full flex justify-center px-4 py-6">
      <div className="max-w-6xl w-full flex flex-col items-center"> {/* Increased max-width */}

        {/* Header */}
        <h1
          className="font-extrabold text-5xl md:text-6xl mb-10 text-center"
          style={{
            color: 'var(--primary, #007bff)',
            letterSpacing: '-0.025em',
            lineHeight: '1.1',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          Algorithm Performance Analyzer
        </h1>

        {/* Algorithm Selector */}
        <div style={cardStyle} className="w-full">
          <h2 className="card-title mb-4 text-center text-2xl font-bold">Select Algorithm</h2>

          <div className="flex flex-wrap gap-4 justify-center items-center">
            <select
              onChange={handleAlgorithmSelect}
              className="form-input px-4 py-2 rounded border border-gray-300 dark:border-gray-600"
              value={selectedAlgorithmName}
            >
              <option value="">Choose an algorithm</option>
              {Object.keys(performanceAlgorithms).map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>

            {selectedAlgorithmName && (
              <div className="btn btn-primary cursor-default px-4 py-2">
                Selected: {selectedAlgorithmName}
              </div>
            )}
          </div>
        </div>

        {/* Complexity Analyzer */}
        {selectedAlgorithmName ? (
          <div style={cardStyle} className="w-full mt-6"> {/* Added cardStyle for visual consistency */}
            <ComplexityAnalyzer
              algorithm={performanceAlgorithms[selectedAlgorithmName] || null}
              algorithmName={selectedAlgorithmName}
            />
          </div>
        ) : (
          <div style={cardStyle} className="text-center w-full mt-6">
            <h3 className="card-title text-xl font-semibold mb-2">Awaiting Selection</h3>
            <p className="card-subtitle text-md text-muted">
              Select an algorithm to analyze its performance
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceDashboard;