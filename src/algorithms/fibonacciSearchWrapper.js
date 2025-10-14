import { fibonacciSearchWithStop } from './fibonacciSearch';

/**
 * A higher-order function that wraps the Fibonacci Search algorithm.
 * It takes a `target` and returns a function that can be used by the runner's adapter.
 * * @param {number} target The value to search for.
 * @returns {function} An async function compatible with adaptColorArrayAlgorithm.
 */
export function fibonacciSearchWrapper(target) {
  /**
   * @param {number[]} array The array to search in.
   * @param {function} setColorArray The state setter for the color array.
   * @param {number} delay The delay for visualization.
   */
  return async (array, setColorArray, delay) => {
    // Create mock refs and updaters that the original function expects.
    // The runner's adapter doesn't use these, so they can be simple.
    const stopRef = { current: false };
    const updateStats = () => {}; // No-op function

    // Call your original, detailed Fibonacci Search function
    await fibonacciSearchWithStop(
      array,
      target,
      setColorArray,
      delay,
      stopRef,
      updateStats
    );
  };
}
