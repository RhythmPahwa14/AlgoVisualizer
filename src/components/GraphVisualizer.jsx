import React, { useState, useRef, useEffect } from "react";
import "../styles/Graph.css";

const GraphVisualizer = () => {
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
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [isAddingNode, setIsAddingNode] = useState(false);
  const [isAddingEdge, setIsAddingEdge] = useState(false);
  const [edgeStartNode, setEdgeStartNode] = useState(null);
  const canvasRef = useRef(null);
  const [dijkstraStart, setDijkstraStart] = useState(null);
  const [dijkstraEnd, setDijkstraEnd] = useState(null);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [visualState, setVisualState] = useState({
    visited: new Set(),
    path: [],
  });
  const [message, setMessage] = useState(
    "Build your graph or select an algorithm."
  );
  const [result, setResult] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    drawGraph(ctx);
  }, [nodes, edges, visualState, dijkstraStart, dijkstraEnd]);

  const drawGraph = (ctx) => {
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
  };

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
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
  };

  const runDijkstra = () => {
    if (dijkstraStart === null || dijkstraEnd === null) {
      alert("Please select a start and end node first.");
      return;
    }

    setIsVisualizing(true);
    setVisualState({ visited: new Set(), path: [] }); // Reset previous visualization
    setMessage(`Running Dijkstra's from ${dijkstraStart} to ${dijkstraEnd}...`);

    const numNodes = nodes.length;
    const distances = Array(numNodes).fill(Infinity);
    const prev = Array(numNodes).fill(null);
    const pq = new SimplePriorityQueue();
    const visualizationSteps = [];

    distances[dijkstraStart] = 0;
    pq.enqueue(dijkstraStart, 0);

    while (!pq.isEmpty()) {
      const u = pq.dequeue();
      visualizationSteps.push({ type: "visit", node: u });
      if (u === dijkstraEnd) break;

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
    let current = dijkstraEnd;
    while (current !== null) {
      const p = prev[current];
      if (p !== null) path.unshift({ start: p, end: current });
      current = p;
    }
    visualizationSteps.push({ type: "path", path });
    animateVisualization(visualizationSteps, distances, path);
  };

  const animateVisualization = (steps, distances, path) => {
    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex >= steps.length) {
        clearInterval(interval);
        setIsVisualizing(false);
        setMessage("Visualization complete!");
        const totalWeight = distances[dijkstraEnd];
        if (totalWeight === Infinity) {
          setResult({ path: "No path found", weight: "N/A" });
        } else {
          const nodePath = [dijkstraStart];
          path.forEach((edge) => nodePath.push(edge.end));
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
  };

  const handleClear = () => {
    setNodes([]);
    setEdges([]);
    setDijkstraStart(null);
    setDijkstraEnd(null);
    setVisualState({ visited: new Set(), path: [] });
    setMessage("Graph cleared. Ready to start again.");
    setResult(null);
  };

  return (
    <div className="graph-visualizer-container">
      <div className="graph-controls">
        <button
          className="btn"
          onClick={() => setIsAddingNode(true)}
          disabled={isAddingNode || isAddingEdge}
        >
          Add Node
        </button>
        <button
          className="btn"
          onClick={() => setIsAddingEdge(true)}
          disabled={isAddingNode || isAddingEdge || nodes.length < 2}
        >
          Add Edge
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleClear}
          disabled={isVisualizing}
        >
          Clear
        </button>
      </div>
      <div className="algorithm-controls">
        {/* Left side for the controls */}
        <div className="controls-left">
          <div className="control-group">
            <label>Start Node:</label>
            <select
              value={dijkstraStart ?? ""}
              onChange={(e) =>
                setDijkstraStart(
                  e.target.value === "" ? null : parseInt(e.target.value)
                )
              }
              disabled={isVisualizing}
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
            <label>End Node:</label>
            <select
              value={dijkstraEnd ?? ""}
              onChange={(e) =>
                setDijkstraEnd(
                  e.target.value === "" ? null : parseInt(e.target.value)
                )
              }
              disabled={isVisualizing}
            >
              <option value="">Select</option>
              {nodes.map((_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          <button
            className="btn"
            onClick={runDijkstra}
            disabled={isVisualizing || nodes.length < 2}
          >
            Run Dijkstra
          </button>
        </div>

        {/* Right side for the result, appears only when result is set */}
        {result && (
          <div className="result-box">
            <h4>Shortest Path Result</h4>
            <p>
              <strong>Path:</strong> {result.path}
            </p>
            <p>
              <strong>Total Weight:</strong> {result.weight}
            </p>
          </div>
        )}
      </div>
      <p className="message-bar">{message}</p>

      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        className="graph-canvas"
        onClick={handleCanvasClick}
      />
    </div>
  );
};

export default GraphVisualizer;
