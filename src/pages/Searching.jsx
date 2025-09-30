// src/pages/Searching.jsx
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import AlgorithmVisualizer from "../components/AlgorithmVisualizer";
import CodeExplanation from "../components/CodeExplanation";
import SimpleExportControls from "../components/SimpleExportControls";
import "../styles/global-theme.css";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const ALGORITHM_PSEUDOCODE = {
  binarySearch: [
    { code: "l = 0, r = n - 1", explain: "Initialize the search bounds." },
    { code: "while l <= r", explain: "Continue while the range is valid." },
    { code: "  mid = floor((l + r) / 2)", explain: "Pick the middle index." },
    { code: "  if arr[mid] == target → return mid", explain: "Found the target." },
    { code: "  else if arr[mid] < target → l = mid + 1", explain: "Search the right half." },
    { code: "  else → r = mid - 1", explain: "Search the left half." },
    { code: "return -1", explain: "Target not found." },
  ],
  linearSearch: [
    { code: "for i in 0..n-1", explain: "Scan each element." },
    { code: "  if arr[i] == target", explain: "Return index." },
  ],
  jumpSearch: [
    { code: "step = floor(sqrt(n))", explain: "Choose jump size (≈ √n)." },
    { code: "prev = 0", explain: "Start of current block." },
    { code: "while arr[min(step, n) - 1] < target", explain: "Jump forward by step until block surpasses target." },
    { code: "  prev = step; step += floor(sqrt(n))", explain: "Advance to next block." },
    { code: "if prev >= n", explain: "Target larger than all elements → not found." },
    { code: "linear search from prev to min(step, n) - 1", explain: "Scan within the block to find the target." },
  ],
  exponentialSearch: [
    { code: "if arr[0] == target → return 0", explain: "Quick check." },
    { code: "bound = 1", explain: "Start with a small bound." },
    { code: "while bound < n and arr[bound] < target", explain: "Double the bound (1,2,4,8,…) to find a range that may contain target." },
    { code: "low = floor(bound / 2), high = min(bound, n - 1)", explain: "Clamp the range to array limits." },
    { code: "binary search in [low, high]", explain: "Run standard binary search inside the bounded range." },
  ],
};

const SEARCHING_DETAILS = {
  binarySearch: {
    time: "Best O(1), Average/Worst O(log n)",
    space: "O(1) (iterative)",
    uses: ["Autocomplete prefix boundaries", "Find insert position in sorted data"],
  },
  linearSearch: {
    time: "Best O(1), Average/Worst O(n)",
    space: "O(1)",
    uses: ["Small/unsorted datasets", "Single-pass scans (e.g., logs)"],
  },
  jumpSearch: {
    time: "O(√n)",
    space: "O(1)",
    uses: ["Large sorted arrays on disk", "Index probing with fewer comparisons"],
  },
  exponentialSearch: {
    time: "O(log n) (after range finding)",
    space: "O(1)",
    uses: ["Unknown/unbounded size arrays", "Stream data: find range then binary search"],
  },
};

function getGap(arraySize, isTabletOrBelow) {
  if (arraySize > 40) return isTabletOrBelow ? "1px" : "2px";
  if (arraySize > 25) return "3px";
  return "6px";
}

function getBarFontSize(arraySize) {
  if (arraySize > 40) return "8px";
  if (arraySize > 30) return "9px";
  if (arraySize > 20) return "10px";
  return "11px";
}

const buildBinarySearchSteps = (array, target) => {
  const steps = [];
  let l = 0, r = array.length - 1;
  steps.push({ type: "init", l, r, mid: null, array: [...array], text: `Initialize range l=0, r=${r}.` });

  while (l <= r) {
    steps.push({ type: "whileCheck", l, r, mid: null, array: [...array], text: `Range valid (l=${l}, r=${r}).` });
    const mid = Math.floor((l + r) / 2);
    steps.push({ type: "check", l, r, mid, array: [...array], text: `Checking middle index ${mid}: ${array[mid]} (range ${l}-${r}).` });

    if (array[mid] === target) {
      steps.push({ type: "found", l, r, mid, array: [...array], text: `Found ${target} at index ${mid}.` });
      return steps;
    } else if (array[mid] < target) {
      steps.push({ type: "moveRight", l, r, mid, array: [...array], text: `${array[mid]} < ${target}; search right half.` });
      l = mid + 1;
    } else {
      steps.push({ type: "moveLeft", l, r, mid, array: [...array], text: `${array[mid]} > ${target}; search left half.` });
      r = mid - 1;
    }
  }

  steps.push({ type: "notFound", l: 0, r: array.length - 1, mid: null, array: [...array], text: `${target} not found.` });
  return steps;
};

