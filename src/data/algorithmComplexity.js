// Algorithm complexity metadata
// Time and space complexity for various algorithms

export const algorithmComplexity = {
  // Sorting Algorithms
  bubbleSort: {
    time: "O(n²)",
    space: "O(1)",
  },
  selectionSort: {
    time: "O(n²)",
    space: "O(1)",
  },
  insertionSort: {
    time: "O(n²)",
    space: "O(1)",
  },
  mergeSort: {
    time: "O(n log n)",
    space: "O(n)",
  },
  quickSort: {
    time: "O(n log n)",
    space: "O(log n)",
  },
  heapSort: {
    time: "O(n log n)",
    space: "O(1)",
  },
  timSort: {
    time: "O(n log n)",
    space: "O(n)",
  },
  cycleSort: {
    time: "O(n²)",
    space: "O(1)",
  },
  introSort: {
    time: "O(n log n)",
    space: "O(log n)",
  },
  shellSort: {
    time: "O(n log n)",
    space: "O(1)",
  },
  radixSort: {
    time: "O(nk)",
    space: "O(n + k)",
  },
  bucketSort: {
    time: "O(n + k)",
    space: "O(n + k)",
  },
  // ✅ NEW Counting Sort complexity
  countingSort: {
    time: "O(n + k)",
    space: "O(k)",
  },

  // Searching Algorithms
  linearSearch: {
    time: "O(n)",
    space: "O(1)",
  },
  binarySearch: {
    time: "O(log n)",
    space: "O(1)",
  },
  ternarySearch: {
    time: "O(log₃ n)",
    space: "O(1)",
  },
  jumpSearch: {
    time: "O(√n)",
    space: "O(1)",
  },
  exponentialSearch: {
    time: "O(log n)",
    space: "O(1)",
  },

  // Graph Algorithms
  BFS: {
    time: "O(V + E)",
    space: "O(V)",
  },
  DFS: {
    time: "O(V + E)",
    space: "O(V)",
  },
  dijkstra: {
    time: "O((V + E) log V)",
    space: "O(V)",
  },
  aStar: {
    time: "O(E)",
    space: "O(V)",
  },
  prims: {
    time: "O(E log V)",
    space: "O(V)",
  },
  kruskal: {
    time: "O(E log E)",
    space: "O(V)",
  },

  // String Algorithms
  KMP: {
    time: "O(n + m)",
    space: "O(m)",
  },
  rabinKarp: {
    time: "O(n + m)",
    space: "O(1)",
  },

  // Dynamic Programming
  fibonacci: {
    time: "O(n)",
    space: "O(n)",
  },
  knapsack: {
    time: "O(nW)",
    space: "O(nW)",
  },
  longestCommonSubsequence: {
    time: "O(mn)",
    space: "O(mn)",
  },
  editDistance: {
    time: "O(mn)",
    space: "O(mn)",
  },

  // Greedy Algorithms
  huffman: {
    time: "O(n log n)",
    space: "O(n)",
  },
  activitySelection: {
    time: "O(n log n)",
    space: "O(1)",
  },

  // Backtracking
  nQueens: {
    time: "O(n!)",
    space: "O(n²)",
  },
  sudoku: {
    time: "O(9^m)",
    space: "O(1)",
  },

  // Hashing
  hashTable: {
    time: "O(1) avg",
    space: "O(n)",
  },

  // Tree Algorithms
  binarySearchTree: {
    time: "O(log n) avg",
    space: "O(n)",
  },
  avlTree: {
    time: "O(log n)",
    space: "O(n)",
  },

  // Divide and Conquer
  mergeSort_DC: {
    time: "O(n log n)",
    space: "O(n)",
  },
  quickSort_DC: {
    time: "O(n log n)",
    space: "O(log n)",
  },

  // Branch and Bound
  travelingSalesman: {
    time: "O(n!)",
    space: "O(n)",
  },

  // Game Search
  minimax: {
    time: "O(b^d)",
    space: "O(bd)",
  },
  alphaBeta: {
    time: "O(b^(d/2))",
    space: "O(bd)",
  },
};

// Helper function to get complexity for an algorithm
export const getComplexity = (algorithmName) => {
  return algorithmComplexity[algorithmName] || null;
};