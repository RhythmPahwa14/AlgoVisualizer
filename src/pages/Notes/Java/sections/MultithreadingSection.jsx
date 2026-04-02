import React from "react";

const MultithreadingSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2><i className="fas fa-tasks"></i> 2. Multithreading</h2>
      <p>
        Multithreading allows concurrent execution of multiple parts of a program.
        <ul>
          <li>Threads share memory but run independently.</li>
          <li>Enhances performance for parallel tasks.</li>
          <li>Created by extending <code>Thread</code> or implementing <code>Runnable</code>.</li>
        </ul>
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "multithreading_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// MultithreadingExample.java
class MyThread extends Thread {
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(Thread.currentThread().getName() + " - " + i);
        }
    }
    public static void main(String[] args) {
        MyThread t1 = new MyThread();
        MyThread t2 = new MyThread();
        t1.start();
        t2.start();
    }
}`,
              "multithreading_code"
            )
          }
        >
          {copiedCode === "multithreading_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// MultithreadingExample.java
class MyThread extends Thread {
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(Thread.currentThread().getName() + " - " + i);
        }
    }
    public static void main(String[] args) {
        MyThread t1 = new MyThread();
        MyThread t2 = new MyThread();
        t1.start();
        t2.start();
    }
}`}</pre>
      </div>

      <p style={{ fontSize: "0.9rem", color: "#000" }}><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Tip: Always use <code>start()</code> to run a thread; calling <code>run()</code> directly wonâ€™t create a new thread.</p>
    </div>
  </section>
);

export default MultithreadingSection;

