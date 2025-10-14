import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus, Mail, Lock, ArrowLeft, AlertCircle } from "lucide-react";
import { useTheme } from "../ThemeContext";
import authService from "../services/authService";
import "../styles/Signup.css";
// 🟢 ADDED:
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // ✅ FIXED: Use named import
import { googleLogin } from "../services/authService"; // ✅ FIXED: Use correct function name

const Signup = () => {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // 🔹 Password Validation Rules
  const checkPasswordRules = (password) => ({
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[!@#$%^&*]/.test(password),
  });

  const passwordChecks = checkPasswordRules(formData.password);
  const isPasswordValid = Object.values(passwordChecks).every(Boolean);
  const doPasswordsMatch =
    formData.confirmPassword && formData.password === formData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      await authService.signup(formData.name, formData.email, formData.password);
      // On successful signup, navigate to the login page
      navigate("/login");
    } catch (error) {
      setError(error.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isDark = theme === "dark";

  // Temporarily disable Google signup handlers
  /*
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google user data:", decoded);

      // send to backend for signup/login
      const response = await googleLogin(credentialResponse.credential);

      console.log("Backend signup success:", response);
      alert("Signed up successfully with Google!");
    } catch (err) {
      console.error("Google signup failed:", err);
      alert("Google signup failed. Please try again.");
    }
  };

  const handleGoogleError = () => {
    console.log("Google signup failed");
  };
  */

  return (
    <div className={`signup-container ${isDark ? "signup-dark" : "signup-light"}`}>
      <Link to="/" className="signup-back-button">
        <ArrowLeft className="back-icon" />
        Back to home
      </Link>

      <div className="signup-wrapper">
        <div className="signup-header">
          <div className="signup-icon-container">
            <UserPlus className="signup-icon" />
          </div>
          <h1 className="signup-title">Create an Account</h1>
          <p className="signup-subtitle">Join us and start visualizing algorithms</p>
        </div>

        <div className="signup-card">
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <div className="input-container">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Your Name"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <div className="input-container">
                <div className="input-icon"><Mail className="icon" /></div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-container">
                <div className="input-icon"><Lock className="icon" /></div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="toggle-icon" /> : <Eye className="toggle-icon" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="error-message">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
            
            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Sign up"}
            </button>

            <div className="login-link">
              <p className="login-text">
                Already have an account?{" "}
                <Link to="/login" className="login-action">Log in</Link>
              </p>
            </div>
          </form>

          {/* Temporarily disable Google signup
          <div className="separator"><span className="separator-text">or</span></div>
          <div className="google-signup">
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
          </div>
          */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
