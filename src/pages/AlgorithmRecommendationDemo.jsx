/**
 * Algorithm Recommendation Demo Page
 * 
 * A demonstration page showing the algorithm recommendation system in action.
 */

import React, { useState } from 'react';
import RecommendationPanel from '../ui/RecommendationPanel/RecommendationPanel';
import { generateRecommendations } from '../recommendation/service';

const AlgorithmRecommendationDemo = () => {
  const [dataset, setDataset] = useState([]);
  const [inputText, setInputText] = useState('');
  const [userPreferences, setUserPreferences] = useState({});
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);

  // Generate sample dataset
  const generateSampleData = (size) => {
    const data = [];
    for (let i = 0; i < size; i++) {
      data.push(Math.floor(Math.random() * 1000));
    }
    return data;
  };

  // Handle text input conversion to dataset
  const handleTextToDataset = () => {
    try {
      const numbers = inputText
        .split(/[\s,]+/)
        .map(item => parseFloat(item.trim()))
        .filter(item => !isNaN(item));
      
      setDataset(numbers);
    } catch (error) {
      alert('Error parsing input. Please enter numbers separated by spaces or commas.');
    }
  };

  // Handle algorithm selection
  const handleAlgorithmSelect = (algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  // Handle preference changes
  const handlePreferenceChange = (pref, value) => {
    setUserPreferences(prev => ({
      ...prev,
      [pref]: value
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Algorithm Recommendation System</h1>
        <p className="text-lg text-gray-600">
          Intelligent algorithm suggestions based on your dataset characteristics
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Dataset Input</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter numbers (space or comma separated)
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 5 2 8 1 9 3 7 4 6"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <button
                  onClick={handleTextToDataset}
                  className="mt-2 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Convert to Dataset
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDataset(generateSampleData(10))}
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Small Sample (10)
                </button>
                <button
                  onClick={() => setDataset(generateSampleData(1000))}
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Large Sample (1000)
                </button>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-md font-medium text-gray-800 mb-2">Preferences</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={userPreferences.priority || ''}
                      onChange={(e) => handlePreferenceChange('priority', e.target.value)}
                    >
                      <option value="">No preference</option>
                      <option value="speed">Speed</option>
                      <option value="memory">Memory</option>
                      <option value="accuracy">Accuracy</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Learning Style
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={userPreferences.learningStyle || ''}
                      onChange={(e) => handlePreferenceChange('learningStyle', e.target.value)}
                    >
                      <option value="">No preference</option>
                      <option value="visual">Visual</option>
                      <option value="theoretical">Theoretical</option>
                      <option value="practical">Practical</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Dataset Info */}
          {dataset.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Dataset Information</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-medium">{dataset.length} elements</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Min Value:</span>
                  <span className="font-medium">{Math.min(...dataset)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Value:</span>
                  <span className="font-medium">{Math.max(...dataset)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mean:</span>
                  <span className="font-medium">
                    {(dataset.reduce((a, b) => a + b, 0) / dataset.length).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Recommendation Panel */}
        <div className="lg:col-span-2">
          {dataset.length > 0 ? (
            <RecommendationPanel 
              dataset={dataset}
              userPreferences={userPreferences}
              onAlgorithmSelect={handleAlgorithmSelect}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Get Algorithm Recommendations</h3>
              <p className="text-gray-600 mb-6">
                Enter a dataset or generate a sample to get intelligent algorithm recommendations
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setDataset(generateSampleData(10))}
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Generate Small Sample
                </button>
                <button
                  onClick={() => setDataset(generateSampleData(1000))}
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Generate Large Sample
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Selected Algorithm Info */}
      {selectedAlgorithm && (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Selected Algorithm: {selectedAlgorithm.algorithm}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-1">Performance</h3>
              <p className="text-sm text-gray-600">
                Time Complexity: {selectedAlgorithm.timeComplexity}
              </p>
              <p className="text-sm text-gray-600">
                Predicted Runtime: {selectedAlgorithm.predictedRuntime?.toFixed(4)}s
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-800 mb-1">Memory</h3>
              <p className="text-sm text-gray-600">
                Memory Complexity: {selectedAlgorithm.memoryComplexity}
              </p>
              <p className="text-sm text-gray-600">
                Estimated Usage: {selectedAlgorithm.predictedMemory || 0} KB
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-medium text-purple-800 mb-1">Confidence</h3>
              <p className="text-sm text-gray-600">
                Recommendation Confidence: {Math.round(selectedAlgorithm.confidence * 100)}%
              </p>
              <p className="text-sm text-gray-600">
                Uncertainty: {Math.round(selectedAlgorithm.uncertainty * 100)}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlgorithmRecommendationDemo;