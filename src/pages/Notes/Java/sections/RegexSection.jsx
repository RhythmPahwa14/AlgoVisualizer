import React from "react";

const RegexSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2><i className="fas fa-search"></i> 6. Regular Expressions</h2>
      <p>
        Regular expressions (regex) are used to match patterns in strings.
        <ul>
          <li>Use <code>Pattern</code> and <code>Matcher</code> classes in Java.</li>
        </ul>
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "regex_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// RegexExample.java
import java.util.regex.*;

public class RegexExample {
    public static void main(String[] args) {
        String text = "Java123";
        Pattern pattern = Pattern.compile("[A-Za-z]+\\d+");
        Matcher matcher = pattern.matcher(text);

        if (matcher.matches())
            System.out.println("Pattern matched!");
        else
            System.out.println("No match found.");
    }
}`,
              "regex_code"
            )
          }
        >
          {copiedCode === "regex_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// RegexExample.java
import java.util.regex.*;

public class RegexExample {
    public static void main(String[] args) {
        String text = "Java123";
        Pattern pattern = Pattern.compile("[A-Za-z]+\\d+");
        Matcher matcher = pattern.matcher(text);

        if (matcher.matches())
            System.out.println("Pattern matched!");
        else
            System.out.println("No match found.");
    }
}`}</pre>
      </div>

      <p style={{ fontSize: "0.9rem", color: "#000" }}><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Tip: Use <code>matcher.find()</code> to find occurrences in long texts.</p>
    </div>
  </section>
);

export default RegexSection;

