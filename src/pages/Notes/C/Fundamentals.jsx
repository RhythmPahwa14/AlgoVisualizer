import React, { useState } from "react";

const CFundamentals = () => {
  const [activeTab, setActiveTab] = useState("intro");
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
    <div className="notes-page" style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <header
        style={{
          textAlign: "center",
          marginBottom: "3rem",
          padding: "2rem 0",
          background: "linear-gradient(135deg, #4f46e5, #4338ca)",
          color: "white",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(79, 70, 229, 0.3)"
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", fontWeight: 800 }}>
          C Fundamentals
        </h1>
        <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto", opacity: 0.9 ,color: window.matchMedia('(prefers-color-scheme: dark)').matches
      ? "#ffffff"  // text color for dark mode
      : "#1a1a1a", // text color for light mode
  }}
>
          A complete guide to the basics of C programming with structured explanations and examples.
        </p>
      </header>

      {/* Navigation */}
      <nav
        style={{
          position: "sticky",
          top: "2rem",
          background:  "var(--card-bg, #ffffff)",
          borderRadius: "12px",
          padding: "1.5rem",
          boxShadow: "0 6px 18px rgba(16,24,40,0.04)",
          marginBottom: "2rem"
        }}
      >
        <h3 style={{ marginTop: 0, color: "#0f172a" }}>
          <i className="fas fa-bookmark" style={{ marginRight: "0.5rem", color: "#4f46e5" }}></i>
          Contents
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {[
            { id: "intro", label: "Introduction & Program Structure" },
            { id: "datatypes", label: "Data Types, Variables, Constants" },
            { id: "operators", label: "Operators" },
            { id: "control", label: "Conditional Statements & Loops" },
            { id: "functions", label: "Functions & Recursion" },
            { id: "arrays", label: "Arrays & Strings" },
            { id: "pointers", label: "Pointers" },
            { id: "structures", label: "Structures & Unions" },
            { id: "filehandling", label: "File Handling" },
            { id: "memory", label: "Dynamic Memory Allocation" },
            { id: "examples", label: "Example Code" }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                background: activeTab === item.id ? "#4f46e5" : "transparent",
                color: activeTab === item.id ? "white" : "#4f46e5",
                border: "2px solid #4f46e5",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Introduction & Program Structure */}
      {activeTab === "intro" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-play-circle"></i> 1. Introduction & Program Structure</h2>
            <p>C is a general-purpose, procedural programming language developed by Dennis Ritchie in 1972. It's widely used for system programming, embedded systems, and as a foundation for many other languages.</p>
            <h3>Key Features</h3>
            <ul>
              <li><strong>Procedural Language:</strong> Follows step-by-step execution</li>
              <li><strong>Low-level Access:</strong> Direct memory manipulation</li>
              <li><strong>Efficient:</strong> Fast execution and low memory usage</li>
              <li><strong>Portable:</strong> Code can run on different platforms with minimal changes</li>
            </ul>
            <h3>Basic Program Structure</h3>
            <p>Every C program must have a main() function where execution begins.</p>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "intro" ? "copied" : ""}`} onClick={() => copyCode(`#include <stdio.h>

int main() {
    printf("Hello, C!");
    return 0;
}`, "intro")}>
                {copiedCode === "intro" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <stdio.h>

int main() {
    printf("Hello, C!");
    return 0;
}`}</pre>
            </div>
            <div style={{ background: "var(--card-bg, #ffffff)", borderLeft: "4px solid #f59e0b", padding: "1rem 1.5rem", margin: "1.5rem 0", borderRadius: "0 12px 12px 0" }}>
              <strong>Note:</strong> #include is a preprocessor directive that includes header files. stdio.h contains input/output functions like printf().
            </div>
          </div>
        </section>
      )}

      {/* Data Types, Variables, Constants */}
      {activeTab === "datatypes" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-database"></i> 2. Data Types, Variables, Constants</h2>
            <h3>Data Types</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", margin: "1rem 0" }}>
              <thead style={{ backgroundColor: "var(--card-bg, #ffffff)"}}>
                <tr>
                  <th style={{ padding: "0.75rem 1rem", textAlign: "left" }}>Type</th>
                  <th style={{ padding: "0.75rem 1rem", textAlign: "left" }}>Size</th>
                  <th style={{ padding: "0.75rem 1rem", textAlign: "left" }}>Range</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["int", "4 bytes", "-2,147,483,648 to 2,147,483,647"],
                  ["float", "4 bytes", "1.2E-38 to 3.4E+38"],
                  ["double", "8 bytes", "2.3E-308 to 1.7E+308"],
                  ["char", "1 byte", "-128 to 127"],
                  ["void", "0 bytes", "No value"]
                ].map(([type, size, range]) => (
                  <tr key={type} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: "0.75rem 1rem" }}><code>{type}</code></td>
                    <td style={{ padding: "0.75rem 1rem" }}>{size}</td>
                    <td style={{ padding: "0.75rem 1rem" }}>{range}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>Variables</h3>
            <p>Variables must be declared before use with a data type.</p>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "variables" ? "copied" : ""}`} onClick={() => copyCode(`#include <stdio.h>

