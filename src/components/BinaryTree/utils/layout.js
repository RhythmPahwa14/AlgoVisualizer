// src/components/BinaryTree/utils/layout.js

/**
 * Simple tidy layout:
 * - x via inorder index
 * - y via depth
 * Returns { nodes, links, viewBox }
 */
export function layoutTree(root) {
  if (!root) {
    return { nodes: [], links: [], viewBox: [-50, -50, 100, 100] };
  }

  const nodes = [];
  const rawLinks = [];
  let idx = 0;
  const xGap = 48;
  const yGap = 70;
  let minX = Infinity;
  let maxX = -Infinity;

  function markDepth(n, d = 0) {
    if (!n) return;
    markDepth(n.left, d + 1);
    n._depth = d;
    markDepth(n.right, d + 1);
  }
  markDepth(root, 0);

  function inorder(n) {
    if (!n) return;
    inorder(n.left);

    const x = idx * xGap;
    const y = n._depth * yGap;
    idx += 1;
    nodes.push({ id: n.id, val: n.val, x, y, _ref: n });
    if (n.left) rawLinks.push({ source: n, target: n.left });
    if (n.right) rawLinks.push({ source: n, target: n.right });

    if (x < minX) minX = x;
    if (x > maxX) maxX = x;

    inorder(n.right);
  }
  inorder(root);

  const byId = new Map(nodes.map((n) => [n.id, n]));
  const links = rawLinks.map((l) => ({
    source: byId.get(l.source.id),
    target: byId.get(l.target.id),
  }));

  const pad = 60;
  const minY = 0;
  const maxY = Math.max(...nodes.map((n) => n.y), 0);
  const width = (maxX - minX) + pad * 2 + 1;
  const height = (maxY - minY) + pad * 2 + 1;
  const shiftX = pad - minX;
  const shiftY = pad - minY;

  nodes.forEach((n) => { n.x += shiftX; n.y += shiftY; });

  return { nodes, links, viewBox: [0, 0, width, height] };
}
