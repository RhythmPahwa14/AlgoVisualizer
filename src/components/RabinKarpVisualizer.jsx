import React, { useState, useEffect, useRef } from "react";
import { CheckCircle2, AlertTriangle, Play, Pause, SkipBack, SkipForward, RotateCcw } from "lucide-react";
import "../styles/global-theme.css";

const RabinKarpVisualizer = () => {
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState("");
  const [inputText, setInputText] = useState("");
  const [pattern, setPattern] = useState("");
  const [base, setBase] = useState(256); // d in Rabin-Karp
  const [modulo, setModulo] = useState(101); // q in Rabin-Karp
  const [speed, setSpeed] = useState(500); // Animation speed in ms
  const intervalRef = useRef(null);

  // ================= Sample Data =================
  const samples = {
    "Basic Match": { text: "ABABDABACDABABCABAB", pattern: "ABABCABAB", base: 256, modulo: 101 },
    "No Match": { text: "AAAAA", pattern: "AAAB", base: 256, modulo: 101 },
    "Multiple Matches": { text: "ABABABABA", pattern: "ABA", base: 256, modulo: 101 },
    "Single Character": { text: "HELLO", pattern: "L", base: 256, modulo: 101 },
    "Collision Example": { text: "ABC", pattern: "BCD", base: 10, modulo: 7 }
  };

  // ================= Helpers =================
  const copySteps = (arr) => arr.map((row) => Array.isArray(row) ? [...row] : row);

  // ================= Rabin-Karp Algorithm =================
  const runRabinKarp = () => {
    const text = inputText || "ABABDABACDABABCABAB";
    const pat = pattern || "ABABCABAB";
    const d = base || 256;
    const q = modulo || 101;
    const rabinKarpSteps = [];
    const M = pat.length;
    const N = text.length;

    if (M === 0) {
      rabinKarpSteps.push({
        phase: "complete",
        textIndex: -1,
        patternIndex: -1,
        windowStart: -1,
        windowEnd: -1,
        textHash: 0,
        patternHash: 0,
        rollingHash: [],
        matches: [],
        collisions: [],
        message: "Empty pattern - no preprocessing needed"
      });
      return rabinKarpSteps;
    }

    // Phase 1: Calculate pattern hash
    let patternHash = 0;
    let h = 1; // d^(M-1) % q

    rabinKarpSteps.push({
      phase: "pattern_hash_init",
      textIndex: -1,
      patternIndex: -1,
      windowStart: -1,
      windowEnd: -1,
      textHash: 0,
      patternHash: 0,
      rollingHash: [],
      matches: [],
      collisions: [],
      currentCalculation: "pattern",
      message: `Initializing pattern hash calculation with base=${d}, modulo=${q}`
    });

    // Calculate h = d^(M-1) % q
    for (let i = 0; i < M - 1; i++) {
      h = (h * d) % q;
    }

    // Calculate pattern hash
    for (let i = 0; i < M; i++) {
      patternHash = (d * patternHash + pat.charCodeAt(i)) % q;
      rabinKarpSteps.push({
        phase: "pattern_hash_calc",
        textIndex: -1,
        patternIndex: i,
        windowStart: -1,
        windowEnd: -1,
        textHash: 0,
        patternHash: patternHash,
        rollingHash: [],
        matches: [],
        collisions: [],
        currentCalculation: "pattern",
        message: `Pattern hash: adding '${pat[i]}' (${pat.charCodeAt(i)}), hash = (${d} × ${patternHash - pat.charCodeAt(i) || 0} + ${pat.charCodeAt(i)}) % ${q} = ${patternHash}`
      });
    }

    rabinKarpSteps.push({
      phase: "pattern_hash_complete",
      textIndex: -1,
      patternIndex: -1,
      windowStart: -1,
      windowEnd: -1,
      textHash: 0,
      patternHash: patternHash,
      rollingHash: [],
      matches: [],
      collisions: [],
      currentCalculation: "pattern",
      message: `Pattern hash calculation complete: ${patternHash}`
    });

    // Phase 2: Calculate initial text window hash
    let textHash = 0;
    rabinKarpSteps.push({
      phase: "text_hash_init",
      textIndex: 0,
      patternIndex: -1,
      windowStart: 0,
      windowEnd: M - 1,
      textHash: 0,
      patternHash: patternHash,
      rollingHash: [],
      matches: [],
      collisions: [],
      currentCalculation: "text",
      message: `Calculating initial text window hash for positions 0 to ${M-1}`
    });

    for (let i = 0; i < M; i++) {
      textHash = (d * textHash + text.charCodeAt(i)) % q;
      rabinKarpSteps.push({
        phase: "text_hash_calc",
        textIndex: i,
        patternIndex: -1,
        windowStart: 0,
        windowEnd: M - 1,
        textHash: textHash,
        patternHash: patternHash,
        rollingHash: [],
        matches: [],
        collisions: [],
        currentCalculation: "text",
        message: `Text hash: adding '${text[i]}' (${text.charCodeAt(i)}), hash = (${d} × ${textHash - text.charCodeAt(i) || 0} + ${text.charCodeAt(i)}) % ${q} = ${textHash}`
      });
    }

    // Phase 3: Slide the pattern over text
    const matches = [];
    const collisions = [];

    for (let i = 0; i <= N - M; i++) {
      rabinKarpSteps.push({
        phase: "sliding_window",
        textIndex: i,
        patternIndex: -1,
        windowStart: i,
        windowEnd: i + M - 1,
        textHash: textHash,
        patternHash: patternHash,
        rollingHash: copySteps([textHash]),
        matches: copySteps(matches),
        collisions: copySteps(collisions),
        currentCalculation: "compare",
        message: `Comparing window [${i}..${i+M-1}] with pattern. Text hash: ${textHash}, Pattern hash: ${patternHash}`
      });

      // Check if hashes match
      if (textHash === patternHash) {
        rabinKarpSteps.push({
          phase: "hash_match",
          textIndex: i,
          patternIndex: -1,
          windowStart: i,
          windowEnd: i + M - 1,
          textHash: textHash,
          patternHash: patternHash,
          rollingHash: copySteps([textHash]),
          matches: copySteps(matches),
          collisions: copySteps(collisions),
          currentCalculation: "compare",
          message: `Hash match! Verifying characters...`
        });

        // Verify characters (handle collisions)
        let charMatch = true;
        for (let j = 0; j < M; j++) {
          if (text[i + j] !== pat[j]) {
            charMatch = false;
            break;
          }
        }

        if (charMatch) {
          matches.push(i);
          rabinKarpSteps.push({
            phase: "true_match",
            textIndex: i,
            patternIndex: -1,
            windowStart: i,
            windowEnd: i + M - 1,
            textHash: textHash,
            patternHash: patternHash,
            rollingHash: copySteps([textHash]),
            matches: copySteps(matches),
            collisions: copySteps(collisions),
            currentCalculation: "compare",
            message: `TRUE MATCH! Pattern found at index ${i}`
          });
        } else {
          collisions.push(i);
          rabinKarpSteps.push({
            phase: "spurious_hit",
            textIndex: i,
            patternIndex: -1,
            windowStart: i,
            windowEnd: i + M - 1,
            textHash: textHash,
            patternHash: patternHash,
            rollingHash: copySteps([textHash]),
            matches: copySteps(matches),
            collisions: copySteps(collisions),
            currentCalculation: "compare",
            message: `SPURIOUS HIT! Hash collision at index ${i} - characters don't match`
          });
        }
      }

      // Calculate next hash (rolling hash)
      if (i < N - M) {
        rabinKarpSteps.push({
          phase: "rolling_hash",
          textIndex: i,
          patternIndex: -1,
          windowStart: i,
          windowEnd: i + M - 1,
          textHash: textHash,
          patternHash: patternHash,
          rollingHash: copySteps([textHash]),
          matches: copySteps(matches),
          collisions: copySteps(collisions),
          currentCalculation: "rolling",
          message: `Computing rolling hash for next window [${i+1}..${i+M}]`
        });

        // Remove leading character
        textHash = (textHash - text.charCodeAt(i) * h % q + q) % q;

        // Shift hash
        textHash = (textHash * d) % q;

        // Add trailing character
        textHash = (textHash + text.charCodeAt(i + M)) % q;

        rabinKarpSteps.push({
          phase: "rolling_hash_complete",
          textIndex: i + 1,
          patternIndex: -1,
          windowStart: i + 1,
          windowEnd: i + M,
          textHash: textHash,
          patternHash: patternHash,
          rollingHash: copySteps([textHash]),
          matches: copySteps(matches),
          collisions: copySteps(collisions),
          currentCalculation: "rolling",
          message: `Rolling hash complete. New hash: ${textHash}`
        });
      }
    }

    // Final result message
    const finalMessage = matches.length > 0
      ? `Algorithm complete! Pattern found at index(es): ${matches.join(', ')}`
      : "Algorithm complete! No matches found.";

    rabinKarpSteps.push({
      phase: "complete",
      textIndex: -1,
      patternIndex: -1,
      windowStart: -1,
      windowEnd: -1,
      textHash: textHash,
      patternHash: patternHash,
      rollingHash: copySteps([textHash]),
      matches: copySteps(matches),
      collisions: copySteps(collisions),
      currentCalculation: "complete",
      message: finalMessage
    });

    return rabinKarpSteps;
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

    const generatedSteps = runRabinKarp();
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
      setIsVisualizing(false);
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
      setBase(sample.base);
      setModulo(sample.modulo);
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
  const renderHashVisualization = () => {
    if (!steps[currentStep]) return null;

    const step = steps[currentStep];
    const text = inputText || "ABABDABACDABABCABAB";
    const pat = pattern || "ABABCABAB";

    return (
      <div className="rk-hash-section">
        <h3>Hash Values</h3>
        <div className="hash-display">
          <div className="hash-item">
            <div className="hash-label">Pattern Hash:</div>
            <div className="hash-value">{step.patternHash}</div>
          </div>
          <div className="hash-item">
            <div className="hash-label">Text Window Hash:</div>
            <div className="hash-value">{step.textHash}</div>
          </div>
          <div className="hash-item">
            <div className="hash-label">Base (d):</div>
            <div className="hash-value">{base}</div>
          </div>
          <div className="hash-item">
            <div className="hash-label">Modulo (q):</div>
            <div className="hash-value">{modulo}</div>
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
      <div className="rk-text-pattern-section">
        <h3>Pattern Matching</h3>
        <div className="text-pattern-container">
          {/* Text Display */}
          <div className="text-display">
            <div className="display-label">Text:</div>
            <div className="character-row">
              {text.split('').map((char, i) => (
                <span
                  key={i}
                  className={`char-cell ${
                    step.windowStart <= i && i <= step.windowEnd ? 'current-window' :
                    step.matches.includes(i - pat.length + 1) ? 'match' : ''
                  } ${step.textIndex === i ? 'current-pointer' : ''}`}
                >
                  {char}
                  {step.textIndex === i && <div className="pointer i-pointer">i</div>}
                </span>
              ))}
            </div>
            {step.windowStart >= 0 && (
              <div className="window-indicator">
                Window [{step.windowStart}..{step.windowEnd}]
              </div>
            )}
          </div>

          {/* Pattern Display */}
          <div className="pattern-display">
            <div className="display-label">Pattern:</div>
            <div className="character-row">
              {pat.split('').map((char, j) => (
                <span
                  key={j}
                  className={`char-cell ${
                    step.patternIndex === j ? 'current-pointer' : ''
                  }`}
                >
                  {char}
                  {step.patternIndex === j && <div className="pointer j-pointer">j</div>}
                </span>
              ))}
            </div>
          </div>

          {/* Match/Collision Indicators */}
          {step.matches.length > 0 && (
            <div className="match-indicators">
              <div className="indicator success">
                <CheckCircle2 size={14} /> Matches at: {step.matches.join(', ')}
              </div>
            </div>
          )}
          {step.collisions.length > 0 && (
            <div className="collision-indicators">
              <div className="indicator warning">
                <AlertTriangle size={14} /> Spurious hits at: {step.collisions.join(', ')}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderControls = () => {
    return (
      <div className="rk-controls">
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
            <label>Base (d):</label>
            <input
              type="number"
              value={base}
              onChange={(e) => setBase(Number(e.target.value))}
              placeholder="Base for hash calculation"
              disabled={isVisualizing || isPlaying}
              min="2"
              max="1000"
            />
          </div>
          <div className="input-group">
            <label>Modulo (q):</label>
            <input
              type="number"
              value={modulo}
              onChange={(e) => setModulo(Number(e.target.value))}
              placeholder="Modulo for hash calculation"
              disabled={isVisualizing || isPlaying}
              min="2"
              max="10000"
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
    <div className="rk-visualizer">
      <h2>Rabin-Karp String Matching Visualizer</h2>

      {renderControls()}

      {steps.length > 0 && (
        <div className="visualization-area">
          {renderHashVisualization()}
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

export default RabinKarpVisualizer;
