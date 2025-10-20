import React, { useState } from "react";
import IntroSection from "./sections/IntroSection";
import RoutingSection from "./sections/RoutingSection";
import ApiRoutesSection from "./sections/ApiRoutesSection";
import MiddlewareSection from "./sections/MiddlewareSection";
import OptimizationSection from "./sections/OptimizationSection";
import BestPracticesSection from "./sections/BestPracticesSection";
import { useTheme } from "../../../ThemeContext";

const Fundamentals = () => {
  const [activeTab, setActiveTab] = useState("intro");
  const [copiedCode, setCopiedCode] = useState("");
  const {theme} = useTheme();

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
      id: "routing",
      label: "File-based Routing",
      component: <RoutingSection copyCode={copyCode} copiedCode={copiedCode} />,
    },
    {
      id: "api-routes",
      label: "API Routes",
      component: <ApiRoutesSection copyCode={copyCode} copiedCode={copiedCode} />,
    },
    {
      id: "middleware",
      label: "Middleware",
      component: <MiddlewareSection copyCode={copyCode} copiedCode={copiedCode} />,
    },
    {
      id: "optimization",
      label: "Optimization",
      component: <OptimizationSection copyCode={copyCode} copiedCode={copiedCode} />,
    },
    {
      id: "best-practices",
      label: "Best Practices",
      component: <BestPracticesSection copyCode={copyCode} copiedCode={copiedCode} />,
    },
  ];

  return (
    <div
      className="notes-page"
      style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}
    >
      {/* Header */}
      <header
      className={`${theme === 'dark' ? 'bg-gradient-to-r from-gray-950 via-gray-800 to-gray-300' :'bg-gradient-to-r from-gray-300 via-gray-400 to-gray-200'}`}
        style={{
          textAlign: "center",
          marginBottom: "3rem",
          padding: "2rem 0", 
          color: "white",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)", 
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", fontWeight: 800}}>
          Next.js Fundamentals
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            maxWidth: "700px",
            margin: "0 auto",
            opacity: 0.9,
          }}
        >
          Learn Next.js - the React framework for production with built-in features
          for performance, SEO, and developer experience.
        </p>
      </header>

      {/* Navigation */}
      <nav
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginBottom: "2rem",
          justifyContent: "center",
        }}
      >
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveTab(section.id)}
            className={`${activeTab === section.id ? '!bg-blue-950 !text-gray-50' : '!bg-gray-800 !text-gray-50'}`}
            style={{
              padding: "0.75rem 1.5rem",
              border: "none",
              borderRadius: "8px", 
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease",
              fontSize: "0.9rem",
            }}
          >
            {section.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main
        className={`${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}`}
        style={{ 
          borderRadius: "12px",
          padding: "2rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          minHeight: "500px",
        }}
      >
        {sections.find((s) => s.id === activeTab)?.component}
      </main>
    </div>
  );
};

export default Fundamentals;
