import React, { useState } from 'react';
import { useDebugging } from '../contexts/DebuggingContext';
import '../styles/DebuggingControls.css';

const DebuggingControls = ({ onDebugStart, onDebugStop }) => {
  const { state, actions } = useDebugging();
  const [newBreakpoint, setNewBreakpoint] = useState('');
  const [newConditionalBreakpoint, setNewConditionalBreakpoint] = useState({ line: '', condition: '' });
  const [newWatchExpression, setNewWatchExpression] = useState('');

  const handleStartDebugging = () => {
    actions.startDebugging({
      initialState: {},
      initialCallStack: [],
      initialVariables: {},
      initialScopes: [],
      totalSteps: 100
    });
    if (onDebugStart) onDebugStart();
  };

  const handleStopDebugging = () => {
    actions.stopDebugging();
    if (onDebugStop) onDebugStop();
  };

  const handleAddBreakpoint = () => {
    if (newBreakpoint && !isNaN(newBreakpoint)) {
      actions.addBreakpoint(parseInt(newBreakpoint));
      setNewBreakpoint('');
    }
  };

  const handleAddConditionalBreakpoint = () => {
    if (newConditionalBreakpoint.line && newConditionalBreakpoint.condition && 
        !isNaN(newConditionalBreakpoint.line)) {
      actions.addConditionalBreakpoint(
        parseInt(newConditionalBreakpoint.line), 
        newConditionalBreakpoint.condition
      );
      setNewConditionalBreakpoint({ line: '', condition: '' });
    }
  };

  const handleAddWatchExpression = () => {
    if (newWatchExpression) {
      actions.addWatchExpression(newWatchExpression);
      setNewWatchExpression('');
    }
  };

  return (
    <div className="debugging-controls">
      <div className="debugging-header">
        <h3>Debugging Controls</h3>
        {!state.isDebugging ? (
          <button onClick={handleStartDebugging} className="btn btn-primary">
            Start Debugging
          </button>
        ) : (
          <button onClick={handleStopDebugging} className="btn btn-secondary">
            Stop Debugging
          </button>
        )}
      </div>

      {state.isDebugging && (
        <>
          <div className="debugging-actions">
            <button 
              onClick={actions.stepBackward} 
              disabled={state.currentStep === 0}
              className="btn btn-secondary"
            >
              Step Backward
            </button>
            <button 
              onClick={actions.stepForward} 
              disabled={state.currentStep === state.totalSteps - 1}
              className="btn btn-primary"
            >
              Step Forward
            </button>
            <button 
              onClick={actions.stepInto} 
              className="btn btn-secondary"
            >
              Step Into
            </button>
            <button 
              onClick={actions.stepOver} 
              className="btn btn-secondary"
            >
              Step Over
            </button>
            <button 
              onClick={actions.stepOut} 
              className="btn btn-secondary"
            >
              Step Out
            </button>
            {state.isPaused ? (
              <button 
                onClick={actions.resumeExecution} 
                className="btn btn-success"
              >
                Resume
              </button>
            ) : (
              <button 
                onClick={() => actions.pauseExecution(state.currentStep)} 
                className="btn btn-warning"
              >
                Pause
              </button>
            )}
          </div>

          <div className="debugging-info">
            <p>Current Step: {state.currentStep + 1} / {state.totalSteps}</p>
            <p>Status: {state.isPaused ? 'Paused' : 'Running'}</p>
          </div>

          <div className="breakpoints-section">
            <h4>Breakpoints</h4>
            <div className="breakpoint-input">
              <input
                type="number"
                value={newBreakpoint}
                onChange={(e) => setNewBreakpoint(e.target.value)}
                placeholder="Line number"
              />
              <button onClick={handleAddBreakpoint} className="btn btn-small">
                Add
              </button>
            </div>
            
            <div className="conditional-breakpoint-input">
              <input
                type="number"
                value={newConditionalBreakpoint.line}
                onChange={(e) => setNewConditionalBreakpoint({
                  ...newConditionalBreakpoint,
                  line: e.target.value
                })}
                placeholder="Line number"
              />
              <input
                type="text"
                value={newConditionalBreakpoint.condition}
                onChange={(e) => setNewConditionalBreakpoint({
                  ...newConditionalBreakpoint,
                  condition: e.target.value
                })}
                placeholder="Condition (e.g., i > 5)"
              />
              <button onClick={handleAddConditionalBreakpoint} className="btn btn-small">
                Add Conditional
              </button>
            </div>
            
            <div className="breakpoints-list">
              {Array.from(state.breakpoints).map((line) => (
                <div key={line} className="breakpoint-item">
                  <span>Line {line}</span>
                  <button 
                    onClick={() => actions.removeBreakpoint(line)}
                    className="btn btn-danger btn-small"
                  >
                    Remove
                  </button>
                </div>
              ))}
              
              {Object.entries(state.conditionalBreakpoints).map(([line, condition]) => (
                <div key={line} className="breakpoint-item conditional">
                  <span>Line {line}: {condition}</span>
                  <button 
                    onClick={() => actions.removeConditionalBreakpoint(line)}
                    className="btn btn-danger btn-small"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="watch-expressions-section">
            <h4>Watch Expressions</h4>
            <div className="watch-input">
              <input
                type="text"
                value={newWatchExpression}
                onChange={(e) => setNewWatchExpression(e.target.value)}
                placeholder="Expression to watch"
              />
              <button onClick={handleAddWatchExpression} className="btn btn-small">
                Add
              </button>
            </div>
            
            <div className="watch-expressions-list">
              {state.watchExpressions.map((expression, index) => (
                <div key={index} className="watch-expression-item">
                  <span>{expression}</span>
                  <button 
                    onClick={() => actions.removeWatchExpression(index)}
                    className="btn btn-danger btn-small"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DebuggingControls;