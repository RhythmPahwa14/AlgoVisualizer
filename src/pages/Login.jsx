import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, Mail, Lock, ArrowLeft, AlertCircle } from "lucide-react";
import { useTheme } from "../ThemeContext";
import { useGoogleAuth } from "../contexts/GoogleAuthContext";
// import authService, { googleLogin  } from "../services/authService";
import "../styles/Login.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; 
import { googleLogin } from "../services/authService";


// 🔹 Helper function for password validation
const validatePassword = (password) => {
  const errors = [];
  if (password.length < 8) errors.push("At least 8 characters");
  if (!/[A-Z]/.test(password)) errors.push("Add at least one uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("Add at least one lowercase letter");
  if (!/[0-9]/.test(password)) errors.push("Add at least one number");
  if (!/[!@#$%^&*]/.test(password)) errors.push("Add at least one special symbol (!@#$%^&*)");
  return errors;
};

const Login = () => {
  const { theme } = useTheme();
  // const { renderGoogleButton } = useGoogleAuth(); // Temporarily disabled
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [passwordErrors, setPasswordErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await authService.login(formData.email, formData.password);

      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.token);

      if (formData.rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      navigate("/");
    } catch (error) {
      setError(error.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    // 🔹 Real-time password validation
    if (name === "password") {
      setPasswordErrors(validatePassword(value));
    }
  };
  const isDark = theme === "dark";

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Decoded Google User:", decoded);

      // Call backend API to register/login this Google user
      const res = await googleLogin(credentialResponse.credential);
      console.log("Backend login success:", res);

      navigate("/");
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleGoogleError = () => {
    console.log("Google login failed");
  };
  
  return (
    <div className={`login-container ${isDark ? "login-dark" : "login-light"}`}>
      <Link to="/" className="login-back-button">
        <ArrowLeft className="back-icon" />
        Back to home
      </Link>

      <div className="login-wrapper">
        <div className="login-header">
          <div className="login-icon-container">
            <LogIn className="login-icon" />
          </div>
          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">
            Enter your credentials to access your account
          </p>
        </div>

        <div className="login-card">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <div className="input-container">
                <div className="input-icon"><Mail className="icon" /></div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
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
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="toggle-icon" /> : <Eye className="toggle-icon" />}
                </button>
              </div>

              {passwordErrors.length > 0 && (
                <ul className="password-errors">
                  {passwordErrors.map((err, idx) => (
                    <li key={idx} className="error-text">❌ {err}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="checkbox"
                />
                <label htmlFor="rememberMe" className="checkbox-label">Remember me</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            {error && (
              <div className="error-message">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </button>

            <div className="signup-link">
              <p className="signup-text">
                Don't have an account?{" "}
                <Link to="/signup" className="signup-action">Sign up</Link>
              </p>
            </div>
          </form>

          <div className="separator">
            <span className="separator-text">or</span>
          </div>

          <div className="google-login">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          </div>
          

          <div className="demo-section">
            <p className="demo-text">
              <strong>Demo:</strong> demo@example.com / demo123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
