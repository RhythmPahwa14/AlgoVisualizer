import React from "react";
import "../styles/footer.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <section className="footer-left">
          <h3 className="footer-heading">AlgoVisualizer</h3>
          <p className="footer-description">
            Visualize and understand algorithms interactively.
            <br />
            Master data structures and algorithms with step-by-step
            visualizations.
          </p>
        </section>

        <section className="footer-mid">
          <h4 className="footer-link-title">Quick Links</h4>
          <nav className="footer-links" aria-label="Footer navigation">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="https://github.com/RhythmPahwa14/AlgoVisualizer">Contribute</Link>
          </nav>
        </section>

        <section className="footer-right">
          <h4 className="footer-social-title">Connect with us</h4>
          <div className="social-icons">
            <div className="social-inner">
              <a
                href="https://github.com/RhythmPahwa14/AlgoVisualizer"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="social-icon"
              >
                <FaGithub />
              </a>
              <p>GitHub</p>
            </div>
            <div className="social-inner">
              <a
                href="https://linkedin.com/in/sandeepvashishtha"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-icon"
              >
                <FaLinkedin />
              </a>
              <p>LinkedIn</p>
            </div>
          </div>
        </section>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} AlgoVisualizer. All rights reserved.
        </p>
        <p>
          Developed with{" "}
          <span role="img" aria-label="love">
            ❤️
          </span>{" "}
          by{" "}
          <a
            href="https://github.com/rhythmpahwa14"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-author"
          >
            Rhythm Pahwa
          </a>{", "}
          <a
            href="https://github.com/sandeepvashishtha"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-author"
          >
            Sandeep Vashishtha
          </a>{" "}
          and amazing open-source contributors.
        </p>
        <div className="copyright">
          <span>Made with React &amp; JavaScript</span> •{" "}
          <span>Open Source</span> • <span>Educational Purpose</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
