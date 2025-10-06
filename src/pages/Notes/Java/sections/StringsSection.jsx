import React from "react";

const StringsSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-font"></i> 10. Strings
      </h2>
      <p>
        Strings in Java (<code>java.lang.String</code>) are <strong>immutable</strong>. 
        For frequent modifications, use <code>StringBuilder</code> (non-synchronized) 
        or <code>StringBuffer</code> (synchronized). Key points:
        <ul>
          <li>Concatenation creates new strings, original strings remain unchanged.</li>
          <li><code>substring</code> extracts parts of a string.</li>
          <li><code>StringBuilder</code> allows mutable sequences for better performance.</li>
        </ul>
      </p>
      
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "strings_code" ? "copied" : ""}`}
          onClick={() => copyCode(
`// StringsExample.java
public class StringsExample {
    public static void main(String[] args) {
        // Immutable String
        String s = "Hello";
        s += " World"; // Creates a new string
        System.out.println(s); // Hello World

        // Extract substring
        String sub = s.substring(0, 5);
        System.out.println("Substring: " + sub); // Hello

        // Using StringBuilder for mutable strings
        StringBuilder sb = new StringBuilder();
        sb.append("a").append("b").append("c");
        System.out.println("StringBuilder: " + sb.toString());

        // Using StringBuffer (thread-safe alternative)
        StringBuffer sf = new StringBuffer("Start");
        sf.append(" End");
        System.out.println("StringBuffer: " + sf.toString());
    }
}`, "strings_code")}
        >
          {copiedCode === "strings_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// StringsExample.java
public class StringsExample {
    public static void main(String[] args) {
        // Immutable String
        String s = "Hello";
        s += " World"; // Creates a new string
        System.out.println(s); // Hello World

        // Extract substring
        String sub = s.substring(0, 5);
        System.out.println("Substring: " + sub); // Hello

        // Using StringBuilder for mutable strings
        StringBuilder sb = new StringBuilder();
        sb.append("a").append("b").append("c");
        System.out.println("StringBuilder: " + sb.toString());

        // Using StringBuffer (thread-safe alternative)
        StringBuffer sf = new StringBuffer("Start");
        sf.append(" End");
        System.out.println("StringBuffer: " + sf.toString());
    }
}`}</pre>
      </div>
    </div>
  </section>
);

export default StringsSection;
