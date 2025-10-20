import React from 'react';
import { useDebugging } from '../contexts/DebuggingContext';
import '../styles/VariableTracker.css';

const VariableTracker = () => {
  const { state } = useDebugging();

  const renderValue = (value) => {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  const renderVariables = (variables, scopeName) => {
    if (!variables || Object.keys(variables).length === 0) {
      return <p className="empty-state">No variables in this scope</p>;
    }

    return (
      <div className="variables-scope">
        <h4>{scopeName}</h4>
        <ul className="variables-list">
          {Object.entries(variables).map(([name, value]) => (
            <li key={name} className="variable-item">
              <span className="variable-name">{name}:</span>
              <span className="variable-value">{renderValue(value)}</span>
              <span className="variable-type">({typeof value})</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="variable-tracker">
      <h3>Variable Tracking</h3>
      <div className="variables-content">
        {Object.keys(state.variables).length === 0 ? (
          <p className="empty-state">No variables to display</p>
        ) : (
          <>
            {renderVariables(state.variables, 'Current Scope')}
            {state.scopes.map((scope, index) => (
              <div key={index} className="scope-wrapper">
                {renderVariables(scope.variables, scope.name || `Scope ${index + 1}`)}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default VariableTracker;