int main() {
    int age = 25;
    float height = 5.8;
    char grade = 'A';
    double pi = 3.14159;

    printf("Age: %d\\n", age);
    printf("Height: %.1f\\n", height);
    printf("Grade: %c\\n", grade);
    printf("Pi: %.5f\\n", pi);

    return 0;
}`, "variables")}>
                {copiedCode === "variables" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <stdio.h>

int main() {
    int age = 25;
    float height = 5.8;
    char grade = 'A';
    double pi = 3.14159;

    printf("Age: %d\\n", age);
    printf("Height: %.1f\\n", height);
    printf("Grade: %c\\n", grade);
    printf("Pi: %.5f\\n", pi);

    return 0;
}`}</pre>
            </div>

            <h3>Constants</h3>
            <p>Use const keyword or #define preprocessor directive.</p>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "constants" ? "copied" : ""}`} onClick={() => copyCode(`#include <stdio.h>
#define PI 3.14159
#define MAX_SIZE 100

int main() {
    const int DAYS_IN_WEEK = 7;
    const float GRAVITY = 9.81;

    printf("PI: %.5f\\n", PI);
    printf("Days in week: %d\\n", DAYS_IN_WEEK);

    return 0;
}`, "constants")}>
                {copiedCode === "constants" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <stdio.h>
#define PI 3.14159
#define MAX_SIZE 100

int main() {
    const int DAYS_IN_WEEK = 7;
    const float GRAVITY = 9.81;

    printf("PI: %.5f\\n", PI);
    printf("Days in week: %d\\n", DAYS_IN_WEEK);

    return 0;
}`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* Operators */}
      {activeTab === "operators" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-plus-square"></i> 3. Operators</h2>
            <h3>Arithmetic Operators</h3>
            <ul>
              <li><code>+</code> Addition</li>
              <li><code>-</code> Subtraction</li>
              <li><code>*</code> Multiplication</li>
              <li><code>/</code> Division</li>
              <li><code>%</code> Modulus</li>
            </ul>

            <h3>Relational Operators</h3>
            <ul>
              <li><code>==</code> Equal to</li>
              <li><code>!=</code> Not equal to</li>
              <li><code>{'>'}</code> Greater than</li>
              <li><code>{'<'}</code> Less than</li>
              <li><code>{'>='}</code> Greater than or equal to</li>
              <li><code>{'<='}</code> Less than or equal to</li>
            </ul>

            <h3>Logical Operators</h3>
            <ul>
              <li><code>&&</code> Logical AND</li>
              <li><code>||</code> Logical OR</li>
              <li><code>!</code> Logical NOT</li>
            </ul>

            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "operators" ? "copied" : ""}`} onClick={() => copyCode(`#include <stdio.h>

int main() {
    int a = 10, b = 3;

    // Arithmetic
    printf("Addition: %d\\n", a + b);
    printf("Subtraction: %d\\n", a - b);
    printf("Multiplication: %d\\n", a * b);
    printf("Division: %d\\n", a / b);
    printf("Modulus: %d\\n", a % b);

    // Relational
    printf("a == b: %d\\n", a == b);
    printf("a > b: %d\\n", a > b);

    // Logical
    printf("a > 5 && b < 5: %d\\n", a > 5 && b < 5);

    return 0;
}`, "operators")}>
                {copiedCode === "operators" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <stdio.h>

int main() {
    int a = 10, b = 3;

    // Arithmetic
    printf("Addition: %d\\n", a + b);
    printf("Subtraction: %d\\n", a - b);
    printf("Multiplication: %d\\n", a * b);
    printf("Division: %d\\n", a / b);
    printf("Modulus: %d\\n", a % b);

    // Relational
    printf("a == b: %d\\n", a == b);
    printf("a > b: %d\\n", a > b);

    // Logical
    printf("a > 5 && b < 5: %d\\n", a > 5 && b < 5);

    return 0;
}`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* Conditional Statements & Loops */}
      {activeTab === "control" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-sitemap"></i> 4. Conditional Statements & Loops</h2>

            <h3>if-else Statement</h3>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "ifelse" ? "copied" : ""}`} onClick={() => copyCode(`#include <stdio.h>

