import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaProjectDiagram, FaSearch, FaRandom, FaRoute, FaStar, FaCompress, FaCheckCircle } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/global-theme.css";

const graphAlgorithms = [
  {
    path: "/graph/bfs",
    label: "BFS",
    description: "Explore graphs level by level. Great for finding shortest paths in unweighted graphs.",
    icon: <FaSearch />,
  },
  {
    path: "/graph/dfs",
    label: "DFS",
    description: "Traverse graphs by exploring as far as possible along each branch before backtracking.",
    icon: <FaRandom />,
  },
  {
    path: "/graph/dijkstra",
    label: "Dijkstra's",
    description: "Find the shortest paths from a single source in a weighted graph with non-negative weights.",
    icon: <FaRoute />,
  },
  {
    path: "/graph/astar",
    label: "A* Search",
    description: "An efficient pathfinding algorithm that uses heuristics to guide its search.",
    icon: <FaStar />,
  },
  {
    path: "/graph/eulerian-path",
    label: "Eulerian Path",
    description: "Find a path that visits every edge of a graph exactly once.",
    icon: <FaCompress />,
  },
  {
    path: "/graph/eulerian-circuit",
    label: "Eulerian Circuit",
    description: "Find a circuit that visits every edge exactly once, starting and ending at the same vertex.",
    icon: <FaCompress />,
  },
  {
    path: "/graph/cycleDetection",
    label: "Cycle Detection",
    description: "Detect if a cycle exists within a directed or undirected graph.",
    icon: <FaCheckCircle />,
  },
];

const Graph = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="theme-container" data-aos="fade-up">
      <h1 className="theme-title">Graph Algorithms</h1>
      <p style={{ textAlign: 'center', maxWidth: '700px', margin: '-1rem auto 2rem auto', color: 'var(--theme-text-secondary)' }}>
        Graphs are fundamental data structures used to model relationships. Explore various algorithms for traversing, searching, and analyzing graphs.
      </p>
      <div className="results-grid">
        {graphAlgorithms.map((algo, index) => (
          <Link to={algo.path} key={index} className="theme-card algorithm-card" data-aos="fade-up" data-aos-delay={100 * (index + 1)}>
            <div className="card-header">
              <div className="card-title-group">
                <div className="card-icon">{algo.icon}</div>
                <h3 className="card-title">{algo.label}</h3>
              </div>
              <FaArrowRight className="arrow-icon" />
            </div>
            <p className="card-description">{algo.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
