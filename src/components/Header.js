import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa'; // GitHub icon
import '../styles/navbar.css';
import { useTheme } from '../hooks/useTheme';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme, toggle } = useTheme();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const buttonStyle = {
        padding: '6px 12px',
        borderRadius: 8,
        cursor: 'pointer',
        background: 'var(--muted)',
        color: 'var(--text)',
        border: '1px solid var(--border)',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontWeight: '500'
    };

    return (
        <header className="av-header">
            <div className="av-container">
                <div className="logo">
                    <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                        <span className="brand-mono">ALGO</span>
                        <span className="brand-highlight">Visualizer</span>
                    </Link>
                </div>

                <nav className={`nav-links ${isMobileMenuOpen ? 'nav-active' : ''}`} aria-label="Primary">
                    <NavLink to="/" onClick={toggleMobileMenu} end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
                    <NavLink to="/sorting" onClick={toggleMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>Sorting</NavLink>
                    <NavLink to="/searching" onClick={toggleMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>Searching</NavLink>
                    <NavLink to="/data-structures" onClick={toggleMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>Data Structures</NavLink>
                    <NavLink to="/contributors" onClick={toggleMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>Contributors</NavLink>

                    {/* GitHub button as a nav link */}
                    <a
                        href="https://github.com/RhythmPahwa14/AlgoVisualizer"
                        target="_blank"
                        rel="noreferrer noopener"
                        style={buttonStyle}
                    >
                        <FaGithub size={18} /> Star
                    </a>
                </nav>

                <div className="nav-actions">
                    {/* Theme toggle button */}
                    <button
                        onClick={toggle}
                        aria-label="Toggle dark mode"
                        style={buttonStyle}
                        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
                    </button>

                    {/* Hamburger menu for mobile */}
                    <button
                        className="hamburger"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
