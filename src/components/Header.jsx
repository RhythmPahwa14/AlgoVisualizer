import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import '../styles/navbar.css';
import { useTheme } from '../ThemeContext';
import { FaGithub, FaMoon, FaSun, FaCode, FaSearch, FaDatabase, FaBrain, FaUsers, FaBook, FaProjectDiagram } from 'react-icons/fa';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

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

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const navItems = [
        { path: '/', label: 'Home', icon: null, group: 'main' },
        { path: '/sorting', label: 'Sorting', icon: FaCode, group: 'learn' },
        { path: '/searching', label: 'Searching', icon: FaSearch, group: 'learn' },
        { path: '/data-structures', label: 'Data Structures', icon: FaDatabase, group: 'learn' },
        { path: '/graph', label: 'Graph', icon: FaProjectDiagram, group: 'learn' },
        { path: '/quiz', label: 'Quiz', icon: FaBrain, group: 'test' },
        { path: '/contributors', label: 'Contributors', icon: FaUsers, group: 'community' },
        { path: '/documentation', label: 'Documentation', icon: FaBook, group: 'help' }
    ];

    return (
        <>
            <header className={`av-header ${isScrolled ? 'scrolled' : ''}`}>
                <div className="av-container">
                    {/* Logo Section */}
                    <div className="logo">
                        <Link to="/" className="logo-link">
                            <div className="logo-icon">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM11 17.93L4 14.31V9.69L11 13.31V17.93ZM12 11.38L5.24 8L12 4.62L18.76 8L12 11.38ZM13 13.31L20 9.69V14.31L13 17.93V13.31Z"/>
                                </svg>
                            </div>
                            <h1 className="navbar-heading">
                                Algo<span className="highlight">Visualizer</span>
                            </h1>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="nav-links-desktop" aria-label="Primary">
                        <div className="nav-group main-nav">
                            {navItems.filter(item => item.group === 'main').map(item => (
                                <NavLink 
                                    key={item.path}
                                    to={item.path} 
                                    end={item.path === '/'}
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                >
                                    {item.icon && <item.icon className="nav-icon" />}
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                        </div>
                        
                        <div className="nav-separator"></div>
                        
                        <div className="nav-group learn-nav">
                            <span className="nav-group-label">Learn</span>
                            {navItems.filter(item => item.group === 'learn').map(item => (
                                <NavLink 
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                >
                                    {item.icon && <item.icon className="nav-icon" />}
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                        </div>
                        
                        <div className="nav-separator"></div>
                        
                        <div className="nav-group other-nav">
                            {navItems.filter(item => ['test', 'community', 'help'].includes(item.group)).map(item => (
                                <NavLink 
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                >
                                    {item.icon && <item.icon className="nav-icon" />}
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                        </div>
                    </nav>

                    {/* Action Buttons */}
                    <div className="nav-actions">
                        <a 
                            className="github-btn" 
                            href="https://github.com/RhythmPahwa14/AlgoVisualizer" 
                            target="_blank" 
                            rel="noreferrer noopener" 
                            aria-label="Star on GitHub"
                        >
                            <FaGithub className="github-icon" />
                            <span className="github-text">Star</span>
                        </a>

                        <button 
                            onClick={toggleTheme} 
                            className="theme-toggle-btn" 
                            aria-label="Toggle dark/light mode"
                        >
                            <div className="theme-icon-wrapper">
                                {theme === 'light' ? (
                                    <FaMoon className="theme-icon" />
                                ) : (
                                    <FaSun className="theme-icon" />
                                )}
                            </div>
                        </button>

                        <button 
                            className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
                            onClick={toggleMobileMenu} 
                            aria-label="Toggle menu" 
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span className="bar bar1"></span>
                            <span className="bar bar2"></span>
                            <span className="bar bar3"></span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu} />

            {/* Mobile Navigation */}
            <nav className={`nav-links-mobile ${isMobileMenuOpen ? 'active' : ''}`} aria-label="Mobile Navigation">
                <div className="mobile-nav-content">
                    <div className="mobile-nav-groups">
                        <div className="mobile-nav-group">
                            <div className="mobile-group-header">
                                <span>Main</span>
                            </div>
                            {navItems.filter(item => item.group === 'main').map((item, index) => (
                                <NavLink 
                                    key={item.path}
                                    to={item.path}
                                    end={item.path === '/'}
                                    className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                                    onClick={toggleMobileMenu}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {item.icon && <item.icon className="mobile-nav-icon" />}
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                        </div>

                        <div className="mobile-nav-group">
                            <div className="mobile-group-header">
                                <span>Learn Algorithms</span>
                            </div>
                            {navItems.filter(item => item.group === 'learn').map((item, index) => (
                                <NavLink 
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                                    onClick={toggleMobileMenu}
                                    style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                                >
                                    {item.icon && <item.icon className="mobile-nav-icon" />}
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                        </div>

                        <div className="mobile-nav-group">
                            <div className="mobile-group-header">
                                <span>More</span>
                            </div>
                            {navItems.filter(item => ['test', 'community', 'help'].includes(item.group)).map((item, index) => (
                                <NavLink 
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                                    onClick={toggleMobileMenu}
                                    style={{ animationDelay: `${(index + 4) * 0.1}s` }}
                                >
                                    {item.icon && <item.icon className="mobile-nav-icon" />}
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;