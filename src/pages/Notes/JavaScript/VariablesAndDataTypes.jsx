import React from 'react'

const VariableAndDataTypes = () => {
  return (
    <div className="notes-page" style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#4f46e5", fontSize: "2.5rem"}}>
        Variables & Data Types in JavaScript
      </h1>
       {/*JavaScript Variables*/}
      <section style={{ marginBottom: "1.5rem", padding: "1.25rem", borderRadius: "12px", background: "var(--card-bg, linear-gradient(180deg,#ffffff, #fbfdff))", boxShadow: "var(--card-shadow, 0 6px 18px rgba(16,24,40,0.04))", border: "var(--card-border, 1px solid rgba(15,23,42,0.03))" }}>
        <h2 style={{ color: "var(--text-title, #0f172a)", marginBottom: "0.5rem", fontWeight: 700 }}>
          3.JavaScript Variables
        </h2>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.6", color: "var(--text-muted, #374151)" }}>
          <li>JavaScript variables can be declared in 4 ways:</li>
          <li><strong>Modern JavaScript</strong>:- 1.Using let, 2.Using const</li>
          <li><strong>Older JavaScript</strong>;-3.Using var (Not Recommended), 4.Automatically (Not Recommended)</li>
        </ul>
      </section>

       {/* Data Types */}
      <section style={{ marginBottom: "1.5rem", padding: "1.25rem", borderRadius: "12px", background: "var(--card-bg, #ffffff)", boxShadow: "var(--card-shadow, 0 6px 14px rgba(16,24,40,0.03))", border: "var(--card-border, 1px solid rgba(15,23,42,0.02))" }}>
        <h2 style={{ color: "var(--text-title, #0f172a)", marginBottom: "0.5rem", fontWeight: 700 }}>4. Data Types</h2>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.6", color: "var(--text-muted, #374151)" }}>
          <li><strong>Primitive Types:</strong> Number,String,Undefined,Boolean,Null,BigInt,Symbol</li>
          <li><strong>Non-Primitive Types:</strong> Object,Array,</li>
        </ul>
      </section>

    </div>
  )
}

export default VariableAndDataTypes
