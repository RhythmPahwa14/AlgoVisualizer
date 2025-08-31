import React, { useState, useEffect } from 'react';
import { binarySearch } from '../algorithms/binarySearch';
import { exponentialSearch } from '../algorithms/exponentialSearch';
import { linearSearch } from '../algorithms/linearSearch';
import { jumpSearch } from '../algorithms/jumpSearch';
import CodeExplanation from '../components/CodeExplanation';
import SimpleExportControls from '../components/SimpleExportControls';
import '../styles/App.css';
import '../styles/pages.css';
import { useMediaQuery } from "react-responsive";

// Pseudocode for searching algorithms
const ALGORITHM_PSEUDOCODE = {
  binarySearch: [
    { code: 'l = 0, r = n - 1', explain: 'Initialize search range.' },
    { code: 'while l <= r', explain: 'While the range is valid...' },
    { code: '  mid = floor((l + r) / 2)', explain: 'Pick the middle index.' },
    { code: '  if arr[mid] == target', explain: 'Found the target.' },
    { code: '  else if arr[mid] < target', explain: 'Search right half (l = mid + 1).' },
    { code: '  else', explain: 'Search left half (r = mid - 1).' }
  ],
  linearSearch: [
    { code: 'for i in 0..n-1', explain: 'Scan each element.' },
    { code: '  if arr[i] == target', explain: 'Return index.' }
  ],
  jumpSearch: [
    { code: 'step = floor(sqrt(n))', explain: 'Jump size.' },
    { code: 'while arr[min(step,n)-1] < target', explain: 'Jump ahead.' },
    { code: 'linear search in last block', explain: 'Find within block.' }
  ],
  exponentialSearch: [
    { code: 'bound = 1', explain: 'Find range exponentially.' },
    { code: 'while bound < n and arr[bound] < target', explain: 'Grow bound.' },
    { code: 'binary search in [bound/2, min(bound, n-1)]', explain: 'Search within range.' }
  ]
};

// Algorithm details: time, space, and two real-life uses
const SEARCHING_DETAILS = {
  binarySearch: {
    time: 'Best O(1), Average/Worst O(log n)',
    space: 'O(1) (iterative)',
    uses: ['Autocomplete prefix boundaries', 'Find insert position in sorted data']
  },
  linearSearch: {
    time: 'Best O(1), Average/Worst O(n)',
    space: 'O(1)',
    uses: ['Small/unsorted datasets', 'Single-pass scans (e.g., logs)']
  },
  jumpSearch: {
    time: 'O(√n)',
    space: 'O(1)',
    uses: ['Large sorted arrays on disk', 'Index probing with fewer comparisons']
  },
  exponentialSearch: {
    time: 'O(log n) (after range finding)',
    space: 'O(1)',
    uses: ['Unknown/unbounded size arrays', 'Stream data: find range then binary search']
  }
};

function getGap(arraySize, isTabletOrBelow) {
  if (arraySize > 40) return isTabletOrBelow ? '1px' : '2px';
  if (arraySize > 25) return '3px';
  return '6px';
}
function getBarFontSize(arraySize) {
  if (arraySize > 40) return '8px';
  if (arraySize > 30) return '9px';
  if (arraySize > 20) return '10px';
  return '11px';
}

