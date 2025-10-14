import React, { useState } from "react";
import "../../../styles/fundamentals.css";

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
        <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto", opacity: 0.9 ,
           color: window.matchMedia('(prefers-color-scheme: dark)').matches
      ? "#ffffff"  // text color for dark mode
      : "#1a1a1a", // text color for light mode
        }}>
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
  { id: "examples", label: "Example Code" },
  { id: "files", label: "Files & Exceptions" },
  { id: "iterators", label: "Iterators & Generators" },
  { id: "modules", label: "Modules & Packages" },
  { id: "dsa", label: "Python for DSA" },
  { id: "numpy", label: "NumPy & Pandas" },
  { id: "multithreading", label: "Multithreading & Multiprocessing"},

  { id: "async", label: "Async Programming" },


  { id: "regex", label: "Regular Expressions (re)" },

]
.map(item => (
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
      
      {activeTab === "multithreading" && (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2><i className="fas fa-tasks"></i> 15. Multithreading & Multiprocessing in Python</h2>
      <p>
        Python allows concurrent execution to optimize I/O-bound and CPU-bound tasks.
        <strong>Threading</strong> is suitable for I/O-bound tasks, while <strong>Multiprocessing</strong> is better for CPU-bound tasks due to the GIL (Global Interpreter Lock).
      </p>

      <h3>Threading Example (I/O-bound)</h3>
      <div className="code-container">
        <button className={`copy-btn ${copiedCode === "threading" ? "copied" : ""}`} 
          onClick={() => copyCode(`import threading
import time

def print_numbers():
    for i in range(5):
        print(f"Number: {i}")
        time.sleep(1)

# Create threads
thread1 = threading.Thread(target=print_numbers)
thread2 = threading.Thread(target=print_numbers)

# Start threads
thread1.start()
thread2.start()

# Wait for threads to finish
thread1.join()
thread2.join()

print("Done!")`, "threading")}>
          {copiedCode === "threading" ? "Copied!" : "Copy"}
        </button>
        <pre>{`import threading
import time

def print_numbers():
    for i in range(5):
        print(f"Number: {i}")
        time.sleep(1)

# Create threads
thread1 = threading.Thread(target=print_numbers)
thread2 = threading.Thread(target=print_numbers)

# Start threads
thread1.start()
thread2.start()

# Wait for threads to finish
thread1.join()
thread2.join()

print("Done!")`}</pre>
      </div>

      <h3>Multiprocessing Example (CPU-bound)</h3>
      <div className="code-container">
        <button className={`copy-btn ${copiedCode === "multiprocessing" ? "copied" : ""}`} 
          onClick={() => copyCode(`import multiprocessing

def square(n):
    print(f"Square of {n} is {n*n}")

if __name__ == "__main__":
    processes = []
    for i in range(5):
        p = multiprocessing.Process(target=square, args=(i,))
        processes.append(p)
        p.start()

    for p in processes:
        p.join()

    print("All processes done!")`, "multiprocessing")}>
          {copiedCode === "multiprocessing" ? "Copied!" : "Copy"}
        </button>
        <pre>{`import multiprocessing

def square(n):
    print(f"Square of {n} is {n*n}")

if __name__ == "__main__":
    processes = []
    for i in range(5):
        p = multiprocessing.Process(target=square, args=(i,))
        processes.append(p)
        p.start()

    for p in processes:
        p.join()

    print("All processes done!")`}</pre>
      </div>

      <h3>Tips for Handling GIL & Shared Data</h3>
      <ul>
        <li>Use <strong>threading</strong> for I/O tasks; threads share memory.</li>
        <li>Use <strong>multiprocessing</strong> for CPU tasks; processes have separate memory.</li>
        <li>Use <strong>Queue</strong> or <strong>Manager</strong> to share data safely between processes.</li>
        <li>Avoid long-running CPU tasks in threads due to the GIL.</li>
      </ul>

      <div
        style={{
          background: "#eff6ff",
          borderLeft: "4px solid #3b82f6",
          padding: "1rem 1.5rem",
          margin: "1.5rem 0",
          borderRadius: "0 12px 12px 0",
        }}
      >
        <strong>Note:</strong> Threading improves I/O-bound concurrency, multiprocessing enables CPU-bound parallelism,
        and careful handling of shared data ensures safe and efficient execution.
      </div>
    </div>
  </section>
)}
{activeTab === "async" && (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2><i className="fas fa-bolt"></i> 16. Async Programming (async / await) using asyncio</h2>
      <p>
        <strong>Async programming</strong> provides a modern way to handle <strong>concurrent I/O-bound</strong> operations
        without blocking the main thread. This is ideal for API calls, database queries, and real-time applications.
      </p>

      <h3>Basic Example</h3>
      <p>Use <code>async def</code> to define asynchronous functions and <code>await</code> to pause execution until a coroutine completes.</p>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "async-basic" ? "copied" : ""}`}
          onClick={() =>
            copyCode(`import asyncio

async def greet(name):
    await asyncio.sleep(1)  # Simulate I/O operation
    print(f"Hello, {name}!")

async def main():
    await greet("Python")

asyncio.run(main())`, "async-basic")
          }
        >
          {copiedCode === "async-basic" ? "Copied!" : "Copy"}
        </button>
        <pre>{`import asyncio

async def greet(name):
    await asyncio.sleep(1)  # Simulate I/O operation
    print(f"Hello, {name}!")

async def main():
    await greet("Python")

asyncio.run(main())`}</pre>
      </div>

      <h3>Running Multiple Tasks Concurrently</h3>
      <p>You can use <code>asyncio.gather()</code> to run multiple coroutines at the same time efficiently.</p>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "async-concurrent" ? "copied" : ""}`}
          onClick={() =>
            copyCode(`import asyncio

async def fetch_data(source):
    print(f"Fetching from {source}...")
    await asyncio.sleep(2)
    print(f"Done: {source}")

async def main():
    await asyncio.gather(
        fetch_data("API 1"),
        fetch_data("API 2"),
        fetch_data("Database")
    )

asyncio.run(main())`, "async-concurrent")
          }
        >
          {copiedCode === "async-concurrent" ? "Copied!" : "Copy"}
        </button>
        <pre>{`import asyncio

async def fetch_data(source):
    print(f"Fetching from {source}...")
    await asyncio.sleep(2)
    print(f"Done: {source}")

async def main():
    await asyncio.gather(
        fetch_data("API 1"),
        fetch_data("API 2"),
        fetch_data("Database")
    )

asyncio.run(main())`}</pre>
      </div>

      <h3>Concurrency vs Parallelism</h3>
      <ul>
        <li><strong>Concurrency:</strong> Tasks take turns on a single thread (async I/O).</li>
        <li><strong>Parallelism:</strong> Tasks run simultaneously on multiple CPU cores (multiprocessing).</li>
      </ul>

      <div
        style={{
          background: "#ecfdf5",
          borderLeft: "4px solid #10b981",
          padding: "1rem 1.5rem",
          margin: "1.5rem 0",
          borderRadius: "0 12px 12px 0",
        }}
      >
        <strong>Tip:</strong> Use <code>asyncio</code> for I/O-bound tasks like API requests, DB calls, or network operations.
        Use multiprocessing for CPU-intensive tasks like ML model training or heavy computations.
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

    {activeTab === "regex" && (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2><i className="fas fa-italic"></i> 17. Regular Expressions (re module)</h2>
      <p>
        <strong>Regular Expressions (regex)</strong> allow you to search, match, and manipulate strings based on patterns.
        Python’s <code>re</code> module provides powerful tools for text processing, validation, and cleaning.
      </p>

      <h3>1. Pattern Matching & Searching</h3>
      <p>Use <code>re.match()</code> to check the start of a string, and <code>re.search()</code> to find a pattern anywhere.</p>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "regex-match" ? "copied" : ""}`}
          onClick={() =>
            copyCode(`import re

text = "Contact us at support@example.com"

# Match: pattern must be at the start
if re.match(r"Contact", text):
    print("Matched at the start!")

# Search: pattern can be anywhere
if re.search(r"example\\.com", text):
    print("Found 'example.com' in the text!")`, "regex-match")
          }
        >
          {copiedCode === "regex-match" ? "Copied!" : "Copy"}
        </button>
        <pre>{`import re

text = "Contact us at support@example.com"

# Match: pattern must be at the start
if re.match(r"Contact", text):
    print("Matched at the start!")

# Search: pattern can be anywhere
if re.search(r"example\\.com", text):
    print("Found 'example.com' in the text!")`}</pre>
      </div>

      <h3>2. Finding All Occurrences</h3>
      <p>Use <code>re.findall()</code> to extract all substrings matching a pattern — useful for emails, phone numbers, etc.</p>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "regex-findall" ? "copied" : ""}`}
          onClick={() =>
            copyCode(`import re

text = "Emails: alice@example.com, bob@test.org, hello@site.net"

emails = re.findall(r"[\\w\\.-]+@[\\w\\.-]+", text)
print(emails)  # ['alice@example.com', 'bob@test.org', 'hello@site.net']`, "regex-findall")
          }
        >
          {copiedCode === "regex-findall" ? "Copied!" : "Copy"}
        </button>
        <pre>{`import re

text = "Emails: alice@example.com, bob@test.org, hello@site.net"

emails = re.findall(r"[\\w\\.-]+@[\\w\\.-]+", text)
print(emails)  # ['alice@example.com', 'bob@test.org', 'hello@site.net']`}</pre>
      </div>

      <h3>3. Replacing Patterns</h3>
      <p>Use <code>re.sub()</code> to clean or standardize text by replacing patterns.</p>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "regex-sub" ? "copied" : ""}`}
          onClick={() =>
            copyCode(`import re

text = "My phone: 123-456-7890"
clean_text = re.sub(r"\\d", "X", text)
print(clean_text)  # My phone: XXX-XXX-XXXX`, "regex-sub")
          }
        >
          {copiedCode === "regex-sub" ? "Copied!" : "Copy"}
        </button>
        <pre>{`import re

text = "My phone: 123-456-7890"
clean_text = re.sub(r"\\d", "X", text)
print(clean_text)  # My phone: XXX-XXX-XXXX`}</pre>
      </div>

      <h3>4. Raw String Notation</h3>
      <p>
        Always use <code>r"pattern"</code> (raw strings) to avoid issues with backslashes.
        For example, <code>r"\d+"</code> matches one or more digits.
      </p>

      <div
        style={{
          background: "#ecfdf5",
          borderLeft: "4px solid #10b981",
          padding: "1rem 1.5rem",
          margin: "1.5rem 0",
          borderRadius: "0 12px 12px 0",
        }}
      >
        <strong>Common Patterns:</strong>
        <ul>
          <li><code>\\d</code> → Digit</li>
          <li><code>\\w</code> → Word character (letters, digits, underscore)</li>
          <li><code>.</code> → Any character</li>
          <li><code>^</code> → Start of string</li>
          <li><code>$</code> → End of string</li>
          <li><code>[a-zA-Z]</code> → Any letter</li>
          <li><code>( )</code> → Group</li>
          <li><code>+</code>, <code>*</code>, <code>?</code> → Quantifiers</li>
        </ul>
      </div>

      <h3>5. Use Cases</h3>
      <ul>
        <li> Email / Phone validation</li>
        <li> Extracting structured data from text</li>
        <li> Cleaning noisy text (e.g., logs, scraped data)</li>
        <li> Web scraping & form validation</li>
      </ul>
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

