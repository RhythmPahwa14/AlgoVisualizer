import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import AlgorithmVisualizer from "./AlgorithmVisualizer";
import CodeExplanation from "./CodeExplanation";
import SimpleExportControls from "./SimpleExportControls";
import InputPanel from "./InputPanel";
import "../styles/Sorting.css";
import { useMediaQuery } from "react-responsive";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getSampleData, getValidationRule } from "../data/sampleData";

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
import { strandSortWithStop } from "../algorithms/strandSort";

import { sleepSortWithStop } from "../algorithms/sleepSort";
// Enhanced algorithm mappings with improved organization
const ALGORITHM_MAPPINGS = {
  bubbleSort: { 
    name: "Bubble Sort", 
    function: bubbleSortWithStop,
    category: "comparison"
  },
  selectionSort: { 
    name: "Selection Sort", 
    function: selectionSortWithStop,
    category: "comparison"
  },
  strandSort: { 
    name: "Strand Sort", 
    function: strandSortWithStop,
    category: "comparison"
  },
  sleepSort: { 
    name: "Sleep Sort", 
    function: sleepSortWithStop,
    category: "comparison"
  },
  insertionSort: { 
    name: "Insertion Sort", 
    function: insertionSortWithStop,
    category: "comparison"
  },
  mergeSort: { 
    name: "Merge Sort", 
    function: mergeSortWithStop,
    category: "divide-conquer"
  },
  quickSort: { 
    name: "Quick Sort", 
    function: quickSortWithStop,
    category: "divide-conquer"
  },
  radixSort: { 
    name: "Radix Sort", 
    function: radixSortWithStop,
    category: "distribution"
  },
  bucketSort: { 
    name: "Bucket Sort", 
    function: bucketSortWithStop,
    category: "distribution"
  },
  heapSort: { 
    name: "Heap Sort", 
    function: heapSortWithStop,
    category: "selection"
  },
  timSort: { 
    name: "Tim Sort", 
    function: timSortWithStop,
    category: "hybrid"
  },
  introSort: { 
    name: "Intro Sort", 
    function: introSortWithStop,
    category: "hybrid"
  },
  shellSort: { 
    name: "Shell Sort", 
    function: shellSortWithStop,
    category: "comparison"
  },
  cycleSort: { 
    name: "Cycle Sort", 
    function: cycleSortWithStop,
    category: "selection"
  },

};

// Array utilities
const arrayUtils = {
  generateRandomArray: (size) => Array.from({ length: size }, () => Math.floor(Math.random() * 200) + 10),
  parseCustomArray: (input) => input.split(",").map((num) => parseInt(num.trim(), 10)).filter((num) => !Number.isNaN(num))
};

// Performance tracking
const performanceTracker = {
  init: () => ({ comparisons: 0, swaps: 0, time: 0 }),
  update: (currentStats, updates) => ({ ...currentStats, ...updates })
};

// Sorting controls
const sortingControls = {
  stop: (stopRef) => { stopRef.current = true; },
  reset: (stopRef) => { stopRef.current = false; }
};

// Algorithm helpers
const algorithmHelpers = {
  getName: (algorithm) => ALGORITHM_MAPPINGS[algorithm]?.name || "Unknown Algorithm",
  getInfo: (algorithm) => ALGORITHM_INFO.sorting[algorithm] || {
    description: "Algorithm implementation coming soon!",
    timeComplexity: "N/A",
    spaceComplexity: "N/A",
    bestCase: "N/A",
    stable: "N/A",
  }
};

