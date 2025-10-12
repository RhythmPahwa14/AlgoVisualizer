import React from "react";

const ConcurrencySection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-sync"></i> Concurrency
      </h2>
      <p>
        Rust's ownership model helps prevent data races at compile time, making concurrent programming safer.
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "concurrency" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {} from the spawned thread!", i);
            thread::sleep(Duration::from_millis(1));
        }
    });
    
    for i in 1..5 {
        println!("hi number {} from the main thread!", i);
        thread::sleep(Duration::from_millis(1));
    }
    
    handle.join().unwrap();
}`,
              "concurrency"
            )
          }
        >
          {copiedCode === "concurrency" ? "Copied!" : "Copy"}
        </button>
        <pre>{`use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {} from the spawned thread!", i);
            thread::sleep(Duration::from_millis(1));
        }
    });
    
    for i in 1..5 {
        println!("hi number {} from the main thread!", i);
        thread::sleep(Duration::from_millis(1));
    }
    
    handle.join().unwrap();
}`}</pre>
      </div>
    </div>
  </section>
);

export default ConcurrencySection;