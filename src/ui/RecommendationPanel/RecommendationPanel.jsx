/**
 * Algorithm Recommendation Panel
 * 
 * Main UI component for displaying algorithm recommendations with explanations and feedback controls.
 */

import React, { useState, useEffect } from 'react';
import RecommendationList from './RecommendationList';
import ExplanationPane from './ExplanationPane';
import PerformanceComparison from './PerformanceComparison';
import FeedbackControls from './FeedbackControls';
// Import the actual recommendation service instead of using mock data
import { generateRecommendations as generateActualRecommendations } from '../../recommendation/service';

const RecommendationPanel = ({ dataset, userPreferences, onAlgorithmSelect }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generate recommendations when dataset changes
  useEffect(() => {
    if (dataset && dataset.length > 0) {
      generateRecommendations();
    }
  }, [dataset, userPreferences]);

  // Generate recommendations using the actual recommendation service
  const generateRecommendations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Call the actual recommendation service
      const result = await generateActualRecommendations(dataset, userPreferences);
      
      // Extract recommendations from the result
      const actualRecommendations = result.recommendations || [];
      
      setRecommendations(actualRecommendations);
      
      // Select the top recommendation by default
      if (actualRecommendations.length > 0) {
        setSelectedAlgorithm(actualRecommendations[0]);
      }
    } catch (err) {
      setError('Failed to generate recommendations. Please try again.');
      console.error('Recommendation generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle algorithm selection
  const handleAlgorithmSelect = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    if (onAlgorithmSelect) {
      onAlgorithmSelect(algorithm);
    }
  };

  // Handle feedback submission
  const handleFeedback = (feedback, comment) => {
    // In a real implementation, this would call the recommendation service
    console.log(`Feedback for ${selectedAlgorithm?.algorithm}: ${feedback}`, comment);
    
    // Show confirmation
    alert(`Thank you for your feedback! This will help improve future recommendations.`);
  };

  if (loading) {
    return (
      <div className="recommendation-panel p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-lg text-gray-600">Analyzing dataset and generating recommendations...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recommendation-panel p-6 bg-white rounded-lg shadow-md">
        <div className="text-center py-8">
          <div className="text-red-500 text-2xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Generating Recommendations</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={generateRecommendations}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="recommendation-panel bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Algorithm Recommendations</h2>
        <p className="text-gray-600 mt-1">
          Based on your dataset of {dataset?.length || 0} elements
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Recommendations List */}
        <div className="lg:col-span-1">
          <RecommendationList 
            recommendations={recommendations}
            selectedAlgorithm={selectedAlgorithm}
            onSelect={handleAlgorithmSelect}
          />
        </div>
        
        {/* Explanation and Details */}
        <div className="lg:col-span-2 space-y-6">
          {selectedAlgorithm && (
            <>
              <ExplanationPane 
                algorithm={selectedAlgorithm}
                dataset={dataset}
              />
              
              <PerformanceComparison 
                algorithm={selectedAlgorithm}
                allRecommendations={recommendations}
              />
              
              <FeedbackControls 
                onFeedback={handleFeedback}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationPanel;