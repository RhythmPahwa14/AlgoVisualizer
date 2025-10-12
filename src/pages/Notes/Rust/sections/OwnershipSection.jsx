import React from "react";

const OwnershipSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-key"></i> Ownership & Borrowing
      </h2>
      <p>
        Ownership is Rust's most unique feature. It enables memory safety without garbage collection
        by tracking how memory is used through a set of rules checked at compile time.
      </p>

      <h3>Ownership Rules</h3>
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
        <strong>The Three Rules of Ownership:</strong>
        <ol style={{ marginTop: "0.5rem", marginBottom: "0" }}>
          <li>Each value in Rust has a variable that's called its <em>owner</em></li>
          <li>There can only be <em>one owner</em> at a time</li>
          <li>When the owner goes out of scope, the value will be <em>dropped</em></li>
        </ol>
      </div>

      <h3>Ownership in Action</h3>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "ownership_basic" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`fn main() {
    // s1 owns the string
    let s1 = String::from("hello");
    
    // s1 is moved to s2, s1 is no longer valid
    let s2 = s1;
    
    println!("{}", s2); // This works
    // println!("{}", s1); // This would cause a compile error!
    
    // For simple types (Copy trait), assignment copies the value
    let x = 5;
    let y = x; // x is copied, both x and y are valid
    println!("x: {}, y: {}", x, y);
}`,
              "ownership_basic"
            )
          }
        >
          {copiedCode === "ownership_basic" ? "Copied!" : "Copy"}
        </button>
        <pre>{`fn main() {
    // s1 owns the string
    let s1 = String::from("hello");
    
    // s1 is moved to s2, s1 is no longer valid
    let s2 = s1;
    
    println!("{}", s2); // This works
    // println!("{}", s1); // This would cause a compile error!
    
    // For simple types (Copy trait), assignment copies the value
    let x = 5;
    let y = x; // x is copied, both x and y are valid
    println!("x: {}, y: {}", x, y);
}`}</pre>
      </div>

      <h3>Functions and Ownership</h3>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "ownership_functions" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`fn main() {
    let s = String::from("hello");
    
    takes_ownership(s); // s is moved into the function
    // s is no longer valid here
    
    let x = 5;
    makes_copy(x); // x is copied, still valid
    println!("x is still valid: {}", x);
    
    // Getting ownership back
    let s1 = String::from("world");
    let s2 = takes_and_gives_back(s1); // s1 is moved, s2 gets ownership
    println!("s2: {}", s2);
}

fn takes_ownership(some_string: String) {
    println!("{}", some_string);
} // some_string goes out of scope and is dropped

fn makes_copy(some_integer: i32) {
    println!("{}", some_integer);
} // some_integer goes out of scope, but nothing special happens

fn takes_and_gives_back(a_string: String) -> String {
    a_string // a_string is returned and moves out to the calling function
}`,
              "ownership_functions"
            )
          }
        >
          {copiedCode === "ownership_functions" ? "Copied!" : "Copy"}
        </button>
        <pre>{`fn main() {
    let s = String::from("hello");
    
    takes_ownership(s); // s is moved into the function
    // s is no longer valid here
    
    let x = 5;
    makes_copy(x); // x is copied, still valid
    println!("x is still valid: {}", x);
    
    // Getting ownership back
    let s1 = String::from("world");
    let s2 = takes_and_gives_back(s1); // s1 is moved, s2 gets ownership
    println!("s2: {}", s2);
}

fn takes_ownership(some_string: String) {
    println!("{}", some_string);
} // some_string goes out of scope and is dropped

fn makes_copy(some_integer: i32) {
    println!("{}", some_integer);
} // some_integer goes out of scope, but nothing special happens

fn takes_and_gives_back(a_string: String) -> String {
    a_string // a_string is returned and moves out to the calling function
}`}</pre>
      </div>

      <h3>References and Borrowing</h3>
      <p>
        References allow you to use a value without taking ownership of it. 
        This is called <em>borrowing</em>.
      </p>
      
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "borrowing" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`fn main() {
    let s1 = String::from("hello");
    
    // Pass a reference to the function
    let len = calculate_length(&s1);
    
    println!("The length of '{}' is {}.", s1, len);
    // s1 is still valid because we only borrowed it
    
    // Mutable references
    let mut s = String::from("hello");
    change(&mut s);
    println!("Changed string: {}", s);
    
    // Multiple immutable references are allowed
    let r1 = &s;
    let r2 = &s;
    println!("r1: {}, r2: {}", r1, r2);
    
    // But you can't have mutable and immutable references at the same time
    // let r3 = &mut s; // This would cause an error if r1 and r2 are still used
}

fn calculate_length(s: &String) -> usize {
    s.len()
} // s goes out of scope, but because it doesn't have ownership, nothing is dropped

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}`,
              "borrowing"
            )
          }
        >
          {copiedCode === "borrowing" ? "Copied!" : "Copy"}
        </button>
        <pre>{`fn main() {
    let s1 = String::from("hello");
    
    // Pass a reference to the function
    let len = calculate_length(&s1);
    
    println!("The length of '{}' is {}.", s1, len);
    // s1 is still valid because we only borrowed it
    
    // Mutable references
    let mut s = String::from("hello");
    change(&mut s);
    println!("Changed string: {}", s);
    
    // Multiple immutable references are allowed
    let r1 = &s;
    let r2 = &s;
    println!("r1: {}, r2: {}", r1, r2);
    
    // But you can't have mutable and immutable references at the same time
    // let r3 = &mut s; // This would cause an error if r1 and r2 are still used
}

fn calculate_length(s: &String) -> usize {
    s.len()
} // s goes out of scope, but because it doesn't have ownership, nothing is dropped

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}`}</pre>
      </div>

      <h3>Borrowing Rules</h3>
      <div
        style={{
          background: "#fef2f2",
          borderLeft: "4px solid #ef4444",
          padding: "1rem 1.5rem",
          margin: "1.5rem 0",
          borderRadius: "0 12px 12px 0",
          color: "#374151",
        }}
      >
        <strong>Borrowing Rules:</strong>
        <ul style={{ marginTop: "0.5rem", marginBottom: "0" }}>
          <li>At any given time, you can have <em>either</em> one mutable reference <em>or</em> any number of immutable references</li>
          <li>References must always be valid (no dangling references)</li>
        </ul>
      </div>

      <h3>Slices</h3>
      <p>Slices let you reference a contiguous sequence of elements rather than the whole collection.</p>
      
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "slices" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`fn main() {
    let s = String::from("hello world");
    
    // String slices
    let hello = &s[0..5];  // or &s[..5]
    let world = &s[6..11]; // or &s[6..]
    let whole = &s[..];    // entire string
    
    println!("hello: {}, world: {}, whole: {}", hello, world, whole);
    
    // Array slices
    let a = [1, 2, 3, 4, 5];
    let slice = &a[1..4]; // [2, 3, 4]
    println!("Array slice: {:?}", slice);
    
    // Function that takes string slice
    let first_word = first_word(&s);
    println!("First word: {}", first_word);
}

fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    
    &s[..]
}`,
              "slices"
            )
          }
        >
          {copiedCode === "slices" ? "Copied!" : "Copy"}
        </button>
        <pre>{`fn main() {
    let s = String::from("hello world");
    
    // String slices
    let hello = &s[0..5];  // or &s[..5]
    let world = &s[6..11]; // or &s[6..]
    let whole = &s[..];    // entire string
    
    println!("hello: {}, world: {}, whole: {}", hello, world, whole);
    
    // Array slices
    let a = [1, 2, 3, 4, 5];
    let slice = &a[1..4]; // [2, 3, 4]
    println!("Array slice: {:?}", slice);
    
    // Function that takes string slice
    let first_word = first_word(&s);
    println!("First word: {}", first_word);
}

fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    
    &s[..]
}`}</pre>
      </div>

      <div
        style={{
          background: "#ecfdf5",
          borderLeft: "4px solid #10b981",
          padding: "1rem 1.5rem",
          margin: "1.5rem 0",
          borderRadius: "0 12px 12px 0",
          color: "#374151",
        }}
      >
        <strong>Key Takeaways:</strong>
        <ul style={{ marginTop: "0.5rem", marginBottom: "0" }}>
          <li>Ownership prevents memory leaks and double-free errors</li>
          <li>Borrowing allows temporary access without transferring ownership</li>
          <li>The borrow checker ensures memory safety at compile time</li>
          <li>Slices provide safe access to portions of collections</li>
        </ul>
      </div>
    </div>
  </section>
);

export default OwnershipSection;