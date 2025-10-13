import React from 'react';

const PythonVariablesAndDataTypes = () => {
  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h1 className="h3 mb-0">Python Variables & Data Types</h1>
        </div>
        <div className="card-body" style={{ lineHeight: '1.7' }}>
          
          <h2 className="h4">What is a Variable?</h2>
          <p>
            In Python, a variable is a name that refers to a value. Unlike in other programming languages, you do not need to declare a variable's type. Python is dynamically typed, meaning the type is determined at runtime.
          </p>

          <h3 className="h5 mt-4">Common Data Types</h3>
          <p>
            Python has several built-in data types. Here are the most common ones:
          </p>
          <ul>
            <li><strong>Text Type:</strong> <code>str</code> (e.g., "Hello World")</li>
            <li><strong>Numeric Types:</strong> <code>int</code> (e.g., 20), <code>float</code> (e.g., 20.5)</li>
            <li><strong>Sequence Types:</strong> <code>list</code>, <code>tuple</code></li>
            <li><strong>Mapping Type:</strong> <code>dict</code> (dictionary)</li>
            <li><strong>Boolean Type:</strong> <code>bool</code> (True or False)</li>
          </ul>

          <h3 className="h5 mt-4">Declaring and Using Variables</h3>
          <p>Here is an example of how to create and use variables in Python:</p>
          <pre className="bg-light p-3 rounded"><code>
            {`# A variable of type int
age = 25

# A variable of type float
price = 19.99

# A variable of type str
name = "Alice"

# A variable of type bool
is_student = True

print(name)
print(age)
print(price)`}
          </code></pre>
          
        </div>
      </div>
    </div>
  );
};

export default PythonVariablesAndDataTypes;