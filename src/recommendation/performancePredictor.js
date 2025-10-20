/**
 * Performance Prediction System for Algorithm Recommendation
 * 
 * This module predicts empirical time complexity, absolute runtimes,
 * and memory usage for algorithms based on dataset characteristics.
 */

import { mockRegressionModel } from './models/modelWrapper.js';

/**
 * Predict performance metrics for an algorithm on a dataset
 * @param {string} algorithm - Algorithm name
 * @param {Object} features - Dataset features
 * @returns {Object} Performance predictions with confidence intervals
 */
export function predictPerformance(algorithm, features) {
  // Get base performance prediction from regression model
  const basePrediction = mockRegressionModel(algorithm, features);
  
  // Add memory usage prediction (simplified model)
  const memoryPrediction = predictMemoryUsage(algorithm, features);
  
  // Add confidence/uncertainty estimates
  const confidence = calculateConfidence(algorithm, features);
  
  return {
    ...basePrediction,
    ...memoryPrediction,
    confidence,
    uncertainty: 1 - confidence
  };
}

/**
 * Predict memory usage for an algorithm
 * @param {string} algorithm - Algorithm name
 * @param {Object} features - Dataset features
 * @returns {Object} Memory usage prediction
 */
function predictMemoryUsage(algorithm, features) {
  // Simplified memory usage model based on algorithm characteristics
  let baseMemory, growthFactor;
  
  switch (algorithm) {
    // In-place algorithms (low memory usage)
    case 'Bubble Sort':
    case 'Insertion Sort':
    case 'Selection Sort':
    case 'Heap Sort':
    case 'Quick Sort':
      baseMemory = 1; // O(1) extra space
      growthFactor = 0;
      break;
      
    // Logarithmic extra space algorithms
    case 'Merge Sort':
      baseMemory = 10; // O(n) extra space
      growthFactor = 1;
      break;
      
    // Linear extra space algorithms
    case 'Bucket Sort':
    case 'Radix Sort':
      baseMemory = 50; // O(n+k) extra space
      growthFactor = 1.1;
      break;
      
    // Search algorithms
    case 'Binary Search':
      baseMemory = 1; // O(1) extra space
      growthFactor = 0;
      break;
    case 'Linear Search':
      baseMemory = 1; // O(1) extra space
      growthFactor = 0;
      break;
      
    // Default case
    default:
      baseMemory = 10;
      growthFactor = 1;
  }
  
  // Calculate memory usage based on dataset size
  const predictedMemory = baseMemory * Math.pow(features.size || 1, growthFactor);
  
  return {
    predictedMemory: predictedMemory,
    memoryComplexity: growthFactor === 0 ? 'O(1)' : 
                     growthFactor === 1 ? 'O(n)' : 
                     'O(n log n)',
    peakMemory: predictedMemory * 1.2, // Include some buffer
    averageMemory: predictedMemory * 0.8
  };
}

/**
 * Calculate confidence score for predictions
 * @param {string} algorithm - Algorithm name
 * @param {Object} features - Dataset features
 * @returns {number} Confidence score (0-1)
 */
function calculateConfidence(algorithm, features) {
  // Base confidence from model
  let confidence = 0.8;
  
  // Adjust based on dataset size (larger datasets = more confidence)
  if (features.size > 10000) {
    confidence = Math.min(0.95, confidence + 0.1);
  } else if (features.size < 100) {
    confidence = Math.max(0.6, confidence - 0.2);
  }
  
  // Adjust based on feature completeness
  const featureCount = Object.keys(features).length;
  if (featureCount < 5) {
    confidence = Math.max(0.5, confidence - 0.2);
  }
  
  return confidence;
}

/**
 * Generate performance prediction with confidence intervals
 * @param {string} algorithm - Algorithm name
 * @param {Object} features - Dataset features
 * @returns {Object} Performance prediction with intervals
 */
export function predictPerformanceWithIntervals(algorithm, features) {
  const prediction = predictPerformance(algorithm, features);
  
  // Calculate prediction intervals based on uncertainty
  const { predictedRuntime, predictedMemory, uncertainty } = prediction;
  
  return {
    ...prediction,
    runtimeInterval: {
      lower: predictedRuntime * (1 - uncertainty),
      upper: predictedRuntime * (1 + uncertainty)
    },
    memoryInterval: {
      lower: predictedMemory * (1 - uncertainty * 0.5),
      upper: predictedMemory * (1 + uncertainty * 0.5)
    }
  };
}

/**
 * Continuous learning function to update models with new performance data
 * @param {Object} performanceTrace - New performance data
 * @returns {Promise} Model update promise
 */
export async function updateModelWithPerformanceData(performanceTrace) {
  // In a real implementation, this would:
  // 1. Validate the performance trace data
  // 2. Add it to the training dataset
  // 3. Trigger incremental model updates
  // 4. Evaluate model performance
  
  console.log('Performance trace received for model update:', performanceTrace);
  
  // For now, just return a resolved promise
  return Promise.resolve({ success: true, message: 'Performance data queued for model update' });
}

/**
 * Get performance trends over time
 * @param {string} algorithm - Algorithm name
 * @param {Array} historicalData - Historical performance data
 * @returns {Object} Performance trends
 */
export function getPerformanceTrends(algorithm, historicalData) {
  if (!historicalData || historicalData.length === 0) {
    return { trend: 'insufficient_data' };
  }
  
  // Simple trend analysis
  const recent = historicalData.slice(-5); // Last 5 data points
  const oldest = historicalData[0];
  const newest = historicalData[historicalData.length - 1];
  
  const improvement = ((oldest.runtime - newest.runtime) / oldest.runtime) * 100;
  
  return {
    trend: improvement > 5 ? 'improving' : improvement < -5 ? 'degrading' : 'stable',
    improvementPercentage: improvement,
    recentPerformance: recent
  };
}

export default {
  predictPerformance,
  predictPerformanceWithIntervals,
  updateModelWithPerformanceData,
  getPerformanceTrends
};