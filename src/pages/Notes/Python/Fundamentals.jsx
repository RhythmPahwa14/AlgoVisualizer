import React, { useState } from "react";

const PythonFundamentals = () => {
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
          Python Fundamentals
        </h1>
        <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto", opacity: 0.9,color: window.matchMedia('(prefers-color-scheme: dark)').matches
      ? "#ffffff"  // text color for dark mode
      : "#1a1a1a", // text color for light mode
  }}
>
          A comprehensive guide to Python programming for beginners. Learn core concepts with detailed explanations and examples.
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
            { id: "intro", label: "Introduction" },
            { id: "setup", label: "Setup" },
            { id: "syntax", label: "Syntax" },
            { id: "datatypes", label: "Data Types" },
            { id: "variables", label: "Variables" },
            { id: "operators", label: "Operators" },
            { id: "control", label: "Control Flow" },
            { id: "functions", label: "Functions" },
            { id: "oop", label: "OOP Concepts" },
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

      {/* Introduction */}
      {activeTab === "intro" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-play-circle"></i> 1. Introduction to Python</h2>
            <p>Python is a high-level, interpreted, dynamically-typed, and general-purpose programming language created by Guido van Rossum in 1991.</p>
            <h3>Key Features</h3>
            <ul>
              <li><strong>Easy to Learn:</strong> Clear and readable syntax</li>
              <li><strong>Interpreted:</strong> Run code line by line, no compilation needed</li>
              <li><strong>Object-Oriented:</strong> Supports OOP with classes and objects</li>
              <li><strong>Extensive Libraries:</strong> Standard library plus thousands of third-party packages</li>
              <li><strong>Cross-Platform:</strong> Works on Windows, Linux, macOS</li>
            </ul>
            <div style={{ background: "var(--card-bg, #ffffff)", borderLeft: "4px solid #f59e0b", padding: "1rem 1.5rem", margin: "1.5rem 0", borderRadius: "0 12px 12px 0" }}>
              <strong>Note:</strong> Python is widely used in web development, data science, automation, AI, and more.
            </div>
          </div>
        </section>
      )}

      {/* Setup */}
      {activeTab === "setup" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-cogs"></i> 2. Setting Up Python Environment</h2>
            <h3>Step 1: Install Python</h3>
            <p>Download and install Python from <a href="https://www.python.org/downloads/" target="_blank">python.org</a>. Make sure to add Python to PATH.</p>
            <h3>Step 2: Choose an IDE</h3>
            <ul>
              <li>PyCharm - Professional IDE for Python</li>
              <li>VS Code - Lightweight, customizable, with Python extensions</li>
              <li>Jupyter Notebook - Best for data science and experimentation</li>
            </ul>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "setup" ? "copied" : ""}`} onClick={() => copyCode(`print("Hello, Python!")\nimport sys\nprint("Python Version:", sys.version)`, "setup")}>
                {copiedCode === "setup" ? "Copied!" : "Copy"}
              </button>
              <pre>{`print("Hello, Python!")\nimport sys\nprint("Python Version:", sys.version)`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* Syntax */}
      {activeTab === "syntax" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-code"></i> 3. Python Syntax</h2>
            <p>Python emphasizes readability using indentation and avoids curly braces or semicolons.</p>
            <ul>
              <li>Indentation defines code blocks.</li>
              <li>No need for semicolons at the end of lines.</li>
              <li>Comments use the <code>#</code> symbol.</li>
            </ul>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "syntax" ? "Copied!" : ""}`} onClick={() => copyCode(`# Syntax example
      if True:
          print("Indentation matters!")  # This will run`, "syntax")}>
                {copiedCode === "syntax" ? "Copied!" : "Copy"}
              </button>
              <pre>{`# Syntax example
      if True:
          print("Indentation matters!")  # This will run`}</pre>
            </div>
          </div>
        </section>
      )}      

      {/* Data Types */}
      {activeTab === "datatypes" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-database"></i> 4. Data Types in Python</h2>
            <p>Python has dynamic typing and several built-in data types.</p>
            <h3>Common Data Types</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", margin: "1rem 0" }}>
              <thead style={{ backgroundColor: "var(--card-bg, #ffffff)"}}>
                <tr>
                  <th style={{ padding: "0.75rem 1rem", textAlign: "left" }}>Data Type</th>
                  <th style={{ padding: "0.75rem 1rem", textAlign: "left" }}>Example</th>
                  <th style={{ padding: "0.75rem 1rem", textAlign: "left" }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["int", "10", "Integer numbers"],
                  ["float", "10.5", "Decimal numbers"],
                  ["str", "'Hello'", "String of characters"],
                  ["bool", "True / False", "Boolean values"],
                  ["list", "[1,2,3]", "Ordered mutable collection"],
                  ["tuple", "(1,2,3)", "Ordered immutable collection"],
                  ["set", "{1,2,3}", "Unordered unique collection"],
                  ["dict", "{'a':1}", "Key-value mapping"]
                ].map(([type, example, desc]) => (
                  <tr key={type} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: "0.75rem 1rem" }}><code>{type}</code></td>
                    <td style={{ padding: "0.75rem 1rem" }}>{example}</td>
                    <td style={{ padding: "0.75rem 1rem" }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "datatypes" ? "copied" : ""}`} onClick={() => copyCode(`# Example of different data types\nname = "Python"\nage = 30\nheight = 5.8\nis_coding_fun = True\nnumbers = [1, 2, 3]\ninfo = {"lang": "Python", "level": "Beginner"}\nprint(name, age, height, is_coding_fun, numbers, info)`, "datatypes")}>
                {copiedCode === "datatypes" ? "Copied!" : "Copy"}
              </button>
              <pre>{`# Example of different data types
name = "Python"
age = 30
height = 5.8
is_coding_fun = True
numbers = [1, 2, 3]
info = {"lang": "Python", "level": "Beginner"}
print(name, age, height, is_coding_fun, numbers, info)`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* Variables */}
      {activeTab === "variables" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-tag"></i> 5. Variables in Python</h2>
            <p>Variables store data. No explicit declaration is required.</p>
            <h3>Examples</h3>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "variables" ? "copied" : ""}`} onClick={() => copyCode(`# Variables in Python
x = 10      # integer
y = 5.5     # float
name = "Python"  # string
is_coding = True  # boolean

print(x, y, name, is_coding)`, "variables")}>
                {copiedCode === "variables" ? "Copied!" : "Copy"}
              </button>
              <pre>{`# Variables in Python
x = 10      # integer
y = 5.5     # float
name = "Python"  # string
is_coding = True  # boolean

print(x, y, name, is_coding)`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* Operators */}
      {activeTab === "operators" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-plus-square"></i> 6. Operators in Python</h2>
            <p>Python provides various types of operators for performing operations on variables and values.</p>
            <h3>Types of Operators</h3>
            <ul>
              <li><strong>Arithmetic Operators:</strong> <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>//</code>, <code>%</code>, <code>**</code></li>
              <li><strong>Comparison Operators:</strong> <code>==</code>, <code>!=</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code></li>
              <li><strong>Logical Operators:</strong> <code>and</code>, <code>or</code>, <code>not</code></li>
              <li><strong>Assignment Operators:</strong> <code>=</code>, <code>+=</code>, <code>-=</code>, etc.</li>
              <li><strong>Bitwise Operators:</strong> <code>&amp;</code>, <code>|</code>, <code>^</code>, <code>~</code>, <code>&lt;&lt;</code>, <code>&gt;&gt;</code></li>
            </ul>
            <div className="code-container">
              <button
                className={`copy-btn ${copiedCode === "operators" ? "copied" : ""}`}
                onClick={() => copyCode(`# Arithmetic Operators
      x = 10
      y = 3
      print("Add:", x + y)
      print("Subtract:", x - y)
      print("Multiply:", x * y)
      print("Divide:", x / y)
      print("Floor Division:", x // y)
      print("Modulus:", x % y)
      print("Exponent:", x ** y)

      # Comparison Operators
      print("Equal:", x == y)
      print("Not Equal:", x != y)
      print("Greater:", x > y)
      print("Less:", x < y)

      # Logical Operators
      a = True
      b = False
      print("AND:", a and b)
      print("OR:", a or b)
      print("NOT:", not a)`, "operators")}
              >
                {copiedCode === "operators" ? "Copied!" : "Copy"}
              </button>
              <pre>{`# Arithmetic Operators
      x = 10
      y = 3
      print("Add:", x + y)
      print("Subtract:", x - y)
      print("Multiply:", x * y)
      print("Divide:", x / y)
      print("Floor Division:", x // y)
      print("Modulus:", x % y)
      print("Exponent:", x ** y)

      # Comparison Operators
      print("Equal:", x == y)
      print("Not Equal:", x != y)
      print("Greater:", x > y)
      print("Less:", x < y)

      # Logical Operators
      a = True
      b = False
      print("AND:", a and b)
      print("OR:", a or b)
      print("NOT:", not a)`}</pre>
            </div>
          </div>
        </section>
      )}

    

      {/* Control Flow */}
      {activeTab === "control" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-sitemap"></i> 7. Control Flow Statements</h2>
            <p>Control flow determines execution order.</p>
            <h3>Decision Making</h3>
            <ul>
              <li><strong>if:</strong> Executes code if condition is True</li>
              <li><strong>if-else:</strong> Executes one block if True, another if False</li>
              <li><strong>elif:</strong> Multiple conditions</li>
            </ul>
            <h3>Loops</h3>
            <ul>
              <li><strong>for loop:</strong> Iterates over sequence</li>
              <li><strong>while loop:</strong> Repeats while condition is True</li>
            </ul>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "control" ? "copied" : ""}`} onClick={() => copyCode(`# If-elif-else
score = 85
if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
else:
    print("Grade: C")

# For loop
for i in range(1,6):
    print("Number:", i)

# While loop
count = 1
while count <= 5:
    print("Count:", count)
    count += 1`, "control")}>
                {copiedCode === "control" ? "Copied!" : "Copy"}
              </button>
              <pre>{`# If-elif-else
score = 85
if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
else:
    print("Grade: C")

# For loop
for i in range(1,6):
    print("Number:", i)

# While loop
count = 1
while count <= 5:
    print("Count:", count)
    count += 1`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* Functions */}
      {activeTab === "functions" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-code"></i> 8. Functions in Python</h2>
            <p>Functions allow code reuse and modular design.</p>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "functions" ? "copied" : ""}`} onClick={() => copyCode(`# Function example
def greet(name):
    return "Hello, " + name

print(greet("Python"))`, "functions")}>
                {copiedCode === "functions" ? "Copied!" : "Copy"}
              </button>
              <pre>{`# Function example
def greet(name):
    return "Hello, " + name

print(greet("Python"))`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* OOP */}
      {activeTab === "oop" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-object-group"></i> 9. Object-Oriented Programming Concepts</h2>
            <p>Python supports OOP with classes and objects.</p>
            <h3>Example</h3>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "oop" ? "copied" : ""}`} onClick={() => copyCode(`# Class and object example
class BankAccount:
    def __init__(self, account_number, balance):
        self.account_number = account_number
        self.balance = balance

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount

    def get_balance(self):
        return self.balance

class SavingsAccount(BankAccount):
    def __init__(self, account_number, balance, interest_rate):
        super().__init__(account_number, balance)
        self.interest_rate = interest_rate

account = SavingsAccount("SA123", 1000.0, 2.5)
account.deposit(500)
print("Balance:", account.get_balance())`, "oop")}>
                {copiedCode === "oop" ? "Copied!" : "Copy"}
              </button>
              <pre>{`# Class and object example
class BankAccount:
    def __init__(self, account_number, balance):
        self.account_number = account_number
        self.balance = balance

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount

    def get_balance(self):
        return self.balance

class SavingsAccount(BankAccount):
    def __init__(self, account_number, balance, interest_rate):
        super().__init__(account_number, balance)
        self.interest_rate = interest_rate

account = SavingsAccount("SA123", 1000.0, 2.5)
account.deposit(500)
print("Balance:", account.get_balance())`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* examples */}
      {activeTab === "examples" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-terminal"></i> Example Code</h2>
            <p>A simple example to get started with Python:</p>
            <div className="code-container">
              <button
                className={`copy-btn ${copiedCode === "examples" ? "copied" : ""}`}
                onClick={() =>
                  copyCode(`# Hello World in Python\nprint("Hello, Python!")`, "examples")
                }
              >
                {copiedCode === "examples" ? "Copied!" : "Copy"}
              </button>
              <pre>{`# Hello World in Python
      print("Hello, Python!")`}</pre>
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

export default PythonFundamentals;
