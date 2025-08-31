import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import '../styles/doubt.css';

const Doubt = () => {
    const [email, setEmail] = useState('');
    const [doubt, setDoubt] = useState('');
    const [emailError, setEmailError] = useState('');
    const [doubtError, setDoubtError] = useState('');
    const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'

  
  // Hide confirmation/error message after 3 seconds
    useEffect(() => {
        if (submitStatus) {
            const timer = setTimeout(() => {
                setSubmitStatus(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [submitStatus]);
  
    const validateEmail = () => {
        if (!email) {
            setEmailError('Please enter your email address.');
            return false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Please enter a valid email address.');
            return false;
        }
        setEmailError('');
        return true;
    };

    const validateDoubt = () => {
        if (!doubt) {
            setDoubtError(' Please enter your doubt.');
            return false;
        }
        setDoubtError('');
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isEmailValid = validateEmail();
        const isDoubtValid = validateDoubt();

        if (isEmailValid && isDoubtValid) {
            try {
                // Simulate successful submission
                setSubmitStatus('success');
                setEmail('');
                setDoubt('');
            } catch (error) {
                setSubmitStatus('error');
            }
        } else {
            setSubmitStatus(null);
        }
    };

    return (
        <div className="doubt-section">
            <h2>Have a Doubt?</h2>
            <p>Feel free to ask any questions you have about the algorithms or data structures.</p>
            {submitStatus === 'success' && (
                <div className="confirmation-message" style={{ color: 'green', marginBottom: '1rem' }}>
                    Your doubt has been submitted successfully!
                </div>
            )}
            {submitStatus === 'error' && (
                <div className="confirmation-message" style={{ color: 'red', marginBottom: '1rem' }}>
                    An error occurred while submitting your doubt. Please try again.
                </div>
            )}
            <form onSubmit={handleSubmit} noValidate>
                <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) validateEmail();
                    }}
                    onBlur={validateEmail}
                    className={emailError ? 'input-error' : ''}
                />
                {emailError && (
                    <div className="error-message">
                        <AlertCircle size={16} className="error-icon" />
                        <span>{emailError}</span>
                    </div>
                )}

                <textarea
                    placeholder="Your Doubt"
                    rows="5"
                    value={doubt}
                    onChange={(e) => {
                        setDoubt(e.target.value);
                        if (doubtError) validateDoubt();
                    }}
                    onBlur={validateDoubt}
                    className={doubtError ? 'input-error' : ''}
                ></textarea>
                {doubtError && (
                    <div className="error-message">
                        <AlertCircle size={16} className="error-icon" />
                        <span>{doubtError}</span>
                    </div>
                )}

                <button type="submit" style={{ color: 'white' }}>Submit</button>

            </form>
        </div>
    );
};



export default Doubt;
