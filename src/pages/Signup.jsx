import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  UserPlus,
  Mail,
  Lock,
  User,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { useTheme } from "../ThemeContext";
import { useGoogleAuth } from "../contexts/GoogleAuthContext";
import authService from "../services/authService";
import "../styles/Signup.css";
// 🟢 ADDED:
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";  // ✅ To decode Google user data
import { googleSignup } from "../services/authService"; // ✅ ADDED backend API call

const Signup = () => {
  const { theme } = useTheme();
  const { renderGoogleButton } = useGoogleAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
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
    
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    
    // Check if terms are agreed to
    if (!formData.agreeToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Combine first and last name for the name parameter
      const name = `${formData.firstName} ${formData.lastName}`.trim();
      const response = await authService.signup(name, formData.email, formData.password);
      
      // Store user data and token in localStorage
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.token);
      
      // Redirect to home page
      navigate("/");
    } catch (error) {
      setError(error.message || "Signup failed. Please try again.");
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
  };

  const isDark = theme === "dark";

  const handlePasswordChange = (e) => {
    let input = e.target.value;
    if (input.startsWith(" ")) input = input.trimStart();

    setFormData((prev) => ({ ...prev, password: input }));
  };

  const handleConfirmPasswordChange = (e) => {
    setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }));
  };

   // ✅ ADDED: Google Signup success handler
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwt_decode(credentialResponse.credential);
      console.log("Google user data:", decoded);

      // send to backend for signup/login
      const response = await googleSignup({
        name: decoded.name,
        email: decoded.email,
        googleId: decoded.sub,
        picture: decoded.picture,
      });

      console.log("Backend signup success:", response);
      alert("Signed up successfully with Google!");
    } catch (err) {
      console.error("Google signup failed:", err);
      alert("Google signup failed. Please try again.");
    }
  };

  const handleGoogleError = () => {
    console.error("Google Login Failed");
    alert("Google login failed. Try again.");
  };


  return (
    <div
      className={`signup-container ${isDark ? "signup-dark" : "signup-light"}`}
    >
      {/* Back Button */}
      <Link to="/" className="signup-back-button">
        <ArrowLeft className="back-icon" />
        Back to home
      </Link>

      <div className="signup-wrapper">
        {/* Header */}
        <div className="signup-header">
          <div className="signup-icon-container">
            <UserPlus className="signup-icon" />
          </div>
          <h1 className="signup-title">Create your account</h1>
          <p className="signup-subtitle">
            Join us today! Fill in your details to get started.
          </p>
        </div>

        {/* Signup Form */}
        <div className="signup-card">
          <form className="signup-form" onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <div className="input-container">
                  <div className="input-icon">
                    <User className="icon" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <div className="input-container">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="input-container">
                <div className="input-icon">
                  <Mail className="icon" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-container relative">
                <div className="input-icon absolute left-3 top-2">
                  <Lock className="icon" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handlePasswordChange}
                  className="form-input pl-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="password-toggle absolute right-3 top-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="toggle-icon" />
                  ) : (
                    <Eye className="toggle-icon" />
                  )}
                </button>
              </div>

              {/* Real-time Password Validation */}
              {formData.password && (
                <div className="text-sm mt-1 space-y-1">
                  <p
                    className={
                      passwordChecks.length ? "text-green-600" : "text-red-500"
                    }
                  >
                    {passwordChecks.length ? "✅" : "❌"} Minimum 8 characters
                  </p>
                  <p
                    className={
                      passwordChecks.uppercase
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    {passwordChecks.uppercase ? "✅" : "❌"} At least 1
                    uppercase letter
                  </p>
                  <p
                    className={
                      passwordChecks.lowercase
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    {passwordChecks.lowercase ? "✅" : "❌"} At least 1
                    lowercase letter
                  </p>
                  <p
                    className={
                      passwordChecks.number ? "text-green-600" : "text-red-500"
                    }
                  >
                    {passwordChecks.number ? "✅" : "❌"} At least 1 number
                  </p>
                  <p
                    className={
                      passwordChecks.specialChar
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    {passwordChecks.specialChar ? "✅" : "❌"} At least 1
                    special symbol (!@#$%^&*)
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <div className="input-container relative">
                <div className="input-icon absolute left-3 top-2">
                  <Lock className="icon" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="form-input pl-10"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="password-toggle absolute right-3 top-2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="toggle-icon" />
                  ) : (
                    <Eye className="toggle-icon" />
                  )}
                </button>
              </div>

              {formData.confirmPassword && (
                <p
                  className={
                    doPasswordsMatch
                      ? "text-sm mt-1 text-green-600"
                      : "text-sm mt-1 text-red-500"
                  }
                >
                  {doPasswordsMatch
                    ? "✅ Passwords match"
                    : "❌ Passwords do not match"}
                </p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-message">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {/* Create Account Button */}
            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

            {/* Login Link */}
            <div className="login-link">
              <p className="login-text">
                Already have an account?{" "}
                <Link to="/login" className="login-action">
                  Sign in
                </Link>
              </p>
            </div>
          </form>

          {/* Separator */}
          <div className="separator">
            <span className="separator-text">or</span>
          </div>

         {/* ✅ ADDED: Google Sign-Up Button */}
          <div className="google-login">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              type="standard"
              theme={isDark ? "filled_black" : "outline"}
              text="signup_with"
              shape="rectangular"
            />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
