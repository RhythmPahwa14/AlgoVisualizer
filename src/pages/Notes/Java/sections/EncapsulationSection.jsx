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

      <p style={{ fontSize: "0.9rem", color: "#000", marginTop: "0.5rem" }}>
        <span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Tip: Encapsulation helps protect object integrity by controlling how fields are accessed and modified.
      </p>
    </div>
  </section>
);

export default EncapsulationSection;

