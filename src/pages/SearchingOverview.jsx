import "../styles/global-theme.css";
import Searching from "./Searching";
const SearchingOverview = () => {
  return (
    <div className="theme -container">
      <h1 className="theme-title" style={{ marginTop: "4rem" }}>
        Guide to <span className="highlight">Searching</span>{" "}
      </h1>
      <p
        style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "-2rem auto 2rem auto",
          color: "var(--theme-text-secondary)",
        }}
      >
        Searching means finding the location of a target (key) in a collection
        of data (like an array, list, tree, graph, etc.).
      </p>
      <p
        style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "-2rem auto 2rem auto",
          color: "var(--text-color)",
        }}
      >
        {" "}
        <span
          style={{
            fontWeight: "600",
            fontSize: "1.5rem",
            color: "var(--accent-primary)",
          }}
        >
          Goal
        </span>{" "}
        : Return the position/index or confirm if the element exists.
      </p>

     <div className="theme-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className="theme-card" style={{ width: "1300px" }}>
        <div className="theme-card-header">
          <h3>What is Searching?</h3>
        </div>
        <p style={{ color: "var(--theme-text-secondary)", lineHeight: 1.6 }}>
          In Data Structures and Algorithms (DSA), searching refers to the
          systematic technique of finding a target value among stored data. It
          determines whether the element exists and, if so, where it is located,
          enabling quick retrieval and efficient decision-making.
        </p>
      </div>

      <div className="theme-card" style={{ width: "1300px" }}>
        <div className="theme-card-header">
          <h3>🌱 Key Takeaways</h3>
        </div>
        <ul className="search-points">
          <li>Unsorted data → Linear Search / Hashing</li>
          <li>Sorted array → Binary Search</li>
          <li>Dynamic data → Balanced BST (like AVL/Red-Black)</li>
          <li>
            Complex conditions → Binary Search on Answer (also called parametric
            search)
          </li>
        </ul>
      </div>
      <div className="theme-card" style={{ width: "1300px" }}>
        <div className="theme-card-header">
          <h3>⚡Complexity Comparison</h3>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Algorithm</th>
              <th>Best</th>
              <th>Wrost</th>
              <th>Average</th>
              <th>Space</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="algo">
                  <div class="badge">Linear</div>
                  <div>
                    <div>Linear Search</div>
                    <div class="muted">Works on unsorted arrays/lists</div>
                  </div>
                </div>
              </td>
              <td>O(1)</td>
              <td>O(n)</td>
              <td>O(n)</td>
              <td>O(1)</td>
            </tr>
            <tr>
              <td>
                <div class="algo">
                  <div class="badge">Binary</div>
                  <div>
                    <div>Binary Search</div>
                    <div class="muted">Requires sorted arrays</div>
                  </div>
                </div>
              </td>
              <td>O(1)</td>
              <td>O(logn)</td>
              <td>O(logn)</td>
              <td>O(1)</td>
            </tr>
            <tr>
              <td>
                <div class="algo">
                  <div class="badge">Hash</div>
                  <div>
                    <div>Hash Table Lookup</div>
                    <div class="muted">Average O(1) with good hashing</div>
                  </div>
                </div>
              </td>
              <td>O(1)</td>
              <td>O(1)</td>
              <td class="bad">O(n)</td>
              <td>O(n)</td>
            </tr>
            <tr>
              <td>
                <div class="algo">
                  <div class="badge">BST</div>
                  <div>
                    <div>Binary Search Tree</div>
                    <div class="muted">
                      Balanced trees (AVL/Red–Black) give log n
                    </div>
                  </div>
                </div>
              </td>
              <td>O(log n)</td>
              <td>O(log n)</td>
              <td class="bad">O(n)</td>
              <td>O(1)</td>
            </tr>
          </tbody>
        </table>
      </div>  
      </div>
      <Searching/>
    </div>

  );
};

export default SearchingOverview;
