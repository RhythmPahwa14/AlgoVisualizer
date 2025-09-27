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
  Type,
  ChevronDown,
  BookOpen,
  Cpu,
  Code,
  Hash,
  Zap,
  Gamepad,
  TreeDeciduous,
  Menu,
} from "lucide-react";
import { useTheme } from "../ThemeContext";
import { navbarNavigationItems } from "../utils/navigation";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const location = useLocation();
  const { theme } = useTheme();
  const navbarRef = useRef(null);
  const searchRef = useRef(null);

  // Map string icon names to actual icon components
  const getIconComponent = (iconName) => {
    const iconMap = {
      Home,
      BarChart3,
      Search,
      Database,
      GitBranch,
      Users,
      Trophy,
      Settings,
      Type,
      BookOpen,
      Cpu,
      Code,
      Hash,
      Zap,
      Gamepad,
      TreeDeciduous,
      Menu,
    };
    return iconMap[iconName] || null;
  };

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
      label: "Game Search",
      icon: Gamepad, // You can import an appropriate icon from lucide-react
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

    { path: "/editor", icon: Code, label: "Code Editor" }, // ✅ New Feature


     {
    label: "Strings",
    icon: Type, // choose any appropriate icon
    dropdown: [
      { path: "/string-overview", label: "Overview" },
      { path: "/string", label: "Algorithms" },
    ],
  },

    { path: "/quiz", icon: Trophy, label: "Quiz" },

    { path: "/settings", icon: Settings, label: "Settings" },
  ];


  const isActive = (path) => location.pathname === path;

  const handleDropdownToggle = (index) => {
    setIsDropdownOpen(isDropdownOpen === index ? null : index);
  };

  // Handle live search
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }

    const results = [];
    navbarNavigationItems.forEach((item) => {
      if (item.label.toLowerCase().includes(query.toLowerCase()) && item.path) {
        results.push({ path: item.path, label: item.label });
      }
      if (item.dropdown) {
        item.dropdown.forEach((subItem) => {
          if (subItem.label.toLowerCase().includes(query.toLowerCase())) {
            results.push({ path: subItem.path, label: subItem.label });
          }
        });
      }
    });

    setSearchResults(results);
    setIsSearchOpen(results.length > 0);
  };

  // Close dropdowns & search on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsDropdownOpen(null);
        setFilteredResults([]);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔎 Live Search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredResults([]);
      return;
    }

    const results = [];
    navigationItems.forEach((item) => {
      if (item.dropdown) {
        item.dropdown.forEach((subItem) => {
          if (subItem.label.toLowerCase().includes(searchTerm.toLowerCase())) {
            results.push(subItem);
          }
        });
      } else {
        if (item.label.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push(item);
        }
      }
    });
    setFilteredResults(results);
  }, [searchTerm]);

  return (


    <>
      <nav
        className={`navbar ${theme}`}
        ref={navbarRef}
        data-aos="fade-down"
        data-aos-duration="1000"
      >
        <div className="navbar-container">
          {/* Mobile Header */}
          {isMobile && (
            <div className="navbar-header" data-aos="fade-down" data-aos-duration="1000">
              <Link to="/" className="navbar-logo">
                <img src="/logo.jpg" alt="AlgoVisualizer Logo" className="logo-img" />
                <span className="logo-text">
                  Algo<span>Visualizer</span>
                </span>
              </Link>

    <nav
      className={`navbar ${theme}`}
      ref={navbarRef}
      data-aos="fade-down"
      data-aos-duration="1000"
    >

    <nav className={`navbar ${theme}`} ref={navbarRef}>

      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src="/logo.jpg" alt="AlgoVisualizer Logo" className="logo-img" />
          <span className="logo-text">
            Algo<span>Visualizer</span>
          </span>
        </Link>


        {/* Search Bar */}
        <div className="navbar-search" ref={searchRef}>
          <input
            type="text"
            placeholder="Search algorithms..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button
              className="clear-btn"
              onClick={() => {
                setSearchQuery("");
                setSearchResults([]);
                setIsSearchOpen(false);
              }}
            >
              <X size={16} />
            </button>
          )}
          <Search size={18} className="search-icon" />
          {isSearchOpen && (
            <div className="search-results">
              {searchResults.map((item, index) => (
                <Link

                  to="/settings"
                  className={`mobile-settings-btn ${isActive("/settings") ? "active" : ""}`}

                  key={index}
                  to={item.path}
                  className="search-result-item"
                  onClick={() => setIsSearchOpen(false)}

                >
                  {item.label}
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
              <img src="/logo.jpg" alt="AlgoVisualizer Logo" className="logo-img" />
              <span className="logo-text">
                Algo<span>Visualizer</span>
              </span>
            </Link>
          )}

          {/* Desktop Search Bar + Navigation */}
          {!isMobile && (
            <div className="navbar-right flex items-center gap-6">
              {/* 🔎 Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input px-3 py-1 rounded-md border"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    className="absolute right-2 top-1 text-gray-500"
                    onClick={() => setSearchTerm("")}
                  >
                    <X size={16} />
                  </button>
                )}

                {/* Autocomplete Dropdown */}
                {filteredResults.length > 0 && (
                  <div className="absolute mt-1 bg-white shadow-md rounded-md w-56 z-50">
                    {filteredResults.map((result, idx) => (
                      <Link
                        key={idx}
                        to={result.path}
                        className="block px-3 py-2 hover:bg-gray-100"
                        onClick={() => setSearchTerm("")}
                      >
                        {result.label}

              ))}
              {searchResults.length === 0 && (
                <div className="search-no-results">No results found</div>
              )}
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-menu">
          {navbarNavigationItems.map((item, index) =>
            item.dropdown ? (
              <div key={index} className="navbar-item dropdown">
                <button
                  className={`dropdown-toggle ${
                    isDropdownOpen === index ? "active" : ""
                  }`}
                  onClick={() => handleDropdownToggle(index)}
                >
                  {item.icon &&
                    React.createElement(getIconComponent(item.icon), {
                      size: 18,
                      className: "drop-icon",
                    })}
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


              {/* 🔗 Normal Navigation */}
              <div className="navbar-menu flex gap-4">
                {navigationItems.map((item, index) =>
                  item.dropdown ? (
                    <div key={index} className="navbar-item dropdown">
                      <button
                        className={`dropdown-toggle ${isDropdownOpen === index ? "active" : ""}`}
                        onClick={() => handleDropdownToggle(index)}
                      >
                        <item.icon size={18} className="drop-icon" />
                        <span>{item.label}</span>
                        <ChevronDown
                          size={16}
                          className={`dropdown-arrow ${isDropdownOpen === index ? "rotated" : ""}`}
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
                      className={`navbar-link ${isActive(item.path) ? "active" : ""}`}
                    >
                      <item.icon size={18} className="icon" />
                      <span>{item.label}</span>
                    </Link>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>

            ) : (
              <Link
                key={index}
                to={item.path}
                className={`navbar-link ${
                  isActive(item.path) ? "active" : ""
                }`}
              >
                {item.icon &&
                  React.createElement(getIconComponent(item.icon), {
                    size: 18,
                    className: "icon",
                  })}
                <span>{item.label}</span>
              </Link>
            )
          )}
        </div>
      </div>
    </nav>

  );
};

export default Navbar;
