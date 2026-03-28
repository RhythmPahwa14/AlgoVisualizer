// src/components/StringVisualizer.jsx
import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from "lucide-react";
import "../styles/global-theme.css";
import { stringAlgorithms } from "../data/allCodes";

const StringVisualizer = ({ defaultAlgorithm = "KMP" }) => {
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState("");
  const [inputText, setInputText] = useState("");
  const [pattern, setPattern] = useState("");
  const [speed, setSpeed] = useState(500); // Animation speed in ms
  const intervalRef = useRef(null);

  // ================= Sample Data =================
  const samples = {
    "Basic Match": { text: "ABABDABACDABABCABAB", pattern: "ABABCABAB" },
    "No Match": { text: "AAAAA", pattern: "AAAB" },
    "Multiple Matches": { text: "ABABABABA", pattern: "ABA" },
    "Single Character": { text: "HELLO", pattern: "L" },
    "Empty Pattern": { text: "TEST", pattern: "" }
  };

  // ================= Helpers =================
  const copySteps = (arr) => arr.map((row) => Array.isArray(row) ? [...row] : row);

  // ================= Enhanced KMP Algorithm =================
  const runKMP = () => {
    const text = inputText || "ABABDABACDABABCABAB";
    const pat = pattern || "ABABCABAB";
    const kmpSteps = [];
    const M = pat.length;
    const N = text.length;
    let matchFound = false;
    const matchIndices = [];

    if (M === 0) {
      kmpSteps.push({
        phase: "complete",
        lps: [],
        textIndex: -1,
        patternIndex: -1,
        comparing: [],
        matches: [],
        shifts: [],
        message: "Empty pattern - no preprocessing needed"
      });
      return kmpSteps;
    }

    // Phase 1: LPS Array Construction
    const lps = Array(M).fill(0);
    let len = 0;
    let i = 1;

    kmpSteps.push({
      phase: "lps_construction",
      lps: copySteps(lps),
      textIndex: -1,
      patternIndex: -1,
      comparing: [],
      matches: [],
      shifts: [],
      currentLPSIndex: 0,
      message: "Starting LPS array construction for pattern preprocessing"
    });

    while (i < M) {
      kmpSteps.push({
        phase: "lps_construction",
        lps: copySteps(lps),
        textIndex: -1,
        patternIndex: -1,
        comparing: [i, len],
        matches: [],
        shifts: [],
        currentLPSIndex: i,
        message: `Comparing pattern[${i}]='${pat[i]}' with pattern[${len}]='${pat[len]}'`
      });

      if (pat[i] === pat[len]) {
        len++;
        lps[i] = len;
        kmpSteps.push({
          phase: "lps_construction",
          lps: copySteps(lps),
          textIndex: -1,
          patternIndex: -1,
          comparing: [i, len-1],
          matches: [i],
          shifts: [],
          currentLPSIndex: i,
          message: `Match found! LPS[${i}] = ${len}`
        });
        i++;
      } else {
        if (len !== 0) {
          kmpSteps.push({
            phase: "lps_construction",
            lps: copySteps(lps),
            textIndex: -1,
            patternIndex: -1,
            comparing: [],
            matches: [],
            shifts: [{ from: len, to: lps[len-1] }],
            currentLPSIndex: i,
            message: `Mismatch! Shifting len from ${len} to ${lps[len-1]}`
          });
          len = lps[len - 1];
        } else {
          lps[i] = 0;
          kmpSteps.push({
            phase: "lps_construction",
            lps: copySteps(lps),
            textIndex: -1,
            patternIndex: -1,
            comparing: [],
            matches: [],
            shifts: [],
            currentLPSIndex: i,
            message: `No proper prefix-suffix found. LPS[${i}] = 0`
          });
          i++;
        }
      }
    }

    kmpSteps.push({
      phase: "lps_complete",
      lps: copySteps(lps),
      textIndex: -1,
      patternIndex: -1,
      comparing: [],
      matches: [],
      shifts: [],
      currentLPSIndex: -1,
      message: `LPS array construction complete: [${lps.join(', ')}]`
    });

    // Phase 2: Pattern Matching
    let j = 0; // pattern index

    kmpSteps.push({
      phase: "searching",
      lps: copySteps(lps),
      textIndex: 0,
      patternIndex: 0,
      comparing: [],
      matches: [],
      shifts: [],
      currentLPSIndex: -1,
      message: "Starting pattern matching in text"
    });

    for (let textIdx = 0; textIdx < N; textIdx++) {
      kmpSteps.push({
        phase: "searching",
        lps: copySteps(lps),
        textIndex: textIdx,
        patternIndex: j,
        comparing: [textIdx, j],
        matches: [],
        shifts: [],
        currentLPSIndex: -1,
        message: `Comparing text[${textIdx}]='${text[textIdx]}' with pattern[${j}]='${pat[j]}'`
      });

      if (text[textIdx] === pat[j]) {
        kmpSteps.push({
          phase: "searching",
          lps: copySteps(lps),
          textIndex: textIdx,
          patternIndex: j,
          comparing: [textIdx, j],
          matches: [textIdx],
          shifts: [],
          currentLPSIndex: -1,
          message: `Match! Moving both pointers forward`
        });
        j++;

        if (j === M) {
          // Pattern found
          const matchStart = textIdx - M + 1;
          matchFound = true;
          matchIndices.push(matchStart);
          const matchPositions = [];
          for (let k = 0; k < M; k++) {
            matchPositions.push(matchStart + k);
          }

          kmpSteps.push({
            phase: "match_found",
            lps: copySteps(lps),
            textIndex: textIdx,
            patternIndex: j-1,
            comparing: [],
            matches: matchPositions,
            shifts: [],
            currentLPSIndex: -1,
            message: `Pattern found at index ${matchStart}!`
          });

          // Shift using LPS
          if (j > 0) {
            kmpSteps.push({
              phase: "searching",
              lps: copySteps(lps),
              textIndex: textIdx,
              patternIndex: j-1,
              comparing: [],
              matches: matchPositions,
              shifts: [{ from: j, to: lps[j-1] }],
              currentLPSIndex: -1,
              message: `Shifting pattern pointer from ${j} to ${lps[j-1]} using LPS[${j-1}]`
            });
            j = lps[j - 1];
          }
        }
      } else {
        // Mismatch
        if (j > 0) {
          kmpSteps.push({
            phase: "searching",
            lps: copySteps(lps),
            textIndex: textIdx,
            patternIndex: j,
            comparing: [textIdx, j],
            matches: [],
            shifts: [{ from: j, to: lps[j-1] }],
            currentLPSIndex: -1,
            message: `Mismatch! Shifting pattern pointer from ${j} to ${lps[j-1]}`
          });
          j = lps[j - 1];
          textIdx--; // Stay on same text character
        } else {
          kmpSteps.push({
            phase: "searching",
            lps: copySteps(lps),
            textIndex: textIdx,
            patternIndex: j,
            comparing: [],
            matches: [],
            shifts: [],
            currentLPSIndex: -1,
            message: `Mismatch at start, moving to next text character`
          });
        }
      }
    }

    // Final result message
    const finalMessage = matchFound
      ? `Pattern matching complete! Pattern found at index(es): ${matchIndices.join(', ')}`
      : "Pattern matching complete! No match found.";

    kmpSteps.push({
      phase: "complete",
      lps: copySteps(lps),
      textIndex: -1,
      patternIndex: -1,
      comparing: [],
      matches: [],
      shifts: [],
      currentLPSIndex: -1,
      message: finalMessage
    });

    return kmpSteps;
  };



  // ================= Animation Controls =================
  const runAlgorithm = () => {
    // Input validation
    if (!inputText.trim() && !pattern.trim()) {
      setMessage("Please enter both text and pattern to visualize.");
      return;
    }
    if (!inputText.trim()) {
      setMessage("Please enter text to search in.");
      return;
    }
    if (!pattern.trim()) {
      setMessage("Please enter a pattern to search for.");
      return;
    }

    const generatedSteps = runKMP();
    if(generatedSteps.length === 0){ setMessage("No steps generated."); return; }
    setSteps(generatedSteps);
    setCurrentStep(0);
    setIsVisualizing(false);
    setIsPlaying(false);
    setMessage("Ready to visualize. Use play button to start.");
  };

  const playPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else {
      setIsPlaying(true);
      setIsVisualizing(true);
    }
  };

  const stepBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const stepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === steps.length - 1) {
      // Already at the last step, show the final algorithm result
      setIsVisualizing(false);
      // Keep the final step's message which contains match results
    }
  };

  const resetVisualizer = () => {
    setSteps([]);
    setCurrentStep(0);
    setIsVisualizing(false);
    setIsPlaying(false);
    setMessage("");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const loadSample = (sampleName) => {
    const sample = samples[sampleName];
    if (sample) {
      setInputText(sample.text);
      setPattern(sample.pattern);
    }
  };

  // Animation effect
  useEffect(() => {
    if (isPlaying && steps.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            setIsVisualizing(false);
            // The message will be updated by the useEffect below to show the final step's message
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, steps.length, speed]);

  // Update message when step changes
  useEffect(() => {
    if (steps[currentStep]) {
      setMessage(steps[currentStep].message);
    }
  }, [currentStep, steps]);

  // ================= Render Components =================
  const renderLPSTable = () => {
    if (!steps[currentStep]) return null;

    const step = steps[currentStep];
    const text = inputText || "ABABDABACDABABCABAB";
    const pat = pattern || "ABABCABAB";

    return (
      <div className="kmp-lps-section">
        <h3>LPS (Prefix Function) Table</h3>
        <div className="lps-table">
          <div className="lps-row">
            <div className="lps-cell lps-header">Index</div>
            {pat.split('').map((char, i) => (
              <div key={i} className={`lps-cell lps-header ${step.currentLPSIndex === i ? 'lps-current' : ''}`}>
                {i}
              </div>
            ))}
          </div>
          <div className="lps-row">
            <div className="lps-cell lps-header">Pattern</div>
            {pat.split('').map((char, i) => (
              <div key={i} className={`lps-cell ${step.comparing.includes(i) ? 'lps-comparing' : ''} ${step.matches.includes(i) ? 'lps-match' : ''}`}>
                {char}
              </div>
            ))}
          </div>
          <div className="lps-row">
            <div className="lps-cell lps-header">LPS</div>
            {step.lps.map((val, i) => (
              <div key={i} className={`lps-cell lps-value ${step.currentLPSIndex === i ? 'lps-current' : ''}`}>
                {val}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderTextPatternDisplay = () => {
    if (!steps[currentStep]) return null;

    const step = steps[currentStep];
    const text = inputText || "ABABDABACDABABCABAB";
    const pat = pattern || "ABABCABAB";

    return (
      <div className="kmp-text-pattern-section">
        <h3>Pattern Matching</h3>
        <div className="text-pattern-container">
          {/* Text Display */}
          <div className="text-display">
            <div className="display-label">Text (i={step.textIndex}):</div>
            <div className="character-row">
              {text.split('').map((char, i) => (
                <span
                  key={i}
                  className={`char-cell ${
                    step.comparing.includes(i) ? 'comparing' :
                    step.matches.includes(i) ? 'match' : ''
                  } ${step.textIndex === i ? 'current-pointer' : ''}`}
                >
                  {char}
                  {step.textIndex === i && <div className="pointer i-pointer">i</div>}
                </span>
              ))}
            </div>
          </div>

          {/* Pattern Display */}
          <div className="pattern-display">
            <div className="display-label">Pattern (j={step.patternIndex}):</div>
            <div className="character-row">
              {pat.split('').map((char, j) => (
                <span
                  key={j}
                  className={`char-cell ${
                    step.comparing.includes(j + text.length) ? 'comparing' :
                    step.matches.includes(j + text.length) ? 'match' : ''
                  } ${step.patternIndex === j ? 'current-pointer' : ''}`}
                >
                  {char}
                  {step.patternIndex === j && <div className="pointer j-pointer">j</div>}
                </span>
              ))}
            </div>
          </div>

          {/* Shift Visualization */}
          {step.shifts.length > 0 && (
            <div className="shift-visualization">
              <div className="shift-arrow">
                Pattern shifts from position {step.shifts[0].from} to {step.shifts[0].to}
                <div className="arrow">↓</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderControls = () => {
    return (
      <div className="kmp-controls">
        {/* Input Section */}
        <div className="input-section">
          <div className="input-group">
            <label>Text:</label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to search in"
              disabled={isVisualizing || isPlaying}
            />
          </div>
          <div className="input-group">
            <label>Pattern:</label>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter pattern to search for"
              disabled={isVisualizing || isPlaying}
            />
          </div>
          <div className="input-group">
            <label>Samples:</label>
            <select onChange={(e) => loadSample(e.target.value)} disabled={isVisualizing || isPlaying}>
              <option value="">Choose a sample...</option>
              {Object.keys(samples).map(sample => (
                <option key={sample} value={sample}>{sample}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Animation Controls */}
        <div className="animation-controls">
          <button onClick={runAlgorithm} disabled={isVisualizing || isPlaying} className="btn-run">
            <RotateCcw size={14} /> Run Algorithm
          </button>

          <div className="playback-controls">
            <button onClick={stepBack} disabled={isPlaying || currentStep <= 0 || steps.length === 0} className="btn-step">
              <SkipBack size={14} /> Step Back
            </button>
            <button onClick={playPause} disabled={steps.length === 0} className="btn-play">
              {isPlaying ? <><Pause size={14} /> Pause</> : <><Play size={14} /> Play</>}
            </button>
            <button onClick={stepForward} disabled={isPlaying || currentStep >= steps.length - 1 || steps.length === 0} className="btn-step">
              <SkipForward size={14} /> Step
            </button>
            <button onClick={resetVisualizer} className="btn-reset">
              <RotateCcw size={14} /> Reset
            </button>
          </div>

          <div className="speed-control">
            <label>Speed:</label>
            <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} disabled={isPlaying}>
              <option value={1000}>Slow</option>
              <option value={500}>Medium</option>
              <option value={200}>Fast</option>
            </select>
          </div>
        </div>

        {/* Progress */}
        {steps.length > 0 && (
          <div className="progress-section">
            <div className="progress-info">
              Step {currentStep + 1} of {steps.length}
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="kmp-visualizer">
      <h2>KMP String Matching Visualizer</h2>

      {renderControls()}

      {steps.length > 0 && (
        <div className="visualization-area">
          {renderLPSTable()}
          {renderTextPatternDisplay()}
        </div>
      )}

      <div className="message-section">
        <div className="message-bar">{message}</div>
        {steps[currentStep] && (
          <div className="phase-indicator">
            Phase: {steps[currentStep].phase.replace('_', ' ').toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
};

export default StringVisualizer;
