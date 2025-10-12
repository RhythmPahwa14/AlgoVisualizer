import React from "react";

const CollectionsSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-layer-group"></i> Collections
      </h2>
      <p>
        Rust's standard library includes useful data structures called collections.
      </p>

      <h3>Vectors</h3>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "vectors" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`fn main() {
    // Creating vectors
    let mut v: Vec<i32> = Vec::new();
    v.push(5);
    v.push(6);
    v.push(7);
    v.push(8);
    
    // Using vec! macro
    let v2 = vec![1, 2, 3, 4, 5];
    
    // Reading elements
    let third: &i32 = &v2[2];
    println!("The third element is {}", third);
    
    match v2.get(2) {
        Some(third) => println!("The third element is {}", third),
        None => println!("There is no third element."),
    }
    
    // Iterating
    for i in &v2 {
        println!("{}", i);
    }
}`,
              "vectors"
            )
          }
        >
          {copiedCode === "vectors" ? "Copied!" : "Copy"}
        </button>
        <pre>{`fn main() {
    // Creating vectors
    let mut v: Vec<i32> = Vec::new();
    v.push(5);
    v.push(6);
    v.push(7);
    v.push(8);
    
    // Using vec! macro
    let v2 = vec![1, 2, 3, 4, 5];
    
    // Reading elements
    let third: &i32 = &v2[2];
    println!("The third element is {}", third);
    
    match v2.get(2) {
        Some(third) => println!("The third element is {}", third),
        None => println!("There is no third element."),
    }
    
    // Iterating
    for i in &v2 {
        println!("{}", i);
    }
}`}</pre>
      </div>

      <h3>Hash Maps</h3>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "hashmaps" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();
    
    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);
    
    let team_name = String::from("Blue");
    let score = scores.get(&team_name);
    
    match score {
        Some(s) => println!("Score: {}", s),
        None => println!("Team not found"),
    }
    
    // Iterating
    for (key, value) in &scores {
        println!("{}: {}", key, value);
    }
}`,
              "hashmaps"
            )
          }
        >
          {copiedCode === "hashmaps" ? "Copied!" : "Copy"}
        </button>
        <pre>{`use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();
    
    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);
    
    let team_name = String::from("Blue");
    let score = scores.get(&team_name);
    
    match score {
        Some(s) => println!("Score: {}", s),
        None => println!("Team not found"),
    }
    
    // Iterating
    for (key, value) in &scores {
        println!("{}: {}", key, value);
    }
}`}</pre>
      </div>
    </div>
  </section>
);

export default CollectionsSection;