import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { Copy, Check } from "lucide-react";
import "../styles/codeExplanation.css";

const LANGS = [
  { key: "js", label: "JavaScript" },
  { key: "java", label: "Java" },
  { key: "cpp", label: "C++" },
  { key: "py", label: "Python" },
];

// highlight helper: find first line index that contains the snippet
function computeHighlightLine(codeString, highlightSnippet) {
  if (!codeString || !highlightSnippet) return null;
  const lines = codeString.split("\n");
  const normalized = highlightSnippet.trim();
  for (let i = 0; i < lines.length; i++) if (lines[i].includes(normalized)) return i + 1;
  return null;
}


// Multi-language algorithm code and step highlights
const ALGO = {
  // Data Structures
  linkedlist: {
    title: "Singly Linked List",
    description:
      "Nodes hold a value and a pointer to the next node. Common operations: insert at head/tail, delete, search, traverse.",
    code: {
      js: `class ListNode {\n  constructor(data, next = null) {\n    this.data = data;\n    this.next = next;\n  }\n}\nclass LinkedList {\n  constructor() { this.head = null; }\n  insertHead(x) { this.head = new ListNode(x, this.head); }\n  insertTail(x) {\n    const n = new ListNode(x);\n    if (!this.head) { this.head = n; return; }\n    let cur = this.head;\n    while (cur.next) cur = cur.next;\n    cur.next = n;\n  }\n  deleteHead() { if (this.head) this.head = this.head.next; }\n  search(x) { let i=0, cur=this.head; while (cur) { if (cur.data===x) return i; cur=cur.next; i++; } return -1; }\n}`,
      java: `class ListNode { int data; ListNode next; ListNode(int d){ data=d; } }\nclass LinkedList {\n  ListNode head;\n  void insertHead(int x){ ListNode n = new ListNode(x); n.next = head; head = n; }\n  void insertTail(int x){\n    ListNode n = new ListNode(x);\n    if (head==null){ head=n; return; }\n    ListNode cur=head; while(cur.next!=null) cur=cur.next; cur.next=n;\n  }\n  void deleteHead(){ if (head!=null) head=head.next; }\n  int search(int x){ int i=0; ListNode cur=head; while(cur!=null){ if (cur.data==x) return i; cur=cur.next; i++; } return -1; }\n}`,
      cpp: `struct ListNode { int data; ListNode* next; ListNode(int d):data(d),next(nullptr){} };\nstruct LinkedList {\n  ListNode* head=nullptr;\n  void insertHead(int x){ ListNode* n = new ListNode(x); n->next = head; head = n; }\n  void insertTail(int x){\n    ListNode* n=new ListNode(x);\n    if(!head){ head=n; return; }\n    ListNode* cur=head; while(cur->next) cur=cur->next; cur->next=n;\n  }\n  void deleteHead(){ if(head) head=head->next; }\n  int search(int x){ int i=0; for(ListNode* cur=head; cur; cur=cur->next,++i) if(cur->data==x) return i; return -1; }\n};`,
      py: `class ListNode:\n  def __init__(self, data, next=None):\n    self.data=data; self.next=next\n\nclass LinkedList:\n  def __init__(self):\n    self.head=None\n  def insert_head(self, x):\n    self.head = ListNode(x, self.head)\n  def insert_tail(self, x):\n    n = ListNode(x)\n    if not self.head: self.head = n; return\n    cur=self.head\n    while cur.next: cur=cur.next\n    cur.next=n\n  def delete_head(self):\n    if self.head: self.head=self.head.next\n  def search(self, x):\n    i=0; cur=self.head\n    while cur:\n      if cur.data==x: return i\n      cur=cur.next; i+=1\n    return -1`
    },
    steps: [
      { explanation: "Insert at head links new node before current head.", highlight: { js: "insertHead(x)", java: "insertHead(int x)", cpp: "insertHead(int x)", py: "insert_head(self, x)" } },
      { explanation: "Insert at tail walks to the end and appends.", highlight: { js: "while (cur.next)", java: "while(cur.next!=null)", cpp: "while(cur->next)", py: "while cur.next" } },
      { explanation: "Delete head moves head pointer to next.", highlight: { js: "deleteHead()", java: "deleteHead()", cpp: "deleteHead()", py: "delete_head(self)" } },
      { explanation: "Search traverses nodes comparing data.", highlight: { js: "search(x)", java: "search(int x)", cpp: "search(int x)", py: "search(self, x)" } }
    ]
  },

  stack: {
    title: "Stack (LIFO)",
    description: "Push adds to the top; pop removes from the top. Peek reads top without removal.",
    code: {
      js: `class Node { constructor(data,next=null){ this.data=data; this.next=next; } }\nclass Stack {\n  constructor(){ this.top=null; }\n  push(x){ this.top = new Node(x, this.top); }\n  pop(){ if(!this.top) return null; const v=this.top.data; this.top=this.top.next; return v; }\n  peek(){ return this.top? this.top.data : null; }\n}`,
      java: `class Node { int data; Node next; Node(int d){ data=d; } }\nclass Stack {\n  Node top;\n  void push(int x){ Node n=new Node(x); n.next=top; top=n; }\n  Integer pop(){ if(top==null) return null; int v=top.data; top=top.next; return v; }\n  Integer peek(){ return top==null? null : top.data; }\n}`,
      cpp: `struct Node { int data; Node* next; Node(int d):data(d),next(nullptr){} };\nstruct Stack {\n  Node* top=nullptr;\n  void push(int x){ Node* n=new Node(x); n->next=top; top=n; }\n  int pop(){ if(!top) return INT_MIN; int v=top->data; top=top->next; return v; }\n  int peek(){ return top? top->data : INT_MIN; }\n};`,
      py: `class Node:\n  def __init__(self, data, next=None):\n    self.data=data; self.next=next\nclass Stack:\n  def __init__(self): self.top=None\n  def push(self, x): self.top = Node(x, self.top)\n  def pop(self):\n    if not self.top: return None\n    v=self.top.data; self.top=self.top.next; return v\n  def peek(self): return None if not self.top else self.top.data`
    },
    steps: [
      { explanation: "Push sets new node's next to current top and updates top.", highlight: { js: "push(x)", java: "push(int x)", cpp: "push(int x)", py: "push(self, x)" } },
      { explanation: "Pop reads top and advances top to next.", highlight: { js: "pop(){", java: "pop(){", cpp: "int pop()", py: "def pop(self):" } },
      { explanation: "Peek returns the top value without removal.", highlight: { js: "peek(){", java: "peek(){", cpp: "int peek()", py: "def peek(self):" } }
    ]
  },

  queue: {
    title: "Queue (FIFO)",
    description: "Enqueue adds at the back; dequeue removes from the front. Maintains front and back pointers.",
    code: {
      js: `class Node { constructor(data,next=null){ this.data=data; this.next=next; } }\nclass Queue {\n  constructor(){ this.front=null; this.back=null; }\n  enqueue(x){ const n=new Node(x); if(!this.back){ this.front=this.back=n; } else { this.back.next=n; this.back=n; } }\n  dequeue(){ if(!this.front) return null; const v=this.front.data; this.front=this.front.next; if(!this.front) this.back=null; return v; }\n}`,
      java: `class Node { int data; Node next; Node(int d){ data=d; } }\nclass Queue {\n  Node front, back;\n  void enqueue(int x){ Node n=new Node(x); if(back==null){ front=back=n; } else { back.next=n; back=n; } }\n  Integer dequeue(){ if(front==null) return null; int v=front.data; front=front.next; if(front==null) back=null; return v; }\n}`,
      cpp: `struct Node { int data; Node* next; Node(int d):data(d),next(nullptr){} };\nstruct Queue {\n  Node* front=nullptr; Node* back=nullptr;\n  void enqueue(int x){ Node* n=new Node(x); if(!back){ front=back=n; } else { back->next=n; back=n; } }\n  int dequeue(){ if(!front) return INT_MIN; int v=front->data; front=front->next; if(!front) back=nullptr; return v; }\n};`,
      py: `class Node:\n  def __init__(self,data,next=None): self.data=data; self.next=next\nclass Queue:\n  def __init__(self): self.front=None; self.back=None\n  def enqueue(self, x):\n    n=Node(x)\n    if not self.back: self.front=self.back=n\n    else: self.back.next=n; self.back=n\n  def dequeue(self):\n    if not self.front: return None\n    v=self.front.data; self.front=self.front.next\n    if not self.front: self.back=None\n    return v`
    },
    steps: [
      { explanation: "Enqueue: link new node after back; update back (or both when empty).", highlight: { js: "enqueue(x)", java: "enqueue(int x)", cpp: "enqueue(int x)", py: "enqueue(self, x)" } },
      { explanation: "Dequeue: read front, move front to next; if empty, back becomes null.", highlight: { js: "dequeue(){", java: "dequeue(){", cpp: "int dequeue()", py: "def dequeue(self):" } }
    ]
  },

  tree: {
    title: "Binary Search Tree (BST)",
    description: "Each node has up to two children. For BST, left subtree values are smaller; right are larger. Common operations: insert, search, delete, traversals.",
    code: {
      js: `class Node { constructor(data){ this.data=data; this.left=null; this.right=null; } }\nclass BST {\n  constructor(){ this.root=null; }\n  insert(x){ this.root = this._insert(this.root, x); }\n  _insert(n,x){ if(!n) return new Node(x); if(x<n.data) n.left=this._insert(n.left,x); else n.right=this._insert(n.right,x); return n; }\n  search(x){ let n=this.root; while(n){ if(n.data===x) return true; n = x<n.data? n.left : n.right; } return false; }\n}`,
      java: `class Node { int data; Node left,right; Node(int d){ data=d; } }\nclass BST {\n  Node root;\n  void insert(int x){ root = _insert(root,x); }\n  Node _insert(Node n,int x){ if(n==null) return new Node(x); if(x<n.data) n.left=_insert(n.left,x); else n.right=_insert(n.right,x); return n; }\n  boolean search(int x){ Node n=root; while(n!=null){ if(n.data==x) return true; n = x<n.data? n.left : n.right; } return false; }\n}`,
      cpp: `struct Node { int data; Node* left; Node* right; Node(int d):data(d),left(nullptr),right(nullptr){} };\nstruct BST {\n  Node* root=nullptr;\n  Node* _insert(Node* n,int x){ if(!n) return new Node(x); if(x<n->data) n->left=_insert(n->left,x); else n->right=_insert(n->right,x); return n; }\n  void insert(int x){ root=_insert(root,x); }\n  bool search(int x){ Node* n=root; while(n){ if(n->data==x) return true; n = x<n->data? n->left : n->right; } return false; }\n};`,
      py: `class Node:\n  def __init__(self, data): self.data=data; self.left=None; self.right=None\nclass BST:\n  def __init__(self): self.root=None\n  def _insert(self, n, x):\n    if not n: return Node(x)\n    if x < n.data: n.left = self._insert(n.left, x)\n    else: n.right = self._insert(n.right, x)\n    return n\n  def insert(self, x): self.root = self._insert(self.root, x)\n  def search(self, x):\n    n=self.root\n    while n:\n      if n.data==x: return True\n      n = n.left if x < n.data else n.right\n    return False`
    },
    steps: [
      { explanation: "Insert: compare down the tree and attach new node at null child.", highlight: { js: "_insert(n,x)", java: "_insert(Node n,int x)", cpp: "_insert(Node* n,int x)", py: "_insert(self, n, x)" } },
      { explanation: "Search: walk left or right based on comparison.", highlight: { js: "search(x){", java: "boolean search(int x)", cpp: "bool search(int x)", py: "def search(self, x):" } }
    ]
  },

  // Sorting Algorithms
  bubbleSort: {
    title: "Bubble Sort Algorithm",
    description: "Repeatedly compares adjacent elements and swaps them if out of order. Largest items bubble to the end each pass.",
    code: {
      js: `function bubbleSort(arr) {\n  const n = arr.length;\n  for (let i = 0; i < n - 1; i++) {\n    for (let j = 0; j < n - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n      }\n    }\n  }\n  return arr;\n}`,
      java: `public static int[] bubbleSort(int[] arr) {\n  int n = arr.length;\n  for (int i = 0; i < n - 1; i++) {\n    for (int j = 0; j < n - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        int tmp = arr[j];\n        arr[j] = arr[j + 1];\n        arr[j + 1] = tmp;\n      }\n    }\n  }\n  return arr;\n}`,
      cpp: `#include <vector>\nusing namespace std;\n\nvector<int> bubbleSort(vector<int> arr) {\n  int n = (int)arr.size();\n  for (int i = 0; i < n - 1; i++) {\n    for (int j = 0; j < n - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        swap(arr[j], arr[j + 1]);\n      }\n    }\n  }\n  return arr;\n}`,
      py: `def bubble_sort(arr):\n  n = len(arr)\n  for i in range(n - 1):\n    for j in range(0, n - i - 1):\n      if arr[j] > arr[j + 1]:\n        arr[j], arr[j + 1] = arr[j + 1], arr[j]\n  return arr`
    },
    steps: [
      { explanation: "Loop passes; after each pass, the largest element settles at the end." },
      { explanation: "Compare adjacent elements and swap when out of order." },
      { explanation: "Swap the pair." },
      { explanation: "Return the sorted array." }
    ]
  },

  selectionSort: {
    title: "Selection Sort Algorithm",
    description: "Select the minimum from the unsorted part and place it at the beginning each iteration.",
    code: {
      js: `function selectionSort(arr) {\n  const n = arr.length;\n  for (let i = 0; i < n - 1; i++) {\n    let minIdx = i;\n    for (let j = i + 1; j < n; j++) {\n      if (arr[j] < arr[minIdx]) minIdx = j;\n    }\n    if (minIdx !== i) [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];\n  }\n  return arr;\n}`,
      java: `public static int[] selectionSort(int[] arr) {\n  int n = arr.length;\n  for (int i = 0; i < n - 1; i++) {\n    int minIdx = i;\n    for (int j = i + 1; j < n; j++) {\n      if (arr[j] < arr[minIdx]) minIdx = j;\n    }\n    if (minIdx != i) { int t = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = t; }\n  }\n  return arr;\n}`,
      cpp: `#include <vector>\nusing namespace std;\n\nvector<int> selectionSort(vector<int> arr) {\n  int n = (int)arr.size();\n  for (int i = 0; i < n - 1; i++) {\n    int minIdx = i;\n    for (int j = i + 1; j < n; j++)\n      if (arr[j] < arr[minIdx]) minIdx = j;\n    if (minIdx != i) swap(arr[i], arr[minIdx]);\n  }\n  return arr;\n}`,
      py: `def selection_sort(arr):\n  n = len(arr)\n  for i in range(n - 1):\n    min_idx = i\n    for j in range(i + 1, n):\n      if arr[j] < arr[min_idx]:\n        min_idx = j\n    if min_idx != i:\n      arr[i], arr[min_idx] = arr[min_idx], arr[i]\n  return arr`
    },
    steps: [
      { explanation: "Assume current index holds the minimum." },
      { explanation: "Scan the rest to find a smaller element." },
      { explanation: "Swap the found minimum with current index." }
    ]
  },

  insertionSort: {
    title: "Insertion Sort Algorithm",
    description: "Builds the sorted array one item at a time by inserting the current element into the already-sorted left part.",
    code: {
      js: `function insertionSort(arr) {\n  const n = arr.length;\n  for (let i = 1; i < n; i++) {\n    const key = arr[i];\n    let j = i - 1;\n    while (j >= 0 && arr[j] > key) {\n      arr[j + 1] = arr[j];\n      j--;\n    }\n    arr[j + 1] = key;\n  }\n  return arr;\n}`,
      java: `public static int[] insertionSort(int[] arr) {\n  int n = arr.length;\n  for (int i = 1; i < n; i++) {\n    int key = arr[i], j = i - 1;\n    while (j >= 0 && arr[j] > key) { arr[j + 1] = arr[j]; j--; }\n    arr[j + 1] = key;\n  }\n  return arr;\n}`,
      cpp: `#include <vector>\nusing namespace std;\n\nvector<int> insertionSort(vector<int> arr) {\n  int n = (int)arr.size();\n  for (int i = 1; i < n; i++) {\n    int key = arr[i], j = i - 1;\n    while (j >= 0 && arr[j] > key) { arr[j + 1] = arr[j]; j--; }\n    arr[j + 1] = key;\n  }\n  return arr;\n}`,
      py: `def insertion_sort(arr):\n  for i in range(1, len(arr)):\n    key = arr[i]\n    j = i - 1\n    while j >= 0 and arr[j] > key:\n      arr[j + 1] = arr[j]\n      j -= 1\n    arr[j + 1] = key\n  return arr`
    },
    steps: [
      { explanation: "Pick key at i and compare leftwards." },
      { explanation: "Shift larger elements to the right." },
      { explanation: "Insert key at the hole." }
    ]
  },

  mergeSort: {
    title: "Merge Sort Algorithm",
    description: "Divide the array, sort each half, then merge the two sorted halves.",
    code: {
      js: `function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}\nfunction merge(left, right) {\n  const res = [];\n  let i = 0, j = 0;\n  while (i < left.length && j < right.length) {\n    if (left[i] <= right[j]) res.push(left[i++]);\n    else res.push(right[j++]);\n  }\n  return res.concat(left.slice(i)).concat(right.slice(j));\n}`,
      java: `import java.util.*;\npublic static int[] mergeSort(int[] arr) {\n  if (arr.length <= 1) return arr;\n  int mid = arr.length / 2;\n  int[] left = Arrays.copyOfRange(arr, 0, mid);\n  int[] right = Arrays.copyOfRange(arr, mid, arr.length);\n  left = mergeSort(left);\n  right = mergeSort(right);\n  return merge(left, right);\n}\nprivate static int[] merge(int[] L, int[] R) {\n  int[] res = new int[L.length + R.length];\n  int i = 0, j = 0, k = 0;\n  while (i < L.length && j < R.length)\n    res[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];\n  while (i < L.length) res[k++] = L[i++];\n  while (j < R.length) res[k++] = R[j++];\n  return res;\n}`,
      cpp: `#include <vector>\nusing namespace std;\n\nstatic vector<int> mergeVec(const vector<int>& L, const vector<int>& R) {\n  vector<int> res; res.reserve(L.size()+R.size());\n  size_t i=0, j=0;\n  while (i<L.size() && j<R.size()) {\n    if (L[i] <= R[j]) res.push_back(L[i++]);\n    else res.push_back(R[j++]);\n  }\n  while (i<L.size()) res.push_back(L[i++]);\n  while (j<R.size()) res.push_back(R[j++]);\n  return res;\n}\nvector<int> mergeSort(vector<int> a) {\n  if (a.size() <= 1) return a;\n  size_t mid = a.size()/2;\n  vector<int> left(a.begin(), a.begin()+mid);\n  vector<int> right(a.begin()+mid, a.end());\n  left = mergeSort(left);\n  right = mergeSort(right);\n  return mergeVec(left, right);\n}`,
      py: `def merge_sort(arr):\n  if len(arr) <= 1:\n    return arr\n  mid = len(arr) // 2\n  left = merge_sort(arr[:mid])\n  right = merge_sort(arr[mid:])\n  return merge(left, right)\n\ndef merge(left, right):\n  res = []\n  i = j = 0\n  while i < len(left) and j < len(right):\n    if left[i] <= right[j]:\n      res.append(left[i]); i += 1\n    else:\n      res.append(right[j]); j += 1\n  return res + left[i:] + right[j:]`
    },
    steps: [
      { explanation: "Split array into halves until size 1." },
      { explanation: "Merge two sorted halves into one." }
    ]
  },
  

  quickSort: {
    title: "Quick Sort Algorithm",
    description: "Pick a pivot, partition the array into smaller and larger elements, then recursively sort the partitions.",
    code: {
      js: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left = [], right = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] <= pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
      java: `public static int[] quickSort(int[] arr, int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}
private static int partition(int[] arr, int low, int high) {
  int pivot = arr[high];
  int i = low - 1;
  for (int j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
    }
  }
  int temp = arr[i+1]; arr[i+1] = arr[high]; arr[high] = temp;
  return i + 1;
}`,
      cpp: `#include <vector>
using namespace std;

int partition(vector<int>& arr, int low, int high) {
  int pivot = arr[high];
  int i = low - 1;
  for (int j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      swap(arr[i], arr[j]);
    }
  }
  swap(arr[i+1], arr[high]);
  return i + 1;
}
void quickSort(vector<int>& arr, int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`,
      py: `def quick_sort(arr):
  if len(arr) <= 1:
    return arr
  pivot = arr[-1]
  left = [x for x in arr[:-1] if x <= pivot]
  right = [x for x in arr[:-1] if x > pivot]
  return quick_sort(left) + [pivot] + quick_sort(right)`
  },

  steps: [
    { explanation: "Choose a pivot (commonly last element)." },
    { explanation: "Partition array: smaller on left, larger on right." },
    { explanation: "Recursively apply Quick Sort on partitions." },
  ],
},
strandSort: {
  title: "Strand Sort",
  description: "Repeatedly extract sorted subsequences (strands) from input and merge them into result until input is empty.",
  code: {
    js: `function strandSort(arr){
  if (!arr.length) return arr;
  const result = [];
  const input = [...arr];
  
  while (input.length > 0) {
    const strand = [input.shift()];
    let i = 0;
    while (i < input.length) {
      if (input[i] >= strand[strand.length - 1]) {
        strand.push(input.splice(i, 1)[0]);
      } else {
        i++;
      }
    }
    result = merge(result, strand);
  }
  return result;
}

function merge(list1, list2){
  const merged = [];
  let i = 0, j = 0;
  while (i < list1.length && j < list2.length) {
    if (list1[i] <= list2[j]) merged.push(list1[i++]);
    else merged.push(list2[j++]);
  }
  return merged.concat(list1.slice(i)).concat(list2.slice(j));
}`,
    java: `public static int[] strandSort(int[] a){
  if (a.length == 0) return a;
  List<Integer> result = new ArrayList<>();
  List<Integer> input = new ArrayList<>();
  for (int x : a) input.add(x);
  
  while (!input.isEmpty()) {
    List<Integer> strand = new ArrayList<>();
    strand.add(input.remove(0));
    int i = 0;
    while (i < input.size()) {
      if (input.get(i) >= strand.get(strand.size()-1)) {
        strand.add(input.remove(i));
      } else {
        i++;
      }
    }
    result = merge(result, strand);
  }
  return result.stream().mapToInt(Integer::intValue).toArray();
}

private static List<Integer> merge(List<Integer> l1, List<Integer> l2){
  List<Integer> merged = new ArrayList<>();
  int i=0, j=0;
  while (i < l1.size() && j < l2.size()) {
    if (l1.get(i) <= l2.get(j)) merged.add(l1.get(i++));
    else merged.add(l2.get(j++));
  }
  while (i < l1.size()) merged.add(l1.get(i++));
  while (j < l2.size()) merged.add(l2.get(j++));
  return merged;
}`,
    cpp: `#include <vector>
#include <list>
using namespace std;

static vector<int> merge(const vector<int>& l1, const vector<int>& l2){
  vector<int> merged;
  int i=0, j=0;
  while (i < l1.size() && j < l2.size()) {
    if (l1[i] <= l2[j]) merged.push_back(l1[i++]);
    else merged.push_back(l2[j++]);
  }
  while (i < l1.size()) merged.push_back(l1[i++]);
  while (j < l2.size()) merged.push_back(l2[j++]);
  return merged;
}

vector<int> strandSort(vector<int> a){
  if (a.empty()) return a;
  vector<int> result;
  list<int> input(a.begin(), a.end());
  
  while (!input.empty()) {
    vector<int> strand;
    strand.push_back(input.front());
    input.pop_front();
    auto it = input.begin();
    while (it != input.end()) {
      if (*it >= strand.back()) {
        strand.push_back(*it);
        it = input.erase(it);
      } else {
        ++it;
      }
    }
    result = merge(result, strand);
  }
  return result;
}`,
    py: `def strand_sort(a):
  if not a: return a
  result = []
  input_list = a[:]
  
  while input_list:
    strand = [input_list.pop(0)]
    i = 0
    while i < len(input_list):
      if input_list[i] >= strand[-1]:
        strand.append(input_list.pop(i))
      else:
        i += 1
    result = _merge(result, strand)
  return result

def _merge(l1, l2):
  merged = []
  i, j = 0, 0
  while i < len(l1) and j < len(l2):
    if l1[i] <= l2[j]:
      merged.append(l1[i])
      i += 1
    else:
      merged.append(l2[j])
      j += 1
  return merged + l1[i:] + l2[j:]`
  },
  steps: [
    { explanation: "Extract a sorted strand: take first element, then scan for elements >= last in strand." },
    { explanation: "Merge the strand into the result list maintaining sorted order." },
    { explanation: "Repeat until input is empty. Result contains sorted array." }
  ]
},
  radixSort: {
    title: "Radix Sort (LSD, base 10)",
    description: "Sort integers by processing digits from least significant to most, using a stable counting per digit.",
    code: {
      js: `function countingByDigit(arr, exp){
  const out = new Array(arr.length).fill(0);
  const cnt = new Array(10).fill(0);
  for (let i = 0; i < arr.length; i++) cnt[Math.floor(arr[i] / exp) % 10]++;
  for (let i = 1; i < 10; i++) cnt[i] += cnt[i-1];
  for (let i = arr.length - 1; i >= 0; i--) {
    const d = Math.floor(arr[i] / exp) % 10;
    out[--cnt[d]] = arr[i];
  }
  for (let i = 0; i < arr.length; i++) arr[i] = out[i];
}
function radixSort(arr){
  if (!arr.length) return arr;
  const max = Math.max(...arr);
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) countingByDigit(arr, exp);
  return arr;
}`,
      java: `private static void countingByDigit(int[] a, int exp){
  int n = a.length;
  int[] out = new int[n];
  int[] cnt = new int[10];
  for (int x : a) cnt[(x/exp)%10]++;
  for (int i=1;i<10;i++) cnt[i]+=cnt[i-1];
  for (int i=n-1;i>=0;i--){
    int d=(a[i]/exp)%10; out[--cnt[d]]=a[i];
  }
  System.arraycopy(out,0,a,0,n);
}
public static int[] radixSort(int[] a){
  if (a.length==0) return a;
  int max = Arrays.stream(a).max().getAsInt();
  for (int exp=1; max/exp>0; exp*=10) countingByDigit(a, exp);
  return a;
}`,
      cpp: `#include <vector>
using namespace std;

static void countingByDigit(vector<int>& a, int exp){
  int n=a.size();
  vector<int> out(n), cnt(10,0);
  for(int x: a) cnt[(x/exp)%10]++;
  for(int i=1;i<10;i++) cnt[i]+=cnt[i-1];
  for(int i=n-1;i>=0;i--){
    int d=(a[i]/exp)%10; out[--cnt[d]]=a[i];
  }
  for(int i=0;i<n;i++) a[i]=out[i];
}
vector<int> radixSort(vector<int> a){
  if(a.empty()) return a;
  int maxv=*max_element(a.begin(), a.end());
  for(int exp=1; maxv/exp>0; exp*=10) countingByDigit(a, exp);
  return a;
}`,
      py: `def _counting_by_digit(a, exp):
  out=[0]*len(a)
  cnt=[0]*10
  for x in a: cnt[(x//exp)%10]+=1
  for i in range(1,10): cnt[i]+=cnt[i-1]
  for i in range(len(a)-1, -1, -1):
    d=(a[i]//exp)%10; cnt[d]-=1; out[cnt[d]]=a[i]
  for i in range(len(a)): a[i]=out[i]

def radix_sort(a):
  if not a: return a
  m=max(a)
  exp=1
  while m//exp>0:
    _counting_by_digit(a, exp)
    exp*=10
  return a`
    },
    steps: [
      { explanation: "Find the maximum to know number of digits." },
      { explanation: "For exp = 1,10,100... do a stable count by current digit." },
      { explanation: "After last digit pass, array is sorted." }
    ]
  },

  bucketSort: {
    title: "Bucket Sort (uniform [0,1) or range partition)",
    description: "Distribute elements into buckets, sort each bucket, then concatenate.",
    code: {
      js: `function bucketSort(arr, bucketCount=10){
  if (!arr.length) return arr;
  const min = Math.min(...arr), max = Math.max(...arr);
  const range = (max - min) || 1;
  const buckets = Array.from({length: bucketCount}, () => []);
  for (const x of arr){
    const idx = Math.min(bucketCount-1, Math.floor((x - min) / range * bucketCount));
    buckets[idx].push(x);
  }
  const sorted = [];
  for (const b of buckets){ b.sort((a,b)=>a-b); sorted.push(...b); }
  return sorted;
}`,
      java: `public static int[] bucketSort(int[] a, int bucketCount){
  if (a.length==0) return a;
  int min=a[0], max=a[0];
  for(int x: a){ if(x<min) min=x; if(x>max) max=x; }
  int range = Math.max(1, max-min);
  List<List<Integer>> buckets = new ArrayList<>();
  for(int i=0;i<bucketCount;i++) buckets.add(new ArrayList<>());
  for(int x: a){
    int idx = Math.min(bucketCount-1, (int)((long)(x-min)*bucketCount/range));
    buckets.get(idx).add(x);
  }
  int k=0;
  for(List<Integer> b: buckets){ Collections.sort(b); for(int v: b) a[k++]=v; }
  return a;
}`,
      cpp: `#include <vector>
using namespace std;

vector<int> bucketSort(vector<int> a, int bucketCount=10){
  if(a.empty()) return a;
  int mn = *min_element(a.begin(), a.end());
  int mx = *max_element(a.begin(), a.end());
  int range = max(1, mx - mn);
  vector<vector<int>> buckets(bucketCount);
  for(int x: a){
    int idx = min(bucketCount-1, (int)((long long)(x-mn)*bucketCount/range));
    buckets[idx].push_back(x);
  }
  a.clear();
  for(auto& b: buckets){ sort(b.begin(), b.end()); a.insert(a.end(), b.begin(), b.end()); }
  return a;
}`,
      py: `def bucket_sort(a, bucket_count=10):
  if not a: return a
  mn, mx = min(a), max(a)
  rng = max(1, mx - mn)
  buckets = [[] for _ in range(bucket_count)]
  for x in a:
    idx = min(bucket_count-1, (x - mn) * bucket_count // rng)
    buckets[idx].append(x)
  out=[]
  for b in buckets:
    b.sort()
    out.extend(b)
  return out`
    },
    steps: [
      { explanation: "Compute min/max and create buckets covering the range." },
      { explanation: "Distribute elements into buckets based on value." },
      { explanation: "Sort each bucket and concatenate in order." }
    ]
  },


  timSort: {
      title: "TimSort",
      description: "Hybrid stable sorting algorithm combining Insertion Sort and Merge Sort. It detects natural runs in the array, sorts them using insertion sort, and then merges them efficiently.",
      code: {
        js: `const MIN_MERGE = 32;

    function minRunLength(n){
      let r = 0;
      while (n >= MIN_MERGE) {
        r |= (n & 1);
        n >>= 1;
      }
      return n + r;
    }

    function insertionSort(arr, left, right){
      for (let i = left + 1; i <= right; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= left && arr[j] > key) {
          arr[j + 1] = arr[j];
          j--;
        }
        arr[j + 1] = key;
      }
    }

    function merge(arr, l, m, r){
      const left = arr.slice(l, m + 1);
      const right = arr.slice(m + 1, r + 1);
      let i = 0, j = 0, k = l;
      while (i < left.length && j < right.length){
        if (left[i] <= right[j]) arr[k++] = left[i++];
        else arr[k++] = right[j++];
      }
      while (i < left.length) arr[k++] = left[i++];
      while (j < right.length) arr[k++] = right[j++];
    }

    function timSort(arr){
      const n = arr.length;
      const minRun = minRunLength(n);

      // Sort small runs with insertion sort
      for (let i = 0; i < n; i += minRun){
        insertionSort(arr, i, Math.min((i + minRun - 1), n - 1));
      }

      // Merge runs in size-doubling manner
      for (let size = minRun; size < n; size = 2*size){
        for (let left = 0; left < n; left += 2*size){
          let mid = left + size - 1;
          let right = Math.min((left + 2*size - 1), n - 1);
          if (mid < right) merge(arr, left, mid, right);
        }
      }
      return arr;
    }`,

        java: `static final int MIN_MERGE = 32;

    static int minRunLength(int n){
      int r = 0;
      while (n >= MIN_MERGE){
        r |= (n & 1);
        n >>= 1;
      }
      return n + r;
    }

    static void insertionSort(int[] arr, int left, int right){
      for (int i = left+1; i <= right; i++){
        int key = arr[i], j = i-1;
        while (j >= left && arr[j] > key){
          arr[j+1] = arr[j];
          j--;
        }
        arr[j+1] = key;
      }
    }

    static void merge(int[] arr, int l, int m, int r){
      int len1 = m - l + 1, len2 = r - m;
      int[] left = new int[len1], right = new int[len2];
      for (int i=0;i<len1;i++) left[i]=arr[l+i];
      for (int i=0;i<len2;i++) right[i]=arr[m+1+i];
      int i=0,j=0,k=l;
      while (i<len1 && j<len2){
        if (left[i]<=right[j]) arr[k++]=left[i++];
        else arr[k++]=right[j++];
      }
      while (i<len1) arr[k++]=left[i++];
      while (j<len2) arr[k++]=right[j++];
    }

    public static void timSort(int[] arr){
      int n=arr.length;
      int minRun=minRunLength(n);

      for(int i=0;i<n;i+=minRun){
        insertionSort(arr,i,Math.min(i+minRun-1,n-1));
      }

      for(int size=minRun;size<n;size*=2){
        for(int left=0;left<n;left+=2*size){
          int mid=left+size-1;
          int right=Math.min((left+2*size-1),n-1);
          if(mid<right) merge(arr,left,mid,right);
        }
      }
    }`,

        cpp: `#include <vector>
    #include <algorithm>
    using namespace std;
    const int MIN_MERGE = 32;

    int minRunLength(int n){
      int r=0;
      while(n>=MIN_MERGE){ r|=(n&1); n>>=1; }
      return n+r;
    }

    void insertionSort(vector<int>& arr,int left,int right){
      for(int i=left+1;i<=right;i++){
        int key=arr[i],j=i-1;
        while(j>=left && arr[j]>key){
          arr[j+1]=arr[j]; j--;
        }
        arr[j+1]=key;
      }
    }

    void merge(vector<int>& arr,int l,int m,int r){
      vector<int> left(arr.begin()+l,arr.begin()+m+1);
      vector<int> right(arr.begin()+m+1,arr.begin()+r+1);
      int i=0,j=0,k=l;
      while(i<left.size() && j<right.size()){
        if(left[i]<=right[j]) arr[k++]=left[i++];
        else arr[k++]=right[j++];
      }
      while(i<left.size()) arr[k++]=left[i++];
      while(j<right.size()) arr[k++]=right[j++];
    }

    void timSort(vector<int>& arr){
      int n=arr.size();
      int minRun=minRunLength(n);

      for(int i=0;i<n;i+=minRun){
        insertionSort(arr,i,min(i+minRun-1,n-1));
      }

      for(int size=minRun;size<n;size*=2){
        for(int left=0;left<n;left+=2*size){
          int mid=left+size-1;
          int right=min(left+2*size-1,n-1);
          if(mid<right) merge(arr,left,mid,right);
        }
      }
    }`,

        py: `MIN_MERGE = 32

    def min_run_length(n):
      r=0
      while n>=MIN_MERGE:
        r|=n&1
        n>>=1
      return n+r

    def insertion_sort(a,left,right):
      for i in range(left+1,right+1):
        key=a[i]; j=i-1
        while j>=left and a[j]>key:
          a[j+1]=a[j]; j-=1
        a[j+1]=key

    def merge(a,l,m,r):
      left=a[l:m+1]
      right=a[m+1:r+1]
      i=j=0; k=l
      while i<len(left) and j<len(right):
        if left[i]<=right[j]:
          a[k]=left[i]; i+=1
        else:
          a[k]=right[j]; j+=1
        k+=1
      while i<len(left):
        a[k]=left[i]; i+=1; k+=1
      while j<len(right):
        a[k]=right[j]; j+=1; k+=1

    def tim_sort(a):
      n=len(a)
      min_run=min_run_length(n)

      for i in range(0,n,min_run):
        insertion_sort(a,i,min(i+min_run-1,n-1))

      size=min_run
      while size<n:
        for left in range(0,n,2*size):
          mid=left+size-1
          right=min(left+2*size-1,n-1)
          if mid<right: merge(a,left,mid,right)
        size*=2
      return a`
      },
      steps: [
        { explanation: "Compute a minRun size (≈32–64) based on array length." },
        { explanation: "Split array into runs of size minRun." },
        { explanation: "Sort each run individually with insertion sort." },
        { explanation: "Iteratively merge runs in size-doubling fashion." },
        { explanation: "After final merge, the array is fully sorted." }
      ]
    },
    cocktailShakerSort: {
  title: "Cocktail Shaker Sort",
  description: "A bidirectional variation of Bubble Sort. Instead of only moving large elements to the end, it alternates between forward and backward passes, moving both small and large elements toward their correct ends with each pass. This can lead to fewer passes on certain datasets compared to regular Bubble Sort.",
  code: {
    js: `function cocktailShakerSort(arr) {
  let start = 0;
  let end = arr.length - 1;
  let swapped = true;

  while (swapped) {
    swapped = false;

    // Forward pass
    for (let i = start; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }

    // Mark last element sorted
    end--;
    if (!swapped) break;
    swapped = false;

    // Backward pass
    for (let i = end; i > start; i--) {
      if (arr[i - 1] > arr[i]) {
        [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
        swapped = true;
      }
    }

    // Mark first element sorted
    start++;
  }

  return arr;
}`,
    java: `public static void cocktailShakerSort(int[] arr) {
  int start = 0;
  int end = arr.length - 1;
  boolean swapped = true;

  while (swapped) {
    swapped = false;

    // Forward pass
    for (int i = start; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        int temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swapped = true;
      }
    }

    end--;
    if (!swapped) break;
    swapped = false;

    // Backward pass
    for (int i = end; i > start; i--) {
      if (arr[i - 1] > arr[i]) {
        int temp = arr[i - 1];
        arr[i - 1] = arr[i];
        arr[i] = temp;
        swapped = true;
      }
    }

    start++;
  }
}`,
    cpp: `#include <vector>
using namespace std;

void cocktailShakerSort(vector<int>& arr) {
  int start = 0;
  int end = arr.size() - 1;
  bool swapped = true;

  while (swapped) {
    swapped = false;

    // Forward pass
    for (int i = start; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        swap(arr[i], arr[i + 1]);
        swapped = true;
      }
    }

    end--;
    if (!swapped) break;
    swapped = false;

    // Backward pass
    for (int i = end; i > start; i--) {
      if (arr[i - 1] > arr[i]) {
        swap(arr[i - 1], arr[i]);
        swapped = true;
      }
    }

    start++;
  }
}`,
    py: `def cocktail_shaker_sort(arr):
  start = 0
  end = len(arr) - 1
  swapped = True

  while swapped:
    swapped = False

    # Forward pass
    for i in range(start, end):
      if arr[i] > arr[i + 1]:
        arr[i], arr[i + 1] = arr[i + 1], arr[i]
        swapped = True

    end -= 1
    if not swapped:
      break
    swapped = False

    # Backward pass
    for i in range(end, start, -1):
      if arr[i - 1] > arr[i]:
        arr[i - 1], arr[i] = arr[i], arr[i - 1]
        swapped = True

    start += 1

  return arr`
  },
  steps: [
    { explanation: "Initialize two pointers, start (0) and end (n−1), and set swapped = true." },
    { explanation: "Perform a forward pass: bubble the largest element to the end." },
    { explanation: "Decrease the end pointer, as the last element is in place." },
    { explanation: "If no swaps occurred, the array is sorted; otherwise, perform a backward pass." },
    { explanation: "Backward pass: bubble the smallest element to the start." },
    { explanation: "Increase the start pointer, repeat passes until no swaps occur." }
  ]
},

 shellSort: {
    title: "Shell Sort Algorithm",
    description: "An improvement over insertion sort that allows the exchange of elements that are far apart. Uses a gap sequence that starts large and reduces to 1, making the final insertion sort pass very efficient.",
    code: {
      js: `function shellSort(arr) {
  const n = arr.length;
  // Start with a big gap, then reduce the gap
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Do a gapped insertion sort for this gap size
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j;
      // Shift earlier gap-sorted elements up until correct location for arr[i] is found
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
      }
      // Put temp (original arr[i]) in its correct location
      arr[j] = temp;
    }
  }
  return arr;
}`,
      java: `public static int[] shellSort(int[] arr) {
  int n = arr.length;
  // Start with a big gap, then reduce the gap
  for (int gap = n / 2; gap > 0; gap /= 2) {
    // Do a gapped insertion sort for this gap size
    for (int i = gap; i < n; i++) {
      int temp = arr[i];
      int j;
      // Shift earlier gap-sorted elements up until correct location for arr[i] is found
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
      }
      // Put temp (original arr[i]) in its correct location
      arr[j] = temp;
    }
  }
  return arr;
}`,
      cpp: `#include <vector>
using namespace std;

vector<int> shellSort(vector<int> arr) {
  int n = (int)arr.size();
  // Start with a big gap, then reduce the gap
  for (int gap = n / 2; gap > 0; gap /= 2) {
    // Do a gapped insertion sort for this gap size
    for (int i = gap; i < n; i++) {
      int temp = arr[i];
      int j;
      // Shift earlier gap-sorted elements up until correct location for arr[i] is found  
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
      }
      // Put temp (original arr[i]) in its correct location
      arr[j] = temp;
    }
  }
  return arr;
}`,
      py: `def shell_sort(arr):
  n = len(arr)
  # Start with a big gap, then reduce the gap
  gap = n // 2
  while gap > 0:
    # Do a gapped insertion sort for this gap size
    for i in range(gap, n):
      temp = arr[i]
      j = i
      # Shift earlier gap-sorted elements up until correct location for arr[i] is found
      while j >= gap and arr[j - gap] > temp:
        arr[j] = arr[j - gap]
        j -= gap
      # Put temp (original arr[i]) in its correct location
      arr[j] = temp
    gap //= 2
  return arr`
    },
    steps: [
      { explanation: "Start with gap = n/2 and reduce by half each iteration.", highlight: { js: "gap = Math.floor(n / 2)", java: "gap = n / 2", cpp: "gap = n / 2", py: "gap = n // 2" } },
      { explanation: "For each gap, perform gapped insertion sort on subarrays.", highlight: { js: "for (let i = gap; i < n; i++)", java: "for (int i = gap; i < n; i++)", cpp: "for (int i = gap; i < n; i++)", py: "for i in range(gap, n):" } },
      { explanation: "Store current element and find its correct position within gap-sorted elements.", highlight: { js: "const temp = arr[i];", java: "int temp = arr[i];", cpp: "int temp = arr[i];", py: "temp = arr[i]" } },
      { explanation: "Shift larger elements gap positions ahead until insertion point found.", highlight: { js: "arr[j - gap] > temp", java: "arr[j - gap] > temp", cpp: "arr[j - gap] > temp", py: "arr[j - gap] > temp" } },
      { explanation: "Insert the stored element at its correct position.", highlight: { js: "arr[j] = temp;", java: "arr[j] = temp;", cpp: "arr[j] = temp;", py: "arr[j] = temp" } },
      { explanation: "Reduce gap and repeat until gap becomes 1 (regular insertion sort).", highlight: { js: "gap = Math.floor(gap / 2)", java: "gap /= 2", cpp: "gap /= 2", py: "gap //= 2" } }
    ]
  },

  introSort: {
    title: "IntroSort",
    description: "Hybrid sorting algorithm that starts with Quick Sort, switches to Heap Sort when recursion depth exceeds a limit, and uses Insertion Sort for small partitions. Ensures O(n log n) worst-case time while keeping fast average case.",
    code: {
      js: `function insertionSort(arr, left, right){
  for (let i=left+1;i<=right;i++){
    let key=arr[i], j=i-1;
    while(j>=left && arr[j]>key){
      arr[j+1]=arr[j]; j--;
    }
    arr[j+1]=key;
  }
}

function heapify(arr, n, i){
  let largest=i, l=2*i+1, r=2*i+2;
  if(l<n && arr[l]>arr[largest]) largest=l;
  if(r<n && arr[r]>arr[largest]) largest=r;
  if(largest!==i){
    [arr[i],arr[largest]]=[arr[largest],arr[i]];
    heapify(arr,n,largest);
  }
}

function heapSort(arr,left,right){
  let n=right-left+1;
  for(let i=Math.floor(n/2)-1;i>=0;i--) heapify(arr.slice(left), n, i);
  let tmp=arr.slice(left,right+1);
  for(let i=n-1;i>=0;i--){
    [tmp[0],tmp[i]]=[tmp[i],tmp[0]];
    heapify(tmp,i,0);
  }
  for(let i=0;i<n;i++) arr[left+i]=tmp[i];
}

function partition(arr,left,right){
  let pivot=arr[right], i=left-1;
  for(let j=left;j<right;j++){
    if(arr[j]<=pivot){
      i++; [arr[i],arr[j]]=[arr[j],arr[i]];
    }
  }
  [arr[i+1],arr[right]]=[arr[right],arr[i+1]];
  return i+1;
}

function introSortUtil(arr,left,right,depthLimit){
  const size=right-left+1;
  if(size<16){
    insertionSort(arr,left,right);
    return;
  }
  if(depthLimit===0){
    heapSort(arr,left,right);
    return;
  }
  let p=partition(arr,left,right);
  introSortUtil(arr,left,p-1,depthLimit-1);
  introSortUtil(arr,p+1,right,depthLimit-1);
}

function introSort(arr){
  let depthLimit=2*Math.floor(Math.log2(arr.length));
  introSortUtil(arr,0,arr.length-1,depthLimit);
  return arr;
}`,
      java: `import java.util.*;

class IntroSort {
  static void insertionSort(int[] arr,int left,int right){
    for(int i=left+1;i<=right;i++){
      int key=arr[i],j=i-1;
      while(j>=left && arr[j]>key){ arr[j+1]=arr[j]; j--; }
      arr[j+1]=key;
    }
  }

  static void heapify(int[] arr,int n,int i,int offset){
    int largest=i, l=2*i+1, r=2*i+2;
    if(l<n && arr[offset+l]>arr[offset+largest]) largest=l;
    if(r<n && arr[offset+r]>arr[offset+largest]) largest=r;
    if(largest!=i){
      int tmp=arr[offset+i]; arr[offset+i]=arr[offset+largest]; arr[offset+largest]=tmp;
      heapify(arr,n,largest,offset);
    }
  }

  static void heapSort(int[] arr,int left,int right){
    int n=right-left+1;
    for(int i=n/2-1;i>=0;i--) heapify(arr,n,i,left);
    for(int i=n-1;i>0;i--){
      int tmp=arr[left]; arr[left]=arr[left+i]; arr[left+i]=tmp;
      heapify(arr,i,0,left);
    }
  }

  static int partition(int[] arr,int left,int right){
    int pivot=arr[right]; int i=left-1;
    for(int j=left;j<right;j++){
      if(arr[j]<=pivot){
        i++; int tmp=arr[i]; arr[i]=arr[j]; arr[j]=tmp;
      }
    }
    int tmp=arr[i+1]; arr[i+1]=arr[right]; arr[right]=tmp;
    return i+1;
  }

  static void introSortUtil(int[] arr,int left,int right,int depthLimit){
    int size=right-left+1;
    if(size<16){ insertionSort(arr,left,right); return; }
    if(depthLimit==0){ heapSort(arr,left,right); return; }
    int p=partition(arr,left,right);
    introSortUtil(arr,left,p-1,depthLimit-1);
    introSortUtil(arr,p+1,right,depthLimit-1);
  }

  public static void introSort(int[] arr){
    int depthLimit=2*(int)(Math.log(arr.length)/Math.log(2));
    introSortUtil(arr,0,arr.length-1,depthLimit);
  }
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

void insertionSort(vector<int>& arr,int left,int right){
  for(int i=left+1;i<=right;i++){
    int key=arr[i], j=i-1;
    while(j>=left && arr[j]>key){ arr[j+1]=arr[j]; j--; }
    arr[j+1]=key;
  }
}

int partition(vector<int>& arr,int left,int right){
  int pivot=arr[right]; int i=left-1;
  for(int j=left;j<right;j++){
    if(arr[j]<=pivot){ i++; swap(arr[i],arr[j]); }
  }
  swap(arr[i+1],arr[right]); return i+1;
}

void heapify(vector<int>& arr,int n,int i,int offset){
  int largest=i,l=2*i+1,r=2*i+2;
  if(l<n && arr[offset+l]>arr[offset+largest]) largest=l;
  if(r<n && arr[offset+r]>arr[offset+largest]) largest=r;
  if(largest!=i){
    swap(arr[offset+i],arr[offset+largest]);
    heapify(arr,n,largest,offset);
  }
}

void heapSort(vector<int>& arr,int left,int right){
  int n=right-left+1;
  for(int i=n/2-1;i>=0;i--) heapify(arr,n,i,left);
  for(int i=n-1;i>0;i--){
    swap(arr[left],arr[left+i]);
    heapify(arr,i,0,left);
  }
}

void introSortUtil(vector<int>& arr,int left,int right,int depthLimit){
  int size=right-left+1;
  if(size<16){ insertionSort(arr,left,right); return; }
  if(depthLimit==0){ heapSort(arr,left,right); return; }
  int p=partition(arr,left,right);
  introSortUtil(arr,left,p-1,depthLimit-1);
  introSortUtil(arr,p+1,right,depthLimit-1);
}

void introSort(vector<int>& arr){
  int depthLimit=2*log(arr.size());
  introSortUtil(arr,0,arr.size()-1,depthLimit);
}`,
      py: `import math

def insertion_sort(arr,left,right):
  for i in range(left+1,right+1):
    key=arr[i]; j=i-1
    while j>=left and arr[j]>key:
      arr[j+1]=arr[j]; j-=1
    arr[j+1]=key

def partition(arr,left,right):
  pivot=arr[right]; i=left-1
  for j in range(left,right):
    if arr[j]<=pivot:
      i+=1; arr[i],arr[j]=arr[j],arr[i]
  arr[i+1],arr[right]=arr[right],arr[i+1]
  return i+1

def heapify(arr,n,i,offset):
  largest=i; l=2*i+1; r=2*i+2
  if l<n and arr[offset+l]>arr[offset+largest]: largest=l
  if r<n and arr[offset+r]>arr[offset+largest]: largest=r
  if largest!=i:
    arr[offset+i],arr[offset+largest]=arr[offset+largest],arr[offset+i]
    heapify(arr,n,largest,offset)

def heap_sort(arr,left,right):
  n=right-left+1
  for i in range(n//2-1,-1,-1): heapify(arr,n,i,left)
  for i in range(n-1,0,-1):
    arr[left],arr[left+i]=arr[left+i],arr[left]
    heapify(arr,i,0,left)

def intro_sort_util(arr,left,right,depth_limit):
  size=right-left+1
  if size<16: insertion_sort(arr,left,right); return
  if depth_limit==0: heap_sort(arr,left,right); return
  p=partition(arr,left,right)
  intro_sort_util(arr,left,p-1,depth_limit-1)
  intro_sort_util(arr,p+1,right,depth_limit-1)

def intro_sort(arr):
  depth_limit=2*int(math.log2(len(arr)))
  intro_sort_util(arr,0,len(arr)-1,depth_limit)
  return arr`
    },
    steps: [
      { explanation: "Start with Quick Sort for partitioning." },
      { explanation: "If recursion depth exceeds 2*log₂(n), switch to Heap Sort to avoid O(n²)." },
      { explanation: "For small subarrays (size < 16), use Insertion Sort for efficiency." },
      { explanation: "Combines strengths: Quick Sort’s speed, Heap Sort’s worst-case guarantee, Insertion Sort’s efficiency on small inputs." },
      { explanation: "Ensures overall O(n log n) worst-case time complexity." }
    ]
  },

