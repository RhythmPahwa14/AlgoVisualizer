// src/algorithms/runner.js

// 🎯 Central Algorithm Runner: Adapts implementations from src/algorithms
// 🔄 Translates algorithm side-effects/outputs into unified visualization steps

import {
  bubbleSort,
  insertionSort,
  selectionSort,
  mergeSort,
  quickSort,
  timSort,
  introSort,
  shellSort,
  linearSearchWrapper,
  binarySearchWrapper,
} from "./index";

// 🛡️ Input validation utilities
function validateArrayInput(array) {
  if (!Array.isArray(array)) {
    throw new Error("Input must be a valid array.");
  }
  if (array.length === 0) {
    throw new Error("Input array is empty. Please provide an array of numbers.");
  }
  if (!array.every(item => !isNaN(Number(item)))) {
    throw new Error("Array contains non-numeric values.");
  }
}

function validateSearchTarget(target) {
  if (target === undefined || target === null || target === "") {
    throw new Error("Please enter a search target for search algorithms.");
  }
}

// 📊 Algorithm classification constants
const SORTING_ALGORITHMS = new Set([
  "Bubble Sort",
  "Insertion Sort",
  "Selection Sort",
  "Merge Sort",
  "Quick Sort",
  "Tim Sort",
  "Intro Sort",
  "Shell Sort",
]);

const SEARCHING_ALGORITHMS = new Set([
  "Linear Search",
  "Binary Search",
]);

// 🎯 Algorithm type detection
export function getAlgorithmType(algorithmName) {
  if (SORTING_ALGORITHMS.has(algorithmName)) return "sorting";
  if (SEARCHING_ALGORITHMS.has(algorithmName)) return "searching";
  return "unknown";
}

// 🎨 Color to index conversion utility
function colorsToIndices(colors) {
  const highlightedIndices = [];
  if (!Array.isArray(colors)) return highlightedIndices;
  
  for (let index = 0; index < colors.length; index++) {
    if (colors[index] && colors[index] !== "lightgrey") {
      highlightedIndices.push(index);
    }
  }
  return highlightedIndices;
}

// 🔄 Color array algorithm adapter
async function adaptColorArrayAlgorithm(algorithmFunction, workingArray, delay = 0) {
  const executionSteps = [];
  const arrayLength = workingArray.length;
  let previousColors = new Array(arrayLength).fill("lightgrey");
  
  const colorArraySetter = (colors) => {
    previousColors = Array.isArray(colors) ? colors.slice() : previousColors;
    const highlightedIndices = colorsToIndices(previousColors);
    executionSteps.push({ 
      type: "compare", 
      indices: highlightedIndices, 
      array: workingArray.slice() 
    });
  };
  
  // 🚀 Execute algorithm with color tracking
  await algorithmFunction(workingArray, colorArraySetter, delay);
  
  executionSteps.push({ 
    type: "done", 
    array: workingArray.slice() 
  });
  
  return { 
    steps: executionSteps, 
    finalArray: workingArray.slice() 
  };
}

// 🔄 QuickSort specific adapter
function adaptQuickSort(workingArray) {
  const animationEvents = quickSort(workingArray.slice());
  const executionSteps = [];
  const stateArray = workingArray.slice();
  
  for (const event of animationEvents) {
    if (event.type === "compare" && Array.isArray(event.indices)) {
      executionSteps.push({ 
        type: "compare", 
        indices: event.indices 
      });
    }
    if (event.type === "swap" && Array.isArray(event.indices)) {
      const [firstIndex, secondIndex] = event.indices;
      if (typeof firstIndex === "number" && typeof secondIndex === "number") {
        const temporary = stateArray[firstIndex];
        stateArray[firstIndex] = stateArray[secondIndex];
        stateArray[secondIndex] = temporary;
      }
      executionSteps.push({ 
        type: "swap", 
        array: stateArray.slice() 
      });
    }
  }
  
  executionSteps.push({ 
    type: "done", 
    array: stateArray.slice() 
  });
  
  return { 
    steps: executionSteps, 
    finalArray: stateArray 
  };
}

// 🌀 MergeSort specific adapter
async function adaptMergeSort(workingArray) {
  const sortedResult = await mergeSort(workingArray.slice());
  const finalArray = Array.isArray(sortedResult) ? sortedResult : workingArray.slice();
  
  return { 
    steps: [{ 
      type: "done", 
      array: finalArray.slice() 
    }], 
    finalArray: finalArray.slice() 
  };
}

