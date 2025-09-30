import React, { useState, useEffect, useMemo, useCallback } from "react";
import { runAlgorithmAsync, getAlgorithmType } from "../algorithms/runner";

const UnifiedVisualizer = ({
  algorithmName,
  initialArray,
  target: externalTarget = null,
  onStatsUpdate = () => {},
}) => {
  const [array, setArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeedMs, setAnimationSpeedMs] = useState(300);
  const [barMotion, setBarMotion] = useState(true);
  const [localTarget, setLocalTarget] = useState(externalTarget);

  // Apply initialArray from props when provided/changed
  useEffect(() => {
    if (Array.isArray(initialArray) && initialArray.length > 0) {
      setArray([...initialArray]);
      setSteps([]);
      setCurrentStep(0);
    }
  }, [initialArray]);

  // Update local target when external target changes
  useEffect(() => {
    setLocalTarget(externalTarget);
  }, [externalTarget]);

  // Run the algorithm and generate steps
  const runAlgorithm = useCallback(async () => {
    const result = await runAlgorithmAsync(algorithmName, array, localTarget);
    setSteps(result.steps || []);
    setCurrentStep(0);
    setIsAnimating(true);
    return result;
  }, [algorithmName, array, localTarget]);

  // Animate steps
  useEffect(() => {
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
  }, [isAnimating, steps, animationSpeedMs]);

  const algoType = useMemo(() => getAlgorithmType(algorithmName), [algorithmName]);

  const handleStart = useCallback(async () => {
    await runAlgorithm();
  }, [runAlgorithm]);

  const handleReset = useCallback(() => {
    setSteps([]);
    setCurrentStep(0);
    setIsAnimating(false);
    if (Array.isArray(initialArray) && initialArray.length > 0) {
      setArray([...initialArray]);
    }
  }, [initialArray]);

  // Memoize the bar rendering to prevent unnecessary re-renders
  const renderBars = useMemo(() => {
    return array.map((val, idx) => {
      let colorClass = "bar-default";
      let isHighlighted = false;
      const step = steps[currentStep];
      
      if (step) {
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
            transition: barMotion
              ? `height ${animationSpeedMs}ms cubic-bezier(.2,.8,.2,1), background-color 180ms ease`
              : "none",
            transform: isHighlighted ? "scaleY(1.12)" : "scaleY(1)",
          }}
        >
          <span className="bar-value">{val}</span>
        </div>
      );
    });
  }, [array, steps, currentStep, barMotion, animationSpeedMs]);

  return (
    <div className="unified-visualizer">
      <div className="visualization-controls">
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
        
        {algoType === "searching" && (
          <input
            type="number"
            value={localTarget ?? ""}
            onChange={(e) => {
              const newTarget = Number(e.target.value);
              setLocalTarget(newTarget);
              onStatsUpdate({ target: newTarget });
            }}
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

      {algoType === "searching" && localTarget && (
        <p className="target-display">Target: {localTarget}</p>
      )}

      <div className="visualization-container">
        {renderBars}
      </div>
    </div>
  );
};

export default UnifiedVisualizer;