sleepSort: {
  title: "Sleep Sort",
  description: "Sleep Sort is a fun, visualization-based algorithm that sorts numbers by leveraging their values as delays. Each element 'sleeps' for a duration proportional to its value, then gets placed in the output in that order. While not practical for real-world use, it's often used to demonstrate concurrency and timing-based sorting.",
  code: {
    js: `function sleepSort(arr, delay = 1) {
  const result = [];
  const maxVal = Math.max(...arr);
  return new Promise((resolve) => {
    arr.forEach((num) => {
      setTimeout(() => {
        result.push(num);
        if (result.length === arr.length) {
          resolve(result);
        }
      }, num * delay);
    });
  });
}

// Usage example:
(async () => {
  const arr = [3, 1, 4, 2];
  const sorted = await sleepSort(arr, 50);
  console.log(sorted); // [1, 2, 3, 4]
})();`,
    java: `import java.util.*;

class SleepSort {
  public static void sleepSort(int[] arr) {
    List<Integer> result = Collections.synchronizedList(new ArrayList<>());
    int max = Arrays.stream(arr).max().orElse(0);
    for (int num : arr) {
      new Thread(() -> {
        try {
          Thread.sleep(num * 10);
        } catch (InterruptedException e) {
          Thread.currentThread().interrupt();
        }
        result.add(num);
        if (result.size() == arr.length) {
          synchronized (result) {
            Collections.sort(result); // Optional for ensuring order in race
            System.out.println(result);
          }
        }
      }).start();
    }
  }

  public static void main(String[] args) {
    int[] arr = {3, 1, 4, 2};
    sleepSort(arr);
  }
}`,
    cpp: `#include <bits/stdc++.h>
#include <thread>
#include <chrono>
using namespace std;

void sleepSort(vector<int>& arr) {
  vector<int> result;
  mutex m;
  vector<thread> threads;

  for (int num : arr) {
    threads.emplace_back([num, &result, &m]() {
      this_thread::sleep_for(chrono::milliseconds(num * 10));
      lock_guard<mutex> lock(m);
      result.push_back(num);
    });
  }

  for (auto& t : threads) t.join();
  sort(result.begin(), result.end());
  for (int x : result) cout << x << " ";
  cout << endl;
}

int main() {
  vector<int> arr = {3, 1, 4, 2};
  sleepSort(arr);
  return 0;
}`,
    py: `import threading, time

def sleep_sort(arr, delay=0.01):
  result = []
  def sleeper(n):
    time.sleep(n * delay)
    result.append(n)

  threads = [threading.Thread(target=sleeper, args=(n,)) for n in arr]
  for t in threads: t.start()
  for t in threads: t.join()
  return result

# Example
print(sleep_sort([3, 1, 4, 2]))  # [1, 2, 3, 4]`
  },
  steps: [
    { explanation: "For each number, create a 'timer' or 'thread' that waits for a duration proportional to the number's value." },
    { explanation: "When the timer completes, the number is added to the output list." },
    { explanation: "Since smaller numbers have shorter sleep times, they get added earlier, resulting in sorted order." },
    { explanation: "This algorithm relies on concurrency and precise timing, making it impractical but visually interesting." },
    { explanation: "Time complexity depends on the maximum value in the array, approximately O(max(arr) + n)." }
  ]
},

  binarySearch: {
    title: "Binary Search Algorithm",
    description:
      "Search in a sorted array by repeatedly halving the search space.",
    code: {
      js: `function binarySearch(arr, target) {
  let l = 0, r = arr.length - 1;
  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    if (arr[m] === target) return m;
    if (arr[m] < target) l = m + 1;
    else r = m - 1;
  }
  return -1;
}`,
      java: `public static int binarySearch(int[] arr, int target) {
  int l = 0, r = arr.length - 1;
  while (l <= r) {
    int m = (l + r) >>> 1;
    if (arr[m] == target) return m;
    if (arr[m] < target) l = m + 1;
    else r = m - 1;
  }
  return -1;
}`,
      cpp: `#include <vector>
using namespace std;

int binarySearch(const vector<int>& arr, int target) {
  int l = 0, r = (int)arr.size() - 1;
  while (l <= r) {
    int m = l + (r - l) / 2;
    if (arr[m] == target) return m;
    if (arr[m] < target) l = m + 1; else r = m - 1;
  }
  return -1;
}`,
      py: `def binary_search(arr, target):
  l, r = 0, len(arr) - 1
  while l <= r:
    m = (l + r) // 2
    if arr[m] == target: return m
    if arr[m] < target: l = m + 1
    else: r = m - 1
  return -1`,
    },
    steps: [
      { explanation: "Compute middle index." },
      { explanation: "If middle < target, shift left bound up; else shift right bound down." },
    ],
  },

  linearSearch: {
    title: "Linear Search Algorithm",
    description:
      "Scan each element from left to right until you find the target.",
    code: {
      js: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++)
    if (arr[i] === target) return i;
  return -1;
}`,
      java: `public static int linearSearch(int[] arr, int target) {
  for (int i = 0; i < arr.length; i++)
    if (arr[i] == target) return i;
  return -1;
}`,
      cpp: `#include <vector>
