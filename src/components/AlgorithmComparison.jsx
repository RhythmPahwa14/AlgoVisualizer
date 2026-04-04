// src/components/AlgorithmComparison.jsx
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
  barColor = "#4b5563", // neutral gray
}) {
  const containerRef = useRef(null);
  const [items, setItems] = useState([]); // [{id, value, index}]
  const [active, setActive] = useState({
    i: -1,
    j: -1,
    low: -1,
    mid: -1,
    high: -1,
    found: -1,
    cycleStart: -1,
    pos: -1,
  });

  // rebuild items whenever initialArray changes
  useEffect(() => {
    const withIds = initialArray.map((v, idx) => ({
      id: `${idx}-${v}-${Math.random()}`,
      value: v,
      index: idx,
    }));
    setItems(withIds);
    setActive({
      i: -1,
      j: -1,
      low: -1,
      mid: -1,
      high: -1,
      found: -1,
      cycleStart: -1,
      pos: -1,
    });
  }, [initialArray]);

  // core: animate on runToken change
  useEffect(() => {
    if (!containerRef.current) return;
    let timer;
    let cancelled = false;

    const speedMs = 260; // step duration (clean & readable)

    const nextFrame = (fn, delay = speedMs) => {
      timer = setTimeout(fn, delay);
    };

    // helpers to swap indices with CSS transforms
    const applySwap = (i, j) => {
      setItems((prev) => {
        const arr = prev.map((x) => ({ ...x }));
        const idxI = arr.findIndex((x) => x.index === i);
        const idxJ = arr.findIndex((x) => x.index === j);
        if (idxI === -1 || idxJ === -1) return prev;
        const tmp = arr[idxI].index;
        arr[idxI].index = arr[idxJ].index;
        arr[idxJ].index = tmp;
        return arr;
      });
    };

    const applyMove = (from, to, valueAtFrom) => {
      // shift items indexes between [to, from-1] to the right, place 'from' at 'to'
      setItems((prev) => {
        const arr = prev.map((x) => ({ ...x }));
        // find the moving item
        const moving = arr.find((x) => x.index === from);
        if (!moving) return prev;
        const dir = from > to ? -1 : 1;
        for (let k = 0; k < arr.length; k++) {
          const it = arr[k];
          if (dir === -1 && it.index >= to && it.index < from) it.index += 1;
          if (dir === 1 && it.index <= to && it.index > from) it.index -= 1;
        }
        moving.index = to;
        moving.value = valueAtFrom ?? moving.value;
        return arr;
      });
    };

    // generate steps
    const arrValues = items
      .slice()
      .sort((a, b) => a.index - b.index)
      .map((x) => x.value);

    const steps = [];
    const name = (algorithmName || "").toLowerCase();

    if (mode === "sorting") {
      // Bubble Sort
      const bubble = () => {
        const a = arrValues.slice();
        const n = a.length;
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n - i - 1; j++) {
            steps.push({ type: "compare", i: j, j: j + 1 });
            if (a[j] > a[j + 1]) {
              steps.push({ type: "swap", i: j, j: j + 1 });
              [a[j], a[j + 1]] = [a[j + 1], a[j]];
            }
          }
        }
      };

      // Insertion Sort (as moves)
      const insertion = () => {
        const a = arrValues.slice();
        for (let i = 1; i < a.length; i++) {
          let key = a[i];
          let j = i - 1;
          steps.push({ type: "mark", i }); // current key
          while (j >= 0 && a[j] > key) {
            steps.push({ type: "compare", i: j, j: j + 1 });
            a[j + 1] = a[j];
            steps.push({ type: "move", from: j, to: j + 1 });
            j--;
          }
          a[j + 1] = key;
          steps.push({ type: "place", from: i, to: j + 1, value: key });
        }
      };

      // Cycle Sort
      const cycle = () => {
        const a = arrValues.slice();
        const n = a.length;

        for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
          let item = a[cycleStart];
          let pos = cycleStart;

          // Find position where we put the item
          steps.push({ type: "cycle-start", cycleStart });
          for (let i = cycleStart + 1; i < n; i++) {
            steps.push({ type: "cycle-compare", cycleStart, i, pos });
            if (a[i] < item) {
              pos++;
            }
          }

          // If item is already in correct position
          if (pos === cycleStart) {
            steps.push({ type: "cycle-skip", cycleStart });
            continue;
          }

          // Skip duplicates
          while (item === a[pos]) {
            pos++;
          }

          // Put the item to the right position
          if (pos !== cycleStart) {
            [item, a[pos]] = [a[pos], item];
            steps.push({ type: "cycle-swap", cycleStart, pos });
          }

          // Rotate the rest of the cycle
          while (pos !== cycleStart) {
            pos = cycleStart;

            // Find position where we put the item
            for (let i = cycleStart + 1; i < n; i++) {
              steps.push({ type: "cycle-compare", cycleStart, i, pos });
              if (a[i] < item) {
                pos++;
              }
            }

            // Skip duplicates
            while (item === a[pos]) {
              pos++;
            }

            // Put the item to the right position
            if (item !== a[pos]) {
              [item, a[pos]] = [a[pos], item];
              steps.push({ type: "cycle-swap", cycleStart, pos });
            }
          }
        }
      };

      if (name.includes("bubble")) bubble();
      else if (name.includes("insertion")) insertion();
      else if (name.includes("cycle")) cycle();
      else insertion(); // default/fallback keeps it simple
    } else {
      // searching
      if (name.includes("binary")) {
        // assume sorted display helps; we animate the pointers
        const a = arrValues.slice().sort((x, y) => x - y);
        // render sorted baseline
        steps.push({ type: "preset-sorted-array", sorted: a });
        let low = 0,
          high = a.length - 1;
        while (low <= high) {
          const mid = Math.floor((low + high) / 2);
          steps.push({ type: "bin-scan", low, mid, high });
          // pretend target = mid value for demo clarity
          if (a[mid] === a[Math.floor(a.length / 2)]) {
            steps.push({ type: "found", index: mid });
            break;
          }
          if (a[mid] < a[Math.floor(a.length / 2)]) low = mid + 1;
          else high = mid - 1;
        }
      } else {
        // linear search highlights each
        const a = arrValues.slice();
        const pretendTarget = a[Math.floor(a.length / 2)];
        for (let i = 0; i < a.length; i++) {
          steps.push({ type: "lin-scan", i });
          if (a[i] === pretendTarget) {
            steps.push({ type: "found", index: i });
            break;
          }
        }
      }
    }

    // run steps
    let k = 0;
    const run = () => {
      if (cancelled) return;
      if (k >= steps.length) {
        setActive((s) => ({
          ...s,
          i: -1,
          j: -1,
          low: -1,
          mid: -1,
          high: -1,
          cycleStart: -1,
          pos: -1,
        }));
        onFinished?.();
        return;
      }
      const step = steps[k++];

      if (mode === "sorting") {
        if (step.type === "compare") {
          setActive((s) => ({ ...s, i: step.i, j: step.j }));
          nextFrame(run, speedMs * 0.9);
          return;
        }
        if (step.type === "swap") {
          applySwap(step.i, step.j);
          nextFrame(run);
          return;
        }
        if (step.type === "move") {
          applyMove(step.from, step.to);
          nextFrame(run);
          return;
        }
        if (step.type === "place") {
          applyMove(step.from, step.to, step.value);
          nextFrame(run);
          return;
        }
        if (step.type === "mark") {
          setActive((s) => ({ ...s, i: step.i, j: -1 }));
          nextFrame(run, speedMs * 0.8);
          return;
        }
        // Cycle Sort specific steps
        if (step.type === "cycle-start") {
          setActive((s) => ({ ...s, cycleStart: step.cycleStart, pos: -1 }));
          nextFrame(run, speedMs * 1.2);
          return;
        }
        if (step.type === "cycle-compare") {
          setActive((s) => ({
            ...s,
            i: step.i,
            j: step.cycleStart,
            cycleStart: step.cycleStart,
            pos: step.pos,
          }));
          nextFrame(run, speedMs * 0.8);
          return;
        }
        if (step.type === "cycle-swap") {
          applySwap(step.cycleStart, step.pos);
          setActive((s) => ({ ...s, i: step.cycleStart, j: step.pos }));
          nextFrame(run, speedMs * 1.1);
          return;
        }
        if (step.type === "cycle-skip") {
          setActive((s) => ({
            ...s,
            cycleStart: step.cycleStart,
            i: -1,
            j: -1,
          }));
          nextFrame(run, speedMs * 0.7);
          return;
        }
      } else {
        if (step.type === "preset-sorted-array") {
          // render sorted array instantly for binary search baseline
          const withIds = step.sorted.map((v, idx) => ({
            id: `${idx}-${v}-${Math.random()}`,
            value: v,
            index: idx,
          }));
          setItems(withIds);
          nextFrame(run, speedMs);
          return;
        }
        if (step.type === "lin-scan") {
          setActive((s) => ({ ...s, i: step.i, j: -1 }));
          nextFrame(run);
          return;
        }
        if (step.type === "bin-scan") {
          setActive((s) => ({
            ...s,
            low: step.low,
            mid: step.mid,
            high: step.high,
          }));
          nextFrame(run);
          return;
        }
        if (step.type === "found") {
          setActive((s) => ({ ...s, found: step.index }));
          nextFrame(run, speedMs * 1.2);
          return;
        }
      }
      nextFrame(run);
    };

    run();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [runToken, items, mode, algorithmName, onFinished]); // re-run animation when user clicks Run

  // layout math
  const sortedItems = items.slice().sort((a, b) => a.index - b.index);
  const maxVal = Math.max(1, ...sortedItems.map((x) => x.value));
  const cardPadding = 12;
  const barGap = 4;
  const barCount = Math.max(1, sortedItems.length);
  const width = Math.min(
    620,
    Math.max(360, barCount * 18 + (barCount - 1) * barGap + cardPadding * 2)
  );
  const barWidth = clamp(
    (width - cardPadding * 2 - (barCount - 1) * barGap) / barCount,
    6,
    24
  );

  return (
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
        const isCycleStart = renderIndex === active.cycleStart;
        const isCyclePos = renderIndex === active.pos;

        // binary pointers
        const isLow = renderIndex === active.low;
        const isMid = renderIndex === active.mid;
        const isHigh = renderIndex === active.high;

        let bg = barColor;
        if (isFound) bg = "#111827"; // darkest
        else if (isMid) bg = "#6b7280";
        else if (isLow || isHigh) bg = "#9ca3af";
        else if (isCycleStart) bg = "#374151";
        else if (isCyclePos) bg = "#4b5563";
        else if (isCompare) bg = "#1f2937";

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
              transition:
                "transform 220ms ease, background-color 160ms ease, height 160ms ease",
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
  );
}

function Legend({ color, label }) {
  return (
    <span
      className="inline-flex items-center gap-2"
      style={{
        padding: "4px 10px",
        borderRadius: 999,
        background: "#f3f4f6",
        border: "1px solid #e5e7eb",
        lineHeight: 1.2,
      }}
    >
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
    <div
      className="theme-container"
      style={{ maxWidth: 1400, marginInline: "auto" }}
    >
      <h1 className="theme-title">Algorithm Comparison</h1>

      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        Select whether you want to compare sorting or searching algorithms, then
        choose two algorithms to compare side by side.
      </p>

      {/** Shared action button dimensions keep both panels perfectly aligned */}
      

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
            className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800 bg-white text-gray-900"
            aria-label="Algorithm type"
          >
            <option value="sorting">Sorting</option>
            <option value="searching">Searching</option>
          </select>
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
        </label>

        <button
          onClick={swap}
          className="px-5 py-2.5 rounded-2xl bg-black text-white hover:bg-gray-800 active:bg-gray-900 transition text-sm font-semibold shadow-sm"
          title="Swap algorithms and inputs"
        >
          Swap Left ↔ Right
        </button>
      </div>

      {/* two big, aligned, floating cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem",
          justifyContent: "center",
          alignItems: "start",
          paddingBottom: "1rem",
        }}
      >
        {/* LEFT */}
        <section
          className="bg-white rounded-3xl shadow-xl"
          style={{ padding: 20, minHeight: 560, width: "100%", maxWidth: 620, marginInline: "auto" }}
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
                className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800 bg-white text-gray-900"
                aria-label="Left algorithm"
              >
                {options.map((a) => (
                  <option key={a.name} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <input
                type="text"
                placeholder={
                  mode === "sorting" ? "e.g. 5,2,9,1,5,6" : "e.g. 7,3,8,2,4,6"
                }
                value={leftText}
                onChange={(e) => setLeftText(e.target.value)}
                className={`flex-1 p-2 border rounded-lg ${
                  badLeft ? "border-red-400" : ""
                }`}
                aria-invalid={badLeft}
                disabled={mirror}
              />
              <button
                onClick={() => setRunL((n) => n + 1)}
                className="rounded-2xl bg-black text-white hover:bg-gray-800 active:bg-gray-900 transition text-sm font-semibold shadow-sm"
                style={{ width: 120, height: 44, flex: "0 0 120px" }}
                disabled={badLeft || leftArr.length === 0}
              >
                Run
              </button>
              <button
                onClick={() => setRunL((n) => n + 1)} // re-run acts as reset+run since engine rebuilds from items state
                className="rounded-2xl bg-gray-200 text-gray-900 border border-gray-300 hover:bg-gray-300 active:bg-gray-400 transition text-sm font-semibold"
                style={{ width: 120, height: 44, flex: "0 0 120px" }}
                title="Re-run from the beginning"
              >
                Reset
              </button>
            </div>
            {badLeft && (
              <p className="text-xs text-red-600 mt-1">
                Please enter comma-separated numbers.
              </p>
            )}
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

          {/* legend */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-700">
            {mode === "sorting" ? (
              <>
                <Legend color="#1f2937" label="Compare" />
                <Legend color="#374151" label="Cycle Start" />
                <Legend color="#4b5563" label="Cycle Pos" />
                <Legend color="#6b7280" label="Bar" />
              </>
            ) : (
              <>
                <Legend color="#9ca3af" label="Low / High" />
                <Legend color="#6b7280" label="Mid" />
                <Legend color="#111827" label="Found" />
              </>
            )}
          </div>
        </section>

        {/* RIGHT */}
        <section
          className="bg-white rounded-3xl shadow-xl"
          style={{ padding: 20, minHeight: 560, width: "100%", maxWidth: 620, marginInline: "auto" }}
        >
          <header className="pb-4 border-b">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">Right</h2>
                <p className="text-xs text-gray-500">
                  For a fair A/B, enable <b>Mirror inputs</b>.
                </p>
              </div>
              <select
                value={rightAlgo}
                onChange={(e) => setRightAlgo(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800 bg-white text-gray-900"
                aria-label="Right algorithm"
              >
                {options.map((a) => (
                  <option key={a.name} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <input
                type="text"
                placeholder={
                  mode === "sorting" ? "e.g. 7,3,8,2,4,6" : "e.g. 1,4,9,2,6"
                }
                value={rightText}
                onChange={(e) => setRightText(e.target.value)}
                className={`flex-1 p-2 border rounded-lg ${
                  badRight ? "border-red-400" : ""
                }`}
                aria-invalid={badRight}
              />
              <button
                onClick={() => setRunR((n) => n + 1)}
                className="rounded-2xl bg-black text-white hover:bg-gray-800 active:bg-gray-900 transition text-sm font-semibold shadow-sm"
                style={{ width: 120, height: 44, flex: "0 0 120px" }}
                disabled={badRight || rightArr.length === 0}
              >
                Run
              </button>
              <button
                onClick={() => setRunR((n) => n + 1)}
                className="rounded-2xl bg-gray-200 text-gray-900 border border-gray-300 hover:bg-gray-300 active:bg-gray-400 transition text-sm font-semibold"
                style={{ width: 120, height: 44, flex: "0 0 120px" }}
                title="Re-run from the beginning"
              >
                Reset
              </button>
            </div>
            {badRight && (
              <p className="text-xs text-red-600 mt-1">
                Please enter comma-separated numbers.
              </p>
            )}
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

          {/* legend */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-700">
            {mode === "sorting" ? (
              <>
                <Legend color="#1f2937" label="Compare" />
                <Legend color="#374151" label="Cycle Start" />
                <Legend color="#4b5563" label="Cycle Pos" />
                <Legend color="#6b7280" label="Bar" />
              </>
            ) : (
              <>
                <Legend color="#9ca3af" label="Low / High" />
                <Legend color="#6b7280" label="Mid" />
                <Legend color="#111827" label="Found" />
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
