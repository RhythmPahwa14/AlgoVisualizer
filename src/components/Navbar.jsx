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
import UserDropdown from "./UserDropdown";

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


// Desktop Nav Item
const DesktopNavItem = ({ item, index, isOpen, toggleDropdown, isActive, getIcon }) => {
  if (item.dropdown) {
    return (
      <div className="navbar-item dropdown" key={index}>
        <button
          className={`dropdown-toggle ${isOpen === index ? "active" : ""}`}
          onClick={() => toggleDropdown(index)}
        >
          {item.icon && React.createElement(getIcon(item.icon), { size: 18, className: "drop-icon" })}
          <span>{item.label}</span>
          <ChevronDown size={16} className={`dropdown-arrow ${isOpen === index ? "rotated" : ""}`} />
        </button>
        {isOpen === index && (
          <div className="dropdown-menu">
            {item.dropdown.map((sub, subIndex) => (
              <Link
                key={subIndex}
                to={sub.path}
                className={`dropdown-item ${isActive(sub.path) ? "active" : ""}`}
                onClick={() => toggleDropdown(null)}
              >
                {sub.label}

const DesktopNavItem = ({
  item,
  index,
  isDropdownOpen,
  handleDropdownToggle,
  isActive,
  getIconComponent,
}) => {
  if (item.dropdown) {
    return (
      <div key={index} className="navbar-item dropdown relative flex-shrink-0">
        <button
          type="button"
          aria-expanded={isDropdownOpen === index}
          className={`dropdown-toggle inline-flex items-center !gap-1 !px-1 !py-1 !text-xs !leading-none !whitespace-nowrap ${
            isDropdownOpen === index ? "active" : ""
          }`}
          onClick={() => handleDropdownToggle(index)}
        >
          {item.icon &&
            React.createElement(getIconComponent(item.icon), {
              size: 12,
              className: "drop-icon shrink-0",
            })}
          <span className="!whitespace-nowrap">{item.label}</span>
          <ChevronDown
            size={10}
            className={`dropdown-arrow shrink-0 ${
              isDropdownOpen === index ? "rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen === index && (
          <div
            className="dropdown-menu absolute left-0 top-full mt-2 z-[9999] !max-h-none !overflow-visible"
            style={{ maxHeight: "none", overflow: "visible" }}
          >
            {item.dropdown.map((subItem, subIndex) => (
              <Link
                key={subIndex}
                to={subItem.path}
                className={`dropdown-item !text-xs !px-2 !py-1 ${
                  isActive(subItem.path) ? "active" : ""
                }`}
                onClick={() => handleDropdownToggle(null)}
              >
                <span className="!whitespace-nowrap">{subItem.label}</span>

              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (

    <Link to={item.path} className={`navbar-link ${isActive(item.path) ? "active" : ""}`} key={index}>
      {item.icon && React.createElement(getIcon(item.icon), { size: 18, className: "icon" })}
      <span>{item.label}</span>

    <Link
      key={index}
      to={item.path}
      className={`navbar-link inline-flex items-center !gap-1 !px-1 !py-1 !text-xs !leading-none !whitespace-nowrap flex-shrink-0 ${
        isActive(item.path) ? "active" : ""
      }`}
    >
      {item.icon &&
        React.createElement(getIconComponent(item.icon), {
          size: 12,
          className: "icon shrink-0",
        })}
      <span className="!whitespace-nowrap">{item.label}</span>

    </Link>
  );
};


// Mobile Nav Item
const MobileNavItem = ({ item, index, isOpen, toggleDropdown, isActive, getIcon, closeMenu }) => {

const MobileNavItem = ({
  item,
  index,
  isDropdownOpen,
  handleDropdownToggle,
  isActive,
  getIconComponent,
  setIsMobileMenuOpen,
}) => {

  if (item.dropdown) {
    return (
      <div className="mobile-dropdown" key={index}>
        <button
          className={`mobile-dropdown-toggle ${isOpen === index ? "active" : ""}`}
          onClick={() => toggleDropdown(index)}
        >

          {item.icon && React.createElement(getIcon(item.icon), { size: 18, className: "icon" })}

          {item.icon &&
            React.createElement(getIconComponent(item.icon), {
              size: 18,
              className: "icon",
            })}

          <span>{item.label}</span>
          <ChevronDown size={16} className={`dropdown-arrow ${isOpen === index ? "rotated" : ""}`} />
        </button>

        <div className={`mobile-dropdown-menu ${isOpen === index ? "open" : ""}`}>
          {item.dropdown.map((sub, subIndex) => (
            <Link
              key={subIndex}
              to={sub.path}
              className={`mobile-menu-link ${isActive(sub.path) ? "active" : ""}`}
              onClick={() => {
                toggleDropdown(null);
                closeMenu();
              }}
            >
              {sub.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Link
      to={item.path}
      className={`mobile-menu-link ${isActive(item.path) ? "active" : ""}`}
      onClick={closeMenu}
      key={index}
    >

      {item.icon && React.createElement(getIcon(item.icon), { size: 18, className: "icon" })}

      {item.icon &&
        React.createElement(getIconComponent(item.icon), {
          size: 18,
          className: "icon",
        })}

      <span>{item.label}</span>
    </Link>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const [desktopNotesOpen, setDesktopNotesOpen] = useState(false);
  const [mobileNotesOpen, setMobileNotesOpen] = useState(false);

  const location = useLocation();
  const { theme } = useTheme();
  const navbarRef = useRef(null);


  const getIcon = (name) => ICON_COMPONENTS[name] || null;
  const isActive = (path) => location.pathname === path;

  const toggleDesktopDropdown = (index) => setDesktopDropdownOpen(desktopDropdownOpen === index ? null : index);
  const toggleMobileDropdown = (index) => setMobileDropdownOpen(mobileDropdownOpen === index ? null : index);

  const notesBtnRef = useRef(null);
  const [notesMenuPos, setNotesMenuPos] = useState({
    top: 0,
    left: 0,
    minWidth: 0,
  });

  const getIconComponent = (iconName) => ICON_COMPONENTS[iconName] || null;

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


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setDesktopDropdownOpen(null);
        setMobileDropdownOpen(null);
        setDesktopNotesOpen(false);
        setMobileNotesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <nav className={`navbar fixed top-0 left-0 right-0 z-50 ${theme}`} ref={navbarRef}>
      <div className="navbar-container flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link to="/" className="navbar-logo flex items-center gap-2">

  const isActive = (path) => location.pathname === path;
  const handleDropdownToggle = (index) =>
    setIsDropdownOpen(index === isDropdownOpen ? null : index);

  // updated positioning for Notes dropdown
  const updateNotesMenuPos = () => {
    if (!notesBtnRef.current) return;
    const rect = notesBtnRef.current.getBoundingClientRect();
    const docLeft = rect.left + window.scrollX;
    const docTop = rect.bottom + window.scrollY;
    const triggerW = rect.width;

    const maxLeft = window.scrollX + window.innerWidth - triggerW - 8;
    const clampedLeft = Math.max(window.scrollX + 8, Math.min(docLeft, maxLeft));

    setNotesMenuPos({
      top: docTop,
      left: clampedLeft,
      minWidth: triggerW,
    });
  };

  const toggleNotes = () => {
    const willOpen = isDropdownOpen !== "notes";
    handleDropdownToggle("notes");
    if (willOpen) {
      requestAnimationFrame(updateNotesMenuPos);
    }
  };

  useEffect(() => {
    if (isDropdownOpen === "notes") {
      updateNotesMenuPos();
      const onScroll = () => updateNotesMenuPos();
      const onResize = () => updateNotesMenuPos();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
      };
    }
  }, [isDropdownOpen]);

  const searchableNotes = learnSections.flatMap((section) =>
    section.items.map((note) => ({
      ...note,
      keywords: note.tags ? note.tags.join(" ") : "",
      category: section.heading,
    }))
  );

  const fuse = new Fuse(searchableNotes, {
    keys: ["label", "path", "keywords"],
    threshold: 0.3,
  });

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }

    const results = fuse
      .search(query)
      .map((res) => res.item)
      .filter((item) => categoryFilter === "All" || item.category === categoryFilter);

    setSearchResults(results);
    setIsSearchOpen(results.length > 0);
  };

  const renderNotesDropdown = () => (
    <div className="navbar-item dropdown relative">
      <button
        ref={notesBtnRef}
        className="dropdown-toggle inline-flex items-center !gap-1 !px-1 !py-1 !text-xs !leading-none !whitespace-nowrap"
        onClick={toggleNotes}
      >
        <BookOpen size={12} className="drop-icon shrink-0" />
        <span className="!whitespace-nowrap">Notes</span>
        <ChevronDown
          size={10}
          className={`dropdown-arrow shrink-0 ${isDropdownOpen === "notes" ? "rotate-180" : ""}`}
        />
      </button>
      {isDropdownOpen === "notes" && (
        <div
          className="dropdown-menu z-[9999] !max-h-none !overflow-visible bg-white rounded-md shadow-xl border"
          style={{
            position: "fixed",
            top: notesMenuPos.top,
            left: notesMenuPos.left,
            minWidth: notesMenuPos.minWidth,
            maxHeight: "none",
            overflow: "visible",
          }}
        >
          <Link
            to="/notes/java"
            className={`dropdown-item !text-xs !px-2 !py-1 ${isActive("/notes/java") ? "active" : ""}`}
            onClick={() => handleDropdownToggle(null)}
          >
            Java
          </Link>
          <Link
            to="/notes/python"
            className={`dropdown-item !text-xs !px-2 !py-1 ${isActive("/notes/python") ? "active" : ""}`}
            onClick={() => handleDropdownToggle(null)}
          >
            Python
          </Link>
        </div>
      )}
    </div>
  );

  const renderMobileNotesDropdown = () => (
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

  return (
    <nav className={`navbar ${theme}`} ref={navbarRef} style={{ overflow: "visible" }}>
      <div className="navbar-container relative overflow-visible">
        <Link to="/" className="navbar-logo">

          <img src="/logo.jpg" alt="AlgoVisualizer Logo" className="logo-img" />
          <span className="logo-text">Algo<span>Visualizer</span></span>
        </Link>


        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-4">
          {navbarNavigationItems.map((item, i) => (
            <DesktopNavItem
              key={i}
              item={item}
              index={i}
              isOpen={desktopDropdownOpen}
              toggleDropdown={toggleDesktopDropdown}
              isActive={isActive}
              getIcon={getIcon}
            />
          ))}

          {/* Notes desktop */}
          <div className="navbar-item dropdown">

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
              className={`dropdown-toggle ${desktopNotesOpen ? "active" : ""}`}
              onClick={() => setDesktopNotesOpen(!desktopNotesOpen)}
            >
              <BookOpen size={18} className="drop-icon" />
              <span>Notes</span>
              <ChevronDown size={16} className={`${desktopNotesOpen ? "rotated" : ""}`} />
            </button>

            {desktopNotesOpen && (
              <div className="dropdown-menu">

          )}
          <Search size={18} className="search-icon" />
          <select
            className="category-filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All</option>
            {learnSections.map((section, idx) => (
              <option key={idx} value={section.heading}>
                {section.heading}
              </option>
            ))}
          </select>
          {isSearchOpen && (
            <div className="search-results">
              {searchResults.map((item, index) => (

                <Link
                  to="/notes/java"
                  className={`dropdown-item ${isActive("/notes/java") ? "active" : ""}`}
                  onClick={() => setDesktopNotesOpen(false)}
                >
                  Java
                </Link>

                <Link
                  to="/notes/python"
                  className={`dropdown-item ${isActive("/notes/python") ? "active" : ""}`}
                  onClick={() => setDesktopNotesOpen(false)}
                >
                  Python
                </Link>
              </div>
            )}
          </div>

          <UserDropdown />
        </div>

        {/* Mobile Hamburger */}
        <button
          className="mobile-menu-button md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`} onClick={(e) => e.stopPropagation()}>
        
        {/* Optional: Mobile Menu Header */}
        <div className="mobile-menu-header">
          <div className="mobile-menu-header-content">
            <span className="mobile-menu-title">AlgoVisualizer</span>
            <button className="mobile-menu-close-btn" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={20} />
            </button>

              ))}
              {searchResults.length === 0 && (
                <div className="search-no-results">No results found</div>
              )}
            </div>
          )}
        </div>

        {!isMobile && (
          <div
            className="navbar-menu flex items-center !gap-1 flex-nowrap overflow-visible"
            style={{ overflowY: "hidden" }}
          >
            {navbarNavigationItems.map((item, index) => (
              <DesktopNavItem
                key={index}
                item={item}
                index={index}
                isDropdownOpen={isDropdownOpen}
                handleDropdownToggle={handleDropdownToggle}
                isActive={isActive}
                getIconComponent={getIconComponent}
              />
            ))}
            {renderNotesDropdown()}
            <UserDropdown />

          </div>
          <p className="mobile-menu-subtitle">Explore Algorithms & Notes</p>
        </div>


        {/* Menu Items */}
        {navbarNavigationItems.map((item, i) => (
          <MobileNavItem
            key={i}
            item={item}
            index={i}
            isOpen={mobileDropdownOpen}
            toggleDropdown={toggleMobileDropdown}
            isActive={isActive}
            getIcon={getIcon}
            closeMenu={() => setIsMobileMenuOpen(false)}
          />
        ))}

        {/* Notes Section */}
        <div className="mobile-dropdown">

        {isMobile && (

          <button
            className={`mobile-dropdown-toggle ${mobileNotesOpen ? "active" : ""}`}
            onClick={() => setMobileNotesOpen(!mobileNotesOpen)}
          >
            <BookOpen size={18} className="icon" />
            <span>Notes</span>
            <ChevronDown size={16} className={`${mobileNotesOpen ? "rotated" : ""}`} />
          </button>

          <div className={`mobile-dropdown-menu ${mobileNotesOpen ? "open" : ""}`}>
            <Link
              to="/notes/java"
              className="mobile-menu-link"
              onClick={() => {
                setMobileNotesOpen(false);
                setIsMobileMenuOpen(false);
              }}
            >
              Java
            </Link>
            <Link
              to="/notes/python"
              className="mobile-menu-link"
              onClick={() => {
                setMobileNotesOpen(false);
                setIsMobileMenuOpen(false);
              }}
            >
              Python
            </Link>

        )}

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
                getIconComponent={getIconComponent}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
              />
            ))}
            {renderMobileNotesDropdown()}
            <div className="mobile-user-dropdown mt-4">
              <UserDropdown />
            </div>

          </div>
        </div>

        {/* User Dropdown */}
        <div className="mobile-user-dropdown mt-4">
          <UserDropdown />
        </div>
      </div>

    </nav>
  );
};

export default Navbar;

