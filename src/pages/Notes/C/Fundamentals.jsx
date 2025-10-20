import React, { useState } from "react";
import "../../../styles/fundamentals.css";
import IntroSection from "./sections/IntroSection";
import DataTypesSection from "./sections/DataTypesSection";
import OperatorsSection from "./sections/OperatorsSection";
import ControlFlowSection from "./sections/ControlFlowSection";
import FunctionsSection from "./sections/FunctionsSection";
import ArraysSection from "./sections/ArraysSection";
import PointersSection from "./sections/PointersSection";
import StructuresSection from "./sections/StructuresSection";
import FileHandlingSection from "./sections/FileHandlingSection";
import DynamicMemorySection from "./sections/DynamicMemorySection";
import ExampleCodeSection from "./sections/ExampleCodeSection";


const CFundamentals = () => {
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
    { id: "intro", label: "Introduction & Program Structure", component: <IntroSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "datatypes", label: "Data Types, Variables, Constants", component: <DataTypesSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "operators", label: "Operators", component: <OperatorsSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "control", label: "Conditional Statements & Loops", component: <ControlFlowSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "functions", label: "Functions & Recursion", component: <FunctionsSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "arrays", label: "Arrays & Strings", component: <ArraysSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "pointers", label: "Pointers", component: <PointersSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "structures", label: "Structures & Unions", component: <StructuresSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "filehandling", label: "File Handling", component: <FileHandlingSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "memory", label: "Dynamic Memory Allocation", component: <DynamicMemorySection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "examples", label: "Example Code", component: <ExampleCodeSection copyCode={copyCode} copiedCode={copiedCode} /> }
  ];

  return (
    <div className="notes-page" style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
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
          C Fundamentals
        </h1>
        <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto", opacity: 0.9,
           color: window.matchMedia('(prefers-color-scheme: dark)').matches
      ? "#ffffff"  // text color for dark mode
      : "#1a1a1a", // text color for light mode
         }}>
          A complete guide to the basics of C programming with structured explanations and examples.
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
          {sections.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                background: activeTab === item.id ? "#4f46e5" : "transparent",
                color: activeTab === item.id ? "white" : "#4f46e5",
                border: "2px solid #4f46e5",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Section Renderer */}
      <div style={{ marginTop: "1rem" }}>
        {sections.find((s) => s.id === activeTab)?.component}
      </div>
 
    </div>
  );
};

export default CFundamentals;
