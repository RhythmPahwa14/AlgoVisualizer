import React from "react";

const FunctionalInterfacesSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2><i className="fas fa-bolt"></i> 5. Functional Interfaces</h2>
      <p>
        Functional interfaces have exactly one abstract method and can be used with lambda expressions.
        <ul>
          <li>Common ones include <code>Runnable</code>, <code>Callable</code>, <code>Predicate</code>, etc.</li>
        </ul>
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "functional_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// FunctionalInterfaceExample.java
@FunctionalInterface
interface Greeting {
    void sayHello(String name);
}

public class FunctionalInterfaceExample {
    public static void main(String[] args) {
        Greeting greet = (name) -> System.out.println("Hello, " + name + "!");
        greet.sayHello("Java");
    }
}`,
              "functional_code"
            )
          }
        >
          {copiedCode === "functional_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// FunctionalInterfaceExample.java
@FunctionalInterface
interface Greeting {
    void sayHello(String name);
}

public class FunctionalInterfaceExample {
    public static void main(String[] args) {
        Greeting greet = (name) -> System.out.println("Hello, " + name + "!");
        greet.sayHello("Java");
    }
}`}</pre>
      </div>

      <p style={{ fontSize: "0.9rem", color: "#000" }}><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Tip: Marking an interface with <code>@FunctionalInterface</code> ensures only one abstract method is defined.</p>
    </div>
  </section>
);

export default FunctionalInterfacesSection;

