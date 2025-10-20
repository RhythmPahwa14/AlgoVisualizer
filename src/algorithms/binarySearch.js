import { COLOR, createBaseColors, sleep } from "../utils/sortingHelpers";

interface SearchStats {
  comparisons: number;
  swaps: number;
  time: number;
}

interface BinarySearchParams {
  arr: number[];
  setArray: (arr: number[]) => void;
  setColorArray: (colors: string[]) => void;
  delay: number;
  stopRef: React.MutableRefObject<boolean>;
  updateStats: (stats: SearchStats) => void;
}

interface SimpleBinarySearchParams {
  array: number[];
  target: number;
  setColorArray: React.Dispatch<React.SetStateAction<string[]>>;
  delay: number;
}

/**
 * Performs binary search with visualization support
 * @returns The index of the target element, or -1 if not found
 * @throws Error if search is stopped via stopRef
 */
export async function binarySearchWithStop({
  arr,
  setArray,
  setColorArray,
  delay,
  stopRef,
  updateStats,
}: BinarySearchParams): Promise<number> {
  const a = [...arr];
  let comparisons = 0;
  let left = 0;
  let right = a.length - 1;

  while (left <= right) {
    if (stopRef.current) {
      throw new Error("Stopped");
    }

    const mid = Math.floor((left + right) / 2);
    comparisons++;
    updateStats({ comparisons, swaps: 0, time: 0 });

    // Highlight the middle element being compared
    const colors = createBaseColors(a.length);
    colors[mid] = COLOR.comparing;
    setColorArray([...colors]);
    await sleep(delay);

    // In a real implementation, compare with target here
    // For visualization purposes, we demonstrate the search process
    left = mid + 1;
  }

  // Mark all elements as sorted when search completes
  const finalColors = new Array(a.length).fill(COLOR.sorted);
  setColorArray(finalColors);

  return -1; // Not found (would return actual index in real implementation)
}

/**
 * Performs binary search on a sorted array with color visualization
 * @returns The index of the target element, or -1 if not found
 */
export async function binarySearch({
  array,
  target,
  setColorArray,
  delay,
}: SimpleBinarySearchParams): Promise<number> {
  let left = 0;
  let right = array.length - 1;

  // Helper to update a single element's color
  const updateColor = (index: number, color: string): void => {
    setColorArray((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = color;
      return newColors;
    });
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // Highlight the current middle element
    updateColor(mid, 'yellow');
    await sleep(delay);

    if (array[mid] === target) {
      // Target found - highlight in green
      updateColor(mid, 'green');
      return mid;
    }

    // Reset color for non-matching element
    updateColor(mid, 'lightgrey');

    // Adjust search boundaries
    if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1; // Target not found
}
