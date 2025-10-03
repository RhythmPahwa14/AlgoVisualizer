// src/pages/Notes/Java/Fundamentals.jsx
import React, { useState } from "react";

const Fundamentals = () => {
  return (
    <div className="notes-page" style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#4f46e5", fontSize: "2.5rem"}}>
        Java Fundamentals
      </h1>

      {/* Introduction */}
      <section style={{ marginBottom: "1.5rem", padding: "1.25rem", borderRadius: "12px", background: "var(--card-bg, linear-gradient(180deg,#ffffff, #fbfdff))", boxShadow: "var(--card-shadow, 0 6px 18px rgba(16,24,40,0.04))", border: "var(--card-border, 1px solid rgba(15,23,42,0.03))" }}>
        <h2 style={{ color: "var(--text-title, #0f172a)", marginBottom: "0.5rem", fontWeight: 700 }}>
          1. Introduction to Java
        </h2>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.6", color: "var(--text-muted, #374151)" }}>
          <li>Java is a high-level, object-oriented, platform-independent programming language.</li>
          <li>Follows the principle: <strong>Write Once, Run Anywhere (WORA)</strong>.</li>
          <li>Compiled into <strong>bytecode</strong> and executed on the JVM (Java Virtual Machine).</li>
        </ul>
      </section>

      {/* Data Types */}
      <section style={{ marginBottom: "1.5rem", padding: "1.25rem", borderRadius: "12px", background: "var(--card-bg, #ffffff)", boxShadow: "var(--card-shadow, 0 6px 14px rgba(16,24,40,0.03))", border: "var(--card-border, 1px solid rgba(15,23,42,0.02))" }}>
        <h2 style={{ color: "var(--text-title, #0f172a)", marginBottom: "0.5rem", fontWeight: 700 }}>2. Data Types</h2>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.6", color: "var(--text-muted, #374151)" }}>
          <li><strong>Primitive Types:</strong> byte, short, int, long, float, double, char, boolean</li>
          <li><strong>Non-Primitive Types:</strong> String, Arrays, Classes, Objects</li>
        </ul>
      </section>

      {/* Variables */}
      <section style={{ marginBottom: "1.5rem", padding: "1.25rem", borderRadius: "12px", background: "var(--card-bg, linear-gradient(180deg,#ffffff, #fbfdff))", boxShadow: "var(--card-shadow, 0 6px 14px rgba(16,24,40,0.03))", border: "var(--card-border, 1px solid rgba(15,23,42,0.02))" }}>
        <h2 style={{ color: "var(--text-title, #0f172a)", marginBottom: "0.5rem", fontWeight: 700 }}>3. Variables</h2>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.6", color: "var(--text-muted, #374151)" }}>
          <li>Local Variables – declared inside methods.</li>
          <li>Instance Variables – defined inside a class, outside methods.</li>
          <li>Static Variables – declared with <code>static</code> keyword, shared across all objects.</li>
        </ul>
      </section>

      {/* Control Flow */}
      <section style={{ marginBottom: "1.5rem", padding: "1.25rem", borderRadius: "12px", background: "var(--card-bg, #ffffff)", boxShadow: "var(--card-shadow, 0 6px 14px rgba(16,24,40,0.03))", border: "var(--card-border, 1px solid rgba(15,23,42,0.02))" }}>
        <h2 style={{ color: "var(--text-title, #0f172a)", marginBottom: "0.5rem", fontWeight: 700 }}>4. Control Flow</h2>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.6", color: "var(--text-muted, #374151)" }}>
          <li><strong>Decision Making:</strong> if, else-if, switch</li>
          <li><strong>Loops:</strong> for, while, do-while, for-each</li>
          <li><strong>Jump Statements:</strong> break, continue, return</li>
        </ul>
      </section>

      {/* Example Code */}
      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ color: "var(--text-title, #0f172a)", marginBottom: "0.5rem", fontWeight: 700 }}>5. Example Code</h2>
        <div className="code-container">
          <button
            className={`copy-btn`}
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(`public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n    }\n}`);
                const btn = document.querySelector('.copy-btn');
                if (btn) {
                  btn.classList.add('copied');
                  btn.textContent = 'Copied';
                  setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.textContent = 'Copy';
                  }, 1500);
                }
              } catch (err) {
                console.error('copy failed', err);
              }
            }}
            aria-label="Copy code"
          >
            Copy
          </button>
          <pre
            style={{
              background: "var(--code-bg, #0b1220)",
              padding: "1rem",
              borderRadius: "10px",
              overflowX: "auto",
              boxShadow: "var(--code-inset, inset 0 1px 0 rgba(255,255,255,0.02))"
            }}
          >
{`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default Fundamentals;
