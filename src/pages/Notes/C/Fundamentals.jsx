import React from 'react';

const CFundamentals = () => {
  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h1 className="h3 mb-0">C Fundamentals</h1>
        </div>
        <div className="card-body" style={{ lineHeight: '1.7' }}>
          
          <h2 className="h4">What is C?</h2>
          <p>
            C is a general-purpose, procedural computer programming language supporting structured programming, lexical variable scope, and recursion, with a static type system. By design, C provides constructs that map efficiently to typical machine instructions. It has found lasting use in applications previously coded in assembly language, including operating systems.
          </p>
          
          <h3 className="h5 mt-4">Key Features</h3>
          <ul>
            <li><strong>Procedural Language:</strong> Instructions are executed step by step.</li>
            <li><strong>Fast and Efficient:</strong> C is a compiled language, making it very fast. It allows for direct memory manipulation.</li>
            <li><strong>Portable:</strong> Code written in C can be run on different machines with minimal or no modification.</li>
            <li><strong>Mother of all Languages:</strong> Many modern languages like C++, Java, and Python have borrowed syntax and concepts from C.</li>
          </ul>

          <h3 className="h5 mt-4">Your First C Program</h3>
          <p>Here is an example of a simple "Hello, World!" program in C:</p>
          <pre className="bg-light p-3 rounded"><code>
            {`#include <stdio.h>

int main() {
    // This function prints "Hello, World!" to the console
    printf("Hello, World!");
    return 0;
}`}
          </code></pre>
          
        </div>
      </div>
    </div>
  );
};

export default CFundamentals;