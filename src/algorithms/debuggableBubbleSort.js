import { COLOR, createBaseColors, markAllSorted, sleep } from "../utils/sortingHelpers";

/**
 * Debuggable Bubble Sort Implementation
 * 
 * This version of bubble sort includes debugging hooks that allow the debugging system
 * to track execution state, variables, call stack, and memory usage.
 */

export async function debuggableBubbleSort(arr, setArray, setColorArray, delay, stopRef, updateStats, debuggerContext) {
  const a = [...arr];
  const n = a.length;
  let comparisons = 0, swaps = 0;

  // Initialize debugging context
  if (debuggerContext) {
    debuggerContext.actions.updateCallStack([{
      functionName: 'debuggableBubbleSort',
      file: 'debuggableBubbleSort.js',
      line: 14,
      parameters: { arr: [...arr], delay, n }
    }]);
    
    debuggerContext.actions.updateVariables({
      array: [...a],
      n,
      comparisons: 0,
      swaps: 0,
      i: 0,
      j: 0
    });
    
    debuggerContext.actions.updateMemory({
      stack: [
        { address: 0x1000, value: [...a], type: 'array', name: 'a' },
        { address: 0x1001, value: n, type: 'number', name: 'n' }
      ],
      heap: []
    });
  }

  for (let i = 0; i < n - 1; i++) {
    if (stopRef.current) throw new Error("Stopped");
    
    // Update debugging context with current i value
    if (debuggerContext) {
      debuggerContext.actions.updateVariables({
        ...debuggerContext.state.variables,
        i,
        comparisons,
        swaps
      });
      
      debuggerContext.actions.updateCallStack([{
        functionName: 'debuggableBubbleSort',
        file: 'debuggableBubbleSort.js',
        line: 45,
        parameters: { arr: [...arr], delay, n },
        locals: { i }
      }]);
    }

    for (let j = 0; j < n - i - 1; j++) {
      if (stopRef.current) throw new Error("Stopped");
      comparisons++;
      
      // Update debugging context with current j value
      if (debuggerContext) {
        debuggerContext.actions.updateVariables({
          ...debuggerContext.state.variables,
          j,
          comparisons,
          swaps
        });
        
        debuggerContext.actions.updateCallStack([{
          functionName: 'debuggableBubbleSort',
          file: 'debuggableBubbleSort.js',
          line: 58,
          parameters: { arr: [...arr], delay, n },
          locals: { i, j }
        }]);
      }

      const colors = createBaseColors(n);
      colors[j] = COLOR.comparing;
      colors[j + 1] = COLOR.comparing;
      setColorArray([...colors]);
      await sleep(delay);
      
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swaps++;
        setArray([...a]);
        
        const swapColors = createBaseColors(n);
        swapColors[j] = COLOR.swapping;
        swapColors[j + 1] = COLOR.swapping;
        setColorArray([...swapColors]);
        await sleep(delay);
        
        // Update debugging context after swap
        if (debuggerContext) {
          debuggerContext.actions.updateVariables({
            ...debuggerContext.state.variables,
            array: [...a],
            swaps
          });
          
          debuggerContext.actions.updateMemory({
            stack: [
              { address: 0x1000, value: [...a], type: 'array', name: 'a' },
              { address: 0x1001, value: n, type: 'number', name: 'n' }
            ],
            heap: [
              { address: 0x2000, value: a[j], type: 'number', name: `a[${j}]` },
              { address: 0x2001, value: a[j+1], type: 'number', name: `a[${j+1}]` }
            ]
          });
        }
      }
      
      updateStats({ comparisons, swaps, time: 0 });
    }
    
    const passColors = createBaseColors(n);
    for (let k = n - i - 1; k < n; k++) passColors[k] = COLOR.sorted;
    setColorArray([...passColors]);
  }
  
  markAllSorted(n, setColorArray);
  
  // Final debugging context update
  if (debuggerContext) {
    debuggerContext.actions.updateVariables({
      ...debuggerContext.state.variables,
      comparisons,
      swaps
    });
    
    debuggerContext.actions.updateCallStack([{
      functionName: 'debuggableBubbleSort',
      file: 'debuggableBubbleSort.js',
      line: 120,
      parameters: { arr: [...arr], delay, n },
      returnValue: 0
    }]);
  }
  
  return 0;
}