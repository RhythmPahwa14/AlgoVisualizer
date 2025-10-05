import React, { useState } from "react";

const Fundamentals = () => {
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
    <div
      className="notes-page"
      style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}
    >
      {/* Header */}
      <header
        style={{
          textAlign: "center",
          marginBottom: "3rem",
          padding: "2rem 0",
          background: "linear-gradient(135deg, #4f46e5, #4338ca)",
          color: "white",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(79, 70, 229, 0.3)",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", fontWeight: 800 }}>
          Java Fundamentals
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            maxWidth: "700px",
            margin: "0 auto",
            opacity: 0.9,
             color: window.matchMedia('(prefers-color-scheme: dark)').matches
      ? "#ffffff"  // text color for dark mode
      : "#1a1a1a", // text color for light mode
          }}
        >
          A comprehensive guide to Java programming for beginners. Learn core
          concepts with detailed explanations and examples.
        </p>
      </header>

      {/* Navigation */}
      <nav
        style={{
          position: "sticky",
          top: "2rem",
          background: "var(--card-bg, #ffffff)",
          borderRadius: "12px",
          padding: "1.5rem",
          boxShadow: "var(--card-shadow, 0 6px 18px rgba(16,24,40,0.04))",
          marginBottom: "2rem",
        }}
      >
        <h3 style={{ marginTop: 0, color: "var(--secondary, #0f172a)" }}>
          <i
            className="fas fa-bookmark"
            style={{ marginRight: "0.5rem", color: "#4f46e5" }}
          ></i>
          Contents
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {[
            { id: "intro", label: "Introduction" },
            { id: "setup", label: "Setup" },
            { id: "syntax", label: "Syntax" },
            { id: "datatypes", label: "Data Types" },
            { id: "variables", label: "Variables" },
            { id: "operators", label: "Operators" },
            { id: "control", label: "Control Flow" },
            { id: "methods", label: "Methods" },
            { id: "oop", label: "OOP Concepts" },
            { id: "strings", label: "Strings" },
            { id: "arrays", label: "Arrays" },
            { id: "loops", label: "Loops" },
            { id: "classes", label: "Classes/Objects" },
            { id: "inheritance", label: "Inheritance" },
            { id: "polymorphism", label: "Polymorphism" },
            { id: "encapsulation", label: "Encapsulation" },
            { id: "constructors", label: "Constructors" },
            { id: "exceptions", label: "Exceptions" },
            { id: "collections", label: "Collections" },
            { id: "interfaces", label: "Interfaces" },
            { id: "packages", label: "Packages" },
            { id: "filehandling", label: "File Handling" },
          ].map((item) => (
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
                transition: "all 0.3s ease",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Introduction */}
      {activeTab === "intro" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2>
              <i className="fas fa-play-circle"></i> 1. Introduction to Java
            </h2>
            <p>
              Java is a high-level, object-oriented, platform-independent
              programming language developed by Sun Microsystems (now owned by
              Oracle).
            </p>

            <h3>Key Features</h3>
            <ul>
              <li>
                <strong>Platform Independent:</strong> Write Once, Run Anywhere
                (WORA) principle
              </li>
              <li>
                <strong>Object-Oriented:</strong> Follows OOP principles like
                encapsulation, inheritance, polymorphism
              </li>
              <li>
                <strong>Simple and Familiar:</strong> C++ like syntax without
                complex features
              </li>
              <li>
                <strong>Secure:</strong> Built-in security features and sandbox
                environment
              </li>
              <li>
                <strong>Multithreaded:</strong> Supports concurrent programming
              </li>
            </ul>

            <div
              style={{
                background: "#fff7ed",
                borderLeft: "4px solid #f59e0b",
                padding: "1rem 1.5rem",
                margin: "1.5rem 0",
                borderRadius: "0 12px 12px 0",
              }}
            >
              <strong>Note:</strong> Java was originally developed by James
              Gosling at Sun Microsystems in 1995.
            </div>
          </div>
        </section>
      )}

      {/* Setup */}
      {activeTab === "setup" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2>
              <i className="fas fa-cogs"></i> 2. Setting Up Java Development
              Environment
            </h2>

            <h3>Step 1: Install JDK</h3>
            <p>
              Download and install the latest Java Development Kit from Oracle
              or use OpenJDK.
            </p>

            <h3>Step 2: Set Environment Variables</h3>
            <p>
              Set JAVA_HOME to point to your JDK installation and add bin
              directory to PATH.
            </p>

            <h3>Step 3: Choose an IDE</h3>
            <ul>
              <li>IntelliJ IDEA - Powerful and feature-rich</li>
              <li>Eclipse - Open-source and widely used</li>
              <li>VS Code - Lightweight with Java extensions</li>
            </ul>

            <div className="code-container">
              <button
                className={`copy-btn ${copiedCode === "setup" ? "copied" : ""}`}
                onClick={() =>
                  copyCode(
                    `public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n        System.out.println("Java Version: " + System.getProperty("java.version"));\n    }\n}`,
                    "setup"
                  )
                }
              >
                {copiedCode === "setup" ? "Copied!" : "Copy"}
              </button>
              <pre>
                {`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
        System.out.println("Java Version: " + System.getProperty("java.version"));
    }
}`}
              </pre>
            </div>
          </div>
        </section>
      )}

      {/* Data Types */}
      {activeTab === "datatypes" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2>
              <i className="fas fa-database"></i> 4. Data Types in Java
            </h2>
            <p>
              Java has two categories of data types: primitive and non-primitive
              (reference types).
            </p>

            <h3>Primitive Data Types</h3>
            <div style={{ overflowX: "auto", margin: "1.5rem 0" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  background: "var(--card-bg, #ffffff)",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#e0e7ff" }}>
                    <th
                      style={{
                        padding: "0.75rem 1rem",
                        textAlign: "left",
                        color: "#4338ca",
                      }}
                    >
                      Data Type
                    </th>
                    <th
                      style={{
                        padding: "0.75rem 1rem",
                        textAlign: "left",
                        color: "#4338ca",
                      }}
                    >
                      Size
                    </th>
                    <th
                      style={{
                        padding: "0.75rem 1rem",
                        textAlign: "left",
                        color: "#4338ca",
                      }}
                    >
                      Default Value
                    </th>
                    <th
                      style={{
                        padding: "0.75rem 1rem",
                        textAlign: "left",
                        color: "#4338ca",
                      }}
                    >
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["byte", "8 bits", "0", "Small integers (-128 to 127)"],
                    [
                      "short",
                      "16 bits",
                      "0",
                      "Medium integers (-32,768 to 32,767)",
                    ],
                    ["int", "32 bits", "0", "Standard integers (most common)"],
                    ["long", "64 bits", "0L", "Large integers"],
                    ["float", "32 bits", "0.0f", "Single-precision decimal"],
                    ["double", "64 bits", "0.0d", "Double-precision decimal"],
                    ["char", "16 bits", "'\\u0000'", "Single character"],
                    ["boolean", "1 bit", "false", "True/false values"],
                  ].map(([type, size, defaultValue, desc]) => (
                    <tr
                      key={type}
                      style={{ borderBottom: "1px solid #e5e7eb" }}
                    >
                      <td style={{ padding: "0.75rem 1rem" }}>
                        <code>{type}</code>
                      </td>
                      <td style={{ padding: "0.75rem 1rem" }}>{size}</td>
                      <td style={{ padding: "0.75rem 1rem" }}>
                        {defaultValue}
                      </td>
                      <td style={{ padding: "0.75rem 1rem" }}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3>Non-Primitive Data Types</h3>
            <p>
              Include Strings, Arrays, Classes, and Interfaces. They are called
              reference types because they refer to objects.
            </p>

            <div className="code-container">
              <button
                className={`copy-btn ${
                  copiedCode === "datatypes" ? "copied" : ""
                }`}
                onClick={() =>
                  copyCode(
                    `public class DataTypesExample {\n    public static void main(String[] args) {\n        // Primitive types\n        byte age = 25;\n        int population = 8000000;\n        double distance = 1234.5678;\n        char grade = 'A';\n        boolean isJavaFun = true;\n        \n        // Non-primitive types\n        String name = "Java Programming";\n        int[] numbers = {1, 2, 3, 4, 5};\n        \n        System.out.println("Name: " + name);\n        System.out.println("Age: " + age);\n        System.out.println("Is Java Fun? " + isJavaFun);\n    }\n}`,
                    "datatypes"
                  )
                }
              >
                {copiedCode === "datatypes" ? "Copied!" : "Copy"}
              </button>
              <pre>
                {`public class DataTypesExample {
    public static void main(String[] args) {
        // Primitive types
        byte age = 25;
        int population = 8000000;
        double distance = 1234.5678;
        char grade = 'A';
        boolean isJavaFun = true;
        
        // Non-primitive types
        String name = "Java Programming";
        int[] numbers = {1, 2, 3, 4, 5};
        
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Is Java Fun? " + isJavaFun);
    }
}`}
              </pre>
            </div>
          </div>
        </section>
      )}

      {/* Variables */}
      {activeTab === "variables" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2>
              <i className="fas fa-tag"></i> 5. Variables in Java
            </h2>
            <p>
              Variables are containers for storing data values. Each variable
              must be declared with a specific data type.
            </p>

            <h3>Types of Variables</h3>
            <ul>
              <li>
                <strong>Local Variables:</strong> Declared inside methods,
                constructors, or blocks
              </li>
              <li>
                <strong>Instance Variables:</strong> Declared in a class but
                outside any method
              </li>
              <li>
                <strong>Static Variables:</strong> Declared with{" "}
                <code>static</code> keyword, shared across all instances
              </li>
            </ul>

            <div
              style={{
                background: "#fef2f2",
                borderLeft: "4px solid #ef4444",
                padding: "1rem 1.5rem",
                margin: "1.5rem 0",
                borderRadius: "0 12px 12px 0",
              }}
            >
              <strong>Important:</strong> Local variables must be initialized
              before use, unlike instance and static variables.
            </div>

            <div className="code-container">
              <button
                className={`copy-btn ${
                  copiedCode === "variables" ? "copied" : ""
                }`}
                onClick={() =>
                  copyCode(
                    `public class VariableTypes {\n    // Instance variable\n    String instanceVar = "I am an instance variable";\n    \n    // Static variable\n    static String staticVar = "I am a static variable";\n    \n    public void display() {\n        // Local variable\n        String localVar = "I am a local variable";\n        System.out.println(localVar);\n        System.out.println(instanceVar);\n        System.out.println(staticVar);\n    }\n    \n    public static void main(String[] args) {\n        // Access static variable\n        System.out.println(VariableTypes.staticVar);\n        \n        // Create object to access instance method\n        VariableTypes obj = new VariableTypes();\n        obj.display();\n    }\n}`,
                    "variables"
                  )
                }
              >
                {copiedCode === "variables" ? "Copied!" : "Copy"}
              </button>
              <pre>
                {`public class VariableTypes {
    // Instance variable
    String instanceVar = "I am an instance variable";
    
    // Static variable
    static String staticVar = "I am a static variable";
    
    public void display() {
        // Local variable
        String localVar = "I am a local variable";
        System.out.println(localVar);
        System.out.println(instanceVar);
        System.out.println(staticVar);
    }
    
    public static void main(String[] args) {
        // Access static variable
        System.out.println(VariableTypes.staticVar);
        
        // Create object to access instance method
        VariableTypes obj = new VariableTypes();
        obj.display();
    }
}`}
              </pre>
            </div>
          </div>
        </section>
      )}

      {/* Control Flow */}
      {activeTab === "control" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2>
              <i className="fas fa-sitemap"></i> 7. Control Flow Statements
            </h2>
            <p>
              Control flow statements determine the order in which statements
              are executed.
            </p>

            <h3>Decision Making</h3>
            <ul>
              <li>
                <strong>if statement:</strong> Executes code if condition is
                true
              </li>
              <li>
                <strong>if-else:</strong> Executes one block if true, another if
                false
              </li>
              <li>
                <strong>switch:</strong> Tests variable against multiple values
              </li>
            </ul>

            <h3>Loop Statements</h3>
            <ul>
              <li>
                <strong>for loop:</strong> Repeats code specific number of times
              </li>
              <li>
                <strong>while loop:</strong> Repeats while condition is true
              </li>
              <li>
                <strong>do-while:</strong> Executes at least once, then repeats
                while condition true
              </li>
            </ul>

            <div className="code-container">
              <button
                className={`copy-btn ${
                  copiedCode === "control" ? "copied" : ""
                }`}
                onClick={() =>
                  copyCode(
                    `public class ControlFlowExample {\n    public static void main(String[] args) {\n        // If-else example\n        int score = 85;\n        if (score >= 90) {\n            System.out.println("Grade: A");\n        } else if (score >= 80) {\n            System.out.println("Grade: B");\n        } else {\n            System.out.println("Grade: C");\n        }\n        \n        // Switch example\n        int day = 3;\n        switch (day) {\n            case 1: System.out.println("Monday"); break;\n            case 2: System.out.println("Tuesday"); break;\n            case 3: System.out.println("Wednesday"); break;\n            default: System.out.println("Other day");\n        }\n        \n        // For loop example\n        for (int i = 1; i <= 5; i++) {\n            System.out.println("Number: " + i);\n        }\n    }\n}`,
                    "control"
                  )
                }
              >
                {copiedCode === "control" ? "Copied!" : "Copy"}
              </button>
              <pre>
                {`public class ControlFlowExample {
    public static void main(String[] args) {
        // If-else example
        int score = 85;
        if (score >= 90) {
            System.out.println("Grade: A");
        } else if (score >= 80) {
            System.out.println("Grade: B");
        } else {
            System.out.println("Grade: C");
        }
        
        // Switch example
        int day = 3;
        switch (day) {
            case 1: System.out.println("Monday"); break;
            case 2: System.out.println("Tuesday"); break;
            case 3: System.out.println("Wednesday"); break;
            default: System.out.println("Other day");
        }
        
        // For loop example
        for (int i = 1; i <= 5; i++) {
            System.out.println("Number: " + i);
        }
    }
}`}
              </pre>
            </div>
          </div>
        </section>
      )}

      {/* OOP Concepts */}
      {activeTab === "oop" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2>
              <i className="fas fa-object-group"></i> 9. Object-Oriented
              Programming Concepts
            </h2>
            <p>
              Java is an object-oriented programming language that organizes
              software design around objects.
            </p>

            <h3>Four Pillars of OOP</h3>
            <ul>
              <li>
                <strong>Encapsulation:</strong> Bundling data and methods within
                a class
              </li>
              <li>
                <strong>Inheritance:</strong> Creating new classes from existing
                ones
              </li>
              <li>
                <strong>Polymorphism:</strong> Ability of an object to take many
                forms
              </li>
              <li>
                <strong>Abstraction:</strong> Hiding implementation details
              </li>
            </ul>

            <div className="code-container">
              <button
                className={`copy-btn ${copiedCode === "oop" ? "copied" : ""}`}
                onClick={() =>
                  copyCode(
                    `// Encapsulation example\nclass BankAccount {\n    private String accountNumber;\n    private double balance;\n    \n    public BankAccount(String accountNumber, double initialBalance) {\n        this.accountNumber = accountNumber;\n        this.balance = initialBalance;\n    }\n    \n    public void deposit(double amount) {\n        if (amount > 0) {\n            balance += amount;\n        }\n    }\n    \n    public double getBalance() {\n        return balance;\n    }\n}\n\n// Inheritance example\nclass SavingsAccount extends BankAccount {\n    private double interestRate;\n    \n    public SavingsAccount(String accountNumber, double initialBalance, double interestRate) {\n        super(accountNumber, initialBalance);\n        this.interestRate = interestRate;\n    }\n}\n\npublic class OOPExample {\n    public static void main(String[] args) {\n        SavingsAccount account = new SavingsAccount("SA123", 1000.0, 2.5);\n        account.deposit(500.0);\n        System.out.println("Balance: $" + account.getBalance());\n    }\n}`,
                    "oop"
                  )
                }
              >
                {copiedCode === "oop" ? "Copied!" : "Copy"}
              </button>
              <pre>
                {`// Encapsulation example
class BankAccount {
    private String accountNumber;
    private double balance;
    
    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
    
    public double getBalance() {
        return balance;
    }
}

// Inheritance example
class SavingsAccount extends BankAccount {
    private double interestRate;
    
    public SavingsAccount(String accountNumber, double initialBalance, double interestRate) {
        super(accountNumber, initialBalance);
        this.interestRate = interestRate;
    }
}

public class OOPExample {
    public static void main(String[] args) {
        SavingsAccount account = new SavingsAccount("SA123", 1000.0, 2.5);
        account.deposit(500.0);
        System.out.println("Balance: $" + account.getBalance());
    }
}`}
              </pre>
            </div>

            <div
              style={{
                background: "#f0fdf4",
                borderLeft: "4px solid #10b981",
                padding: "1rem 1.5rem",
                margin: "1.5rem 0",
                borderRadius: "0 12px 12px 0",
              }}
            >
              <strong>Tip:</strong> Practice OOP concepts by creating simple
              classes like Student, Car, or BankAccount to understand how
              objects work.
            </div>
          </div>
        </section>
      )}

      {/* Add similar sections for other tabs */}

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

export default Fundamentals;
