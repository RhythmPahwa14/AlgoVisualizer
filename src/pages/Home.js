import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ExportDemo from "../components/ExportDemo";
import Contributors from "../components/Contributors";
import "../styles/home.css";
import visual from "../assets/statistics.gif";
import FaqChatbot from "../components/FaqChatbot";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const [currentAlgorithm, setCurrentAlgorithm] = useState(0);

  const algorithms = [
    "Bubble Sort",
    "Quick Sort",
    "Merge Sort",
    "Binary Search",
    "Linear Search",
    "Linked Lists",
    "Hash Tables",
    "Graph Traversal",
  ];

  useEffect(() => {
    const text = "Visualize. Learn. Master.";
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setTypedText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAlgorithm((prev) => (prev + 1) % algorithms.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [algorithms.length]);

  return (
    <div className="home-container">
      {/* Top Badge */}
      <div className="hero-badge">
        <span style={{ color: "white" }}>🚀 Interactive Learning Platform</span>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Algo<span className="highlight">Visualizer</span>
          </h1>
          <p className="hero-subtitle">
            {typedText}
            <span className="cursor">|</span>
          </p>
          <p className="hero-description">
            Transform abstract algorithms into beautiful, interactive
            visualizations. Perfect for students, developers, and anyone curious
            about how algorithms work.
          </p>

          <div className="hero-actions">
            <Link to="/sorting" className="cta-primary">
              {/* added animated icons for both links */}
              <span
                style={{
                  display: "inline-block",
                  width: "45px",
                  height: "45px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  viewBox="0 0 64 64"
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <defs>
                    <linearGradient
                      id="gradRed"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#ff4b5c">
                        <animate
                          attributeName="stop-color"
                          values="#ff4b5c; #ff1e1e; #ff4b5c"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                      </stop>
                      <stop offset="100%" stopColor="#ff1e1e">
                        <animate
                          attributeName="stop-color"
                          values="#ff1e1e; #ff4b5c; #ff1e1e"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                      </stop>
                    </linearGradient>
                  </defs>

                  <circle
                    cx="32"
                    cy="32"
                    r="30"
                    stroke="url(#gradRed)"
                    fill="none"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="20"
                    stroke="url(#gradRed)"
                    fill="none"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="10"
                    stroke="url(#gradRed)"
                    fill="none"
                  />

                  <line x1="32" y1="32" x2="50" y2="14" stroke="black">
                    <animate
                      attributeName="x2"
                      values="50;55;50"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="y2"
                      values="14;10;14"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </line>
                  <polyline
                    points="50,14 46,20 52,20"
                    stroke="black"
                    fill="none"
                  />
                </svg>
              </span>
              <p> Start Learning</p>
            </Link>
            <Link to="/data-structures" className="cta-secondary">
              <span
                style={{
                  display: "inline-block",
                  width: "45px",
                  height: "45px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  viewBox="0 0 64 64"
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <defs>
                    {/* 🔴 Red Gradient for Circle */}
                    <linearGradient
                      id="gradExploreRed"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#ff4d4d">
                        <animate
                          attributeName="stop-color"
                          values="#ff4d4d; #ff0000; #ff4d4d"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                      </stop>
                      <stop offset="100%" stopColor="#ff0000">
                        <animate
                          attributeName="stop-color"
                          values="#ff0000; #ff4d4d; #ff0000"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                      </stop>
                    </linearGradient>
                  </defs>

                  {/* Outer compass circle in red gradient */}
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="url(#gradExploreRed)"
                    fill="none"
                  />

                  {/* Compass pointer in black */}
                  <polygon points="32,12 28,32 32,28 36,32" fill="black">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 32 32"
                      to="360 32 32"
                      dur="6s"
                      repeatCount="indefinite"
                    />
                  </polygon>

                  {/* Inner pulse circle in red */}
                  <circle cx="32" cy="32" r="6" fill="url(#gradExploreRed)">
                    <animate
                      attributeName="r"
                      values="6;8;6"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>
              </span>
              <p> Explore More</p>
            </Link>
          </div>

          <div className="algorithm-showcase">
            <span className="showcase-label">Currently visualizing:</span>
            <span className="showcase-algorithm">
              {algorithms[currentAlgorithm]}
            </span>
          </div>
        </div>

        <div className="hero-visual">
          {/* visual for website */}
          <img src={visual} alt="Example" width="300px" height="300px" />
        </div>
      </section>

      {/* Quick Start Cards */}
      <section className="quick-start-section">
        <h2
          className="section-title"
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            fontWeight: "bold",
          }}
        >
          Choose Your Learning Path
        </h2>
        <div className="quick-start-grid">
          <Link to="/sorting" className="quick-card sorting">
            <div className="card-left">
              <div className="card-header">
                <div className="card-icon">🔄</div>
                <div className="card-stats">
                  <span className="stat-number">5</span>
                  <span className="stat-label">Algorithms</span>
                </div>
              </div>
              <h3 className="card-title">Sorting Algorithms</h3>
              <p className="card-description">
                Watch how Bubble Sort, Quick Sort, Merge Sort, Selection Sort,
                and Insertion Sort organize data step by step.
              </p>
            </div>
            <div className="card-right">
              <div className="card-features">
                <span className="feature-tag">Interactive</span>
                <span className="feature-tag">Real-time</span>
                <span className="feature-tag">Statistics</span>
              </div>
              <div className="card-action">
                Start Sorting <span>→</span>
              </div>
            </div>
          </Link>

          <Link to="/searching" className="quick-card searching">
            <div className="card-left">
              <div className="card-header">
                <div className="card-icon">🔍</div>
                <div className="card-stats">
                  <span className="stat-number">4</span>
                  <span className="stat-label">Algorithms</span>
                </div>
              </div>
              <h3 className="card-title">Search Algorithms</h3>
              <p className="card-description">
                Discover how Binary Search, Linear Search, Jump Search, and
                Exponential Search find elements efficiently.
              </p>
            </div>
            <div className="card-right">
              <div className="card-features">
                <span className="feature-tag">Fast</span>
                <span className="feature-tag">Efficient</span>
                <span className="feature-tag">Comparative</span>
              </div>
              <div className="card-action">
                Start Searching <span>→</span>
              </div>
            </div>
          </Link>

          <Link to="/data-structures" className="quick-card structures">
            <div className="card-left">
              <div className="card-header">
                <div className="card-icon">🏗️</div>
                <div className="card-stats">
                  <span className="stat-number">4</span>
                  <span className="stat-label">Structures</span>
                </div>
              </div>
              <h3 className="card-title">Data Structures</h3>
              <p className="card-description">
                Explore Linked Lists, Stacks, Queues, and Binary Trees with
                interactive visualizations and operations.
              </p>
            </div>
            <div className="card-right">
              <div className="card-features">
                <span className="feature-tag">Dynamic</span>
                <span className="feature-tag">Visual</span>
                <span className="feature-tag">Hands-on</span>
              </div>
              <div className="card-action">
                Explore Structures <span>→</span>
              </div>
            </div>
          </Link>

          <Link to="/documentation" className="quick-card documentation">
            <div className="card-left">
              <div className="card-header">
                <div className="card-icon">📚</div>
                <div className="card-stats">
                  <span className="stat-number">13</span>
                  <span className="stat-label">References</span>
                </div>
              </div>
              <h3 className="card-title">Algorithm Reference</h3>
              <p className="card-description">
                Complete documentation with complexity analysis, use cases, and
                implementation details for all algorithms.
              </p>
            </div>
            <div className="card-right">
              <div className="card-features">
                <span className="feature-tag">Comprehensive</span>
                <span className="feature-tag">Detailed</span>
                <span className="feature-tag">Searchable</span>
              </div>
              <div className="card-action">
                Browse Docs <span>→</span>
              </div>
            </div>
          </Link>

          <Link to="/quiz" className="quick-card quiz">
            <div className="card-left">
              <div className="card-header">
                <div className="card-icon">🧠</div>
                <div className="card-stats">
                  <span className="stat-number">15</span>
                  <span className="stat-label">Questions</span>
                </div>
              </div>
              <h3 className="card-title">Algorithm Quiz</h3>
              <p className="card-description">
                Test your knowledge with interactive quizzes covering sorting, searching, and data structures with detailed explanations.
              </p>
            </div>
            <div className="card-right">
              <div className="card-features">
                <span className="feature-tag">Interactive</span>
                <span className="feature-tag">Timed Mode</span>
                <span className="feature-tag">Feedback</span>
              </div>
              <div className="card-action">
                Take Quiz <span>→</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="features-showcase">
        <div className="features-header">
          <h2
            className="section-title"
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              fontWeight: "bold",
            }}
          >
            Why Choose AlgoVisualizer?
          </h2>
          <p
            className="section-subtitle"
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Everything you need to master algorithms and data structures
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">
              <lord-icon
                className="icon-bg"
                src="https://cdn.lordicon.com/zpxybbhl.json"
                trigger="loop"
                style={{ width: "60px", height: "60px" }}
              ></lord-icon>
            </div>
            <h3>⚡ Real-time Visualization</h3>
            <p>
              Watch algorithms execute step-by-step with smooth animations and
              instant feedback.
            </p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <lord-icon
                className="icon-bg"
                src="https://cdn.lordicon.com/kkvxgpti.json"
                trigger="loop"
                style={{ width: "60px", height: "60px" }}
              ></lord-icon>
            </div>
            <h3>🎯 Interactive Controls</h3>
            <p>
              Pause, resume, adjust speed, and customize input data to explore
              different scenarios.
            </p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <lord-icon
                className="icon-bg"
                src="https://cdn.lordicon.com/oezixobx.json"
                trigger="loop"
                style={{ width: "60px", height: "60px" }}
              ></lord-icon>
            </div>
            <h3>📊 Performance Metrics</h3>
            <p>
              Track comparisons, swaps, and execution time to understand
              algorithm efficiency.
            </p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <lord-icon
                className="icon-bg"
                src="https://cdn.lordicon.com/bhfjfgqz.json"
                trigger="loop"
                style={{ width: "60px", height: "60px" }}
              ></lord-icon>
            </div>
            <h3>🧠 Deep Learning</h3>
            <p>
              Comprehensive complexity analysis and detailed explanations for
              every algorithm.
            </p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <lord-icon
                className="icon-bg"
                src="https://cdn.lordicon.com/slkvcfos.json"
                trigger="loop"
                style={{ width: "70px", height: "70px" }}
              ></lord-icon>
            </div>
            <h3>📱 Mobile Friendly</h3>
            <p>
              Responsive design that works perfectly on desktop, tablet, and
              mobile devices.
            </p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <lord-icon
                className="icon-bg"
                src="https://cdn.lordicon.com/etqbfrgp.json"
                trigger="loop"
                style={{ width: "60px", height: "60px" }}
              ></lord-icon>
            </div>
            <h3>🎉 Completely Free</h3>
            <p>
              Open source platform with no subscriptions, ads, or hidden costs.
              Learn without limits.
            </p>
          </div>
        </div>
      </section>

      {/* Export Features Section */}
      <section className="export-features-section">
        <ExportDemo />
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="stats-header">
          <h2>At a Glance</h2>
        </div>
        <div className="stats-container">
          <div className="stat-card">
            <lord-icon
              src="https://cdn.lordicon.com/dfxesbyu.json"
              trigger="loop"
              colors="primary:#121331,secondary:#08a88a"
              style={{ width: "70px", height: "70px" }}
            ></lord-icon>
            <div className="stat-number">15+</div>
            <div className="stat-label">Algorithms</div>
            <div className="stat-description">
              Sorting, searching, and data structure algorithms
            </div>
          </div>
          <div className="stat-card">
            <lord-icon
              src="https://cdn.lordicon.com/ayhtotha.json"
              delay = "2000"
              trigger="hover"
              colors="primary:#121331,secondary:#08a88a"
              style={{ width: "70px", height: "70px" }}
            ></lord-icon>
            <div className="stat-number">100%</div>
            <div className="stat-label">Interactive</div>
            <div className="stat-description">
              Every algorithm includes hands-on visualization
            </div>
          </div>
          <div className="stat-card">
            <lord-icon
              src="https://cdn.lordicon.com/hwuyodym.json"
              trigger="loop"
              colors="primary:#121331,secondary:#08a88a"
              style={{width:"70px" ,height:"70px"}}
            ></lord-icon>
            <div className="stat-number">∞</div>
            <div className="stat-label">Learning</div>
            <div className="stat-description">
              Unlimited practice with customizable inputs
            </div>
          </div>
        </div>
      </section>
      {/* Contributors Section */}
      <Contributors />

      {/* Call to Action */}
      <section className="final-cta">
        <div className="cta-content">
          <h2>Ready to Master Algorithms?</h2>
          <p>
            Join thousands of learners who've transformed their understanding of
            computer science through interactive visualization. Start your
            journey today!
          </p>
          <div className="cta-buttons">
            <Link to="/sorting" className="btn-primary">
              <span style={{marginRight: '8px'}}>🚀</span> Begin Learning
            </Link>
            <a
              href="https://github.com/RhythmPahwa14/AlgoVisualizer"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <span style={{marginRight: '8px'}}>⭐</span> Star on GitHub
            </a>
          </div>
        </div>
      </section>
      <FaqChatbot />
    </div>
  );
}
