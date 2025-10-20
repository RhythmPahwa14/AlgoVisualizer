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

  // Generate recommendations using the recommendation service
  const generateRecommendations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would import and call the recommendation service
      // For now, we'll simulate the response
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock recommendations based on dataset size
      const mockRecommendations = generateMockRecommendations(dataset);
      
      setRecommendations(mockRecommendations);
      
      // Select the top recommendation by default
      if (mockRecommendations.length > 0) {
        setSelectedAlgorithm(mockRecommendations[0]);
      }
    } catch (err) {
      setError('Failed to generate recommendations. Please try again.');
      console.error('Recommendation generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Generate mock recommendations for demonstration
  const generateMockRecommendations = (data) => {
    const size = data.length;
    
    if (size > 10000) {
      return [
        { 
          algorithm: 'Merge Sort', 
          confidence: 0.95, 
          predictedRuntime: 0.045,
          timeComplexity: 'O(n log n)',
          predictedMemory: 1200,
          memoryComplexity: 'O(n)'
        },
        { 
          algorithm: 'Quick Sort', 
          confidence: 0.92, 
          predictedRuntime: 0.038,
          timeComplexity: 'O(n log n)',
          predictedMemory: 800,
          memoryComplexity: 'O(log n)'
        },
        { 
          algorithm: 'Heap Sort', 
          confidence: 0.88, 
          predictedRuntime: 0.052,
          timeComplexity: 'O(n log n)',
          predictedMemory: 900,
          memoryComplexity: 'O(1)'
        }
      ];
    } else if (size < 50) {
      return [
        { 
          algorithm: 'Insertion Sort', 
          confidence: 0.85, 
          predictedRuntime: 0.001,
          timeComplexity: 'O(n²)',
          predictedMemory: 200,
          memoryComplexity: 'O(1)'
        },
        { 
          algorithm: 'Selection Sort', 
          confidence: 0.80, 
          predictedRuntime: 0.0015,
          timeComplexity: 'O(n²)',
          predictedMemory: 150,
          memoryComplexity: 'O(1)'
        },
        { 
          algorithm: 'Bubble Sort', 
          confidence: 0.75, 
          predictedRuntime: 0.002,
          timeComplexity: 'O(n²)',
          predictedMemory: 100,
          memoryComplexity: 'O(1)'
        }
      ];
    } else {
      return [
        { 
          algorithm: 'Quick Sort', 
          confidence: 0.90, 
          predictedRuntime: 0.012,
          timeComplexity: 'O(n log n)',
          predictedMemory: 600,
          memoryComplexity: 'O(log n)'
        },
        { 
          algorithm: 'Merge Sort', 
          confidence: 0.88, 
          predictedRuntime: 0.015,
          timeComplexity: 'O(n log n)',
          predictedMemory: 800,
          memoryComplexity: 'O(n)'
        },
        { 
          algorithm: 'Intro Sort', 
          confidence: 0.85, 
          predictedRuntime: 0.013,
          timeComplexity: 'O(n log n)',
          predictedMemory: 700,
          memoryComplexity: 'O(log n)'
        }
      ];
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