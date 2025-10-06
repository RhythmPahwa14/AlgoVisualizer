import React from "react";

const SetupSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-cogs"></i> 2. Setting Up Java Development Environment
      </h2>

      <h3>Install JDK</h3>
      <p>
        Download and install the latest OpenJDK or Oracle JDK (LTS recommended
        for stability). Verify installation with:{" "}
        <code style={{ marginLeft: 8 }}>java -version</code>
      </p>

      <h3>IDE Recommendations</h3>
      <ul>
        <li>IntelliJ IDEA — excellent Java support</li>
        <li>Eclipse — mature and extensible</li>
        <li>VS Code — lightweight with Java extensions</li>
      </ul>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "setup_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
        System.out.println("Java Version: " + System.getProperty("java.version"));
    }
}`,
              "setup_code"
            )
          }
        >
          {copiedCode === "setup_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
        System.out.println("Java Version: " + System.getProperty("java.version"));
    }
}`}</pre>
      </div>
    </div>
  </section>
);

export default SetupSection;
