/**
 * Verification script for the recommendation system fix
 */

// Simple test to verify our changes work
async function verifyFix() {
  try {
    // Import the recommendation service
    const { generateRecommendations } = await import('./src/recommendation/service.js');
    
    // Test with a small dataset
    const testData = [5, 2, 8, 1, 9, 3, 7, 4, 6];
    const userPreferences = { priority: 'speed' };
    
    console.log('Testing recommendation system with dataset:', testData);
    
    const result = await generateRecommendations(testData, userPreferences);
    
    console.log('Recommendations generated successfully:');
    console.log('Features extracted:', result.features);
    console.log('Recommendations:', result.recommendations);
    console.log('Cluster:', result.cluster);
    
    // Verify the result structure
    if (result.recommendations && result.recommendations.length > 0) {
      console.log('✅ Fix verification successful: Recommendations generated correctly');
      return true;
    } else {
      console.log('❌ Fix verification failed: No recommendations generated');
      return false;
    }
  } catch (error) {
    console.error('❌ Fix verification failed with error:', error);
    return false;
  }
}

// Run the verification
verifyFix();