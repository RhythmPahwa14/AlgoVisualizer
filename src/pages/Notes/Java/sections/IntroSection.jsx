import React from "react";

const IntroSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2 style={{color:'var(--text-primary)' , justifyContent:'center' , gap:'1rem'}}>
        <i className="fas fa-play-circle"></i> 1. Introduction to Java
      </h2>
      <p className="text-center">
        Java is a high-level, object-oriented, strongly-typed language designed
        for portability, safety, and robustness. Java programs compile to
        bytecode that runs on the Java Virtual Machine (JVM), enabling
        cross-platform execution.
      </p>

      <h3>Key Features</h3>
      <ul>
        <li>
          <strong>Platform Independent:</strong> Write Once, Run Anywhere (WORA) - Java code compiles to bytecode that runs on any platform with a JVM
        </li>
        <li>
          <strong>Object-Oriented:</strong> Everything in Java is an object with four main principles: Encapsulation, Inheritance, Polymorphism, and Abstraction
        </li>
        <li>
          <strong>Automatic Memory Management:</strong> Built-in garbage collector automatically handles memory allocation and deallocation
        </li>
        <li>
          <strong>Rich Standard Library:</strong> Extensive API including Collections, I/O, Networking, Concurrency, and more
        </li>
        <li>
          <strong>Strongly Typed:</strong> Type checking at compile-time reduces runtime errors
        </li>
        <li>
          <strong>Multithreading:</strong> Built-in support for concurrent programming
        </li>
        <li>
          <strong>Security:</strong> No explicit pointers, bytecode verification, and security manager
        </li>
      </ul>

      <h3>Why Learn Java?</h3>
      <ul>
        <li><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> <strong>Universal:</strong> Used in Android development, enterprise applications, web servers, big data, and more</li>
        <li><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> <strong>High Demand:</strong> One of the most in-demand programming languages in the job market</li>
        <li><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> <strong>Robust Ecosystem:</strong> Vast collection of frameworks like Spring, Hibernate, and libraries</li>
        <li><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> <strong>Great Learning Curve:</strong> Excellent for understanding programming fundamentals and OOP concepts</li>
        <li><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> <strong>Performance:</strong> JIT (Just-In-Time) compiler provides near-native performance</li>
      </ul>

      <h3>Java Program Execution Flow</h3>
      <div className="code-container">
        <pre style={{background: '#f8f9fa', color: '#2d3748', padding: '1rem'}}>
{`Source Code (.java)
       ↓
Java Compiler (javac)
       ↓
Bytecode (.class)
       ↓
Java Virtual Machine (JVM)
       ↓
Native Machine Code
       ↓
Execution`}
        </pre>
      </div>

      <h3>Your First Java Program</h3>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "hello_world" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Welcome to Java Programming!");
    }
}`,
              "hello_world"
            )
          }
        >
          {copiedCode === "hello_world" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Welcome to Java Programming!");
    }
}`}</pre>
      </div>

      <div style={{background: '#e0f2fe', borderLeft: '4px solid #0284c7', padding: '1rem 1.5rem', margin: '1rem 0', borderRadius: '0 12px 12px 0'}}>
        <strong><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Code Breakdown:</strong>
        <ul style={{marginTop: '0.5rem', marginBottom: 0}}>
          <li><code>public class HelloWorld</code> - Declares a public class named HelloWorld</li>
          <li><code>public static void main(String[] args)</code> - Entry point of the program</li>
          <li><code>System.out.println()</code> - Prints text to the console with a new line</li>
        </ul>
      </div>

      <div
        style={{
          background: "#fff7ed",
          borderLeft: "4px solid #f59e0b",
          padding: "1rem 1.5rem",
          margin: "1.5rem 0",
          borderRadius: "0 12px 12px 0",
          color:"#374151",
        }}
      >
        <strong><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Note:</strong> Java was first released by Sun Microsystems in
        1995 (created by James Gosling) and is now stewarded by Oracle and the OpenJDK community.
        Current LTS versions include Java 8, 11, 17, and 21.
      </div>
    </div>
  </section>
);

export default IntroSection;
