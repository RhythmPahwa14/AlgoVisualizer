import React from 'react';

const CVariablesAndDataTypes = () => {
  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h1 className="h3 mb-0">C Variables & Data Types</h1>
        </div>
        <div className="card-body" style={{ lineHeight: '1.7' }}>
          
          <h2 className="h4">What is a Variable?</h2>
          <p>
            In C, a variable is a name given to a storage area that our programs can manipulate. Each variable in C has a specific type, which determines the size and layout of the variable's memory. You must declare a variable's type before using it.
          </p>

          <h3 className="h5 mt-4">Basic Data Types</h3>
          <p>
            C has a set of basic data types. The most fundamental are:
          </p>
          
          <ul>
            <li><strong>int:</strong> Used for integers (whole numbers).</li>
            <li><strong>float:</strong> Used for single-precision floating-point numbers (decimals).</li>
            <li><strong>double:</strong> Used for double-precision floating-point numbers, offering more precision than float.</li>
            <li><strong>char:</strong> Used to store a single character.</li>
            <li><strong>void:</strong> Represents the absence of a type, primarily used for functions that return nothing.</li>
          </ul>

          <h3 className="h5 mt-4">Declaring and Initializing Variables</h3>
          <p>Here is an example of how to declare and initialize variables in C:</p>
          <pre className="bg-light p-3 rounded"><code>
            {`#include <stdio.h>

int main() {
    // Declaring an integer variable
    int age = 28;

    // Declaring a float variable
    float pi = 3.14f;

    // Declaring a character variable
    char grade = 'B';

    // Printing the values of the variables
    printf("Age: %d\\n", age);
    printf("Value of Pi: %f\\n", pi);
    printf("Grade: %c\\n", grade);

    return 0;
}`}
          </code></pre>
          
        </div>
      </div>
    </div>
  );
};

export default CVariablesAndDataTypes;