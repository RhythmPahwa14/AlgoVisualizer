import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
    // Dark theme (your existing look, slightly tuned)
    return {
      textPrimary: "#e5e7eb",
      textSecondary: "rgba(229,231,235,.85)",
      subText: "rgba(229,231,235,.75)",
      cardBg: "linear-gradient(180deg, rgba(23,23,35,.9), rgba(13,20,30,.9))",
      cardBorder: "1px solid rgba(180, 184, 255, 0.12)",
      surfaceBg: "linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02))",
      surfaceBorder: "1px solid rgba(255,255,255,.06)",
      baseline: "rgba(255,255,255,.12)",
      heroGradient: "linear-gradient(92deg,#ffffff 0%, #c7d2fe 40%, #a78bfa 70%, #fb7185 100%)",
      badgeBg: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03))",
      badgeBorder: "1px solid rgba(255,255,255,.08)",
      updatesCardBg: "linear-gradient(180deg, rgba(33,43,56,.7), rgba(15,18,28,.85))",
      shadow: "0 14px 30px rgba(2,6,23,.35), 0 1px 0 rgba(255,255,255,.04) inset",
      demoShellBg: "linear-gradient(135deg, rgba(41,35,110,.9), rgba(19,20,48,.9))",
      demoShellShadow: "0 22px 55px rgba(2,6,23,.40), 0 1px 0 rgba(255,255,255,.04) inset",
      pillBg: "rgba(255,255,255,.06)",
      pillBorder: "1px solid rgba(255,255,255,.08)",
    };
  }
  // Light theme (new palette)
  return {
    textPrimary: "#0b1020",
    textSecondary: "rgba(11,16,32,.75)",
    subText: "rgba(11,16,32,.65)",
    cardBg: "linear-gradient(180deg, rgba(255,255,255,.92), rgba(247,249,255,.92))",
    cardBorder: "1px solid rgba(15,23,42,.08)",
    surfaceBg: "linear-gradient(180deg, rgba(15,23,42,.03), rgba(15,23,42,.015))",
    surfaceBorder: "1px solid rgba(15,23,42,.08)",
    baseline: "rgba(15,23,42,.15)",
    heroGradient: "linear-gradient(92deg,#1f2937 0%, #374151 40%, #4338ca 70%, #7c3aed 100%)",
    badgeBg: "linear-gradient(180deg, rgba(15,23,42,.06), rgba(15,23,42,.03))",
    badgeBorder: "1px solid rgba(15,23,42,.08)",
    updatesCardBg: "linear-gradient(180deg, rgba(255,255,255,.9), rgba(248,250,252,.9))",
    shadow: "0 10px 28px rgba(2,6,23,.10), 0 1px 0 rgba(255,255,255,.4) inset",
    demoShellBg: "linear-gradient(135deg, rgba(239,246,255,1), rgba(219,234,254,1))",
    demoShellShadow: "0 24px 40px rgba(2,6,23,.12), 0 1px 0 rgba(255,255,255,.75) inset",
    pillBg: "rgba(15,23,42,.05)",
    pillBorder: "1px solid rgba(15,23,42,.08)",
  };
}

/** ---------- Shared layout styles ---------- */
const container = { width: "100%", display: "flex", justifyContent: "center" };
const inner = { width: "min(1200px, 100%)", padding: "1.5rem" };

