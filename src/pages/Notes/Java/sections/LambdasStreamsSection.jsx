import React from "react";

const LambdasStreamsSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2><i className="fas fa-stream"></i> 4. Lambdas & Streams</h2>
      <p>
        Lambda expressions and Streams simplify functional-style operations in Java.
        <ul>
          <li>Lambdas provide concise function definitions.</li>
          <li>Streams enable declarative data processing.</li>
        </ul>
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "lambdas_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// LambdasStreamsExample.java
import java.util.*;
import java.util.stream.*;

public class LambdasStreamsExample {
    public static void main(String[] args) {
        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);
        nums.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * n)
            .forEach(System.out::println);
    }
}`,
              "lambdas_code"
            )
          }
        >
          {copiedCode === "lambdas_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// LambdasStreamsExample.java
import java.util.*;
import java.util.stream.*;

public class LambdasStreamsExample {
    public static void main(String[] args) {
        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);
        nums.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * n)
            .forEach(System.out::println);
    }
}`}</pre>
      </div>

      <p style={{ fontSize: "0.9rem", color: "#000" }}><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Tip: Lambdas reduce boilerplate code, making functional programming cleaner.</p>
    </div>
  </section>
);

export default LambdasStreamsSection;

