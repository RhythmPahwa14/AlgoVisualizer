// src/algorithms/binarySearchTree.js

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(data) {
    const newNode = new Node(data);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this._insertNode(this.root, newNode);
    }
  }

  _insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) node.left = newNode;
      else this._insertNode(node.left, newNode);
    } else {
      if (node.right === null) node.right = newNode;
      else this._insertNode(node.right, newNode);
    }
  }

  delete(data) {
    this.root = this._deleteNode(this.root, data);
  }

  _deleteNode(node, data) {
    if (node === null) return null;
    if (data < node.data) {
      node.left = this._deleteNode(node.left, data);
      return node;
    }
    if (data > node.data) {
      node.right = this._deleteNode(node.right, data);
      return node;
    }
    if (node.left === null && node.right === null) return null;
    if (node.left === null) return node.right;
    if (node.right === null) return node.left;

    const successor = this._findMinNode(node.right);
    node.data = successor.data;
    node.right = this._deleteNode(node.right, successor.data);
    return node;
  }

  _findMinNode(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }
}

export function getBstSteps(op, tree, { data }) {
  const steps = [];
  let current = tree.root;

  const addStep = (node, desc, line) => {
    steps.push({
      tree: JSON.parse(JSON.stringify(tree)), // Snapshot of the tree state
      node: node ? { data: node.data } : null, // Node to highlight
      description: desc,
      pseudoLine: line,
      operation: op,
    });
  };

  const tempTree = JSON.parse(JSON.stringify(tree));
  const tempBst = new BinarySearchTree();

  const buildTree = (node) => {
    if (!node) return null;
    const newNode = { data: node.data, left: null, right: null };
    newNode.left = buildTree(node.left);
    newNode.right = buildTree(node.right);
    return newNode;
  };
  tempBst.root = buildTree(tempTree.root);

  if (op === "insert" && data !== undefined) {
    addStep(current, `Starting insert for value ${data}.`, 0);
    current = tempBst.root;
    while (current) {
      if (data < current.data) {
        addStep(current, `${data} < ${current.data}, moving left.`, 2);
        if (current.left === null) break;
        current = current.left;
      } else {
        addStep(current, `${data} >= ${current.data}, moving right.`, 5);
        if (current.right === null) break;
        current = current.right;
      }
    }

    const finalTree = new BinarySearchTree();
    finalTree.root = buildTree(tree.root);
    finalTree.insert(data);
    steps.push({
      tree: JSON.parse(JSON.stringify(finalTree)),
      description: `Node ${data} inserted.`,
    });
  }

  if (op === "search") {
    addStep(current, `Searching for value ${data}.`, 0);
    while (current) {
      addStep(current, `Comparing with ${current.data}.`, 1);
      if (data === current.data) {
        addStep(current, `Value ${data} found!`, 2);
        return steps;
      }
      if (data < current.data) {
        addStep(current, `${data} < ${current.data}, moving left.`, 3);
        current = current.left;
      } else {
        addStep(current, `${data} > ${current.data}, moving right.`, 5);
        current = current.right;
      }
    }
    addStep(null, `Value ${data} not found.`, 1);
  }

  if (op === "delete" && data !== undefined) {
    addStep(tree.root, `Attempting to delete node with value ${data}.`, 0);
    const finalTree = new BinarySearchTree();
    finalTree.root = buildTree(tree.root);
    finalTree.delete(data);
    steps.push({
      tree: JSON.parse(JSON.stringify(finalTree)),
      description: `Node ${data} deleted.`,
    });
  }

  return steps;
}

export const BST_PSEUDOCODE = {
  insert: [
    {
      code: "function insert(node, data)",
      explain: "Start insertion from a given node.",
    },
    {
      code: "  if node is null, return new Node(data)",
      explain: "If the current spot is empty, place the new node here.",
    },
    {
      code: "  if data < node.data",
      explain: "If the new value is smaller...",
    },
    {
      code: "    node.left = insert(node.left, data)",
      explain: "...recursively insert into the left subtree.",
    },
    { code: "  else", explain: "If the new value is larger or equal..." },
    {
      code: "    node.right = insert(node.right, data)",
      explain: "...recursively insert into the right subtree.",
    },
  ],
  search: [
    {
      code: "function search(node, data)",
      explain: "Start searching from a given node.",
    },
    {
      code: "  if node is null or node.data == data",
      explain: "If the spot is empty or we found the value, stop.",
    },
    { code: "    return node", explain: "Return the result." },
    {
      code: "  if data < node.data",
      explain: "If the value we want is smaller...",
    },
    {
      code: "    return search(node.left, data)",
      explain: "...search in the left subtree.",
    },
    { code: "  else", explain: "If the value we want is larger..." },
    {
      code: "    return search(node.right, data)",
      explain: "...search in the right subtree.",
    },
  ],
  delete: [
    {
      code: "function delete(node, data)",
      explain: "Find the node to delete.",
    },
    {
      code: "  // Handle node with 0 or 1 child",
      explain:
        "If the node has one or no children, replace it with its child or null.",
    },
    {
      code: "  // Handle node with 2 children",
      explain: "If the node has two children...",
    },
    {
      code: "  successor = findMin(node.right)",
      explain: "...find the smallest value in its right subtree.",
    },
    {
      code: "  node.data = successor.data",
      explain: "Replace the node's data with the successor's.",
    },
    {
      code: "  node.right = delete(node.right, successor.data)",
      explain: "Delete the successor from the right subtree.",
    },
  ],
};
