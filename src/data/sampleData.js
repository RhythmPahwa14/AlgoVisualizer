// Sample data definitions for different algorithm types

export const SAMPLE_DATA = {
  // Array-based algorithms (sorting, searching)
  array: {
    small: [64, 34, 25, 12, 22, 11, 90],
    medium: [45, 23, 67, 89, 12, 56, 78, 34, 91, 23, 45, 67, 89, 12, 56, 78, 34, 91, 23, 45],
    large: Array.from({ length: 50 }, () => Math.floor(Math.random() * 100) + 1),
    sorted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    reverse: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    duplicates: [5, 3, 8, 3, 9, 1, 5, 8, 2, 5]
  },

  // Graph data for graph algorithms
  graph: {
    simple: {
      nodes: [
        { id: 0, label: "A" },
        { id: 1, label: "B" },
        { id: 2, label: "C" },
        { id: 3, label: "D" },
        { id: 4, label: "E" }
      ],
      edges: [
        { id: "0-1", from: 0, to: 1, weight: 2 },
        { id: "0-2", from: 0, to: 2, weight: 4 },
        { id: "1-2", from: 1, to: 2, weight: 1 },
        { id: "1-3", from: 1, to: 3, weight: 7 },
        { id: "2-4", from: 2, to: 4, weight: 3 },
        { id: "3-4", from: 3, to: 4, weight: 2 }
      ]
    },

    complex: {
      nodes: [
        { id: 0, label: "Start" },
        { id: 1, label: "A" },
        { id: 2, label: "B" },
        { id: 3, label: "C" },
        { id: 4, label: "D" },
        { id: 5, label: "E" },
        { id: 6, label: "F" },
        { id: 7, label: "Goal" }
      ],
      edges: [
        { id: "0-1", from: 0, to: 1, weight: 3 },
        { id: "0-2", from: 0, to: 2, weight: 5 },
        { id: "1-3", from: 1, to: 3, weight: 2 },
        { id: "1-4", from: 1, to: 4, weight: 4 },
        { id: "2-4", from: 2, to: 4, weight: 1 },
        { id: "2-5", from: 2, to: 5, weight: 6 },
        { id: "3-6", from: 3, to: 6, weight: 3 },
        { id: "4-6", from: 4, to: 6, weight: 2 },
        { id: "4-7", from: 4, to: 7, weight: 5 },
        { id: "5-7", from: 5, to: 7, weight: 2 },
        { id: "6-7", from: 6, to: 7, weight: 1 }
      ]
    },

    weighted: {
      nodes: [
        { id: 0, label: "A", x: 100, y: 100 },
        { id: 1, label: "B", x: 200, y: 50 },
        { id: 2, label: "C", x: 300, y: 100 },
        { id: 3, label: "D", x: 200, y: 150 },
        { id: 4, label: "E", x: 250, y: 200 },
        { id: 5, label: "F", x: 350, y: 180 }
      ],
      edges: [
        { id: "0-1", from: 0, to: 1, weight: 10 },
        { id: "0-3", from: 0, to: 3, weight: 5 },
        { id: "1-2", from: 1, to: 2, weight: 1 },
        { id: "1-3", from: 1, to: 3, weight: 3 },
        { id: "2-5", from: 2, to: 5, weight: 4 },
        { id: "3-1", from: 3, to: 1, weight: 2 },
        { id: "3-2", from: 3, to: 2, weight: 9 },
        { id: "3-4", from: 3, to: 4, weight: 2 },
        { id: "4-5", from: 4, to: 5, weight: 6 },
        { id: "5-2", from: 5, to: 2, weight: 7 }
      ]
    },

    cycle: {
      nodes: [
        { id: 1, label: "1" },
        { id: 2, label: "2" },
        { id: 3, label: "3" },
        { id: 4, label: "4" },
        { id: 5, label: "5" },
        { id: 6, label: "6" }
      ],
      edges: [
        { id: "1-2", from: 1, to: 2 },
        { id: "2-3", from: 2, to: 3 },
        { id: "3-4", from: 3, to: 4 },
        { id: "4-5", from: 4, to: 5 },
        { id: "5-6", from: 5, to: 6 },
        { id: "6-3", from: 6, to: 3 } // This creates a cycle: 3 → 4 → 5 → 6 → 3
      ]
    }
  },

  // Tree data for tree algorithms
  tree: {
    binarySearchTree: {
      value: 8,
      left: {
        value: 3,
        left: { value: 1, left: null, right: null },
        right: {
          value: 6,
          left: { value: 4, left: null, right: null },
          right: { value: 7, left: null, right: null }
        }
      },
      right: {
        value: 10,
        left: null,
        right: {
          value: 14,
          left: { value: 13, left: null, right: null },
          right: null
        }
      }
    },

    binaryTree: {
      value: 1,
      left: {
        value: 2,
        left: { value: 4, left: null, right: null },
        right: { value: 5, left: null, right: null }
      },
      right: {
        value: 3,
        left: { value: 6, left: null, right: null },
        right: { value: 7, left: null, right: null }
      }
    },

    heap: {
      type: "max-heap",
      array: [90, 85, 75, 60, 70, 65, 55, 45, 50, 30]
    }
  },

  // Specialized data structures
  linkedList: {
    simple: {
      nodes: [
        { value: 1, next: 1 },
        { value: 2, next: 2 },
        { value: 3, next: 3 },
        { value: 4, next: null }
      ]
    },

    withLoop: {
      nodes: [
        { value: 1, next: 1 },
        { value: 2, next: 2 },
        { value: 3, next: 3 },
        { value: 4, next: 1 } // Creates a loop back to node 1
      ]
    }
  },

  // Stack and Queue data
  stack: {
    numbers: [1, 2, 3, 4, 5],
    operations: [
      { type: "push", value: 10 },
      { type: "push", value: 20 },
      { type: "pop" },
      { type: "push", value: 30 },
      { type: "pop" }
    ]
  },

  queue: {
    numbers: [1, 2, 3, 4, 5],
    operations: [
      { type: "enqueue", value: 10 },
      { type: "enqueue", value: 20 },
      { type: "dequeue" },
      { type: "enqueue", value: 30 },
      { type: "dequeue" }
    ]
  }
};

