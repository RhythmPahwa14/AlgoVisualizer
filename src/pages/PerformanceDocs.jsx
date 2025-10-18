import React from 'react';
import { Link } from 'react-router-dom';

const boxStyle = {
  background: 'var(--surface)',
  color: 'var(--text)',
  borderRadius: '0.5rem',
  padding: '1.5rem',
  marginBottom: '2rem',
  border: '1px solid var(--border-color, #e0e0e0)',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02)',
};

const sectionTitle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
  color: 'var(--text)',
};

const subheading = {
  fontSize: '1.25rem',
  fontWeight: 'bold',
  marginBottom: '0.75rem',
  color: 'var(--text)',
};

const paragraph = {
  color: 'var(--muted)',
  marginBottom: '1rem',
};

const listStyle = {
  listStyleType: 'disc',
  paddingLeft: '1.25rem',
  color: 'var(--muted)',
  marginBottom: '1rem',
};

const PerformanceDocs = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-4xl p-6"> 
        {/* --- CHANGES START HERE for the H1 heading --- */}
        <h1 
          className="font-extrabold text-5xl md:text-6xl lg:text-7xl mb-10 text-center" // Tailwind classes for large, responsive font, extra bold, and centered text
          style={{ 
            color: 'var(--primary, #007bff)', // Use primary color, or a strong blue default
            letterSpacing: '-0.025em', // Slightly tighten letter spacing
            lineHeight: '1.1', // Adjust line height
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle text shadow for depth
            // You could also add a gradient here if you want:
            // background: 'linear-gradient(45deg, var(--primary), var(--secondary, #6f42c1))',
            // WebkitBackgroundClip: 'text',
            // WebkitTextFillColor: 'transparent',
          }}
        >
          Performance Analysis Documentation
        </h1>
        {/* --- CHANGES END HERE --- */}

        {/* What is Performance Analysis */}
        <div style={boxStyle}>
          <h2 style={sectionTitle}>What is Performance Analysis?</h2>
          <p style={paragraph}>
            The Performance Analysis feature in AlgoVisualizer allows you to empirically measure and visualize 
            the actual runtime performance of algorithms with different input sizes. This bridges the gap between 
            theoretical Big O notation and real-world performance characteristics.
          </p>

          <h3 style={subheading}>Key Features</h3>
          <ul style={listStyle}>
            <li>Real-time execution time measurement</li>
            <li>Performance visualization with interactive charts</li>
            <li>Comparison of different algorithms</li>
            <li>Analysis with various data types (random, sorted, reverse, nearly sorted)</li>
            <li>Customizable input sizes for detailed analysis</li>
          </ul>
        </div>

        {/* How to Use */}
        <div style={boxStyle}>
          <h2 style={sectionTitle}>How to Use Performance Analysis</h2>

          <h3 style={subheading}>1. In Algorithm Visualizers</h3>
          <p style={paragraph}>
            When viewing any algorithm visualization, you'll see a "Show Analysis" button in the controls. 
            Click this button to reveal the performance analysis panel below the visualization.
          </p>

          <h3 style={subheading}>2. Performance Dashboard</h3>
          <p style={paragraph}>
            Visit the <Link to="/performance" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
              Performance Dashboard
            </Link> to analyze algorithms without running visualizations. This is useful for comparing 
            multiple algorithms or conducting detailed performance studies.
          </p>

          <h3 style={subheading}>3. Customizing Analysis</h3>
          <p style={paragraph}>
            You can customize your performance analysis by:
          </p>
          <ul style={listStyle}>
            <li>Selecting different data types (random, sorted, etc.)</li>
            <li>Specifying custom input sizes</li>
            <li>Adjusting the range of input sizes to test</li>
          </ul>
        </div>

        {/* Understanding the Results */}
        <div style={boxStyle}>
          <h2 style={sectionTitle}>Understanding the Results</h2>

          <h3 style={subheading}>Performance Charts</h3>
          <p style={paragraph}>
            The line chart shows execution time (in milliseconds) on the Y-axis and input size on the X-axis. 
            This visualization helps you see how an algorithm's performance scales with larger inputs.
          </p>

          <h3 style={subheading}>Performance Data Table</h3>
          <p style={paragraph}>
            The data table provides detailed measurements for each input size, including:
          </p>
          <ul style={listStyle}>
            <li>Input size</li>
            <li>Execution time in milliseconds</li>
            <li>Growth factor compared to the previous input size</li>
          </ul>

          <h3 style={subheading}>Complexity Estimation</h3>
          <p style={paragraph}>
            The growth factor helps you understand the algorithm's empirical complexity. For example:
          </p>
          <ul style={listStyle}>
            <li>A factor near 1 indicates constant time O(1)</li>
            <li>A factor near log(n) indicates logarithmic time O(log n)</li>
            <li>A factor near n indicates linear time O(n)</li>
            <li>A factor near n² indicates quadratic time O(n²)</li>
          </ul>
        </div>

        {/* Benefits for Learning */}
        <div style={boxStyle}>
          <h2 style={sectionTitle}>Benefits for Learning</h2>
          <p style={paragraph}>
            This feature enhances the educational value of AlgoVisualizer by:
          </p>
          <ul style={listStyle}>
            <li>Providing empirical evidence for theoretical complexity analysis</li>
            <li>Helping students understand real-world performance implications</li>
            <li>Enabling comparison of algorithms in practical scenarios</li>
            <li>Supporting deeper exploration of algorithm behavior with different data types</li>
          </ul>

          <p style={paragraph}>
            Try out the performance analysis feature today and gain deeper insights into how algorithms 
            perform in practice!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDocs;