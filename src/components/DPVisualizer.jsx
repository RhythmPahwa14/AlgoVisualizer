// src/components/DPVisualizer.jsx
import React, { useState, useEffect } from "react";
import "../styles/global-theme.css";

const DPVisualizer = ({
  defaultAlgorithm = "Fibonacci",
  autoLoadExample = false,
  size = 10
}) => {
  const [algorithm, setAlgorithm] = useState(defaultAlgorithm);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [message, setMessage] = useState("Select an algorithm and run.");

  const copySteps = (arr) => arr.map((row) => Array.isArray(row) ? [...row] : row);

  // ================= DP Algorithms =================

  // 1️⃣ Fibonacci (Top-Down)
  const fibonacci = (n) => {
    const stepsArr = [];
    const memo = Array(n + 1).fill(-1);
    // Correct bases so UI never shows -1 leading entries
    if (n >= 0) memo[0] = 0;
    if (n >= 1) memo[1] = 1; // switch to 1 if you want the 1,1,2,3… variant

     const fib = (k) => {
      if (k <= 1) {
        // show base usage
        stepsArr.push({ board: copySteps(memo), message: `Base: fib(${k}) = ${memo[k]}`, focusIndex: k });
        return memo[k];
      }
       if (memo[k] !== -1) return memo[k];
      stepsArr.push({ board: copySteps(memo), message: `Computing fib(${k})`, focusIndex: k });
       memo[k] = fib(k - 1) + fib(k - 2);
      stepsArr.push({ board: copySteps(memo), message: `fib(${k}) = ${memo[k]}`, focusIndex: k });
       return memo[k];
     };

    fib(n);
    return stepsArr;
  };

  // 2️⃣ Coin Change (Minimum Coins)
  const coinChange = (coins = [1, 2, 5], target = 11) => {
    const stepsArr = [];
    const dp = Array(target + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i <= target; i++) {
      for (let coin of coins) {
        if (i - coin >= 0 && dp[i - coin] + 1 < dp[i]) {
          dp[i] = dp[i - coin] + 1;
          stepsArr.push({ board: copySteps(dp), message: `dp[${i}] updated to ${dp[i]} using coin ${coin}` });
        }
      }
    }
    stepsArr.push({ board: copySteps(dp), message: `Minimum coins for ${target} = ${dp[target]}` });
    return stepsArr;
  };

  // 3️⃣ Longest Common Subsequence (LCS)
  const lcs = (str1 = "ABCBDAB", str2 = "BDCAB") => {
    const stepsArr = [];
    const m = str1.length, n = str2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
        else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        stepsArr.push({ board: copySteps(dp), message: `dp[${i}][${j}] = ${dp[i][j]}` });
      }
    }
    stepsArr.push({ board: copySteps(dp), message: `LCS length = ${dp[m][n]}` });
    return stepsArr;
  };

  // 4️⃣ 0-1 Knapsack
  const knapsack = (values = [60, 100, 120], weights = [10, 20, 30], W = 50) => {
    const stepsArr = [];
    const n = values.length;
    const dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));

    for (let i = 1; i <= n; i++) {
      for (let w = 1; w <= W; w++) {
        if (weights[i - 1] <= w)
          dp[i][w] = Math.max(dp[i - 1][w], values[i - 1] + dp[i - 1][w - weights[i - 1]]);
        else dp[i][w] = dp[i - 1][w];
        stepsArr.push({ board: copySteps(dp), message: `dp[${i}][${w}] = ${dp[i][w]}` });
      }
    }
    stepsArr.push({ board: copySteps(dp), message: `Max value = ${dp[n][W]}` });
    return stepsArr;
  };

  // 5️⃣ Matrix Chain Multiplication
  const matrixChain = (dims = [10, 30, 5, 60]) => {
    const stepsArr = [];
    const n = dims.length - 1;
    const dp = Array.from({ length: n }, () => Array(n).fill(0));

    for (let l = 2; l <= n; l++) {
      for (let i = 0; i <= n - l; i++) {
        let j = i + l - 1;
        dp[i][j] = Infinity;
        for (let k = i; k < j; k++) {
          const cost = dp[i][k] + dp[k + 1][j] + dims[i] * dims[k + 1] * dims[j + 1];
          if (cost < dp[i][j]) {
            dp[i][j] = cost;
            stepsArr.push({ board: copySteps(dp), message: `dp[${i}][${j}] updated to ${dp[i][j]} (split at ${k})` });
          }
        }
      }
    }
    stepsArr.push({ board: copySteps(dp), message: `Minimum multiplication cost = ${dp[0][n - 1]}` });
    return stepsArr;
  };

  // ================= Animation =================
  const runAlgorithm = () => {
    let generatedSteps = [];
    switch (algorithm) {
      case "Fibonacci":
        generatedSteps = fibonacci(size);
        break;
      case "CoinChange":
        generatedSteps = coinChange();
        break;
      case "LCS":
        generatedSteps = lcs();
        break;
      case "Knapsack":
        generatedSteps = knapsack();
        break;
      case "MatrixChain":
        generatedSteps = matrixChain();
        break;
      default:
        setMessage("Algorithm not implemented!");
        return;
    }
    if (generatedSteps.length === 0) {
      setMessage("No steps generated. Check input.");
      return;
    }
    setSteps(generatedSteps);
    setCurrentStep(0);
    setIsVisualizing(true);
  };

  useEffect(() => {
    if (isVisualizing && steps.length > 0) {
      if (currentStep >= steps.length) {
        setIsVisualizing(false);
        setMessage("Visualization complete!");
        return;
      }
      const timer = setTimeout(() => setCurrentStep((prev) => prev + 1), 400);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isVisualizing, steps]);

  // ================= Controls =================
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const resetVisualizer = () => {
    setSteps([]);
    setCurrentStep(0);
    setIsVisualizing(false);
    setMessage("Select an algorithm and run.");
  };

   // ================= Render =================
   const renderBoard = () => {
     if (!steps[currentStep]) return null;
    const stepBoard = steps[currentStep].board;
    const focusIndex = steps[currentStep].focusIndex;

     // Array of numbers
     if (Array.isArray(stepBoard) && !Array.isArray(stepBoard[0])) {
       return (
        <div className="list-visualizer dp-seq">
           {stepBoard.map((num, i) => (
            <span
              key={i}
              className={`list-item dp-cell ${i === focusIndex ? "is-active" : ""}`}
              title={i === focusIndex ? "Current step" : undefined}
            >
              <span className="dp-cell-index">{i}</span>
              <span className="dp-cell-value">{num === Infinity ? "∞" : num}</span>
            </span>
           ))}
         </div>
       );
     }


    return (
      <div className="board">
        {stepBoard.map((row, i) => (
          <div key={i} className="board-row">
            {row.map((cell, j) => (
              <div key={j} className={`cell ${cell !== 0 ? "active" : ""}`}>
                {cell !== 0 && cell !== Infinity ? cell : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="dp-visualizer">
      <h2>Dynamic Programming Visualizer</h2>
      <div className="controls">
        <label>Algorithm:</label>
        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} disabled={isVisualizing}>
          <option value="Fibonacci">Fibonacci</option>
          <option value="CoinChange">Coin Change</option>
          <option value="LCS">Longest Common Subsequence</option>
          <option value="Knapsack">0-1 Knapsack</option>
          <option value="MatrixChain">Matrix Chain Multiplication</option>
        </select>
        <button onClick={runAlgorithm} disabled={isVisualizing}>Run</button>
        <button onClick={prevStep} disabled={isVisualizing || currentStep === 0}>Prev</button>
        <button onClick={nextStep} disabled={isVisualizing || currentStep === steps.length - 1}>Next</button>
        <button onClick={resetVisualizer} disabled={isVisualizing}>Reset</button>
      </div>

      {renderBoard()}

      <p className="message-bar">{steps[currentStep]?.message || message}</p>
    </div>
  );
};

export default DPVisualizer;