const Searching = () => {
  const { id } = useParams();
  const playRef = useRef(false);

  const [array, setArray] = useState([]);
  const [target, setTarget] = useState("");
  const [message, setMessage] = useState("");
  const [delay, setDelay] = useState(500);
  const [arraySize, setArraySize] = useState(20);
  const [algorithm, setAlgorithm] = useState("binarySearch");
  const [showCodeExplanation, setShowCodeExplanation] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [customArrayInput, setCustomArrayInput] = useState("");
  const [inputError, setInputError] = useState("");

  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const isTabletOrBelow = useMediaQuery({ query: "(max-width: 1024px)" });
  const gapValue = useMemo(() => getGap(arraySize, isTabletOrBelow), [arraySize, isTabletOrBelow]);
  const barFontSize = useMemo(() => getBarFontSize(arraySize), [arraySize]);

  // Generate random array
  const generateArray = useCallback(() => {
    const randomArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100)).sort((a, b) => a - b);
    setArray(randomArray);
    setMessage("New array generated. Ready to search!");
    setCustomArrayInput("");
    setInputError("");
  }, [arraySize]);

  useEffect(() => generateArray(), [arraySize, generateArray]);

  // Pick algorithm based on route param
  useEffect(() => {
    const allowed = new Set(["linearSearch", "binarySearch", "jumpSearch", "exponentialSearch"]);
    if (id && allowed.has(id)) setAlgorithm(id);
  }, [id]);

  const getAlgoLabel = useCallback((algo) =>
    ({
      binarySearch: "Binary Search",
      linearSearch: "Linear Search",
      jumpSearch: "Jump Search",
      exponentialSearch: "Exponential Search",
    }[algo] || algo), []);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Autoplay / Step Mode for Binary Search
  const handleSearch = useCallback(async () => {
    let searchArray = array;

    // Handle custom array input
    if (customArrayInput.trim() !== "") {
      const parsedArray = customArrayInput
        .split(",")
        .map(s => s.trim())
        .filter(s => s !== "")
        .map(Number);

      if (parsedArray.some(isNaN)) {
        setInputError("Invalid array. Please enter comma-separated numbers only.");
        return;
      }
      if (parsedArray.length === 0) {
        setInputError("Custom array cannot be empty.");
        return;
      }

      searchArray = [...parsedArray].sort((a, b) => a - b);
      setArray(searchArray);
      setInputError("");
    }

    const targetValue = parseInt(target, 10);
    if (Number.isNaN(targetValue)) {
      setInputError("Enter a valid number as the target.");
      return;
    }
    setInputError("");

    if (algorithm !== "binarySearch") {
      setMessage(`Autoplay only available for Binary Search. ${algorithm} will keep current behavior.`);
      return;
    }

    // Build steps and autoplay
    const s = buildBinarySearchSteps(searchArray, targetValue);
    setSteps(s);
    setCurrentStep(0);
    setIsSearching(true);
    playRef.current = true;
    setMessage(`Searching for ${targetValue}...`);

    for (let i = 0; i < s.length; i++) {
      if (!playRef.current) break;
      setCurrentStep(i);
      await sleep(delay);
    }

    playRef.current = false;
    setIsSearching(false);

    const lastStep = s[s.length - 1];
    setMessage(lastStep.type === "found" ? "Search complete: target found." : "Search complete: target not found.");
  }, [algorithm, array, customArrayInput, delay, target]);

  const handleNextStep = useCallback(() => setCurrentStep(s => Math.min(s + 1, steps.length - 1)), [steps.length]);
  const handlePrevStep = useCallback(() => setCurrentStep(s => Math.max(s - 1, 0)), []);

  const getStepColorArray = useCallback(() => {
    if (!steps[currentStep]) return [];
    const step = steps[currentStep];
    const n = step.array.length;
    const colors = new Array(n).fill("#2b3a4b");

    const l = typeof step.l === "number" ? step.l : 0;
    const r = typeof step.r === "number" ? step.r : n - 1;
    for (let i = l; i <= r && i < n; i++) colors[i] = "#66ccff";

    if (typeof step.mid === "number" && step.mid >= 0 && step.mid < n) {
      colors[step.mid] = step.type === "found" ? "#4ade80" : "#ff6b6b";
    }
    if (step.type === "notFound") return new Array(n).fill("#ff6b6b");
    return colors;
  }, [steps, currentStep]);

  const getAlgorithmName = useCallback(() => getAlgoLabel(algorithm), [algorithm, getAlgoLabel]);
  const algorithmDetails = useMemo(() => SEARCHING_DETAILS[algorithm] || {}, [algorithm]);
  const algorithmPseudocode = useMemo(() => ALGORITHM_PSEUDOCODE[algorithm] || [], [algorithm]);

  return (
    <div className="theme-container" data-aos="fade-up" data-aos-duration="1000">
      <h1 className="theme-title">Searching Algorithms</h1>

      {/* Controls */}
      <div className="theme-card" data-aos="fade-up" data-aos-delay="200">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="algorithm-select">Algorithm</label>
            <select
              id="algorithm-select"
              value={algorithm}
              onChange={e => setAlgorithm(e.target.value)}
              disabled={isSearching}
              className="form-select"
            >
              {["binarySearch", "linearSearch", "jumpSearch", "exponentialSearch"].map(algo => (
                <option key={algo} value={algo}>{getAlgoLabel(algo)}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="custom-array">Custom Array (Sorted)</label>
            <input
              id="custom-array"
              type="text"
              placeholder="e.g., 5, 12, 19"
              value={customArrayInput}
              onChange={e => setCustomArrayInput(e.target.value)}
              disabled={isSearching}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="target-input">Target</label>
            <input
              id="target-input"
              type="number"
              placeholder="Target"
              value={target}
              onChange={e => setTarget(e.target.value)}
              disabled={isSearching}
              className="form-control"
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <button className="btn btn-primary" onClick={handleSearch} disabled={isSearching}>
              {isSearching ? "Searching..." : "Run Search"}
            </button>
            <button className="btn btn-secondary" onClick={() => { playRef.current = false; setIsSearching(false); setMessage("Search stopped."); }} disabled={!isSearching}>
              Stop
            </button>
            <button className="btn btn-secondary" onClick={generateArray} disabled={isSearching}>Generate Array</button>
          </div>
        </div>
        {inputError && <div className="inline-error">{inputError}</div>}
      </div>

      {/* Array Size & Speed */}
      <div className="form-grid" data-aos="fade-up" data-aos-delay="300">
        <div className="theme-card">
          <label>Array Size: {arraySize}</label>
          <input type="range" min="10" max="50" value={arraySize} onChange={e => setArraySize(parseInt(e.target.value))} disabled={isSearching} />
          <label>Speed: {delay}ms</label>
          <input type="range" min="50" max="1000" value={delay} onChange={e => setDelay(parseInt(e.target.value))} disabled={isSearching} />
        </div>
        <SimpleExportControls containerId="search-visualization-container" />
      </div>

      {message && <div className="status-message">{message}</div>}

      {/* Step Navigation (Binary Search only) */}
      {algorithm === "binarySearch" && steps.length > 0 && (
        <div className="theme-card step-navigation" data-aos="fade-up" data-aos-delay="400">
          <button className="btn btn-secondary" onClick={handlePrevStep} disabled={currentStep === 0}>Previous Step</button>
          <button className="btn btn-secondary" onClick={handleNextStep} disabled={currentStep >= steps.length - 1}>Next Step</button>
          <span>Step {currentStep + 1} / {steps.length}</span>
        </div>
      )}

      {/* Visualization */}
      <div className="form-grid" data-aos="fade-up" data-aos-delay="500">
        <div className="visualization-area" id="search-visualization-container" style={{ gridColumn: 'span 2' }}>
          {algorithm === "binarySearch" && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: gapValue, marginTop: '2rem' }}>
              {steps[currentStep]?.array.map((num, idx) => {
                const maxVal = Math.max(...steps[currentStep].array, 1);
                const maxBarWidth = isTabletOrBelow ? 20 : 28;
                const baseWidth = Math.floor((isTabletOrBelow ? 360 : 600) / Math.max(steps[currentStep].array.length, 1));
                const barWidth = Math.max(isTabletOrBelow ? 10 : 12, Math.min(maxBarWidth, baseWidth));
                const stepColors = getStepColorArray();
                const heightPx = Math.max(40, Math.round((num / maxVal) * 200));
                const showNumbers = steps[currentStep].array.length <= 25;

                return (
                  <div key={idx} style={{
                    height: `${heightPx}px`,
                    width: `${barWidth}px`,
                    backgroundColor: stepColors[idx],
                    border: `1px solid ${stepColors[idx]}`,
                    borderRadius: "6px 6px 0 0",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    fontSize: barFontSize,
                    fontWeight: "bold",
                    color: "#fff",
                    transition: "all 0.3s ease"
                  }} title={`Value: ${num}, Index: ${idx}`}>
                    {showNumbers && <div>{num}</div>}
                  </div>
                );
              })}
            </div>
          )}
          {algorithm === "binarySearch" && steps[currentStep]?.text && <div className="step-text">{steps[currentStep].text}</div>}
        </div>

        {/* Pseudocode */}
        <div className="theme-card" data-aos="fade-up" data-aos-delay="600">
          <h3>{getAlgorithmName()} Pseudocode</h3>
          <pre className="algorithm-pseudocode">
            {algorithmPseudocode.map(line => <div key={line.code}>{line.code}</div>)}
          </pre>
        </div>
      </div>

      {/* Algorithm Details */}
      <div className="theme-card" data-aos="fade-up" data-aos-delay="700">
        <h3>{getAlgorithmName()} Details</h3>
        <p><strong>Time Complexity:</strong> {algorithmDetails.time}</p>
        <p><strong>Space Complexity:</strong> {algorithmDetails.space}</p>
        <p><strong>Common Uses:</strong> {algorithmDetails.uses?.join(", ")}</p>
      </div>

      {/* Optional Code Explanation */}
      {showCodeExplanation && <CodeExplanation algorithm={algorithm} />}
    </div>
  );
};

export default Searching;
