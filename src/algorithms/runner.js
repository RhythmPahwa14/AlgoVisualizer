import {
  bubbleSort,
  insertionSort,
  selectionSort,
  mergeSort,
  quickSort,
  timSort,
  introSort,
  shellSort,
  cocktailShakerSort,      // ✅ Added Cocktail Shaker Sort
  linearSearchWrapper,
  binarySearchWrapper,
  sleepSort,
} from "./index";

// 🛡️ Input validation utilities
function validateArrayInput(array) {
  if (!Array.isArray(array)) throw new Error("Input must be an array.");
  if (array.length === 0) throw new Error("Input array is empty.");
  if (!array.every(item => !isNaN(Number(item)))) throw new Error("Array contains non-numeric values.");
}

function validateSearchTarget(target) {
  if (target === undefined || target === null || target === "")
    throw new Error("Please enter a search target.");
}

// 📊 Algorithm classification
const SORTING_ALGORITHMS = new Set([
  "Bubble Sort",
  "Insertion Sort",
  "Selection Sort",
  "Merge Sort",
  "Quick Sort",
  "Tim Sort",
  "Intro Sort",
  "Shell Sort",

  "Sleep Sort",

]);

const SEARCHING_ALGORITHMS = new Set([
  "Linear Search",
  "Binary Search",
  "Fibonacci Search", 
]);

export function getAlgorithmType(name) {
  if (SORTING_ALGORITHMS.has(name)) return "sorting";
  if (SEARCHING_ALGORITHMS.has(name)) return "searching";
  return "unknown";
}

// 🎨 Color helpers
function colorsToIndices(colors) {
  const highlighted = [];
  if (!Array.isArray(colors)) return highlighted;
  colors.forEach((c, i) => {
    if (c && c !== "lightgrey") highlighted.push(i);
  });
  return highlighted;
}

// 🔄 General color-array adapter
async function adaptColorArrayAlgorithm(algorithmFn, arr, delay = 0) {
  const steps = [];
  const n = arr.length;
  let prevColors = new Array(n).fill("lightgrey");

  const colorSetter = (colors) => {
    prevColors = Array.isArray(colors) ? colors.slice() : prevColors;
    const indices = colorsToIndices(prevColors);
    steps.push({ type: "compare", indices, array: arr.slice() });
  };

  await algorithmFn(arr, colorSetter, delay);

  steps.push({ type: "done", array: arr.slice() });
  return { steps, finalArray: arr.slice() };
}

// 🌀 QuickSort adapter
function adaptQuickSort(arr) {
  const events = quickSort(arr.slice());
  const steps = [];
  const state = arr.slice();

  for (const ev of events) {
    if (ev.type === "compare" && Array.isArray(ev.indices))
      steps.push({ type: "compare", indices: ev.indices });
    if (ev.type === "swap" && Array.isArray(ev.indices)) {
      const [i, j] = ev.indices;
      [state[i], state[j]] = [state[j], state[i]];
      steps.push({ type: "swap", array: state.slice() });
    }
  }

  steps.push({ type: "done", array: state.slice() });
  return { steps, finalArray: state };
}

// 🌀 MergeSort adapter
async function adaptMergeSort(arr) {
  const sorted = await mergeSort(arr.slice());
  return { steps: [{ type: "done", array: sorted.slice() }], finalArray: sorted.slice() };
}
async function adaptSleepSort(arr) {
  const steps = [];
  const n = arr.length;
  
  // Sleep sort modifies array in real-time
  await sleepSort(arr, 
    (newArray) => {
      // Capture each array update as a step
      steps.push({ type: "move", array: newArray.slice() });
    },
    0
  );
  
  steps.push({ type: "done", array: arr.slice() });
  return { steps, finalArray: arr.slice() };
}


// 🎬 Sorting executor
async function runSortingAlgorithm(name, inputArray) {
  const arr = inputArray.slice();
  switch (name) {
    case "Bubble Sort": return await adaptColorArrayAlgorithm(bubbleSort, arr);
    case "Insertion Sort": return await adaptColorArrayAlgorithm(insertionSort, arr);
    case "Selection Sort": return await adaptColorArrayAlgorithm(selectionSort, arr);
    case "Shell Sort": return await adaptColorArrayAlgorithm(shellSort, arr);
    case "Tim Sort": return await adaptColorArrayAlgorithm(timSort, arr);
    case "Intro Sort": return await adaptColorArrayAlgorithm(introSort, arr);
    case "Quick Sort": return await adaptColorArrayAlgorithm(quickSort, arr);
    case "Sleep Sort": return await adaptSleepSort(arr);
    case "Merge Sort": return await adaptMergeSort(arr);
    default: return { steps: [{ type: "done", array: arr.slice() }], finalArray: arr.slice() };

  }
}

// 🔍 Searching executor
async function runSearchingAlgorithm(name, arr, target) {
  const workingArray = arr.slice();
  switch (name) {
    case "Linear Search": return await adaptColorArrayAlgorithm(linearSearchWrapper, workingArray, 0);
    case "Binary Search": return await adaptColorArrayAlgorithm(binarySearchWrapper, workingArray, 0);
    default: {

      const steps = [];
      for (let i = 0; i < workingArray.length; i++) steps.push({ type: "probe", index: i });
      steps.push({ type: "done", array: workingArray.slice() });
      return { steps, finalArray: workingArray.slice() };
    }
  }
}

// ⚡ Async runner
export async function runAlgorithmAsync(name, arr, target) {
  validateArrayInput(arr);
  if (getAlgorithmType(name) === "searching") validateSearchTarget(target);


  const type = getAlgorithmType(name);
  if (type === "sorting") return { type, ...(await runSortingAlgorithm(name, arr)) };
  return { type, ...(await runSearchingAlgorithm(name, arr, target)) };
}

// 📊 Metadata
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
      "Shell Sort": "O(n log n)",

      "Sleep Sort": "O(n + max(arr))",
    },

  },
  searching: {
    algorithms: Array.from(SEARCHING_ALGORITHMS),
    description: "Array searching algorithms",
    complexity: {
      "Linear Search": "O(n)",
      "Binary Search": "O(log n)",
    },
  },
};

// 🛠️ Utilities
export const AlgorithmUtils = {
  getTimeComplexity: (name) => {
    const type = getAlgorithmType(name);
    return AlgorithmMetadata[type]?.complexity[name] || "Unknown";
  },
  isAlgorithmAvailable: (name) => SORTING_ALGORITHMS.has(name) || SEARCHING_ALGORITHMS.has(name),
  getAvailableAlgorithms: (type = "all") => {
    if (type === "sorting") return Array.from(SORTING_ALGORITHMS);
    if (type === "searching") return Array.from(SEARCHING_ALGORITHMS);
    return { sorting: Array.from(SORTING_ALGORITHMS), searching: Array.from(SEARCHING_ALGORITHMS) };
  },
};
