import React from 'react';
import '../styles/ExportDemo.css';

const ExportDemo = () => {

    const exportFeatures = [
        {
            icon: "📸",
            title: "Instant Snapshots",
            description: "Capture the current state of any algorithm visualization with a single click. Perfect for highlighting key moments in algorithm execution.",
            features: ["High Quality PNG", "2x Resolution", "Instant Download"],
        }, {
            icon: "🎬",
            title: "Algorithm Recording",
            description: "Record complete algorithm executions as smooth animations. Choose between GIF and MP4 formats for different use cases.",
            features: ["Multiple Formats", "Custom Frame Rate", "Full Automation"],
        }, {
            icon: "⚙️",
            title: "Flexible Settings",
            description: "Customize your exports with various frame rates, quality settings, and format options to suit your specific needs.",
            features: ["1-8 FPS Options", "Quality Control", "Format Selection"],
        }, {
            icon: "📚",
            title: "Educational Use",
            description: "Perfect for teachers, students, and content creators. Share algorithm concepts through engaging visual content.",
            features: ["Presentations", "Social Media", "Documentation"],
        },
    ];

    const howTo = [
        {
            heading: "Setup Your Visualization",
            instruction: "Choose your algorithm, adjust array size and speed settings to your preference.",
        }, {
            heading: "Access Export Control",
            instruction: "Click the \"📹 Export\" button to open the export panel with all available options.",
        }, {
            heading: "Configure Settings",
            instruction: "Select your preferred format (GIF/MP4) and frame rate (1-8 FPS) based on your needs.",
        }, {
            heading: "Record or Capture",
            instruction: "Start recording before running your algorithm, or take instant snapshots anytime.",
        },
    ];

    return (
        <div className="export-demo">
            <h2>🎥 Export Features Demo</h2>

            <div className="demo-grid">
                {exportFeatures.map((item, index) => (
                    <div className="demo-card" key={index}>
                        <div className="demo-icon">{item.icon}</div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <div className="demo-features">
                            {item.features.map((feature, i) => (
                                <span className="feature-tag" key={i} >{feature}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="usage-steps">
                <h3>How to Use Export Features</h3>
                <div className="steps-container">

                    {howTo.map((item, index) => (
                        <div className="step">
                            <div className="step-number">{index + 1}</div>
                            <div className="step-content">
                                <h4>{item.heading}</h4>
                                <p>{item.instruction}</p>
                            </div>
                        </div>
                    ))}
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
