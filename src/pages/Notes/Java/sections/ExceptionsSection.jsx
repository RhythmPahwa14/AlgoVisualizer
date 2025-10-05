import React from "react";

const ExceptionsSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-exclamation-triangle"></i> 18. Exceptions
      </h2>
      <p>
        Exceptions help handle runtime errors gracefully.
        Key points:
        <ul>
          <li>Use <strong>try-catch-finally</strong> blocks to handle exceptions.</li>
          <li>Checked exceptions must be declared with <code>throws</code>.</li>
          <li><strong>Finally</strong> block always executes for cleanup.</li>
        </ul>
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "exceptions_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// ExceptionsExample.java
public class ExceptionsExample {
    public static void main(String[] args) {
        try {
            int x = 10 / 0; // may throw ArithmeticException
        } catch (ArithmeticException ex) {
            System.out.println("Divide by zero: " + ex.getMessage());
        } catch (Exception ex) {
            System.out.println("Other exception: " + ex.getMessage());
        } finally {
            System.out.println("Cleanup code runs always");
        }

        // Checked exception example
        try {
            Thread.sleep(1000); // InterruptedException
        } catch (InterruptedException ex) {
            System.out.println("Thread interrupted");
        }
    }
}`,
              "exceptions_code"
            )
          }
        >
          {copiedCode === "exceptions_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// ExceptionsExample.java
public class ExceptionsExample {
    public static void main(String[] args) {
        try {
            int x = 10 / 0; // may throw ArithmeticException
        } catch (ArithmeticException ex) {
            System.out.println("Divide by zero: " + ex.getMessage());
        } catch (Exception ex) {
            System.out.println("Other exception: " + ex.getMessage());
        } finally {
            System.out.println("Cleanup code runs always");
        }

        // Checked exception example
        try {
            Thread.sleep(1000); // InterruptedException
        } catch (InterruptedException ex) {
            System.out.println("Thread interrupted");
        }
    }
}`}</pre>
      </div>

      <p style={{ fontSize: "0.9rem", color: "#555", marginTop: "0.5rem" }}>
        💡 Tip: Handle exceptions properly to prevent program crashes and ensure resource cleanup.
      </p>
    </div>
  </section>
);

export default ExceptionsSection;
