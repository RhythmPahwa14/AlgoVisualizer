import React from "react";

const MethodsSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-hand-pointer"></i> 8. Methods
      </h2>
      <p>
        Methods (functions inside classes) define reusable behavior. Key points:
        <ul>
          <li>Specify <strong>return type</strong>, <strong>name</strong>, and <strong>parameters</strong>.</li>
          <li>Can be <strong>static</strong> (class-level) or instance-level.</li>
          <li>Java supports <strong>method overloading</strong> (same name, different parameters).</li>
        </ul>
      </p>
      
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "methods_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// MethodsExample.java
public class MethodsExample {

    // Static method
    public static int add(int a, int b) {
        return a + b;
    }

    // Overloaded static method
    public static double add(double a, double b) {
        return a + b;
    }

    // Instance method
    public void greet(String name) {
        System.out.println("Hello, " + name);
    }

    public static void main(String[] args) {
        // Calling static methods
        System.out.println("int sum: " + add(2, 3));
        System.out.println("double sum: " + add(2.5, 3.5));

        // Calling instance method
        MethodsExample m = new MethodsExample();
        m.greet("Java Learner");
    }
}`, "methods_code")
          }
        >
          {copiedCode === "methods_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// MethodsExample.java
public class MethodsExample {

    // Static method
    public static int add(int a, int b) {
        return a + b;
    }

    // Overloaded static method
    public static double add(double a, double b) {
        return a + b;
    }

    // Instance method
    public void greet(String name) {
        System.out.println("Hello, " + name);
    }

    public static void main(String[] args) {
        // Calling static methods
        System.out.println("int sum: " + add(2, 3));
        System.out.println("double sum: " + add(2.5, 3.5));

        // Calling instance method
        MethodsExample m = new MethodsExample();
        m.greet("Java Learner");
    }
}`}</pre>
      </div>
    </div>
  </section>
);

export default MethodsSection;
