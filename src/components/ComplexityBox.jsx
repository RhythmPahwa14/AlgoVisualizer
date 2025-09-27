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
  HeapSort: {
    Time: [
      { name: "Best", value: 2, complexity: "O(n log n)" },
      { name: "Average", value: 2, complexity: "O(n log n)" },
      { name: "Worst", value: 2, complexity: "O(n log n)" },
    ],
    Space: [{ name: "Memory", value: 1, complexity: "O(1)" }],
  },
  CountingSort: {
    Time: [
      { name: "Best", value: 1, complexity: "O(n + k)" },
      { name: "Average", value: 1, complexity: "O(n + k)" },
      { name: "Worst", value: 1, complexity: "O(n + k)" },
    ],
    Space: [{ name: "Memory", value: 3, complexity: "O(n + k)" }],
  },
  RadixSort: {
    Time: [
      { name: "Best", value: 1, complexity: "O(nk)" },
      { name: "Average", value: 1, complexity: "O(nk)" },
      { name: "Worst", value: 1, complexity: "O(nk)" },
    ],
    Space: [{ name: "Memory", value: 3, complexity: "O(n + k)" }],
  },
  LinearSearch: {
    Time: [
      { name: "Best", value: 1, complexity: "O(1)" },
      { name: "Average", value: 1, complexity: "O(n)" },
      { name: "Worst", value: 1, complexity: "O(n)" },
    ],
    Space: [{ name: "Memory", value: 1, complexity: "O(1)" }],
  },
  BinarySearch: {
    Time: [
      { name: "Best", value: 1, complexity: "O(1)" },
      { name: "Average", value: 2, complexity: "O(log n)" },
      { name: "Worst", value: 2, complexity: "O(log n)" },
    ],
    Space: [{ name: "Memory", value: 1, complexity: "O(1)" }],
  },
  BFS: {
    Time: [{ name: "All Cases", value: 2, complexity: "O(V + E)" }],
    Space: [{ name: "Memory", value: 2, complexity: "O(V)" }],
  },
  DFS: {
    Time: [{ name: "All Cases", value: 2, complexity: "O(V + E)" }],
    Space: [{ name: "Memory", value: 2, complexity: "O(V)" }],
  },
  Dijkstra: {
    Time: [{ name: "All Cases", value: 2, complexity: "O(V + E log V)" }],
    Space: [{ name: "Memory", value: 2, complexity: "O(V)" }],
  },
  BellmanFord: {
    Time: [{ name: "All Cases", value: 3, complexity: "O(VE)" }],
    Space: [{ name: "Memory", value: 2, complexity: "O(V)" }],
  },
  FloydWarshall: {
    Time: [{ name: "All Cases", value: 3, complexity: "O(V³)" }],
    Space: [{ name: "Memory", value: 2, complexity: "O(V²)" }],
  },
  MorrisTraversal: {
    Time: [{ name: "All Cases", value: 2, complexity: "O(n)" }],
    Space: [{ name: "Memory", value: 1, complexity: "O(1)" }],
  },
  DutchNationalFlag: {
    Time: [{ name: "All Cases", value: 2, complexity: "O(n)" }],
    Space: [{ name: "Memory", value: 1, complexity: "O(1)" }],
  },
  KahnAlgorithm: {
    Time: [{ name: "All Cases", value: 2, complexity: "O(V + E)" }],
    Space: [{ name: "Memory", value: 2, complexity: "O(V)" }],
  },
  TarjanAlgorithm: {
    Time: [{ name: "All Cases", value: 2, complexity: "O(V + E)" }],
    Space: [{ name: "Memory", value: 2, complexity: "O(V)" }],
  },
  TowerOfHanoi: {
    Time: [{ name: "All Cases", value: 3, complexity: "O(2^n)" }],
    Space: [{ name: "Memory", value: 1, complexity: "O(n)" }],
  },
  KadaneAlgorithm: {
    Time: [{ name: "All Cases", value: 2, complexity: "O(n)" }],
    Space: [{ name: "Memory", value: 1, complexity: "O(1)" }],
  },
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
    // Use data-theme attribute for theme detection
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
// ⬇️ replace: `const ComplexityBox = () => {`
const ComplexityBox = ({ algorithm }) => {
  // map external names ➜ your dataMap keys
  const KEY_MAP = {
    bubbleSort: "BubbleSort",
    selectionSort: "SelectionSort",
    insertionSort: "insertionSort",   // note: your dataMap has this lower-case i
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

  const initialKey = KEY_MAP[algorithm] ?? "BubbleSort";
  const [algo, setAlgo] = useState(initialKey);
  const [metric, setMetric] = useState("Time");
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.getAttribute("data-theme") === "dark"
  );

  // keep dropdown in sync when parent prop changes
  useEffect(() => {
    if (algorithm && KEY_MAP[algorithm]) setAlgo(KEY_MAP[algorithm]);
  }, [algorithm]);

  // SAFE lookup (prevents crash)
  const chartData = dataMap[algo]?.[metric] ?? [];
  const colors = isDarkMode ? COLORS_DARK : COLORS_LIGHT;


  return (
    <div className={`complexity-container${isDarkMode ? " force-dark" : ""}`}>
      <h2 className="complexity-title">⚡ Complexity Analysis</h2>
      <p className="complexity-subtitle">
        Big-O Notation for Famous Algorithms
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
            <XAxis dataKey="name" stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
            <YAxis stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
            <Tooltip content={<CustomTooltip />} />
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
