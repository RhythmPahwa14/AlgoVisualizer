import React from "react";

const ControlFlowSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-sitemap"></i> 7. Control Flow Statements
      </h2>
      <p>
        Control flow includes decision making (if, if-else, switch) and loops (for, while, do-while).
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "control_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`public class ControlFlowExample {
    public static void main(String[] args) {
        int score = 85;
        if (score >= 90) {
            System.out.println("A");
        } else if (score >= 80) {
            System.out.println("B");
        } else {
            System.out.println("C");
        }

        int day = 3;
        switch (day) {
            case 1: System.out.println("Mon"); break;
            case 2: System.out.println("Tue"); break;
            case 3: System.out.println("Wed"); break;
            default: System.out.println("Other");
        }

        for (int i = 1; i <= 5; i++) {
            System.out.println("Number: " + i);
        }
    }
}`, "control_code")
          }
        >
          {copiedCode === "control_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`public class ControlFlowExample {
    public static void main(String[] args) {
        int score = 85;
        if (score >= 90) {
            System.out.println("A");
        } else if (score >= 80) {
            System.out.println("B");
        } else {
            System.out.println("C");
        }

        int day = 3;
        switch (day) {
            case 1: System.out.println("Mon"); break;
            case 2: System.out.println("Tue"); break;
            case 3: System.out.println("Wed"); break;
            default: System.out.println("Other");
        }

        for (int i = 1; i <= 5; i++) {
            System.out.println("Number: " + i);
        }
    }
}`}</pre>
      </div>
    </div>
  </section>
);

export default ControlFlowSection;
