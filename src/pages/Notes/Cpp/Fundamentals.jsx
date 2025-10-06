import React, { useState } from "react";

const CppFundamentals = () => {
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
          C++ Fundamentals
        </h1>
        <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto", opacity: 0.9 ,color: window.matchMedia('(prefers-color-scheme: dark)').matches
      ? "#ffffff"  // text color for dark mode
      : "#1a1a1a", // text color for light mode
  }}
>
          A comprehensive guide to C++ programming for beginners. Learn core concepts with detailed explanations and examples.
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
            { id: "syntax", label: "Syntax" },
            { id: "datatypes", label: "Data Types" },
            { id: "variables", label: "Variables" },
            { id: "operators", label: "Operators" },
            { id: "control", label: "Control Flow" },
            { id: "functions", label: "Functions" },
            { id: "oop", label: "OOP Concepts" },
            { id: "templates", label: "Templates" },
            { id: "stl", label: "STL" },
            { id: "filehandling", label: "File Handling" },
            { id: "examples", label: "Example Code" },
            { id: "pointers", label: "Pointers" },
{ id: "memory", label: "Dynamic Memory" },
{ id: "exceptions", label: "Exception Handling" },
{ id: "multithreading", label: "Multithreading" },

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
            <h2><i className="fas fa-play-circle"></i> 1. Introduction to C++</h2>
            <p>C++ is a high-performance, general-purpose programming language created by Bjarne Stroustrup as an extension of the C programming language.</p>
            <h3>Key Features</h3>
            <ul>
              <li><strong>Object-Oriented:</strong> Supports classes, objects, inheritance, polymorphism, and encapsulation</li>
              <li><strong>High Performance:</strong> Direct memory manipulation and low-level operations</li>
              <li><strong>Standard Template Library (STL):</strong> Rich collection of algorithms and data structures</li>
              <li><strong>Cross-Platform:</strong> Compiles to native machine code for various platforms</li>
              <li><strong>Backward Compatible:</strong> Can compile most C programs</li>
            </ul>
            <div style={{ background: "var(--card-bg, #ffffff)", borderLeft: "4px solid #f59e0b", padding: "1rem 1.5rem", margin: "1.5rem 0", borderRadius: "0 12px 12px 0" }}>
              <strong>Note:</strong> C++ is widely used in system programming, game development, embedded systems, and high-performance applications.
            </div>
          </div>
        </section>
      )}

      {/* Syntax */}
      {activeTab === "syntax" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-code"></i> 2. C++ Syntax</h2>
            <p>C++ syntax is similar to C but includes additional features for object-oriented programming.</p>
            <ul>
              <li>Statements end with semicolons (<code>;</code>)</li>
              <li>Code blocks are enclosed in curly braces <code>{}</code></li>
              <li>Comments use <code>//</code> for single line and <code>/* */</code> for multi-line</li>
              <li>Case-sensitive language</li>
            </ul>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "syntax" ? "copied" : ""}`} onClick={() => copyCode(`#include <iostream>
using namespace std;

