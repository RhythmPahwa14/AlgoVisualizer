import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Search,
  Database,
  BookOpen,
  Users,
  Star,
  GitBranch,
  Code,
} from "lucide-react";
import "../styles/global-theme.css";

// ============================================================================
// 1. ALGORITHM DATABASE
// ============================================================================

const algorithmDatabase = {
  sorting: {
    title: "Sorting Algorithms",
    icon: "🔄",
    color: "#66ccff",
    algorithms: [
      { name: "Bubble Sort", id: "bubbleSort", description: "Compares adjacent elements...", timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" }, implemented: true },
      { name: "Selection Sort", id: "selectionSort", description: "Finds the minimum element...", timeComplexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" }, implemented: true },
      { name: "Insertion Sort", id: "insertionSort", description: "Builds sorted array one element at a time...", timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" }, implemented: true },
      { name: "Merge Sort", id: "mergeSort", description: "Divides array into halves, sorts recursively, and merges...", timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" }, implemented: true },
      { name: "Quick Sort", id: "quickSort", description: "Selects a pivot and partitions array...", timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" }, implemented: true },
    ],
  },
  searching: {
    title: "Search Algorithms",
    icon: "🔍",
    color: "#4ade80",
    algorithms: [
      { name: "Linear Search", id: "linearSearch", description: "Searches sequentially...", timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" }, implemented: true },
      { name: "Binary Search", id: "binarySearch", description: "Searches sorted array by dividing in half...", timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" }, implemented: true },
    ],
  },
  dataStructures: {
    title: "Data Structures",
    icon: "🏗️",
    color: "#ffd93d",
    algorithms: [
      { name: "Linked List", id: "linkedList", description: "Linear data structure...", implemented: false },
      { name: "Stack", id: "stack", description: "LIFO data structure", implemented: false },
      { name: "Queue", id: "queue", description: "FIFO data structure", implemented: false },
      { name: "Binary Tree", id: "binaryTree", description: "Each node has at most two children.", implemented: false },
    ],
  },
  trees: {
    title: "Tree",
    icon: "🌳",
    color: "#4ade80",
    algorithms: [
      { name: "Postorder Traversal", id: "postorder-traversal", description: "Left → Right → Root traversal", implemented: true },
      { name: "Inorder Traversal", id: "inorder-traversal", description: "Left → Root → Right traversal", implemented: true },
      { name: "Preorder Traversal", id: "preorder-traversal", description: "Root → Left → Right traversal", implemented: false },
    ],
  },
  graph: {
    title: "Graph Algorithms",
    icon: "🧭",
    color: "#66ccff",
    algorithms: [
      { name: "BFS", id: "graphBFS", description: "Breadth-first search", implemented: true, subType: "bfs" },
      { name: "DFS", id: "graphDFS", description: "Depth-first search", implemented: true, subType: "dfs" },
      { name: "Dijkstra", id: "graphDijkstra", description: "Shortest path", implemented: true, subType: "dijkstra" },
    ],
  },
  backtracking: {
    title: "Backtracking Algorithms",
    icon: "🧩",
    color: "#f9a825",
    algorithms: [
      { name: "N-Queens", id: "nQueens", description: "Place N queens...", implemented: false, subType: "nQueens" },
      { name: "Sudoku Solver", id: "sudoku", description: "Solve Sudoku...", implemented: false, subType: "sudoku" },
    ],
  },
};

// ============================================================================
// 2. ALGORITHM CARD COMPONENT
// ============================================================================

function AlgorithmCard({ algorithm }) {
  return (
    <div className="theme-card algorithm-card" title={algorithm.description}>
      <div className="card-header">
        <h3 className="card-title">{algorithm.name}</h3>
        {algorithm.implemented ? (
          <span className="status-badge implemented">Implemented</span>
        ) : (
          <span className="status-badge coming-soon">Coming Soon</span>
        )}
      </div>
      <p className="card-description">{algorithm.description}</p>
    </div>
  );
}

// ============================================================================
// 3. MAIN COMPONENT
// ============================================================================

function AlgorithmDocumentation() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredAlgorithms, setFilteredAlgorithms] = useState([]);

  const getAllAlgorithms = useCallback(() => {
    const list = [];
    Object.entries(algorithmDatabase).forEach(([categoryKey, category]) => {
      category.algorithms.forEach((algo) => {
        list.push({ ...algo, category: categoryKey, categoryTitle: category.title });
      });
    });
    return list;
  }, []);

  const categories = useMemo(() => {
    const allAlgorithms = getAllAlgorithms();
    return [
      { key: "all", label: "All", count: allAlgorithms.length },
      { key: "sorting", label: "Sorting", count: algorithmDatabase.sorting?.algorithms.length || 0 },
      { key: "searching", label: "Searching", count: algorithmDatabase.searching?.algorithms.length || 0 },
      { key: "dataStructures", label: "Data Structures", count: algorithmDatabase.dataStructures?.algorithms.length || 0 },
      { key: "trees", label: "Tree", count: algorithmDatabase.trees?.algorithms.length || 0 },
      { key: "graph", label: "Graph", count: algorithmDatabase.graph?.algorithms.length || 0 },
      { key: "backtracking", label: "Backtracking", count: algorithmDatabase.backtracking?.algorithms.length || 0 },
    ];
  }, [getAllAlgorithms]);

  useEffect(() => {
    let allAlgorithms = getAllAlgorithms();
    if (selectedCategory !== "all") {
      allAlgorithms = allAlgorithms.filter((algo) => algo.category === selectedCategory);
    }
    if (searchTerm) {
      allAlgorithms = allAlgorithms.filter(
        (algo) =>
          algo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          algo.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredAlgorithms(allAlgorithms);
  }, [searchTerm, selectedCategory, getAllAlgorithms]);

  return (
    <div className="theme-container">
      <h1 className="theme-title">Algorithm Documentation</h1>

      <div className="theme-card filters-section">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search algorithms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-filters mt-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`btn ${selectedCategory === cat.key ? "btn-primary" : "btn-secondary"} mx-1`}
              onClick={() => setSelectedCategory(cat.key)}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      <div className="results-grid mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredAlgorithms.length > 0 ? (
          filteredAlgorithms.map((algo) => <AlgorithmCard key={algo.id} algorithm={algo} />)
        ) : (
          <div className="no-results-card theme-card text-center p-4">
            <Search size={48} className="mx-auto" />
            <h3>No algorithms found</h3>
            <p>Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AlgorithmDocumentation;
