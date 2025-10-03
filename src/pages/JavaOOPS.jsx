import React from "react";

const JavaOOPS = () => {
  return (
    <div className="page-container">
      <h1>Java OOP Concepts</h1>
      <p>
        Object-Oriented Programming (OOP) in Java organizes software around <strong>objects</strong> and <strong>classes</strong>.  
        The four main pillars of OOP are: <em>Encapsulation, Inheritance, Polymorphism, and Abstraction</em>.
      </p>

      {/* Encapsulation */}
      <section>
        <h2>1. Encapsulation</h2>
        <p>
          Encapsulation is the practice of <strong>hiding internal details</strong> of a class and providing controlled access using methods.
        </p>
        <p><strong>Example:</strong> Bank account balance is private and can only be accessed through deposit/withdraw methods.</p>
        <pre>
{`class BankAccount {
    private double balance;

    public void deposit(double amount) {
        if(amount > 0) balance += amount;
    }

    public void withdraw(double amount) {
        if(amount > 0 && amount <= balance) balance -= amount;
    }

    public double getBalance() {
        return balance;
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount();
        account.deposit(500);
        account.withdraw(200);
        System.out.println(account.getBalance());  // Output: 300
    }
}`}
        </pre>
      </section>

      {/* Inheritance */}
      <section>
        <h2>2. Inheritance</h2>
        <p>
          Inheritance allows a class to <strong>use properties and methods of another class</strong>.
        </p>
        <p><strong>Example:</strong> Vehicle and Car — Car inherits common vehicle features.</p>
        <pre>
{`class Vehicle {
    void start() {
        System.out.println("Vehicle is starting");
    }
}

class Car extends Vehicle {
    void honk() {
        System.out.println("Car is honking");
    }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car();
        car.start();  // Inherited from Vehicle
        car.honk();   // Own method
    }
}`}
        </pre>
      </section>

      {/* Polymorphism */}
      <section>
        <h2>3. Polymorphism</h2>
        <p>
          Polymorphism means <strong>one name, many forms</strong>. It allows methods to behave differently based on context.
        </p>
        <ul>
          <li><strong>Compile-time (Method Overloading)</strong> – Same method name, different parameters.</li>
          <li><strong>Runtime (Method Overriding)</strong> – Child class changes behavior of a parent method.</li>
        </ul>
        <p><strong>Example:</strong></p>
        <pre>
{`// Compile-time Polymorphism
class Calculator {
    int add(int a, int b) {
        return a + b;
    }
    double add(double a, double b) {
        return a + b;
    }
}

// Runtime Polymorphism
class Animal {
    void sound() {
        System.out.println("Some generic sound");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Dog barks");
    }
}

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println(calc.add(5, 10));    // 15
        System.out.println(calc.add(2.5, 3.5)); // 6.0

        Animal animal = new Dog();
        animal.sound();  // Output: Dog barks
    }
}`}
        </pre>
      </section>

      {/* Abstraction */}
      <section>
        <h2>4. Abstraction</h2>
        <p>
          Abstraction hides the implementation details and shows only functionality.  
          Achieved with <code>abstract classes</code> or <code>interfaces</code>.
        </p>
        <p><strong>Example:</strong> A vehicle can start, but how it starts depends on the type (Car or Bike).</p>
        <pre>
{`abstract class Vehicle {
    abstract void start();
}

class Car extends Vehicle {
    void start() {
        System.out.println("Car starts with key");
    }
}

class Bike extends Vehicle {
    void start() {
        System.out.println("Bike starts with button");
    }
}

public class Main {
    public static void main(String[] args) {
        Vehicle v1 = new Car();
        Vehicle v2 = new Bike();
        v1.start();  // Car starts with key
        v2.start();  // Bike starts with button
    }
}`}
        </pre>
      </section>

      {/* Conclusion */}
      <section>
        <h2>Conclusion</h2>
        <p>
          These four pillars — Encapsulation, Inheritance, Polymorphism, and Abstraction —  
          form the foundation of Java OOP. Understanding them helps in writing **clean, reusable, and maintainable code**.
        </p>
      </section>
    </div>
  );
};

export default JavaOOPS;
