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
          <li>Packages map to folder structures; e.g., <code>com.example.util</code> → <code>com/example/util/</code>.</li>
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

      <p style={{ fontSize: "0.9rem", color: "#555", marginTop: "0.5rem" }}>
        💡 Tip: Use packages to organize large projects, manage dependencies, and prevent class name conflicts.
      </p>
    </div>
  </section>
);

export default PackagesSection;
