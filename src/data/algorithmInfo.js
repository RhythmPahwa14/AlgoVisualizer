// src/data/algorithmInfo.js


export const ALGORITHM_INFO = {
  sorting: {
    bubbleSort: {
      description:
        "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      bestCase: "O(n)",
      stable: "Yes",
    },
    selectionSort: {
      description:
        "Selection Sort sorts an array by repeatedly finding the minimum element from the unsorted part and putting it at the beginning.",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      bestCase: "O(n²)",
      stable: "No",
    },
    cocktailShakerSort: {
      description:
        "Cocktail Shaker Sort is a bidirectional variation of Bubble Sort that sorts the array in both directions on each pass. It moves the largest elements to the end and the smallest elements to the beginning alternately, which can help reduce the number of passes compared to regular Bubble Sort.",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      bestCase: "O(n)",
      stable: "Yes",
    },
    mergeSort: {
      description:
        "Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      bestCase: "O(n log n)",
      stable: "Yes",
    },
    insertionSort: {
      description:
        "Insertion Sort builds the final sorted array one item at a time by inserting each element into its correct position.",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      bestCase: "O(n)",
      stable: "Yes",
    },
    sleepSort: {
  description:
    "Sleep Sort works by creating a separate thread or timer for each element and 'sleeping' for a duration proportional to the element's value before outputting it. Smaller numbers wake up earlier, resulting in a sorted sequence.",
  timeComplexity: "O(n + k)", // k depends on max element value
  spaceComplexity: "O(n)",
  bestCase: "O(n)",
  stable: "No", // parallel execution doesn't guarantee stability
},

    quickSort: {
      description:
        "Quick Sort is a divide-and-conquer algorithm that picks an element as a pivot and partitions the array around the pivot.",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(log n)",
      bestCase: "O(n log n)",
      stable: "No",
    },
    shellSort: {
      description:
        "Sorts elements at specific gaps, reducing the gap until it becomes 1 (like insertion sort).",
      timeComplexity: "O(n^1.5) to O(n²)",
      spaceComplexity: "O(1)",
      bestCase: "O(n log n)",
      stable: "No",
    },
    heapSort: {
      description:
        "Heap Sort uses a heap data structure to repeatedly extract the maximum element and place it at the end.",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(1)",
      bestCase: "O(n log n)",
      stable: "No",
    },
    radixSort: {
      description:
        "Radix Sort sorts numbers by processing individual digits. Works well for integers and has linear complexity relative to digits.",
      timeComplexity: "O(d * (n + k))",
      spaceComplexity: "O(n + k)",
      bestCase: "O(n)",
      stable: "Yes",
    },
    bucketSort: {
      description:
        "Bucket Sort distributes elements into buckets and sorts each bucket individually (often with insertion sort).",
      timeComplexity: "Average O(n + k)",
      spaceComplexity: "O(n + k)",
      bestCase: "O(n)",
      stable: "Yes (depends on bucket sorting)",
    },
    timSort: {
      description:
        "TimSort is a hybrid stable sorting algorithm derived from merge sort and insertion sort.",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      bestCase: "O(n)",
      stable: "Yes",
    },
    introSort: {
      description:
        "IntroSort starts with quicksort and switches to heapsort when recursion depth gets too large to guarantee O(n log n).",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(log n)",
      bestCase: "O(n log n)",
      stable: "No",
    },
    strandSort: {
      description:
        "Repeatedly extracts sorted subsequences (strands) from the input list and merges them into a result list. Works well on nearly sorted data but requires auxiliary space.",
      timeComplexity: "O(n²)",
      bestCase: "O(n)",
      spaceComplexity: "O(n)",
      stable: "Yes",
    },
    cycleSort: {
      description:
        "An in-place, unstable sorting algorithm that minimizes writes by rotating elements into correct position in a cycle. Useful when memory writes are costly.",
      timeComplexity: "O(n²)",
      bestCase: "O(n²)",
      spaceComplexity: "O(1)",
      stable: "No",
    },
    // ✅ NEW Counting Sort information
    countingSort: {
      description:
        "Counting Sort is a non-comparison based sorting algorithm that works by counting the number of objects having distinct key values. It uses this count to determine the position of each element in the output sequence, achieving linear time complexity O(n+k) where n is the number of elements and k is the range of input.",
      timeComplexity: "O(n + k)",
      spaceComplexity: "O(k)",
      bestCase: "O(n + k)",
      stable: "Yes",
    },
  },

  searching: {
    linearSearch: {
      description:
        "Linear Search sequentially checks each element of the list until a match is found or the list ends.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      bestCase: "O(1)",
      stable: "Yes",
    },
    binarySearch: {
      description:
        "Binary Search finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      bestCase: "O(1)",
      stable: "Yes",
    },
     fibonacciSearch: {
      description:
        "Fibonacci Search is a comparison-based technique that uses Fibonacci numbers to narrow down the search space in a sorted array, avoiding the use of division operators.",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      bestCase: "O(1)",
      stable: "Yes",
    },
  },

  graphTraversal: {
    BFS: {
      description:
        "Breadth-First Search traverses a graph level by level starting from a given source node.",
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V)",
    },
    DFS: {
      description:
        "Depth-First Search explores as far as possible along each branch before backtracking.",
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V)",
    },
  },

  pathfinding: {
    dijkstra: {
      description:
        "Dijkstra's algorithm finds the shortest path from a source node to all other nodes in a weighted graph.",
      timeComplexity: "O(V²) or O(E + V log V) with min-heap",
      spaceComplexity: "O(V)",
    },
    aStar: {
      description:
        "A* Search finds the shortest path using heuristics to improve efficiency over Dijkstra.",
      timeComplexity: "O(E) in best case, O(b^d) worst case",
      spaceComplexity: "O(V)",
    },
    bellmanFord: {
      description:
        "Bellman-Ford algorithm computes shortest paths from a source vertex to all vertices in a weighted graph and can handle negative weights.",
      timeComplexity: "O(V * E)",
      spaceComplexity: "O(V)",
    },
  },

  dynamicProgramming: {
    knapsack: {
      description:
        "0/1 Knapsack problem finds the maximum value of items that can be put in a knapsack of limited capacity.",
      timeComplexity: "O(n * W)",
      spaceComplexity: "O(n * W)",
    },
    longestCommonSubsequence: {
      description:
        "LCS finds the longest subsequence common to two sequences.",
      timeComplexity: "O(m * n)",
      spaceComplexity: "O(m * n)",
    },
    fibonacciDP: {
      description:
        "Calculates Fibonacci numbers using dynamic programming to avoid repeated calculations.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
    },
    matrixChainMultiplication: {
      description:
        "Optimizes the order of matrix multiplication to minimize computations.",
      timeComplexity: "O(n³)",
      spaceComplexity: "O(n²)",
    },
  },
};

