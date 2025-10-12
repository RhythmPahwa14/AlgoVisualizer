import React from "react";

const SyntaxSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-code"></i> 3. Rust Syntax Basics
      </h2>

      <h3>Comments</h3>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "comments" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// Single line comment

/* 
   Multi-line comment
   can span multiple lines
*/

/// Documentation comment for the following item
/// These are used to generate documentation
fn documented_function() {}

//! Documentation comment for the enclosing item
//! Usually used at the top of modules`,
              "comments"
            )
          }
        >
          {copiedCode === "comments" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// Single line comment

/* 
   Multi-line comment
   can span multiple lines
*/

/// Documentation comment for the following item
/// These are used to generate documentation
fn documented_function() {}

//! Documentation comment for the enclosing item
//! Usually used at the top of modules`}</pre>
      </div>

      <h3>Variables and Mutability</h3>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "variables" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`fn main() {
    // Immutable by default
    let x = 5;
    println!("x = {}", x);
    
    // Mutable variable
    let mut y = 10;
    println!("y = {}", y);
    y = 15;
    println!("y = {}", y);
    
    // Constants (always immutable)
    const MAX_POINTS: u32 = 100_000;
    println!("MAX_POINTS = {}", MAX_POINTS);
    
    // Shadowing
    let z = 5;
    let z = z + 1;  // This creates a new variable
    println!("z = {}", z);
}`,
              "variables"
            )
          }
        >
          {copiedCode === "variables" ? "Copied!" : "Copy"}
        </button>
        <pre>{`fn main() {
    // Immutable by default
    let x = 5;
    println!("x = {}", x);
    
    // Mutable variable
    let mut y = 10;
    println!("y = {}", y);
    y = 15;
    println!("y = {}", y);
    
    // Constants (always immutable)
    const MAX_POINTS: u32 = 100_000;
    println!("MAX_POINTS = {}", MAX_POINTS);
    
    // Shadowing
    let z = 5;
    let z = z + 1;  // This creates a new variable
    println!("z = {}", z);
}`}</pre>
      </div>

      <h3>Functions</h3>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "functions" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`fn main() {
    println!("Hello from main!");
    
    greet("Alice");
    let result = add(5, 3);
    println!("5 + 3 = {}", result);
    
    let (sum, product) = calculate(4, 6);
    println!("Sum: {}, Product: {}", sum, product);
}

// Function with parameters
fn greet(name: &str) {
    println!("Hello, {}!", name);
}

// Function with return value
fn add(a: i32, b: i32) -> i32 {
    a + b  // No semicolon = return value
}

// Function returning multiple values (tuple)
fn calculate(x: i32, y: i32) -> (i32, i32) {
    (x + y, x * y)
}`,
              "functions"
            )
          }
        >
          {copiedCode === "functions" ? "Copied!" : "Copy"}
        </button>
        <pre>{`fn main() {
    println!("Hello from main!");
    
    greet("Alice");
    let result = add(5, 3);
    println!("5 + 3 = {}", result);
    
    let (sum, product) = calculate(4, 6);
    println!("Sum: {}, Product: {}", sum, product);
}

// Function with parameters
fn greet(name: &str) {
    println!("Hello, {}!", name);
}

// Function with return value
fn add(a: i32, b: i32) -> i32 {
    a + b  // No semicolon = return value
}

// Function returning multiple values (tuple)
fn calculate(x: i32, y: i32) -> (i32, i32) {
    (x + y, x * y)
}`}</pre>
      </div>

      <h3>Macros</h3>
      <p>Rust has powerful macro system. The most common ones you'll see:</p>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "macros" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`fn main() {
    // println! macro for formatted output
    println!("Hello, {}!", "World");
    println!("Number: {}, Float: {:.2}", 42, 3.14159);
    
    // vec! macro for creating vectors
    let numbers = vec![1, 2, 3, 4, 5];
    println!("Numbers: {:?}", numbers);
    
    // panic! macro for unrecoverable errors
    // panic!("Something went wrong!");
    
    // format! macro for creating formatted strings
    let message = format!("Hello, {}!", "Rust");
    println!("{}", message);
}`,
              "macros"
            )
          }
        >
          {copiedCode === "macros" ? "Copied!" : "Copy"}
        </button>
        <pre>{`fn main() {
    // println! macro for formatted output
    println!("Hello, {}!", "World");
    println!("Number: {}, Float: {:.2}", 42, 3.14159);
    
    // vec! macro for creating vectors
    let numbers = vec![1, 2, 3, 4, 5];
    println!("Numbers: {:?}", numbers);
    
    // panic! macro for unrecoverable errors
    // panic!("Something went wrong!");
    
    // format! macro for creating formatted strings
    let message = format!("Hello, {}!", "Rust");
    println!("{}", message);
}`}</pre>
      </div>

      <div
        style={{
          background: "#fef3c7",
          borderLeft: "4px solid #f59e0b",
          padding: "1rem 1.5rem",
          margin: "1.5rem 0",
          borderRadius: "0 12px 12px 0",
          color: "#374151",
        }}
      >
        <strong>Key Points:</strong>
        <ul style={{ marginTop: "0.5rem", marginBottom: "0" }}>
          <li>Variables are immutable by default - use <code>mut</code> for mutability</li>
          <li>Functions use <code>snake_case</code> naming convention</li>
          <li>Macros end with <code>!</code> and are expanded at compile time</li>
          <li>The last expression in a function is the return value (no semicolon)</li>
        </ul>
      </div>
    </div>
  </section>
);

export default SyntaxSection;