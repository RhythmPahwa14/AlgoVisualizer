import "../styles/global-theme.css";
import Searching from "./Searching";

const SearchingOverview = () => {
  return (
    <div className="theme-container">
      <h1 className="theme-title" style={{ marginTop: "4rem" }}>
        Guide to <span className="highlight">Searching</span>{" "}
      </h1>
      <p className="overview-description">
        Searching means finding the location of a target (key) in a collection
        of data (like an array, list, tree, graph, etc.).
      </p>
      <p className="overview-goal">
        <span className="goal-label">
          Goal
        </span>{" "}
        : Return the position/index or confirm if the element exists.
      </p>

      <div className="theme-card">
        <div className="theme-card-header">
          <h3>What is Searching?</h3>
        </div>
        <p className="card-description">
          In Data Structures and Algorithms (DSA), searching refers to the
          systematic technique of finding a target value among stored data. It
          determines whether the element exists and, if so, where it is located,
          enabling quick retrieval and efficient decision-making.
        </p>
      </div>

      <div className="theme-card">
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
      
      <div className="theme-card">
        <div className="theme-card-header">
          <h3>⚡Complexity Comparison</h3>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Algorithm</th>
              <th>Best</th>
              <th>Worst</th>
              <th>Average</th>
              <th>Space</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="algo">
                  <div className="badge">Linear</div>
                  <div>
                    <div>Linear Search</div>
                    <div className="muted">Works on unsorted arrays/lists</div>
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
                <div className="algo">
                  <div className="badge">Binary</div>
                  <div>
                    <div>Binary Search</div>
                    <div className="muted">Requires sorted arrays</div>
                  </div>
                </div>
              </td>
              <td>O(1)</td>
              <td>O(log n)</td>
              <td>O(log n)</td>
              <td>O(1)</td>
            </tr>
            <tr>
              <td>
                <div className="algo">
                  <div className="badge">Hash</div>
                  <div>
                    <div>Hash Table Lookup</div>
                    <div className="muted">Average O(1) with good hashing</div>
                  </div>
                </div>
              </td>
              <td>O(1)</td>
              <td>O(1)</td>
              <td className="bad">O(n)</td>
              <td>O(n)</td>
            </tr>
            <tr>
              <td>
                <div className="algo">
                  <div className="badge">BST</div>
                  <div>
                    <div>Binary Search Tree</div>
                    <div className="muted">
                      Balanced trees (AVL/Red–Black) give log n
                    </div>
                  </div>
                </div>
              </td>
              <td>O(log n)</td>
              <td>O(log n)</td>
              <td className="bad">O(n)</td>
              <td>O(1)</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <Searching/>
    </div>
  );
};

export default SearchingOverview;