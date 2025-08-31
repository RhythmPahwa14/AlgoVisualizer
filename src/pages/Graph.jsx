import React from "react";
import GraphVisualizer from "../components/GraphVisualizer";
import "../styles/pages.css";

const Graph = () => {
  return (
    <div
      className="page-container"
      style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}
    >
      <h1 className="page-title">Graph Algorithms Visualization</h1>
      <p
        style={{ textAlign: "center", color: "#e0e6ed", marginBottom: "30px" }}
      >
        Create your own graph by adding nodes and edges, and visualize graph
        traversal algorithms.
      </p>

      {/* Informative Description Section */}
      <div className="algorithm-info" style={{ marginBottom: "30px" }}>
        <h3 style={{ color: "#66ccff" }}>What is a Graph?</h3>
        <p style={{ color: "#e0e6ed" }}>
          A graph is a non-linear data structure consisting of a set of vertices
          (or nodes) and a set of edges connecting these vertices. Graphs are
          used to model relationships between objects and are fundamental in
          computer science for solving a wide variety of problems.
        </p>
        <div className="complexity-grid">
          <div className="complexity-row">
            <span className="complexity-label">Vertices (Nodes):</span>
            <span style={{ color: "#e0e6ed" }}>
              The fundamental units of which graphs are formed.
            </span>
          </div>
          <div className="complexity-row">
            <span className="complexity-label">Edges:</span>
            <span style={{ color: "#e0e6ed" }}>
              The connections between pairs of vertices.
            </span>
          </div>
        </div>
        <p style={{ color: "#e0e6ed", marginTop: "15px" }}>
          <strong>Real-world applications:</strong> Social networks, GPS and
          mapping systems, computer networks, and recommendation engines all
          rely on graph structures to represent and analyze data.
        </p>
      </div>
      <div className="algorithm-info" style={{ marginBottom: "30px" }}>
        <h3 style={{ color: "#66ccff" }}>Dijkstra's Shortest Path Algorithm</h3>
        <p style={{ color: "#e0e6ed" }}>
          Dijkstra's algorithm finds the shortest path between two nodes in a
          weighted graph. It works by visiting nodes and greedily selecting the
          unvisited node with the smallest known distance.
        </p>
        <div className="complexity-grid">
          <div className="complexity-row">
            <span className="complexity-label">Time Complexity:</span>
            <span style={{ color: "#e0e6ed" }}>O(E + V log V)</span>
          </div>
        </div>
      </div>

      <GraphVisualizer />
    </div>
  );
};

export default Graph;
