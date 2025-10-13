import React from 'react';

const CppVariablesAndDataTypes = () => {
  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h1 className="h3 mb-0">C++ Variables & Data Types</h1>
        </div>
        <div className="card-body" style={{ lineHeight: '1.7' }}>
          
          <h2 className="h4">What is a Variable?</h2>
          <p>
            In C++, a variable is a named storage location. Unlike Python, you must declare the type of a variable before you can use it. This is known as static typing.
          </p>

          <h3 className="h5 mt-4">Fundamental Data Types</h3>
          <p>
            C++ has a rich set of built-in data types. The most common ones are:
          </p>
          
          <ul>
            <li><strong>int:</strong> Used for whole numbers (e.g., 10, -50).</li>
            <li><strong>double:</strong> Used for floating-point or decimal numbers (e.g., 3.14, -0.01).</li>
            <li><strong>char:</strong> Used for single characters (e.g., 'a', 'Z').</li>
            <li><strong>bool:</strong> Used for true or false values.</li>
            <li><strong>std::string:</strong> A class from the standard library used for sequences of characters.</li>
          </ul>

          <h3 className="h5 mt-4">Declaring and Initializing Variables</h3>
          <p>Here is an example of how to declare and initialize variables in C++:</p>
          <pre className="bg-light p-3 rounded"><code>
            {`#include <iostream>
#include <string>

int main() {
    // Declaring an integer variable
    int age = 25;

    // Declaring a double variable
    double price = 99.95;

    // Declaring a character variable
    char grade = 'A';

    // Declaring a boolean variable
    bool isStudent = true;

    // Declaring a string variable
    std::string name = "Jane Doe";

    std::cout << "Name: " << name << std::endl;
    std::cout << "Age: " << age << std::endl;

    return 0;
}`}
          </code></pre>
          
        </div>
      </div>
    </div>
  );
};

export default CppVariablesAndDataTypes;