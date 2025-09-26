// src/pages/StringOverview.jsx
import React from "react";
import "../styles/global-theme.css";
import StringPage from "./StringPage"; // Your visualizer component
import AOS from 'aos';
import 'aos/dist/aos.css';

const StringOverview = () => {
  return (
    <div className="theme-container" data-aos="fade-up" data-aos-duration="1000">
      <h1 className="theme-title" style={{ marginTop: "4rem" }}>
        Guide to <span className="highlight">String Algorithms</span>
      </h1>

      <p
        style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "-2rem auto 2rem auto",
          color: "var(--theme-text-secondary)",
        }}
      >
        String algorithms are techniques used to efficiently process and analyze textual data. They are fundamental
        in pattern matching, searching, and text processing applications in competitive programming, coding interviews, and real-world software.
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
        : Efficiently search, match, and process strings using optimized algorithms instead of brute-force methods.
      </p>

      <div className="theme-card" style={{ width: "1300px" }} data-aos="fade-up" data-aos-delay="200">
        <div className="theme-card-header">
          <h3>What are String Algorithms?</h3>
        </div>
        <p style={{ color: "var(--theme-text-secondary)", lineHeight: 1.6 }}>
          String algorithms provide optimized methods to perform pattern matching, substring search, and text analysis.
          Examples include Knuth-Morris-Pratt (KMP), Rabin-Karp, Z Algorithm, and Suffix Arrays. These algorithms improve
          performance by preprocessing the pattern or text and avoiding redundant comparisons.
        </p>
      </div>

      <div className="theme-card" style={{ width: "1300px" }} data-aos="fade-up" data-aos-delay="300">
        <div className="theme-card-header">
          <h3>🌱 Key Takeaways</h3>
        </div>
        <ul className="search-points">
          <li>Used for pattern matching and substring searches</li>
          <li>Avoid brute-force comparisons by preprocessing patterns</li>
          <li>Commonly applied in text processing, search engines, and competitive programming</li>
          <li>Efficiently handle large strings and multiple pattern searches</li>
        </ul>
      </div>

      <div className="theme-card" style={{ width: "1300px" }} data-aos="fade-up" data-aos-delay="400">
        <div className="theme-card-header">
          <h3>⚡ Complexity Overview</h3>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Algorithm</th>
              <th>Time Complexity</th>
              <th>Space Complexity</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Knuth-Morris-Pratt (KMP)</td>
              <td>O(N+M)</td>
              <td>O(M)</td>
              <td>Preprocess pattern for longest prefix-suffix; avoids redundant comparisons</td>
            </tr>
            <tr>
              <td>Rabin-Karp</td>
              <td>O(N+M) average</td>
              <td>O(1)</td>
              <td>Uses rolling hash; efficient for multiple pattern searches</td>
            </tr>
            <tr>
              <td>Z Algorithm</td>
              <td>O(N+M)</td>
              <td>O(N+M)</td>
              <td>Preprocess string to compute Z-array for pattern matching</td>
            </tr>
            <tr>
              <td>Suffix Array / Suffix Tree</td>
              <td>O(N log N) for array, O(N) for tree</td>
              <td>O(N)</td>
              <td>Efficient substring queries, LCP computation, and text indexing</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Include your interactive string visualizer */}
      <StringPage />
    </div>
  );
};

export default StringOverview;
