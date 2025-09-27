import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  const [code, setCode] = useState("// Write your code here...");

  const runCode = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(code);
      alert(result !== undefined ? result : "Code executed successfully!");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Online Code Editor
      </h2>

      {/* Editor container */}
      <div className="flex-1 border rounded-lg shadow overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value)}
          options={{
            fontSize: 16,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>

      {/* Run button */}
      <button
        onClick={runCode}
        className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 self-start"
      >
        Run Code
      </button>
    </div>
  );
};

export default CodeEditor;
