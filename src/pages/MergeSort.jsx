import React from "react";

const MergeSortPage = () => {
  return (
    <div className="documentation p-6">
      <h1>🧩 Merge Sort</h1>

      <h2>📖 Overview</h2>
      <p>
        Merge Sort is a <strong>divide-and-conquer</strong> algorithm that divides
        the input array into two halves, recursively sorts them, and then merges
        the two sorted halves into one sorted array.
      </p>
      <p>
        It guarantees <strong>O(n log n)</strong> time complexity in all cases,
        making it one of the most efficient sorting algorithms.
      </p>

      <h2>⚙️ Working Principle</h2>
      <ol>
        <li><strong>Divide:</strong> Split the unsorted list into two halves until each sublist contains a single element.</li>
        <li><strong>Conquer:</strong> Recursively sort the two halves.</li>
        <li><strong>Combine:</strong> Merge the sorted halves to produce the final sorted array.</li>
      </ol>

      <h2>🔢 Example</h2>
      <pre>
{`Input:
arr = [38, 27, 43, 3, 9, 82, 10]

Process:
Divide: [38, 27, 43, 3, 9, 82, 10]
→ [38, 27, 43, 3] and [9, 82, 10]
→ [38, 27] [43, 3] and [9, 82] [10]
→ Keep splitting until single elements

Merge:
[27, 38], [3, 43], [9, 82], [10]
→ [3, 27, 38, 43], [9, 10, 82]
→ Final Merge → [3, 9, 10, 27, 38, 43, 82]

Output:
[3, 9, 10, 27, 38, 43, 82]`}
      </pre>

      <h2>💻 Pseudocode</h2>
      <pre>
{`function mergeSort(arr):
    if length of arr ≤ 1:
        return arr

    mid = length(arr) // 2
    left = mergeSort(arr[0:mid])
    right = mergeSort(arr[mid:])

    return merge(left, right)


function merge(left, right):
    result = []
    while left and right are not empty:
        if left[0] ≤ right[0]:
            result.append(left.pop(0))
        else:
            result.append(right.pop(0))

    result.extend(left or right)
    return result`}
      </pre>

      <h2>⏱️ Time Complexity</h2>
      <table>
        <thead>
          <tr>
            <th>Case</th>
            <th>Complexity</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Best</td><td>O(n log n)</td></tr>
          <tr><td>Average</td><td>O(n log n)</td></tr>
          <tr><td>Worst</td><td>O(n log n)</td></tr>
        </tbody>
      </table>

      <h2>💾 Space Complexity</h2>
      <p><strong>O(n)</strong> – because merging requires additional temporary arrays.</p>

      <h2>📚 Key Points</h2>
      <ul>
        <li>Stable sorting algorithm</li>
        <li>Works well for large datasets</li>
        <li>Not an in-place sort (requires extra space)</li>
        <li>Commonly used in external sorting (e.g., sorting large files)</li>
      </ul>
    </div>
  );
};

export default MergeSortPage;
