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
import { useMobileMenu } from "../contexts/MobileMenuContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { navbarNavigationItems } from "../utils/navigation";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const location = useLocation();
  const { theme } = useTheme();
  const { isNavbarMenuOpen, openNavbarMenu, closeNavbarMenu } = useMobileMenu();
  const navbarRef = useRef(null);

  const searchRef = useRef(null);

  // Map string icon names to actual icon components
  const getIconComponent = (iconName) => {
    const iconMap = {
      "Home": Home,
      "BarChart3": BarChart3,
      "Search": Search,
      "Database": Database,
      "GitBranch": GitBranch,
      "Users": Users,
      "Trophy": Trophy,
      "Settings": Settings,
      "Type": Type,
      "BookOpen": BookOpen,
      "Cpu": Cpu,
      "Code": Code,
      "Hash": Hash,
      "Zap": Zap,
      "Gamepad": Gamepad,
      "TreeDeciduous": TreeDeciduous,
      "Menu": Menu
    };
    return iconMap[iconName] || null;
  };

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) closeNavbarMenu();
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [closeNavbarMenu]);

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
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`navbar ${theme}`}
      ref={navbarRef}
      data-aos="fade-down"
      data-aos-duration="1000"
    >
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src="/logo.jpg" alt="AlgoVisualizer Logo" className="logo-img" />
          <span className="logo-text">Algo<span>Visualizer</span></span>
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
                  key={index}
                  to={item.path}
                  className="search-result-item"
                  onClick={() => setIsSearchOpen(false)}
                >
                  {item.label}
                </Link>


                <button
                  className="mobile-menu-button"
                  onClick={isNavbarMenuOpen ? closeNavbarMenu : openNavbarMenu}
                  aria-label={isNavbarMenuOpen ? "Close menu" : "Open menu"}
                >
                  {isNavbarMenuOpen ? <X size={24} /> : <Menu size={24} />}
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

              ))}
              {searchResults.length === 0 && (
                <div className="search-no-results">No results found</div>

              )}
            </div>
          )}
        </div>


        {/* Mobile Menu */}
        {isMobile && (
          <div
            className={`mobile-menu ${isNavbarMenuOpen ? "open" : ""}`}
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
                  onClick={closeNavbarMenu}
                  aria-label="Close navigation menu"

        {/* Desktop Navigation */}
        <div className="navbar-menu">
          {navbarNavigationItems.map((item, index) =>
            item.dropdown ? (
              <div key={index} className="navbar-item dropdown">
                <button
                  className={`dropdown-toggle ${isDropdownOpen === index ? "active" : ""}`}
                  onClick={() => handleDropdownToggle(index)}

                >
                  {item.icon && React.createElement(getIconComponent(item.icon), { size: 18, className: "drop-icon" })}
                  <span>{item.label}</span>
                  <ChevronDown
                    size={16}
                    className={`dropdown-arrow ${isDropdownOpen === index ? "rotated" : ""}`}
                  />
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
                              closeNavbarMenu();
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
                    onClick={closeNavbarMenu}
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
        {isNavbarMenuOpen && (
          <div
            className="navbar-backdrop"
            onClick={closeNavbarMenu}
          />
        )}
      </nav>
    </>

                {isDropdownOpen === index && (
                  <div className="dropdown-menu">
                    {item.dropdown.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className={`dropdown-item ${isActive(subItem.path) ? "active" : ""}`}
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
                {item.icon && React.createElement(getIconComponent(item.icon), { size: 18, className: "icon" })}
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