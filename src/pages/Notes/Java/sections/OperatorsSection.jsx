import React from "react";

const OperatorsSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-calculator"></i> 6. Operators
      </h2>
      <p>
        Java supports arithmetic, relational, logical, bitwise, assignment, and ternary operators.
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "operators_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`public class OperatorsExample {
    public static void main(String[] args) {
        int a = 10, b = 3;
        System.out.println(a + b); // 13
        System.out.println(a - b); // 7
        System.out.println(a * b); // 30
        System.out.println(a / b); // 3
        System.out.println(a % b); // 1
        System.out.println(a > b && b > 0); // true
        System.out.println(a == 10 ? "ten" : "not ten"); // ten
    }
}`, "operators_code")
          }
        >
          {copiedCode === "operators_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`public class OperatorsExample {
    public static void main(String[] args) {
        int a = 10, b = 3;
        System.out.println(a + b); // 13
        System.out.println(a - b); // 7
        System.out.println(a * b); // 30
        System.out.println(a / b); // 3
        System.out.println(a % b); // 1
        System.out.println(a > b && b > 0); // true
        System.out.println(a == 10 ? "ten" : "not ten"); // ten
    }
}`}</pre>
      </div>
    </div>
  </section>
);

export default OperatorsSection;
