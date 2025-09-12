// src/components/Header.jsx
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/navbar-top.css";
import { useTheme } from "../ThemeContext";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="navbar" data-theme={theme}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="logo-icon">A</div>
          <span className="logo-text">ALGO Visualizer</span>
        </Link>

        {/* Nav Links + Actions */}
        <div className="navbar-flex">
          {/* Left Links */}
          <nav className="navbar-menu">
            <NavLink to="/" className="navbar-link" end>Home</NavLink>
            <NavLink to="/sorting" className="navbar-link">Sorting</NavLink>
            <NavLink to="/searching" className="navbar-link">Searching</NavLink>
            <NavLink to="/data-structures" className="navbar-link">Data Structures</NavLink>
            <NavLink to="/graph" className="navbar-link">Graph</NavLink>
            <NavLink to="/contributors" className="navbar-link">Contributors</NavLink>
            <NavLink to="/documentation" className="navbar-link">Documentation</NavLink>
            <NavLink to="/about" className="navbar-link">About</NavLink>
            <NavLink to="/contact" className="navbar-link">Contact</NavLink>
          </nav>

          {/* Right Actions */}
          <div className="navbar-actions">
            <NavLink to="/signin" className="navbar-link">Sign In</NavLink>
            <NavLink to="/signup" className="navbar-link">Sign Up</NavLink>
            <a
              className="github-btn"
              href="https://github.com/RhythmPahwa14/AlgoVisualizer"
              target="_blank"
              rel="noreferrer noopener"
            >
              ⭐ Star
            </a>
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              aria-label="Toggle dark/light mode"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          ☰
        </button>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
          <NavLink to="/" className="mobile-menu-link" onClick={toggleMobileMenu}>Home</NavLink>
          <NavLink to="/sorting" className="mobile-menu-link" onClick={toggleMobileMenu}>Sorting</NavLink>
          <NavLink to="/searching" className="mobile-menu-link" onClick={toggleMobileMenu}>Searching</NavLink>
          <NavLink to="/data-structures" className="mobile-menu-link" onClick={toggleMobileMenu}>Data Structures</NavLink>
          <NavLink to="/graph" className="mobile-menu-link" onClick={toggleMobileMenu}>Graph</NavLink>
          <NavLink to="/contributors" className="mobile-menu-link" onClick={toggleMobileMenu}>Contributors</NavLink>
          <NavLink to="/documentation" className="mobile-menu-link" onClick={toggleMobileMenu}>Documentation</NavLink>
          <NavLink to="/about" className="mobile-menu-link" onClick={toggleMobileMenu}>About</NavLink>
          <NavLink to="/contact" className="mobile-menu-link" onClick={toggleMobileMenu}>Contact</NavLink>
          <NavLink to="/signin" className="mobile-menu-link" onClick={toggleMobileMenu}>Sign In</NavLink>
          <NavLink to="/signup" className="mobile-menu-link" onClick={toggleMobileMenu}>Sign Up</NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
