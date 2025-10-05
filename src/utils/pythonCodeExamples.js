/**
 * Simple Python Code Examples
 * Basic collection of algorithm examples for the code runner
 */

export const pythonExamples = {
  bubbleSort: `# Bubble Sort Algorithm
def bubble_sort(arr):
    """
    Bubble Sort - Simple comparison-based sorting
    Time Complexity: O(n²)
    Space Complexity: O(1)
    """
    n = len(arr)
    print(f"Starting Bubble Sort with array: {arr}")
    
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                print(f"Swapped: {arr}")
    
    print(f"Final sorted array: {arr}")
    return arr

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
bubble_sort(numbers.copy())`,

  binarySearch: `# Binary Search Algorithm
def binary_search(arr, target):
    """
    Binary Search - Search in sorted array
    Time Complexity: O(log n)
    Space Complexity: O(1)
    """
    left, right = 0, len(arr) - 1
    
    print(f"Searching for {target} in sorted array: {arr}")
    
    while left <= right:
        mid = (left + right) // 2
        print(f"Checking middle element: arr[{mid}] = {arr[mid]}")
        
        if arr[mid] == target:
            print(f"✅ Found {target} at index {mid}!")
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    print(f"❌ {target} not found in array")
    return -1

# Example usage
numbers = [2, 3, 4, 10, 40, 50, 60, 70]
target = 10
result = binary_search(numbers, target)`,

  stack: `# Stack Implementation
class Stack:
    """Stack Data Structure - LIFO (Last In, First Out)"""
    def __init__(self):
        self.items = []
    
    def push(self, item):
        self.items.append(item)
        print(f"Pushed {item}. Stack: {self.items}")
    
    def pop(self):
        if self.is_empty():
            print("Stack is empty!")
            return None
        item = self.items.pop()
        print(f"Popped {item}. Stack: {self.items}")
        return item
    
    def is_empty(self):
        return len(self.items) == 0

# Example usage
stack = Stack()
stack.push(1)
stack.push(2)
stack.push(3)
stack.pop()
stack.pop()`
};

// Simple helper to get example by name
export const getExample = (name) => {
  return pythonExamples[name] || pythonExamples.bubbleSort;
};