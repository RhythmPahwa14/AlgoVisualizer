import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../styles/header.css';
import { useTheme } from '../ThemeContext';
import { FaGithub, FaMoon, FaSun, FaCode, FaSearch, FaDatabase, FaBrain, FaUsers, FaBook, FaProjectDiagram, FaQuestionCircle, FaRocket, FaGraduationCap, FaEnvelope, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { headerNavigationItems } from '../utils/navigation';
import { headerIconMap, headerNavigationStructure } from '../utils/headerData';
import AuthModal from './AuthModal';

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authMode, setAuthMode] = useState('login');
    const location = useLocation();
    const navigate = useNavigate();

    // Check if user is logged in
    useEffect(() => {
        const checkLoginStatus = () => {
            const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
            const userData = localStorage.getItem("user");
            
            setIsLoggedIn(isLoggedIn);
            if (userData) {
                setUser(JSON.parse(userData));
            }
        };
        
        checkLoginStatus();
        
        // Add event listener for storage changes
        window.addEventListener('storage', checkLoginStatus);
        
        return () => {
            window.removeEventListener('storage', checkLoginStatus);
        };
    }, []);
    
    // Function to open auth modal
    const openAuthModal = (mode) => {
        setAuthMode(mode);
        setShowAuthModal(true);
    };

    // Function to close auth modal
    const closeAuthModal = () => {
        setShowAuthModal(false);
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("rememberMe");
        setIsLoggedIn(false);
        setUser(null);
        navigate("/");
        setIsMobileMenuOpen(false);
    };

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

    // Add scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                        {isLoggedIn ? (
                            <>
                                <div className="user-profile">
                                    <button className="profile-button">
                                        <FaUser className="profile-icon" />
                                        <span>{user?.name || 'User'}</span>
                                    </button>
                                </div>
                                <button onClick={handleLogout} className="auth-btn logout-btn">
                                    <FaSignOutAlt className="logout-icon" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => openAuthModal('login')} className="auth-btn login-btn">
                                    Login
                                </button>
                                <button onClick={() => openAuthModal('signup')} className="auth-btn signup-btn">
                                    Sign Up
                                </button>
                            </>
                        )}
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
                            style={{
                                color: '#000000',
                                display: 'inline-flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '4px',
                                width: '40px',
                                height: '40px'
                            }}
                        >
                            <span
                                className="bar bar1"
                                style={{
                                    display: 'block',
                                    width: '18px',
                                    height: '2px',
                                    borderRadius: '2px',
                                    backgroundColor: '#000000'
                                }}
                            ></span>
                            <span
                                className="bar bar2"
                                style={{
                                    display: 'block',
                                    width: '18px',
                                    height: '2px',
                                    borderRadius: '2px',
                                    backgroundColor: '#000000'
                                }}
                            ></span>
                            <span
                                className="bar bar3"
                                style={{
                                    display: 'block',
                                    width: '18px',
                                    height: '2px',
                                    borderRadius: '2px',
                                    backgroundColor: '#000000'
                                }}
                            ></span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}
                onClick={toggleMobileMenu}
                style={{
                    backdropFilter: 'none',
                    WebkitBackdropFilter: 'none',
                }}
            />

            {/* Mobile Navigation */}
            <nav className={`nav-links-mobile ${isMobileMenuOpen ? 'active' : ''}`} aria-label="Mobile Navigation">
                <div className="mobile-nav-content">
                    <div className="mobile-nav-header">
                        <div className="mobile-nav-actions">
                            {isLoggedIn ? (
                                <>
                                    <div className="mobile-user-profile">
                                        <FaUser className="mobile-profile-icon" />
                                        <span>{user?.name || 'User'}</span>
                                    </div>
                                    <button onClick={handleLogout} className="mobile-auth-btn mobile-logout-btn">
                                        <FaSignOutAlt className="mobile-logout-icon" />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="mobile-auth-btn mobile-login-btn" onClick={toggleMobileMenu}>
                                        Login
                                    </Link>
                                    <Link to="/signup" className="mobile-auth-btn mobile-signup-btn" onClick={toggleMobileMenu}>
                                        Sign Up
                                    </Link>
                                </>
                            )}
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