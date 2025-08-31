import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Search, Clock, Database, BookOpen, Zap, Users, Star, X } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import '../styles/Documentation.css';

// ============================================================================
// 1. STATIC DATA & HELPERS
// ============================================================================

const algorithmDatabase = {
  sorting: {
    title: "Sorting Algorithms",
    icon: "🔄",
    color: "#66ccff",
    algorithms: [
      {
        name: "Bubble Sort",
        id: "bubbleSort",
        description: "Compares adjacent elements and swaps them if they are in wrong order. Simple but inefficient for large datasets.",
        timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
        spaceComplexity: "O(1)",
        stability: "Stable",
        inPlace: true,
        adaptivity: "Adaptive",
        implemented: true
      },
      {
        name: "Selection Sort",
        id: "selectionSort",
        description: "Finds the minimum element and places it at the beginning. Makes fewer swaps than bubble sort.",
        timeComplexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
        spaceComplexity: "O(1)",
        stability: "Unstable",
        inPlace: true,
        adaptivity: "Not Adaptive",
        implemented: true
      },
      {
        name: "Insertion Sort",
        id: "insertionSort",
        description: "Builds sorted array one element at a time. Efficient for small datasets and nearly sorted arrays.",
        timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
        spaceComplexity: "O(1)",
        stability: "Stable",
        inPlace: true,
        adaptivity: "Adaptive",
        implemented: true
      },
      {
        name: "Merge Sort",
        id: "mergeSort",
        description: "Divides array into halves, sorts recursively, and merges them. Now includes a note on stability.",
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
        spaceComplexity: "O(n)",
        stability: "Stable",
        inPlace: false,
        adaptivity: "Not Adaptive",
        implemented: true
      },
      {
        name: "Quick Sort",
        id: "quickSort",
        description: "Selects a pivot and partitions array around it. Fast average case but can degrade to O(n²).",
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
        spaceComplexity: "O(log n)",
        stability: "Unstable",
        inPlace: true,
        adaptivity: "Not Adaptive",
        implemented: true
      }
    ]
  },
  searching: {
    title: "Search Algorithms",
    icon: "🔍",
    color: "#4ade80",
    algorithms: [
      {
        name: "Linear Search",
        id: "linearSearch",
        description: "Searches through array sequentially until target is found. Works on unsorted arrays.",
        timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
        spaceComplexity: "O(1)",
        dataRequirement: "None (works on unsorted data)",
        implemented: true
      },
      {
        name: "Binary Search",
        id: "binarySearch",
        description: "Searches sorted array by repeatedly dividing search interval in half. Updated to note efficiency.",
        timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
        spaceComplexity: "O(1)",
        dataRequirement: "Sorted array",
        implemented: true
      }
    ]
  },
  dataStructures: {
    title: "Data Structures",
    icon: "🏗️",
    color: "#ffd93d",
    algorithms: [
      {
        name: "Linked List",
        id: "linkedList",
        description: "Linear data structure where elements are stored in nodes. Now includes traversal note.",
        timeComplexity: { insertion: "O(1)", deletion: "O(1)", search: "O(n)", access: "O(n)" },
        spaceComplexity: "O(n)",
        implemented: false
      },
      {
        name: "Stack",
        id: "stack",
        description: "Last-In-First-Out (LIFO) data structure.",
        timeComplexity: { push: "O(1)", pop: "O(1)", peek: "O(1)", search: "O(n)" },
        spaceComplexity: "O(n)",
        implemented: false
      },
      {
        name: "Queue",
        id: "queue",
        description: "First-In-First-Out (FIFO) data structure.",
        timeComplexity: { enqueue: "O(1)", dequeue: "O(1)", front: "O(1)", search: "O(n)" },
        spaceComplexity: "O(n)",
        implemented: false
      },
      {
        name: "Binary Tree",
        id: "binaryTree",
        description: "Hierarchical data structure where each node has at most two children.",
        timeComplexity: { insertion: "O(log n)", deletion: "O(log n)", search: "O(log n)", traversal: "O(n)" },
        spaceComplexity: "O(n)",
        implemented: false
      }
    ]
  }
};

const getComplexityColor = (complexity) => {
  const colors = {
    'O(1)': '#4ade80',
    'O(log n)': '#66ccff',
    'O(n)': '#ffd93d',
    'O(n log n)': '#ff9500',
    'O(n²)': '#ff6b6b',
    'O(√n)': '#a78bfa'
  };
  return colors[complexity] || '#e0e6ed';
};

