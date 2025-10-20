// src/pages/DebuggingDocumentation.jsx
import React from "react";
import "../styles/Documentation.css";

export default function DebuggingDocumentation() {
  return (
    <div className="theme-container documentation">
      <h1 className="theme-title">Algorithm Debugging System Documentation</h1>
      
      <div className="theme-card">
        <h2>Overview</h2>
        <p>
          The Algorithm Debugging System provides advanced debugging capabilities for algorithm visualization, 
          allowing users to step through algorithm execution, inspect variables, set breakpoints, and analyze 
          memory usage in real-time.
        </p>
      </div>

      <div className="theme-card">
        <h2>Key Features</h2>
        
        <h3>🔧 Advanced Execution State Tracking</h3>
        <ul>
          <li><strong>Complete Call Stack Visualization</strong> - See function calls, parameters, and return values</li>
          <li><strong>Real-time Variable State Tracking</strong> - Monitor variable values with memory address representation</li>
          <li><strong>Pointer/Reference Tracking</strong> - Visualize references for data structure algorithms</li>
          <li><strong>Scope-aware Variable Highlighting</strong> - Highlight variables based on their scope during execution</li>
        </ul>
        
        <h3>🎮 Interactive Debugging Controls</h3>
        <ul>
          <li><strong>Conditional Breakpoints</strong> - Set breakpoints with complex expression evaluation</li>
          <li><strong>Watch Expressions</strong> - Monitor custom formulas and expressions</li>
          <li><strong>Standard Controls</strong> - Step-over, Step-into, Step-out functionality</li>
          <li><strong>Reverse Execution</strong> - Time-travel debugging to revisit prior states</li>
          <li><strong>Loop Controls</strong> - Special controls for loop iterations and recursive calls</li>
        </ul>
        
        <h3>🧠 Memory Visualization System</h3>
        <ul>
          <li><strong>Real-time Heap/Stack Visualization</strong> - See memory allocation and deallocation</li>
          <li><strong>Dynamic Data Structure Rendering</strong> - Visualize linked lists, trees, and graphs</li>
          <li><strong>Memory Tracking</strong> - Monitor allocation/deallocation patterns</li>
          <li><strong>Garbage Collection Visualization</strong> - See when memory is freed</li>
          <li><strong>Cache Behavior Simulation</strong> - Understand cache effects on performance</li>
        </ul>
        
        <h3>🖥️ Advanced UI Debugger Components</h3>
        <ul>
          <li><strong>Split-screen Interface</strong> - Code and visualization side-by-side</li>
          <li><strong>Interactive Memory Inspector</strong> - Drill-down and search capabilities</li>
          <li><strong>Call Graph Visualization</strong> - Performance metrics for function calls</li>
          <li><strong>Timeline Scrubbing</strong> - Navigate execution history</li>
          <li><strong>Multi-threaded Visualization</strong> - For parallel algorithm execution</li>
        </ul>
      </div>

      <div className="theme-card">
        <h2>Expression Evaluation Engine</h2>
        <p>
          Our robust expression parser and evaluator supports:
        </p>
        <ul>
          <li>Complex logical and arithmetic expressions</li>
          <li>Custom variable and function evaluation</li>
          <li>Type checking and coercion handling</li>
          <li>Detailed error reporting and debugging assistance</li>
        </ul>
      </div>

      <div className="theme-card">
        <h2>Getting Started</h2>
        <h3>Enabling Debugging</h3>
        <p>
          To enable debugging for an algorithm:
        </p>
        <ol>
          <li>Navigate to the Debuggable Sorting page at <code>/sorting/debug</code></li>
          <li>Select an algorithm from the dropdown</li>
          <li>Check the "Enable Debugging" checkbox</li>
          <li>Click "Start Sort" to begin debugging</li>
        </ol>
        
        <h3>Using Debugging Controls</h3>
        <p>
          Once debugging is enabled, you can:
        </p>
        <ul>
          <li><strong>Step Forward/Backward</strong> - Move through execution steps</li>
          <li><strong>Step Into/Over/Out</strong> - Navigate function calls</li>
          <li><strong>Set Breakpoints</strong> - Pause execution at specific lines</li>
          <li><strong>Add Watch Expressions</strong> - Monitor variables and expressions</li>
        </ul>
      </div>

      <div className="theme-card">
        <h2>Technical Implementation</h2>
        <h3>Architecture</h3>
        <p>
          The debugging system is built with:
        </p>
        <ul>
          <li><strong>React Context API</strong> - For state management across components</li>
          <li><strong>Expression Evaluator</strong> - Custom parser for conditional breakpoints</li>
          <li><strong>Debuggable Algorithm Runner</strong> - Enhanced algorithm execution with debugging hooks</li>
          <li><strong>WebAssembly Integration</strong> - For performance-critical operations</li>
          <li><strong>D3.js Visualizations</strong> - For memory and call stack visualization</li>
        </ul>
        
        <h3>Performance Considerations</h3>
        <p>
          The debugging system is designed to:
        </p>
        <ul>
          <li>Minimize performance overhead during normal execution</li>
          <li>Provide real-time data synchronization between engine and UI</li>
          <li>Use efficient data structures for storing execution history</li>
          <li>Implement lazy loading for large data visualizations</li>
        </ul>
      </div>

      <div className="theme-card">
        <h2>Educational Value</h2>
        <p>
          The debugging system enhances learning by:
        </p>
        <ul>
          <li>Providing deep understanding of algorithm execution mechanics</li>
          <li>Teaching real debugging techniques for complex algorithms</li>
          <li>Enhancing comprehension of memory management concepts</li>
          <li>Demonstrating advanced software engineering patterns</li>
          <li>Introducing compiler and interpreter design fundamentals</li>
          <li>Improving algorithm analysis and optimization skills</li>
        </ul>
      </div>
    </div>
  );
}