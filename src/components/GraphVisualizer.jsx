import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import "../styles/global-theme.css";

// Priority Queue implementation for graph algorithms
class SimplePriorityQueue {
  constructor() {
    this.elements = [];
  }
  
  enqueue(element, priority) {
    this.elements.push({ element, priority });
    this.elements.sort((a, b) => a.priority - b.priority);
  }
  
  dequeue() {
    return this.elements.shift().element;
  }
  
  isEmpty() {
    return this.elements.length === 0;
  }
}

// Algorithm implementations
const GraphAlgorithms = {
  // Dijkstra's algorithm implementation
  dijkstra: ({ nodes, edges, startNode, endNode, setVisualState, setMessage, animateVisualization }) => {
    if (startNode === null || endNode === null) {
      alert("Please select a start and end node first.");
      return;
    }

    setVisualState({ visited: new Set(), path: [] }); // Reset previous visualization
    setMessage(`Running Dijkstra's from ${startNode} to ${endNode}...`);

    const numNodes = nodes.length;
    const distances = Array(numNodes).fill(Infinity);
    const prev = Array(numNodes).fill(null);
    const pq = new SimplePriorityQueue();
    const visualizationSteps = [];

    distances[startNode] = 0;
    pq.enqueue(startNode, 0);

    while (!pq.isEmpty()) {
      const u = pq.dequeue();
      visualizationSteps.push({ type: "visit", node: u });
      if (u === endNode) break;

      edges.forEach((edge) => {
        let v = -1;
        if (edge.start === u) v = edge.end;
        if (edge.end === u) v = edge.start;
        if (v !== -1) {
          const newDist = distances[u] + edge.weight;
          if (newDist < distances[v]) {
            distances[v] = newDist;
            prev[v] = u;
            pq.enqueue(v, newDist);
          }
        }
      });
    }

    const path = [];
    let current = endNode;
    while (current !== null) {
      const p = prev[current];
      if (p !== null) path.unshift({ start: p, end: current });
      current = p;
    }
    visualizationSteps.push({ type: "path", path });
    return { visualizationSteps, distances, path };
  },

  // BFS algorithm implementation
  bfs: ({ nodes, edges, startNode, endNode, setVisualState, setMessage, getNeighbors, animateVisualization }) => {
    if (startNode === null) {
      alert("Please select a start node first.");
      return;
    }

    setVisualState({ visited: new Set(), path: [] });
    setMessage(endNode !== null ? `Running BFS from ${startNode} to ${endNode}...` : `Running BFS traversal from ${startNode}...`);

    const queue = [startNode];
    const visited = new Set([startNode]);
    const prev = Array(nodes.length).fill(null);
    const steps = [];

    while (queue.length > 0) {
      const u = queue.shift();
      steps.push({ type: "visit", node: u });
      if (endNode !== null && u === endNode) break;
      const neighbors = getNeighbors(u);
      neighbors.forEach(({ node: v }) => {
        if (!visited.has(v)) {
          visited.add(v);
          prev[v] = u;
          queue.push(v);
        }
      });
    }

    let path = [];
    if (endNode !== null) {
      const pathEdges = [];
      let current = endNode;
      while (current !== null && current !== startNode) {
        const p = prev[current];
        if (p === null) break;
        pathEdges.unshift({ start: p, end: current });
        current = p;
      }
      path = pathEdges;
      steps.push({ type: "path", path });
    }
    
    return { steps, path };
  },

  // DFS algorithm implementation
  dfs: ({ nodes, edges, startNode, endNode, setVisualState, setMessage, getNeighbors, animateVisualization }) => {
    if (startNode === null) {
      alert("Please select a start node first.");
      return;
    }

    setVisualState({ visited: new Set(), path: [] });
    setMessage(endNode !== null ? `Running DFS from ${startNode} to ${endNode}...` : `Running DFS traversal from ${startNode}...`);

    const steps = [];
    const visited = new Set();
    const prev = Array(nodes.length).fill(null);

    let found = false;
    const dfsHelper = (u) => {
      if (found) return;
      visited.add(u);
      steps.push({ type: "visit", node: u });
      if (endNode !== null && u === endNode) {
        found = true;
        return;
      }
      const neighbors = getNeighbors(u);
      for (const { node: v } of neighbors) {
        if (!visited.has(v)) {
          prev[v] = u;
          dfsHelper(v);
          if (found) return;
        }
      }
    };

    dfsHelper(startNode);

    let path = [];
    if (endNode !== null && visited.has(endNode)) {
      const pathEdges = [];
      let current = endNode;
      while (current !== null && current !== startNode) {
        const p = prev[current];
        if (p === null) break;
        pathEdges.unshift({ start: p, end: current });
        current = p;
      }
      path = pathEdges;
      steps.push({ type: "path", path });
    }
    
    return { steps, path };
  },

  // Hierholzer's algorithm for Eulerian path/circuit
  hierholzer: ({ nodes, edges, startNode, setVisualState, setMessage, getNeighbors }) => {
    const adj = new Map();
    nodes.forEach((_, i) => adj.set(i, []));
    edges.forEach(edge => {
      adj.get(edge.start).push(edge.end);
      adj.get(edge.end).push(edge.start);
    });

    setVisualState({ visited: new Set(), path: [] });

    // Check for Eulerian path/circuit possibility
    let oddDegreeNodes = [];
    adj.forEach((neighbors, node) => {
      if (neighbors.length % 2 !== 0) {
        oddDegreeNodes.push(node);
      }
    });

    let actualStartNode;

    if (oddDegreeNodes.length > 2) {
      setMessage("Graph has more than two nodes with odd degree. No Eulerian path or circuit exists.");
      return { steps: [], path: [] };
    } else if (oddDegreeNodes.length === 2) {
      // Eulerian Path exists
      actualStartNode = oddDegreeNodes.includes(startNode) ? startNode : oddDegreeNodes[0];
      setMessage(`Eulerian Path detected. Starting from odd-degree node ${actualStartNode}...`);
    } else {
      // Eulerian Circuit exists (or it's an empty/single-node graph)
      actualStartNode = startNode !== null ? startNode : (nodes.length > 0 ? nodes[0].id ?? 0 : 0);
      setMessage(`Eulerian Circuit detected. Starting from node ${actualStartNode}...`);
    }

    const visualizationSteps = [];
    const path = [];
    const stack = [actualStartNode];
    const edgeCount = new Map();

    edges.forEach(edge => {
        const key1 = `${edge.start}-${edge.end}`;
        const key2 = `${edge.end}-${edge.start}`;
        edgeCount.set(key1, (edgeCount.get(key1) || 0) + 1);
        edgeCount.set(key2, (edgeCount.get(key2) || 0) + 1);
    });

    while (stack.length > 0) {
      let u = stack[stack.length - 1];
      visualizationSteps.push({ type: "visit", node: u });

      if (adj.get(u) && adj.get(u).length > 0) {
        let v = adj.get(u).pop();
        // Remove the corresponding edge from v's adjacency list
        const vNeighbors = adj.get(v);
        const index = vNeighbors.indexOf(u);
        if (index > -1) vNeighbors.splice(index, 1);

        stack.push(v);
      } else {
        path.unshift(stack.pop());
      }
    }

    return { steps: visualizationSteps, path };
  }
};

