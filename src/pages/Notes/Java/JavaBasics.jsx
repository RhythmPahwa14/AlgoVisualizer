import React from "react";
import CodeRunnerJava from "../../../components/CodeRunnerJava";  // ✅ use new name

const JavaBasics = () => {
  return (
    <div>
      <h1>Java Basics</h1>
      <p>Learn Java with interactive code snippets.</p>

      <h2>Hello World</h2>
      <CodeRunnerJava
        language="java"
        defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, AlgoVisualizer!");
    }
}`}
      />

      <h2>Simple Addition</h2>
      <CodeRunnerJava
        language="java"
        defaultCode={`public class Main {
    public static void main(String[] args) {
        int a = 5, b = 7;
        System.out.println("Sum: " + (a + b));
    }
}`}
      />
    </div>
  );
};

export default JavaBasics;
