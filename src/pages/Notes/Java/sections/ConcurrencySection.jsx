import React from "react";

const ConcurrencySection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2><i className="fas fa-random"></i> 3. Concurrency</h2>
      <p>
        Concurrency controls multiple threads to avoid conflicts and ensure thread safety.
        <ul>
          <li>Use synchronized blocks or locks to protect shared data.</li>
          <li>Java provides <code>ExecutorService</code> for thread management.</li>
        </ul>
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "concurrency_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// ConcurrencyExample.java
import java.util.concurrent.*;

public class ConcurrencyExample {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2);

        Runnable task = () -> {
            System.out.println(Thread.currentThread().getName() + " is executing a task.");
        };

        for (int i = 0; i < 5; i++) {
            executor.submit(task);
        }

        executor.shutdown();
    }
}`,
              "concurrency_code"
            )
          }
        >
          {copiedCode === "concurrency_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// ConcurrencyExample.java
import java.util.concurrent.*;

public class ConcurrencyExample {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2);

        Runnable task = () -> {
            System.out.println(Thread.currentThread().getName() + " is executing a task.");
        };

        for (int i = 0; i < 5; i++) {
            executor.submit(task);
        }

        executor.shutdown();
    }
}`}</pre>
      </div>

      <p style={{ fontSize: "0.9rem", color: "#000" }}><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Tip: Always call <code>shutdown()</code> on ExecutorService to release system resources.</p>
    </div>
  </section>
);

export default ConcurrencySection;

