import React from "react";

const Annotations = (copyCode, copiedCode) => {
  return (
    <div>
      <div className="card">
        <h2 style={{ textAlign: "center", fontSize: "2.3rem" }}>
          <span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span>Annotations in java
        </h2>
        <p>
          Annotations in Java are metadata — information about the code that
          doesn’t affect program logic but helps the compiler or runtime
          understand how to handle elements like classes, methods, and
          variables.
        </p>
        <div style={{ margin: "2rem 2rem" }}>
          <ul>
            <li>
              <h3><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> 1. What Are Annotations?</h3>
            </li>
            <p style={{ margin: ".4rem 2rem" }}>
              An annotation starts with @ followed by its name. It can be
              applied to classes, methods, variables, parameters, and packages.
            </p>
            <div className="code-container">
              <button
                className={`copy-btn ${
                  copiedCode === "annoatation_code" ? "copied" : ""
                }`}
                onClick={() =>
                  copyCode(
                    `  @Override
void display() {
    System.out.println("Display method");
}
`,
                    "annoatation_code"
                  )
                }
              >
                {copiedCode === "annoatation_code" ? "Copied!" : "Copy"}
              </button>
              <pre>
                {`@Override
void display() {
    System.out.println("Display method");
}
                `}
              </pre>
            </div>
          </ul>
          <ul>
            <li>
              <h3><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> 2. Built-in Annotations</h3>
            </li>
            <table className="info-table">
              <thead>
                <tr>
                  <th>Annotation</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>@Override</td>
                  <td>Ensures a method overrides one from its superclass</td>
                </tr>
                <tr>
                  <td>@Deprecated</td>
                  <td>Marks a method or class as outdated or unsafe</td>
                </tr>
                <tr>
                  <td>@SuppressWarnings</td>
                  <td>Tells compiler to ignore specific warnings</td>
                </tr>
                <tr>
                  <td>@FunctionalInterface</td>
                  <td>Marks an interface with a single abstract method</td>
                </tr>
              </tbody>
            </table>
          </ul>
          <ul>
            <li>
              {" "}
              <h3><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> 3. Custom Annotations</h3>
              <p>
                You can define your own annotations using{" "}
                <code>@interface</code>.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Annotations;
