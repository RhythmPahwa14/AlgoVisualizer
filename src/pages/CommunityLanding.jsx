import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Trophy,
  Star,
  Github,
  UserPlus,
  Award,
  ArrowRight,
} from "lucide-react";
import "../styles/global-theme.css";

// 🎯 Debug logging helper
const logDebug = (message, data = null) => {
  console.log(`👥 CommunityDebug: ${message}`, data ? data : '');
};

// 🎯 Performance monitoring helper
const trackPerformance = (operation, startTime) => {
  const duration = performance.now() - startTime;
  logDebug(`⏱️ ${operation} Performance`, { duration: `${duration.toFixed(2)}ms` });
  return duration;
};

const CommunityLanding = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    pageLoadTime: null,
    animationsLoaded: false,
    interactions: 0,
    cardsHovered: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // 🎯 Component lifecycle logging
  useEffect(() => {
    const loadStartTime = performance.now();
    logDebug('🚀 CommunityLanding component mounted');

    // Simulate loading completion
    const loadTimer = setTimeout(() => {
      const loadDuration = performance.now() - loadStartTime;
      setIsLoading(false);
      setPerformanceMetrics(prev => ({
        ...prev,
        pageLoadTime: loadDuration,
        animationsLoaded: true
      }));
      
      logDebug('✅ Page fully loaded', {
        loadTime: `${loadDuration.toFixed(2)}ms`,
        animationCount: 3, // header, stats, cards
        cardCount: 3
      });
    }, 400);

    return () => {
      clearTimeout(loadTimer);
      logDebug('🧹 CommunityLanding unmounting', {
        totalInteractions: performanceMetrics.interactions,
        cardsHovered: performanceMetrics.cardsHovered
      });
    };
  }, []);

  // 🎯 Track user interactions
  const trackInteraction = (interactionType, data = {}) => {
    setPerformanceMetrics(prev => ({
      ...prev,
      interactions: prev.interactions + 1
    }));
    
    logDebug('👆 User interaction', { 
      type: interactionType,
      ...data,
      totalInteractions: performanceMetrics.interactions + 1
    });
  };

  // 🎯 Track card hover interactions
  const trackCardHover = (cardType) => {
    setPerformanceMetrics(prev => ({
      ...prev,
      cardsHovered: prev.cardsHovered + 1
    }));
    
    logDebug('🎯 Card hover', {
      cardType,
      totalHovers: performanceMetrics.cardsHovered + 1
    });
  };

  // 🎯 Keyboard navigation support
  const handleKeyDown = (event, action, target) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      trackInteraction(`keyboard_${action}`, { target });
      
      if (action === 'navigate') {
        window.location.href = target;
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <div 
      className="theme-container"
      role="main"
      aria-label="Community Landing Page"
    >
      {/* 🎯 Loading State */}
      {isLoading && (
        <div 
          className="theme-card loading-card"
          role="status"
          aria-label="Loading community page"
        >
          <div className="loading-spinner" aria-hidden="true"></div>
          <p>Loading Community Hub...</p>
        </div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onAnimationStart={() => logDebug('🎭 Animations starting')}
        onAnimationComplete={() => logDebug('✅ All animations completed')}
      >
        {/* Header Section */}
        <motion.div 
          variants={itemVariants} 
          className="text-center mb-12"
          role="banner"
          aria-label="Community introduction"
        >
          <h1 className="theme-title">Welcome to Our Community</h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "var(--theme-text-secondary)",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Join our vibrant community of developers, contributors, and
            algorithm enthusiasts. Explore our community sections to connect,
            contribute, and celebrate together.
          </p>
        </motion.div>

        {/* 🎯 Performance Metrics (Debug View) */}
        {!isLoading && process.env.NODE_ENV === 'development' && (
          <motion.div
            variants={itemVariants}
            className="performance-debug"
            role="complementary"
            aria-label="Performance Statistics"
            style={{
              background: 'var(--accent-info-bg)',
              padding: '0.75rem',
              borderRadius: '8px',
              margin: '0 auto 2rem auto',
              maxWidth: '600px',
              fontSize: '0.8rem',
              textAlign: 'center',
              color: 'var(--text-secondary)'
            }}
          >
            <strong>📊 Debug Stats:</strong> Loaded in {performanceMetrics.pageLoadTime?.toFixed(2)}ms •{' '}
            {performanceMetrics.interactions} interactions •{' '}
            {performanceMetrics.cardsHovered} cards hovered
          </motion.div>
        )}

        {/* Community Stats */}
        <motion.div
          variants={itemVariants}
          className="stats-grid mb-12"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            width: "100%",
          }}
          role="region"
          aria-label="Community statistics"
        >
          <div
            className="stat-card"
            style={{
              background: "linear-gradient(135deg, #4f46e5 10%, #7c3aed 100%)",
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "2rem 1.5rem",
              borderRadius: "1rem",
              minWidth: "200px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.09)",
            }}
            role="article"
            aria-label="100 plus contributors"
          >
            <Users size={32} style={{ marginBottom: "1rem", opacity: 0.9 }} aria-hidden="true" />
            <div
              className="stat-value"
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "#ffffffff",
              }}
            >
              100+
            </div>
            <div
              className="stat-label"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              Contributors
            </div>
          </div>

          <div
            className="stat-card"
            style={{
              background: "linear-gradient(135deg, #16a34a 10%, #22c55e 100%)",
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "2rem 1.5rem",
              borderRadius: "1rem",
              minWidth: "200px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.09)",
            }}
            role="article"
            aria-label="500 plus commits"
          >
            <Github size={32} style={{ marginBottom: "1rem", opacity: 0.9 }} aria-hidden="true" />
            <div
              className="stat-value"
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "#ffffffff",
              }}
            >
              500+
            </div>
            <div
              className="stat-label"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              Commits
            </div>
          </div>

          <div
            className="stat-card"
            style={{
              background: "linear-gradient(135deg, #dc2626 10%, #f59e0b 100%)",
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "2rem 1.5rem",
              borderRadius: "1rem",
              minWidth: "200px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.09)",
            }}
            role="article"
            aria-label="50 plus projects"
          >
            <Star size={32} style={{ marginBottom: "1rem", opacity: 0.9 }} aria-hidden="true" />
            <div
              className="stat-value"
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "#ffffffff",
              }}
            >
              50+
            </div>
            <div
              className="stat-label"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              Projects
            </div>
          </div>
        </motion.div>

        {/* Community Sections */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
            marginBottom: "3rem",
          }}
          role="navigation"
          aria-label="Community sections"
        >
          {/* Overview Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="theme-card"
            style={{
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
            onHoverStart={() => trackCardHover('overview')}
            onClick={() => trackInteraction('card_click', { card: 'overview' })}
            onKeyDown={(e) => handleKeyDown(e, 'navigate', '/community-overview')}
            role="button"
            tabIndex={0}
            aria-label="Community Overview - Learn about our mission and values"
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                padding: "1rem",
              }}
            >
              <Users
                size={48}
                style={{
                  color: "var(--theme-accent)",
                  opacity: 0.1,
                }}
                aria-hidden="true"
              />
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    padding: "1rem",
                    borderRadius: "16px",
                    background:
                      "linear-gradient(135deg, #4f46e5 10%, #7c3aed 100%)",
                    color: "white",
                  }}
                  aria-hidden="true"
                >
                  <Users size={24} />
                </div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "var(--theme-text-primary)",
                    margin: 0,
                  }}
                >
                  Community Overview
                </h3>
              </div>

              <p
                style={{
                  color: "var(--theme-text-secondary)",
                  lineHeight: "1.6",
                  marginBottom: "2rem",
                }}
              >
                Get an overview of our amazing community, learn about our
                mission, values, and discover how you can get involved in
                building the future of algorithm visualization.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "2rem",
                }}
                role="list"
                aria-label="Overview features"
              >
                {["Community Guidelines", "Getting Started", "Mission & Values"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "0.25rem 0.75rem",
                      background: "var(--theme-bg)",
                      borderRadius: "16px",
                      fontSize: "0.85rem",
                      color: "var(--theme-text-secondary)",
                    }}
                    role="listitem"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link to="#"
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "var(--theme-accent)",
                    fontWeight: "600",
                    fontSize: "1rem",
                  }}
                  aria-hidden="true"
                >
                  className="btn btn-secondary" >
                  Learn More <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Contributors Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="theme-card"
            style={{
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
            onHoverStart={() => trackCardHover('contributors')}
            onClick={() => {
              trackInteraction('card_click', { card: 'contributors' });
              window.location.href = "/contributors";
            }}
            onKeyDown={(e) => handleKeyDown(e, 'navigate', '/contributors')}
            role="button"
            tabIndex={0}
            aria-label="Contributors - Meet our amazing contributors and their profiles"
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                padding: "1rem",
              }}
            >
              <UserPlus
                size={48}
                style={{
                  color: "var(--theme-accent)",
                  opacity: 0.1,
                }}
                aria-hidden="true"
              />
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    padding: "1rem",
                    borderRadius: "16px",
                    background:
                      "linear-gradient(135deg, #16a34a 10%, #22c55e 100%)",
                    color: "white",
                  }}
                  aria-hidden="true"
                >
                  <UserPlus size={24} />
                </div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "var(--theme-text-primary)",
                    margin: 0,
                  }}
                >
                  Contributors
                </h3>
              </div>

              <p
                style={{
                  color: "var(--theme-text-secondary)",
                  lineHeight: "1.6",
                  marginBottom: "2rem",
                }}
              >
                Meet the amazing people who make AlgoVisualizer possible! Browse
                our contributor profiles, see their contributions, and learn
                about their expertise.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "2rem",
                }}
                role="list"
                aria-label="Contributor features"
              >
                {["GitHub Profiles", "Contribution Stats", "Developer Roles"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "0.25rem 0.75rem",
                      background: "var(--theme-bg)",
                      borderRadius: "16px",
                      fontSize: "0.85rem",
                      color: "var(--theme-text-secondary)",
                    }}
                    role="listitem"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div
                style={{
                  textAlign: "center",
                  marginTop: "auto",
                }}
              >
                <Link
                  to="/contributors"
                  className="btn btn-primary"
                  style={{ textDecoration: "none" }}
                  onClick={() => trackInteraction('link_click', { target: '/contributors' })}
                  aria-label="Navigate to contributors page"
                >
                  <UserPlus size={16} aria-hidden="true" />
                  View Contributors
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Leaderboard Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="theme-card"
            style={{
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
            onHoverStart={() => trackCardHover('leaderboard')}
            onClick={() => {
              trackInteraction('card_click', { card: 'leaderboard' });
              window.location.href = "/ContributorLeaderboard";
            }}
            onKeyDown={(e) => handleKeyDown(e, 'navigate', '/ContributorLeaderboard')}
            role="button"
            tabIndex={0}
            aria-label="Leaderboard - View top contributors and rankings"
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                padding: "1rem",
              }}
            >
              <Trophy
                size={48}
                style={{
                  color: "var(--theme-accent)",
                  opacity: 0.1,
                }}
                aria-hidden="true"
              />
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    padding: "1rem",
                    borderRadius: "16px",
                    background:
                      "linear-gradient(135deg, #dc2626 10%, #f59e0b 100%)",
                    color: "white",
                  }}
                  aria-hidden="true"
                >
                  <Trophy size={24} />
                </div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "var(--theme-text-primary)",
                    margin: 0,
                  }}
                >
                  Leaderboard
                </h3>
              </div>

              <p
                style={{
                  color: "var(--theme-text-secondary)",
                  lineHeight: "1.6",
                  marginBottom: "2rem",
                }}
              >
                See the top contributors in our GSSoC'25 leaderboard! Track
                points, view rankings, and celebrate the achievements of our
                community members.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "2rem",
                }}
                role="list"
                aria-label="Leaderboard features"
              >
                {["GSSoC'25 Rankings", "Points System", "Top Performers"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "0.25rem 0.75rem",
                      background: "var(--theme-bg)",
                      borderRadius: "16px",
                      fontSize: "0.85rem",
                      color: "var(--theme-text-secondary)",
                    }}
                    role="listitem"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div
                style={{
                  textAlign: "center",
                  marginTop: "auto",
                }}
              >
                <Link
                  to="/ContributorLeaderboard"
                  className="btn btn-primary"
                  style={{ textDecoration: "none" }}
                  onClick={() => trackInteraction('link_click', { target: '/ContributorLeaderboard' })}
                  aria-label="Navigate to leaderboard page"
                >
                  <Trophy size={16} aria-hidden="true" />
                  View Leaderboard
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          className="theme-card"
          style={{ textAlign: "center" }}
          role="region"
          aria-label="Call to action"
        >
          <h3
            style={{
              fontSize: "1.75rem",
              fontWeight: "700",
              color: "var(--theme-text-primary)",
              marginBottom: "1rem",
            }}
          >
            Ready to Join Our Community?
          </h3>
          <p
            style={{
              color: "var(--theme-text-secondary)",
              fontSize: "1.1rem",
              maxWidth: "600px",
              margin: "0 auto 2rem auto",
              lineHeight: "1.6",
            }}
          >
            Whether you're a seasoned developer or just getting started, there's
            a place for you in our community. Contribute to open-source, learn
            new algorithms, and help make computer science education more
            accessible.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://github.com/RhythmPahwa14/AlgoVisualizer"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ textDecoration: "none" }}
              onClick={() => trackInteraction('external_link_click', { target: 'github' })}
              aria-label="Visit our GitHub repository to start contributing (opens in new tab)"
              className="btn btn-secondary"

              style={{
                color: "var(--theme-accent)",
                backgroundColor: "var(--theme-accent)",
                textDecoration: "none"
              }}
            >
              <Github size={16} aria-hidden="true" />
              Start Contributing
            </a>
            <Link
              to="/contributors"
              className="btn btn-secondary"
              style={{ textDecoration: "none" }}
              onClick={() => trackInteraction('link_click', { target: '/contributors' })}
              aria-label="Navigate to meet the team page"
            >
              <Users size={16} aria-hidden="true" />
              Meet the Team
            </Link>
          </div>
        </motion.div>

        {/* 🎯 Accessibility Helper */}
        {!isLoading && (
          <motion.div
            variants={itemVariants}
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
          >
            <strong>♿ Accessibility:</strong> Use Tab to navigate through cards and buttons. 
            Press Enter or Space to activate interactive elements. All content is screen reader friendly.
          </div>
        )}
      </motion.div>
    </div >
  );
};

// 🎯 Performance monitoring hook
export const useCommunityMetrics = () => {
  const [metrics, setMetrics] = useState({
    pageViews: 0,
    engagementScore: 0,
    popularSections: {}
  });

  useEffect(() => {
    logDebug('📊 Community metrics tracking initialized');
    
    return () => {
      logDebug('📈 Community metrics summary', metrics);
    };
  }, []);

  const trackSectionView = (section) => {
    setMetrics(prev => ({
      ...prev,
      pageViews: prev.pageViews + 1,
      popularSections: {
        ...prev.popularSections,
        [section]: (prev.popularSections[section] || 0) + 1
      }
    }));
    
    logDebug('👀 Section viewed', { section, totalViews: metrics.pageViews + 1 });
  };

  const trackEngagement = (action, value = 1) => {
    setMetrics(prev => ({
      ...prev,
      engagementScore: prev.engagementScore + value
    }));
    
    logDebug('💫 Engagement tracked', { action, value, totalScore: metrics.engagementScore + value });
  };

  return { metrics, trackSectionView, trackEngagement };
};

export default CommunityLanding;
