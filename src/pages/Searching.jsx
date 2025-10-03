// src/pages/Searching.jsx
import React, { useState, useEffect, useRef } from "react";
import CodeExplanation from "../components/CodeExplanation";
import InputPanel from "../components/InputPanel";
import SimpleExportControls from "../components/SimpleExportControls";
import "../styles/global-theme.css";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { getSampleData, getValidationRule } from "../data/sampleData";
// ⬇️ removed: AOS imports (AOS is initialized in App.jsx)

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
  ternarySearch: [
    { code: "l = 0, r = n - 1", explain: "Initialize search range." },
    { code: "while l <= r", explain: "While the range is valid..." },
    { code: "  mid1 = l + floor((r - l) / 3)", explain: "Calculate first mid index." },
    { code: "  mid2 = r - floor((r - l) / 3)", explain: "Calculate second mid index." },
    { code: "  if arr[mid1] == target", explain: "Target found at mid1." },
    { code: "  else if arr[mid2] == target", explain: "Target found at mid2." },
    { code: "  else if target < arr[mid1]", explain: "Search in the first third (r = mid1 - 1)." },
    { code: "  else if target > arr[mid2]", explain: "Search in the third third (l = mid2 + 1)." },
    { code: "  else", explain: "Search in the middle third (l = mid1 + 1, r = mid2 - 1)." }
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
  cycleSort: [
    { code: "for cycle_start in 0..n-2", explain: "Pick start element of the cycle." },
    { code: "  item = arr[cycle_start]", explain: "Initialize item." },
    { code: "  find correct position of item", explain: "Count smaller elements to the right." },
    { code: "  while item not at correct position", explain: "Rotate cycle by putting item in correct position." },
    { code: "  repeat until cycle is complete", explain: "Continue rotations until back to start." }
  ],
};

