/**
 * Integration tests for the Recommendation System
 */

import { generateRecommendations } from '../../src/recommendation/service.js';
import recommendationHistory from '../../src/storage/recommendationHistory.js';

describe('Recommendation System Integration', () => {
  beforeEach(() => {
    // Clear history before each test
    recommendationHistory.clear();
  });
  
  test('should generate and save recommendations', async () => {
    const dataset = [5, 2, 8, 1, 9, 3, 7, 4, 6];
    const userPreferences = { userId: 'test-user', priority: 'speed' };
    
    // Generate recommendations
    const result = await generateRecommendations(dataset, userPreferences);
    
    // Verify the result structure
    expect(result).toHaveProperty('recommendations');
    expect(result).toHaveProperty('features');
    expect(result).toHaveProperty('cluster');
    expect(result.recommendations.length).toBeGreaterThan(0);
    
    // Verify that recommendations have required properties
    const firstRecommendation = result.recommendations[0];
    expect(firstRecommendation).toHaveProperty('algorithm');
    expect(firstRecommendation).toHaveProperty('confidence');
    expect(firstRecommendation).toHaveProperty('predictedRuntime');
    expect(firstRecommendation).toHaveProperty('timeComplexity');
  });
  
  test('should handle different dataset sizes', async () => {
    // Test with small dataset
    const smallDataset = [1, 2, 3, 4, 5];
    const smallResult = await generateRecommendations(smallDataset);
    expect(smallResult.recommendations.length).toBeGreaterThan(0);
    
    // Test with large dataset
    const largeDataset = Array.from({length: 10000}, (_, i) => i);
    const largeResult = await generateRecommendations(largeDataset);
    expect(largeResult.recommendations.length).toBeGreaterThan(0);
  });
  
  test('should apply user preferences', async () => {
    const dataset = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3];
    const preferences = { priority: 'memory' };
    
    const result = await generateRecommendations(dataset, preferences);
    
    // Verify that recommendations were generated
    expect(result.recommendations.length).toBeGreaterThan(0);
    
    // Check that features were extracted
    expect(result.features.size).toBe(dataset.length);
  });
});