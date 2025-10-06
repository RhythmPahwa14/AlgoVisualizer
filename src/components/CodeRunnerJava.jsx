import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

const CodeRunnerJava = () => {
  const [code, setCode] = useState(`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`);
  const [output, setOutput] = useState("");

  const runCode = async () => {
    setOutput("⏳ Running...");
    try {
      // Check if API key is configured
      if (!import.meta.env.VITE_RAPIDAPI_KEY) {
        setOutput("⚠️ RapidAPI key not configured. Please add VITE_RAPIDAPI_KEY to your environment variables.");
        return;
      }

      const response = await axios.post("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", {
        source_code: code,
        language_id: 62, // 62 = Java (OpenJDK 17) in Judge0
      }, {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
        }
      });

      if (response.data.stdout) {
        setOutput(response.data.stdout);
      } else if (response.data.stderr) {
        setOutput("Error: " + response.data.stderr);
      } else {
        setOutput("No output");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setOutput("⚠️ Invalid API key. Please check your RapidAPI configuration.");
      } else {
        setOutput("⚠️ Error running code. Please try again.");
      }
      console.error("Java execution error:", error);
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow-lg">
      <h2 className="text-white text-lg mb-2">💻 Java Code Runner</h2>
      <Editor
        height="300px"
        language="java"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value)}
      />
      <button
        onClick={runCode}
        className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
      >
        ▶ Run Code
      </button>
      <div className="mt-3 bg-black text-green-400 p-3 rounded-lg min-h-[100px]">
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default CodeRunnerJava;
