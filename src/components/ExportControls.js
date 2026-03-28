import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Video, Camera, Circle, Square } from 'lucide-react';
import VisualizationExporter from '../utils/visualizationExporter';
import '../styles/ExportControls.css';

const ExportControls = ({ 
    isVisualizationRunning, 
    onStartRecording, 
    onStopRecording,
    visualizationContainerId = 'visualization-container' 
}) => {
    const [isRecording, setIsRecording] = useState(false);
    const [exportFormat, setExportFormat] = useState('gif');
    const [frameRate, setFrameRate] = useState(2);
    const [showExportPanel, setShowExportPanel] = useState(false);
    const [recordingStatus, setRecordingStatus] = useState({ frameCount: 0, duration: 0 });
    
    const exporterRef = useRef(new VisualizationExporter());

    const handleStartRecording = () => {
        if (isVisualizationRunning) {
            alert('Please wait for the current visualization to complete before starting recording.');
            return;
        }

        exporterRef.current.startRecording({
            frameRate: frameRate,
            format: exportFormat,
            quality: 0.8
        });
        
    setIsRecording(true);
    onStartRecording?.();
        
        // Update status periodically
        const statusInterval = setInterval(() => {
            const status = exporterRef.current.getStatus();
            setRecordingStatus(status);
            
            if (!status.isRecording) {
                clearInterval(statusInterval);
            }
        }, 500);
    };

    const handleStopRecording = async () => {
        if (!isRecording) return;
        
    setIsRecording(false);
    onStopRecording?.();
        
        try {
            const result = await exporterRef.current.stopRecording();
            if (result?.success) {
                alert(`${result.message}`);
            } else if (result) {
                alert(`Export completed. ${recordingStatus.frameCount} frames captured.`);
            } else {
                alert('Export failed. No frames were captured. Please try again.');
            }
        } catch (error) {
            console.error('Export error:', error);
            alert(`Export failed: ${error.message || 'Unknown error occurred'}`);
        }
        
        setRecordingStatus({ frameCount: 0, duration: 0 });
    };

    const handleCaptureFrame = async () => {
        try {
            await exporterRef.current.captureFrame(visualizationContainerId);
        } catch (error) {
            console.error('Frame capture error:', error);
        }
    };

    const handleDownloadSnapshot = async () => {
        try {
            await exporterRef.current.downloadFrame(visualizationContainerId);
            // Give user feedback that snapshot was taken
            const button = document.querySelector('.snapshot-btn');
            if (button) {
                const originalText = button.textContent;
                button.textContent = 'Snapshot Saved!';
                button.style.background = 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)';
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)';
                }, 2000);
            }
        } catch (error) {
            console.error('Snapshot download error:', error);
            alert('Failed to download snapshot. Please try again.');
        }
    };

    return (
        <div className="export-controls">
            <button 
                className="export-toggle-btn"
                onClick={() => setShowExportPanel(!showExportPanel)}
                title="Export Visualization"
                aria-label={showExportPanel ? "Close export panel" : "Open export panel"}
                aria-expanded={showExportPanel}
            >
                <Video size={14} /> Export
            </button>
            
            {showExportPanel && (
                <div className="export-panel">
                    <h3>Export Visualization</h3>
                    
                    <div className="export-options">
                        <div className="option-group">
                            <label htmlFor="exportFormatSelect">Format:</label>
                            <select 
                                id="exportFormatSelect"
                                value={exportFormat} 
                                onChange={(e) => setExportFormat(e.target.value)}
                                disabled={isRecording}
                                aria-label="Select export format"
                            >
                                <option value="gif">GIF (Animated)</option>
                                <option value="mp4">MP4 (Video)</option>
                            </select>
                        </div>
                        
                        <div className="option-group">
                            <label htmlFor="frameRateSelect">Frame Rate:</label>
                            <select 
                                id="frameRateSelect"
                                value={frameRate} 
                                onChange={(e) => setFrameRate(Number(e.target.value))}
                                disabled={isRecording}
                                aria-label="Select frame rate for recording"
                            >
                                <option value={1}>1 FPS (Slow)</option>
                                <option value={2}>2 FPS (Normal)</option>
                                <option value={4}>4 FPS (Fast)</option>
                                <option value={8}>8 FPS (Very Fast)</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="export-actions">
                        {!isRecording ? (
                            <>
                                <button 
                                    className="start-recording-btn"
                                    onClick={handleStartRecording}
                                    disabled={isVisualizationRunning}
                                    aria-label="Start recording visualization"
                                    aria-disabled={isVisualizationRunning}
                                >
                                    <Circle size={14} /> Start Recording
                                </button>
                                <button 
                                    className="snapshot-btn"
                                    onClick={handleDownloadSnapshot}
                                    aria-label="Take snapshot of current visualization"
                                </button>
                                >
                                    <Camera size={14} /> Take Snapshot
                                </button>
                            </>
                        ) : (
                            <div className="recording-controls">
                                <button 
                                    className="stop-recording-btn"
                                    onClick={handleStopRecording}
                                    aria-label="Stop recording and save visualization"
                                >
                                    <Square size={14} /> Stop Recording
                                </button>
                                <button 
                                    className="capture-frame-btn"
                                    onClick={handleCaptureFrame}
                                    aria-label="Capture current frame during recording"
                                >
                                    <Camera size={14} /> Capture Frame
                                </button>
                            </div>
                        )}
                    </div>
                    
                    {isRecording && (
                        <div className="recording-status" role="status" aria-live="polite">
                            <div className="recording-indicator">
                                <span className="recording-dot" aria-hidden="true"></span>
                                Recording... {recordingStatus.frameCount} frames captured
                            </div>
                            <div className="recording-duration">
                                Duration: {Math.floor(recordingStatus.duration / 1000)}s
                            </div>
                        </div>
                    )}
                    
                    <div className="export-info">
                        <h4>Instructions:</h4>
                        <ul>
                            <li><strong>Recording:</strong> Start before running the algorithm, then run your visualization</li>
                            <li><strong>Snapshot:</strong> Capture current state instantly</li>
                            <li><strong>Frame Rate:</strong> Higher rates = smoother but larger files</li>
                            <li><strong>Format:</strong> GIF for web sharing, MP4 for presentations</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExportControls;

ExportControls.propTypes = {
    isVisualizationRunning: PropTypes.bool,
    onStartRecording: PropTypes.func,
    onStopRecording: PropTypes.func,
    visualizationContainerId: PropTypes.string,
};

ExportControls.defaultProps = {
    isVisualizationRunning: false,
    onStartRecording: undefined,
    onStopRecording: undefined,
    visualizationContainerId: 'visualization-container',
};
