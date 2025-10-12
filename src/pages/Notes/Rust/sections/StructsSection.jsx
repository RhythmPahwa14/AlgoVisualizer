import React from "react";

const StructsSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-building"></i> Structs
      </h2>
      <p>
        Structs are custom data types that let you name and package together multiple related values.
      </p>

      <h3>Defining and Instantiating Structs</h3>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "basic_struct" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn main() {
    let user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };
    
    println!("User email: {}", user1.email);
}`,
              "basic_struct"
            )
          }
        >
          {copiedCode === "basic_struct" ? "Copied!" : "Copy"}
        </button>
        <pre>{`struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn main() {
    let user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };
    
    println!("User email: {}", user1.email);
}`}</pre>
      </div>

      <h3>Methods</h3>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "struct_methods" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
    
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
    
    // Associated function (like static method)
    fn square(size: u32) -> Rectangle {
        Rectangle {
            width: size,
            height: size,
        }
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };
    
    println!("rect1 is {:?}", rect1);
    println!("The area of the rectangle is {} square pixels.", rect1.area());
    
    let sq = Rectangle::square(3);
    println!("Square: {:?}", sq);
}`,
              "struct_methods"
            )
          }
        >
          {copiedCode === "struct_methods" ? "Copied!" : "Copy"}
        </button>
        <pre>{`#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
    
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
    
    // Associated function (like static method)
    fn square(size: u32) -> Rectangle {
        Rectangle {
            width: size,
            height: size,
        }
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };
    
    println!("rect1 is {:?}", rect1);
    println!("The area of the rectangle is {} square pixels.", rect1.area());
    
    let sq = Rectangle::square(3);
    println!("Square: {:?}", sq);
}`}</pre>
      </div>
    </div>
  </section>
);

export default StructsSection;