// cspell:words sandeepvashishtha Vashishtha rhythmpahwa Pahwa noopener noreferrer
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Crown, Star, Target, Flame, Gem, BarChart3, Wrench, Bug } from "lucide-react";
import "../styles/global-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";

// Mock contributors data - moved outside component to avoid useEffect dependency issues
const mockContributors = [
  {
    id: 1,
    login: "sandeepvashishtha",
    name: "Sandeep Vashishtha",
    avatar_url: "https://github.com/sandeepvashishtha.png",
    html_url: "https://github.com/sandeepvashishtha",
    contributions: 125,
    role: "Project Lead & Full Stack Developer",
    bio: "Passionate about building scalable algorithm visualization applications and educational tools."
  },
  {
    id: 2,
    login: "rhythmpahwa14",
    name: "Rhythm Pahwa",
    avatar_url: "https://github.com/rhythmpahwa14.png",
    html_url: "https://github.com/rhythmpahwa14",
    contributions: 50,
    role: "Senior Contributor & Developer",
    bio: "Experienced developer contributing to algorithm visualization and educational technology projects."
  }
];

// Helper function to get commit badge styling based on contribution count
const getCommitBadgeStyle = (contributions) => {
  if (contributions >= 200) {
    return {
      backgroundColor: "linear-gradient(135deg, #FFD700, #FFA500)",
      color: "#000",
      border: "2px solid #FFD700",
      glow: "0 0 15px rgba(255, 215, 0, 0.5)",
      label: "Legend"
    };
  } else if (contributions >= 51) {
    return {
      backgroundColor: "linear-gradient(135deg, #16a34a, #22c55e)",
      color: "#fff",
      border: "2px solid #16a34a",
      glow: "0 0 12px rgba(34, 197, 94, 0.4)",
      label: "Expert"
    };
  } else if (contributions >= 10) {
    return {
      backgroundColor: "linear-gradient(135deg, #3b82f6, #60a5fa)",
      color: "#fff",
      border: "2px solid #3b82f6",
      glow: "0 0 10px rgba(59, 130, 246, 0.4)",
      label: "Active"
    };
  } else {
    return {
      backgroundColor: "linear-gradient(135deg, #6b7280, #9ca3af)",
      color: "#fff",
      border: "2px solid #6b7280",
      glow: "0 0 8px rgba(107, 114, 128, 0.3)",
      label: "New"
    };
  }
};

// Helper function to get avatar ring style based on activity level
const getAvatarRingStyle = (contributions) => {
  if (contributions >= 200) {
    return {
      background: "conic-gradient(from 0deg, #FFD700, #FFA500, #FFD700)",
      animation: "spin 3s linear infinite",
      filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.6))"
    };
  } else if (contributions >= 51) {
    return {
      background: "conic-gradient(from 0deg, #16a34a, #22c55e, #16a34a)",
      animation: "spin 4s linear infinite",
      filter: "drop-shadow(0 0 8px rgba(34, 197, 94, 0.5))"
    };
  } else if (contributions >= 10) {
    return {
      background: "conic-gradient(from 0deg, #3b82f6, #60a5fa, #3b82f6)",
      animation: "spin 5s linear infinite",
      filter: "drop-shadow(0 0 6px rgba(59, 130, 246, 0.4))"
    };
  } else {
    return {
      background: "linear-gradient(135deg, #6b7280, #9ca3af)",
      filter: "drop-shadow(0 0 4px rgba(107, 114, 128, 0.3))"
    };
  }
};

// Helper function to get role badge icon
const getRoleBadgeIcon = (role) => {
  if (role.includes("Lead") || role.includes("Maintainer")) {
    return Crown;
  } else if (role.includes("Senior") || role.includes("Core")) {
    return Star;
  } else if (role.includes("Mentor")) {
    return Target;
  } else if (role.includes("Active")) {
    return Flame;
  }
  return Gem;
};

// Helper function to assign roles based on GitHub activity and profile
const getRoleByGitHubActivity = (contributor) => {
  const { contributions, followers = 0, public_repos = 0, created_at, login } = contributor;

  // Special role for project owner
  if (login === "sandeepvashishtha") return "Project Lead & Full Stack Developer";

  // Calculate account age in years
  const accountAge = created_at
    ? (new Date() - new Date(created_at)) / (1000 * 60 * 60 * 24 * 365)
    : 0;

  // Advanced role assignment based on multiple factors
  if (contributions > 100 && followers > 50 && public_repos > 20) {
    return "Core Maintainer";
  }

  if (contributions > 50 && (followers > 20 || public_repos > 10)) {
    return "Senior Open Source Developer";
  }

  if (public_repos > 20 && contributions > 20) {
    return "Open Source Advocate";
  }

  if (contributions > 50 && accountAge > 2) {
    return "Veteran Developer";
  }

  if (contributions > 30 && followers > 10) {
    return "Community Leader";
  }

  if (contributions > 20) {
    return "Active Developer";
  }

  if (contributions > 10) {
    return "Regular Contributor";
  }

  if (contributions > 5) {
    return "Contributing Member";
  }

  return "New Contributor";
};

