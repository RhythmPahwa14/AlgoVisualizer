import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Play,
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
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // Also react to manual toggles via data-theme on <html>
  useEffect(() => {
    const obs = new MutationObserver(() => {
      const htmlTheme = document.documentElement.getAttribute("data-theme");
      if (htmlTheme) setIsLight(htmlTheme === "light");
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
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

  /** ===== Bubble Sort — continuous ===== */
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

  const animRef = useRef(null);
  const valuesRef = useRef(values);
  const passRef = useRef(pass);
  const idxRef = useRef(idx);

  useEffect(() => { valuesRef.current = values; }, [values]);
  useEffect(() => { passRef.current = pass; }, [pass]);
  useEffect(() => { idxRef.current = idx; }, [idx]);

  const reshuffle = () => {
    const fresh = Array.from({ length: BAR_COUNT }, () => 20 + Math.floor(Math.random() * 75));
    setValues(fresh);
    setPass(0);
    setIdx(0);
    setComparisons(0);
    setSwaps(0);
    if (animRef.current) clearTimeout(animRef.current);
    animRef.current = window.setTimeout(tick, STEP_MS);
  };

  const tick = () => {
    let i = passRef.current;
    let j = idxRef.current;
    const arr = [...valuesRef.current];
    const n = arr.length;

    if (i >= n - 1) {
      animRef.current = window.setTimeout(reshuffle, 400);
      return;
    }
    if (j >= n - i - 1) {
      setPass(i + 1);
      setIdx(0);
      animRef.current = window.setTimeout(tick, STEP_MS);
      return;
    }
    setComparisons((c) => c + 1);
    if (arr[j] > arr[j + 1]) {
      const tmp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = tmp;
      setSwaps((s) => s + 1);
      setValues(arr);
    }
    setIdx(j + 1);
    animRef.current = window.setTimeout(tick, STEP_MS);
  };

  useEffect(() => {
    animRef.current = window.setTimeout(tick, STEP_MS);
    return () => animRef.current && clearTimeout(animRef.current);
  }, []);

  const activeA = idx;
  const activeB = idx + 1;
  const sortedStart = values.length - pass;

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
                <span>Pass {Math.min(pass + 1, values.length - 1)}</span>
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
                <Link to="/sorting" className="btn-primary-new"><Play size={16} />Start Learning</Link>
                <Link to="/quiz" className="btn-secondary-new"><Trophy size={16} />Take a Quiz</Link>
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

        {features.map((feature,index)=>(
          <Link 
  key={index} 
  to={feature.path} 
  className={`clean-button-link feature-${index+1}`}
  data-aos="fade-up" data-aos-delay={`${300 + index * 100}`}
>
  <div className='button-icon'>
    <feature.icon size={35}/>
  </div>
  <span className="feature-title">{feature.title}</span>
</Link>
        ))}
       </section>
       
 <div className='vertical-steps-container' data-aos="fade-up" data-aos-delay="200">
  <h2 className='steps-heading'>Learning paths</h2>
     {learningPaths.map((path,index)=>(
      <div key={index} className={`step-button step-${index+1}`} data-aos="fade-up" data-aos-delay={`${300 + index * 150}`}>
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
        <div className="activity-feed" data-aos="fade-up" data-aos-delay="200">
          <h3 className="activity-title">Recent Updates</h3>
          <div className="activity-items">
            {recentUpdates.map((update, index) => (
              <div key={index} className="activity-item" data-aos="fade-up" data-aos-delay={`${300 + index * 100}`}>
                <div className={`activity-icon ${update.type}`}>
                  {update.type === 'new' && <Sparkles size={14} />}
                  {update.type === 'update' && <Code size={14} />}
                  {update.type === 'feature' && <Star size={14} />}
                  {update.type === 'community' && <Users size={14} />}
                </div>
                <div className="activity-content">
                  <h4 className="activity-item-title">{update.title}</h4>
                  <p className="activity-description">{update.description}</p>
                  <span className="activity-time">{update.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
  );
};

export default Home;