// 🎬 Sorting algorithm executor
async function runSortingAlgorithm(algorithmName, inputArray) {
  const workingArray = inputArray.slice();
  
  switch (algorithmName) {
    case "Bubble Sort":
      return await adaptColorArrayAlgorithm(bubbleSort, workingArray, 0);
    case "Insertion Sort":
      return await adaptColorArrayAlgorithm(insertionSort, workingArray, 0);
    case "Selection Sort":
      return await adaptColorArrayAlgorithm(selectionSort, workingArray, 0);
    case "Shell Sort":
      return await adaptColorArrayAlgorithm(shellSort, workingArray, 0);
    case "Tim Sort":
      return await adaptColorArrayAlgorithm(timSort, workingArray, 0);
    case "Intro Sort":
      return await adaptColorArrayAlgorithm(introSort, workingArray, 0);
    case "Quick Sort":
      return await adaptColorArrayAlgorithm(quickSort, workingArray, 0);
    case "Merge Sort":
      return await adaptMergeSort(workingArray);
    default:
      return { 
        steps: [{ 
          type: "done", 
          array: workingArray.slice() 
        }], 
        finalArray: workingArray.slice() 
      };
  }
}

// 🔍 Searching algorithm executor
async function runSearchingAlgorithm(algorithmName, inputArray, targetValue) {
  const workingArray = inputArray.slice();
  
  switch (algorithmName) {
    case "Linear Search":
      return await adaptColorArrayAlgorithm(linearSearchWrapper, workingArray, 0);
    case "Binary Search":
      return await adaptColorArrayAlgorithm(binarySearchWrapper, workingArray, 0);
    default: {
      // 🎯 Fallback search implementation
      const searchSteps = [];
      for (let index = 0; index < workingArray.length; index++) {
        searchSteps.push({ 
          type: "probe", 
          index: index 
        });
        // 🎯 Real implementation would check: workingArray[index] === targetValue
      }
      searchSteps.push({ 
        type: "done", 
        array: workingArray.slice() 
      });
      return { 
        steps: searchSteps, 
        finalArray: workingArray.slice() 
      };
    }
  }
}

// 🚀 Synchronous algorithm runner (legacy interface)
export function runAlgorithm(algorithmName, inputArray, targetValue) {
  const algorithmType = getAlgorithmType(algorithmName);
  
  if (algorithmType === "sorting") {
    // 📝 Note: Returns promise for async handling
    // AlgorithmVisualizer treats steps synchronously, so we resolve immediately
  }
  
  throw new Error("Use runAlgorithmAsync for algorithm execution");
}

// ⚡ Asynchronous algorithm runner (primary interface)
export async function runAlgorithmAsync(algorithmName, inputArray, targetValue) {
  // 🛡️ Input validation
  validateArrayInput(inputArray);
  
  const algorithmType = getAlgorithmType(algorithmName);
  
  if (algorithmType.includes("search")) {
    validateSearchTarget(targetValue);
  }
  
  // 🎯 Execute appropriate algorithm type
  if (algorithmType === "sorting") {
    const result = await runSortingAlgorithm(algorithmName, inputArray);
    return { 
      type: algorithmType, 
      ...result 
    };
  } else {
    const result = await runSearchingAlgorithm(algorithmName, inputArray, targetValue);
    return { 
      type: algorithmType, 
      ...result 
    };
  }
}

// 📊 Algorithm metadata and capabilities
export const AlgorithmMetadata = {
  sorting: {
    algorithms: Array.from(SORTING_ALGORITHMS),
    description: "Array sorting algorithms",
    complexity: {
      "Bubble Sort": "O(n²)",
      "Insertion Sort": "O(n²)",
      "Selection Sort": "O(n²)",
      "Merge Sort": "O(n log n)",
      "Quick Sort": "O(n log n)",
      "Tim Sort": "O(n log n)",
      "Intro Sort": "O(n log n)",
      "Shell Sort": "O(n log n)"
    }
  },
  searching: {
    algorithms: Array.from(SEARCHING_ALGORITHMS),
    description: "Array searching algorithms",
    complexity: {
      "Linear Search": "O(n)",
      "Binary Search": "O(log n)"
    }
  }
};

// 🛠️ Utility functions for algorithm analysis
export const AlgorithmUtils = {
  // 📈 Get algorithm time complexity
  getTimeComplexity: (algorithmName) => {
    const algorithmType = getAlgorithmType(algorithmName);
    return AlgorithmMetadata[algorithmType]?.complexity[algorithmName] || "Unknown";
  },
  
  // 🔍 Check if algorithm is available
  isAlgorithmAvailable: (algorithmName) => {
    return SORTING_ALGORITHMS.has(algorithmName) || SEARCHING_ALGORITHMS.has(algorithmName);
  },
  
  // 📋 Get all available algorithms by type
  getAvailableAlgorithms: (type = "all") => {
    if (type === "sorting") return Array.from(SORTING_ALGORITHMS);
    if (type === "searching") return Array.from(SEARCHING_ALGORITHMS);
    return {
      sorting: Array.from(SORTING_ALGORITHMS),
      searching: Array.from(SEARCHING_ALGORITHMS)
    };
  }
};