const Searching = () => {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState('');
  const [colorArray, setColorArray] = useState([]);
  const [message, setMessage] = useState('');
  const [delay, setDelay] = useState(500);
  const [arraySize, setArraySize] = useState(20);
  const [algorithm, setAlgorithm] = useState('binarySearch');
  const [showCodeExplanation, setShowCodeExplanation] = useState(false);
  const [isSearching, setIsSearching] = useState(false);


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

  const generateArray = () => {
    const randomArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100));
    const sorted = randomArray.sort((a, b) => a - b);
    setArray(sorted);
    setColorArray(new Array(sorted.length).fill('#66ccff'));
    setMessage('New array generated. Ready to search!');
  };

  const getAlgoLabel = (algo) => ({
    binarySearch: 'Binary Search',
    linearSearch: 'Linear Search',
    jumpSearch: 'Jump Search',
    exponentialSearch: 'Exponential Search'
  }[algo] || algo);

  // Generate steps for Binary Search when target is valid
  useEffect(() => {
    if (algorithm !== 'binarySearch') {
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
    s.push({ type: 'init', l, r, mid: null, array: [...array], pseudoLine: 0, text: `Initialize range l=0, r=${r}.` });
    while (l <= r) {
      s.push({ type: 'whileCheck', l, r, mid: null, array: [...array], pseudoLine: 1, text: `Range valid (l=${l}, r=${r}).` });
      const mid = Math.floor((l + r) / 2);
      s.push({ type: 'check', l, r, mid, array: [...array], pseudoLine: 2, text: `Checking middle element at index ${mid}: ${array[mid]} (range: ${l}-${r}).` });
      if (array[mid] === t) {
        s.push({ type: 'found', l, r, mid, array: [...array], pseudoLine: 3, text: `Found ${t} at index ${mid}.` });
        break;
      } else if (array[mid] < t) {
        s.push({ type: 'moveRight', l, r, mid, array: [...array], pseudoLine: 4, text: `${array[mid]} < ${t}; search right half.` });
        l = mid + 1;
      } else {
        s.push({ type: 'moveLeft', l, r, mid, array: [...array], pseudoLine: 5, text: `${array[mid]} > ${t}; search left half.` });
        r = mid - 1;
      }
    }
    if (s.length > 0 && s[s.length - 1].type !== 'found') {
      s.push({ type: 'notFound', l: 0, r: array.length - 1, mid: null, array: [...array], pseudoLine: null, text: `${t} not found.` });
    }
    setSteps(s);
    setCurrentStep(0);
  }, [algorithm, array, target]);
  const getStepColorArray = () => {
    if (!steps[currentStep]) return colorArray;
    const step = steps[currentStep];
    const n = array.length;
    const cols = new Array(n).fill('#2b3a4b'); // out of range dim
    const l = step.l ?? 0;
    const r = step.r ?? n - 1;
    for (let i = l; i <= r; i++) cols[i] = '#66ccff';
    if (step.mid !== null && step.mid >= 0 && step.mid < n) cols[step.mid] = step.type === 'found' ? '#4ade80' : '#ff6b6b';
    if (step.type === 'notFound') return new Array(n).fill('#ff6b6b');
    return cols;
  };


  const handleNextStep = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const handlePrevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleSearch = async () => {
    const targetValue = parseInt(target, 10);
    if (isNaN(targetValue)) {
      alert('Enter a valid number as target.');
      return;
    }

    setIsSearching(true);
    setMessage(`Search started using ${getAlgoLabel(algorithm)}.`);

    let result = -1;
    try {
      switch (algorithm) {
        case 'linearSearch':
          result = await linearSearch(array, targetValue, setColorArray, delay);
          break;
        case 'jumpSearch':
          result = await jumpSearch(array, targetValue, setColorArray, delay);
          break;
        case 'exponentialSearch':
          result = await exponentialSearch(array, targetValue, setColorArray, delay);
          break;
        default:
          result = await binarySearch(array, targetValue, setColorArray, delay);
          break;
      }
      setMessage(result === -1 ? 'Value not found.' : `Value found at index ${result}.`);
    } finally {
      setIsSearching(false);
    }
  };

  const getAlgorithmName = () => getAlgoLabel(algorithm);


  return (
    <div className="page-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 className="page-title" style={{ textAlign: 'center', marginBottom: '30px' }}>Searching Algorithms</h1>

      {/* Top control bar (select + target + actions) */}
      <div className="controls-section" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '16px' }}>
        <select
          aria-label="Select Algorithm"
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={isSearching}
          className="input"
          style={{ minWidth: '180px' }}
        >
          {['binarySearch', 'linearSearch', 'jumpSearch', 'exponentialSearch'].map((algo) => (
            <option key={algo} value={algo}>{getAlgoLabel(algo)}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Target"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          disabled={isSearching}
          className="input"
          style={{ minWidth: '140px' }}
        />
        <button className="btn" onClick={handleSearch} disabled={isSearching}>
          {isSearching ? 'Searching...' : 'Run Search'}
        </button>
        <button className="btn btn-secondary" onClick={() => { setIsSearching(false); setMessage('Search stopped.'); }} disabled={!isSearching}>Stop</button>
        <button className="btn btn-secondary" onClick={generateArray} disabled={isSearching}>Generate Array</button>
      </div>

      {/* Controls & Export cards */}
       <div
      className="controls-section"
      style={{
        display: "grid",
        gridTemplateColumns: isTabletOrBelow ? "1fr" : "1fr 1fr",
        gap: "24px",
        marginBottom: "12px",
      }}
    >
      {/* Controls Box */}
      <div
        style={{
          background: "rgba(15, 52, 96, 0.1)",
          borderRadius: "15px",
          border: "1px solid rgba(102,204,255,0.2)",
          padding: "20px",
        }}
      >
        <h3 style={{ color: "#66ccff", marginBottom: "12px" }}>
          Visualization Controls
        </h3>

        {/* Array Size Control */}
        <div
          style={{
            display: "flex",
            flexDirection: isTabletOrBelow ? "column" : "row",
            alignItems: isTabletOrBelow ? "flex-start" : "center",
            gap: "10px",
            justifyContent: "space-between",
            marginBottom: "14px",
          }}
        >
          <label
            className="label"
            htmlFor="arraySizeRange"
            style={{ minWidth: isTabletOrBelow ? "auto" : "110px" }}
          >
            Array Size:
          </label>
          <input
            id="arraySizeRange"
            type="range"
            min="10"
            max="50"
            value={arraySize}
            onChange={(e) => setArraySize(parseInt(e.target.value))}
            disabled={isSearching}
            className="input"
            style={{
              width: isTabletOrBelow ? "100%" : "200px",
            }}
          />
          <div
            style={{
              color: "#66ccff",
              fontWeight: 600,
              minWidth: isTabletOrBelow ? "auto" : "140px",
              textAlign: isTabletOrBelow ? "left" : "right",
            }}
          >
            {arraySize}{" "}
            <span style={{ color: "#9bb3c7", fontWeight: 400 }}>
              (with values)
            </span>
          </div>
        </div>

        {/* Speed Control */}
        <div
          style={{
            display: "flex",
            flexDirection: isTabletOrBelow ? "column" : "row",
            alignItems: isTabletOrBelow ? "flex-start" : "center",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <label
            className="label"
            htmlFor="speedRange"
            style={{ minWidth: isTabletOrBelow ? "auto" : "110px" }}
          >
            Speed:
          </label>
          <input
            id="speedRange"
            type="range"
            min="50"
            max="1000"
            value={delay}
            onChange={(e) => setDelay(parseInt(e.target.value))}
            disabled={isSearching}
            className="input"
            style={{
              width: isTabletOrBelow ? "100%" : "200px",
            }}
          />
          <div
            style={{
              color: "#66ccff",
              fontWeight: 600,
              minWidth: isTabletOrBelow ? "auto" : "140px",
              textAlign: isTabletOrBelow ? "left" : "right",
            }}
          >
            {delay}ms{" "}
            <span style={{ color: "#9bb3c7", fontWeight: 400 }}>(fast)</span>
          </div>
        </div>
      </div>

      {/* Export Controls Box */}
      <SimpleExportControls containerId="search-visualization-container" />
    </div>

      {/* Status message line */}
      {message && (
        <div style={{ textAlign: 'right', color: '#66ccff', fontWeight: 600, margin: '8px 0 6px' }}>{message}</div>
      )}

      {/* Step Navigation (Binary Search only) */}
      {algorithm === 'binarySearch' && steps.length > 0 && (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', justifyContent: isMobile ? 'center' : 'flex-start' }}>
          <button className="btn btn-secondary" onClick={handlePrevStep} disabled={currentStep === 0}>Previous Step</button>
          <button className="btn btn-secondary" onClick={handleNextStep} disabled={currentStep >= steps.length - 1}>Next Step</button>
          <span style={{ color: '#66ccff', fontWeight: 600, marginLeft: '15px', fontSize: '14px' }}>Step {currentStep + 1} / {steps.length}</span>
        </div>
      )}

      {/* Visualization & Pseudocode */}
      <div style={{ display: 'flex', flexDirection: isTabletOrBelow ? 'column' : 'row', flexWrap: 'wrap', gap: '30px', alignItems: 'flex-start', marginBottom: '30px' }}>
        <div style={{ flex: '1 1 auto', minWidth: '300px', maxWidth: '100%', overflowX: 'hidden' }}>
          <div id="search-visualization-container" className="visualization-area" style={{ minHeight: '400px', padding: '20px', background: 'rgba(15, 52, 96, 0.1)', borderRadius: '15px', border: '1px solid rgba(102, 204, 255, 0.2)', margin: '20px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '360px', gap: gapValue, padding: '20px 10px 50px 10px', position: 'relative', flexWrap: 'nowrap' }}>
              {(() => {
                const data = steps[currentStep]?.array || array;
                const maxVal = Math.max(...data, 1);
                return data.map((num, idx) => {
                  const maxBarWidth = isTabletOrBelow ? 20 : 28;
                  const baseWidth = Math.floor((isTabletOrBelow ? 360 : 600) / Math.max(arraySize, 1));
                  const barWidth = Math.max(isTabletOrBelow ? 10 : 12, Math.min(maxBarWidth, baseWidth));
                  const showNumbers = arraySize <= 25;
                  const stepColors = steps.length > 0 ? getStepColorArray() : colorArray;
                  const heightPx = Math.max(40, Math.round((num / maxVal) * 280));
                  return (
                    <div
                      key={`${num}-${idx}`}
                      style={{
                        height: `${heightPx}px`,
                        width: `${barWidth}px`,
                        backgroundColor: stepColors[idx] || '#66ccff',
                        border: `1px solid ${stepColors[idx] || '#66ccff'}`,
                        borderRadius: '6px 6px 0 0',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        fontWeight: 'bold',
                        fontSize: barFontSize,
                        padding: '4px 2px',
                        transition: 'all 0.3s ease',
                        boxShadow: `0 4px 12px ${(stepColors[idx] || '#66ccff')}30`,
                        position: 'relative',
                        cursor: 'default',
                        color: '#ffffff'
                      }}
                      title={`Value: ${num}, Index: ${idx}`}
                    >
                      {showNumbers && <div style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', fontWeight: 'bold', fontSize: 'inherit', minHeight: '14px', display: 'flex', alignItems: 'center' }}>{num}</div>}
                    </div>
                  );
                });
              })()}
              <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', color: '#66ccff', fontSize: '12px', fontWeight: '600', background: 'rgba(26, 26, 46, 0.8)', padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(102, 204, 255, 0.3)' }}>
                Array Size: {arraySize} {algorithm === 'binarySearch' && steps.length > 0 ? '| Step Mode' : ''}
              </div>
            </div>
            {algorithm === 'binarySearch' && steps[currentStep]?.text && (
              <div style={{ color: '#66ccff', fontWeight: 600, marginTop: '8px' }}>{steps[currentStep].text}</div>
            )}
          </div>
        </div>

        <div style={{ flex: '0 0 300px', minWidth: '280px', maxWidth: '100%', background: 'rgba(102,204,255,0.07)', border: '1px solid rgba(102,204,255,0.15)', borderRadius: '12px', padding: '18px', overflowX: 'auto' }}>
          <h3 style={{ color: '#66ccff', marginBottom: '10px' }}>{getAlgorithmName()} Pseudocode</h3>
          <pre style={{ background: 'rgba(26,26,46,0.95)', borderRadius: '8px', padding: '14px', fontSize: '15px', color: '#e0e6ed', marginBottom: '10px', overflowX: 'auto' }}>
            {(ALGORITHM_PSEUDOCODE[algorithm] || []).map((line, idx) => (
              <div
                key={line.code}
                style={{
                  background: algorithm === 'binarySearch' && steps.length > 0 && steps[currentStep]?.pseudoLine !== null && ALGORITHM_PSEUDOCODE[algorithm][steps[currentStep]?.pseudoLine]?.code === line.code ? 'rgba(102,204,255,0.25)' : 'none',
                  borderRadius: '5px',
                  padding: '2px 6px',
                  fontWeight: algorithm === 'binarySearch' && steps.length > 0 && ALGORITHM_PSEUDOCODE[algorithm][steps[currentStep]?.pseudoLine]?.code === line.code ? 700 : 400,
                  color: algorithm === 'binarySearch' && steps.length > 0 && ALGORITHM_PSEUDOCODE[algorithm][steps[currentStep]?.pseudoLine]?.code === line.code ? '#66ccff' : '#e0e6ed'
                }}
              >
                {line.code}
              </div>
            ))}
          </pre>
          <div style={{ background: 'rgba(102,204,255,0.08)', borderRadius: '8px', padding: '10px 12px', fontSize: '14px', color: '#b8c5d1', minHeight: '40px' }}>
            <strong>Explanation:</strong>
            <br />
            {algorithm === 'binarySearch' && steps.length > 0 && steps[currentStep]?.pseudoLine !== null
              ? ALGORITHM_PSEUDOCODE[algorithm][steps[currentStep]?.pseudoLine]?.explain
              : 'Enter a target and choose Binary Search to see step-by-step explanation.'}
          </div>
        </div>
      </div>

      {/* Algorithm Details */}
      <div className="algorithm-info" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
          <h3 style={{ margin: 0 }}>{getAlgorithmName()} - Algorithm Details</h3>
          <button className="btn btn-secondary" onClick={() => setShowCodeExplanation(true)}>View Code Explanation</button>
        </div>
        {(() => {
          const meta = SEARCHING_DETAILS[algorithm] || { time: '—', space: '—', uses: [] };
          return (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                <div style={{ background: 'rgba(102, 204, 255, 0.08)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(102, 204, 255, 0.2)' }}>
                  <div style={{ color: '#66ccff', fontWeight: 600, marginBottom: '6px' }}>Time Complexity</div>
                  <div style={{ color: '#e0e6ed' }}>{meta.time}</div>
                </div>
                <div style={{ background: 'rgba(102, 204, 255, 0.08)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(102, 204, 255, 0.2)' }}>
                  <div style={{ color: '#66ccff', fontWeight: 600, marginBottom: '6px' }}>Space Complexity</div>
                  <div style={{ color: '#e0e6ed' }}>{meta.space}</div>
                </div>
              </div>
              <div>
                <div style={{ color: '#66ccff', fontWeight: 600, marginBottom: '6px' }}>Real-life uses</div>
                <ul style={{ margin: 0, paddingLeft: '18px', color: '#e0e6ed' }}>
                  {meta.uses?.slice(0, 2).map((u) => (
                    <li key={u}>{u}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })()}
      </div>

      <CodeExplanation
        algorithm={algorithm}
        isVisible={showCodeExplanation}
        onClose={() => setShowCodeExplanation(false)}
      />
    </div>
  );
};

export default Searching;