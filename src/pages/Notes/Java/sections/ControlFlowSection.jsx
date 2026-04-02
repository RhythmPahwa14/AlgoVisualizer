import React from "react";

const ControlFlowSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-sitemap"></i> 7. Control Flow Statements
      </h2>
      <p>
        Control flow statements determine the order in which code is executed. 
        Java provides decision-making structures (if, switch) and looping structures (for, while, do-while).
      </p>

      <h3><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Decision Making Statements</h3>

      <h4>1. if Statement</h4>
      <p>Executes a block of code only if a specified condition is true.</p>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "if_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`int age = 18;
if (age >= 18) {
    System.out.println("You are eligible to vote");
}`,
              "if_code"
            )
          }
        >
          {copiedCode === "if_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`int age = 18;
if (age >= 18) {
    System.out.println("You are eligible to vote");
}`}</pre>
      </div>

      <h4>2. if-else Statement</h4>
      <p>Executes one block if condition is true, another block if false.</p>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "ifelse_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`int number = 15;
if (number % 2 == 0) {
    System.out.println(number + " is even");
} else {
    System.out.println(number + " is odd");
}`,
              "ifelse_code"
            )
          }
        >
          {copiedCode === "ifelse_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`int number = 15;
if (number % 2 == 0) {
    System.out.println(number + " is even");
} else {
    System.out.println(number + " is odd");
}`}</pre>
      </div>

      <h4>3. if-else-if Ladder</h4>
      <p>Tests multiple conditions sequentially.</p>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "ladder_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`int score = 85;
if (score >= 90) {
    System.out.println("Grade: A (Excellent!)");
} else if (score >= 80) {
    System.out.println("Grade: B (Very Good)");
} else if (score >= 70) {
    System.out.println("Grade: C (Good)");
} else if (score >= 60) {
    System.out.println("Grade: D (Pass)");
} else {
    System.out.println("Grade: F (Fail)");
}`,
              "ladder_code"
            )
          }
        >
          {copiedCode === "ladder_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`int score = 85;
if (score >= 90) {
    System.out.println("Grade: A (Excellent!)");
} else if (score >= 80) {
    System.out.println("Grade: B (Very Good)");
} else if (score >= 70) {
    System.out.println("Grade: C (Good)");
} else if (score >= 60) {
    System.out.println("Grade: D (Pass)");
} else {
    System.out.println("Grade: F (Fail)");
}`}</pre>
      </div>

      <h4>4. Nested if Statement</h4>
      <p>An if statement inside another if statement.</p>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "nested_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`int age = 25;
boolean hasLicense = true;

if (age >= 18) {
    if (hasLicense) {
        System.out.println("You can drive!");
    } else {
        System.out.println("You need a license to drive");
    }
} else {
    System.out.println("You are too young to drive");
}`,
              "nested_code"
            )
          }
        >
          {copiedCode === "nested_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`int age = 25;
boolean hasLicense = true;

if (age >= 18) {
    if (hasLicense) {
        System.out.println("You can drive!");
    } else {
        System.out.println("You need a license to drive");
    }
} else {
    System.out.println("You are too young to drive");
}`}</pre>
      </div>

      <h4>5. Ternary Operator (Conditional Operator)</h4>
      <p>Shorthand for if-else: <code>condition ? valueIfTrue : valueIfFalse</code></p>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "ternary_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`int a = 10, b = 20;
int max = (a > b) ? a : b;
System.out.println("Maximum: " + max);

// Multiple ternary operators
String result = (a > b) ? "a is greater" : (a < b) ? "b is greater" : "both are equal";
System.out.println(result);`,
              "ternary_code"
            )
          }
        >
          {copiedCode === "ternary_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`int a = 10, b = 20;
int max = (a > b) ? a : b;
System.out.println("Maximum: " + max);

