import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/components.css";
import { ThemeProvider } from "./ThemeContext";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import "./main.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "Google_ID";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <ThemeProvider>
        <BrowserRouter>
          <App />
          <Analytics />
        </BrowserRouter>
      </ThemeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
