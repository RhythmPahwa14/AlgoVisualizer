import React from "react";

const RadixSort = () => {
  return (
    <div className="p-8 bg-gray-900 min-h-screen text-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-blue-400">Radix Sort</h1>
      <p className="text-gray-300 mb-4">
        Radix Sort is a non-comparative sorting algorithm that sorts numbers by
        processing individual digits. It works by sorting the input numbers
        digit by digit, starting from the least significant digit to the most
        significant one.
      </p>

      

      <h2 className="text-2xl font-semibold mb-2 text-blue-300">
        Working Principle
      </h2>
      <p className="text-gray-300 mb-4">
        Radix Sort uses a stable sorting algorithm (like Counting Sort) as a
        subroutine to sort elements based on each digit. It groups numbers by
        their digits, sorting one digit at a time.
      </p>

      <h3 className="text-xl font-semibold mb-2 text-blue-300">Example</h3>
      <pre className="bg-gray-800 text-gray-200 p-4 rounded-lg mb-4">
        Input: [170, 45, 75, 90, 802, 24, 2, 66]{"\n"}
        Step 1: Sort by 1s digit → [170, 90, 802, 2, 24, 45, 75, 66]{"\n"}
        Step 2: Sort by 10s digit → [802, 2, 24, 45, 66, 170, 75, 90]{"\n"}
        Step 3: Sort by 100s digit → [2, 24, 45, 66, 75, 90, 170, 802]
      </pre>

      <h3 className="text-xl font-semibold mb-2 text-blue-300">Pseudocode</h3>
      <pre className="bg-gray-800 text-gray-200 p-4 rounded-lg mb-4">
{`function radixSort(array):
  maxNum = find maximum number
  exp = 1
  while maxNum / exp > 0:
      countingSort(array, exp)
      exp *= 10`}
      </pre>

      <h3 className="text-xl font-semibold mb-2 text-blue-300">
        Time Complexity
      </h3>
      <ul className="list-disc pl-6 text-gray-300">
        <li>Best Case: O(nk)</li>
        <li>Average Case: O(nk)</li>
        <li>Worst Case: O(nk)</li>
        <li>Space Complexity: O(n + k)</li>
      </ul>

      <p className="text-gray-300 mt-4">
        Radix Sort is efficient when the range of digits (k) is not much larger
        than the number of elements (n).
      </p>
    </div>
  );
};

export default RadixSort;
