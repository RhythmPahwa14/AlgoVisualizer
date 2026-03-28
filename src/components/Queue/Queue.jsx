// src/pages/Queue.jsx
import { useState, useEffect } from "react";
import "./Queue.css";

/**
 * Queue Data Structure Visualization Component
 * 
 * A comprehensive visualization tool for Queue operations including
 * enqueue, dequeue, peek, and educational content about FIFO principles.
 * 
 * @component
 * @returns {JSX.Element} Queue visualization component
 */
export default function Queue() {
  // State management
  const [items, setItems] = useState([]);              // Queue items array
  const [input, setInput] = useState("");              // Input field value
  const [peekIndex, setPeekIndex] = useState(null);    // Currently peeked item index
  const [showCode, setShowCode] = useState(null);      // Track which code snippet is open
  const [operationHistory, setOperationHistory] = useState([]); // Track operations

  // Operation history management
  useEffect(() => {
    if (items.length === 0) {
      setOperationHistory([]);
    }
  }, [items]);

  /**
   * ➕ Enqueue Operation - Add element to rear of queue
   */
  const enqueue = () => {
    const value = input.trim();
    if (!value) return;
    
    setItems((previousItems) => [...previousItems, value]);
    setOperationHistory((previousHistory) => [
      ...previousHistory,
      { type: "enqueue", value, timestamp: new Date() }
    ]);
    setInput("");
  };

  /**
   * ➖ Dequeue Operation - Remove element from front of queue
   */
  const dequeue = () => {
    if (!items.length) return;
    
    const dequeuedValue = items[0];
    setItems((previousItems) => previousItems.slice(1));
    setOperationHistory((previousHistory) => [
      ...previousHistory,
      { type: "dequeue", value: dequeuedValue, timestamp: new Date() }
    ]);
  };

  /**
   * 👀 Peek Operation - View front element without removal
   */
  const peek = () => {
    if (!items.length) return;
    
    setPeekIndex(0);
    setOperationHistory((previousHistory) => [
      ...previousHistory,
      { type: "peek", value: items[0], timestamp: new Date() }
    ]);
    
    // 🕒 Reset peek highlight after duration
    setTimeout(() => setPeekIndex(null), 600);
  };

  /**
   * 🧹 Reset Operation - Clear all queue items
   */
  const reset = () => {
    setItems([]);
    setOperationHistory((previousHistory) => [
      ...previousHistory,
      { type: "reset", timestamp: new Date() }
    ]);
  };

  /**
   * ⌨️ Handle keyboard input for Enter key
   * @param {React.KeyboardEvent} event - Keyboard event
   */
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      enqueue();
    }
  };

  return (
    <div className="queue-page">
      {/* 🏷️ Page Header */}
      <header className="page-header">
        <h1>Queue Data Structure (FIFO)</h1>
        <p className="page-subtitle">
          Visualize First-In-First-Out operations with interactive examples
        </p>
      </header>

      {/* 🎮 Control Panel */}
      <section className="controls-panel" aria-label="Queue operations controls">
        <div className="input-group">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter value to enqueue"
            className="queue-input"
            aria-label="Value to enqueue"
          />
          <button 
            onClick={enqueue}
            className="control-btn enqueue-btn"
            aria-label="Add item to queue"
          >
            Enqueue
          </button>
        </div>
        
        <div className="operation-buttons">
          <button 
            onClick={dequeue} 
            disabled={!items.length}
            className="control-btn dequeue-btn"
            aria-label="Remove item from front of queue"
          >
            Dequeue
          </button>
          <button 
            onClick={peek} 
            disabled={!items.length}
            className="control-btn peek-btn"
            aria-label="View front item without removal"
          >
            Peek
          </button>
          <button 
            onClick={reset} 
            disabled={!items.length}
            className="control-btn reset-btn"
            aria-label="Clear all items from queue"
          >
            Reset
          </button>
        </div>
      </section>

      {/* 🎨 Queue Visualization */}
      <section className="queue-visualization" aria-label="Queue visualization">
        <div className="queue-container">
          {items.map((value, index) => {
            const isFront = index === 0;
            const isRear = index === items.length - 1;
            const isPeek = index === peekIndex;
            
            return (
              <div
                key={`${value}-${index}`}
                className={`queue-item ${isFront ? "front" : ""} ${
                  isRear ? "rear" : ""
                } ${isPeek ? "peek" : ""}`}
                title={isFront ? "Front of queue" : isRear ? "Rear of queue" : `Position ${index + 1}`}
                aria-label={`Queue item: ${value}${isFront ? ', front of queue' : ''}${isRear ? ', rear of queue' : ''}`}
              >
                <span className="item-value">{value}</span>
                {isFront && <span className="item-label">Front</span>}
                {isRear && <span className="item-label">Rear</span>}
              </div>
            );
          })}
          {!items.length && (
            <div 
              className="queue-empty"
              aria-label="Queue is currently empty"
            >
              Queue is empty
            </div>
          )}
        </div>

        {/* 📊 Queue Statistics */}
        <div className="queue-stats">
          <div className="stat-item">
            <span className="stat-label">Size:</span>
            <span className="stat-value">{items.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Front:</span>
            <span className="stat-value">{items[0] || "None"}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Rear:</span>
            <span className="stat-value">{items[items.length - 1] || "None"}</span>
          </div>
        </div>

        {/* 🎯 Visualization Legend */}
        <div className="legend">
          <div className="legend-item">
            <span className="legend-box front" aria-hidden="true" />
            <span>Front (Dequeue)</span>
          </div>
          <div className="legend-item">
            <span className="legend-box rear" aria-hidden="true" />
            <span>Rear (Enqueue)</span>
          </div>
          <div className="legend-item">
            <span className="legend-box peek" aria-hidden="true" />
            <span>Peeked</span>
          </div>
        </div>
      </section>

      {/* 📚 Educational Content Section */}
      <section className="documentation-section" aria-label="Queue documentation">
        <article className="ds-info">
          <h2>About Queue Data Structure</h2>
          <p>
            A <strong>Queue</strong> is a linear data structure that follows the{" "}
            <em>First In, First Out (FIFO)</em> principle. Elements are inserted at
            the <strong>rear</strong> and removed from the <strong>front</strong>,
            similar to a real-world queue or line.
          </p>

          <h3>Key Queue Operations</h3>
          <ul className="operation-list">
            <li>
              <code>enqueue(x)</code> → Insert element <code>x</code> at the rear
            </li>
            <li>
              <code>dequeue()</code> → Remove and return element from the front
            </li>
            <li>
              <code>peek()</code> → View the front element without removing it
            </li>
            <li>
              <code>isEmpty()</code> → Check if the queue has no elements
            </li>
            <li>
              <code>size()</code> → Return the number of elements in queue
            </li>
          </ul>

          <h3>Time &amp; Space Complexity Analysis</h3>
          <table className="complexity-table">
            <thead>
              <tr>
                <th scope="col">Operation</th>
                <th scope="col">Time Complexity</th>
                <th scope="col">Space Complexity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Enqueue</td>
                <td>O(1)</td>
                <td>O(1)</td>
              </tr>
              <tr>
                <td>Dequeue</td>
                <td>O(1)</td>
                <td>O(1)</td>
              </tr>
              <tr>
                <td>Peek</td>
                <td>O(1)</td>
                <td>O(1)</td>
              </tr>
              <tr>
                <td>Search</td>
                <td>O(n)</td>
                <td>O(1)</td>
              </tr>
            </tbody>
          </table>

          <h3>Types of Queues</h3>
          <ul className="queue-types">
            <li>
              <strong>Simple Queue</strong> – Standard FIFO behavior with fixed size
            </li>
            <li>
              <strong>Circular Queue</strong> – Wraps around to avoid wasted space
            </li>
            <li>
              <strong>Double-Ended Queue (Deque)</strong> – Insertion/deletion at both ends
            </li>
            <li>
              <strong>Priority Queue</strong> – Elements dequeued by priority level
            </li>
            <li>
              <strong>Blocking Queue</strong> – Thread-safe operations for concurrent access
            </li>
          </ul>

          <h3>Algorithm Pseudocode</h3>
          <pre className="pseudocode" aria-label="Queue pseudocode">
{`initialize queue Q = []
enqueue(x): append x to Q
dequeue(): if Q not empty → remove and return Q[0]
peek(): return Q[0] if not empty
isEmpty(): return length(Q) == 0
size(): return length(Q)`}
          </pre>

          <h3>Real-World Applications</h3>
          <ul className="applications-list">
            <li>Operating System process scheduling</li>
            <li>Print job management and spooling</li>
            <li>Customer service call center systems</li>
            <li>Breadth-First Search (BFS) in graph algorithms</li>
            <li>Message queue systems in distributed computing</li>
            <li>Network packet routing and buffering</li>
          </ul>

          {/* 💻 Interactive Code Snippets */}
          <h3>Implementation Code Snippets</h3>
          <div className="code-snippets-container">
            {[
              {
                operation: "Enqueue",
                description: "Add element to rear of queue",
                code: `function enqueue(queue, element) {
  queue.push(element);
}`,
              },
              {
                operation: "Dequeue",
                description: "Remove element from front of queue",
                code: `function dequeue(queue) {
  if (queue.length === 0) {
    return null; // or throw underflow error
  }
  return queue.shift();
}`,
              },
              {
                operation: "Peek",
                description: "View front element without removal",
                code: `function peek(queue) {
  if (queue.length === 0) {
    return null;
  }
  return queue[0];
}`,
              },
              {
                operation: "Reset",
                description: "Clear all queue elements",
                code: `function reset(queue) {
  return [];
}`,
              },
            ].map(({ operation, description, code }) => (
              <div key={operation} className="code-snippet">
                <button
                  className="code-toggle-button"
                  onClick={() => setShowCode(showCode === operation ? null : operation)}
                  aria-expanded={showCode === operation}
                  aria-label={`${showCode === operation ? 'Hide' : 'Show'} ${operation} code`}
                >
                  <span className="operation-name">{operation}</span>
                  <span className="toggle-icon">
                    {showCode === operation ? "▲" : "▼"}
                  </span>
                </button>
                {showCode === operation && (
                  <div className="code-content">
                    <p className="code-description">{description}</p>
                    <pre className="implementation-code">{code}</pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* Usage Tips */}
      <aside className="usage-tips" aria-label="Usage tips">
        <h3>Quick Tips</h3>
        <ul>
          <li>Press <kbd>Enter</kbd> after typing to enqueue quickly</li>
          <li>Watch the front and rear indicators during operations</li>
          <li>Use peek to examine the front without modifying the queue</li>
          <li>Experiment with different operation sequences to understand FIFO</li>
        </ul>
      </aside>
    </div>
  );
}
