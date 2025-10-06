import React from "react";

const PolymorphismSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-exchange-alt"></i> 15. Polymorphism
      </h2>
      <p>
        Polymorphism allows objects to be treated as instances of their <strong>parent type</strong>. 
        It enables flexible and reusable code. Key points:
        <ul>
          <li>Method overriding is <strong>runtime polymorphism</strong>.</li>
          <li>Compile-time polymorphism occurs via <strong>method overloading</strong>.</li>
          <li>Interfaces are often used to achieve polymorphic behavior.</li>
        </ul>
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "polymorphism_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// PolymorphismExample.java
interface Shape {
    double area();
}

class Circle implements Shape {
    double radius;
    Circle(double radius) { this.radius = radius; }
    public double area() { return Math.PI * radius * radius; }
}

class Rectangle implements Shape {
    double width, height;
    Rectangle(double width, double height) { this.width = width; this.height = height; }
    public double area() { return width * height; }
}

public class PolymorphismExample {
    public static void main(String[] args) {
        Shape s1 = new Circle(2);
        Shape s2 = new Rectangle(3, 4);
        System.out.println("Circle area: " + s1.area());
        System.out.println("Rectangle area: " + s2.area());
    }
}`,
              "polymorphism_code"
            )
          }
        >
          {copiedCode === "polymorphism_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// PolymorphismExample.java
interface Shape {
    double area();
}

class Circle implements Shape {
    double radius;
    Circle(double radius) { this.radius = radius; }
    public double area() { return Math.PI * radius * radius; }
}

class Rectangle implements Shape {
    double width, height;
    Rectangle(double width, double height) { this.width = width; this.height = height; }
    public double area() { return width * height; }
}

public class PolymorphismExample {
    public static void main(String[] args) {
        Shape s1 = new Circle(2);
        Shape s2 = new Rectangle(3, 4);
        System.out.println("Circle area: " + s1.area());
        System.out.println("Rectangle area: " + s2.area());
    }
}`}</pre>
      </div>

      <p style={{ fontSize: "0.9rem", color: "#555", marginTop: "0.5rem" }}>
        💡 Tip: Polymorphism allows your code to work with objects of different classes uniformly. It’s key for scalable and maintainable OOP design.
      </p>
    </div>
  </section>
);

export default PolymorphismSection;
