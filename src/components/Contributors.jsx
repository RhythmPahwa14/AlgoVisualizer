// cspell:words sandeepvashishtha Vashishtha rhythmpahwa Pahwa noopener noreferrer
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import '../styles/Contributors.css';

// Mock contributors data - moved outside component to avoid useEffect dependency issues
const mockContributors = [
  {
    id: 1,
    login: 'sandeepvashishtha',
    name: 'Sandeep Vashishtha',
    avatar_url: 'https://github.com/sandeepvashishtha.png',
    html_url: 'https://github.com/sandeepvashishtha',
    contributions: 125,
    role: 'Project Lead & Full Stack Developer',
    bio: 'Passionate about building scalable algorithm visualization applications and educational tools.'
  },
  {
    id: 2,
    login: 'rhythmpahwa14',
    name: 'Rhythm Pahwa',
    avatar_url: 'https://github.com/rhythmpahwa14.png',
    html_url: 'https://github.com/rhythmpahwa14',
    contributions: 50,
    role: 'Senior Contributor & Developer',
    bio: 'Experienced developer contributing to algorithm visualization and educational technology projects.'
  }
];

// Helper function to assign roles based on GitHub activity and profile
const getRoleByGitHubActivity = (contributor) => {
  const { 
    contributions, 
    followers = 0, 
    public_repos = 0, 
    created_at,
    login 
  } = contributor;
  
  // Special role for project owner
  if (login === 'sandeepvashishtha') return 'Project Lead & Full Stack Developer';

  // Calculate account age in years
  const accountAge = created_at ? 
    (new Date() - new Date(created_at)) / (1000 * 60 * 60 * 24 * 365) : 0;
  
  // Advanced role assignment based on multiple factors
  if (contributions > 100 && followers > 50 && public_repos > 20) {
    return 'Core Maintainer';
  }
  
  if (contributions > 50 && (followers > 20 || public_repos > 10)) {
    return 'Senior Open Source Developer';
  }
  
  if (public_repos > 20 && contributions > 20) {
    return 'Open Source Advocate';
  }
  
  if (contributions > 50 && accountAge > 2) {
    return 'Veteran Developer';
  }
  
  if (contributions > 30 && followers > 10) {
    return 'Community Leader';
  }
  
  if (contributions > 20) {
    return 'Active Developer';
  }
  
  if (contributions > 10) {
    return 'Regular Contributor';
  }
  
  if (contributions > 5) {
    return 'Contributing Member';
  }
  
  return 'New Contributor';
};

const Contributors = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastCommitSha, setLastCommitSha] = useState(null);

  // Function to get the latest commit SHA
  const getLatestCommitSha = async () => {
    try {
      const response = await fetch('https://api.github.com/repos/RhythmPahwa14/AlgoVisualizer/commits?per_page=1');
      if (response.ok) {
        const commits = await response.json();
        return commits.length > 0 ? commits[0].sha : null;
      }
    } catch (error) {
      console.error('Error fetching latest commit:', error);
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
        const response = await fetch('https://api.github.com/repos/RhythmPahwa14/AlgoVisualizer/contributors');
        if (response.ok) {
          const githubContributors = await response.json();
          
          // Enhance GitHub data with additional profile info
          const enhancedContributors = await Promise.all(
            githubContributors.map(async (contributor) => {
              const profileData = await fetchGitHubProfile(contributor.login);

              // Determine bio without nested ternaries (readability)
              let bio = profileData.bio;
              if (contributor.login === 'rhythmpahwa14') {
                bio = 'Passionate about building scalable algorithm visualization applications and educational tools.';
              } else if (contributor.login === 'sandeepvashishtha') {
                bio = 'Experienced developer contributing to algorithm visualization and educational technology projects.';
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
          throw new Error('GitHub API request failed');
        }
      } catch (apiError) {
        console.warn('GitHub API not available, using mock data', apiError);
        setContributors(mockContributors);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contributors:', error);
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
        console.log('New commit detected, refreshing contributors...');
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
      <section className="contributors-section">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading our amazing contributors...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="contributors-section">
      <div className="container">
        <motion.div
          className="contributors-header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Our Amazing Contributors</h2>
        </motion.div>

        <motion.div
          className="contributors-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {contributors.map((contributor, index) => (
            <motion.div
              key={contributor.id}
              className="contributor-card"
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <div className="card-glow"></div>
              <div className="contributor-avatar">
                <img
                  src={contributor.avatar_url}
                  alt={contributor.name || contributor.login}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${contributor.name || contributor.login}&background=6366f1&color=ffffff&size=120`;
                  }}
                />
                <div className="contribution-badge">
                  <span className="contribution-count">{contributor.contributions}</span>
                  <span className="contribution-label">commits</span>
                </div>
              </div>
              
              <div className="contributor-info">
                <h3 className="contributor-name">{contributor.name || contributor.login}</h3>
                <p className="contributor-role">{contributor.role}</p>
                <p className="contributor-bio">{contributor.bio}</p>
                
                <div className="contributor-links">
                  <a
                    href={contributor.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-link"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path
                        fill="currentColor"
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                      />
                    </svg>
                    View Profile
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          className="contribute-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3>Join Our Community</h3>
          <p>
            Want to contribute to AlgoVisualizer? We welcome developers of all skill levels! 
            Help us improve algorithm education and build amazing visualizations together.
          </p>
          <div className="cta-buttons">
            <a
              href="https://github.com/RhythmPahwa14/AlgoVisualizer"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  fill="currentColor"
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
              Contribute on GitHub
            </a>
            <a
              href="https://github.com/RhythmPahwa14/AlgoVisualizer/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Report Issues
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contributors;