const SEARCHING_DETAILS = {
  binarySearch: {
    time: "Best O(1), Average/Worst O(log n)",
    space: "O(1) (iterative)",
    uses: ["Autocomplete prefix boundaries", "Find insert position in sorted data"],
  },
  ternarySearch: {
    time: "Best O(1), Average/Worst O(log₃ n)",
    space: "O(1) (iterative)",
    uses: ["Search in sorted datasets with multiple divisions", "Optimize comparisons when search space can be divided into more parts"],
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
  cycleSort: {
    time: "Best/Average/Worst O(n²)",
    space: "O(1)",
    uses: ["Useful where memory writes are expensive (e.g., flash memory, EEPROM)", "Minimizing writes in embedded systems"],
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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const buildBinarySearchSteps = (array, t) => {
  const s = [];
  let l = 0, r = array.length - 1;
  s.push({ type: "init", l, r, mid: null, array: [...array], pseudoLine: 0, text: `Initialize range l=0, r=${r}.` });
  while (l <= r) {
    s.push({ type: "whileCheck", l, r, mid: null, array: [...array], pseudoLine: 1, text: `Range valid (l=${l}, r=${r}).` });
    const mid = Math.floor((l + r) / 2);
    s.push({ type: "check", l, r, mid, array: [...array], pseudoLine: 2, text: `Checking middle index ${mid}: ${array[mid]} (range ${l}-${r}).` });
    if (array[mid] === t) {
      s.push({ type: "found", l, r, mid, array: [...array], pseudoLine: 3, text: `Found ${t} at index ${mid}.` });
      break;
    } else if (array[mid] < t) {
      s.push({ type: "moveRight", l, r, mid, array: [...array], pseudoLine: 4, text: `${array[mid]} < ${t}; search right half.` });
      l = mid + 1;
    } else {
      s.push({ type: "moveLeft", l, r, mid, array: [...array], pseudoLine: 5, text: `${array[mid]} > ${t}; search left half.` });
      r = mid - 1;
    }
  }
  if (s.length > 0 && s[s.length - 1].type !== "found") {
    s.push({ type: "notFound", l: 0, r: array.length - 1, mid: null, array: [...array], pseudoLine: null, text: `${t} not found.` });
  }
  return s;
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

  // Enhanced handler for InputPanel
  const handleArrayDataLoaded = (arrayData) => {
    try {
      // Ensure data is an array
      if (!Array.isArray(arrayData)) {
        setInputError("Data must be an array of numbers");
        return;
      }

      // Sort the array for searching algorithms
      const sortedArray = [...arrayData].sort((a, b) => a - b);
      setArray(sortedArray);
      setMessage(`Loaded custom array with ${sortedArray.length} elements (auto-sorted for searching)`);
      setInputError("");
      setCustomArrayInput("");
    } catch (err) {
      setInputError(err.message);
    }
  };

  // Step mode (Binary Search)
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const isTabletOrBelow = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const gapValue = getGap(arraySize, isTabletOrBelow);
  const barFontSize = getBarFontSize(arraySize);

  useEffect(() => {
    generateArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arraySize]);

  // Pick algorithm based on /searching/:id (if provided)
  useEffect(() => {
    const allowed = new Set(["linearSearch", "binarySearch", "jumpSearch", "exponentialSearch", "cycleSort"]);
    if (id && allowed.has(id)) setAlgorithm(id);
  }, [id]);

  const generateArray = () => {
    const randomArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100));
    const sorted = randomArray.sort((a, b) => a - b);
    setArray(sorted);
    setMessage("New array generated. Ready to search!");
    setCustomArrayInput("");
    setInputError("");
  };

  const getAlgoLabel = (algo) =>
    ({
      ternarySearch: "Ternary Search",
      binarySearch: "Binary Search",
      linearSearch: "Linear Search",
      jumpSearch: "Jump Search",
      exponentialSearch: "Exponential Search",
    }[algo] || algo);

  // Generate steps for Binary Search when target is valid
  useEffect(() => {
    if (algorithm !== "binarySearch") {
      setSteps([]);
      setCurrentStep(0);
      return;
    }
    const t = parseInt(target, 10);
    if (Number.isNaN(t)) {
      setSteps([]);
      setCurrentStep(0);
      return;
    }
    const s = [];
    let l = 0, r = array.length - 1;
    s.push({ type: "init", l, r, mid: null, array: [...array], pseudoLine: 0, text: `Initialize range l=0, r=${r}.` });
    while (l <= r) {
      s.push({ type: "whileCheck", l, r, mid: null, array: [...array], pseudoLine: 1, text: `Range valid (l=${l}, r=${r}).` });
      const mid = Math.floor((l + r) / 2);
      s.push({ type: "check", l, r, mid, array: [...array], pseudoLine: 2, text: `Checking middle element at index ${mid}: ${array[mid]} (range: ${l}-${r}).` });
      if (array[mid] === t) { s.push({ type: "found", l, r, mid, array: [...array], pseudoLine: 3, text: `Found ${t} at index ${mid}.` }); break; }
      else if (array[mid] < t) { s.push({ type: "moveRight", l, r, mid, array: [...array], pseudoLine: 4, text: `${array[mid]} < ${t}; search right half.` }); l = mid + 1; }
      else { s.push({ type: "moveLeft", l, r, mid, array: [...array], pseudoLine: 5, text: `${array[mid]} > ${t}; search left half.` }); r = mid - 1; }
    }
    if (s.length > 0 && s[s.length - 1].type !== "found") {
      s.push({ type: "notFound", l: 0, r: array.length - 1, mid: null, array: [...array], pseudoLine: null, text: `${t} not found.` });
    }
    setSteps(s);
    setCurrentStep(0);
  }, [algorithm, array, target]);

  useEffect(() => {
    if (algorithm === "exponentialSearch") {
      setMessage("Tip: exponential grows the bound (1,2,4,8,…) then binary-searches the bounded range.");
    }
  }, [algorithm]);

  // ✅ FIX: size highlights from the *step’s* array
  const getStepColorArray = () => {
    if (!steps[currentStep]) return [];
    const step = steps[currentStep];
    const refArr = Array.isArray(step.array) ? step.array : array;
    const n = refArr.length;
    const cols = new Array(n).fill("#2b3a4b");

    const l = typeof step.l === "number" ? step.l : 0;
    const r = typeof step.r === "number" ? step.r : n - 1;
    for (let i = l; i <= r && i < n; i++) cols[i] = "#66ccff";

    if (typeof step.mid === "number" && step.mid >= 0 && step.mid < n) {
      cols[step.mid] = step.type === "found" ? "#4ade80" : "#ff6b6b";
    }
    if (step.type === "notFound") return new Array(n).fill("#ff6b6b");
    return cols;
  };

  const handleNextStep = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const handlePrevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSearch = async () => {
  let searchArray = array;

  if (customArrayInput.trim() !== "") {
    const parsedArray = customArrayInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "")
      .map(Number);

    if (parsedArray.some(isNaN)) { setInputError("Invalid array. Please enter comma-separated numbers only."); return; }
    if (parsedArray.length === 0) { setInputError("Custom array cannot be empty."); return; }

    parsedArray.sort((a, b) => a - b);
    setArray(parsedArray);
    searchArray = parsedArray;
    setInputError("");
  }

  // --- from here: auto-play binary search steps ---
  const targetValue = parseInt(target, 10);
  if (Number.isNaN(targetValue)) {
    setInputError("Enter a valid number as the target.");
    return;
  }
  setInputError("");
  if (algorithm !== "binarySearch") {
    setMessage(`Autoplay is enabled for Binary Search. (${algorithm} will keep current behavior)`);
    return;
  }

  // Build steps *now* (don’t wait for useEffect) and auto-play them
  const s = buildBinarySearchSteps(searchArray, targetValue);
  setSteps(s);
  setCurrentStep(0);
  setIsSearching(true);
  playRef.current = true;
  setMessage(`Searching for ${targetValue}...`);

  for (let i = 0; i < s.length; i++) {
    if (!playRef.current) break;                 // respect Stop
    setCurrentStep(i);
    // stop immediately when found / finished
    if (s[i].type === "found" || s[i].type === "notFound") break;
    await sleep(delay);
  }

  playRef.current = false;
  setIsSearching(false);
  const last = s[Math.min(currentStep, s.length - 1)] || s[s.length - 1];
  if (s.some(st => st.type === "found")) setMessage("Search complete: target found.");
  else setMessage("Search complete: target not found.");
};


  const getAlgorithmName = () => getAlgoLabel(algorithm);

  return (
    <div className="theme-container" data-aos="fade-up" data-aos-duration="1000">
      <h1 className="theme-title">Searching Algorithms</h1>

      {/* Enhanced Input Panel */}
      <InputPanel
        dataType="array"
        placeholder="Enter numbers separated by commas (e.g., 5, 12, 19, 23, 45) - will be auto-sorted for searching"
        acceptedFormats={['json', 'csv', 'txt']}
        sampleData={getSampleData('array', 'sorted')}
        validationRules={getValidationRule('array')}
        onDataLoaded={handleArrayDataLoaded}
        className="searching-input-panel"
      />

      {/* Top control bar */}
      <div className="theme-card" data-aos="fade-up" data-aos-delay="200">
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label" htmlFor="algorithm-select">Algorithm</label>
            <select
              id="algorithm-select"
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              disabled={isSearching}
              className="form-select"
            >
              {["binarySearch", "linearSearch", "jumpSearch", "ternarySearch", "exponentialSearch"].map((algo) => (
                <option key={algo} value={algo}>{getAlgoLabel(algo)}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="custom-array">Custom Array (Sorted)</label>
            <input
              id="custom-array"
              type="text"
              placeholder="e.g., 5, 12, 19"
              value={customArrayInput}
              onChange={(e) => setCustomArrayInput(e.target.value)}
              disabled={isSearching}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="target-input">Target</label>
            <input
              id="target-input"
              type="number"
              placeholder="Target"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              disabled={isSearching}
              className="form-control"
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={handleSearch} disabled={isSearching}>
              {isSearching ? "Searching..." : "Run Search"}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
               playRef.current = false;
               setIsSearching(false);
                setMessage("Search stopped.");
              }}
              disabled={!isSearching}
            >
              Stop
            </button>

            <button className="btn btn-secondary" onClick={generateArray} disabled={isSearching}>
              Generate Array
            </button>
          </div>
        </div>
        {inputError && <div style={{ color: "var(--theme-status-danger)", textAlign: "center", marginTop: "1rem" }}>{inputError}</div>}
      </div>

      {/* Controls & Export */}
      <div className="form-grid" data-aos="fade-up" data-aos-delay="300">
        <div className="theme-card">
          <div className="theme-card-header">
            <h3>Visualization Controls</h3>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="arraySizeRange">Array Size: {arraySize}</label>
            <input
              id="arraySizeRange"
              type="range"
              min="10" max="50"
              value={arraySize}
              onChange={(e) => setArraySize(parseInt(e.target.value))}
              disabled={isSearching}
              className="form-range"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="speedRange">Speed: {delay}ms</label>
            <input
              id="speedRange"
              type="range"
              min="50" max="1000"
              value={delay}
              onChange={(e) => setDelay(parseInt(e.target.value))}
              disabled={isSearching}
              className="form-range"
            />
          </div>
        </div>

        <SimpleExportControls containerId="search-visualization-container" />
      </div>

      {message && <div style={{ textAlign: "center", color: "var(--theme-status-info)", fontWeight: 600, margin: "1rem 0" }}>{message}</div>}

      {/* Step Navigation (Binary only) */}
      {algorithm === "binarySearch" && steps.length > 0 && (
        <div className="theme-card" style={{ padding: '1rem', marginBottom: '1rem' }} data-aos="fade-up" data-aos-delay="400">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-secondary" onClick={handlePrevStep} disabled={currentStep === 0}>Previous Step</button>
              <button className="btn btn-secondary" onClick={handleNextStep} disabled={currentStep >= steps.length - 1}>Next Step</button>
            </div>
            <span style={{ color: "var(--theme-text-secondary)", fontWeight: 600, fontSize: "0.9rem" }}>
              Step {currentStep + 1} / {steps.length}
            </span>
          </div>
        </div>
      )}

      {/* Visualization & Pseudocode */}
      <div className="form-grid" data-aos="fade-up" data-aos-delay="500">
        <div className="visualization-area" id="search-visualization-container" style={{ gridColumn: 'span 2' }}>
          {/* ⛔️ Removed the duplicate AlgorithmVisualizer */}

          {/* ✅ Keep ONLY the step visualization for Binary */}
          {algorithm === "binarySearch"  && (
            <div
              style={{
                position: "relative", /* anchor overlay */
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                height: "100%",
                gap: gapValue,
                marginTop: "2rem"
              }}
            >
              {(() => {
                const data = steps[currentStep]?.array || array;
                const maxVal = Math.max(...data, 1);
                return data.map((num, idx) => {
                  const maxBarWidth = isTabletOrBelow ? 20 : 28;
                  const baseWidth = Math.floor((isTabletOrBelow ? 360 : 600) / Math.max(data.length, 1));
                  const barWidth = Math.max(isTabletOrBelow ? 10 : 12, Math.min(maxBarWidth, baseWidth));
                  const stepColors = steps.length > 0 ? getStepColorArray() : [];
                  const heightPx = Math.max(40, Math.round((num / maxVal) * 200));
                  return (
                    <div
                      key={`${num}-${idx}`}
                      style={{
                        height: `${heightPx}px`,
                        width: `${barWidth}px`,
                        backgroundColor: stepColors[idx] || "#66ccff",
                        border: `1px solid ${stepColors[idx] || "#66ccff"}`,
                        borderRadius: "6px 6px 0 0",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        fontWeight: "bold",
                        fontSize: barFontSize,
                        padding: "4px 2px",
                        transition: "all 0.3s ease",
                        boxShadow: `0 4px 12px ${(stepColors[idx] || "#66ccff")}30`,
                        position: "relative",
                        cursor: "default",
                        color: "#ffffff",
                      }}
                      title={`Value: ${num}, Index: ${idx}`}
                    >
                      {(
                        <div style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)", fontWeight: "bold", fontSize: "inherit", minHeight: "14px", display: "flex", alignItems: "center" }}>
                          {num}
                        </div>
                      )}
                    </div>
                  );
                });
              })()}
            </div>
          )}
              <div
                style={{
                  position: "absolute",
                  top: "30px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "#66ccff",
                  fontSize: "12px",
                  fontWeight: "600",
                  background: "rgba(26, 26, 46, 0.8)",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1px solid rgba(102, 204, 255, 0.3)",
                }}
              >
                Array Size: {steps[currentStep]?.array?.length ?? array.length} | Step Mode
              </div>

          {algorithm === "binarySearch" && steps[currentStep]?.text && (
            <div style={{ color: "#66ccff", fontWeight: 600, marginTop: "8px" }}>
              {steps[currentStep].text}
            </div>
          )}
        </div>

        <div className="theme-card" data-aos="fade-up" data-aos-delay="600">
          <div className="theme-card-header">
            <h3>{getAlgorithmName()} Pseudocode</h3>
          </div>
          <pre style={{ background: 'var(--theme-bg)', borderRadius: '8px', padding: '1rem', color: 'var(--theme-text-secondary)', overflowX: 'auto' }}>
            {(ALGORITHM_PSEUDOCODE[algorithm] || []).map((line) => (
              <div key={line.code}>{line.code}</div>
            ))}
          </pre>
        </div>
      </div>

      {/* Algorithm Details */}
      <div className="theme-card" data-aos="fade-up" data-aos-delay="700">
        <div className="theme-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <h3>{getAlgorithmName()} - Algorithm Details</h3>
          <button className="btn btn-secondary" onClick={() => setShowCodeExplanation(true)}>View Code Explanation</button>
        </div>
        <div>
          <div className="complexity-grid">
            <div className="complexity-item">
              <span className="complexity-label">Time Complexity:</span>
              <span className="complexity-value">{SEARCHING_DETAILS[algorithm]?.time}</span>
            </div>
            <div className="complexity-item">
              <span className="complexity-label">Space Complexity:</span>
              <span className="complexity-value">{SEARCHING_DETAILS[algorithm]?.space}</span>
            </div>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <h4 style={{ color: 'var(--theme-text-primary)', marginBottom: '0.5rem' }}>Real-life Uses:</h4>
            <ul style={{ margin: 0, paddingLeft: "18px", color: "var(--theme-text-secondary)" }}>
              {(SEARCHING_DETAILS[algorithm]?.uses || []).map((use) => (<li key={use}>{use}</li>))}
            </ul>
          </div>
        </div>
      </div>

      <CodeExplanation algorithm={algorithm} isVisible={showCodeExplanation} onClose={() => setShowCodeExplanation(false)} />
    </div>
  );
};

export default Searching;
