import React, { useState, useRef, useEffect, useCallback } from "react";
import "../styles/global-theme.css";

// Union-Find (Disjoint Set) implementation
class UnionFind {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = Array(size).fill(0);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }

  union(x, y) {
    const px = this.find(x), py = this.find(y);
    if (px !== py) {
      if (this.rank[px] < this.rank[py]) {
        this.parent[px] = py;
      } else if (this.rank[px] > this.rank[py]) {
        this.parent[py] = px;
      } else {
        this.parent[py] = px;
        this.rank[px]++;
      }
      return true; // Union successful
    }
    return false; // Already in same set
  }

  getSets() {
    const sets = {};
    for (let i = 0; i < this.parent.length; i++) {
      const root = this.find(i);
      if (!sets[root]) sets[root] = [];
      sets[root].push(i);
    }
    return sets;
  }
}

// Kruskal's Algorithm implementation
const kruskalsAlgorithm = (adjacencyMatrix) => {
  const n = adjacencyMatrix.length;
  const edges = [];

  // Collect all edges
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (adjacencyMatrix[i][j] > 0) {
        edges.push({ from: i, to: j, weight: adjacencyMatrix[i][j] });
      }
    }
  }

  // Sort edges by weight
  edges.sort((a, b) => a.weight - b.weight);

  const steps = [];
  const uf = new UnionFind(n);
  const mst = [];
  let totalCost = 0;

  steps.push({
    type: 'init',
    edges: [...edges],
    sortedEdges: [],
    currentMST: [],
    totalCost: 0,
    uf: new UnionFind(n),
    currentEdge: null,
    message: `Collected ${edges.length} edges. Sorting edges by weight.`
  });

  // Sort edges step by step for visualization
  const sortedEdges = [];
  for (let i = 0; i < edges.length; i++) {
    sortedEdges.push(edges[i]);
    steps.push({
      type: 'sorting',
      edges: [...edges],
      sortedEdges: [...sortedEdges],
      currentMST: [...mst],
      totalCost,
      uf: new UnionFind(n), // Fresh copy for each step
      currentEdge: null,
      message: `Sorted ${i + 1}/${edges.length} edges. Current edge: (${edges[i].from}-${edges[i].to}): ${edges[i].weight}`
    });
  }

  // Now process each edge
  for (let i = 0; i < edges.length; i++) {
    const edge = edges[i];
    const ufCopy = new UnionFind(n);

    // Restore previous unions
    for (let j = 0; j < mst.length; j++) {
      ufCopy.union(mst[j].from, mst[j].to);
    }

    const fromRoot = ufCopy.find(edge.from);
    const toRoot = ufCopy.find(edge.to);
    const willFormCycle = fromRoot === toRoot;

    steps.push({
      type: 'consider',
      edges: [...edges],
      sortedEdges: [...sortedEdges],
      currentMST: [...mst],
      totalCost,
      uf: ufCopy,
      currentEdge: edge,
      willFormCycle,
      message: `Considering edge (${edge.from}-${edge.to}): ${edge.weight}. ${willFormCycle ? 'Would form cycle - skipping.' : 'No cycle - adding to MST.'}`
    });

    if (!willFormCycle) {
      ufCopy.union(edge.from, edge.to);
      mst.push(edge);
      totalCost += edge.weight;

      steps.push({
        type: 'add',
        edges: [...edges],
        sortedEdges: [...sortedEdges],
        currentMST: [...mst],
        totalCost,
        uf: ufCopy,
        currentEdge: edge,
        message: `Added edge (${edge.from}-${edge.to}): ${edge.weight} to MST. Current cost: ${totalCost}`
      });
    } else {
      steps.push({
        type: 'skip',
        edges: [...edges],
        sortedEdges: [...sortedEdges],
        currentMST: [...mst],
        totalCost,
        uf: ufCopy,
        currentEdge: edge,
        message: `Skipped edge (${edge.from}-${edge.to}): ${edge.weight} - would form cycle.`
      });
    }

    // Check if MST is complete
    if (mst.length === n - 1) {
      steps.push({
        type: 'complete',
        edges: [...edges],
        sortedEdges: [...sortedEdges],
        currentMST: [...mst],
        totalCost,
        uf: ufCopy,
        currentEdge: null,
        message: `MST complete! Total cost: ${totalCost}`
      });
      break;
    }
  }

  return steps;
};

