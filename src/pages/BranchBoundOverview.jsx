// src/pages/BranchBoundOverview.jsx
import React, { useEffect, useState } from "react";
import "../styles/global-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";
// Import your visualizer component (create separately like BacktrackingPage)
import BranchBoundPage from "./BranchBoundPage";

// 🎯 Debug logging helper
const logDebug = (message, data = null) => {
  console.log(`🌿 BranchBoundDebug: ${message}`, data ? data : '');
};

// 🎯 Performance monitoring helper
const trackPerformance = (operation, startTime) => {
  const duration = performance.now() - startTime;
  logDebug(`⏱️ ${operation} Performance`, { duration: `${duration.toFixed(2)}ms` });
  return duration;
};

const BranchBoundOverview = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    pageLoadTime: null,
    animationsLoaded: false,
    interactions: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // 🎯 Component lifecycle and AOS initialization
  useEffect(() => {
    const loadStartTime = performance.now();
    logDebug('🚀 BranchBoundOverview component mounted');

    // Initialize AOS with performance tracking
    try {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
      });
      
      logDebug('🎭 AOS animations initialized');
      setPerformanceMetrics(prev => ({
        ...prev,
        animationsLoaded: true
      }));
    } catch (error) {
      console.error('❌ AOS initialization failed:', error);
      logDebug('🛑 AOS initialization error', { error: error.message });
    }

    // Simulate loading completion
    const loadTimer = setTimeout(() => {
      const loadDuration = performance.now() - loadStartTime;
      setIsLoading(false);
      setPerformanceMetrics(prev => ({
        ...prev,
        pageLoadTime: loadDuration
      }));
      
      logDebug('✅ Page fully loaded', {
        loadTime: `${loadDuration.toFixed(2)}ms`,
        animationsReady: true
      });
    }, 500);

    return () => {
      clearTimeout(loadTimer);
      logDebug('🧹 BranchBoundOverview unmounting', {
        totalInteractions: performanceMetrics.interactions,
        loadTime: performanceMetrics.pageLoadTime
      });
    };
  }, []);

  // 🎯 Track user interactions
  const trackInteraction = (interactionType) => {
    setPerformanceMetrics(prev => ({
      ...prev,
      interactions: prev.interactions + 1
    }));
    logDebug('👆 User interaction', { 
      type: interactionType,
      totalInteractions: performanceMetrics.interactions + 1
    });
  };

  // 🎯 Keyboard navigation support
  const handleKeyDown = (event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      trackInteraction(`keyboard_${action}`);
    }
  };

  return (
    <div
      className="theme-container"
      data-aos="fade-up"
      data-aos-duration="1000"
      role="main"
      aria-label="Branch and Bound Algorithm Guide"
    >
      {/* 🎯 Loading State */}
      {isLoading && (
        <div 
          className="theme-card loading-card"
          role="status"
          aria-label="Loading Branch and Bound guide"
          data-aos="fade-in"
        >
          <div className="loading-spinner" aria-hidden="true"></div>
          <p>Loading Branch and Bound guide...</p>
        </div>
      )}

      <h1 
        className="theme-title" 
        style={{ marginTop: "4rem" }}
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Guide to <span className="highlight">Branch and Bound</span>
      </h1>

      <p
        style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "-2rem auto 2rem auto",
          color: "var(--theme-text-secondary)",
        }}
        data-aos="fade-up"
        data-aos-delay="150"
        role="doc-abstract"
      >
        Branch and Bound is an algorithmic technique used for solving
        optimization problems. It systematically explores all possible
        solutions, "branching" into subsets of the solution space, and
        "bounding" by eliminating branches that cannot yield better results.
      </p>

      <p
        style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "-2rem auto 2rem auto",
          color: "var(--text-color)",
        }}
        data-aos="fade-up"
        data-aos-delay="200"
        role="doc-subtitle"
      >
        <span
          style={{
            fontWeight: "600",
            fontSize: "1.5rem",
            color: "var(--accent-primary)",
          }}
          aria-label="Goal"
        >
          Goal
        </span>{" "}
        : Solve complex optimization problems efficiently by pruning
        unpromising solution branches early.
      </p>

      {/* 🎯 Performance Metrics (Debug View) */}
      {!isLoading && process.env.NODE_ENV === 'development' && (
        <div 
          className="performance-debug"
          role="complementary"
          aria-label="Performance Statistics"
          data-aos="fade-up"
          data-aos-delay="250"
          style={{
            background: 'var(--accent-info-bg)',
            padding: '0.75rem',
            borderRadius: '8px',
            margin: '1rem auto',
            maxWidth: '600px',
            fontSize: '0.8rem',
            textAlign: 'center',
            color: 'var(--text-secondary)'
          }}
        >
          <strong>📊 Debug Stats:</strong> Loaded in {performanceMetrics.pageLoadTime?.toFixed(2)}ms •{' '}
          {performanceMetrics.interactions} interactions •{' '}
          Animations: {performanceMetrics.animationsLoaded ? '✅' : '⏳'}
        </div>
      )}

      <div
        className="theme-card"
        style={{ width: "1300px" }}
        data-aos="fade-up"
        data-aos-delay="300"
        role="region"
        aria-labelledby="what-is-branch-bound"
      >
        <div className="theme-card-header">
          <h3 id="what-is-branch-bound">What is Branch and Bound?</h3>
        </div>
        <p style={{ color: "var(--theme-text-secondary)", lineHeight: 1.6 }}>
          Branch and Bound is widely used in solving combinatorial optimization
          problems such as the Traveling Salesman Problem (TSP), 0/1 Knapsack,
          and Job Scheduling. The algorithm builds a search tree, where each
          node represents a partial solution. It calculates bounds to determine
          if a branch should be explored further or pruned.
        </p>
        
        {/* 🎯 Interactive element for tracking */}
        <button
          className="btn btn-secondary"
          style={{ marginTop: '1rem' }}
          onClick={() => trackInteraction('learn_more_click')}
          onKeyDown={(e) => handleKeyDown(e, 'learn_more')}
          aria-label="Learn more about Branch and Bound applications"
        >
          Learn More About Applications
        </button>
      </div>

      <div
        className="theme-card"
        style={{ width: "1300px" }}
        data-aos="fade-up"
        data-aos-delay="400"
        role="region"
        aria-labelledby="key-takeaways"
      >
        <div className="theme-card-header">
          <h3 id="key-takeaways">
            <span role="img" aria-label="Seedling">🌱</span> Key Takeaways
          </h3>
        </div>
        <ul 
          className="search-points"
          role="list"
          aria-label="Key takeaways about Branch and Bound"
        >
          <li role="listitem">Used for optimization problems with large search spaces</li>
          <li role="listitem">Prunes branches using upper/lower bounds to save computation</li>
          <li role="listitem">
            Commonly applied in TSP, Knapsack, Job Assignment, Scheduling
          </li>
          <li role="listitem">
            Implemented with priority queues for exploring the most promising
            nodes first
          </li>
        </ul>
        
        {/* 🎯 Additional interactive element */}
        <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <strong>💡 Pro Tip:</strong> The efficiency heavily depends on the quality of the bounding function.
        </div>
      </div>

      <div
        className="theme-card"
        style={{ width: "1300px" }}
        data-aos="fade-up"
        data-aos-delay="500"
        role="region"
        aria-labelledby="complexity-analysis"
      >
        <div className="theme-card-header">
          <h3 id="complexity-analysis">
            <span role="img" aria-label="Lightning">⚡</span> Complexity Analysis
          </h3>
        </div>
        <div 
          className="table-container"
          role="region"
          aria-label="Complexity analysis table"
        >
          <table className="table" aria-describedby="complexity-table-description">
            <caption id="complexity-table-description" className="visually-hidden">
              Time and space complexity analysis for various Branch and Bound problems
            </caption>
            <thead>
              <tr>
                <th scope="col">Problem</th>
                <th scope="col">Time Complexity</th>
                <th scope="col">Space Complexity</th>
                <th scope="col">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">0/1 Knapsack</th>
                <td>O(2^N) worst-case</td>
                <td>O(N)</td>
                <td>Bounding prunes many states</td>
              </tr>
              <tr>
                <th scope="row">Travelling Salesman Problem</th>
                <td>O(N!) worst-case</td>
                <td>O(N²)</td>
                <td>
                  Bounding with cost matrix reduces practical runtime
                </td>
              </tr>
              <tr>
                <th scope="row">Job Assignment</th>
                <td>O(N!) worst-case</td>
                <td>O(N²)</td>
                <td>Branching on tasks, bounding by cost</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* 🎯 Table interaction tracking */}
        <div 
          style={{ 
            marginTop: '1rem', 
            padding: '0.5rem',
            background: 'var(--surface-bg)',
            borderRadius: '4px',
            fontSize: '0.8rem',
            textAlign: 'center'
          }}
        >
          <strong>📈 Complexity Insight:</strong> Branch and Bound reduces practical runtime significantly through intelligent pruning.
        </div>
      </div>

      {/* Interactive Branch and Bound Visualizer */}
      <div 
        data-aos="fade-up"
        data-aos-delay="600"
        role="region"
        aria-label="Interactive Branch and Bound Visualizer"
      >
        <BranchBoundPage />
      </div>

      {/* 🎯 Accessibility Helper */}
      {!isLoading && (
        <div 
          className="accessibility-helper"
          role="complementary"
          aria-label="Accessibility Information"
          style={{
            marginTop: '2rem',
            padding: '1rem',
            background: 'var(--accent-info-bg)',
            borderRadius: '8px',
            textAlign: 'center',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)'
          }}
          data-aos="fade-up"
          data-aos-delay="700"
        >
          <strong>♿ Accessibility:</strong> This page supports keyboard navigation. 
          Use Tab to navigate through interactive elements and Space/Enter to activate them.
          All content is accessible to screen readers.
        </div>
      )}

      {/* 🎯 Quick Navigation Helper */}
      {!isLoading && (
        <nav 
          aria-label="Quick page navigation"
          style={{
            marginTop: '1.5rem',
            padding: '1rem',
            textAlign: 'center'
          }}
          data-aos="fade-up"
          data-aos-delay="750"
        >
          <h4 className="visually-hidden">Quick Navigation</h4>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a 
              href="#what-is-branch-bound" 
              className="btn btn-secondary"
              onClick={() => trackInteraction('quick_nav_what_is')}
              style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
            >
              What is Branch and Bound?
            </a>
            <a 
              href="#key-takeaways" 
              className="btn btn-secondary"
              onClick={() => trackInteraction('quick_nav_takeaways')}
              style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
            >
              Key Takeaways
            </a>
            <a 
              href="#complexity-analysis" 
              className="btn btn-secondary"
              onClick={() => trackInteraction('quick_nav_complexity')}
              style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
            >
              Complexity Analysis
            </a>
          </div>
        </nav>
      )}
    </div>
  );
};

// 🎯 Performance monitoring hook
export const useBranchBoundPerformance = () => {
  const [metrics, setMetrics] = useState({
    componentLoadTime: null,
    userEngagement: 0,
    errors: 0
  });

  useEffect(() => {
    const loadTime = performance.now();
    setMetrics(prev => ({ ...prev, componentLoadTime: loadTime }));
    logDebug('⏱️ Performance tracking initialized');

    return () => {
      logDebug('📊 Performance summary', metrics);
    };
  }, []);

  const trackEngagement = (action) => {
    setMetrics(prev => ({
      ...prev,
      userEngagement: prev.userEngagement + 1
    }));
    logDebug('🎯 User engagement', { action, totalEngagement: metrics.userEngagement + 1 });
  };

  const trackError = (error, context) => {
    setMetrics(prev => ({
      ...prev,
      errors: prev.errors + 1
    }));
    console.error('❌ BranchBound error:', error);
    logDebug('🛑 Error occurred', { 
      error: error.message, 
      context,
      totalErrors: metrics.errors + 1 
    });
  };

  return { metrics, trackEngagement, trackError };
};

export default BranchBoundOverview;
