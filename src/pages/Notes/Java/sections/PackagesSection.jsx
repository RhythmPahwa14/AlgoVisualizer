import React from "react";

const PackagesSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-folder-open"></i> 21. Packages
      </h2>
      <p>
        Packages in Java are used to <strong>group related classes</strong> and <strong>avoid name clashes</strong>. 
        Organizing classes into packages helps maintain a clean project structure and makes code reusable. Key points:
        <ul>
          <li>Declare a package at the top of your Java file using <code>package com.example;</code>.</li>
          <li>Use <code>import</code> to access classes from other packages.</li>
          <li>Packages map to folder structures; e.g., <code>com.example.util</code> â†’ <code>com/example/util/</code>.</li>
        </ul>
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "packages_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// File path: com/example/util/Utils.java
package com.example.util;

public class Utils {
    public static String greet(String name){
        return "Hi " + name;
    }
}

// Usage in another file
// File path: com/example/app/Main.java
package com.example.app;

import com.example.util.Utils;

public class Main {
    public static void main(String[] args) {
        System.out.println(Utils.greet("Alice")); // Hi Alice
    }
}`,
              "packages_code"
            )
          }
        >
          {copiedCode === "packages_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// File path: com/example/util/Utils.java
package com.example.util;

public class Utils {
    public static String greet(String name){
        return "Hi " + name;
    }
}

// Usage in another file
// File path: com/example/app/Main.java
package com.example.app;

import com.example.util.Utils;

public class Main {
    public static void main(String[] args) {
        System.out.println(Utils.greet("Alice")); // Hi Alice
    }
}`}</pre>
      </div>

      <p style={{ fontSize: "0.9rem", color: "#000", marginTop: "0.5rem" }}>
        <span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Tip: Use packages to organize large projects, manage dependencies, and prevent class name conflicts.
      </p>
    </div>
  </section>
);

export default PackagesSection;

