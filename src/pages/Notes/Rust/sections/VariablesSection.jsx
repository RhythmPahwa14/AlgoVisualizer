import React from "react";

const VariablesSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-cube"></i> Variables and Mutability
      </h2>
      <p>
        In Rust, variables are immutable by default. This is one of many ways Rust encourages
        you to write code that takes advantage of the safety and easy concurrency that Rust offers.
      </p>

      <h3>Immutable Variables</h3>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "immutable" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`fn main() {
    let x = 5;
    println!("The value of x is: {}", x);
    
    // x = 6; // This would cause a compile error!
    // error[E0384]: cannot assign twice to immutable variable \`x\`
}`,
              "immutable"
            )
          }
        >
          {copiedCode === "immutable" ? "Copied!" : "Copy"}
        </button>
        <pre>{`fn main() {
    let x = 5;
    println!("The value of x is: {}", x);
    
    // x = 6; // This would cause a compile error!
    // error[E0384]: cannot assign twice to immutable variable \`x\`
}`}</pre>
      </div>

      <h3>Mutable Variables</h3>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "mutable" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`fn main() {
    let mut x = 5;
    println!("The value of x is: {}", x);
    
    x = 6; // This is allowed because x is mutable
    println!("The value of x is: {}", x);
}`,
              "mutable"
            )
          }
        >
          {copiedCode === "mutable" ? "Copied!" : "Copy"}
        </button>
        <pre>{`fn main() {
    let mut x = 5;
    println!("The value of x is: {}", x);
    
    x = 6; // This is allowed because x is mutable
    println!("The value of x is: {}", x);
}`}</pre>
      </div>

      <h3>Constants</h3>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "constants" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;

fn main() {
    println!("Three hours in seconds: {}", THREE_HOURS_IN_SECONDS);
    
    // Constants are always immutable and must have type annotations
    const MAX_POINTS: u32 = 100_000;
    println!("Max points: {}", MAX_POINTS);
}`,
              "constants"
            )
          }
        >
          {copiedCode === "constants" ? "Copied!" : "Copy"}
        </button>
        <pre>{`const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;

fn main() {
    println!("Three hours in seconds: {}", THREE_HOURS_IN_SECONDS);
    
    // Constants are always immutable and must have type annotations
    const MAX_POINTS: u32 = 100_000;
    println!("Max points: {}", MAX_POINTS);
}`}</pre>
      </div>

      <h3>Shadowing</h3>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "shadowing" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`fn main() {
    let x = 5;
    let x = x + 1; // Shadowing: creates a new variable
    
    {
        let x = x * 2; // Shadowing in inner scope
        println!("The value of x in the inner scope is: {}", x);
    }
    
    println!("The value of x is: {}", x);
    
    // Shadowing allows changing the type
    let spaces = "   ";
    let spaces = spaces.len(); // Now spaces is a number
    println!("Number of spaces: {}", spaces);
}`,
              "shadowing"
            )
          }
        >
          {copiedCode === "shadowing" ? "Copied!" : "Copy"}
        </button>
        <pre>{`fn main() {
    let x = 5;
    let x = x + 1; // Shadowing: creates a new variable
    
    {
        let x = x * 2; // Shadowing in inner scope
        println!("The value of x in the inner scope is: {}", x);
    }
    
    println!("The value of x is: {}", x);
    
    // Shadowing allows changing the type
    let spaces = "   ";
    let spaces = spaces.len(); // Now spaces is a number
    println!("Number of spaces: {}", spaces);
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
        <strong>Key Differences:</strong>
        <ul style={{ marginTop: "0.5rem", marginBottom: "0" }}>
          <li><strong>Variables vs Constants:</strong> Constants are always immutable and must be type annotated</li>
          <li><strong>Mutability vs Shadowing:</strong> <code>mut</code> allows changing values, shadowing creates new variables</li>
          <li><strong>Shadowing benefits:</strong> Can change type and create new variable with same name</li>
        </ul>
      </div>
    </div>
  </section>
);

export default VariablesSection;