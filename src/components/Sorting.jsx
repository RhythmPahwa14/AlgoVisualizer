import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import AlgorithmVisualizer from "./AlgorithmVisualizer";
import CodeExplanation from "./CodeExplanation";
import SimpleExportControls from "./SimpleExportControls";
import "../styles/Sorting.css";
import { useMediaQuery } from "react-responsive";
import AOS from 'aos';
import 'aos/dist/aos.css';

import { ALGORITHM_PSEUDOCODE } from "../data/pseudocode";
import { ALGORITHM_INFO } from "../data/algorithmInfo";

import { bubbleSortWithStop } from "../algorithms/bubbleSort";
import { selectionSortWithStop } from "../algorithms/selectionSort";
import { insertionSortWithStop } from "../algorithms/insertionSort";
import { mergeSortWithStop } from "../algorithms/mergeSort";
import { quickSortWithStop } from "../algorithms/quickSort";
import { radixSortWithStop } from "../algorithms/radixSort";
import { bucketSortWithStop } from "../algorithms/bucketSort";
import { heapSortWithStop } from "../algorithms/heapSort";
import { timSortWithStop } from "../algorithms/timSort";
import { introSortWithStop } from "../algorithms/introSort";
import { shellSortWithStop } from "../algorithms/shellSort";
import { cycleSortWithStop } from "../algorithms/cycleSort";

const algorithmNames = {
  bubbleSort: "Bubble Sort",
  selectionSort: "Selection Sort",
  mergeSort: "Merge Sort",
  insertionSort: "Insertion Sort",
  quickSort: "Quick Sort",
  radixSort: "Radix Sort",
  bucketSort: "Bucket Sort",
  heapSort: "Heap Sort",
  timSort: "Tim Sort",
  introSort: "Intro Sort",
  shellSort: "Shell Sort",
  cycleSort: "Cycle Sort",
};

const algorithms = {
  bubbleSort: bubbleSortWithStop,
  selectionSort: selectionSortWithStop,
  insertionSort: insertionSortWithStop,
  mergeSort: mergeSortWithStop,
  quickSort: quickSortWithStop,
  radixSort: radixSortWithStop,
  bucketSort: bucketSortWithStop,
  heapSort: heapSortWithStop,
  timSort: timSortWithStop,
  introSort: introSortWithStop,
  shellSort: shellSortWithStop,
  cycleSort: cycleSortWithStop,
};