// Generate random graph
const generateRandomGraph = (numNodes) => {
  const matrix = Array(numNodes).fill().map(() => Array(numNodes).fill(0));

  // Create a connected graph
  for (let i = 0; i < numNodes - 1; i++) {
    const weight = Math.floor(Math.random() * 20) + 1;
    matrix[i][i + 1] = weight;
    matrix[i + 1][i] = weight;
  }

  // Add some random edges
  for (let i = 0; i < numNodes; i++) {
    for (let j = i + 2; j < numNodes; j++) {
      if (Math.random() < 0.3) { // 30% chance
        const weight = Math.floor(Math.random() * 20) + 1;
        matrix[i][j] = weight;
        matrix[j][i] = weight;
      }
    }
  }

  return matrix;
};

// Default example graph
const DEFAULT_GRAPH = [
  [0, 2, 0, 6, 0],
  [2, 0, 3, 8, 5],
  [0, 3, 0, 0, 7],
  [6, 8, 0, 0, 9],
  [0, 5, 7, 9, 0]
];

const KruskalVisualizer = () => {
  const [adjacencyMatrix, setAdjacencyMatrix] = useState(DEFAULT_GRAPH);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState("Run Kruskal's algorithm to see the visualization");
  const [numNodes, setNumNodes] = useState(5);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Node positions for visualization (supporting up to 7 nodes)
  const getNodePositions = (numNodes) => {
    const positions = [
      { x: 200, y: 150 }, // Node 0
      { x: 400, y: 100 }, // Node 1
      { x: 500, y: 250 }, // Node 2
      { x: 300, y: 350 }, // Node 3
      { x: 100, y: 300 }, // Node 4
      { x: 350, y: 50 },  // Node 5
      { x: 150, y: 50 }   // Node 6
    ];
    return positions.slice(0, numNodes);
  };

  // Draw the graph
  const drawGraph = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const n = adjacencyMatrix.length;
    const nodePositions = getNodePositions(n);
    const currentState = steps[currentStep] || {
      currentMST: [],
      currentEdge: null,
      uf: new UnionFind(n)
    };

    // Draw edges
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (adjacencyMatrix[i][j] > 0) {
          const start = nodePositions[i];
          const end = nodePositions[j];

          ctx.beginPath();
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(end.x, end.y);

          // Check edge status
          const isInMST = currentState.currentMST.some(
            edge => (edge.from === i && edge.to === j) || (edge.from === j && edge.to === i)
          );
          const isCurrentEdge = currentState.currentEdge &&
            ((currentState.currentEdge.from === i && currentState.currentEdge.to === j) ||
             (currentState.currentEdge.from === j && currentState.currentEdge.to === i));

          if (isInMST) {
            ctx.strokeStyle = '#4ade80'; // Green for MST edges
            ctx.lineWidth = 4;
          } else if (isCurrentEdge) {
            if (currentState.willFormCycle) {
              ctx.strokeStyle = '#ef4444'; // Red for edges that would form cycle
            } else {
              ctx.strokeStyle = '#ffd93d'; // Yellow for edges being considered
            }
            ctx.lineWidth = 3;
          } else {
            ctx.strokeStyle = '#94a3b8'; // Gray for unused edges
            ctx.lineWidth = 2;
          }

          ctx.stroke();

          // Draw edge weight
          const midX = (start.x + end.x) / 2;
          const midY = (start.y + end.y) / 2;
          ctx.fillStyle = '#1e293b';
          ctx.font = '14px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(adjacencyMatrix[i][j], midX, midY - 5);
        }
      }
    }

    // Draw nodes with set coloring
    const sets = currentState.uf ? currentState.uf.getSets() : {};
    const setColors = ['#66ccff', '#ff6b6b', '#ffd93d', '#4ade80', '#a855f7', '#f97316', '#06b6d4'];

    for (let i = 0; i < n; i++) {
      const node = nodePositions[i];
      ctx.beginPath();
      ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI);

      // Color based on union-find set
      let nodeColor = '#94a3b8'; // Default gray
      for (const [root, members] of Object.entries(sets)) {
        if (members.includes(i)) {
          nodeColor = setColors[parseInt(root) % setColors.length];
          break;
        }
      }

      ctx.fillStyle = nodeColor;
      ctx.fill();
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw node number
      ctx.fillStyle = '#ffffff';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(i, node.x, node.y);
    }
  }, [adjacencyMatrix, steps, currentStep]);

  useEffect(() => {
    drawGraph();
  }, [drawGraph]);

  // Handle changes in number of nodes
  useEffect(() => {
    const newMatrix = Array(numNodes).fill().map(() => Array(numNodes).fill(0));

    // Copy existing values where possible
    const minSize = Math.min(numNodes, adjacencyMatrix.length);
    for (let i = 0; i < minSize; i++) {
      for (let j = 0; j < minSize; j++) {
        newMatrix[i][j] = adjacencyMatrix[i][j];
      }
    }

    setAdjacencyMatrix(newMatrix);

    // Clear any existing algorithm steps
    setSteps([]);
    setCurrentStep(0);
    setIsComplete(false);
    setMessage("Graph size changed. Run Kruskal's algorithm to see the visualization");
  }, [numNodes]);

  const runAlgorithm = () => {
    const algorithmSteps = kruskalsAlgorithm(adjacencyMatrix);
    setSteps(algorithmSteps);
    setCurrentStep(0);
    setIsComplete(false);
    setMessage(algorithmSteps[0].message);
  };

  const play = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
      return;
    }

    setIsPlaying(true);
    animationRef.current = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          setIsComplete(true);
          clearInterval(animationRef.current);
          return prev;
        }
        setMessage(steps[prev + 1].message);
        return prev + 1;
      });
    }, 2000);
  };

  const stepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setMessage(steps[currentStep + 1].message);
    }
  };

  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setMessage(steps[currentStep - 1].message);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setIsComplete(false);
    setMessage("Run Kruskal's algorithm to see the visualization");
    if (animationRef.current) {
      clearInterval(animationRef.current);
    }
  };

  const generateNewGraph = () => {
    const newGraph = generateRandomGraph(numNodes);
    setAdjacencyMatrix(newGraph);
    setSteps([]);
    setCurrentStep(0);
    setIsComplete(false);
    setMessage("New graph generated. Run Kruskal's algorithm to see the visualization");
  };

  const updateMatrixCell = (i, j, value) => {
    const newMatrix = adjacencyMatrix.map(row => [...row]);
    newMatrix[i][j] = parseInt(value) || 0;
    newMatrix[j][i] = parseInt(value) || 0; // Keep it symmetric
    setAdjacencyMatrix(newMatrix);
  };

  const currentState = steps[currentStep] || { currentMST: [], totalCost: 0, sortedEdges: [] };

  return (
    <div className="kruskal-visualizer">
      <div className="visualizer-header">
        <h3>Kruskal's Algorithm Visualization</h3>
        <p>Watch how Kruskal's algorithm builds a Minimum Spanning Tree by sorting edges and using Union-Find.</p>
      </div>

      <div className="controls-section">
        <div className="control-group">
          <label>Number of Nodes:</label>
          <select
            value={numNodes}
            onChange={(e) => setNumNodes(parseInt(e.target.value))}
            disabled={isPlaying}
          >
            {[3, 4, 5, 6, 7].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div className="control-buttons">
          <button
            className="btn btn-secondary"
            onClick={generateNewGraph}
            disabled={isPlaying}
          >
            Generate Graph
          </button>
          <button
            className="btn btn-primary"
            onClick={runAlgorithm}
            disabled={isPlaying}
          >
            Run Algorithm
          </button>
          <button
            className="btn btn-secondary"
            onClick={play}
            disabled={steps.length === 0}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            className="btn btn-secondary"
            onClick={stepBackward}
            disabled={currentStep === 0 || isPlaying}
          >
            Step Back
          </button>
          <button
            className="btn btn-secondary"
            onClick={stepForward}
            disabled={currentStep >= steps.length - 1 || isPlaying}
          >
            Step Forward
          </button>
          <button
            className="btn btn-secondary"
            onClick={reset}
            disabled={isPlaying}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="visualization-section">
        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            className="graph-canvas"
          />
        </div>

        <div className="info-panel">
          <div className="current-cost">
            <h4>Current MST Cost: {currentState.totalCost}</h4>
          </div>

          <div className="sorted-edges">
            <h4>Sorted Edges ({currentState.sortedEdges.length})</h4>
            <div className="edges-list">
              {currentState.sortedEdges.map((edge, index) => (
                <div key={index} className={`edge-item ${currentState.currentEdge === edge ? 'current' : ''}`}>
                  ({edge.from} → {edge.to}): {edge.weight}
                </div>
              ))}
            </div>
          </div>

          <div className="adjacency-matrix">
            <h4>Adjacency Matrix</h4>
            <div className="matrix-container">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    {Array.from({ length: numNodes }, (_, i) => (
                      <th key={i}>{i}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {adjacencyMatrix.map((row, i) => (
                    <tr key={i}>
                      <th>{i}</th>
                      {row.map((cell, j) => (
                        <td key={j}>
                          <input
                            type="number"
                            value={cell}
                            onChange={(e) => updateMatrixCell(i, j, e.target.value)}
                            min="0"
                            disabled={isPlaying}
                            className="matrix-input"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mst-edges">
            <h4>MST Edges</h4>
            <div className="edges-list">
              {currentState.currentMST.map((edge, index) => (
                <div key={index} className="edge-item">
                  ({edge.from} → {edge.to}): {edge.weight}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="message-bar">
        <p>{message}</p>
      </div>

      <div className="algorithm-explanation">
        <h4>About Kruskal's Algorithm</h4>

        <div className="explanation-section">
          <h5>🔍 What is Kruskal's Algorithm?</h5>
          <p>
            Kruskal's algorithm is a <strong>greedy algorithm</strong> that finds a <strong>Minimum Spanning Tree (MST)</strong>
            for a weighted undirected graph. It builds the MST by adding edges in order of increasing weight,
            ensuring no cycles are formed using the Union-Find data structure.
          </p>
        </div>

        <div className="explanation-section">
          <h5>⚡ How It Works</h5>
          <ol>
            <li><strong>Sort all edges</strong> - Sort edges by weight in ascending order</li>
            <li><strong>Initialize Union-Find</strong> - Create disjoint sets for each vertex</li>
            <li><strong>Process edges</strong> - Consider each edge in sorted order</li>
            <li><strong>Add if no cycle</strong> - Add edge to MST if it connects different components</li>
            <li><strong>Stop when complete</strong> - Continue until all vertices are connected</li>
          </ol>
        </div>

        <div className="explanation-section">
          <h5>🎯 Key Properties</h5>
          <div className="properties-grid">
            <div className="property-item">
              <strong>Greedy Choice:</strong> Always selects the smallest edge that doesn't form a cycle
            </div>
            <div className="property-item">
              <strong>Union-Find:</strong> Uses disjoint set data structure for cycle detection
            </div>
            <div className="property-item">
              <strong>No Cycles:</strong> Ensures the final tree has no cycles
            </div>
            <div className="property-item">
              <strong>Connected Graph:</strong> Works only on connected graphs
            </div>
          </div>
        </div>

        <div className="explanation-section">
          <h5>⏱️ Time Complexity</h5>
          <div className="complexity-info">
            <div className="complexity-item">
              <span className="complexity-label">Overall:</span>
              <span className="complexity-value">O(E log E)</span>
            </div>
            <div className="complexity-item">
              <span className="complexity-label">Sorting:</span>
              <span className="complexity-value">O(E log E)</span>
            </div>
            <div className="complexity-item">
              <span className="complexity-label">Union-Find:</span>
              <span className="complexity-value">O(E α(V))</span>
            </div>
          </div>
        </div>

        <div className="explanation-section">
          <h5>🚀 Applications</h5>
          <ul className="applications-list">
            <li><strong>Network Design:</strong> Designing minimum cost networks (telephone, electrical, etc.)</li>
            <li><strong>Clustering:</strong> Single-linkage clustering in data mining</li>
            <li><strong>Approximation Algorithms:</strong> Used in solving NP-hard problems</li>
            <li><strong>Road Networks:</strong> Finding minimum cost to connect cities</li>
            <li><strong>Biological Networks:</strong> Analyzing protein interaction networks</li>
          </ul>
        </div>

        <div className="explanation-section">
          <h5>📊 Visual Guide</h5>
          <div className="visual-guide">
            <div className="guide-item">
              <div className="color-box green"></div>
              <span>MST Edges (included in tree)</span>
            </div>
            <div className="guide-item">
              <div className="color-box yellow"></div>
              <span>Edges being considered (no cycle)</span>
            </div>
            <div className="guide-item">
              <div className="color-box red"></div>
              <span>Edges that would form cycle</span>
            </div>
            <div className="guide-item">
              <div className="color-box blue"></div>
              <span>Nodes in same component (same color)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KruskalVisualizer;