using namespace std;

int linearSearch(const vector<int>& arr, int target) {
  for (int i = 0; i < (int)arr.size(); i++)
    if (arr[i] == target) return i;
  return -1;
}`,
      py: `def linear_search(arr, target):
  for i, x in enumerate(arr):
    if x == target: return i
  return -1`,
    },
    steps: [{ explanation: "Compare target with each element; return index on match." }],
  },ternarySearch: {
  title: "Ternary Search Algorithm",
  description:
    "Search in a sorted array by dividing the search space into three parts and discarding two-thirds at each step.",
  code: {
    js: `function ternarySearch(arr, target) {
  let l = 0, r = arr.length - 1;
  while (l <= r) {
    const mid1 = l + Math.floor((r - l) / 3);
    const mid2 = r - Math.floor((r - l) / 3);
    if (arr[mid1] === target) return mid1;
    if (arr[mid2] === target) return mid2;
    if (target < arr[mid1]) r = mid1 - 1;
    else if (target > arr[mid2]) l = mid2 + 1;
    else {
      l = mid1 + 1;
      r = mid2 - 1;
    }
  }
  return -1;
}`,
    java: `public static int ternarySearch(int[] arr, int target) {
  int l = 0, r = arr.length - 1;
  while (l <= r) {
    int mid1 = l + (r - l) / 3;
    int mid2 = r - (r - l) / 3;
    if (arr[mid1] == target) return mid1;
    if (arr[mid2] == target) return mid2;
    if (target < arr[mid1]) r = mid1 - 1;
    else if (target > arr[mid2]) l = mid2 + 1;
    else {
      l = mid1 + 1;
      r = mid2 - 1;
    }
  }
  return -1;
}`,
    cpp: `#include <vector>
