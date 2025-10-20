/**
 * Performance Comparison Component
 * 
 * Shows a comparison matrix of predicted performance for recommended algorithms.
 */

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const PerformanceComparison = ({ algorithm, allRecommendations }) => {
  // Prepare data for charts
  const chartData = allRecommendations.map(rec => ({
    name: rec.algorithm,
    runtime: rec.predictedRuntime * 1000, // Convert to milliseconds
    memory: rec.predictedMemory || 0
  }));

  // Find the selected algorithm data
  const selectedData = chartData.find(d => d.name === algorithm.algorithm);

  return (
    <div className="performance-comparison bg-gray-50 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Comparison</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Runtime Comparison Chart */}
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Predicted Runtime (ms)</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 'dataMax + 10']} />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value) => [`${value.toFixed(2)} ms`, 'Runtime']}
                  labelFormatter={(name) => `Algorithm: ${name}`}
                />
                <Legend />
                <Bar 
                  dataKey="runtime" 
                  name="Runtime (ms)" 
                  fill="#3b82f6" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Memory Usage Comparison Chart */}
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Estimated Memory Usage (KB)</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 'dataMax + 100']} />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value) => [`${value} KB`, 'Memory']}
                  labelFormatter={(name) => `Algorithm: ${name}`}
                />
                <Legend />
                <Bar 
                  dataKey="memory" 
                  name="Memory (KB)" 
                  fill="#10b981" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Detailed Comparison Table */}
      <div className="mt-6 overflow-x-auto">
        <h4 className="font-medium text-gray-700 mb-2">Detailed Comparison</h4>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Algorithm</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Complexity</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Predicted Runtime</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Memory Complexity</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Memory</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allRecommendations.map((rec) => (
              <tr 
                key={rec.algorithm} 
                className={rec.algorithm === algorithm.algorithm ? 'bg-blue-50' : ''}
              >
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                  {rec.algorithm}
                  {rec.algorithm === algorithm.algorithm && (
                    <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Selected</span>
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{rec.timeComplexity}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{rec.predictedRuntime?.toFixed(4)}s</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{rec.memoryComplexity}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{rec.predictedMemory || 0} KB</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${rec.confidence * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">{Math.round(rec.confidence * 100)}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PerformanceComparison;