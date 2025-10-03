// src/pages/TreePage.jsx
import React, { useState } from "react";
import TreeVisualizer from "../components/TreeVisualizer";
import { treeAlgorithms } from "../data/allCodes"; // nested structure
import "../styles/global-theme.css";

const TreePage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("inorder"); // default traversal

  // Flatten the nested treeAlgorithms for easier access
  const algorithmData = {
    ...treeAlgorithms.binaryTreeTraversals,
    ...treeAlgorithms.bstOperations
  }[selectedAlgorithm] || {};

  const displayName = {
    preorder: "Preorder Traversal",
    inorder: "Inorder Traversal",
    postorder: "Postorder Traversal",
    levelOrder: "Level Order Traversal",
    insert: "BST Insert",
    search: "BST Search",
    deleteNode: "BST Delete"
  };

  // ✅ Add explanation mapping
  const explanations = {
    preorder:
      "Preorder traversal visits the root node first, then recursively traverses the left subtree, followed by the right subtree. Order: Root → Left → Right.",
    inorder:
      "Inorder traversal first traverses the left subtree, then visits the root node, and finally traverses the right subtree. Order: Left → Root → Right. For BSTs, this yields sorted order.",
    postorder:
      "Postorder traversal first traverses the left subtree, then the right subtree, and visits the root node last. Order: Left → Right → Root.",
    levelOrder:
      "Level order traversal visits nodes level by level from top to bottom, left to right. It uses a queue internally.",
    insert:
      "BST Insert places a new value into the correct position such that the left child is smaller and the right child is larger than the parent.",
    search:
      "BST Search compares the target with the root; if smaller, search continues in the left subtree, else in the right subtree. Efficient in O(log n) for balanced BSTs.",
    deleteNode:
      "BST Delete removes a node from the tree. It has 3 cases: deleting a leaf node, deleting a node with one child, and deleting a node with two children (replace with inorder successor or predecessor)."
  };

  return (
    <div className="theme-container">
      <h1 className="theme-title">Tree Algorithm Visualizer</h1>
      <p
        style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "-2rem auto 2rem auto",
          color: "var(--theme-text-secondary)",
        }}
      >
        Use the visualizer below to explore how tree algorithms work step-by-step. You can load examples or experiment with different traversal methods.
      </p>

      <TreeVisualizer
        defaultAlgorithm={selectedAlgorithm}
        autoLoadExample={true}
      />

      {/* Algorithm Selector */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          justifyContent: "center",
          margin: "1rem 0",
          flexWrap: "wrap",
        }}
      >
        {Object.keys({
          ...treeAlgorithms.binaryTreeTraversals,
          ...treeAlgorithms.bstOperations,
        }).map((algo) => (
          <button
            key={algo}
            className={`btn ${
              selectedAlgorithm === algo ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setSelectedAlgorithm(algo)}
          >
            {displayName[algo] || algo}
          </button>
        ))}
      </div>

      {/* ✅ Explanation Section */}
      <div className="theme-card" style={{ marginTop: "1.5rem" }}>
        <div className="theme-card-header">
          <h3>Explanation</h3>
        </div>
        <p
          style={{
            margin: "1rem 0 0 0",
            color: "var(--text-secondary)",
            lineHeight: "1.6",
          }}
        >
          {explanations[selectedAlgorithm]}
        </p>
      </div>

      {/* Code Implementation */}
      <div className="theme-card" style={{ marginTop: "2rem" }}>
        <div className="theme-card-header">
          <h3>Tree Algorithm - Code Implementation</h3>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {["java", "python", "cpp", "javascript"].map((lang) => (
              <button
                key={lang}
                className={`btn ${
                  selectedLanguage === lang ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => setSelectedLanguage(lang)}
                style={{ fontSize: "0.9rem", padding: "0.5rem 1rem" }}
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "var(--surface-bg)",
            borderRadius: "8px",
            padding: "1.5rem",
            overflow: "auto",
            maxHeight: "500px",
          }}
        >
          <pre
            style={{
              margin: 0,
              fontFamily: 'Consolas, Monaco, "Courier New", monospace',
              fontSize: "0.9rem",
              lineHeight: "1.5",
              color: "var(--text-primary)",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            <code>{algorithmData[selectedLanguage]}</code>
          </pre>
        </div>

        <div
          style={{
            marginTop: "1rem",
            padding: "0.75rem",
            background: "var(--accent-warning-bg)",
            borderRadius: "6px",
            fontSize: "0.9rem",
            color: "var(--text-secondary)",
          }}
        >
          <strong>Note:</strong> This is the implementation code for{" "}
          <strong>{displayName[selectedAlgorithm]}</strong> in{" "}
          <strong>{selectedLanguage.toUpperCase()}</strong>.
        </div>
      </div>
    </div>
  );
};

export default TreePage;
