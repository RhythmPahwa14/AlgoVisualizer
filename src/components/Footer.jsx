import React, { useState, useEffect } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaHeart,
  FaCode,
  FaGraduationCap,
  FaTwitter,
  FaYoutube,
  FaDiscord,
  FaRocket,
  FaArrowRight,
  FaBars,
  FaTimes,
  FaHome,
  FaChartBar,
  FaSearch,
  FaDatabase,
  FaGitBranch,
  FaUsers,
  FaTrophy,
  FaCogs,
  FaBook,
  FaHash,
  FaBolt,
  FaTree,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/footer.css";
import logo from "/public/logo.jpg";
import { FaXTwitter } from "react-icons/fa6";
import { useMobileMenu } from "../contexts/MobileMenuContext";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { isFooterMenuOpen, openFooterMenu, closeFooterMenu } = useMobileMenu();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email) {
      toast.error("Please enter your email address");
      setIsLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.1) {
            resolve();
          } else {
            reject(new Error("Subscription service temporarily unavailable"));
          }
        }, 1500);
      });

      setIsSubscribed(true);
      toast.success("🎉 Successfully subscribed to our newsletter!");
      setEmail("");

      setTimeout(() => {
        toast.info("📧 Welcome email sent! Check your inbox.");
      }, 1000);
    } catch (error) {
      toast.error("❌ " + error.message);
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsSubscribed(false), 8000);
    }
  };

  // Navigation items for mobile menu
  const navigationItems = [
    { path: "/", icon: FaHome, label: "Home" },
    {
      label: "Sorting",
      icon: FaChartBar,
      dropdown: [
        { path: "/sorting", label: "Overview" },
        { path: "/components/AlgorithmComparison", label: "Algorithm Comparison" },
      ],
    },
    {
      label: "Searching",
      icon: FaSearch,
      dropdown: [
        { path: "/searchingOverview", label: "Overview" },
        { path: "/searching", label: "Searching Algorithm" },
      ],
    },
    {
      label: "Data Structures",
      icon: FaDatabase,
      dropdown: [
        { path: "/data-structures", label: "Overview" },
        { path: "/data-structures/linked-list", label: "Linked List" },
        { path: "/data-structures/queue", label: "Queue visualization" },
        { path: "/data-structures/stack", label: "Stack visualization" },
      ],
    },
    {
      label: "Graph",
      icon: FaGitBranch,
      dropdown: [
        { path: "/graph", label: "Overview" },
        { path: "/graph/bfs", label: "BFS" },
        { path: "/graph/dfs", label: "DFS" },
        { path: "/graph/dijkstra", label: "Dijkstra" },
        { path: "/graph/comparison", label: "Graph Comparison" },
      ],
    },
    {
      label: "Backtracking",
      icon: FaBook,
      dropdown: [
        { path: "/backtracking-overview", label: "Overview" },
        { path: "/backtracking", label: "Algorithms" },
      ],
    },
    {
      label: "Dynamic Programming",
      icon: FaCogs,
      dropdown: [
        { path: "/dp-overview", label: "Overview" },
        { path: "/dp", label: "Algorithms" },
      ],
    },
    {
      label: "Hashing",
      icon: FaHash,
      dropdown: [
        { path: "/hashing-overview", label: "Overview" },
        { path: "/hashing", label: "Algorithms" },
      ],
    },
    {
      label: "Greedy Algorithms",
      icon: FaBolt,
      dropdown: [
        { path: "/greedy-overview", label: "Overview" },
        { path: "/greedy", label: "Algorithms" },
      ],
    },
    {
      label: "Divide & Conquer",
      icon: FaCode,
      dropdown: [
        { path: "/dc-overview", label: "Overview" },
        { path: "/dc", label: "Algorithms" },
      ],
    },
    {
      label: "Trees",
      icon: FaTree,
      dropdown: [
        { path: "/tree-overview", label: "Overview" },
        { path: "/tree", label: "Algorithms" },
      ],
    },
    { path: "/quiz", icon: FaTrophy, label: "Quiz" },
    {
      label: "Community",
      icon: FaUsers,
      dropdown: [
        { path: "/community", label: "Overview" },
        { path: "/contributors", label: "Contributors" },
        { path: "/ContributorLeaderboard", label: "Leaderboard" },
      ],
    },
    { path: "/settings", icon: FaCogs, label: "Settings" },
  ];

  return (
    <>
      <footer className={`footer-container ${isVisible ? "visible" : ""}`}>
        <div className="footer-wave" data-aos="fade-up" data-aos-duration="1000">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>

        {/* Mobile Navigation Menu Button */}
        <button 
          className="mobile-nav-toggle"
          onClick={isFooterMenuOpen ? closeFooterMenu : openFooterMenu}
          aria-label={isFooterMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isFooterMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-column brand-column" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
            <div className="brand-header">
              <div className="logo-wrapper">
                <img
                  src={logo}
                  alt="AlgoVisualizer Logo"
                  className="logo-image"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <span className="logo-text">AlgoVisualizer</span>
              </div>
              <p className="brand-tagline">
                Visualize algorithms. Master coding. Elevate skills.
              </p>
            </div>

            <div className="tech-pills">
              <a
                href="https://react.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="tech-pill"
              >
                React
              </a>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                target="_blank"
                rel="noopener noreferrer"
                className="tech-pill"
              >
                JavaScript
              </a>
              <a
                href="https://d3js.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="tech-pill"
              >
                D3.js
              </a>
              <a
                href="https://nodejs.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="tech-pill"
              >
                Node.js
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column links-column" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
            <h3 className="column-title">Navigate</h3>
            <ul className="footer-links">
              <li>
                <Link to="/" className="link-icon">


                  <FaRocket className="link-icon" />

                  Home
                </Link>
              </li>
              <li>
                <Link to="/data-structures" className="link-icon">

                  <FaCode className="link-icon" />

                  Algorithms
                </Link>
              </li>
              <li>
                <Link to="/data-structures" className="link-icon">
                  <FaGraduationCap className="link-icon" />
                  Data Structures
                </Link>
              </li>
              <li>
                <Link to="/about" className="link-icon">
                  <FaGraduationCap className="link-icon" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="link-icon">
                  <FaEnvelope className="link-icon" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-column resources-column" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
            <h3 className="column-title">Resources</h3>
            <ul className="footer-links">
              <li>
                <Link to="/documentation" className="link-icon">

                  <FaGraduationCap className="link-icon" />

                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/faq" className="link-icon">
                  <FaGraduationCap className="link-icon" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/data-structures" className="link-icon">
                  <FaGraduationCap className="link-icon" />
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="/blog" className="link-icon">
                  <FaGraduationCap className="link-icon" />
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/community" className="link-icon">
                  <FaGraduationCap className="link-icon" />
                  Community
                </Link>
              </li>
              <li className="link-icon">
                <a
                  href="https://github.com/RhythmPahwa14/AlgoVisualizer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-icon"
                >
                  <FaCode className="link-icon" />
                  Contribute
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-column newsletter-column" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">
            <h3 className="column-title">Stay Updated</h3>
            <p className="newsletter-description">
              Get the latest algorithm visualizations and coding insights
              delivered to your inbox.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="newsletter-form">
                <div className="input-container">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="newsletter-input"
                    disabled={isLoading}
                  />
                </div>
                <button
                  type="submit"
                  className={`newsletter-btn ${isLoading ? "loading" : ""}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="btn-spinner"></div>
                  ) : (
                    <>
                      Subscribe <FaArrowRight className="btn-icon" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="subscription-success">
                <div className="success-checkmark">
                  <div className="check-icon"></div>
                </div>
                <h4>You're subscribed!</h4>
                <p>Look out for our updates in your inbox.</p>
              </div>
            )}

            <div className="social-links">
              <a
                href="https://github.com/RhythmPahwa14/AlgoVisualizer"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com/in/sandeepvashishtha"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a href="#" className="social-link" title="Twitter">
                <FaXTwitter />
              </a>
              <a href="#" className="social-link" title="Discord">
                <FaDiscord />
              </a>
              <a href="#" className="social-link" title="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`mobile-nav-menu ${isFooterMenuOpen ? "open" : ""}`}>
          <div className="mobile-nav-header">
            <div className="mobile-nav-header-content">
              <h3 className="mobile-nav-title">
                <FaBars />
                Navigation
              </h3>
              <button
                className="mobile-nav-close-btn"
                onClick={closeFooterMenu}
                aria-label="Close navigation menu"
              >
                <FaTimes />
              </button>
            </div>
            <p className="mobile-nav-subtitle">
              Explore algorithms & data structures
            </p>
          </div>

          <div className="mobile-nav-content">
            {navigationItems.map((item, index) =>
              item.dropdown ? (
                <div key={index} className="mobile-nav-dropdown">
                  <div className="mobile-nav-dropdown-header">
                    <item.icon />
                    <span>{item.label}</span>
                  </div>
                  <div className="mobile-nav-dropdown-content">
                    {item.dropdown.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className="mobile-nav-dropdown-item"
                        onClick={closeFooterMenu}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={index}
                  to={item.path}
                  className="mobile-nav-link"
                  onClick={closeFooterMenu}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              )
            )}
          </div>
        </div>

        {/* Mobile Navigation Backdrop */}
        {isFooterMenuOpen && (
          <div
            className="mobile-nav-backdrop"
            onClick={closeFooterMenu}
          />
        )}

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="bottom-content">
            <div className="footer-main-row">
              <div className="copyright">
                <p>
                  &copy; {new Date().getFullYear()} AlgoVisualizer. All rights
                  reserved.
                </p>
              </div>
              <div className="footer-separator">•</div>
              <div className="footer-credits">
                <p>
                  Made with <FaHeart className="heart-icon" /> by{" "}
                  <a
                    href="https://github.com/rhythmpahwa14"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Rhythm Pahwa
                  </a>{" "}
                  &{" "}
                  <a
                    href="https://github.com/sandeepvashishtha"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sandeep Vashishtha
                  </a>
                </p>
              </div>
            </div>

            <div className="footer-legal-row">
              <div className="legal-links">
                <Link to="/privacy">Privacy Policy</Link>
                <span className="legal-separator">|</span>
                <Link to="/terms">Terms of Service</Link>
                <span className="legal-separator">|</span>
                <Link to="/cookies">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Footer;