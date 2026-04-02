import React, { useState } from "react";

const CppVariablesAndDataTypes = () => {
  const [copiedCode, setCopiedCode] = useState("");

  const copyCode = async (code, identifier) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(identifier);
      setTimeout(() => setCopiedCode(""), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="notes-page" style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#4f46e5" }}>
        C++ Variables and Data Types
      </h1>

      <section style={{ marginBottom: "1.5rem" }}>
        <div className="card">
          <h2><i className="fas fa-tag"></i> 1. Variables</h2>
          <ul>
            <li>Variables must be declared with a data type before use.</li>
            <li>Variable names must start with a letter or underscore, not numbers.</li>
            <li>Variables are statically typed (type cannot change at runtime).</li>
            <li>Variables can be declared anywhere in the code (unlike C).</li>
          </ul>
          <div className="code-container">
            <button className={`copy-btn ${copiedCode === "variables" ? "copied" : ""}`} onClick={() => copyCode(`#include <iostream>
using namespace std;

int main() {
    int x = 10;        // Integer
    string name = "Ada"; // String
    double pi = 3.14;   // Double precision float
    bool is_valid = true; // Boolean

    cout << "x: " << x << endl;
    cout << "name: " << name << endl;
    cout << "pi: " << pi << endl;
    cout << "is_valid: " << is_valid << endl;

    return 0;
}`, "variables")}>
              {copiedCode === "variables" ? "Copied!" : "Copy"}
            </button>
            <pre>{`#include <iostream>
using namespace std;

int main() {
    int x = 10;        // Integer
    string name = "Ada"; // String
    double pi = 3.14;   // Double precision float
    bool is_valid = true; // Boolean

    cout << "x: " << x << endl;
    cout << "name: " << name << endl;
    cout << "pi: " << pi << endl;
    cout << "is_valid: " << is_valid << endl;

    return 0;
}`}</pre>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <div className="card">
          <h2><i className="fas fa-database"></i> 2. Data Types</h2>
          <h3>Fundamental Data Types</h3>
          <ul>
            <li><strong>Integer types:</strong> int, short, long, long long</li>
            <li><strong>Floating-point types:</strong> float, double, long double</li>
            <li><strong>Character types:</strong> char, wchar_t, char16_t, char32_t</li>
            <li><strong>Boolean type:</strong> bool</li>
            <li><strong>String type:</strong> string (from string header)</li>
          </ul>

          <h3>Derived Data Types</h3>
          <ul>
            <li><strong>Arrays:</strong> Fixed-size collection of elements</li>
            <li><strong>Pointers:</strong> Variables that store memory addresses</li>
            <li><strong>References:</strong> Aliases for existing variables</li>
            <li><strong>Functions:</strong> Blocks of code that perform specific tasks</li>
          </ul>

          <h3>User-Defined Data Types</h3>
          <ul>
            <li><strong>Structures:</strong> Group of variables of different types</li>
            <li><strong>Classes:</strong> Blueprint for creating objects</li>
            <li><strong>Unions:</strong> Similar to structures but share memory</li>
            <li><strong>Enumerations:</strong> User-defined data types with named constants</li>
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <div className="card">
          <h2><i className="fas fa-terminal"></i> 3. Example Code</h2>
          <div className="code-container">
            <button className={`copy-btn ${copiedCode === "example" ? "copied" : ""}`} onClick={() => copyCode(`#include <iostream>
#include <string>
using namespace std;

int main() {
    // Fundamental data types
    int a = 42;              // int
    double b = 3.14159;      // double
    float c = 2.5f;          // float
    char d = 'A';            // char
    bool e = true;           // bool
    string f = "Hello";      // string

    // Arrays
    int numbers[3] = {1, 2, 3};

    // Pointers
    int* ptr = &a;

    // References
    int& ref = a;

    cout << "Integer: " << a << endl;
    cout << "Double: " << b << endl;
    cout << "Float: " << c << endl;
    cout << "Char: " << d << endl;
    cout << "Bool: " << e << endl;
    cout << "String: " << f << endl;
    cout << "Array element: " << numbers[0] << endl;
    cout << "Pointer value: " << *ptr << endl;
    cout << "Reference value: " << ref << endl;

    return 0;
}`, "example")}>
              {copiedCode === "example" ? "Copied!" : "Copy"}
            </button>
            <pre>{`#include <iostream>
#include <string>
using namespace std;

int main() {
    // Fundamental data types
    int a = 42;              // int
    double b = 3.14159;      // double
    float c = 2.5f;          // float
    char d = 'A';            // char
    bool e = true;           // bool
    string f = "Hello";      // string

    // Arrays
    int numbers[3] = {1, 2, 3};

    // Pointers
    int* ptr = &a;

    // References
    int& ref = a;

    cout << "Integer: " << a << endl;
    cout << "Double: " << b << endl;
    cout << "Float: " << c << endl;
    cout << "Char: " << d << endl;
    cout << "Bool: " << e << endl;
    cout << "String: " << f << endl;
    cout << "Array element: " << numbers[0] << endl;
    cout << "Pointer value: " << *ptr << endl;
    cout << "Reference value: " << ref << endl;

    return 0;
}`}</pre>
          </div>
        </div>
      </section>

      <style jsx>{`
        .notes-page {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #374151;
        }

        .card {
          background: var(--card-bg, #ffffff);
          border-radius: 12px;
          box-shadow: var(--card-shadow, 0 6px 18px rgba(16, 24, 40, 0.04));
          background: #111111;
          color: #ffffff;
          border: 1px solid #111111;
          transition: all 0.3s ease;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 25px rgba(16, 24, 40, 0.1);
        }

        h2 {
          background: #000000;
          color: #ffffff;
          margin-bottom: 1rem;
          font-weight: 700;
          display: flex;
          background: #111111;
          color: #ffffff;
          gap: 0.5rem;
        }

        h3 {
          color: #4f46e5;
          margin: 1.5rem 0 0.5rem;
          font-weight: 600;
        }

        .code-container {
          position: relative;
          margin: 1.5rem 0;
          border-radius: 12px;
          overflow: hidden;
        }

        .code-container pre {
          background: var(--code-bg, #0b1220);
          color: var(--code-text);
          padding: 1.5rem;
          overflow-x: auto;
          border-radius: 12px;
          font-family: "Courier New", monospace;
          line-height: 1.5;
          font-size: 0.95rem;
        }

        .copy-btn {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: #111111;
          color: #ffffff;
          border: 1px solid #111111;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .copy-btn:hover {
          background: #000000;
          color: #ffffff;
        }

        .copy-btn.copied {
          background: #111111;
          color: #ffffff;
        }

        ul {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
          color: var(--code-text);
        }

        li {
          color: var(--code-text);
          margin-bottom: 0.5rem;
        }

        strong {
          color: var(--code-text);
        }
      `}</style>
    </div>
  );
};

export default CppVariablesAndDataTypes;
