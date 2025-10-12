import React from "react";

const DataTypesSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-database"></i> 4. Data Types
      </h2>
      <p>
        Rust is a statically typed language, meaning all variable types must be known at compile time.
        The compiler can usually infer types, but sometimes you need to specify them explicitly.
      </p>

      <h3>Scalar Types</h3>
      
      <h4>Integer Types</h4>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "integers" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`fn main() {
    // Signed integers
    let a: i8 = -128;      // 8-bit signed (-128 to 127)
    let b: i16 = -32_768;  // 16-bit signed
    let c: i32 = -2_147_483_648; // 32-bit signed (default)
    let d: i64 = -9_223_372_036_854_775_808; // 64-bit signed
    let e: i128 = 170_141_183_460_469_231_731_687_303_715_884_105_727; // 128-bit signed
    let f: isize = -1000;  // Architecture dependent (32 or 64 bit)
    
    // Unsigned integers
    let g: u8 = 255;       // 8-bit unsigned (0 to 255)
    let h: u16 = 65_535;   // 16-bit unsigned
    let i: u32 = 4_294_967_295; // 32-bit unsigned
    let j: u64 = 18_446_744_073_709_551_615; // 64-bit unsigned
    let k: u128 = 340_282_366_920_938_463_463_374_607_431_768_211_455; // 128-bit unsigned
    let l: usize = 1000;   // Architecture dependent
    
    // Number literals
    let decimal = 98_222;
    let hex = 0xff;
    let octal = 0o77;
    let binary = 0b1111_0000;
    let byte = b'A'; // u8 only
    
    println!("Decimal: {}, Hex: {}, Octal: {}, Binary: {}, Byte: {}", 
             decimal, hex, octal, binary, byte);
}`,
              "integers"
            )
          }
        >
          {copiedCode === "integers" ? "Copied!" : "Copy"}
        </button>
        <pre>{`fn main() {
    // Signed integers
    let a: i8 = -128;      // 8-bit signed (-128 to 127)
    let b: i16 = -32_768;  // 16-bit signed
    let c: i32 = -2_147_483_648; // 32-bit signed (default)
    let d: i64 = -9_223_372_036_854_775_808; // 64-bit signed
    let e: i128 = 170_141_183_460_469_231_731_687_303_715_884_105_727; // 128-bit signed
    let f: isize = -1000;  // Architecture dependent (32 or 64 bit)
    
    // Unsigned integers
    let g: u8 = 255;       // 8-bit unsigned (0 to 255)
    let h: u16 = 65_535;   // 16-bit unsigned
    let i: u32 = 4_294_967_295; // 32-bit unsigned
    let j: u64 = 18_446_744_073_709_551_615; // 64-bit unsigned
    let k: u128 = 340_282_366_920_938_463_463_374_607_431_768_211_455; // 128-bit unsigned
    let l: usize = 1000;   // Architecture dependent
    
    // Number literals
    let decimal = 98_222;
    let hex = 0xff;
    let octal = 0o77;
    let binary = 0b1111_0000;
    let byte = b'A'; // u8 only
    
    println!("Decimal: {}, Hex: {}, Octal: {}, Binary: {}, Byte: {}", 
             decimal, hex, octal, binary, byte);
}`}</pre>
      </div>

      <h4>Floating-Point Types</h4>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "floats" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`fn main() {
    let x: f32 = 3.14159;  // 32-bit float
    let y: f64 = 2.718281828459045; // 64-bit float (default)
    
    // Floating point operations
    let sum = x + y as f32;
    let difference = y - x as f64;
    let product = x * 2.0;
    let quotient = y / 2.0;
    
    println!("x: {}, y: {}", x, y);
    println!("Sum: {}, Difference: {}, Product: {}, Quotient: {}", 
             sum, difference, product, quotient);
}`,
              "floats"
            )
          }
        >
          {copiedCode === "floats" ? "Copied!" : "Copy"}
        </button>
        <pre>{`fn main() {
    let x: f32 = 3.14159;  // 32-bit float
    let y: f64 = 2.718281828459045; // 64-bit float (default)
    
    // Floating point operations
    let sum = x + y as f32;
    let difference = y - x as f64;
    let product = x * 2.0;
    let quotient = y / 2.0;
    
    println!("x: {}, y: {}", x, y);
    println!("Sum: {}, Difference: {}, Product: {}, Quotient: {}", 
             sum, difference, product, quotient);
}`}</pre>
      </div>

      <h4>Boolean and Character Types</h4>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "bool_char" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`fn main() {
    // Boolean type
    let is_active: bool = true;
    let is_complete = false; // Type inferred
    
    println!("Active: {}, Complete: {}", is_active, is_complete);
    
    // Character type (4 bytes, Unicode)
    let letter: char = 'A';
    let emoji = '😀';
    let chinese = '中';
    
    println!("Letter: {}, Emoji: {}, Chinese: {}", letter, emoji, chinese);
}`,
              "bool_char"
            )
          }
        >
          {copiedCode === "bool_char" ? "Copied!" : "Copy"}
        </button>
        <pre>{`fn main() {
    // Boolean type
    let is_active: bool = true;
    let is_complete = false; // Type inferred
    
    println!("Active: {}, Complete: {}", is_active, is_complete);
    
    // Character type (4 bytes, Unicode)
    let letter: char = 'A';
    let emoji = '😀';
    let chinese = '中';
    
    println!("Letter: {}, Emoji: {}, Chinese: {}", letter, emoji, chinese);
}`}</pre>
      </div>

      <h3>Compound Types</h3>
      
      <h4>Tuples</h4>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "tuples" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`fn main() {
    // Tuple with mixed types
    let person: (String, i32, bool) = ("Alice".to_string(), 30, true);
    
    // Accessing tuple elements
    println!("Name: {}, Age: {}, Active: {}", person.0, person.1, person.2);
    
    // Destructuring tuples
    let (name, age, active) = person;
    println!("Destructured - Name: {}, Age: {}, Active: {}", name, age, active);
    
    // Unit tuple (empty tuple)
    let unit = ();
    println!("Unit tuple: {:?}", unit);
    
    // Nested tuples
    let nested = ((1, 2), (3, 4));
    println!("Nested: {:?}", nested);
}`,
              "tuples"
            )
          }
        >
          {copiedCode === "tuples" ? "Copied!" : "Copy"}
        </button>
        <pre>{`fn main() {
    // Tuple with mixed types
    let person: (String, i32, bool) = ("Alice".to_string(), 30, true);
    
    // Accessing tuple elements
    println!("Name: {}, Age: {}, Active: {}", person.0, person.1, person.2);
    
    // Destructuring tuples
    let (name, age, active) = person;
    println!("Destructured - Name: {}, Age: {}, Active: {}", name, age, active);
    
    // Unit tuple (empty tuple)
    let unit = ();
    println!("Unit tuple: {:?}", unit);
    
    // Nested tuples
    let nested = ((1, 2), (3, 4));
    println!("Nested: {:?}", nested);
}`}</pre>
      </div>

      <h4>Arrays</h4>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "arrays" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`fn main() {
    // Fixed-size arrays
    let numbers: [i32; 5] = [1, 2, 3, 4, 5];
    let months = ["January", "February", "March", "April", "May"];
    
    // Array with same value
    let zeros = [0; 10]; // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    
    // Accessing array elements
    println!("First number: {}", numbers[0]);
    println!("Third month: {}", months[2]);
    
    // Array length
    println!("Numbers length: {}", numbers.len());
    
    // Iterating over arrays
    for number in numbers.iter() {
        println!("Number: {}", number);
    }
    
    // Slicing arrays
    let slice = &numbers[1..4]; // [2, 3, 4]
    println!("Slice: {:?}", slice);
}`,
              "arrays"
            )
          }
        >
          {copiedCode === "arrays" ? "Copied!" : "Copy"}
        </button>
        <pre>{`fn main() {
    // Fixed-size arrays
    let numbers: [i32; 5] = [1, 2, 3, 4, 5];
    let months = ["January", "February", "March", "April", "May"];
    
    // Array with same value
    let zeros = [0; 10]; // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    
    // Accessing array elements
    println!("First number: {}", numbers[0]);
    println!("Third month: {}", months[2]);
    
    // Array length
    println!("Numbers length: {}", numbers.len());
    
    // Iterating over arrays
    for number in numbers.iter() {
        println!("Number: {}", number);
    }
    
    // Slicing arrays
    let slice = &numbers[1..4]; // [2, 3, 4]
    println!("Slice: {:?}", slice);
}`}</pre>
      </div>

      <div
        style={{
          background: "#ecfdf5",
          borderLeft: "4px solid #10b981",
          padding: "1rem 1.5rem",
          margin: "1.5rem 0",
          borderRadius: "0 12px 12px 0",
          color: "#374151",
        }}
      >
        <strong>Type Summary:</strong>
        <ul style={{ marginTop: "0.5rem", marginBottom: "0" }}>
          <li><strong>Integers:</strong> i8, i16, i32, i64, i128, isize (signed) and u8, u16, u32, u64, u128, usize (unsigned)</li>
          <li><strong>Floats:</strong> f32, f64 (IEEE 754 standard)</li>
          <li><strong>Boolean:</strong> bool (true/false)</li>
          <li><strong>Character:</strong> char (4-byte Unicode)</li>
          <li><strong>Tuples:</strong> Fixed-size collections of different types</li>
          <li><strong>Arrays:</strong> Fixed-size collections of the same type</li>
        </ul>
      </div>
    </div>
  </section>
);

export default DataTypesSection;