// Format descriptions for different data types
export const FORMAT_DESCRIPTIONS = {
  array: {
    description: "Array of numbers for sorting and searching algorithms",
    format: "JSON array of numbers",
    examples: [
      "[64, 34, 25, 12, 22, 11, 90]",
      "64, 34, 25, 12, 22, 11, 90 (comma-separated)"
    ]
  },

  graph: {
    description: "Graph structure with nodes and edges",
    format: "JSON object with 'nodes' and 'edges' arrays",
    examples: [
      `{
  "nodes": [
    {"id": 0, "label": "A"},
    {"id": 1, "label": "B"}
  ],
  "edges": [
    {"id": "0-1", "from": 0, "to": 1, "weight": 5}
  ]
}`
    ]
  },

  tree: {
    description: "Tree structure for tree algorithms",
    format: "JSON object with recursive structure",
    examples: [
      `{
  "value": 8,
  "left": {"value": 3, "left": null, "right": null},
  "right": {"value": 10, "left": null, "right": null}
}`
    ]
  },

  linkedList: {
    description: "Linked list with nodes and connections",
    format: "JSON object with nodes array",
    examples: [
      `{
  "nodes": [
    {"value": 1, "next": 1},
    {"value": 2, "next": 2},
    {"value": 3, "next": null}
  ]
}`
    ]
  }
};

// Validation rules for different data types
export const VALIDATION_RULES = {
  array: (data) => {
    if (!Array.isArray(data)) throw new Error('Data must be an array');
    if (data.length === 0) throw new Error('Array cannot be empty');
    if (data.length > 1000) throw new Error('Array size cannot exceed 1000 elements');
    data.forEach((item, index) => {
      if (typeof item !== 'number' || isNaN(item)) {
        throw new Error(`Element at index ${index} must be a valid number`);
      }
    });
  },

  graph: (data) => {
    if (!data || typeof data !== 'object') throw new Error('Graph data must be an object');
    if (!data.nodes || !Array.isArray(data.nodes)) throw new Error('Graph must contain a "nodes" array');
    if (!data.edges || !Array.isArray(data.edges)) throw new Error('Graph must contain an "edges" array');
    if (data.nodes.length === 0) throw new Error('Graph must have at least one node');
    if (data.nodes.length > 100) throw new Error('Graph cannot have more than 100 nodes');
    
    const nodeIds = new Set(data.nodes.map(node => node.id));
    data.edges.forEach((edge, index) => {
      if (!edge.hasOwnProperty('from') || !edge.hasOwnProperty('to')) {
        throw new Error(`Edge at index ${index} must have "from" and "to" properties`);
      }
      if (!nodeIds.has(edge.from)) {
        throw new Error(`Edge at index ${index} references unknown node: ${edge.from}`);
      }
      if (!nodeIds.has(edge.to)) {
        throw new Error(`Edge at index ${index} references unknown node: ${edge.to}`);
      }
    });
  },

  tree: (data) => {
    if (!data || typeof data !== 'object') throw new Error('Tree data must be an object');
    if (!data.hasOwnProperty('value')) throw new Error('Tree node must have a "value" property');
    
    const validateNode = (node, depth = 0) => {
      if (depth > 20) throw new Error('Tree depth cannot exceed 20 levels');
      if (node === null) return;
      if (typeof node !== 'object') throw new Error('Tree node must be an object or null');
      if (!node.hasOwnProperty('value')) throw new Error('Tree node must have a "value" property');
      
      if (node.left !== null && node.left !== undefined) {
        validateNode(node.left, depth + 1);
      }
      if (node.right !== null && node.right !== undefined) {
        validateNode(node.right, depth + 1);
      }
    };
    
    validateNode(data);
  }
};

// Get sample data for a specific type and variant
export const getSampleData = (dataType, variant = 'simple') => {
  return SAMPLE_DATA[dataType]?.[variant] || SAMPLE_DATA[dataType]?.simple || null;
};

// Get format description for a data type
export const getFormatDescription = (dataType) => {
  return FORMAT_DESCRIPTIONS[dataType] || {
    description: "Custom data format",
    format: "JSON object",
    examples: ["{}"]
  };
};

// Get validation rule for a data type
export const getValidationRule = (dataType) => {
  return VALIDATION_RULES[dataType] || null;
};