// Multiple ternary operators
String result = (a > b) ? "a is greater" : (a < b) ? "b is greater" : "both are equal";
System.out.println(result);`}</pre>
      </div>

      <h4>6. switch Statement</h4>
      <p>Selects one of many code blocks to execute based on variable value.</p>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "switch_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// Traditional switch
int day = 3;
switch (day) {
    case 1:
        System.out.println("Monday");
        break;
    case 2:
        System.out.println("Tuesday");
        break;
    case 3:
        System.out.println("Wednesday");
        break;
    case 4:
        System.out.println("Thursday");
        break;
    case 5:
        System.out.println("Friday");
        break;
    case 6:
    case 7:
        System.out.println("Weekend");
        break;
    default:
        System.out.println("Invalid day");
}

// Enhanced switch (Java 12+)
String dayName = switch (day) {
    case 1 -> "Monday";
    case 2 -> "Tuesday";
    case 3 -> "Wednesday";
    case 4 -> "Thursday";
    case 5 -> "Friday";
    case 6, 7 -> "Weekend";
    default -> "Invalid";
};
System.out.println("Day: " + dayName);`,
              "switch_code"
            )
          }
        >
          {copiedCode === "switch_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// Traditional switch
int day = 3;
switch (day) {
    case 1:
        System.out.println("Monday");
        break;
    case 2:
        System.out.println("Tuesday");
        break;
    case 3:
        System.out.println("Wednesday");
        break;
    case 4:
        System.out.println("Thursday");
        break;
    case 5:
        System.out.println("Friday");
        break;
    case 6:
    case 7:
        System.out.println("Weekend");
        break;
    default:
        System.out.println("Invalid day");
}

// Enhanced switch (Java 12+)
String dayName = switch (day) {
    case 1 -> "Monday";
    case 2 -> "Tuesday";
    case 3 -> "Wednesday";
    case 4 -> "Thursday";
    case 5 -> "Friday";
    case 6, 7 -> "Weekend";
    default -> "Invalid";
};
System.out.println("Day: " + dayName);`}</pre>
      </div>

      <h3><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Looping Statements</h3>

      <h4>1. for Loop</h4>
      <p>Executes a block of code a specified number of times.</p>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "for_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// Basic for loop
for (int i = 1; i <= 5; i++) {
    System.out.println("Number: " + i);
}

// Nested for loop (Multiplication table)
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 5; j++) {
        System.out.print(i * j + "\\t");
    }
    System.out.println();
}`,
              "for_code"
            )
          }
        >
          {copiedCode === "for_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// Basic for loop
for (int i = 1; i <= 5; i++) {
    System.out.println("Number: " + i);
}

// Nested for loop (Multiplication table)
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 5; j++) {
        System.out.print(i * j + "\\t");
    }
    System.out.println();
}`}</pre>
      </div>

      <h4>2. Enhanced for Loop (for-each)</h4>
      <p>Iterates through arrays and collections.</p>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "foreach_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`int[] numbers = {10, 20, 30, 40, 50};
for (int num : numbers) {
    System.out.println("Value: " + num);
}

String[] fruits = {"Apple", "Banana", "Cherry"};
for (String fruit : fruits) {
    System.out.println("Fruit: " + fruit);
}`,
              "foreach_code"
            )
          }
        >
          {copiedCode === "foreach_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`int[] numbers = {10, 20, 30, 40, 50};
for (int num : numbers) {
    System.out.println("Value: " + num);
}

String[] fruits = {"Apple", "Banana", "Cherry"};
for (String fruit : fruits) {
    System.out.println("Fruit: " + fruit);
}`}</pre>
      </div>

      <h4>3. while Loop</h4>
      <p>Executes code while a condition is true (condition checked before execution).</p>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "while_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`int count = 1;
while (count <= 5) {
    System.out.println("Count: " + count);
    count++;
}

// Example: Sum of digits
int number = 12345;
int sum = 0;
while (number > 0) {
    sum += number % 10;
    number /= 10;
}
System.out.println("Sum of digits: " + sum);`,
              "while_code"
            )
          }
        >
          {copiedCode === "while_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`int count = 1;
while (count <= 5) {
    System.out.println("Count: " + count);
    count++;
}

// Example: Sum of digits
int number = 12345;
int sum = 0;
while (number > 0) {
    sum += number % 10;
    number /= 10;
}
System.out.println("Sum of digits: " + sum);`}</pre>
      </div>

      <h4>4. do-while Loop</h4>
      <p>Executes code at least once, then repeats while condition is true (condition checked after execution).</p>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "dowhile_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`int i = 1;
do {
    System.out.println("Iteration: " + i);
    i++;
} while (i <= 5);

