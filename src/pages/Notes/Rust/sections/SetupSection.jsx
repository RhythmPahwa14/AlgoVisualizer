import React from "react";

const SetupSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-cogs"></i> 2. Setting Up Rust Development Environment
      </h2>

      <h3>Install Rust</h3>
      <p>
        The recommended way to install Rust is through <code>rustup</code>, the Rust toolchain installer.
        Visit <a href="https://rustup.rs/" target="_blank" rel="noopener noreferrer" style={{color: "#f97316"}}>rustup.rs</a> or run:
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "install_rust" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
              `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`,
              "install_rust"
            )
          }
        >
          {copiedCode === "install_rust" ? "Copied!" : "Copy"}
        </button>
        <pre>{`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`}</pre>
      </div>

      <p>After installation, verify with:</p>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "verify_rust" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`rustc --version
cargo --version`,
              "verify_rust"
            )
          }
        >
          {copiedCode === "verify_rust" ? "Copied!" : "Copy"}
        </button>
        <pre>{`rustc --version
cargo --version`}</pre>
      </div>

      <h3>IDE Recommendations</h3>
      <ul>
        <li><strong>VS Code</strong> — with rust-analyzer extension</li>
        <li><strong>IntelliJ IDEA</strong> — with Rust plugin</li>
        <li><strong>Vim/Neovim</strong> — with rust.vim and coc-rust-analyzer</li>
        <li><strong>Emacs</strong> — with rust-mode and lsp-mode</li>
      </ul>

      <h3>Create Your First Project</h3>
      <p>Use Cargo (Rust's build system and package manager) to create a new project:</p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "new_project" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`cargo new hello_rust
cd hello_rust
cargo run`,
              "new_project"
            )
          }
        >
          {copiedCode === "new_project" ? "Copied!" : "Copy"}
        </button>
        <pre>{`cargo new hello_rust
cd hello_rust
cargo run`}</pre>
      </div>

      <h3>Project Structure</h3>
      <div className="code-container">
        <pre>{`hello_rust/
├── Cargo.toml    # Project metadata and dependencies
└── src/
    └── main.rs   # Main source file`}</pre>
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
        <strong>Tip:</strong> Cargo handles compilation, dependency management, testing, and documentation generation. 
        It's one of Rust's most loved features!
      </div>
    </div>
  </section>
);

export default SetupSection;