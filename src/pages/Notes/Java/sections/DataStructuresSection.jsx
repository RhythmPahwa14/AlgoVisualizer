import React from "react";

const DataStructuresSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2><i className="fas fa-cubes"></i> 9. Data Structures</h2>
      <p>
        Data structures organize and store data efficiently.
        <ul>
          <li>Common types: Arrays, Linked Lists, Stacks, Queues, Trees, HashMaps.</li>
        </ul>
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "ds_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// StackExample.java
import java.util.*;

public class StackExample {
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        stack.push(10);
        stack.push(20);
        stack.push(30);

        System.out.println("Top element: " + stack.peek());
        stack.pop();
        System.out.println("After pop: " + stack);
    }
}`,
              "ds_code"
            )
          }
        >
          {copiedCode === "ds_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// StackExample.java
import java.util.*;

public class StackExample {
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        stack.push(10);
        stack.push(20);
        stack.push(30);

        System.out.println("Top element: " + stack.peek());
        stack.pop();
        System.out.println("After pop: " + stack);
    }
}`}</pre>
      </div>

      <p style={{ fontSize: "0.9rem", color: "#000" }}><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Tip: Use proper data structure based on operation typeâ€”like <code>HashMap</code> for fast lookups.</p>
    </div>
  </section>
);

export default DataStructuresSection;

