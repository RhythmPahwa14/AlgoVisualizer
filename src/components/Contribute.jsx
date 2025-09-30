import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "../styles/theme.css";
import "../styles/Contribute.css";

const Contribute = () => {
  const navigate = useNavigate();
  const [repoStats, setRepoStats] = useState({
    stars: 0,
    forks: 0,
    issues: 0,
    contributors: 0
  });

  useEffect(() => {
    AOS.init();
    
    // Fetch GitHub repository stats
    const fetchRepoStats = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/RhythmPahwa14/AlgoVisualizer');
        if (response.ok) {
          const data = await response.json();
          setRepoStats({
            stars: data.stargazers_count || 0,
            forks: data.forks_count || 0,
            issues: data.open_issues_count || 0,
            contributors: 0 // Will be updated by contributors API
          });
        }
      } catch (error) {
        console.error('Error fetching repo stats:', error);
      }
    };

    fetchRepoStats();
  }, []);

  const handleBackClick = () => {
    navigate(-1); // Go back to previous page
  };

  const techStack = [
    {
      category: "Frontend",
      technologies: [
        { name: "React", icon: "⚛️", description: "UI Library for building interactive components" },
        { name: "JavaScript", icon: "🟨", description: "Core programming language" },
        { name: "HTML5", icon: "🔗", description: "Markup language for structure" },
        { name: "CSS3", icon: "🎨", description: "Styling and animations" },
        { name: "Framer Motion", icon: "🎭", description: "Animation library for React" }
      ]
    },
    {
      category: "Algorithms & Data Structures",
      technologies: [
        { name: "Sorting Algorithms", icon: "📊", description: "Bubble, Quick, Merge, Heap Sort visualizations" },
        { name: "Search Algorithms", icon: "🔍", description: "Binary search, Linear search implementations" },
        { name: "Graph Algorithms", icon: "🕸️", description: "BFS, DFS, Dijkstra, A* pathfinding" },
        { name: "Tree Structures", icon: "🌳", description: "Binary trees, BST, AVL tree visualizations" }
      ]
    },
    {
      category: "Development Tools",
      technologies: [
        { name: "Git", icon: "📝", description: "Version control system" },
        { name: "GitHub", icon: "🐙", description: "Code hosting and collaboration" },
        { name: "VS Code", icon: "💻", description: "Recommended IDE" },
        { name: "Node.js", icon: "🟢", description: "JavaScript runtime environment" }
      ]
    }
  ];

  const contributionTypes = [
    {
      title: "🐛 Bug Fixes",
      description: "Help us identify and fix bugs in visualizations, UI components, or algorithm implementations.",
      difficulty: "Beginner",
      examples: ["Fix animation glitches", "Resolve responsive design issues", "Correct algorithm logic errors"]
    },
    {
      title: "✨ New Features",
      description: "Add new algorithm visualizations, improve existing ones, or enhance user experience.",
      difficulty: "Intermediate",
      examples: ["New sorting algorithms", "Enhanced controls", "Mobile optimizations", "Dark mode improvements"]
    },
    {
      title: "📚 Documentation",
      description: "Improve code comments, README files, or create tutorials for new contributors.",
      difficulty: "Beginner",
      examples: ["API documentation", "Setup guides", "Algorithm explanations", "Contributing guidelines"]
    },
    {
      title: "🎨 UI/UX Design",
      description: "Enhance the visual design, improve user interface, or create better user experiences.",
      difficulty: "Intermediate",
      examples: ["Design improvements", "Better animations", "Accessibility features", "Theme enhancements"]
    },
    {
      title: "⚡ Performance",
      description: "Optimize algorithm performance, reduce bundle size, or improve rendering speed.",
      difficulty: "Advanced",
      examples: ["Code optimization", "Memory management", "Rendering performance", "Bundle analysis"]
    },
    {
      title: "🧪 Testing",
      description: "Write unit tests, integration tests, or help with quality assurance.",
      difficulty: "Intermediate",
      examples: ["Unit tests", "Component testing", "E2E tests", "Cross-browser testing"]
    }
  ];

  const steps = [
    {
      step: 1,
      title: "🍴 Fork the Repository",
      description: "Click the 'Fork' button on our GitHub repository to create your own copy."
    },
    {
      step: 2,
      title: "📥 Clone Your Fork",
      description: "Clone your forked repository to your local machine using Git.",
      code: "git clone https://github.com/YOUR-USERNAME/AlgoVisualizer.git"
    },
    {
      step: 3,
      title: "📦 Install Dependencies",
      description: "Navigate to the project directory and install required packages.",
      code: "cd AlgoVisualizer\nnpm install"
    },
    {
      step: 4,
      title: "🏃‍♂️ Start Development",
      description: "Run the development server and start making your changes.",
      code: "npm start"
    },
    {
      step: 5,
      title: "🔧 Make Your Changes",
      description: "Create a new branch, make your improvements, and test thoroughly."
    },
    {
      step: 6,
      title: "📤 Submit Pull Request",
      description: "Push your changes and create a pull request with a clear description."
    }
  ];

  return (
    <div className="theme-container contribute-page">
      {/* Back Button */}
      <motion.button
        onClick={handleBackClick}
        className="back-button"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 19-7-7 7-7"/>
          <path d="M19 12H5"/>
        </svg>
        <span>Back</span>
      </motion.button>

      {/* Hero Section */}
      <motion.section 
        className="contribute-hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <h1 className="hero-title">Contribute to AlgoVisualizer</h1>
          <p className="hero-subtitle">
            Join our community of developers and help make algorithm learning more accessible and engaging for everyone
          </p>
          <div className="repo-stats" data-aos="fade-up" data-aos-delay="200">
            <div className="stat-item">
              <span className="stat-icon">⭐</span>
              <span className="stat-value">{repoStats.stars}</span>
              <span className="stat-label">Stars</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🍴</span>
              <span className="stat-value">{repoStats.forks}</span>
              <span className="stat-label">Forks</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🐛</span>
              <span className="stat-value">{repoStats.issues}</span>
              <span className="stat-label">Issues</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">👥</span>
              <span className="stat-value">12+</span>
              <span className="stat-label">Contributors</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* What is AlgoVisualizer */}
      <motion.section 
        className="what-is-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="section-content">
          <h2 className="section-title" data-aos="fade-up">What is AlgoVisualizer?</h2>
          <div className="feature-grid">
            <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
              <div className="feature-icon">🎯</div>
              <h3>Interactive Learning</h3>
              <p>Visualize complex algorithms step-by-step with interactive animations and real-time controls.</p>
            </div>
            <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-icon">🚀</div>
              <h3>Educational Focus</h3>
              <p>Designed specifically for students, educators, and developers to understand algorithms better.</p>
            </div>
            <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
              <div className="feature-icon">🎨</div>
              <h3>Beautiful Interface</h3>
              <p>Modern, responsive design with smooth animations and intuitive user experience.</p>
            </div>
            <div className="feature-card" data-aos="fade-up" data-aos-delay="400">
              <div className="feature-icon">🔧</div>
              <h3>Open Source</h3>
              <p>Completely open source project welcoming contributions from developers worldwide.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Tech Stack */}
      <motion.section 
        className="tech-stack-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="section-content">
          <h2 className="section-title" data-aos="fade-up">Tech Stack</h2>
          <div className="tech-categories">
            {techStack.map((category, categoryIndex) => (
              <div key={category.category} className="tech-category" data-aos="fade-up" data-aos-delay={categoryIndex * 100}>
                <h3 className="category-title">{category.category}</h3>
                <div className="tech-grid">
                  {category.technologies.map((tech, techIndex) => (
                    <div key={tech.name} className="tech-card" data-aos="zoom-in" data-aos-delay={categoryIndex * 100 + techIndex * 50}>
                      <div className="tech-icon">{tech.icon}</div>
                      <div className="tech-info">
                        <h4 className="tech-name">{tech.name}</h4>
                        <p className="tech-description">{tech.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How to Contribute */}
      <motion.section 
        className="contribution-types-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="section-content">
          <h2 className="section-title" data-aos="fade-up">Ways to Contribute</h2>
          <div className="contribution-grid">
            {contributionTypes.map((type, index) => (
              <div key={type.title} className="contribution-card" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="card-header">
                  <h3 className="contribution-title">{type.title}</h3>
                  <span className={`difficulty-badge ${type.difficulty.toLowerCase()}`}>
                    {type.difficulty}
                  </span>
                </div>
                <p className="contribution-description">{type.description}</p>
                <div className="examples">
                  <h4>Examples:</h4>
                  <ul>
                    {type.examples.map((example, i) => (
                      <li key={i}>{example}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Getting Started Steps */}
      <motion.section 
        className="getting-started-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="section-content">
          <h2 className="section-title" data-aos="fade-up">Getting Started</h2>
          <div className="steps-container">
            {steps.map((step, index) => (
              <div key={step.step} className="step-card" data-aos="fade-right" data-aos-delay={index * 100}>
                <div className="step-number">{step.step}</div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                  {step.code && (
                    <div className="code-block">
                      <code>{step.code}</code>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* GitHub Repository Info */}
      <motion.section 
        className="repo-info-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="section-content">
          <h2 className="section-title" data-aos="fade-up">Repository</h2>
          <div className="repo-info" data-aos="fade-up" data-aos-delay="200">
            <div className="repo-header">
              <div className="repo-info-content">
                <div className="repo-icon">📁</div>
                <div>
                  <h3>RhythmPahwa14/AlgoVisualizer</h3>
                  <p>Interactive Algorithm Visualization Platform</p>
                </div>
              </div>
              <div className="repo-actions">
                <a 
                  href="https://github.com/RhythmPahwa14/AlgoVisualizer" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View on GitHub
                </a>
                <a 
                  href="https://github.com/RhythmPahwa14/AlgoVisualizer/fork" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  Fork Repository
                </a>
              </div>
            </div>
            <div className="repo-content">
              <p>AlgoVisualizer is an open-source project that helps students and developers understand algorithms through interactive visualizations. We welcome contributions from the community to make learning algorithms more accessible and engaging.</p>
              <div className="repo-stats-inline">
                <div className="stat-inline">
                  <span className="stat-label">Stars</span>
                  <span className="stat-value">{repoStats.stars}</span>
                </div>
                <div className="stat-inline">
                  <span className="stat-label">Forks</span>
                  <span className="stat-value">{repoStats.forks}</span>
                </div>
                <div className="stat-inline">
                  <span className="stat-label">Issues</span>
                  <span className="stat-value">{repoStats.issues}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="cta-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="cta-content" data-aos="fade-up">
          <h2>Ready to Contribute?</h2>
          <p>Join our community of passionate developers and help make algorithm learning better for everyone!</p>
          <div className="cta-buttons">
            <a 
              href="https://github.com/RhythmPahwa14/AlgoVisualizer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary btn-large"
            >
              Start Contributing
            </a>
            <a 
              href="https://github.com/RhythmPahwa14/AlgoVisualizer/issues" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary btn-large"
            >
              Browse Issues
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contribute;