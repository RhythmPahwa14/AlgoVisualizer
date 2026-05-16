// src/components/Heap/HeapVisualizer.jsx
import React, { useState, useRef, useCallback } from "react";
import "./HeapVisualizer.css";

// ─────────────────────────────────────────────────────────────
// Tree Layout: compute (x, y) positions from flat heap array
// ─────────────────────────────────────────────────────────────
function layoutHeap(heap) {
  if (!heap.length) return { nodes: [], links: [], viewBox: [0, 0, 700, 200] };

  const W = 700;
  const nodes = [];

  for (let i = 0; i < heap.length; i++) {
    const level = Math.floor(Math.log2(i + 1));
    const levelStart = Math.pow(2, level) - 1;
    const posInLevel = i - levelStart;
    const totalInLevel = Math.pow(2, level);
    const x = ((posInLevel + 0.5) / totalInLevel) * W;
    const y = 55 + level * 90;
    nodes.push({ idx: i, val: heap[i], x, y, level });
  }

  const links = nodes.slice(1).map((node) => {
    const parentIdx = Math.floor((node.idx - 1) / 2);
    return { source: nodes[parentIdx], target: node };
  });

  const maxLevel = nodes.length ? nodes[nodes.length - 1].level : 0;
  const height = Math.max(200, 90 + (maxLevel + 1) * 90 + 30);

  return { nodes, links, viewBox: [0, 0, W, height] };
}

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────
export default function HeapVisualizer() {
  // ── Core state ──────────────────────────────────────────────
  const [heap, setHeap] = useState([]);
  const [heapType, setHeapType] = useState("min"); // "min" | "max"

  // ── Input state ──────────────────────────────────────────────
  const [inputValue, setInputValue] = useState("");
  const [bulkInput, setBulkInput] = useState("");

  // ── Animation state ──────────────────────────────────────────
  const [activeIndices, setActiveIndices] = useState([]); // nodes being compared
  const [swapIndices, setSwapIndices] = useState([]);    // nodes being swapped
  const [doneIndex, setDoneIndex] = useState(null);      // root/final node
  const [stepLog, setStepLog] = useState([]);
  const [isBusy, setIsBusy] = useState(false);

  // ── Settings ─────────────────────────────────────────────────
  const [speed, setSpeed] = useState(600);
  const [stepMode, setStepMode] = useState(false);

  // ── Refs ──────────────────────────────────────────────────────
  const nextResolver = useRef(null);
  const logRef = useRef(null);

  // ─────────────────────────────────────────────────────────────
  // Helpers
  // ─────────────────────────────────────────────────────────────

  /** Returns true if `a` should be higher in the heap than `b` */
  const shouldGoUp = useCallback(
    (a, b) => (heapType === "min" ? a < b : a > b),
    [heapType]
  );

  function addLog(msg) {
    setStepLog((prev) => [...prev, msg]);
    setTimeout(() => {
      if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
    }, 50);
  }

  function waitForNext() {
    return new Promise((resolve) => {
      nextResolver.current = resolve;
    });
  }

  function handleNext() {
    if (nextResolver.current) {
      nextResolver.current();
      nextResolver.current = null;
    }
  }

  async function pause() {
    if (stepMode) await waitForNext();
    else await new Promise((r) => setTimeout(r, speed));
  }

  function resetHighlights() {
    setActiveIndices([]);
    setSwapIndices([]);
    setDoneIndex(null);
  }

  function parseNumbers(str) {
    return str
      .split(/[\s,]+/)
      .map((s) => s.trim())
      .filter(Boolean)
      .map(Number)
      .filter((n) => Number.isFinite(n));
  }

  // ─────────────────────────────────────────────────────────────
  // Heapify-Up (Bubble Up) — used after Insert
  // ─────────────────────────────────────────────────────────────
  async function heapifyUp(arr, startIdx) {
    let i = startIdx;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);

      setActiveIndices([i, parent]);
      addLog(`↑ Heapify-Up: comparing index ${i} (${arr[i]}) with parent ${parent} (${arr[parent]})`);
      await pause();

      if (shouldGoUp(arr[i], arr[parent])) {
        setSwapIndices([i, parent]);
        addLog(`🔄 Swapping ${arr[i]} ↔ ${arr[parent]}`);
        await pause();

        [arr[i], arr[parent]] = [arr[parent], arr[i]];
        setHeap([...arr]);
        setSwapIndices([]);
        i = parent;
      } else {
        addLog(`✅ Heap property satisfied at index ${i}. Stopping heapify-up.`);
        break;
      }
    }
    if (i === 0) {
      addLog(`✅ Reached root (index 0). Heapify-up complete.`);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Heapify-Down (Sink Down) — used after Extract / Build
  // ─────────────────────────────────────────────────────────────
  async function heapifyDown(arr, startIdx, size) {
    let i = startIdx;
    while (true) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let target = i;

      if (left < size && shouldGoUp(arr[left], arr[target])) target = left;
      if (right < size && shouldGoUp(arr[right], arr[target])) target = right;

      const candidates = [i, left, right].filter((x) => x < size);
      setActiveIndices(candidates);

      const leftStr = left < size ? `left=${arr[left]}` : "left=—";
      const rightStr = right < size ? `right=${arr[right]}` : "right=—";
      addLog(
        `↓ Heapify-Down: index ${i} (${arr[i]}) vs children [${leftStr}, ${rightStr}]`
      );
      await pause();

      if (target === i) {
        addLog(`✅ Heap property satisfied at index ${i}. Stopping heapify-down.`);
        break;
      }

      setSwapIndices([i, target]);
      addLog(`🔄 Swapping ${arr[i]} ↔ ${arr[target]}`);
      await pause();

      [arr[i], arr[target]] = [arr[target], arr[i]];
      setHeap([...arr]);
      setSwapIndices([]);
      i = target;
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Insert
  // ─────────────────────────────────────────────────────────────
  async function handleInsert() {
    if (!inputValue.trim() || isBusy) return;
    const val = Number(inputValue);
    if (!Number.isFinite(val)) return;

    setIsBusy(true);
    resetHighlights();
    setStepLog([]);

    const arr = [...heap, val];
    setHeap(arr);
    addLog(`➕ Inserting ${val} at index ${arr.length - 1}. Starting heapify-up...`);
    await pause();

    await heapifyUp(arr, arr.length - 1);

    setDoneIndex(0);
    addLog(
      `🏁 Insert complete! ${heapType === "min" ? "Min" : "Max"}: ${arr[0]}`
    );
    resetHighlights();
    setInputValue("");
    setIsBusy(false);
  }

  // ─────────────────────────────────────────────────────────────
  // Extract Min / Max (remove root)
  // ─────────────────────────────────────────────────────────────
  async function handleExtract() {
    if (!heap.length || isBusy) return;

    setIsBusy(true);
    resetHighlights();
    setStepLog([]);

    const arr = [...heap];
    const extracted = arr[0];
    addLog(
      `🔺 Extracting ${heapType === "min" ? "minimum" : "maximum"}: ${extracted}`
    );

    if (arr.length === 1) {
      setHeap([]);
      addLog(`✅ Heap is now empty.`);
      setIsBusy(false);
      return;
    }

    // Swap root with last element, remove last
    setSwapIndices([0, arr.length - 1]);
    addLog(
      `🔄 Swapping root (${arr[0]}) with last element (${arr[arr.length - 1]})`
    );
    await pause();

    arr[0] = arr[arr.length - 1];
    arr.pop();
    setHeap([...arr]);
    setSwapIndices([]);

    addLog(`🗑️ Removed ${extracted}. Starting heapify-down from root...`);
    await pause();

    await heapifyDown(arr, 0, arr.length);

    setDoneIndex(0);
    addLog(
      `🏁 Extract complete! New ${heapType === "min" ? "min" : "max"}: ${
        arr[0] ?? "N/A"
      }`
    );
    resetHighlights();
    setIsBusy(false);
  }

  // ─────────────────────────────────────────────────────────────
  // Build Heap (Floyd's O(n) heapify)
  // ─────────────────────────────────────────────────────────────
  async function handleBuildHeap() {
    if (!bulkInput.trim() || isBusy) return;
    const nums = parseNumbers(bulkInput);
    if (!nums.length) return;

    setIsBusy(true);
    resetHighlights();
    setStepLog([]);

    const arr = [...nums];
    setHeap([...arr]);
    addLog(
      `🏗️ Building ${heapType}-heap from [${nums.join(", ")}] using Floyd's algorithm`
    );
    await pause();

    // Start from last non-leaf node
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      addLog(`── Heapifying subtree rooted at index ${i} (${arr[i]}) ──`);
      setDoneIndex(i);
      await pause();
      await heapifyDown(arr, i, arr.length);
    }

    setDoneIndex(0);
    addLog(
      `🏁 ${heapType === "min" ? "Min" : "Max"}-heap built! Root: ${arr[0]}`
    );
    resetHighlights();
    setBulkInput("");
    setIsBusy(false);
  }

  // ─────────────────────────────────────────────────────────────
  // Delete at arbitrary index (click on node)
  // ─────────────────────────────────────────────────────────────
  async function handleDeleteAtIndex(idx) {
    if (idx < 0 || idx >= heap.length || isBusy) return;

    setIsBusy(true);
    resetHighlights();
    setStepLog([]);

    const arr = [...heap];
    const deletedVal = arr[idx];
    addLog(`🗑️ Deleting value ${deletedVal} at index ${idx}`);

    if (arr.length === 1) {
      setHeap([]);
      addLog(`✅ Heap is now empty.`);
      setIsBusy(false);
      return;
    }

    // Replace with last element
    const lastVal = arr[arr.length - 1];
    setSwapIndices([idx, arr.length - 1]);
    addLog(
      `🔄 Replacing index ${idx} with last element (${lastVal})`
    );
    await pause();

    arr[idx] = lastVal;
    arr.pop();
    setHeap([...arr]);
    setSwapIndices([]);

    if (idx < arr.length) {
      // Try heapify-up first
      const snapVal = arr[idx];
      addLog(`↑ Trying heapify-up at index ${idx}...`);
      await heapifyUp(arr, idx);

      if (arr[idx] !== snapVal) {
        // heapify-up moved the value, done
      } else {
        // value didn't move up, try heapify-down
        addLog(`↓ Trying heapify-down at index ${idx}...`);
        await heapifyDown(arr, idx, arr.length);
      }
    }

    setDoneIndex(0);
    addLog(`🏁 Delete complete!`);
    resetHighlights();
    setIsBusy(false);
  }

  // ─────────────────────────────────────────────────────────────
  // Clear & Type Toggle
  // ─────────────────────────────────────────────────────────────
  function handleClear() {
    if (isBusy) return;
    setHeap([]);
    setStepLog([]);
    resetHighlights();
  }

  function handleToggleType() {
    if (isBusy) return;
    setHeapType((t) => (t === "min" ? "max" : "min"));
    setHeap([]);
    setStepLog([]);
    resetHighlights();
  }

  // ─────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────
  const layout = layoutHeap(heap);

  return (
    <div className="hv-wrap">

      {/* ── Header ────────────────────────────────────────────── */}
      <div className="hv-header">
        <div className="hv-title-row">
          <h2 className="hv-title">
            {heapType === "min" ? "🔻 Min-Heap" : "🔺 Max-Heap"} Visualizer
          </h2>
          <button
            className={`hv-type-toggle ${heapType}`}
            onClick={handleToggleType}
            disabled={isBusy}
            title="Switch between Min-Heap and Max-Heap (clears current heap)"
          >
            Switch to {heapType === "min" ? "Max-Heap 🔺" : "Min-Heap 🔻"}
          </button>
        </div>

        {heap.length > 0 && (
          <div className="hv-info-bar">
            <span className="hv-info-chip">
              Size: <strong>{heap.length}</strong>
            </span>
            <span className="hv-info-chip">
              {heapType === "min" ? "Min" : "Max"}: <strong>{heap[0]}</strong>
            </span>
            <span className="hv-info-chip hv-array-repr">
              Array: <strong>[{heap.join(", ")}]</strong>
            </span>
          </div>
        )}
      </div>

      {/* ── Controls ──────────────────────────────────────────── */}
      <div className="hv-toolbar">
        <div className="hv-controls-grid">

          {/* Insert */}
          <div className="hv-card">
            <div className="hv-card-title">➕ Insert Value</div>
            <div className="hv-input-row">
              <input
                className="hv-input"
                type="number"
                placeholder="Value (e.g. 42)"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && !isBusy && handleInsert()
                }
                disabled={isBusy}
                aria-label="Value to insert into heap"
              />
              <button
                className="hv-btn hv-primary"
                onClick={handleInsert}
                disabled={isBusy || !inputValue.trim()}
                title="Insert value and run heapify-up"
              >
                Insert
              </button>
            </div>
            <p className="hv-hint" style={{ marginTop: 4 }}>
              Press Enter or click Insert. Watch heapify-up animate.
            </p>
          </div>

          {/* Build Heap */}
          <div className="hv-card">
            <div className="hv-card-title">🏗️ Build Heap (Heapify)</div>
            <div className="hv-input-row">
              <input
                className="hv-input"
                type="text"
                placeholder="e.g. 10, 5, 20, 3, 8, 15"
                value={bulkInput}
                onChange={(e) => setBulkInput(e.target.value)}
                disabled={isBusy}
                aria-label="Comma-separated values to build heap from"
              />
              <button
                className="hv-btn hv-accent"
                onClick={handleBuildHeap}
                disabled={isBusy || !bulkInput.trim()}
                title="Build heap using Floyd's O(n) algorithm"
              >
                Build
              </button>
            </div>
            <p className="hv-hint" style={{ marginTop: 4 }}>
              Uses Floyd's O(n) bottom-up heapify algorithm.
            </p>
          </div>

          {/* Operations & Settings */}
          <div className="hv-card">
            <div className="hv-card-title">⚙️ Operations</div>
            <div className="hv-input-row">
              <button
                className="hv-btn hv-danger"
                onClick={handleExtract}
                disabled={isBusy || !heap.length}
                title={`Remove and return the ${
                  heapType === "min" ? "minimum" : "maximum"
                } element`}
              >
                Extract {heapType === "min" ? "Min 🔻" : "Max 🔺"}
              </button>
              <button
                className="hv-btn"
                onClick={handleClear}
                disabled={isBusy}
                title="Clear the heap"
              >
                Clear
              </button>
            </div>

            <div className="hv-speed-row">
              <label className="hv-label">Speed</label>
              <input
                type="range"
                min="150"
                max="1500"
                step="50"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                disabled={stepMode}
                className="hv-range"
                aria-label="Animation speed"
              />
              <label className="hv-checkbox">
                <input
                  type="checkbox"
                  checked={stepMode}
                  onChange={(e) => setStepMode(e.target.checked)}
                  aria-label="Enable step-by-step mode"
                />
                Step Mode
              </label>
              {stepMode && (
                <button
                  className="hv-btn hv-step"
                  onClick={handleNext}
                  disabled={!isBusy}
                  title="Advance one step"
                >
                  Next ▶
                </button>
              )}
            </div>
          </div>
        </div>

        <p className="hv-hint">
          💡 <strong>Click any node</strong> to delete it. Toggle min/max heap
          type (resets heap). Index labels shown above each node.
        </p>
      </div>

      {/* ── SVG Canvas ────────────────────────────────────────── */}
      <div className="hv-canvas">
        {heap.length === 0 ? (
          <div className="hv-empty">
            <span className="hv-empty-icon">🌱</span>
            <p>
              The heap is empty.
              <br />
              Insert a value or build a heap to get started!
            </p>
          </div>
        ) : (
          <svg
            className="hv-svg"
            viewBox={layout.viewBox.join(" ")}
            preserveAspectRatio="xMidYMid meet"
            aria-label="Heap tree visualization"
          >
            {/* Edges */}
            {layout.links.map((link, i) => (
              <line
                key={i}
                x1={link.source.x}
                y1={link.source.y}
                x2={link.target.x}
                y2={link.target.y}
                className="hv-edge"
                aria-hidden="true"
              />
            ))}

            {/* Nodes */}
            {layout.nodes.map((node) => {
              const isActive = activeIndices.includes(node.idx);
              const isSwap = swapIndices.includes(node.idx);
              const isDone =
                node.idx === doneIndex && !isActive && !isSwap;

              const cls = [
                "hv-node",
                isSwap ? "is-swap" : "",
                !isSwap && isActive ? "is-active" : "",
                isDone ? "is-done" : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <g
                  key={node.idx}
                  transform={`translate(${node.x},${node.y})`}
                  className={cls}
                  onClick={() => !isBusy && handleDeleteAtIndex(node.idx)}
                  style={{ cursor: isBusy ? "not-allowed" : "pointer" }}
                  aria-label={`Node value ${node.val} at index ${node.idx}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    !isBusy &&
                    handleDeleteAtIndex(node.idx)
                  }
                >
                  <circle r={22} />
                  {/* Node value */}
                  <text dy={5}>{node.val}</text>
                  {/* Index label above node */}
                  <text className="hv-index-label" dy={-29}>
                    [{node.idx}]
                  </text>
                </g>
              );
            })}
          </svg>
        )}
      </div>

      {/* ── Legend ────────────────────────────────────────────── */}
      <div className="hv-legend">
        <div className="hv-legend-item">
          <span className="hv-chip hv-chip-active" aria-hidden="true" />
          Comparing
        </div>
        <div className="hv-legend-item">
          <span className="hv-chip hv-chip-swap" aria-hidden="true" />
          Swapping
        </div>
        <div className="hv-legend-item">
          <span className="hv-chip hv-chip-done" aria-hidden="true" />
          Root / Done
        </div>
        <div className="hv-legend-item">
          <span style={{ fontSize: "11px", color: "var(--hv-muted)" }}>
            🖱️ Click any node to delete it
          </span>
        </div>
      </div>

      {/* ── Operation Log ─────────────────────────────────────── */}
      {stepLog.length > 0 && (
        <div className="hv-log" ref={logRef} aria-live="polite" aria-label="Operation log">
          <div className="hv-log-title">📋 Operation Log</div>
          {stepLog.map((msg, i) => (
            <div key={i} className="hv-log-entry">
              {msg}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
