// src/pages/BranchBoundOverview.jsx
import React from "react";
import "../styles/global-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";
// Import your visualizer component (create separately like BacktrackingPage)
import BranchBoundPage from "./BranchBoundPage";

const BranchBoundOverview = () => {
  return (
    <div
      className="theme-container"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <h1 className="theme-title" style={{ marginTop: "4rem" }}>
        Guide to <span className="highlight">Branch and Bound</span>
      </h1>

      <p
        style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "-2rem auto 2rem auto",
          color: "var(--theme-text-secondary)",
        }}
      >
        Branch and Bound is an algorithmic technique used for solving
        optimization problems. It systematically explores all possible
        solutions, “branching” into subsets of the solution space, and
        “bounding” by eliminating branches that cannot yield better results.
      </p>

      <p
        style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "-2rem auto 2rem auto",
          color: "var(--text-color)",
        }}
      >
        <span
          style={{
            fontWeight: "600",
            fontSize: "1.5rem",
            color: "var(--accent-primary)",
          }}
        >
          Goal
        </span>{" "}
        : Solve complex optimization problems efficiently by pruning
        unpromising solution branches early.
      </p>

      <div
        className="theme-card"
        style={{ width: "1300px" }}
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="theme-card-header">
          <h3>What is Branch and Bound?</h3>
        </div>
        <p style={{ color: "var(--theme-text-secondary)", lineHeight: 1.6 }}>
          Branch and Bound is widely used in solving combinatorial optimization
          problems such as the Traveling Salesman Problem (TSP), 0/1 Knapsack,
          and Job Scheduling. The algorithm builds a search tree, where each
          node represents a partial solution. It calculates bounds to determine
          if a branch should be explored further or pruned.
        </p>
      </div>

      <div
        className="theme-card"
        style={{ width: "1300px" }}
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <div className="theme-card-header">
          <h3>🌱 Key Takeaways</h3>
        </div>
        <ul className="search-points">
          <li>Used for optimization problems with large search spaces</li>
          <li>Prunes branches using upper/lower bounds to save computation</li>
          <li>
            Commonly applied in TSP, Knapsack, Job Assignment, Scheduling
          </li>
          <li>
            Implemented with priority queues for exploring the most promising
            nodes first
          </li>
        </ul>
      </div>

      <div
        className="theme-card"
        style={{ width: "1300px" }}
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <div className="theme-card-header">
          <h3>⚡ Complexity Analysis</h3>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Problem</th>
              <th>Time Complexity</th>
              <th>Space Complexity</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0/1 Knapsack</td>
              <td>O(2^N) worst-case</td>
              <td>O(N)</td>
              <td>Bounding prunes many states</td>
            </tr>
            <tr>
              <td>Travelling Salesman Problem</td>
              <td>O(N!) worst-case</td>
              <td>O(N²)</td>
              <td>
                Bounding with cost matrix reduces practical runtime
              </td>
            </tr>
            <tr>
              <td>Job Assignment</td>
              <td>O(N!) worst-case</td>
              <td>O(N²)</td>
              <td>Branching on tasks, bounding by cost</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Interactive Branch and Bound Visualizer */}
      <BranchBoundPage />
    </div>
  );
};

export default BranchBoundOverview;
