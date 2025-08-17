import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/navbar.css';
import { useTheme } from '../ThemeContext'; // ← import useTheme

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme(); // ← access theme context

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="av-header">
            <div className="av-container">
                <div className="logo">
                    <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                        <h1 className="navbar-heading">AlgoVisualizer</h1>
                    </Link>
                </div>

                <nav className={`nav-links ${isMobileMenuOpen ? 'nav-active' : ''}`} aria-label="Primary">
                    <NavLink to="/" onClick={toggleMobileMenu} end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
                    <NavLink to="/sorting" onClick={toggleMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>Sorting</NavLink>
                    <NavLink to="/searching" onClick={toggleMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>Searching</NavLink>
                    <NavLink to="/data-structures" onClick={toggleMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>Data Structures</NavLink>
                    <NavLink to="/contributors" onClick={toggleMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>Contributors</NavLink>
                    <NavLink to="/documentation" onClick={toggleMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>Documentation</NavLink>
                </nav>

                <div className="nav-actions">
                    <a className="github-btn" href="https://github.com/RhythmPahwa14/AlgoVisualizer" target="_blank" rel="noreferrer noopener" aria-label="Open GitHub repository">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 .5C5.73.5.9 5.33.9 11.6c0 4.88 3.16 9.02 7.55 10.48.55.1.75-.24.75-.53 0-.26-.01-1.12-.02-2.03-3.07.67-3.72-1.3-3.72-1.3-.5-1.26-1.22-1.6-1.22-1.6-.99-.67.07-.65.07-.65 1.1.08 1.68 1.12 1.68 1.12.97 1.66 2.55 1.18 3.17.9.1-.7.38-1.18.69-1.45-2.45-.28-5.02-1.22-5.02-5.43 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.41.11-2.94 0 0 .93-.3 3.05 1.13.88-.24 1.82-.36 2.76-.36.94 0 1.88.12 2.76.36 2.12-1.43 3.05-1.13 3.05-1.13.6 1.53.22 2.66.11 2.94.7.77 1.13 1.75 1.13 2.95 0 4.22-2.58 5.14-5.04 5.41.39.33.73.99.73 2 0 1.44-.01 2.6-.01 2.95 0 .29.2.64.76.53 4.38-1.46 7.54-5.6 7.54-10.48C23.1 5.33 18.27.5 12 .5z" clipRule="evenodd"/>
                        </svg>
                        <span>Star</span>
                    </a>

                    {/* Dark/Light mode toggle */}
                    <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle dark/light mode">
                        {theme === 'light' ? (
                                // ☀️ Sun icon for Light mode
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="5" fill="#fbbf24"/>
                                    <g stroke="#fbbf24" strokeWidth="2">
                                        <line x1="12" y1="1" x2="12" y2="4"/>
                                        <line x1="12" y1="20" x2="12" y2="23"/>
                                        <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/>
                                        <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
                                        <line x1="1" y1="12" x2="4" y2="12"/>
                                        <line x1="20" y1="12" x2="23" y2="12"/>
                                        <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
                                        <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
                                    </g>
                                </svg>
                            ) : 
                            (
                                // 🌙 Moon icon for Dark mode
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                                    <path fill="#93c5fd" d="M21 12.79A9 9 0 0111.21 3 7 7 0 1012 21a9 9 0 009-8.21z"/>
                                </svg>
                            )}
                    </button>

                    <button className="hamburger" onClick={toggleMobileMenu} aria-label="Toggle menu" aria-expanded={isMobileMenuOpen}>
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
