import React, { useEffect } from "react";
import ThreeBackground from './components/ThreeBackground';
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import { SettingsProvider } from "./contexts/SettingsContext";
import { MobileMenuProvider } from "./contexts/MobileMenuContext";
import { AlgorithmProvider } from "./contexts/AlgorithmContext";
import { NotificationsProvider } from "./contexts/NotificationsContext";
import { GoogleAuthProvider } from "./contexts/GoogleAuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./ScrollToTop";
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
import GraphDFS from "./pages/GraphDFS";
import GraphDijkstra from "./pages/GraphDijkstra";
import GraphAStar from "./pages/GraphAStar";
import Quiz from "./pages/Quiz";
import Settings from "./pages/Settings";
import Blog from "./pages/Blog";
import CommunityLanding from "./pages/CommunityLanding";
import BellmanFordPage from "./pages/GraphBellmanFord.jsx";

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

// Data Structures Components
import ArrayVisualizer from "./pages/Array.jsx";
import LinkedListPage from "./components/pages/LinkedListPage";
import Queue from "./components/Queue/Queue";
import Stack from "./components/Stack/Stack";
import BinaryTreeVisualizer from "./components/BinaryTree/BinaryTreeVisualizer";
import TrieVisualizer from "./components/Trie/TrieVisualizer";

// Components
import AlgorithmComparison from "./components/AlgorithmComparison";
import GraphComparison from "./components/GraphComparison";
import Contributors from "./components/Contributors";
import Contribute from "./components/Contribute";
import Cheatsheet from "./components/Cheatsheet";
import AlgorithmComparisonTable from './components/AlgorithmComparisonTable';

// Static / Info Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./components/about";
import Contact from "./components/contact";
import PrivacyPolicy from "./components/Privacy";
import TermsOfService from "./components/terms";
import CookiePolicy from "./components/cookie-policy";
import FAQ from "./pages/FAQ";
import ContributorLeaderboard from "./pages/ContributorLeaderboard";
import AlgorithmDocumentation from "./pages/Documentation";
import CodeEditor from "./pages/CodeEditor";

// Notes Pages
import NotesPage from "./pages/Notes/NotesPage";
import NotesRedirect from "./pages/Notes/NotesRedirect"; // create this to handle /notes/:language redirect

import ContributorBoard from "./pages/ContributorBoard";
import ContributorProfileModal from "./pages/ContributorProfileModal";
import JavaOOPS from "./pages/JavaOOPS.jsx";

import Playground from "./pages/Playground";
import ProgressTracker from "./components/ProgressTracker";
import LearnerLeaderboard from "./components/LearnerLeaderboard";
import WeeklyChallenge from "./components/WeeklyChallenge";
import GitLearning from "./pages/GitLearning.jsx";
import GitBasicsQuiz from "./pages/GitBasicsQuiz";

import AOS from "aos";
import "aos/dist/aos.css";
import "./styles/components.css";
import "./styles/footer-improved.css";
import LearnLanding from "./pages/LearnLanding";
import DSDocumentation from "./pages/DSDocumentation";

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
    <>
      <ThreeBackground />
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

                      {/* Sorting */}
                      <Route path="/sorting" element={<Sorting />} />
                      <Route path="/sorting/:algoId/docs" element={<SortingDoc />} />
                      <Route path="/sorting/algorithm-comparison" element={<AlgorithmComparison />} />

                      {/* Searching */}
                      <Route path="/searching" element={<Searching />} />
                      <Route path="/searching/:id" element={<Searching />} />
                      <Route path="/searching/comparison" element={<AlgorithmComparison />} />
                      <Route path="/searchingOverview" element={<SearchingOverview />} />

                      {/* Data Structures */}
                      <Route path="/data-structures" element={<DataStructures />} />
                      <Route path="/data-structures/array" element={<ArrayVisualizer />} />
                      <Route path="/data-structures/linked-list" element={<LinkedListPage />} />
                      <Route path="/data-structures/queue" element={<Queue />} />
                      <Route path="/data-structures/stack" element={<Stack />} />
                      <Route path="/data-structures/binary-tree" element={<BinaryTreeVisualizer />} />
                      <Route path="/data-structures/trie" element={<TrieVisualizer />} />

                      {/* Graph */}
                      <Route path="/graph" element={<Graph />} />
                      <Route path="/graph/bfs" element={<GraphBFS />} />
                      <Route path="/graph/dfs" element={<GraphDFS />} />
                      <Route path="/graph/dijkstra" element={<GraphDijkstra />} />
                      <Route path="/graph/astar" element={<GraphAStar />} />
                      <Route path="/graph/comparison" element={<GraphComparison />} />
                      <Route path="/graph/cycleDetection" element={<GraphCycleDetection />} />
                      <Route path="/graph/bellman-ford" element={<BellmanFordPage />} />

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

                      {/* Data Structures Docs */}
                      <Route path="/data-structures-docs" element={<DSDocumentation />} />

                      {/* Notes Routes */}
                      <Route path="/notes/:language/:topic" element={<NotesPage />} />
                      <Route path="/notes/:language" element={<NotesRedirect />} />
                      <Route path="/notes" element={<Navigate to="/notes/javascript/fundamentals" replace />} />

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

                      <Route path="/contributor-board" element={<ContributorBoard />} />
                      <Route path="/contributor/:id" element={<ContributorProfileModal />} />

                      <Route path="/playground" element={<Playground />} />
                      <Route path="/learn/git" element={<GitLearning />} />
                      <Route path="/learn/git-basics-quiz" element={<GitBasicsQuiz />} />

                      <Route path="/cheatsheet" element={<Cheatsheet />} />
                      <Route path="/algorithm-comparison-table" element={<AlgorithmComparisonTable />} />

                      <Route path="/learn" element={<LearnLanding />} />
                      <Route path="/progress" element={<ProgressTracker topics={["Sorting", "Graphs", "DP"]} />} />
                      <Route path="/leaderboard" element={<LearnerLeaderboard />} />
                      <Route path="/weekly-challenge" element={<WeeklyChallenge />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>

                    {showComplexityBoxOn.includes(location.pathname) && (
                      <div style={{ marginTop: "2rem" }}>
                        <ComplexityBox />
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
    </>
  );
};

export default App;