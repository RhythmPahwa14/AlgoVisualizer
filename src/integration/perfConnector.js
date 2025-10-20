/**
 * Performance Analytics Connector
 * 
 * This module connects the recommendation system to the performance analytics dashboard
 * for empirical validation and continuous learning.
 */

import { updateModelWithPerformanceData } from '../recommendation/performancePredictor.js';

/**
 * Connect performance traces to the training pipeline
 * @param {Object} performanceTrace - Performance data from algorithm execution
 * @returns {Promise} Connection promise
 */
export async function connectPerformanceTrace(performanceTrace) {
  try {
    // Validate the performance trace
    if (!performanceTrace || !performanceTrace.algorithm || !performanceTrace.datasetSize) {
      throw new Error('Invalid performance trace data');
    }
    
    // Process and format the trace for model training
    const processedTrace = processPerformanceTrace(performanceTrace);
    
    // Send to model update pipeline
    return await updateModelWithPerformanceData(processedTrace);
  } catch (error) {
    console.error('Error connecting performance trace:', error);
    throw error;
  }
}

/**
 * Process raw performance trace data
 * @param {Object} trace - Raw performance trace
 * @returns {Object} Processed trace data
 */
function processPerformanceTrace(trace) {
  return {
    algorithm: trace.algorithm,
    datasetFeatures: {
      size: trace.datasetSize,
      dataType: trace.dataType || 'numeric',
      sortedness: trace.sortedness || 0,
      duplicates: trace.duplicates || 0
    },
    performanceMetrics: {
      actualRuntime: trace.actualRuntime,
      actualMemory: trace.actualMemory,
      timeComplexity: trace.timeComplexity,
      memoryComplexity: trace.memoryComplexity
    },
    environment: {
      browser: trace.browser,
      os: trace.os,
      device: trace.device
    },
    timestamp: trace.timestamp || new Date().toISOString()
  };
}

/**
 * Compare predicted vs observed metrics
 * @param {Object} prediction - Model prediction
 * @param {Object} observation - Observed metrics
 * @returns {Object} Comparison results
 */
export function comparePredictionToObservation(prediction, observation) {
  const { predictedRuntime, predictedMemory } = prediction;
  const { actualRuntime, actualMemory } = observation;
  
  // Calculate errors
  const runtimeError = Math.abs(predictedRuntime - actualRuntime) / actualRuntime;
  const memoryError = Math.abs(predictedMemory - actualMemory) / actualMemory;
  
  // Determine accuracy
  const runtimeAccuracy = 1 - runtimeError;
  const memoryAccuracy = 1 - memoryError;
  
  return {
    prediction,
    observation,
    errors: {
      runtimeError,
      memoryError
    },
    accuracy: {
      runtimeAccuracy,
      memoryAccuracy,
      overallAccuracy: (runtimeAccuracy + memoryAccuracy) / 2
    }
  };
}

/**
 * Get performance validation report
 * @param {Array} validationData - Validation data points
 * @returns {Object} Validation report
 */
export function getPerformanceValidationReport(validationData) {
  if (!validationData || validationData.length === 0) {
    return { message: 'No validation data available' };
  }
  
  // Calculate aggregate metrics
  const totalPoints = validationData.length;
  const avgRuntimeAccuracy = validationData.reduce((sum, d) => sum + d.accuracy.runtimeAccuracy, 0) / totalPoints;
  const avgMemoryAccuracy = validationData.reduce((sum, d) => sum + d.accuracy.memoryAccuracy, 0) / totalPoints;
  const avgOverallAccuracy = validationData.reduce((sum, d) => sum + d.accuracy.overallAccuracy, 0) / totalPoints;
  
  // Count accurate predictions (within 20% error)
  const accurateRuntimePredictions = validationData.filter(d => d.errors.runtimeError < 0.2).length;
  const accurateMemoryPredictions = validationData.filter(d => d.errors.memoryError < 0.2).length;
  
  return {
    totalPoints,
    accuracy: {
      avgRuntimeAccuracy: avgRuntimeAccuracy * 100,
      avgMemoryAccuracy: avgMemoryAccuracy * 100,
      avgOverallAccuracy: avgOverallAccuracy * 100
    },
    precision: {
      runtimePrecision: (accurateRuntimePredictions / totalPoints) * 100,
      memoryPrecision: (accurateMemoryPredictions / totalPoints) * 100
    },
    validationData: validationData.slice(-10) // Last 10 points for detailed view
  };
}

/**
 * Send feedback to retraining pipeline
 * @param {Object} feedback - User feedback data
 * @returns {Promise} Retraining pipeline promise
 */
export async function sendFeedbackToRetraining(feedback) {
  // In a real implementation, this would:
  // 1. Validate feedback data
  // 2. Add to feedback dataset
  // 3. Trigger model retraining process
  // 4. Return status
  
  console.log('Feedback sent to retraining pipeline:', feedback);
  
  // For now, just return a resolved promise
  return Promise.resolve({ 
    success: true, 
    message: 'Feedback queued for model retraining',
    queuePosition: Math.floor(Math.random() * 100) // Mock queue position
  });
}

export default {
  connectPerformanceTrace,
  comparePredictionToObservation,
  getPerformanceValidationReport,
  sendFeedbackToRetraining
};