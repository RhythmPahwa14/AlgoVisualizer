// Change the 'keywords' from an array of strings to an array of objects
const faqs = [
  {
    id: "about",
    question: "What is AlgoVisualizer?",
    answer: "AlgoVisualizer is an interactive web application designed to help users visualize and understand various sorting and searching algorithms in real-time.",
    keywords: [
      { word: "algovisualizer", weight: 10 }, 
      { word: "about", weight: 5 },
      { word: "project", weight: 5 },
      { word: "what", weight: 1 },
      { word: "who", weight: 1 },
      { word: "purpose", weight: 1 },
    ],
  },
  {
    id: "what-is-sorting",
    question: "What are sorting algorithms?",
    answer: "Sorting algorithms are methods for rearranging a collection of items (like numbers or names) into a specific order, such as ascending or descending. They are a fundamental part of computer science. You can learn more at GeeksforGeeks (https://www.geeksforgeeks.org/sorting-algorithms/) or watch a great overview on YouTube https://www.youtube.com/watch?v=1jCFUv-Xlqo",
    keywords: [
      { word: "sorting", weight: 10 },
      { word: "sort", weight: 10 },
      { word: "explain sorting", weight: 8 },
      { word: "what is sorting", weight: 8 },
      { word: "bubble", weight: 2 },
      { word: "merge", weight: 2 },
      { word: "quick", weight: 2 },
    ],
  },
  {
    id: "what-is-searching",
    question: "What are searching algorithms?",
    answer: "Searching algorithms are designed to find and retrieve a specific element from a data structure. The efficiency of a search algorithm depends heavily on whether the data is sorted. For a detailed guide, check out the searching algorithm section on Programiz (https://www.programiz.com/dsa/searching-algorithms) or Wikipedia (https://en.wikipedia.org/wiki/Search_algorithm).",
    keywords: [
      { word: "searching", weight: 10 },
      { word: "search", weight: 10 },
      { word: "explain searching", weight: 8 },
      { word: "what is searching", weight: 8 },
      { word: "find", weight: 3 },
      { word: "binary", weight: 2 },
      { word: "linear", weight: 2 },
    ],
  },
  {
    id: "what-are-graphs",
    question: "What are graphs in data structures?",
    answer: "A graph is a non-linear data structure consisting of nodes (or vertices) and edges that connect pairs of nodes. They are used to model relationships between objects, such as social networks, computer networks, or road maps. You can find excellent resources at Khan Academy (https://www.khanacademy.org/computing/computer-science/algorithms/graph-representation/a/describing-graphs) or by watching this introductory video (https://www.youtube.com/watch?v=cWNEl4HE2OE).",
    keywords: [
      { word: "graph", weight: 10 },
      { word: "graphs", weight: 10 },
      { word: "explain graphs", weight: 8 },
      { word: "what are graphs", weight: 8 },
      { word: "nodes", weight: 3 },
      { word: "edges", weight: 3 },
      { word: "vertices", weight: 3 },
    ],
  },
  {
    id: "study-resources",
    question: "Can you recommend some resources to study algorithms?",
    answer: "Absolutely! For tutorials and theory, GeeksforGeeks and Programiz and W3schools are excellent. For hands-on coding practice, which is crucial, LeetCode and HackerRank are top choices used for interview preparation. If you prefer structured video courses, platforms like Coursera and edX have great options from universities and companies.",
    keywords: [
      { word: "resources", weight: 10 },
      { word: "study", weight: 10 },
      { word: "learn", weight: 10 },
      { word: "practice", weight: 8 },
      { word: "prepare", weight: 8 },
      { word: "interview", weight: 5 },
      { word: "websites", weight: 5 },
      { word: "courses", weight: 5 },
      { word: "materials", weight: 5 },
      { word: "best", weight: 2 },
    ],
  },
  {
    id: "features",
    question: "What are the main features?",
    answer: "Visualize Algorithms: See how different sorting and searching algorithms work step-by-step. Interactive Experience: Adjust input values and see how the algorithms react.Export Visualizations: 📹 Record algorithms as GIFs/videos or take snapshots for presentations and sharing.Performance Statistics: Track comparisons, swaps, and execution time for each algorithm.Responsive Design: Accessible on both desktop and mobile devices.Educational Tools: Perfect for classrooms, tutorials, and learning algorithm concepts.",

    keywords: [
      { word: "feature", weight: 10 },
      { word: "export", weight: 8 },
      { word: "record", weight: 5 },
      { word: "statistics", weight: 5 },
      { word: "what can", weight: 1 },
      { word: "do", weight: 1 },
    ],
  },
  {
    id: "algorithms",
    question: "Which algorithms are supported?",
    answer: "We support Sorting Algorithms Bubble Sort Insertion Sort Selection Sort Merge Sort Quick Sort Searching Algorithms Linear Search Binary Search Jump Search Exponential Search",
    keywords: [
      { word: "algorithm", weight: 10 },
      { word: "supported", weight: 8 },
      { word: "sorting", weight: 5 },
      { word: "searching", weight: 5 },
      { word: "which", weight: 1 },
      { word: "list", weight: 1 },
    ],
  },
  {
    id: "usage",
    question: "How do I run this project locally?",
    answer: "To run it locally, fork the repoo and clone the repository from GitHub",
    keywords: [
      { word: "install", weight: 10 },
      { word: "run", weight: 10 },
      { word: "local", weight: 8 },
      { word: "setup", weight: 5 },
      { word: "usage", weight: 5 },
      { word: "how to", weight: 1 },
    ],
  },
  {
    id: "free",
    question: "Is this tool free to use?",
    answer: "Yes! AlgoVisualizer is completely free and open source, You can even contribute to it",
    keywords: [
      { word: "free", weight: 10 },
      { word: "cost", weight: 10 },
      { word: "price", weight: 10 },
      { word: "open source", weight: 5 },
      { word: "ads", weight: 2 },
    ],
  },
  {
    id: "contribute",
    question: "How can I contribute?",
    answer: "Contributions to the AlgoVisualizer project are highly encouraged and can be made directly through its GitHub repository. If you have ideas for new features, want to suggest improvements, or need to report a bug, the best approach is to open a new ticket on the Issues tab for discussion. For those looking to contribute code directly, the standard process is to fork the repository, implement your changes, and then submit them for review by opening a pull request. You can find the complete project and begin contributing at https://github.com/RhythmPahwa14/AlgoVisualizer.",
    keywords: [
      { word: "contribute", weight: 10 },
      { word: "github", weight: 8 },
      { word: "pull request", weight: 5 },
      { word: "help", weight: 2 },
      { word: "issue", weight: 2 },
    ],
  },
];
    

export const getBotResponse = (userInput) => {
  const lowerInput = userInput.toLowerCase();
  let bestMatch = { id: null, score: 0 };

  if (!userInput.trim()) return null;

  faqs.forEach(faq => {
    let currentScore = 0;
    faq.keywords.forEach(keywordObj => {
      // Check if the user's input includes the keyword's word
      if (lowerInput.includes(keywordObj.word)) {
        // Add the keyword's weight to the score instead of just 1
        currentScore += keywordObj.weight;
      }
    });

    if (currentScore > bestMatch.score) {
      bestMatch = { id: faq.id, score: currentScore };
    }
  });

  if (bestMatch.score > 5) {
    const bestFaq = faqs.find(faq => faq.id === bestMatch.id);
    return bestFaq.answer;
  }

  return "I'm sorry, I couldn't find an answer to that. Please try rephrasing, or ask about features, installation, or supported algorithms.";
};