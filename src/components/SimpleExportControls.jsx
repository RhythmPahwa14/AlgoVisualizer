import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import SimpleVisualizationExporter from '../utils/simpleExporter';

// Configuration constants for better maintainability
const EXPORT_CONFIG = {
  DEFAULT_CONTAINER_ID: 'visualization-container',
  RECORDING_INTERVAL: 500,
  CONTAINER_IDS: [
    'sort-visualization-container',
    'search-visualization-container',
    'ds-visualization-container'
  ]
};

// Utility functions for export operations
const exportUtils = {
  getTargetContainerId: (containerId, document) => {
    if (containerId) return containerId;
    if (typeof document !== 'undefined') {
      for (const id of EXPORT_CONFIG.CONTAINER_IDS) {
        if (document.getElementById(id)) return id;
      }
    }
    return EXPORT_CONFIG.DEFAULT_CONTAINER_ID;
  }
};

// Message utilities for user feedback
const messageUtils = {
  READY: 'Ready to record',
  RECORDING: 'Recording...',
  STOPPED: (frames) => `Recording stopped. ${frames} frames captured.`,
  CREATING_GIF: 'Creating GIF...',
  GIF_SUCCESS: 'GIF exported successfully!',
  CREATING_VIDEO: 'Creating video...',
  VIDEO_SUCCESS: 'Video exported successfully!'
};

const SimpleExportControls = ({ containerId }) => {
  const [exporter] = useState(() => new SimpleVisualizationExporter());
  const [isRecording, setIsRecording] = useState(false);
  const [frameCount, setFrameCount] = useState(0);
  const [message, setMessage] = useState(messageUtils.READY);

  // choose default container id if not provided
  const targetId = useMemo(() => {
    return exportUtils.getTargetContainerId(containerId, document);
  }, [containerId]);

  const handleStartRecording = () => {
    setMessage(messageUtils.RECORDING);
    setIsRecording(true);
    setFrameCount(0);

    exporter.startRecording(EXPORT_CONFIG.RECORDING_INTERVAL, targetId);

    // Update frame count periodically
    const updateInterval = setInterval(() => {
      setFrameCount(exporter.frames.length);
    }, EXPORT_CONFIG.RECORDING_INTERVAL);
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
    setMessage(messageUtils.STOPPED(totalFrames));
  };
  
  const handleExportGIF = () => {
    setMessage(messageUtils.CREATING_GIF);
    exporter.exportAsGIF();
    setMessage(messageUtils.GIF_SUCCESS);
  };

  const handleExportVideo = () => {
    setMessage(messageUtils.CREATING_VIDEO);
    exporter.exportAsVideo();
    setMessage(messageUtils.VIDEO_SUCCESS);
  };

  return (
    <div className="theme-card" style={{ textAlign: 'center' }}>
      <div className="theme-card-header">
        <h3>Export Visualization</h3>
      </div>
      
      <p style={{ color: 'var(--theme-text-secondary)', margin: '0 0 1rem 0' }}>{message}</p>
      {frameCount > 0 && (
        <p style={{ color: 'var(--theme-accent)', fontSize: '0.9rem', marginTop: 0 }}>Frames captured: {frameCount}</p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        {!isRecording ? (
          <button
            className="btn btn-primary" 
            onClick={handleStartRecording}
            style={{ backgroundColor: 'var(--theme-status-success)', borderColor: 'var(--theme-status-success)' }}
          >
            Start Recording
          </button>
        ) : (
          <button
            className="btn btn-primary" 
            onClick={handleStopRecording}
            style={{ backgroundColor: 'var(--theme-status-danger)', borderColor: 'var(--theme-status-danger)' }}
          >
            Stop Recording
          </button>
        )}

        <div style={{ display: 'flex', gap: '1rem', flexWrap:'wrap', justifyContent:'center' }}>
          <button
            onClick={handleExportGIF}
            disabled={frameCount === 0 || isRecording}
            className="btn btn-secondary" 
          >
            🎞️ Export GIF
          </button>
          <button
            onClick={handleExportVideo}
            disabled={frameCount === 0 || isRecording}
            className="btn btn-secondary" 
          >
            📹 Export Video
          </button>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--theme-text-muted)', lineHeight: 1.5 }}>
        <div>**Instructions:**</div>
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