int main() {
    // This is a comment
    cout << "Hello, C++!" << endl;
    return 0;
}`, "syntax")}>
                {copiedCode === "syntax" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <iostream>
using namespace std;

int main() {
    // This is a comment
    cout << "Hello, C++!" << endl;
    return 0;
}`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* Data Types */}
      {activeTab === "datatypes" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-database"></i> 3. Data Types in C++</h2>
            <p>C++ provides various built-in data types for different kinds of data.</p>
            <h3>Common Data Types</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", margin: "1rem 0" }}>
              <thead style={{ backgroundColor: "var(--card-bg, #ffffff)"}}>
                <tr>
                  <th style={{ padding: "0.75rem 1rem", textAlign: "left" }}>Data Type</th>
                  <th style={{ padding: "0.75rem 1rem", textAlign: "left" }}>Size</th>
                  <th style={{ padding: "0.75rem 1rem", textAlign: "left" }}>Range</th>
                  <th style={{ padding: "0.75rem 1rem", textAlign: "left" }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["int", "4 bytes", "-2,147,483,648 to 2,147,483,647", "Integer numbers"],
                  ["float", "4 bytes", "±3.4e-38 to ±3.4e38", "Single precision floating point"],
                  ["double", "8 bytes", "±1.7e-308 to ±1.7e308", "Double precision floating point"],
                  ["char", "1 byte", "-128 to 127", "Single character"],
                  ["bool", "1 byte", "true/false", "Boolean values"],
                  ["string", "Variable", "N/A", "Sequence of characters"]
                ].map(([type, size, range, desc]) => (
                  <tr key={type} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: "0.75rem 1rem" }}><code>{type}</code></td>
                    <td style={{ padding: "0.75rem 1rem" }}>{size}</td>
                    <td style={{ padding: "0.75rem 1rem" }}>{range}</td>
                    <td style={{ padding: "0.75rem 1rem" }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "datatypes" ? "copied" : ""}`} onClick={() => copyCode(`#include <iostream>
#include <string>
using namespace std;

int main() {
    int age = 25;
    float height = 5.9f;
    double pi = 3.14159;
    char grade = 'A';
    bool isStudent = true;
    string name = "John";

    cout << "Age: " << age << endl;
    cout << "Height: " << height << endl;
    cout << "Pi: " << pi << endl;
    cout << "Grade: " << grade << endl;
    cout << "Is Student: " << isStudent << endl;
    cout << "Name: " << name << endl;

    return 0;
}`, "datatypes")}>
                {copiedCode === "datatypes" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <iostream>
#include <string>
using namespace std;

int main() {
    int age = 25;
    float height = 5.9f;
    double pi = 3.14159;
    char grade = 'A';
    bool isStudent = true;
    string name = "John";

    cout << "Age: " << age << endl;
    cout << "Height: " << height << endl;
    cout << "Pi: " << pi << endl;
    cout << "Grade: " << grade << endl;
    cout << "Is Student: " << isStudent << endl;
    cout << "Name: " << name << endl;

    return 0;
}`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* Variables */}
      {activeTab === "variables" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-tag"></i> 4. Variables in C++</h2>
            <p>Variables are containers for storing data values. They must be declared with a data type.</p>
            <h3>Variable Declaration and Initialization</h3>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "variables" ? "copied" : ""}`} onClick={() => copyCode(`#include <iostream>
using namespace std;

