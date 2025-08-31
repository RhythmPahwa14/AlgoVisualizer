import React from 'react';
import "../styles/privacy.css";

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy-container">
            <div className="privacy-content">
                <div className="privacy-header">
                    <h1>Privacy Policy</h1>
                    <p className="last-updated">LAST UPDATED :13th AUGUST, 2025</p>
                </div>
                
                <div className="privacy-sections">
                    <section className="privacy-section">
                        <h2>1. Information Collection</h2>
                        <p>We collect information when you:</p>
                        <ul className="privacy-list">
                            <li>Register on our algorithm visualization platform</li>
                            <li>Use interactive features of our tools</li>
                            <li>Contact us for support or feedback</li>
                        </ul>
                        <p>This may include your name, email, and usage data.</p>
                    </section>

                    <section className="privacy-section">
                        <h2>2. Use of Information</h2>
                        <p>We use collected information to:</p>
                        <ul className="privacy-list">
                            <li>Provide and improve our educational services</li>
                            <li>Personalize your learning experience</li>
                            <li>Respond to your inquiries</li>
                            <li>Analyze platform usage for optimization</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>3. Data Protection</h2>
                        <p>We implement security measures including:</p>
                        <ul className="privacy-list">
                            <li>Encryption of sensitive data</li>
                            <li>Regular security audits</li>
                            <li>Limited access to personal information</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>4. Third-Party Services</h2>
                        <p>We may use services like Google Analytics for usage tracking. These third parties have their own privacy policies.</p>
                    </section>

                    <section className="privacy-section">
                        <h2>5. Your Rights</h2>
                        <p>You can request to:</p>
                        <ul className="privacy-list">
                            <li>Access your personal data</li>
                            <li>Correct inaccurate information</li>
                            <li>Delete your account and associated data</li>
                            <li>Opt-out of communications</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;