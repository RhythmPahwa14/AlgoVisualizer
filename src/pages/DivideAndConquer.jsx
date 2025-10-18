// src/pages/DivideAndConquer.jsx
import { useState } from "react";
import "./DivideAndConquer.css";

export default function DivideAndConquerVisualizer() {
  const [array, setArray] = useState([38, 27, 43, 3, 9, 82, 10]);
  const [steps, setSteps] = useState([]);
  const [sorted, setSorted] = useState([]);

  // ⚙️ Merge Sort (Divide and Conquer)
  const mergeSort = (arr, depth = 0, path = "Root") => {
    if (arr.length <= 1) {
      setSteps((prev) => [...prev, `Level ${depth}: Base case → [${arr}] (${path})`]);
      return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    setSteps((prev) => [
      ...prev,
      `Level ${depth}: Divide → Left [${left}] | Right [${right}] (${path})`,
    ]);

    const sortedLeft = mergeSort(left, depth + 1, `${path}→L`);
    const sortedRight = mergeSort(right, depth + 1, `${path}→R`);

    const merged = merge(sortedLeft, sortedRight);
    setSteps((prev) => [
      ...prev,
      `Level ${depth}: Combine → [${sortedLeft}] + [${sortedRight}] = [${merged}] (${path})`,
    ]);

    return merged;
  };

  const merge = (left, right) => {
    let result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) result.push(left[i++]);
      else result.push(right[j++]);
    }
    return [...result, ...left.slice(i), ...right.slice(j)];
  };

  const handleRun = () => {
    setSteps([]);
    const result = mergeSort(array);
    setSorted(result);
  };

  const handleInputChange = (e) => {
    const nums = e.target.value
      .split(",")
      .map((n) => parseInt(n.trim()))
      .filter((n) => !isNaN(n));
    setArray(nums);
  };

  return (
    <div className="array-container">
      <h1>🧩 Divide and Conquer Algorithm (Merge Sort Example)</h1>
      <p className="subtitle">
        Recursively divide the array, sort the subarrays, and then combine them.
      </p>

      <div className="controls">
        <input
          type="text"
          value={array.join(", ")}
          placeholder="Enter numbers separated by commas"
          onChange={handleInputChange}
        />
        <button onClick={handleRun}>Run Merge Sort</button>
      </div>

      {/* 🧮 Array Visualization */}
      <div className="array-boxes">
        {sorted.length > 0
          ? sorted.map((num, i) => (
              <div key={i} className="array-box highlight">
                <span>{num}</span>
              </div>
            ))
          : array.map((num, i) => (
              <div key={i} className="array-box">
                <span>{num}</span>
              </div>
            ))}
      </div>

      {/* 📜 Steps */}
      <div className="steps">
        <h2>🪜 Execution Steps</h2>
        <ul>
          {steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>
      </div>

      <div className="info">
        <h2>🧠 About Divide and Conquer</h2>
        <p className="text-green-600">
          Divide and Conquer is a problem-solving technique where a problem is broken down
          into smaller subproblems (Divide), solved independently (Conquer), and then
          combined to get the final solution (Combine).
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
            <tr><td>Best</td><td>O(n log n)</td></tr>
            <tr><td>Average</td><td>O(n log n)</td></tr>
            <tr><td>Worst</td><td>O(n log n)</td></tr>
          </tbody>
        </table>

        <h3>💾 Space Complexity</h3>
        <p className="text-red-500">O(n) — due to recursive stack and temporary arrays used in merging.</p>
      </div>
    </div>
  );
}
