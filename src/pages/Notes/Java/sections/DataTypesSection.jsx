import React from "react";

const DataTypesSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-database"></i> 4. Data Types in Java
      </h2>
      <p>
        Java is a strongly-typed language, meaning every variable must have a declared type. 
        Java has two categories of data types: <strong>Primitive Types</strong> (store simple values directly) 
        and <strong>Reference Types</strong> (store references to objects).
      </p>

      <h3>Primitive Data Types (8 Types)</h3>
      <p>Primitive types are predefined by Java and represent single values stored in memory.</p>
      <div style={{ overflowX: "auto", margin: "1rem 0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #e5e7eb" }}>
          <thead>
            <tr style={{ backgroundColor: "#eef2ff" }}>
              <th style={{ padding: "12px", border: "1px solid #e5e7eb", textAlign: "left" }}>Type</th>
              <th style={{ padding: "12px", border: "1px solid #e5e7eb", textAlign: "left" }}>Size</th>
              <th style={{ padding: "12px", border: "1px solid #e5e7eb", textAlign: "left" }}>Range</th>
              <th style={{ padding: "12px", border: "1px solid #e5e7eb", textAlign: "left" }}>Default</th>
              <th style={{ padding: "12px", border: "1px solid #e5e7eb", textAlign: "left" }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["byte", "8 bits", "-128 to 127", "0", "Small integer, memory efficient"],
              ["short", "16 bits", "-32,768 to 32,767", "0", "Medium integer"],
              ["int", "32 bits", "-2³¹ to 2³¹-1", "0", "Most common integer type"],
              ["long", "64 bits", "-2⁶³ to 2⁶³-1", "0L", "Large integer, add 'L' suffix"],
              ["float", "32 bits", "~±3.4e38", "0.0f", "Single precision, add 'f' suffix"],
              ["double", "64 bits", "~±1.8e308", "0.0d", "Double precision, default for decimals"],
              ["char", "16 bits", "0 to 65,535", "'\\u0000'", "UTF-16 Unicode character"],
              ["boolean", "1 bit", "true or false", "false", "Logical true/false values"],
            ].map((r, idx) => (
              <tr key={r[0]} style={{ backgroundColor: idx % 2 === 0 ? "#f9fafb" : "white" }}>
                <td style={{ padding: "10px", border: "1px solid #e5e7eb" }}><code>{r[0]}</code></td>
                <td style={{ padding: "10px", border: "1px solid #e5e7eb" }}>{r[1]}</td>
                <td style={{ padding: "10px", border: "1px solid #e5e7eb" }}><small>{r[2]}</small></td>
                <td style={{ padding: "10px", border: "1px solid #e5e7eb" }}><code>{r[3]}</code></td>
                <td style={{ padding: "10px", border: "1px solid #e5e7eb" }}>{r[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>Comprehensive Example</h3>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "datatypes_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`public class DataTypesExample {
    public static void main(String[] args) {
        // Integer types
        byte age = 25;
        short year = 2024;
        int population = 8000000000; // Error: out of range, use long
        long worldPopulation = 8000000000L; // Note the 'L' suffix
        
        // Floating-point types
        float pi = 3.14f; // Note the 'f' suffix
        double piPrecise = 3.14159265359;
        
        // Character type
        char grade = 'A';
        char unicodeChar = '\\u0041'; // Unicode for 'A'
        
        // Boolean type
        boolean isJavaFun = true;
        boolean isPythonBetter = false;
        
        // Reference type
        String language = "Java";
        
        // Display all values
        System.out.println("=== Primitive Types Demo ===");
        System.out.println("Age (byte): " + age);
        System.out.println("Year (short): " + year);
        System.out.println("World Population (long): " + worldPopulation);
        System.out.println("Pi (float): " + pi);
        System.out.println("Pi Precise (double): " + piPrecise);
        System.out.println("Grade (char): " + grade);
        System.out.println("Unicode Char: " + unicodeChar);
        System.out.println("Is Java Fun? " + isJavaFun);
        System.out.println("Language (String): " + language);
        
        // Type casting
        int num = 100;
        long bigNum = num; // Automatic widening
        double decimal = bigNum; // Automatic widening
        
        double value = 9.99;
        int rounded = (int) value; // Manual narrowing (loses decimal)
        System.out.println("\\nRounded value: " + rounded); // Prints 9
    }
}`, "datatypes_code")
          }
        >
          {copiedCode === "datatypes_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`public class DataTypesExample {
    public static void main(String[] args) {
        // Integer types
        byte age = 25;
        short year = 2024;
        int population = 8000000000; // Error: out of range, use long
        long worldPopulation = 8000000000L; // Note the 'L' suffix
        
        // Floating-point types
        float pi = 3.14f; // Note the 'f' suffix
        double piPrecise = 3.14159265359;
        
        // Character type
        char grade = 'A';
        char unicodeChar = '\\u0041'; // Unicode for 'A'
        
        // Boolean type
        boolean isJavaFun = true;
        boolean isPythonBetter = false;
        
        // Reference type
        String language = "Java";
        
        // Display all values
        System.out.println("=== Primitive Types Demo ===");
        System.out.println("Age (byte): " + age);
        System.out.println("Year (short): " + year);
        System.out.println("World Population (long): " + worldPopulation);
        System.out.println("Pi (float): " + pi);
        System.out.println("Pi Precise (double): " + piPrecise);
        System.out.println("Grade (char): " + grade);
        System.out.println("Unicode Char: " + unicodeChar);
        System.out.println("Is Java Fun? " + isJavaFun);
        System.out.println("Language (String): " + language);
        
        // Type casting
        int num = 100;
        long bigNum = num; // Automatic widening
        double decimal = bigNum; // Automatic widening
        
        double value = 9.99;
        int rounded = (int) value; // Manual narrowing (loses decimal)
        System.out.println("\\nRounded value: " + rounded); // Prints 9
    }
}`}</pre>
      </div>

      <h3>Reference Types</h3>
      <p>Reference types store the memory address of objects, not the actual data. Common reference types include:</p>
      <ul>
        <li><strong>String:</strong> Sequence of characters (immutable)</li>
        <li><strong>Arrays:</strong> Collection of elements of the same type</li>
        <li><strong>Classes:</strong> User-defined types</li>
        <li><strong>Interfaces:</strong> Abstract types defining contracts</li>
      </ul>

      <h3>Type Conversion (Casting)</h3>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "casting_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`public class TypeCasting {
    public static void main(String[] args) {
        // Widening (Automatic) - smaller to larger
        int smallNum = 100;
        double bigNum = smallNum; // int to double
        System.out.println("Widening: " + bigNum); // 100.0
        
        // Narrowing (Manual) - larger to smaller
        double decimal = 99.99;
        int integer = (int) decimal; // Requires explicit cast
        System.out.println("Narrowing: " + integer); // 99 (loses .99)
        
        // String to primitive
        String str = "123";
        int parsed = Integer.parseInt(str);
        double parsedDouble = Double.parseDouble("45.67");
        
        // Primitive to String
        int num = 456;
        String numStr = String.valueOf(num);
        System.out.println("Converted: " + numStr);
    }
}`, "casting_code")
          }
        >
          {copiedCode === "casting_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`public class TypeCasting {
    public static void main(String[] args) {
        // Widening (Automatic) - smaller to larger
        int smallNum = 100;
        double bigNum = smallNum; // int to double
        System.out.println("Widening: " + bigNum); // 100.0
        
        // Narrowing (Manual) - larger to smaller
        double decimal = 99.99;
        int integer = (int) decimal; // Requires explicit cast
        System.out.println("Narrowing: " + integer); // 99 (loses .99)
        
        // String to primitive
        String str = "123";
        int parsed = Integer.parseInt(str);
        double parsedDouble = Double.parseDouble("45.67");
        
        // Primitive to String
        int num = 456;
        String numStr = String.valueOf(num);
        System.out.println("Converted: " + numStr);
    }
}`}</pre>
      </div>

      <div style={{background: '#e0f2fe', borderLeft: '4px solid #0284c7', padding: '1rem 1.5rem', margin: '1rem 0', borderRadius: '0 12px 12px 0'}}>
        <strong><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Best Practices:</strong>
        <ul style={{marginTop: '0.5rem', marginBottom: 0}}>
          <li>Use <code>int</code> for most integer operations (it's the most efficient)</li>
          <li>Use <code>double</code> for decimal numbers (more precise than float)</li>
          <li>Always add 'L' suffix for long literals: <code>long x = 10000000000L;</code></li>
          <li>Always add 'f' suffix for float literals: <code>float y = 3.14f;</code></li>
          <li>Be careful with narrowing casts - they can lose data!</li>
        </ul>
      </div>
    </div>
  </section>
);

export default DataTypesSection;
