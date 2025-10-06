import React from "react";

const VariablesSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-tag"></i> 5. Variables in Java
      </h2>
      <p>
        Variables store data. Java variables must be declared with a type. Scope can be local, instance, or static (class).
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "variables_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`public class VariableTypes {
    String instanceVar = "instance";
    static String staticVar = "static";

    public void display() {
        String localVar = "local";
        System.out.println(localVar);
        System.out.println(instanceVar);
        System.out.println(staticVar);
    }

    public static void main(String[] args) {
        System.out.println(VariableTypes.staticVar);
        VariableTypes obj = new VariableTypes();
        obj.display();
    }
}`, "variables_code")
          }
        >
          {copiedCode === "variables_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`public class VariableTypes {
    String instanceVar = "instance";
    static String staticVar = "static";

    public void display() {
        String localVar = "local";
        System.out.println(localVar);
        System.out.println(instanceVar);
        System.out.println(staticVar);
    }

    public static void main(String[] args) {
        System.out.println(VariableTypes.staticVar);
        VariableTypes obj = new VariableTypes();
        obj.display();
    }
}`}</pre>
      </div>
    </div>
  </section>
);

export default VariablesSection;
