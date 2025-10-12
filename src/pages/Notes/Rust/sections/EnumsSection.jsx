import React from "react";

const EnumsSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-list"></i> Enums
      </h2>
      <p>
        Enums allow you to define a type by enumerating its possible variants.
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "basic_enum" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`#[derive(Debug)]
enum IpAddrKind {
    V4,
    V6,
}

#[derive(Debug)]
enum IpAddr {
    V4(u8, u8, u8, u8),
    V6(String),
}

fn main() {
    let four = IpAddrKind::V4;
    let six = IpAddrKind::V6;
    
    let home = IpAddr::V4(127, 0, 0, 1);
    let loopback = IpAddr::V6(String::from("::1"));
    
    println!("{:?} {:?}", home, loopback);
}`,
              "basic_enum"
            )
          }
        >
          {copiedCode === "basic_enum" ? "Copied!" : "Copy"}
        </button>
        <pre>{`#[derive(Debug)]
enum IpAddrKind {
    V4,
    V6,
}

#[derive(Debug)]
enum IpAddr {
    V4(u8, u8, u8, u8),
    V6(String),
}

fn main() {
    let four = IpAddrKind::V4;
    let six = IpAddrKind::V6;
    
    let home = IpAddr::V4(127, 0, 0, 1);
    let loopback = IpAddr::V6(String::from("::1"));
    
    println!("{:?} {:?}", home, loopback);
}`}</pre>
      </div>
    </div>
  </section>
);

export default EnumsSection;