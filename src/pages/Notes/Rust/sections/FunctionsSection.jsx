import React from "react";

const FunctionsSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-function"></i> Functions
      </h2>
      <p>
        Functions are prevalent in Rust code. The <code>main</code> function is the entry point of many programs.
        The <code>fn</code> keyword allows you to declare new functions.
      </p>

      <h3>Basic Function Syntax</h3>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "basic_functions" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`fn main() {
    println!("Hello, world!");
    
    another_function();
    function_with_parameter(5);
    print_labeled_measurement(5, 'h');
}

fn another_function() {
    println!("Another function.");
}

fn function_with_parameter(x: i32) {
    println!("The value of x is: {}", x);
}

fn print_labeled_measurement(value: i32, unit_label: char) {
    println!("The measurement is: {}{}", value, unit_label);
}`,
              "basic_functions"
            )
          }
        >
          {copiedCode === "basic_functions" ? "Copied!" : "Copy"}
        </button>
        <pre>{`fn main() {
    println!("Hello, world!");
    
    another_function();
    function_with_parameter(5);
    print_labeled_measurement(5, 'h');
}

fn another_function() {
    println!("Another function.");
}

fn function_with_parameter(x: i32) {
    println!("The value of x is: {}", x);
}

fn print_labeled_measurement(value: i32, unit_label: char) {
    println!("The measurement is: {}{}", value, unit_label);
}`}</pre>
      </div>

      <h3>Functions with Return Values</h3>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "return_functions" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`fn main() {
    let x = five();
    println!("The value of x is: {}", x);
    
    let x = plus_one(5);
    println!("The value of x is: {}", x);
}

fn five() -> i32 {
    5  // No semicolon means this is the return value
}

fn plus_one(x: i32) -> i32 {
    x + 1  // Expression without semicolon
}

// This would cause an error:
// fn plus_one_wrong(x: i32) -> i32 {
//     x + 1;  // Semicolon makes this a statement, not an expression
// }`,
              "return_functions"
            )
          }
        >
          {copiedCode === "return_functions" ? "Copied!" : "Copy"}
        </button>
        <pre>{`fn main() {
    let x = five();
    println!("The value of x is: {}", x);
    
    let x = plus_one(5);
    println!("The value of x is: {}", x);
}

fn five() -> i32 {
    5  // No semicolon means this is the return value
}

fn plus_one(x: i32) -> i32 {
    x + 1  // Expression without semicolon
}

// This would cause an error:
// fn plus_one_wrong(x: i32) -> i32 {
//     x + 1;  // Semicolon makes this a statement, not an expression
// }`}</pre>
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
          <li>Function parameters must have type annotations</li>
          <li>Return type is specified after <code>-&gt;</code></li>
          <li>Functions return the last expression (no semicolon)</li>
          <li>Use <code>return</code> keyword for early returns</li>
        </ul>
      </div>
    </div>
  </section>
);

export default FunctionsSection;