using namespace std;

int ternarySearch(const vector<int>& arr, int target) {
  int l = 0, r = (int)arr.size() - 1;
  while (l <= r) {
    int mid1 = l + (r - l) / 3;
    int mid2 = r - (r - l) / 3;
    if (arr[mid1] == target) return mid1;
    if (arr[mid2] == target) return mid2;
    if (target < arr[mid1]) r = mid1 - 1;
    else if (target > arr[mid2]) l = mid2 + 1;
    else {
      l = mid1 + 1;
      r = mid2 - 1;
    }
  }
  return -1;
}`,
    py: `def ternary_search(arr, target):
  l, r = 0, len(arr) - 1
  while l <= r:
    mid1 = l + (r - l) // 3
    mid2 = r - (r - l) // 3
    if arr[mid1] == target: return mid1
    if arr[mid2] == target: return mid2
    if target < arr[mid1]:
      r = mid1 - 1
    elif target > arr[mid2]:
      l = mid2 + 1
    else:
      l = mid1 + 1
      r = mid2 - 1
  return -1`,
  },
  steps: [
    { explanation: "Divide the array into three parts by finding mid1 and mid2." },
    { explanation: "Check if target matches mid1 or mid2; if so, return the index." },
    { explanation: "If target is less than mid1, search the first third; if greater than mid2, search the third third; else search the middle third." },
  ],
},

  jumpSearch: {
    title: "Jump Search Algorithm (sorted array)",
    description:
      "Jump by √n blocks to find a candidate range, then linearly scan within it.",
    code: {
      js: `function jumpSearch(arr, target) {
  const n = arr.length;
  let step = Math.floor(Math.sqrt(n));
  let prev = 0;
  while (prev < n && arr[Math.min(step, n) - 1] < target) {
    prev = step; step += Math.floor(Math.sqrt(n));
  }
  for (let i = prev; i < Math.min(step, n); i++)
    if (arr[i] === target) return i;
  return -1;
}`,
      java: `public static int jumpSearch(int[] arr, int target) {
  int n = arr.length;
  int step = (int)Math.floor(Math.sqrt(n));
  int prev = 0;
  while (prev < n && arr[Math.min(step, n) - 1] < target) {
    prev = step; step += (int)Math.floor(Math.sqrt(n));
  }
  for (int i = prev; i < Math.min(step, n); i++)
    if (arr[i] == target) return i;
  return -1;
}`,
      cpp: `#include <cmath>