int main() {
    int score = 85;

    if (score >= 90) {
        printf("Grade: A\\n");
    } else if (score >= 80) {
        printf("Grade: B\\n");
    } else if (score >= 70) {
        printf("Grade: C\\n");
    } else {
        printf("Grade: F\\n");
    }

    return 0;
}`, "ifelse")}>
                {copiedCode === "ifelse" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <stdio.h>

int main() {
    int score = 85;

    if (score >= 90) {
        printf("Grade: A\\n");
    } else if (score >= 80) {
        printf("Grade: B\\n");
    } else if (score >= 70) {
        printf("Grade: C\\n");
    } else {
        printf("Grade: F\\n");
    }

    return 0;
}`}</pre>
            </div>

            <h3>switch Statement</h3>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "switch" ? "copied" : ""}`} onClick={() => copyCode(`#include <stdio.h>

int main() {
    int day = 3;

    switch (day) {
        case 1:
            printf("Monday\\n");
            break;
        case 2:
            printf("Tuesday\\n");
            break;
        case 3:
            printf("Wednesday\\n");
            break;
        default:
            printf("Invalid day\\n");
    }

    return 0;
}`, "switch")}>
                {copiedCode === "switch" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <stdio.h>

int main() {
    int day = 3;

    switch (day) {
        case 1:
            printf("Monday\\n");
            break;
        case 2:
            printf("Tuesday\\n");
            break;
        case 3:
            printf("Wednesday\\n");
            break;
        default:
            printf("Invalid day\\n");
    }

    return 0;
}`}</pre>
            </div>

            <h3>for Loop</h3>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "forloop" ? "copied" : ""}`} onClick={() => copyCode(`#include <stdio.h>

int main() {
    for (int i = 1; i <= 5; i++) {
        printf("Number: %d\\n", i);
    }

    return 0;
}`, "forloop")}>
                {copiedCode === "forloop" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <stdio.h>

int main() {
    for (int i = 1; i <= 5; i++) {
        printf("Number: %d\\n", i);
    }

    return 0;
}`}</pre>
            </div>

            <h3>while Loop</h3>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "whileloop" ? "copied" : ""}`} onClick={() => copyCode(`#include <stdio.h>

int main() {
    int i = 1;
    while (i <= 5) {
        printf("Count: %d\\n", i);
        i++;
    }

    return 0;
}`, "whileloop")}>
                {copiedCode === "whileloop" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <stdio.h>

int main() {
    int i = 1;
    while (i <= 5) {
        printf("Count: %d\\n", i);
        i++;
    }

    return 0;
}`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* Functions & Recursion */}
      {activeTab === "functions" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-code"></i> 5. Functions & Recursion</h2>

            <h3>Function Declaration and Definition</h3>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "function" ? "copied" : ""}`} onClick={() => copyCode(`#include <stdio.h>

// Function declaration
int add(int a, int b);

int main() {
    int result = add(5, 3);
    printf("Sum: %d\\n", result);
    return 0;
}

// Function definition
int add(int a, int b) {
    return a + b;
}`, "function")}>
                {copiedCode === "function" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <stdio.h>

// Function declaration
int add(int a, int b);

int main() {
    int result = add(5, 3);
    printf("Sum: %d\\n", result);
    return 0;
}

// Function definition
int add(int a, int b) {
    return a + b;
}`}</pre>
            </div>

            <h3>Recursion</h3>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "recursion" ? "copied" : ""}`} onClick={() => copyCode(`#include <stdio.h>

