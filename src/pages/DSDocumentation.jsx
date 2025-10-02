// src/pages/DSDocumentation.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import "../styles/components.css";
import "../styles/global-theme.css";
import "aos/dist/aos.css";
import AOS from "aos";

// ============================================================================
// 1. STATIC DATA (Only Data Structures)
// ============================================================================

const dataStructuresDB = {
  dataStructures: {
    title: "Data Structures",
    icon: "🏗️",
    color: "#ffd93d",
    items: [
      {
        name: "Linked List",
        id: "linkedList",
        description:
          "Linear data structure where elements are stored in nodes with pointers. Useful for dynamic memory allocation.",
        timeComplexity: {
          insertion: "O(1)",
          deletion: "O(1)",
          search: "O(n)",
          access: "O(n)",
        },
        spaceComplexity: "O(n)",
        implemented: false,
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
        },
        spaceComplexity: "O(n)",
        implemented: false,
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
        },
        spaceComplexity: "O(n)",
        implemented: false,
      },
      {
        name: "Binary Tree",
        id: "binaryTree",
        description:
          "Hierarchical data structure where each node has at most two children.",
        timeComplexity: {
          insertion: "O(log n)",
          deletion: "O(log n)",
          search: "O(log n)",
          traversal: "O(n)",
        },
        spaceComplexity: "O(n)",
        implemented: false,
      },
      {
        name: "Graph (as DS)",
        id: "graphDS",
        description:
          "Collection of nodes (vertices) connected by edges. Can be directed/undirected, weighted/unweighted.",
        timeComplexity: {
          traversal: "O(V + E)",
          search: "O(V + E)",
        },
        spaceComplexity: "O(V + E)",
        implemented: false,
      },
    ],
  },
};

// ============================================================================
// 2. DS CARD COMPONENT
// ============================================================================

const DSCard = ({ ds }) => {
  return (
    <div
      className="theme-card algorithm-card hover-up"
      data-aos="fade-up"
      title={ds.description}
    >
      <div className="card-header flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xl">{dataStructuresDB.dataStructures.icon}</span>
          <h3 className="card-title text-lg font-semibold">{ds.name}</h3>
        </div>
        <div
          className={`status-badge ${
            ds.implemented ? "implemented" : "coming-soon"
          }`}
        >
          {ds.implemented ? "Implemented" : "Coming Soon"}
        </div>
      </div>

      <p className="card-description mt-2">{ds.description}</p>

      <div className="complexity-section mt-3 text-sm">
        {ds.timeComplexity &&
          Object.entries(ds.timeComplexity).map(([op, val]) => (
            <div key={op} className="flex justify-between">
              <span className="font-medium capitalize">{op}</span>
              <span>{val}</span>
            </div>
          ))}
        <div className="flex justify-between font-medium">
          <span>Space</span>
          <span>{ds.spaceComplexity}</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3. MAIN COMPONENT
// ============================================================================

const DSDocumentation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDS, setFilteredDS] = useState([]);

  const getAllDS = useCallback(() => {
    return dataStructuresDB.dataStructures.items.map((ds) => ({
      ...ds,
      category: "dataStructures",
      categoryTitle: "Data Structures",
      categoryIcon: dataStructuresDB.dataStructures.icon,
      categoryColor: dataStructuresDB.dataStructures.color,
    }));
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    let allDS = getAllDS();
    if (searchTerm) {
      allDS = allDS.filter(
        (ds) =>
          ds.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ds.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredDS(allDS);
  }, [searchTerm, getAllDS]);

  return (
    <div className="theme-container py-8 px-4 md:px-8">
      <h1 className="theme-title text-3xl font-bold mb-6">Data Structures</h1>

      {/* SEARCH */}
      <div className="theme-card filters-section mb-6 p-4 flex items-center gap-2">
        <Search size={20} className="text-neutral-600 dark:text-neutral-300" />
        <input
          type="text"
          placeholder="Search data structures..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control flex-1 bg-transparent outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
        />
      </div>

      {/* GRID RESULTS */}
      <div className="results-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredDS.length > 0 ? (
          filteredDS.map((ds) => <DSCard key={ds.id} ds={ds} />)
        ) : (
          <div className="no-results-card theme-card text-center p-6">
            <Search size={48} className="mx-auto text-neutral-400" />
            <h3 className="mt-2 text-lg font-semibold">No data structures found</h3>
            <p className="text-neutral-500 mt-1">Try adjusting your search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DSDocumentation;
