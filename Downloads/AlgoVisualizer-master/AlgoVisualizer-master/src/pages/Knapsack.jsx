// src/pages/Knapsack.jsx
import { useState } from "react";
import "./Knapsack.css";

export default function KnapsackVisualizer() {
  const [weights, setWeights] = useState([2, 3, 4, 5]);
  const [values, setValues] = useState([3, 4, 5, 6]);
  const [capacity, setCapacity] = useState(5);
  const [maxValue, setMaxValue] = useState(null);
  const [steps, setSteps] = useState([]);

  // 🧮 0/1 Knapsack using recursion + memoization (Divide & Conquer + DP)
  const knapsack = (w, v, cap, n, memo, depth = 0) => {
    const key = `${n}-${cap}`;
    if (n === 0 || cap === 0) {
      setSteps((prev) => [
        ...prev,
        `Depth ${depth}: Base case reached (n=${n}, cap=${cap}) → return 0`,
      ]);
      return 0;
    }

    if (memo[key] !== undefined) return memo[key];

    if (w[n - 1] > cap) {
      setSteps((prev) => [
        ...prev,
        `Depth ${depth}: Item ${n} (weight=${w[n - 1]}) too heavy → skip`,
      ]);
      return (memo[key] = knapsack(w, v, cap, n - 1, memo, depth + 1));
    } else {
      setSteps((prev) => [
        ...prev,
        `Depth ${depth}: Considering item ${n} (weight=${w[n - 1]}, value=${v[n - 1]})`,
      ]);
      const include =
        v[n - 1] + knapsack(w, v, cap - w[n - 1], n - 1, memo, depth + 1);
      const exclude = knapsack(w, v, cap, n - 1, memo, depth + 1);

      const result = Math.max(include, exclude);
      setSteps((prev) => [
        ...prev,
        `Depth ${depth}: Max(include=${include}, exclude=${exclude}) = ${result}`,
      ]);
      return (memo[key] = result);
    }
  };

  const handleRun = () => {
    setSteps([]);
    const memo = {};
    const result = knapsack(weights, values, capacity, weights.length, memo);
    setMaxValue(result);
  };

  // 🧩 Handle input changes
  const handleWeights = (e) => {
    const arr = e.target.value
      .split(",")
      .map((x) => parseInt(x.trim()))
      .filter((x) => !isNaN(x));
    setWeights(arr);
  };

  const handleValues = (e) => {
    const arr = e.target.value
      .split(",")
      .map((x) => parseInt(x.trim()))
      .filter((x) => !isNaN(x));
    setValues(arr);
  };

  return (
    <div className="array-container">
      <h1>🎒 0/1 Knapsack Problem Visualizer</h1>
      <p className="subtitle">
        Solve using Divide and Conquer + Dynamic Programming (Memoization)
      </p>

      <div className="controls">
        <input
          type="text"
          value={weights.join(", ")}
          onChange={handleWeights}
          placeholder="Enter weights (e.g. 2, 3, 4, 5)"
        />
        <input
          type="text"
          value={values.join(", ")}
          onChange={handleValues}
          placeholder="Enter values (e.g. 3, 4, 5, 6)"
        />
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(parseInt(e.target.value))}
          placeholder="Capacity"
        />
        <button onClick={handleRun}>Run Knapsack</button>
      </div>

      {/* 🎯 Visualization */}
      <div className="knapsack-table">
        <h2>🧩 Items</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Weight</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {weights.map((w, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{w}</td>
                <td>{values[i]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {maxValue !== null && (
        <div className="result">
          <h2>✅ Maximum Value: {maxValue}</h2>
        </div>
      )}

      {/* 🪜 Steps */}
      <div className="steps">
        <h2>📜 Execution Steps</h2>
        <ul>
          {steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      <div className="info">
        <h2>🧠 About 0/1 Knapsack</h2>
        <p className="text-blue-600">
          The 0/1 Knapsack problem chooses items with maximum total value without
          exceeding the capacity. Each item can either be taken (1) or not (0).
        </p>

        <h3>⚙️ Approach</h3>
        <ul className="text-blue-500">
          <li>Divide: Choose whether to include or exclude each item.</li>
          <li>Conquer: Solve subproblems recursively.</li>
          <li>Combine: Take the maximum of both choices.</li>
        </ul>

        <h3>⏱️ Time Complexity</h3>
        <table>
          <thead>
            <tr>
              <th>Case</th>
              <th>Complexity</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Recursive (no memo)</td><td>O(2ⁿ)</td></tr>
            <tr><td>With Memoization / DP</td><td>O(n × W)</td></tr>
          </tbody>
        </table>

        <h3>💾 Space Complexity</h3>
        <p className="text-red-500">O(n × W) — due to DP table or memoization cache.</p>
      </div>
    </div>
  );
}
