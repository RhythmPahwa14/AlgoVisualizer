import React, { useState, useEffect } from "react";

// CodeRunner component for running JS or Python
const CodeRunner = ({ language = "javascript", defaultCode = "" }) => {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState("");
  const [pyodide, setPyodide] = useState(null);

  // Load Pyodide for Python support
  useEffect(() => {
    if (language === "python") {
      const loadPyodide = async () => {
        setOutput("Loading Python environment...");
        const pyodideModule = await window.loadPyodide();
        setPyodide(pyodideModule);
        setOutput("");
      };
      loadPyodide();
    }
  }, [language]);

  // Run code function
  const runCode = async () => {
    if (language === "javascript") {
      try {
        // Capture console.log output
        let result = "";
        const log = console.log;
        console.log = (msg) => { result += msg + "\n"; };
        eval(code);
        console.log = log;
        setOutput(result || "Code executed successfully!");
      } catch (err) {
        setOutput(err.message);
      }
    } else if (language === "python") {
      try {
        if (!pyodide) return setOutput("Python environment not ready.");
        const result = await pyodide.runPythonAsync(code);
        setOutput(result ?? "Code executed successfully!");
      } catch (err) {
        setOutput(err.message);
      }
    }
  };

  return (
    <div className="code-runner">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="code-input"
        rows={8}
        style={{ width: "100%", fontFamily: "monospace", fontSize: "14px", padding: "8px" }}
      />
      <button onClick={runCode} className="run-btn">
        Run {language === "python" ? "Python" : "JS"}
      </button>
      <pre className="output">{output}</pre>
    </div>
  );
};

export default CodeRunner;
