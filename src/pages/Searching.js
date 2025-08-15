import React, { useState, useEffect } from 'react';
import { binarySearch } from '../algorithms/binarySearch';
import { exponentialSearch } from '../algorithms/exponentialSearch';
import { linearSearch } from '../algorithms/linearSearch';
import { jumpSearch } from '../algorithms/jumpSearch';
import CodeExplanation from '../components/CodeExplanation';
import ExportControls from '../components/ExportControls';
import { useVisualizationExport } from '../hooks/useVisualizationExport';
import '../styles/App.css'; // Import the merged CSS file

const Searching = () => {
    const [array, setArray] = useState([]);
    const [target, setTarget] = useState('');
    const [colorArray, setColorArray] = useState([]);
    const [message, setMessage] = useState('');
    const [delay] = useState(500);
    const [algorithm, setAlgorithm] = useState('binarySearch');
    const [showCodeExplanation, setShowCodeExplanation] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    // Export functionality
    const exportHook = useVisualizationExport('search-visualization-container');

    useEffect(() => {
        generateArray();
    }, []);

    const generateArray = () => {
        const randomArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
        setArray(randomArray.sort((a, b) => a - b));
        setColorArray(new Array(20).fill('lightgrey'));
    };

    const handleSearch = async () => {
        const targetValue = parseInt(target, 10);
        if (isNaN(targetValue)) {
            setMessage('Please enter a valid number');
            return;
        }

        setIsSearching(true);
        let result = -1;
        switch (algorithm) {
            case 'linearSearch':
                result = await linearSearch(array, targetValue, setColorArray, delay);
                break;
            case 'jumpSearch':
                result = await jumpSearch(array, targetValue, setColorArray, delay);
                break;
            case 'exponentialSearch':
                result = await exponentialSearch(array, targetValue, setColorArray, delay);
                break;
            default:
                result = await binarySearch(array, targetValue, setColorArray, delay);
                break;
        }

        if (result === -1) {
            setMessage('Value not found');
        } else {
            setMessage(`Value found at index ${result}`);
        }
        setIsSearching(false);
    };

    return (
        <div className="searching-container">
            <h2>Searching Algorithms</h2>
            <div className="searching-controls">
                <label htmlFor="target">Enter target value: </label>
                <input
                    type="number"
                    id="target"
                    value={target}
                    onChange={e => setTarget(e.target.value)}
                />
                <button className="searching-button" onClick={handleSearch} disabled={isSearching}>
                    {isSearching ? '🔍 Searching...' : 'Search'}
                </button>
                <button className="searching-button" onClick={generateArray} disabled={isSearching}>Generate New Array</button>
                <ExportControls 
                    isVisualizationRunning={isSearching}
                    onStartRecording={exportHook.startRecording}
                    onStopRecording={exportHook.stopRecording}
                    visualizationContainerId="search-visualization-container"
                />
            </div>
            <div className="searching-algorithm-selection">
                <button
                    className="searching-button"
                    onClick={() => setAlgorithm('binarySearch')}
                    style={{
                        backgroundColor: algorithm === 'binarySearch' ? 'lightblue' : 'white',
                    }}
                >
                    Binary Search
                </button>
                <button
                    className="searching-button"
                    onClick={() => setAlgorithm('linearSearch')}
                    style={{
                        backgroundColor: algorithm === 'linearSearch' ? 'lightblue' : 'white',
                    }}
                >
                    Linear Search
                </button>
                <button
                    className="searching-button"
                    onClick={() => setAlgorithm('jumpSearch')}
                    style={{
                        backgroundColor: algorithm === 'jumpSearch' ? 'lightblue' : 'white',
                    }}
                >
                    Jump Search
                </button>
                <button
                    className="searching-button"
                    onClick={() => setAlgorithm('exponentialSearch')}
                    style={{
                        backgroundColor: algorithm === 'exponentialSearch' ? 'lightblue' : 'white',
                    }}
                >
                    Exponential Search
                </button>
            </div>
            <div id="search-visualization-container" className="searching-array-container">
                {array.map((num, idx) => (
                    <div
                        key={idx}
                        className="searching-array-bar"
                        style={{ backgroundColor: colorArray[idx] }}
                    >
                        {num}
                    </div>
                ))}
            </div>
            <p>{message}</p>
            
            {/* Code Explanation Button */}
            <div style={{ 
                textAlign: 'center', 
                marginTop: '30px',
                padding: '20px',
                background: 'rgba(102, 204, 255, 0.1)',
                borderRadius: '10px',
                border: '1px solid rgba(102, 204, 255, 0.3)'
            }}>
                <h3 style={{ color: '#66ccff', marginBottom: '15px' }}>Learn the Algorithm</h3>
                <p style={{ color: '#e0e6ed', marginBottom: '20px' }}>
                    Understand how {algorithm === 'binarySearch' ? 'Binary Search' : 
                    algorithm === 'linearSearch' ? 'Linear Search' : 
                    algorithm === 'jumpSearch' ? 'Jump Search' : 'Exponential Search'} works step by step
                </p>
                <button 
                    className="searching-button"
                    onClick={() => setShowCodeExplanation(true)}
                    style={{ 
                        background: 'linear-gradient(45deg, #ffd93d, #ffb347)',
                        color: '#1a1a2e',
                        border: 'none',
                        padding: '12px 25px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '16px',
                        transition: 'all 0.3s ease'
                    }}
                >
                    📖 View Code Explanation
                </button>
            </div>

            {/* Code Explanation Modal */}
            <CodeExplanation
                algorithm={algorithm}
                isVisible={showCodeExplanation}
                onClose={() => setShowCodeExplanation(false)}
            />
        </div>
    );
};

export default Searching;