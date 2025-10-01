import { useState, useEffect } from "react";
import "./Queue.css";

export default function Queue() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [peekIndex, setPeekIndex] = useState(null);

  // --- Operations ---
  const enqueue = () => {
    const val = input.trim();
    if (!val) return;
    setItems((prev) => [...prev, val]);
    setInput("");
  };

  const dequeue = () => {
    if (!items.length) return;
    setItems((prev) => prev.slice(1));
  };

  const peek = () => {
    if (!items.length) return;
    setPeekIndex(0);
    setTimeout(() => setPeekIndex(null), 600); // highlight duration
  };

  const reset = () => setItems([]);

  return (
    <div className="queue-page">
      <h1>Queue (FIFO)</h1>

      {/* Controls */}
      <div className="controls">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Value to enqueue"
          onKeyDown={(e) => e.key === "Enter" && enqueue()}
        />
        <button onClick={enqueue}>Enqueue</button>
        <button onClick={dequeue} disabled={!items.length}>
          Dequeue
        </button>
        <button onClick={peek} disabled={!items.length}>
          Peek
        </button>
        <button onClick={reset} disabled={!items.length}>
          Reset
        </button>
      </div>

      {/* Visualization */}
      <div className="queue-visual">
        <div className="queue-container">
          {items.map((val, i) => {
            const isFront = i === 0;
            const isRear = i === items.length - 1;
            const isPeek = i === peekIndex;
            return (
              <div
                key={i}
                className={`queue-item ${isFront ? "front" : ""} ${
                  isRear ? "rear" : ""
                } ${isPeek ? "peek" : ""}`}
                title={isFront ? "Front" : isRear ? "Rear" : ""}
              >
                {val}
              </div>
            );
          })}
          {!items.length && <div className="queue-empty">Queue is empty</div>}
        </div>

        <div className="legend">
          <span className="legend-box front" /> Front
          <span className="legend-box rear" /> Rear
        </div>
      </div>

      {/* ---- Documentation / Info Panel ---- */}
      <section className="ds-info">
        <h2>About Queue</h2>
        <p>
          A <strong>Queue</strong> is a linear data structure that follows the{" "}
          <em>First In, First Out (FIFO)</em> principle. Elements are inserted at
          the <strong>rear</strong> and removed from the <strong>front</strong>.
        </p>

        <h3>Key Operations</h3>
        <ul>
          <li>
            <code>enqueue(x)</code> → insert element <code>x</code> at the rear
          </li>
          <li>
            <code>dequeue()</code> → remove element from the front
          </li>
          <li>
            <code>peek()</code> → view the front element without removing it
          </li>
          <li>
            <code>isEmpty()</code> → check if the queue has no elements
          </li>
        </ul>

        <h3>Time &amp; Space Complexities</h3>
        <table className="ds-table">
          <thead>
            <tr>
              <th>Operation</th>
              <th>Time</th>
              <th>Space</th>
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
        <ul>
          <li>
            <strong>Simple Queue</strong> – standard FIFO behavior.
          </li>
          <li>
            <strong>Circular Queue</strong> – wraps around, avoids wasted space.
          </li>
          <li>
            <strong>Double-Ended Queue (Deque)</strong> – insertion/deletion at
            both ends.
          </li>
          <li>
            <strong>Priority Queue</strong> – elements dequeued by priority.
          </li>
        </ul>

        {/* --- Code snippets panel --- */}
        <h3>Code Snippets</h3>

        <h4>Enqueue</h4>
        <pre className="ds-code">
{`const enqueue = () => {
  const val = input.trim();
  if (!val) return;
  setItems(prev => [...prev, val]);
  setInput("");
};`}
        </pre>

        <h4>Dequeue</h4>
        <pre className="ds-code">
{`const dequeue = () => {
  if (!items.length) return;
  setItems(prev => prev.slice(1));
};`}
        </pre>

        <h4>Peek</h4>
        <pre className="ds-code">
{`const peek = () => {
  if (!items.length) return;
  setPeekIndex(0);
  setTimeout(() => setPeekIndex(null), 600); // highlight front
};`}
        </pre>

        <h4>Reset</h4>
        <pre className="ds-code">
{`const reset = () => setItems([]);`}
        </pre>

        <h4>Pseudo-code</h4>
        <pre className="ds-code">
{`init queue Q = []
enqueue(x): append x to Q
dequeue(): if Q not empty -> remove and return Q[0]
peek(): return Q[0] if not empty
isEmpty(): return length(Q) == 0`}
        </pre>

        <h3>Real-World Applications</h3>
        <ul>
          <li>Task scheduling (OS process queues)</li>
          <li>Print job management</li>
          <li>Customer service systems</li>
          <li>Breadth-First Search (BFS) in graphs</li>
        </ul>
      </section>
    </div>
  );
}
