import React from "react";

const CollectionsSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-layer-group"></i> 19. Collections
      </h2>
      <p>
        The Java Collections Framework provides standard data structures for storing and manipulating groups of objects.
        Key points:
        <ul>
          <li><strong>List:</strong> Ordered collection. e.g., <code>ArrayList</code>, <code>LinkedList</code>.</li>
          <li><strong>Set:</strong> Unique elements. e.g., <code>HashSet</code>, <code>TreeSet</code>.</li>
          <li><strong>Map:</strong> Key-value pairs. e.g., <code>HashMap</code>, <code>TreeMap</code>.</li>
          <li><strong>Queue:</strong> FIFO collection. e.g., <code>LinkedList</code>, <code>PriorityQueue</code>.</li>
        </ul>
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "collections_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// CollectionsExample.java
import java.util.*;

public class CollectionsExample {
    public static void main(String[] args) {
        // List example
        List<String> list = new ArrayList<>();
        list.add("a"); list.add("b");
        System.out.println("List elements:");
        for(String s : list) System.out.println(s);

        // Map example
        Map<String, Integer> map = new HashMap<>();
        map.put("x", 1);
        System.out.println("Map value for key 'x': " + map.get("x"));

        // Set example
        Set<Integer> set = new HashSet<>();
        set.add(1); set.add(2); set.add(1); // duplicates ignored
        System.out.println("Set elements: " + set);

        // Queue example
        Queue<String> queue = new LinkedList<>();
        queue.add("first"); queue.add("second");
        System.out.println("Queue poll: " + queue.poll());
    }
}`,
              "collections_code"
            )
          }
        >
          {copiedCode === "collections_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// CollectionsExample.java
import java.util.*;

public class CollectionsExample {
    public static void main(String[] args) {
        // List example
        List<String> list = new ArrayList<>();
        list.add("a"); list.add("b");
        System.out.println("List elements:");
        for(String s : list) System.out.println(s);

        // Map example
        Map<String, Integer> map = new HashMap<>();
        map.put("x", 1);
        System.out.println("Map value for key 'x': " + map.get("x"));

        // Set example
        Set<Integer> set = new HashSet<>();
        set.add(1); set.add(2); set.add(1); // duplicates ignored
        System.out.println("Set elements: " + set);

        // Queue example
        Queue<String> queue = new LinkedList<>();
        queue.add("first"); queue.add("second");
        System.out.println("Queue poll: " + queue.poll());
    }
}`}</pre>
      </div>

      <p style={{ fontSize: "0.9rem", color: "#555", marginTop: "0.5rem" }}>
        💡 Tip: Choose the right collection type based on your requirement for order, uniqueness, or key-value mapping.
      </p>
    </div>
  </section>
);

export default CollectionsSection;
