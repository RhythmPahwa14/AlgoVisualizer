// Unified navigation structure
// Organized by sections for better maintainability

// Header navigation items (used in Header component)
export const headerNavigationItems = [
  { path: "/", label: "Home", icon: "FaCode", group: "main" },
  {
    path: "/documentation",
    label: "Documentation",
    icon: "FaBook",
    group: "help"
  },
  {
    path: "/ContributorLeaderboard",
    label: "Contributors",
    icon: "FaUsers",
    group: "community"
  },
  { path: "/quiz", label: "Quiz", icon: "FaBrain", group: "test" }
];

// Main navbar navigation items (used in Navbar component)
export const navbarNavigationItems = [
  { path: "/learn", label: "Learn", icon: "Zap" },
  { path: "/cheatsheet", label: "Cheatsheet", icon: "Hash" },
  { path: "/quiz", label: "Quiz", icon: "Trophy" },
  {
    label: "Community",
    icon: "Users",
    dropdown: [
      { path: "/community", label: "Community" },
      { path: "/contributor-leaderboard", label: "Contributors" },
      { path: "/contributor-leaderboard", label: "Leaderboard" }
    ]
  },
 { path: "/documentation", label: "Documentation", icon: "BookOpen" },

  {
    label: "Tools",
    icon: "Cpu",
    dropdown: [
      { path: "/performance", label: "Performance Analyzer" },
      { path: "/analytics", label: "Analytics Dashboard" },
      { path: "/performance/docs", label: "Performance Docs" },
    ],
  },
  { path: "/analytics", label: "Analytics", icon: "BarChart3" },
  {
    label: "Notes",
    icon: "BookOpen",
    dropdown: [
      { path: "/notes/java", label: "Java" },
      { path: "/notes/python", label: "Python" },
      { path: "/notes/cpp", label: "Cpp" },
      { path: "/notes/c", label: "C" },
      { path: "/notes/javascript", label: "JavaScript" },
      { path: "/notes/rust", label: "Rust" }
    ]
  },
  { path: "/settings", label: "Settings", icon: "Settings" }
];

