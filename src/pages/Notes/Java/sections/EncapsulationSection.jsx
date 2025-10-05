import React from "react";

const EncapsulationSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-lock"></i> 16. Encapsulation
      </h2>
      <p>
        Encapsulation hides the internal state of an object and exposes behavior via methods.
        Key points:
        <ul>
          <li>Use <strong>private fields</strong> to restrict direct access.</li>
          <li>Provide <strong>public getters and setters</strong> to control access/modifications.</li>
          <li>Improves code maintainability and security.</li>
        </ul>
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "encapsulation_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// EncapsulationExample.java
public class BankAccount {
    private double balance;

    public BankAccount(double balance) {
        this.balance = balance;
    }

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) balance -= amount;
    }

    public static void main(String[] args) {
        BankAccount acc = new BankAccount(1000);
        acc.deposit(500);
        acc.withdraw(200);
        System.out.println("Balance: $" + acc.getBalance());
    }
}`,
              "encapsulation_code"
            )
          }
        >
          {copiedCode === "encapsulation_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// EncapsulationExample.java
public class BankAccount {
    private double balance;

    public BankAccount(double balance) {
        this.balance = balance;
    }

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) balance -= amount;
    }

    public static void main(String[] args) {
        BankAccount acc = new BankAccount(1000);
        acc.deposit(500);
        acc.withdraw(200);
        System.out.println("Balance: $" + acc.getBalance());
    }
}`}</pre>
      </div>

      <p style={{ fontSize: "0.9rem", color: "#555", marginTop: "0.5rem" }}>
        💡 Tip: Encapsulation helps protect object integrity by controlling how fields are accessed and modified.
      </p>
    </div>
  </section>
);

export default EncapsulationSection;
