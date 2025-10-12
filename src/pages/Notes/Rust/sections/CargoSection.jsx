import React from "react";

const CargoSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-box"></i> Cargo - Rust's Package Manager
      </h2>
      <p>
        Cargo is Rust's build system and package manager. It handles building code, downloading dependencies, and more.
      </p>

      <h3>Common Cargo Commands</h3>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "cargo_commands" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`# Create a new project
cargo new my_project
cd my_project

# Build the project
cargo build

# Build and run
cargo run

# Check if code compiles (faster than build)
cargo check

# Build optimized version for release
cargo build --release

# Run tests
cargo test

# Generate documentation
cargo doc --open

# Update dependencies
cargo update`,
              "cargo_commands"
            )
          }
        >
          {copiedCode === "cargo_commands" ? "Copied!" : "Copy"}
        </button>
        <pre>{`# Create a new project
cargo new my_project
cd my_project

# Build the project
cargo build

# Build and run
cargo run

# Check if code compiles (faster than build)
cargo check

# Build optimized version for release
cargo build --release

# Run tests
cargo test

# Generate documentation
cargo doc --open

# Update dependencies
cargo update`}</pre>
      </div>

      <h3>Cargo.toml Configuration</h3>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "cargo_toml" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`[package]
name = "my_project"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = "1.0"
tokio = { version = "1.0", features = ["full"] }
rand = "0.8"

[dev-dependencies]
criterion = "0.3"

[[bin]]
name = "my_binary"
path = "src/bin/my_binary.rs"`,
              "cargo_toml"
            )
          }
        >
          {copiedCode === "cargo_toml" ? "Copied!" : "Copy"}
        </button>
        <pre>{`[package]
name = "my_project"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = "1.0"
tokio = { version = "1.0", features = ["full"] }
rand = "0.8"

[dev-dependencies]
criterion = "0.3"

[[bin]]
name = "my_binary"
path = "src/bin/my_binary.rs"`}</pre>
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
        <strong>Cargo Features:</strong>
        <ul style={{ marginTop: "0.5rem", marginBottom: "0" }}>
          <li>Dependency management with semantic versioning</li>
          <li>Built-in testing framework</li>
          <li>Documentation generation</li>
          <li>Workspace support for multi-package projects</li>
          <li>Integration with crates.io (Rust package registry)</li>
        </ul>
      </div>
    </div>
  </section>
);

export default CargoSection;