{activeTab === "files" && (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2><i className="fas fa-file"></i> 10. Files & Exceptions</h2>
      <h3>File Handling</h3>
      <p>Open, read, write, and close files using Python's built-in functions.</p>
      <pre>{`# Writing to a file
with open("data.txt", "w") as f:
    f.write("Hello, Python!")

# Reading from a file
with open("data.txt", "r") as f:
    content = f.read()
    print(content)`}</pre>

      <h3>Exception Handling</h3>
      <pre>{`try:
    x = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")
finally:
    print("Execution complete")`}</pre>
    </div>
  </section>
)}
{activeTab === "iterators" && (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2><i className="fas fa-sync-alt"></i> 11. Iterators & Generators</h2>
      <p>Iterators allow traversing through objects; generators create iterators efficiently.</p>
      <pre>{`# Iterator example
lst = [1,2,3]
it = iter(lst)
print(next(it))  # 1
print(next(it))  # 2

# Generator example
def gen_numbers(n):
    for i in range(n):
        yield i

for num in gen_numbers(5):
    print(num)`}</pre>
    </div>
  </section>
)}

{activeTab === "modules" && (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2><i className="fas fa-box"></i> 12. Modules & Packages</h2>
      <p>Modules are Python files with functions and variables; packages are collections of modules.</p>
      
      <h3>Using Built-in Modules</h3>
      <pre>{`import os
print(os.getcwd())  # Get current working directory

import sys
print(sys.version)  # Python version

from collections import Counter
nums = [1,2,2,3,3,3]
print(Counter(nums))  # Count occurrences`}</pre>
      
      <h3>Creating Your Own Module</h3>
      <pre>{`# save this as mymodule.py
def greet(name):
    return "Hello, " + name

# main.py
import mymodule
print(mymodule.greet("Python"))`}</pre>
    </div>
  </section>
)}
{activeTab === "dsa" && (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2><i className="fas fa-code-branch"></i> 13. Python for DSA</h2>
      <p>Implement common data structures using Python for algorithm practice.</p>
      
      <h3>Stack (LIFO)</h3>
      <pre>{`stack = []
stack.append(1)
stack.append(2)
stack.append(3)
print(stack.pop())  # 3
print(stack.pop())  # 2`}</pre>
      
      <h3>Queue (FIFO)</h3>
      <pre>{`from collections import deque
queue = deque([1,2,3])
queue.append(4)
print(queue.popleft())  # 1
print(queue.popleft())  # 2`}</pre>
      
      <h3>Heap</h3>
      <pre>{`import heapq
heap = [3,1,4,2]
heapq.heapify(heap)
heapq.heappush(heap, 0)
print(heapq.heappop(heap))  # 0 (smallest element)`}</pre>
      
      <h3>Linked List (Basic)</h3>
      <pre>{`class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

head = Node(1)
second = Node(2)
head.next = second
print(head.data, head.next.data)  # 1 2`}</pre>
    </div>
  </section>
)}
{activeTab === "numpy" && (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2><i className="fas fa-chart-bar"></i> 14. NumPy & Pandas</h2>
      <p>Popular libraries for scientific computing and data manipulation.</p>
      
      <h3>NumPy Example</h3>
      <pre>{`import numpy as np

arr = np.array([1,2,3,4])
print(arr * 2)        # [2 4 6 8]
print(arr.mean())     # 2.5
print(arr.reshape(2,2))`}</pre>
      
      <h3>Pandas Example</h3>
      <pre>{`import pandas as pd

data = {'Name': ['Alice', 'Bob'], 'Age': [25, 30]}
df = pd.DataFrame(data)
print(df)
print(df['Age'].mean())`}</pre>
    </div>
  </section>
)}


 
    </div>
  );
};

export default PythonFundamentals;
