// src/components/AlgorithmVisualizer.jsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import algorithmsData from "../algorithms/algorithms.json";
import "../styles/UnifiedVisualizer.css";

// Import all your algorithm functions here
import { runAlgorithmAsync, getAlgorithmType } from "../algorithms/runner";

export default function AlgorithmVisualizer({
  algorithmName,
  initialArray,
  visualOnly = false,
  hideTitle = false,
  array: externalArray,
  colorArray,
  barGap,
  fontSize,
}) {
  const [array, setArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [target, setTarget] = useState(null); // For searching
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeedMs, setAnimationSpeedMs] = useState(300); // configurable speed
  const [barMotion, setBarMotion] = useState(true); // enable/disable smooth bar animation

  // Determine algorithm type using centralized runner
  const resolveAlgoType = useCallback((name) => getAlgorithmType(name), []);
  const controlled = useMemo(() => Array.isArray(externalArray), [externalArray]);
 
  // Generate new array
  const generateArray = useCallback(() => {
    if (controlled) return;
    const newArr = Array.from(
      { length: 15 },
      () => Math.floor(Math.random() * 50) + 5
    );
    setArray(newArr);
    setSteps([]);
    setCurrentStep(0);

    // For searching, pick a random target
    const algoType = algorithmsData.find((a) => a.name === algorithmName)?.type;
    if (algoType === "searching") {
      setTarget(newArr[Math.floor(Math.random() * newArr.length)]);
    } else {
      setTarget(null);
    }
  }, [controlled, algorithmName]);

  // Apply initialArray from props when provided/changed
  useEffect(() => {
    if (controlled) return;
    if (Array.isArray(initialArray) && initialArray.length > 0) {
      setArray([...initialArray]);
      setSteps([]);
      setCurrentStep(0);
      const algoType = algorithmsData.find(
        (a) => a.name === algorithmName
      )?.type;
      if (algoType === "searching") {
        setTarget(
          initialArray[Math.floor(Math.random() * initialArray.length)]
        );
      } else {
        setTarget(null);
      }
    }
  }, [initialArray, algorithmName, controlled]);

  // If no initialArray provided, generate a default once on mount
  useEffect(() => {
    if (controlled) return;
    if (!initialArray || initialArray.length === 0) {
      generateArray();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Run the algorithm and generate steps
  useEffect(() => {
    if (visualOnly || controlled) {
      setSteps([]);
      setCurrentStep(0);
      return;
    }
    // Do not auto-run; wait for Start
  }, [visualOnly, controlled]);

  const handleStart = useCallback(() => {
    if (visualOnly || controlled) return; // nothing to animate in visual-only
    (async () => {
      const result = await runAlgorithmAsync(algorithmName, array, target);
      setSteps(result.steps || []);
      setCurrentStep(0);
      setIsAnimating(true);
    })();
  }, [visualOnly, controlled, algorithmName, array, target]);

  const handleReset = useCallback(() => {
    setSteps([]);
    setCurrentStep(0);
    setIsAnimating(false);
    // Reset array to original state
    if (!controlled && Array.isArray(initialArray) && initialArray.length > 0) {
      setArray([...initialArray]);
    } else {
      if (!controlled) generateArray();
    }
  }, [controlled, initialArray, generateArray]);

  // Animate steps
  useEffect(() => {
    if (controlled) return;
    if (!isAnimating || steps.length === 0) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev + 1;
        const step = steps[next];
        if (step && step.type === "swap" && Array.isArray(step.array)) {
          setArray(step.array);
        } else if (step && step.type === "move" && Array.isArray(step.array)) {
          setArray(step.array);
        } else if (step && step.type === "cycle" && Array.isArray(step.array)) {
          setArray(step.array);
        } else if (step && step.type === "done" && Array.isArray(step.array)) {
          setArray(step.array);
        }
        if (next < steps.length - 1) return next;
        clearInterval(interval);
        setIsAnimating(false);
        return next;
      });
    }, Math.max(50, animationSpeedMs));
    return () => clearInterval(interval);
  }, [isAnimating, steps, animationSpeedMs, controlled]);

  const algoType = useMemo(() => resolveAlgoType(algorithmName), [algorithmName, resolveAlgoType]);
  const displayArray = useMemo(() => controlled ? externalArray ?? [] : array, [controlled, externalArray, array]);

  // Memoize the bar rendering to prevent unnecessary re-renders
  const renderBars = useMemo(() => {
    return displayArray.map((val, idx) => {
      let colorClass = "bar-default";
      let isHighlighted = false;
      const step = steps[currentStep];
      if (!visualOnly && !controlled && step) {
        if (step.type === "compare" && Array.isArray(step.indices)) {
          isHighlighted = step.indices.includes(idx);
          if (isHighlighted) colorClass = "bar-compare";
        } else if (step.type === "swap") {
          isHighlighted = step.indices && step.indices.includes(idx);
          if (isHighlighted) colorClass = "bar-swap";
        } else if (step.type === "move") {
          isHighlighted = step.indices && step.indices.includes(idx);
          if (isHighlighted) colorClass = "bar-move";
        } else if (step.type === "cycle") {
          isHighlighted = step.indices && step.indices.includes(idx);
          if (isHighlighted) colorClass = "bar-cycle";
        } else if (step.type === "probe") {
          isHighlighted = step.index === idx;
          if (isHighlighted) colorClass = "bar-probe";
        } else if (step.type === "done") {
          colorClass = "bar-done";
        }
      }

      return (
        <div
          key={idx}
          className={`visualization-bar ${colorClass}`}
          style={{
            height: `${Math.max(val, 2) * 2.2}px`,
            width: "26px",
            backgroundColor: Array.isArray(colorArray) ? colorArray[idx] : undefined,
            transition: barMotion
              ? `height ${animationSpeedMs}ms cubic-bezier(.2,.8,.2,1), background-color 180ms ease`
              : "none",
            transform: isHighlighted ? "scaleY(1.12)" : "scaleY(1)",
          }}
        >
          <span className="bar-value" style={{ fontSize: fontSize ?? undefined }}>{val}</span>
        </div>
      );
    });
  }, [displayArray, visualOnly, controlled, steps, currentStep, colorArray, barMotion, animationSpeedMs, fontSize]);

  return (
    <div className="unified-visualizer">
      {!hideTitle && (
        <h2 className="text-xl font-bold mb-2 text-center text-white">
          {algorithmName ?? "Visualizer"}
        </h2>
      )}
      {!visualOnly && !controlled && (
        <div className="visualization-controls">
          <button 
            onClick={generateArray}
            aria-label="Generate new array"
          >
            Generate Array
          </button>
          <button
            onClick={handleStart}
            disabled={isAnimating}
            aria-label={isAnimating ? "Running algorithm" : "Start algorithm"}
          >
            {isAnimating ? "Running..." : "Start"}
          </button>
          <button
            onClick={() => setIsAnimating(false)}
            disabled={!isAnimating}
            aria-label="Stop algorithm"
          >
            Stop
          </button>
          <button 
            onClick={handleReset}
            aria-label="Reset visualization"
          >
            Reset
          </button>
          {algorithmsData.find((a) => a.name === algorithmName)?.type ===
            "searching" && (
            <input
              type="number"
              value={target ?? ""}
              onChange={(e) => setTarget(Number(e.target.value))}
              placeholder="Target"
              aria-label="Search target value"
            />
          )}
          <div className="speed-control">
            <label>Speed: {animationSpeedMs}ms</label>
            <input
              type="range"
              min="60"
              max="1200"
              step="20"
              value={animationSpeedMs}
              onChange={(e) => setAnimationSpeedMs(Number(e.target.value))}
              aria-label="Animation speed control"
            />
          </div>
          <label>
            <input
              type="checkbox"
              checked={barMotion}
              onChange={(e) => setBarMotion(e.target.checked)}
              aria-label="Toggle smooth animation"
            />
            Smooth animation
          </label>
        </div>
      )}

      {algoType === "searching" && target && (
        <p className="target-display">Target: {target}</p>
      )}
      <div
        className="visualization-container"
        style={{ gap: barGap ? barGap : undefined }}
      >
        {renderBars}
      </div>
    </div>
  );
}