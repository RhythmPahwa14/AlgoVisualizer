import React, { useState } from "react";
import IntroSection from "./sections/IntroSection";
import SetupSection from "./sections/SetupSection";
import SyntaxSection from "./sections/SyntaxSection";
import DataTypesSection from "./sections/DataTypesSection";
import VariablesSection from "./sections/VariablesSection";
import OperatorsSection from "./sections/OperatorsSection";
import ControlFlowSection from "./sections/ControlFlowSection";
import FunctionsSection from "./sections/FunctionsSection";
import OOPSection from "./sections/OOPSection";
import ExamplesSection from "./sections/ExamplesSection";
import FilesSection from "./sections/FilesSection";
import IteratorsSection from "./sections/IteratorsSection";
import ModulesSection from "./sections/ModulesSection";
import DSASection from "./sections/DSASection";
import NumpySection from "./sections/NumpySection";
import MultithreadingSection from "./sections/MultithreadingSection";

const PythonFundamentals = () => {
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
    { id: "functions", label: "Functions", component: <FunctionsSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "oop", label: "OOP Concepts", component: <OOPSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "examples", label: "Example Code", component: <ExamplesSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "files", label: "Files & Exceptions", component: <FilesSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "iterators", label: "Iterators & Generators", component: <IteratorsSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "modules", label: "Modules & Packages", component: <ModulesSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "dsa", label: "Python for DSA", component: <DSASection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "numpy", label: "NumPy & Pandas", component: <NumpySection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "multithreading", label: "Multithreading & Multiprocessing", component: <MultithreadingSection copyCode={copyCode} copiedCode={copiedCode} /> },
  ];

  return (
    <div className="notes-page" style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <header
        style={{
          textAlign: "center",
          marginBottom: "3rem",
          padding: "2rem 0",
          background: "#ffffff",
          color: "#000000",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
          border: "1px solid rgba(0, 0, 0, 0.12)"
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", fontWeight: 800 }}>Python Fundamentals</h1>
        <p style={{
          fontSize: "1.2rem",
          maxWidth: "700px",
          margin: "0 auto",
          opacity: 0.9,
          color: window.matchMedia('(prefers-color-scheme: dark)').matches ? "#ffffff" : "#1a1a1a"
        }}>
          A comprehensive guide to Python programming for beginners. Learn core concepts with detailed explanations and examples.
        </p>
      </header>

      {/* Navigation Tabs */}
      <nav style={{
        position: "sticky",
        top: "2rem",
        background: "var(--card-bg, #ffffff)",
        borderRadius: "12px",
        padding: "1.5rem",
        boxShadow: "0 6px 18px rgba(16,24,40,0.04)",
        marginBottom: "2rem"
      }}>
        <h3 style={{ marginTop: 0, color: "#0f172a" }}>
          <i className="fas fa-bookmark" style={{ marginRight: "0.5rem", color: "#000000" }}></i>
          Contents
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {sections.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                background: activeTab === item.id ? "#000000" : "transparent",
                color: activeTab === item.id ? "#ffffff" : "#000000",
                border: "2px solid #000000",
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

      {/* Styles */}
      <style jsx>{`
        .notes-page { font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #374151; }
        .card { background: var(--card-bg, #ffffff); border-radius: 12px; box-shadow: 0 6px 18px rgba(16, 24, 40, 0.04); border: 1px solid rgba(15, 23, 42, 0.03); padding: 1.5rem; margin-bottom: 2rem; transition: all 0.3s ease; }
        .card:hover { transform: translateY(-5px); box-shadow: 0 12px 25px rgba(16, 24, 40, 0.1); }
        h2 { color: var(--code-text, #1e293b); margin-bottom: 1rem; font-weight: 700; display: flex; align-items: center; gap: 0.5rem; }
        h3 { color: #000000; margin: 1.5rem 0 0.5rem; font-weight: 600; }
        .code-container { position: relative; margin: 1.5rem 0; border-radius: 12px; overflow: hidden; }
        .code-container pre { background: var(--code-bg, #0b1220); color: var(--code-text, #f8fafc); padding: 1.5rem; overflow-x: auto; border-radius: 12px; font-family: "Courier New", monospace; line-height: 1.5; font-size: 0.95rem; }
        p { color: var(--code-text, #374151); }
        .copy-btn { position: absolute; top: 0.75rem; right: 0.75rem; background: #111111; color: #ffffff; border: 1px solid #111111; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-size: 0.85rem; transition: all 0.3s ease; backdrop-filter: blur(10px); }
        .copy-btn:hover { background: #000000; color: #ffffff; }
        .copy-btn.copied { background: #111111; color: #ffffff; }
        code { background-color: #f3f4f6; color: #111111; padding: 0.2rem 0.4rem; border-radius: 4px; font-family: "Courier New", monospace; font-size: 0.9rem; }
        ul { padding-left: 1.5rem; margin-bottom: 1rem; color: var(--code-text, #374151); }
        li { color: var(--code-text, #374151); margin-bottom: 0.5rem; }
        strong { color: var(--code-text, #374151); }
      `}</style>
    </div>
  );
};

export default PythonFundamentals;
