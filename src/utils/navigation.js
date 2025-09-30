// Unified navigation structure

export const headerNavigationItems = [
  { path: '/', label: 'Home', icon: 'FaCode', group: 'main' },
  { path: '/documentation', label: 'Documentation', icon: 'FaBook', group: 'help' },
  { path: '/ContributorLeaderboard', label: 'Contributors', icon: 'FaUsers', group: 'community' },
  { path: '/quiz', label: 'Quiz', icon: 'FaBrain', group: 'test' },
];

export const navbarNavigationItems = [
  { path: "/", label: "Home", icon: "Home" },
  { path: "/learn", label: "Learn", icon: "BookOpen" }, // ← simple link now
  { path: "/quiz", label: "Quiz", icon: "Trophy" },
  { path: "/contributor-leaderboard", label: "Contributors", icon: "Users" },
  { path: "/data-structures", label: "Documentation", icon: "BookOpen" },
  { path: "/settings", label: "Settings", icon: "Settings" },
];

// Optional: structured data for the Learn page
export const learnSections = [
  {
    heading: "Data Structures",
    items: [
      { path: "/data-structures", label: "Overview" },
      { path: "/data-structures/linked-list", label: "Linked List" },
      { path: "/data-structures/queue", label: "Queue visualization" },
      { path: "/data-structures/stack", label: "Stack visualization" },
      { path: "/data-structures/binary-tree", label: "Binary Tree visualization" },
    ],
  },
  {
    heading: "Sorting",
    items: [
      { path: "/sorting", label: "Overview" },
      { path: "/components/AlgorithmComparison", label: "Algorithm Comparison" },
    ],
  },
  {
    heading: "Searching",
    items: [
      { path: "/searchingOverview", label: "Overview" },
      { path: "/searching", label: "Searching Algorithm" },
    ],
  },
  {
    heading: "Graphs",
    items: [
      { path: "/graph", label: "Overview" },
      { path: "/graph/bfs", label: "BFS" },
      { path: "/graph/dfs", label: "DFS" },
      { path: "/graph/dijkstra", label: "Dijkstra" },
      { path: "/graph/comparison", label: "Graph Comparison" },
      { path: "/graph/cycleDetection", label: "Cycle Detection" },
    ],
  },
  {
    heading: "Paradigms",
    items: [
      { path: "/backtracking-overview", label: "Backtracking (Overview)" },
      { path: "/backtracking", label: "Backtracking Algorithms" },
      { path: "/dp-overview", label: "Dynamic Programming (Overview)" },
      { path: "/dp", label: "Dynamic Programming" },
      { path: "/greedy-overview", label: "Greedy (Overview)" },
      { path: "/greedy", label: "Greedy Algorithms" },
      { path: "/dc-overview", label: "Divide & Conquer (Overview)" },
      { path: "/dc", label: "Divide & Conquer" },
    ],
  },
  {
    heading: "Other Topics",
    items: [
      { path: "/hashing-overview", label: "Hashing (Overview)" },
      { path: "/hashing", label: "Hashing Algorithms" },
      { path: "/tree-overview", label: "Trees (Overview)" },
      { path: "/tree", label: "Tree Algorithms" },
      { path: "/game-search-overview", label: "Game Search (Overview)" },
      { path: "/game-search", label: "Game Search Algorithms" },
      { path: "/branchbound-overview", label: "Branch & Bound (Overview)" },
      { path: "/branchbound", label: "Branch & Bound" },
    ],
  },
];
