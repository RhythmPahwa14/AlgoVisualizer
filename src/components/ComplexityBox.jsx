import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import "./complexityBox.css";
import { useAlgorithm } from "../contexts/AlgorithmContext";

// ===================== DATA =====================
const dataMap = {
  BubbleSort: {
    Time: [
      { name: "Best", value: 1, complexity: "O(n)" },
      { name: "Average", value: 2, complexity: "O(n²)" },
      { name: "Worst", value: 2, complexity: "O(n²)" },
    ],
    Space: [{ name: "Memory", value: 1, complexity: "O(1)" }],
  },
  insertionSort: {
    Time: [
      { name: "Best", value: 1, complexity: "O(n)" },
      { name: "Average", value: 2, complexity: "O(n²)" },
      { name: "Worst", value: 2, complexity: "O(n²)" },
    ],
    Space: [{ name: "Memory", value: 1, complexity: "O(1)" }],
  },
  SelectionSort: {
    Time: [
      { name: "Best", value: 2, complexity: "O(n²)" },
      { name: "Average", value: 2, complexity: "O(n²)" },
      { name: "Worst", value: 2, complexity: "O(n²)" },
    ],
    Space: [{ name: "Memory", value: 1, complexity: "O(1)" }],
  },
  MergeSort: {
    Time: [
      { name: "Best", value: 2, complexity: "O(n log n)" },
      { name: "Average", value: 2, complexity: "O(n log n)" },
      { name: "Worst", value: 2, complexity: "O(n log n)" },
    ],
    Space: [{ name: "Memory", value: 2, complexity: "O(n)" }],
  },
  QuickSort: {
    Time: [
      { name: "Best", value: 2, complexity: "O(n log n)" },
      { name: "Average", value: 2, complexity: "O(n log n)" },
      { name: "Worst", value: 3, complexity: "O(n²)" },
    ],
    Space: [{ name: "Memory", value: 2, complexity: "O(log n)" }],
  },
  // ... keep rest of your algorithms here
};

// ===================== COLORS =====================
const COLORS_LIGHT = {
  Best: "#06b6d4",
  Average: "#8b5cf6",
  Worst: "#ec4899",
  Memory: "#84cc16",
  "All Cases": "#f59e0b",
};

const COLORS_DARK = {
  Best: "#22d3ee",
  Average: "#a78bfa",
  Worst: "#f472b6",
  Memory: "#a3e635",
  "All Cases": "#fbbf24",
};

// ===================== TOOLTIP =====================
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, complexity } = payload[0].payload;
    const isDarkMode =
      document.documentElement.getAttribute("data-theme") === "dark";
    return (
      <div
        style={{
          backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
          padding: "10px 14px",
          borderRadius: "8px",
          border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
          color: isDarkMode ? "#e4e6ef" : "#1f2937",
          fontSize: "0.9rem",
          fontWeight: "500",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p style={{ margin: 0, fontWeight: "600", color: "#38bdf8" }}>
          {name} Case
        </p>
        <p style={{ margin: 0 }}>
          ⏱ Complexity: <b>{complexity}</b>
        </p>
      </div>
    );
  }
  return null;
};

// ===================== COMPONENT =====================
const ComplexityBox = () => {
  const { selectedAlgorithm, difficultyLevel } = useAlgorithm();

  const KEY_MAP = {
    bubbleSort: "BubbleSort",
    selectionSort: "SelectionSort",
    insertionSort: "insertionSort",
    mergeSort: "MergeSort",
    quickSort: "QuickSort",
    heapSort: "HeapSort",
    countingSort: "CountingSort",
    radixSort: "RadixSort",
    linearSearch: "LinearSearch",
    binarySearch: "BinarySearch",
    bfs: "BFS",
    dfs: "DFS",
    dijkstra: "Dijkstra",
    bellmanFord: "BellmanFord",
    floydWarshall: "FloydWarshall",
    morrisTraversal: "MorrisTraversal",
    dutchNationalFlag: "DutchNationalFlag",
    kahnAlgorithm: "KahnAlgorithm",
    tarjanAlgorithm: "TarjanAlgorithm",
    towerOfHanoi: "TowerOfHanoi",
    kadaneAlgorithm: "KadaneAlgorithm",
  };

  const initialKey = KEY_MAP[selectedAlgorithm] ?? "BubbleSort";
  const [algo, setAlgo] = useState(initialKey);
  const [metric, setMetric] = useState("Time");
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.getAttribute("data-theme") === "dark"
  );

  useEffect(() => {
    const el = document.documentElement;
    const update = () => setIsDarkMode(el.getAttribute("data-theme") === "dark");
    const observer = new MutationObserver(update);
    observer.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
    update();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selectedAlgorithm && KEY_MAP[selectedAlgorithm]) {
      setAlgo(KEY_MAP[selectedAlgorithm]);
    }
  }, [selectedAlgorithm]);

  const chartData = dataMap[algo]?.[metric] ?? [];
  const colors = isDarkMode ? COLORS_DARK : COLORS_LIGHT;

  return (
    <div className={`complexity-container${isDarkMode ? " force-dark" : ""}`}>
      <h2 className="complexity-title">⚡ Complexity Analysis</h2>
      <p className="complexity-subtitle">
        Big-O Notation for Famous Algorithms
      </p>
      <p style={{ marginBottom: "8px", fontWeight: "600" }}>
        🎯 Difficulty Level: {difficultyLevel}
      </p>

      <div className="dropdown-container">
        <select value={algo} onChange={(e) => setAlgo(e.target.value)}>
          {Object.keys(dataMap).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
        <select value={metric} onChange={(e) => setMetric(e.target.value)}>
          <option value="Time">Time</option>
          <option value="Space">Space</option>
        </select>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} barSize={60}>
            <XAxis
              dataKey="name"
              stroke={isDarkMode ? "#94a3b8" : "#6b7280"}
              tick={{ fill: isDarkMode ? "#cbd5e1" : "#6b7280" }}
            />
            <YAxis
              stroke={isDarkMode ? "#94a3b8" : "#6b7280"}
              tick={{ fill: isDarkMode ? "#cbd5e1" : "#6b7280" }}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Bar dataKey="value" radius={[10, 10, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[entry.name] || "#06b6d4"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        {chartData.length === 0 && (
          <div style={{ padding: 12, textAlign: "center" }}>
            No data for “{algo}”.
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplexityBox;