const Sorting = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(20);
  const [delay, setDelay] = useState(100);
  const [algorithm, setAlgorithm] = useState("bubbleSort");
  const [isSorting, setIsSorting] = useState(false);
  const [customArrayInput, setCustomArrayInput] = useState("");
  const [inputError, setInputError] = useState("");
  const [message, setMessage] = useState("");
  const [showCodeExplanation, setShowCodeExplanation] = useState(false);
  const [statistics, setStatistics] = useState({
    comparisons: 0,
    swaps: 0,
    time: 0,
  });

  const skipNextGenerateRef = useRef(false);
  const stopSortingRef = useRef(false);
  const statsRef = useRef(statistics);

  // Keep statsRef in sync with statistics state
  useEffect(() => {
    statsRef.current = statistics;
  }, [statistics]);

  const updateStats = useCallback((partial) => {
    setStatistics(prev => {
      const newStats = { ...prev, ...partial };
      statsRef.current = newStats;
      return newStats;
    });
  }, []);

  const generateArray = useCallback(() => {
    const newArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * 200) + 10
    );
    setArray(newArray);
    setStatistics({ comparisons: 0, swaps: 0, time: 0 });
    setMessage("");
    setInputError("");
  }, [arraySize]);

  const handleCustomArray = useCallback(() => {
    try {
      const customArray = customArrayInput
        .split(",")
        .map((num) => parseInt(num.trim(), 10))
        .filter((num) => !Number.isNaN(num));

      if (customArray.length === 0) {
        setInputError("Please enter valid numbers separated by commas");
        return;
      }
      if (customArray.length > 60) {
        setInputError("Array size cannot exceed 60 elements");
        return;
      }

      skipNextGenerateRef.current = true;
      setArray(customArray);
      setArraySize(customArray.length);
      setStatistics({ comparisons: 0, swaps: 0, time: 0 });
      setMessage("");
      setInputError("");
      setCustomArrayInput("");
    } catch {
      setInputError("Invalid input format");
    }
  }, [customArrayInput]);

  const handleStop = useCallback(() => {
    stopSortingRef.current = true;
    setIsSorting(false);
    setMessage("Sorting stopped");
  }, []);

  const getAlgorithmName = useCallback(() => algorithmNames[algorithm] || "Unknown Algorithm", [algorithm]);

  const getAlgorithmInfo = useCallback(() => 
    ALGORITHM_INFO.sorting[algorithm] || {
      description: "Algorithm implementation coming soon!",
      timeComplexity: "N/A",
      spaceComplexity: "N/A",
      bestCase: "N/A",
      stable: "N/A",
    }, [algorithm]);

  const handleSort = useCallback(async () => {
    if (isSorting) return;

    setIsSorting(true);
    stopSortingRef.current = false;
    setMessage(`Sorting using ${algorithmNames[algorithm]}...`);
    setStatistics({ comparisons: 0, swaps: 0, time: 0 });

    const startTime = Date.now();
    const fn = algorithms[algorithm];

    if (!fn) {
      setMessage(`${algorithmNames[algorithm]} implementation coming soon!`);
      setIsSorting(false);
      return;
    }

    try {
      // Create a wrapper to handle stats updates
      const statsUpdater = (partial) => {
        updateStats(partial);
      };
      
      await fn(
        array,
        setArray,
        () => {}, // colorArray is handled by AlgorithmVisualizer
        delay,
        stopSortingRef,
        statsUpdater
      );
      if (!stopSortingRef.current) {
        const endTime = Date.now();
        updateStats({ time: endTime - startTime });
        setMessage(`Sorting completed using ${algorithmNames[algorithm]}!`);
      }
    } catch (e) {
      if (e && e.message === "Stopped") {
        setMessage("Sorting stopped.");
      } else {
        console.error(e);
        setMessage("An error occurred while sorting.");
      }
    } finally {
      setIsSorting(false);
    }
  }, [isSorting, algorithm, array, delay, updateStats]);

  useEffect(() => {
    if (skipNextGenerateRef.current) {
      skipNextGenerateRef.current = false;
      return;
    }
    generateArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arraySize]);

  const isTabletOrBelow = useMediaQuery({ query: "(max-width: 1024px)" });

  const currentLen = array.length || arraySize;

  const computeGap = useCallback(() => {
    if (currentLen > 40) return isTabletOrBelow ? "1px" : "2px";
    if (currentLen > 25) return "3px";
    return "6px";
  }, [currentLen, isTabletOrBelow]);

  const computeBarFontSize = useCallback(() => {
    if (currentLen > 40) return "8px";
    if (currentLen > 30) return "9px";
    if (currentLen > 20) return "10px";
    return "11px";
  }, [currentLen]);

  const algoOptions = useMemo(() => Object.keys(algorithms), []);

  // Memoize the algorithm info to prevent unnecessary re-renders
  const algorithmInfo = useMemo(() => getAlgorithmInfo(), [getAlgorithmInfo]);
  const algorithmName = useMemo(() => getAlgorithmName(), [getAlgorithmName]);

  return (
    <div className="theme-container" data-aos="fade-up" data-aos-duration="1000">
      <h1 className="theme-title">Sorting Algorithms</h1>

      <div className="sorting-grid">
        {/* LEFT COLUMN */}
        <div className="sorting-left">
          {/* Controls */}
          <div className="theme-card" data-aos="fade-up" data-aos-delay="200">
            <div className="theme-card-header no-border">
              <h3>Controls</h3>
            </div>

            <div className="form-grid tight-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="algorithm-select">
                  Algorithm
                </label>
                <select
                  id="algorithm-select"
                  value={algorithm}
                  onChange={(e) => setAlgorithm(e.target.value)}
                  disabled={isSorting}
                  className="form-select"
                  aria-label="Select sorting algorithm"
                >
                  {algoOptions.map((algo) => (
                    <option key={algo} value={algo}>
                      {algorithmNames[algo]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group span-2">
                <label className="form-label" htmlFor="custom-array">
                  Custom Array
                </label>
                <input
                  id="custom-array"
                  type="text"
                  placeholder="e.g., 8, 2, 5"
                  value={customArrayInput}
                  onChange={(e) => setCustomArrayInput(e.target.value)}
                  disabled={isSorting}
                  className="form-control"
                  aria-label="Enter custom array values separated by commas"
                />
                <div className="row-actions">
                  <button
                    className="btn btn-primary"
                    onClick={handleSort}
                    disabled={isSorting}
                    aria-label={isSorting ? "Sorting in progress" : "Start sorting"}
                  >
                    {isSorting ? "Sorting..." : "Start Sort"}
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={handleStop}
                    disabled={!isSorting}
                    aria-label="Stop sorting"
                  >
                    Stop
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={generateArray}
                    disabled={isSorting}
                    aria-label="Generate new random array"
                  >
                    Generate Array
                  </button>
                  {customArrayInput && (
                    <button
                      className="btn btn-secondary"
                      onClick={handleCustomArray}
                      disabled={isSorting}
                      aria-label="Apply custom array"
                    >
                      Apply Custom Array
                    </button>
                  )}
                </div>
              </div>
            </div>

            {inputError && <div className="inline-error" role="alert">{inputError}</div>}
          </div>

          {/* Visualization controls */}
          <div className="theme-card" data-aos="fade-up" data-aos-delay="300">
            <div className="theme-card-header">
              <h3>Visualization Controls</h3>
            </div>
            <div className="form-grid tight-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="arraySizeRange">
                  Array Size: {arraySize}
                </label>
                <input
                  id="arraySizeRange"
                  type="range"
                  min="10"
                  max="60"
                  value={arraySize}
                  onChange={(e) => setArraySize(parseInt(e.target.value, 10))}
                  disabled={isSorting}
                  className="form-range"
                  aria-label="Adjust array size"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="speedRange">
                  Speed: {delay}ms
                </label>
                <input
                  id="speedRange"
                  type="range"
                  min="20"
                  max="1000"
                  value={delay}
                  onChange={(e) => setDelay(parseInt(e.target.value, 10))}
                  disabled={isSorting}
                  className="form-range"
                  aria-label="Adjust animation speed"
                />
              </div>
            </div>
          </div>

          {/* Export */}
          <SimpleExportControls containerId="sort-visualization-container" />

          {/* Info */}
          <div className="theme-card" data-aos="fade-up" data-aos-delay="400">
            <div className="theme-card-header no-border">
              <h3>{algorithmName} Information</h3>
            </div>
            <div className="code-like">
              <div>
                <strong>Description:</strong> {algorithmInfo.description}
              </div>
            </div>
          </div>

          {/* Status message */}
          {message && (
            <div className="theme-card" data-aos="fade-up" data-aos-delay="500">
              <div className="status-message" role="status">{message}</div>
            </div>
          )}

          {/* Stats */}
          <div className="theme-card" data-aos="fade-up" data-aos-delay="600">
            <div className="theme-card-header">
              <h3>Performance Statistics</h3>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-label">Comparisons</div>
                <div className="stat-value">{statistics.comparisons}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Swaps/Moves</div>
                <div className="stat-value">{statistics.swaps}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Elapsed Time</div>
                <div className="stat-value">{statistics.time} ms</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Array Size</div>
                <div className="stat-value">{array.length}</div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="theme-card" data-aos="fade-up" data-aos-delay="700">
            <div className="theme-card-header between">
              <h3>{algorithmName} - Algorithm Details</h3>
              <button
                className="code-explanation-btn btn btn-secondary"
                onClick={() => setShowCodeExplanation(true)}
                aria-label="View code explanation"
              >
                View Code Explanation
              </button>
            </div>
            <div>
              <p className="muted">{algorithmInfo.description}</p>
              <div className="complexity-grid">
                <div className="complexity-item">
                  <span className="complexity-label">Time Complexity:</span>
                  <span className="complexity-value">
                    {algorithmInfo.timeComplexity}
                  </span>
                </div>
                <div className="complexity-item">
                  <span className="complexity-label">Space Complexity:</span>
                  <span className="complexity-value">
                    {algorithmInfo.spaceComplexity}
                  </span>
                </div>
                <div className="complexity-item">
                  <span className="complexity-label">Best Case:</span>
                  <span className="complexity-value">
                    {algorithmInfo.bestCase}
                  </span>
                </div>
                <div className="complexity-item">
                  <span className="complexity-label">Stable:</span>
                  <span className="complexity-value">
                    {algorithmInfo.stable}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="sorting-right">
          {/* Main visualization */}
          <div 
            id="sort-visualization-container"
            className="theme-card visualization-card" 
            data-aos="fade-up" 
            data-aos-delay="100"
          >
            <div className="theme-card-header">
              <h3>Visualization - {algorithmName}</h3>
            </div>
            <AlgorithmVisualizer
              algorithmName={algorithmName}
              initialArray={array}
              visualOnly={true}
              barGap={computeGap()}
              fontSize={computeBarFontSize()}
            />
          </div>

          {/* Compact stats */}
          <div className="theme-card compact-card" data-aos="fade-up" data-aos-delay="800">
            <div className="theme-card-header no-border">
              <h3>Performance Stats</h3>
            </div>
            <div className="stats-grid compact">
              <div className="stat-card">
                <div className="stat-label">Comparisons</div>
                <div className="stat-value">{statistics.comparisons}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Swaps/Moves</div>
                <div className="stat-value">{statistics.swaps}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Elapsed</div>
                <div className="stat-value">{statistics.time} ms</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Array Size</div>
                <div className="stat-value">{array.length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CodeExplanation
        algorithm={algorithm}
        pseudocode={ALGORITHM_PSEUDOCODE[algorithm]}
        isVisible={showCodeExplanation}
        onClose={() => setShowCodeExplanation(false)}
      />
    </div>
  );
};

export default Sorting;