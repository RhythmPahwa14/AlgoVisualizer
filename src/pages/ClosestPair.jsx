import React, { useState } from "react";

export default function ClosestPair() {
  const [points, setPoints] = useState([]);
  const [result, setResult] = useState(null);

  // Compute Euclidean distance
  const distance = (p1, p2) => Math.hypot(p1.x - p2.x, p1.y - p2.y);

  // Brute-force closest pair algorithm
  const closestPair = (pts) => {
    let minDist = Infinity;
    let pair = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const d = distance(pts[i], pts[j]);
        if (d < minDist) {
          minDist = d;
          pair = [pts[i], pts[j]];
        }
      }
    }
    return { pair, minDist };
  };

  // Handle canvas click to add points
  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const newPoint = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setPoints([...points, newPoint]);
  };

  // Compute closest pair
  const handleCompute = () => {
    if (points.length < 2) {
      alert("Add at least 2 points!");
      return;
    }
    setResult(closestPair(points));
  };

  // Reset canvas
  const handleReset = () => {
    setPoints([]);
    setResult(null);
  };

  // Inline styles
  const styles = {
    container: { display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" },
    canvas: { width: "600px", height: "400px", border: "2px solid #333", position: "relative", cursor: "crosshair", background: "#f7f7f7" },
    point: { width: "10px", height: "10px", borderRadius: "50%", background: "blue", position: "absolute" },
    lineSvg: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" },
    distanceText: { position: "absolute", top: 0, left: 0, color: "red", fontWeight: "bold" },
    button: { marginTop: "10px", padding: "5px 10px", cursor: "pointer" }
  };

  return (
    <div style={styles.container}>
      <h2>Closest Pair of Points</h2>
      <div style={styles.canvas} onClick={handleClick}>
        {points.map((p, i) => (
          <div key={i} style={{ ...styles.point, left: p.x - 5, top: p.y - 5 }} />
        ))}
        {result && (
          <>
            <svg style={styles.lineSvg}>
              <line
                x1={result.pair[0].x}
                y1={result.pair[0].y}
                x2={result.pair[1].x}
                y2={result.pair[1].y}
                stroke="red"
                strokeWidth="2"
              />
            </svg>
            <p style={styles.distanceText}>Distance: {result.minDist.toFixed(2)}</p>
          </>
        )}
      </div>
      <div>
        <button style={styles.button} onClick={handleCompute}>Compute Closest Pair</button>
        <button style={styles.button} onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
