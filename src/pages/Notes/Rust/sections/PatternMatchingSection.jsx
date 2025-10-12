import React from "react";

const PatternMatchingSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-search"></i> Pattern Matching
      </h2>
      <p>
        Rust has powerful pattern matching with the <code>match</code> expression.
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "pattern_match" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`fn main() {
    let x = 1;
    
    match x {
        1 => println!("one"),
        2 => println!("two"),
        3 => println!("three"),
        _ => println!("anything"),
    }
    
    // Match with Option
    let some_u8_value = Some(3);
    match some_u8_value {
        Some(3) => println!("three"),
        Some(x) => println!("Some({})", x),
        None => println!("None"),
    }
}`,
              "pattern_match"
            )
          }
        >
          {copiedCode === "pattern_match" ? "Copied!" : "Copy"}
        </button>
        <pre>{`fn main() {
    let x = 1;
    
    match x {
        1 => println!("one"),
        2 => println!("two"),
        3 => println!("three"),
        _ => println!("anything"),
    }
    
    // Match with Option
    let some_u8_value = Some(3);
    match some_u8_value {
        Some(3) => println!("three"),
        Some(x) => println!("Some({})", x),
        None => println!("None"),
    }
}`}</pre>
      </div>
    </div>
  </section>
);

export default PatternMatchingSection;