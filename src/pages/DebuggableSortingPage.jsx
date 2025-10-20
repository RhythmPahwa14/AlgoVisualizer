// src/pages/DebuggableSortingPage.jsx
import React, { useState } from "react";
import DebuggableSorting from "../components/DebuggableSorting";
import SubscribeButton from "../components/SubscribeButton";

export default function DebuggableSortingPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubbleSort"); // example default

  return (
    <div className="theme-container">
      <h1 className="theme-title">Debuggable Sorting Algorithms Visualizer</h1>
      <p className="theme-description">
        Visualize, debug, and analyze sorting algorithms step by step with advanced debugging capabilities.
      </p>

      {/* 🔔 Subscribe button */}
      <SubscribeButton algorithmId={selectedAlgorithm} />

      <DebuggableSorting onAlgorithmChange={setSelectedAlgorithm} />
    </div>
  );
}