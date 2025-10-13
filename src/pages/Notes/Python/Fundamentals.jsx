import React from 'react';

const PythonFundamentals = () => {
  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h1 className="h3 mb-0">Python Fundamentals</h1>
        </div>
        <div className="card-body" style={{ lineHeight: '1.7' }}>
          
          <h2 className="h4">What is Python?</h2>
          <p>
            Python is a high-level, interpreted, general-purpose programming language. 
            Its design philosophy emphasizes code readability with the use of significant indentation. 
            Python is dynamically-typed and garbage-collected. It supports multiple programming paradigms, 
            including structured, object-oriented, and functional programming.
          </p>

          <h3 className="h5 mt-4">Key Features</h3>
          <ul>
            <li><strong>Easy to Learn and Read:</strong> Python's syntax is simple and resembles plain English, making it beginner-friendly.</li>
            <li><strong>Interpreted Language:</strong> Code is executed line by line, which makes debugging easier.</li>
            <li><strong>Large Standard Library:</strong> Python provides a vast library of modules and functions for various tasks.</li>
            <li><strong>Cross-Platform:</strong> Python code can run on various operating systems like Windows, macOS, and Linux without modification.</li>
          </ul>

          <h3 className="h5 mt-4">Your First Python Program</h3>
          <p>Here is an example of a simple "Hello, World!" program in Python:</p>
          <pre className="bg-light p-3 rounded"><code>
            {`# This line prints "Hello, World!" to the console
print("Hello, World!")`}
          </code></pre>
          
        </div>
      </div>
    </div>
  );
};

export default PythonFundamentals;