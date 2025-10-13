import React from "react";
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

const CommunityLanding = () => {
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
    <div className="theme-container" style={{ padding: "1rem", width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ width: "100%" }}
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-8" style={{ width: "100%" }}>
          <h1 
            className="theme-title" 
            style={{ 
              fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
              marginBottom: "1rem",
              lineHeight: "1.2"
            }}
          >
            Welcome to Our Community
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 3vw, 1.25rem)",
              color: "var(--theme-text-secondary)",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: "1.6",
              padding: "0 0.5rem",
            }}
          >
            Join our vibrant community of developers, contributors, and
            algorithm enthusiasts. Explore our community sections to connect,
            contribute, and celebrate together.
          </p>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          variants={itemVariants}
          className="stats-grid mb-8"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            width: "100%",
            padding: "2rem .5rem",
          }}
        >
          <div
            className="stat-card"
            style={{
              background: "linear-gradient(135deg, #4f46e5 10%, #7c3aed 100%)",
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "1.5rem 1rem",
              borderRadius: "1rem",
              minWidth: "min(150px, 100%)",
              flex: "1 1 120px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.09)",
            }}
          >
            <Users size={28} style={{ marginBottom: "0.75rem", opacity: 0.9 }} />
            <div
              className="stat-value"
              style={{
                fontSize: "clamp(1.25rem, 4vw, 1.75rem)",
                fontWeight: 700,
                color: "#ffffffff",
              }}
            >
              100+
            </div>
            <div
              className="stat-label"
              style={{ 
                color: "rgba(255,255,255,0.9)",
                fontSize: "clamp(0.8rem, 3vw, 0.9rem)",
                textAlign: "center"
              }}
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
              padding: "1.5rem 1rem",
              borderRadius: "1rem",
              minWidth: "min(150px, 100%)",
              flex: "1 1 120px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.09)",
            }}
          >
            <Github size={28} style={{ marginBottom: "0.75rem", opacity: 0.9 }} />
            <div
              className="stat-value"
              style={{
                fontSize: "clamp(1.25rem, 4vw, 1.75rem)",
                fontWeight: 700,
                color: "#ffffffff",
              }}
            >
              500+
            </div>
            <div
              className="stat-label"
              style={{ 
                color: "rgba(255,255,255,0.9)",
                fontSize: "clamp(0.8rem, 3vw, 0.9rem)",
                textAlign: "center"
              }}
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
              padding: "1.5rem 1rem",
              borderRadius: "1rem",
              minWidth: "min(150px, 100%)",
              flex: "1 1 120px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.09)",
            }}
          >
            <Star size={28} style={{ marginBottom: "0.75rem", opacity: 0.9 }} />
            <div
              className="stat-value"
              style={{
                fontSize: "clamp(1.25rem, 4vw, 1.75rem)",
                fontWeight: 700,
                color: "#ffffffff",
              }}
            >
              50+
            </div>
            <div
              className="stat-label"
              style={{ 
                color: "rgba(255,255,255,0.9)",
                fontSize: "clamp(0.8rem, 3vw, 0.9rem)",
                textAlign: "center"
              }}
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
            gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
            width: "100%",
          }}
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
              minHeight: "320px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                padding: "0.75rem",
              }}
            >
              <Users
                size={40}
                style={{
                  color: "var(--theme-accent)",
                  opacity: 0.1,
                }}
              />
            </div>

            <div style={{ position: "relative", zIndex: 1, height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    padding: "0.75rem",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #4f46e5 10%, #7c3aed 100%)",
                    color: "white",
                    flexShrink: 0,
                  }}
                >
                  <Users size={20} />
                </div>
                <h3
                  style={{
                    fontSize: "clamp(1.25rem, 4vw, 1.5rem)",
                    fontWeight: "700",
                    color: "var(--theme-text-primary)",
                    margin: 0,
                    lineHeight: "1.3",
                  }}
                >
                  Community Overview
                </h3>
              </div>

              <p
                style={{
                  color: "var(--theme-text-secondary)",
                  lineHeight: "1.6",
                  marginBottom: "1.5rem",
                  fontSize: "clamp(0.9rem, 2vw, 1rem)",
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
                  marginBottom: "1.5rem",
                }}
              >
                <span
                  style={{
                    padding: "0.25rem 0.5rem",
                    background: "var(--theme-bg)",
                    borderRadius: "12px",
                    fontSize: "0.75rem",
                    color: "var(--theme-text-secondary)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Community Guidelines
                </span>
                <span
                  style={{
                    padding: "0.25rem 0.5rem",
                    background: "var(--theme-bg)",
                    borderRadius: "12px",
                    fontSize: "0.75rem",
                    color: "var(--theme-text-secondary)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Getting Started
                </span>
                <span
                  style={{
                    padding: "0.25rem 0.5rem",
                    background: "var(--theme-bg)",
                    borderRadius: "12px",
                    fontSize: "0.75rem",
                    color: "var(--theme-text-secondary)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Mission & Values
                </span>
              </div>

              <div style={{ marginTop: "auto" }}>
                <Link to="#" className="btn btn-secondary">
                  <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    Learn More <ArrowRight size={14} />
                  </span>
                </Link>
              </div>
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
              minHeight: "320px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                padding: "0.75rem",
              }}
            >
              <UserPlus
                size={40}
                style={{
                  color: "var(--theme-accent)",
                  opacity: 0.1,
                }}
              />
            </div>

            <div style={{ position: "relative", zIndex: 1, height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    padding: "0.75rem",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #16a34a 10%, #22c55e 100%)",
                    color: "white",
                    flexShrink: 0,
                  }}
                >
                  <UserPlus size={20} />
                </div>
                <h3
                  style={{
                    fontSize: "clamp(1.25rem, 4vw, 1.5rem)",
                    fontWeight: "700",
                    color: "var(--theme-text-primary)",
                    margin: 0,
                    lineHeight: "1.3",
                  }}
                >
                  Contributors
                </h3>
              </div>

              <p
                style={{
                  color: "var(--theme-text-secondary)",
                  lineHeight: "1.6",
                  marginBottom: "1.5rem",
                  fontSize: "clamp(0.9rem, 2vw, 1rem)",
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
                  marginBottom: "1.5rem",
                }}
              >
                <span
                  style={{
                    padding: "0.25rem 0.5rem",
                    background: "var(--theme-bg)",
                    borderRadius: "12px",
                    fontSize: "0.75rem",
                    color: "var(--theme-text-secondary)",
                    whiteSpace: "nowrap",
                  }}
                >
                  GitHub Profiles
                </span>
                <span
                  style={{
                    padding: "0.25rem 0.5rem",
                    background: "var(--theme-bg)",
                    borderRadius: "12px",
                    fontSize: "0.75rem",
                    color: "var(--theme-text-secondary)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Contribution Stats
                </span>
                <span
                  style={{
                    padding: "0.25rem 0.5rem",
                    background: "var(--theme-bg)",
                    borderRadius: "12px",
                    fontSize: "0.75rem",
                    color: "var(--theme-text-secondary)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Developer Roles
                </span>
              </div>

              <div style={{ marginTop: "auto" }}>
                <Link
                  to="/contributors"
                  className="btn btn-secondary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    textDecoration: "none"
                  }}
                >
                  <UserPlus size={14} />
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
              minHeight: "320px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                padding: "0.75rem",
              }}
            >
              <Trophy
                size={40}
                style={{
                  color: "var(--theme-accent)",
                  opacity: 0.1,
                }}
              />
            </div>

            <div style={{ position: "relative", zIndex: 1, height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    padding: "0.75rem",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #dc2626 10%, #f59e0b 100%)",
                    color: "white",
                    flexShrink: 0,
                  }}
                >
                  <Trophy size={20} />
                </div>
                <h3
                  style={{
                    fontSize: "clamp(1.25rem, 4vw, 1.5rem)",
                    fontWeight: "700",
                    color: "var(--theme-text-primary)",
                    margin: 0,
                    lineHeight: "1.3",
                  }}
                >
                  Leaderboard
                </h3>
              </div>

              <p
                style={{
                  color: "var(--theme-text-secondary)",
                  lineHeight: "1.6",
                  marginBottom: "1.5rem",
                  fontSize: "clamp(0.9rem, 2vw, 1rem)",
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
                  marginBottom: "1.5rem",
                }}
              >
                <span
                  style={{
                    padding: "0.25rem 0.5rem",
                    background: "var(--theme-bg)",
                    borderRadius: "12px",
                    fontSize: "0.75rem",
                    color: "var(--theme-text-secondary)",
                    whiteSpace: "nowrap",
                  }}
                >
                  GSSoC'25 Rankings
                </span>
                <span
                  style={{
                    padding: "0.25rem 0.5rem",
                    background: "var(--theme-bg)",
                    borderRadius: "12px",
                    fontSize: "0.75rem",
                    color: "var(--theme-text-secondary)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Points System
                </span>
                <span
                  style={{
                    padding: "0.25rem 0.5rem",
                    background: "var(--theme-bg)",
                    borderRadius: "12px",
                    fontSize: "0.75rem",
                    color: "var(--theme-text-secondary)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Top Performers
                </span>
              </div>

              <div style={{ marginTop: "auto" }}>
                <Link
                  to="/contributor-leaderboard"
                  className="btn btn-secondary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    textDecoration: "none"
                  }}
                >
                  <Trophy size={14} />
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
          style={{ 
            textAlign: "center",
            padding: "1.5rem 1rem"
          }}
        >
          <h3
            style={{
              fontSize: "clamp(1.25rem, 4vw, 1.75rem)",
              fontWeight: "700",
              color: "var(--theme-text-primary)",
              marginBottom: "1rem",
              lineHeight: "1.3",
            }}
          >
            Ready to Join Our Community?
          </h3>
          <p
            style={{
              color: "var(--theme-text-secondary)",
              fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
              maxWidth: "600px",
              margin: "0 auto 1.5rem auto",
              lineHeight: "1.6",
              padding: "0 0.5rem",
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
              gap: "0.75rem",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://github.com/RhythmPahwa14/AlgoVisualizer"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                textDecoration: "none",
                fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
                padding: "0.75rem 1rem",
              }}
            >
              <Github size={14} />
              Start Contributing
            </a>
            <Link
              to="/contributors"
              className="btn btn-secondary"
              style={{ 
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
                padding: "0.75rem 1rem",
              }}
            >
              <Users size={14} />
              Meet the Team
            </Link>
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @media (max-width: 480px) {
          .theme-container {
            padding: 0.5rem;
          }
          
          .stats-grid {
            gap: 0.75rem;
          }
          
          .stat-card {
            padding: 1rem 0.5rem !important;
            min-width: 100px !important;
          }
        }
        
        @media (max-width: 360px) {
          .theme-container {
            padding: 0.25rem;
          }
          
          .stats-grid {
            gap: 0.5rem;
          }
        }
        
        @media (max-width: 300px) {
          .theme-card {
            padding: 1rem !important;
          }
          
          .btn {
            padding: 0.5rem 0.75rem !important;
            font-size: 0.75rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CommunityLanding;