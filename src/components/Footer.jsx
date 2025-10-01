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
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/footer-improved.css";
import logo from "/public/logo.jpg";
import { FaXTwitter } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";
import { navigationLinks, resourceLinks, socialLinks, techPills } from "../utils/footerData";

// Sub-component for rendering footer links
const FooterLink = ({ to, icon: Icon, children }) => (
  <li>
    <Link to={to} className="footer-link">
      <Icon className="link-icon" />
      {children}
    </Link>
  </li>
);

// Sub-component for rendering social links
const SocialLink = ({ href, icon: Icon, title }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="social-link"
    title={title}
  >
    <Icon />
  </a>
);

// Sub-component for rendering tech pills
const TechPill = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="tech-pill"
  >
    {children}
  </a>
);

// Sub-component for newsletter form
const NewsletterForm = ({ email, setEmail, isLoading, handleSubmit, isSubscribed }) => {
  if (isSubscribed) {
    return (
      <div className="subscription-success">
        <div className="success-checkmark">
          <div className="check-icon"></div>
        </div>
        <h4>You're subscribed!</h4>
        <p>Look out for our updates in your inbox.</p>
      </div>
    );
  }

  return (
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
  );
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Form validation and submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Email validation
    if (!validateEmail(email)) {
      setIsLoading(false);
      return;
    }

    try {
      await simulateSubscription();
      handleSuccessfulSubscription();
    } catch (error) {
      toast.error("❌ " + error.message);
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsSubscribed(false), 8000);
    }
  };

  // Email validation helper
  const validateEmail = (email) => {
    if (!email) {
      toast.error("Please enter your email address");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    return true;
  };

  // Simulate subscription API call
  const simulateSubscription = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error("Subscription service temporarily unavailable"));
        }
      }, 1500);
    });
  };

  // Handle successful subscription
  const handleSuccessfulSubscription = () => {
    setIsSubscribed(true);
    toast.success("🎉 Successfully subscribed to our newsletter!");
    setEmail("");

    setTimeout(() => {
      toast.info("📧 Welcome email sent! Check your inbox.");
    }, 1000);
  };

  // Icon mapping helper
  const getIconComponent = (iconName) => {
    const iconMap = {
      "FaRocket": FaRocket,
      "FaCode": FaCode,
      "FaGraduationCap": FaGraduationCap,
      "FaEnvelope": FaEnvelope,
      "FaGithub": FaGithub,
      "FaLinkedin": FaLinkedin,
      "FaXTwitter": FaXTwitter,
      "FaDiscord": FaDiscord,
      "FaYoutube": FaYoutube,
    };
    return iconMap[iconName] || null;
  };

  return (
    <>
      <footer className={`footer-container ${isVisible ? "visible" : ""}`}>
        <div
          className="footer-wave"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
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

        <div className="footer-content">
          {/* Brand Section */}
          <div
            className="footer-column brand-column"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
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
              {techPills.map((pill, index) => (
                <TechPill key={index} href={pill.href}>
                  {pill.label}
                </TechPill>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div
            className="footer-column links-column"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            <h3 className="column-title">Navigate</h3>
            <ul className="footer-links">
              {navigationLinks.map((link, index) => (
                <FooterLink 
                  key={index} 
                  to={link.to} 
                  icon={getIconComponent(link.icon)}
                >
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div
            className="footer-column resources-column"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="600"
          >
            <h3 className="column-title">Resources</h3>
            <ul className="footer-links">
              {resourceLinks.map((link, index) => (
                <FooterLink 
                  key={index} 
                  to={link.to} 
                  icon={getIconComponent(link.icon)}
                >
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div
            className="footer-column newsletter-column"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="800"
          >
            <h3 className="column-title">Stay Updated</h3>
            <p className="newsletter-description">
              Get the latest algorithm visualizations and coding insights
              delivered to your inbox.
            </p>

            <NewsletterForm
              email={email}
              setEmail={setEmail}
              isLoading={isLoading}
              handleSubmit={handleSubmit}
              isSubscribed={isSubscribed}
            />

            <div className="social-links">
              {socialLinks.map((link, index) => (
                <SocialLink
                  key={index}
                  href={link.href}
                  icon={getIconComponent(link.icon)}
                  title={link.title}
                />
              ))}
            </div>
          </div>
        </div>

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
                <p className="para-text">
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