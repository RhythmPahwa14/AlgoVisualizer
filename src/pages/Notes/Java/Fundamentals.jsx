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

import GenericsSection from "./sections/GenericsSection";
import MultithreadingSection from "./sections/MultithreadingSection";
import ConcurrencySection from "./sections/ConcurrencySection";
import LambdasStreamsSection from "./sections/LambdasStreamsSection";
import FunctionalInterfacesSection from "./sections/FunctionalInterfacesSection";
import RegexSection from "./sections/RegexSection";
import JDBCSection from "./sections/JDBCSection";
import DataStructuresSection from "./sections/DataStructuresSection";
import Abstract from "./sections/Abstract";
import Feature from "./sections/Feature";
import Annotations from "./sections/Annotations";
import AccessModifiers from "./sections/AccessModifiers";

import "../../../styles/notesSideBar.css";
import "../../../styles/fundamentals.css";
import { FaChevronDown, FaChevronRight, FaBook, FaBars, FaTimes  } from "react-icons/fa";

// sideBar content
const JavaSidebar = ({
  isOpen,
  onClose,
  onSelectTopic,
  activeTopic,
  sections,
}) => { 
  const [openCategory, setOpenCategory] = useState("intro");

  const toggleCategory = (title) => {
    setOpenCategory(openCategory === title ? null : title);
  };

  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose}></div>}
      <aside className={`sidebar ${isOpen ? "open" : "close"}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">
            <FaBook className="mr-2 text-indigo-400" /> Java Topics
          </h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {sections.map((section) => (
          <div key={section.title} className="mb-3">
            {/* --- Main Section --- */}
            <button
              onClick={() => toggleCategory(section.title)}
              className="flex !text-gray-50 justify-between items-center   text-left text-sm font-semibold w-50 px-3 py-2 rounded-md hover:bg-indigo-700/30 transition"
            >
              <span className="!text-gray-50">{section.title}</span>
              {openCategory === section.title ? (
                <FaChevronDown size={14} />
              ) : (
                <FaChevronRight size={14} />
              )}
            </button>

            {/* --- Sub Topics --- */}
            {openCategory === section.title && (
              <ul className="mt-1 ml-3 space-y-1 border-l border-gray-700 pl-3">
                {section.topics.map((topic, i) => {
                  const topicId = topic.id || `topic-${i}`;
                  const label = topic.label || topic;
                  return (
                    <li key={topicId}>
                      <button
                        onClick={() => onSelectTopic(topicId)}
                        className={`w-40 !text-gray-50 text-left text-sm mx-3.5 px-6 py-1.5 rounded-md hover:bg-indigo-600/30 transition ${
                          activeTopic === topicId
                            ? "bg-indigo-600/40 text-indigo-300"
                            : "text-gray-200"
                        }`}
                      >
                        {label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </aside>
    </>
  );
};

const Fundamentals = () => {
  const [activeTab, setActiveTab] = useState("intro");
  const [copiedCode, setCopiedCode] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const copyCode = async (code, identifier) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(identifier);
      setTimeout(() => setCopiedCode(""), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };
  
  // topics section
  const sections = [
    {
      title: "Core Java",
      topics: [
        {
          id: "intro",
          label: "Introduction",
          component: (
            <IntroSection copyCode={copyCode} copiedCode={copiedCode} />
          ),
        },
        {
          id:"features",
          label:"Features",
          component:(
            <Feature copyCode={copyCode} copiedCode={copiedCode}/>
          )
        },
        {
          id: "setup",
          label: "Setup",
          component: (
            <SetupSection copyCode={copyCode} copiedCode={copiedCode} />
          ),
        },
        {
          id: "syntax",
          label: "Syntax",
          component: (
            <SyntaxSection copyCode={copyCode} copiedCode={copiedCode} />
          ),
        },
        {
          id: "datatypes",
          label: "Data Types",
          component: (
            <DataTypesSection copyCode={copyCode} copiedCode={copiedCode} />
          ),
        },
        {
          id: "variables",
          label: "Variables",
          component: (
            <VariablesSection copyCode={copyCode} copiedCode={copiedCode} />
          ),
        },
        {
          id: "operators",
          label: "Operators",
          component: (
            <OperatorsSection copyCode={copyCode} copiedCode={copiedCode} />
          ),
        },
        {
          id: "control",
          label: "Control Flow",
          component: (
            <ControlFlowSection copyCode={copyCode} copiedCode={copiedCode} />
          ),
        },
        {
          id: "methods",
          label: "Methods",
          component: (
            <MethodsSection copyCode={copyCode} copiedCode={copiedCode} />
          ),
        },
        {
          id: "strings",
          label: "Strings",
          component: (
            <StringsSection copyCode={copyCode} copiedCode={copiedCode} />
          ),
        },
        {
          id: "arrays",
          label: "Arrays",
          component: (
            <ArraysSection copyCode={copyCode} copiedCode={copiedCode} />
          ),
        },
        {
          id: "loops",
          label: "Loops",
          component: (
            <LoopsSection copyCode={copyCode} copiedCode={copiedCode} />
          ),
        },  
      ],
    },
    {
      title: "OOP Concepts",
      topics: [
        {
          id: "oop",
          label: "OOP Concepts",
          component: <OOPSection copyCode={copyCode} copiedCode={copiedCode} />,
        },
        {
          id: "classes",
          label: "Classes/Objects",
          component: (
            <ClassesSection copyCode={copyCode} copiedCode={copiedCode} />
          ),
        },
        {
          id: "inheritance",
          label: "Inheritance",
          component: (
            <InheritanceSection copyCode={copyCode} copiedCode={copiedCode} />
          ),
        },
        {
          id: "polymorphism",
          label: "Polymorphism",
          component: (
            <PolymorphismSection copyCode={copyCode} copiedCode={copiedCode} />
          ),
        },
        {
          id: "encapsulation",
          label: "Encapsulation",
          component: (
            <EncapsulationSection copyCode={copyCode} copiedCode={copiedCode} />
          ),
        },
        {
          id: "constructors",
          label: "Constructors",
          component: (
            <ConstructorsSection copyCode={copyCode} copiedCode={copiedCode} />
          ),
        },
        {
          id: "abstract",
          label: "Abstract",
          component: <Abstract copyCode={copyCode} copiedCode={copiedCode} />,
        },
        {
          id: "accessmodifiers",
          label: "Access Modifiers",
          component: <AccessModifiers copyCode={copyCode} copiedCode={copiedCode} />,
        },
      ],
    },
    {
      title: "Advanced Java",
      topics: [
        {
          id: "packages",
          label: "Packages",
          component: (
            <PackagesSection copyCode={copyCode} copiedCode={copiedCode} />
          ),
        },
        {
          id: "exceptions",
          label: "Exceptions",
          component: (
            <ExceptionsSection copyCode={copyCode} copiedCode={copiedCode} />
          ),
        },
        {
          id: "collections",
          label: "Collections",
          component: (
            <CollectionsSection copyCode={copyCode} copiedCode={copiedCode} />
          ),
        },
        {
          id: "generics",
          label: "Generics",
          component: (
            <GenericsSection copyCode={copyCode} copiedCode={copiedCode} />
          ),
        }, 
        {
           id: "annotations",
          label: "Annotations",
          component: (
            <Annotations copyCode={copyCode} copiedCode={copiedCode} />
          ), 
        },
        //   "Wrapper Classes",
        //   "Varargs",
        //   "Enum",
      ],
    },
    {
      title: "Multithreading",
      topics: [
        {
          id: "multithreading",
          label: "Multithreading",
          component: (
            <MultithreadingSection
              copyCode={copyCode}
              copiedCode={copiedCode}
            />
          ),
        },
        {
          id: "concurrency",
          label: "Concurrency",
          component: (
            <ConcurrencySection copyCode={copyCode} copiedCode={copiedCode} />
          ),
        },

        {
          id: "jdbc",
          label: "JDBC",
          component: (
            <JDBCSection copyCode={copyCode} copiedCode={copiedCode} />
          ),
        },
        {
          id: "datastructures",
          label: "Data Structures",
          component: (
            <DataStructuresSection
              copyCode={copyCode}
              copiedCode={copiedCode}
            />
          ),
        },
        //   "Thread Lifecycle",
        //   "Creating Threads",
        //   "Synchronization",
        //   "Inter-thread Communication",
        //   "Executors & Thread Pools",
      ],
    },
    {
      title: "I/O and File Handling",
      topics: [
        {
          id: "filehandling",
          label: "File Handling",
          component: (
            <FileHandlingSection copyCode={copyCode} copiedCode={copiedCode} />
          ),
        },
        //   "Streams (Byte & Character)",
        //   "BufferedReader / Writer",
        //   "Serialization & Deserialization",
        //   "NIO Package",
      ],
    },
    {
      title: "Modern Java",
      topics: [
        {
          id: "lambdasstreams",
          label: "Lambdas & Streams",
          component: (
            <LambdasStreamsSection
              copyCode={copyCode}
              copiedCode={copiedCode}
            />
          ),
        },
        {
          id: "functionalinterfaces",
          label: "Functional Interfaces",
          component: (
            <FunctionalInterfacesSection
              copyCode={copyCode}
              copiedCode={copiedCode}
            />
          ),
        },
        {
          id: "regex",
          label: "Regular Expressions",
          component: (
            <RegexSection copyCode={copyCode} copiedCode={copiedCode} />
          ),
        },
        //   "Streams API",
        //   "Optional Class",
        //   "Method References",
      ],
    },
  ];

  const getActiveComponent = () => {
    for (const section of sections) {
      const topic = section.topics.find((t) => t.id === activeTab);
      if (topic?.component) return topic.component;
    }
    return <p className="text-gray-400">Select a topic to view notes.</p>;
  };

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
          background: "linear-gradient(135deg, #4f46e5, #4338ca)",
          color: "white",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(79, 70, 229, 0.3)",
        }}
      >
        <h1 className="funda-header" 
        >
          Java Fundamentals
        </h1>
        <p className="funda-desc"
        >
          A comprehensive guide to Java programming for beginners. Learn core
          concepts with detailed explanations and runnable examples you can
          copy.
        </p>
      </header> 

      {/* sideBar */}
      <JavaSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSelectTopic={setActiveTab}
        activeTopic={activeTab}
        sections={sections}
      />

      {/* Section Renderer */}
      <main className="main-content">
        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
          <FaBars />
        </button>
        {/* <div className="content">{getActiveComponent()}</div> */}
        <div style={{ marginTop: "1rem" }}>{getActiveComponent()}</div>
      </main>

      {/* <style jsx>{`
        .notes-page {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6; 
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
      `}</style> */}
    </div>
  );
};

export default Fundamentals;
