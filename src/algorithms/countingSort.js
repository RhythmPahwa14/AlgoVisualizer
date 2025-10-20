import { COLOR, createBaseColors, markAllSorted, sleep } from "../utils/sortingHelpers";

export async function countingSortWithStop(arr, setArray, setColorArray, delay, stopRef, updateStats) {
  const a = [...arr];
  const n = a.length;
  let comparisons = 0, swaps = 0;

  if (n === 0) return 0;

  // Find the maximum and minimum elements to determine the range
  let max = a[0], min = a[0];
  for (let i = 1; i < n; i++) {
    if (stopRef.current) throw new Error("Stopped");
    if (a[i] > max) max = a[i];
    if (a[i] < min) min = a[i];
    comparisons++;
  }

  // Create the counting array
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(n).fill(0);

  // Count occurrences of each element
  for (let i = 0; i < n; i++) {
    if (stopRef.current) throw new Error("Stopped");
    count[a[i] - min]++;
    comparisons++;
    
    // Visualize counting process
    const colors = createBaseColors(n);
    colors[i] = COLOR.comparing;
    setColorArray([...colors]);
    await sleep(delay);
    updateStats({ comparisons, swaps, time: 0 });
  }

  // Visualize the counting array
  // For visualization purposes, we'll show the cumulative count
  for (let i = 1; i < range; i++) {
    if (stopRef.current) throw new Error("Stopped");
    count[i] += count[i - 1];
    comparisons++;
  }

  // Build the output array
  for (let i = n - 1; i >= 0; i--) {
    if (stopRef.current) throw new Error("Stopped");
    output[count[a[i] - min] - 1] = a[i];
    count[a[i] - min]--;
    swaps++;
    
    // Visualize placement process
    const colors = createBaseColors(n);
    colors[i] = COLOR.swapping;
    setColorArray([...colors]);
    setArray([...output.map((v, idx) => (v === 0 ? a[idx] : v))]);
    await sleep(delay);
    updateStats({ comparisons, swaps, time: 0 });
  }

  // Copy the output array to the original array
  for (let i = 0; i < n; i++) {
    a[i] = output[i];
  }

  setArray([...a]);
  markAllSorted(n, setColorArray);
  updateStats({ comparisons, swaps, time: 0 });
  return 0;
}