import React, { useState } from "react";
import IntroSection from "./sections/IntroSection";
import DataTypesSection from "./sections/DataTypesSection";
import FunctionsSection from "./sections/FunctionsSection";
import ObjectsSection from "./sections/ObjectsSection";
import OperatorsSection from "./sections/OperatorsSection";
import DOMManipulationSection from "./sections/DOMManipulationSection";
import AsyncProgrammingSection from "./sections/AsyncProgrammingSection";
import ModernJavaScriptSection from "./sections/ModernJavaScriptSection";
// import "../../../styles/fundamentals.css";
import MongodbSection from "./sections/MongodbSection";
const Fundamentals = () => {
  const [activeTab, setActiveTab] = useState("intro");
  const [copiedCode, setCopiedCode] = useState("");

  const copyCode = async (code, identifier) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(identifier);
      setTimeout(() => setCopiedCode(""), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const sections = [
    {
      id: "intro",
      label: "Introduction",
      component: <IntroSection copyCode={copyCode} copiedCode={copiedCode} />,
    },
    {
      id: "datatypes",
      label: "Data Types",
      component: (
        <DataTypesSection copyCode={copyCode} copiedCode={copiedCode} />
      ),
    },
    {
      id: "functions",
      label: "Functions",
      component: (
        <FunctionsSection copyCode={copyCode} copiedCode={copiedCode} />
      ),
    },
    {
      id: "objects",
      label: "Objects & Arrays",
      component: <ObjectsSection copyCode={copyCode} copiedCode={copiedCode} />,
    },
    {
      id: "operators",
      label: "Operators",
      component: <OperatorsSection copyCode={copyCode} copiedCode={copiedCode} />,
    },
    {
      id: "dom",
      label: "DOM Manipulation",
      component: <DOMManipulationSection copyCode={copyCode} copiedCode={copiedCode} />,
    },
    {
      id: "async",
      label: "Async Programming",
      component: <AsyncProgrammingSection copyCode={copyCode} copiedCode={copiedCode} />,
    },
    {
      id: "es6",
      label: "Modern JavaScript",
      component: <ModernJavaScriptSection copyCode={copyCode} copiedCode={copiedCode} />,
    },
    {
      id: "mongodb",
      label: "MongoDB Basics",
      component: <MongodbSection copyCode={copyCode} copiedCode={copiedCode} />,
    },
  ];

  return (
    <div
      className="notes-page"
      style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}
    >
      {/* Header */}
      <header
        style={{
          textAlign: "center",
          marginBottom: "3rem",
          padding: "2rem 0",
          background: "linear-gradient(135deg, #f59e0b, #eab308)",
          color: "white",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(245, 158, 11, 0.3)",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", fontWeight: 800 }}>
          JavaScript Fundamentals
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            maxWidth: "700px",
            margin: "0 auto",
            opacity: 0.9,
          }}
        >
          Master the language of the web with comprehensive examples and
          interactive learning.
        </p>
      </header>

      {/* Navigation */}
      <nav
        style={{
          position: "relative",
          top: "2rem",
          background: "var(--card-bg, #ffffff)",
          borderRadius: "12px",
          padding: "1.5rem",
          boxShadow: "0 6px 18px rgba(16,24,40,0.04)",
          marginBottom: "4rem",
        }}
      >
        <h3 style={{ marginTop: 0, color: "var(--text-primary)" }}>
          <i
            className="fas fa-bookmark"
            style={{ marginRight: "0.5rem", color: "#f59e0b" }}
          ></i>
          Contents
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              style={{
                background:
                  activeTab === section.id ? "#f59e0b" : "transparent",
                color: activeTab === section.id ? "white" : "#f59e0b",
                border: "2px solid #f59e0b",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {section.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content Sections */}
      {sections.find((section) => section.id === activeTab)?.component}
    </div>
  );
};

export default Fundamentals;
