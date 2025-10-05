import React from "react";

const ClassesSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-cubes"></i> 13. Classes & Objects
      </h2>
      <p>
        Classes are blueprints containing <strong>fields</strong> (data) and <strong>methods</strong> (behavior). 
        Objects are instances of classes.
      </p>
      <p>
        Use access modifiers (<code>public</code>, <code>private</code>, <code>protected</code>) to control visibility.
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "classes_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// ClassObjectExample.java
// Demonstrates classes, objects, and methods

class Car {
    // Fields
    private String model;
    private int year;

    // Constructor
    public Car(String model, int year) {
        this.model = model;
        this.year = year;
    }

    // Method to display info
    public void displayInfo() {
        System.out.println("Car Model: " + model + ", Year: " + year);
    }

    // Getter example
    public String getModel() { return model; }
    public int getYear() { return year; }
}

public class ClassObjectExample {
    public static void main(String[] args) {
        // Create object of Car
        Car myCar = new Car("Civic", 2020);

        // Call method on object
        myCar.displayInfo();

        // Access fields via getters
        System.out.println("Model: " + myCar.getModel());
        System.out.println("Year: " + myCar.getYear());
    }
}`,
              "classes_code"
            )
          }
        >
          {copiedCode === "classes_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// ClassObjectExample.java
// Demonstrates classes, objects, and methods

class Car {
    // Fields
    private String model;
    private int year;

    // Constructor
    public Car(String model, int year) {
        this.model = model;
        this.year = year;
    }

    // Method to display info
    public void displayInfo() {
        System.out.println("Car Model: " + model + ", Year: " + year);
    }

    // Getter example
    public String getModel() { return model; }
    public int getYear() { return year; }
}

public class ClassObjectExample {
    public static void main(String[] args) {
        // Create object of Car
        Car myCar = new Car("Civic", 2020);

        // Call method on object
        myCar.displayInfo();

        // Access fields via getters
        System.out.println("Model: " + myCar.getModel());
        System.out.println("Year: " + myCar.getYear());
    }
}`}</pre>
      </div>
    </div>
  </section>
);

export default ClassesSection;
