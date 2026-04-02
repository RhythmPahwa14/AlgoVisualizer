import React from "react";

const ConstructorsSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-tools"></i> 17. Constructors
      </h2>
      <p>
        Constructors in Java initialize <strong>objects</strong>. If no constructor is declared, 
        Java provides a <strong>default constructor</strong>. You can also <strong>overload constructors</strong> 
        to allow multiple ways to create objects. Key points:
        <ul>
          <li>Default constructor initializes fields to default values.</li>
          <li>Overloaded constructors allow setting initial values during object creation.</li>
          <li>Use <code>this(...)</code> to call another constructor in the same class.</li>
        </ul>
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "constructors_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// ConstructorsExample.java
public class ConstructorsExample {
    String name;
    int age;

    // Default constructor
    public ConstructorsExample() {
        this.name = "Unknown";
        this.age = 0;
    }

    // Overloaded constructor
    public ConstructorsExample(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public static void main(String[] args) {
        ConstructorsExample a = new ConstructorsExample("Alice", 21);
        ConstructorsExample b = new ConstructorsExample(); // default
        System.out.println(a.name + " " + a.age); // Alice 21
        System.out.println(b.name + " " + b.age); // Unknown 0
    }
}`,
              "constructors_code"
            )
          }
        >
          {copiedCode === "constructors_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// ConstructorsExample.java
public class ConstructorsExample {
    String name;
    int age;

    // Default constructor
    public ConstructorsExample() {
        this.name = "Unknown";
        this.age = 0;
    }

    // Overloaded constructor
    public ConstructorsExample(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public static void main(String[] args) {
        ConstructorsExample a = new ConstructorsExample("Alice", 21);
        ConstructorsExample b = new ConstructorsExample(); // default
        System.out.println(a.name + " " + a.age); // Alice 21
        System.out.println(b.name + " " + b.age); // Unknown 0
    }
}`}</pre>
      </div>

      <p style={{ fontSize: "0.9rem", color: "#000", marginTop: "0.5rem" }}>
        <span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Tip: Overloaded constructors make object creation flexible. Default values help prevent uninitialized fields.
      </p>
    </div>
  </section>
);

export default ConstructorsSection;

