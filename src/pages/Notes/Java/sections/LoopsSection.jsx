import React from "react";

const LoopsSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-redo"></i> 12. Loops
      </h2>
      <p>
        Java provides several looping constructs: <strong>for</strong>, <strong>enhanced for</strong> (for-each), <strong>while</strong>, and <strong>do-while</strong>. Loops are used for repeating tasks, iterating arrays, and processing collections.
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "loops_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// LoopsExample.java
public class LoopsExample {
    public static void main(String[] args) {
        // Standard for loop
        for (int i = 0; i < 3; i++) {
            System.out.println("for loop: " + i);
        }

        // Enhanced for loop (for-each)
        int[] arr = {1, 2, 3};
        for (int v : arr) {
            System.out.println("enhanced for: " + v);
        }

        // While loop
        int i = 0;
        while (i < 2) {
            System.out.println("while loop: " + i);
            i++;
        }

        // Do-while loop
        int j = 0;
        do {
            System.out.println("do-while loop: " + j);
            j++;
        } while (j < 1);
    }
}`, "loops_code")
          }
        >
          {copiedCode === "loops_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// LoopsExample.java
public class LoopsExample {
    public static void main(String[] args) {
        // Standard for loop
        for (int i = 0; i < 3; i++) {
            System.out.println("for loop: " + i);
        }

        // Enhanced for loop (for-each)
        int[] arr = {1, 2, 3};
        for (int v : arr) {
            System.out.println("enhanced for: " + v);
        }

        // While loop
        int i = 0;
        while (i < 2) {
            System.out.println("while loop: " + i);
            i++;
        }

        // Do-while loop
        int j = 0;
        do {
            System.out.println("do-while loop: " + j);
            j++;
        } while (j < 1);
    }
}`}</pre>
      </div>

    </div>
  </section>
);

export default LoopsSection;
