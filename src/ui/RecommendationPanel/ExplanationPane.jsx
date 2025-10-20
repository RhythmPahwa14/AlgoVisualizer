/**
 * Explanation Pane Component
 * 
 * Shows why a recommendation was made with feature importance and explanations.
 */

import React from 'react';

const ExplanationPane = ({ algorithm, dataset }) => {
  // Mock feature importance data
  const featureImportance = {
    'Quick Sort': { size: 0.4, distribution: 0.3, duplicates: 0.2, sortedness: 0.1 },
    'Merge Sort': { size: 0.5, distribution: 0.3, duplicates: 0.2 },
    'Insertion Sort': { size: 0.3, sortedness: 0.5, duplicates: 0.2 },
    'Bubble Sort': { size: 0.4, sortedness: 0.4, duplicates: 0.2 },
    'Selection Sort': { size: 0.5, duplicates: 0.3, distribution: 0.2 },
    'Heap Sort': { size: 0.6, distribution: 0.3, duplicates: 0.1 }
  };

  // Mock explanations based on dataset characteristics
  const generateExplanation = (algo, data) => {
    const size = data.length;
    const explanations = [];
    
    if (size > 10000) {
      explanations.push("Your dataset is large, so algorithms with O(n log n) complexity are recommended for efficiency.");
    } else if (size < 50) {
      explanations.push("Your dataset is small, making simpler algorithms like Insertion Sort efficient and easy to understand.");
    } else {
      explanations.push("Your dataset size is moderate, allowing for a balance between efficiency and simplicity.");
    }
    
    switch (algo) {
      case 'Quick Sort':
        explanations.push("Quick Sort is recommended because it has excellent average-case performance and is cache-efficient.");
        break;
      case 'Merge Sort':
        explanations.push("Merge Sort is recommended for its guaranteed O(n log n) performance and stability.");
        break;
      case 'Insertion Sort':
        explanations.push("Insertion Sort is recommended for small datasets due to its simplicity and low overhead.");
        break;
      case 'Heap Sort':
        explanations.push("Heap Sort is recommended for its consistent O(n log n) performance and in-place sorting.");
        break;
      default:
        explanations.push("This algorithm is well-suited for your data characteristics.");
    }
    
    return explanations;
  };

  const importance = featureImportance[algorithm.algorithm] || {};
  const explanations = generateExplanation(algorithm.algorithm, dataset);

  return (
    <div className="explanation-pane bg-gray-50 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Why {algorithm.algorithm}?
      </h3>
      
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Explanation</h4>
        <ul className="list-disc pl-5 space-y-1">
          {explanations.map((explanation, index) => (
            <li key={index} className="text-gray-600">{explanation}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-700 mb-2">Feature Importance</h4>
        <div className="space-y-2">
          {Object.entries(importance).map(([feature, weight]) => (
            <div key={feature} className="flex items-center">
              <span className="w-32 text-gray-600 capitalize">{feature}</span>
              <div className="flex-1 ml-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${weight * 100}%` }}
                  ></div>
                </div>
              </div>
              <span className="w-12 text-right text-sm text-gray-600 ml-2">
                {Math.round(weight * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-1">Performance Metrics</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-600">Time Complexity:</span>
            <span className="ml-1 font-medium">{algorithm.timeComplexity}</span>
          </div>
          <div>
            <span className="text-gray-600">Predicted Runtime:</span>
            <span className="ml-1 font-medium">{algorithm.predictedRuntime?.toFixed(4)}s</span>
          </div>
          <div>
            <span className="text-gray-600">Memory Complexity:</span>
            <span className="ml-1 font-medium">{algorithm.memoryComplexity}</span>
          </div>
          <div>
            <span className="text-gray-600">Est. Memory Usage:</span>
            <span className="ml-1 font-medium">{algorithm.predictedMemory || 0} KB</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplanationPane;