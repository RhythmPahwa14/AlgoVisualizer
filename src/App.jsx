import React, { useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import { SettingsProvider } from "./contexts/SettingsContext";
import { MobileMenuProvider } from "./contexts/MobileMenuContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./ScrollToTop";
import ThemeToggle from "./components/ThemeToggle";
import ComplexityBox from "./components/ComplexityBox";
import Doubt from "./components/Doubt";
import FeedbackWidget from "./components/FeedbackWidget";

// Pages
import Home from "./pages/Home";
import Sorting from "./pages/Sorting";
import SortingDoc from "./pages/SortingDoc";
import Searching from "./pages/Searching";
import SearchingOverview from "./pages/SearchingOverview";
import DataStructures from "./pages/DataStructures";
import Graph from "./pages/Graph";
import GraphBFS from "./pages/GraphBFS";
import GraphCycleDetection from "./pages/GraphCycleDetection";
import GraphDFS from "./pages/GraphDFS";
import GraphDijkstra from "./pages/GraphDijkstra";
import Quiz from "./pages/Quiz";
import Settings from "./pages/Settings";
import Blog from "./pages/Blog";
import CommunityLanding from "./pages/CommunityLanding";

// Java Notes
import Fundamentals from "./pages/Notes/Java/Fundamentals";
import VariablesAndDataTypes from "./pages/Notes/Java/VariablesAndDataTypes";

// Python Notes
import PythonFundamentals from "./pages/Notes/Python/Fundamentals";
import PythonVariablesAndDataTypes from "./pages/Notes/Python/VariablesAndDataTypes";

// Algorithm Pages
import DPOverview from "./pages/DPOverview";
import DPPage from "./pages/DPPage";
import BacktrackingOverview from "./pages/BacktrackingOverview";
import BacktrackingPage from "./pages/BacktrackingPage";
import GreedyOverview from "./pages/GreedyOverview";
import GreedyPage from "./pages/GreedyPage";
import HashingOverview from "./pages/HashingOverview";
import HashingPage from "./pages/HashingPage";
import TreeOverview from "./pages/TreeOverview";
import TreePage from "./pages/TreePage";
import DCOverview from "./pages/DCOverview";
import DCPage from "./pages/DCPage";
import GameSearchOverview from "./pages/GameSearchOverview";
import GameSearchPage from "./pages/GameSearchPage";
import BranchBoundOverview from "./pages/BranchBoundOverview";
import BranchBoundPage from "./pages/BranchBoundPage";
import StringOverview from "./pages/StringOverview";
import StringPage from "./pages/StringPage";

// Components
import LinkedListPage from "./components/pages/LinkedListPage";
import Queue from "./components/Queue/Queue";
import Stack from "./components/Stack/Stack";
import BinaryTreeVisualizer from "./components/BinaryTree/BinaryTreeVisualizer";
import AlgorithmComparison from "./components/AlgorithmComparison";
import GraphComparison from "./components/GraphComparison";
import Contributors from "./components/Contributors";
import Contribute from "./components/Contribute";

// Static / Info Pages
import About from "./components/about";
import Contact from "./components/contact";
import PrivacyPolicy from "./components/Privacy";
import TermsOfService from "./components/terms";
import CookiePolicy from "./components/cookie-policy";
import FAQ from "./pages/FAQ";
import ContributorLeaderboard from "./pages/ContributorLeaderboard";
import AlgorithmDocumentation from "./pages/Documentation";
import CodeEditor from "./pages/CodeEditor";

import AOS from "aos";
import "aos/dist/aos.css";
import "./styles/components.css";
import "./styles/footer-improved.css";
import LearnLanding from "./pages/LearnLanding";
import DSDocumentation from "./pages/DSDocumentation";


const App = () => {
  const location = useLocation();
  const selectedAlgorithm = "bubbleSort";

  const showComplexityBoxOn = [
    "/sorting",
    "/searching",
    "/data-structures",
    "/graph",
    "/graph/bfs",
    "/graph/dfs",
    "/graph/dijkstra",
    "/data-structures/stack",
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <SettingsProvider>
      <MobileMenuProvider>
        <div className="app-container">
          <ScrollToTop />
          <ThemeToggle />
          <Navbar />

          <main className="main-content page-content">
            <Routes>
              <Route path="/" element={<Home />} />

              {/* Sorting */}
              <Route path="/sorting" element={<Sorting />} />
              <Route path="/sorting/:algoId/docs" element={<SortingDoc />} />
              <Route
                path="/sorting/comparison"
                element={<AlgorithmComparison />}
              />

              {/* Searching */}
              <Route path="/searching" element={<Searching />} />
              <Route path="/searching/:id" element={<Searching />} />
              <Route
                path="/searching/comparison"
                element={<AlgorithmComparison />}
              />
              <Route
                path="/searchingOverview"
                element={<SearchingOverview />}
              />

              {/* Data Structures */}
              <Route path="/data-structures" element={<DataStructures />} />
              <Route
                path="/data-structures/linked-list"
                element={<LinkedListPage />}
              />
              <Route path="/data-structures/queue" element={<Queue />} />
              <Route path="/data-structures/stack" element={<Stack />} />
              <Route path="/data-structures/binary-tree" element={<BinaryTreeVisualizer />} />

              {/* Graph */}
              <Route path="/graph" element={<Graph />} />
              <Route path="/graph/bfs" element={<GraphBFS />} />
              <Route path="/graph/dfs" element={<GraphDFS />} />
              <Route path="/graph/dijkstra" element={<GraphDijkstra />} />
              <Route path="/graph/comparison" element={<GraphComparison />} />
              <Route path="Graph/cycleDetection" element={<GraphCycleDetection/>}/>

              {/* Algorithm Pages */}
              <Route
                path="/backtracking-overview"
                element={<BacktrackingOverview />}
              />
              <Route path="/backtracking" element={<BacktrackingPage />} />
              <Route path="/dp-overview" element={<DPOverview />} />
              <Route path="/dp" element={<DPPage />} />
              <Route path="/hashing-overview" element={<HashingOverview />} />
              <Route path="/hashing" element={<HashingPage />} />
              <Route path="/greedy-overview" element={<GreedyOverview />} />
              <Route path="/greedy" element={<GreedyPage />} />
              <Route path="/tree-overview" element={<TreeOverview />} />
              <Route path="/tree" element={<TreePage />} />
              <Route path="/dc-overview" element={<DCOverview />} />
              <Route path="/dc" element={<DCPage />} />
              <Route
                path="/game-search-overview"
                element={<GameSearchOverview />}
              />
              <Route path="/game-search" element={<GameSearchPage />} />
              <Route
                path="/branchbound-overview"
                element={<BranchBoundOverview />}
              />
              <Route path="/branchbound" element={<BranchBoundPage />} />
              <Route path="/string-overview" element={<StringOverview />} />
              <Route path="/string" element={<StringPage />} />
              {/* Data Structures Documentation */}
<Route path="/data-structures-docs" element={<DSDocumentation />} />


              {/* Other Pages */}
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/community" element={<CommunityLanding />} />
              <Route path="/contributors" element={<Contributors />} />
              <Route path="/contribute" element={<Contribute />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/cookies" element={<CookiePolicy />} />
              <Route
                path="/documentation"
                element={<AlgorithmDocumentation />}
              />
              <Route path="/faq" element={<FAQ />} />
              <Route
                path="/contributor-leaderboard"
                element={<ContributorLeaderboard />}
              />
              <Route path="/editor" element={<CodeEditor />} />

              {/* Notes Routes */}
              {/* Java */}
              <Route
                path="/notes/java"
                element={<Navigate to="/notes/java/fundamentals" replace />}
              />
              <Route path="/notes/java/fundamentals" element={<Fundamentals />} />
              <Route
                path="/notes/java/variables-and-data-types"
                element={<VariablesAndDataTypes />}
              />

              {/* Python */}
              <Route
                path="/notes/python"
                element={<Navigate to="/notes/python/fundamentals" replace />}
              />
              <Route
                path="/notes/python/fundamentals"
                element={<PythonFundamentals />}
              />
              <Route
                path="/notes/python/variables-and-data-types"
                element={<PythonVariablesAndDataTypes />}
              />

              {/* Learning & Settings */}
              <Route path="/learn" element={<LearnLanding />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>

            {/* Show ComplexityBox only on selected pages */}
            {showComplexityBoxOn.includes(location.pathname) && (
              <div style={{ marginTop: "2rem" }}>
                <ComplexityBox algorithm={selectedAlgorithm} />
              </div>
            )}
          </main>

          <Doubt />
          <FeedbackWidget />
          <Footer />
          <Analytics />
        </div>
      </MobileMenuProvider>
    </SettingsProvider>
  );
};

export default App;