int main() {
    // Variable declaration
    int number;
    double decimal;
    char letter;
    string text;

    // Variable initialization
    number = 42;
    decimal = 3.14;
    letter = 'A';
    text = "Hello";

    // Declaration with initialization
    int x = 10;
    double y = 2.5;
    char z = 'B';
    string message = "World";

    cout << "Number: " << number << endl;
    cout << "Decimal: " << decimal << endl;
    cout << "Letter: " << letter << endl;
    cout << "Text: " << text << endl;
    cout << "X: " << x << endl;
    cout << "Y: " << y << endl;
    cout << "Z: " << z << endl;
    cout << "Message: " << message << endl;

    return 0;
}`, "variables")}>
                {copiedCode === "variables" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <iostream>
using namespace std;

int main() {
    // Variable declaration
    int number;
    double decimal;
    char letter;
    string text;

    // Variable initialization
    number = 42;
    decimal = 3.14;
    letter = 'A';
    text = "Hello";

    // Declaration with initialization
    int x = 10;
    double y = 2.5;
    char z = 'B';
    string message = "World";

    cout << "Number: " << number << endl;
    cout << "Decimal: " << decimal << endl;
    cout << "Letter: " << letter << endl;
    cout << "Text: " << text << endl;
    cout << "X: " << x << endl;
    cout << "Y: " << y << endl;
    cout << "Z: " << z << endl;
    cout << "Message: " << message << endl;

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
            <h2><i className="fas fa-plus-square"></i> 5. Operators in C++</h2>
            <p>C++ provides various operators for performing operations on variables and values.</p>
            <h3>Types of Operators</h3>
            <ul>
              <li><strong>Arithmetic Operators:</strong> <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code>, <code>++</code>, <code>--</code></li>
              <li><strong>Comparison Operators:</strong> <code>==</code>, <code>!=</code>, <code>{'>'}</code>, <code>{'<'}</code>, <code>{'>='}</code>, <code>{'<='}</code></li>
              <li><strong>Logical Operators:</strong> <code>&&</code>, <code>||</code>, <code>!</code></li>
              <li><strong>Assignment Operators:</strong> <code>=</code>, <code>+=</code>, <code>-=</code>, <code>*=</code>, <code>/=</code>, etc.</li>
              <li><strong>Bitwise Operators:</strong> <code>&</code>, <code>|</code>, <code>^</code>, <code>~</code>, <code>{'<<'}</code>, <code>{'>>'}</code></li>
            </ul>
            <div className="code-container">
              <button
                className={`copy-btn ${copiedCode === "operators" ? "copied" : ""}`}
                onClick={() => copyCode(`#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 3;

    // Arithmetic operators
    cout << "Addition: " << a + b << endl;
    cout << "Subtraction: " << a - b << endl;
    cout << "Multiplication: " << a * b << endl;
    cout << "Division: " << a / b << endl;
    cout << "Modulus: " << a % b << endl;

    // Comparison operators
    cout << "Equal: " << (a == b) << endl;
    cout << "Not equal: " << (a != b) << endl;
    cout << "Greater than: " << (a > b) << endl;
    cout << "Less than: " << (a < b) << endl;

    // Logical operators
    bool x = true, y = false;
    cout << "AND: " << (x && y) << endl;
    cout << "OR: " << (x || y) << endl;
    cout << "NOT: " << (!x) << endl;

    // Assignment operators
    int c = 5;
    c += 3; // c = c + 3
    cout << "c after += 3: " << c << endl;

    return 0;
}`, "operators")}
              >
                {copiedCode === "operators" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 3;

    // Arithmetic operators
    cout << "Addition: " << a + b << endl;
    cout << "Subtraction: " << a - b << endl;
    cout << "Multiplication: " << a * b << endl;
    cout << "Division: " << a / b << endl;
    cout << "Modulus: " << a % b << endl;

    // Comparison operators
    cout << "Equal: " << (a == b) << endl;
    cout << "Not equal: " << (a != b) << endl;
    cout << "Greater than: " << (a > b) << endl;
    cout << "Less than: " << (a < b) << endl;

    // Logical operators
    bool x = true, y = false;
    cout << "AND: " << (x && y) << endl;
    cout << "OR: " << (x || y) << endl;
    cout << "NOT: " << (!x) << endl;

    // Assignment operators
    int c = 5;
    c += 3; // c = c + 3
    cout << "c after += 3: " << c << endl;

    return 0;
}`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* Control Flow */}
      {activeTab === "control" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-sitemap"></i> 6. Control Flow Statements</h2>
            <p>Control flow statements determine the order in which code is executed.</p>
            <h3>Decision Making</h3>
            <ul>
              <li><strong>if:</strong> Executes code if condition is true</li>
              <li><strong>if-else:</strong> Executes one block if true, another if false</li>
              <li><strong>else if:</strong> Multiple conditions</li>
              <li><strong>switch:</strong> Multi-way branch statement</li>
            </ul>
            <h3>Loops</h3>
            <ul>
              <li><strong>for loop:</strong> Executes code a specific number of times</li>
              <li><strong>while loop:</strong> Repeats while condition is true</li>
              <li><strong>do-while loop:</strong> Executes at least once, then repeats while condition is true</li>
            </ul>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "control" ? "copied" : ""}`} onClick={() => copyCode(`#include <iostream>
using namespace std;

int main() {
    int score = 85;

    // if-else statement
    if (score >= 90) {
        cout << "Grade: A" << endl;
    } else if (score >= 80) {
        cout << "Grade: B" << endl;
    } else if (score >= 70) {
        cout << "Grade: C" << endl;
    } else {
        cout << "Grade: F" << endl;
    }

    // for loop
    cout << "For loop: ";
    for (int i = 1; i <= 5; i++) {
        cout << i << " ";
    }
    cout << endl;

    // while loop
    cout << "While loop: ";
    int j = 1;
    while (j <= 5) {
        cout << j << " ";
        j++;
    }
    cout << endl;

    // switch statement
    int day = 3;
    switch (day) {
        case 1:
            cout << "Monday" << endl;
            break;
        case 2:
            cout << "Tuesday" << endl;
            break;
        case 3:
            cout << "Wednesday" << endl;
            break;
        default:
            cout << "Other day" << endl;
    }

    return 0;
}`, "control")}>
                {copiedCode === "control" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <iostream>
using namespace std;

int main() {
    int score = 85;

    // if-else statement
    if (score >= 90) {
        cout << "Grade: A" << endl;
    } else if (score >= 80) {
        cout << "Grade: B" << endl;
    } else if (score >= 70) {
        cout << "Grade: C" << endl;
    } else {
        cout << "Grade: F" << endl;
    }

    // for loop
    cout << "For loop: ";
    for (int i = 1; i <= 5; i++) {
        cout << i << " ";
    }
    cout << endl;

    // while loop
    cout << "While loop: ";
    int j = 1;
    while (j <= 5) {
        cout << j << " ";
        j++;
    }
    cout << endl;

    // switch statement
    int day = 3;
    switch (day) {
        case 1:
            cout << "Monday" << endl;
            break;
        case 2:
            cout << "Tuesday" << endl;
            break;
        case 3:
            cout << "Wednesday" << endl;
            break;
        default:
            cout << "Other day" << endl;
    }

    return 0;
}`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* Functions */}
      {activeTab === "functions" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-code"></i> 7. Functions in C++</h2>
            <p>Functions allow code reuse and modular design. They can take parameters and return values.</p>
            <h3>Function Components</h3>
            <ul>
              <li><strong>Return Type:</strong> The data type of the value returned by the function</li>
              <li><strong>Function Name:</strong> Identifier for the function</li>
              <li><strong>Parameters:</strong> Input values passed to the function</li>
              <li><strong>Function Body:</strong> The code that executes when the function is called</li>
            </ul>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "functions" ? "copied" : ""}`} onClick={() => copyCode(`#include <iostream>
