import React from "react";

const QuickSort = () => {
  return (
    <div className="text-white px-8 py-6 min-h-screen bg-transparent">
      <h1 className="text-4xl font-bold mb-4 text-center text-blue-400">
        Quick Sort
      </h1>

      <p className="text-lg mb-4 leading-relaxed">
        Quick Sort is an efficient, in-place, divide-and-conquer sorting algorithm.
        It works by selecting a <span className="text-yellow-400">pivot element</span>
        from the array and partitioning the remaining elements into two subarrays —
        elements less than the pivot and elements greater than the pivot. The process
        repeats recursively on each subarray until the entire array is sorted.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-green-400">
        🔹 Steps of Quick Sort:
      </h2>
      <ol className="list-decimal ml-6 space-y-1">
        <li>Select a pivot element from the array.</li>
        <li>
          Partition the array so that all elements smaller than the pivot are on its
          left and all greater elements are on its right.
        </li>
        <li>Recursively apply Quick Sort to the left and right subarrays.</li>
        <li>Combine the results to form the sorted array.</li>
      </ol>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-green-400">
        🔹 Example:
      </h2>
      <pre className="bg-gray-900 text-gray-200 p-4 rounded-lg overflow-x-auto">
        {`Input:  [10, 7, 8, 9, 1, 5]
Pivot:  5
After Partition: [1, 5, 7, 8, 9, 10]
Output: [1, 5, 7, 8, 9, 10]`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-green-400">
        🔹 Pseudocode:
      </h2>
      <pre className="bg-gray-900 text-gray-200 p-4 rounded-lg overflow-x-auto">
        {`function quickSort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quickSort(arr, low, pi - 1)
        quickSort(arr, pi + 1, high)

function partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j = low to high - 1:
        if arr[j] <= pivot:
            i = i + 1
            swap(arr[i], arr[j])
    swap(arr[i + 1], arr[high])
    return i + 1`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-green-400">
        🔹 Time & Space Complexity:
      </h2>
      <table className="table-auto border-collapse border border-gray-700 mt-2">
        <thead>
          <tr className="bg-gray-800 text-yellow-400">
            <th className="border border-gray-700 px-4 py-2">Case</th>
            <th className="border border-gray-700 px-4 py-2">Time Complexity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-700 px-4 py-2">Best</td>
            <td className="border border-gray-700 px-4 py-2">O(n log n)</td>
          </tr>
          <tr>
            <td className="border border-gray-700 px-4 py-2">Average</td>
            <td className="border border-gray-700 px-4 py-2">O(n log n)</td>
          </tr>
          <tr>
            <td className="border border-gray-700 px-4 py-2">Worst</td>
            <td className="border border-gray-700 px-4 py-2">O(n²)</td>
          </tr>
          <tr>
            <td className="border border-gray-700 px-4 py-2">Space</td>
            <td className="border border-gray-700 px-4 py-2">O(log n)</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-green-400">
        🔹 Key Points:
      </h2>
      <ul className="list-disc ml-6 space-y-1">
        <li>Quick Sort is faster in practice compared to Merge Sort.</li>
        <li>It is an in-place sorting algorithm (requires minimal extra space).</li>
        <li>Performance depends on pivot selection (bad pivot → O(n²)).</li>
        <li>Often used for large datasets and systems programming.</li>
      </ul>
    </div>
  );
};

export default QuickSort;
