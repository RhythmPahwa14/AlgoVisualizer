import React from 'react'

const VariablesAndDataTypes = () => {
  return (
    <div className="notes-page" style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#4f46e5" }}>
        Variables & Data Types in C++
      </h1>

       {/* Introduction */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ color: "#111827", marginBottom: "0.5rem" }}>
          1. Introduction to C++
        </h2>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.6" }}>
          <li>C++ is a high-performance, general-purpose programming language. It is widely used in systems/software development, game engines, real-time simulations, etc.</li>
          <li> <strong>It supports:-</strong><br></br>
          Procedural programming (like C)
         <br></br>
       Object-oriented programming (like Java)
        <br></br>

        Low-level memory manipulation</li>
          <li>C++ mainly used in Competitive programming </li>
        </ul>
      </section>

       {/* Data Types */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ color: "#111827", marginBottom: "0.5rem" }}>2. Data Types</h2>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.6" }}>
          <li><strong>Basic Data Type:</strong> int, long, float, double, char, boolean</li>
          <li><strong>Derived Data Type:</strong> Arrays, Pointer, Reference, Function</li>
          <li><strong>User Define Data Type:</strong> Class, Strcture , Union, Typedef, Using</li>
        </ul>
      </section>

        {/* Variables */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ color: "#111827", marginBottom: "0.5rem" }}>3. Variables</h2>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.6" }}>
          <li>Local Variables – Declared inside functions or blocks (like main() or if statements)</li>
          <li>Instance Variables – In C++, these are variables declared inside a class but outside any method.</li>
          <li>Static Variables – declared with <code>static</code> keyword inside a class, Shared across all instances of the class</li>
        </ul>
      </section>

    </div>
  )
}

export default VariablesAndDataTypes
