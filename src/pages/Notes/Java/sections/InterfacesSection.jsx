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

      <p style={{ fontSize: "0.9rem", color: "#000", marginTop: "0.5rem" }}>
        <span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Tip: Interfaces are great for designing flexible APIs and enabling multiple inheritance of type without sharing implementation.
      </p>
    </div>
  </section>
);

export default InterfacesSection;

