import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Code, Search, BarChart3, GitBranch, Users, Trophy, ArrowRight, Sparkles, BookOpen, Target, Clock, Star } from 'lucide-react';
import '../styles/home.css';

const Home = () => {
  const [animatedBars, setAnimatedBars] = useState([30, 70, 45, 90, 20, 65]);

  // Animate sorting bars
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedBars(prev => [...prev].sort(() => Math.random() - 0.5));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: BarChart3,
      title: "Sorting Algorithms",
      path: "/sorting",
      description: "Visualize 12+ sorting algorithms including Bubble Sort, Quick Sort, Merge Sort, and Heap Sort in real-time",
      gradient: "from-pink-500 to-rose-500",
      algorithms: "12+ Algorithms",
      difficulty: "Beginner to Advanced"
    },
    {
      icon: Search,
      title: "Search Algorithms",
      path: "/searching", 
      description: "Master search techniques with Binary Search, Linear Search, Jump Search, and Exponential Search visualizations",
      gradient: "from-blue-500 to-cyan-500",
      algorithms: "8+ Algorithms",
      difficulty: "Easy to Intermediate"
    },
    {
      icon: GitBranch,
      title: "Data Structures",
      path: "/data-structures",
      description: "Explore complex data structures like Binary Trees, Linked Lists, Stacks, Queues, and Graph representations",
      gradient: "from-purple-500 to-indigo-500",
      algorithms: "15+ Structures",
      difficulty: "Intermediate to Expert"
    }
  ];

  const learningPaths = [
    {
      title: "Complete Beginner",
      description: "Start with basic sorting and searching algorithms",
      duration: "2-3 weeks",
      topics: ["Bubble Sort", "Linear Search", "Basic Arrays"]
    },
    {
      title: "Intermediate Developer", 
      description: "Dive into advanced algorithms and data structures",
      duration: "4-6 weeks",
      topics: ["Quick Sort", "Binary Search", "Trees & Graphs"]
    },
    {
      title: "Algorithm Expert",
      description: "Master complex algorithms and optimization techniques",
      duration: "8-12 weeks", 
      topics: ["Dynamic Programming", "Graph Algorithms", "Advanced Trees"]
    }
  ];

  const recentUpdates = [
    {
      type: "new",
      title: "Quick Sort visualization enhanced",
      description: "Added step-by-step breakdown with complexity analysis",
      time: "2 hours ago"
    },
    {
      type: "update",
      title: "Binary Search Tree improvements",
      description: "Better visual representation and insertion animation",
      time: "1 day ago"
    },
    {
      type: "feature",
      title: "Algorithm complexity comparison tool",
      description: "Compare time and space complexity across algorithms",
      time: "3 days ago"
    },
    {
      type: "community",
      title: "50+ new contributors joined",
      description: "Growing open-source community contributions",
      time: "1 week ago"
    }
  ];

  return (
    <div className="home-dashboard">
      {/* Main Dashboard Container */}
      <div className="dashboard-grid">
        
        {/* Hero Card - Main content area */}
        <div className="hero-card">
          <div className="hero-glow"></div>
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={14} />
              <span>Interactive Algorithm Learning Platform</span>
            </div>
            
            <h1 className="hero-title">
              Master Algorithms Through 
              <span className="gradient-text">Visual Learning</span>
            </h1>
            
            <p className="hero-subtitle">
              Transform complex computer science concepts into beautiful, interactive experiences. 
              Learn algorithms the way they were meant to be understood - visually and intuitively.
            </p>
            
            <div className="hero-features">
              <div className="feature-highlight">
                <Clock size={16} />
                <span>Real-time Visualization</span>
              </div>
              <div className="feature-highlight">
                <BookOpen size={16} />
                <span>Step-by-step Learning</span>
              </div>
              <div className="feature-highlight">
                <Target size={16} />
                <span>Interactive Practice</span>
              </div>
            </div>
            
            <div className="hero-actions">
              <Link to="/sorting" className="btn-primary-new">
                <Play size={16} />
                Start Learning Now
              </Link>
              <Link to="/quiz" className="btn-secondary-new">
                <Trophy size={16} />
                Test Your Knowledge
              </Link>
            </div>
          </div>
          
          {/* Live Demo Area */}
          <div className="demo-container">
            <div className="demo-header">
              <span className="demo-title">Live Algorithm Demo</span>
              <div className="demo-indicator">
                <div className="pulse-dot"></div>
                <span>Bubble Sort Running</span>
              </div>
            </div>
            
            <div className="demo-content">
              <div className="animated-bars">
                {animatedBars.map((height, index) => (
                  <div 
                    key={index}
                    className="demo-bar"
                    style={{
                      height: `${height}%`,
                      background: `linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)`,
                      animationDelay: `${index * 0.1}s`
                    }}
                  />
                ))}
              </div>
              <div className="demo-stats">
                <div className="demo-stat">
                  <span className="stat-label">Comparisons:</span>
                  <span className="stat-value">24</span>
                </div>
                <div className="demo-stat">
                  <span className="stat-label">Swaps:</span>
                  <span className="stat-value">12</span>
                </div>
              </div>
              <div className="demo-label">Watch algorithms come to life with real-time statistics</div>
            </div>
          </div>
        </div>

        {/* Feature Cards with detailed content */}
        {features.map((feature, index) => (
          <Link 
            key={index}
            to={feature.path}
            className="feature-card"
          >
            <div className="feature-header">
              <div className={`feature-icon bg-gradient-to-br ${feature.gradient}`}>
                <feature.icon size={24} />
              </div>
              <div className="feature-meta">
                <span className="algorithm-count">{feature.algorithms}</span>
                <span className="difficulty-level">{feature.difficulty}</span>
              </div>
            </div>
            
            <div className="feature-content">
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
              
              <div className="feature-highlights">
                <div className="highlight-item">
                  <div className="highlight-dot"></div>
                  <span>Interactive Visualization</span>
                </div>
                <div className="highlight-item">
                  <div className="highlight-dot"></div>
                  <span>Code Examples</span>
                </div>
                <div className="highlight-item">
                  <div className="highlight-dot"></div>
                  <span>Complexity Analysis</span>
                </div>
              </div>
            </div>
            
            <div className="feature-footer">
              <span className="feature-cta">Explore Now</span>
              <div className="feature-arrow">
                <ArrowRight size={16} />
              </div>
            </div>
            
            <div className="feature-glow"></div>
          </Link>
        ))}

        {/* Learning Paths */}
        <div className="learning-paths">
          <h3 className="section-title">Learning Paths</h3>
          <div className="paths-container">
            {learningPaths.map((path, index) => (
              <div key={index} className="path-item">
                <div className="path-header">
                  <h4 className="path-title">{path.title}</h4>
                  <span className="path-duration">{path.duration}</span>
                </div>
                <p className="path-description">{path.description}</p>
                <div className="path-topics">
                  {path.topics.map((topic, topicIndex) => (
                    <span key={topicIndex} className="topic-tag">{topic}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Activity Feed */}
        <div className="activity-feed">
          <h3 className="activity-title">Recent Updates</h3>
          <div className="activity-items">
            {recentUpdates.map((update, index) => (
              <div key={index} className="activity-item">
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