// Will execute at least once even if condition is false
int j = 10;
do {
    System.out.println("This runs once: " + j);
} while (j < 5); // Condition is false, but runs once`,
              "dowhile_code"
            )
          }
        >
          {copiedCode === "dowhile_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`int i = 1;
do {
    System.out.println("Iteration: " + i);
    i++;
} while (i <= 5);

// Will execute at least once even if condition is false
int j = 10;
do {
    System.out.println("This runs once: " + j);
} while (j < 5); // Condition is false, but runs once`}</pre>
      </div>

      <h3><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Jump Statements</h3>

      <h4>break Statement</h4>
      <p>Exits the loop or switch statement.</p>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "break_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// Break in loop
for (int i = 1; i <= 10; i++) {
    if (i == 6) {
        break; // Exit loop when i is 6
    }
    System.out.println(i);
}`,
              "break_code"
            )
          }
        >
          {copiedCode === "break_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// Break in loop
for (int i = 1; i <= 10; i++) {
    if (i == 6) {
        break; // Exit loop when i is 6
    }
    System.out.println(i);
}`}</pre>
      </div>

      <h4>continue Statement</h4>
      <p>Skips the current iteration and moves to the next.</p>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "continue_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// Continue in loop
for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        continue; // Skip when i is 3
    }
    System.out.println(i);
}
// Output: 1, 2, 4, 5 (3 is skipped)`,
              "continue_code"
            )
          }
        >
          {copiedCode === "continue_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// Continue in loop
for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        continue; // Skip when i is 3
    }
    System.out.println(i);
}
// Output: 1, 2, 4, 5 (3 is skipped)`}</pre>
      </div>

      <h3>Comprehensive Example</h3>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "control_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`public class ControlFlowExample {
    public static void main(String[] args) {
        System.out.println("=== Control Flow Demo ===\\n");
        
        // Decision Making
        int score = 85;
        if (score >= 90) {
            System.out.println("Grade: A");
        } else if (score >= 80) {
            System.out.println("Grade: B");
        } else {
            System.out.println("Grade: C");
        }

        // Switch
        int day = 3;
        String dayName = switch (day) {
            case 1 -> "Monday";
            case 2 -> "Tuesday";
            case 3 -> "Wednesday";
            default -> "Other";
        };
        System.out.println("Day: " + dayName);

        // For loop
        System.out.println("\\nFor Loop:");
        for (int i = 1; i <= 5; i++) {
            System.out.println("Number: " + i);
        }

        // While loop
        System.out.println("\\nWhile Loop:");
        int count = 1;
        while (count <= 3) {
            System.out.println("Count: " + count);
            count++;
        }

        // Break and Continue
        System.out.println("\\nBreak and Continue:");
        for (int i = 1; i <= 10; i++) {
            if (i == 5) continue; // Skip 5
            if (i == 8) break;    // Stop at 8
            System.out.print(i + " ");
        }
    }
}`, "control_code")
          }
        >
          {copiedCode === "control_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`public class ControlFlowExample {
    public static void main(String[] args) {
        System.out.println("=== Control Flow Demo ===\\n");
        
        // Decision Making
        int score = 85;
        if (score >= 90) {
            System.out.println("Grade: A");
        } else if (score >= 80) {
            System.out.println("Grade: B");
        } else {
            System.out.println("Grade: C");
        }

        // Switch
        int day = 3;
        String dayName = switch (day) {
            case 1 -> "Monday";
            case 2 -> "Tuesday";
            case 3 -> "Wednesday";
            default -> "Other";
        };
        System.out.println("Day: " + dayName);

        // For loop
        System.out.println("\\nFor Loop:");
        for (int i = 1; i <= 5; i++) {
            System.out.println("Number: " + i);
        }

        // While loop
        System.out.println("\\nWhile Loop:");
        int count = 1;
        while (count <= 3) {
            System.out.println("Count: " + count);
            count++;
        }

        // Break and Continue
        System.out.println("\\nBreak and Continue:");
        for (int i = 1; i <= 10; i++) {
            if (i == 5) continue; // Skip 5
            if (i == 8) break;    // Stop at 8
            System.out.print(i + " ");
        }
    }
}`}</pre>
      </div>

      <div style={{background: '#e0f2fe', borderLeft: '4px solid #0284c7', padding: '1rem 1.5rem', margin: '1.5rem 0', borderRadius: '0 12px 12px 0'}}>
        <strong><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Best Practices:</strong>
        <ul style={{marginTop: '0.5rem', marginBottom: 0}}>
          <li>Use <code>for</code> loop when you know the number of iterations</li>
          <li>Use <code>while</code> loop when iterations depend on a condition</li>
          <li>Use <code>do-while</code> when you need at least one execution</li>
          <li>Use enhanced <code>for-each</code> loop for iterating collections/arrays</li>
          <li>Prefer switch expressions (Java 12+) for cleaner code</li>
          <li>Always include <code>break</code> in switch cases to avoid fall-through (unless intentional)</li>
        </ul>
      </div>
    </div>
  </section>
);

export default ControlFlowSection;
