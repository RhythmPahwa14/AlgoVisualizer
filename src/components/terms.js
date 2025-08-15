import React from 'react';
import "../styles/terms.css";

const TermsOfService = () => {
    return (
        <div className="terms-container">
            <div className="terms-content">
                <div className="terms-header">
                    <h1>Terms of Service</h1>
                    <p className="effective-date">Last Updated: 13th August, 2025</p>
                </div>
                
                <div className="terms-sections">
                    <section className="terms-section">
                        <h2>1. Acceptance of Terms</h2>
                        <p>By accessing or using our platform, you agree to be bound by these Terms. If you disagree, you must discontinue use immediately.</p>
                    </section>

                    <section className="terms-section">
                        <h2>2. Account Registration</h2>
                        <p>To access certain features, you must register an account. You agree to:</p>
                        <ul className="terms-list">
                            <li>Provide accurate and complete information</li>
                            <li>Maintain the security of your credentials</li>
                            <li>Accept responsibility for all activities under your account</li>
                        </ul>
                    </section>

                    <section className="terms-section">
                        <h2>3. User Responsibilities</h2>
                        <p>You agree not to:</p>
                        <ul className="terms-list">
                            <li>Use the service for illegal purposes</li>
                            <li>Attempt to disrupt service operations</li>
                            <li>Share content that violates intellectual property rights</li>
                            <li>Use automated tools to access our services</li>
                        </ul>
                    </section>

                    <section className="terms-section">
                        <h2>4. Intellectual Property</h2>
                        <p>All visualizations, educational content, and platform code are protected by copyright. Personal use is permitted; commercial redistribution requires written consent.</p>
                    </section>

                    <section className="terms-section">
                        <h2>5. Termination</h2>
                        <p>We may suspend or terminate your account for violations of these Terms. You may stop using our services at any time.</p>
                    </section>

                    <section className="terms-section">
                        <h2>6. Limitation of Liability</h2>
                        <p>We are not liable for:</p>
                        <ul className="terms-list">
                            <li>Inaccuracies in algorithm representations</li>
                            <li>Service interruptions</li>
                            <li>Consequences of using our educational materials</li>
                        </ul>
                    </section>

                    <section className="terms-section">
                        <h2>7. Changes to Terms</h2>
                        <p>We may modify these Terms and will notify users of significant changes through our platform or via email.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;