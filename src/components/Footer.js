import React from 'react';
import '../styles/footer.css';
import { FaGithub, FaLinkedin} from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <h3 className="footer-heading">AlgoVisualizer</h3>
                <p className="footer-description">
                    Visualize and understand algorithms interactively.<br />
                    Master data structures and algorithms with step-by-step visualizations.
                </p>

                <div className="footer-social">
                    <h4 className="footer-social-title">Connect with us</h4>
                    <div className="social-icons">
                        <a href="https://github.com/RhythmPahwa14/AlgoVisualizer" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                            <FaGithub />
                        </a>
                        <a href="https://linkedin.com/in/sandeepvashishtha" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>

                <nav className="footer-links" aria-label="Footer navigation">
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/terms">Terms of Service</Link>
                    <Link to="/about" className="about-link">About</Link>
                    <Link to="/contact" className="contact-link">Contact Us</Link>
                    <a href="/contribute">Contribute</a>
                </nav>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} AlgoVisualizer. All rights reserved.</p>
                <p>
                    Developed with <span role="img" aria-label="love">❤️</span> by&nbsp;
                    <a href="https://github.com/sandeepvashishtha" target="_blank" rel="noopener noreferrer" className="footer-author">
                        Sandeep Vashishtha
                    </a>
                    &nbsp;and amazing open source contributors
                </p>
                <div className="copyright">
                    <span>Made with React &amp; JavaScript</span> • <span>Open Source</span> • <span>Educational Purpose</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;