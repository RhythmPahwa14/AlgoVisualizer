import React, { useState } from "react";

import "../../../styles/fundamentals.css";
import IntroSection from "./sections/IntroSection";
import SyntaxSection from "./sections/SyntaxSection";
import DataTypesSection from "./sections/DataTypesSection";
import VariablesSection from "./sections/VariablesSection";
import OperatorsSection from "./sections/OperatorsSection";
import ControlFlowSection from "./sections/ControlFlowSection";
import FunctionsSection from "./sections/FunctionsSection";
import OOPSection from "./sections/OOPSection";
import TemplatesSection from "./sections/TemplatesSection";
import STLSection from "./sections/STLSection";
import FileHandlingSection from "./sections/FileHandlingSection";
import ExampleCodeSection from "./sections/ExampleCodeSection";
import PointersSection from "./sections/PointersSection";
import DynamicMemorySection from "./sections/DynamicMemorySection";
import ExceptionHandlingSection from "./sections/ExceptionHandlingSection";
import MultithreadingSection from "./sections/MultithreadingSection";

const CppFundamentals = () => {
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
    { id: "intro", label: "Introduction", component: <IntroSection /> },
    { id: "syntax", label: "Syntax", component: <SyntaxSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "datatypes", label: "Data Types", component: <DataTypesSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "variables", label: "Variables", component: <VariablesSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "operators", label: "Operators", component: <OperatorsSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "control", label: "Control Flow", component: <ControlFlowSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "functions", label: "Functions", component: <FunctionsSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "oop", label: "OOP Concepts", component: <OOPSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "templates", label: "Templates", component: <TemplatesSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "stl", label: "STL", component: <STLSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "filehandling", label: "File Handling", component: <FileHandlingSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "examples", label: "Example Code", component: <ExampleCodeSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "pointers", label: "Pointers", component: <PointersSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "memory", label: "Dynamic Memory", component: <DynamicMemorySection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "exceptions", label: "Exception Handling", component: <ExceptionHandlingSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "multithreading", label: "Multithreading", component: <MultithreadingSection copyCode={copyCode} copiedCode={copiedCode} /> },
  ];

  return (
    <div className="notes-page"  style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto", color:'white-300'} }>
      {/* Header */}
      <header
        style={{
          textAlign: "center",
          marginBottom: "3rem",
          padding: "2rem 0",
          background: "linear-gradient(135deg, #4f46e5, #4338ca)",
          color: "white",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(79, 70, 229, 0.3)"
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", fontWeight: 800 }}>
          C++ Fundamentals
        </h1>
        <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto", opacity: 0.9,
           color: window.matchMedia('(prefers-color-scheme: dark)').matches
      ? "#ffffff"  // text color for dark mode
      : "#1a1a1a", // text color for light mode
         }}>
          A comprehensive guide to C++ programming for beginners. Learn core concepts with detailed explanations and examples.
        </p>
      </header>

      {/* Navigation */}
      <nav
        style={{
          position: "relative",
          top: "2rem",
          background:  "var(--card-bg, #ffffff)",
          borderRadius: "12px",
          padding: "1.5rem",
          boxShadow: "0 6px 18px rgba(16,24,40,0.04)",
          marginBottom: "4rem"
        }}
      >
        <h3 style={{ marginTop: 0, color: "var(--text-primary)" }}>
          <i className="fas fa-bookmark" style={{ marginRight: "0.5rem", color: "#4f46e5" }}></i>
          Contents
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              style={{
                background: activeTab === section.id ? "#4f46e5" : "transparent",
                color: activeTab === section.id ? "white" : "#4f46e5",
                border: "2px solid #4f46e5",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.3s ease"
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

export default CppFundamentals;