const Contributors = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastCommitSha, setLastCommitSha] = useState(null);
  const navigate = useNavigate();

  // Function to handle back navigation
  const handleBackClick = () => {
    navigate("/community");
  };

  // Function to get the latest commit SHA
  const getLatestCommitSha = async () => {
    try {
      const response = await fetch(
        "https://api.github.com/repos/RhythmPahwa14/AlgoVisualizer/commits?per_page=1"
      );
      if (response.ok) {
        const commits = await response.json();
        return commits.length > 0 ? commits[0].sha : null;
      }
    } catch (error) {
      console.error("Error fetching latest commit:", error);
    }
    return null;
  };

  // Function to fetch additional GitHub profile data
  const fetchGitHubProfile = async (username) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (response.ok) {
        const profile = await response.json();
        return {
          followers: profile.followers || 0,
          public_repos: profile.public_repos || 0,
          created_at: profile.created_at,
          name: profile.name || username,
          bio: profile.bio || `Dedicated contributor with expertise in software development.`
        };
      }
    } catch (error) {
      console.error(`Error fetching profile for ${username}:`, error);
    }
    return {
      followers: 0,
      public_repos: 0,
      created_at: null,
      name: username,
      bio: `Dedicated contributor with expertise in software development.`
    };
  };

  // Function to fetch contributors
  const fetchContributors = useCallback(async () => {
    try {
      setLoading(true);

      // Try to fetch real contributors from GitHub API
      try {
        const response = await fetch(
          "https://api.github.com/repos/RhythmPahwa14/AlgoVisualizer/contributors"
        );
        if (response.ok) {
          const githubContributors = await response.json();

          // Enhance GitHub data with additional profile info
          const enhancedContributors = await Promise.all(
            githubContributors.map(async (contributor) => {
              const profileData = await fetchGitHubProfile(contributor.login);

              // Determine bio without nested ternaries (readability)
              let bio = profileData.bio;
              if (contributor.login === "sandeepvashishtha") {
                bio =
                  "Passionate about building scalable algorithm visualization applications and educational tools.";
              } else if (contributor.login === "rhythmpahwa14") {
                bio =
                  "Experienced developer contributing to algorithm visualization and educational technology projects.";
              }

              const enhancedContributor = {
                ...contributor,
                ...profileData,
                id: contributor.id,
                role: getRoleByGitHubActivity({
                  ...contributor,
                  ...profileData
                }),
                bio
              };

              return enhancedContributor;
            })
          );
          setContributors(enhancedContributors);
        } else {
          throw new Error("GitHub API request failed");
        }
      } catch (apiError) {
        console.warn("GitHub API not available, using mock data", apiError);
        setContributors(mockContributors);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching contributors:", error);
      setContributors(mockContributors);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    const initializeData = async () => {
      await fetchContributors();
      const initialSha = await getLatestCommitSha();
      setLastCommitSha(initialSha);
    };

    initializeData();

    // Set up polling for new commits every 30 seconds
    const commitCheckInterval = setInterval(async () => {
      const latestSha = await getLatestCommitSha();

      if (latestSha && lastCommitSha && latestSha !== lastCommitSha) {
        console.log("New commit detected, refreshing contributors...");
        await fetchContributors();
        setLastCommitSha(latestSha);
      } else if (latestSha && !lastCommitSha) {
        setLastCommitSha(latestSha);
      }
    }, 30000);

    // Cleanup interval on component unmount
    return () => clearInterval(commitCheckInterval);
  }, [lastCommitSha, fetchContributors]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <div className="theme-container">
        <div className="loading-state">
          <motion.div
            className="bouncing-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="loader-dot" />
            <div className="loader-dot" />
            <div className="loader-dot" />
          </motion.div>
          <p>Loading our amazing contributors...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="theme-container contributors-section"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      {/* Back Button */}
      {/* <motion.button
        onClick={handleBackClick}
        className="back-button"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{
          scale: 1.05,
          backgroundColor: "var(--theme-primary)",
          color: "var(--theme-bg)"
        }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: "absolute",
          left: "10px",
          top: "10px",
          zIndex: 1,
          padding: "8px 12px",
          marginRight: "15px",
          fontSize: "0.9rem",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "var(--theme-bg)",
          border: "1px solid var(--theme-border)",
          borderRadius: "6px",
          cursor: "pointer",
          color: "var(--theme-text)"
        }}
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        <span>Back to Community</span>
      </motion.button> */}

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="contributors-header"
      >
        <h1 className="theme-title">Our Amazing Contributors</h1>
        <p className="contributors-subtitle" style={{ fontSize: "1.5rem", textAlign: "center" }}>
          Building Together, Growing Together
        </p>
      </motion.div>

      <motion.div
        className="contributors-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {contributors.map((contributor, index) => {
          const badgeStyle = getCommitBadgeStyle(contributor.contributions);
          const avatarRingStyle = getAvatarRingStyle(contributor.contributions);
          const RoleIcon = getRoleBadgeIcon(contributor.role);

          return (
            <motion.div
              key={contributor.id}
              className="contributor-card enhanced-card"
              variants={itemVariants}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                transition: { duration: 0.3 }
              }}
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
            >
              <div className="card-glow"></div>

              <div className="contributor-avatar">
                <div className="avatar-container">
                  <div className="avatar-ring" style={avatarRingStyle}></div>
                  <img
                    src={contributor.avatar_url}
                    alt={contributor.name || contributor.login}
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${
                        contributor.name || contributor.login
                      }&background=6366f1&color=ffffff&size=120`;
                    }}
                  />
                  <div className="role-badge-overlay" title={contributor.role}>
                    <span><RoleIcon size={14} /></span>
                  </div>
                </div>

                <div
                  className="contribution-badge enhanced-badge"
                  style={{
                    background: badgeStyle.backgroundColor,
                    color: badgeStyle.color,
                    border: badgeStyle.border,
                    boxShadow: badgeStyle.glow
                  }}
                >
                  <div className="badge-content">
                    <span className="contribution-count">{contributor.contributions}</span>
                    <span className="contribution-label"> commits </span>
                    <span className="contribution-level"> {badgeStyle.label} </span>
                  </div>
                </div>
              </div>

              <div className="contributor-info enhanced-info">
                <h3 className="contributor-name">{contributor.name || contributor.login}</h3>
                <p className="contributor-role">
                  <span className="role-icon"><RoleIcon size={14} /></span>
                  {contributor.role}
                </p>
                <p className="contributor-bio">{contributor.bio}</p>

                <div
                  className="contribution-stats"
                  style={{
                    padding:'1rem 1.3rem',
                    display: "grid", 
                    gridTemplateColumns:'repeat(2 , 1fr)',
                    margin: "1rem 0", 
                    gap: "1rem",
                    borderRadius: "12px",
                    boxShadow: `0 4px 12px ${`var(--shadow-color)`}`
                  }}
                >
                  <div className="stat-item"  >
                    <span className="stat-icon"><BarChart3 size={16} /></span>
                    <span className="stat-value">{contributor.contributions}</span>
                    <span className="stat-label">Commits</span>
                  </div>
                  <div className="stat-item" style={{ flexDirection: "column" }}>
                    <span className="stat-icon"><Wrench size={16} /></span>
                    <span className="stat-value">{Math.floor(contributor.contributions / 3)}</span>
                    <span className="stat-label">PRs</span>
                  </div>
                  <div className="stat-item" style={{ flexDirection: "column" }}>
                    <span className="stat-icon"><Bug size={16} /></span>
                    <span className="stat-value">{Math.floor(contributor.contributions / 5)}</span>
                    <span className="stat-label">Issues</span>
                  </div>
                </div>

                <div
                  className="contributor-actions"
                  style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
                >
                  <a
                    href={contributor.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary enhanced-btn"
                    style={{ margin: "1rem auto" }}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path
                        fill="currentColor"
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.839 1.237 1.839 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.419-1.305.762-1.605-2.665-.304-5.466-1.334-5.466-5.931 0-1.312.469-2.382 1.236-3.222-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.003.404 2.293-1.552 3.301-1.23 3.301-1.23.653 1.653.241 2.873.118 3.176.768.84 1.236 1.91 1.236 3.222 0 4.608-2.801 5.625-5.475 5.922.43.372.823 1.102.823 2.222v3.293c0 .319.193.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                      />
                    </svg>
                    <span>View GitHub Profile</span>
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Contributors;
