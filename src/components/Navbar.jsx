import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BarChart3,
  Search,
  Database,
  GitBranch,
  Users,
  Trophy,
  Settings,
  X,
  ChevronDown,
  BookOpen,
  Cpu,
  Code,
  Hash,
  Zap,
  Gamepad,
  TreeDeciduous,
  Type,
  Menu,
} from "lucide-react";

import { useTheme } from "../ThemeContext";
import AOS from "aos";
import "aos/dist/aos.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();
  const navbarRef = useRef(null);

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsMobileMenuOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigationItems = [
    { path: "/", icon: Home, label: "Home" },
    {
      label: "Sorting",
      icon: BarChart3,
      dropdown: [
        { path: "/sorting", label: "Overview" },
        { path: "/components/AlgorithmComparison", label: "Algorithm Comparison" },
      ],
    },
    {
      label: "Searching",
      icon: Search,
      dropdown: [
        { path: "/searchingOverview", label: "Overview" },
        { path: "/searching", label: "Searching Algorithm" },
      ],
    },
    {
      label: "Data Structures",
      icon: Database,
      dropdown: [
        { path: "/data-structures", label: "Overview" },
        { path: "/data-structures/linked-list", label: "Linked List" },
        { path: "/data-structures/queue", label: "Queue visualization" },
        { path: "/data-structures/stack", label: "Stack visualization" },
        { path: "/binary-tree", label: "Binary Tree visualization" },
      ],
    },
    {
      label: "Graph",
      icon: GitBranch,
      dropdown: [
        { path: "/graph", label: "Overview" },
        { path: "/graph/bfs", label: "BFS" },
        { path: "/graph/dfs", label: "DFS" },
        { path: "/graph/dijkstra", label: "Dijkstra" },
        { path: "/graph/comparison", label: "Graph Comparison" },
      ],
    },
    {
      label: "Backtracking",
      icon: BookOpen,
      dropdown: [
        { path: "/backtracking-overview", label: "Overview" },
        { path: "/backtracking", label: "Algorithms" },
      ],
    },
    {
      label: "Dynamic Programming",
      icon: Cpu,
      dropdown: [
        { path: "/dp-overview", label: "Overview" },
        { path: "/dp", label: "Algorithms" },
      ],
    },
    {
      label: "Hashing",
      icon: Hash,
      dropdown: [
        { path: "/hashing-overview", label: "Overview" },
        { path: "/hashing", label: "Algorithms" },
      ],
    },
    {
      label: "Greedy Algorithms",
      icon: Zap,
      dropdown: [
        { path: "/greedy-overview", label: "Overview" },
        { path: "/greedy", label: "Algorithms" },
      ],
    },
    {
      label: "Divide & Conquer",
      icon: Code,
      dropdown: [
        { path: "/dc-overview", label: "Overview" },
        { path: "/dc", label: "Algorithms" },
      ],
    },
    {
      label: "Trees",
      icon: TreeDeciduous,
      dropdown: [
        { path: "/tree-overview", label: "Overview" },
        { path: "/tree", label: "Algorithms" },
      ],
    },
    {
      label: "Strings",
      icon: Type,
      dropdown: [
        { path: "/string-overview", label: "Overview" },
        { path: "/string", label: "Algorithms" },
      ],
    },
    {
      label: "Game Search",
      icon: Gamepad,
      dropdown: [
        { path: "/game-search-overview", label: "Overview" },
        { path: "/game-search", label: "Algorithms" },
      ],
    },
    {
      label: "Branch & Bound",
      icon: BookOpen,
      dropdown: [
        { path: "/branchbound-overview", label: "Overview" },
        { path: "/branchbound", label: "Algorithms" },
      ],
    },
    { path: "/quiz", icon: Trophy, label: "Quiz" },
    {
      label: "Community",
      icon: Users,
      dropdown: [
        { path: "/community", label: "Overview" },
        { path: "/contributors", label: "Contributors" },
        { path: "/ContributorLeaderboard", label: "Leaderboard" },
      ],
    },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleDropdownToggle = (index) => {
    setIsDropdownOpen(isDropdownOpen === index ? null : index);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav
        className={`navbar ${theme}`}
        ref={navbarRef}
        data-aos="fade-down"
        data-aos-duration="1000"
      >
        <div className="navbar-container">
          {/* Mobile Header Row */}
          {isMobile && (
            <div
              className="navbar-header"
              data-aos="fade-down"
              data-aos-duration="1000"
            >
              <Link to="/" className="navbar-logo">
                <img
                  src="/logo.jpg"
                  alt="AlgoVisualizer Logo"
                  className="logo-img"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <span className="logo-text">
                  Algo<span>Visualizer</span>
                </span>
              </Link>

              <div className="mobile-header-buttons">
                <Link
                  to="/settings"
                  className={`mobile-settings-btn ${
                    isActive("/settings") ? "active" : ""
                  }`}
                >
                  <Settings size={20} />
                </Link>

                <button
                  className="mobile-menu-button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          )}

          {/* Desktop Logo */}
          {!isMobile && (
            <Link to="/" className="navbar-logo">
              <img
                src="/logo.jpg"
                alt="AlgoVisualizer Logo"
                className="logo-img"
                onError={(e) => (e.target.style.display = "none")}
              />
              <span className="logo-text">
                Algo<span>Visualizer</span>
              </span>
            </Link>
          )}

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="navbar-menu">
              {navigationItems.map((item, index) =>
                item.dropdown ? (
                  <div key={index} className="navbar-item dropdown">
                    <button
                      className={`dropdown-toggle ${
                        isDropdownOpen === index ? "active" : ""
                      }`}
                      onClick={() => handleDropdownToggle(index)}
                    >
                      <item.icon size={18} className="drop-icon" />
                      <span>{item.label}</span>
                      <ChevronDown
                        size={16}
                        className={`dropdown-arrow ${
                          isDropdownOpen === index ? "rotated" : ""
                        }`}
                      />
                    </button>
                    {isDropdownOpen === index && (
                      <div className="dropdown-menu">
                        {item.dropdown.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.path}
                            className={`dropdown-item ${
                              isActive(subItem.path) ? "active" : ""
                            }`}
                            onClick={() => setIsDropdownOpen(null)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={index}
                    to={item.path}
                    className={`navbar-link ${
                      isActive(item.path) ? "active" : ""
                    }`}
                  >
                    <item.icon size={18} className="icon" />
                    <span>{item.label}</span>
                  </Link>
                )
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && (
          <div
            className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}
            data-aos="fade-right"
            data-aos-duration="400"
          >
            <div className="mobile-menu-header">
              <div className="mobile-menu-header-content">
                <h3 className="mobile-menu-title">
                  <Database size={18} />
                  Navigation
                </h3>
                <button
                  className="mobile-menu-close-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="mobile-menu-subtitle">
                Explore algorithms & data structures
              </p>
            </div>

            <div className="mobile-menu-content">
              {navigationItems.map((item, index) =>
                item.dropdown ? (
                  <div key={index} className="mobile-dropdown">
                    <button
                      className={`mobile-dropdown-toggle ${
                        isDropdownOpen === index ? "active" : ""
                      }`}
                      onClick={() => handleDropdownToggle(index)}
                    >
                      <item.icon size={18} />
                      <span>{item.label}</span>
                      <ChevronDown
                        size={16}
                        className={`dropdown-arrow ${
                          isDropdownOpen === index ? "rotated" : ""
                        }`}
                      />
                    </button>
                    {isDropdownOpen === index && (
                      <div className="mobile-dropdown-menu">
                        {item.dropdown.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.path}
                            className={`mobile-dropdown-item ${
                              isActive(subItem.path) ? "active" : ""
                            }`}
                            onClick={() => {
                              setIsDropdownOpen(null);
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={index}
                    to={item.path}
                    className={`mobile-menu-link ${
                      isActive(item.path) ? "active" : ""
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                )
              )}
            </div>
          </div>
        )}

        {/* Backdrop */}
        {isMobileMenuOpen && (
          <div
            className="navbar-backdrop"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </nav>
    </>
  );
};

export default Navbar;
