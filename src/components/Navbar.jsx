import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import Fuse from "fuse.js";
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
import UserDropdown from "./UserDropdown";

// Icon mapping for navigation items
const ICON_COMPONENTS = {
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

// Helper function to get icon component by name
const getIconComponent = (iconName) => ICON_COMPONENTS[iconName] || null;

// Sub-component for rendering desktop navigation items
const DesktopNavItem = ({ 
  item, 
  index, 
  isDropdownOpen, 
  handleDropdownToggle, 
  isActive
}) => {
  if (item.dropdown) {
    return (
      <div key={index} className="navbar-item dropdown">
        <button
          className={`dropdown-toggle ${isDropdownOpen === index ? "active" : ""}`}
          onClick={() => handleDropdownToggle(index)}
        >
          {item.icon && React.createElement(getIconComponent(item.icon), {
            size: 18,
            className: "drop-icon",
          })}
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
                className={`dropdown-item ${isActive(subItem.path) ? "active" : ""}`}
                onClick={() => handleDropdownToggle(null)}
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      key={index}
      to={item.path}
      className={`navbar-link ${isActive(item.path) ? "active" : ""}`}
    >
      {item.icon && React.createElement(getIconComponent(item.icon), {
        size: 18,
        className: "icon",
      })}
      <span>{item.label}</span>
    </Link>
  );
};

// Sub-component for rendering mobile navigation items
const MobileNavItem = ({ 
  item, 
  index, 
  isDropdownOpen, 
  handleDropdownToggle, 
  isActive,
  setIsMobileMenuOpen
}) => {
  if (item.dropdown) {
    return (
      <div key={index} className="mobile-dropdown">
        <button
          className={`mobile-dropdown-toggle ${isDropdownOpen === index ? "active" : ""}`}
          onClick={() => handleDropdownToggle(index)}
        >
          {item.icon && React.createElement(getIconComponent(item.icon), {
            size: 18,
            className: "icon",
          })}
          <span>{item.label}</span>
          <ChevronDown
            size={16}
            className={`dropdown-arrow ${isDropdownOpen === index ? "rotated" : ""}`}
          />
        </button>
        {isDropdownOpen === index && (
          <div className="mobile-dropdown-menu">
            {item.dropdown.map((subItem, subIndex) => (
              <Link
                key={subIndex}
                to={subItem.path}
                className={`mobile-dropdown-item ${isActive(subItem.path) ? "active" : ""}`}
                onClick={() => {
                  handleDropdownToggle(null);
                  setIsMobileMenuOpen(false);
                }}
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      key={index}
      to={item.path}
      className={`mobile-menu-link ${isActive(item.path) ? "active" : ""}`}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {item.icon && React.createElement(getIconComponent(item.icon), {
        size: 18,
        className: "icon",
      })}
      <span>{item.label}</span>
    </Link>
  );
};

// Helper component for notes dropdown (desktop)
const NotesDropdown = ({ isDropdownOpen, handleDropdownToggle, isActive }) => (
  <div className="navbar-item dropdown">
    <button
      className="dropdown-toggle"
      onClick={() => handleDropdownToggle("notes")}
    >
      <BookOpen size={18} className="drop-icon" />
      <span>Notes</span>
      <ChevronDown
        size={16}
        className={`dropdown-arrow ${isDropdownOpen === "notes" ? "rotated" : ""}`}
      />
    </button>
    {isDropdownOpen === "notes" && (
      <div className="dropdown-menu">
        <Link
          to="/notes/java"
          className={`dropdown-item ${isActive("/notes/java") ? "active" : ""}`}
          onClick={() => handleDropdownToggle(null)}
        >
          Java
        </Link>
        <Link
          to="/notes/python"
          className={`dropdown-item ${isActive("/notes/python") ? "active" : ""}`}
          onClick={() => handleDropdownToggle(null)}
        >
          Python
        </Link>
      </div>
    )}
  </div>
);

// Helper component for notes dropdown (mobile)
const MobileNotesDropdown = ({ isDropdownOpen, handleDropdownToggle, setIsMobileMenuOpen }) => (
  <div className="mobile-dropdown">
    <button
      className={`mobile-dropdown-toggle ${isDropdownOpen === "notes" ? "active" : ""}`}
      onClick={() => handleDropdownToggle("notes")}
    >
      <BookOpen size={18} className="icon" />
      <span>Notes</span>
      <ChevronDown
        size={16}
        className={`dropdown-arrow ${isDropdownOpen === "notes" ? "rotated" : ""}`}
      />
    </button>
    {isDropdownOpen === "notes" && (
      <div className="mobile-dropdown-menu">
        <Link
          to="/notes/java"
          className="mobile-dropdown-item"
          onClick={() => {
            handleDropdownToggle(null);
            setIsMobileMenuOpen(false);
          }}
        >
          Java
        </Link>
        <Link
          to="/notes/python"
          className="mobile-dropdown-item"
          onClick={() => {
            handleDropdownToggle(null);
            setIsMobileMenuOpen(false);
          }}
        >
          Python
        </Link>
      </div>
    )}
  </div>
);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");

  const location = useLocation();
  const { theme } = useTheme();
  const navbarRef = useRef(null);
  const searchRef = useRef(null);

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

  // Handle click outside for dropdowns & search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsDropdownOpen(null);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigation helpers with useCallback for performance
  const isActive = useCallback((path) => location.pathname === path, [location.pathname]);
  
  const handleDropdownToggle = useCallback((index) => {
    setIsDropdownOpen(prev => prev === index ? null : index);
  }, []);

  // Fuse.js setup
  const fuse = new Fuse(
    navbarNavigationItems.flatMap((item) =>
      item.dropdown ? item.dropdown : item
    ),
    {
      keys: ["label", "path", "keywords"],
      threshold: 0.3,
    }
  );

  // Handle search with useCallback for performance
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }

    const results = fuse
      .search(query)
      .map((result) => result.item)
      .filter(
        (item) => categoryFilter === "All" || item.category === categoryFilter
      );

    setSearchResults(results);
    setIsSearchOpen(results.length > 0);
  }, [categoryFilter, fuse]);

  // Clear search with useCallback for performance
  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchOpen(false);
  }, []);

  return (
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
            placeholder="Search algorithms or notes..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button
              className="clear-btn"
              onClick={clearSearch}
            >
              <X size={16} />
            </button>
          )}
          <Search size={18} className="search-icon" />

          {/* Category Filter */}
          <select
            className="category-filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            <option value="Sorting">Sorting</option>
            <option value="Graph">Graph</option>
          </select>

          {isSearchOpen && (
            <div className="search-results">
              {searchResults.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="search-result-item"
                  onClick={() => setIsSearchOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {searchResults.length === 0 && (
                <div className="search-no-results">No results found</div>
              )}
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="navbar-menu">
            {navbarNavigationItems.map((item, index) => (
              <DesktopNavItem
                key={index}
                item={item}
                index={index}
                isDropdownOpen={isDropdownOpen}
                handleDropdownToggle={handleDropdownToggle}
                isActive={isActive}
              />
            ))}
            
            {/* Notes Dropdown */}
            <NotesDropdown 
              isDropdownOpen={isDropdownOpen}
              handleDropdownToggle={handleDropdownToggle}
              isActive={isActive}
            />

            {/* User Dropdown */}
            <UserDropdown />
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}

        {/* Mobile Navigation */}
        {isMobile && isMobileMenuOpen && (
          <div className="mobile-menu">
            {navbarNavigationItems.map((item, index) => (
              <MobileNavItem
                key={index}
                item={item}
                index={index}
                isDropdownOpen={isDropdownOpen}
                handleDropdownToggle={handleDropdownToggle}
                isActive={isActive}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
              />
            ))}

            {/* Notes dropdown in mobile */}
            <MobileNotesDropdown 
              isDropdownOpen={isDropdownOpen}
              handleDropdownToggle={handleDropdownToggle}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            <div className="mobile-user-dropdown mt-4">
              <UserDropdown />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;