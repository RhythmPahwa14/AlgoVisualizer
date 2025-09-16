// src/App.jsx
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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
import ScrollToTop from "./ScrollToTop";
import About from "./components/about";
import Contact from "./components/contact";
import PrivacyPolicy from "./components/Privacy";
import TermsOfService from "./components/terms";
import CookiePolicy from "./components/cookie-policy";
import Doubt from "./components/Doubt";
import AlgorithmDocumentation from "./pages/Documentation";
import ComplexityBox from "./components/ComplexityBox";
import ThemeToggle from "./components/ThemeToggle";
import ContributorLeaderboard from "./pages/ContributorLeaderboard";
import LinkedListPage from "./components/pages/LinkedListPage";
import AlgorithmComparison from "./components/AlgorithmComparison";
import Blog from "./pages/Blog";
import CommunityLanding from "./pages/CommunityLanding";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import "./styles/components.css";

const App = () => {
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
          <Route path="/blog" element={<Blog />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/community" element={<CommunityLanding />} />
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
          
          {/* Authentication Routes */}
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

export default App;
