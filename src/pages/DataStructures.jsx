import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Search, Clock, Database, BookOpen, Zap, Users, Star, X } from "lucide-react";
import { useTheme } from "../ThemeContext";
import { useNavigate } from "react-router-dom";
import "../styles/Documentation.css";
import AOS from "aos";
import "aos/dist/aos.css";

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
        description:
          "Compares adjacent elements and swaps them if they are in wrong order. Simple but inefficient for large datasets.",
        timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)", averaget: "O(n²)" },
        spaceComplexity: "O(1)",
        stability: "Stable",
        inPlace: true,
        adaptivity: "Adaptive",
        implemented: true
      },
      {
        name: "Selection Sort",
        id: "selectionSort",
        description:
          "Finds the minimum element and places it at the beginning. Makes fewer swaps than bubble sort.",
        timeComplexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)", averaget: "O(n²)" },
        spaceComplexity: "O(1)",
        stability: "Unstable",
        inPlace: true,
        adaptivity: "Not Adaptive",
        implemented: true
      },
      {
        name: "Insertion Sort",
        id: "insertionSort",
        description:
          "Builds sorted array one element at a time. Efficient for small datasets and nearly sorted arrays.",
        timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)", averaget: "O(n²)" },
        spaceComplexity: "O(1)",
        stability: "Stable",
        inPlace: true,
        adaptivity: "Adaptive",
        implemented: true
      },
      {
        name: "Merge Sort",
        id: "mergeSort",
        description: "Divides array into halves, sorts recursively, and merges them.",
        timeComplexity: {
          best: "O(n log n)",
          average: "O(n log n)",
          worst: "O(n log n)",
          averaget: "O(n log n)"
        },
        spaceComplexity: "O(n)",
        stability: "Stable",
        inPlace: false,
        adaptivity: "Not Adaptive",
        implemented: true
      },
      {
        name: "Quick Sort",
        id: "quickSort",
        description:
          "Selects a pivot and partitions array around it. Fast average case but can degrade to O(n²).",
        timeComplexity: {
          best: "O(n log n)",
          average: "O(n log n)",
          worst: "O(n²)",
          averaget: "O(n log n)"
        },
        spaceComplexity: "O(log n)",
        stability: "Unstable",
        inPlace: true,
        adaptivity: "Not Adaptive",
        implemented: true
      },
      {
        name: "Tim Sort",
        id: "timSort",
        description:
          "Hybrid stable sorting algorithm derived from merge sort and insertion sort. Optimized for real-world data by taking advantage of runs (already sorted subsequences).",
        timeComplexity: {
          best: "O(n)",
          average: "O(n log n)",
          worst: "O(n log n)",
          averaget: "O(n log n)"
        },
        spaceComplexity: "O(n)",
        stability: "Stable",
        inPlace: false,
        adaptivity: "Adaptive",
        implemented: true
      },
      {
        name: "Intro Sort",
        id: "introSort",
        description:
          "Hybrid sorting algorithm that begins with quicksort, switches to heapsort when recursion depth is too large, and uses insertion sort for small partitions. Combines fast average performance with worst-case guarantees.",
        timeComplexity: {
          best: "O(n log n)",
          average: "O(n log n)",
          worst: "O(n log n)",
          averaget: "O(n log n)"
        },
        spaceComplexity: "O(log n)",
        stability: "Unstable",
        inPlace: true,
        adaptivity: "Not Adaptive",
        implemented: true
      },
      {
        name: "Shell Sort",
        id: "shellSort",
        description:
          "In-place comparison-based sorting algorithm that generalizes insertion sort by allowing exchanges of elements that are far apart. It improves on insertion sort by breaking the original list into smaller sublists using a gap sequence, reducing the total number of moves.",
        timeComplexity: {
          best: "O(n log n)",
          average: "O(n(log n)^2)",
          worst: "O(n(log n)^2)",
          averaget: "O(n(log n)^2)"
        },
        spaceComplexity: "O(1)",
        stability: "Unstable",
        inPlace: true,
        adaptivity: "Not Adaptive",
        implemented: true
      },
      {
        name: "Cycle Sort",
        id: "cycleSort",
        description:
          "An in-place, unstable sorting algorithm that minimizes writes by rotating elements to their correct position in a cycle. Especially useful when write operations are expensive (e.g., EEPROM/flash memory).",
        timeComplexity: {
          best: "O(n²)",
          average: "O(n²)",
          worst: "O(n²)",
          averaget: "O(n²)"
        },
        spaceComplexity: "O(1)",
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
      ,
      {
        name: "Linear Search",
        id: "linearSearch",
        description:
          "Searches through array sequentially until target is found. Works on unsorted arrays.",
        timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)", averaget: "O(n)" },
        spaceComplexity: "O(1)",
        dataRequirement: "None (works on unsorted data)",
        implemented: true
      },
      {
        name: "Binary Search",
        id: "binarySearch",
        description:
          "Searches a sorted array by repeatedly halving the search interval: compare the middle element to the target and discard the half that cannot contain it.",
        timeComplexity: {
          best: "O(1)",
          average: "O(log n)",
          worst: "O(log n)",
          averaget: "O(log n)"
        },
        spaceComplexity: "O(1)",
        dataRequirement: "Sorted array",
        implemented: true
      },
      {
        name: "Exponential Search",
        id: "exponentialSearch",
        description:
          "For sorted arrays: expands the search range exponentially (1, 2, 4, 8, …) until it bounds the target, then performs binary search within that range.",
        timeComplexity: {
          best: "O(1)",
          average: "O(log n)",
          worst: "O(log n)",
          averaget: "O(log n)"
        },
        spaceComplexity: "O(1)",
        dataRequirement: "Sorted array",
        implemented: true
      },

      {
        name: "Jump Search",
        id: "jumpSearch",
        description:
          "Efficient search on sorted arrays that jumps ahead by fixed steps (√n) and then performs a linear search within the identified block.",
        timeComplexity: { best: "O(1)", average: "O(√n)", worst: "O(√n)", averaget: "O(√n)" },
        spaceComplexity: "O(1)",
        dataRequirement: "Sorted array",
        implemented: true
      },

      {
        name: "Ternary Search",
        id: "ternarySearch",
        description:
          "Searches sorted array by repeatedly dividing search interval into three parts.",
        timeComplexity: {
          best: "O(1)",
          average: "O(log₃ n)",
          worst: "O(log₃ n)",
          averaget: "O(log₃ n)"
        },
        spaceComplexity: "O(1)",
        dataRequirement: "Sorted array",
        implemented: true
      },

      {
        name: "Fibonacci Search",
        id: "fibonacciSearch",
        path: "/searching", // <--- THIS IS THE FINAL FIX
        description:
          "Uses Fibonacci numbers to narrow down search positions in a sorted array, which avoids costly division operations.",
        timeComplexity: {
          best: "O(1)",
          average: "O(log n)",
          worst: "O(log n)",
          averaget: "O(log n)"
        },
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
        name: "Array",
        id: "array",
        description:
          "An array is a collection of elements of the same data type stored in contiguous memory locations.",
        timeComplexity: {
          Access: "O(1)",
          SearchLinear: " O(n)",
          SearchBinary: "O(log n)",
          Insertion: "O(1) (amortized)",
          Deletion: "O(1)",
          Traversal: "O(n)"
        },
        spaceComplexity: "O(n)",
        implemented: true
      },
      {
        name: "Linked List",
        id: "linkedList",
        description: "Linear data structure where elements are stored in nodes.",
        timeComplexity: {
          insertion: "O(1)",
          deletion: "O(1)",
          search: "O(n)",
          access: "O(n)",
          averaget: "O(n)"
        },
        spaceComplexity: "O(n)",
        implemented: true
      },

      {
        name: "Stack",
        id: "stack",
        description: "Last-In-First-Out (LIFO) data structure.",
        timeComplexity: {
          push: "O(1)",
          pop: "O(1)",
          peek: "O(1)",
          search: "O(n)",
          averaget: "O(1)"
        },
        spaceComplexity: "O(n)",
        implemented: true
      },
      {
        name: "Queue",
        id: "queue",
        description: "First-In-First-Out (FIFO) data structure.",
        timeComplexity: {
          enqueue: "O(1)",
          dequeue: "O(1)",
          front: "O(1)",
          search: "O(n)",
          averaget: "O(1)"
        },
        spaceComplexity: "O(n)",
        implemented: true
      },
      {
        name: "Binary Tree",
        id: "binaryTree",
        description: "Hierarchical data structure where each node has at most two children.",
        timeComplexity: {
          insertion: "O(log n)",
          deletion: "O(log n)",
          search: "O(log n)",
          traversal: "O(n)",
          averaget: "O(log n)"
        },
        spaceComplexity: "O(n)",
        implemented: true
      },
      {
        name: "Trie",
        id: "trie",
        description:
          "Prefix tree data structure for efficient string operations like search, insert, and prefix matching.",
        timeComplexity: {
          insertion: "O(m)",
          deletion: "O(m)",
          search: "O(m)",
          prefixSearch: "O(m)",
          averaget: "O(m)"
        },
        spaceComplexity: "O(N)",
        implemented: true,
      },
      {
        name:"KadanesAlgorithm",
        id:"kadane",
        description:"Kadane’s Algorithm is used to find the maximum sum of a contiguous subarray in an array (which may contain negative numbers).",
         timeComplexity:"O(n)",
         spaceComplexity: "O(1)",
        implemented: true,
      },
      {
      name: "KMP Algorithm",
      id: "kmp",
      description:
        "Efficient string matching algorithm that avoids re-checking characters by using the LPS (Longest Prefix Suffix) array.",
      timeComplexity: { best: "O(n + m)", average: "O(n + m)", worst: "O(n + m)" },
      spaceComplexity: "O(m)",
      implemented: true,
    },

    {
     name:"Dijkstras Algorithm",
     id:"dijkstras",
     description:
     "Dijkstra’s algorithm finds the shortest path between nodes in a weighted graph with non-negative edge weights.",
     timeComplexity:"O(V²)",
     spaceComplexity:"O(V) ",
     implemented:true,
    },
    {
      name:"Divide And Conquer",
      id:"divideandconquer",
      description:
      "Divide and Conquer is a problem-solving technique where a problem is broken down into smaller subproblems (Divide), solved independently (Conquer), and then combined to get the final solution (Combine).",
      timeComplexity:"O(n log n)",
      spaceComplexity:"O(n)",
      implemented:true,
    },
    {
      name:"0/1 Knapsack",
      id:"knapsack",
      description:
      "The 0/1 Knapsack problem chooses items with maximum total value without exceeding the capacity. Each item can either be taken (1) or not (0).",
      timeComplexity:"O(n × W)",
      spaceComplexity:"O(n × W)",
      implemented:true,
    }

    ],
  },
};

