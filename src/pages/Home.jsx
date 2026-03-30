import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Puzzle, Braces, Brain, Layers } from "lucide-react";


import {
  Play,
  Pause,
  RotateCcw,
  Code,
  Search as SearchIcon,
  BarChart3,
  GitBranch,
  Users,
  Trophy,
  ArrowRight,
  Sparkles,
  BookOpen,
  Target,
  Clock,
  Star,
  Share2,
} from "lucide-react";
import "../styles/home.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProblemOfTheDay from '../components/ProblemOfTheDay';
import AuthModal from '../components/AuthModal';

/** ---------- Theme helpers ---------- */
function useColorScheme() {
  const [isLight, setIsLight] = useState(() => {
    const htmlTheme = document.documentElement.getAttribute("data-theme");
    if (htmlTheme) return htmlTheme === "light";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e) => {
      const htmlTheme = document.documentElement.getAttribute("data-theme");
      if (!htmlTheme) setIsLight(e.matches);
    };

    // Use modern addEventListener if available, fallback to addListener
    if (mq.addEventListener) {
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    } else {
      mq.addListener(onChange);
      return () => mq.removeListener(onChange);
    }
  }, []);

  // Also react to manual toggles via data-theme on <html>
  useEffect(() => {
    const obs = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const htmlTheme = document.documentElement.getAttribute("data-theme");
          if (htmlTheme) setIsLight(htmlTheme === "light");
        }
      });
    });

    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
      attributeOldValue: true
    });

    return () => obs.disconnect();
  }, []);

  return isLight;
}

function getTheme(isLight) {
  if (!isLight) {
    // Dark theme - Minimal black and white
    return {
      textPrimary: "#ffffff",
      textSecondary: "#666666",
      subText: "#999999",
      cardBg: "#000000",
      cardBorder: "1px solid #e5e5e5",
      surfaceBg: "#0a0a0a",
      surfaceBorder: "1px solid #333333",
      baseline: "#333333",
      heroGradient: "#000000",
      badgeBg: "#ffffff",
      badgeBorder: "1px solid #e5e5e5",
      updatesCardBg: "#0a0a0a",
      shadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      demoShellBg: "#000000",
      demoShellShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
      pillBg: "#ffffff",
      pillBorder: "1px solid #e5e5e5",
    };
  }
  // Light theme - Minimal black and white with clean aesthetic
  return {
    textPrimary: "#000000",
    textSecondary: "#666666",
    subText: "#999999",
    cardBg: "#ffffff",
    cardBorder: "1px solid #e5e5e5",
    surfaceBg: "#fafafa",
    surfaceBorder: "1px solid #e5e5e5",
    baseline: "#e5e5e5",
    heroGradient: "#000000",
    badgeBg: "#ffffff",
    badgeBorder: "1px solid #e5e5e5",
    updatesCardBg: "#ffffff",
    shadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    demoShellBg: "#000000",
    demoShellShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
    pillBg: "#ffffff",
    pillBorder: "1px solid #e5e5e5",
  };
}

/** --------- Typewritter heading -----------*/
const TypewriterHeading = () => {
  const words = ["Visualize", "Analyze", "Understand", "Master Algorithms"];
  const [displayedWord, setDisplayedWord] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && letterIndex < currentWord.length) {
        // Typing
        setDisplayedWord(currentWord.substring(0, letterIndex + 1));
        setLetterIndex(letterIndex + 1);
      } else if (isDeleting && letterIndex > 0) {
        // Deleting
        setDisplayedWord(currentWord.substring(0, letterIndex - 1));
        setLetterIndex(letterIndex - 1);
      } else if (!isDeleting && letterIndex === currentWord.length) {
        // Pause before deleting
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && letterIndex === 0) {
        // Move to next word
        setIsDeleting(false);
        setWordIndex((wordIndex + 1) % words.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [letterIndex, isDeleting, wordIndex, words]);

  return (
    <h1 className="typewriter-heading">
      {displayedWord}
      <span className="cursor" />
    </h1>
  );
};

/** ---------- Shared layout styles ---------- */
const container = { width: "100%", display: "flex", justifyContent: "center", boxSizing: "border-box" };
const inner = { width: "min(1200px, 100%)", padding: "1.5rem", boxSizing: "border-box" };

