import React from "react";

const ControlFlowSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-code-branch"></i> Control Flow
      </h2>

      <h3>If Expressions</h3>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "if_expressions" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`fn main() {
    let number = 6;
    
    if number % 4 == 0 {
        println!("number is divisible by 4");
    } else if number % 3 == 0 {
        println!("number is divisible by 3");
    } else if number % 2 == 0 {
        println!("number is divisible by 2");
    } else {
        println!("number is not divisible by 4, 3, or 2");
    }
    
    // if is an expression, so it returns a value
    let condition = true;
    let number = if condition { 5 } else { 6 };
    println!("The value of number is: {}", number);
}`,
              "if_expressions"
            )
          }
        >
          {copiedCode === "if_expressions" ? "Copied!" : "Copy"}
        </button>
        <pre>{`fn main() {
    let number = 6;
    
    if number % 4 == 0 {
        println!("number is divisible by 4");
    } else if number % 3 == 0 {
        println!("number is divisible by 3");
    } else if number % 2 == 0 {
        println!("number is divisible by 2");
    } else {
        println!("number is not divisible by 4, 3, or 2");
    }
    
    // if is an expression, so it returns a value
    let condition = true;
    let number = if condition { 5 } else { 6 };
    println!("The value of number is: {}", number);
}`}</pre>
      </div>

      <h3>Loops</h3>
      <h4>loop</h4>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "loop_basic" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`fn main() {
    let mut counter = 0;
    
    let result = loop {
        counter += 1;
        
        if counter == 10 {
            break counter * 2; // Return value from loop
        }
    };
    
    println!("The result is {}", result);
}`,
              "loop_basic"
            )
          }
        >
          {copiedCode === "loop_basic" ? "Copied!" : "Copy"}
        </button>
        <pre>{`fn main() {
    let mut counter = 0;
    
    let result = loop {
        counter += 1;
        
        if counter == 10 {
            break counter * 2; // Return value from loop
        }
    };
    
    println!("The result is {}", result);
}`}</pre>
      </div>

      <h4>while</h4>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "while_loop" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`fn main() {
    let mut number = 3;
    
    while number != 0 {
        println!("{}!", number);
        number -= 1;
    }
    
    println!("LIFTOFF!!!");
}`,
              "while_loop"
            )
          }
        >
          {copiedCode === "while_loop" ? "Copied!" : "Copy"}
        </button>
        <pre>{`fn main() {
    let mut number = 3;
    
    while number != 0 {
        println!("{}!", number);
        number -= 1;
    }
    
    println!("LIFTOFF!!!");
}`}</pre>
      </div>

      <h4>for</h4>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "for_loop" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`fn main() {
    let a = [10, 20, 30, 40, 50];
    
    // Iterating over array elements
    for element in a.iter() {
        println!("the value is: {}", element);
    }
    
    // Using ranges
    for number in (1..4).rev() {
        println!("{}!", number);
    }
    println!("LIFTOFF!!!");
    
    // Iterating with index
    for (index, value) in a.iter().enumerate() {
        println!("Index: {}, Value: {}", index, value);
    }
}`,
              "for_loop"
            )
          }
        >
          {copiedCode === "for_loop" ? "Copied!" : "Copy"}
        </button>
        <pre>{`fn main() {
    let a = [10, 20, 30, 40, 50];
    
    // Iterating over array elements
    for element in a.iter() {
        println!("the value is: {}", element);
    }
    
    // Using ranges
    for number in (1..4).rev() {
        println!("{}!", number);
    }
    println!("LIFTOFF!!!");
    
    // Iterating with index
    for (index, value) in a.iter().enumerate() {
        println!("Index: {}, Value: {}", index, value);
    }
}`}</pre>
      </div>
    </div>
  </section>
);

export default ControlFlowSection;