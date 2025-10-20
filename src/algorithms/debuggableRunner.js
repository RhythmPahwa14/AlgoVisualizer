import {
  bubbleSort,
  insertionSort,
  selectionSort,
  mergeSort,
  quickSort,
  timSort,
  introSort,
  shellSort,
  cocktailShakerSort,
  linearSearchWrapper,
  binarySearchWrapper,
  sleepSort,
} from "./index";

import { useDebugging } from "../contexts/DebuggingContext";
import ExpressionEvaluator from "../utils/ExpressionEvaluator";

// Enhanced algorithm runner with debugging capabilities
class DebuggableAlgorithmRunner {
  constructor() {
    this.debuggingEnabled = false;
    this.debuggingContext = null;
    this.executionHistory = [];
    this.currentStep = 0;
    this.breakpoints = new Set();
    this.conditionalBreakpoints = {};
  }

  // Enable debugging mode
  enableDebugging() {
    this.debuggingEnabled = true;
  }

  // Disable debugging mode
  disableDebugging() {
    this.debuggingEnabled = false;
  }

  // Set debugging context
  setDebuggingContext(context) {
    this.debuggingContext = context;
  }

  // Add a breakpoint
  addBreakpoint(line) {
    this.breakpoints.add(line);
  }

  // Remove a breakpoint
  removeBreakpoint(line) {
    this.breakpoints.delete(line);
  }

  // Add a conditional breakpoint
  addConditionalBreakpoint(line, condition) {
    this.conditionalBreakpoints[line] = condition;
  }

  // Remove a conditional breakpoint
  removeConditionalBreakpoint(line) {
    delete this.conditionalBreakpoints[line];
  }

  // Check if we should pause at the current line
  shouldPauseAtLine(line, variables = {}) {
    // Check regular breakpoints
    if (this.breakpoints.has(line)) {
      return true;
    }

    // Check conditional breakpoints
    if (this.conditionalBreakpoints[line]) {
      try {
        return ExpressionEvaluator.checkCondition(
          this.conditionalBreakpoints[line],
          variables
        );
      } catch (error) {
        console.error("Error evaluating conditional breakpoint:", error);
        return false;
      }
    }

    return false;
  }

  // Record execution state for debugging
  recordExecutionState(state) {
    if (!this.debuggingEnabled) return;

    this.executionHistory.push({ ...state });
    this.currentStep = this.executionHistory.length - 1;

    // Notify debugging context if available
    if (this.debuggingContext) {
      this.debuggingContext.actions.addExecutionState(state);
    }
  }

  // Update call stack
  updateCallStack(callStack) {
    if (!this.debuggingEnabled) return;

    if (this.debuggingContext) {
      this.debuggingContext.actions.updateCallStack(callStack);
    }
  }

  // Update variables
  updateVariables(variables) {
    if (!this.debuggingEnabled) return;

    if (this.debuggingContext) {
      this.debuggingContext.actions.updateVariables(variables);
    }
  }

  // Update memory visualization
  updateMemory(memory) {
    if (!this.debuggingEnabled) return;

    if (this.debuggingContext) {
      this.debuggingContext.actions.updateMemory(memory);
    }
  }

  // Update performance metrics
  updateMetrics(metrics) {
    if (!this.debuggingEnabled) return;

    if (this.debuggingContext) {
      this.debuggingContext.actions.updateMetrics(metrics);
    }
  }

  // Enhanced color-array adapter with debugging support
  async adaptColorArrayAlgorithm(algorithmFn, arr, delay = 0) {
    const steps = [];
    const n = arr.length;
    let prevColors = new Array(n).fill("lightgrey");

    // Initialize debugging state
    if (this.debuggingEnabled) {
      this.executionHistory = [];
      this.currentStep = 0;
      
      // Set initial debugging state
      if (this.debuggingContext) {
        this.debuggingContext.actions.startDebugging({
          initialState: {
            array: arr.slice(),
            variables: { i: 0, j: 0, n },
            callStack: [{ functionName: algorithmFn.name, line: 0 }]
          },
          initialCallStack: [{ functionName: algorithmFn.name, line: 0 }],
          initialVariables: { i: 0, j: 0, n },
          initialScopes: [],
          totalSteps: 0
        });
      }
    }

    const colorSetter = (colors) => {
      prevColors = Array.isArray(colors) ? colors.slice() : prevColors;
      const indices = this.colorsToIndices(prevColors);
      
      const step = { type: "compare", indices, array: arr.slice() };
      steps.push(step);
      
      // Record execution state for debugging
      this.recordExecutionState({
        array: arr.slice(),
        variables: { ...this.getCurrentVariables() },
        callStack: this.getCurrentCallStack()
      });
    };

    await algorithmFn(arr, colorSetter, delay);

    steps.push({ type: "done", array: arr.slice() });
    
    // Record final state
    this.recordExecutionState({
      array: arr.slice(),
      variables: { ...this.getCurrentVariables() },
      callStack: this.getCurrentCallStack()
    });
    
    return { steps, finalArray: arr.slice() };
  }

