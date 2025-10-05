import React from "react";

const DataTypesSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-database"></i> 4. Data Types in Java
      </h2>
      <p>
        Java has primitive types (byte, short, int, long, float, double, char, boolean) and reference types (String, arrays, classes).
      </p>

      <h3>Primitive Data Types Table</h3>
      <div style={{ overflowX: "auto", margin: "1rem 0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#eef2ff" }}>
              <th style={{ padding: 8 }}>Type</th>
              <th style={{ padding: 8 }}>Size</th>
              <th style={{ padding: 8 }}>Default</th>
              <th style={{ padding: 8 }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["byte", "8 bits", "0", "Small integer"],
              ["short", "16 bits", "0", "Medium integer"],
              ["int", "32 bits", "0", "Common integer"],
              ["long", "64 bits", "0L", "Large integer"],
              ["float", "32 bits", "0.0f", "Single precision"],
              ["double", "64 bits", "0.0d", "Double precision"],
              ["char", "16 bits", "'\\u0000'", "UTF-16 character"],
              ["boolean", "1 bit", "false", "true/false"],
            ].map((r) => (
              <tr key={r[0]}>
                <td style={{ padding: 8 }}>{r[0]}</td>
                <td style={{ padding: 8 }}>{r[1]}</td>
                <td style={{ padding: 8 }}>{r[2]}</td>
                <td style={{ padding: 8 }}>{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "datatypes_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`public class DataTypesExample {
    public static void main(String[] args) {
        int i = 42;
        double d = 3.14;
        char c = 'J';
        boolean flag = true;
        String s = "Java";
        System.out.println(i + ", " + d + ", " + c + ", " + flag + ", " + s);
    }
}`, "datatypes_code")
          }
        >
          {copiedCode === "datatypes_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`public class DataTypesExample {
    public static void main(String[] args) {
        int i = 42;
        double d = 3.14;
        char c = 'J';
        boolean flag = true;
        String s = "Java";
        System.out.println(i + ", " + d + ", " + c + ", " + flag + ", " + s);
    }
}`}</pre>
      </div>
    </div>
  </section>
);

export default DataTypesSection;
