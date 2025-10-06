import React from "react";

const SyntaxSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-code"></i> 3. Java Syntax Overview
      </h2>
      <p>
        Java syntax is similar to the C/C++ family: semicolons terminate statements, curly braces group blocks, and classes are the primary structural unit.
      </p>

      <h3>Basic Program Structure</h3>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "syntax_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// File: Greeter.java
public class Greeter {
    public static void greet(String name) {
        System.out.println("Hello, " + name);
    }

    public static void main(String[] args) {
        greet("World");
    }
}`, "syntax_code")
          }
        >
          {copiedCode === "syntax_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// File: Greeter.java
public class Greeter {
    public static void greet(String name) {
        System.out.println("Hello, " + name);
    }

    public static void main(String[] args) {
        greet("World");
    }
}`}</pre>
      </div>
    </div>
  </section>
);

export default SyntaxSection;
