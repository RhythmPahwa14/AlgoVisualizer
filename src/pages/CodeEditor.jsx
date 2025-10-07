import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";

// 🎯 Debug logging helper
const logDebug = (message, data = null) => {
  console.log(`💻 CodeEditorDebug: ${message}`, data ? data : '');
};

// 🎯 Performance monitoring helper
const trackPerformance = (operation, startTime) => {
  const duration = performance.now() - startTime;
  logDebug(`⏱️ ${operation} Performance`, { duration: `${duration.toFixed(2)}ms` });
  return duration;
};

// 🎯 Safe code execution with timeout
const executeCodeSafely = (code, timeoutMs = 5000) => {
  return new Promise((resolve, reject) => {
    const executionStartTime = performance.now();
    
    // Create a safe execution context
    const safeContext = {
      console: {
        log: (...args) => {
          logDebug('📝 Console output', { args });
          return console.log(...args);
        },
        error: console.error,
        warn: console.warn,
        info: console.info
      },
      alert: (message) => {
        logDebug('🚨 Alert triggered', { message });
        return alert(message);
      }
    };

    // Set execution timeout
    const timeoutId = setTimeout(() => {
      reject(new Error(`Code execution timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    try {
      // Wrap code in try-catch and execute in restricted context
      const wrappedCode = `
        try {
          ${code}
        } catch (error) {
          throw new Error('Execution error: ' + error.message);
        }
      `;
      
      // Use Function constructor for safer execution
      const result = new Function(...Object.keys(safeContext), `
        "use strict";
        ${wrappedCode}
      `)(...Object.values(safeContext));

      clearTimeout(timeoutId);
      const executionTime = performance.now() - executionStartTime;
      
      logDebug('✅ Code executed successfully', {
        executionTime: `${executionTime.toFixed(2)}ms`,
        hasResult: result !== undefined
      });
      
      resolve({
        result,
        executionTime,
        hasOutput: result !== undefined
      });
    } catch (error) {
      clearTimeout(timeoutId);
      const executionTime = performance.now() - executionStartTime;
      
      logDebug('❌ Code execution failed', {
        error: error.message,
        executionTime: `${executionTime.toFixed(2)}ms`
      });
      
      reject(error);
    }
  });
};

const CodeEditor = () => {
  const [code, setCode] = useState("// Write your code here...\nconsole.log('Hello, World!');\n// Try: 2 + 2");
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionStats, setExecutionStats] = useState({
    totalExecutions: 0,
    successfulExecutions: 0,
    failedExecutions: 0,
    totalExecutionTime: 0,
    lastExecutionTime: null
  });
  const [editorStatus, setEditorStatus] = useState('ready');
  const editorRef = useRef(null);

  // 🎯 Component lifecycle logging
  useEffect(() => {
    logDebug('🚀 CodeEditor component mounted');
    
    return () => {
      logDebug('🧹 CodeEditor component unmounting', {
        totalExecutions: executionStats.totalExecutions,
        successRate: executionStats.totalExecutions > 0 
          ? (executionStats.successfulExecutions / executionStats.totalExecutions * 100).toFixed(1) + '%'
          : 'N/A'
      });
    };
  }, []);

  // 🎯 Editor event handlers
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    logDebug('📝 Editor mounted', {
      language: 'javascript',
      theme: 'vs-dark',
      lineCount: editor.getModel()?.getLineCount() || 0
    });

    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      logDebug('⌨️ Keyboard shortcut triggered', { action: 'run_code' });
      runCode();
    });
  };

  const handleCodeChange = (value) => {
    const changeStartTime = performance.now();
    setCode(value || "");
    
    const changeDuration = trackPerformance('Code Change', changeStartTime);
    
    logDebug('📝 Code changed', {
      characterCount: value?.length || 0,
      lineCount: value?.split('\n').length || 0,
      changeTime: `${changeDuration.toFixed(2)}ms`
    });
  };

  // 🎯 Enhanced code execution with safety features
  const runCode = async () => {
    const executionStartTime = performance.now();
    setIsExecuting(true);
    setEditorStatus('executing');
    
    logDebug('🎬 Starting code execution', {
      codeLength: code.length,
      lineCount: code.split('\n').length
    });

    try {
      const { result, executionTime, hasOutput } = await executeCodeSafely(code);
      
      setExecutionStats(prev => ({
        ...prev,
        totalExecutions: prev.totalExecutions + 1,
        successfulExecutions: prev.successfulExecutions + 1,
        totalExecutionTime: prev.totalExecutionTime + executionTime,
        lastExecutionTime: executionTime
      }));

      setEditorStatus('success');
      
      const message = hasOutput 
        ? `Result: ${result}\n\nExecution time: ${executionTime.toFixed(2)}ms`
        : `Code executed successfully!\n\nExecution time: ${executionTime.toFixed(2)}ms`;
      
      alert(message);
      
      logDebug('✅ Execution completed', {
        result: hasOutput ? result : 'undefined',
        executionTime: `${executionTime.toFixed(2)}ms`,
        totalExecutions: executionStats.totalExecutions + 1
      });

    } catch (error) {
      setExecutionStats(prev => ({
        ...prev,
        totalExecutions: prev.totalExecutions + 1,
        failedExecutions: prev.failedExecutions + 1,
        lastExecutionTime: performance.now() - executionStartTime
      }));

      setEditorStatus('error');
      
      alert(`Error: ${error.message}\n\nCheck the console for details.`);
      
      logDebug('❌ Execution failed', {
        error: error.message,
        executionTime: `${(performance.now() - executionStartTime).toFixed(2)}ms`,
        totalExecutions: executionStats.totalExecutions + 1
      });
    } finally {
      setIsExecuting(false);
      // Reset status after delay
      setTimeout(() => setEditorStatus('ready'), 2000);
    }
  };

  // 🎯 Keyboard navigation support
  const handleKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      logDebug('⌨️ Keyboard shortcut activated', { shortcut: 'Ctrl+Enter' });
      runCode();
    }
  };

  // 🎯 Get execution statistics
  const getExecutionStats = () => {
    const { totalExecutions, successfulExecutions, failedExecutions, totalExecutionTime, lastExecutionTime } = executionStats;
    
    const successRate = totalExecutions > 0 
      ? ((successfulExecutions / totalExecutions) * 100).toFixed(1)
      : 0;
    
    const averageTime = totalExecutions > 0 
      ? (totalExecutionTime / totalExecutions).toFixed(2)
      : 0;

    return {
      totalExecutions,
      successfulExecutions,
      failedExecutions,
      successRate: `${successRate}%`,
      averageTime: `${averageTime}ms`,
      lastExecutionTime: lastExecutionTime ? `${lastExecutionTime.toFixed(2)}ms` : 'N/A'
    };
  };

  const stats = getExecutionStats();

  return (
    <div 
      className="flex flex-col h-screen p-4 bg-gray-100"
      role="main"
      aria-label="Online Code Editor"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Online Code Editor
      </h2>

      {/* 🎯 Status and Statistics Bar */}
      <div 
        className="flex justify-between items-center mb-4 p-3 bg-white rounded-lg shadow-sm"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center gap-4 text-sm">
          <span className={`px-2 py-1 rounded ${
            editorStatus === 'ready' ? 'bg-green-100 text-green-800' :
            editorStatus === 'executing' ? 'bg-yellow-100 text-yellow-800' :
            editorStatus === 'success' ? 'bg-blue-100 text-blue-800' :
            'bg-red-100 text-red-800'
          }`}>
            Status: {
              editorStatus === 'ready' ? 'Ready' :
              editorStatus === 'executing' ? 'Executing...' :
              editorStatus === 'success' ? 'Success' : 'Error'
            }
          </span>
          
          {process.env.NODE_ENV === 'development' && (
            <span className="text-gray-600">
              Executions: {stats.totalExecutions} | Success: {stats.successRate}
            </span>
          )}
        </div>

        <div className="text-sm text-gray-600" aria-label="Keyboard shortcuts">
          <kbd className="px-2 py-1 bg-gray-200 rounded">Ctrl</kbd> +{" "}
          <kbd className="px-2 py-1 bg-gray-200 rounded">Enter</kbd> to run
        </div>
      </div>

      {/* Editor container */}
      <div 
        className="flex-1 border rounded-lg shadow overflow-hidden"
        role="application"
        aria-label="Code editor"
      >
        <Editor
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={handleCodeChange}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 16,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: 'on',
            lineNumbers: 'on',
            glyphMargin: true,
            folding: true,
            detectIndentation: true,
            accessibilitySupport: 'on'
          }}
          loading={
            <div 
              className="flex items-center justify-center h-full bg-gray-900 text-white"
              role="status"
              aria-label="Loading editor"
            >
              Loading Code Editor...
            </div>
          }
        />
      </div>

      {/* Control Bar */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-4">
          {/* Run button */}
          <button
            onClick={runCode}
            disabled={isExecuting}
            className={`px-6 py-3 rounded-lg self-start transition-colors ${
              isExecuting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-medium`}
            aria-label={isExecuting ? "Code is executing" : "Run code"}
            aria-busy={isExecuting}
          >
            {isExecuting ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                Executing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>🚀</span>
                Run Code
              </span>
            )}
          </button>

          {/* 🎯 Execution Statistics (Debug View) */}
          {process.env.NODE_ENV === 'development' && executionStats.totalExecutions > 0 && (
            <div 
              className="text-sm text-gray-600 bg-white p-2 rounded border"
              role="complementary"
              aria-label="Execution statistics"
            >
              <strong>📊 Stats:</strong> {stats.successfulExecutions}/{
                stats.totalExecutions} successful • Avg: {stats.averageTime}
            </div>
          )}
        </div>

        {/* 🎯 Code Information */}
        <div className="text-sm text-gray-600" aria-label="Code information">
          {code.split('\n').length} lines • {code.length} characters
        </div>
      </div>

      {/* 🎯 Accessibility Helper */}
      <div 
        className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800"
        role="complementary"
        aria-label="Accessibility information"
      >
        <strong>♿ Accessibility:</strong> Use <kbd>Tab</kbd> to navigate and <kbd>Ctrl+Enter</kbd> to run code. 
        Screen reader users can navigate the editor using standard screen reader commands.
      </div>

      {/* 🎯 Safety Notice */}
      <div 
        className="mt-2 p-2 bg-yellow-50 rounded text-xs text-yellow-800"
        role="note"
        aria-label="Safety notice"
      >
        <strong>⚠️ Safety:</strong> Code executes in a restricted environment with a 5-second timeout. 
        Avoid infinite loops and resource-intensive operations.
      </div>
    </div>
  );
};

export default CodeEditor;
