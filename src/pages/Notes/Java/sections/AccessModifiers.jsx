import React from "react";

const AccessModifiers = ({ copyCode, copiedCode }) => {
  return (
    <div>
      <div className="card">
        <h2 style={{ textAlign: "center", fontSize: "2.3rem" }}>
          Access Modifiers in Java
        </h2>
        <p>
          Access modifiers in Java define how accessible classes, methods, and
          variables are from other parts of the program. They help you protect
          data and control visibility — an important part of encapsulation.
        </p>

        <h3>Types of Access Modifiers</h3>
        <p>Java provides four access levels:</p>
        <ul>
          <li>
            <strong>public</strong> – accessible everywhere.
          </li>
          <li>
            <strong>protected</strong> – accessible within the same package and
            subclasses.
          </li>
          <li>
            <strong>default</strong> (no modifier) – accessible within the same
            package only.
          </li>
          <li>
            <strong>private</strong> – accessible within the same class only.
          </li>
        </ul>

        {/* Public Modifier */}
        <h2>1. Public</h2>
        <p>
          A <code>public</code> member can be accessed from anywhere — inside or
          outside the class, even from other packages.
        </p>
        <div className="code-container">
          <button
            className={`copy-btn ${
              copiedCode === "public_code" ? "copied" : ""
            }`}
            onClick={() =>
              copyCode(
                `public class Car {
    public String model = "Tesla Model 3";

    public void start() {
        System.out.println("Car started!");
    }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car();
        System.out.println(car.model);  // Accessible
        car.start();                    // Accessible
    }
}`,
                "public_code"
              )
            }
          >
            {copiedCode === "public_code" ? "Copied!" : "Copy"}
          </button>
          <pre>
            {`
public class Car {
    public String model = "Tesla Model 3";

    public void start() {
        System.out.println("Car started!");
    }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car();
        System.out.println(car.model);  // Accessible
        car.start();                    // Accessible
    }
}
`}
          </pre>
        </div>

        {/* Default Modifier */}
        <h2>2. Default (No Modifier)</h2>
        <p>
          If no access modifier is specified, Java gives it{" "}
          <strong>package-private</strong> visibility — accessible only within
          the same package.
        </p>
        <div className="code-container">
          <button
            className={`copy-btn ${
              copiedCode === "default_code" ? "copied" : ""
            }`}
            onClick={() =>
              copyCode(
                `class Car {
    String model = "Honda Civic";  // default access

    void start() {
        System.out.println("Car started!");
    }
}`,
                "default_code"
              )
            }
          >
            {copiedCode === "default_code" ? "Copied!" : "Copy"}
          </button>
          <pre>
            {`
class Car {
    String model = "Honda Civic";  // default access

    void start() {
        System.out.println("Car started!");
    }
}
`}
          </pre>
        </div>

        {/* Protected Modifier */}
        <h2>3. Protected</h2>
        <p>
          A <code>protected</code> member is visible within the same package and
          to subclasses, even if they are in different packages.
        </p>
        <div className="code-container">
          <button
            className={`copy-btn ${
              copiedCode === "protected_code" ? "copied" : ""
            }`}
            onClick={() =>
              copyCode(
                `class Vehicle {
    protected String type = "Electric Vehicle";
}

class Car extends Vehicle {
    void displayType() {
        System.out.println(type);  // Accessible via inheritance
    }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car();
        car.displayType();  // Output: Electric Vehicle
    }
}`,
                "protected_code"
              )
            }
          >
            {copiedCode === "protected_code" ? "Copied!" : "Copy"}
          </button>
          <pre>
            {`
class Vehicle {
    protected String type = "Electric Vehicle";
}

class Car extends Vehicle {
    void displayType() {
        System.out.println(type);  // Accessible via inheritance
    }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car();
        car.displayType();  // Output: Electric Vehicle
    }
}
`}
          </pre>
        </div>

        {/* Private Modifier */}
        <h2>4. Private</h2>
        <p>
          A <code>private</code> member is only accessible within its own class.
          It’s the most restrictive modifier and ensures data encapsulation.
        </p>
        <div className="code-container">
          <button
            className={`copy-btn ${
              copiedCode === "private_code" ? "copied" : ""
            }`}
            onClick={() =>
              copyCode(
                `public class Account {
    private double balance = 5000.0;

    public void showBalance() {
        System.out.println("Balance: " + balance);
    }
}

public class Main {
    public static void main(String[] args) {
        Account acc = new Account();
        // System.out.println(acc.balance); // Error: balance has private access
        acc.showBalance();  // Output: Balance: 5000.0
    }
}`,
                "private_code"
              )
            }
          >
            {copiedCode === "private_code" ? "Copied!" : "Copy"}
          </button>
          <pre>
            {`
public class Account {
    private double balance = 5000.0;

    public void showBalance() {
        System.out.println("Balance: " + balance);
    }
}

public class Main {
    public static void main(String[] args) {
        Account acc = new Account();
        // System.out.println(acc.balance); // Error: balance has private access
        acc.showBalance();  // Output: Balance: 5000.0
    }
}
`}
          </pre>
        </div>

        {/* Key Takeaways */}
        <h3>Key Takeaways</h3>

        <ul>
          <li>Access modifiers control visibility and encapsulation.</li>
          <li>Use <code>private</code> for sensitive data.</li>
          <li>
            Use <code>public</code> for APIs or methods that should be globally
            accessible.
          </li>
          <li>
            <code>protected</code> and <code>default</code> are middle levels of
            access control.
          </li>
          <li>
            Mixing modifiers properly helps you design secure, modular programs.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccessModifiers;
