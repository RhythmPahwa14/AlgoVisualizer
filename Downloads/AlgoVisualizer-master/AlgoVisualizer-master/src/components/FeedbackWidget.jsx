import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/feedback.css";
import { submitFeedback } from "../services/feedbackSumbitServices";
// import submitFeedback from "../services/feedbackSumbitServices";

const FeedbackWidget = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setOpen((v) => !v);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitting) return;

    // Basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    const emailOk = /\S+@\S+\.\S+/.test(email);
    if (!emailOk) {
      alert("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);

    try {
      const existing = JSON.parse(localStorage.getItem("algovisualizer_feedback") || "[]");
      const feedback = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        createdAt: new Date().toISOString(),
        path: window.location.pathname,
      };
      localStorage.setItem("algovisualizer_feedback", JSON.stringify([feedback, ...existing]));
      submitFeedback(feedback.name, feedback.email, feedback.message);

      setSubmitted(true);

      // Redirect to home after a short delay
      setTimeout(() => {
        setOpen(false);
        setName("");
        setEmail("");
        setMessage("");
        setSubmitting(false);
        navigate("/");
        // reset thank-you state after navigation
        setTimeout(() => setSubmitted(false), 500);
      }, 2000);
    } catch (err) {
      console.error("Failed to store feedback:", err);
      alert("Something went wrong while saving your feedback locally.");
      setSubmitting(false);
    }
  };

  // Close on escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        aria-label="Open feedback form"
        className="feedback-fab"
        onClick={toggle}
      >
        <span className="feedback-fab-icon" role="img" aria-hidden>
          💬
        </span>
      </button>

      {/* Overlay */}
      {open && <div className="feedback-overlay" onClick={() => setOpen(false)} />}

      {/* Panel */}
      <div className={`feedback-panel ${open ? "open" : ""}`} role="dialog" aria-modal="true" aria-labelledby="feedback-title">
        {!submitted ? (
          <form className="feedback-form" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
            <div className="feedback-form-header">
              <h3 id="feedback-title">Share your feedback</h3>
              <button type="button" className="feedback-close" onClick={() => setOpen(false)} aria-label="Close feedback form">×</button>
            </div>

            <div className="feedback-field">
              <label htmlFor="fb-name">Name</label>
              <input
                id="fb-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>

            <div className="feedback-field">
              <label htmlFor="fb-email">Email</label>
              <input
                id="fb-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="feedback-field">
              <label htmlFor="fb-message">Message</label>
              <textarea
                id="fb-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we improve, or what went wrong?"
                required
              />
            </div>

            <button type="submit" className="feedback-submit" disabled={submitting}>
              {submitting ? "Submitting…" : "Submit feedback"}
            </button>

            <p className="feedback-note">Saved locally—no network requests are made.</p>
          </form>
        ) : (
          <div className="feedback-thanks" onClick={(e) => e.stopPropagation()}>
            <h3>Thank you!</h3>
            <p>Your feedback has been saved. Redirecting to home…</p>
          </div>
        )}
      </div>
    </>
  );
};

export default FeedbackWidget;
