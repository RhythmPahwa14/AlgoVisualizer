// src/components/AlgorithmComparison.jsx
import React, { useEffect, useMemo, useState } from "react";
import algorithmsData from "../algorithms/algorithms.json";
import AlgorithmVisualizer from "./AlgorithmVisualizer";
import "../styles/global-theme.css";

/* ----------------------------- utilities ------------------------------ */
const clamp = (n, lo, hi) => Math.min(Math.max(n, lo), hi);
const parseArray = (text) =>
  text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map(Number)
    .filter((n) => Number.isFinite(n));

function Legend({ color, label }) {
  return (
    <span className="legend-item">
      <span
        className="legend-color"
        style={{ background: color }}
      />
      {label}
    </span>
  );
}

/* ----------------------------- the page ------------------------------- */
export default function AlgorithmComparison() {
  const [mode, setMode] = useState("sorting");
  const pool = useMemo(
    () => algorithmsData.filter((a) => a.type === mode),
    [mode]
  );

  const fallback =
    mode === "sorting"
      ? [
          { name: "Bubble Sort" },
          { name: "Insertion Sort" },
          { name: "Cycle Sort" },
        ]
      : [{ name: "Linear Search" }, { name: "Binary Search" }];

  const options = pool.length ? pool : fallback;

  const [leftAlgo, setLeftAlgo] = useState(options[0]?.name || "");
  const [rightAlgo, setRightAlgo] = useState(
    options[1]?.name || options[0]?.name || ""
  );

  const [leftText, setLeftText] = useState("5,2,9,1,5,6");
  const [rightText, setRightText] = useState("7,3,8,2,4,6");

  // mirror + swap for learning
  const [mirror, setMirror] = useState(false);
  useEffect(() => {
    if (mirror) setRightText(leftText);
  }, [mirror, leftText]);

  const swap = () => {
    setLeftAlgo(rightAlgo);
    setRightAlgo(leftAlgo);
    setLeftText(rightText);
    setRightText(leftText);
  };

  const leftArr = useMemo(() => parseArray(leftText), [leftText]);
  const rightArr = useMemo(() => parseArray(rightText), [rightText]);

  const badLeft = leftText.trim() && leftArr.length === 0;
  const badRight = rightText.trim() && rightArr.length === 0;

  // run tokens trigger animations
  const [runL, setRunL] = useState(0);
  const [runR, setRunR] = useState(0);

  // when mode changes, keep selections valid and reset mirror
  useEffect(() => {
    if (options.length >= 2) {
      setLeftAlgo((p) =>
        options.some((x) => x.name === p) ? p : options[0].name
      );
      setRightAlgo((p) =>
        options.some((x) => x.name === p) ? p : options[1].name
      );
    }
    setMirror(false);
  }, [mode, options]);

  return (
    <div className="theme-container algorithm-comparison">
      <h1 className="theme-title">Algorithm Comparison</h1>

      <p className="comparison-description">
        Select whether you want to compare sorting or searching algorithms, then
        choose two algorithms to compare side by side.
      </p>

      {/* toolbar */}
      <div className="comparison-toolbar">
        <div className="toolbar-group">
          <label className="toolbar-label">Algorithm Type</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="form-select"
            aria-label="Algorithm type"
          >
            <option value="sorting">Sorting</option>
            <option value="searching">Searching</option>
          </select>
        </div>

        <label className="mirror-toggle">
          <input
            type="checkbox"
            checked={mirror}
            onChange={(e) => setMirror(e.target.checked)}
            className="mirror-checkbox"
            aria-label="Mirror inputs"
          />
          <span className="mirror-label">Mirror inputs</span>
        </label>

        <button
          onClick={swap}
          className="btn btn-secondary swap-button"
          aria-label="Swap algorithms and inputs"
        >
          Swap Left ↔ Right
        </button>
      </div>

      {/* two big, aligned, floating cards */}
      <div className="comparison-grid">
        {/* LEFT */}
        <section className="comparison-card">
          <header className="card-header">
            <div className="header-content">
              <div>
                <h2 className="card-title">Left</h2>
                <p className="card-subtitle">
                  Enter a comma-separated list. Click <b>Run</b> to animate.
                </p>
              </div>
              <select
                value={leftAlgo}
                onChange={(e) => setLeftAlgo(e.target.value)}
                className="form-select algorithm-select"
                aria-label="Left algorithm"
              >
                {options.map((a) => (
                  <option key={a.name} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder={
                  mode === "sorting" ? "e.g. 5,2,9,1,5,6" : "e.g. 7,3,8,2,4,6"
                }
                value={leftText}
                onChange={(e) => setLeftText(e.target.value)}
                className={`form-control ${badLeft ? "invalid" : ""}`}
                aria-invalid={badLeft}
                disabled={mirror}
                aria-label="Left array input"
              />
              <button
                onClick={() => setRunL((n) => n + 1)}
                className="btn btn-primary run-button"
                disabled={badLeft || leftArr.length === 0}
                aria-label="Run left algorithm"
              >
                Run
              </button>
              <button
                onClick={() => setRunL((n) => n + 1)}
                className="btn btn-secondary reset-button"
                aria-label="Reset left algorithm"
              >
                Reset
              </button>
            </div>
            {badLeft && (
              <p className="error-message">
                Please enter comma-separated numbers.
              </p>
            )}
          </header>

          <div className="visualization-container">
            <AlgorithmVisualizer
              algorithmName={leftAlgo}
              initialArray={leftArr}
              visualOnly={true}
            />
          </div>

          {/* legend */}
          <div className="legend-container">
            {mode === "sorting" ? (
              <>
                <Legend color="#ef4444" label="Compare" />
                <Legend color="#dc2626" label="Cycle Start" />
                <Legend color="#9333ea" label="Cycle Pos" />
                <Legend color="#4f46e5" label="Bar" />
              </>
            ) : (
              <>
                <Legend color="#0284c7" label="Low / High" />
                <Legend color="#f59e0b" label="Mid" />
                <Legend color="#16a34a" label="Found" />
              </>
            )}
          </div>
        </section>

        {/* RIGHT */}
        <section className="comparison-card">
          <header className="card-header">
            <div className="header-content">
              <div>
                <h2 className="card-title">Right</h2>
                <p className="card-subtitle">
                  For a fair A/B, enable <b>Mirror inputs</b>.
                </p>
              </div>
              <select
                value={rightAlgo}
                onChange={(e) => setRightAlgo(e.target.value)}
                className="form-select algorithm-select"
                aria-label="Right algorithm"
              >
                {options.map((a) => (
                  <option key={a.name} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder={
                  mode === "sorting" ? "e.g. 7,3,8,2,4,6" : "e.g. 1,4,9,2,6"
                }
                value={rightText}
                onChange={(e) => setRightText(e.target.value)}
                className={`form-control ${badRight ? "invalid" : ""}`}
                aria-invalid={badRight}
                aria-label="Right array input"
              />
              <button
                onClick={() => setRunR((n) => n + 1)}
                className="btn btn-primary run-button"
                disabled={badRight || rightArr.length === 0}
                aria-label="Run right algorithm"
              >
                Run
              </button>
              <button
                onClick={() => setRunR((n) => n + 1)}
                className="btn btn-secondary reset-button"
                aria-label="Reset right algorithm"
              >
                Reset
              </button>
            </div>
            {badRight && (
              <p className="error-message">
                Please enter comma-separated numbers.
              </p>
            )}
          </header>

          <div className="visualization-container">
            <AlgorithmVisualizer
              algorithmName={rightAlgo}
              initialArray={rightArr}
              visualOnly={true}
            />
          </div>

          {/* legend */}
          <div className="legend-container">
            {mode === "sorting" ? (
              <>
                <Legend color="#ef4444" label="Compare" />
                <Legend color="#dc2626" label="Cycle Start" />
                <Legend color="#9333ea" label="Cycle Pos" />
                <Legend color="#4f46e5" label="Bar" />
              </>
            ) : (
              <>
                <Legend color="#0284c7" label="Low / High" />
                <Legend color="#f59e0b" label="Mid" />
                <Legend color="#16a34a" label="Found" />
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
