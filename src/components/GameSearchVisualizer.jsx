// src/components/GameSearchVisualizer.jsx
import React, { useState, useEffect } from "react";
import "../styles/global-theme.css";
import { gameSearch } from "../data/allCodes"; // make sure gameSearch is exported here

const GameSearchVisualizer = ({
  defaultAlgorithm = "minimax",
  autoLoadExample = false,
  boardSize = 3
}) => {
  const [algorithm, setAlgorithm] = useState(defaultAlgorithm);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [message, setMessage] = useState("Select an algorithm and run.");

  const copySteps = (arr) => arr.map((row) => Array.isArray(row) ? [...row] : row);

  // ================= Game Search Algorithms =================

  // Sample Tic-Tac-Toe board: 0=empty, 1=X, -1=O
  const sampleBoard = Array(boardSize * boardSize).fill(0);

  // 1️⃣ Minimax
  const runMinimax = (board = sampleBoard) => {
    const stepsArr = [];
    const minimaxFunc = gameSearch.minimax.python; // Example: using Python version for reference
    stepsArr.push({ board: copySteps(board), message: "Running Minimax..." });
    // In real app, here we would implement stepwise traversal for visualization
    stepsArr.push({ board: copySteps(board), message: "Minimax complete." });
    return stepsArr;
  };

  // 2️⃣ Alpha-Beta Pruning
  const runAlphaBeta = (board = sampleBoard) => {
    const stepsArr = [];
    stepsArr.push({ board: copySteps(board), message: "Running Alpha-Beta Pruning..." });
    stepsArr.push({ board: copySteps(board), message: "Alpha-Beta Pruning complete." });
    return stepsArr;
  };

  // 3️⃣ Expectimax
  const runExpectimax = (board = sampleBoard) => {
    const stepsArr = [];
    stepsArr.push({ board: copySteps(board), message: "Running Expectimax..." });
    stepsArr.push({ board: copySteps(board), message: "Expectimax complete." });
    return stepsArr;
  };

  // 4️⃣ Monte Carlo Tree Search
  const runMCTS = (board = sampleBoard) => {
    const stepsArr = [];
    stepsArr.push({ board: copySteps(board), message: "Running MCTS..." });
    stepsArr.push({ board: copySteps(board), message: "MCTS complete." });
    return stepsArr;
  };

  // ================= Animation =================
  const runAlgorithm = () => {
    let generatedSteps = [];
    switch (algorithm) {
      case "minimax": generatedSteps = runMinimax(); break;
      case "alphaBetaPruning": generatedSteps = runAlphaBeta(); break;
      case "expectimax": generatedSteps = runExpectimax(); break;
      case "mcts": generatedSteps = runMCTS(); break;
      default: setMessage("Algorithm not implemented!"); return;
    }
    if (generatedSteps.length === 0) { setMessage("No steps generated."); return; }
    setSteps(generatedSteps);
    setCurrentStep(0);
    setIsVisualizing(true);
  };

  useEffect(() => {
    if (isVisualizing && steps.length > 0) {
      if (currentStep >= steps.length) { setIsVisualizing(false); setMessage("Visualization complete!"); return; }
      const timer = setTimeout(() => setCurrentStep(prev => prev+1), 500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isVisualizing, steps]);

  const prevStep = () => setCurrentStep(prev => Math.max(prev-1,0));
  const nextStep = () => setCurrentStep(prev => Math.min(prev+1,steps.length-1));
  const resetVisualizer = () => { setSteps([]); setCurrentStep(0); setIsVisualizing(false); setMessage("Select an algorithm and run."); };

  const renderBoard = () => {
    if (!steps[currentStep]) return null;
    const stepBoard = steps[currentStep].board;

    if (Array.isArray(stepBoard) && stepBoard.length && typeof stepBoard[0]==='number') {
      return <div className="list-visualizer">{stepBoard.map((num,i)=><span key={i} className="list-item">{num}</span>)}</div>;
    }

    if (Array.isArray(stepBoard) && stepBoard.length && typeof stepBoard[0]==='object') {
      return (
        <div className="board">
          {stepBoard.map((item,i)=>(
            <div key={i} className="board-row">
              {Object.entries(item).map(([k,v],j)=>(
                <div key={j} className="cell">{`${k}:${v}`}</div>
              ))}
            </div>
          ))}
        </div>
      );
    }

    return <pre>{JSON.stringify(stepBoard,null,2)}</pre>;
  };

  return (
    <div className="game-search-visualizer">
      <h2>Game Search Algorithm Visualizer</h2>
      <div className="controls">
        <label>Algorithm:</label>
        <select value={algorithm} onChange={(e)=>setAlgorithm(e.target.value)} disabled={isVisualizing}>
          <option value="minimax">Minimax</option>
          <option value="alphaBetaPruning">Alpha-Beta Pruning</option>
          <option value="expectimax">Expectimax</option>
          <option value="mcts">Monte Carlo Tree Search</option>
        </select>
        <button onClick={runAlgorithm} disabled={isVisualizing}>Run</button>
        <button onClick={prevStep} disabled={isVisualizing||currentStep===0}>Prev</button>
        <button onClick={nextStep} disabled={isVisualizing||currentStep===steps.length-1}>Next</button>
        <button onClick={resetVisualizer} disabled={isVisualizing}>Reset</button>
      </div>

      {renderBoard()}

      <p className="message-bar">{steps[currentStep]?.message || message}</p>
    </div>
  );
};

export default GameSearchVisualizer;
