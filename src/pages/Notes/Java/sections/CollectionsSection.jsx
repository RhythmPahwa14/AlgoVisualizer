import React from "react";

const CollectionsSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-layer-group"></i> 19. Java Collections Framework
      </h2>
      <p>
        The Java Collections Framework (JCF) is a unified architecture for representing and manipulating collections of objects. 
        It provides ready-to-use data structures and algorithms, eliminating the need to build them from scratch.
      </p>

      <h3>Collections Hierarchy</h3>
      <div className="code-container">
        <pre style={{background: '#f8f9fa', color: '#2d3748', fontSize: '0.85rem'}}>
{`                    Collection (Interface)
                           |
        +------------------+------------------+
        |                  |                  |
      List              Set                Queue
        |                  |                  |
   ArrayList          HashSet          LinkedList
   LinkedList         TreeSet       PriorityQueue
   Vector          LinkedHashSet      ArrayDeque
   Stack

                    Map (Interface)
                           |
        +------------------+------------------+
        |                  |                  |
    HashMap           TreeMap          LinkedHashMap
   Hashtable        WeakHashMap       ConcurrentHashMap`}
        </pre>
      </div>

      <h3><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> List Interface</h3>
      <p>Ordered collection that allows duplicate elements. Elements can be accessed by index.</p>
      
      <div style={{overflowX: 'auto', margin: '1rem 0'}}>
        <table style={{width: '100%', borderCollapse: 'collapse', border: '1px solid #e5e7eb'}}>
          <thead>
            <tr style={{backgroundColor: '#eef2ff'}}>
              <th style={{padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left'}}>Implementation</th>
              <th style={{padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left'}}>Best For</th>
              <th style={{padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left'}}>Time Complexity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}><code>ArrayList</code></td>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}>Random access, frequent reads</td>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}>Get: O(1), Add: O(1)*, Remove: O(n)</td>
            </tr>
            <tr style={{backgroundColor: '#f9fafb'}}>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}><code>LinkedList</code></td>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}>Frequent insertions/deletions</td>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}>Get: O(n), Add: O(1), Remove: O(1)</td>
            </tr>
            <tr>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}><code>Vector</code></td>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}>Thread-safe operations (legacy)</td>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}>Similar to ArrayList but synchronized</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Set Interface</h3>
      <p>Collection that contains no duplicate elements. Models mathematical set abstraction.</p>
      
      <div style={{overflowX: 'auto', margin: '1rem 0'}}>
        <table style={{width: '100%', borderCollapse: 'collapse', border: '1px solid #e5e7eb'}}>
          <thead>
            <tr style={{backgroundColor: '#fef3c7'}}>
              <th style={{padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left'}}>Implementation</th>
              <th style={{padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left'}}>Features</th>
              <th style={{padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left'}}>Ordering</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}><code>HashSet</code></td>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}>Fast operations, no duplicates</td>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}>No order guaranteed</td>
            </tr>
            <tr style={{backgroundColor: '#f9fafb'}}>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}><code>LinkedHashSet</code></td>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}>Maintains insertion order</td>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}>Insertion order</td>
            </tr>
            <tr>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}><code>TreeSet</code></td>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}>Sorted set, NavigableSet</td>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}>Natural/Custom order</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Queue Interface</h3>
      <p>Collection designed for holding elements prior to processing. Typically FIFO (First-In-First-Out).</p>

      <h3><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Map Interface</h3>
      <p>Object that maps keys to values. Cannot contain duplicate keys.</p>

      <div style={{overflowX: 'auto', margin: '1rem 0'}}>
        <table style={{width: '100%', borderCollapse: 'collapse', border: '1px solid #e5e7eb'}}>
          <thead>
            <tr style={{backgroundColor: '#f3e8ff'}}>
              <th style={{padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left'}}>Implementation</th>
              <th style={{padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left'}}>Characteristics</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}><code>HashMap</code></td>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}>Fast, allows one null key, multiple null values</td>
            </tr>
            <tr style={{backgroundColor: '#f9fafb'}}>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}><code>LinkedHashMap</code></td>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}>Maintains insertion order</td>
            </tr>
            <tr>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}><code>TreeMap</code></td>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}>Sorted map, implements NavigableMap</td>
            </tr>
            <tr style={{backgroundColor: '#f9fafb'}}>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}><code>Hashtable</code></td>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}>Thread-safe, no null keys/values (legacy)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Comprehensive Collections Example</h3>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "collections_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// CollectionsExample.java
import java.util.*;

