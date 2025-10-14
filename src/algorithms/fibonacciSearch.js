import { COLOR, createBaseColors, sleep } from "../utils/searchingHelpers";

/**
 * Performs a Fibonacci search on a sorted array and visualizes the process.
 *
 * @param {number[]} arr The array to be searched.
 * @param {number} target The value to search for.
 * @param {function} setColorArray The state setter function for the color array.
 * @param {number} delay The delay in milliseconds for visualization.
 * @param {object} stopRef A React ref to check if the process should be stopped.
 * @param {function} updateStats A function to update statistics (comparisons).
 * @returns {Promise<number>} The index of the target if found, otherwise -1.
 */
export async function fibonacciSearchWithStop(arr, target, setColorArray, delay, stopRef, updateStats) {
  const a = [...arr];
  const n = a.length;
  let comparisons = 0;

  // Initialize Fibonacci numbers
  let fibMMm2 = 0; // (m-2)'th Fibonacci No.
  let fibMMm1 = 1; // (m-1)'th Fibonacci No.
  let fibM = fibMMm2 + fibMMm1; // m'th Fibonacci

  // Find the smallest Fibonacci number greater than or equal to n
  while (fibM < n) {
    fibMMm2 = fibMMm1;
    fibMMm1 = fibM;
    fibM = fibMMm2 + fibMMm1;
  }

  let offset = -1;

  // Main search loop
  while (fibM > 1) {
    if (stopRef.current) throw new Error("Stopped");

    // Get the index to check, ensuring it's within bounds
    let i = Math.min(offset + fibMMm2, n - 1);

    // --- Visualization ---
    const colors = createBaseColors(n);
    // Mark the elements before the offset as eliminated
    for (let k = 0; k <= offset; k++) {
        colors[k] = COLOR.eliminated;
    }
    colors[i] = COLOR.comparing; // Highlight the element being compared
    setColorArray([...colors]);
    await sleep(delay);
    // ---------------------

    comparisons++;
    updateStats({ comparisons, swaps: 0, time: 0 });

    if (a[i] < target) {
      // Target is in the right subarray, discard the left part
      fibM = fibMMm1;
      fibMMm1 = fibMMm2;
      fibMMm2 = fibM - fibMMm1;
      offset = i;
    } else if (a[i] > target) {
      // Target is in the left subarray, discard the right part
      fibM = fibMMm2;
      fibMMm1 = fibMMm1 - fibMMm2;
      fibMMm2 = fibM - fibMMm1;
    } else {
      // --- Visualization: Element Found ---
      const newColors = [...colors];
      newColors[i] = COLOR.found;
      setColorArray(newColors);
      await sleep(delay);
      // ------------------------------------
      return i; // Target found
    }
  }

  // Final comparison for the last element
  if (fibMMm1 && offset + 1 < n && a[offset + 1] === target) {
    if (stopRef.current) throw new Error("Stopped");
    comparisons++;
    updateStats({ comparisons, swaps: 0, time: 0 });
    
    // --- Visualization: Element Found ---
    const colors = createBaseColors(n);
    colors[offset + 1] = COLOR.found;
    setColorArray([...colors]);
    await sleep(delay);
    // ------------------------------------
    return offset + 1;
  }

  // --- Visualization: Element Not Found ---
  // Reset colors to default to indicate the search is over
  setColorArray(createBaseColors(n));
  await sleep(delay);
  // --------------------------------------

  return -1; // Target not found
}


/**
 * A non-visual, pure implementation of Fibonacci Search.
 * @param {number[]} arr The sorted array to search.
 * @param {number} target The value to find.
 * @returns {number} The index of the target, or -1 if not found.
 */
export function fibonacciSearch(arr, target) {
  const n = arr.length;
  let fibMMm2 = 0;
  let fibMMm1 = 1;
  let fibM = fibMMm2 + fibMMm1;

  while (fibM < n) {
    fibMMm2 = fibMMm1;
    fibMMm1 = fibM;
    fibM = fibMMm2 + fibMMm1;
  }

  let offset = -1;

  while (fibM > 1) {
    let i = Math.min(offset + fibMMm2, n - 1);

    if (arr[i] < target) {
      fibM = fibMMm1;
      fibMMm1 = fibMMm2;
      fibMMm2 = fibM - fibMMm1;
      offset = i;
    } else if (arr[i] > target) {
      fibM = fibMMm2;
      fibMMm1 = fibMMm1 - fibMMm2;
      fibMMm2 = fibM - fibMMm1;
    } else {
      return i;
    }
  }

  if (fibMMm1 && offset + 1 < n && arr[offset + 1] === target) {
    return offset + 1;
  }

  return -1;
}