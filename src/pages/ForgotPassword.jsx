import React, { useState } from "react";
import authService from "../services/authService"; 
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      // Call the function from the default export object
      const response = await authService.requestPasswordReset(email);

      if (response.success) {
        setMessage("Password reset link has been sent to your email!");
      } else {
        setError("Failed to send reset link. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div class="main-container">
      <h2><b>Forgot Password</b></h2>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <label class="label" htmlFor="email">Enter your registered email</label><br></br>
        <input
          type="email"
          id="email"
          value={email}
          placeholder="example@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        /> <br></br>
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      {/* Display messages */}
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
    </div>
  );
};

export default ForgotPassword;
