import React, { useState, useRef, useEffect, useCallback } from "react";
import "../styles/global-theme.css";

// Prim's Algorithm implementation
const primsAlgorithm = (adjacencyMatrix, startNode) => {
  const n = adjacencyMatrix.length;
  const visited = new Array(n).fill(false);
  const minEdge = new Array(n).fill(Infinity);
  const parent = new Array(n).fill(-1);
  const steps = [];

  minEdge[startNode] = 0;
  parent[startNode] = -1;

  steps.push({
    type: 'init',
    visited: [...visited],
    minEdge: [...minEdge],
    parent: [...parent],
    currentMST: [],
    totalCost: 0,
    message: `Starting Prim's algorithm from node ${startNode}`
  });

  for (let i = 0; i < n - 1; i++) {
    // Find the minimum edge
    let min = Infinity;
    let u = -1;

    for (let j = 0; j < n; j++) {
      if (!visited[j] && minEdge[j] < min) {
        min = minEdge[j];
        u = j;
      }
    }

    if (u === -1) break;

    visited[u] = true;

    // Update minEdge for adjacent vertices
    for (let v = 0; v < n; v++) {
      if (!visited[v] && adjacencyMatrix[u][v] !== 0 && adjacencyMatrix[u][v] < minEdge[v]) {
        minEdge[v] = adjacencyMatrix[u][v];
        parent[v] = u;
      }
    }

    // Calculate current MST edges and cost
    const currentMST = [];
    let totalCost = 0;

    for (let j = 0; j < n; j++) {
      if (parent[j] !== -1) {
        currentMST.push({ from: parent[j], to: j, weight: adjacencyMatrix[parent[j]][j] });
        totalCost += adjacencyMatrix[parent[j]][j];
      }
    }

    steps.push({
      type: 'step',
      visited: [...visited],
      minEdge: [...minEdge],
      parent: [...parent],
      currentMST: [...currentMST],
      totalCost,
      selectedNode: u,
      message: `Selected node ${u} with edge weight ${min}. Current MST cost: ${totalCost}`
    });
  }

  steps.push({
    type: 'complete',
    visited: [...visited],
    minEdge: [...minEdge],
    parent: [...parent],
    currentMST: steps[steps.length - 1].currentMST,
    totalCost: steps[steps.length - 1].totalCost,
    message: `Prim's algorithm complete. Total MST cost: ${steps[steps.length - 1].totalCost}`
  });

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

const PrimVisualizer = () => {
  const [adjacencyMatrix, setAdjacencyMatrix] = useState(DEFAULT_GRAPH);
  const [startNode, setStartNode] = useState(0);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState("Select a start node and run Prim's algorithm");
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
      visited: new Array(n).fill(false),
      currentMST: [],
      selectedNode: -1
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

          // Check if this edge is in the current MST
          const isInMST = currentState.currentMST.some(
            edge => (edge.from === i && edge.to === j) || (edge.from === j && edge.to === i)
          );

          if (isInMST) {
            ctx.strokeStyle = '#4ade80'; // Green for MST edges
            ctx.lineWidth = 4;
          } else if (currentState.selectedNode !== -1 &&
                     ((i === currentState.selectedNode && !currentState.visited[j]) ||
                      (j === currentState.selectedNode && !currentState.visited[i]))) {
            ctx.strokeStyle = '#ffd93d'; // Yellow for candidate edges
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

    // Draw nodes
    for (let i = 0; i < n; i++) {
      const node = nodePositions[i];
      ctx.beginPath();
      ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI);

      if (currentState.visited[i]) {
        ctx.fillStyle = '#4ade80'; // Green for visited/MST nodes
      } else if (i === currentState.selectedNode) {
        ctx.fillStyle = '#ffd93d'; // Yellow for currently selected node
      } else if (i === startNode && currentStep === 0) {
        ctx.fillStyle = '#ff6b6b'; // Red for start node
      } else {
        ctx.fillStyle = '#66ccff'; // Blue for unvisited nodes
      }

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
  }, [adjacencyMatrix, steps, currentStep, startNode]);

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

    // Reset start node if it's out of bounds
    if (startNode >= numNodes) {
      setStartNode(0);
    }

    // Clear any existing algorithm steps
    setSteps([]);
    setCurrentStep(0);
    setIsComplete(false);
    setMessage("Graph size changed. Select a start node and run Prim's algorithm");
  }, [numNodes]);

  const runAlgorithm = () => {
    const algorithmSteps = primsAlgorithm(adjacencyMatrix, startNode);
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
    }, 1500);
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
    setMessage("Select a start node and run Prim's algorithm");
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
    setMessage("New graph generated. Select a start node and run Prim's algorithm");
  };

  const updateMatrixCell = (i, j, value) => {
    const newMatrix = adjacencyMatrix.map(row => [...row]);
    newMatrix[i][j] = parseInt(value) || 0;
    newMatrix[j][i] = parseInt(value) || 0; // Keep it symmetric
    setAdjacencyMatrix(newMatrix);
  };

  const currentState = steps[currentStep] || { currentMST: [], totalCost: 0 };

  return (
    <div className="prim-visualizer">
      <div className="visualizer-header">
        <h3>Prim's Algorithm Visualization</h3>
        <p>Watch how Prim's algorithm builds a Minimum Spanning Tree step by step.</p>
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

        <div className="control-group">
          <label>Start Node:</label>
          <select
            value={startNode}
            onChange={(e) => setStartNode(parseInt(e.target.value))}
            disabled={isPlaying}
          >
            {Array.from({ length: numNodes }, (_, i) => (
              <option key={i} value={i}>{i}</option>
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
        <h4>About Prim's Algorithm</h4>

        <div className="explanation-section">
          <h5>What is Prim's Algorithm?</h5>
          <p>
            Prim's algorithm is a <strong>greedy algorithm</strong> that finds a <strong>Minimum Spanning Tree (MST)</strong>
            for a weighted undirected graph. This means it connects all vertices with the minimum total edge weight,
            ensuring no cycles are formed.
          </p>
        </div>

        <div className="explanation-section">
          <h5>How It Works</h5>
          <ol>
            <li><strong>Start with any vertex</strong> - Choose an arbitrary starting node</li>
            <li><strong>Grow the tree</strong> - Repeatedly add the smallest edge that connects a vertex in the tree to a vertex outside the tree</li>
            <li><strong>Continue until all vertices are included</strong> - The process stops when all vertices are part of the MST</li>
          </ol>
        </div>

        <div className="explanation-section">
          <h5>Key Properties</h5>
          <div className="properties-grid">
            <div className="property-item">
              <strong>Greedy Choice:</strong> Always selects the minimum weight edge connecting tree to non-tree vertices
            </div>
            <div className="property-item">
              <strong>Optimal Substructure:</strong> Subtrees of MST are also MSTs
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
          <h5>Time Complexity</h5>
          <div className="complexity-info">
            <div className="complexity-item">
              <span className="complexity-label">Adjacency Matrix:</span>
              <span className="complexity-value">O(V²)</span>
            </div>
            <div className="complexity-item">
              <span className="complexity-label">Binary Heap:</span>
              <span className="complexity-value">O((V+E)log V)</span>
            </div>
            <div className="complexity-item">
              <span className="complexity-label">Fibonacci Heap:</span>
              <span className="complexity-value">O(E + V log V)</span>
            </div>
          </div>
        </div>

        <div className="explanation-section">
          <h5>Applications</h5>
          <ul className="applications-list">
            <li><strong>Network Design:</strong> Designing minimum cost networks (telephone, electrical, etc.)</li>
            <li><strong>Clustering:</strong> Single-linkage clustering in data mining</li>
            <li><strong>Approximation Algorithms:</strong> Used in solving NP-hard problems</li>
            <li><strong>Road Networks:</strong> Finding minimum cost to connect cities</li>
            <li><strong>Biological Networks:</strong> Analyzing protein interaction networks</li>
          </ul>
        </div>

        <div className="explanation-section">
          <h5>Visual Guide</h5>
          <div className="visual-guide">
            <div className="guide-item">
              <div className="color-box green"></div>
              <span>MST Edges (included in tree)</span>
            </div>
            <div className="guide-item">
              <div className="color-box yellow"></div>
              <span>Candidate Edges (being considered)</span>
            </div>
            <div className="guide-item">
              <div className="color-box blue"></div>
              <span>Unvisited Nodes</span>
            </div>
            <div className="guide-item">
              <div className="color-box red"></div>
              <span>Start Node</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimVisualizer;
