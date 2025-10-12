import React, { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";
import "../styles/cookie-policy.css";
import { Link } from "react-router-dom";

const CookiePolicy = () => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [openSection, setOpenSection] = useState("what-are-cookies");

  useEffect(() => {
    // Animation trigger
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleContactClick = (e) => {
    e.preventDefault();
    // Smooth scroll to contact section or navigate
    console.log("Navigate to contact");
  };

  const handleSectionClick = (sectionId) => {
    if (openSection === sectionId) {
      setOpenSection(null); // Close if already open
    } else {
      setOpenSection(sectionId); // Open this section
    }
  };

  const cookieSections = [
    {
      id: "what-are-cookies",
      icon: "🍪",
      title: "What Are Cookies",
      content:
        "Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and analyzing how you use our platform.",
      additionalContent: (
        <div className="info-card">
          <div className="info-icon">💡</div>
          <div className="info-content">
            <h4>Did You Know?</h4>
            <p>
              Cookies cannot contain viruses or malware, and they don't store
              personal information unless you provide it.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "how-we-use",
      icon: "🎯",
      title: "How We Use Cookies",
      content: "We use cookies for the following purposes:",
      additionalContent: (
        <div className="usage-grid">
          <div className="usage-card">
            <div className="card-icon">🔒</div>
            <h4>Essential Cookies</h4>
            <p>Required for basic website functionality and security</p>
          </div>
          <div className="usage-card">
            <div className="card-icon">⚙️</div>
            <h4>Preference Cookies</h4>
            <p>Remember your settings like theme preferences and language</p>
          </div>
          <div className="usage-card">
            <div className="card-icon">📊</div>
            <h4>Analytics Cookies</h4>
            <p>Help us understand how users interact with our algorithms</p>
          </div>
          <div className="usage-card">
            <div className="card-icon">🚀</div>
            <h4>Performance Cookies</h4>
            <p>Improve website loading times and user experience</p>
          </div>
        </div>
      ),
    },
    {
      id: "types-of-cookies",
      icon: "📋",
      title: "Types of Cookies We Use",
      content: "Our platform uses the following categories of cookies:",
      additionalContent: (
        <div className="comparison-table">
          <div className="table-header">
            <div>Cookie Type</div>
            <div>Duration</div>
            <div>Purpose</div>
          </div>
          <div className="table-row">
            <div>
              <strong>Session Cookies</strong>
            </div>
            <div>Temporary</div>
            <div>Expire when you close your browser</div>
          </div>
          <div className="table-row">
            <div>
              <strong>Persistent Cookies</strong>
            </div>
            <div>Set Period</div>
            <div>Remain until manually deleted or expired</div>
          </div>
          <div className="table-row">
            <div>
              <strong>First-party Cookies</strong>
            </div>
            <div>Varies</div>
            <div>Set directly by AlgoVisualizer</div>
          </div>
          <div className="table-row">
            <div>
              <strong>Third-party Cookies</strong>
            </div>
            <div>Varies</div>
            <div>Set by external services like analytics</div>
          </div>
        </div>
      ),
    },
    {
      id: "specific-cookies",
      icon: "🔍",
      title: "Specific Cookies We Use",
      content: "Here are the main cookies used on our platform:",
      additionalContent: (
        <div className="cookie-details">
          <div className="cookie-item">
            <span className="cookie-name">theme</span>
            <span className="cookie-purpose">
              Stores your preferred theme (light/dark mode)
            </span>
          </div>
          <div className="cookie-item">
            <span className="cookie-name">algorithm_preferences</span>
            <span className="cookie-purpose">
              Remembers your favorite algorithms and settings
            </span>
          </div>
          <div className="cookie-item">
            <span className="cookie-name">session_id</span>
            <span className="cookie-purpose">
              Maintains your session for security purposes
            </span>
          </div>
          <div className="cookie-item">
            <span className="cookie-name">analytics_*</span>
            <span className="cookie-purpose">
              Anonymous usage data for improving our services
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "manage-preferences",
      icon: "🛠️",
      title: "Managing Your Cookie Preferences",
      content: "You have several options to manage cookies:",
      items: [
        "Use your browser settings to block or delete cookies",
        "Adjust cookie preferences in our settings panel",
        "Opt out of analytics cookies while maintaining functionality",
        "Use private/incognito browsing mode",
      ],
      additionalContent: (
        <div className="warning-note">
          <div className="warning-icon">⚠️</div>
          <p>
            Please note that disabling certain cookies may affect website
            functionality and your user experience.
          </p>
        </div>
      ),
    },
    {
      id: "third-party",
      icon: "🌐",
      title: "Third-Party Services",
      content:
        "We use the following third-party services that may set cookies:",
      additionalContent: (
        <div className="third-party-grid">
          <div className="service-card">
            <div className="service-logo">▲</div>
            <h4>Vercel Analytics</h4>
            <p>Website performance and usage analytics</p>
          </div>
          <div className="service-card">
            <div className="service-logo">🐙</div>
            <h4>GitHub</h4>
            <p>Authentication and repository integration</p>
          </div>
          <div className="service-card">
            <div className="service-logo">🔤</div>
            <h4>Google Fonts</h4>
            <p>Typography (may cache font preferences)</p>
          </div>
        </div>
      ),
    },
    {
      id: "cookie-consent",
      icon: "✅",
      title: "Cookie Consent",
      content:
        "By continuing to use AlgoVisualizer, you consent to our use of cookies as described in this policy. You can withdraw consent at any time by adjusting your browser settings or contacting us.",
    },
    {
      id: "updates",
      icon: "🔄",
      title: "Updates to This Policy",
      content:
        "We may update this Cookie Policy to reflect changes in our practices or legal requirements. We will notify users of significant changes through our platform or via email.",
    },
    {
      id: "contact-us",
      icon: "📞",
      title: "Contact Us",
      content:
        "If you have questions about our use of cookies or this policy, please contact us through our Contact page or reach out to our development team on GitHub.",
      additionalContent: (
        <div className="action-buttons">
          <button className="btn-primary" onClick={handleContactClick}>
            Contact Support
          </button>
        </div>
      ),
    },
  ];

  return (
    <div
      className={`cookie-policy-container ${isVisible ? "visible" : ""}`}
      data-theme={theme}
    >
      <div className="cookie-policy-content">
        {/* Header with decorative elements */}
        <div className="cookie-policy-header">
          <div className="header-decoration">
            <div className="decoration-circle"></div>
            <div className="decoration-circle"></div>
            <div className="decoration-circle"></div>
          </div>
          <h1>Cookie Policy</h1>
          <p className="effective-date">Last Updated: 13th August, 2025</p>
          <div className="header-subtitle">
            Understanding how we use cookies to enhance your experience
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="reading-progress">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>

        <div className="cookie-policy-sections">
          {cookieSections.map((section) => {
            const isOpen = openSection === section.id;

            return (
              <section
                key={section.id}
                className="cookie-policy-section"
                id={section.id}
              >
                <div
                  className="section-header clickable"
                  onClick={() => handleSectionClick(section.id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="section-icon">
                    <span>{section.icon}</span>
                  </div>
                  <h2 className="section-title">{section.title}</h2>
                  <div className="toggle-icon">{isOpen ? "−" : "+"}</div>
                </div>

                {isOpen && (
                  <div className="section-content">
                    <p className="section-description">{section.content}</p>

                    {section.items && (
                      <ul className="cookie-policy-list">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="cookie-list-item">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.additionalContent}
                  </div>
                )}
              </section>
            );
          })}
        </div>

        <div className="contact-section">
          <div className="contact-content">
            <h3 className="contact-title">Questions About Cookies?</h3>
            <button className="contact-button">
              <Link to="/contact">Contact Support</Link>
            </button>
          </div>
        </div>

        <footer className="cookie-footer">
          <p>© 2025 Algorithm Visualization Platform</p>
        </footer>
      </div>
    </div>
  );
};

export default CookiePolicy;
