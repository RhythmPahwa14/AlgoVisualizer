import {useNavigate} from "react-router-dom";
 import React, { useState, useEffect, useCallback, useMemo } from "react";
import { 
  Search, 
  Database, 
  BookOpen, 
  Users, 
  Star, 
  GitBranch, 
  Code,
  ArrowDownUp,
  Zap,
  TreeDeciduous,
  Gamepad2,
  Box,
  Hash,
  Boxes,
  Split,
  Wallet,
  Target,
  Brain,
  Network
} from "lucide-react";
import "../styles/global-theme.css";

// ============================================================================
// 1. STATIC DATA & HELPERS
// ============================================================================

const algorithmDatabase = {
  sorting: {
    title: "Sorting Algorithms",
    icon: ArrowDownUp, // Changed from 🔄
    color: "#66ccff",
    algorithms: [
      // ... all your sorting algorithms stay the same
      {
        name: "Bubble Sort",
        id: "bubbleSort",
        description:
          "Compares adjacent elements and swaps them if they are in wrong order. Simple but inefficient for large datasets.",
        timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
        spaceComplexity: "O(1)",
        stability: "Stable",
        inPlace: true,
        adaptivity: "Adaptive",
        implemented: true
      },
      {
        name: "Selection Sort",
        id: "selectionSort",
        description:
          "Finds the minimum element and places it at the beginning. Makes fewer swaps than bubble sort.",
        timeComplexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
        spaceComplexity: "O(1)",
        stability: "Unstable",
        inPlace: true,
        adaptivity: "Not Adaptive",
        implemented: true
      },
      {
        name: "Insertion Sort",
        id: "insertionSort",
        description:
          "Builds sorted array one element at a time. Efficient for small datasets and nearly sorted arrays.",
        timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
        spaceComplexity: "O(1)",
        stability: "Stable",
        inPlace: true,
        adaptivity: "Adaptive",
        implemented: true
      },
      {
        name: "Merge Sort",
        id: "mergeSort",
        description:
          "Divides array into halves, sorts recursively, and merges them. Now includes a note on stability.",
        timeComplexity: {
          best: "O(n log n)",
          average: "O(n log n)",
          worst: "O(n log n)"
        },
        spaceComplexity: "O(n)",
        stability: "Stable",
        inPlace: false,
        adaptivity: "Not Adaptive",
        implemented: true
      },
      {
        name: "Quick Sort",
        id: "quickSort",
        description:
          "Selects a pivot and partitions array around it. Fast average case but can degrade to O(n²).",
        timeComplexity: {
          best: "O(n log n)",
          average: "O(n log n)",
          worst: "O(n²)"
        },
        spaceComplexity: "O(log n)",
        stability: "Unstable",
        inPlace: true,
        adaptivity: "Not Adaptive",
        implemented: true
      },
      {
        name: "Tim Sort",
        id: "timSort",
        description:
          "Hybrid stable sorting algorithm combining Insertion Sort and Merge Sort. Detects natural runs, sorts them, and merges efficiently. Default in Python and Java.",
        timeComplexity: { best: "O(n)", average: "O(n log n)", worst: "O(n log n)" },
        spaceComplexity: "O(n)",
        stability: "Stable",
        inPlace: false,
        adaptivity: "Adaptive (leverages existing runs)",
        implemented: true
      },
      {
        name: "Intro Sort",
        id: "introSort",
        description:
          "Hybrid sorting algorithm that begins with Quick Sort, switches to Heap Sort if recursion depth is too deep, and uses Insertion Sort for small partitions.",
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
        spaceComplexity: "O(log n)",
        stability: "Unstable",
        inPlace: true,
        adaptivity: "Partially Adaptive",
        implemented: true
      },
      {
        name: "Shell Sort",
        id: "shellSort",
        description:
          "In-place comparison-based sorting algorithm that generalizes insertion sort by allowing exchanges of elements that are far apart. Improves on insertion sort by breaking the original list into smaller sublists using a gap sequence, reducing total moves.",
        timeComplexity: { best: "O(n log n)", average: "O(n(log n)^2)", worst: "O(n(log n)^2)" },
        spaceComplexity: "O(1)",
        stability: "Unstable",
        inPlace: true,
        adaptivity: "Not Adaptive",
        implemented: true
      },
      {
        name: "Heap Sort",
        id: "heapSort",
        description:
          "Builds a max heap from the input data, then repeatedly extracts the maximum element and rebuilds the heap. Performs well for large datasets but is unstable.",
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
        spaceComplexity: "O(1)",
        stability: "Unstable",
        inPlace: true,
        adaptivity: "Not Adaptive",
        implemented: true
      },
      {
        name: "Bucket Sort",
        id: "bucketSort",
        description:
          "Distributes elements into buckets, sorts each bucket individually (often using insertion sort), then concatenates them. Works best for uniformly distributed data.",
        timeComplexity: { best: "O(n + k)", average: "O(n + k)", worst: "O(n²)" },
        spaceComplexity: "O(n + k)",
        stability: "Stable (depends on bucket sort used)",
        inPlace: false,
        adaptivity: "Adaptive (depends on data distribution)",
        implemented: true
      }
    ]
  },
  searching: {
    title: "Search Algorithms",
    icon: Search, // Changed from 🔍
    color: "#4ade80",
    algorithms: [
      {
        name: "Linear Search",
        id: "linearSearch",
        description:
          "Searches through array sequentially until target is found. Works on unsorted arrays.",
        timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
        spaceComplexity: "O(1)",
        dataRequirement: "None (works on unsorted data)",
        implemented: true
      },
      {
        name: "Binary Search",
        id: "binarySearch",
        description:
          "Searches sorted array by repeatedly dividing search interval in half. Updated to note efficiency.",
        timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
        spaceComplexity: "O(1)",
        dataRequirement: "Sorted array",
        implemented: true
      },
      {
        name: "Jump Search",
        id: "jumpSearch",
        description:
          "Searches sorted array by jumping ahead by fixed steps and then performing linear search within the block.",
        timeComplexity: { best: "O(1)", average: "O(√n)", worst: "O(√n)" },
        spaceComplexity: "O(1)",
        dataRequirement: "Sorted array",
        implemented: true
      },
      {
        name: "Exponential Search",
        id: "exponentialSearch",
        description:
          "Searches sorted array by finding a range where the element may exist using exponential jumps, then performing binary search within that range.",
        timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
        spaceComplexity: "O(1)",
        dataRequirement: "Sorted array",
        implemented: true
      },
      {
        name: "Ternary Search",
        id: "ternarySearch",
        description:
          "Searches sorted array by dividing it into three parts and determining which part contains the target element.",
        timeComplexity: { best: "O(1)", average: "O(log₃ n)", worst: "O(log₃ n)" },
        spaceComplexity: "O(1)",
        dataRequirement: "Sorted array",
        implemented: true
      }
    ]
  },
  dataStructures: {
    title: "Data Structures",
    icon: Database, // Changed from 🏗️
    color: "#ffd93d",
    algorithms: [
      {
        name: "Linked List",
        id: "linkedList",
        description:
          "Linear data structure where elements are stored in nodes. Now includes traversal note.",
        timeComplexity: {
          insertion: "O(1)",
          deletion: "O(1)",
          search: "O(n)",
          access: "O(n)"
        },
        spaceComplexity: "O(n)",
        implemented: false
      },
      {
        name: "Stack",
        id: "stack",
        description: "Last-In-First-Out (LIFO) data structure.",
        timeComplexity: {
          push: "O(1)",
          pop: "O(1)",
          peek: "O(1)",
          search: "O(n)"
        },
        spaceComplexity: "O(n)",
        implemented: false
      },
      {
        name: "Queue",
        id: "queue",
        description: "First-In-First-Out (FIFO) data structure.",
        timeComplexity: {
          enqueue: "O(1)",
          dequeue: "O(1)",
          front: "O(1)",
          search: "O(n)"
        },
        spaceComplexity: "O(n)",
        implemented: false
      },
      {
        name: "Binary Tree",
        id: "binaryTree",
        description: "Hierarchical data structure where each node has at most two children.",
        timeComplexity: {
          insertion: "O(log n)",
          deletion: "O(log n)",
          search: "O(log n)",
          traversal: "O(n)"
        },
        spaceComplexity: "O(n)",
        implemented: false
      }
    ]
  },
  graph: {
    title: "Graph Algorithms",
    icon: Network, // Changed from 🧭
    color: "#66ccff",
    algorithms: [
      {
        name: "Breadth-First Search (BFS)",
        id: "graphBFS",
        description:
          "Explores the graph level by level from a source, visiting all neighbors before moving deeper. Finds shortest paths by edges in unweighted graphs.",
        timeComplexity: { best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)" },
        spaceComplexity: "O(V)",
        implemented: true,
        subType: "bfs"
      },
      {
        name: "Depth-First Search (DFS)",
        id: "graphDFS",
        description:
          "Explores as deep as possible along each branch before backtracking. Useful for cycle detection, topological sort, and connected components.",
        timeComplexity: { best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)" },
        spaceComplexity: "O(V)",
        implemented: true,
        subType: "dfs"
      },
      {
        name: "Dijkstra's Algorithm",
        id: "graphDijkstra",
        description:
          "Computes shortest path distances from a source to all vertices in a weighted graph with non‑negative weights using a priority queue.",
        timeComplexity: {
          best: "O(E + V log V)",
          average: "O(E + V log V)",
          worst: "O(E + V log V)"
        },
        spaceComplexity: "O(V)",
        implemented: true,
        subType: "dijkstra"
      }
    ]
  },
  backtracking: {
    title: "Backtracking Algorithms",
    icon: Target, // Changed from 🧩
    color: "#f9a825",
    algorithms: [
      {
        name: "N-Queens",
        id: "nQueens",
        description:
          "Place N queens on an N×N chessboard so that no two queens attack each other. Explores all possible placements using backtracking.",
        timeComplexity: { best: "O(N!)", average: "O(N!)", worst: "O(N!)" },
        spaceComplexity: "O(N^2)",
        implemented: false,
        subType: "nQueens"
      },
      {
        name: "Sudoku Solver",
        id: "sudoku",
        description:
          "Solve a 9×9 Sudoku puzzle by filling empty cells following Sudoku rules using backtracking.",
        timeComplexity: { best: "O(1)", average: "O(9^(N*N))", worst: "O(9^(N*N))" },
        spaceComplexity: "O(N^2)",
        implemented: false,
        subType: "sudoku"
      },
      {
        name: "Rat in a Maze",
        id: "ratInMaze",
        description:
          "Find a path for a rat from start to finish in a maze represented as a grid. Backtracking tries all possible paths.",
        timeComplexity: { best: "O(2^(N*M))", average: "O(2^(N*M))", worst: "O(2^(N*M))" },
        spaceComplexity: "O(N*M)",
        implemented: false,
        subType: "ratInMaze"
      },
      {
        name: "Combination Sum",
        id: "combinationSum",
        description:
          "Find all unique combinations of numbers that sum up to a target value. Uses backtracking to explore all possibilities.",
        timeComplexity: { best: "O(2^N)", average: "O(2^N)", worst: "O(2^N)" },
        spaceComplexity: "O(N)",
        implemented: false,
        subType: "combinationSum"
      },
      {
        name: "Word Search",
        id: "wordSearch",
        description:
          "Find a given word in a 2D grid of letters by moving horizontally or vertically. Backtracking explores all paths.",
        timeComplexity: { best: "O(M*N*4^L)", average: "O(M*N*4^L)", worst: "O(M*N*4^L)" },
        spaceComplexity: "O(L)",
        implemented: false,
        subType: "wordSearch"
      }
    ]
  },
  dynamicProgramming: {
    title: "Dynamic Programming",
    icon: Brain, // Changed from 📊
    color: "#f97316",
    algorithms: [
      {
        name: "Fibonacci Sequence",
        id: "fibonacci",
        description:
          "Computes Fibonacci numbers efficiently using dynamic programming (memoization or tabulation).",
        timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
        spaceComplexity: "O(n) or O(1) optimized",
        implemented: true,
        subType: "fibonacci"
      },
      {
        name: "0/1 Knapsack",
        id: "zeroOneKnapsack",
        description:
          "Solves the classic 0/1 Knapsack problem using DP to maximize value within a weight limit.",
        timeComplexity: { best: "O(n*W)", average: "O(n*W)", worst: "O(n*W)" },
        spaceComplexity: "O(n*W)",
        implemented: true,
        subType: "zeroOneKnapsack"
      },
      {
        name: "Coin Change",
        id: "coinChange",
        description: "Finds the minimum number of coins needed to make a given amount using DP.",
        timeComplexity: { best: "O(n*amount)", average: "O(n*amount)", worst: "O(n*amount)" },
        spaceComplexity: "O(amount)",
        implemented: true,
        subType: "coinChange"
      },
      {
        name: "Longest Common Subsequence (LCS)",
        id: "longestCommonSubsequence",
        description:
          "Finds the length of the longest subsequence present in two sequences using DP.",
        timeComplexity: { best: "O(m*n)", average: "O(m*n)", worst: "O(m*n)" },
        spaceComplexity: "O(m*n)",
        implemented: true,
        subType: "lcs"
      },
      {
        name: "Matrix Chain Multiplication",
        id: "matrixChainMultiplication",
        description: "Finds the most efficient way to multiply a sequence of matrices using DP.",
        timeComplexity: { best: "O(n^3)", average: "O(n^3)", worst: "O(n^3)" },
        spaceComplexity: "O(n^2)",
        implemented: true,
        subType: "matrixChainMultiplication"
      },
      {
        name: "Minimum Path Sum",
        id: "minimumPathSum",
        description: "Finds the minimum sum path from top-left to bottom-right in a grid using DP.",
        timeComplexity: { best: "O(m*n)", average: "O(m*n)", worst: "O(m*n)" },
        spaceComplexity: "O(m*n) or O(n) optimized",
        implemented: true,
        subType: "minimumPathSum"
      },
      {
        name: "Subset Sum",
        id: "subsetSum",
        description: "Determines if there is a subset with a given sum using DP.",
        timeComplexity: { best: "O(n*sum)", average: "O(n*sum)", worst: "O(n*sum)" },
        spaceComplexity: "O(n*sum)",
        implemented: true,
        subType: "subsetSum"
      }
    ]
  },
  greedy: {
    title: "Greedy Algorithms",
    icon: Wallet, // Changed from 💰
    color: "#f97316",
    algorithms: [
      {
        name: "Activity Selection",
        id: "activitySelection",
        description:
          "Selects the maximum number of non-overlapping activities from a set based on finish times.",
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
        spaceComplexity: "O(n)",
        implemented: false
      },
      {
        name: "Fractional Knapsack",
        id: "fractionalKnapsack",
        description:
          "Selects items to maximize value with fractional weights allowed. Greedy choice based on value/weight ratio.",
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
        spaceComplexity: "O(1)",
        implemented: false
      },
      {
        name: "Huffman Encoding",
        id: "huffmanEncoding",
        description:
          "Constructs an optimal prefix code tree for data compression using a greedy approach.",
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
        spaceComplexity: "O(n)",
        implemented: false
      },
      {
        name: "Job Scheduling",
        id: "jobScheduling",
        description:
          "Schedules jobs to maximize profit using greedy strategy based on deadlines and profits.",
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
        spaceComplexity: "O(n)",
        implemented: false
      }
    ]
  },
  divideAndConquer: {
    title: "Divide & Conquer",
    icon: Split, // Changed from 🪓
    color: "#a78bfa",
    algorithms: [
      {
        name: "Merge Sort",
        id: "mergeSortDC",
        description: "Divides array into halves, sorts recursively, and merges them.",
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
        spaceComplexity: "O(n)",
        implemented: true
      },
      {
        name: "Quick Sort",
        id: "quickSortDC",
        description: "Partitions array around a pivot and recursively sorts subarrays.",
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
        spaceComplexity: "O(log n)",
        implemented: true
      },
      {
        name: "Binary Search",
        id: "binarySearchDC",
        description: "Searches sorted array by repeatedly halving search space.",
        timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
        spaceComplexity: "O(1)",
        implemented: true
      },
      {
        name: "Maximum Subarray Sum",
        id: "maximumSubarraySumDC",
        description: "Finds the contiguous subarray with maximum sum using divide & conquer.",
        timeComplexity: { best: "O(n)", average: "O(n log n)", worst: "O(n log n)" },
        spaceComplexity: "O(log n)",
        implemented: true
      }
    ]
  },
  hashing: {
    title: "Hashing",
    icon: Hash, // Changed from 🔑
    color: "#ff6b6b",
    algorithms: [
      {
        name: "Hash Table",
        id: "hashTable",
        description: "Implements key-value storage using hashing techniques.",
        timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(n)" },
        spaceComplexity: "O(n)",
        implemented: true
      },
      {
        name: "Chaining Hash",
        id: "chainingHash",
        description: "Collision resolution using linked lists in hash table.",
        timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(n)" },
        spaceComplexity: "O(n)",
        implemented: true
      },
      {
        name: "Open Addressing",
        id: "openAddressing",
        description: "Collision resolution by probing alternative positions.",
        timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(n)" },
        spaceComplexity: "O(n)",
        implemented: true
      },
      {
        name: "Rolling Hash",
        id: "rollingHash",
        description: "Efficient substring hashing technique for string matching.",
        timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
        spaceComplexity: "O(1)",
        implemented: true
      }
    ]
  },
  plants: {
    title: "Trees",
    icon: TreeDeciduous, // Changed from 🌳
    color: "#4ade80",
    algorithms: [
      {
        name: "Postorder Traversal",
        id: "postorder-traversal",
        description:
          "Tree traversal method that visits the left subtree, then the right subtree, and finally the root node (Left → Right → Root).",
        timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
        spaceComplexity:
          "O(h) (where h is the height of the tree, O(n) in worst case for a skewed tree)",
        implemented: true
      },
      {
        name: "Inorder Traversal",
        id: "inorder-traversal",
        description:
          "Tree traversal method that visits the left subtree, then the root node, and finally the right subtree (Left → Root → Right).",
        timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
        spaceComplexity:
          "O(h) (where h is the height of the tree, O(n) in worst case for a skewed tree)",
        implemented: true
      },
      {
        name: "Preorder Traversal",
        id: "preorder-traversal",
        description:
          "Tree traversal method that visits the root node first, then the left subtree, and finally the right subtree (Root → Left → Right).",
        timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
        spaceComplexity:
          "O(h) (where h is the height of the tree, O(n) in worst case for a skewed tree)",
        implemented: false
      }
    ]
  },

  gameSearch: {
    title: "Game Search",
    icon: Gamepad2, // Changed from 🎮
    color: "#f9a825",
    algorithms: [
      {
        name: "Minimax",
        id: "minimax",
        description: "Decision-making algorithm for 2-player games to minimize the possible loss.",
        timeComplexity: { best: "O(b^d)", average: "O(b^d)", worst: "O(b^d)" },
        spaceComplexity: "O(d)",
        implemented: false
      },
      {
        name: "Alpha-Beta Pruning",
        id: "alphaBetaPruning",
        description:
          "Optimization of minimax that prunes branches that cannot affect the final decision.",
        timeComplexity: { best: "O(b^(d/2))", average: "O(b^d)", worst: "O(b^d)" },
        spaceComplexity: "O(d)",
        implemented: false
      },
      {
        name: "Expectimax",
        id: "expectimax",
        description: "Variation of minimax for games involving chance elements.",
        timeComplexity: { best: "O(b^d)", average: "O(b^d)", worst: "O(b^d)" },
        spaceComplexity: "O(d)",
        implemented: false
      },
      {
        name: "Monte Carlo Tree Search",
        id: "monteCarloTreeSearch",
        description: "Uses random simulations to make decisions in large state-space games.",
        timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
        spaceComplexity: "O(n)",
        implemented: false
      }
    ]
  },
  branchAndBound: {
    title: "Branch & Bound",
    icon: Box, // Changed from 📦
    color: "#34d399",
    algorithms: [
      {
        name: "0/1 Knapsack",
        id: "knapsack01",
        description:
          "Solves 0/1 Knapsack problem using branch and bound to prune unfeasible solutions.",
        timeComplexity: { best: "O(n)", average: "O(2^n)", worst: "O(2^n)" },
        spaceComplexity: "O(n)",
        implemented: false
      },
      {
        name: "Traveling Salesman (TSP)",
        id: "tsp",
        description: "Finds shortest Hamiltonian cycle using branch and bound pruning.",
        timeComplexity: { best: "O(n!)", average: "O(n!)", worst: "O(n!)" },
        spaceComplexity: "O(n^2)",
        implemented: false
      }
    ]
  }
};

