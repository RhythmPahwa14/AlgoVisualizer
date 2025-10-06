import React, { useState } from "react";
import IntroSection from "./sections/IntroSection";
import SetupSection from "./sections/SetupSection";
import SyntaxSection from "./sections/SyntaxSection";
import DataTypesSection from "./sections/DataTypesSection";
import VariablesSection from "./sections/VariablesSection";
import OperatorsSection from "./sections/OperatorsSection";
import ControlFlowSection from "./sections/ControlFlowSection";
import MethodsSection from "./sections/MethodsSection";
import OOPSection from "./sections/OOPSection";
import StringsSection from "./sections/StringsSection";
import ArraysSection from "./sections/ArraysSection";
import LoopsSection from "./sections/LoopsSection";
import ClassesSection from "./sections/ClassesSection";
import InheritanceSection from "./sections/InheritanceSection";
import PolymorphismSection from "./sections/PolymorphismSection";
import EncapsulationSection from "./sections/EncapsulationSection";
import ConstructorsSection from "./sections/ConstructorsSection";
import ExceptionsSection from "./sections/ExceptionsSection";
import CollectionsSection from "./sections/CollectionsSection";
import InterfacesSection from "./sections/InterfacesSection";
import PackagesSection from "./sections/PackagesSection";
import FileHandlingSection from "./sections/FileHandlingSection";

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
    { id: "intro", label: "Introduction", component: <IntroSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "setup", label: "Setup", component: <SetupSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "syntax", label: "Syntax", component: <SyntaxSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "datatypes", label: "Data Types", component: <DataTypesSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "variables", label: "Variables", component: <VariablesSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "operators", label: "Operators", component: <OperatorsSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "control", label: "Control Flow", component: <ControlFlowSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "methods", label: "Methods", component: <MethodsSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "oop", label: "OOP Concepts", component: <OOPSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "strings", label: "Strings", component: <StringsSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "arrays", label: "Arrays", component: <ArraysSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "loops", label: "Loops", component: <LoopsSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "classes", label: "Classes/Objects", component: <ClassesSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "inheritance", label: "Inheritance", component: <InheritanceSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "polymorphism", label: "Polymorphism", component: <PolymorphismSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "encapsulation", label: "Encapsulation", component: <EncapsulationSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "constructors", label: "Constructors", component: <ConstructorsSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "exceptions", label: "Exceptions", component: <ExceptionsSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "collections", label: "Collections", component: <CollectionsSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "interfaces", label: "Interfaces", component: <InterfacesSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "packages", label: "Packages", component: <PackagesSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "filehandling", label: "File Handling", component: <FileHandlingSection copyCode={copyCode} copiedCode={copiedCode} /> },
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
          boxShadow: "0 10px 25px rgba(79, 70, 229, 0.3)",
        }}
      >

        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", fontWeight: 800 }}>
          Java Fundamentals
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            maxWidth: "700px",
            margin: "0 auto",
            opacity: 0.9,
             color: window.matchMedia('(prefers-color-scheme: dark)').matches
      ? "#ffffff"  // text color for dark mode
      : "#1a1a1a", // text color for light mode
          }}
        >
          A comprehensive guide to Java programming for beginners. Learn core
          concepts with detailed explanations and examples.

        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", fontWeight: 800 }}>Java Fundamentals</h1>
        <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto", opacity: 0.9 }}>
          A comprehensive guide to Java programming for beginners. Learn core concepts with detailed explanations and runnable examples you can copy.

        </p>
      </header>

      {/* Navigation Tabs */}
      <nav
        style={{
          position: "sticky",
          top: "2rem",
          background: "var(--card-bg, #ffffff)",
          borderRadius: "12px",
          padding: "1.5rem",
          boxShadow: "0 6px 18px rgba(16,24,40,0.04)",
          marginBottom: "2rem",
        }}
      >
        <h3 style={{ marginTop: 0, color: "#0f172a" }}>
          <i className="fas fa-bookmark" style={{ marginRight: "0.5rem", color: "#4f46e5" }}></i>
          Contents
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {sections.map((item) => (
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
                transition: "all 0.3s ease",
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

      <style jsx>{`
        .notes-page {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #374151;
        }

        .card {
          background: var(--card-bg, #ffffff);
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(16, 24, 40, 0.04);
          border: 1px solid rgba(15, 23, 42, 0.03);
          padding: 1.5rem;
          margin-bottom: 2rem;
          transition: all 0.3s ease;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 25px rgba(16, 24, 40, 0.1);
        }

        h2 {
          color: var(--code-text, #1e293b);
          margin-bottom: 1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        h3 {
          color: #4f46e5;
          margin: 1.5rem 0 0.5rem;
          font-weight: 600;
        }

        .code-container {
          position: relative;
          margin: 1.5rem 0;
          border-radius: 12px;
          overflow: hidden;
        }

        .code-container pre {
          background: var(--code-bg, #0b1220);
          color: var(--code-text, #f8fafc);
          padding: 1.5rem;
          overflow-x: auto;
          border-radius: 12px;
          font-family: "Courier New", monospace;
          line-height: 1.5;
          font-size: 0.95rem;
        }

        p {
          color: var(--code-text, #374151);
        }

        .copy-btn {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: rgba(255, 255, 255, 0.1);
          color: var(--code-text, #374151);
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .copy-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .copy-btn.copied {
          background: #10b981;
        }

        code {
          background-color: #e0e7ff;
          color: #4338ca;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: "Courier New", monospace;
          font-size: 0.9rem;
        }

        ul {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
          color: var(--code-text, #374151);
        }

        li {
          color: var(--code-text, #374151);
          margin-bottom: 0.5rem;
        }

        strong {
          color: var(--code-text, #374151);
        }
      `}</style>
    </div>
  );
};

export default Fundamentals;
