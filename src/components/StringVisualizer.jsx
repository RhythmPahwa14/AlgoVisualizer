// src/components/StringVisualizer.jsx
import React, { useState, useEffect } from "react";
import "../styles/global-theme.css";
import { stringAlgorithms } from "../data/allCodes";

const StringVisualizer = ({ defaultAlgorithm = "KMP" }) => {
  const [algorithm, setAlgorithm] = useState(defaultAlgorithm);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [message, setMessage] = useState("Select an algorithm and run.");
  const [inputText, setInputText] = useState("");
  const [pattern, setPattern] = useState("");

  // ================= Helpers =================
  const copySteps = (arr) => arr.map((row) => Array.isArray(row) ? [...row] : row);

  // ================= String Algorithms =================
  const runKMP = () => {
    const text = inputText || "ababcababc";
    const pat = pattern || "ababc";
    const kmpSteps = [];
    const M = pat.length;
    const N = text.length;

    // Compute LPS array
    const lps = Array(M).fill(0);
    let len = 0, i = 1;
    while (i < M) {
      if (pat[i] === pat[len]) {
        len++;
        lps[i] = len;
        kmpSteps.push({ board: copySteps(lps), message: `LPS[${i}] updated to ${len}` });
        i++;
      } else {
        if (len !== 0) len = lps[len - 1];
        else { lps[i] = 0; kmpSteps.push({ board: copySteps(lps), message: `LPS[${i}] set to 0` }); i++; }
      }
    }

    // Search
    let j = 0, idx = 0;
    for (let i = 0; i < N; i++) {
      while (j > 0 && text[i] !== pat[j]) j = lps[j - 1];
      if (text[i] === pat[j]) j++;
      kmpSteps.push({ board: copySteps(Array(N).fill('-').map((_,k) => k === i ? text[i] : '-')), message: `Compare text[${i}] with pattern[${j-1 < 0 ? 0 : j-1}]` });
      if (j === M) {
        kmpSteps.push({ board: copySteps(Array(N).fill('-').map((_,k) => k >= i-M+1 && k <= i ? text[k] : '-')), message: `Pattern found at index ${i-M+1}` });
        j = lps[j - 1];
      }
    }
    return kmpSteps;
  };

  const runRabinKarp = () => {
    const text = inputText || "ababcababc";
    const pat = pattern || "ababc";
    const q = 101, d = 256;
    const N = text.length, M = pat.length;
    const stepsArr = [];
    let h = 1, p = 0, t = 0;
    for (let i = 0; i < M-1; i++) h = (h*d) % q;
    for (let i = 0; i < M; i++) {
      p = (d*p + pat.charCodeAt(i)) % q;
      t = (d*t + text.charCodeAt(i)) % q;
    }
    for (let i = 0; i <= N-M; i++) {
      if (p === t && text.slice(i, i+M) === pat) stepsArr.push({ board: Array(N).fill('-').map((_,k) => k >= i && k < i+M ? text[k] : '-'), message: `Pattern found at index ${i}` });
      if (i < N-M) t = (d*(t - text.charCodeAt(i)*h) + text.charCodeAt(i+M)) % q; 
      if (t < 0) t += q;
    }
    return stepsArr;
  };

  const runZAlgorithm = () => {
    const s = inputText || "ababcababc";
    const n = s.length;
    const Z = Array(n).fill(0);
    const stepsArr = [];
    let l = 0, r = 0;
    for (let i = 1; i < n; i++) {
      if (i <= r) Z[i] = Math.min(r-i+1, Z[i-l]);
      while (i+Z[i] < n && s[Z[i]] === s[i+Z[i]]) Z[i]++;
      if (i+Z[i]-1 > r) { l = i; r = i+Z[i]-1; }
      stepsArr.push({ board: copySteps(Z), message: `Z[${i}] = ${Z[i]}` });
    }
    return stepsArr;
  };

  const runSuffixArray = () => {
    const s = inputText || "banana";
    const stepsArr = [];
    const suffixes = [];
    for (let i = 0; i < s.length; i++) suffixes.push([s.slice(i), i]);
    suffixes.sort((a,b) => a[0].localeCompare(b[0]));
    suffixes.forEach((val, i) => stepsArr.push({ board: suffixes.map(x=>x[1]), message: `Suffix at index ${i}: ${val[0]}` }));
    return stepsArr;
  };

  // ================= Animation =================
  const runAlgorithm = () => {
    let generatedSteps = [];
    switch(algorithm){
      case "KMP": generatedSteps = runKMP(); break;
      case "Rabin-Karp": generatedSteps = runRabinKarp(); break;
      case "Z-Algorithm": generatedSteps = runZAlgorithm(); break;
      case "Suffix-Array": generatedSteps = runSuffixArray(); break;
      default: setMessage("Algorithm not implemented!"); return;
    }
    if(generatedSteps.length === 0){ setMessage("No steps generated."); return; }
    setSteps(generatedSteps);
    setCurrentStep(0);
    setIsVisualizing(true);
  };

  useEffect(() => {
    if (isVisualizing && steps.length > 0) {
      if (currentStep >= steps.length) { setIsVisualizing(false); setMessage("Visualization complete!"); return; }
      const timer = setTimeout(() => setCurrentStep(prev => prev+1), 600);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isVisualizing, steps]);

  const prevStep = () => setCurrentStep(prev => Math.max(prev-1,0));
  const nextStep = () => setCurrentStep(prev => Math.min(prev+1, steps.length-1));
  const resetVisualizer = () => { setSteps([]); setCurrentStep(0); setIsVisualizing(false); setMessage("Select an algorithm and run."); };

  // ================= Render =================
  const renderBoard = () => {
    if(!steps[currentStep]) return null;
    const stepBoard = steps[currentStep].board;
    return (
      <div className="list-visualizer">
        {stepBoard.map((val,i) => <span key={i} className="list-item">{val}</span>)}
      </div>
    );
  };

  return (
    <div className="string-visualizer">
      <h2>String Algorithm Visualizer</h2>
      <div className="controls">
        <label>Algorithm:</label>
        <select value={algorithm} onChange={(e)=>setAlgorithm(e.target.value)} disabled={isVisualizing}>
          <option value="KMP">KMP</option>
          <option value="Rabin-Karp">Rabin-Karp</option>
          <option value="Z-Algorithm">Z-Algorithm</option>
          <option value="Suffix-Array">Suffix-Array</option>
        </select>
        <input placeholder="Text" value={inputText} onChange={(e)=>setInputText(e.target.value)} disabled={isVisualizing} />
        <input placeholder="Pattern" value={pattern} onChange={(e)=>setPattern(e.target.value)} disabled={isVisualizing} />
        <button onClick={runAlgorithm} disabled={isVisualizing}>Run</button>
        <button onClick={prevStep} disabled={isVisualizing || currentStep === 0}>Prev</button>
        <button onClick={nextStep} disabled={isVisualizing || currentStep === steps.length-1}>Next</button>
        <button onClick={resetVisualizer} disabled={isVisualizing}>Reset</button>
      </div>
      {renderBoard()}
      <p className="message-bar">{steps[currentStep]?.message || message}</p>
    </div>
  );
};

export default StringVisualizer;
