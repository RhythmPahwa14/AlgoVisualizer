import React, { useEffect } from "react";
// ✅ 1. Re-enable the import for the background component
import ThreeBackground from './components/ThreeBackground';
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import { SettingsProvider } from "./contexts/SettingsContext";
import { MobileMenuProvider } from "./contexts/MobileMenuContext";
import { AlgorithmProvider } from "./contexts/AlgorithmContext";
import { NotificationsProvider } from "./contexts/NotificationsContext";
import { GoogleAuthProvider } from "./contexts/GoogleAuthContext";
import { ThemeProvider } from "./ThemeContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./ScrollToTop";
import ThemeToggle from "./components/ThemeToggle";
import ComplexityBox from "./components/ComplexityBox";
import Doubt from "./components/Doubt";
import FeedbackWidget from "./components/FeedbackWidget";
import NotificationWidget from "./components/NotificationWidget";

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
// graph Eulerian 
import GraphEulerian from "./pages/GraphEulerian.jsx";
// scc graph
import GraphSCC from "./pages/GraphSCC.jsx";
import GraphDFS from "./pages/GraphDFS";
import GraphDijkstra from "./pages/GraphDijkstra";
import GraphAStar from "./pages/GraphAStar";
import Quiz from "./pages/Quiz";
import Settings from "./pages/Settings";
import Blog from "./pages/Blog";
import CommunityLanding from "./pages/CommunityLanding";

// ✅ Bellman-Ford Algorithm Page
import BellmanFordPage from "./pages/GraphBellmanFord.jsx";

// Java Notes
import Fundamentals from "./pages/Notes/Java/Fundamentals";
import VariablesAndDataTypes from "./pages/Notes/Java/VariablesAndDataTypes";
import JavaBasics from "./pages/Notes/Java/JavaBasics";
import MERNFundamentals from "./pages/Notes/MERN/MERNFundamentals";
// Python Notes
import PythonFundamentals from "./pages/Notes/Python/Fundamentals";
import PythonVariablesAndDataTypes from "./pages/Notes/Python/VariablesAndDataTypes";

// C++ Notes
import CppFundamentals from "./pages/Notes/Cpp/Fundamentals";
import CppVariablesAndDataTypes from "./pages/Notes/Cpp/VariablesAndDataTypes";

// C Notes
import CFundamentals from "./pages/Notes/C/Fundamentals";

// JavaScript Notes
import JavaScriptFundamentals from "./pages/Notes/JavaScript/Fundamentals.jsx";
import JavaScriptVariablesAndDataTypes from "./pages/Notes/JavaScript/VariablesAndDataTypes.jsx";
// Next.js Notes
import NextJsFundamentals from "./pages/Notes/NextJs/Fundamentals.jsx";

// Rust Notes
import RustFundamentals from "./pages/Notes/Rust/Fundamentals";

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
import StringRabinKarpPage from "./pages/StringRabinKarpPage";
import PrimPage from "./pages/PrimPage";
import KruskalPage from "./pages/KruskalPage";
import HuffmanPage from "./pages/HuffmanPage";
import FloydWarshallPage from "./pages/GraphFloydWarshall";
import BeginnerPrograms from "./pages/BeginnerPrograms";

// Components
import ArrayVisualizer from "./pages/Array.jsx";
import KadaneVisualizer from "./pages/Kadane.jsx";
import DijkstraVisualizer from "./pages/Dijkstra.jsx";
import DivideAndConquerVisualizer from "./pages/DivideAndConquer.jsx";
import KnapsackVisualizer from "../Downloads/AlgoVisualizer-master/AlgoVisualizer-master/src/pages/Knapsack.jsx";
import KMPVisualizer from "./pages/KMP";
import LinkedListPage from "./components/pages/LinkedListPage";
import Queue from "./components/Queue/Queue";
import Stack from "./components/Stack/Stack";
import BinaryTreeVisualizer from "./components/BinaryTree/BinaryTreeVisualizer";
import TrieVisualizer from "./components/Trie/TrieVisualizer";
import AlgorithmComparison from "./components/AlgorithmComparison";
import GraphComparison from "./components/GraphComparison";
import Contributors from "./components/Contributors";
import Contribute from "./components/Contribute";
import Cheatsheet from "./components/Cheatsheet";
import AlgorithmComparisonTable from './components/AlgorithmComparisonTable';

// Performance Dashboard
import PerformanceDashboard from "./components/PerformanceDashboard";
import PerformanceDocs from "./pages/PerformanceDocs";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";

// Static / Info Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
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

// Dynamic Notes Page
import NotesPage from "./pages/Notes/NotesPage";
import ContributorBoard from "./pages/ContributorBoard";
import ContributorProfileModal from "./pages/ContributorProfileModal";
import JavaOOPS from "./pages/JavaOOPS.jsx";

import Playground from "./pages/Playground";
import ProgressTracker from "./components/ProgressTracker";
import LearnerLeaderboard from "./components/LearnerLeaderboard";
import WeeklyChallenge from "./components/WeeklyChallenge";
import GitLearning from "./pages/GitLearning.jsx";
import GitBasicsQuiz from "./pages/GitBasicsQuiz";

const App = () => {
  const location = useLocation();

  const showComplexityBoxOn = [
    "/sorting",
    "/searching",
    "/data-structures",
    "/graph",
    "/graph/bfs",
    "/graph/dfs",
    "/graph/dijkstra",
    "/graph/astar",
    "/data-structures/stack",
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <ThemeProvider>
      <GoogleAuthProvider>
      <SettingsProvider>
        <MobileMenuProvider>
          <AlgorithmProvider>
            <NotificationsProvider>
              <div className="app-container">
                <ScrollToTop />
                <Navbar />

                <main className="main-content page-content">
                  <Routes>
                    {/* Home */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />

                    {/* Sorting */}
                    <Route path="/sorting" element={<Sorting />} />
                    <Route
                      path="/sorting/:algoId/docs"
                      element={<SortingDoc />}
                    />
                    <Route
                      path="/sorting/algorithm-comparison"
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
                    <Route
                      path="/data-structures"
                      element={<DataStructures />}
                    />

                    <Route path="/data-structures/array" element={<ArrayVisualizer />} />
                    <Route path="/data-structures/kadane" element={<KadaneVisualizer />} />
                    <Route path="/data-structures/kmp" element={<KMPVisualizer />} />
                    <Route path="/data-structures/dijkstras" element={<DijkstraVisualizer/>} />
                    <Route path="/data-structures/divideandconquer" element={<DivideAndConquerVisualizer/>} />
                    <Route path="/data-structures/knapsack" element={<KnapsackVisualizer/>} />


                    <Route
                      path="/data-structures/linked-list"
                      element={<LinkedListPage />}
                    />
                    <Route path="/data-structures/queue" element={<Queue />} />
                    <Route path="/data-structures/stack" element={<Stack />} />
                    <Route
                      path="/data-structures/binary-tree"
                      element={<BinaryTreeVisualizer />}
                    />
                    <Route
                      path="/data-structures/trie"
                      element={<TrieVisualizer />}
                    />

                      {/* Graph */}
                      <Route path="/graph" element={<Graph />} />
                      <Route path="/graph/bfs" element={<GraphBFS />} />
                      <Route path="/graph/dfs" element={<GraphDFS />} />
                      <Route path="/graph/dijkstra" element={<GraphDijkstra />} />
                      <Route path="/graph/astar" element={<GraphAStar />} />
                      <Route
                        path="/graph/comparison"
                        element={<GraphComparison />}
                      />
                      <Route
                        path="/graph/cycleDetection"
                        element={<GraphCycleDetection />}
                      />
                      <Route path="/graph/eulerianGraphs" element={<GraphEulerian/>} />
                      {/* ✅ Bellman-Ford Route */}
                      <Route
                        path="/graph/bellman-ford"
                        element={<BellmanFordPage />}
                      />
                      <Route path='/graph/sccGraphs' element={<GraphSCC/>} />


                  {/* Algorithm Pages */}

                  <Route path="/backtracking-overview" element={<BacktrackingOverview />} />
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
                  <Route path="/game-search-overview" element={<GameSearchOverview />} />
                  <Route path="/game-search" element={<GameSearchPage />} />
                  <Route path="/branchbound-overview" element={<BranchBoundOverview />} />
                  <Route path="/branchbound" element={<BranchBoundPage />} />
                  <Route path="/string-overview" element={<StringOverview />} />
                  <Route path="/string" element={<StringPage />} />
                  <Route path="/string/rabin-karp" element={<StringRabinKarpPage />} />
                  <Route path="/prims" element={<PrimPage />} />
                  <Route path="/kruskal" element={<KruskalPage />} />
                  <Route path="/huffman" element={<HuffmanPage />} />
                  <Route path="/graph/floyd-warshall" element={<FloydWarshallPage />} />
                  <Route path="/beginner-programs" element={<BeginnerPrograms />} />


                  {/* Data Structures Documentation */}
                  <Route path="/data-structures-docs" element={<DSDocumentation />} />

                  {/* Performance Dashboard */}
                  <Route path="/performance" element={<PerformanceDashboard />} />
                  <Route path="/performance/docs" element={<PerformanceDocs />} />
                  <Route path="/analytics" element={<AnalyticsDashboard />} />

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
                  <Route path="/documentation" element={<AlgorithmDocumentation />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/contributor-leaderboard" element={<ContributorLeaderboard />} />
                  <Route path="/editor" element={<CodeEditor />} />

                  {/* Notes Routes */} 
                  <Route path="/notes/java" element={<Navigate to="/notes/java/fundamentals" replace />} />
                  <Route path="/notes/java/fundamentals" element={<Fundamentals />} />
                  <Route path="/notes/java/variables-and-data-types" element={<VariablesAndDataTypes />} />
                  <Route path="/notes/java/basics" element={<JavaBasics />} />

                  <Route path="/notes/python" element={<Navigate to="/notes/python/fundamentals" replace />} />
                  <Route path="/notes/python/fundamentals" element={<PythonFundamentals />} />
                  <Route path="/notes/python/variables-and-data-types" element={<PythonVariablesAndDataTypes />} />

                  <Route path="/notes/cpp" element={<Navigate to="/notes/cpp/fundamentals" replace />} />
                  <Route path="/notes/cpp/fundamentals" element={<CppFundamentals />} />
                  <Route path="/notes/cpp/variables-and-data-types" element={<CppVariablesAndDataTypes />} />

                  <Route path="/notes/javascript" element={<Navigate to="/notes/javascript/fundamentals" replace />} />
                  <Route path="/notes/javascript/fundamentals" element={<JavaScriptFundamentals/>} />
                  <Route path="/notes/javascript/variables-and-data-types" element={<JavaScriptVariablesAndDataTypes/>} />

                  <Route path="/notes/nextjs" element={<Navigate to="/notes/nextjs/fundamentals" replace />} />
                  <Route path="/notes/nextjs/fundamentals" element={<NextJsFundamentals />} />

                  <Route path="/notes/c" element={<Navigate to="/notes/c/fundamentals" replace />} />
                  <Route path="/notes/c/fundamentals" element={<CFundamentals />} />

                  <Route path="/java-oops" element={<JavaOOPS />} />

                  <Route path="/notes/dsasheet" element={<Navigate to="/notes/dsasheet/sheet" replace />} />
                  

                  {/* Dynamic Notes Routes */}
                  <Route path="/notes/:language/:topic" element={<NotesPage />} />
                  <Route path="/notes/:language" element={<Navigate to="/notes/:language/fundamentals" replace />} />

                  <Route path="/contributor-board" element={<ContributorBoard />} />
                  <Route path="/contributor/:id" element={<ContributorProfileModal />} />

                  <Route path="/playground" element={<Playground />} />

                  <Route path="/learn/git" element={<GitLearning />} />
                  <Route path="/learn/git-basics-quiz" element={<GitBasicsQuiz />} />

                  {/* Additional Routes */}
                  <Route path="/cheatsheet" element={<Cheatsheet />} />
                  <Route path="/algorithm-comparison-table" element={<AlgorithmComparisonTable />} />
                  <Route path="/notes/MERN/MERNFundamentals" element={<MERNFundamentals />} />
                  <Route path="/notes/rust" element={<Navigate to="/notes/rust/fundamentals" replace />} />
                  <Route path="/notes/rust/fundamentals" element={<RustFundamentals />} />

                  {/* Learning & Settings */}
                  <Route path="/learn" element={<LearnLanding />} />
                  <Route path="/progress" element={<ProgressTracker topics={["Sorting", "Graphs", "DP"]} />} />
                  <Route path="/leaderboard" element={<LearnerLeaderboard />} />
                  <Route path="/weekly-challenge" element={<WeeklyChallenge />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>

                {/* Show ComplexityBox only on selected pages */}
                {showComplexityBoxOn.includes(location.pathname) && (
                  <div style={{ marginTop: "2rem" }}>
                    <ComplexityBox /> {/* No props needed unless you want to pass algorithm */}
                  </div>
                )}
              </main>

              <Doubt />
              <FeedbackWidget />
              <NotificationWidget />
              <Footer />
              <Analytics />
            </div>
          </NotificationsProvider>
        </AlgorithmProvider>
      </MobileMenuProvider>
    </SettingsProvider>
    </GoogleAuthProvider>
    </ThemeProvider>
  );
};

export default App;