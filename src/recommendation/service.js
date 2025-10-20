/**
 * Algorithm Recommendation Service
 * 
 * Main service that orchestrates the algorithm recommendation process
 * by combining feature extraction, ML models, and user preferences.
 */

import { extractFeatures, normalizeFeatures } from './featureExtractor.js';
import {
  mockRandomForestClassifier,
  mockRegressionModel,
  mockClusteringModel,
  getFeatureImportance
} from './models/modelWrapper.js';

/**
 * Generate algorithm recommendations for a dataset
 * @param {Array} dataset - Input dataset
 * @param {Object} userPreferences - User preferences for recommendation
 * @returns {Object} Recommendation results
 */
export async function generateRecommendations(dataset, userPreferences = {}) {
  try {
    // Step 1: Extract features from dataset
    const rawFeatures = extractFeatures(dataset);
    const features = normalizeFeatures(rawFeatures);
    
    // Step 2: Get algorithm recommendations from classification model
    let recommendations = mockRandomForestClassifier(features);
    
    // Step 3: Get performance predictions for each recommended algorithm
    recommendations = recommendations.map(rec => {
      const performance = mockRegressionModel(rec.algorithm, features);
      const importance = getFeatureImportance(rec.algorithm, features);
      return {
        ...rec,
        ...performance,
        featureImportance: importance
      };
    });
    
    // Step 4: Apply user preferences to re-weight recommendations
    if (userPreferences) {
      recommendations = applyUserPreferences(recommendations, userPreferences);
    }
    
    // Step 5: Get dataset cluster for template recommendations
    const cluster = mockClusteringModel(features);
    
    // Step 6: Add confidence intervals and uncertainty estimates
    recommendations = recommendations.map(rec => ({
      ...rec,
      uncertainty: 1 - rec.confidence // Simple uncertainty measure
    }));
    
    return {
      recommendations,
      features,
      cluster,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error generating recommendations:', error);
    throw new Error('Failed to generate algorithm recommendations');
  }
}

/**
 * Apply user preferences to re-weight recommendations
 * @param {Array} recommendations - List of algorithm recommendations
 * @param {Object} preferences - User preferences
 * @returns {Array} Re-weighted recommendations
 */
function applyUserPreferences(recommendations, preferences) {
  return recommendations.map(rec => {
    let score = rec.confidence;
    
    // Adjust based on user priorities
    if (preferences.priority === 'speed' && rec.timeComplexity.includes('log')) {
      score *= 1.2; // Boost logarithmic algorithms for speed priority
    } else if (preferences.priority === 'memory') {
      // In a real implementation, we would have memory usage data
      // For now, we'll boost in-place sorting algorithms
      const inPlaceAlgorithms = ['Quick Sort', 'Heap Sort', 'Insertion Sort', 'Selection Sort'];
      if (inPlaceAlgorithms.includes(rec.algorithm)) {
        score *= 1.1;
      }
    }
    
    // Adjust based on user history (if available)
    if (preferences.history) {
      const algoHistory = preferences.history[rec.algorithm];
      if (algoHistory) {
        // Boost algorithms with positive feedback
        if (algoHistory.feedback === 'positive') {
          score *= 1.1;
        } else if (algoHistory.feedback === 'negative') {
          score *= 0.8;
        }
      }
    }
    
    return {
      ...rec,
      adjustedScore: score
    };
  }).sort((a, b) => (b.adjustedScore || b.confidence) - (a.adjustedScore || a.confidence));
}

/**
 * Get detailed explanation for a recommendation
 * @param {string} algorithm - Algorithm name
 * @param {Object} features - Dataset features
 * @returns {Object} Explanation details
 */
export function getRecommendationExplanation(algorithm, features) {
  const importance = getFeatureImportance(algorithm, features);
  
  // Generate explanation based on feature importance
  const explanation = [];
  
  if (importance.size > 0.4) {
    explanation.push(`${algorithm} is recommended because your dataset has ${features.size} elements, which affects its time complexity.`);
  }
  
  if (importance.sortedness > 0.2 && features.sortedness) {
    if (features.sortedness > 0.8) {
      explanation.push(`The data is nearly sorted (${Math.round(features.sortedness * 100)}% sorted), making algorithms like Insertion Sort efficient.`);
    } else {
      explanation.push(`The data sorting level (${Math.round(features.sortedness * 100)}% sorted) influences the recommendation.`);
    }
  }
  
  if (importance.duplicates > 0.1 && features.duplicates > 0) {
    explanation.push(`Your dataset contains ${features.duplicates} duplicate values, which affects algorithm performance.`);
  }
  
  return {
    algorithm,
    explanation,
    featureImportance: importance
  };
}

/**
 * Record user feedback for recommendation improvement
 * @param {string} algorithm - Algorithm name
 * @param {Object} feedback - User feedback
 * @returns {Promise} Feedback recording promise
 */
export async function recordFeedback(algorithm, feedback) {
  // In a real implementation, this would persist feedback to storage
  // For now, we'll just log it
  console.log(`Feedback recorded for ${algorithm}:`, feedback);
  
  // In a real system, this would:
  // 1. Store feedback in a database
  // 2. Update user preference profiles
  // 3. Queue feedback for model retraining
  // 4. Return a confirmation
  
  return Promise.resolve({ success: true });
}

/**
 * Get algorithm performance comparison
 * @param {Array} algorithms - List of algorithm names
 * @param {Object} features - Dataset features
 * @returns {Array} Performance comparison data
 */
export function getPerformanceComparison(algorithms, features) {
  return algorithms.map(algorithm => {
    const performance = mockRegressionModel(algorithm, features);
    const importance = getFeatureImportance(algorithm, features);
    return {
      ...performance,
      featureImportance: importance
    };
  });
}

export default {
  generateRecommendations,
  getRecommendationExplanation,
  recordFeedback,
  getPerformanceComparison
};