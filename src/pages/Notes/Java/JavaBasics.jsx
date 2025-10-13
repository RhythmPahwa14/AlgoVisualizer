import React from 'react';

const JavaBasics = () => {
  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h1 className="h3 mb-0">Java Basics</h1>
        </div>
        <div className="card-body" style={{ lineHeight: '1.7' }}>
          
          <h2 className="h4">Operators in Java</h2>
          <p>
            Operators are special symbols that perform specific operations on one, two, or three operands, and then return a result.
          </p>
          <ul>
            <li><strong>Arithmetic Operators:</strong> `+`, `-`, `*`, `/`, `%`</li>
            <li><strong>Relational Operators:</strong> `==`, `!=`, `&gt;`, `&lt;`, `&gt;=`, `&lt;=`</li>
            <li><strong>Logical Operators:</strong> `&&` (AND), `||` (OR), `!` (NOT)</li>
            <li><strong>Assignment Operators:</strong> `=`, `+=`, `-=`, `*=`, `/=`</li>
          </ul>

          <h3 className="h5 mt-4">Conditional Statements: If-Else</h3>
          <p>
            The `if-else` statement is used to execute a block of code based on a condition. If the condition is true, the `if` block is executed; otherwise, the `else` block is executed.
          </p>
          <pre className="bg-light p-3 rounded"><code>
            {`int number = 10;

if (number > 0) {
    System.out.println("The number is positive.");
} else {
    System.out.println("The number is not positive.");
}`}
          </code></pre>

          <h3 className="h5 mt-4">Loops: For Loop</h3>
          <p>Loops are used to execute a block of code repeatedly. The `for` loop is ideal when you know exactly how many times you want to loop through a block of code.</p>
          <pre className="bg-light p-3 rounded"><code>
            {`// This loop will print numbers from 0 to 4
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}`}
          </code></pre>
          
        </div>
      </div>
    </div>
  );
};

export default JavaBasics;