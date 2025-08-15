import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ExportDemo from '../components/ExportDemo';
import Contributors from '../components/Contributors';
import '../styles/home.css';

export default function Home() {
    const [typedText, setTypedText] = useState('');
    const [currentAlgorithm, setCurrentAlgorithm] = useState(0);
    
    const algorithms = [
        'Bubble Sort', 'Quick Sort', 'Merge Sort', 'Binary Search', 
        'Linear Search', 'Linked Lists', 'Hash Tables', 'Graph Traversal'
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
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-badge">
                        <span>🚀 Interactive Learning Platform</span>
                    </div>
                    <h1 className="hero-title">
                        Algo<span className="highlight">Visualizer</span>
                    </h1>
                    <p className="hero-subtitle">
                        {typedText}<span className="cursor">|</span>
                    </p>
                    <p className="hero-description">
                        Transform abstract algorithms into beautiful, interactive visualizations. 
                        Perfect for students, developers, and anyone curious about how algorithms work.
                    </p>
                    
                    <div className="hero-actions">
                        <Link to="/sorting" className="cta-primary">
                            <span>🎯</span> Start Learning
                        </Link>
                        <Link to="/data-structures" className="cta-secondary">
                            <span>📚</span> Explore More
                        </Link>
                    </div>

                    <div className="algorithm-showcase">
                        <span className="showcase-label">Currently visualizing:</span>
                        <span className="showcase-algorithm">{algorithms[currentAlgorithm]}</span>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="floating-bars">
                        {[120, 80, 160, 40, 200, 100, 180, 60].map((height, index) => (
                            <div 
                                key={index}
                                className="bar"
                                style={{
                                    height: `${height}px`,
                                    animationDelay: `${index * 0.2}s`
                                }}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Start Cards */}
            <section className="quick-start-section">
                <h2 className="section-title">Choose Your Learning Path</h2>
                <div className="quick-start-grid">
                    <Link to="/sorting" className="quick-card sorting">
                        <div className="card-header">
                            <div className="card-icon">🔄</div>
                            <div className="card-stats">
                                <span className="stat-number">5</span>
                                <span className="stat-label">Algorithms</span>
                            </div>
                        </div>
                        <h3 className="card-title">Sorting Algorithms</h3>
                        <p className="card-description">
                            Watch how Bubble Sort, Quick Sort, Merge Sort, Selection Sort, and Insertion Sort organize data step by step.
                        </p>
                        <div className="card-features">
                            <span className="feature-tag">Interactive</span>
                            <span className="feature-tag">Real-time</span>
                            <span className="feature-tag">Statistics</span>
                        </div>
                        <div className="card-action">
                            Start Sorting <span>→</span>
                        </div>
                    </Link>

                    <Link to="/searching" className="quick-card searching">
                        <div className="card-header">
                            <div className="card-icon">🔍</div>
                            <div className="card-stats">
                                <span className="stat-number">4</span>
                                <span className="stat-label">Algorithms</span>
                            </div>
                        </div>
                        <h3 className="card-title">Search Algorithms</h3>
                        <p className="card-description">
                            Discover how Binary Search, Linear Search, Jump Search, and Exponential Search find elements efficiently.
                        </p>
                        <div className="card-features">
                            <span className="feature-tag">Fast</span>
                            <span className="feature-tag">Efficient</span>
                            <span className="feature-tag">Comparative</span>
                        </div>
                        <div className="card-action">
                            Start Searching <span>→</span>
                        </div>
                    </Link>

                    <Link to="/data-structures" className="quick-card structures">
                        <div className="card-header">
                            <div className="card-icon">🏗️</div>
                            <div className="card-stats">
                                <span className="stat-number">4</span>
                                <span className="stat-label">Structures</span>
                            </div>
                        </div>
                        <h3 className="card-title">Data Structures</h3>
                        <p className="card-description">
                            Explore Linked Lists, Stacks, Queues, and Binary Trees with interactive visualizations and operations.
                        </p>
                        <div className="card-features">
                            <span className="feature-tag">Dynamic</span>
                            <span className="feature-tag">Visual</span>
                            <span className="feature-tag">Hands-on</span>
                        </div>
                        <div className="card-action">
                            Explore Structures <span>→</span>
                        </div>
                    </Link>

                    <Link to="/documentation" className="quick-card documentation">
                        <div className="card-header">
                            <div className="card-icon">📚</div>
                            <div className="card-stats">
                                <span className="stat-number">13</span>
                                <span className="stat-label">References</span>
                            </div>
                        </div>
                        <h3 className="card-title">Algorithm Reference</h3>
                        <p className="card-description">
                            Complete documentation with complexity analysis, use cases, and implementation details for all algorithms.
                        </p>
                        <div className="card-features">
                            <span className="feature-tag">Comprehensive</span>
                            <span className="feature-tag">Detailed</span>
                            <span className="feature-tag">Searchable</span>
                        </div>
                        <div className="card-action">
                            Browse Docs <span>→</span>
                        </div>
                    </Link>
                </div>
            </section>

            {/* Features Showcase */}
            <section className="features-showcase">
                <div className="features-header">
                    <h2 className="section-title">Why Choose AlgoVisualizer?</h2>
                    <p className="section-subtitle">
                        Everything you need to master algorithms and data structures
                    </p>
                </div>

                <div className="features-grid">
                    <div className="feature-item">
                        <div className="feature-icon">
                            <div className="icon-bg">⚡</div>
                        </div>
                        <h3>Real-time Visualization</h3>
                        <p>Watch algorithms execute step-by-step with smooth animations and instant feedback.</p>
                    </div>

                    <div className="feature-item">
                        <div className="feature-icon">
                            <div className="icon-bg">🎯</div>
                        </div>
                        <h3>Interactive Controls</h3>
                        <p>Pause, resume, adjust speed, and customize input data to explore different scenarios.</p>
                    </div>

                    <div className="feature-item">
                        <div className="feature-icon">
                            <div className="icon-bg">📊</div>
                        </div>
                        <h3>Performance Metrics</h3>
                        <p>Track comparisons, swaps, and execution time to understand algorithm efficiency.</p>
                    </div>

                    <div className="feature-item">
                        <div className="feature-icon">
                            <div className="icon-bg">🧠</div>
                        </div>
                        <h3>Deep Learning</h3>
                        <p>Comprehensive complexity analysis and detailed explanations for every algorithm.</p>
                    </div>

                    <div className="feature-item">
                        <div className="feature-icon">
                            <div className="icon-bg">📱</div>
                        </div>
                        <h3>Mobile Friendly</h3>
                        <p>Responsive design that works perfectly on desktop, tablet, and mobile devices.</p>
                    </div>

                    <div className="feature-item">
                        <div className="feature-icon">
                            <div className="icon-bg">🆓</div>
                        </div>
                        <h3>Completely Free</h3>
                        <p>Open source platform with no subscriptions, ads, or hidden costs. Learn without limits.</p>
                    </div>
                </div>
            </section>

            {/* Export Features Section */}
            <section className="export-features-section">
                <ExportDemo />
            </section>

            {/* Statistics Section */}
            <section className="stats-section">
                <div className="stats-container">
                    <div className="stat-card">
                        <div className="stat-number">15+</div>
                        <div className="stat-label">Algorithms</div>
                        <div className="stat-description">Sorting, searching, and data structure algorithms</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">100%</div>
                        <div className="stat-label">Interactive</div>
                        <div className="stat-description">Every algorithm includes hands-on visualization</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">∞</div>
                        <div className="stat-label">Learning</div>
                        <div className="stat-description">Unlimited practice with customizable inputs</div>
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
                        Join thousands of learners who've transformed their understanding of computer science 
                        through interactive visualization. Start your journey today!
                    </p>
                    <div className="cta-buttons">
                        <Link to="/sorting" className="cta-primary">
                            <span>🚀</span> Begin Learning
                        </Link>
                        <a 
                            href="https://github.com/RhythmPahwa14/AlgoVisualizer" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="cta-secondary"
                        >
                            <span>⭐</span> Star on GitHub
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}