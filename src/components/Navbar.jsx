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
  Menu,
  X,
  ChevronDown,
  BookOpen,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useTheme } from "../ThemeContext";
import logo from "/public/logo.jpg";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const location = useLocation();
  const { theme } = useTheme();

  const navbarRef = useRef(null); // added ref to the navbar

  const navigationItems = [
    { path: "/", icon: Home, label: "Home" },
    {
      label: "Sorting",
      icon: BarChart3,
      dropdown: [
        { path: "/sorting", label: "Overview" },
        {
          path: "/components/AlgorithmComparison",
          label: "Algorithm Comparison",
        },
      ],
    },
    {
      label: "Searching",
      icon: Search,
      dropdown: [
        { path: "/searching", label: "Overview" },
        { path: "/searching/comparison", label: "Algorithm Comparison" },
      ],
    },
    {
      label: "Data Structures",
      icon: Database,
      dropdown: [
        { path: "/data-structures", label: "Overview" },
        { path: "/data-structures/linked-list", label: "Linked List" },
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
    { path: "/quiz", icon: Trophy, label: "Quiz" },
    { path: "/blog", icon: BookOpen, label: "Blog" },
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="navbar" ref={navbarRef}>
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <img src={logo} alt="AlgoVisualizer Logo" className="logo-img" />
            <span className="logo-text">
              Algo<span>Visualizer</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-menu">
            {navigationItems.map((item, index) => (
              <div key={index} className="navbar-item">
                {item.dropdown ? (
                  <div className="dropdown">
                    <button
                      className={`dropdown-toggle ${
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
                    to={item.path}
                    className={`navbar-link ${
                      isActive(item.path) ? "active" : ""
                    }`}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Auth Actions */}
          <div className="navbar-auth">
            <Link to="/signin" className="auth-link signin">
              <LogIn size={18} />
              <span>Sign In</span>
            </Link>
            <Link to="/signup" className="auth-link signup">
              <UserPlus size={18} />
              <span>Sign Up</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
          {navigationItems.map((item, index) => (
            <div key={index} className="mobile-menu-item">
              {item.dropdown ? (
                <div className="mobile-dropdown">
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
                  to={item.path}
                  className={`mobile-menu-link ${
                    isActive(item.path) ? "active" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          ))}
          
          {/* Mobile Auth Links */}
          <div className="mobile-auth-section">
            <Link
              to="/signin"
              className="mobile-auth-link signin"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LogIn size={18} />
              <span>Sign In</span>
            </Link>
            <Link
              to="/signup"
              className="mobile-auth-link signup"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <UserPlus size={18} />
              <span>Sign Up</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="navbar-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
