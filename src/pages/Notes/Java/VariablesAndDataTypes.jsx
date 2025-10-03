// src/pages/Notes/Java/VariablesAndDataTypes.jsx
import React from "react";

const VariablesAndDataTypes = () => {
  return (
  <div className="notes-page" style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#4f46e5" }}>
        Variables & Data Types in Java
      </h1>

      {/* 1. Variables */}
      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ color: "#111827" }}>1. Variables</h2>
        <ul>
          <li><b>Local Variables:</b> Declared inside methods, only accessible within that method.</li>
          <li><b>Instance Variables:</b> Declared inside a class but outside methods, belong to objects.</li>
          <li><b>Static Variables:</b> Declared with <code>static</code> keyword, shared across all instances.</li>
        </ul>
      </section>

      {/* 2. Data Types */}
      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ color: "#111827" }}>2. Data Types</h2>
        <ul>
          <li><b>Primitive Types:</b> byte, short, int, long, float, double, char, boolean</li>
          <li><b>Non-Primitive Types:</b> String, Arrays, Classes, Objects</li>
        </ul>
      </section>

      {/* 3. Example */}
      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ color: "#111827" }}>3. Example</h2>
        <pre
          style={{
            background: "#1f2937",
            color: "#f9fafb",
            padding: "1rem",
            borderRadius: "6px",
            overflowX: "auto"
          }}
        >
{`public class VariablesExample {
    static int staticVar = 10;

    int instanceVar;

    public void demo() {
        int localVar = 5;
        System.out.println("Local: " + localVar);
        System.out.println("Instance: " + instanceVar);
        System.out.println("Static: " + staticVar);
    }
}`}
        </pre>
      </section>
    </div>
  );
};

export default VariablesAndDataTypes;
