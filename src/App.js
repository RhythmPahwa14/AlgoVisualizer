// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar"; // Keeping Navbar instead of Header for consistency
import Footer from "./components/Footer";
import ScrollToTop from "./ScrollToTop";
import Doubt from "./components/Doubt";

// Pages
import Home from "./pages/Home";
import Sorting from "./pages/Sorting";
import Searching from "./pages/Searching";
import DataStructures from "./pages/DataStructures";
import Graph from "./pages/Graph";
import GraphBFS from "./pages/GraphBFS";
import GraphDFS from "./pages/GraphDFS";
import GraphDijkstra from "./pages/GraphDijkstra";
import GraphComparison from "./components/GraphComparison";
import Quiz from "./pages/Quiz";
import Settings from "./pages/Settings";
import Contributors from "./components/Contributors";
import About from "./components/about";
import Contact from "./components/contact";
import PrivacyPolicy from "./components/Privacy";
import TermsOfService from "./components/terms";
import CookiePolicy from "./components/cookie-policy";
import AlgorithmDocumentation from "./pages/Documentation";
import ContributorLeaderboard from "./pages/ContributorLeaderboard";
import LinkedListPage from "./components/pages/LinkedListPage";
import AlgorithmComparison from "./components/AlgorithmComparison";

// Auth pages
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

// UI Components
import ComplexityBox from "./components/ComplexityBox";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider } from "./ThemeContext";

import "./styles/components.css";

const AppContent = () => {
  const selectedAlgorithm = "bubbleSort"; // Default algorithm
  const location = useLocation();

  const showComplexityBoxOn = [
    "/sorting",
    "/searching",
    "/data-structures",
    "/graph",
    "/graph/bfs",
    "/graph/dfs",
    "/graph/dijkstra",
  ];

  return (
    <div className="app-container">
      <ScrollToTop />
      <ThemeToggle />
      <Navbar />

      <main className="main-content page-content">
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Sorting */}
          <Route path="/sorting" element={<Sorting />} />
          <Route
            path="/components/AlgorithmComparison"
            element={<AlgorithmComparison />}
          />

          {/* Searching */}
          <Route path="/searching" element={<Searching />} />
          <Route
            path="/searching/comparison"
            element={<AlgorithmComparison />}
          />

          {/* Data Structures */}
          <Route path="/data-structures" element={<DataStructures />} />
          <Route
            path="/data-structures/linked-list"
            element={<LinkedListPage />}
          />

          {/* Graph */}
          <Route path="/graph" element={<Graph />} />
          <Route path="/graph/bfs" element={<GraphBFS />} />
          <Route path="/graph/dfs" element={<GraphDFS />} />
          <Route path="/graph/dijkstra" element={<GraphDijkstra />} />
          <Route path="/graph/comparison" element={<GraphComparison />} />

          {/* Other Pages */}
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/contributors" element={<Contributors />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/documentation" element={<AlgorithmDocumentation />} />
          <Route
            path="/ContributorLeaderboard"
            element={<ContributorLeaderboard />}
          />

          {/* Authentication */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>

        {showComplexityBoxOn.includes(location.pathname) && (
          <div style={{ marginTop: "2rem" }}>
            <ComplexityBox algorithm={selectedAlgorithm} />
          </div>
        )}
      </main>

      <Doubt />
      <Footer />
      <Analytics />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;
