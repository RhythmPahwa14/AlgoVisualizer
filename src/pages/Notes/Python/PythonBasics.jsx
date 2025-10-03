import React from "react";
import CodeRunnerPython from "../../../components/CodeRunnerPython"; 

const PythonBasics = () => {
  return (
    <div>
      <h1>Python Basics</h1>
      <p>Learn Python with interactive code snippets.</p>

      <h2>Hello World</h2>
      <CodeRunnerPython
        language="python"
        defaultCode={`print("Hello, AlgoVisualizer!")`}
      />

      <h2>Simple Addition</h2>
      <CodeRunnerPython
        language="python"
        defaultCode={`a = 5\nb = 7\nprint("Sum:", a + b)`}
      />

      <h2>JavaScript Example</h2>
      <CodeRunnerPython
        language="javascript"
        defaultCode={`console.log("Hello from JS!");`}
      />
    </div>
  );
};

export default PythonBasics;
