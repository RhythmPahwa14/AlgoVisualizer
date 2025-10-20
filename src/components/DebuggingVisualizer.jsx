import React, { useState, useEffect } from 'react';
import { useDebugging } from '../contexts/DebuggingContext';
import DebuggingControls from './DebuggingControls';
import CallStackVisualizer from './CallStackVisualizer';
import VariableTracker from './VariableTracker';
import MemoryVisualizer from './MemoryVisualizer';
import ExpressionEvaluator from '../utils/ExpressionEvaluator';
import '../styles/DebuggingVisualizer.css';

const DebuggingVisualizer = ({ algorithmName, initialArray }) => {
  const { state, actions } = useDebugging();
  const [activeTab, setActiveTab] = useState('controls');

  // Update watch expressions periodically
  useEffect(() => {
    if (!state.isDebugging || state.watchExpressions.length === 0) return;

    const interval = setInterval(() => {
      const results = {};
      state.watchExpressions.forEach((expression, index) => {
        try {
          // Set current variables in the evaluator
          ExpressionEvaluator.setVariables({
            ...state.variables,
            array: initialArray,
            // Add other relevant variables here
          });
          
          const result = ExpressionEvaluator.evaluate(expression);
          results[index] = { value: result, error: null };
        } catch (error) {
          results[index] = { value: null, error: error.message };
        }
      });
      
      actions.updateWatchResults(results);
    }, 500);

    return () => clearInterval(interval);
  }, [state.isDebugging, state.watchExpressions, state.variables, initialArray, actions]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'controls':
        return <DebuggingControls />;
      case 'callstack':
        return <CallStackVisualizer />;
      case 'variables':
        return <VariableTracker />;
      case 'memory':
        return <MemoryVisualizer />;
      default:
        return <DebuggingControls />;
    }
  };

  if (!state.isDebugging) {
    return (
      <div className="debugging-visualizer">
        <DebuggingControls />
      </div>
    );
  }

  return (
    <div className="debugging-visualizer">
      <div className="debugging-tabs">
        <button 
          className={`tab-button ${activeTab === 'controls' ? 'active' : ''}`}
          onClick={() => setActiveTab('controls')}
        >
          Controls
        </button>
        <button 
          className={`tab-button ${activeTab === 'callstack' ? 'active' : ''}`}
          onClick={() => setActiveTab('callstack')}
        >
          Call Stack
        </button>
        <button 
          className={`tab-button ${activeTab === 'variables' ? 'active' : ''}`}
          onClick={() => setActiveTab('variables')}
        >
          Variables
        </button>
        <button 
          className={`tab-button ${activeTab === 'memory' ? 'active' : ''}`}
          onClick={() => setActiveTab('memory')}
        >
          Memory
        </button>
      </div>
      
      <div className="debugging-content">
        {renderTabContent()}
      </div>
      
      {state.watchExpressions.length > 0 && (
        <div className="watch-results">
          <h4>Watch Results</h4>
          <div className="watch-results-content">
            {state.watchExpressions.map((expression, index) => {
              const result = state.watchResults[index];
              return (
                <div key={index} className="watch-result-item">
                  <span className="watch-expression">{expression}:</span>
                  {result ? (
                    result.error ? (
                      <span className="watch-error">Error: {result.error}</span>
                    ) : (
                      <span className="watch-value">{JSON.stringify(result.value)}</span>
                    )
                  ) : (
                    <span className="watch-pending">Evaluating...</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DebuggingVisualizer;