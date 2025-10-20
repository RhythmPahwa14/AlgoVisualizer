/**
 * Recommendation List Component
 * 
 * Displays a list of recommended algorithms with confidence scores.
 */

import React from 'react';

const RecommendationList = ({ recommendations, selectedAlgorithm, onSelect }) => {
  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return 'bg-green-500';
    if (confidence >= 0.7) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getConfidenceLabel = (confidence) => {
    if (confidence >= 0.9) return 'High';
    if (confidence >= 0.7) return 'Medium';
    return 'Low';
  };

  return (
    <div className="recommendation-list bg-gray-50 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Recommendations</h3>
      
      {recommendations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No recommendations available</p>
          <p className="text-sm mt-2">Upload a dataset to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div
              key={rec.algorithm}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border ${
                selectedAlgorithm?.algorithm === rec.algorithm
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
              }`}
              onClick={() => onSelect(rec)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <span className="text-lg font-medium text-gray-800">{index + 1}.</span>
                    <h4 className="ml-2 text-lg font-semibold text-gray-800">{rec.algorithm}</h4>
                  </div>
                  
                  <div className="mt-2 flex items-center">
                    <span className="text-sm text-gray-600 mr-2">Confidence:</span>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${getConfidenceColor(rec.confidence)} mr-2`}></div>
                      <span className="text-sm font-medium">
                        {Math.round(rec.confidence * 100)}% ({getConfidenceLabel(rec.confidence)})
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    {rec.timeComplexity}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {rec.predictedRuntime?.toFixed(4)}s
                  </div>
                </div>
              </div>
              
              <div className="mt-3 flex justify-between text-sm">
                <div>
                  <span className="text-gray-600">Memory:</span>
                  <span className="ml-1 font-medium">{rec.memoryComplexity}</span>
                </div>
                <div>
                  <span className="text-gray-600">Est. Memory:</span>
                  <span className="ml-1 font-medium">{rec.predictedMemory || 0} KB</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationList;