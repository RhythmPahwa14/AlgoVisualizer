// src/components/MathVisualizer.jsx
import React, { useState, useEffect } from "react";
import "../styles/global-theme.css";

const MathVisualizer = ({
  defaultAlgorithm = "gcdEuclidean",
  autoLoadExample = false
}) => {
  const [algorithm, setAlgorithm] = useState(defaultAlgorithm);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [message, setMessage] = useState("Select an algorithm and run.");

  const copySteps = (arr) => arr.map((row) => Array.isArray(row) ? [...row] : row);

  // ================= Math / Number Theory Algorithms =================

  // 1️⃣ GCD (Euclidean Algorithm)
  const gcdEuclidean = (a = 48, b = 18) => {
    const stepsArr = [];
    while (b !== 0) {
      stepsArr.push({ board: [a, b], message: `Computing gcd(${a}, ${b})` });
      const temp = b;
      b = a % b;
      a = temp;
    }
    stepsArr.push({ board: [a], message: `GCD is ${a}` });
    return stepsArr;
  };

  // 2️⃣ Sieve of Eratosthenes
  const sieveOfEratosthenes = (n = 20) => {
    const stepsArr = [];
    const prime = Array(n + 1).fill(true);
    prime[0] = prime[1] = false;
    for (let p = 2; p * p <= n; p++) {
      if (prime[p]) {
        stepsArr.push({ board: copySteps(prime), message: `Prime found: ${p}` });
        for (let i = p * p; i <= n; i += p) {
          prime[i] = false;
          stepsArr.push({ board: copySteps(prime), message: `Marking ${i} as not prime` });
        }
      }
    }
    stepsArr.push({ board: copySteps(prime), message: `Sieve complete` });
    return stepsArr;
  };

  // 3️⃣ Modular Exponentiation
  const modularExponentiation = (a = 2, b = 10, mod = 1000) => {
    const stepsArr = [];
    let result = 1;
    stepsArr.push({ board: [result], message: `Initial result = ${result}` });
    a = a % mod;
    while (b > 0) {
      if (b & 1) {
        result = (result * a) % mod;
        stepsArr.push({ board: [result], message: `b is odd, multiply result by a -> ${result}` });
      }
      a = (a * a) % mod;
      b >>= 1;
      stepsArr.push({ board: [result, a, b], message: `Square a -> ${a}, halve b -> ${b}` });
    }
    stepsArr.push({ board: [result], message: `Final result = ${result}` });
    return stepsArr;
  };

  // ================= Animation =================
  const runAlgorithm = () => {
    let generatedSteps = [];
    switch (algorithm) {
      case "gcdEuclidean": generatedSteps = gcdEuclidean(); break;
      case "sieveOfEratosthenes": generatedSteps = sieveOfEratosthenes(); break;
      case "modularExponentiation": generatedSteps = modularExponentiation(); break;
      default: setMessage("Algorithm not implemented!"); return;
    }
    if (generatedSteps.length === 0) { setMessage("No steps generated."); return; }
    setSteps(generatedSteps);
    setCurrentStep(0);
    setIsVisualizing(true);
  };

  useEffect(() => {
    if (isVisualizing && steps.length > 0) {
      if (currentStep >= steps.length) { setIsVisualizing(false); setMessage("Visualization complete!"); return; }
      const timer = setTimeout(() => setCurrentStep(prev => prev + 1), 500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isVisualizing, steps]);

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));
  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const resetVisualizer = () => { setSteps([]); setCurrentStep(0); setIsVisualizing(false); setMessage("Select an algorithm and run."); };

  const renderBoard = () => {
    if (!steps[currentStep]) return null;
    const stepBoard = steps[currentStep].board;

    if (Array.isArray(stepBoard) && stepBoard.length && typeof stepBoard[0] === 'boolean') {
      return (
        <div className="board">
          {stepBoard.map((v, i) => (
            <div key={i} className={`cell ${v ? "prime" : "not-prime"}`}>{i}</div>
          ))}
        </div>
      );
    }

    if (Array.isArray(stepBoard) && stepBoard.length && typeof stepBoard[0] === 'number') {
      return <div className="list-visualizer">{stepBoard.map((num, i) => <span key={i} className="list-item">{num}</span>)}</div>;
    }

    return <pre>{JSON.stringify(stepBoard, null, 2)}</pre>;
  };

  return (
    <div className="math-visualizer">
      <h2>Mathematical Algorithm Visualizer</h2>
      <div className="controls">
        <label>Algorithm:</label>
        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} disabled={isVisualizing}>
          <option value="gcdEuclidean">GCD (Euclidean)</option>
          <option value="sieveOfEratosthenes">Sieve of Eratosthenes</option>
          <option value="modularExponentiation">Modular Exponentiation</option>
        </select>
        <button onClick={runAlgorithm} disabled={isVisualizing}>Run</button>
        <button onClick={prevStep} disabled={isVisualizing || currentStep === 0}>Prev</button>
        <button onClick={nextStep} disabled={isVisualizing || currentStep === steps.length - 1}>Next</button>
        <button onClick={resetVisualizer} disabled={isVisualizing}>Reset</button>
      </div>

      {renderBoard()}

      <p className="message-bar">{steps[currentStep]?.message || message}</p>
    </div>
  );
};

export default MathVisualizer;
