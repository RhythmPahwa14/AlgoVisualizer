import React, { useState, useEffect, useCallback, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Play, Square, RotateCcw, Download, Copy, Check } from "lucide-react";

/**
 * Python Environment Manager - Modularized for better maintainability
 */
class PythonEnvironment {
  constructor() {
    this.pyodide = null;
    this.isLoading = false;
    this.isReady = false;
    this.loadPromise = null;
  }

  async initialize(onStatusChange) {
    if (this.loadPromise) return this.loadPromise;
    if (this.isReady) return this.pyodide;

    this.isLoading = true;
    onStatusChange?.("Loading Python environment...");

    this.loadPromise = this._loadPyodide(onStatusChange);
    return this.loadPromise;
  }

  async _loadPyodide(onStatusChange) {
    try {
      if (!window.loadPyodide) {
        throw new Error("Pyodide is not available. Please include the Pyodide script.");
      }

      onStatusChange?.("Initializing Python runtime...");
      this.pyodide = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
      });

      onStatusChange?.("Installing Python packages...");
      await this.pyodide.loadPackage(["numpy", "matplotlib"]);

      this.isLoading = false;
      this.isReady = true;
      onStatusChange?.("Python environment ready!");

      return this.pyodide;
    } catch (error) {
      this.isLoading = false;
      onStatusChange?.(`Error loading Python: ${error.message}`);
      throw error;
    }
  }

  async runCode(code) {
    if (!this.isReady || !this.pyodide) {
      throw new Error("Python environment not ready");
    }

    try {
      // Capture stdout using modular approach
      this._setupOutputCapture();

      // Run user code
      const result = await this.pyodide.runPythonAsync(code);

      // Get captured output
      const stdout = this._getCapturedOutput();

      // Reset stdout
      this._resetOutputCapture();

      return {
        result: result,
        output: stdout || "Code executed successfully!",
        error: null
      };
    } catch (error) {
      this._resetOutputCapture();

      return {
        result: null,
        output: null,
        error: error.message
      };
    }
  }

  // Modular helper methods
  _setupOutputCapture() {
    this.pyodide.runPython(`
      import sys
      from io import StringIO
      sys.stdout = StringIO()
    `);
  }

  _getCapturedOutput() {
    return this.pyodide.runPython("sys.stdout.getvalue()");
  }

  _resetOutputCapture() {
    try {
      this.pyodide.runPython("sys.stdout = sys.__stdout__");
    } catch (error) {
      console.error('Error resetting stdout:', error);
    }
  }

  reset() {
    if (this.pyodide && this.isReady) {
      try {
        this._clearUserVariables();
      } catch (error) {
        console.error('Error resetting environment:', error);
      }
    }
  }

  _clearUserVariables() {
    this.pyodide.runPython(`
      # Clear user-defined variables
      for name in list(globals().keys()):
          if not name.startswith('_') and name not in ['sys', 'os', 'numpy', 'matplotlib']:
              del globals()[name]
    `);
  }
}

/**
 * Code Utilities - Modularized helper functions
 */
const CodeUtils = {
  // Default Python example code
  getDefaultCode: () => `# Python Algorithm Example - Bubble Sort
def bubble_sort(arr):
    """
    Bubble Sort Algorithm
    Time Complexity: O(n²)
    Space Complexity: O(1)
    """
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
print("Original array:", numbers)

sorted_numbers = bubble_sort(numbers.copy())
print("Sorted array:", sorted_numbers)

# Demonstrate step by step
print("\\nStep by step sorting:")
demo_arr = [5, 2, 8, 1, 9]
print(f"Initial: {demo_arr}")

for i in range(len(demo_arr)):
    for j in range(0, len(demo_arr) - i - 1):
        if demo_arr[j] > demo_arr[j + 1]:
            demo_arr[j], demo_arr[j + 1] = demo_arr[j + 1], demo_arr[j]
            print(f"Swap {demo_arr[j+1]} and {demo_arr[j]}: {demo_arr}")`,

  // File operations
  downloadCode: (code, filename = "python_code.py") => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // Clipboard operations
  copyToClipboard: async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true;
    }
  },

  // Output formatting
  formatOutput: (output, error) => {
    if (error) {
      return `❌ Error:\n${error}`;
    }
    return output || "✅ Code executed successfully!";
  }
};

/**
 * Main Python Code Runner Component - Modularized and Clean
 */