#include <vector>
using namespace std;

int jumpSearch(const vector<int>& arr, int target) {
  int n = (int)arr.size();
  int step = (int)floor(sqrt(n));
  int prev = 0;
  while (prev < n && arr[min(step, n) - 1] < target) {
    prev = step; step += (int)floor(sqrt(n));
  }
  for (int i = prev; i < min(step, n); i++)
    if (arr[i] == target) return i;
  return -1;
}`,
      py: `import math
def jump_search(arr, target):
  n = len(arr)
  step = int(math.sqrt(n))
  prev = 0
  while prev < n and arr[min(step, n) - 1] < target:
    prev = step; step += int(math.sqrt(n))
  for i in range(prev, min(step, n)):
    if arr[i] == target: return i
  return -1`,
    },
    steps: [
      { explanation: "Jump ahead by √n until you pass or reach the target." },
      { explanation: "Linear scan within the identified block." },
    ],
  },

  exponentialSearch: {
    title: "Exponential Search Algorithm (sorted array)",
    description:
      "Find a range by growing the index exponentially, then binary-search within that range.",
    code: {
      js: `function exponentialSearch(arr, target) {
  if (arr.length === 0) return -1;
  if (arr[0] === target) return 0;
  let i = 1;
  while (i < arr.length && arr[i] <= target) i *= 2;
  return binarySearchBounded(arr, target, Math.floor(i/2), Math.min(i, arr.length-1));
}
function binarySearchBounded(arr, target, l, r) {
  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    if (arr[m] === target) return m;
    if (arr[m] < target) l = m + 1; else r = m - 1;
  }
  return -1;
}`,
      java: `public static int exponentialSearch(int[] arr, int target) {
  if (arr.length == 0) return -1;
  if (arr[0] == target) return 0;
  int i = 1;
  while (i < arr.length && arr[i] <= target) i *= 2;
  return binarySearchBounded(arr, target, i/2, Math.min(i, arr.length - 1));
}
private static int binarySearchBounded(int[] arr, int target, int l, int r) {
  while (l <= r) {
    int m = (l + r) >>> 1;
    if (arr[m] == target) return m;
    if (arr[m] < target) l = m + 1; else r = m - 1;
  }
  return -1;
}`,
      cpp: `#include <vector>
