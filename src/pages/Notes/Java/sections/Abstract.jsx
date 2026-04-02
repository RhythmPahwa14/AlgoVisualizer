import React from "react";

const Abstract = ({ copyCode, copiedCode }) => {
  return (
    <div>
      <div className="card">
        <h2 style={{ textAlign: "center", fontSize: "2.3rem" }}>
          <span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Abstraction in Java
        </h2>
        <p>
          Abstraction is the process of hiding implementation details and
          showing only the essential features of an object. It helps you focus
          on what an object does instead of how it does it.
        </p>

        <h3>In Java, abstraction is mainly achieved using:</h3>
        <ul>
          <li>
            {" "}
            <strong>Abstract Class</strong>{" "}
          </li>
          <li>
            {" "}
            <strong>Interfaces</strong>{" "}
          </li>
        </ul>

        {/* abstract classes */}
        <h2><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> 1. Abstract Classes</h2>
        <p>
          An abstract class is a class that cannot be instantiated directly —
          it’s meant to be inherited.{" "}
          <ul>
            <li style={{ listStyle: "inside", listStyleType: "circle" }}>
              Abstract methods (no body — must be implemented by subclasses)
            </li>
            <li style={{ listStyle: "inside", listStyleType: "circle" }}>
              Concrete methods (with implementation)
            </li>
          </ul>
        </p>
        <div className="code-container">
          <button
            className={`copy-btn ${
              copiedCode === "abstract_code" ? "copied" : ""
            }`}
            onClick={() =>
              copyCode(
                `// Abstract class
abstract class Animal {
    abstract void makeSound();  // abstract method

    void eat() {               // concrete method
        System.out.println("This animal eats food.");
    }
}

// Concrete subclass
class Dog extends Animal {
    void makeSound() {
        System.out.println("Woof! Woof!");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.makeSound(); // Output: Woof! Woof!
        dog.eat();       // Output: This animal eats food.
    }
}
`,
                "abstract_code"
              )
            }
          >
            {copiedCode === "abstract_code" ? "Copied!" : "Copy"}
          </button>
          <pre>
            {`
// Abstract class
abstract class Animal {
    abstract void makeSound();  // abstract method

    void eat() {               // concrete method
        System.out.println("This animal eats food.");
    }
}

// Concrete subclass
class Dog extends Animal {
    void makeSound() {
        System.out.println("Woof! Woof!");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.makeSound(); // Output: Woof! Woof!
        dog.eat();       // Output: This animal eats food.
    }
}
                `}
          </pre>
        </div>
        <h2><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Key Points </h2>
        <ul>
          <li style={{ listStyle: "inside", listStyleType: "circle" }}>
            An abstract class can have both abstract and non-abstract methods.{" "}
          </li>
          <li style={{ listStyle: "inside", listStyleType: "circle" }}>
            If a class has at least one abstract method, it must be declared
            abstract.
          </li>
          <li style={{ listStyle: "inside", listStyleType: "circle" }}>
            You cannot instantiate an abstract class directly.
          </li>
          <li style={{ listStyle: "inside", listStyleType: "circle" }}>
            Abstract classes can have constructors, fields, and static methods.
          </li>
        </ul>

        {/* interface */}
        <h2 style={{ borderTop: "2px solid #fff", paddingTop: "1.4rem" }}>
          <span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> 2. Interfaces
        </h2>
        <p>
          An interface defines a contract of methods that a class must
          implement.
          <ul>
            <li>Default methods (with implementation)</li>
            <li>Static methods</li>
          </ul>
        </p>
        <div className="code-container">
          <button
            className={`copy-btn ${
              copiedCode === "abstract_code" ? "copied" : ""
            }`}
            onClick={() =>
              copyCode(
                `interface Vehicle {
    void start();  // abstract method

    default void stop() {  // default method
        System.out.println("Vehicle stopped.");
    }
}

class Car implements Vehicle {
    public void start() {
        System.out.println("Car started.");
    }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car();
        car.start();  // Output: Car started.
        car.stop();   // Output: Vehicle stopped.
    }
}
`,
                "abstract_code"
              )
            }
          >
            {copiedCode === "abstract_code" ? "Copied!" : "Copy"}
          </button>
          <pre>
            {`
interface Vehicle {
    void start();  // abstract method

    default void stop() {  // default method
        System.out.println("Vehicle stopped.");
    }
}

class Car implements Vehicle {
    public void start() {
        System.out.println("Car started.");
    }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car();
        car.start();  // Output: Car started.
        car.stop();   // Output: Vehicle stopped.
    }
}
                `}
          </pre>
        </div>

        <h1 style={{fontSize:"2rem" , color:"#fff"}}><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> When to Use</h1>
        <ul>
          <li>Use abstract classes when classes share code or state. </li>
          <li>
            Use interfaces when you just need a common contract or behavior.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Abstract;
