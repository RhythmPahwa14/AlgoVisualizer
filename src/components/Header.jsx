import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import '../styles/header.css';
import { useTheme } from '../ThemeContext';
import { FaGithub, FaMoon, FaSun, FaCode, FaSearch, FaDatabase, FaBrain, FaUsers, FaBook, FaProjectDiagram, FaQuestionCircle, FaRocket, FaGraduationCap, FaEnvelope } from 'react-icons/fa';
import { headerNavigationItems } from '../utils/navigation';
import { headerIconMap, headerNavigationStructure } from '../utils/headerData';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

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

    // Map string icon names to actual icon components
    const getIconComponent = (iconName) => {
        const iconMap = {
            'FaCode': FaCode,
            'FaSearch': FaSearch,
            'FaDatabase': FaDatabase,
            'FaProjectDiagram': FaProjectDiagram,
            'FaBrain': FaBrain,
            'FaUsers': FaUsers,
            'FaBook': FaBook,
            'FaQuestionCircle': FaQuestionCircle,
            'FaRocket': FaRocket,
            'FaGraduationCap': FaGraduationCap,
            'FaEnvelope': FaEnvelope,
        };
        return iconMap[iconName] || null;
    };

    // Get navigation items by group
    const getNavigationItemsByGroup = (groupName) => {
        const group = headerNavigationStructure.find(g => g.group === groupName);
        return group ? group.items : [];
    };

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
                            {getNavigationItemsByGroup('main').map(item => (
                                <NavLink 
                                    key={item.path}
                                    to={item.path} 
                                    end={item.path === '/'}
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                >
                                    {item.icon && React.createElement(getIconComponent(item.icon), { className: "nav-icon" })}
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                        </div>
                        
                        <div className="nav-separator"></div>
                        
                        <div className="nav-group learn-nav">
                            <span className="nav-group-label">Learn</span>
                            {getNavigationItemsByGroup('learn').map(item => (
                                <NavLink 
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                >
                                    {item.icon && React.createElement(getIconComponent(item.icon), { className: "nav-icon" })}
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                        </div>
                        
                        <div className="nav-separator"></div>
                        
                        <div className="nav-group other-nav">
                            {getNavigationItemsByGroup('test').map(item => (
                                <NavLink 
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                >
                                    {item.icon && React.createElement(getIconComponent(item.icon), { className: "nav-icon" })}
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                            {getNavigationItemsByGroup('community').map(item => (
                                <NavLink 
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                >
                                    {item.icon && React.createElement(getIconComponent(item.icon), { className: "nav-icon" })}
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                            {getNavigationItemsByGroup('help').map(item => (
                                <NavLink 
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                >
                                    {item.icon && React.createElement(getIconComponent(item.icon), { className: "nav-icon" })}
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
                    <div className="mobile-nav-header">
                        <div className="mobile-nav-actions">
                            <a 
                                className="mobile-github-btn" 
                                href="https://github.com/RhythmPahwa14/AlgoVisualizer" 
                                target="_blank" 
                                rel="noreferrer noopener"
                                onClick={toggleMobileMenu}
                            >
                                <FaGithub />
                                <span>Star on GitHub</span>
                            </a>
                            
                            <button 
                                onClick={toggleTheme} 
                                className="mobile-theme-toggle"
                                aria-label="Toggle theme"
                            >
                                {theme === 'light' ? <FaMoon /> : <FaSun /> }
                            </button>
                        </div>
                    </div>

                    <div className="mobile-nav-groups">
                        <div className="mobile-nav-group">
                            <div className="mobile-group-header">
                                <span>Main</span>
                            </div>
                            {getNavigationItemsByGroup('main').map((item, index) => (
                                <NavLink 
                                    key={item.path}
                                    to={item.path}
                                    end={item.path === '/'}
                                    className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                                    onClick={toggleMobileMenu}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {item.icon && React.createElement(getIconComponent(item.icon), { className: "mobile-nav-icon" })}
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                        </div>

                        <div className="mobile-nav-group">
                            <div className="mobile-group-header">
                                <span>Learn Algorithms</span>
                            </div>
                            {getNavigationItemsByGroup('learn').map((item, index) => (
                                <NavLink 
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                                    onClick={toggleMobileMenu}
                                    style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                                >
                                    {item.icon && React.createElement(getIconComponent(item.icon), { className: "mobile-nav-icon" })}
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                        </div>

                        <div className="mobile-nav-group">
                            <div className="mobile-group-header">
                                <span>More</span>
                            </div>
                            {getNavigationItemsByGroup('test').map((item, index) => (
                                <NavLink 
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                                    onClick={toggleMobileMenu}
                                    style={{ animationDelay: `${(index + 4) * 0.1}s` }}
                                >
                                    {item.icon && React.createElement(getIconComponent(item.icon), { className: "mobile-nav-icon" })}
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                            {getNavigationItemsByGroup('community').map((item, index) => (
                                <NavLink 
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                                    onClick={toggleMobileMenu}
                                    style={{ animationDelay: `${(index + 5) * 0.1}s` }}
                                >
                                    {item.icon && React.createElement(getIconComponent(item.icon), { className: "mobile-nav-icon" })}
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                            {getNavigationItemsByGroup('help').map((item, index) => (
                                <NavLink 
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                                    onClick={toggleMobileMenu}
                                    style={{ animationDelay: `${(index + 6) * 0.1}s` }}
                                >
                                    {item.icon && React.createElement(getIconComponent(item.icon), { className: "mobile-nav-icon" })}
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