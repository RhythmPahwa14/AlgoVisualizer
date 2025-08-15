import React from 'react';
import '../styles/ExportDemo.css';

const ExportDemo = () => {
    return (
        <div className="export-demo">
            <h2>🎥 Export Features Demo</h2>
            
            <div className="demo-grid">
                <div className="demo-card">
                    <div className="demo-icon">📸</div>
                    <h3>Instant Snapshots</h3>
                    <p>Capture the current state of any algorithm visualization with a single click. Perfect for highlighting key moments in algorithm execution.</p>
                    <div className="demo-features">
                        <span className="feature-tag">High Quality PNG</span>
                        <span className="feature-tag">2x Resolution</span>
                        <span className="feature-tag">Instant Download</span>
                    </div>
                </div>

                <div className="demo-card">
                    <div className="demo-icon">🎬</div>
                    <h3>Algorithm Recording</h3>
                    <p>Record complete algorithm executions as smooth animations. Choose between GIF and MP4 formats for different use cases.</p>
                    <div className="demo-features">
                        <span className="feature-tag">Multiple Formats</span>
                        <span className="feature-tag">Custom Frame Rate</span>
                        <span className="feature-tag">Full Automation</span>
                    </div>
                </div>

                <div className="demo-card">
                    <div className="demo-icon">⚙️</div>
                    <h3>Flexible Settings</h3>
                    <p>Customize your exports with various frame rates, quality settings, and format options to suit your specific needs.</p>
                    <div className="demo-features">
                        <span className="feature-tag">1-8 FPS Options</span>
                        <span className="feature-tag">Quality Control</span>
                        <span className="feature-tag">Format Selection</span>
                    </div>
                </div>

                <div className="demo-card">
                    <div className="demo-icon">📚</div>
                    <h3>Educational Use</h3>
                    <p>Perfect for teachers, students, and content creators. Share algorithm concepts through engaging visual content.</p>
                    <div className="demo-features">
                        <span className="feature-tag">Presentations</span>
                        <span className="feature-tag">Social Media</span>
                        <span className="feature-tag">Documentation</span>
                    </div>
                </div>
            </div>

            <div className="usage-steps">
                <h3>How to Use Export Features</h3>
                <div className="steps-container">
                    <div className="step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                            <h4>Setup Your Visualization</h4>
                            <p>Choose your algorithm, adjust array size and speed settings to your preference.</p>
                        </div>
                    </div>
                    
                    <div className="step">
                        <div className="step-number">2</div>
                        <div className="step-content">
                            <h4>Access Export Controls</h4>
                            <p>Click the "📹 Export" button to open the export panel with all available options.</p>
                        </div>
                    </div>
                    
                    <div className="step">
                        <div className="step-number">3</div>
                        <div className="step-content">
                            <h4>Configure Settings</h4>
                            <p>Select your preferred format (GIF/MP4) and frame rate (1-8 FPS) based on your needs.</p>
                        </div>
                    </div>
                    
                    <div className="step">
                        <div className="step-number">4</div>
                        <div className="step-content">
                            <h4>Record or Capture</h4>
                            <p>Start recording before running your algorithm, or take instant snapshots anytime.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="export-tips">
                <h3>💡 Pro Tips</h3>
                <ul>
                    <li><strong>Best Quality:</strong> Use 4-8 FPS for smooth animations in presentations</li>
                    <li><strong>File Size:</strong> Lower frame rates create smaller files for web sharing</li>
                    <li><strong>Format Choice:</strong> GIF for web/social media, MP4 for presentations</li>
                    <li><strong>Performance:</strong> Close other tabs while recording for best results</li>
                    <li><strong>Array Size:</strong> Smaller arrays (15-25 elements) work best for recordings</li>
                </ul>
            </div>
        </div>
    );
};

export default ExportDemo;
