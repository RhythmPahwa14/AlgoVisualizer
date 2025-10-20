import React, { useState, useEffect } from "react";

const ConvexHull = () => {
  const [points, setPoints] = useState([]);
  const [hull, setHull] = useState([]);

  const canvasWidth = 600;
  const canvasHeight = 400;

  // Generate random points
  const generatePoints = (n = 20) => {
    const pts = [];
    for (let i = 0; i < n; i++) {
      pts.push({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
      });
    }
    setPoints(pts);
    setHull([]);
  };

  // Cross product
  const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);

  // Graham's scan
  const computeHull = () => {
    if (points.length < 3) return;

    const pts = [...points].sort((a, b) =>
      a.x === b.x ? a.y - b.y : a.x - b.x
    );

    const lower = [];
    for (let p of pts) {
      while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) {
        lower.pop();
      }
      lower.push(p);
    }

    const upper = [];
    for (let i = pts.length - 1; i >= 0; i--) {
      const p = pts[i];
      while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) {
        upper.pop();
      }
      upper.push(p);
    }

    upper.pop();
    lower.pop();
    setHull([...lower, ...upper]);
  };

  // Draw on canvas
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw points
    points.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "blue";
      ctx.fill();
    });

    // Draw convex hull
    if (hull.length > 0) {
      ctx.beginPath();
      ctx.moveTo(hull[0].x, hull[0].y);
      for (let i = 1; i < hull.length; i++) {
        ctx.lineTo(hull[i].x, hull[i].y);
      }
      ctx.lineTo(hull[0].x, hull[0].y);
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [points, hull]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Convex Hull Visualization</h1>
      <canvas id="canvas" width={canvasWidth} height={canvasHeight} style={{ border: "1px solid black" }}></canvas>
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => generatePoints(20)}>Generate Points</button>
        <button onClick={computeHull} style={{ marginLeft: "10px" }}>Compute Convex Hull</button>
      </div>
    </div>
  );
};

export default ConvexHull;