// ==================== NEW CODE FOR COMPARISON TABLE ====================
// This is ADDED for the Algorithm Comparison Table feature
// It doesn't affect any existing code

export const algorithmInfo = {
  // Sorting Algorithms
  "Bubble Sort": {
    description: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    bestCase: "O(n)",
    averageCase: "O(n²)",
    worstCase: "O(n²)",
    spaceComplexity: "O(1)",
    stable: true,
    recursive: false,
    inPlace: true,
    category: "Sorting",
    adaptive: true
  },
  "Selection Sort": {
    description: "Selection Sort sorts an array by repeatedly finding the minimum element from the unsorted part and putting it at the beginning.",
    bestCase: "O(n²)",
    averageCase: "O(n²)",
    worstCase: "O(n²)",
    spaceComplexity: "O(1)",
    stable: false,
    recursive: false,
    inPlace: true,
    category: "Sorting",
    adaptive: false
  },
  "Cocktail Shaker Sort": {
    description: "Cocktail Shaker Sort is a bidirectional variation of Bubble Sort that sorts the array in both directions on each pass.",
    bestCase: "O(n)",
    averageCase: "O(n²)",
    worstCase: "O(n²)",
    spaceComplexity: "O(1)",
    stable: true,
    recursive: false,
    inPlace: true,
    category: "Sorting",
    adaptive: true
  },
  "Merge Sort": {
    description: "Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.",
    bestCase: "O(n log n)",
    averageCase: "O(n log n)",
    worstCase: "O(n log n)",
    spaceComplexity: "O(n)",
    stable: true,
    recursive: true,
    inPlace: false,
    category: "Sorting",
    adaptive: false
  },
  "Insertion Sort": {
    description: "Insertion Sort builds the final sorted array one item at a time by inserting each element into its correct position.",
    bestCase: "O(n)",
    averageCase: "O(n²)",
    worstCase: "O(n²)",
    spaceComplexity: "O(1)",
    stable: true,
    recursive: false,
    inPlace: true,
    category: "Sorting",
    adaptive: true
  },
  "Quick Sort": {
    description: "Quick Sort is a divide-and-conquer algorithm that picks an element as a pivot and partitions the array around the pivot.",
    bestCase: "O(n log n)",
    averageCase: "O(n log n)",
    worstCase: "O(n²)",
    spaceComplexity: "O(log n)",
    stable: false,
    recursive: true,
    inPlace: true,
    category: "Sorting",
    adaptive: false
  },
  "Shell Sort": {
    description: "Sorts elements at specific gaps, reducing the gap until it becomes 1 (like insertion sort).",
    bestCase: "O(n log n)",
    averageCase: "O(n^(3/2))",
    worstCase: "O(n²)",
    spaceComplexity: "O(1)",
    stable: false,
    recursive: false,
    inPlace: true,
    category: "Sorting",
    adaptive: true
  },
  "Heap Sort": {
    description: "Heap Sort uses a heap data structure to repeatedly extract the maximum element and place it at the end.",
    bestCase: "O(n log n)",
    averageCase: "O(n log n)",
    worstCase: "O(n log n)",
    spaceComplexity: "O(1)",
    stable: false,
    recursive: false,
    inPlace: true,
    category: "Sorting",
    adaptive: false
  },
  "Radix Sort": {
    description: "Radix Sort sorts numbers by processing individual digits. Works well for integers and has linear complexity relative to digits.",
    bestCase: "O(n)",
    averageCase: "O(d * (n + k))",
    worstCase: "O(d * (n + k))",
    spaceComplexity: "O(n + k)",
    stable: true,
    recursive: false,
    inPlace: false,
    category: "Sorting",
    adaptive: false
  },
  "Bucket Sort": {
    description: "Bucket Sort distributes elements into buckets and sorts each bucket individually.",
    bestCase: "O(n)",
    averageCase: "O(n + k)",
    worstCase: "O(n²)",
    spaceComplexity: "O(n + k)",
    stable: true,
    recursive: false,
    inPlace: false,
    category: "Sorting",
    adaptive: false
  },
  "Tim Sort": {
    description: "TimSort is a hybrid stable sorting algorithm derived from merge sort and insertion sort.",
    bestCase: "O(n)",
    averageCase: "O(n log n)",
    worstCase: "O(n log n)",
    spaceComplexity: "O(n)",
    stable: true,
    recursive: false,
    inPlace: false,
    category: "Sorting",
    adaptive: true
  },
  "Intro Sort": {
    description: "IntroSort starts with quicksort and switches to heapsort when recursion depth gets too large.",
    bestCase: "O(n log n)",
    averageCase: "O(n log n)",
    worstCase: "O(n log n)",
    spaceComplexity: "O(log n)",
    stable: false,
    recursive: true,
    inPlace: true,
    category: "Sorting",
    adaptive: false
  },
  "Strand Sort": {
    description: "Repeatedly extracts sorted subsequences (strands) from the input list and merges them into a result list.",
    bestCase: "O(n)",
    averageCase: "O(n²)",
    worstCase: "O(n²)",
    spaceComplexity: "O(n)",
    stable: true,
    recursive: false,
    inPlace: false,
    category: "Sorting",
    adaptive: true
  },
  "Cycle Sort": {
    description: "An in-place, unstable sorting algorithm that minimizes writes by rotating elements into correct position.",
    bestCase: "O(n²)",
    averageCase: "O(n²)",
    worstCase: "O(n²)",
    spaceComplexity: "O(1)",
    stable: false,
    recursive: false,
    inPlace: true,
    category: "Sorting",
    adaptive: false
  },
  // ✅ NEW Counting Sort information for comparison table
  "Counting Sort": {
    description: "Counting Sort is a non-comparison based sorting algorithm that works by counting the number of objects having distinct key values. It uses this count to determine the position of each element in the output sequence, achieving linear time complexity O(n+k) where n is the number of elements and k is the range of input.",
    bestCase: "O(n + k)",
    averageCase: "O(n + k)",
    worstCase: "O(n + k)",
    spaceComplexity: "O(k)",
    stable: true,
    recursive: false,
    inPlace: false,
    category: "Sorting",
    adaptive: false
  },

  // Searching Algorithms
  "Linear Search": {
    description: "Linear Search sequentially checks each element of the list until a match is found or the list ends.",
    bestCase: "O(1)",
    averageCase: "O(n)",
    worstCase: "O(n)",
    spaceComplexity: "O(1)",
    stable: true,
    recursive: false,
    inPlace: true,
    category: "Searching",
    adaptive: true
  },
  "Binary Search": {
    description: "Binary Search finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.",
    bestCase: "O(1)",
    averageCase: "O(log n)",
    worstCase: "O(log n)",
    spaceComplexity: "O(1)",
    stable: true,
    recursive: false,
    inPlace: true,
    category: "Searching",
    adaptive: false
  },

  // Graph Algorithms
  "Breadth-First Search": {
    description: "Breadth-First Search traverses a graph level by level starting from a given source node.",
    bestCase: "O(V + E)",
    averageCase: "O(V + E)",
    worstCase: "O(V + E)",
    spaceComplexity: "O(V)",
    stable: true,
    recursive: false,
    inPlace: false,
    category: "Graph",
    adaptive: false
  },
  "Depth-First Search": {
    description: "Depth-First Search explores as far as possible along each branch before backtracking.",
    bestCase: "O(V + E)",
    averageCase: "O(V + E)",
    worstCase: "O(V + E)",
    spaceComplexity: "O(V)",
    stable: true,
    recursive: true,
    inPlace: false,
    category: "Graph",
    adaptive: false
  },
  "Dijkstra's Algorithm": {
    description: "Dijkstra's algorithm finds the shortest path from a source node to all other nodes in a weighted graph.",
    bestCase: "O(V + E log V)",
    averageCase: "O(V + E log V)",
    worstCase: "O(V + E log V)",
    spaceComplexity: "O(V)",
    stable: true,
    recursive: false,
    inPlace: false,
    category: "Graph",
    adaptive: false
  },
  "A* Search": {
    description: "A* Search finds the shortest path using heuristics to improve efficiency over Dijkstra.",
    bestCase: "O(E)",
    averageCase: "O(b^d)",
    worstCase: "O(b^d)",
    spaceComplexity: "O(V)",
    stable: true,
    recursive: false,
    inPlace: false,
    category: "Graph",
    adaptive: true
  },
  "Bellman-Ford": {
    description: "Bellman-Ford algorithm computes shortest paths from a source vertex to all vertices and can handle negative weights.",
    bestCase: "O(V * E)",
    averageCase: "O(V * E)",
    worstCase: "O(V * E)",
    spaceComplexity: "O(V)",
    stable: true,
    recursive: false,
    inPlace: false,
    category: "Graph",
    adaptive: false
  }
};