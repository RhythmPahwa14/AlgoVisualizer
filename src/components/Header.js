import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import { useTheme } from '../hooks/useTheme'; // import hook

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme, toggle } = useTheme(); // get theme + toggle from hook

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header>
            <div className="logo">
                <Link to="/">
                    <h1>AlgoVisualizer</h1>
                </Link>
            </div>

            <nav className={`nav-links ${isMobileMenuOpen ? 'nav-active' : ''}`}>
                <Link to="/" onClick={toggleMobileMenu}>Home</Link>
                <Link to="/sorting" onClick={toggleMobileMenu}>Sorting</Link>
                <Link to="/searching" onClick={toggleMobileMenu}>Searching</Link>
                <Link to="/data-structures" onClick={toggleMobileMenu}>Data Structures</Link>
            </nav>

            {/* Theme toggle button */}
            <button
                onClick={toggle}
                aria-label="Toggle dark mode"
                style={{
                    padding: '6px 10px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    marginLeft: '10px',
                    background: 'var(--muted)',
                    color: 'var(--text)',
                    border: '1px solid var(--border)'
                }}
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
                {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
            </button>

            <div className="hamburger" onClick={toggleMobileMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </header>
    );
};

export default Header;