const getComplexityColor = (complexity) => {
  const colors = {
    "O(1)": "#4ade80",
    "O(log n)": "#66ccff",
    "O(n)": "#ffd93d",
    "O(n log n)": "#ff9500",
    "O(n²)": "#ff6b6b",
    "O(√n)": "#a78bfa"
  };
  return colors[complexity] || "#e0e6ed";
};

// ============================================================================
// 2. SUB-COMPONENTS
// ============================================================================

function AlgorithmCard({ algorithm }) {
  const navigate = useNavigate();
  const toKebab = (s) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

  const handleCardClick = () => {
    if (algorithm.implemented) {
      if (algorithm.category === "dataStructures" && algorithm.id === "linkedList") {
        navigate("/data-structures/linked-list");
      } else if (algorithm.category === "sorting") {
        navigate(`/sorting/${algorithm.id}/docs`);
      } else if (algorithm.category === "searching") {
        if (algorithm.id === "ternarySearch") {
          navigate("/searching/ternarySearch");
        }

        if (algorithm.id === "binarySearch") {
          navigate("/searching/binarySearch");
        }

        if (algorithm.id === "jumpSearch") {
          navigate("/searching/jumpSearch");
        }

        if (algorithm.id === "exponentialSearch") {
          navigate("/searching/exponentialSearch");
        }

        if (algorithm.id === "fibonacciSearch") {
          navigate("/searching/fibonacciSearch");
        }
      } else if (algorithm.category === "dataStructures") {
        navigate(`/data-structures/${toKebab(algorithm.id)}`);
      }
    }
  };

  return (
    <div
      className={`algorithm-card ${algorithm.implemented ? "clickable" : ""}`}
      onClick={handleCardClick}
      title={algorithm.description}
      style={{ cursor: algorithm.implemented ? "pointer" : "default" }}
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-once="true"
    >
      {/* Header */}
      <div className="card-header flex items-center justify-between mb-3 ">
        <div className="card-title-group flex items-center gap-2">
          <span className="card-icon text-blue-500 text-lg">{algorithm.categoryIcon}</span>
          <h3 className=" text-gray-800 font-bold text-center text-2xl leading-tight">
            {algorithm.name}
          </h3>
        </div>

        {algorithm.implemented ? (
          <div className="status-badge implemented text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">
            Implemented
          </div>
        ) : (
          <div className="status-badge coming-soon text-xs font-medium bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
            Coming Soon
          </div>
        )}
      </div>

      {/* Description */}
      <p className="card-description tracking-tighter text-sm text-gray-600 leading-relaxed mb-3 text-left text-pretty">
        {algorithm.description}
      </p>
      {algorithm.category === "sorting" || algorithm.category === "searching" ? (
        <div>
          <p className="text-xl  font-bold text-black">TC : {algorithm.timeComplexity.averaget} </p>
          <p className="text-xl font-bold text-black">SC : {algorithm.spaceComplexity} </p>
        </div>
      ) : null}
      {/* Category Badge */}
      <div className="card-category-badge mt-auto text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md font-extrabold italic inline-block">
        {algorithm.categoryTitle}
      </div>
    </div>
  );
}

