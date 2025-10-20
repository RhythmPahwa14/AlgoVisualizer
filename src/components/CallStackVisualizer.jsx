import React from 'react';
import { useDebugging } from '../contexts/DebuggingContext';
import '../styles/CallStackVisualizer.css';

const CallStackVisualizer = () => {
  const { state } = useDebugging();

  return (
    <div className="call-stack-visualizer">
      <h3>Call Stack</h3>
      <div className="call-stack-content">
        {state.callStack.length === 0 ? (
          <p className="empty-state">Call stack is empty</p>
        ) : (
          <div className="call-stack-list">
            {state.callStack.map((frame, index) => (
              <div 
                key={index} 
                className={`call-stack-frame ${index === state.callStack.length - 1 ? 'active' : ''}`}
              >
                <div className="frame-header">
                  <span className="frame-name">{frame.functionName}</span>
                  <span className="frame-location">{frame.file}:{frame.line}</span>
                </div>
                {frame.parameters && (
                  <div className="frame-parameters">
                    <h4>Parameters:</h4>
                    <ul>
                      {Object.entries(frame.parameters).map(([name, value]) => (
                        <li key={name}>
                          <span className="param-name">{name}:</span>
                          <span className="param-value">{JSON.stringify(value)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {frame.locals && (
                  <div className="frame-locals">
                    <h4>Local Variables:</h4>
                    <ul>
                      {Object.entries(frame.locals).map(([name, value]) => (
                        <li key={name}>
                          <span className="local-name">{name}:</span>
                          <span className="local-value">{JSON.stringify(value)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {frame.returnValue !== undefined && (
                  <div className="frame-return">
                    <h4>Return Value:</h4>
                    <span className="return-value">{JSON.stringify(frame.returnValue)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CallStackVisualizer;