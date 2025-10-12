// src/pages/NotesPage.jsx
import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";

// Map of languages to topics and their paths
const notesMap = {
  java: [
    { name: "Fundamentals", path: "/notes/java/fundamentals" },
    { name: "Variables & Data Types", path: "/notes/java/variables-and-data-types" },
    // Add more Java topics here
  ],
  python: [
    { name: "Fundamentals", path: "/notes/python/fundamentals" },
    { name: "Variables & Data Types", path: "/notes/python/variables-and-data-types" },
    { name: "Basics", path: "/notes/python/basics" },
    // Add more Python topics here
  ],
  cpp: [
    { name: "Fundamentals", path: "/notes/cpp/fundamentals" },
    { name: "Variables & Data Types", path: "/notes/cpp/variables-and-data-types" },
    // Add more C++ topics here
  ],
  c: [
    { name: "Fundamentals", path: "/notes/c/fundamentals" },
    // Add more C topics here
  ],
  javascript: [
    { name: "Fundamentals", path: "/notes/javascript/fundamentals" },
    { name: "Variables & Data Types", path: "/notes/javascript/variables-and-data-types" },
    // Add more JavaScript topics here
  ],
  rust: [
    { name: "Fundamentals", path: "/notes/rust/fundamentals" },
    // Add more Rust topics here
  ],
};

const NotesPage = () => {
  const { language } = useParams();

  // If language is invalid, redirect to home
  if (!notesMap[language]) {
    return <Navigate to="/" replace />;
  }

  const topics = notesMap[language];

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "#4f46e5",
          textTransform: "capitalize",
        }}
      >
        {language} Notes
      </h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {topics.map((topic, idx) => (
          <li key={idx} style={{ marginBottom: "1rem" }}>
            <Link
              to={topic.path}
              style={{
                textDecoration: "none",
                padding: "1rem",
                display: "block",
                background: "#f3f4f6",
                borderRadius: "6px",
                color: "#111827",
                fontWeight: "500",
              }}
            >
              {topic.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesPage;