// ============================================================================
// 3. MAIN COMPONENT DEFINITION
// ============================================================================

function DataStructuresPage() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredAlgorithms, setFilteredAlgorithms] = useState([]);

  const getAllAlgorithms = useCallback(() => {
    let allAlgos = [];
    Object.entries(algorithmDatabase).forEach(([categoryKey, category]) => {
      category.algorithms.forEach((algo) => {
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
    if (selectedCategory !== "all") {
      allAlgorithms = allAlgorithms.filter((algo) => algo.category === selectedCategory);
    }
    if (searchTerm) {
      allAlgorithms = allAlgorithms.filter(
        (algo) =>
          algo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          algo.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredAlgorithms(allAlgorithms);
  }, [searchTerm, selectedCategory, getAllAlgorithms]);

  const categories = useMemo(
    () => [
      {
        key: "all",
        label: "All",
        icon: BookOpen,
        count: getAllAlgorithms().length
      },
      {
        key: "sorting",
        label: "Sorting",
        icon: Users,
        count: algorithmDatabase.sorting.algorithms.length
      },
      {
        key: "searching",
        label: "Searching",
        icon: Search,
        count: algorithmDatabase.searching.algorithms.length
      },
      {
        key: "dataStructures",
        label: "Data Structures",
        icon: Database,
        count: algorithmDatabase.dataStructures.algorithms.length
      }
    ],
    [getAllAlgorithms]
  );

  return (
    <div className="theme-container" data-aos="fade-up" data-aos-duration="1000">
      <h1 className="theme-title">Algorithm Documentation</h1>

      {/* Search and Filter Section */}
      <div
        className="theme-card filters-section p-4 rounded-lg shadow-md"
        style={{
          backgroundColor: theme === "light" ? "#ffffff" : "#1f2937",
          color: theme === "light" ? "#111827" : "#f9fafb"
        }}
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {/* Search bar */}
        <div className="search-bar mb-4">
          <div className="relative flex items-center">
            <Search
              size={20}
              className="absolute left-2"
              style={{ color: theme === "light" ? "#6b7280" : "#d1d5db" }}
            />
            <input
              type="text"
              placeholder="Search algorithms.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control w-full pl-10 p-2 rounded border"
              style={{
                backgroundColor: theme === "light" ? "#ffffff" : "#374151",
                color: theme === "light" ? "#111827" : "#f9fafb",
                borderColor: theme === "light" ? "#d1d5db" : "#4b5563"
              }}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="category-filters flex flex-wrap gap-2">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isActive = selectedCategory === category.key;
            return (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className="flex items-center px-3 py-1 rounded transition-colors duration-200 font-medium"
                style={{
                  backgroundColor: isActive
                    ? theme === "light"
                      ? "#2563eb"
                      : "#3b82f6"
                    : theme === "light"
                    ? "#f3f4f6"
                    : "#374151",
                  color: isActive ? "#ffffff" : theme === "light" ? "#111827" : "#d1d5db"
                }}
              >
                <IconComponent size={16} className="mr-1" />
                {category.label}
                <span
                  className="count-badge ml-2 px-1 rounded text-xs"
                  style={{
                    backgroundColor: isActive
                      ? theme === "light"
                        ? "#1d4ed8"
                        : "#2563eb"
                      : theme === "light"
                      ? "#e5e7eb"
                      : "#4b5563",
                    color: isActive ? "#ffffff" : theme === "light" ? "#111827" : "#f9fafb"
                  }}
                >
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Grid */}
      <div className="results-grid">
        {filteredAlgorithms.length > 0 ? (
          filteredAlgorithms.map((algorithm) => (
            <AlgorithmCard key={algorithm.id} algorithm={algorithm} />
          ))
        ) : (
          <div
            className="no-results-card theme-card p-6 rounded-lg flex flex-col items-center justify-center"
            style={{
              backgroundColor: theme === "light" ? "#ffffff" : "#1f2937",
              color: theme === "light" ? "#111827" : "#f9fafb"
            }}
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <Search size={48} style={{ marginBottom: "12px" }} />
            <h3>No algorithms found</h3>
            <p>Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DataStructuresPage;