const Home = () => {
  const isLight = useColorScheme();
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
  const BAR_COUNT = 12;
  const STEP_MS = 350;
  const initial = useMemo(
    () => Array.from({ length: BAR_COUNT }, () => 20 + Math.floor(Math.random() * 75)),
    []
  );

  const [values, setValues] = useState(initial);
  const [pass, setPass] = useState(0);
  const [idx, setIdx] = useState(0);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const animRef = useRef(null);
  const isComponentMounted = useRef(true);

  // Cleanup function to prevent memory leaks
  const cleanup = () => {
    if (animRef.current) {
      clearTimeout(animRef.current);
      animRef.current = null;
    }
  };

  const reshuffle = () => {
    if (!isComponentMounted.current || !isAnimating) return;

    const fresh = Array.from({ length: BAR_COUNT }, () => 20 + Math.floor(Math.random() * 75));
    setValues(fresh);
    setPass(0);
    setIdx(0);
    setComparisons(0);
    setSwaps(0);

    cleanup();
    if (isAnimating) {
      animRef.current = setTimeout(tick, STEP_MS);
    }
  };

  const tick = () => {
    if (!isComponentMounted.current || !isAnimating) return;

    setValues(currentValues => {
      const arr = [...currentValues];
      const n = arr.length;

      setPass(currentPass => {
        setIdx(currentIdx => {
          if (currentPass >= n - 1) {
            cleanup();
            if (isAnimating) {
              animRef.current = setTimeout(reshuffle, 1000);
            }
            return currentIdx;
          }

          if (currentIdx >= n - currentPass - 1) {
            cleanup();
            if (isAnimating) {
              animRef.current = setTimeout(tick, STEP_MS);
            }
            return 0;
          }

          setComparisons(c => c + 1);

          if (arr[currentIdx] > arr[currentIdx + 1]) {
            const tmp = arr[currentIdx];
            arr[currentIdx] = arr[currentIdx + 1];
            arr[currentIdx + 1] = tmp;
            setSwaps(s => s + 1);
            setValues(arr);
          }

          cleanup();
          if (isAnimating) {
            animRef.current = setTimeout(tick, STEP_MS);
          }

          return currentIdx + 1;
        });

        // Use idx state instead of currentIdx parameter
        return currentPass + (idx >= n - currentPass - 1 ? 1 : 0);
      });
      return currentValues;
    });
  };

  // Start animation on mount
  useEffect(() => {
    if (isAnimating) {
      animRef.current = setTimeout(tick, STEP_MS);
    }

    return () => {
      isComponentMounted.current = false;
      cleanup();
    };
  }, [isAnimating]);

  // Pause animation when component is not visible (performance optimization)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsAnimating(false);
        cleanup();
      } else {
        setIsAnimating(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const activeA = idx;
  const activeB = idx + 1;
  const sortedStart = values.length - pass;

  // Control functions for the animation
  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  const resetAnimation = () => {
    cleanup();
    const fresh = Array.from({ length: BAR_COUNT }, () => 20 + Math.floor(Math.random() * 75));
    setValues(fresh);
    setPass(0);
    setIdx(0);
    setComparisons(0);
    setSwaps(0);
    setIsAnimating(true);
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

  /** ===== Quick responsive helpers (no external CSS changes) ===== */
  const gridStyles = `
    .hero-grid { display:grid; grid-template-columns: 1.08fr 1fr; gap:2.25rem; align-items:stretch; }
    .grid-2 { display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap:1.25rem; }
    .updates-grid { display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap:1rem; }
    .paths-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:1rem; }
    @media (max-width: 980px){ .hero-grid{ grid-template-columns:1fr; } }
    @media (max-width: 780px){ .grid-2{ grid-template-columns:1fr; } .updates-grid{ grid-template-columns:1fr; } }
  `;

  return (
    <div className="home-dashboard">
      <style>{gridStyles}</style>

      {/* ===== Hero ===== */}
      <section style={{ ...container, padding: "4.25rem 1.5rem 2rem" }} data-aos="fade-up" data-aos-duration="1000">
        <div style={{ ...inner }}>
          <div className="hero-grid">
            {/* LEFT: Bubble Sort */}
            <div
              style={{
                background: T.demoShellBg,
                borderRadius: 22,
                padding: "1.2rem 1.2rem 1rem",
                border: T.cardBorder,
                boxShadow: T.demoShellShadow,
                display: "grid",
                gridTemplateRows: "auto 1fr auto",
                gap: "0.85rem",
              }}
              data-aos="zoom-in" data-aos-duration="1500"
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: isLight ? "#1f2937" : "#c7d2fe" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 8, height: 8, borderRadius: 999,
                      background: isLight
                        ? "radial-gradient(circle at 40% 40%, #10b981 0%, #059669 60%, #065f46 100%)"
                        : "radial-gradient(circle at 40% 40%, #34d399 0%, #059669 60%, #065f46 100%)",
                      boxShadow: isLight ? "0 0 0 3px rgba(16,185,129,.20)" : "0 0 0 3px rgba(52,211,153,.17)",
                    }}
                  />
                  <strong style={{ letterSpacing: ".2px" }}>Live Demo</strong>
                </div>
                <span style={{ opacity: 0.9, fontSize: ".9rem", color: isLight ? "#334155" : undefined }}>
                  Bubble Sort · {values.length} bars
                </span>
              </div>

              {/* Chart */}
              <div
                style={{
                  position: "relative", height: 240,
                  background: T.surfaceBg,
                  borderRadius: 14, border: T.surfaceBorder,
                  padding: "12px 10px 18px",
                  display: "flex", alignItems: "flex-end", gap: 10, overflow: "hidden",
                }}
              >
                {/* horizontal grid */}
                <div aria-hidden style={{
                  position: "absolute", inset: 0,
                  background: isLight
                    ? "repeating-linear-gradient(to top, rgba(15,23,42,.06), rgba(15,23,42,.06) 1px, transparent 1px, transparent 32px)"
                    : "repeating-linear-gradient(to top, rgba(255,255,255,.04), rgba(255,255,255,.04) 1px, transparent 1px, transparent 32px)",
                  pointerEvents: "none",
                }} />
                {/* baseline */}
                <div aria-hidden style={{
                  position: "absolute", left: 10, right: 10, bottom: 16, height: 2,
                  background: T.baseline, borderRadius: 2,
                }} />
                {values.map((h, i) => {
                  const isActive = i === activeA || i === activeB;
                  const isSorted = i >= sortedStart;
                  const baseGradient = isLight
                    ? "linear-gradient(180deg,#60a5fa 0%,#93c5fd 35%,#a78bfa 70%,#f9a8d4 100%)"
                    : "linear-gradient(180deg,#9aa4ff 0%,#7c83ff 35%,#8b5cf6 70%,#f472b6 100%)";
                  const activeGradient = isLight
                    ? "linear-gradient(180deg,#2563eb 0%,#3b82f6 40%,#6366f1 80%)"
                    : "linear-gradient(180deg,#60a5fa 0%,#3b82f6 40%,#6366f1 80%)";
                  const sortedGradient = isLight
                    ? "linear-gradient(180deg,#10b981 0%,#22c55e 60%,#16a34a 100%)"
                    : "linear-gradient(180deg,#34d399 0%,#10b981 60%,#059669 100%)";

                  return (
                    <div
                      key={i}
                      style={{
                        width: `calc((100% - ${10 * (values.length - 1)}px) / ${values.length})`,
                        height: `${h}%`,
                        minWidth: 16,
                        borderRadius: 10,
                        background: isSorted ? sortedGradient : isActive ? activeGradient : baseGradient,
                        boxShadow: isLight
                          ? "0 8px 16px rgba(30,64,175,.20), 0 1px 0 rgba(255,255,255,.65) inset"
                          : "0 10px 22px rgba(124,131,255,.38), 0 1px 0 rgba(255,255,255,.12) inset",
                        transition: "height .5s cubic-bezier(.2,.8,.2,1), transform .22s ease, background .2s ease",
                        transform: isActive ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
                      }}
                      title={`Value: ${h}`}
                    />
                  );
                })}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: T.textSecondary, fontSize: ".92rem", paddingTop: 2 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span>Pass {Math.min(pass + 1, values.length - 1)}</span>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={toggleAnimation}
                      style={{
                        background: "none",
                        border: `1px solid ${isLight ? "rgba(59, 130, 246, 0.3)" : "rgba(147, 197, 253, 0.3)"}`,
                        borderRadius: "6px",
                        padding: "4px 8px",
                        cursor: "pointer",
                        color: isLight ? "#2563eb" : "#93c5fd",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "0.8rem",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = isLight ? "rgba(59, 130, 246, 0.1)" : "rgba(147, 197, 253, 0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "none";
                      }}
                      title={isAnimating ? "Pause animation" : "Resume animation"}
                    >
                      {isAnimating ? <Pause size={12} /> : <Play size={12} />}
                      {isAnimating ? "Pause" : "Play"}
                    </button>
                    <button
                      onClick={resetAnimation}
                      style={{
                        background: "none",
                        border: `1px solid ${isLight ? "rgba(107, 114, 128, 0.3)" : "rgba(156, 163, 175, 0.3)"}`,
                        borderRadius: "6px",
                        padding: "4px 8px",
                        cursor: "pointer",
                        color: isLight ? "#6b7280" : "#9ca3af",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "0.8rem",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = isLight ? "rgba(107, 114, 128, 0.1)" : "rgba(156, 163, 175, 0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "none";
                      }}
                      title="Reset with new data"
                    >
                      <RotateCcw size={12} />
                      Reset
                    </button>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <span style={{ color: isLight ? "#16a34a" : "#34d399" }}>Comparisons: {comparisons}</span>
                  <span style={{ color: isLight ? "#dc2626" : "#f87171" }}>Swaps: {swaps}</span>
                </div>
              </div>
            </div>

            {/* RIGHT: copy */}
            <div style={{ padding: ".4rem 0", display: "grid", gridTemplateRows: "auto auto 1fr auto", alignItems: "start" }} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
              <div
                className="hero-badge"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 10px",
                  borderRadius: 999, border: T.badgeBorder, color: T.textSecondary,
                  background: T.badgeBg, width: "fit-content",
                }}
              >
                <Sparkles size={14} />
                <span>Interactive Algorithm Lab</span>
              </div>

              <h1
                className="hero-title"
                style={{
                  marginTop: "1rem", lineHeight: 1.05, fontSize: "clamp(28px, 5vw, 44px)",
                  fontWeight: 900, letterSpacing: "-.3px",
                  color: "transparent",


                  background: T.hero,

                  WebkitBackgroundClip: "text", backgroundClip: "text",
                }}
              >
                Master Algorithms Through Visual Learning  <span style={{ opacity: 1 }}>- simplified</span>
              </h1>

              <p className="hero-subtitle" style={{ marginTop: ".9rem", color: T.textSecondary, maxWidth: 560, fontSize: "1rem" }}>
                Learn by seeing. Trace every step, compare complexity, and build intuition fast.
              </p>

              <div className="hero-features" style={{ marginTop: "1rem", display: "flex", gap: ".6rem", flexWrap: "wrap" }}>
                <div className="feature-highlight" style={{ background: T.badgeBg, border: T.badgeBorder }}><Clock size={16} /><span>Real-time views</span></div>
                <div className="feature-highlight" style={{ background: T.badgeBg, border: T.badgeBorder }}><BookOpen size={16} /><span>Step guides</span></div>
                <div className="feature-highlight" style={{ background: T.badgeBg, border: T.badgeBorder }}><Target size={16} /><span>Hands-on practice</span></div>
              </div>

           <div style={{ marginTop: "1.4rem", display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
  <Link to="/login" className="btn-primary-new"><Play size={16} />Start Learning</Link>
  <Link to="/quiz" className="btn-secondary-new"><Trophy size={16} />Take a Quiz</Link>
  <button onClick={() => setShowProblemModal(true)} className="btn-secondary-new" style={{ background: T.badgeBg, border: T.badgeBorder, color: T.textSecondary }}>
    <Sparkles size={16} />Problem of the Day
  </button>
</div>

            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards with detailed content */}
      {/* ADD THIS NEW SECTION */}
      <div className="algo-learning-updates-container" data-aos="fade-up" data-aos-duration="1000">
        <section className="algorithm-buttons" data-aos="fade-up" data-aos-delay="200">
          <h2 className='buttons-heading'>Resources</h2>

      {features.map((feature, index) => (
  <Link
    key={index}
    to={feature.path}
    className={`clean-button-link feature-${index + 1}`}
    data-aos="fade-up"
    data-aos-delay={`${300 + index * 100}`}
    style={{
      background: isLight
        ? "linear-gradient(135deg, #f9fafb 60%, #dbeafe 100%)"
        : "linear-gradient(135deg, #23283e 60%, #171725 100%)",
      border: isLight
        ? "1px solid rgba(15,23,42,.08)"
        : "1px solid rgba(180, 184, 255, 0.14)",
      borderRadius: 20,
      boxShadow: isLight
        ? "0 5px 20px -8px rgba(30, 64, 175, 0.10)"
        : "0 5px 20px -8px rgba(124, 131, 255, 0.16)",
      color: isLight ? "#1e293b" : "#e0e7ff",
      transition: "all 0.22s",
      marginBottom: "1.2rem",
      position: "relative",
    }}
  >
    <div className='button-icon' style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <feature.icon
        size={35}
        color={isLight ? "#1e293b" : "#ffaaff"}
        style={
          !isLight
            ? { filter: "drop-shadow(0 0 8px #a78bfa88)" }
            : {}
        }
      />
    </div>
    <span
      className="feature-title"
      style={{
        fontWeight: 600,
        fontSize: "1.10rem",
        color: isLight ? "#1e293b" : "#e0e7ff",
        textShadow: !isLight ? "0 2px 12px #4f46e533, 0 1px 0 #000" : "none",
        marginTop: ".6rem",
        letterSpacing: ".1px",
      }}
    >
      {feature.title}
    </span>
  </Link>
))}

        </section>

        <div className='vertical-steps-container' data-aos="fade-up" data-aos-delay="200">
          <h2 className='steps-heading !w-[95%] !mx-auto !md:w-[90%]'>Learning paths</h2>
          {learningPaths.map((path, index) => (
            <div key={index} className={`step-button step-${index + 1}`} data-aos="fade-up" data-aos-delay={`${300 + index * 150}`}>
              <div className='step-content-wrapper'>
                <div className='step-text'>
                  <span className='step-title'>{path.title}</span>
                  <p className='step-description'>{path.desc}</p>
                  <div>
                    <div className='step-duration-tag'>{path.duration}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
        {/* Enhanced Activity Feed */}
        <div
          style={{
            backgroundColor: isLight ? "#ffffff" : "#0f172a",
            padding: "1.5rem",
            borderRadius: "20px",
            boxShadow: isLight
              ? "0 10px 30px -10px rgba(0,0,0,0.1)"
              : "0 10px 30px -10px rgba(0,0,0,0.5)",
            transition: "all 0.3s ease",
          }}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h3
            style={{
              color: isLight ? "#1f2937" : "#f9fafb",
              fontWeight: 600,
              fontSize: "1.25rem",
              marginBottom: "1.5rem",
            }}
          >
            Recent Updates
          </h3>

          <div className="!mx-auto w-[99%] flex flex-col gap-2">
            {recentUpdates.map((update, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                  backgroundColor: isLight ? "#f3f4f6" : "#1e293b",
                  border: `1px solid ${isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"}`,
                  padding: "1rem",
                  borderRadius: "16px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  boxShadow: isLight
                    ? "0 5px 15px -5px rgba(0,0,0,0.05)"
                    : "0 5px 15px -5px rgba(0,0,0,0.3)",
                }}
                data-aos="fade-up"
                data-aos-delay={`${300 + index * 100}`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow = isLight
                    ? "0 8px 25px -5px rgba(0,0,0,0.1)"
                    : "0 8px 25px -5px rgba(0,0,0,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = isLight
                    ? "0 5px 15px -5px rgba(0,0,0,0.05)"
                    : "0 5px 15px -5px rgba(0,0,0,0.3)";
                }}
              >
                {/* Icon with glow */}
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color:
                      update.type === "new"
                        ? isLight
                          ? "#10b981"
                          : "#6ee7b7"
                        : update.type === "update"
                          ? isLight
                            ? "#3b82f6"
                            : "#60a5fa"
                          : update.type === "feature"
                            ? isLight
                              ? "#f59e0b"
                              : "#facc15"
                            : isLight
                              ? "#8b5cf6"
                              : "#c4b5fd",
                    backgroundColor:
                      update.type === "new"
                        ? isLight
                          ? "#d1fae5"
                          : "rgba(16,185,129,0.2)"
                        : update.type === "update"
                          ? isLight
                            ? "#dbeafe"
                            : "rgba(59,130,246,0.2)"
                          : update.type === "feature"
                            ? isLight
                              ? "#fef3c7"
                              : "rgba(245,158,11,0.2)"
                            : isLight
                              ? "#ede9fe"
                              : "rgba(139,92,246,0.2)",
                    boxShadow: `${update.type === "new"
                        ? "0 0 10px rgba(16,185,129,0.6)"
                        : update.type === "update"
                          ? "0 0 10px rgba(59,130,246,0.6)"
                          : update.type === "feature"
                            ? "0 0 10px rgba(245,158,11,0.6)"
                            : "0 0 10px rgba(139,92,246,0.6)"
                      }`,
                    transition: "all 0.3s ease",
                  }}
                >
                  {update.type === "new" && <Sparkles size={16} />}
                  {update.type === "update" && <Code size={16} />}
                  {update.type === "feature" && <Star size={16} />}
                  {update.type === "community" && <Users size={16} />}
                </div>

                {/* Content */}
                <div style={{ flex: 1 }} className="!mx-auto">
                  <h4
                    style={{
                      color: isLight ? "#1f2937" : "#f9fafb",
                      fontWeight: 500,
                      margin: 0,
                    }}
                  >
                    {update.title}
                  </h4>
                  <p
                    style={{
                      color: isLight ? "#4b5563" : "#d1d5db",
                      marginTop: "0.25rem",
                      fontSize: "0.875rem",
                    }}
                  >
                    {update.description}
                  </p>
                  <span
                    style={{
                      color: isLight ? "#6b7280" : "#9ca3af",
                      fontSize: "0.75rem",
                      marginTop: "0.25rem",
                      display: "block",
                    }}
                  >
                    {update.time}
                  </span>
                </div>
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
