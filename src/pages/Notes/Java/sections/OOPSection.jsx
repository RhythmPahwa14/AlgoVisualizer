import React from "react";

const OOPSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-object-group"></i> 9. Object-Oriented Programming Concepts
      </h2>
      <p>
        Java is an object-oriented language. Key pillars:
      </p>
      <ul>
        <li><strong>Encapsulation:</strong> Bundle data & methods, control access via private/public.</li>
        <li><strong>Inheritance:</strong> Create new classes from existing ones.</li>
        <li><strong>Polymorphism:</strong> Objects can take multiple forms (method overriding/overloading).</li>
        <li><strong>Abstraction:</strong> Hide implementation details, show only necessary parts.</li>
      </ul>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "oop_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// OOPExample.java
// Demonstrates Encapsulation, Inheritance, Polymorphism

class BankAccount {
    private String accountNumber;
    private double balance;

    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    public double getBalance() {
        return balance;
    }

    public void printAccountType() {
        System.out.println("Generic Bank Account");
    }
}

class SavingsAccount extends BankAccount {
    private double interestRate;

    public SavingsAccount(String acc, double bal, double rate) {
        super(acc, bal);
        this.interestRate = rate;
    }

    // Polymorphism via method overriding
    @Override
    public void printAccountType() {
        System.out.println("Savings Account with interest rate: " + interestRate + "%");
    }
}

public class OOPExample {
    public static void main(String[] args) {
        BankAccount acc1 = new BankAccount("BA001", 1000);
        acc1.deposit(500);
        acc1.printAccountType();
        System.out.println("Balance: $" + acc1.getBalance());

        SavingsAccount acc2 = new SavingsAccount("SA123", 1000.0, 2.5);
        acc2.deposit(500.0);
        acc2.printAccountType();
        System.out.println("Balance: $" + acc2.getBalance());
    }
}`,
              "oop_code"
            )
          }
        >
          {copiedCode === "oop_code" ? "Copied!" : "Copy"}
        </button>

        <pre>{`// OOPExample.java
// Demonstrates Encapsulation, Inheritance, Polymorphism

class BankAccount {
    private String accountNumber;
    private double balance;

    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    public double getBalance() {
        return balance;
    }

    public void printAccountType() {
        System.out.println("Generic Bank Account");
    }
}

class SavingsAccount extends BankAccount {
    private double interestRate;

    public SavingsAccount(String acc, double bal, double rate) {
        super(acc, bal);
        this.interestRate = rate;
    }

    @Override
    public void printAccountType() {
        System.out.println("Savings Account with interest rate: " + interestRate + "%");
    }
}

public class OOPExample {
    public static void main(String[] args) {
        BankAccount acc1 = new BankAccount("BA001", 1000);
        acc1.deposit(500);
        acc1.printAccountType();
        System.out.println("Balance: $" + acc1.getBalance());

        SavingsAccount acc2 = new SavingsAccount("SA123", 1000.0, 2.5);
        acc2.deposit(500.0);
        acc2.printAccountType();
        System.out.println("Balance: $" + acc2.getBalance());
    }
}`}</pre>
      </div>
    </div>
  </section>
);

export default OOPSection;
