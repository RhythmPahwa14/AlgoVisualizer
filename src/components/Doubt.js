import React from 'react';
import '../styles/doubt.css';

const Doubt = () => {
    return (
        <div className="doubt-section">
            <h2>Have a Doubt?</h2>
            <p>Feel free to ask any questions you have about the algorithms or data structures.</p>
            <form>
                <input type="email" placeholder="Your Email" required />
                <textarea placeholder="Your Doubt" rows="5" required></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Doubt;
