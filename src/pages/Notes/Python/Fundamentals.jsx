import React from "react";

const PythonFundamentals = () => {
  return (
  <div className="notes-page" style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem", color: "var(--brand, #4f46e5)", fontSize: "2.5rem" }}>
        Python Fundamentals
      </h1>

      <section style={{ marginBottom: "1.5rem", padding: "1.25rem", borderRadius: "12px", background: "var(--card-bg, linear-gradient(180deg,#ffffff, #fbfdff))", boxShadow: "var(--card-shadow, 0 6px 18px rgba(16,24,40,0.04))", border: "var(--card-border, 1px solid rgba(15,23,42,0.03))" }}>
        <h2 style={{ color: "var(--text-title, #0f172a)", marginBottom: "0.5rem", fontWeight: 700 }}>1. Introduction to Python</h2>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.6", color: "var(--text-muted, #374151)" }}>
          <li>Python is an interpreted, high-level, general-purpose programming language.</li>
          <li>It emphasizes code readability and a concise syntax.</li>
          <li>Widely used in web development, data science, automation, and more.</li>
        </ul>
      </section>

      <section style={{ marginBottom: "1.5rem", padding: "1.25rem", borderRadius: "12px", background: "var(--card-bg, #ffffff)", boxShadow: "var(--card-shadow, 0 6px 14px rgba(16,24,40,0.03))", border: "var(--card-border, 1px solid rgba(15,23,42,0.02))" }}>
        <h2 style={{ color: "var(--text-title, #0f172a)", marginBottom: "0.5rem", fontWeight: 700 }}>2. Variables and Data Types</h2>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.6", color: "var(--text-muted, #374151)" }}>
          <li>Python has dynamic typing; a variable can hold values of any type.</li>
          <li>Common types: int, float, str, list, tuple, dict, set, bool</li>
        </ul>
      </section>

      <section style={{ marginBottom: "1.5rem", padding: "1.25rem", borderRadius: "12px", background: "var(--card-bg, linear-gradient(180deg,#ffffff, #fbfdff))", boxShadow: "var(--card-shadow, 0 6px 14px rgba(16,24,40,0.03))", border: "var(--card-border, 1px solid rgba(15,23,42,0.02))" }}>
        <h2 style={{ color: "var(--text-title, #0f172a)", marginBottom: "0.5rem", fontWeight: 700 }}>3. Control Flow</h2>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.6", color: "var(--text-muted, #374151)" }}>
          <li>Conditionals: if, elif, else</li>
          <li>Loops: for, while</li>
          <li>Comprehensions: list/set/dict comprehensions</li>
        </ul>
      </section>

      <section style={{ marginBottom: "1.5rem", padding: "1.25rem", borderRadius: "12px", background: "var(--card-bg, linear-gradient(180deg,#ffffff, #fbfdff))", boxShadow: "var(--card-shadow, 0 6px 14px rgba(16,24,40,0.03))", border: "var(--card-border, 1px solid rgba(15,23,42,0.02))" }}>
        <h2 style={{ color: "var(--text-title, #0f172a)", marginBottom: "0.5rem", fontWeight: 700 }}>4. Example Code</h2>
        <div className="code-container">
          <button
            className={`copy-btn`}
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(`# Hello World in Python\nprint("Hello, Python!")`);
                const btn = document.querySelector('.code-container .copy-btn');
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
          <pre style={{ background: "var(--code-bg, #0b1220)", padding: "1rem", borderRadius: "10px", overflowX: "auto", boxShadow: "var(--code-inset, inset 0 1px 0 rgba(255,255,255,0.02))" }}>
{`# Hello World in Python
print("Hello, Python!")`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default PythonFundamentals;
