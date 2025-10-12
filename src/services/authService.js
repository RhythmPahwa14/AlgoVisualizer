
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/auth";

/**
 * User signup with email/password
 */
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Signup failed" };
  }
};

/**
 * User login with email/password
 */
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Login failed" };
  }
};

/**
 * Google Sign-In (OAuth)
 * @param {string} googleToken — token received from Google after login
 */
export const googleLogin = async (googleToken) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/google`, { token: googleToken });
    return response.data; // usually returns user + JWT
  } catch (error) {
    console.error("Google login error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Google login failed" };
  }
};


/**
 * signup
 */
export const googleSignup = async (googleToken) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/google/signup`, { token: googleToken });
    return response.data; 
  } catch (error) {
    console.error("Google signup error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Google signup failed" };
  }
};


/**
 * Logout
 */
export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

/**
 * Save user info locally
 */
export const saveUserData = (user, token) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

/**
 * Get current user from local storage
 */
export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

const authService = {
  login: async (email, password) => {
    console.log(`Mock login with email: ${email}`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock successful response
    return {
      success: true,
      user: {
        id: "user123",
        name: "Test User",
        email: email,
        avatar: "https://ui-avatars.com/api/?name=Test+User&background=random"
      },
      token: "mock-jwt-token-for-development"
    };
  },
  
  signup: async (name, email, password) => {
    console.log(`Mock signup with name: ${name}, email: ${email}`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock successful response
    return {
      success: true,
      user: {
        id: "user123",
        name: name,
        email: email,
        avatar: "https://ui-avatars.com/api/?name=" + encodeURIComponent(name) + "&background=random"
      },
      token: "mock-jwt-token-for-development"
    };
  },
  
  logout: async () => {
    console.log("Mock logout");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    return { success: true };
  },
  
  requestPasswordReset: async (email) => {
    console.log(`Mock password reset request for email: ${email}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  },
  
  resetPassword: async (token, password) => {
    console.log(`Mock password reset with token: ${token}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  }
};

export default authService;

