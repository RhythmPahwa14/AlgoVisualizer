import React from 'react';

const CppFundamentals = () => {
  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h1 className="h3 mb-0">C++ Fundamentals</h1>
        </div>
        <div className="card-body" style={{ lineHeight: '1.7' }}>
          
          <h2 className="h4">What is C++?</h2>
          <p>
            C++ is a cross-platform language that can be used to create high-performance applications. It was developed by Bjarne Stroustrup as an extension of the C language. C++ gives programmers a high level of control over system resources and memory.
          </p>

          <h3 className="h5 mt-4">Key Features</h3>
          <ul>
            <li><strong>Object-Oriented:</strong> C++ supports the four primary features of object-oriented programming: encapsulation, polymorphism, inheritance, and abstraction.</li>
            <li><strong>Compiled Language:</strong> C++ code is compiled into machine code, which results in faster execution speeds compared to interpreted languages.</li>
            <li><strong>Statically Typed:</strong> The type of a variable is checked at compile-time, which helps catch errors early in development.</li>
          </ul>

          <h3 className="h5 mt-4">Your First C++ Program</h3>
          <p>Here is an example of a simple "Hello, World!" program in C++:</p>
          <pre className="bg-light p-3 rounded"><code>
            {`#include <iostream>

int main() {
    // This line prints "Hello, World!" to the console
    std::cout << "Hello, World!";
    return 0;
}`}
          </code></pre>
          
        </div>
      </div>
    </div>
  );
};

export default CppFundamentals;