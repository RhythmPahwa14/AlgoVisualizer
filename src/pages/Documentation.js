import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Search, Clock, Database, BookOpen, Zap, Users, Star } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { style } from 'framer-motion/client';

const AlgorithmDocumentation = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filteredAlgorithms, setFilteredAlgorithms] = useState([]);
    const { theme } = useTheme();

    // Theme-responsive styles
    const themeStyles = {
        background: theme === 'light' 
            ? 'linear-gradient(135deg, #f6f0d6 0%, #ffffff 50%, #f0f8ff 100%)'
            : 'linear-gradient(135deg, #0f3460 0%, #1a1a2e 50%, #16213e 100%)',
        color: theme === 'light' ? '#1a1a1a' : '#e0e6ed',
        cardBackground: theme === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(26, 26, 46, 0.9)',
        headerBackground: theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(26, 26, 46, 0.95)',
        borderColor: theme === 'light' ? 'rgba(0, 119, 204, 0.2)' : 'rgba(102, 204, 255, 0.2)',
        secondaryText: theme === 'light' ? '#666666' : '#b8c5d1',
        inputBackground: theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(15, 52, 96, 0.3)',
        inputBorder: theme === 'light' ? 'rgba(0, 119, 204, 0.3)' : 'rgba(102, 204, 255, 0.3)',
        categoryBackground: theme === 'light' ? 'rgba(0, 119, 204, 0.1)' : 'rgba(102, 204, 255, 0.1)',
        categoryBorder: theme === 'light' ? 'rgba(0, 119, 204, 0.2)' : 'rgba(102, 204, 255, 0.2)'
    };

    const algorithmDatabase = useMemo(() => ({
        sorting: {
            title: "Sorting Algorithms",
            description: "Algorithms that arrange elements in a specific order",
            icon: "🔄",
            color: "#66ccff",
            algorithms: [
                {
                    name: "Bubble Sort",
                    id: "bubbleSort",
                    description: "Compares adjacent elements and swaps them if they are in wrong order. Simple but inefficient for large datasets.",
                    timeComplexity: {
                        best: "O(n)",
                        average: "O(n²)",
                        worst: "O(n²)"
                    },
                    spaceComplexity: "O(1)",
                    stability: "Stable",
                    inPlace: true,
                    adaptivity: "Adaptive",
                    specialNotes: [
                        "Best for educational purposes",
                        "Can detect if array is already sorted",
                        "Simple implementation but poor performance"
                    ],
                    useCases: [
                        "Small datasets (< 50 elements)",
                        "Educational demonstrations",
                        "When simplicity is preferred over efficiency"
                    ],
                    pros: ["Simple to understand and implement", "Stable sorting", "In-place sorting", "Can be optimized to detect sorted arrays"],
                    cons: ["Poor time complexity O(n²)", "Not suitable for large datasets", "More swaps compared to other algorithms"],
                    implemented: true
                },
                {
                    name: "Selection Sort",
                    id: "selectionSort",
                    description: "Finds the minimum element and places it at the beginning. Makes fewer swaps than bubble sort.",
                    timeComplexity: {
                        best: "O(n²)",
                        average: "O(n²)",
                        worst: "O(n²)"
                    },
                    spaceComplexity: "O(1)",
                    stability: "Unstable",
                    inPlace: true,
                    adaptivity: "Not Adaptive",
                    specialNotes: [
                        "Always makes exactly n-1 swaps",
                        "Performance doesn't vary with input",
                        "Unstable sorting algorithm"
                    ],
                    useCases: [
                        "When memory writes are costly",
                        "Small arrays",
                        "When swap count needs to be minimized"
                    ],
                    pros: ["Minimum number of swaps", "In-place sorting", "Simple implementation", "Consistent performance"],
                    cons: ["Poor time complexity O(n²)", "Not stable", "Not adaptive to input", "No early termination for sorted arrays"],
                    implemented: true
                },
                {
                    name: "Insertion Sort",
                    id: "insertionSort",
                    description: "Builds sorted array one element at a time. Efficient for small datasets and nearly sorted arrays.",
                    timeComplexity: {
                        best: "O(n)",
                        average: "O(n²)",
                        worst: "O(n²)"
                    },
                    spaceComplexity: "O(1)",
                    stability: "Stable",
                    inPlace: true,
                    adaptivity: "Adaptive",
                    specialNotes: [
                        "Excellent for small arrays (< 50 elements)",
                        "Used in hybrid algorithms like Timsort",
                        "Very efficient for nearly sorted data"
                    ],
                    useCases: [
                        "Small datasets",
                        "Nearly sorted arrays",
                        "Online sorting (sorting as data arrives)",
                        "Hybrid with other algorithms"
                    ],
                    pros: ["Adaptive to input", "Stable sorting", "In-place sorting", "Good for small datasets", "Online algorithm"],
                    cons: ["Poor performance on large datasets", "O(n²) average case", "More comparisons than selection sort"],
                    implemented: true
                },
                {
                    name: "Merge Sort",
                    id: "mergeSort",
                    description: "Divides array into halves, sorts them recursively, and merges back. Guaranteed O(n log n) performance.",
                    timeComplexity: {
                        best: "O(n log n)",
                        average: "O(n log n)",
                        worst: "O(n log n)"
                    },
                    spaceComplexity: "O(n)",
                    stability: "Stable",
                    inPlace: false,
                    adaptivity: "Not Adaptive",
                    specialNotes: [
                        "Guaranteed O(n log n) performance",
                        "Preferred for linked lists",
                        "External sorting applications"
                    ],
                    useCases: [
                        "Large datasets requiring stable sort",
                        "External sorting",
                        "Linked list sorting",
                        "When worst-case performance matters"
                    ],
                    pros: ["Guaranteed O(n log n)", "Stable sorting", "Predictable performance", "Good for external sorting"],
                    cons: ["Requires O(n) extra space", "Not in-place", "Not adaptive", "Overhead for small arrays"],
                    implemented: true
                },
                {
                    name: "Quick Sort",
                    id: "quickSort",
                    description: "Selects a pivot and partitions array around it. Fast average case but can degrade to O(n²).",
                    timeComplexity: {
                        best: "O(n log n)",
                        average: "O(n log n)",
                        worst: "O(n²)"
                    },
                    spaceComplexity: "O(log n)",
                    stability: "Unstable",
                    inPlace: true,
                    adaptivity: "Not Adaptive",
                    specialNotes: [
                        "Pivot selection affects performance",
                        "Can be optimized with 3-way partitioning",
                        "Cache-efficient due to in-place nature"
                    ],
                    useCases: [
                        "General-purpose sorting",
                        "Large datasets",
                        "When average performance matters more than worst-case",
                        "Memory-constrained environments"
                    ],
                    pros: ["Fast average case", "In-place sorting", "Cache efficient", "Low space complexity"],
                    cons: ["Unstable sorting", "Poor worst-case performance", "Not adaptive", "Recursive stack overhead"],
                    implemented: true
                }
            ]
        },
        searching: {
            title: "Search Algorithms",
            description: "Algorithms that find specific elements in data structures",
            icon: "🔍",
            color: "#4ade80",
            algorithms: [
                {
                    name: "Linear Search",
                    id: "linearSearch",
                    description: "Searches through array sequentially until target is found. Works on unsorted arrays.",
                    timeComplexity: {
                        best: "O(1)",
                        average: "O(n)",
                        worst: "O(n)"
                    },
                    spaceComplexity: "O(1)",
                    dataRequirement: "None (works on unsorted data)",
                    specialNotes: [
                        "Only search that works on unsorted data",
                        "Can be used on any data structure",
                        "Simple but inefficient for large datasets"
                    ],
                    useCases: [
                        "Small datasets",
                        "Unsorted arrays",
                        "One-time searches",
                        "Simple implementations"
                    ],
                    pros: ["Works on unsorted data", "Simple implementation", "No preprocessing required", "Works on any data structure"],
                    cons: ["Poor performance O(n)", "Not suitable for large datasets", "No early optimization possible"],
                    implemented: true
                },
                {
                    name: "Binary Search",
                    id: "binarySearch",
                    description: "Searches sorted array by repeatedly dividing search interval in half. Very efficient for sorted data.",
                    timeComplexity: {
                        best: "O(1)",
                        average: "O(log n)",
                        worst: "O(log n)"
                    },
                    spaceComplexity: "O(1)",
                    dataRequirement: "Sorted array",
                    specialNotes: [
                        "Requires sorted input",
                        "Can be implemented iteratively or recursively",
                        "Foundation for many other algorithms"
                    ],
                    useCases: [
                        "Large sorted datasets",
                        "Repeated searches",
                        "Database indexing",
                        "Finding insertion points"
                    ],
                    pros: ["Excellent time complexity O(log n)", "Low space complexity", "Predictable performance", "Can find insertion points"],
                    cons: ["Requires sorted data", "Not suitable for frequently changing data", "Random access required"],
                    implemented: true
                },
                {
                    name: "Jump Search",
                    id: "jumpSearch",
                    description: "Searches sorted array by jumping ahead by fixed steps, then linear search in block. Balance between linear and binary search.",
                    timeComplexity: {
                        best: "O(1)",
                        average: "O(√n)",
                        worst: "O(√n)"
                    },
                    spaceComplexity: "O(1)",
                    dataRequirement: "Sorted array",
                    specialNotes: [
                        "Optimal jump size is √n",
                        "Good for systems where binary search is expensive",
                        "Better than linear, worse than binary search"
                    ],
                    useCases: [
                        "Systems where binary search comparison is expensive",
                        "Sorted arrays with uniform distribution",
                        "When you want better than linear but simpler than binary"
                    ],
                    pros: ["Better than linear search", "Simple to implement", "Good cache locality", "Works well with uniform data"],
                    cons: ["Worse than binary search", "Requires sorted data", "Not adaptive", "Fixed step size limitation"],
                    implemented: true
                },
                {
                    name: "Exponential Search",
                    id: "exponentialSearch",
                    description: "Finds range where target exists by exponentially increasing search bounds, then uses binary search.",
                    timeComplexity: {
                        best: "O(1)",
                        average: "O(log n)",
                        worst: "O(log n)"
                    },
                    spaceComplexity: "O(1)",
                    dataRequirement: "Sorted array",
                    specialNotes: [
                        "Also called doubling search",
                        "Particularly effective for unbounded arrays",
                        "Combines exponential bound finding with binary search"
                    ],
                    useCases: [
                        "Unbounded or infinite arrays",
                        "When target is likely near beginning",
                        "Sorted arrays where size is unknown",
                        "Network packet searching"
                    ],
                    pros: ["Efficient for unbounded arrays", "Good when target is near start", "O(log n) complexity", "Adaptive to target position"],
                    cons: ["Requires sorted data", "More complex than binary search", "Overhead for targets near end", "Two-phase algorithm"],
                    implemented: true
                }
            ]
        },
        dataStructures: {
            title: "Data Structures",
            description: "Fundamental ways to organize and store data efficiently",
            icon: "🏗️",
            color: "#ffd93d",
            algorithms: [
                {
                    name: "Linked List",
                    id: "linkedList",
                    description: "Linear data structure where elements are stored in nodes, each containing data and reference to next node.",
                    timeComplexity: {
                        insertion: "O(1)",
                        deletion: "O(1)",
                        search: "O(n)",
                        access: "O(n)"
                    },
                    spaceComplexity: "O(n)",
                    specialNotes: [
                        "Dynamic size allocation",
                        "No random access",
                        "Extra memory for pointers"
                    ],
                    useCases: [
                        "Dynamic memory allocation",
                        "Implementation of other data structures",
                        "Undo functionality in applications",
                        "Music playlist management"
                    ],
                    pros: ["Dynamic size", "Efficient insertion/deletion", "Memory efficient for sparse data", "No memory waste"],
                    cons: ["No random access", "Extra memory for pointers", "Poor cache locality", "Sequential access only"],
                    implemented: false
                },
                {
                    name: "Stack",
                    id: "stack",
                    description: "Last-In-First-Out (LIFO) data structure where elements are added and removed from same end (top).",
                    timeComplexity: {
                        push: "O(1)",
                        pop: "O(1)",
                        peek: "O(1)",
                        search: "O(n)"
                    },
                    spaceComplexity: "O(n)",
                    specialNotes: [
                        "LIFO principle",
                        "Can be implemented using arrays or linked lists",
                        "Essential for recursion and expression evaluation"
                    ],
                    useCases: [
                        "Function call management",
                        "Expression evaluation",
                        "Browser history",
                        "Undo/Redo operations"
                    ],
                    pros: ["Simple operations", "Efficient memory usage", "Natural recursion support", "Easy implementation"],
                    cons: ["Limited access pattern", "No random access", "Stack overflow possibility", "LIFO restriction"],
                    implemented: false
                },
                {
                    name: "Queue",
                    id: "queue",
                    description: "First-In-First-Out (FIFO) data structure where elements are added at rear and removed from front.",
                    timeComplexity: {
                        enqueue: "O(1)",
                        dequeue: "O(1)",
                        front: "O(1)",
                        search: "O(n)"
                    },
                    spaceComplexity: "O(n)",
                    specialNotes: [
                        "FIFO principle",
                        "Can be implemented using arrays or linked lists",
                        "Circular queue variation saves space"
                    ],
                    useCases: [
                        "CPU scheduling",
                        "Breadth-First Search",
                        "Print queue management",
                        "Buffer for data streams"
                    ],
                    pros: ["Fair processing order", "Efficient operations", "Natural for scheduling", "Simple concept"],
                    cons: ["No random access", "Fixed capacity in array implementation", "FIFO restriction", "Memory overhead in linked implementation"],
                    implemented: false
                },
                {
                    name: "Binary Tree",
                    id: "binaryTree",
                    description: "Hierarchical data structure where each node has at most two children (left and right).",
                    timeComplexity: {
                        insertion: "O(log n)",
                        deletion: "O(log n)",
                        search: "O(log n)",
                        traversal: "O(n)"
                    },
                    spaceComplexity: "O(n)",
                    specialNotes: [
                        "Performance depends on tree balance",
                        "Can degrade to O(n) if unbalanced",
                        "Many variations (BST, AVL, Red-Black)"
                    ],
                    useCases: [
                        "Database indexing",
                        "File system organization",
                        "Expression parsing",
                        "Decision making algorithms"
                    ],
                    pros: ["Efficient search/insert/delete", "Hierarchical organization", "Flexible structure", "Natural recursion"],
                    cons: ["Can become unbalanced", "More complex than linear structures", "Pointer overhead", "Recursive operations"],
                    implemented: false
                }
            ]
        }
    }), []);

    // Get all algorithms in a flat array for filtering
    const getAllAlgorithms = useCallback(() => {
        const allAlgos = [];
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
    }, [algorithmDatabase]);

    useEffect(() => {
        const allAlgorithms = getAllAlgorithms();
        let filtered = allAlgorithms;

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(algo => algo.category === selectedCategory);
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(algo => 
                algo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                algo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                algo.useCases.some(useCase => useCase.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        setFilteredAlgorithms(filtered);
    }, [searchTerm, selectedCategory, getAllAlgorithms]);

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

    const AlgorithmCard = ({ algorithm }) => (
        <div style={{
            background: themeStyles.cardBackground,
            borderRadius: '12px',
            padding: '24px',
            border: `1px solid ${algorithm.categoryColor}30`,
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = `0 12px 24px ${algorithm.categoryColor}20`;
            e.currentTarget.style.borderColor = `${algorithm.categoryColor}60`;
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = `${algorithm.categoryColor}30`;
        }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '20px' }}>{algorithm.categoryIcon}</span>
                        <h3 style={{ 
                            color: algorithm.categoryColor, 
                            margin: 0, 
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '18px',
                            fontWeight: '600'
                        }}>
                            {algorithm.name}
                        </h3>
                    </div>
                    <div style={{ 
                        fontSize: '12px', 
                        color: '#6c757d', 
                        background: `${algorithm.categoryColor}27`,
                        padding: '4px 8px',
                        borderRadius: '12px',
                        display: 'inline-block'
                    }}>
                        {algorithm.categoryTitle}
                    </div>
                </div>
                
                {algorithm.implemented ? (
                    <div style={{
                        background: 'linear-gradient(45deg, #4ade80, #22c55e)',
                        color: '#ffffff',
                        padding: '4px 12px',
                        borderRadius: '16px',
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}>
                        <Star size={12} />
                        Implemented
                    </div>
                ) : (
                    <div style={{
                        background: 'rgba(255, 215, 61, 0.2)',
                        color: '#ffd93d',
                        padding: '4px 12px',
                        borderRadius: '16px',
                        fontSize: '12px',
                        fontWeight: '600',
                        border: '1px solid rgba(255, 215, 61, 0.3)'
                    }}>
                        Coming Soon
                    </div>
                )}
            </div>

            {/* Description */}
            <p style={{ 
                color: '#6c757d', 
                fontSize: '14px', 
                lineHeight: '1.5', 
                marginBottom: '20px',
                opacity: 0.9
            }}>
                {algorithm.description}
            </p>

            {/* Complexity Section */}
            <div style={{ marginBottom: '20px' }}>
                <h4 style={{ color: algorithm.categoryColor, fontSize: '14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} />
                    Time Complexity
                </h4>
                
                {algorithm.timeComplexity.best !== undefined ? (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                        <div style={{ 
                            background: getComplexityColor(algorithm.timeComplexity.best) + '20',
                            color: getComplexityColor(algorithm.timeComplexity.best),
                            padding: '6px 10px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '600',
                            border: `1px solid ${getComplexityColor(algorithm.timeComplexity.best)}40`
                        }}>
                            Best: {algorithm.timeComplexity.best}
                        </div>
                        <div style={{ 
                            background: getComplexityColor(algorithm.timeComplexity.average) + '20',
                            color: getComplexityColor(algorithm.timeComplexity.average),
                            padding: '6px 10px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '600',
                            border: `1px solid ${getComplexityColor(algorithm.timeComplexity.average)}40`
                        }}>
                            Avg: {algorithm.timeComplexity.average}
                        </div>
                        <div style={{ 
                            background: getComplexityColor(algorithm.timeComplexity.worst) + '20',
                            color: getComplexityColor(algorithm.timeComplexity.worst),
                            padding: '6px 10px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '600',
                            border: `1px solid ${getComplexityColor(algorithm.timeComplexity.worst)}40`
                        }}>
                            Worst: {algorithm.timeComplexity.worst}
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                        {Object.entries(algorithm.timeComplexity).map(([operation, complexity]) => (
                            <div key={operation} style={{ 
                                background: getComplexityColor(complexity) + '20',
                                color: getComplexityColor(complexity),
                                padding: '6px 10px',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: '600',
                                border: `1px solid ${getComplexityColor(complexity)}40`
                            }}>
                                {operation}: {complexity}
                            </div>
                        ))}
                    </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
                    <Database size={14} style={{ color: algorithm.categoryColor }} />
                    <span style={{ fontSize: '12px', color: '#6c757d' }}>Space: </span>
                    <span style={{ 
                        background: getComplexityColor(algorithm.spaceComplexity) + '20',
                        color: getComplexityColor(algorithm.spaceComplexity),
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '600',
                        border: `1px solid ${getComplexityColor(algorithm.spaceComplexity)}40`
                    }}>
                        {algorithm.spaceComplexity}
                    </span>
                </div>
            </div>

            {/* Properties */}
            {(algorithm.stability || algorithm.inPlace !== undefined || algorithm.adaptivity) && (
                <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ color: algorithm.categoryColor, fontSize: '14px', marginBottom: '8px' }}>
                        Properties
                    </h4>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {algorithm.stability && (
                            <span style={{
                                background: algorithm.stability === 'Stable' ? 'rgba(74, 222, 128, 0.2)' : 'rgba(255, 107, 107, 0.2)',
                                color: algorithm.stability === 'Stable' ? '#4ade80' : '#ff6b6b',
                                padding: '4px 9px',
                                borderRadius: '12px',
                                fontSize: '11px',
                                fontWeight: '600'
                            }}>
                                {algorithm.stability}
                            </span>
                        )}
                        {algorithm.inPlace !== undefined && (
                            <span style={{
                                background: algorithm.inPlace ? 'rgba(74, 222, 128, 0.2)' : 'rgba(255, 107, 107, 0.2)',
                                color: algorithm.inPlace ? '#4ade80' : '#ff6b6b',
                                padding: '4px 8px',
                                borderRadius: '11px',
                                fontSize: '11px',
                                fontWeight: '600'
                            }}>
                                {algorithm.inPlace ? 'In-place' : 'Not in-place'}
                            </span>
                        )}
                        {algorithm.adaptivity && (
                            <span style={{
                                background: algorithm.adaptivity === 'Adaptive' ? 'rgba(74, 222, 128, 0.2)' : 'rgba(255, 107, 107, 0.2)',
                                color: algorithm.adaptivity === 'Adaptive' ? '#4ade80' : '#ff6b6b',
                                padding: '4px 8px',
                                borderRadius: '12px',
                                fontSize: '11px',
                                fontWeight: '600'
                            }}>
                                {algorithm.adaptivity}
                            </span>
                        )}
                        {algorithm.dataRequirement && (
                            <span style={{
                                background: 'rgba(102, 204, 255, 0.2)',
                                color: '#66ccff',
                                padding: '4px 8px',
                                borderRadius: '12px',
                                fontSize: '11px',
                                fontWeight: '600'
                            }}>
                                {algorithm.dataRequirement}
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Use Cases */}
            <div style={{ marginBottom: '20px' }}>
                <h4 style={{ color: algorithm.categoryColor, fontSize: '14px', marginBottom: '8px' }}>
                    Best Used For
                </h4>
                <div style={{ 
                    background: 'rgba(102, 204, 255, 0.05)',
                    borderRadius: '8px',
                    padding: '12px'
                }}>
                    {algorithm.useCases.slice(0, 3).map((useCase, index) => (
                        <div key={index} style={{
                            fontSize: '12.5px',
                            color: '#6c757d',
                            marginBottom: '4px',
                            paddingLeft: '12px',
                            position: 'relative'
                        }}>
                            <span style={{
                                position: 'absolute',
                                left: '0',
                                color: algorithm.categoryColor
                            }}>•</span>
                            {useCase}
                        </div>
                    ))}
                </div>
            </div>

            {/* Special Notes */}
            {algorithm.specialNotes && algorithm.specialNotes.length > 0 && (
                <div>
                    <h4 style={{ color: algorithm.categoryColor, fontSize: '14px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Zap size={14} />
                        Key Points
                    </h4>
                    <div style={{
                        background: `${algorithm.categoryColor}10`,
                        borderRadius: '8px',
                        padding: '12px',
                        border: `1px solid ${algorithm.categoryColor}20`
                    }}>
                        {algorithm.specialNotes.slice(0, 2).map((note, index) => (
                            <div key={index} style={{
                                fontSize: '12.5px',
                                color: '#6c757d',
                                marginBottom: index < algorithm.specialNotes.slice(0, 2).length - 1 ? '6px' : '0',
                                paddingLeft: '12px',
                                position: 'relative'
                            }}>
                                <span style={{
                                    position: 'absolute',
                                    left: '0',
                                    color: algorithm.categoryColor
                                }}>⚡</span>
                                {note}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    const categories = [
        { key: 'all', label: 'All Algorithms', icon: BookOpen, count: getAllAlgorithms().length },
        { key: 'sorting', label: 'Sorting', icon: Users, count: algorithmDatabase.sorting.algorithms.length },
        { key: 'searching', label: 'Searching', icon: Search, count: algorithmDatabase.searching.algorithms.length },
        { key: 'dataStructures', label: 'Data Structures', icon: Database, count: algorithmDatabase.dataStructures.algorithms.length }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            background: themeStyles.background,
            color: themeStyles.color,
            fontFamily: 'Poppins, sans-serif'
        }}>
            {/* Header Section */}
            <div style={{
                background: themeStyles.headerBackground,
                backdropFilter: 'blur(10px)',
                borderBottom: `1px solid ${themeStyles.borderColor}`,
                padding: '30px 20px',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
                        <BookOpen size={36} style={{ color: '#66ccff' }} />
                        <h1 style={{
                            fontSize: '36px',
                            fontWeight: '700',
                            background: 'linear-gradient(45deg, #66ccff, #4da6ff)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            margin: 0
                        }}>
                            Algorithm Documentation
                        </h1>
                    </div>
                    <p style={{
                        fontSize: '18px',
                        color: themeStyles.secondaryText,
                        maxWidth: '600px',
                        margin: '0 auto 30px auto',
                        lineHeight: '1.6'
                    }}>
                        Complete reference guide for all algorithms and data structures available in AlgoVisualizer
                    </p>

                    {/* Stats Row */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '20px',
                        maxWidth: '800px',
                        margin: '0 auto'
                    }}>
                        <div style={{
                            background: themeStyles.categoryBackground,
                            padding: '16px',
                            borderRadius: '12px',
                            border: `1px solid ${themeStyles.categoryBorder}`
                        }}>
                            <div style={{ fontSize: '24px', fontWeight: '700', color: '#66ccff' }}>
                                {getAllAlgorithms().length}
                            </div>
                            <div style={{ fontSize: '12px', color: themeStyles.secondaryText }}>Total Algorithms</div>
                        </div>
                        <div style={{
                            background: 'rgba(74, 222, 128, 0.1)',
                            padding: '16px',
                            borderRadius: '12px',
                            border: '1px solid rgba(74, 222, 128, 0.2)'
                        }}>
                            <div style={{ fontSize: '24px', fontWeight: '700', color: '#4ade80' }}>
                                {getAllAlgorithms().filter(a => a.implemented).length}
                            </div>
                            <div style={{ fontSize: '12px', color: themeStyles.secondaryText }}>Implemented</div>
                        </div>
                        <div style={{
                            background: 'rgba(255, 215, 61, 0.1)',
                            padding: '16px',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 215, 61, 0.2)'
                        }}>
                            <div style={{ fontSize: '24px', fontWeight: '700', color: '#ffd93d' }}>
                                {Object.keys(algorithmDatabase).length}
                            </div>
                            <div style={{ fontSize: '12px', color: themeStyles.secondaryText }}>Categories</div>
                        </div>
                        <div style={{
                            background: 'rgba(255, 107, 107, 0.1)',
                            padding: '16px',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 107, 107, 0.2)'
                        }}>
                            <div style={{ fontSize: '24px', fontWeight: '700', color: '#ff6b6b' }}>
                                {getAllAlgorithms().filter(a => !a.implemented).length}
                            </div>
                            <div style={{ fontSize: '12px', color: themeStyles.secondaryText }}>Coming Soon</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter and Search Section */}
            <div style={{
                padding: '30px 20px',
                background: theme === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(26, 26, 46, 0.5)',
                backdropFilter: 'blur(5px)'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {/* Search Bar */}
                    <div style={{
                        position: 'relative',
                        marginBottom: '24px',
                        maxWidth: '400px',
                        margin: '0 auto 24px auto'
                    }}>
                        <Search 
                            size={20} 
                            style={{
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#66ccff'
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Search algorithms..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 12px 12px 44px',
                                background: themeStyles.inputBackground,
                                border: `1px solid ${themeStyles.inputBorder}`,
                                borderRadius: '25px',
                                color: themeStyles.color,
                                fontSize: '14px',
                                outline: 'none',
                                transition: 'all 0.3s ease'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = theme === 'light' ? '#0077cc' : '#66ccff';
                                e.target.style.boxShadow = theme === 'light' ? '0 0 0 3px rgba(0, 119, 204, 0.1)' : '0 0 0 3px rgba(102, 204, 255, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = themeStyles.inputBorder;
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    {/* Category Filters */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '12px',
                        flexWrap: 'wrap'
                    }}>
                        {categories.map(category => {
                            const IconComponent = category.icon;
                            const isActive = selectedCategory === category.key;
                            return (
                                <button
                                    key={category.key}
                                    onClick={() => setSelectedCategory(category.key)}
                                    style={{
                                        padding: '20px 20px',
                                        minWidth: '140px',
                                        background: isActive 
                                            ? (theme === 'light' ? 'linear-gradient(45deg, #0077cc, #005fa3)' : 'linear-gradient(45deg, #66ccff, #4da6ff)')
                                            : (theme === 'light' ? 'rgba(0, 119, 204, 0.1)' : 'rgba(102, 204, 255, 0.1)'),
                                        color: isActive ? (theme === 'light' ? '#ffffff' : '#1a1a2e') : (theme === 'light' ? '#0077cc' : '#66ccff'),
                                        border: `1px solid ${isActive ? (theme === 'light' ? '#0077cc' : '#66ccff') : (theme === 'light' ? 'rgba(0, 119, 204, 0.3)' : 'rgba(102, 204, 255, 0.3)')}`,
                                        borderRadius: '25px',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        transition: 'all 0.3s ease',
                                        fontFamily: 'inherit'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            e.target.style.background = theme === 'light' ? 'rgba(0, 119, 204, 0.2)' : 'rgba(102, 204, 255, 0.2)';
                                            e.target.style.transform = 'translateY(-2px)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            e.target.style.background = theme === 'light' ? 'rgba(0, 119, 204, 0.1)' : 'rgba(102, 204, 255, 0.1)';
                                            e.target.style.transform = 'translateY(0)';
                                        }
                                    }}
                                >
                                    <IconComponent size={16} />
                                    {category.label}
                                    <span style={{
                                        background: isActive ? 
                                            (theme === 'light' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(26, 26, 46, 0.2)') : 
                                            (theme === 'light' ? 'rgba(0, 119, 204, 0.2)' : 'rgba(102, 204, 255, 0.2)'),
                                        color: isActive ? 
                                            (theme === 'light' ? '#ffffff' : '#1a1a2e') : 
                                            (theme === 'light' ? '#0077cc' : '#66ccff'),
                                        padding: '2px 6px',
                                        borderRadius: '10px',
                                        fontSize: '11px',
                                        fontWeight: '700'
                                    }}>
                                        {category.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Results Count */}
            {(searchTerm || selectedCategory !== 'all') && (
                <div style={{
                    padding: '0 20px 20px 20px',
                    textAlign: 'center'
                }}>
                    <div style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        color: themeStyles.secondaryText,
                        fontSize: '14px'
                    }}>
                        Showing {filteredAlgorithms.length} algorithm{filteredAlgorithms.length !== 1 ? 's' : ''}
                        {searchTerm && ` matching "${searchTerm}"`}
                        {selectedCategory !== 'all' && ` in ${categories.find(c => c.key === selectedCategory)?.label}`}
                    </div>
                </div>
            )}

            {/* Algorithms Grid */}
            <div style={{
                padding: '20px 20px 60px 20px'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {filteredAlgorithms.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '80px 20px',
                            color: themeStyles.secondaryText
                        }}>
                            <Search size={48} style={{ color: theme === 'light' ? '#0077cc' : '#66ccff', marginBottom: '16px' }} />
                            <h3 style={{ color: theme === 'light' ? '#0077cc' : '#66ccff', marginBottom: '8px' }}>No algorithms found</h3>
                            <p>Try adjusting your search terms or filters</p>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
                            gap: '24px'
                        }}>
                            {filteredAlgorithms.map((algorithm) => (
                                <AlgorithmCard key={algorithm.id} algorithm={algorithm} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Footer Section */}
            <div style={{
                background: 'rgba(26, 26, 46, 0.95)',
                borderTop: '1px solid rgba(102, 204, 255, 0.2)',
                padding: '40px 20px',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h3 style={{
                        color: '#66ccff',
                        marginBottom: '16px',
                        fontSize: '20px',
                        fontWeight: '600'
                    }}>
                        Legend & Complexity Guide
                    </h3>
                    
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '20px',
                        marginBottom: '30px'
                    }}>
                        <div>
                            <h4 style={{ color: '#66ccff', fontSize: '14px', marginBottom: '12px' }}>
                                Time Complexity Colors
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-start' }}>
                                {[
                                    { complexity: 'O(1)', label: 'Constant', color: '#4ade80' },
                                    { complexity: 'O(log n)', label: 'Logarithmic', color: '#66ccff' },
                                    { complexity: 'O(n)', label: 'Linear', color: '#ffd93d' },
                                    { complexity: 'O(n log n)', label: 'Linearithmic', color: '#ff9500' },
                                    { complexity: 'O(n²)', label: 'Quadratic', color: '#ff6b6b' },
                                    { complexity: 'O(√n)', label: 'Square Root', color: '#a78bfa' }
                                ].map(item => (
                                    <div key={item.complexity} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{
                                            width: '12px',
                                            height: '12px',
                                            borderRadius: '3px',
                                            background: item.color
                                        }} />
                                        <span style={{ fontSize: '12px', color: '#e0e6ed' }}>
                                            {item.complexity} - {item.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 style={{ color: '#66ccff', fontSize: '14px', marginBottom: '12px' }}>
                                Implementation Status
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{
                                        background: 'linear-gradient(45deg, #4ade80, #22c55e)',
                                        color: '#ffffff',
                                        padding: '2px 8px',
                                        borderRadius: '12px',
                                        fontSize: '10px',
                                        fontWeight: '600',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                    }}>
                                        <Star size={10} />
                                        Implemented
                                    </div>
                                    <span style={{ fontSize: '12px', color: '#e0e6ed' }}>
                                        Ready to visualize
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{
                                        background: 'rgba(255, 215, 61, 0.2)',
                                        color: '#ffd93d',
                                        padding: '2px 8px',
                                        borderRadius: '12px',
                                        fontSize: '10px',
                                        fontWeight: '600',
                                        border: '1px solid rgba(255, 215, 61, 0.3)'
                                    }}>
                                        Coming Soon
                                    </div>
                                    <span style={{ fontSize: '12px', color: '#e0e6ed' }}>
                                        In development
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 style={{ color: theme === 'light' ? '#0077cc' : '#66ccff', fontSize: '14px', marginBottom: '12px' }}>
                                Algorithm Properties
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-start' }}>
                                <div style={{ fontSize: '12px', color: '#e0e6ed' }}>
                                    <span style={{ color: '#4ade80' }}>●</span> Stable - maintains relative order
                                </div>
                                <div style={{ fontSize: '12px', color: '#e0e6ed' }}>
                                    <span style={{ color: '#4ade80' }}>●</span> In-place - uses O(1) extra space
                                </div>
                                <div style={{ fontSize: '12px', color: '#e0e6ed' }}>
                                    <span style={{ color: '#4ade80' }}>●</span> Adaptive - faster on sorted data
                                </div>
                                <div style={{ fontSize: '12px', color: '#e0e6ed' }}>
                                    <span style={{ color: '#ff6b6b' }}>●</span> Unstable - may change relative order
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        background: themeStyles.categoryBackground,
                        padding: '20px',
                        borderRadius: '12px',
                        border: `1px solid ${themeStyles.categoryBorder}`
                    }}>
                        <p style={{ 
                            fontSize: '14px', 
                            color: themeStyles.secondaryText, 
                            margin: 0, 
                            lineHeight: '1.6' 
                        }}>
                            <strong style={{ color: theme === 'light' ? '#0085cc' : '#66ccff' }}>Note:</strong> <span style={{color: '#e0e6ed'}}>Complexities shown are theoretical worst-case scenarios. 
                            Actual performance may vary based on input data, implementation details, and system architecture. 
                            Use this documentation as a guide for understanding algorithm characteristics and choosing the right tool for your needs.</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export  default AlgorithmDocumentation;