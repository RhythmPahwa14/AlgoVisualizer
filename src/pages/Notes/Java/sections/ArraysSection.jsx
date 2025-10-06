import React from "react";

const ArraysSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-th-large"></i> 11. Arrays
      </h2>
      <p>
        Arrays are fixed-size, ordered collections of elements of the same type.
        <br />
        <strong>Tips:</strong> For dynamic sizes, prefer <code>ArrayList</code>. 
        Multidimensional arrays can store tables or matrices. 
        Use <code>Arrays.toString(array)</code> or <code>Arrays.deepToString(array)</code> for easy printing.
      </p>
      
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "arrays_code" ? "copied" : ""}`}
          onClick={() => copyCode(
`// ArraysExample.java
import java.util.Arrays;

public class ArraysExample {
    public static void main(String[] args) {
        // Single-dimensional array
        int[] arr = {3, 1, 4, 1, 5};
        System.out.println("Length: " + arr.length);
        Arrays.sort(arr); // Sorting array
        System.out.println("Sorted: " + Arrays.toString(arr));

        // Enhanced for-loop
        System.out.println("Elements:");
        for (int num : arr) {
            System.out.println(num);
        }

        // Multi-dimensional array
        int[][] matrix = { {1,2,3}, {4,5,6} };
        System.out.println("Matrix[1][0]: " + matrix[1][0]);
        System.out.println("Full matrix: " + Arrays.deepToString(matrix));
    }
}`, "arrays_code")}
        >
          {copiedCode === "arrays_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// ArraysExample.java
import java.util.Arrays;

public class ArraysExample {
    public static void main(String[] args) {
        // Single-dimensional array
        int[] arr = {3, 1, 4, 1, 5};
        System.out.println("Length: " + arr.length);
        Arrays.sort(arr); // Sorting array
        System.out.println("Sorted: " + Arrays.toString(arr));

        // Enhanced for-loop
        System.out.println("Elements:");
        for (int num : arr) {
            System.out.println(num);
        }

        // Multi-dimensional array
        int[][] matrix = { {1,2,3}, {4,5,6} };
        System.out.println("Matrix[1][0]: " + matrix[1][0]);
        System.out.println("Full matrix: " + Arrays.deepToString(matrix));
    }
}`}</pre>
      </div>
    </div>
  </section>
);

export default ArraysSection;
