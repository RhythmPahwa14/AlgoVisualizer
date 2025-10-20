import React from "react";

const IntroSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2 style={{color:'var(--text-primary)' , justifyContent:'center' , gap:'1rem'}}>
        <i className="fas fa-play-circle"></i> 1. Introduction to Java
      </h2>
      <p>
        Java is a high-level, object-oriented, strongly-typed language designed
        for portability, safety, and robustness. Java programs compile to
        bytecode that runs on the Java Virtual Machine (JVM), enabling
        cross-platform execution.
      </p>

      <h3>Key Features</h3>
      <ul>
        <li>
          <strong>Platform independent:</strong> Write Once, Run Anywhere
        </li>
        <li>
          <strong>Object-oriented:</strong> Encapsulation, Inheritance,
          Polymorphism
        </li>
        <li>
          <strong>Automatic memory management:</strong> Garbage collector
        </li>
        <li>
          <strong>Rich standard library:</strong> Collections, I/O, Concurrency
        </li>
      </ul>

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
        <strong>Note:</strong> Java was first released by Sun Microsystems in
        1995 and is now stewarded by Oracle and the OpenJDK community.
      </div>
    </div>
  </section>
);

export default IntroSection;