// Learn page sections organized by topic areas with tags
export const learnSections = [
  // Data Structures section
  {
    heading: "Data Structures",
    items: [
      {
        path: "/data-structures",
        label: "Overview",
        category: "Data Structures",
        tags: ["overview"]
      },
      {
        path: "/data-structures/linked-list",
        label: "Linked List",
        category: "Data Structures",
        tags: ["linked list", "nodes", "pointers"]
      },
      {
        path: "/data-structures/queue",
        label: "Queue visualization",
        category: "Data Structures",
        tags: ["queue", "FIFO"]
      },
      {
        path: "/data-structures/stack",
        label: "Stack visualization",
        category: "Data Structures",
        tags: ["stack", "LIFO"]
      },
      {
        path: "/data-structures/binary-tree",
        label: "Binary Tree visualization",
        category: "Data Structures",
        tags: ["tree", "binary tree", "nodes"]
      }
    ]
  },

  {
  heading: "Sorting",
  items: [
    {
      path: "/sorting",
      label: "Overview",
      category: "Sorting",
      tags: ["overview", "algorithms"]
    },
    {
      path: "/sorting/algorithm-comparison", // ✅ updated URL
      label: "Algorithm Comparison",
      category: "Sorting",
      tags: ["comparison", "time complexity"]
    },
  ],
},



  // Searching algorithms section
  {
    heading: "Searching",
    items: [
      {
        path: "/searchingOverview",
        label: "Overview",
        category: "Searching",
        tags: ["overview", "algorithms"]
      },
      {
        path: "/searching",
        label: "Searching Algorithm",
        category: "Searching",
        tags: ["linear search", "binary search", "algorithms"]
      }
    ]
  },

  // Graph algorithms section
  {
    heading: "Graphs",
    items: [
      { path: "/graph", label: "Overview", category: "Graphs", tags: ["overview", "graph"] },
      { path: "/graph/bfs", label: "BFS", category: "Graphs", tags: ["BFS", "graph", "queue"] },
      { path: "/graph/dfs", label: "DFS", category: "Graphs", tags: ["DFS", "graph", "recursion", "stack"] },
      { path: "/graph/dijkstra", label: "Dijkstra", category: "Graphs", tags: ["dijkstra", "shortest path", "graph"] },
      { path: "/graph/astar", label: "A*", category: "Graphs", tags: ["astar", "pathfinding", "heuristic", "grid"] },
      { path: "/graph/comparison", label: "Graph Comparison", category: "Graphs", tags: ["comparison", "graph algorithms"] },
      { path: "/graph/cycleDetection", label: "Cycle Detection", category: "Graphs", tags: ["graph", "cycle", "DFS"] },
      { path: "/graph/eulerianGraphs", label: "Eulerian graphs", category: "Graphs", tags: ["graph", "euler", "eulerianCircuit" , "eulerianPath"] },
      { path: "/graph/sccGraphs", label: "Strongly Connected Components", category: "Graphs", tags: ["graph", "SCC", "strongly connected components" , "kosarajusAlgo" , "component"] },
    ],
  },

  // Algorithmic paradigms section
  {
    heading: "Paradigms",
    items: [
      {
        path: "/backtracking-overview",
        label: "Backtracking (Overview)",
        category: "Paradigms",
        tags: ["backtracking", "overview"]
      },
      {
        path: "/backtracking",
        label: "Backtracking Algorithms",
        category: "Paradigms",
        tags: ["backtracking", "algorithms", "recursion"]
      },
      {
        path: "/dp-overview",
        label: "Dynamic Programming (Overview)",
        category: "Paradigms",
        tags: ["dp", "overview"]
      },
      {
        path: "/dp",
        label: "Dynamic Programming",
        category: "Paradigms",
        tags: ["dp", "algorithms", "optimization"]
      },
      {
        path: "/greedy-overview",
        label: "Greedy (Overview)",
        category: "Paradigms",
        tags: ["greedy", "overview"]
      },
      {
        path: "/greedy",
        label: "Greedy Algorithms",
        category: "Paradigms",
        tags: ["greedy", "algorithms"]
      },
      {
        path: "/dc-overview",
        label: "Divide & Conquer (Overview)",
        category: "Paradigms",
        tags: ["divide and conquer", "overview"]
      },
      {
        path: "/dc",
        label: "Divide & Conquer",
        category: "Paradigms",
        tags: ["divide and conquer", "algorithms"]
      },
      {
        path: "/prims",
        label: "Prim's Algorithm",
        category: "Paradigms",
        tags: ["prim's", "mst", "minimum spanning tree", "greedy", "graph"]
      },
      {
        path: "/kruskal",
        label: "Kruskal's Algorithm",
        category: "Paradigms",
        tags: ["kruskal's", "mst", "minimum spanning tree", "greedy", "graph"]
      }
    ]
  },

  // String algorithms section
  {
    heading: "String Algorithms",
    items: [
      {
        path: "/string-overview",
        label: "Overview",
        category: "String Algorithms",
        tags: ["string", "overview", "algorithms"]
      },
      {
        path: "/string",
        label: "KMP Algorithm",
        category: "String Algorithms",
        tags: ["string", "KMP", "pattern matching", "algorithms"]
      },
      {
        path: "/string/rabin-karp",
        label: "Rabin-Karp Algorithm",
        category: "String Algorithms",
        tags: ["string", "rabin-karp", "rolling hash", "pattern matching", "algorithms"]
      }
    ]
  },

  // Additional topics section
  {
    heading: "Other Topics",
    items: [
      {
        path: "/hashing-overview",
        label: "Hashing (Overview)",
        category: "Other",
        tags: ["hashing", "overview"]
      },
      {
        path: "/hashing",
        label: "Hashing Algorithms",
        category: "Other",
        tags: ["hashing", "algorithms"]
      },
      {
        path: "/tree-overview",
        label: "Trees (Overview)",
        category: "Other",
        tags: ["trees", "overview"]
      },
      { path: "/tree", label: "Tree Algorithms", category: "Other", tags: ["tree", "algorithms"] },
      { path: "/data-structures/trie", label: "Trie Visualizer", category: "Other", tags: ["trie", "prefix tree", "data structure"] },
      { path: "/huffman", label: "Huffman Coding", category: "Other", tags: ["huffman", "compression", "greedy", "encoding"] },
      { path: "/game-search-overview", label: "Game Search (Overview)", category: "Other", tags: ["game search", "overview"] },
      { path: "/game-search", label: "Game Search Algorithms", category: "Other", tags: ["game search", "algorithms"] },
      { path: "/branchbound-overview", label: "Branch & Bound (Overview)", category: "Other", tags: ["branch and bound", "overview"] },
      { path: "/branchbound", label: "Branch & Bound", category: "Other", tags: ["branch and bound", "algorithms"] },
    ],
  },
];
