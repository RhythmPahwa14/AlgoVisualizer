// src/components/DPVisualizer.jsx
import React, { useState, useEffect } from "react";
import "../styles/global-theme.css";

const DPVisualizer = ({ defaultAlgorithm = "Fibonacci", size = 10 }) => {
  const [algorithm, setAlgorithm] = useState(defaultAlgorithm);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [message, setMessage] = useState("Select an algorithm and run.");
  const [finalResult, setFinalResult] = useState(null);


  const copySteps = (arr) => arr.map((row) => (Array.isArray(row) ? [...row] : row));

  // ================= DP ALGORITHMS =================

  // 1️⃣ Fibonacci (Top-Down)
  const fibonacci = (n) => {
    const stepsArr = [];
    const memo = Array(n + 1).fill(-1);
    if (n >= 0) memo[0] = 0;
    if (n >= 1) memo[1] = 1;

    const fib = (k) => {
      if (k <= 1) {
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

        stepsArr.push({
          board: copySteps(dp),
          message: `dp[${i}][${j}] = ${dp[i][j]}`,
          focus: [i, j],           // highlight this cell in the UI
        });
      }
    }
    stepsArr.push({ board: copySteps(dp), message: `LCS length = ${dp[m][n]}` });
    return stepsArr;
  };



// 4️⃣ 0-1 Knapsack 
  const knapsack = (values = [60, 100, 120], weights = [10, 20, 30], W = 15) => {

    const stepsArr = [];
    const n = values.length;

    // dp[i][w] = best value using first i items and capacity w
    const dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));
    // choice[i][w] = whether we took item i at capacity w
    const choice = Array.from({ length: n + 1 }, () => Array(W + 1).fill(false));

    for (let i = 1; i <= n; i++) {
      const wt = weights[i - 1];
      const val = values[i - 1];

      for (let w = 0; w <= W; w++) {
        let take = -Infinity, skip = dp[i - 1][w];

        if (wt <= w) {
          take = val + dp[i - 1][w - wt];
        }

        if (take > skip) {
          dp[i][w] = take;
          choice[i][w] = true;
          stepsArr.push({
            board: dp.map(row => [...row]),
            message: `dp[${i}][${w}] = ${dp[i][w]} (include item ${i}: val=${val}, wt=${wt}; from dp[${i-1}][${w-wt}] + ${val} vs dp[${i-1}][${w}])`,
            focus: [i, w],
            meta: { decision: "include", item: i, wt, val, take, skip }
          });
        } else {
          dp[i][w] = skip;
          choice[i][w] = false;
          stepsArr.push({
            board: dp.map(row => [...row]),
            message: `dp[${i}][${w}] = ${dp[i][w]} (exclude item ${i}: keep dp[${i-1}][${w}] = ${skip})`,
            focus: [i, w],
            meta: { decision: "exclude", item: i, wt, val, take, skip }
          });
        }
      }
    }

    // Backtrack chosen items
    const chosen = [];
    let w = W;
    for (let i = n; i >= 1; i--) {
      if (choice[i][w]) {
        chosen.push(i - 1);        // store 0-based index of the item
        w -= weights[i - 1];
      }
    }
    chosen.reverse();

    const resultMsg =
      `Max value = ${dp[n][W]} | chosen items (1-based): [${chosen.map(x => x + 1).join(", ")}] ` +
      `| weights: [${chosen.map(x => weights[x]).join(", ")}] | values: [${chosen.map(x => values[x]).join(", ")}]`;

    stepsArr.push({
      board: dp.map(row => [...row]),
      message: resultMsg,
      focus: [n, W],
      meta: { chosen, W, values, weights }
    });

    return stepsArr;
  };


  // 5️⃣ Matrix Chain Multiplication 
  const matrixChain = (dims = [10, 30, 5, 60]) => {
    const stepsArr = [];
    const n = dims.length - 1;
    const dp = Array.from({ length: n }, () => Array(n).fill(0));
    const split = Array.from({ length: n }, () => Array(n).fill(-1));



  const buildParenthesization = (split, i, j) => {
    if (i === j) return `A${i+1}`;
    const k = split[i][j];
    return `(${buildParenthesization(split, i, k)} x ${buildParenthesization(split, k+1, j)})`;
  };


    for (let l = 2; l <= n; l++) {
      for (let i = 0; i <= n - l; i++) {
        let j = i + l - 1;
        dp[i][j] = Infinity;
        for (let k = i; k < j; k++) {
          const cost = dp[i][k] + dp[k + 1][j] + dims[i] * dims[k + 1] * dims[j + 1];
          if (cost < dp[i][j]) {
            dp[i][j] = cost;
            split[i][j] = k;
            stepsArr.push({
              board: copySteps(dp),
              message: `dp[${i}][${j}] = ${dp[i][j]} (split at k=${k})`,
              focus: [i, j],
              split: copySteps(split)
            });
          }
        }
      }
    }
    const parenthesization = buildParenthesization(split, 0, n - 1);
    stepsArr.push({ board: copySteps(dp), message: `Minimum multiplication cost = ${dp[0][n - 1]}. Optimal order: ${parenthesization}`,split: copySteps(split) });
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
    setSteps(generatedSteps);
    setCurrentStep(0);
    setIsVisualizing(true);
    setFinalResult(null);
  };

  useEffect(() => {
    if (isVisualizing && steps.length > 0) {
      if (currentStep >= steps.length) {

          setCurrentStep(steps.length - 1);

          setIsVisualizing(false);
          setMessage("Visualization complete!");
          // Persist result for Knapsack
          if (algorithm === "Knapsack") {
            const lastMsg = steps[steps.length - 1]?.message;
            setFinalResult(lastMsg || null);
          }
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
    setFinalResult(null);
  };

  // ================= Render =================
  const renderBoard = () => {
    if (!steps[currentStep]) return null;
    const stepBoard = steps[currentStep].board;
    const focusIndex = steps[currentStep]?.focusIndex;

    // 1D array visualization (Fibonacci & Coin Change)
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

    const focusCell = steps[currentStep]?.focus; // [i, j] or [i, w] if present

    return (
      <div className="board scrollable">
        {stepBoard.map((row, i) => (
          <div key={i} className="board-row">

            {row.map((cell, j) => {
              const isFocus = focusCell && focusCell[0] === i && focusCell[1] === j;
              const isActive = cell !== Infinity && cell > 0; // color only positive values
              return (
                <div
                  key={j}
                  className={`cell ${isActive ? "active" : ""} ${isFocus ? "is-focus" : ""}`}

                  title={`dp[${i}][${j}] = ${cell === Infinity ? "∞" : cell}`}
                >
                  {cell === Infinity ? "∞" : cell}
                </div>
              );
            })}
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
      {algorithm === "Knapsack" && finalResult && (
        <div className="result-box">
          <strong>Result:</strong> {finalResult}
        </div>
      )}

      {finalResult && algorithm === "MatrixChain" && (
        <div className="result-box">
          <strong>Optimal Parenthesization:</strong>{" "}
          {finalResult.split("Optimal order: ")[1]}
          <br />
          <strong>Minimum Cost:</strong>{" "}
          {finalResult.split("Optimal order: ")[0].replace("Minimum multiplication cost = ", "")}
        </div>
      )}


      <p className="message-bar">{steps[currentStep]?.message || message}</p>
    </div>
  );
};

export default DPVisualizer;
