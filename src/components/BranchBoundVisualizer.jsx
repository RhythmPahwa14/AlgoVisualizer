// src/components/BranchBoundVisualizer.jsx
import React, { useState, useEffect } from "react";
import "../styles/global-theme.css";

const BranchBoundVisualizer = ({ defaultAlgorithm = "TSP" }) => {
  const [algorithm, setAlgorithm] = useState(defaultAlgorithm);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [message, setMessage] = useState("Select Branch & Bound algorithm and run.");

  const copySteps = (arr) => arr.map((row) => Array.isArray(row) ? [...row] : row);

  // ================= Branch & Bound Algorithms =================

  // 1️⃣ TSP (Traveling Salesman Problem) - Branch & Bound
  const tspBB = () => {
    const stepsArr = [];
    const cities = ["A", "B", "C", "D"];
    const costMatrix = [
      [0, 10, 15, 20],
      [10, 0, 35, 25],
      [15, 35, 0, 30],
      [20, 25, 30, 0],
    ];

    // Example simplified states
    stepsArr.push({ board: copySteps(costMatrix), message: "Initial cost matrix" });
    stepsArr.push({ board: copySteps(costMatrix), message: "Branch at City A → B" });
    stepsArr.push({ board: copySteps(costMatrix), message: "Bound cost = 10, exploring further…" });
    stepsArr.push({ board: copySteps(costMatrix), message: "Found optimal path A-B-D-C-A with cost 80" });

    return stepsArr;
  };

  // 2️⃣ 0/1 Knapsack (Branch & Bound)
  const knapsackBB = () => {
    const stepsArr = [];
    const items = [
      { w: 2, v: 40 },
      { w: 3, v: 50 },
      { w: 4, v: 70 },
    ];
    const capacity = 5;

    stepsArr.push({ board: items, message: "Start with empty knapsack, capacity 5" });
    stepsArr.push({ board: items, message: "Branch: Include item1 → remaining capacity 3, value 40" });
    stepsArr.push({ board: items, message: "Branch: Exclude item1 → capacity 5, value 0" });
    stepsArr.push({ board: items, message: "Optimal solution = value 90 (item1+item2)" });

    return stepsArr;
  };

  // ================= Animation =================
  const runAlgorithm = () => {
    let generatedSteps = [];
    switch (algorithm) {
      case "TSP":
        generatedSteps = tspBB();
        break;
      case "Knapsack":
        generatedSteps = knapsackBB();
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
      const timer = setTimeout(() => setCurrentStep((prev) => prev + 1), 900);
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
    setMessage("Select Branch & Bound algorithm and run.");
  };

  // ================= Render =================
  const renderBoard = () => {
    if (!steps[currentStep]) return null;
    const stepBoard = steps[currentStep].board;

    // Matrix view (TSP cost matrix)
    if (Array.isArray(stepBoard) && Array.isArray(stepBoard[0])) {
      return (
        <div className="board">
          {stepBoard.map((row, i) => (
            <div key={i} className="board-row">
              {row.map((val, j) => (
                <div key={j} className="cell">{val}</div>
              ))}
            </div>
          ))}
        </div>
      );
    }

    // List view (items for Knapsack)
    if (Array.isArray(stepBoard) && stepBoard[0]?.w !== undefined) {
      return (
        <div className="list-visualizer">
          {stepBoard.map((item, i) => (
            <span key={i} className="list-item">
              (w:{item.w}, v:{item.v})
            </span>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bb-visualizer">
      <h2>Branch & Bound Visualizer</h2>
      <div className="controls">
        <label>Algorithm:</label>
        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} disabled={isVisualizing}>
          <option value="TSP">TSP (Branch & Bound)</option>
          <option value="Knapsack">0/1 Knapsack (Branch & Bound)</option>
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

export default BranchBoundVisualizer;