const Home = () => {
  // Always use light (white bg / black text) minimal design
  const isLight = true;
  const T = getTheme(isLight);

  const [showProblemModal, setShowProblemModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Initialize AOS with proper cleanup
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });

    return () => {
      AOS.refresh();
    };
  }, []);

  /** ===== Bubble Sort — optimized with proper cleanup ===== */
  const BAR_COUNT = 8;
  const STEP_MS = 350;

  const generateArrayWithInversion = () => {
    const arr = Array.from({ length: BAR_COUNT }, () => 20 + Math.floor(Math.random() * 75));
    let hasInversion = false;

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        hasInversion = true;
        break;
      }
    }

    if (!hasInversion && arr.length > 1) {
      [arr[0], arr[1]] = [arr[1], arr[0]];
    }

    return arr;
  };

  const initial = useMemo(
    () => generateArrayWithInversion(),
    []
  );

  const [values, setValues] = useState(initial);
  const [pass, setPass] = useState(0);
  const [idx, setIdx] = useState(0);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const intervalRef = useRef(null);
  const isComponentMounted = useRef(true);
  const valuesRef = useRef(initial);
  const passRef = useRef(0);
  const idxRef = useRef(0);
  const comparisonsRef = useRef(0);
  const swapsRef = useRef(0);
  const isAnimatingRef = useRef(true);

  // Cleanup function to prevent memory leaks
  const cleanup = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reshuffleValues = () => {
    const fresh = generateArrayWithInversion();
    valuesRef.current = fresh;
    passRef.current = 0;
    idxRef.current = 0;
    comparisonsRef.current = 0;
    swapsRef.current = 0;

    setValues(fresh);
    setPass(0);
    setIdx(0);
    setComparisons(0);
    setSwaps(0);
  };

  const stepBubbleSort = () => {
    if (!isComponentMounted.current || !isAnimatingRef.current) return;

    const arr = [...valuesRef.current];
    const n = arr.length;

    if (passRef.current >= n - 1) {
      reshuffleValues();
      return;
    }

    if (idxRef.current >= n - passRef.current - 1) {
      passRef.current += 1;
      idxRef.current = 0;
      setPass(passRef.current);
      setIdx(0);
      return;
    }

    comparisonsRef.current += 1;
    setComparisons(comparisonsRef.current);

    if (arr[idxRef.current] > arr[idxRef.current + 1]) {
      [arr[idxRef.current], arr[idxRef.current + 1]] = [arr[idxRef.current + 1], arr[idxRef.current]];
      swapsRef.current += 1;
      setSwaps(swapsRef.current);
    }

    idxRef.current += 1;
    valuesRef.current = arr;
    setValues(arr);
    setIdx(idxRef.current);
  };

  // Start/stop animation timer based on play state
  useEffect(() => {
    isAnimatingRef.current = isAnimating;

    if (isAnimating) {
      cleanup();
      intervalRef.current = setInterval(stepBubbleSort, STEP_MS);
    } else {
      cleanup();
    }

    return () => {
      cleanup();
    };
  }, [isAnimating]);

  // Mark unmounted once
  useEffect(() => {
    return () => {
      isComponentMounted.current = false;
      cleanup();
    };
  }, []);

  const activeA = idx;
  const activeB = idx + 1;
  const sortedStart = values.length - pass;

  // Control functions for the animation
  const toggleAnimation = () => {
    setIsAnimating((prev) => !prev);
  };

  const resetAnimation = () => {
    cleanup();
    reshuffleValues();
    isAnimatingRef.current = true;
    setIsAnimating(true);
    intervalRef.current = setInterval(stepBubbleSort, STEP_MS);
  };

  /** ===== Data ===== */
  const features = [
    {
      icon: BarChart3,
      title: "Sorting",
      path: "/sorting",
      description: "See Bubble, Quick, Merge, Heap & more in motion.",
      gradient: "from-sky-400 to-blue-600",
      badges: ["12+ algos", "Live steps", "Big-O"],
    },
    {
      icon: SearchIcon,
      title: "Searching",
      path: "/searching",
      description: "Binary, Linear, Jump, Exponential—visual & fast.",
      gradient: "from-sky-400 to-blue-600",
      badges: ["8+ algos", "Trace moves", "Compare runs"],
    },
    {
      icon: BookOpen,
      title: "Documentation",
      path: "/documentation",
      description: "Complete algorithm reference with complexity analysis.",
      gradient: "from-sky-400 to-blue-600",
      badges: ["50+ algos", "Details", "Examples"],
    },
    {
      icon: GitBranch,
      title: "Data Structures",
      path: "/data-structures",
      description: "Lists, Trees, Stacks, Queues, Graphs—built up.",
      gradient: "from-sky-400 to-blue-600",
      badges: ["15+ types", "Ops demo", "Memory view"],
    },
    {
      icon: Share2,
      title: "Graph Algorithms",
      path: "/graph",
      description: "BFS, DFS, Dijkstra on your own or sample graphs.",
      gradient: "from-sky-400 to-blue-600",
      badges: ["Build graph", "Path trace", "Weights"],
    },

    {
      icon: Puzzle,
      title: "Backtracking",
      path: "/backtracking",
      description: "Visualize N-Queens, Sudoku Solver, Maze Paths, and more with recursion trace.",
      gradient: "from-purple-500 to-pink-500",
      badges: ["N-Queens", "Sudoku", "Maze Solver"],
    },

  ];


  const recentUpdates = [
    { type: "new", title: "Quick Sort: step guide", description: "Clean overlays with pivot highlights.", time: "2h ago" },
    { type: "update", title: "BST visuals", description: "Smoother insert + balanced spacing.", time: "1d ago" },
    { type: "feature", title: "Complexity compare", description: "Side-by-side time/space charts.", time: "3d ago" },
    { type: "community", title: "50+ contributors", description: "Docs & fixes from new members.", time: "1w ago" },
  ];

  const learningPaths = [
    {
      title: "Complete Beginner",
      duration: "2–3 weeks",
      color: "linear-gradient(90deg,#f59e0b,#10b981,#22d3ee)",
      desc: "Start with basic sorting and searching algorithms",
      tags: ["Bubble Sort", "Linear Search", "Basic Arrays"],
    },
    {
      title: "Intermediate Developer",
      duration: "4–6 weeks",
      color: "linear-gradient(90deg,#f59e0b,#10b981,#22d3ee)",
      desc: "Dive into advanced algorithms and data structures",
      tags: ["Quick Sort", "Binary Search", "Trees & Graphs"],
    },
    {
      title: "Algorithm Expert",
      duration: "8–12 weeks",
      color: "linear-gradient(90deg,#f59e0b,#10b981,#22d3ee)",
      desc: "Master complex algorithms and optimization techniques",
      tags: ["Dynamic Programming", "Graph Algorithms", "Advanced Trees"],
    },
  ];

  const featuredResources = features.slice(0, 2);

  /** ===== Quick responsive helpers (no external CSS changes) ===== */
  const gridStyles = `
    .hero-grid { display:grid; grid-template-columns: 1.08fr 1fr; gap:2.25rem; align-items:stretch; }
    .grid-2 { display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap:1.25rem; }
    .updates-grid { display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap:1rem; }
    .paths-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:1rem; }
    
    .algo-marketing-grid { display:grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin: 4rem auto; max-width: 1300px; align-items: start; }
    .section-h2 { font-size: 1.8rem; font-weight: 800; color: #000; margin: 0 0 1.5rem 0; letter-spacing: -0.5px; font-family: 'Inter', sans-serif; }
    .section-sub { font-size: 0.65rem; font-weight: 800; color: #888; letter-spacing: 1px; margin-bottom: 0.75rem; text-transform: uppercase; font-family: 'Inter', sans-serif; }
    
    @media (max-width: 1024px){ 
      .hero-grid{ grid-template-columns:1fr; } 
      .algo-marketing-grid { grid-template-columns:1fr; gap: 4rem; }
    }
    @media (max-width: 780px){ 
      .grid-2{ grid-template-columns:1fr; } 
      .updates-grid{ grid-template-columns:1fr; } 
    }
  `;

  return (
    <div className="home-dashboard">
      <style>{gridStyles}</style>
      {/* hero heading */}
      <TypewriterHeading />
      {/* ===== Hero ===== */}
      <section style={{ ...container, padding: "2rem 1.5rem 1.75rem" }} data-aos="fade-up" data-aos-duration="800">
        <div style={{ ...inner }}>
          <div className="hero-grid">
            {/* LEFT: Bubble Sort */}
            <div
              style={{
                background: T.cardBg,
                borderRadius: 14,
                padding: "1rem",
                border: T.cardBorder,
                boxShadow: T.shadow,
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
              data-aos="zoom-in" data-aos-duration="1500"
            >
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: isLight ? "#000000" : "#ffffff",
                backgroundColor: 'transparent',
                paddingBottom: "0.5rem",
                borderBottom: `1px solid ${T.surfaceBorder.split(' ')[2]}`
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 8, height: 8, borderRadius: 999,
                      background: isLight ? "#000000" : "#ffffff",
                    }}
                  />
                  <strong style={{ letterSpacing: ".2px", fontWeight: 600, fontFamily: "'Inter', system-ui, sans-serif" }}>LIVE</strong>
                </div>
                <span style={{ fontSize: ".875rem", color: T.textSecondary, fontFamily: "'Inter', system-ui, sans-serif" }}>
                  VISUALIZER / BUBBLE SORT
                </span>
              </div>

              {/* Chart */}
              <div
                style={{
                  position: "relative", height: 280,
                  background: T.surfaceBg,
                  borderRadius: 12, border: T.surfaceBorder,
                  padding: "10px 8px 14px",
                  display: "flex", alignItems: "flex-end", gap: 3, overflow: "hidden",
                }}
              >
                {/* horizontal grid - minimal */}
                <div aria-hidden style={{
                  position: "absolute", inset: 0,
                  background: isLight
                    ? "repeating-linear-gradient(to top, #e5e5e5, #e5e5e5 1px, transparent 1px, transparent 40px)"
                    : "repeating-linear-gradient(to top, #333333, #333333 1px, transparent 1px, transparent 40px)",
                  pointerEvents: "none",
                  opacity: 0.3,
                }} />
                {/* baseline */}
                <div aria-hidden style={{
                  position: "absolute", left: 8, right: 8, bottom: 14, height: 1,
                  background: T.baseline,
                }} />
                {values.map((h, i) => {
                  const isActive = i === activeA || i === activeB;
                  const isSorted = i >= sortedStart;
                  
                  // Minimal color scheme - black/white/grey
                  const baseColor = isLight ? "#333333" : "#ffffff";
                  const activeColor = isLight ? "#000000" : "#ffffff";
                  const sortedColor = isLight ? "#666666" : "#cccccc";

                  return (
                    <div
                      key={i}
                      style={{
                        width: `calc((100% - ${3 * (values.length - 1)}px) / ${values.length})`,
                        height: `${h}%`,
                        minWidth: 10,
                        borderRadius: 4,
                        background: isSorted ? sortedColor : isActive ? activeColor : baseColor,
                        opacity: isSorted ? 0.5 : isActive ? 1 : 0.7,
                        transition: "height .4s cubic-bezier(.2,.8,.2,1), transform .2s ease, background .2s ease, opacity .2s ease",
                        transform: isActive ? "translateY(-4px)" : "translateY(0)",
                      }}
                      title={`Value: ${h}`}
                    />
                  );
                })}
              </div>

              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                color: T.textSecondary, 
                fontSize: ".875rem", 
                paddingTop: 4,
                fontFamily: "'Inter', system-ui, sans-serif"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                  <span style={{ color: T.textPrimary, fontWeight: 500 }}>{BAR_COUNT} DATA POINTS</span>
                  <span style={{ color: T.textSecondary, fontSize: "0.8rem" }}>
                    COMP: {comparisons} | SWAPS: {swaps}
                  </span>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={toggleAnimation}
                      style={{
                        background: isLight ? "#ffffff" : "#000000",
                        border: `1px solid ${isLight ? "#e5e5e5" : "#333333"}`,
                        borderRadius: "4px",
                        padding: "6px 12px",
                        cursor: "pointer",
                        color: isLight ? "#000000" : "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "0.75rem",
                        transition: "all 0.2s ease",
                        fontWeight: 500,
                        fontFamily: "'Inter', system-ui, sans-serif",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = isLight ? "#f5f5f5" : "#1a1a1a";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = isLight ? "#ffffff" : "#000000";
                      }}
                      title={isAnimating ? "Pause animation" : "Resume animation"}
                    >
                      {isAnimating ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                    <button
                      onClick={resetAnimation}
                      style={{
                        background: isLight ? "#ffffff" : "#000000",
                        border: `1px solid ${isLight ? "#e5e5e5" : "#333333"}`,
                        borderRadius: "4px",
                        padding: "6px 12px",
                        cursor: "pointer",
                        color: isLight ? "#000000" : "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "0.75rem",
                        transition: "all 0.2s ease",
                        fontWeight: 500,
                        fontFamily: "'Inter', system-ui, sans-serif",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = isLight ? "#f5f5f5" : "#1a1a1a";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = isLight ? "#ffffff" : "#000000";
                      }}
                      title="Reset with new data"
                    >
                      <RotateCcw size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: copy */}
            <div style={{ padding: ".4rem 0", display: "grid", gridTemplateRows: "auto auto auto auto auto", alignItems: "start" }}>
              <div
                className="hero-badge"
                style={{
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: 8, 
                  padding: "8px 16px",
                  borderRadius: 4, 
                  border: `1px solid ${isLight ? "#e5e5e5" : "#333333"}`, 
                  color: T.textPrimary,
                  background: isLight ? "#ffffff" : "#000000", 
                  width: "fit-content",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "1px",
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              >
                INTERACTIVE ALGORITHM LAB
              </div>

              <h1
                className="hero-title"
                style={{
                  marginTop: "1.5rem", 
                  lineHeight: 1.1,
                  fontSize: "clamp(32px, 5vw, 52px)",
                  fontWeight: 800, 
                  letterSpacing: "-1px",
                  color: "#000000",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  WebkitTextFillColor: "#000000",
                  background: "none",
                }}
              >
                Master Algorithms Through Visual Learning
              </h1>

              <p className="hero-subtitle" style={{ 
                marginTop: "0.45rem", 
                marginBottom: "0.2rem",
                color: T.textSecondary, 
                maxWidth: 560, 
                fontSize: "1rem", 
                lineHeight: 1.6,
                fontFamily: "'Inter', system-ui, sans-serif",
              }}>
                Learn by seeing. Trace every step, compare complexity, and build intuition fast.
              </p>

              <div className="hero-features" style={{ marginTop: "0.35rem", display: "flex", gap: ".6rem", flexWrap: "wrap" }}>
                <div className="feature-highlight" style={{ 
                  background: isLight ? "#ffffff" : "#000000", 
                  border: `1px solid ${isLight ? "#e5e5e5" : "#333333"}`,
                  borderRadius: "4px",
                  padding: "7px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.875rem",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  color: T.textPrimary,
                }}><Clock size={16} /><span>REAL-TIME VIEWS</span></div>
                <div className="feature-highlight" style={{ 
                  background: isLight ? "#ffffff" : "#000000", 
                  border: `1px solid ${isLight ? "#e5e5e5" : "#333333"}`,
                  borderRadius: "4px",
                  padding: "7px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.875rem",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  color: T.textPrimary,
                }}><BookOpen size={16} /><span>STEP GUIDES</span></div>
                <div className="feature-highlight" style={{ 
                  background: isLight ? "#ffffff" : "#000000", 
                  border: `1px solid ${isLight ? "#e5e5e5" : "#333333"}`,
                  borderRadius: "4px",
                  padding: "7px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.875rem",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  color: T.textPrimary,
                }}><Target size={16} /><span>HANDS-ON PRACTICE</span></div>
              </div>

              <div style={{ marginTop: "0.75rem", display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                <Link to="/login" className="btn-primary-new" style={{
                  background: isLight ? "#000000" : "#ffffff",
                  color: isLight ? "#ffffff" : "#000000",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
                }}><span>START LEARNING</span><ArrowRight size={16} /></Link>
                <Link to="/quiz" className="btn-secondary-new" style={{
                  background: isLight ? "#ffffff" : "#000000",
                  color: isLight ? "#000000" : "#ffffff",
                  border: `1px solid ${isLight ? "#e5e5e5" : "#333333"}`,
                  padding: "10px 20px",
                  borderRadius: "4px",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
                }}>TAKE A QUIZ</Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards with detailed content */}
      {/* ADD THIS NEW SECTION */}
      <div className="algo-marketing-grid">
        
        {/* Left Col */}
        <div className="algo-col">
          <h2 className="section-h2">Resources</h2>
          <div className="section-sub">AVAILABLE MODULES</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {features.map((feature, i) => (
              <Link key={i} to={feature.path} style={{
                display: 'block', padding: '12px 16px', background: isLight ? '#ffffff' : '#111',
                borderLeft: i === 0 ? '3px solid #000' : '3px solid transparent',
                boxShadow: i === 0 ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                borderRadius: '4px', textDecoration: 'none',
                marginLeft: i === 0 ? '-3px' : '0'
              }}>
                 <div style={{ fontWeight: 700, color: i === 0 ? T.textPrimary : T.textSecondary, fontSize: '0.95rem' }}>{feature.title}</div>
                 <div style={{ fontSize: '0.8rem', color: T.textSecondary, marginTop: '2px' }}>{feature.description.slice(0,35)}...</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Middle Col */}
        <div className="algo-col">
          <h2 className="section-h2">Learning Paths</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', marginTop: '1.5rem' }}>
            {learningPaths.map((path, i) => (
               <div key={i} style={{ borderBottom: i !== learningPaths.length-1 ? '1px solid #e5e5e5' : 'none', paddingBottom: i !== learningPaths.length-1 ? '2.5rem' : '0' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                       <h3 style={{ fontStyle: 'italic', fontWeight: 800, fontSize: '1.5rem', margin: 0, color: '#000' }}>{path.title}</h3>
                       <p style={{ color: T.textSecondary, fontSize: '0.95rem', marginTop: '0.8rem', maxWidth: '85%', lineHeight: 1.5 }}>{path.desc}</p>
                    </div>
                    <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                       <div style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.5px', color: '#000', whiteSpace: 'nowrap' }}>{path.duration.split(' ')[0].replace('–', ' – ')}</div>
                       <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '1px', color: T.textSecondary, marginTop: '4px' }}>WEEKS<br/>DURATION</div>
                    </div>
                 </div>
                 {/* Placeholder image box */}
                 <div style={{ marginTop: '1.5rem', height: '220px', background: 'linear-gradient(45deg, #111, #333)', borderRadius: '6px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '100%', height: '100%', opacity: 0.5, backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: '#000', color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '6px 10px', letterSpacing: '1px', borderRadius: '4px' }}>
                       {i === 0 ? 'CORE PATH' : 'EXPERT LEVEL'}
                    </div>
                 </div>
                 <Link to="/learn" style={{ display: 'inline-block', marginTop: '1.2rem', fontSize: '0.8rem', fontWeight: 800, color: '#000', textDecoration: 'none', borderBottom: '2px solid #000', paddingBottom: '2px', letterSpacing: '1px' }}>VIEW MODULES &rarr;</Link>
               </div>
            ))}
          </div>
        </div>
        
      </div>

      {/* Problem of the Day Modal */}
      {showProblemModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: isLight ? "rgba(241, 245, 249, 0.95)" : "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "2rem",
            animation: "modalFadeIn 0.3s ease-out",
          }}
          onClick={() => setShowProblemModal(false)}
        >
          <div
            style={{
              background: T.cardBg,
              borderRadius: 20,
              border: T.cardBorder,
              boxShadow: isLight
                ? "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05)"
                : "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)",
              maxWidth: "900px",
              width: "100%",
              maxHeight: "85vh",
              overflow: "hidden",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              animation: "modalSlideIn 0.3s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with close button */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1.5rem 2rem 0.5rem",
                borderBottom: `1px solid ${isLight ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"}`,
                marginBottom: "1rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: T.textPrimary,
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Sparkles size={24} style={{ color: isLight ? "#6366f1" : "#a78bfa" }} />
                Problem of the Day
              </h2>
              <button
                onClick={() => setShowProblemModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "28px",
                  cursor: "pointer",
                  color: T.textSecondary,
                  padding: "0.25rem",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  transition: "all 0.2s ease",
                  opacity: 0.7,
                }}
                onMouseEnter={(e) => {
                  e.target.style.opacity = "1";
                  e.target.style.backgroundColor = isLight ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = "0.7";
                  e.target.style.backgroundColor = "transparent";
                }}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div
              style={{
                padding: "0 2rem 2rem",
                overflow: "auto",
                flex: 1,
              }}
            >
              <ProblemOfTheDay />
            </div>
          </div>
        </div>
      )}

      <style>{`
          @keyframes modalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes modalSlideIn {
            from {
              opacity: 0;
              transform: scale(0.95) translateY(-10px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}</style>
    </div>
  );
};

export default Home;