public class CollectionsExample {
    public static void main(String[] args) {
        System.out.println("=== Java Collections Framework Demo ===\\n");

        // ========== LIST ==========
        System.out.println("--- List (ArrayList) ---");
        List<String> arrayList = new ArrayList<>();
        arrayList.add("Apple");
        arrayList.add("Banana");
        arrayList.add("Cherry");
        arrayList.add("Apple"); // Duplicates allowed
        System.out.println("ArrayList: " + arrayList);
        System.out.println("Element at index 1: " + arrayList.get(1));
        arrayList.remove("Apple"); // Removes first occurrence
        System.out.println("After removing 'Apple': " + arrayList);
        System.out.println();

        // LinkedList
        System.out.println("--- List (LinkedList) ---");
        List<Integer> linkedList = new LinkedList<>();
        linkedList.add(10);
        linkedList.add(20);
        linkedList.add(30);
        ((LinkedList<Integer>) linkedList).addFirst(5); // LinkedList specific method
        ((LinkedList<Integer>) linkedList).addLast(40);
        System.out.println("LinkedList: " + linkedList);
        System.out.println();

        // ========== SET ==========
        System.out.println("--- Set (HashSet) ---");
        Set<Integer> hashSet = new HashSet<>();
        hashSet.add(100);
        hashSet.add(200);
        hashSet.add(100); // Duplicate ignored
        hashSet.add(300);
        System.out.println("HashSet: " + hashSet); // No order guaranteed
        System.out.println("Contains 200? " + hashSet.contains(200));
        System.out.println();

        // TreeSet (Sorted)
        System.out.println("--- Set (TreeSet - Sorted) ---");
        Set<String> treeSet = new TreeSet<>();
        treeSet.add("Dog");
        treeSet.add("Cat");
        treeSet.add("Elephant");
        treeSet.add("Bear");
        System.out.println("TreeSet (sorted): " + treeSet); // Alphabetically sorted
        System.out.println();

        // LinkedHashSet (Insertion order)
        System.out.println("--- Set (LinkedHashSet - Insertion Order) ---");
        Set<String> linkedHashSet = new LinkedHashSet<>();
        linkedHashSet.add("First");
        linkedHashSet.add("Second");
        linkedHashSet.add("Third");
        System.out.println("LinkedHashSet: " + linkedHashSet); // Maintains insertion order
        System.out.println();

        // ========== QUEUE ==========
        System.out.println("--- Queue (LinkedList as Queue) ---");
        Queue<String> queue = new LinkedList<>();
        queue.offer("Task1");
        queue.offer("Task2");
        queue.offer("Task3");
        System.out.println("Queue: " + queue);
        System.out.println("Poll (remove & return): " + queue.poll());
        System.out.println("Peek (view front): " + queue.peek());
        System.out.println("Queue after poll: " + queue);
        System.out.println();

        // PriorityQueue
        System.out.println("--- Queue (PriorityQueue) ---");
        Queue<Integer> priorityQueue = new PriorityQueue<>();
        priorityQueue.add(30);
        priorityQueue.add(10);
        priorityQueue.add(20);
        System.out.println("PriorityQueue: " + priorityQueue);
        System.out.println("Poll (smallest first): " + priorityQueue.poll());
        System.out.println();

        // ========== MAP ==========
        System.out.println("--- Map (HashMap) ---");
        Map<String, Integer> hashMap = new HashMap<>();
        hashMap.put("Alice", 25);
        hashMap.put("Bob", 30);
        hashMap.put("Charlie", 28);
        hashMap.put("Alice", 26); // Updates existing key
        System.out.println("HashMap: " + hashMap);
        System.out.println("Alice's age: " + hashMap.get("Alice"));
        System.out.println("Contains key 'Bob'? " + hashMap.containsKey("Bob"));
        System.out.println("Contains value 30? " + hashMap.containsValue(30));
        System.out.println();

        // Iterating over Map
        System.out.println("--- Iterating Map ---");
        for (Map.Entry<String, Integer> entry : hashMap.entrySet()) {
            System.out.println(entry.getKey() + " -> " + entry.getValue());
        }
        System.out.println();

        // TreeMap (Sorted by key)
        System.out.println("--- Map (TreeMap - Sorted) ---");
        Map<String, String> treeMap = new TreeMap<>();
        treeMap.put("Z", "Last");
        treeMap.put("A", "First");
        treeMap.put("M", "Middle");
        System.out.println("TreeMap (sorted by key): " + treeMap);
        System.out.println();

        // ========== COMMON OPERATIONS ==========
        System.out.println("--- Common Operations ---");
        List<String> fruits = new ArrayList<>(Arrays.asList("Apple", "Banana", "Cherry"));
        System.out.println("Original: " + fruits);
        
        Collections.sort(fruits); // Sort
        System.out.println("Sorted: " + fruits);
        
        Collections.reverse(fruits); // Reverse
        System.out.println("Reversed: " + fruits);
        
        Collections.shuffle(fruits); // Shuffle
        System.out.println("Shuffled: " + fruits);
        
        System.out.println("Max element: " + Collections.max(fruits));
        System.out.println("Min element: " + Collections.min(fruits));
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
        System.out.println("=== Java Collections Framework Demo ===\\n");

        // ========== LIST ==========
        System.out.println("--- List (ArrayList) ---");
        List<String> arrayList = new ArrayList<>();
        arrayList.add("Apple");
        arrayList.add("Banana");
        arrayList.add("Cherry");
        arrayList.add("Apple"); // Duplicates allowed
        System.out.println("ArrayList: " + arrayList);
        System.out.println("Element at index 1: " + arrayList.get(1));
        arrayList.remove("Apple"); // Removes first occurrence
        System.out.println("After removing 'Apple': " + arrayList);

        // LinkedList
        System.out.println("--- List (LinkedList) ---");
        List<Integer> linkedList = new LinkedList<>();
        linkedList.add(10);
        linkedList.add(20);
        ((LinkedList<Integer>) linkedList).addFirst(5);
        System.out.println("LinkedList: " + linkedList);

        // ========== SET ==========
        System.out.println("--- Set (HashSet) ---");
        Set<Integer> hashSet = new HashSet<>();
        hashSet.add(100);
        hashSet.add(200);
        hashSet.add(100); // Duplicate ignored
        System.out.println("HashSet: " + hashSet);

        // TreeSet (Sorted)
        Set<String> treeSet = new TreeSet<>();
        treeSet.add("Dog");
        treeSet.add("Cat");
        System.out.println("TreeSet (sorted): " + treeSet);

        // ========== QUEUE ==========
        Queue<String> queue = new LinkedList<>();
        queue.offer("Task1");
        queue.offer("Task2");
        System.out.println("Queue poll: " + queue.poll());

        // ========== MAP ==========
        Map<String, Integer> hashMap = new HashMap<>();
        hashMap.put("Alice", 25);
        hashMap.put("Bob", 30);
        System.out.println("HashMap: " + hashMap);
        System.out.println("Alice's age: " + hashMap.get("Alice"));
    }
}`}</pre>
      </div>

      <div style={{background: '#e0f2fe', borderLeft: '4px solid #0284c7', padding: '1rem 1.5rem', margin: '1.5rem 0', borderRadius: '0 12px 12px 0'}}>
        <strong><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Choosing the Right Collection:</strong>
        <ul style={{marginTop: '0.5rem', marginBottom: 0}}>
          <li>Need fast access by index? â†’ <code>ArrayList</code></li>
          <li>Frequent insertions/deletions? â†’ <code>LinkedList</code></li>
          <li>Need unique elements? â†’ <code>HashSet</code></li>
          <li>Need sorted unique elements? â†’ <code>TreeSet</code></li>
          <li>Need key-value pairs? â†’ <code>HashMap</code></li>
          <li>Need sorted keys? â†’ <code>TreeMap</code></li>
          <li>Need FIFO processing? â†’ <code>Queue</code> with <code>LinkedList</code></li>
          <li>Need priority-based processing? â†’ <code>PriorityQueue</code></li>
        </ul>
      </div>

      <h3>Common Collection Methods</h3>
      <ul>
        <li><code>add(E e)</code> - Adds element to collection</li>
        <li><code>remove(Object o)</code> - Removes specified element</li>
        <li><code>contains(Object o)</code> - Checks if element exists</li>
        <li><code>size()</code> - Returns number of elements</li>
        <li><code>isEmpty()</code> - Checks if collection is empty</li>
        <li><code>clear()</code> - Removes all elements</li>
        <li><code>iterator()</code> - Returns an iterator</li>
      </ul>

      <p style={{ fontSize: "0.9rem", color: "#000", marginTop: "1rem" }}>
        <span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> <strong>Best Practice:</strong> Always program to the interface (List, Set, Map) rather than the implementation (ArrayList, HashSet, HashMap) 
        for better flexibility and maintainability.
      </p>
    </div>
  </section>
);

export default CollectionsSection;

