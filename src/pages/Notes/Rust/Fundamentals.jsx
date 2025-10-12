import React, { useState } from "react";
import IntroSection from "./sections/IntroSection";
import SetupSection from "./sections/SetupSection";
import SyntaxSection from "./sections/SyntaxSection";
import DataTypesSection from "./sections/DataTypesSection";
import VariablesSection from "./sections/VariablesSection";
import OwnershipSection from "./sections/OwnershipSection";
import ControlFlowSection from "./sections/ControlFlowSection";
import FunctionsSection from "./sections/FunctionsSection";
import StructsSection from "./sections/StructsSection";
import EnumsSection from "./sections/EnumsSection";
import PatternMatchingSection from "./sections/PatternMatchingSection";
import ErrorHandlingSection from "./sections/ErrorHandlingSection";
import TraitsSection from "./sections/TraitsSection";
import CollectionsSection from "./sections/CollectionsSection";
import ConcurrencySection from "./sections/ConcurrencySection";
import CargoSection from "./sections/CargoSection";
import Feature from "./sections/Feature";

const RustFundamentals = () => {
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
    { id: "features", label: "Features", component: <Feature copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "setup", label: "Setup", component: <SetupSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "syntax", label: "Syntax", component: <SyntaxSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "datatypes", label: "Data Types", component: <DataTypesSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "variables", label: "Variables", component: <VariablesSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "functions", label: "Functions", component: <FunctionsSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "control", label: "Control Flow", component: <ControlFlowSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "ownership", label: "Ownership", component: <OwnershipSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "structs", label: "Structs", component: <StructsSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "enums", label: "Enums", component: <EnumsSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "pattern-matching", label: "Pattern Matching", component: <PatternMatchingSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "error-handling", label: "Error Handling", component: <ErrorHandlingSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "traits", label: "Traits", component: <TraitsSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "collections", label: "Collections", component: <CollectionsSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "concurrency", label: "Concurrency", component: <ConcurrencySection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "cargo", label: "Cargo", component: <CargoSection copyCode={copyCode} copiedCode={copiedCode} /> },
  ];

  return (
    <div className="notes-page" style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <header
        style={{
          textAlign: "center",
          marginBottom: "3rem",
          padding: "2rem 0",
          background: "linear-gradient(135deg, #f97316, #ea580c)",
          color: "white",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(249, 115, 22, 0.3)"
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", fontWeight: 800 }}>
          🦀 Rust Fundamentals
        </h1>
        <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto", opacity: 0.9 }}>
          A comprehensive guide to Rust programming. Learn systems programming with memory safety, zero-cost abstractions, and fearless concurrency.
        </p>
      </header>

      {/* Navigation */}
      <nav
        style={{
          position: "sticky",
          top: "2rem",
          background: "var(--card-bg, #ffffff)",
          borderRadius: "12px",
          padding: "1.5rem",
          boxShadow: "0 6px 18px rgba(16,24,40,0.04)",
          marginBottom: "2rem"
        }}
      >
        <h3 style={{ marginTop: 0, color: "#0f172a" }}>
          <i className="fas fa-bookmark" style={{ marginRight: "0.5rem", color: "#f97316" }}></i>
          Contents
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              style={{
                background: activeTab === section.id ? "#f97316" : "transparent",
                color: activeTab === section.id ? "white" : "#f97316",
                border: "2px solid #f97316",
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
      {sections.find(section => section.id === activeTab)?.component}
    </div>
  );
};

export default RustFundamentals;