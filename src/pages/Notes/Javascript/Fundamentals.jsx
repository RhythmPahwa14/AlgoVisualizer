// src/pages/Notes/Java/Fundamentals.jsx
import React, { useState } from "react";

const Fundamentals = () => {
  return (
    <div className="notes-page" style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#4f46e5", fontSize: "2.5rem"}}>
        javascript Fundamentals
      </h1>

      {/* Introduction */}
      <section style={{ marginBottom: "1.5rem", padding: "1.25rem", borderRadius: "12px", background: "var(--card-bg, linear-gradient(180deg,#ffffff, #fbfdff))", boxShadow: "var(--card-shadow, 0 6px 18px rgba(16,24,40,0.04))", border: "var(--card-border, 1px solid rgba(15,23,42,0.03))" }}>
        <h2 style={{ color: "var(--text-title, #0f172a)", marginBottom: "0.5rem", fontWeight: 700 }}>
          1. Introduction to javascript
        </h2>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.6", color: "var(--text-muted, #374151)" }}>
          <li>JavaScript is the programming language of the web.</li>
          <li>It can calculate, manipulate and validate data.</li>
          <li>It can update and change both HTML and CSS.</li>
        </ul>
      </section>

       {/*why javascript*/}
      <section style={{ marginBottom: "1.5rem", padding: "1.25rem", borderRadius: "12px", background: "var(--card-bg, linear-gradient(180deg,#ffffff, #fbfdff))", boxShadow: "var(--card-shadow, 0 6px 18px rgba(16,24,40,0.04))", border: "var(--card-border, 1px solid rgba(15,23,42,0.03))" }}>
        <h2 style={{ color: "var(--text-title, #0f172a)", marginBottom: "0.5rem", fontWeight: 700 }}>
          2. Why Study JavaScript?
        </h2>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.6", color: "var(--text-muted, #374151)" }}>
          <li>JavaScript is one of the 3 languages all web developers must learn:</li>
          <li>1. HTML to define the content of web pages</li>
          <li>2. CSS to specify the layout of web pages</li>
          <li>3. JavaScript to program the behavior of web pages</li>
        </ul>
      </section>

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

      

      {/* Control Flow */}
      <section style={{ marginBottom: "1.5rem", padding: "1.25rem", borderRadius: "12px", background: "var(--card-bg, #ffffff)", boxShadow: "var(--card-shadow, 0 6px 14px rgba(16,24,40,0.03))", border: "var(--card-border, 1px solid rgba(15,23,42,0.02))" }}>
        <h2 style={{ color: "var(--text-title, #0f172a)", marginBottom: "0.5rem", fontWeight: 700 }}>5. Control Flow</h2>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.6", color: "var(--text-muted, #374151)" }}>
          <li><strong>Decision Making:</strong> if, else-if, switch</li>
          <li><strong>Loops:</strong> for, while, do-while, for-each</li>
          <li><strong>Jump Statements:</strong> break, continue, return,catch throw</li>
        </ul>
      </section>

      {/* Example Code */}
      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ color: "var(--text-title, #0f172a)", marginBottom: "0.5rem", fontWeight: 700 }}>6. Example Code</h2>
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
{`let myNumber = 2;
let text = "";

// Function to convert Fahrenheit to Celsius
function toCelsius(fahrenheit) {
  return (5/9) * (fahrenheit - 32);
}

// Array of car names
const cars = ["BMW", "Volvo", "Saab", "Ford"];
const len = cars.length;

// For loop to iterate through the array
for (let i = 0; i < len; i++) {
  text += cars[i] + " ";
}

// Call the function and display the result
const celsiusValue = toCelsius(77);
console.log("77°F is " + celsiusValue + "°C");
console.log("Cars: " + text);

`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default Fundamentals;
