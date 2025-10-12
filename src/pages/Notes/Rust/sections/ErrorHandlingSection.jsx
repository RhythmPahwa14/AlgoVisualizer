import React from "react";

const ErrorHandlingSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-exclamation-triangle"></i> Error Handling
      </h2>
      <p>
        Rust groups errors into two major categories: recoverable and unrecoverable errors.
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "error_handling" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`use std::fs::File;
use std::io::ErrorKind;

fn main() {
    // Result<T, E> for recoverable errors
    let f = File::open("hello.txt");
    
    let f = match f {
        Ok(file) => file,
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(e) => panic!("Problem creating the file: {:?}", e),
            },
            other_error => {
                panic!("Problem opening the file: {:?}", other_error)
            }
        },
    };
    
    // Using unwrap_or_else
    let f = File::open("hello.txt").unwrap_or_else(|error| {
        if error.kind() == ErrorKind::NotFound {
            File::create("hello.txt").unwrap_or_else(|error| {
                panic!("Problem creating the file: {:?}", error);
            })
        } else {
            panic!("Problem opening the file: {:?}", error);
        }
    });
}`,
              "error_handling"
            )
          }
        >
          {copiedCode === "error_handling" ? "Copied!" : "Copy"}
        </button>
        <pre>{`use std::fs::File;
use std::io::ErrorKind;

fn main() {
    // Result<T, E> for recoverable errors
    let f = File::open("hello.txt");
    
    let f = match f {
        Ok(file) => file,
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(e) => panic!("Problem creating the file: {:?}", e),
            },
            other_error => {
                panic!("Problem opening the file: {:?}", other_error)
            }
        },
    };
    
    // Using unwrap_or_else
    let f = File::open("hello.txt").unwrap_or_else(|error| {
        if error.kind() == ErrorKind::NotFound {
            File::create("hello.txt").unwrap_or_else(|error| {
                panic!("Problem creating the file: {:?}", error);
            })
        } else {
            panic!("Problem opening the file: {:?}", error);
        }
    });
}`}</pre>
      </div>
    </div>
  </section>
);

export default ErrorHandlingSection;