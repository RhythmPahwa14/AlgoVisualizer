import React from 'react';

const Fundamentals = () => {
  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h1 className="h3 mb-0">Java Fundamentals</h1>
        </div>
        <div className="card-body" style={{ lineHeight: '1.7' }}>
          
          <h2 className="h4">What is Java?</h2>
          <p>
            Java is a high-level, class-based, object-oriented programming language
            that is designed to have as few implementation dependencies as possible. 
            It is a general-purpose programming language intended to let application 
            developers "write once, run anywhere" (WORA), meaning that compiled Java 
            code can run on all platforms that support Java without the need for recompilation.
          </p>

          <h3 className="h5 mt-4">Key Features</h3>
          <ul>
            <li><strong>Platform Independent:</strong> Java code is compiled into an intermediate format (bytecode) which can be executed on any machine that has a Java Virtual Machine (JVM).</li>
            <li><strong>Object-Oriented:</strong> In Java, everything is an object, which allows you to create modular programs and reusable code.</li>
            <li><strong>Simple and Secure:</strong> Java is designed to be easy to learn and its security features make it a safe choice for developing applications.</li>
          </ul>

          <h3 className="h5 mt-4">Your First Java Program</h3>
          <p>Here is an example of a simple "Hello, World!" program in Java:</p>
          <pre className="bg-light p-3 rounded"><code>
            {`public class HelloWorld {
    public static void main(String[] args) {
        // Prints "Hello, World!" to the terminal window.
        System.out.println("Hello, World!");
    }
}`}
          </code></pre>
          
        </div>
      </div>
    </div>
  );
};

export default Fundamentals;