  // Helper function to convert colors to indices
  colorsToIndices(colors) {
    const highlighted = [];
    if (!Array.isArray(colors)) return highlighted;
    colors.forEach((c, i) => {
      if (c && c !== "lightgrey") highlighted.push(i);
    });
    return highlighted;
  }

  // Get current variables (to be implemented by specific algorithms)
  getCurrentVariables() {
    return {};
  }

  // Get current call stack (to be implemented by specific algorithms)
  getCurrentCallStack() {
    return [];
  }

  // Run algorithm with debugging support
  async runAlgorithm(name, inputArray, target) {
    // Validate input
    if (!Array.isArray(inputArray)) {
      throw new Error("Input must be an array.");
    }
    
    if (inputArray.length === 0) {
      throw new Error("Input array is empty.");
    }

    const arr = inputArray.slice();
    const type = this.getAlgorithmType(name);
    
    // Update metrics
    this.updateMetrics({ time: 0, memoryUsage: arr.length * 4, operations: 0 });

    if (type === "sorting") {
      return await this.runSortingAlgorithm(name, arr);
    } else if (type === "searching") {
      if (target === undefined || target === null || target === "") {
        throw new Error("Please enter a search target.");
      }
      return await this.runSearchingAlgorithm(name, arr, target);
    }

    // Default case
    return { steps: [{ type: "done", array: arr.slice() }], finalArray: arr.slice() };
  }

  // Get algorithm type
  getAlgorithmType(name) {
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

    if (SORTING_ALGORITHMS.has(name)) return "sorting";
    if (SEARCHING_ALGORITHMS.has(name)) return "searching";
    return "unknown";
  }

  // Run sorting algorithm with debugging
  async runSortingAlgorithm(name, inputArray) {
    const arr = inputArray.slice();
    
    switch (name) {
      case "Bubble Sort": 
        return await this.adaptColorArrayAlgorithm(bubbleSort, arr);
      case "Insertion Sort": 
        return await this.adaptColorArrayAlgorithm(insertionSort, arr);
      case "Selection Sort": 
        return await this.adaptColorArrayAlgorithm(selectionSort, arr);
      case "Shell Sort": 
        return await this.adaptColorArrayAlgorithm(shellSort, arr);
      case "Tim Sort": 
        return await this.adaptColorArrayAlgorithm(timSort, arr);
      case "Intro Sort": 
        return await this.adaptColorArrayAlgorithm(introSort, arr);
      case "Quick Sort": 
        return await this.adaptColorArrayAlgorithm(quickSort, arr);
      case "Sleep Sort": 
        return await this.adaptSleepSort(arr);
      case "Merge Sort": 
        return await this.adaptMergeSort(arr);
      default: 
        return { steps: [{ type: "done", array: arr.slice() }], finalArray: arr.slice() };
    }
  }

  // Run searching algorithm with debugging
  async runSearchingAlgorithm(name, arr, target) {
    const workingArray = arr.slice();
    
    switch (name) {
      case "Linear Search": 
        return await this.adaptColorArrayAlgorithm(linearSearchWrapper, workingArray, 0);
      case "Binary Search": 
        return await this.adaptColorArrayAlgorithm(binarySearchWrapper, workingArray, 0);
      default: {
        const steps = [];
        for (let i = 0; i < workingArray.length; i++) {
          steps.push({ type: "probe", index: i });
        }
        steps.push({ type: "done", array: workingArray.slice() });
        return { steps, finalArray: workingArray.slice() };
      }
    }
  }

  // Adapt Sleep Sort with debugging
  async adaptSleepSort(arr) {
    const steps = [];
    const n = arr.length;
    
    // Sleep sort modifies array in real-time
    await sleepSort(arr, 
      (newArray) => {
        // Capture each array update as a step
        steps.push({ type: "move", array: newArray.slice() });
        
        // Record execution state for debugging
        this.recordExecutionState({
          array: newArray.slice(),
          variables: { ...this.getCurrentVariables() },
          callStack: this.getCurrentCallStack()
        });
      },
      0
    );
    
    steps.push({ type: "done", array: arr.slice() });
    
    // Record final state
    this.recordExecutionState({
      array: arr.slice(),
      variables: { ...this.getCurrentVariables() },
      callStack: this.getCurrentCallStack()
    });
    
    return { steps, finalArray: arr.slice() };
  }

  // Adapt Merge Sort with debugging
  async adaptMergeSort(arr) {
    const sorted = await mergeSort(arr.slice());
    return { steps: [{ type: "done", array: sorted.slice() }], finalArray: sorted.slice() };
  }
}

// Export a singleton instance
export default new DebuggableAlgorithmRunner();