// Visualization helper functions
const VisualizationHelpers = {
  // Draw the graph on canvas
  drawGraph: (ctx, { nodes, edges, visualState, dijkstraStart, dijkstraEnd }) => {
    if (!ctx) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw edges
    edges.forEach((edge) => {
      const start = nodes[edge.start];
      const end = nodes[edge.end];
      if (start && end) {
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        const isPathEdge = visualState.path.some(
          (p) =>
            (p.start === edge.start && p.end === edge.end) ||
            (p.start === edge.end && p.end === edge.start)
        );
        ctx.strokeStyle = isPathEdge ? "#4ade80" : "#66ccff"; // Green for path
        ctx.lineWidth = isPathEdge ? 4 : 2;

        ctx.stroke();
        // Draw edge weight
        const midX = (start.x + end.x) / 2;
        const midY = (start.y + end.y) / 2;
        ctx.fillStyle = "#e0e6ed";
        ctx.font = "14px Arial";
        ctx.textAlign = "center";
        ctx.fillText(edge.weight, midX, midY - 10);
      }
    });

    // Draw nodes
    nodes.forEach((node, index) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);

      if (visualState.visited.has(index)) {
        ctx.fillStyle = "#ffd93d"; // Yellow for visited
      } else if (
        index === parseInt(dijkstraStart) ||
        index === parseInt(dijkstraEnd)
      ) {
        ctx.fillStyle = "#ff6b6b"; // Red for start/end points
      } else {
        ctx.fillStyle = "#66ccff"; // Default blue
      }
      ctx.fill();

      // This now draws the node number in a visible white color
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(index, node.x, node.y);
    });
  },

  // Animate the Eulerian path visualization
  animateEulerianVisualization: ({ steps, path, startNode, setVisualState, setIsVisualizing, setMessage, setResult }) => {
    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex >= steps.length) {
        clearInterval(interval);
        setIsVisualizing(false);
        setMessage("Eulerian path visualization complete!");
        
        // Set the final result for Eulerian path
        setResult({
          path: path.map(edge => edge.start).concat(path.length > 0 ? [path[path.length - 1].end] : []).join(" → "),
          weight: "N/A (Eulerian Path)",
        });

        return;
      }
      const step = steps[stepIndex];
      if (step.type === "visit") {
        setVisualState((prev) => ({
          ...prev,
          visited: new Set(prev.visited).add(step.node),
        }));
      } else if (step.type === "path") {
        setVisualState((prev) => ({ ...prev, path: step.path }));
      }
      stepIndex++;
    }, 300); // Animation speed
  },

  // Animate the visualization steps for pathfinding algorithms
  animateVisualization: ({ steps, distances, path, dijkstraStart, dijkstraEnd, setVisualState, setIsVisualizing, setMessage, setResult }) => {
    let stepIndex = 0;
    setIsVisualizing(true);
    const interval = setInterval(() => {
      if (stepIndex >= steps.length) {
        clearInterval(interval);
        setIsVisualizing(false);
        setMessage("Visualization complete!");
        
        const totalWeight = distances && dijkstraEnd !== null ? distances[dijkstraEnd] : (path ? path.length : 0);
        
        if (dijkstraEnd !== null && (totalWeight === Infinity || path.length === 0 && dijkstraStart !== dijkstraEnd)) {
          setResult({ path: "No path found", weight: "N/A" });
        } else if (dijkstraEnd !== null) {
          const nodePath = [dijkstraStart, ...path.map(edge => edge.end)];
          setResult({ path: nodePath.join(" → "), weight: totalWeight });
        }

        return;
      }
      
      const step = steps[stepIndex];
      if (step.type === "visit") {
        setVisualState((prev) => ({
          ...prev,
          visited: new Set(prev.visited).add(step.node),
        }));
      } else if (step.type === "path") {
        setVisualState((prev) => ({ ...prev, path: step.path }));
      }
      
      stepIndex++;
    }, 300); // Animation speed
  }
};

