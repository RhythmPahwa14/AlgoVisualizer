import React, { useState } from "react";

const FloydWarshallPage = () => {
  const [vertices, setVertices] = useState(4);
  const [distances, setDistances] = useState([]);
  
  // Example adjacency matrix: Infinity represents no direct edge
  const [graph, setGraph] = useState([
    [0, 5, Infinity, 10],
    [Infinity, 0, 3, Infinity],
    [Infinity, Infinity, 0, 1],
    [Infinity, Infinity, Infinity, 0],
  ]);

  const runFloydWarshall = () => {
    const dist = graph.map(row => [...row]); // copy adjacency matrix

    for (let k = 0; k < vertices; k++) {
      for (let i = 0; i < vertices; i++) {
        for (let j = 0; j < vertices; j++) {
          if (dist[i][k] + dist[k][j] < dist[i][j]) {
            dist[i][j] = dist[i][k] + dist[k][j];
          }
        }
      }
    }

    setDistances(dist);
  };

  return (
    <div className="algorithm-page">
      <h1>Floyd-Warshall Algorithm</h1>

      <button onClick={runFloydWarshall}>Run Floyd-Warshall</button>

      {distances.length > 0 && (
        <div className="results">
          <h2>All-Pairs Shortest Distances:</h2>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th></th>
                {Array.from({ length: vertices }, (_, i) => (
                  <th key={i}>Node {i}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {distances.map((row, i) => (
                <tr key={i}>
                  <td>Node {i}</td>
                  {row.map((d, j) => (
                    <td key={j}>{d === Infinity ? "∞" : d}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="graph-section">
        <h3>Graph Adjacency Matrix</h3>
        <table border="1" cellPadding="5">
          <tbody>
            {graph.map((row, i) => (
              <tr key={i}>
                {row.map((val, j) => (
                  <td key={j}>{val === Infinity ? "∞" : val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FloydWarshallPage;
