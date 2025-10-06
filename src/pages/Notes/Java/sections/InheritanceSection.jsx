import React from "react";

const InheritanceSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-share-alt"></i> 14. Inheritance
      </h2>
      <p>
        Inheritance allows a class to <strong>derive from another class</strong> using <code>extends</code>. 
        It promotes <strong>code reuse</strong> and hierarchical relationships. Key points:
        <ul>
          <li>Java supports <strong>single inheritance</strong> for classes (a class can only extend one other class).</li>
          <li>Use <code>super</code> to access parent class methods or constructors.</li>
          <li>Override methods in child classes using <code>@Override</code> annotation.</li>
        </ul>
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "inheritance_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// InheritanceExample.java
class Animal {
    void speak() { 
        System.out.println("Animal sound"); 
    }
}

class Dog extends Animal {
    @Override
    void speak() { 
        System.out.println("Bark"); 
    }
}

public class InheritanceExample {
    public static void main(String[] args) {
        Animal a = new Dog(); // Polymorphism
        a.speak(); // Bark
    }
}`,
              "inheritance_code"
            )
          }
        >
          {copiedCode === "inheritance_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// InheritanceExample.java
class Animal {
    void speak() { 
        System.out.println("Animal sound"); 
    }
}

class Dog extends Animal {
    @Override
    void speak() { 
        System.out.println("Bark"); 
    }
}

public class InheritanceExample {
    public static void main(String[] args) {
        Animal a = new Dog(); // Polymorphism
        a.speak(); // Bark
    }
}`}</pre>
      </div>

      <p style={{ fontSize: "0.9rem", color: "#555", marginTop: "0.5rem" }}>
        💡 Tip: Inheritance combined with polymorphism allows flexible and reusable code. Avoid deep inheritance trees for maintainability.
      </p>
    </div>
  </section>
);

export default InheritanceSection;
