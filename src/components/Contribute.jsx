import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  ArrowLeft,
  Star,
  GitFork,
  Bug,
  Users,
  Target,
  Rocket,
  Palette,
  Code2,
  Atom,
  Brackets,
  Globe,
  Paintbrush2,
  Zap,
  BarChart3,
  Search,
  Network,
  TreePine,
  GitBranch,
  Github,
  Monitor,
  Hexagon,
  Bug as BugIcon,
  Sparkles,
  BookOpen,
  Cpu,
  TestTube2,
  GitFork as ForkIcon,
  Download,
  Package,
  Play,
  Code,
  Upload,
  FolderGit2,
  Eye,
  Heart,
  MousePointer2,
  Layers3,
  Wrench,
} from "lucide-react";
import "../styles/theme.css";
import "../styles/Contribute.css";

const Contribute = () => {
  const navigate = useNavigate();
  const [repoStats, setRepoStats] = useState({
    stars: 0,
    forks: 0,
    issues: 0,
    contributors: 0,
  });

  useEffect(() => {
    AOS.init();

    // Fetch GitHub repository stats
    const fetchRepoStats = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/RhythmPahwa14/AlgoVisualizer"
        );
        if (response.ok) {
          const data = await response.json();
          setRepoStats({
            stars: data.stargazers_count || 0,
            forks: data.forks_count || 0,
            issues: data.open_issues_count || 0,
            contributors: 0, // Will be updated by contributors API
          });
        }
      } catch (error) {
        console.error("Error fetching repo stats:", error);
      }
    };

    fetchRepoStats();
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  const techStack = [
    {
      category: "Frontend",
      technologies: [
        {
          name: "React",
          icon: <div className="tech-logo">⚛️</div>,
          description: "UI Library for building interactive components",
        },
        {
          name: "JavaScript",
          icon: (
            <div
              className="tech-logo"
              style={{
                backgroundColor: "#F7DF1E",
                color: "#000",
                borderRadius: "4px",
                padding: "4px",
              }}
            >
              JS
            </div>
          ),
          description: "Core programming language",
        },
        {
          name: "HTML5",
          icon: (
            <div className="tech-logo" style={{ color: "#E34F26" }}>
              🌐
            </div>
          ),
          description: "Markup language for structure",
        },
        {
          name: "CSS3",
          icon: (
            <div className="tech-logo" style={{ color: "#1572B6" }}>
              🎨
            </div>
          ),
          description: "Styling and animations",
        },
        {
          name: "Framer Motion",
          icon: (
            <div className="tech-logo" style={{ color: "#BB6BD9" }}>
              🎭
            </div>
          ),
          description: "Animation library for React",
        },
      ],
    },
    {
      category: "Algorithms & Data Structures",
      technologies: [
        {
          name: "Sorting Algorithms",
          icon: <BarChart3 size={24} style={{ color: "#FF6B6B" }} />,
          description: "Bubble, Quick, Merge, Heap Sort visualizations",
        },
        {
          name: "Search Algorithms",
          icon: <Search size={24} style={{ color: "#4ECDC4" }} />,
          description: "Binary search, Linear search implementations",
        },
        {
          name: "Graph Algorithms",
          icon: <Network size={24} style={{ color: "#45B7D1" }} />,
          description: "BFS, DFS, Dijkstra, A* pathfinding",
        },
        {
          name: "Tree Structures",
          icon: <TreePine size={24} style={{ color: "#96CEB4" }} />,
          description: "Binary trees, BST, AVL tree visualizations",
        },
      ],
    },
    {
      category: "Development Tools",
      technologies: [
        {
          name: "Git",
          icon: (
            <div className="tech-logo" style={{ color: "#F05032" }}>
              🔧
            </div>
          ),
          description: "Version control system",
        },
        {
          name: "GitHub",
          icon: <Github size={24} style={{ color: "#181717" }} />,
          description: "Code hosting and collaboration",
        },
        {
          name: "VS Code",
          icon: (
            <div className="tech-logo" style={{ color: "#007ACC" }}>
              💻
            </div>
          ),
          description: "Recommended IDE",
        },
        {
          name: "Node.js",
          icon: (
            <div className="tech-logo" style={{ color: "#339933" }}>
              ⬢
            </div>
          ),
          description: "JavaScript runtime environment",
        },
      ],
    },
    {
      category: "Frameworks and Libraries",
      technologies: [
        {
          name: "Spring Boot",
          icon: (
            <div className="tech-logo" style={{ color: "#6DB33F" }}>
              🍃
            </div>
          ),
          description: "Java framework for backend development",
        },
        {
          name: "React",
          icon: (
            <div className="tech-logo" style={{ color: "#61DAFB" }}>
              ⚛️
            </div>
          ),
          description: "Frontend JavaScript library",
        },
        {
          name: "Node.js",
          icon: (
            <div className="tech-logo" style={{ color: "#339933" }}>
              ⬢
            </div>
          ),
          description: "JavaScript runtime environment",
        },
      ],
    },
    {
      category: "Databases",
      technologies: [
        {
          name: "MySQL",
          icon: (
            <div className="tech-logo" style={{ color: "#4479A1" }}>
              🐬
            </div>
          ),
          description: "Relational database management system",
        },
        {
          name: "MongoDB",
          icon: (
            <div className="tech-logo" style={{ color: "#47A248" }}>
              🍃
            </div>
          ),
          description: "NoSQL document database",
        },
      ],
    },
  ];

  const contributionTypes = [
    {
      title: (
        <div className="flex flex-row gap-5">
          <BugIcon size={40} className="inline mr-2" />

          Bug Fixes
        </div>
      ),
      description:
        "Help us identify and fix bugs in visualizations, UI components, or algorithm implementations.",
      difficulty: "Beginner",
      examples: [
        "Fix animation glitches",
        "Resolve responsive design issues",
        "Correct algorithm logic errors",
      ],
    },
    {
      title: (
        <div className="flex flex-row gap-5">
          <Sparkles size={40} className="inline mr-2" />
          New Features
        </div>
      ),
      description:
        "Add new algorithm visualizations, improve existing ones, or enhance user experience.",
      difficulty: "Intermediate",
      examples: [
        "New sorting algorithms",
        "Enhanced controls",
        "Mobile optimizations",
        "Dark mode improvements",
      ],
    },
    {
      title: (
        <div className="flex flex-row gap-5">
          <BookOpen size={40} className="inline mr-2" />
          Documentation
        </div>
      ),
      description:
        "Improve code comments, README files, or create tutorials for new contributors.",
      difficulty: "Beginner",
      examples: [
        "API documentation",
        "Setup guides",
        "Algorithm explanations",
        "Contributing guidelines",
      ],
    },
    {
      title: (
        <div className="flex flex-row gap-5">
          <Layers3 size={40} className="inline mr-2" />
          UI/UX Design
        </div>
      ),
      description:
        "Enhance the visual design, improve user interface, or create better user experiences.",
      difficulty: "Intermediate",
      examples: [
        "Design improvements",
        "Better animations",
        "Accessibility features",
        "Theme enhancements",
      ],
    },
    {
      title: (
        <div className="flex flex-row gap-5">
          <Cpu size={40} className="inline mr-2" />
          Performance
        </div>
      ),
      description:
        "Optimize algorithm performance, reduce bundle size, or improve rendering speed.",
      difficulty: "Advanced",
      examples: [
        "Code optimization",
        "Memory management",
        "Rendering performance",
        "Bundle analysis",
      ],
    },
    {
      title: (
        <div className="flex flex-row gap-5">
          <TestTube2 size={40} className="inline mr-2" />
          Testing
        </div>
      ),
      description:
        "Write unit tests, integration tests, or help with quality assurance.",
      difficulty: "Intermediate",
      examples: [
        "Unit tests",
        "Component testing",
        "E2E tests",
        "Cross-browser testing",
      ],
    },
  ];

  const steps = [
    {
      step: 1,
      title: (
        <div className="flex flex-row gap-5">
          <ForkIcon size={40} className="inline mr-2" />
          Fork the Repository
        </div>
      ),
      description:
        "Click the 'Fork' button on our GitHub repository to create your own copy.",
    },
    {
      step: 2,
      title: (
        <div className="flex flex-row gap-5">
          <Download size={40} className="inline mr-2" />
          Clone Your Fork
        </div>
      ),
      description:
        "Clone your forked repository to your local machine using Git.",
      code: "git clone https://github.com/rhythmpahwa14/AlgoVisualizer.git",
    },
    {
      step: 3,
      title: (
        <div className="flex flex-row gap-5">
          <Package size={40} className="inline mr-2" />
          Install Dependencies
        </div>
      ),
      description:
        "Navigate to the project directory and install required packages.",
      code: "cd AlgoVisualizer\nnpm install",
    },
    {
      step: 4,
      title: (
        <div className="flex flex-row gap-5">
          <Play size={40} className="inline mr-2" />
          Start Development
        </div>
      ),
      description: "Run the development server and start making your changes.",
      code: "npm start",
    },
    {
      step: 5,
      title: (
        <div className="flex flex-row gap-5">
          <Code size={40} className="inline mr-2" />
          Make Your Changes
        </div>
      ),
      description:
        "Create a new branch, make your improvements, and test thoroughly.",
    },
    {
      step: 6,
      title: (
        <div className="flex flex-row gap-5">
          <Upload size={40} className="inline mr-2" />
          Submit Pull Request
        </div>
      ),
      description:
        "Push your changes and create a pull request with a clear description.",
    },
  ];

  return (
    <div className="theme-container contribute-page">
      {/* Back Button */}
      <motion.button
        onClick={handleBackClick}
        className="back-button"
        style={{ marginTop: "3.5rem" }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={40} />
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
            Join our community of developers and help make algorithm learning
            more accessible and engaging for everyone
          </p>
          <div className="repo-stats" data-aos="fade-up" data-aos-delay="200">
            <div className="stat-item">
              <Star className="stat-icon" size={40} />
              <span className="stat-value">{repoStats.stars}</span>
              <span className="stat-label">Stars</span>
            </div>
            <div className="stat-item">
              <GitFork className="stat-icon" size={40} />
              <span className="stat-value">{repoStats.forks}</span>
              <span className="stat-label">Forks</span>
            </div>
            <div className="stat-item">
              <Bug className="stat-icon" size={40} />
              <span className="stat-value">{repoStats.issues}</span>
              <span className="stat-label">Issues</span>
            </div>
            <div className="stat-item">
              <Users className="stat-icon" size={40} />
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
          <h2 className="section-title" data-aos="fade-up" style={{padding:"20px",size:"90px"}}>What is AlgoVisualizer?</h2>
          <div className="feature-grid">
            <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
              <div className="feature-icon"><MousePointer2 size={32} /></div>
              <h3>Interactive Learning</h3>
              <p>Visualize complex algorithms step-by-step with interactive animations and real-time controls.</p>
            </div>
            <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-icon"><Heart size={32} /></div>
              <h3>Educational Focus</h3>
              <p>Designed specifically for students, educators, and developers to understand algorithms better.</p>
            </div>
            <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
              <div className="feature-icon"><Eye size={32} /></div>
              <h3>Beautiful Interface</h3>
              <p>Modern, responsive design with smooth animations and intuitive user experience.</p>
            </div>
            <div className="feature-card" data-aos="fade-up" data-aos-delay="400">
              <div className="feature-icon"><Code2 size={32} /></div>
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
          <h2 className="section-title" data-aos="fade-up">
            Tech Stack
          </h2>
          <div className="tech-categories">
            {techStack.map((category, categoryIndex) => (
              <div
                key={category.category}
                className="tech-category"
                data-aos="fade-up"
                data-aos-delay={categoryIndex * 100}
              >
                <h3 className="category-title">{category.category}</h3>
                <div className="tech-grid">
                  {category.technologies.map((tech, techIndex) => (
                    <div
                      key={tech.name}
                      className="tech-card"
                      data-aos="zoom-in"
                      data-aos-delay={categoryIndex * 100 + techIndex * 50}
                    >
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
          <h2 className="section-title" data-aos="fade-up">
            Ways to Contribute
          </h2>
          <div className="contribution-grid">
            {contributionTypes.map((type, index) => (
              <div
                key={type.title}
                className="contribution-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="card-header">
                  <h3 className="contribution-title">{type.title}</h3>
                  <span
                    className={`difficulty-badge ${type.difficulty.toLowerCase()}`}
                  >
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
          <h2 className="section-title" data-aos="fade-up">
            Getting Started
          </h2>
          <div className="steps-container">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="step-card"
                data-aos="fade-right"
                data-aos-delay={index * 100}
              >
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
          <h2 className="section-title" data-aos="fade-up">
            Repository
          </h2>
          <div className="repo-info" data-aos="fade-up" data-aos-delay="200">
            <div className="repo-header">
              <div className="repo-info-content">
                <div className="repo-icon">
                  <FolderGit2 size={32} />
                </div>
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
                  <Github size={16} />
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
              <p>
                AlgoVisualizer is an open-source project that helps students and
                developers understand algorithms through interactive
                visualizations. We welcome contributions from the community to
                make learning algorithms more accessible and engaging.
              </p>
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
          <p>
            Join our community of passionate developers and help make algorithm
            learning better for everyone!
          </p>
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