using namespace std;

// Function declaration
int add(int a, int b);
void greet(string name);
int factorial(int n);

int main() {
    // Function calls
    cout << "Addition: " << add(5, 3) << endl;
    greet("Alice");
    cout << "Factorial of 5: " << factorial(5) << endl;

    return 0;
}

// Function definitions
int add(int a, int b) {
    return a + b;
}

void greet(string name) {
    cout << "Hello, " << name << "!" << endl;
}

int factorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}`, "functions")}>
                {copiedCode === "functions" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <iostream>
using namespace std;

// Function declaration
int add(int a, int b);
void greet(string name);
int factorial(int n);

int main() {
    // Function calls
    cout << "Addition: " << add(5, 3) << endl;
    greet("Alice");
    cout << "Factorial of 5: " << factorial(5) << endl;

    return 0;
}

// Function definitions
int add(int a, int b) {
    return a + b;
}

void greet(string name) {
    cout << "Hello, " << name << "!" << endl;
}

int factorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* OOP Concepts */}
      {activeTab === "oop" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-object-group"></i> 8. Object-Oriented Programming Concepts</h2>
            <p>C++ supports OOP with classes, objects, inheritance, polymorphism, and encapsulation.</p>
            <h3>Key Concepts</h3>
            <ul>
              <li><strong>Class:</strong> Blueprint for creating objects</li>
              <li><strong>Object:</strong> Instance of a class</li>
              <li><strong>Encapsulation:</strong> Bundling data and methods that operate on the data</li>
              <li><strong>Inheritance:</strong> Creating new classes from existing classes</li>
              <li><strong>Polymorphism:</strong> Ability to take many forms</li>
            </ul>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "oop" ? "copied" : ""}`} onClick={() => copyCode(`#include <iostream>
#include <string>
using namespace std;

// Base class
class Animal {
protected:
    string name;
public:
    Animal(string n) : name(n) {}

    virtual void makeSound() {
        cout << "Some generic animal sound" << endl;
    }

    void eat() {
        cout << name << " is eating." << endl;
    }
};

// Derived class (Inheritance)
class Dog : public Animal {
public:
    Dog(string n) : Animal(n) {}

    // Polymorphism - overriding base class method
    void makeSound() override {
        cout << name << " says: Woof!" << endl;
    }

    void fetch() {
        cout << name << " is fetching the ball." << endl;
    }
};

int main() {
    // Creating objects
    Animal* animal = new Animal("Generic Animal");
    Dog* dog = new Dog("Buddy");

    // Polymorphism in action
    animal->makeSound();
    dog->makeSound();

    // Encapsulation - accessing methods
    dog->eat();
    dog->fetch();

    // Clean up
    delete animal;
    delete dog;

    return 0;
}`, "oop")}>
                {copiedCode === "oop" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <iostream>
#include <string>
using namespace std;

// Base class
class Animal {
protected:
    string name;
public:
    Animal(string n) : name(n) {}

    virtual void makeSound() {
        cout << "Some generic animal sound" << endl;
    }

    void eat() {
        cout << name << " is eating." << endl;
    }
};

// Derived class (Inheritance)
class Dog : public Animal {
public:
    Dog(string n) : Animal(n) {}

    // Polymorphism - overriding base class method
    void makeSound() override {
        cout << name << " says: Woof!" << endl;
    }

    void fetch() {
        cout << name << " is fetching the ball." << endl;
    }
};

int main() {
    // Creating objects
    Animal* animal = new Animal("Generic Animal");
    Dog* dog = new Dog("Buddy");

    // Polymorphism in action
    animal->makeSound();
    dog->makeSound();

    // Encapsulation - accessing methods
    dog->eat();
    dog->fetch();

    // Clean up
    delete animal;
    delete dog;

    return 0;
}`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* Templates */}
      {activeTab === "templates" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-puzzle-piece"></i> 9. Templates in C++</h2>
            <p>Templates allow you to write generic code that works with any data type.</p>
            <h3>Function Templates</h3>
            <p>Function templates create functions that can work with different data types.</p>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "templates" ? "copied" : ""}`} onClick={() => copyCode(`#include <iostream>
using namespace std;

// Function template
template <typename T>
T maximum(T a, T b) {
    return (a > b) ? a : b;
}

// Class template
template <typename T>
class Container {
private:
    T value;
public:
    Container(T val) : value(val) {}

    T getValue() {
        return value;
    }

    void setValue(T val) {
        value = val;
    }
};

int main() {
    // Using function template
    cout << "Max of 5 and 10: " << maximum(5, 10) << endl;
    cout << "Max of 3.14 and 2.71: " << maximum(3.14, 2.71) << endl;

    // Using class template
    Container<int> intContainer(42);
    Container<string> stringContainer("Hello");

    cout << "Integer container: " << intContainer.getValue() << endl;
    cout << "String container: " << stringContainer.getValue() << endl;

    return 0;
}`, "templates")}>
                {copiedCode === "templates" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <iostream>
using namespace std;

// Function template
template <typename T>
T maximum(T a, T b) {
    return (a > b) ? a : b;
}

// Class template
template <typename T>
class Container {
private:
    T value;
public:
    Container(T val) : value(val) {}

    T getValue() {
        return value;
    }

    void setValue(T val) {
        value = val;
    }
};

int main() {
    // Using function template
    cout << "Max of 5 and 10: " << maximum(5, 10) << endl;
    cout << "Max of 3.14 and 2.71: " << maximum(3.14, 2.71) << endl;

    // Using class template
    Container<int> intContainer(42);
    Container<string> stringContainer("Hello");

    cout << "Integer container: " << intContainer.getValue() << endl;
    cout << "String container: " << stringContainer.getValue() << endl;

    return 0;
}`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* STL */}
      {activeTab === "stl" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2><i className="fas fa-boxes"></i> 10. Standard Template Library (STL)</h2>
            <p>The STL provides a collection of template classes and functions for common data structures and algorithms.</p>
            <h3>Containers</h3>
            <ul>
              <li><strong>vector:</strong> Dynamic array</li>
              <li><strong>list:</strong> Doubly-linked list</li>
              <li><strong>deque:</strong> Double-ended queue</li>
              <li><strong>set:</strong> Unique elements, sorted</li>
              <li><strong>map:</strong> Key-value pairs, sorted by key</li>
            </ul>
            <h3>Algorithms</h3>
            <ul>
              <li><strong>sort:</strong> Sorts elements in a range</li>
              <li><strong>find:</strong> Finds an element in a range</li>
              <li><strong>reverse:</strong> Reverses the order of elements</li>
              <li><strong>max_element:</strong> Finds the maximum element</li>
              <li><strong>min_element:</strong> Finds the minimum element</li>
            </ul>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "stl" ? "copied" : ""}`} onClick={() => copyCode(`#include <iostream>
#include <vector>
#include <algorithm>
#include <map>
#include <set>
using namespace std;

int main() {
    // Vector example
    vector<int> numbers = {3, 1, 4, 1, 5, 9, 2, 6};
    cout << "Original vector: ";
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;

    // Sort the vector
    sort(numbers.begin(), numbers.end());
    cout << "Sorted vector: ";
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;

    // Find maximum and minimum
    auto max_it = max_element(numbers.begin(), numbers.end());
    auto min_it = min_element(numbers.begin(), numbers.end());
    cout << "Max: " << *max_it << ", Min: " << *min_it << endl;

    // Set example (unique elements)
    set<int> uniqueNumbers = {1, 2, 2, 3, 3, 3, 4};
    cout << "Set elements: ";
    for (int num : uniqueNumbers) {
        cout << num << " ";
    }
    cout << endl;

    // Map example
    map<string, int> ages;
    ages["Alice"] = 25;
    ages["Bob"] = 30;
    ages["Charlie"] = 35;

    cout << "Ages:" << endl;
    for (auto& pair : ages) {
        cout << pair.first << ": " << pair.second << endl;
    }

    return 0;
}`, "stl")}>
                {copiedCode === "stl" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <iostream>
#include <vector>
#include <algorithm>
#include <map>
#include <set>
using namespace std;

int main() {
    // Vector example
    vector<int> numbers = {3, 1, 4, 1, 5, 9, 2, 6};
    cout << "Original vector: ";
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;

    // Sort the vector
    sort(numbers.begin(), numbers.end());
    cout << "Sorted vector: ";
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;

    // Find maximum and minimum
    auto max_it = max_element(numbers.begin(), numbers.end());
    auto min_it = min_element(numbers.begin(), numbers.end());
    cout << "Max: " << *max_it << ", Min: " << *min_it << endl;

    // Set example (unique elements)
    set<int> uniqueNumbers = {1, 2, 2, 3, 3, 3, 4};
    cout << "Set elements: ";
    for (int num : uniqueNumbers) {
        cout << num << " ";
    }
    cout << endl;

    // Map example
    map<string, int> ages;
    ages["Alice"] = 25;
    ages["Bob"] = 30;
    ages["Charlie"] = 35;

    cout << "Ages:" << endl;
    for (auto& pair : ages) {
        cout << pair.first << ": " << pair.second << endl;
    }

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
            <h2><i className="fas fa-file-alt"></i> 11. File Handling in C++</h2>
            <p>C++ provides file handling capabilities through the fstream library for reading from and writing to files.</p>
            <h3>File Operations</h3>
            <ul>
              <li><strong>ofstream:</strong> For writing to files</li>
              <li><strong>ifstream:</strong> For reading from files</li>
              <li><strong>fstream:</strong> For both reading and writing</li>
            </ul>
            <div className="code-container">
              <button className={`copy-btn ${copiedCode === "filehandling" ? "copied" : ""}`} onClick={() => copyCode(`#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    // Writing to a file
    ofstream outputFile("example.txt");
    if (outputFile.is_open()) {
        outputFile << "Hello, World!" << endl;
        outputFile << "This is a sample text file." << endl;
        outputFile << "Line number three." << endl;
        outputFile.close();
        cout << "Data written to file successfully." << endl;
    } else {
        cout << "Unable to open file for writing." << endl;
    }

    // Reading from a file
    ifstream inputFile("example.txt");
    if (inputFile.is_open()) {
        string line;
        cout << "Reading from file:" << endl;
        while (getline(inputFile, line)) {
            cout << line << endl;
        }
        inputFile.close();
    } else {
        cout << "Unable to open file for reading." << endl;
    }

    // Appending to a file
    ofstream appendFile("example.txt", ios::app);
    if (appendFile.is_open()) {
        appendFile << "This line was appended." << endl;
        appendFile.close();
        cout << "Data appended to file successfully." << endl;
    }

    return 0;
}`, "filehandling")}>
                {copiedCode === "filehandling" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    // Writing to a file
    ofstream outputFile("example.txt");
    if (outputFile.is_open()) {
        outputFile << "Hello, World!" << endl;
        outputFile << "This is a sample text file." << endl;
        outputFile << "Line number three." << endl;
        outputFile.close();
        cout << "Data written to file successfully." << endl;
    } else {
        cout << "Unable to open file for writing." << endl;
    }

    // Reading from a file
    ifstream inputFile("example.txt");
    if (inputFile.is_open()) {
        string line;
        cout << "Reading from file:" << endl;
        while (getline(inputFile, line)) {
            cout << line << endl;
        }
        inputFile.close();
    } else {
        cout << "Unable to open file for reading." << endl;
    }

    // Appending to a file
    ofstream appendFile("example.txt", ios::app);
    if (appendFile.is_open()) {
        appendFile << "This line was appended." << endl;
        appendFile.close();
        cout << "Data appended to file successfully." << endl;
    }

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
            <p>A simple example to get started with C++:</p>
            <div className="code-container">
              <button
                className={`copy-btn ${copiedCode === "examples" ? "copied" : ""}`}
                onClick={() =>
                  copyCode(`#include <iostream>
using namespace std;

int main() {
    cout << "Hello, C++!" << endl;
    return 0;
}`, "examples")
                }
              >
                {copiedCode === "examples" ? "Copied!" : "Copy"}
              </button>
              <pre>{`#include <iostream>
using namespace std;

int main() {
    cout << "Hello, C++!" << endl;
    return 0;
}`}</pre>
            </div>
          </div>
        </section>
      )}

      {activeTab === "pointers" && (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2><i className="fas fa-crosshairs"></i> 12. Pointers</h2>
      <p>Pointers are variables that store memory addresses of other variables.</p>
      <div className="code-container">
        <button className={`copy-btn ${copiedCode === "pointers" ? "copied" : ""}`} 
          onClick={() => copyCode(`#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int* ptr = &x; // pointer storing address of x
    cout << "Value of x: " << x << endl;
    cout << "Address of x: " << ptr << endl;
    cout << "Value via pointer: " << *ptr << endl;
    return 0;
}`, "pointers")}>
          {copiedCode === "pointers" ? "Copied!" : "Copy"}
        </button>
        <pre>{`#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int* ptr = &x; // pointer storing address of x
    cout << "Value of x: " << x << endl;
    cout << "Address of x: " << ptr << endl;
    cout << "Value via pointer: " << *ptr << endl;
    return 0;
}`}</pre>
      </div>
    </div>
  </section>
)}

{activeTab === "memory" && (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2><i className="fas fa-memory"></i> 13. Dynamic Memory</h2>
      <p>Dynamic memory allocation allows runtime allocation using <code>new</code> and <code>delete</code>.</p>
      <div className="code-container">
        <button className={`copy-btn ${copiedCode === "memory" ? "copied" : ""}`} 
          onClick={() => copyCode(`#include <iostream>
using namespace std;

int main() {
    int* ptr = new int(42); // allocate memory
    cout << "Value: " << *ptr << endl;
    delete ptr; // free memory
    return 0;
}`, "memory")}>
          {copiedCode === "memory" ? "Copied!" : "Copy"}
        </button>
        <pre>{`#include <iostream>
using namespace std;

int main() {
    int* ptr = new int(42); // allocate memory
    cout << "Value: " << *ptr << endl;
    delete ptr; // free memory
    return 0;
}`}</pre>
      </div>
    </div>
  </section>
)}

{activeTab === "exceptions" && (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2><i className="fas fa-exclamation-triangle"></i> 14. Exception Handling</h2>
      <p>Exceptions handle runtime errors using <code>try</code>, <code>catch</code>, and <code>throw</code>.</p>
      <div className="code-container">
        <button className={`copy-btn ${copiedCode === "exceptions" ? "copied" : ""}`} 
          onClick={() => copyCode(`#include <iostream>
using namespace std;

int main() {
    try {
        int x = 0;
        if (x == 0) throw "Division by zero!";
        cout << 10 / x << endl;
    } catch (const char* e) {
        cout << "Error: " << e << endl;
    }
    return 0;
}`, "exceptions")}>
          {copiedCode === "exceptions" ? "Copied!" : "Copy"}
        </button>
        <pre>{`#include <iostream>
using namespace std;

int main() {
    try {
        int x = 0;
        if (x == 0) throw "Division by zero!";
        cout << 10 / x << endl;
    } catch (const char* e) {
        cout << "Error: " << e << endl;
    }
    return 0;
}`}</pre>
      </div>
    </div>
  </section>
)}

{activeTab === "multithreading" && (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2><i className="fas fa-project-diagram"></i> 15. Multithreading</h2>
      <p>Multithreading allows concurrent execution of code using the <code>thread</code> library.</p>
      <div className="code-container">
        <button className={`copy-btn ${copiedCode === "multithreading" ? "copied" : ""}`} 
          onClick={() => copyCode(`#include <iostream>
#include <thread>
using namespace std;

void task() {
    cout << "Task running in thread." << endl;
}

int main() {
    thread t(task);
    t.join(); // wait for thread to finish
    return 0;
}`, "multithreading")}>
          {copiedCode === "multithreading" ? "Copied!" : "Copy"}
        </button>
        <pre>{`#include <iostream>
#include <thread>
using namespace std;

void task() {
    cout << "Task running in thread." << endl;
}

int main() {
    thread t(task);
    t.join(); // wait for thread to finish
    return 0;
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

export default CppFundamentals;
