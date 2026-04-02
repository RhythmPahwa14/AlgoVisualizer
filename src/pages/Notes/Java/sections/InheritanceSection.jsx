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

      <p style={{ fontSize: "0.9rem", color: "#000", marginTop: "0.5rem" }}>
        <span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Tip: Inheritance combined with polymorphism allows flexible and reusable code. Avoid deep inheritance trees for maintainability.
      </p>
    </div>
  </section>
);

export default InheritanceSection;

