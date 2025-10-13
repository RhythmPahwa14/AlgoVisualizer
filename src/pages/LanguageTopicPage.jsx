import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";

// This map contains the data for your language topics
const notesMap = {
  java: [
    { name: "Fundamentals", path: "/notes/java/fundamentals" },
    { name: "Variables & Data Types", path: "/notes/java/variables-and-data-types" },
  ],
  python: [
    { name: "Fundamentals", path: "/notes/python/fundamentals" },
    { name: "Variables & Data Types", path: "/notes/python/variables-and-data-types" },
  ],
  cpp: [
    { name: "Fundamentals", path: "/notes/cpp/fundamentals" },
    { name: "Variables & Data Types", path: "/notes/cpp/variables-and-data-types" },
  ],
  c: [
    { name: "Fundamentals", path: "/notes/c/fundamentals" },
  ],
  javascript: [
    { name: "Fundamentals", path: "/notes/javascript/fundamentals" },
    { name: "Variables & Data Types", path: "/notes/javascript/variables-and-data-types" },
  ],
  rust: [
    { name: "Fundamentals", path: "/notes/rust/fundamentals" },
  ],
  // You can add MERN here if it has its own topic pages
  mern: [
      { name: "MERN Fundamentals", path: "/notes/MERN/MERNFundamentals" }
  ]
};

const LanguageTopicPage = () => {
  // 1. Get the language from the URL (e.g., "java", "python")
  const { language } = useParams();

  // 2. If the language isn't in our map, redirect to the home page
  if (!notesMap[language]) {
    return <Navigate to="/" replace />;
  }

  // 3. Get the correct list of topics
  const topics = notesMap[language];

  // 4. Display the list of topics as links
  return (
    <div className="container py-5" style={{ maxWidth: "800px" }}>
      <h1 className="text-center mb-4 text-capitalize">
        {language} Notes
      </h1>
      <ul className="list-group">
        {topics.map((topic, idx) => (
          <li key={idx} className="list-group-item p-0 mb-3 border-0">
            <Link
              to={topic.path}
              className="d-block p-3 text-decoration-none bg-light rounded shadow-sm"
            >
              {topic.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageTopicPage;