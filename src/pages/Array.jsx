import { useState } from "react";
import "./Array.css";

/**
 * 🎯 Array Data Structure Visualization Component
 *
 * Interactive visualization and learning tool for Array operations such as
 * insertion, deletion, searching, updating, and traversal.
 *
 * @component
 * @returns {JSX.Element} Array visualization and notes page
 */
export default function ArrayDS() {
  const [array, setArray] = useState([10, 20, 30, 40]);
  const [input, setInput] = useState("");
  const [index, setIndex] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [showCode, setShowCode] = useState(null);

  /**
   * ➕ Insert Operation - Add element at specific index
   */
  const insert = () => {
    const value = input.trim();
    if (!value || index === "") return;
    const newArray = [...array];
    newArray.splice(index, 0, parseInt(value));
    setArray(newArray);
    setInput("");
    setIndex("");
  };

  /**
   * ➖ Delete Operation - Remove element at specific index
   */
  const remove = () => {
    if (index === "" || index >= array.length) return;
    const newArray = [...array];
    newArray.splice(index, 1);
    setArray(newArray);
    setIndex("");
  };

  /**
   * 🔍 Search Operation - Highlight index of searched value
   */
  const search = () => {
    const value = parseInt(input);
    const foundIndex = array.indexOf(value);
    if (foundIndex !== -1) {
      setHighlightIndex(foundIndex);
      setTimeout(() => setHighlightIndex(null), 800);
    } else {
      alert("Value not found in array!");
    }
  };

  /**
   * 🔁 Update Operation - Modify value at specific index
   */
  const update = () => {
    if (index === "" || !input.trim()) return;
    const newArray = [...array];
    newArray[index] = parseInt(input);
    setArray(newArray);
    setIndex("");
    setInput("");
  };

  /**
   * 🧹 Reset array
   */
  const reset = () => {
    setArray([]);
    setHighlightIndex(null);
  };

  return (
    <div className="array-page">
      {/* 🏷️ Page Header */}
      <header className="page-header">
        <h1>Array Data Structure</h1>
        <p className="page-subtitle">
          Visualize operations like insertion, deletion, searching, and traversal
        </p>
      </header>

      {/* 🎮 Control Panel */}
      <section className="controls-panel">
        <div className="input-group">
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter value"
            className="array-input"
          />
          <input
            type="number"
            value={index}
            onChange={(e) => setIndex(e.target.value)}
            placeholder="Index"
            className="array-input"
          />
        </div>

        <div className="operation-buttons">
          <button onClick={insert} className="control-btn insert-btn">
            Insert
          </button>
          <button onClick={remove} className="control-btn delete-btn">
            Delete
          </button>
          <button onClick={search} className="control-btn search-btn">
            Search
          </button>
          <button onClick={update} className="control-btn update-btn">
            Update
          </button>
          <button onClick={reset} className="control-btn reset-btn">
            Reset
          </button>
        </div>
      </section>

      {/* 🎨 Array Visualization */}
      <section className="array-visualization">
        <div className="array-container">
          {array.length > 0 ? (
            array.map((val, i) => (
              <div
                key={i}
                className={`array-item ${
                  highlightIndex === i ? "highlight" : ""
                }`}
                title={`Index ${i}`}
              >
                <span className="item-value">{val}</span>
                <span className="item-index">[{i}]</span>
              </div>
            ))
          ) : (
            <div className="array-empty">Array is empty</div>
          )}
        </div>
      </section>

      {/* 📊 Array Info */}
      <section className="documentation-section">
        <article className="ds-info">
          <h2>About Array Data Structure</h2>
          <p>
            An <strong>Array</strong> is a linear data structure used to store
            multiple elements of the same type in contiguous memory locations.
            Each element is identified by an <strong>index</strong>.
          </p>

          <h3>Key Array Operations</h3>
          <ul className="operation-list">
            <li>
              <code>insert(x, i)</code> → Insert element <code>x</code> at index{" "}
              <code>i</code>
            </li>
            <li>
              <code>delete(i)</code> → Remove element at index <code>i</code>
            </li>
            <li>
              <code>search(x)</code> → Find index of element <code>x</code>
            </li>
            <li>
              <code>update(i, x)</code> → Change value at index <code>i</code>
            </li>
            <li>
              <code>traverse()</code> → Visit all elements in order
            </li>
          </ul>

          <h3>Time & Space Complexity</h3>
          <table className="complexity-table">
            <thead>
              <tr>
                <th>Operation</th>
                <th>Time</th>
                <th>Space</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Insert</td>
                <td>O(n)</td>
                <td>O(1)</td>
              </tr>
              <tr>
                <td>Delete</td>
                <td>O(n)</td>
                <td>O(1)</td>
              </tr>
              <tr>
                <td>Search</td>
                <td>O(n)</td>
                <td>O(1)</td>
              </tr>
              <tr>
                <td>Update</td>
                <td>O(1)</td>
                <td>O(1)</td>
              </tr>
              <tr>
                <td>Traverse</td>
                <td>O(n)</td>
                <td>O(1)</td>
              </tr>
            </tbody>
          </table>

          <h3>Types of Arrays</h3>
          <ul className="queue-types">
            <li>Single-Dimensional Array</li>
            <li>Multi-Dimensional Array</li>
            <li>Dynamic Array (Resizable)</li>
            <li>Sparse Array</li>
          </ul>

          <h3>Pseudocode</h3>
          <pre className="pseudocode">
{`initialize array A[]
insert(A, x, i): shift elements right and place x at i
delete(A, i): shift elements left from i
search(A, x): loop and compare A[i] == x
update(A, i, x): A[i] = x
traverse(A): print all A[i]`}
          </pre>

          <h3>Real-World Applications</h3>
          <ul className="applications-list">
            <li>Storing tabular data</li>
            <li>Matrix-based computations</li>
            <li>Image pixel representation</li>
            <li>Database indexing</li>
            <li>Implementation of other data structures (stack, queue)</li>
          </ul>

          <h3>Code Snippets</h3>
          <div className="code-snippets-container">
            {[
              {
                operation: "Insert",
                code: `function insert(arr, index, value) {
  arr.splice(index, 0, value);
}`,
              },
              {
                operation: "Delete",
                code: `function deleteElement(arr, index) {
  arr.splice(index, 1);
}`,
              },
              {
                operation: "Search",
                code: `function search(arr, value) {
  return arr.indexOf(value);
}`,
              },
              {
                operation: "Update",
                code: `function update(arr, index, value) {
  arr[index] = value;
}`,
              },
            ].map(({ operation, code }) => (
              <div key={operation} className="code-snippet">
                <button
                  className="code-toggle-button"
                  onClick={() =>
                    setShowCode(showCode === operation ? null : operation)
                  }
                >
                  <span className="operation-name">{operation}</span>
                  <span className="toggle-icon">
                    {showCode === operation ? "▲" : "▼"}
                  </span>
                </button>
                {showCode === operation && (
                  <div className="code-content">
                    <pre className="implementation-code">{code}</pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* 💡 Quick Tips */}
      <aside className="usage-tips">
        <h3>💡 Quick Tips</h3>
        <ul>
          <li>Use index carefully; arrays are 0-based</li>
          <li>Insertions/deletions shift elements — costly in large arrays</li>
          <li>Search sequentially unless array is sorted</li>
          <li>Use dynamic arrays for variable-sized data</li>
        </ul>
      </aside>
    </div>
  );
}
