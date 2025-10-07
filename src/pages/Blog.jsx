import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  Tag,
  ArrowRight,
  BookOpen,
  Code,
  TrendingUp,
  Zap,
  Target,
  Search,
  ExternalLink,
  Image as ImageIcon,
} from "lucide-react";
import { useTheme } from "../ThemeContext";
import "../styles/blog.css";
// Import the blog posts data
import blogPostsData from "../data/blogPosts.json";

// 🎯 Debug logging helper
const logDebug = (message, data = null) => {
  console.log(`📝 BlogDebug: ${message}`, data ? data : '');
};

// 🎯 Performance monitoring helper
const trackPerformance = (operation, startTime) => {
  const duration = performance.now() - startTime;
  logDebug(`⏱️ ${operation} Performance`, { duration: `${duration.toFixed(2)}ms` });
  return duration;
};

const Blog = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    searchOperations: 0,
    filterOperations: 0,
    pageLoadTime: null,
    interactions: 0
  });

  // 🎯 Component lifecycle logging
  useEffect(() => {
    const loadStartTime = performance.now();
    logDebug('🚀 Blog component mounted', { theme, initialCategory: selectedCategory });

    // Simulate loading delay for demonstration
    const loadTimer = setTimeout(() => {
      setBlogPosts(blogPostsData);
      setIsLoading(false);
      
      const loadDuration = performance.now() - loadStartTime;
      setPerformanceMetrics(prev => ({
        ...prev,
        pageLoadTime: loadDuration
      }));
      
      logDebug('✅ Blog posts loaded', {
        postCount: blogPostsData.length,
        loadTime: `${loadDuration.toFixed(2)}ms`,
        featuredCount: blogPostsData.filter(post => post.featured).length
      });
    }, 300);

    return () => {
      clearTimeout(loadTimer);
      logDebug('🧹 Blog component unmounting', {
        totalInteractions: performanceMetrics.interactions,
        totalSearches: performanceMetrics.searchOperations
      });
    };
  }, []);

  // 🎯 Performance-optimized search and filter
  const filterPosts = useCallback((posts, category, search) => {
    const filterStartTime = performance.now();
    
    const filtered = posts.filter((post) => {
      const matchesCategory = category === "All" || post.category === category;
      
      if (!matchesCategory) return false;
      if (!search) return true;
      
      const searchLower = search.toLowerCase();
      return (
        post.title.toLowerCase().includes(searchLower) ||
        post.description.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    });

    const filterDuration = trackPerformance('Filter Operation', filterStartTime);
    
    setPerformanceMetrics(prev => ({
      ...prev,
      filterOperations: prev.filterOperations + 1
    }));

    logDebug('🔍 Posts filtered', {
      category,
      searchTerm: search,
      inputCount: posts.length,
      outputCount: filtered.length,
      filterTime: `${filterDuration.toFixed(2)}ms`
    });

    return filtered;
  }, []);

  const categories = [
    "All",
    "Theory",
    "Sorting",
    "Graphs",
    "Data Structures",
    "Search",
    "Optimization",
  ];

  // 🎯 Memoized filtered posts
  const filteredPosts = filterPosts(blogPosts, selectedCategory, searchTerm);
  const featuredPosts = blogPosts.filter((post) => post.featured);

  // 🎯 Search handler with debouncing and logging
  const handleSearch = useCallback((term) => {
    const searchStartTime = performance.now();
    setSearchTerm(term);
    
    setPerformanceMetrics(prev => ({
      ...prev,
      searchOperations: prev.searchOperations + 1,
      interactions: prev.interactions + 1
    }));

    logDebug('🔎 Search performed', {
      term,
      termLength: term.length,
      hasResults: filterPosts(blogPosts, selectedCategory, term).length > 0
    });

    trackPerformance('Search Operation', searchStartTime);
  }, [blogPosts, selectedCategory, filterPosts]);

  // 🎯 Category selection handler with logging
  const handleCategorySelect = useCallback((category) => {
    const previousCategory = selectedCategory;
    setSelectedCategory(category);
    
    setPerformanceMetrics(prev => ({
      ...prev,
      interactions: prev.interactions + 1
    }));

    logDebug('🎯 Category selected', {
      previous: previousCategory,
      new: category,
      postCount: filterPosts(blogPosts, category, searchTerm).length
    });
  }, [selectedCategory, blogPosts, searchTerm, filterPosts]);

  // 🎯 Keyboard navigation support
  const handleKeyDown = (event, action, value) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (action === 'category') {
        handleCategorySelect(value);
      } else if (action === 'search') {
        // Focus stays on search input
      }
    }
  };

  // 🎯 Post interaction tracking
  const trackPostInteraction = (postId, action) => {
    logDebug('👆 Post interaction', {
      postId,
      action,
      title: blogPosts.find(p => p.id === postId)?.title
    });
    
    setPerformanceMetrics(prev => ({
      ...prev,
      interactions: prev.interactions + 1
    }));
  };

  return (
    <div 
      className="theme-container"
      role="main"
      aria-label="Algorithm Insights Blog"
    >
      {/* 🎯 Loading State */}
      {isLoading && (
        <div 
          className="theme-card loading-card"
          role="status"
          aria-label="Loading blog posts"
        >
          <div className="loading-spinner"></div>
          <p>Loading blog posts...</p>
        </div>
      )}

      {/* Header Section */}
      <header className="blog-header" role="banner">
        <div className="blog-hero">
          <div className="hero-content">
            <h1 className="theme-title">
              <BookOpen className="title-icon" aria-hidden="true" />
              Algorithm Insights Blog
            </h1>
            <p className="hero-description">
              Explore the fascinating world of algorithms, data structures, and
              computational thinking. From beginner tutorials to advanced
              concepts, dive deep into the theory and practice of computer
              science fundamentals.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">{blogPosts.length}</span>
                <span className="stat-label">Articles</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">6</span>
                <span className="stat-label">Categories</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Readers</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 🎯 Performance Metrics (Debug View) */}
      {process.env.NODE_ENV === 'development' && !isLoading && (
        <div 
          className="performance-debug"
          role="complementary"
          aria-label="Performance Statistics"
        >
          <strong>📊 Debug Stats:</strong> {performanceMetrics.searchOperations} searches •{' '}
          {performanceMetrics.filterOperations} filters • {performanceMetrics.interactions} interactions
          {performanceMetrics.pageLoadTime && (
            ` • Loaded in ${performanceMetrics.pageLoadTime.toFixed(2)}ms`
          )}
        </div>
      )}

      {/* Featured Posts Section */}
      {!isLoading && featuredPosts.length > 0 && (
        <section 
          className="featured-section"
          aria-labelledby="featured-posts-title"
        >
          <h2 id="featured-posts-title" className="section-title">
            <Zap size={24} aria-hidden="true" />
            Featured Articles
          </h2>
          <div className="featured-grid">
            {featuredPosts.map((post) => (
              <article 
                key={post.id} 
                className="theme-card featured-card"
                aria-labelledby={`featured-${post.id}-title`}
              >
                <div className="featured-badge">
                  <Target size={16} aria-hidden="true" />
                  Featured
                </div>
                <div className="post-meta">
                  <span className="post-category">{post.category}</span>
                  <span className="post-date">
                    <Calendar size={14} aria-hidden="true" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>
                <h3 id={`featured-${post.id}-title`} className="post-title">{post.title}</h3>
                <p className="post-excerpt">{post.description}</p>
                <div className="post-footer">
                  <div className="post-info">
                    <span className="post-author">
                      <User size={14} aria-hidden="true" />
                      {post.author}
                    </span>
                    <span className="post-read-time">
                      <Clock size={14} aria-hidden="true" />
                      {post.readTime}
                    </span>
                  </div>
                  {/* Link button if available */}
                  {post.link ? (
                    <a 
                      href={post.link} 
                      className="btn btn-primary read-more-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackPostInteraction(post.id, 'featured_read_more')}
                      aria-label={`Read more about ${post.title} (opens in new tab)`}
                    >
                      Read More
                      <ExternalLink size={16} aria-hidden="true" />
                    </a>
                  ) : (
                    <button 
                      className="btn btn-primary read-more-btn"
                      onClick={() => trackPostInteraction(post.id, 'featured_read_more')}
                      aria-label={`Read more about ${post.title}`}
                    >
                      Read More
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Search and Filter Section */}
      {!isLoading && (
        <section 
          className="filters-section"
          aria-labelledby="filters-title"
        >
          <h2 id="filters-title" className="visually-hidden">Search and Filter Articles</h2>
          
          <div className="search-bar">
            <Search className="search-icon" size={20} aria-hidden="true" />
            <input
              type="text"
              className="form-control"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, 'search')}
              aria-label="Search blog articles"
            />
          </div>

          <div 
            className="category-filters"
            role="toolbar"
            aria-label="Filter articles by category"
          >
            {categories.map((category) => (
              <button
                key={category}
                className={`btn ${
                  selectedCategory === category ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => handleCategorySelect(category)}
                onKeyDown={(e) => handleKeyDown(e, 'category', category)}
                aria-pressed={selectedCategory === category}
                aria-label={`Filter by ${category} category`}
              >
                {category}
                <span className="count-badge">
                  {category === "All"
                    ? blogPosts.length
                    : blogPosts.filter((post) => post.category === category)
                        .length}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      {!isLoading && (
        <section 
          className="blog-posts-section"
          aria-labelledby="latest-posts-title"
        >
          <h2 id="latest-posts-title" className="section-title">
            <TrendingUp size={24} aria-hidden="true" />
            Latest Articles
          </h2>

          {filteredPosts.length === 0 ? (
            <div 
              className="theme-card no-results-card"
              role="status"
              aria-label="No articles found"
            >
              <BookOpen size={48} aria-hidden="true" />
              <h3>No articles found</h3>
              <p>Try adjusting your search terms or category filters.</p>
            </div>
          ) : (
            <div 
              className="blog-cards-grid"
              role="list"
              aria-label="List of blog articles"
            >
              {filteredPosts.map((post) => (
                <article 
                  key={post.id} 
                  className="blog-card"
                  role="listitem"
                  aria-labelledby={`post-${post.id}-title`}
                >
                  <div className="blog-card-header">
                    <div className="blog-card-category">
                      <Code size={16} aria-hidden="true" />
                      {post.category}
                    </div>
                    <div className="blog-card-date">
                      <Calendar size={14} aria-hidden="true" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="blog-card-content">
                    <h3 id={`post-${post.id}-title`} className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-excerpt">{post.description}</p>

                    <div className="blog-card-tags">
                      {post.tags.map((tag) => (
                        <span key={tag} className="blog-tag">
                          <Tag size={12} aria-hidden="true" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="blog-card-footer">
                    <div className="blog-card-meta">
                      <span className="blog-card-author">
                        <User size={14} aria-hidden="true" />
                        {post.author}
                      </span>
                      <span className="blog-card-read-time">
                        <Clock size={14} aria-hidden="true" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    {/* Link button if available */}
                    {post.link ? (
                      <a 
                        href={post.link} 
                        className="blog-card-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackPostInteraction(post.id, 'read_more')}
                        aria-label={`Read more about ${post.title} (opens in new tab)`}
                      >
                        Read More
                        <ExternalLink size={16} aria-hidden="true" />
                      </a>
                    ) : (
                      <button 
                        className="blog-card-btn"
                        onClick={() => trackPostInteraction(post.id, 'read_more')}
                        aria-label={`Read more about ${post.title}`}
                      >
                        Read More
                        <ArrowRight size={16} aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Newsletter Subscription */}
      {!isLoading && (
        <section 
          className="newsletter-section"
          aria-labelledby="newsletter-title"
        >
          <div className="theme-card newsletter-card">
            <div className="newsletter-content">
              <h3 id="newsletter-title">Stay Updated</h3>
              <p>
                Get the latest algorithm insights and tutorials delivered to your
                inbox.
              </p>
              <div className="newsletter-form">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email address"
                  aria-label="Email address for newsletter subscription"
                />
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    logDebug('📧 Newsletter subscription attempted');
                    setPerformanceMetrics(prev => ({
                      ...prev,
                      interactions: prev.interactions + 1
                    }));
                  }}
                >
                  Subscribe
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 🎯 Accessibility Helper */}
      <div 
        className="accessibility-helper"
        role="complementary"
        aria-label="Accessibility Information"
      >
        <strong>♿ Accessibility:</strong> Use Tab to navigate, Space/Enter to select. 
        Search and filter articles using the tools above.
      </div>
    </div>
  );
};

export default Blog;
