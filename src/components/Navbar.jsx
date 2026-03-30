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
  Type,
  ChevronDown,
  BookOpen,
  Cpu,
  Code,
  Hash,
  Zap,
  Gamepad,
  TreeDeciduous
} from "lucide-react";
import { useTheme } from "../ThemeContext";
import { navbarNavigationItems } from "../utils/navigation";
import UserDropdown from "./UserDropdown";
import ThemeToggle from "./ThemeToggle";
// import { backgroundClip } from "html2canvas/dist/types/css/property-descriptors/background-clip";

const ICON_COMPONENTS = {
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
  TreeDeciduous
};

// Desktop Nav Item
const DesktopNavItem = ({
  item,
  index,
  isOpen,
  toggleDropdown,
  openDropdown,
  closeDropdownDelayed,
  cancelClose,
  isActive,
  getIcon,
  selectedCommunity,
  setSelectedCommunity
}) => {
  if (item.dropdown) {
    return (
      <div
        className="navbar-item dropdown"
        key={index}
        onMouseEnter={() => openDropdown(index)}
        onMouseLeave={closeDropdownDelayed}
      >
        <button
          className={`dropdown-toggle ${isOpen === index ? "active" : ""}`}
          data-tooltip={item.label === "Community" ? selectedCommunity : item.label}
          onClick={() => toggleDropdown(isOpen === index ? null : index)}
        >
          {item.icon &&
            React.createElement(getIcon(item.icon), {
              size: 18,
              className: "drop-icon"
            })}
          <span className="navbar-label dropdown-label">
            {item.label === "Community" ? selectedCommunity : item.label}
          </span>
          <ChevronDown
            size={18}
            className={`dropdown-arrow ${isOpen === index ? "rotated" : ""}`}
          />
        </button>
        {isOpen === index && (
          <div
            className="dropdown-menu"
            onMouseEnter={cancelClose}
            onMouseLeave={closeDropdownDelayed}
          >
            {item.dropdown.map((sub, subIndex) => {
              if (!sub.path) return null;
              return (
                <Link
                  key={subIndex}
                  to={sub.path}
                  className={`dropdown-item ${isActive(sub.path) ? "active" : ""}`}
                  onClick={() => {
                    toggleDropdown(null);
                  }}
                >
                  {sub.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.path}
      className={`navbar-link ${isActive(item.path) ? "active" : ""}`}
      data-tooltip={item.label}
      key={index}
    >
      {item.icon &&
        React.createElement(getIcon(item.icon), {
          size: 18,
          className: "icon"
        })}
      <span className="navbar-label">{item.label}</span>
    </Link>
  );
};

// Mobile Nav Item
const MobileNavItem = ({ item, index, isOpen, toggleDropdown, isActive, getIcon, closeMenu }) => {
  if (item.dropdown) {
    return (
      <div className="mobile-dropdown" key={index}>
        <button
          className={`mobile-dropdown-toggle ${isOpen === index ? "active" : ""}`}
          onClick={() => toggleDropdown(index)}
        >
          {item.icon &&
            React.createElement(getIcon(item.icon), {
              size: 18,
              className: "icon"
            })}
          <span>{item.label}</span>
          <ChevronDown
            size={16}
            className={`dropdown-arrow ${isOpen === index ? "rotated" : ""}`}
          />
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
      {item.icon &&
        React.createElement(getIcon(item.icon), {
          size: 18,
          className: "icon"
        })}
      <span>{item.label}</span>
    </Link>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const [selectedCommunity, setSelectedCommunity] = useState("Community");
  const closeTimeoutRef = useRef(null);

  const location = useLocation();
  const { theme } = useTheme();
  const navbarRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navMenuRef = useRef(null);
  const itemRefs = useRef({});
  const [lineStyle, setLineStyle] = useState({});

  // Function to update the magic line's position
  const updateLine = (element) => {
    if (element) {
      setLineStyle({
        width: element.offsetWidth,
        left: element.offsetLeft,
      });
    }
  };

  // Set initial position and update on route change
  useEffect(() => {
    const activeItem = Object.values(itemRefs.current).find(
      (el) => el && el.classList.contains("active")
    );
    if (activeItem) {
      updateLine(activeItem);
    }
  }, [location.pathname]);
  const getIcon = (name) => ICON_COMPONENTS[name] || null;
  const isActive = (path) => location.pathname === path;

  const openDesktopDropdown = (index) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setDesktopDropdownOpen(index);
  };

  const closeDesktopDropdownDelayed = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setDesktopDropdownOpen(null);
    }, 150);
  };

  const toggleDesktopDropdown = (index) =>
    setDesktopDropdownOpen((prev) => (prev === index ? null : index));
  const toggleMobileDropdown = (index) =>
    setMobileDropdownOpen((prev) => (prev === index ? null : index));

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setDesktopDropdownOpen(null);
        setMobileDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Mobile menu backdrop */}
      <div 
        className={`navbar-backdrop ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      
      {/* Mobile menu toggle button was moved inside nav */}

      <nav
        className={`navbar ${isMobileMenuOpen ? 'mobile-open' : ''} ${theme}`}
        ref={navbarRef}
      >
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo flex items-center gap-2">
          <img src="/logo.png" alt="AlgoVisualizer Logo" className="logo-img" />
          <span className="logo-text navbar-label">
            Algo<span>Visualizer</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div
          className="md:flex flex-col items-start gap-3 w-full desktop-nav-menu"
          ref={navMenuRef}
        >
          {/* Render all nav items */}
          {navbarNavigationItems.map((item, i) => (
              <DesktopNavItem
                ref={(el) => (itemRefs.current[item.path || `dropdown-${i}`] = el)}
                key={i}
                item={item}
                index={i}
                isOpen={desktopDropdownOpen}
                toggleDropdown={toggleDesktopDropdown}
                openDropdown={openDesktopDropdown}
                closeDropdownDelayed={closeDesktopDropdownDelayed}
                cancelClose={() => closeTimeoutRef.current && clearTimeout(closeTimeoutRef.current)}
                isActive={isActive}
                getIcon={getIcon}
                selectedCommunity={selectedCommunity}
                setSelectedCommunity={setSelectedCommunity}
                onMouseEnter={(e) => updateLine(e.currentTarget)}
              />
            ))}

          {/* Magic Line for active/hover indicator */}
          <div className="magic-line" style={lineStyle}></div>
        </div>

        {/* Right side controls: UserDropdown only */}
        <div className="sidebar-footer hidden md:flex">
          <UserDropdown />
        </div>

        {/* Mobile menu toggle button */}
        <button 
          className={`mobile-menu-button ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
          style={{
            color: "#000000",
            background: "#ffffff",
            border: "1px solid rgba(0, 0, 0, 0.12)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <span
            aria-hidden
            style={{
              position: "absolute",
              width: "18px",
              height: "2px",
              borderRadius: "2px",
              background: "#000000",
              transform: isMobileMenuOpen ? "rotate(45deg)" : "translateY(-6px)",
              transition: "transform 0.2s ease",
            }}
          />
          <span
            aria-hidden
            style={{
              position: "absolute",
              width: "18px",
              height: "2px",
              borderRadius: "2px",
              background: "#000000",
              opacity: isMobileMenuOpen ? 0 : 1,
              transition: "opacity 0.2s ease",
            }}
          />
          <span
            aria-hidden
            style={{
              position: "absolute",
              width: "18px",
              height: "2px",
              borderRadius: "2px",
              background: "#000000",
              transform: isMobileMenuOpen ? "rotate(-45deg)" : "translateY(6px)",
              transition: "transform 0.2s ease",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Menu Header */}
        <div className="mobile-menu-header">
          <div className="mobile-menu-header-content" style={{ justifyContent: "flex-start" }}>
            <span className="mobile-menu-title">AlgoVisualizer</span>
          </div>
          <p className="mobile-menu-subtitle">Explore Algorithms & Notes</p>
        </div>

        {/* Menu Items */}
        <div className="mobile-menu-content">
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

          {/* User Dropdown at bottom */}
          <div className="mobile-user-dropdown" style={{ justifyContent: 'center' }}>
            <UserDropdown />
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