const getComplexityColor = (complexity) => {
  if (!complexity) return "#e0e6ed";

  if (complexity.includes("O(1)")) return "#4ade80";
  if (complexity.includes("O(log")) return "#66ccff";
  if (complexity.includes("O(n²)")) return "#ff6b6b";
  if (complexity.includes("O(n log n)")) return "#ff9500";
  if (complexity.includes("O(n)")) return "#ffd93d";
  if (complexity.includes("O(√n)")) return "#a78bfa";

  return "#e0e6ed"; // default color
};

// ============================================================================
// 2. SUB-COMPONENTS
// ============================================================================

function AlgorithmCard({ algorithm ,onOpen}) {
  const IconComponent = algorithm.categoryIconComponent || Code;
  const isLinearSearch=algorithm.id==="linearSearch";
  
  return (
<div
  className={`theme-card algorithm-card ${isLinearSearch ? 'cursor-pointer' : ''}`}
  onClick={isLinearSearch ? onOpen : null}
  role={isLinearSearch ? 'button' : ''}
  tabIndex={isLinearSearch ? 0 : -1}
  onKeyDown={isLinearSearch ? (e) => { if (e.key === 'Enter') onOpen(); } : null}
  title={algorithm.description}
>
  <div>
    <div className="card-header">
      <div className="card-title-group">
        <span className="card-icon">
          <IconComponent size={20} />
        </span>
        <h3 className="card-title">{algorithm.name}</h3>
      </div>

      {algorithm.implemented ? (
        <div className="status-badge implemented">Implemented</div>
      ) : (
        <div className="status-badge coming-soon">Coming Soon</div>
      )}
    </div>

    <p className="card-description line-clamp-3">{algorithm.description}</p>
  </div>

  <div className="card-category-badge mt-auto">{algorithm.categoryTitle}</div>
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
  const navigate = useNavigate();
  const handleCardClick = (algo) => {
    if(algo.id==="linearSearch"){
      navigate("/searching?algo=linear-search");
      return;
    }
  };

  const getAllAlgorithms = useCallback(() => {
    const seen = new Map();
    Object.entries(algorithmDatabase).forEach(([categoryKey, category]) => {
      category.algorithms.forEach((algo) => {
        if (!seen.has(algo.id)) {
          seen.set(algo.id, {
            ...algo,
            category: categoryKey,
            categoryTitle: category.title,
            categoryIconComponent: category.icon,
            categoryColor: category.color
          });
        }
      });
    });
    return Array.from(seen.values());
  }, []);

  const categories = useMemo(() => {
    const allAlgorithms = getAllAlgorithms();
    return [
      { key: "all", label: "All", icon: BookOpen, count: allAlgorithms.length },
      {
        key: "sorting",
        label: "Sorting",
        icon: ArrowDownUp,
        count: algorithmDatabase.sorting?.algorithms.length || 0
      },
      {
        key: "searching",
        label: "Searching",
        icon: Search,
        count: algorithmDatabase.searching?.algorithms.length || 0
      },
      {
        key: "dataStructures",
        label: "Data Structures",
        icon: Database,
        count: algorithmDatabase.dataStructures?.algorithms.length || 0
      },
      {
        key: "graph",
        label: "Graph",
        icon: Network,
        count: algorithmDatabase.graph?.algorithms.length || 0
      },
      {
        key: "backtracking",
        label: "Backtracking",
        icon: Target,
        count: algorithmDatabase.backtracking?.algorithms.length || 0
      },
      {
        key: "dynamicProgramming",
        label: "Dynamic Programming",
        icon: Brain,
        count: algorithmDatabase.dynamicProgramming?.algorithms.length || 0
      },
      {
        key: "greedy",
        label: "Greedy",
        icon: Wallet,
        count: algorithmDatabase.greedy?.algorithms.length || 0
      },
      {
        key: "divideAndConquer",
        label: "Divide & Conquer",
        icon: Split,
        count: algorithmDatabase.divideAndConquer?.algorithms.length || 0
      },
      {
        key: "hashing",
        label: "Hashing",
        icon: Hash,
        count: algorithmDatabase.hashing?.algorithms.length || 0
      },
      {
        key: "plants",
        label: "Trees",
        icon: TreeDeciduous,
        count: algorithmDatabase.plants?.algorithms.length || 0
      },
      {
        key: "gameSearch",
        label: "Game Search",
        icon: Gamepad2,
        count: algorithmDatabase.gameSearch?.algorithms.length || 0
      },
      {
        key: "branchAndBound",
        label: "Branch & Bound",
        icon: Box,
        count: algorithmDatabase.branchAndBound?.algorithms.length || 0
      }
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
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search algorithms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="category-filters mt-4">
          <div className="flex flex-wrap gap-3 px-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isActive = selectedCategory === category.key;
              return (
                <button
                  key={category.key}
                  className={`btn ${
                    isActive ? "btn-primary" : "btn-secondary"
                  } px-4 py-2 rounded-full flex items-center justify-between min-w-[180px] transition-all duration-200 hover:scale-105 group`}
                  onClick={() => setSelectedCategory(category.key)}
                >
                  <div className="flex items-center gap-2">
                    <IconComponent size={18} />
                    <span className="font-medium">{category.label}</span>
                  </div>
                  <div
                    className={`relative z-10 ${
                      isActive ? "bg-white text-[#1a1a1a]" : "bg-primary text-white"
                    } ml-2 px-2.5 py-0.5 rounded-full text-sm font-semibold min-w-[28px] flex items-center justify-center`}
                    style={{ isolation: "isolate" }}
                  >
                    {category.count}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="min-h-[60vh] w-full">
        <div className="results-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {filteredAlgorithms.length > 0 ? (
            filteredAlgorithms.map((algorithm) => (
              <AlgorithmCard key={algorithm.id} algorithm={algorithm}  onOpen={()=>handleCardClick(algorithm)}/>
            ))
          ) : (
            <div className="no-results-card theme-card text-center p-4 col-span-full">
              <Search size={48} className="mx-auto" />
              <h3>No algorithms found</h3>
              <p>Try adjusting your search terms or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AlgorithmDocumentation;
