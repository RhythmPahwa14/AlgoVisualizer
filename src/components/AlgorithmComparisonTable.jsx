import React, { useState, useMemo } from 'react';
import { algorithmInfo } from '../data/algorithmInfo';
import './AlgorithmComparisonTable.css';

const AlgorithmComparisonTable = ({ darkMode }) => {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const algorithmsByCategory = useMemo(() => {
    const categories = {};
    Object.keys(algorithmInfo).forEach(algoName => {
      const category = algorithmInfo[algoName]?.category || 'Other';
      if (!categories[category]) categories[category] = [];
      categories[category].push(algoName);
    });
    return categories;
  }, []);

  const filteredAlgorithms = useMemo(() => {
    if (selectedCategory === 'all') return Object.keys(algorithmInfo);
    return algorithmsByCategory[selectedCategory] || [];
  }, [selectedCategory, algorithmsByCategory]);

  const comparisonProperties = [
    { key: 'bestCase', label: 'Best Case', type: 'complexity' },
    { key: 'averageCase', label: 'Average Case', type: 'complexity' },
    { key: 'worstCase', label: 'Worst Case', type: 'complexity' },
    { key: 'spaceComplexity', label: 'Space Complexity', type: 'complexity' },
    { key: 'stable', label: 'Stable', type: 'boolean' },
    { key: 'recursive', label: 'Recursive', type: 'boolean' },
    { key: 'inPlace', label: 'In-Place', type: 'boolean' },
    { key: 'adaptive', label: 'Adaptive', type: 'boolean' },
    { key: 'category', label: 'Category', type: 'text' }
  ];

  const handleAlgorithmToggle = (algorithm) => {
    if (selectedAlgorithms.includes(algorithm)) {
      setSelectedAlgorithms(selectedAlgorithms.filter(a => a !== algorithm));
    } else if (selectedAlgorithms.length < 3) {
      setSelectedAlgorithms([...selectedAlgorithms, algorithm]);
    }
  };

  const clearSelection = () => {
    setSelectedAlgorithms([]);
  };

  const getPropertyValue = (algorithm, property) => {
    const info = algorithmInfo[algorithm];
    if (!info) return 'N/A';

    switch (property.type) {
      case 'boolean':
        return info[property.key] ? '✔' : '✘';
      default:
        return info[property.key] || 'N/A';
    }
  };

  const categories = ['all', ...Object.keys(algorithmsByCategory)];

  return (
    <div className={`container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="header">
        <h1 className="headerTitle">Algorithm Comparison</h1>
        <p className="headerText">
          Select up to 3 algorithms to compare their properties side-by-side
        </p>
      </div>

      {/* Category Filter */}
      <div className="categoryFilter">
        <label className="categoryLabel">Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="categorySelect"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      {/* Algorithm Selection */}
      <div className="selectionSection">
        <div className="selectionHeader">
          <h3 className="selectionTitle">
            Select Algorithms ({selectedAlgorithms.length}/3 selected)
          </h3>
          {selectedAlgorithms.length > 0 && (
            <button onClick={clearSelection} className="clearButton">
              Clear All
            </button>
          )}
        </div>

        <div className="algorithmGrid">
          {filteredAlgorithms.map((algorithm) => (
            <label
              key={algorithm}
              className={`algorithmCheckbox ${
                selectedAlgorithms.includes(algorithm) ? 'selected' : ''
              } ${
                !selectedAlgorithms.includes(algorithm) &&
                selectedAlgorithms.length >= 3
                  ? 'disabled'
                  : ''
              }`}
            >
              <input
                type="checkbox"
                checked={selectedAlgorithms.includes(algorithm)}
                onChange={() => handleAlgorithmToggle(algorithm)}
                disabled={
                  !selectedAlgorithms.includes(algorithm) &&
                  selectedAlgorithms.length >= 3
                }
                className="checkboxInput"
              />
              {algorithm}
            </label>
          ))}
        </div>

        {/* Selected Algorithms Preview */}
        {selectedAlgorithms.length > 0 && (
          <div className="selectedPreview">
            <h4 className="selectedTitle">Selected for Comparison:</h4>
            <div className="selectedList">
              {selectedAlgorithms.map((algo) => (
                <span key={algo} className="selectedBadge">
                  {algo}
                  <button
                    onClick={() => handleAlgorithmToggle(algo)}
                    className="removeButton"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Comparison Table */}
      {selectedAlgorithms.length >= 2 && (
        <div className="comparisonContainer">
          <h3 className="comparisonTitle">Algorithm Properties Comparison</h3>

          <div className="tableWrapper">
            <table className="comparisonTable">
              <thead>
                <tr>
                  <th className="tableHeader propertyColumn">Property</th>
                  {selectedAlgorithms.map((algorithm) => (
                    <th key={algorithm} className="tableHeader">
                      {algorithm}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonProperties.map((property) => (
                  <tr key={property.key}>
                    <td className="propertyName">{property.label}</td>
                    {selectedAlgorithms.map((algorithm) => (
                      <td
                        key={`${algorithm}-${property.key}`}
                        className="tableCell"
                      >
                        {getPropertyValue(algorithm, property)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty States */}
      {selectedAlgorithms.length === 0 && (
        <div className="emptyState">
          <div className="emptyIcon">⚡</div>
          <h3 className="emptyTitle">Select Algorithms to Compare</h3>
          <p className="emptyText">
            Choose up to 3 algorithms from the list above to see their
            properties compared side-by-side.
          </p>
        </div>
      )}

      {selectedAlgorithms.length === 1 && (
        <div className="emptyState">
          <div className="emptyIcon">🔍</div>
          <h3 className="emptyTitle">Select One More Algorithm</h3>
          <p className="emptyText">
            Choose at least one more algorithm to start the comparison.
          </p>
        </div>
      )}
    </div>
  );
};

export default AlgorithmComparisonTable;
