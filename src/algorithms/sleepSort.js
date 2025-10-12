import { COLOR, createBaseColors, markAllSorted, sleep } from "../utils/sortingHelpers";

export async function sleepSortWithStop(arr, setArray, setColorArray, delay, stopRef, updateStats) {
  const n = arr.length;
  let comparisons = 0, swaps = 0;
  
  // Normalize values to reasonable delay range
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const range = max - min || 1;
  
  // Scale to 20-100ms range
  const timeScale = 80 / range;
  
  const result = [];
  let completed = 0;

  // Show all bars as "waiting" initially
  const initialColors = createBaseColors(n);
  for (let i = 0; i < n; i++) {
    initialColors[i] = COLOR.comparing;
  }
  setColorArray([...initialColors]);
  await sleep(delay || 50);

  // Create promises for each element
  const promises = arr.map((value, index) => {
    return new Promise(async (resolve) => {
      if (stopRef.current) {
        resolve();
        return;
      }

      // Calculate sleep time proportional to value
      const waitTime = (value - min) * timeScale + 20;
      
      // Wait based on the element's value
      await sleep(waitTime);
      
      if (stopRef.current) {
        resolve();
        return;
      }

      // Add to sorted result
      result.push(value);
      completed++;
      
      // Update the original array in place
      for (let i = 0; i < result.length; i++) {
        arr[i] = result[i];
      }
      
      // Update visualization
      setArray([...arr]);
      
      // Update colors: sorted in green, remaining in grey
      const colors = createBaseColors(n);
      for (let i = 0; i < completed; i++) {
        colors[i] = COLOR.sorted;
      }
      // Keep remaining elements as "comparing" (yellow/orange)
      for (let i = completed; i < n; i++) {
        colors[i] = COLOR.comparing;
      }
      setColorArray([...colors]);
      
      comparisons++;
      updateStats({ comparisons, swaps, time: 0 });
      
      // Small delay for visual feedback
      await sleep(delay || 50);
      
      resolve();
    });
  });

  try {
    // Wait for all elements to complete
    await Promise.all(promises);
    
    if (stopRef.current) throw new Error("Stopped");
    
    // Final state: all sorted
    for (let i = 0; i < n; i++) {
      arr[i] = result[i];
    }
    setArray([...arr]);
    markAllSorted(n, setColorArray);
    
  } catch (error) {
    if (error.message === "Stopped") throw error;
  }

  return arr;
}