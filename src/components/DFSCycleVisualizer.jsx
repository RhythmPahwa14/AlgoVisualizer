import React, { useEffect, useRef, useState } from "react";
import { Network } from "vis-network";
import "../styles/global-theme.css";
import "aos/dist/aos.css";

const DFSCycleVisualizer = ({ graphData }) => {
  const containerRef = useRef(null);
  const networkRef = useRef(null);

  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visited, setVisited] = useState({});
  const [recStack, setRecStack] = useState([]);
  const [cycleFound, setCycleFound] = useState(false);
  const defaultGraph = {
    nodes: [
      { id: 1, label: "A" },
      { id: 2, label: "B" },
      { id: 3, label: "C" },
      { id: 4, label: "D" },
      { id: 5, label: "E" },
      { id: 6, label: "F" },
    ],
    edges: [
      { id: "1-2", from: 1, to: 2 },
      { id: "2-3", from: 2, to: 3 },
      { id: "3-4", from: 3, to: 4 },
      { id: "4-5", from: 4, to: 5 },
      { id: "5-6", from: 5, to: 6 },
      { id: "6-3", from: 6, to: 3 }, // 🔴 cycle (3 → 4 → 5 → 6 → 3)
    ],
  };

  const intervalRef = useRef(null);

  // build DFS steps whenever graphData changes
  useEffect(() => {
    graphData = graphData === null ? defaultGraph : graphData;
    if (graphData && containerRef.current) {
      const options = {
        nodes: {
          shape: "circle",
          size: 25,
          font: { color: "#fff" },
          color: { background: "#4caf50", border: "#333" },
        },
        edges: { arrows: "to" },
        physics: false,
      };

      networkRef.current = new Network(
        containerRef.current,
        { nodes: graphData.nodes, edges: graphData.edges },
        options
      );

      // Step queue
      const newSteps = [];
      const adj = {};
      graphData.nodes.forEach((n) => (adj[n.id] = []));
      graphData.edges.forEach((e) => adj[e.from].push(e.to));

      const visitedLocal = {};
      const recStackLocal = {};

      function dfs(u) {
        newSteps.push({ type: "visit", node: u });
        visitedLocal[u] = true;
        recStackLocal[u] = true;

        for (let v of adj[u]) {
          newSteps.push({ type: "explore", from: u, to: v });
          if (!visitedLocal[v]) {
            dfs(v);
          } else if (recStackLocal[v]) {
            newSteps.push({ type: "cycle", from: u, to: v });
          }
        }

        newSteps.push({ type: "backtrack", node: u });
        recStackLocal[u] = false;
      }

      graphData.nodes.forEach((n) => {
        if (!visitedLocal[n.id]) dfs(n.id);
      });

      // reset states
      setSteps(newSteps);
      setStepIndex(0);
      setIsPlaying(false);
      setVisited({});
      setRecStack([]);
      setCycleFound(false);
      clearInterval(intervalRef.current);
    }
  }, [graphData]);

  // animate steps
  useEffect(() => {
    if (isPlaying && steps.length > 0) {
      intervalRef.current = setInterval(() => {
        if (stepIndex >= steps.length) {
          clearInterval(intervalRef.current);
          setIsPlaying(false);
          return;
        }

        const step = steps[stepIndex];
        const updateNode = (id, color) => {
          networkRef.current.body.data.nodes.update({
            id,
            color: { background: color },
          });
        };
        const highlightEdge = (from, to, color) => {
          const edgeId = `${from}-${to}`;
          networkRef.current.body.data.edges.update({
            id: edgeId,
            color: { color },
          });
        };

        switch (step.type) {
          case "visit":
            updateNode(step.node, "yellow"); // visiting
            setVisited((prev) => ({ ...prev, [step.node]: true }));
            setRecStack((prev) => [...prev, step.node]);
            break;
          case "explore":
            highlightEdge(step.from, step.to, "orange");
            break;
          case "cycle":
            updateNode(step.to, "red");
            highlightEdge(step.from, step.to, "red");
            setCycleFound(true);
            break;
          case "backtrack":
            updateNode(step.node, "green");
            setRecStack((prev) => prev.filter((x) => x !== step.node));
            break;
          default:
            break;
        }

        setStepIndex((i) => i + 1);
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, stepIndex, steps]);

  // controls
  const handlePlay = () => {
    if (stepIndex >= steps.length) {
      setStepIndex(0);
      setVisited({});
      setRecStack([]);
      setCycleFound(false);
    }
    setIsPlaying(true);
  };
  const handlePause = () => setIsPlaying(false);
  const handleRestart = () => {
    setIsPlaying(false);
    setStepIndex(0);
    setVisited({});
    setRecStack([]);
    setCycleFound(false);
    if (networkRef.current) {
      networkRef.current.body.data.nodes.forEach((n) =>
        networkRef.current.body.data.nodes.update({
          id: n.id,
          color: { background: "#4caf50" },
        })
      );
      networkRef.current.body.data.edges.forEach((e) =>
        networkRef.current.body.data.edges.update({
          id: e.id,
          color: { color: "#848484" },
        })
      );
    }
  };

  return (
    <div className="theme-card" data-aos="fade-up" data-aos-delay="400">
      <h3
        style={{
          textAlign: "center",
          margin: "auto",
          marginBottom: "1rem",
          borderRadius: "20px",
          border: "1px solid var(--theme-text-muted)",
          maxWidth: "350px",
          padding: "1rem",
          whiteSpace: "nowrap",
        }}
      >
        DFS Cycle Detection Animation
      </h3>
      <div className="cycle-visualize"
        style={{
          display: "flex",
          gap: "4rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div
            ref={containerRef}
            style={{
              height: "300px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />

          {/* Controls */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            <button onClick={handlePlay} disabled={isPlaying}>
              ▶ Play
            </button>
            <button onClick={handlePause} disabled={!isPlaying}>
              ⏸ Pause
            </button>
            <button onClick={handleRestart}>⏮ Restart</button>
          </div>
        </div>
        {/* Debug Info */}
        <div
          style={{
            padding: "2rem",
            border: "1px solid #ddd",
            borderRadius: "6px",
            background: "var(--theme-accent-gradient)",
            maxWidth: "400px",
            height: "300px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "stretch",
            gap: "2rem",
          }}
        >
          <p>
            <strong>Visited:</strong>{" "}
            <pre
              style={{
                margin: 0,
                fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                fontSize: "0.9rem",
                lineHeight: "1.5",
                color: "var(--text-primary)",
                whiteSpace: "pre-wrap", 
                wordBreak: "break-word",  
                overflowX: "auto",  
                padding:".6rem"
              }}
            >
              <code>{Object.keys(visited).length === 0 ? "∅" : JSON.stringify(visited)}</code>
            </pre>
             
          </p>
          <p>
            <strong>Recursion Stack:</strong>{" "}
             <pre
              style={{
                margin: 0,
                fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                fontSize: "0.9rem",
                lineHeight: "1.5",
                color: "var(--text-primary)",
                whiteSpace: "pre-wrap", 
                wordBreak: "break-word",  
                overflowX: "auto",  
                padding:".6rem"
              }}
            >
              <code>
            {recStack.length === 0 ? "∅" : recStack.join(" → ")}</code>
            </pre> 
          </p>
          {stepIndex >= steps.length && (
            <p
              style={{
                marginTop: ".9rem",
                fontWeight: "bold",
                color: cycleFound ? "red" : "green",
                background: "var(--theme-btn-secondary-text)",
                textAlign: "center",
              }}
            >
              {cycleFound ? "Cycle Detected ✅" : "No Cycle ❌"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DFSCycleVisualizer;