const CodeRunnerPython = ({
  defaultCode = CodeUtils.getDefaultCode(),
  height = "400px",
  theme = "vs-dark"
}) => {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);

  const pythonEnv = useRef(new PythonEnvironment());
  const executionTimeoutRef = useRef(null);

  // Initialize Python environment
  useEffect(() => {
    const initPython = async () => {
      try {
        await pythonEnv.current.initialize(setStatus);
        setStatus("Ready to run Python code!");
      } catch (error) {
        setStatus(`Failed to initialize: ${error.message}`);
      }
    };

    initPython();

    return () => {
      if (executionTimeoutRef.current) {
        clearTimeout(executionTimeoutRef.current);
      }
    };
  }, []);

  // Run Python code
  const runCode = useCallback(async () => {
    if (!pythonEnv.current.isReady) {
      setOutput("❌ Python environment not ready. Please wait...");
      return;
    }

    setIsRunning(true);
    setOutput("🔄 Running Python code...");

    // Set execution timeout
    executionTimeoutRef.current = setTimeout(() => {
      setIsRunning(false);
      setOutput("⏰ Code execution timed out (30s limit)");
    }, 30000);

    try {
      const result = await pythonEnv.current.runCode(code);
      const formattedOutput = CodeUtils.formatOutput(result.output, result.error);
      setOutput(formattedOutput);
    } catch (error) {
      setOutput(`❌ Execution Error:\n${error.message}`);
    } finally {
      setIsRunning(false);
      if (executionTimeoutRef.current) {
        clearTimeout(executionTimeoutRef.current);
        executionTimeoutRef.current = null;
      }
    }
  }, [code]);

  // Stop execution
  const stopExecution = useCallback(() => {
    if (executionTimeoutRef.current) {
      clearTimeout(executionTimeoutRef.current);
      executionTimeoutRef.current = null;
    }
    setIsRunning(false);
    setOutput("⏹️ Execution stopped by user");
  }, []);

  // Reset environment
  const resetEnvironment = useCallback(() => {
    pythonEnv.current.reset();
    setOutput("");
    setStatus("Environment reset. Ready to run code!");
  }, []);

  // Copy code to clipboard
  const copyCode = useCallback(async () => {
    const success = await CodeUtils.copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  // Download code
  const downloadCode = useCallback(() => {
    CodeUtils.downloadCode(code);
  }, [code]);

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <h2 className="text-white text-xl font-semibold">🐍 Python Code Runner</h2>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={copyCode}
            className="flex items-center space-x-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
            title="Copy code"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>

          <button
            onClick={downloadCode}
            className="flex items-center space-x-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
            title="Download code"
          >
            <Download size={16} />
            <span>Download</span>
          </button>

          <button
            onClick={resetEnvironment}
            className="flex items-center space-x-1 px-3 py-1.5 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm transition-colors"
            title="Reset environment"
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Status Bar */}
      {status && (
        <div className="mb-4 p-3 bg-blue-900/50 border border-blue-700 rounded-lg">
          <p className="text-blue-200 text-sm">{status}</p>
        </div>
      )}

      {/* Code Editor */}
      <div className="mb-4">
        <Editor
          height={height}
          language="python"
          theme={theme}
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            insertSpaces: true,
          }}
        />
      </div>

      {/* Control Buttons */}
      <div className="flex items-center space-x-3 mb-4">
        {!isRunning ? (
          <button
            onClick={runCode}
            disabled={!pythonEnv.current.isReady}
            className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            <Play size={20} />
            <span>Run Python Code</span>
          </button>
        ) : (
          <button
            onClick={stopExecution}
            className="flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            <Square size={20} />
            <span>Stop Execution</span>
          </button>
        )}

        <div className="text-gray-400 text-sm">
          {isRunning ? "⏳ Running..." : "Ready"}
        </div>
      </div>

      {/* Output */}
      <div className="bg-black text-green-400 p-4 rounded-lg min-h-[150px] font-mono text-sm overflow-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-500">Output:</span>
          {output && (
            <button
              onClick={() => CodeUtils.copyToClipboard(output)}
              className="text-gray-500 hover:text-green-400 text-xs"
              title="Copy output"
            >
              Copy Output
            </button>
          )}
        </div>
        <pre className="whitespace-pre-wrap">{output || "No output yet. Run some Python code!"}</pre>
      </div>
    </div>
  );
};

export default CodeRunnerPython;
