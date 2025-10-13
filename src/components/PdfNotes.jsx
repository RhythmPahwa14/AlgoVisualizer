import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";

// This map now ONLY contains the 4 languages you have notes for.
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
};

const LanguageTopicPage = () => {
  const { language } = useParams();

  // If the language isn't in our map, redirect to the main notes page
  if (!notesMap[language]) {
    return <Navigate to="/notes" replace />;
  }

  const topics = notesMap[language];

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 text-capitalize fw-bold">
          {language} Topics
        </h1>
        <p className="lead text-muted">Select a topic to start learning.</p>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="list-group">
            {topics.map((topic, idx) => (
              <Link
                key={idx}
                to={topic.path}
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-3 mb-2 shadow-sm rounded"
              >
                <span className="fw-bold">{topic.name}</span>
                <i className="fas fa-chevron-right text-muted"></i>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageTopicPage;