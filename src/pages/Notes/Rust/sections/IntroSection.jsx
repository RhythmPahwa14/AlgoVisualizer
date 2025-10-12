import React from "react";

const IntroSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-play-circle"></i> 1. Introduction to Rust
      </h2>
      <p>
        Rust is a systems programming language that focuses on safety, speed, and concurrency.
        It prevents common programming errors like null pointer dereferences, buffer overflows,
        and memory leaks without requiring a garbage collector.
      </p>

      <h3>Key Features</h3>
      <ul>
        <li>
          <strong>Memory Safety:</strong> Prevents segfaults and memory leaks at compile time
        </li>
        <li>
          <strong>Zero-cost Abstractions:</strong> High-level features with no runtime overhead
        </li>
        <li>
          <strong>Ownership System:</strong> Unique approach to memory management
        </li>
        <li>
          <strong>Fearless Concurrency:</strong> Safe concurrent programming
        </li>
        <li>
          <strong>Cross-platform:</strong> Compile to many targets including WebAssembly
        </li>
      </ul>

      <h3>Use Cases</h3>
      <ul>
        <li>System programming (operating systems, embedded systems)</li>
        <li>Web backends and APIs</li>
        <li>Blockchain and cryptocurrency projects</li>
        <li>Game engines and performance-critical applications</li>
        <li>WebAssembly applications</li>
      </ul>

      <div
        style={{
          background: "#fff7ed",
          borderLeft: "4px solid #f97316",
          padding: "1rem 1.5rem",
          margin: "1.5rem 0",
          borderRadius: "0 12px 12px 0",
          color: "#374151",
        }}
      >
        <strong>Note:</strong> Rust was originally developed by Mozilla Research, with the first stable release (1.0) in 2015. 
        It's now maintained by the Rust Foundation and has a thriving open-source community.
      </div>

      <h3>Hello World Example</h3>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "hello_world" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`fn main() {
    println!("Hello, World!");
    println!("Welcome to Rust programming!");
}`,
              "hello_world"
            )
          }
        >
          {copiedCode === "hello_world" ? "Copied!" : "Copy"}
        </button>
        <pre>{`fn main() {
    println!("Hello, World!");
    println!("Welcome to Rust programming!");
}`}</pre>
      </div>
    </div>
  </section>
);

export default IntroSection;