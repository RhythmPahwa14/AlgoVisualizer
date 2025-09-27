// src/components/BinaryTree/utils/bst.js

/**
 * Steps consumed by the visualizer:
 * { type: "focus", nodeId }
 * { type: "visit", nodeId }
 * { type: "apply", snapshot: root }
 */

export function cloneTree(node) {
  if (!node) return null;
  const n = { id: node.id, val: node.val, left: null, right: null };
  n.left = cloneTree(node.left);
  n.right = cloneTree(node.right);
  return n;
}

export function findBST(root, value) {
  const steps = [];
  let cur = root;
  while (cur) {
    steps.push({ type: "focus", nodeId: cur.id });
    if (value === cur.val) return { found: true, steps };
    cur = value < cur.val ? cur.left : cur.right;
  }
  return { found: false, steps };
}

export function insertBST(root, makeNode, value) {
  const steps = [];
  if (!root) {
    const newRoot = makeNode(value);
    steps.push({ type: "apply", snapshot: cloneTree(newRoot) });
    return { rootAfter: newRoot, steps };
  }

  const newRoot = cloneTree(root);
  let cur = newRoot;

  while (true) {
    steps.push({ type: "focus", nodeId: cur.id });
    if (value === cur.val) {
      // no duplicates; still apply to “flash”
      steps.push({ type: "apply", snapshot: cloneTree(newRoot) });
      return { rootAfter: newRoot, steps };
    }
    if (value < cur.val) {
      if (cur.left) {
        cur = cur.left;
      } else {
        cur.left = makeNode(value);
        steps.push({ type: "apply", snapshot: cloneTree(newRoot) });
        return { rootAfter: newRoot, steps };
      }
    } else {
      if (cur.right) {
        cur = cur.right;
      } else {
        cur.right = makeNode(value);
        steps.push({ type: "apply", snapshot: cloneTree(newRoot) });
        return { rootAfter: newRoot, steps };
      }
    }
  }
}

export function deleteBST(root, value) {
  const steps = [];
  const newRoot = cloneTree(root);

  function minNode(n) {
    while (n.left) n = n.left;
    return n;
  }

  function _del(n) {
    if (!n) return null;
    steps.push({ type: "focus", nodeId: n.id });
    if (value < n.val) {
      n.left = _del(n.left);
      return n;
    }
    if (value > n.val) {
      n.right = _del(n.right);
      return n;
    }
    // found node
    if (!n.left && !n.right) return null;
    if (!n.left) return n.right;
    if (!n.right) return n.left;

    // two children: replace with inorder successor
    const succ = minNode(n.right);
    n.val = succ.val;
    n.right = _del(n.right, succ.val);
    return n;
  }

  const result = _del(newRoot);
  steps.push({ type: "apply", snapshot: cloneTree(result) });
  return { rootAfter: result, steps };
}
