import React from "react";

const GenericsSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2><i className="fas fa-code"></i> 1. Generics</h2>
      <p>
        Generics enable type-safe operations and reduce runtime errors.
        <ul>
          <li>Allow defining classes, interfaces, and methods with type parameters.</li>
          <li>Provide compile-time type checking.</li>
          <li>Increase reusability and maintainability.</li>
        </ul>
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "generics_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// GenericsExample.java
class Box<T> {
    private T item;

    public void set(T item) { this.item = item; }
    public T get() { return item; }

    public static void main(String[] args) {
        Box<Integer> intBox = new Box<>();
        intBox.set(10);
        System.out.println("Integer Value: " + intBox.get());

        Box<String> strBox = new Box<>();
        strBox.set("Hello Generics");
        System.out.println("String Value: " + strBox.get());
    }
}`,
              "generics_code"
            )
          }
        >
          {copiedCode === "generics_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// GenericsExample.java
class Box<T> {
    private T item;

    public void set(T item) { this.item = item; }
    public T get() { return item; }

    public static void main(String[] args) {
        Box<Integer> intBox = new Box<>();
        intBox.set(10);
        System.out.println("Integer Value: " + intBox.get());

        Box<String> strBox = new Box<>();
        strBox.set("Hello Generics");
        System.out.println("String Value: " + strBox.get());
    }
}`}</pre>
      </div>

      <p style={{ fontSize: "0.9rem", color: "#000" }}><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Tip: Generics prevent ClassCastException by catching type mismatches at compile time.</p>
    </div>
  </section>
);

export default GenericsSection;

