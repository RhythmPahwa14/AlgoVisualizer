import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { runPerformanceAnalysis, generateTestData } from '../utils/performanceAnalyzer';
import { performanceAlgorithms } from '../algorithms/performanceAlgorithms';

// ✅ Import AlgorithmUtils to get complexity information
import { AlgorithmUtils } from '../algorithms/runner';

const ComplexityAnalyzer = ({ algorithm, algorithmName, complexity }) => {
  const [performanceData, setPerformanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [testDataType, setTestDataType] = useState('random');
  const [dataSizes, setDataSizes] = useState([10, 50, 100, 500, 1000]);
  
  useEffect(() => {
    if (algorithmName) {
      runAnalysis();
    }
  }, [algorithmName, testDataType]);
  
  const runAnalysis = async () => {
    // Use the performance algorithm if available, otherwise use the provided algorithm
    const algoToUse = performanceAlgorithms[algorithmName] || algorithm;
    
    if (!algoToUse) return;
    
    setIsLoading(true);
    
    try {
      // Run performance analysis with different data sizes
      const results = runPerformanceAnalysis(
        (data) => {
          // For search algorithms, we need a target
          if (algorithmName.includes('Search')) {
            const target = data[Math.floor(data.length / 2)]; // Use middle element as target
            return algoToUse([...data], target);
          }
          return algoToUse([...data]);
        }, 
        dataSizes
      );
      
      setPerformanceData(results);
    } catch (error) {
      console.error('Error running performance analysis:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDataTypeChange = (e) => {
    setTestDataType(e.target.value);
  };
  
  const handleDataSizesChange = (e) => {
    const sizes = e.target.value.split(',').map(size => parseInt(size.trim())).filter(size => !isNaN(size));
    setDataSizes(sizes);
  };
  
  // ✅ Get complexity information if not provided
  const algorithmComplexity = complexity || AlgorithmUtils.getTimeComplexity(algorithmName);
  
  return (
    <div className="complexity-analyzer flex flex-col gap-5 mt-8 !p-6 rounded-lg shadow-2xl">
      <h3 className="text-xl text-center font-bold mb-4 text-white">Performance Analysis</h3>
      
      {/* ✅ Display algorithm complexity */}
      {algorithmComplexity && algorithmComplexity !== "Unknown" && (
        <div className="bg-gray-700 rounded-lg p-4 mb-4">
          <h4 className="text-lg font-semibold text-white">Algorithm Complexity</h4>
          <p className="text-gray-200">Time Complexity: <span className="font-mono">{algorithmComplexity}</span></p>
        </div>
      )}
      
      <div className="mb-4 flex flex-wrap gap-4">
        <div className='flex flex-col gap-2 justify-center items-center'>
          <label className="block text-sm font-medium mb-1">Test Data Type</label>
          <select 
            value={testDataType} 
            onChange={handleDataTypeChange}
            className="bg-gray-700 !border-2 !border-gray-800 text-white rounded shadow-2xl px-3 py-2"
          >
            <option value="random">Random</option>
            <option value="sorted">Sorted</option>
            <option value="reverse">Reverse Sorted</option>
            <option value="nearlySorted">Nearly Sorted</option>
          </select>
        </div>
        
        <div className='flex flex-col gap-2 justify-center items-center'>
          <label className="block text-sm font-medium mb-1">Data Sizes (comma separated)</label>
          <input 
            type="text" 
            defaultValue={dataSizes.join(', ')}
            onChange={handleDataSizesChange}
            className="bg-gray-700 text-white !border-2 !border-gray-800 rounded shadow-2xl px-3 py-2 w-64"
            placeholder="10, 50, 100, 500, 1000"
          />
        </div>
        
        <button 
          onClick={runAnalysis}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 !text-white !text-xl font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {isLoading ? 'Analyzing...' : 'Run Analysis'}
        </button>
      </div>
      
      {isLoading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="!mt-2">Running performance analysis...</p>
        </div>
      ) : performanceData.length > 0 ? (
        <div className="mt-6">
          <h4 className="text-lg font-semibold !mb-8 text-white">Execution Time vs Input Size</h4>
          <div className="h-100">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={performanceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis 
                  dataKey="inputSize"  
                  label={{ 
                    value: 'Input Size', 
                    position: 'insideBottomRight', 
                    offset: -5, 
                  }} 
                />
                <YAxis   
                  label={{ 
                    value: 'Execution Time (ms)', 
                    angle: -90, 
                    position: 'insideLeft', 
                  }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#333', borderColor: '#555' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="executionTime" 
                  name="Execution Time (ms)" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-8">
            <h4 className="text-lg font-semibold mb-4 text-white">Performance Data</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-700 rounded-lg">
                <thead>
                  <tr>
                    <th className="py-2 px-4 bg-gray-800 text-left !text-gray-100">Input Size</th>
                    <th className="py-2 px-4 bg-gray-800 text-left !text-gray-100">Execution Time (ms)</th>
                    <th className="py-2 px-4 bg-gray-800 text-left !text-gray-100">Complexity Estimation</th>
                  </tr>
                </thead>
                <tbody>
                  {performanceData.map((data, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-600' : 'bg-gray-700'}>
                      <td className="py-2 px-4 !text-gray-200">{data.inputSize}</td>
                      <td className="py-2 px-4 !text-gray-200">{data.executionTime.toFixed(4)}</td>
                      <td className="py-2 px-4 !text-gray-200">
                        {index > 0 ? 
                          `${((data.executionTime / performanceData[index-1].executionTime) / (data.inputSize / performanceData[index-1].inputSize)).toFixed(2)}x growth factor` : 
                          'Baseline'
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p>No performance data available. Run analysis to see results.</p>
        </div>
      )}
    </div>
  );
};

export default ComplexityAnalyzer;