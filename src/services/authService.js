import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/auth";

/**
 * 🟢 Email/Password Signup
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
 * 🟢 Email/Password Login
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
 * 🟢 Google Sign-In (OAuth)
 * @param {string} googleToken — token received from Google after login
 */
export const loginUserWithGoogle = async (googleToken) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/google`, {
      token: googleToken,
    });
    return response.data; // typically user info + JWT
  } catch (error) {
    console.error("Google login error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Google login failed" };
  }
};

/**
 * 🟢 Logout user and clear local storage
 */
export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("rememberMe");
};

/**
 * 🟢 Save user info locally
 */
export const saveUserData = (user, token) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

/**
 * 🟢 Get current user from local storage
 */
export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

/**
 * 🧩 Mocked backend for local testing (optional)
 * Used when API isn’t available, keeps build running locally.
 */
const authService = {
  login: async (email, password) => {
    console.log(`Mock login with email: ${email}`);

    // simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      user: {
        id: "user123",
        name: "Test User",
        email: email,
        avatar:
          "https://ui-avatars.com/api/?name=Test+User&background=random",
      },
      token: "mock-jwt-token-for-development",
    };
  },

  signup: async (name, email, password) => {
    console.log(`Mock signup with name: ${name}, email: ${email}`);

    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      user: {
        id: "user123",
        name: name,
        email: email,
        avatar:
          "https://ui-avatars.com/api/?name=" +
          encodeURIComponent(name) +
          "&background=random",
      },
      token: "mock-jwt-token-for-development",
    };
  },

  logout: async () => {
    console.log("Mock logout");
    logout();
    return { success: true };
  },
};

export default authService;
