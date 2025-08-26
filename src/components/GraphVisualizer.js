import React, { useState, useRef, useEffect } from 'react';
import '../styles/Graph.css';

const GraphVisualizer = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [isAddingNode, setIsAddingNode] = useState(false);
  const [isAddingEdge, setIsAddingEdge] = useState(false);
  const [startNode, setStartNode] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const drawGraph = (ctx) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      // Draw edges
      edges.forEach(edge => {
        const start = nodes[edge.start];
        const end = nodes[edge.end];
        if (start && end) {
          ctx.beginPath();
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(end.x, end.y);
          ctx.strokeStyle = '#66ccff';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      // Draw nodes
      nodes.forEach((node, index) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
        ctx.fillStyle = '#66ccff';
        ctx.fill();
        ctx.fillStyle = '#0f3460';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(index, node.x, node.y);
      });
    };
    
    drawGraph(ctx);
  }, [nodes, edges]);

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (isAddingNode) {
      setNodes([...nodes, { x, y }]);
      setIsAddingNode(false);
    } else if (isAddingEdge) {
      const clickedNodeIndex = nodes.findIndex(node => 
        Math.sqrt((node.x - x)**2 + (node.y - y)**2) < 20
      );

      if (clickedNodeIndex !== -1) {
        if (startNode === null) {
          setStartNode(clickedNodeIndex);
        } else {
          setEdges([...edges, { start: startNode, end: clickedNodeIndex }]);
          setStartNode(null);
          setIsAddingEdge(false);
        }
      }
    }
  };

  return (
    <div className="graph-visualizer-container">
      <div className="graph-controls">
        <button className="btn" onClick={() => setIsAddingNode(true)} disabled={isAddingNode || isAddingEdge}>
          Add Node
        </button>
        <button className="btn" onClick={() => setIsAddingEdge(true)} disabled={isAddingNode || isAddingEdge || nodes.length < 2}>
          Add Edge
        </button>
        <button className="btn btn-secondary" onClick={() => { setNodes([]); setEdges([]); }}>
          Clear
        </button>
      </div>
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