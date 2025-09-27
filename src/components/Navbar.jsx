import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home, BarChart3, Search, Database, GitBranch, Users, Trophy, Settings,
  X, Type, ChevronDown, BookOpen, Cpu, Code, Hash, Zap, Gamepad, TreeDeciduous, Menu
} from "lucide-react";
import { useTheme } from "../ThemeContext";
import { navbarNavigationItems } from "../utils/navigation";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const location = useLocation();
  const { theme } = useTheme();
  const navbarRef = useRef(null);
  const searchRef = useRef(null);

  const getIconComponent = (iconName) => {
    const icons = {
      Home, BarChart3, Search, Database, GitBranch, Users, Trophy, Settings,
      Type, BookOpen, Cpu, Code, Hash, Zap, Gamepad, TreeDeciduous, Menu
    };
    return icons[iconName] || null;
  };

  const isActive = (path) => location.pathname === path;

  // Flatten all nav items for search
  const haystack = React.useMemo(() => {
    return navbarNavigationItems
      .filter(i => i.path)
      .map(i => ({ path: i.path, label: i.label }));
  }, []);

  const handleSearch = (q) => {
    setSearchQuery(q);
    if (!q.trim()) {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }
    const res = haystack.filter(i =>
      i.label.toLowerCase().includes(q.toLowerCase())
    );
    setSearchResults(res);
    setIsSearchOpen(res.length > 0);
  };

  // click outside to close search
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={`navbar ${theme}`} ref={navbarRef}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logo.jpg" alt="AlgoVisualizer Logo" className="logo-img" />
          <span className="logo-text">Algo<span>Visualizer</span></span>
        </Link>

        <div className="navbar-search" ref={searchRef}>
          <input
            type="text"
            placeholder="Search…"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button className="clear-btn" onClick={() => {
              setSearchQuery(""); setSearchResults([]); setIsSearchOpen(false);
            }}>
              <X size={16} />
            </button>
          )}
          <Search size={18} className="search-icon" />
          {isSearchOpen && (
            <div className="search-results">
              {searchResults.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  className="search-result-item"
                  onClick={() => setIsSearchOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {searchResults.length === 0 && <div className="search-no-results">No results</div>}
            </div>
          )}
        </div>

        <div className="navbar-menu">
          {navbarNavigationItems.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className={`navbar-link ${isActive(item.path) ? "active" : ""}`}
            >
              {item.icon && React.createElement(getIconComponent(item.icon), {
                size: 18, className: "icon"
              })}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
