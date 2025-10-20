import React from 'react';
import { useDebugging } from '../contexts/DebuggingContext';
import '../styles/MemoryVisualizer.css';

const MemoryVisualizer = () => {
  const { state } = useDebugging();

  const renderMemoryBlock = (block, index) => {
    return (
      <div key={index} className="memory-block">
        <div className="memory-address">0x{block.address?.toString(16) || `000${index}`}</div>
        <div className="memory-content">
          <span className="memory-value">{JSON.stringify(block.value)}</span>
          {block.type && <span className="memory-type">({block.type})</span>}
        </div>
        {block.references && (
          <div className="memory-references">
            References: {block.references.length}
          </div>
        )}
      </div>
    );
  };

  const renderHeap = () => {
    if (!state.memory.heap || state.memory.heap.length === 0) {
      return <p className="empty-state">Heap is empty</p>;
    }

    return (
      <div className="memory-section">
        <h4>Heap Memory</h4>
        <div className="memory-blocks">
          {state.memory.heap.map((block, index) => renderMemoryBlock(block, index))}
        </div>
      </div>
    );
  };

  const renderStack = () => {
    if (!state.memory.stack || state.memory.stack.length === 0) {
      return <p className="empty-state">Stack is empty</p>;
    }

    return (
      <div className="memory-section">
        <h4>Stack Memory</h4>
        <div className="memory-blocks">
          {state.memory.stack.map((block, index) => renderMemoryBlock(block, index))}
        </div>
      </div>
    );
  };

  return (
    <div className="memory-visualizer">
      <h3>Memory Visualization</h3>
      <div className="memory-content">
        <div className="memory-layout">
          {renderStack()}
          {renderHeap()}
        </div>
        
        <div className="memory-metrics">
          <div className="metric">
            <span className="metric-label">Total Memory:</span>
            <span className="metric-value">{state.metrics.memoryUsage} bytes</span>
          </div>
          <div className="metric">
            <span className="metric-label">Stack Size:</span>
            <span className="metric-value">{state.memory.stack?.length || 0} blocks</span>
          </div>
          <div className="metric">
            <span className="metric-label">Heap Size:</span>
            <span className="metric-value">{state.memory.heap?.length || 0} blocks</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryVisualizer;