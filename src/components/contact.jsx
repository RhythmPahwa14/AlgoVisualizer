import React from "react";
import "../styles/contact.css";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
// Import the FaqChatbot component you provided
import FaqChatbot from './FaqChatbot';

export default function Contact() {
    return (
        <div className="contact">
            <h1>Contact Us</h1>
            <p>AlgoVisualizer is more than just a tool—it’s a bridge between abstract algorithms and intuitive understanding. Whether you’re a student struggling with sorting concepts, a developer prepping for interviews, or an educator seeking dynamic teaching aids, we’re here to help. Have questions, suggestions, or feedback? Reach out to us! Your input drives our mission to make algorithm learning visual, interactive, and accessible to all. Let’s build a smarter coding community together.</p>
            <h3>Visualizing Algorithms, Simplifying Learning</h3>
            <div className="connection">
                <div className="input-group">
                    <label>Name: </label>
                    <input type="text" placeholder="Enter your name" /><br></br>
                </div>
                <div className="input-group">
                    <label>Email: </label>
                    <input type="email" placeholder="Enter your email" /><br></br>
                </div>
                <div className="input-group">
                    <label>Message: </label>
                    <textarea placeholder="Enter your message"></textarea><br></br>
                </div>
                <button className="submit-btn">Submit</button>
            </div>
            <div className="links">
                <h4>Get in touch </h4>
                <div className="social-icons">
                    <a href="https://github.com/SandeepVashishtha/AlgoVisualizer" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaGithub />
                    </a>
                    <a href="https://linkedin.com/in/sandeep-vashishtha" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaLinkedin />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaTwitter />
                    </a>
                    <a href="mailto:contact@algovisualizer.com" className="social-icon">
                        <FaEnvelope />
                    </a>
                </div>
                <p>Thank you for reaching out! Your message is important to us, and we’ll do our best to respond as soon as possible. If your inquiry is urgent, feel free to connect with us. We appreciate your time and look forward to connecting with you!!</p>
            </div>
            
            {/* Add the FaqChatbot component here */}
            <FaqChatbot />
        </div>
    );
}