int factorial(int n) {
    if (n == 0 || n == 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

int main() {
    int num = 5;
    printf("Factorial of %d is %d\\n", num, factorial(num));
    return 0;
}`, "recursion")}>
                {copiedCode === "recursion" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <stdio.h>

int factorial(int n) {
    if (n == 0 || n == 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

int main() {
    int num = 5;
    printf("Factorial of %d is %d\\n", num, factorial(num));
    return 0;
}`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* Arrays & Strings */}
      {activeTab === "arrays" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-list"></i> 6. Arrays & Strings</h2>

            <h3>Arrays</h3>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "array" ? "copied" : ""}`} onClick={() => copyCode(`#include <stdio.h>

int main() {
    int numbers[5] = {1, 2, 3, 4, 5};

    for (int i = 0; i < 5; i++) {
        printf("numbers[%d] = %d\\n", i, numbers[i]);
    }

    return 0;
}`, "array")}>
                {copiedCode === "array" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <stdio.h>

int main() {
    int numbers[5] = {1, 2, 3, 4, 5};

    for (int i = 0; i < 5; i++) {
        printf("numbers[%d] = %d\\n", i, numbers[i]);
    }

    return 0;
}`}</pre>
            </div>

            <h3>Strings</h3>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "string" ? "copied" : ""}`} onClick={() => copyCode(`#include <stdio.h>
#include <string.h>

int main() {
    char name[20] = "Hello, C!";
    char copy[20];

    printf("Original: %s\\n", name);
    printf("Length: %lu\\n", strlen(name));

    strcpy(copy, name);
    printf("Copied: %s\\n", copy);

    return 0;
}`, "string")}>
                {copiedCode === "string" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <stdio.h>
#include <string.h>

int main() {
    char name[20] = "Hello, C!";
    char copy[20];

    printf("Original: %s\\n", name);
    printf("Length: %lu\\n", strlen(name));

    strcpy(copy, name);
    printf("Copied: %s\\n", copy);

    return 0;
}`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* Pointers */}
      {activeTab === "pointers" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-map-marker"></i> 7. Pointers</h2>
            <p>Pointers store memory addresses of variables.</p>

            <h3>Basic Pointer Usage</h3>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "pointer" ? "copied" : ""}`} onClick={() => copyCode(`#include <stdio.h>

int main() {
    int num = 10;
    int *ptr = &num;  // Pointer to num

    printf("Value: %d\\n", num);
    printf("Address: %p\\n", &num);
    printf("Pointer value: %p\\n", ptr);
    printf("Dereferenced: %d\\n", *ptr);

    *ptr = 20;  // Change value through pointer
    printf("New value: %d\\n", num);

    return 0;
}`, "pointer")}>
                {copiedCode === "pointer" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <stdio.h>

int main() {
    int num = 10;
    int *ptr = &num;  // Pointer to num

    printf("Value: %d\\n", num);
    printf("Address: %p\\n", &num);
    printf("Pointer value: %p\\n", ptr);
    printf("Dereferenced: %d\\n", *ptr);

    *ptr = 20;  // Change value through pointer
    printf("New value: %d\\n", num);

    return 0;
}`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* Structures & Unions */}
      {activeTab === "structures" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-cubes"></i> 8. Structures & Unions</h2>

            <h3>Structures</h3>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "struct" ? "copied" : ""}`} onClick={() => copyCode(`#include <stdio.h>

struct Student {
    char name[50];
    int age;
    float gpa;
};

int main() {
    struct Student s1 = {"John", 20, 3.5};

    printf("Name: %s\\n", s1.name);
    printf("Age: %d\\n", s1.age);
    printf("GPA: %.1f\\n", s1.gpa);

    return 0;
}`, "struct")}>
                {copiedCode === "struct" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <stdio.h>

struct Student {
    char name[50];
    int age;
    float gpa;
};

int main() {
    struct Student s1 = {"John", 20, 3.5};

    printf("Name: %s\\n", s1.name);
    printf("Age: %d\\n", s1.age);
    printf("GPA: %.1f\\n", s1.gpa);

    return 0;
}`}</pre>
            </div>

            <h3>Unions</h3>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "union" ? "copied" : ""}`} onClick={() => copyCode(`#include <stdio.h>

union Data {
    int i;
    float f;
    char str[20];
};

