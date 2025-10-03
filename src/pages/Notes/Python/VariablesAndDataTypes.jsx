import React from "react";

const PythonVariablesAndDataTypes = () => {
  return (
  <div className="notes-page" style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#4f46e5" }}>
        Python Variables and Data Types
      </h1>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ color: "#111827" }}>1. Variables</h2>
        <ul>
          <li>No need to declare type explicitly – Python infers it automatically.</li>
          <li>Variable names must start with a letter or underscore, not numbers.</li>
          <li>Variables are dynamically typed (can change type at runtime).</li>
        </ul>
        <pre
          style={{
            background: "#1f2937",
            color: "#f9fafb",
            padding: "1rem",
            borderRadius: "6px",
            overflowX: "auto"
          }}
        >
{`x = 10       # Integer
name = "Ada"  # String
pi = 3.14     # Float
is_valid = True  # Boolean`}
        </pre>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ color: "#111827" }}>2. Data Types</h2>
        <ul>
          <li><b>Numeric:</b> int, float, complex</li>
          <li><b>Sequence:</b> str, list, tuple, range</li>
          <li><b>Mapping:</b> dict</li>
          <li><b>Set Types:</b> set, frozenset</li>
          <li><b>Boolean:</b> bool</li>
          <li><b>Binary Types:</b> bytes, bytearray, memoryview</li>
        </ul>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ color: "#111827" }}>3. Example Code</h2>
        <pre
          style={{
            background: "#1f2937",
            color: "#f9fafb",
            padding: "1rem",
            borderRadius: "6px",
            overflowX: "auto"
          }}
        >
{`# Different data types in Python
a = 42            # int
b = 3.14          # float
c = "Python"      # string
d = [1, 2, 3]     # list
e = (4, 5, 6)     # tuple
f = {"name": "Ada", "age": 25}  # dict
g = {1, 2, 3}     # set`}
        </pre>
      </section>
    </div>
  );
};

export default PythonVariablesAndDataTypes;
