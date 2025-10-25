/**
 * Simple test to verify the recommendation system fix
 */

import { generateRecommendations } from './service.js';

// Test with a small dataset
const testData = [5, 2, 8, 1, 9, 3, 7, 4, 6];
const userPreferences = { priority: 'speed' };

console.log('Testing recommendation system with dataset:', testData);

generateRecommendations(testData, userPreferences)
  .then(result => {
    console.log('Recommendations generated successfully:');
    console.log('Features extracted:', result.features);
    console.log('Recommendations:', result.recommendations);
    console.log('Cluster:', result.cluster);
  })
  .catch(error => {
    console.error('Error generating recommendations:', error);
  });