int main() {
    union Data data;

    data.i = 10;
    printf("Integer: %d\\n", data.i);

    data.f = 3.14;
    printf("Float: %.2f\\n", data.f);

    strcpy(data.str, "Hello");
    printf("String: %s\\n", data.str);

    return 0;
}`, "union")}>
                {copiedCode === "union" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <stdio.h>

union Data {
    int i;
    float f;
    char str[20];
};

int main() {
    union Data data;

    data.i = 10;
    printf("Integer: %d\\n", data.i);

    data.f = 3.14;
    printf("Float: %.2f\\n", data.f);

    strcpy(data.str, "Hello");
    printf("String: %s\\n", data.str);

    return 0;
}`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* File Handling */}
      {activeTab === "filehandling" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-file"></i> 9. File Handling</h2>

            <h3>Writing to a File</h3>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "filewrite" ? "copied" : ""}`} onClick={() => copyCode(`#include <stdio.h>

int main() {
    FILE *fp;
    fp = fopen("example.txt", "w");

    if (fp == NULL) {
        printf("Error opening file\\n");
        return 1;
    }

    fprintf(fp, "Hello, File!\\n");
    fprintf(fp, "This is a test.\\n");

    fclose(fp);
    printf("Data written to file.\\n");

    return 0;
}`, "filewrite")}>
                {copiedCode === "filewrite" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <stdio.h>

int main() {
    FILE *fp;
    fp = fopen("example.txt", "w");

    if (fp == NULL) {
        printf("Error opening file\\n");
        return 1;
    }

    fprintf(fp, "Hello, File!\\n");
    fprintf(fp, "This is a test.\\n");

    fclose(fp);
    printf("Data written to file.\\n");

    return 0;
}`}</pre>
            </div>

            <h3>Reading from a File</h3>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "fileread" ? "copied" : ""}`} onClick={() => copyCode(`#include <stdio.h>

