import { useState, useEffect } from "react";
import "./Stack.css";

export default function Stack() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [peekTick, setPeekTick] = useState(0); // brief highlight on peek
  const [codeSnippet, setCodeSnippet] = useState(""); // dynamic code snippet
  const topIndex = items.length - 1;

  // brief animation toggle for Peek
  useEffect(() => {
    if (!peekTick) return;
    const t = setTimeout(() => setPeekTick(0), 500);
    return () => clearTimeout(t);
  }, [peekTick]);

  // ----- code snippets for operations -----
  const STACK_CODE = {
    push: `function push(stack, value) {
  stack.push(value);
}`,
    pop: `function pop(stack) {
  if(stack.length === 0) return null;
  return stack.pop();
}`,
    peek: `function peek(stack) {
  if(stack.length === 0) return null;
  return stack[stack.length - 1];
}`,
    reset: `function reset(stack) {
  stack.length = 0;
}`,
  };

  // ----- stack operations -----
  const push = () => {
    const val = input.trim();
    if (!val) return;
    setItems(prev => [...prev, val]);
    setInput("");
    setCodeSnippet(STACK_CODE.push);
  };

  const pop = () => {
    if (!items.length) return;
    setItems(prev => prev.slice(0, -1));
    setCodeSnippet(STACK_CODE.pop);
  };

  const peek = () => {
    if (!items.length) return;
    setPeekTick(peekTick + 1);
    setCodeSnippet(STACK_CODE.peek);
  };

  const reset = () => {
    setItems([]);
    setCodeSnippet(STACK_CODE.reset);
  };

  // convenience actions
  const pushSample = () => {
    const sample = ["A", "B", "C", "D"];
    setItems(sample);
    setCodeSnippet(STACK_CODE.push);
  };

  return (
    <div className="stack-page">
      <h1>Stack (LIFO)</h1>

      {/* Controls */}
      <div className="controls">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Value to push"
          onKeyDown={(e) => e.key === "Enter" && push()}
        />
        <button onClick={push}>Push</button>
        <button onClick={pop} disabled={!items.length}>Pop</button>
        <button onClick={peek} disabled={!items.length}>Peek</button>
        <button onClick={reset} disabled={!items.length}>Reset</button>
        <button onClick={pushSample}>Fill sample</button>
      </div>

      {/* Visualization */}
      <div className="stack-visual">
        <div className="stack-container" aria-label="Stack container">
          {items.map((val, i) => {
            const isTop = i === topIndex;
            const classes = [
              "stack-item",
              isTop ? "top" : "",
              isTop && peekTick ? "peek" : "",
            ].filter(Boolean).join(" ");

            return (
              <div
                key={i}
                className={classes}
                aria-label={isTop ? "Top element" : "Stack element"}
                title={isTop ? "Top" : ""}
                role="listitem"
              >
                {val}
              </div>
            );
          })}
          {!items.length && (
            <div className="stack-empty" role="status">
              Stack is empty
            </div>
          )}
        </div>

        <div className="legend">
          <span className="legend-box top" /> Top
          <span className="legend-box normal" /> Element
        </div>
      </div>

      {/* Dynamic Code Snippet */}
      {codeSnippet && (
        <section className="ds-code-section" aria-label="Stack operation code">
          <h3>Code Snippet</h3>
          <pre className="ds-code">{codeSnippet}</pre>
        </section>
      )}

      {/* ---- Info Panel ---- */}
      <section className="ds-info">
        <h2>About Stack</h2>
        <p>
          A <strong>Stack</strong> is a linear data structure that follows{" "}
          <em>Last In, First Out (LIFO)</em>. Elements are added and removed only from
          the top.
        </p>

        <h3>Operations &amp; Complexity</h3>
        <div className="ds-grid">
          <table className="ds-table">
            <thead>
              <tr>
                <th>Operation</th>
                <th>What it does</th>
                <th>Time</th>
                <th>Space</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>push(x)</code></td>
                <td>Add <code>x</code> to the top</td>
                <td>O(1)</td>
                <td>O(1)</td>
              </tr>
              <tr>
                <td><code>pop()</code></td>
                <td>Remove &amp; return top</td>
                <td>O(1)</td>
                <td>O(1)</td>
              </tr>
              <tr>
                <td><code>peek()</code></td>
                <td>Read top without removing</td>
                <td>O(1)</td>
                <td>O(1)</td>
              </tr>
              <tr>
                <td><code>size()</code> / <code>isEmpty()</code></td>
                <td>Get count / check empty</td>
                <td>O(1)</td>
                <td>O(1)</td>
              </tr>
              <tr>
                <td><code>search(x)</code></td>
                <td>Find element by value</td>
                <td>O(n)</td>
                <td>O(1)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: "1rem" }}>Pseudo-code</h3>
        <pre className="ds-code" aria-label="Stack pseudo-code">
{`init stack S = []
push(x): append x to S
pop(): if S not empty -> remove and return last element
peek(): if S not empty -> return last element
isEmpty(): return length(S) == 0`}
        </pre>
      </section>
    </div>
  );
}