// Default example graph data
const DEFAULT_EXAMPLE = {
  nodes: [
    { x: 150, y: 120, id: 0 },
    { x: 350, y: 80, id: 1 },
    { x: 550, y: 120, id: 2 },
    { x: 200, y: 320, id: 3 },
    { x: 400, y: 300, id: 4 },
    { x: 600, y: 320, id: 5 }
  ],
  edges: [
    { start: 0, end: 1, weight: 2 },
    { start: 1, end: 2, weight: 3 },
    { start: 0, end: 3, weight: 1 },
    { start: 3, end: 4, weight: 4 },
    { start: 4, end: 5, weight: 2 },
    { start: 1, end: 4, weight: 2 },
    { start: 2, end: 5, weight: 1 }
  ]
};

const GraphVisualizer = ({ defaultAlgorithm = null, autoLoadExample = false, canvasWidth = 800, canvasHeight = 500 }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [isAddingNode, setIsAddingNode] = useState(false);
  const [isAddingEdge, setIsAddingEdge] = useState(false);
  const [edgeStartNode, setEdgeStartNode] = useState(null);
  const canvasRef = useRef(null);
  const [dijkstraStart, setDijkstraStart] = useState(null);
  const [dijkstraEnd, setDijkstraEnd] = useState(null);
  const [algorithm, setAlgorithm] = useState(defaultAlgorithm || "Dijkstra");
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [visualState, setVisualState] = useState({
    visited: new Set(),
    path: [],
  });
  const [message, setMessage] = useState(
    "Build your graph or select an algorithm."
  );
  const [result, setResult] = useState(null);

  // Memoize the getNeighbors function to prevent unnecessary re-renders
  const getNeighbors = useCallback((nodeIndex) => {
    const neighbors = [];
    edges.forEach((edge) => {
      if (edge.start === nodeIndex) neighbors.push({ node: edge.end, weight: edge.weight });
      else if (edge.end === nodeIndex) neighbors.push({ node: edge.start, weight: edge.weight });
    });
    return neighbors;
  }, [edges]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    VisualizationHelpers.drawGraph(ctx, { nodes, edges, visualState, dijkstraStart, dijkstraEnd });
  }, [nodes, edges, visualState, dijkstraStart, dijkstraEnd]);

  useEffect(() => {
    if (defaultAlgorithm) {
      setAlgorithm(defaultAlgorithm);
    }
  }, [defaultAlgorithm]);

  useEffect(() => {
    if (autoLoadExample) {
      loadDefaultExample();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoLoadExample]);

  const handleCanvasClick = useCallback((event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (isAddingNode) {
      setNodes([...nodes, { x, y }]);
      setIsAddingNode(false);
    } else if (isAddingEdge) {
      const clickedNodeIndex = nodes.findIndex(
        (node) => Math.sqrt((node.x - x) ** 2 + (node.y - y) ** 2) < 20
      );

      if (clickedNodeIndex !== -1) {
        if (edgeStartNode === null) {
          setEdgeStartNode(clickedNodeIndex);
          setMessage(
            `Selected node ${clickedNodeIndex}. Click another node to form an edge.`
          );
        } else {
          const weight = parseInt(
            prompt("Enter edge weight (positive number):", "1"),
            10
          );
          if (!isNaN(weight) && weight > 0) {
            setEdges([
              ...edges,
              { start: edgeStartNode, end: clickedNodeIndex, weight },
            ]);
            setEdgeStartNode(null);
            setIsAddingEdge(false); // Or manage mode differently
            setMessage("Edge added successfully!");
          } else {
            alert("Invalid weight. Please enter a positive number.");
            setEdgeStartNode(null); // Reset on invalid input
          }
        }
      }
    }
  }, [isAddingNode, isAddingEdge, edgeStartNode, nodes, edges]);

  const runDijkstra = useCallback(() => {
    const { visualizationSteps, distances, path } = GraphAlgorithms.dijkstra({
      nodes,
      edges,
      startNode: dijkstraStart,
      endNode: dijkstraEnd,
      setVisualState,
      setMessage,
      animateVisualization: (steps, distances, path) => 
        VisualizationHelpers.animateVisualization({
          steps,
          distances,
          path,
          dijkstraStart,
          dijkstraEnd,
          setVisualState,
          setIsVisualizing,
          setMessage,
          setResult
        })
    });
    
    VisualizationHelpers.animateVisualization({
      steps: visualizationSteps,
      distances,
      path,
      dijkstraStart,
      dijkstraEnd,
      setVisualState,
      setIsVisualizing,
      setMessage,
      setResult
    });
  }, [dijkstraStart, dijkstraEnd, nodes, edges]);

  const runBFS = useCallback(() => {
    const { steps, path } = GraphAlgorithms.bfs({
      nodes,
      edges,
      startNode: dijkstraStart,
      endNode: dijkstraEnd,
      setVisualState,
      setMessage,
      getNeighbors,
      animateVisualization: (steps, distances, path) => 
        VisualizationHelpers.animateVisualization({
          steps,
          distances,
          path,
          dijkstraStart,
          dijkstraEnd,
          setVisualState,
          setIsVisualizing,
          setMessage,
          setResult
        })
    });
    
    VisualizationHelpers.animateVisualization({
      steps,
      distances: [],
      path,
      dijkstraStart,
      dijkstraEnd,
      setVisualState,
      setIsVisualizing,
      setMessage,
      setResult
    });
  }, [dijkstraStart, dijkstraEnd, nodes, getNeighbors]);

  const runDFS = useCallback(() => {
    const { steps, path } = GraphAlgorithms.dfs({
      nodes,
      edges,
      startNode: dijkstraStart,
      endNode: dijkstraEnd,
      setVisualState,
      setMessage,
      getNeighbors,
      animateVisualization: (steps, distances, path) => 
        VisualizationHelpers.animateVisualization({
          steps,
          distances,
          path,
          dijkstraStart,
          dijkstraEnd,
          setVisualState,
          setIsVisualizing,
          setMessage,
          setResult
        })
    });
    
    VisualizationHelpers.animateVisualization({
      steps,
      distances: [],
      path,
      dijkstraStart,
      dijkstraEnd,
      setVisualState,
      setIsVisualizing,
      setMessage,
      setResult
    });
  }, [dijkstraStart, dijkstraEnd, nodes, getNeighbors]);
  
  const runEulerian = useCallback(() => {
    const { steps, path: eulerPathNodes } = GraphAlgorithms.hierholzer({
      nodes,
      edges,
      startNode: dijkstraStart,
      setVisualState,
      setMessage,
      getNeighbors,
    });

    if (!steps || steps.length === 0) return;

    // Convert node path to edge path for visualization
    const eulerPathEdges = [];
    for (let i = 0; i < eulerPathNodes.length - 1; i++) {
      eulerPathEdges.push({ start: eulerPathNodes[i], end: eulerPathNodes[i+1] });
    }
    steps.push({ type: "path", path: eulerPathEdges });

    // Use a dedicated animation helper for Eulerian paths
    VisualizationHelpers.animateEulerianVisualization({
      steps,
      path: eulerPathEdges,
      startNode: dijkstraStart,
      setVisualState,
      setIsVisualizing,
      setMessage,
      setResult,
    });
  }, [dijkstraStart, nodes, edges, getNeighbors]);

  const runSelectedAlgorithm = useCallback(() => {
    if (algorithm === "Dijkstra") return runDijkstra();
    if (algorithm === "BFS") return runBFS();
    if (algorithm === "DFS") return runDFS();
    if (algorithm === "Eulerian") return runEulerian();
  }, [algorithm, runDijkstra, runBFS, runDFS, runEulerian]);

  const handleClear = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setDijkstraStart(null);
    setDijkstraEnd(null);
    setVisualState({ visited: new Set(), path: [] });
    setMessage("Graph cleared. Ready to start again.");
    setResult(null);
  }, []);

  const loadDefaultExample = useCallback(() => {
    setNodes(DEFAULT_EXAMPLE.nodes);
    setEdges(DEFAULT_EXAMPLE.edges);
    setDijkstraStart(0);
    setDijkstraEnd(5);
    setVisualState({ visited: new Set(), path: [] });
    setResult(null);
    setMessage("Loaded default example graph. Choose an algorithm and run.");
  }, []);

  // Memoize the algorithm options to prevent unnecessary re-renders
  const algorithmOptions = useMemo(() => [
    { value: "BFS", label: "BFS" },
    { value: "DFS", label: "DFS" },
    { value: "Dijkstra", label: "Dijkstra" },
    { value: "Eulerian", label: "Eulerian Path/Circuit" }
  ], []);

  return (
    <div className="graph-visualizer-container">
      <div className="graph-controls">
        <button
          className="btn btn-primary"
          onClick={() => setIsAddingNode(true)}
          disabled={isAddingNode || isAddingEdge}
          aria-label="Add node"
        >
          Add Node
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setIsAddingEdge(true)}
          disabled={isAddingNode || isAddingEdge || nodes.length < 2}
          aria-label="Add edge"
        >
          Add Edge
        </button>
        <button
          className="btn btn-secondary"
          onClick={loadDefaultExample}
          disabled={isVisualizing}
          aria-label="Load example graph"
        >
          Load Example
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleClear}
          disabled={isVisualizing}
          aria-label="Clear graph"
        >
          Clear
        </button>
      </div>
      <div className="algorithm-controls">
        {/* Left side for the controls */}
        <div className="controls-left">
          <div className="control-group">
            <label className="control-label">Algorithm:</label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              disabled={isVisualizing}
              className="form-select"
              aria-label="Select algorithm"
            >
              {algorithmOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="control-group">
            <label className="control-label">Start Node:</label>
            <select
              value={dijkstraStart ?? ""}
              onChange={(e) =>
                setDijkstraStart(
                  e.target.value === "" ? null : parseInt(e.target.value)
                )
              }
              disabled={isVisualizing}
              className="form-select"
              aria-label="Select start node"
            >
              <option value="">Select</option>
              {nodes.map((_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          <div className="control-group">
            <label className="control-label">End Node (for Dijkstra/BFS/DFS):</label>
            <select
              value={dijkstraEnd ?? ""}
              onChange={(e) =>
                setDijkstraEnd(
                  e.target.value === "" ? null : parseInt(e.target.value, 10)
                )
              }
              disabled={isVisualizing}
              className="form-select"
              aria-label="Select end node"
            >
              <option value="">Select</option>
              {nodes.map((_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          <div className="control-group">
            <button
              className="btn btn-primary"
              onClick={runSelectedAlgorithm}
              disabled={isVisualizing || nodes.length === 0}
              aria-label="Run selected algorithm"
            >
              Run Algorithm
            </button>
          </div>
        </div>

        {/* Right side for canvas */}
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          className="graph-canvas"
          onClick={handleCanvasClick}
        />

        {/* Status message */}
        <div className="status-message">
          <p>{message}</p>
        </div>

        {/* Result box */}
        {result && (
          <div className="result-box">
            <p><strong>Path:</strong> {result.path}</p>
            <p><strong>Total Weight:</strong> {result.weight}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GraphVisualizer;