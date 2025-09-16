// src/pages/AlgorithmComparison.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import algorithmsData from "../algorithms/algorithms.json";
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

export default function AlgorithmComparison() {
  const [algoType, setAlgoType] = useState("sorting");

  // Filter algorithms based on selected type
  const filteredAlgos = algorithmsData.filter((a) => a.type === algoType);
  const fallback =
    algoType === "sorting"
      ? [{ name: "Bubble Sort" }, { name: "Insertion Sort" }]
      : [{ name: "Linear Search" }, { name: "Binary Search" }];
  const options = filteredAlgos.length > 0 ? filteredAlgos : fallback;

  // Default to first two algorithms for the selected type
  const [algo1, setAlgo1] = useState(options[0]?.name || "");
  const [algo2, setAlgo2] = useState(
    options[1]?.name || options[0]?.name || ""
  );

  // Custom arrays per panel (comma-separated)
  const [algo1ArrayText, setAlgo1ArrayText] = useState("5,2,9,1,5,6");
  const [algo2ArrayText, setAlgo2ArrayText] = useState("7,3,8,2,4,6");
  const [animate, setAnimate] = useState(false);

  const parseArray = (text) => {
    return text
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map(Number)
      .filter((n) => Number.isFinite(n));
  };


/* ------------------------- animation engine --------------------------- */
/** A very small visualizer that animates sorting/searching.
 *  - Sorting: produces a list of swap/move operations and animates positions.
 *  - Searching: produces a list of highlight steps.
 */
function AlgoVisualizer({
  mode, // "sorting" | "searching"
  algorithmName, // "Bubble Sort" | "Insertion Sort" | "Linear Search" | "Binary Search" | ...
  initialArray, // number[]
  runToken, // increments when user clicks Run -> triggers a new run
  onFinished, // callback at end (optional)
  height = 280,
  barColor = "#4f46e5", // indigo
}) {
  const containerRef = useRef(null);
  const [items, setItems] = useState([]); // [{id, value, index}]
  const [active, setActive] = useState({ i: -1, j: -1, low: -1, mid: -1, high: -1, found: -1 });

  // rebuild items whenever initialArray changes
  useEffect(() => {

    const withIds = initialArray.map((v, idx) => ({ id: `${idx}-${v}-${Math.random()}`, value: v, index: idx }));
    setItems(withIds);
    setActive({ i: -1, j: -1, low: -1, mid: -1, high: -1, found: -1 });
  }, [initialArray]);

  // core: animate on runToken change
  // useEffect removed temporarily

  // layout math
  const sortedItems = items.slice().sort((a, b) => a.index - b.index);
  const maxVal = Math.max(1, ...sortedItems.map((x) => x.value));
  const cardPadding = 12;
  const barGap = 4;
  const barCount = Math.max(1, sortedItems.length);
  const width = Math.min(620, Math.max(360, barCount * 18 + (barCount - 1) * barGap + cardPadding * 2));
  const barWidth = clamp((width - cardPadding * 2 - (barCount - 1) * barGap) / barCount, 6, 24);

  const modernSelectStyles = {
    appearance: "none",
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    padding: "12px 16px",
    fontSize: "16px",
    fontWeight: "500",
    color: "var(--theme-text-primary, #1a1a1a)",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
    backgroundPosition: "right 12px center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "16px",
    paddingRight: "40px",
  };

  const modernInputStyles = {
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    padding: "14px 16px",
    fontSize: "15px",
    color: "var(--theme-text-primary, #1a1a1a)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "inherit",
  };

  const labelStyles = {
    fontSize: "14px",
    fontWeight: "600",
    color: "var(--theme-text-primary, #1a1a1a)",
    marginBottom: "8px",
    display: "block",
    letterSpacing: "0.025em",
  };

  return (
    <div>
      <div
        ref={containerRef}
        style={{
          height,
          position: "relative",
          padding: cardPadding,
          background: "rgba(17,24,39,0.04)",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >

        {/* bars */}
        {sortedItems.map((it, renderIndex) => {
          const h = Math.max(6, (it.value / maxVal) * (height - 48));
          const x = renderIndex * (barWidth + barGap);
          const isCompare = renderIndex === active.i || renderIndex === active.j;
          const isFound = renderIndex === active.found;

          // binary pointers
          const isLow = renderIndex === active.low;
          const isMid = renderIndex === active.mid;
          const isHigh = renderIndex === active.high;

          let bg = barColor;
          if (isFound) bg = "#16a34a"; // green
          else if (isMid) bg = "#f59e0b"; // amber
          else if (isLow || isHigh) bg = "#0284c7"; // blue
          else if (isCompare) bg = "#ef4444"; // red

          return (
            <div
              key={it.id}
              style={{
                position: "absolute",
                bottom: 8,
                left: cardPadding,
                width: barWidth,
                height: h,
                transform: `translateX(${x}px)`,
                transition: "transform 220ms ease, background-color 160ms ease, height 160ms ease",
                background: bg,
                borderRadius: 6,
                boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                color: "white",
                fontSize: 11,
                paddingBottom: 4,
                userSelect: "none",
              }}
              title={String(it.value)}
            >
              {it.value}
            </div>
          );
        })}
      </div>

      {/* legend (compact & professional) */}
      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-600">
        {mode === "sorting" ? (
          <>
            <Legend color="#ef4444" label="Compare" />
            <Legend color="#4f46e5" label="Bar" />
          </>
        ) : (
          <>
            <Legend color="#0284c7" label="Low / High" />
            <Legend color="#f59e0b" label="Mid" />
            <Legend color="#16a34a" label="Found" />
          </>
        )}

        <p>
        Select whether you want to compare sorting or searching algorithms, then
        choose two algorithms to compare side by side.
        </p>

      {/* Select algorithm type */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <div style={{ width: "280px" }}>
          <label style={labelStyles}>Algorithm Type</label>
          <select
            value={algoType}
            onChange={(e) => handleTypeChange(e.target.value)}
            style={{
              ...modernSelectStyles,
              width: "100%",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "rgba(59, 130, 246, 0.5)";
              e.target.style.transform = "translateY(-1px)";
              e.target.style.boxShadow = "0 4px 16px rgba(59, 130, 246, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "rgba(59, 130, 246, 0.6)";
              e.target.style.boxShadow =
                "0 0 0 3px rgba(59, 130, 246, 0.1), 0 4px 16px rgba(59, 130, 246, 0.15)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            <option value="sorting">🔀 Sorting Algorithms</option>
            <option value="searching">🔍 Searching Algorithms</option>
          </select>
        </div>

      </div>
    </div>
  );
}
}

function Legend({ color, label }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        style={{
          width: 10,
          height: 10,
          background: color,
          borderRadius: 3,
          display: "inline-block",
        }}
      />
      {label}
    </span>
  );
}

/* ----------------------------- the page ------------------------------- */
export default function AlgorithmComparison() {
  const [mode, setMode] = useState("sorting");
  const pool = useMemo(() => algorithmsData.filter((a) => a.type === mode), [mode]);

  const fallback =
    mode === "sorting"
      ? [{ name: "Bubble Sort" }, { name: "Insertion Sort" }]
      : [{ name: "Linear Search" }, { name: "Binary Search" }];

  const options = pool.length ? pool : fallback;

  const [leftAlgo, setLeftAlgo] = useState(options[0]?.name || "");
  const [rightAlgo, setRightAlgo] = useState(options[1]?.name || options[0]?.name || "");

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
      setLeftAlgo((p) => (options.some((x) => x.name === p) ? p : options[0].name));
      setRightAlgo((p) => (options.some((x) => x.name === p) ? p : options[1].name));
    }
    setMirror(false);
  }, [mode]); // eslint-disable-line

  return (
    <div className="theme-container" style={{ maxWidth: 1400, marginInline: "auto" }}>
      <h1 className="theme-title">Algorithm Comparison</h1>

      {/* toolbar */}
      <div
        className="mb-6"
        style={{

          display: "flex",
          gap: "0.75rem",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <div className="flex items-center gap-3 bg-white/5 px-3 py-2 rounded-xl">
          <label className="text-sm font-medium">Algorithm Type</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Algorithm type"

          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 400px))",
          gap: "2rem",
          justifyContent: "center",
          marginBottom: "2rem",
          padding: "0 1rem",
        }}
      >
        {/* Algorithm 1 */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
            backdropFilter: "blur(20px)",
            borderRadius: "20px",
            padding: "24px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <label style={labelStyles}>First Algorithm</label>
          <select
            value={algo1}
            onChange={(e) => setAlgo1(e.target.value)}
            style={{
              ...modernSelectStyles,
              width: "100%",
              marginBottom: "16px",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "rgba(16, 185, 129, 0.5)";
              e.target.style.transform = "translateY(-1px)";
              e.target.style.boxShadow = "0 4px 16px rgba(16, 185, 129, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "rgba(16, 185, 129, 0.6)";
              e.target.style.boxShadow =
                "0 0 0 3px rgba(16, 185, 129, 0.1), 0 4px 16px rgba(16, 185, 129, 0.15)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            {options.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>

          <label style={{ ...labelStyles, marginTop: "8px" }}>
            Input Array
          </label>
          <input
            type="text"
            placeholder="Enter comma-separated numbers (e.g., 5,2,9,1,5,6)"
            value={algo1ArrayText}
            onChange={(e) => setAlgo1ArrayText(e.target.value)}
            style={{
              ...modernInputStyles,
              width: "100%",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "rgba(16, 185, 129, 0.4)";
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.transform = "translateY(0)";
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "rgba(16, 185, 129, 0.6)";
              e.target.style.boxShadow =
                "0 0 0 3px rgba(16, 185, 129, 0.1), 0 4px 16px rgba(16, 185, 129, 0.15)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
            }}
          />
        </div>

        {/* Algorithm 2 */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
            backdropFilter: "blur(20px)",
            borderRadius: "20px",
            padding: "24px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <label style={labelStyles}>Second Algorithm</label>
          <select
            value={algo2}
            onChange={(e) => setAlgo2(e.target.value)}
            style={{
              ...modernSelectStyles,
              width: "100%",
              marginBottom: "16px",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "rgba(239, 68, 68, 0.5)";
              e.target.style.transform = "translateY(-1px)";
              e.target.style.boxShadow = "0 4px 16px rgba(239, 68, 68, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "rgba(239, 68, 68, 0.6)";
              e.target.style.boxShadow =
                "0 0 0 3px rgba(239, 68, 68, 0.1), 0 4px 16px rgba(239, 68, 68, 0.15)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
            }}

          >
            <option value="sorting">Sorting</option>
            <option value="searching">Searching</option>
          </select>



          <label style={{ ...labelStyles, marginTop: "8px" }}>
            Input Array
          </label>
          <input
            type="text"
            placeholder="Enter comma-separated numbers (e.g., 7,3,8,2,4,6)"
            value={algo2ArrayText}
            onChange={(e) => setAlgo2ArrayText(e.target.value)}
            style={{
              ...modernInputStyles,
              width: "100%",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "rgba(239, 68, 68, 0.4)";
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.transform = "translateY(0)";
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "rgba(239, 68, 68, 0.6)";
              e.target.style.boxShadow =
                "0 0 0 3px rgba(239, 68, 68, 0.1), 0 4px 16px rgba(239, 68, 68, 0.15)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
            }}
          />

        </div>


        <label className="flex items-center gap-3 bg-white/5 px-3 py-2 rounded-xl">
          <input
            type="checkbox"
            checked={mirror}
            onChange={(e) => setMirror(e.target.checked)}
            style={{ width: 18, height: 18 }}
            aria-label="Mirror inputs"
          />
          <span className="text-sm">Mirror inputs</span>

      {/* Animation toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 20px",
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            fontSize: "14px",
            fontWeight: "500",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
          }}
        >
          <input
            type="checkbox"
            checked={animate}
            onChange={(e) => setAnimate(e.target.checked)}
            style={{
              width: "18px",
              height: "18px",
              accentColor: "var(--theme-primary, #3b82f6)",
              cursor: "pointer",
            }}
          />
          <span style={{ color: "var(--theme-text-primary, #1a1a1a)" }}>
            🎬 Animate sorting steps
          </span>

        </label>

        <button
          onClick={swap}
          className="px-3 py-2 rounded-xl bg-white/10 text-white/90 hover:bg-white/20 active:bg-white/25 transition text-sm font-medium"
          title="Swap algorithms and inputs"
        >
          Swap Left ↔ Right
        </button>
      </div>

      {/* two big, aligned, floating cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(520px, 620px))",
          gap: "2rem",
          justifyContent: "center",
          alignItems: "start",
          paddingBottom: "1rem",
        }}
      >

        {/* LEFT */}
        <section
          className="bg-white rounded-3xl shadow-xl"
          style={{ padding: 20, minHeight: 560 }}
        >
          <header className="pb-4 border-b">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">Left</h2>
                <p className="text-xs text-gray-500">
                  Enter a comma-separated list. Click <b>Run</b> to animate.
                </p>
              </div>
              <select
                value={leftAlgo}
                onChange={(e) => setLeftAlgo(e.target.value)}
                className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Left algorithm"
              >
                {options.map((a) => (
                  <option key={a.name} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <input
                type="text"
                placeholder={mode === "sorting" ? "e.g. 5,2,9,1,5,6" : "e.g. 7,3,8,2,4,6"}
                value={leftText}
                onChange={(e) => setLeftText(e.target.value)}
                className={`flex-1 p-2 border rounded-lg ${badLeft ? "border-red-400" : ""}`}
                aria-invalid={badLeft}
                disabled={mirror}
              />
              <button
                onClick={() => setRunL((n) => n + 1)}
                className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition text-sm font-medium"
                disabled={badLeft || leftArr.length === 0}
              >
                Run
              </button>
              <button
                onClick={() => setRunL((n) => n + 1)} // re-run acts as reset+run since engine rebuilds from items state
                className="px-3 py-2 rounded-lg bg-white text-gray-800 border hover:bg-gray-50 transition text-sm font-medium"
                title="Re-run from the beginning"
              >
                Reset
              </button>
            </div>
            {badLeft && <p className="text-xs text-red-600 mt-1">Please enter comma-separated numbers.</p>}
          </header>

          <div className="pt-4">
            <AlgoVisualizer
              mode={mode}
              algorithmName={leftAlgo}
              initialArray={leftArr}
              runToken={runL}
              onFinished={() => {}}
            />
          </div>
        </section>

        {/* RIGHT */}
        <section
          className="bg-white rounded-3xl shadow-xl"
          style={{ padding: 20, minHeight: 560 }}
        >
          <header className="pb-4 border-b">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">Right</h2>
                <p className="text-xs text-gray-500">
                  For a fair A/B, enable <b>Mirror inputs</b>.
                </p>

        {[
          { name: algo1, arr: parseArray(algo1ArrayText) },
          { name: algo2, arr: parseArray(algo2ArrayText) },
        ].map(
          (cfg, idx) =>
            cfg.name && (
              <div
                key={idx}
                className="flex-1 min-w-[400px] max-w-[600px] bg-white p-4 rounded-2xl shadow-lg"
              >
                <h2 className="text-xl font-semibold mb-4 text-center">
                  {cfg.name}
                </h2>
                <Visualizer
                  algorithmName={cfg.name}
                  initialArray={cfg.arr}
                  visualOnly={!animate}
                  hideTitle={true}
                />

              </div>
              <select
                value={rightAlgo}
                onChange={(e) => setRightAlgo(e.target.value)}
                className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Right algorithm"
              >
                {options.map((a) => (
                  <option key={a.name} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <input
                type="text"
                placeholder={mode === "sorting" ? "e.g. 7,3,8,2,4,6" : "e.g. 1,4,9,2,6"}
                value={rightText}
                onChange={(e) => setRightText(e.target.value)}
                className={`flex-1 p-2 border rounded-lg ${badRight ? "border-red-400" : ""}`}
                aria-invalid={badRight}
              />
              <button
                onClick={() => setRunR((n) => n + 1)}
                className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition text-sm font-medium"
                disabled={badRight || rightArr.length === 0}
              >
                Run
              </button>
              <button
                onClick={() => setRunR((n) => n + 1)}
                className="px-3 py-2 rounded-lg bg-white text-gray-800 border hover:bg-gray-50 transition text-sm font-medium"
                title="Re-run from the beginning"
              >
                Reset
              </button>
            </div>
            {badRight && <p className="text-xs text-red-600 mt-1">Please enter comma-separated numbers.</p>}
          </header>

          <div className="pt-4">
            <AlgoVisualizer
              mode={mode}
              algorithmName={rightAlgo}
              initialArray={rightArr}
              runToken={runR}
              onFinished={() => {}}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