int main() {
    FILE *fp;
    char buffer[100];

    fp = fopen("example.txt", "r");

    if (fp == NULL) {
        printf("Error opening file\\n");
        return 1;
    }

    while (fgets(buffer, 100, fp) != NULL) {
        printf("%s", buffer);
    }

    fclose(fp);
    return 0;
}`, "fileread")}>
                {copiedCode === "fileread" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <stdio.h>

int main() {
    FILE *fp;
    char buffer[100];

    fp = fopen("example.txt", "r");

    if (fp == NULL) {
        printf("Error opening file\\n");
        return 1;
    }

    while (fgets(buffer, 100, fp) != NULL) {
        printf("%s", buffer);
    }

    fclose(fp);
    return 0;
}`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Memory Allocation */}
      {activeTab === "memory" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-memory"></i> 10. Dynamic Memory Allocation</h2>

            <h3>malloc() and free()</h3>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "malloc" ? "copied" : ""}`} onClick={() => copyCode(`#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr;
    int n = 5;

    // Allocate memory
    arr = (int*)malloc(n * sizeof(int));

    if (arr == NULL) {
        printf("Memory allocation failed\\n");
        return 1;
    }

    // Use the allocated memory
    for (int i = 0; i < n; i++) {
        arr[i] = i + 1;
        printf("%d ", arr[i]);
    }
    printf("\\n");

    // Free the allocated memory
    free(arr);

    return 0;
}`, "malloc")}>
                {copiedCode === "malloc" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr;
    int n = 5;

    // Allocate memory
    arr = (int*)malloc(n * sizeof(int));

    if (arr == NULL) {
        printf("Memory allocation failed\\n");
        return 1;
    }

    // Use the allocated memory
    for (int i = 0; i < n; i++) {
        arr[i] = i + 1;
        printf("%d ", arr[i]);
    }
    printf("\\n");

    // Free the allocated memory
    free(arr);

    return 0;
}`}</pre>
            </div>

            <h3>calloc() and realloc()</h3>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "calloc" ? "copied" : ""}`} onClick={() => copyCode(`#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr;
    int n = 5;

    // Allocate and initialize to zero
    arr = (int*)calloc(n, sizeof(int));

    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);  // Will print 0 0 0 0 0
    }
    printf("\\n");

    // Reallocate to larger size
    arr = (int*)realloc(arr, 10 * sizeof(int));

    for (int i = 5; i < 10; i++) {
        arr[i] = i + 1;
    }

    for (int i = 0; i < 10; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    free(arr);
    return 0;
}`, "calloc")}>
                {copiedCode === "calloc" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr;
    int n = 5;

    // Allocate and initialize to zero
    arr = (int*)calloc(n, sizeof(int));

    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);  // Will print 0 0 0 0 0
    }
    printf("\\n");

    // Reallocate to larger size
    arr = (int*)realloc(arr, 10 * sizeof(int));

    for (int i = 5; i < 10; i++) {
        arr[i] = i + 1;
    }

    for (int i = 0; i < 10; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    free(arr);
    return 0;
}`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* Example Code */}
      {activeTab === "examples" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-terminal"></i> Example Code</h2>
            <p>A comprehensive example demonstrating various C concepts:</p>
            <div className="code-container">
              <button
                className={`copy-btn ${copiedCode === "examples" ? "copied" : ""}`}
                onClick={() =>
                  copyCode(`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Structure definition
struct Student {
    char name[50];
    int roll_no;
    float marks;
};

// Function declaration
void display_student(struct Student s);
int factorial(int n);

int main() {
    // Variables and constants
    const int MAX_STUDENTS = 3;
    struct Student students[MAX_STUDENTS];

    // Input student data
    for (int i = 0; i < MAX_STUDENTS; i++) {
        printf("Enter details for student %d:\\n", i + 1);
        printf("Name: ");
        scanf("%s", students[i].name);
        printf("Roll No: ");
        scanf("%d", &students[i].roll_no);
        printf("Marks: ");
        scanf("%f", &students[i].marks);
        printf("\\n");
    }

    // Display student data
    printf("Student Details:\\n");
    for (int i = 0; i < MAX_STUDENTS; i++) {
        display_student(students[i]);
    }

    // Factorial calculation
    int num = 5;
    printf("\\nFactorial of %d is %d\\n", num, factorial(num));

    return 0;
}

// Function to display student
void display_student(struct Student s) {
    printf("Name: %s\\n", s.name);
    printf("Roll No: %d\\n", s.roll_no);
    printf("Marks: %.2f\\n\\n", s.marks);
}

// Recursive factorial function
int factorial(int n) {
    if (n == 0 || n == 1) {
        return 1;
    }
    return n * factorial(n - 1);
}`, "examples")
                }
              >
                {copiedCode === "examples" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Structure definition
struct Student {
    char name[50];
    int roll_no;
    float marks;
};

// Function declaration
void display_student(struct Student s);
int factorial(int n);

int main() {
    // Variables and constants
    const int MAX_STUDENTS = 3;
    struct Student students[MAX_STUDENTS];

    // Input student data
    for (int i = 0; i < MAX_STUDENTS; i++) {
        printf("Enter details for student %d:\\n", i + 1);
        printf("Name: ");
        scanf("%s", students[i].name);
        printf("Roll No: ");
        scanf("%d", &students[i].roll_no);
        printf("Marks: ");
        scanf("%f", &students[i].marks);
        printf("\\n");
    }

    // Display student data
    printf("Student Details:\\n");
    for (int i = 0; i < MAX_STUDENTS; i++) {
        display_student(students[i]);
    }

    // Factorial calculation
    int num = 5;
    printf("\\nFactorial of %d is %d\\n", num, factorial(num));

    return 0;
}

// Function to display student
void display_student(struct Student s) {
    printf("Name: %s\\n", s.name);
    printf("Roll No: %d\\n", s.roll_no);
    printf("Marks: %.2f\\n\\n", s.marks);
}

// Recursive factorial function
int factorial(int n) {
    if (n == 0 || n == 1) {
        return 1;
    }
    return n * factorial(n - 1);
}`}</pre>
            </div>
          </div>
        </section>
      )}

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
          border: var(--card-border, 1px solid rgba(15, 23, 42, 0.03));
          padding: 1.5rem;
          margin-bottom: 2rem;
          transition: all 0.3s ease;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 25px rgba(16, 24, 40, 0.1);
        }

        h2 {
          color: var(--code-text);
          margin-bottom: 1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
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
        p {
          color: var(--code-text);
        }

        .copy-btn {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: rgba(255, 255, 255, 0.1);
          color: var(--code-text);
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .copy-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .copy-btn.copied {
          background: #10b981;
        }

        code {
          background-color: #e0e7ff;
          color: #4338ca;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: "Courier New", monospace;
          font-size: 0.9rem;
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

export default CFundamentals;
