import React from "react";

const AlgorithmsSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2><i className="fas fa-project-diagram"></i> 8. Algorithms</h2>
      <p>
        Algorithms are step-by-step procedures to solve problems efficiently.
        <ul>
          <li>Focus on time and space complexity.</li>
        </ul>
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "algo_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// BubbleSort.java
public class BubbleSort {
    public static void main(String[] args) {
        int[] arr = {5, 1, 4, 2, 8};
        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        for (int num : arr) System.out.print(num + " ");
    }
}`,
              "algo_code"
            )
          }
        >
          {copiedCode === "algo_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// BubbleSort.java
public class BubbleSort {
    public static void main(String[] args) {
        int[] arr = {5, 1, 4, 2, 8};
        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        for (int num : arr) System.out.print(num + " ");
    }
}`}</pre>
      </div>

      <p style={{ fontSize: "0.9rem", color: "#000" }}><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Tip: Optimize nested loops where possible to reduce O(nÂ²) complexity.</p>
    </div>
  </section>
);

export default AlgorithmsSection;

