/**
 * Unit tests for the Recommendation Service module
 */

import { 
  generateRecommendations, 
  getRecommendationExplanation, 
  getPerformanceComparison 
} from '../../src/recommendation/service.js';

// Mock the feature extractor and model wrapper
jest.mock('../../src/recommendation/featureExtractor.js', () => ({
  extractFeatures: jest.fn(() => ({ 
    size: 100, 
    sortedness: 0.5,
    duplicates: 10
  })),
  normalizeFeatures: jest.fn((features) => features)
}));

jest.mock('../../src/recommendation/models/modelWrapper.js', () => ({
  mockRandomForestClassifier: jest.fn(() => [
    { algorithm: 'Quick Sort', confidence: 0.9 },
    { algorithm: 'Merge Sort', confidence: 0.8 }
  ]),
  mockRegressionModel: jest.fn((algorithm) => ({
    algorithm,
    predictedRuntime: algorithm === 'Quick Sort' ? 0.01 : 0.02,
    timeComplexity: 'O(n log n)',
    confidence: algorithm === 'Quick Sort' ? 0.9 : 0.8
  })),
  mockClusteringModel: jest.fn(() => 'general-purpose'),
  getFeatureImportance: jest.fn(() => ({ size: 0.5, sortedness: 0.3, duplicates: 0.2 }))
}));

describe('Recommendation Service', () => {
  describe('generateRecommendations', () => {
    test('should generate recommendations for a dataset', async () => {
      const dataset = [1, 2, 3, 4, 5];
      const userPreferences = { priority: 'speed' };
      
      const result = await generateRecommendations(dataset, userPreferences);
      
      expect(result).toHaveProperty('recommendations');
      expect(result).toHaveProperty('features');
      expect(result).toHaveProperty('cluster');
      expect(result.recommendations).toHaveLength(2);
      expect(result.recommendations[0].algorithm).toBe('Quick Sort');
    });
    
    test('should handle empty dataset', async () => {
      const dataset = [];
      
      await expect(generateRecommendations(dataset))
        .rejects
        .toThrow('Failed to generate algorithm recommendations');
    });
  });
  
  describe('getRecommendationExplanation', () => {
    test('should provide explanation for an algorithm', () => {
      const algorithm = 'Quick Sort';
      const features = { size: 100, sortedness: 0.5 };
      
      const explanation = getRecommendationExplanation(algorithm, features);
      
      expect(explanation).toHaveProperty('algorithm', 'Quick Sort');
      expect(explanation).toHaveProperty('explanation');
      expect(Array.isArray(explanation.explanation)).toBe(true);
    });
  });
  
  describe('getPerformanceComparison', () => {
    test('should compare performance of multiple algorithms', () => {
      const algorithms = ['Quick Sort', 'Merge Sort'];
      const features = { size: 100 };
      
      const comparison = getPerformanceComparison(algorithms, features);
      
      expect(comparison).toHaveLength(2);
      expect(comparison[0]).toHaveProperty('algorithm', 'Quick Sort');
      expect(comparison[1]).toHaveProperty('algorithm', 'Merge Sort');
    });
  });
});