import React, { useState, useEffect } from "react";
import "../styles/global-theme.css";

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
  const [speedMs, setSpeedMs] = useState(500); // playback speed
  const totalSteps = steps.length;
  const progress = totalSteps > 1 ? Math.round((currentStep / (totalSteps - 1)) * 100) : 0;

  // keep algorithm in sync if parent changes defaultAlgorithm
  useEffect(() => { setAlgorithm(defaultAlgorithm); }, [defaultAlgorithm]);

  const copySteps = (arr) => arr.map((row) => Array.isArray(row) ? [...row] : row);

  // ================= Game Search Algorithms =================
  const sampleBoard = Array(boardSize * boardSize).fill(0);

  // auto-run on mount / when props change
  useEffect(() => {
    if (autoLoadExample) runAlgorithm();
  }, [autoLoadExample, boardSize, algorithm]);

  // ---------------- Minimax ----------------
  const runMinimax = (board = sampleBoard) => {
    const stepsArr = [];
    const size = boardSize;
    const lines = [];
    for (let r = 0; r < size; r++) lines.push([...Array(size)].map((_, c) => r * size + c));
    for (let c = 0; c < size; c++) lines.push([...Array(size)].map((_, r) => r * size + c));
    lines.push([...Array(size)].map((_, i) => i * size + i));
    lines.push([...Array(size)].map((_, i) => (i + 1) * size - (i + 1)));

    const winner = (b) => {
      for (const line of lines) {
        const sum = line.reduce((acc, idx) => acc + b[idx], 0);
        if (sum === size) return 1;
        if (sum === -size) return -1;
      }
      return 0;
    };

    const evalBoard = (b) => {
      const w = winner(b);
      if (w !== 0) return w * 10;
      let score = 0;
      for (const line of lines) {
        const vals = line.map(i => b[i]);
        if (!vals.includes(-1)) score += 1;
        if (!vals.includes(1))  score -= 1;
      }
      return score;
    };

    const empties = (b) => b.reduce((acc, v, i) => (v === 0 ? (acc.push(i), acc) : acc), []);
    const clone = (b) => [...b];

    stepsArr.push({ board: copySteps(board), message: "Running Minimax..." });

    const minimax = (b, maximizing, depth = 0) => {
      const w = winner(b);
      const empty = empties(b);

      if (w !== 0 || empty.length === 0 || depth > 6) {
        const val = evalBoard(b);
        stepsArr.push({ board: copySteps(b), message: `Depth ${depth}: leaf score = ${val}` });
        return val;
      }

      if (maximizing) {
        let best = -Infinity;
        for (const idx of empty) {
          const nb = clone(b);
          nb[idx] = 1;
          stepsArr.push({ board: copySteps(nb), message: `Try X at ${idx} (depth ${depth})` });
          const val = minimax(nb, false, depth + 1);
          best = Math.max(best, val);
          stepsArr.push({ board: copySteps(nb), message: `Backtrack X at ${idx} → score ${val}` });
        }
        return best;
      } else {
        let best = Infinity;
        for (const idx of empty) {
          const nb = clone(b);
          nb[idx] = -1;
          stepsArr.push({ board: copySteps(nb), message: `Try O at ${idx} (depth ${depth})` });
          const val = minimax(nb, true, depth + 1);
          best = Math.min(best, val);
          stepsArr.push({ board: copySteps(nb), message: `Backtrack O at ${idx} → score ${val}` });
        }
        return best;
      }
    };

    minimax(board, true, 0);
    stepsArr.push({ board: copySteps(board), message: "Minimax complete." });
    return stepsArr;
  };

  // ---------------- Alpha-Beta Pruning ----------------
  const runAlphaBeta = (board = sampleBoard) => {
    const stepsArr = [];
    const size = boardSize;
    const lines = [];
    for (let r = 0; r < size; r++) lines.push([...Array(size)].map((_, c) => r * size + c));
    for (let c = 0; c < size; c++) lines.push([...Array(size)].map((_, r) => r * size + c));
    lines.push([...Array(size)].map((_, i) => i * size + i));
    lines.push([...Array(size)].map((_, i) => (i + 1) * size - (i + 1)));

    const winner = (b) => {
      for (const line of lines) {
        const sum = line.reduce((acc, idx) => acc + b[idx], 0);
        if (sum === size) return 1;
        if (sum === -size) return -1;
      }
      return 0;
    };

    const evalBoard = (b) => {
      const w = winner(b);
      if (w !== 0) return w * 10;
      let score = 0;
      for (const line of lines) {
        const vals = line.map(i => b[i]);
        if (!vals.includes(-1)) score += 1;
        if (!vals.includes(1))  score -= 1;
      }
      return score;
    };

    const empties = (b) => b.reduce((acc, v, i) => (v === 0 ? (acc.push(i), acc) : acc), []);
    const clone = (b) => [...b];
    const stepsPush = (b, message, meta = {}) => stepsArr.push({ board: copySteps(b), message, meta });
    const fmt = (v) => (v === Infinity ? "+∞" : v === -Infinity ? "−∞" : v);

    stepsPush(board, "Running Alpha-Beta Pruning...", { alpha: -Infinity, beta: Infinity, depth: 0 });

    const alphabeta = (b, depth, alpha, beta, maximizing) => {
      const w = winner(b);
      const moves = empties(b);
      if (w !== 0 || moves.length === 0 || depth > 6) {
        const val = evalBoard(b);
        stepsPush(b, `Depth ${depth}: leaf score = ${val}`, { alpha, beta, depth, leaf: true });
        return val;
      }

      if (maximizing) {
        let value = -Infinity;
        for (let i = 0; i < moves.length; i++) {
          const idx = moves[i];
          const nb = clone(b);
          nb[idx] = 1;
          stepsPush(nb, `Try X at ${idx} (α=${fmt(alpha)}, β=${fmt(beta)}, d=${depth})`, { alpha, beta, depth, move: idx, player: 'X' });
          const child = alphabeta(nb, depth + 1, alpha, beta, false);
          value = Math.max(value, child);
          alpha = Math.max(alpha, value);
          stepsPush(nb, `Backtrack X at ${idx} → ${child} (α=${fmt(alpha)}, β=${fmt(beta)})`, { alpha, beta, depth, backtrack: true });
          if (beta <= alpha) {
            stepsPush(nb, `Prune remaining ${moves.length - i - 1} branches (β ≤ α)`, { alpha, beta, depth, pruned: true });
            break;
          }
        }
        return value;
      } else {
        let value = Infinity;
        for (let i = 0; i < moves.length; i++) {
          const idx = moves[i];
          const nb = clone(b);
          nb[idx] = -1;
          stepsPush(nb, `Try O at ${idx} (α=${fmt(alpha)}, β=${fmt(beta)}, d=${depth})`, { alpha, beta, depth, move: idx, player: 'O' });
          const child = alphabeta(nb, depth + 1, alpha, beta, true);
          value = Math.min(value, child);
          beta = Math.min(beta, value);
          stepsPush(nb, `Backtrack O at ${idx} → ${child} (α=${fmt(alpha)}, β=${fmt(beta)})`, { alpha, beta, depth, backtrack: true });
          if (beta <= alpha) {
            stepsPush(nb, `Prune remaining ${moves.length - i - 1} branches (β ≤ α)`, { alpha, beta, depth, pruned: true });
            break;
          }
        }
        return value;
      }
    };

    alphabeta(board, 0, -Infinity, Infinity, true);
    stepsPush(board, "Alpha-Beta Pruning complete.", { done: true });
    return stepsArr;
  };

  // ---------------- Visualization Animation ----------------
  useEffect(() => {
    if (!isVisualizing || steps.length === 0) return;
    if (currentStep >= steps.length - 1) {
      setIsVisualizing(false);
      setMessage("Visualization complete!");
      return;
    }
    const timer = setTimeout(() => setCurrentStep(prev => prev + 1), speedMs);
    return () => clearTimeout(timer);
  }, [currentStep, isVisualizing, steps, speedMs]);

  const prevStep = () => setCurrentStep(prev => Math.max(prev-1,0));
  const nextStep = () => setCurrentStep(prev => Math.min(prev+1,steps.length-1));
  const resetVisualizer = () => { setSteps([]); setCurrentStep(0); setIsVisualizing(false); setMessage("Select an algorithm and run."); };
  const togglePlayPause = () => { if (!steps.length) return; setIsVisualizing(v => !v); };

  const getChangedIndex = () => {
    if (currentStep === 0 || !steps[currentStep] || !steps[currentStep-1]) return -1;
    const a = steps[currentStep-1].board || [];
    const b = steps[currentStep].board || [];
    for (let i = 0; i < Math.max(a.length, b.length); i++) if (a[i] !== b[i]) return i;
    return -1;
  };
  const changedIndex = getChangedIndex();
  const meta = steps[currentStep]?.meta;

  const renderBoard = () => {
    if (!steps[currentStep]) return null;
    const stepBoard = steps[currentStep].board;
    if (Array.isArray(stepBoard) && stepBoard.length && typeof stepBoard[0] === 'number') {
      const symbol = (v) => v === 1 ? "X" : v === -1 ? "O" : "";
      return (
        <div className="ttt-grid" style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}>
          {stepBoard.map((v, i) => (
            <div key={i} className={`ttt-cell ${i === changedIndex ? "cell-changed" : ""} ${v === 1 ? "cell-x" : v === -1 ? "cell-o" : ""}`}>
              {symbol(v)}
            </div>
          ))}
        </div>
      );
    }
    return <pre>{JSON.stringify(stepBoard,null,2)}</pre>;
  };

  const runAlgorithm = () => {
    let generatedSteps = [];
    switch (algorithm) {
      case "minimax": generatedSteps = runMinimax(); break;
      case "alphaBetaPruning": generatedSteps = runAlphaBeta(); break;
      default: setMessage("Algorithm not implemented!"); return;
    }
    setSteps(generatedSteps);
    setCurrentStep(0);
    setIsVisualizing(true);
  };

  return (
    <div className="game-search-visualizer">
      <h2>Game Search Algorithm Visualizer</h2>
      <div className="controls">
        <label>Algorithm:</label>
        <select value={algorithm} onChange={(e)=>setAlgorithm(e.target.value)} disabled={isVisualizing}>
          <option value="minimax">Minimax</option>
          <option value="alphaBetaPruning">Alpha-Beta Pruning</option>
        </select>
        <button className="btn-primary" onClick={runAlgorithm} disabled={isVisualizing}>Run</button>
        <button onClick={togglePlayPause} disabled={!steps.length}>{isVisualizing ? "Pause" : "Play"}</button>
        <button onClick={prevStep} disabled={currentStep===0}>Prev</button>
        <button onClick={nextStep} disabled={currentStep===steps.length-1}>Next</button>
        <button onClick={resetVisualizer} disabled={isVisualizing}>Reset</button>
      </div>

      <div className="controls secondary">
        <label htmlFor="speed">Speed:</label>
        <input id="speed" type="range" min="100" max="1500" step="50" value={speedMs} onChange={(e)=>setSpeedMs(Number(e.target.value))} title={`${speedMs} ms`} />
        <span className="muted">{speedMs} ms</span>
        <span className="muted">Step {totalSteps ? currentStep + 1 : 0} / {totalSteps || 0}</span>
      </div>

      <div className="progressbar">
        <div className="progress" style={{ width: `${progress}%` }} />
      </div>

      {meta && (
        <div className="ab-hud">
          {meta.alpha !== undefined && <span>α: <strong>{meta.alpha}</strong></span>}
          {meta.beta !== undefined && <span>β: <strong>{meta.beta}</strong></span>}
          {meta.depth !== undefined && <span>depth: <strong>{meta.depth}</strong></span>}
          {meta.pruned && <span className="tag-pruned">PRUNE</span>}
        </div>
      )}

      {renderBoard()}
      <p className="message-bar">{steps[currentStep]?.message || message}</p>
    </div>
  );
};

export default GameSearchVisualizer;
