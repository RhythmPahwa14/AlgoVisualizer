import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import SimpleVisualizationExporter from '../utils/simpleExporter';
import '../styles/Sorting.css';


const SimpleExportControls = ({ containerId }) => {
  const [exporter] = useState(() => new SimpleVisualizationExporter());
  const [isRecording, setIsRecording] = useState(false);
  const [frameCount, setFrameCount] = useState(0);
  const [message, setMessage] = useState('Ready to record');

  // choose default container id if not provided
  const targetId = useMemo(() => {
    if (containerId) return containerId;
    if (typeof document !== 'undefined') {
      if (document.getElementById('sort-visualization-container')) return 'sort-visualization-container';
      if (document.getElementById('search-visualization-container')) return 'search-visualization-container';
      if (document.getElementById('ds-visualization-container')) return 'ds-visualization-container';
    }
    return 'visualization-container';
  }, [containerId]);

  const handleStartRecording = () => {
    setMessage('Recording...');
    setIsRecording(true);
    setFrameCount(0);

  exporter.startRecording(500, targetId); // Capture every 500ms targeting correct container

    // Update frame count periodically
    const updateInterval = setInterval(() => {
      setFrameCount(exporter.frames.length);
    }, 500);
    // Store interval for cleanup
    exporter.updateInterval = updateInterval;
  };

  const handleStopRecording = () => {
    if (exporter.updateInterval) {
      clearInterval(exporter.updateInterval);
    }
    const totalFrames = exporter.stopRecording();
    setIsRecording(false);
    setFrameCount(totalFrames);
    setMessage(`Recording stopped. ${totalFrames} frames captured.`);
  };
  const handleExportGIF = () => {
    setMessage('Creating GIF...');
    exporter.exportAsGIF();
    setMessage('GIF exported successfully!');
  };

  const handleExportVideo = () => {
    setMessage('Creating video...');
    exporter.exportAsVideo();
    setMessage('Video exported successfully!');
  };

  return (
    <div style={{
      background: 'rgba(15, 52, 96, 0.1)',
      borderRadius: '15px',
      border: '1px solid rgba(102, 204, 255, 0.2)',
      padding: '25px',
      textAlign: 'center',
      width: '100%'
    }}>
      <h3 style={{ color: '#66ccff', marginBottom: '10px' }}>Export Visualization</h3>
      <p style={{ color: '#e0e6ed', margin: '6px 0 14px 0' }}>{message}</p>
      {frameCount > 0 && (
        <p style={{ color: '#66ccff', fontSize: '14px', marginTop: 0 }}>Frames captured: {frameCount}</p>
      )}

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '12px' }}>
        {!isRecording ? (
          <button
            className="btn"
            onClick={handleStartRecording}
            style={{ background: '#28a745', color: '#fff' }}
          >
            Start Recording
          </button>
        ) : (
          <button
            className="btn btn-secondary"
            onClick={handleStopRecording}
            style={{ background: '#dc3545', color: '#fff' }}
          >
            Stop Recording
          </button>
        )}

        {/* Export buttons */}
        <div style={{ display: 'flex', gap: '15px', flexWrap:'wrap', alignItems:'center', justifyContent:'center' }}>
          <button
            onClick={handleExportGIF}
            disabled={frameCount === 0 || isRecording}
            className="btn btn-secondary"
            style={{ padding: '10px 20px', background: frameCount > 0 && !isRecording ? '#6c757d' : '#343a40', color: 'white', border: 'none', borderRadius: '8px', cursor: frameCount > 0 && !isRecording ? 'pointer' : 'not-allowed', fontWeight: 'bold' }}
          >
            🎞️ Export GIF
          </button>

          <button
            onClick={handleExportVideo}
            disabled={frameCount === 0 || isRecording}
            className="btn btn-secondary"
            style={{ padding: '10px 20px', background: frameCount > 0 && !isRecording ? '#6c757d' : '#343a40', color: 'white', border: 'none', borderRadius: '8px', cursor: frameCount > 0 && !isRecording ? 'pointer' : 'not-allowed', fontWeight: 'bold' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="currentColor"><path d="M15 4V8H19V20H5V4H15ZM3.9985 2C3.44749 2 3 2.44405 3 2.9918V21.0082C3 21.5447 3.44476 22 3.9934 22H20.0066C20.5551 22 21 21.5489 21 20.9925L20.9997 7L16 2H3.9985ZM15.0008 11.667L10.1219 8.41435C10.0562 8.37054 9.979 8.34717 9.9 8.34717C9.6791 8.34717 9.5 8.52625 9.5 8.74717V15.2524C9.5 15.3314 9.5234 15.4086 9.5672 15.4743C9.6897 15.6581 9.9381 15.7078 10.1219 15.5852L15.0008 12.3326C15.0447 12.3033 15.0824 12.2656 15.1117 12.2217C15.2343 12.0379 15.1846 11.7895 15.0008 11.667Z"></path></svg>
            Export Video
          </button>
        </div>
      </div>

      <div style={{ marginTop: '14px', fontSize: '12px', color: '#aaa', lineHeight: 1.4 }}>
        <div>Instructions:</div>
        <div>1. Click "Start Recording" before running your algorithm</div>
        <div>2. Run the sorting/searching algorithm</div>
        <div>3. Click "Stop Recording" when done</div>
        <div>4. Export as GIF or Video format</div>
      </div>
    </div>
  );
};

SimpleExportControls.propTypes = { containerId: PropTypes.string };
SimpleExportControls.defaultProps = { containerId: undefined };

export default SimpleExportControls;