// ============================================================================
// 2. SUB-COMPONENTS
// ============================================================================

function AlgorithmCard({ algorithm, themeStyles }) {
  // Generate a unique color for each card based on its id
  const getCardColor = (id) => {
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const r = (hash * 23) % 256;
    const g = (hash * 17) % 256;
    const b = (hash * 31) % 256;
    return `rgb(${r}, ${g}, ${b})`;
  };

  const cardColor = getCardColor(algorithm.id);

  return (
    <div className="algorithm-card" style={{ borderColor: `${cardColor}30` }} title={algorithm.description}>
      <div className="card-header">
        <div>
          <div className="card-title-group">
            <span className="card-icon" style={{ color: cardColor }}>{algorithm.categoryIcon}</span>
            <h3 style={{ color: cardColor }}>{algorithm.name}</h3>
          </div>
          <div className="card-category-badge" style={{ background: `${cardColor}15` }}>
            {algorithm.categoryTitle}
          </div>
        </div>
        {algorithm.implemented ? (
          <div className="implemented-badge">
            <Star size={12} /> Implemented
          </div>
        ) : (
          <div className="comingsoon-badge">Coming Soon</div>
        )}
      </div>
      <p className="card-description">{algorithm.description}</p>
      {/* Add more content sections as needed */}
    </div>
  );
}

// ============================================================================
// 3. MAIN COMPONENT DEFINITION
// ============================================================================

function AlgorithmDocumentation() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredAlgorithms, setFilteredAlgorithms] = useState([]);

  // Get all algorithms in a flat array for filtering
  const getAllAlgorithms = useCallback(() => {
    let allAlgos = [];
    Object.entries(algorithmDatabase).forEach(([categoryKey, category]) => {
      category.algorithms.forEach(algo => {
        allAlgos.push({
          ...algo,
          category: categoryKey,
          categoryTitle: category.title,
          categoryIcon: category.icon,
          categoryColor: category.color
        });
      });
    });
    return allAlgos;
  }, []);

  useEffect(() => {
    let allAlgorithms = getAllAlgorithms();
    if (selectedCategory !== 'all') {
      allAlgorithms = allAlgorithms.filter(algo => algo.category === selectedCategory);
    }
    if (searchTerm) {
      allAlgorithms = allAlgorithms.filter(algo =>
        algo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        algo.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredAlgorithms(allAlgorithms);
  }, [searchTerm, selectedCategory, getAllAlgorithms]);

  const categories = useMemo(() => [
    { key: 'all', label: 'All', icon: BookOpen, count: getAllAlgorithms().length },
    { key: 'sorting', label: 'Sorting', icon: Users, count: algorithmDatabase.sorting.algorithms.length },
    { key: 'searching', label: 'Searching', icon: Search, count: algorithmDatabase.searching.algorithms.length },
    { key: 'dataStructures', label: 'Data Structures', icon: Database, count: algorithmDatabase.dataStructures.algorithms.length }
  ], [getAllAlgorithms]);

  // Assume themeStyles is provided by your ThemeContext setup
  const themeStyles = {
    cardBackground: theme === 'light' ? "#fff" : "#222744",
    secondaryText: theme === 'light' ? "#555" : "#bbb"
  };

  return (
    <div className="documentation-container">
      <div className="header">
        <h1>Algorithm Documentation</h1>
        {/* Add stats section, filters, and other UI here */}
      </div>
      
      {/* Search and Filter Section */}
      <div className="filters-section">
        <div className="search-bar">
          <label htmlFor="search" style={{display: "flex"}}>
            <Search size={20} />
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search algorithms..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="category-filters">
          {categories.map(category => {
            const IconComponent = category.icon;
            const isActive = selectedCategory === category.key;
            return (
              <button
                key={category.key}
                className={`category-chip ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.key)}
              >
                <IconComponent size={16} />
                {category.label}
                <span className="count-badge">{category.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Grid */}
      <div className="results-grid">
        {filteredAlgorithms.length > 0 ? (
          filteredAlgorithms.map(algorithm => (
            <AlgorithmCard
              key={algorithm.id}
              algorithm={algorithm}
              themeStyles={themeStyles}
            />
          ))
        ) : (
          <div className="no-results">
            <Search size={48} />
            <h3>No algorithms found</h3>
            <p>Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
      {/* Footer can be added here */}
    </div>
  );
}

export default AlgorithmDocumentation;