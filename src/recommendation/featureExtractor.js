/**
 * Dataset Feature Extraction Engine for Algorithm Recommendation System
 * 
 * This module extracts standardized feature vectors from input datasets
 * to be used by machine learning models for algorithm recommendation.
 */

/**
 * Calculate basic statistical properties of a numeric array
 * @param {number[]} arr - Input array of numbers
 * @returns {Object} Statistical properties
 */
function calculateStats(arr) {
  if (!arr || arr.length === 0) return {};
  
  const n = arr.length;
  const sum = arr.reduce((a, b) => a + b, 0);
  const mean = sum / n;
  
  // Variance and standard deviation
  const variance = arr.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / n;
  const stdDev = Math.sqrt(variance);
  
  // Min, max, range
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const range = max - min;
  
  // Median
  const sorted = [...arr].sort((a, b) => a - b);
  const median = n % 2 === 0 
    ? (sorted[n/2 - 1] + sorted[n/2]) / 2 
    : sorted[Math.floor(n/2)];
  
  // Skewness (using Pearson's second skewness coefficient)
  const skewness = (3 * (mean - median)) / stdDev;
  
  // Kurtosis (excess kurtosis)
  const kurtosis = arr.reduce((acc, val) => acc + Math.pow((val - mean) / stdDev, 4), 0) / n - 3;
  
  return {
    mean,
    median,
    variance,
    stdDev,
    min,
    max,
    range,
    skewness,
    kurtosis
  };
}

/**
 * Detect distribution type of numeric data
 * @param {number[]} arr - Input array of numbers
 * @returns {string} Distribution type
 */
function detectDistribution(arr) {
  if (!arr || arr.length === 0) return 'unknown';
  
  const stats = calculateStats(arr);
  const { skewness, kurtosis } = stats;
  
  // Simple heuristic-based distribution detection
  if (Math.abs(skewness) < 0.5 && Math.abs(kurtosis) < 0.5) {
    return 'normal';
  } else if (Math.abs(skewness) > 1 && kurtosis > 3) {
    return 'heavy-tailed';
  } else if (Math.abs(skewness) > 1 && kurtosis < -1) {
    return 'uniform';
  } else if (Math.abs(skewness) > 1) {
    return 'skewed';
  }
  
  return 'other';
}

/**
 * Check if array is sorted or nearly sorted
 * @param {number[]} arr - Input array
 * @returns {Object} Sortedness metrics
 */
function analyzeSortedness(arr) {
  if (!arr || arr.length === 0) return { sortedness: 0, nearlySorted: false };
  
  let inversions = 0;
  let runs = 1;
  let currentRun = 1;
  
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i-1]) {
      inversions++;
      if (currentRun > 1) {
        runs++;
        currentRun = 1;
      }
    } else {
      currentRun++;
    }
  }
  
  const sortedness = 1 - (inversions / (arr.length * (arr.length - 1) / 2));
  const nearlySorted = sortedness > 0.8;
  
  return {
    sortedness,
    nearlySorted,
    runs,
    inversions
  };
}

/**
 * Count duplicates in array
 * @param {Array} arr - Input array
 * @returns {number} Number of duplicate elements
 */
function countDuplicates(arr) {
  if (!arr || arr.length === 0) return 0;
  
  const unique = new Set(arr);
  return arr.length - unique.size;
}

/**
 * Detect outliers using IQR method
 * @param {number[]} arr - Input array of numbers
 * @returns {Object} Outlier information
 */
function detectOutliers(arr) {
  if (!arr || arr.length === 0) return { count: 0, percentage: 0 };
  
  const sorted = [...arr].sort((a, b) => a - b);
  const n = sorted.length;
  
  const q1Index = Math.floor(n * 0.25);
  const q3Index = Math.floor(n * 0.75);
  
  const q1 = sorted[q1Index];
  const q3 = sorted[q3Index];
  const iqr = q3 - q1;
  
  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;
  
  const outliers = arr.filter(x => x < lowerBound || x > upperBound);
  
  return {
    count: outliers.length,
    percentage: (outliers.length / arr.length) * 100
  };
}

/**
 * Determine data type of array elements
 * @param {Array} arr - Input array
 * @returns {string} Data type
 */
function detectDataType(arr) {
  if (!arr || arr.length === 0) return 'unknown';
  
  const first = arr[0];
  
  if (typeof first === 'number') {
    // Check if all integers
    const allIntegers = arr.every(x => Number.isInteger(x));
    return allIntegers ? 'integer' : 'float';
  } else if (typeof first === 'string') {
    return 'string';
  } else if (typeof first === 'boolean') {
    return 'boolean';
  } else if (Array.isArray(first)) {
    return 'array';
  } else if (first !== null && typeof first === 'object') {
    return 'object';
  }
  
  return 'unknown';
}

/**
 * Extract features from a numeric array dataset
 * @param {Array} dataset - Input dataset (array of numbers)
 * @returns {Object} Feature vector
 */
export function extractNumericFeatures(dataset) {
  if (!dataset || !Array.isArray(dataset) || dataset.length === 0) {
    return {};
  }
  
  // Convert to numbers if needed
  const numericData = dataset.map(x => Number(x)).filter(x => !isNaN(x));
  
  if (numericData.length === 0) {
    return {};
  }
  
  // Basic statistics
  const stats = calculateStats(numericData);
  
  // Distribution analysis
  const distribution = detectDistribution(numericData);
  
  // Sortedness analysis
  const sortedness = analyzeSortedness(numericData);
  
  // Duplicates
  const duplicates = countDuplicates(numericData);
  
  // Outliers
  const outliers = detectOutliers(numericData);
  
  // Data type
  const dataType = detectDataType(numericData);
  
  return {
    // Size & dimensionality
    size: numericData.length,
    sparsity: 0, // For numeric arrays, sparsity is 0
    
    // Statistical properties
    ...stats,
    
    // Distribution detection
    distribution,
    
    // Pattern detection
    ...sortedness,
    duplicates,
    ...outliers,
    
    // Data type
    dataType,
    
    // Structural features
    isNumeric: true,
    isCategorical: false
  };
}

/**
 * Extract features from a general dataset
 * @param {Array} dataset - Input dataset
 * @returns {Object} Feature vector
 */
export function extractFeatures(dataset) {
  if (!dataset || !Array.isArray(dataset) || dataset.length === 0) {
    return {};
  }
  
  // For now, we'll focus on numeric feature extraction
  // In the future, this can be extended for other data types
  return extractNumericFeatures(dataset);
}

/**
 * Normalize feature vector to standard scale
 * @param {Object} features - Raw feature vector
 * @returns {Object} Normalized feature vector
 */
export function normalizeFeatures(features) {
  // This would contain normalization logic for ML models
  // For now, we'll return the features as-is
  return features;
}

export default {
  extractFeatures,
  extractNumericFeatures,
  normalizeFeatures
};