// src/pages/BeginnerPrograms.jsx
import React from "react";

const BeginnerPrograms = () => {
  const programs = [
    {
      id: 1,
      title: "Hello World",
      description: "Print 'Hello World' in JavaScript",
      code: `console.log("Hello World");`,
    },
    {
      id: 2,
      title: "Sum of Two Numbers",
      description: "Take two numbers as input and print their sum",
      code: `const num1 = 5;
const num2 = 10;
const sum = num1 + num2;
console.log("Sum:", sum);`,
    },
    {
      id: 3,
      title: "Factorial",
      description: "Calculate factorial of a number using a loop",
      code: `const factorial = (n) => {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
};
console.log(factorial(5));`,
    },
    {
      id: 4,
      title: "Fibonacci Sequence",
      description: "Print first N Fibonacci numbers",
      code: `const fibonacci = (n) => {
  let a = 0, b = 1;
  let sequence = [a];
  for (let i = 1; i < n; i++) {
    sequence.push(b);
    let temp = b;
    b = a + b;
    a = temp;
  }
  return sequence;
};
console.log(fibonacci(10));`,
    },
    {
      id: 5,
      title: "Palindrome Checker",
      description: "Check if a string or number is a palindrome",
      code: `const isPalindrome = (str) => {
  const reversed = str.split("").reverse().join("");
  return str === reversed;
};
console.log(isPalindrome("racecar"));
console.log(isPalindrome("hello"));`,
    },
    {
      id: 6,
      title: "Prime Number Checker",
      description: "Check if a number is prime",
      code: `const isPrime = (n) => {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
};
console.log(isPrime(7));
console.log(isPrime(10));`,
    },
    {
      id: 7,
      title: "Reverse a Number",
      description: "Reverse the digits of a number",
      code: `let num = 12345;
let reversed = 0;
while (num > 0) {
  reversed = reversed * 10 + (num % 10);
  num = Math.floor(num / 10);
}
console.log(reversed);`,
    },
    {
      id: 8,
      title: "Sum of Digits",
      description: "Calculate the sum of digits of a number",
      code: `let num = 1234;
let sum = 0;
while (num > 0) {
  sum += num % 10;
  num = Math.floor(num / 10);
}
console.log(sum);`,
    },
    {
      id: 9,
      title: "Even or Odd Checker",
      description: "Check if a number is even or odd",
      code: `const checkEvenOdd = (num) => {
  return num % 2 === 0 ? "Even" : "Odd";
};
console.log(checkEvenOdd(10));
console.log(checkEvenOdd(7));`,
    },
    {
      id: 10,
      title: "Largest of Three Numbers",
      description: "Find the largest among three numbers",
      code: `const largestOfThree = (a, b, c) => {
  return Math.max(a, b, c);
};
console.log(largestOfThree(5, 10, 7));`,
    },
    {
      id: 11,
      title: "Reverse a String",
      description: "Reverse a given string",
      code: `const reverseString = (str) => {
  return str.split("").reverse().join("");
};
console.log(reverseString("hello"));`,
    },
    {
      id: 12,
      title: "Count Vowels in a String",
      description: "Count the number of vowels in a string",
      code: `const countVowels = (str) => {
  return str.match(/[aeiou]/gi)?.length || 0;
};
console.log(countVowels("hello world"));`,
    },
    {
      id: 13,
      title: "Find Maximum in an Array",
      description: "Find the maximum number in an array",
      code: `const arr = [5, 10, 7, 3, 20];
const max = Math.max(...arr);
console.log(max);`,
    },
    {
      id: 14,
      title: "Check Armstrong Number",
      description: "Check if a number is an Armstrong number",
      code: `const isArmstrong = (num) => {
  const digits = num.toString().split("");
  const sum = digits.reduce((acc, d) => acc + Math.pow(Number(d), digits.length), 0);
  return sum === num;
};
console.log(isArmstrong(153)); // true
console.log(isArmstrong(123)); // false`,
    },
    {
      id: 15,
      title: "Simple Calculator",
      description: "Add, Subtract, Multiply, Divide two numbers",
      code: `const calculator = (a, b) => ({
  add: a + b,
  subtract: a - b,
  multiply: a * b,
  divide: a / b,
});
console.log(calculator(10, 5));`,
    },
    {
      id: 16,
      title: "Print Star Pattern (Triangle)",
      description: "Print a triangle of stars",
      code: `const n = 5;
for (let i = 1; i <= n; i++) {
  console.log("*".repeat(i));
}`,
    },
  ];

  return (
    <div className="beginner-programs-container">
      <h1>Beginner Level Programs</h1>
      <p>These programs are designed for new coders to practice basic concepts.</p>
      <ul>
        {programs.map((program) => (
          <li key={program.id} style={{ marginBottom: "2rem" }}>
            <h3>{program.title}</h3>
            <p>{program.description}</p>
            <pre
              style={{
                backgroundColor: "#f5f5f5",
                padding: "1rem",
                borderRadius: "5px",
                overflowX: "auto",
              }}
            >
              <code>{program.code}</code>
            </pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BeginnerPrograms;
