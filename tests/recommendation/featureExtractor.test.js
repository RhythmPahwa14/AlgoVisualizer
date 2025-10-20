/**
 * Unit tests for the Feature Extractor module
 */

import { extractFeatures, extractNumericFeatures } from '../../src/recommendation/featureExtractor.js';

describe('Feature Extractor', () => {
  describe('extractNumericFeatures', () => {
    test('should extract features from a numeric array', () => {
      const dataset = [1, 2, 3, 4, 5];
      const features = extractNumericFeatures(dataset);
      
      expect(features).toHaveProperty('size', 5);
      expect(features).toHaveProperty('mean', 3);
      expect(features).toHaveProperty('min', 1);
      expect(features).toHaveProperty('max', 5);
      expect(features).toHaveProperty('dataType', 'integer');
    });
    
    test('should handle empty array', () => {
      const dataset = [];
      const features = extractNumericFeatures(dataset);
      
      expect(Object.keys(features)).toHaveLength(0);
    });
    
    test('should calculate statistics correctly', () => {
      const dataset = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const features = extractNumericFeatures(dataset);
      
      expect(features.mean).toBe(5.5);
      expect(features.median).toBe(5.5);
      expect(features.min).toBe(1);
      expect(features.max).toBe(10);
      expect(features.range).toBe(9);
    });
    
    test('should detect sortedness', () => {
      const sortedDataset = [1, 2, 3, 4, 5];
      const unsortedDataset = [5, 1, 3, 2, 4];
      
      const sortedFeatures = extractNumericFeatures(sortedDataset);
      const unsortedFeatures = extractNumericFeatures(unsortedDataset);
      
      expect(sortedFeatures.sortedness).toBe(1);
      expect(sortedFeatures.nearlySorted).toBe(true);
      expect(unsortedFeatures.sortedness).toBeLessThan(1);
    });
    
    test('should detect duplicates', () => {
      const dataset = [1, 2, 2, 3, 3, 3];
      const features = extractNumericFeatures(dataset);
      
      expect(features.duplicates).toBe(3); // 3 duplicate elements
    });
  });
  
  describe('extractFeatures', () => {
    test('should handle general dataset', () => {
      const dataset = [1, 2, 3, 4, 5];
      const features = extractFeatures(dataset);
      
      expect(features).toHaveProperty('size', 5);
      expect(features).toHaveProperty('mean', 3);
    });
    
    test('should handle invalid input', () => {
      expect(extractFeatures(null)).toEqual({});
      expect(extractFeatures(undefined)).toEqual({});
      expect(extractFeatures("not an array")).toEqual({});
    });
  });
});