// src/pages/KMP.jsx
import { useState } from "react";
import "./KMP.css"; // reuse styles if you want same layout

export default function KMPVisualizer() {
  const [text, setText] = useState("ABABDABACDABABCABAB");
  const [pattern, setPattern] = useState("ABABCABAB");
  const [matches, setMatches] = useState([]);

  // 🔍 KMP Algorithm Implementation
  const computeLPS = (pat) => {
    const lps = Array(pat.length).fill(0);
    let len = 0;
    for (let i = 1; i < pat.length; ) {
      if (pat[i] === pat[len]) {
        len++;
        lps[i] = len;
        i++;
      } else if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
    return lps;
  };

  const handleKMP = () => {
    const lps = computeLPS(pattern);
    const found = [];
    let i = 0, j = 0;

    while (i < text.length) {
      if (pattern[j] === text[i]) {
        i++;
        j++;
      }
      if (j === pattern.length) {
        found.push(i - j);
        j = lps[j - 1];
      } else if (i < text.length && pattern[j] !== text[i]) {
        if (j !== 0) j = lps[j - 1];
        else i++;
      }
    }
    setMatches(found);
  };

  return (
    <div className="array-container">
      <h1>🔍 KMP String Matching Algorithm</h1>
      <p className="subtitle">
        Efficient substring search using prefix-suffix preprocessing.
      </p>

      <div className="controls">
        <input
          type="text"
          placeholder="Enter Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Pattern"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
        />
        <button onClick={handleKMP}>Find Pattern</button>
      </div>

      {/* Visualization */}
      <div className="array-boxes">
        {text.split("").map((char, i) => (
          <div
            key={i}
            className={`array-box ${
              matches.includes(i) ? "highlight" : ""
            }`}
          >
            <span>{char}</span>
            <small>{i}</small>
          </div>
        ))}
      </div>

      <div className="info">
        <h2>🧠 About KMP Algorithm</h2>
        <p className="text-red-500">
          The <b>KMP (Knuth–Morris–Pratt)</b> algorithm improves naive string search
          by avoiding redundant character checks using a preprocessed LPS array.
        </p>

        <h3>⏱️ Time Complexity</h3>
        <table>
          <thead>
            <tr>
              <th>Case</th>
              <th>Complexity</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Best</td><td>O(n + m)</td></tr>
            <tr><td>Average</td><td>O(n + m)</td></tr>
            <tr><td>Worst</td><td>O(n + m)</td></tr>
          </tbody>
        </table>

        <h3>💾 Space Complexity</h3>
        <p>O(m) — for storing the LPS (Longest Prefix Suffix) array.</p>
      </div>
    </div>
  );
}