using namespace std;

int binarySearchBounded(const vector<int>& a, int x, int l, int r) {
  while (l <= r) {
    int m = l + (r - l) / 2;
    if (a[m] == x) return m;
    if (a[m] < x) l = m + 1; else r = m - 1;
  }
  return -1;
}
int exponentialSearch(const vector<int>& a, int x) {
  if (a.empty()) return -1;
  if (a[0] == x) return 0;
  int i = 1;
  while (i < (int)a.size() && a[i] <= x) i *= 2;
  return binarySearchBounded(a, x, i/2, min(i, (int)a.size()-1));
}`,
      py: `def exponential_search(arr, target):
  if not arr: return -1
  if arr[0] == target: return 0
  i = 1
  while i < len(arr) and arr[i] <= target:
    i *= 2
  return binary_search_bounded(arr, target, i//2, min(i, len(arr)-1))

def binary_search_bounded(arr, target, l, r):
  while l <= r:
    m = (l + r) // 2
    if arr[m] == target: return m
    if arr[m] < target: l = m + 1
    else: r = m - 1
  return -1`,
    },
    steps: [
      { explanation: "Grow index exponentially to bracket the target." },
      { explanation: "Binary search inside that bracket." },
    ],
  },
};

const CodeExplanation = ({ algorithm, isVisible, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1000);
  const [lang, setLang] = useState("js");
  const [copied, setCopied] = useState(false);
  const intervalRef = useRef(null);

  const currentAlgorithm = ALGO[algorithm];
  const codeForLang = currentAlgorithm?.code?.[lang] || "";
  const steps = useMemo(() => currentAlgorithm?.steps || [], [currentAlgorithm]);
  const totalSteps = steps.length;

  // Precompute code lines with stable keys (avoid array index as key)
  const codeLines = useMemo(() => {
    const counts = new Map();
    return codeForLang.split("\n").map((line, i) => {
      const c = counts.get(line) || 0;
      counts.set(line, c + 1);
      return { line, number: i + 1, key: `${line}__${c}` };
    });
  }, [codeForLang]);

  // derive highlight line based on highlight snippet for lang
  const highlightLine = useMemo(() => {
    const snippet = steps[currentStep]?.highlight?.[lang];
    return computeHighlightLine(codeForLang, snippet);
  }, [codeForLang, currentStep, lang, steps]);

  const nextStep = useCallback(() => {
    setCurrentStep((s) => Math.min(s + 1, totalSteps - 1));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 0));
  }, []);

  const resetSteps = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(codeForLang);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = codeForLang;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error('Failed to copy code:', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  }, [codeForLang]);

  const togglePlayback = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    setIsPlaying(true);
    let step = currentStep;
    intervalRef.current = setInterval(() => {
      if (step < totalSteps - 1) {
        step++;
        setCurrentStep(step);
      } else {
        setIsPlaying(false);
        clearInterval(intervalRef.current);
      }
    }, playbackSpeed);
  }, [isPlaying, currentStep, totalSteps, playbackSpeed]);

  // stop autoplay if lang changes
  useEffect(() => {
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [lang]);

  // Stop autoplay when hidden or on unmount
  useEffect(() => {
    if (!isVisible && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsPlaying(false);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isVisible]);

  // keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isVisible) return;
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          prevStep();
          break;
        case "ArrowRight":
          nextStep();
          break;
        case " ":
          e.preventDefault();
          togglePlayback();
          break;
        case "r":
        case "R":
          resetSteps();
          break;
        default:
          break;
      }
    };
    if (isVisible) document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isVisible, onClose, prevStep, nextStep, togglePlayback, resetSteps]);

  if (!isVisible || !currentAlgorithm) return null;

  return (
    <div className="code-explanation-overlay">
      <div className="code-explanation-modal">
        {/* Header */}
        <div className="code-explanation-header">
          <h2>{currentAlgorithm.title}</h2>
          <button className="close-button" onClick={onClose} aria-label="Close code explanation modal">✖</button>
        </div>

        <div className="code-explanation-content">
          {/* Description */}
          <div className="algorithm-description">
            <p>{currentAlgorithm.description}</p>
          </div>

          {/* Language Tabs */}
          <div className="lang-tabs" role="tablist" aria-label="Code languages">
            {LANGS.map((L) => (
              <button
                key={L.key}
                onClick={() => setLang(L.key)}
                className={`lang-tab ${lang === L.key ? "active" : ""}`}
                role="tab"
                aria-selected={lang === L.key}
                aria-controls={`code-block-${L.key}`}
              >
                {L.label}
              </button>
            ))}
          </div>

          {/* Code Block */}
          <div className="code-section">
            <div className="code-section-header">
              <h3>Algorithm Code</h3>
              <button 
                onClick={copyToClipboard} 
                className={`copy-code-button ${copied ? 'copied' : ''}`}
                aria-label={copied ? "Code copied!" : "Copy code to clipboard"}
                title={copied ? "Copied!" : "Copy code"}
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="code-block">
              <pre id={`code-block-${lang}`}>
                <code>
                  {codeLines.map(({ line, number, key }) => {
                    const isCurrentLine = highlightLine === number;
                    return (
                      <div key={key} className={`code-line ${isCurrentLine ? "current-line" : ""}`}>
                        <span className="line-number">{number}</span>
                        <span className="line-text">{line}</span>
                      </div>
                    );
                  })}
                </code>
              </pre>
            </div>
          </div>

          {/* Step Explanation */}
          <div className="step-explanation-section">
            <h3>Step-by-Step Explanation</h3>

            <div className="step-controls">
              <button onClick={prevStep} disabled={currentStep === 0} aria-label="Previous step">⏮ Prev</button>
              <button onClick={togglePlayback} aria-label={isPlaying ? "Pause playback" : "Start playback"}>
                {isPlaying ? "⏸ Pause" : "▶ Play"}
              </button>
              <button onClick={nextStep} disabled={currentStep === totalSteps - 1} aria-label="Next step">Next ⏭</button>
              <button onClick={resetSteps} aria-label="Reset steps">🔄 Reset</button>
            </div>

            {/* Playback Speed */}
            <div className="playback-speed">
              <label htmlFor="playbackSpeedRange">Speed:</label>
              <input
                id="playbackSpeedRange"
                type="range"
                min="500"
                max="3000"
                step="100"
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(parseInt(e.target.value, 10))}
              />
              <span>{playbackSpeed} ms</span>
            </div>

            {/* Progress */}
            <div className="step-progress">
              <span>
                Step {currentStep + 1} of {totalSteps}
              </span>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: totalSteps ? `${((currentStep + 1) / totalSteps) * 100}%` : "0%",
                  }}
                />
              </div>
            </div>

            {/* Current Step Box */}
            {steps[currentStep] && (
              <div className="current-step">
                <div className="step-header">
                  <span className="step-explanation">
                    {steps[currentStep].explanation}
                  </span>
                </div>
                {steps[currentStep]?.highlight?.[lang] && (
                  <div className="step-code">
                    <pre>
                      <code>{steps[currentStep].highlight[lang]}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}

            <div className="keyboard-shortcuts">
              ⌨️ <b>Shortcuts:</b> ← → Navigate | Space Play/Pause | R Reset | Esc Close
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeExplanation;

CodeExplanation.propTypes = {
  algorithm: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

CodeExplanation.defaultProps = {
  isVisible: false,
};
