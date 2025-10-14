// This file contains helper functions and constants specifically for search visualizations.

export const COLOR = {
  base: "var(--accent-primary)",
  comparing: "#ffd93d",   // For the element currently being compared
  found: "#4ade80",       // For a successfully found element
  eliminated: "#a1a1aa"  // For elements that are no longer in the search space
};

/**
 * Pauses execution for a specified duration.
 * @param {number} ms - The number of milliseconds to sleep.
 * @returns {Promise<void>}
 */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Creates a new array of a given size, filled with the base color.
 * @param {number} n - The size of the array.
 * @returns {string[]}
 */
export const createBaseColors = (n) => new Array(n).fill(COLOR.base);