const Sorting = () => {
  const [state, setState] = useState({
    array: [],
    arraySize: 20,
    delay: 100,
    algorithm: "bubbleSort",
    isSorting: false,
    customArrayInput: "",
    inputError: "",
    message: "",
    showCodeExplanation: false,
    statistics: performanceTracker.init()
  });

  const skipNextGenerateRef = useRef(false);
  const stopSortingRef = useRef(false);
  const statsRef = useRef(state.statistics);

  useEffect(() => { statsRef.current = state.statistics; }, [state.statistics]);

  const updateStats = useCallback((partial) => {
    setState(prev => {
      const newStats = performanceTracker.update(prev.statistics, partial);
      statsRef.current = newStats;
      return { ...prev, statistics: newStats };
    });
  }, []);

  const generateArray = useCallback(() => {
    const newArray = arrayUtils.generateRandomArray(state.arraySize);
    setState(prev => ({ ...prev, array: newArray, statistics: performanceTracker.init(), message: "", inputError: "" }));
  }, [state.arraySize]);

  const handleCustomArray = useCallback(() => {
    try {
      const customArray = arrayUtils.parseCustomArray(state.customArrayInput);
      if (customArray.length === 0) return setState(prev => ({ ...prev, inputError: "Please enter valid numbers" }));
      if (customArray.length > 60) return setState(prev => ({ ...prev, inputError: "Array size cannot exceed 60 elements" }));
      skipNextGenerateRef.current = true;
      setState(prev => ({ ...prev, array: customArray, arraySize: customArray.length, statistics: performanceTracker.init(), message: "", inputError: "", customArrayInput: "" }));
    } catch {
      setState(prev => ({ ...prev, inputError: "Invalid input format" }));
    }
  }, [state.customArrayInput]);

  const handleInputPanelData = useCallback((data) => {
    if (!Array.isArray(data)) return setState(prev => ({ ...prev, inputError: "Data must be an array of numbers" }));
    skipNextGenerateRef.current = true;
    setState(prev => ({ ...prev, array: data, arraySize: data.length, statistics: performanceTracker.init(), message: `Loaded custom array with ${data.length} elements`, inputError: "", customArrayInput: "" }));
  }, []);

  const handleStop = useCallback(() => {
    sortingControls.stop(stopSortingRef);
    setState(prev => ({ ...prev, isSorting: false, message: "Sorting stopped" }));
  }, []);

  const getAlgorithmName = useCallback(() => algorithmHelpers.getName(state.algorithm), [state.algorithm]);
  const getAlgorithmInfo = useCallback(() => algorithmHelpers.getInfo(state.algorithm), [state.algorithm]);

  const handleSort = useCallback(async () => {
    if (state.isSorting) return;

    setState(prev => ({ ...prev, isSorting: true, message: `Sorting using ${algorithmHelpers.getName(state.algorithm)}...` }));
    sortingControls.reset(stopSortingRef);

    setState(prev => ({ ...prev, statistics: performanceTracker.init() }));


    const startTime = Date.now();
    const algorithmFunction = ALGORITHM_MAPPINGS[state.algorithm]?.function;
    if (!algorithmFunction) {
      setState(prev => ({ ...prev, message: `${algorithmHelpers.getName(state.algorithm)} implementation coming soon!`, isSorting: false }));
      return;
    }

    try {
      await algorithmFunction(
        state.array,
        (newArray) => setState(prev => ({ ...prev, array: newArray })),
        () => {},
        state.delay,
        stopSortingRef,
        updateStats
      );
      if (!stopSortingRef.current) {
        updateStats({ time: Date.now() - startTime });
        setState(prev => ({ ...prev, message: `Sorting completed using ${algorithmHelpers.getName(state.algorithm)}!` }));
      }
    } catch (e) {
      setState(prev => ({ ...prev, message: e?.message === "Stopped" ? "Sorting stopped." : "An error occurred while sorting.", isSorting: false }));
    } finally {
      setState(prev => ({ ...prev, isSorting: false }));
    }
  }, [state.isSorting, state.algorithm, state.array, state.delay, updateStats]);

  useEffect(() => {
    if (skipNextGenerateRef.current) { skipNextGenerateRef.current = false; return; }
    generateArray();
  }, [state.arraySize, generateArray]);

  const isTabletOrBelow = useMediaQuery({ query: "(max-width: 1024px)" });
  const currentLen = state.array.length || state.arraySize;

  const computeGap = useCallback(() => currentLen > 40 ? (isTabletOrBelow ? "1px" : "2px") : currentLen > 25 ? "3px" : "6px", [currentLen, isTabletOrBelow]);
  const computeBarFontSize = useCallback(() => currentLen > 40 ? "8px" : currentLen > 30 ? "9px" : currentLen > 20 ? "10px" : "11px", [currentLen]);

  const algoOptions = useMemo(() => Object.keys(ALGORITHM_MAPPINGS), []);
  const algorithmInfo = useMemo(() => getAlgorithmInfo(), [getAlgorithmInfo]);
  const algorithmName = useMemo(() => getAlgorithmName(), [getAlgorithmName]);

  const updateState = useCallback((key, value) => setState(prev => ({ ...prev, [key]: value })), []);
  const updateCustomArrayInput = useCallback((value) => updateState('customArrayInput', value), [updateState]);
  const updateAlgorithm = useCallback((value) => updateState('algorithm', value), [updateState]);
  const updateArraySize = useCallback((value) => updateState('arraySize', parseInt(value, 10)), [updateState]);
  const updateDelay = useCallback((value) => updateState('delay', parseInt(value, 10)), [updateState]);
  const toggleCodeExplanation = useCallback(() => updateState('showCodeExplanation', !state.showCodeExplanation), [state.showCodeExplanation, updateState]);

  return (
    <div className="theme-container" data-aos="fade-up" data-aos-duration="1000">
      <h1 className="theme-title">Sorting Algorithms</h1>
      <InputPanel
        dataType="array"
        placeholder="Enter numbers separated by commas (e.g., 64, 34, 25)"
        acceptedFormats={['json', 'csv', 'txt']}
        sampleData={getSampleData('array', 'medium')}
        validationRules={getValidationRule('array')}
        onDataLoaded={handleInputPanelData}
        className="sorting-input-panel"
      />

      <div className="sorting-grid">
        {/* Left column: Controls */}
        <div className="sorting-left">
          <div className="theme-card">
            <div className="theme-card-header no-border"><h3>Controls</h3></div>
            <div className="form-grid tight-grid">
              <div className="form-group">
                <label htmlFor="algorithm-select">Algorithm</label>
                <select id="algorithm-select" value={state.algorithm} onChange={(e) => updateAlgorithm(e.target.value)} disabled={state.isSorting}>
                  {algoOptions.map(algo => <option key={algo} value={algo}>{ALGORITHM_MAPPINGS[algo]?.name}</option>)}
                </select>
              </div>
              <div className="form-group span-2">
                <label htmlFor="custom-array">Custom Array</label>
                <input id="custom-array" type="text" placeholder="e.g., 8,2,5" value={state.customArrayInput} onChange={(e) => updateCustomArrayInput(e.target.value)} disabled={state.isSorting} />
                <div className="row-actions">
                  <button className="btn btn-primary" onClick={handleSort} disabled={state.isSorting}>{state.isSorting ? "Sorting..." : "Start Sort"}</button>
                  <button className="btn btn-secondary" onClick={handleStop} disabled={!state.isSorting}>Stop</button>
                  <button className="btn btn-secondary" onClick={generateArray} disabled={state.isSorting}>Generate Array</button>
                  {state.customArrayInput && <button className="btn btn-secondary" onClick={handleCustomArray} disabled={state.isSorting}>Apply Custom Array</button>}
                </div>
              </div>
            </div>
            {state.inputError && <div className="inline-error">{state.inputError}</div>}
          </div>

          <SimpleExportControls containerId="sort-visualization-container" />

          <div className="theme-card">
            <div className="theme-card-header no-border"><h3>{algorithmName} Information</h3></div>
            <div className="code-like"><div><strong>Description:</strong> {algorithmInfo.description}</div></div>
          </div>

          {state.message && <div className="theme-card"><div className="status-message">{state.message}</div></div>}

          <div className="theme-card">
            <div className="theme-card-header"><h3>Performance Statistics</h3></div>
            <div className="stats-grid">
              <div className="stat-card"><div className="stat-label">Comparisons</div><div className="stat-value">{state.statistics.comparisons}</div></div>
              <div className="stat-card"><div className="stat-label">Swaps/Moves</div><div className="stat-value">{state.statistics.swaps}</div></div>
              <div className="stat-card"><div className="stat-label">Elapsed Time</div><div className="stat-value">{state.statistics.time} ms</div></div>
              <div className="stat-card"><div className="stat-label">Array Size</div><div className="stat-value">{state.array.length}</div></div>
            </div>
          </div>

          <div className="theme-card">
            <div className="theme-card-header between">
              <h3>{algorithmName} - Algorithm Details</h3>
              <button className="code-explanation-btn btn btn-secondary" onClick={toggleCodeExplanation}>View Code Explanation</button>
            </div>
            <div>
              <p className="muted">{algorithmInfo.description}</p>
              <div className="complexity-grid">
                <div className="complexity-item"><span className="complexity-label">Time Complexity:</span> <span className="complexity-value">{algorithmInfo.timeComplexity}</span></div>
                <div className="complexity-item"><span className="complexity-label">Space Complexity:</span> <span className="complexity-value">{algorithmInfo.spaceComplexity}</span></div>
                <div className="complexity-item"><span className="complexity-label">Best Case:</span> <span className="complexity-value">{algorithmInfo.bestCase}</span></div>
                <div className="complexity-item"><span className="complexity-label">Stable:</span> <span className="complexity-value">{algorithmInfo.stable}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Visualization */}
        <div className="sorting-right">
          <div className="theme-card">
            <div className="theme-card-header"><h3>Visualization Controls</h3></div>
            <div className="form-grid tight-grid">
              <div className="form-group">
                <label htmlFor="arraySizeRange">Array Size: {state.arraySize}</label>
                <input id="arraySizeRange" type="range" min="10" max="60" value={state.arraySize} onChange={(e) => updateArraySize(e.target.value)} disabled={state.isSorting} />
              </div>
              <div className="form-group">
                <label htmlFor="speedRange">Speed: {state.delay}ms</label>
                <input id="speedRange" type="range" min="20" max="1000" value={state.delay} onChange={(e) => updateDelay(e.target.value)} disabled={state.isSorting} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="sort-visualization-container" className="theme-card visualization-card">
        <div className="theme-card-header"><h3>Visualization - {algorithmName}</h3></div>
        <AlgorithmVisualizer algorithmName={algorithmName} initialArray={state.array} visualOnly={true} barGap={computeGap()} fontSize={computeBarFontSize()} />
      </div>

      <CodeExplanation algorithm={state.algorithm} pseudocode={ALGORITHM_PSEUDOCODE[state.algorithm]} isVisible={state.showCodeExplanation} onClose={() => updateState('showCodeExplanation', false)} />
    </div>
  );
};

export default Sorting;
