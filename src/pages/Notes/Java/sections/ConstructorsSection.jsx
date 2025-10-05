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

      <p style={{ fontSize: "0.9rem", color: "#555", marginTop: "0.5rem" }}>
        💡 Tip: Overloaded constructors make object creation flexible. Default values help prevent uninitialized fields.
      </p>
    </div>
  </section>
);

export default ConstructorsSection;
