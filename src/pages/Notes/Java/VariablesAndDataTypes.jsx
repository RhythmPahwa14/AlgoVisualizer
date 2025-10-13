import React from 'react';

const VariablesAndDataTypes = () => {
  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h1 className="h3 mb-0">Java Variables & Data Types</h1>
        </div>
        <div className="card-body" style={{ lineHeight: '1.7' }}>
          
          <h2 className="h4">What is a Variable?</h2>
          <p>
            A variable is a container which holds the value while the Java program is executed. A variable is assigned with a data type. It's a name given to a memory location.
          </p>

          <h3 className="h5 mt-4">Primitive Data Types</h3>
          <p>
            Java has eight primitive data types, which are the most basic types of data available.
          </p>
          <ul>
            <li><strong>boolean:</strong> Represents true or false values.</li>
            <li><strong>byte:</strong> 8-bit signed integer.</li>
            <li><strong>char:</strong> 16-bit Unicode character.</li>
            <li><strong>short:</strong> 16-bit signed integer.</li>
            <li><strong>int:</strong> 32-bit signed integer (most commonly used for whole numbers).</li>
            <li><strong>long:</strong> 64-bit signed integer.</li>
            <li><strong>float:</strong> 32-bit floating-point number.</li>
            <li><strong>double:</strong> 64-bit floating-point number (most commonly used for decimal numbers).</li>
          </ul>

          <h3 className="h5 mt-4">Declaring and Initializing Variables</h3>
          <p>Here is an example of how to declare and initialize variables in Java:</p>
          <pre className="bg-light p-3 rounded"><code>
            {`public class VariableExample {
    public static void main(String[] args) {
        // Declaring an integer variable
        int age = 30;

        // Declaring a double variable
        double salary = 60000.50;

        // Declaring a character variable
        char initial = 'J';

        // Declaring a boolean variable
        boolean isEmployed = true;

        // Declaring a String (which is a non-primitive type)
        String name = "John Doe";

        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }
}`}
          </code></pre>
          
        </div>
      </div>
    </div>
  );
};

export default VariablesAndDataTypes;