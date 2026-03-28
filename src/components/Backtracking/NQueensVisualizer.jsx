import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { solveNQueens } from "../../algorithms/backtracking/nQueens";
import { Play, Pause, RotateCcw, StepForward, StepBack, CheckCircle2, CircleX, Undo2 } from "lucide-react";

export default function NQueensVisualizer() {
  const [n, setN] = useState(8);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [board, setBoard] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const intervalRef = useRef(null);

  useEffect(() => {
    const generator = solveNQueens(n);
    setSteps(Array.from(generator));
    setBoard(Array.from({ length: n }, () => Array(n).fill(0)));
    setStepIndex(0);
    setIsPlaying(false);
  }, [n]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => handleStep(1), speed);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, stepIndex, speed]);

  const handleStep = (dir = 1) => {
    const newIndex = Math.min(Math.max(stepIndex + dir, 0), steps.length - 1);
    setStepIndex(newIndex);
    setBoard(steps[newIndex]?.board || []);
  };

  const currentStep = steps[stepIndex] || {};

  return (
    <div className="p-6 space-y-6 text-center">
      <h1 className="text-3xl font-bold text-indigo-600">N-Queens Visualizer</h1>

      {/* Controls */}
      <div className="flex flex-wrap justify-center items-center gap-3">
        <button onClick={() => handleStep(-1)} className="btn">
          <StepBack className="w-5 h-5" />
        </button>
        <button onClick={() => setIsPlaying(p => !p)} className="btn">
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        <button onClick={() => handleStep(1)} className="btn">
          <StepForward className="w-5 h-5" />
        </button>
        <button onClick={() => setStepIndex(0)} className="btn">
          <RotateCcw className="w-5 h-5" />
        </button>
        <div className="ml-4">
          <label className="mr-2 font-medium">Speed:</label>
          <input
            type="range"
            min="100"
            max="1000"
            step="100"
            value={speed}
            onChange={e => setSpeed(Number(e.target.value))}
          />
        </div>
        <div className="ml-4">
          <label className="mr-2 font-medium">Size:</label>
          <input
            type="number"
            min="4"
            max="12"
            value={n}
            onChange={e => setN(+e.target.value)}
            className="border rounded px-2 w-16 text-center"
          />
        </div>
      </div>

      {/* Board */}
      <motion.div
        layout
        className="mx-auto grid border-2 border-gray-500"
        style={{
          gridTemplateColumns: `repeat(${n}, 2rem)`,
          gridTemplateRows: `repeat(${n}, 2rem)`,
        }}
      >
        {board.map((row, i) =>
          row.map((cell, j) => {
            const isConflict =
              currentStep.action === "conflict" &&
              currentStep.row === i &&
              currentStep.col === j;
            return (
              <motion.div
                key={`${i}-${j}`}
                layout
                className={`flex items-center justify-center text-xl border
                ${(i + j) % 2 === 0 ? "bg-gray-100" : "bg-gray-400"}
                ${isConflict ? "bg-red-400" : ""}
              `}
                transition={{ duration: 0.2 }}
              >
                <AnimatePresence>
                  {cell ? (
                    <motion.span
                      key="queen"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      ♛
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </motion.div>

      {/* Info */}
      <div className="text-gray-600">
        Step {stepIndex + 1}/{steps.length} —{" "}
        {currentStep.status === "solution"
          ? <><CheckCircle2 size={14} /> Solution Found!</>
          : currentStep.action === "conflict"
          ? <><CircleX size={14} /> Conflict Detected</>
          : currentStep.action === "place"
          ? "♛ Queen Placed"
          : currentStep.action === "remove"
          ? <><Undo2 size={14} /> Backtracking</>
          : ""}
      </div>
    </div>
  );
}
