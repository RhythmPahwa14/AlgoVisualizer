import React from "react";

const InterfacesSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-network-wired"></i> 20. Interfaces
      </h2>
      <p>
        Interfaces in Java define a <strong>contract</strong> that implementing classes must follow. 
        Since Java 8, interfaces can also have <code>default</code> and <code>static</code> methods.
        Key points:
        <ul>
          <li>An interface can only contain abstract methods (before Java 8), default, static, and constant fields.</li>
          <li>Classes implement interfaces using <code>implements</code>.</li>
          <li>Interfaces enable multiple inheritance of type (a class can implement multiple interfaces).</li>
        </ul>
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "interfaces_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// InterfaceExample.java
interface Printable {
    void print(); // abstract method
}

interface Showable {
    void show();
}

class Document implements Printable, Showable {
    public void print() {
        System.out.println("Document printed");
    }
    public void show() {
        System.out.println("Document shown");
    }
}

public class InterfaceExample {
    public static void main(String[] args) {
        Printable p = new Document();
        p.print(); // Document printed

        Showable s = new Document();
        s.show(); // Document shown
    }
}`,
              "interfaces_code"
            )
          }
        >
          {copiedCode === "interfaces_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// InterfaceExample.java
interface Printable {
    void print(); // abstract method
}

interface Showable {
    void show();
}

class Document implements Printable, Showable {
    public void print() {
        System.out.println("Document printed");
    }
    public void show() {
        System.out.println("Document shown");
    }
}

public class InterfaceExample {
    public static void main(String[] args) {
        Printable p = new Document();
        p.print(); // Document printed

        Showable s = new Document();
        s.show(); // Document shown
    }
}`}</pre>
      </div>

      <p style={{ fontSize: "0.9rem", color: "#555", marginTop: "0.5rem" }}>
        💡 Tip: Interfaces are great for designing flexible APIs and enabling multiple inheritance of type without sharing implementation.
      </p>
    </div>
  </section>
);

export default InterfacesSection;
