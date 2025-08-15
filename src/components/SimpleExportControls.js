import React, { useState } from 'react';
import SimpleVisualizationExporter from '../utils/simpleExporter';

const SimpleExportControls = () => {
    const [exporter] = useState(() => new SimpleVisualizationExporter());
    const [isRecording, setIsRecording] = useState(false);
    const [frameCount, setFrameCount] = useState(0);
    const [message, setMessage] = useState('Ready to record');

    const handleStartRecording = () => {
        setMessage('Recording started...');
        setIsRecording(true);
        setFrameCount(0);
        
        exporter.startRecording(500); // Capture every 500ms
        
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
        setMessage('Creating Video...');
        exporter.exportAsVideo();
        setMessage('Video exported successfully!');
    };

    return (
        <div style={{
            background: 'rgba(15, 52, 96, 0.1)',
            borderRadius: '15px',
            border: '1px solid rgba(102, 204, 255, 0.2)',
            padding: '20px',
            margin: '20px 0',
            textAlign: 'center'
        }}>
            <h3 style={{ color: '#66ccff', marginBottom: '20px' }}>
                🎬 Export Visualization
            </h3>
            
            <div style={{ marginBottom: '20px' }}>
                <p style={{ color: '#ffffff', margin: '10px 0' }}>
                    {message}
                </p>
                {frameCount > 0 && (
                    <p style={{ color: '#66ccff', fontSize: '14px' }}>
                        Frames captured: {frameCount}
                    </p>
                )}
            </div>

            <div style={{ 
                display: 'flex', 
                gap: '10px', 
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}>
                {!isRecording ? (
                    <button
                        onClick={handleStartRecording}
                        style={{
                            padding: '12px 24px',
                            background: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }}
                    >
                        🎬 Start Recording
                    </button>
                ) : (
                    <button
                        onClick={handleStopRecording}
                        style={{
                            padding: '12px 24px',
                            background: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }}
                    >
                        🛑 Stop Recording
                    </button>
                )}

                <button
                    onClick={handleExportGIF}
                    disabled={frameCount === 0}
                    style={{
                        padding: '12px 24px',
                        background: frameCount > 0 ? '#66ccff' : '#555',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: frameCount > 0 ? 'pointer' : 'not-allowed',
                        fontWeight: 'bold',
                        fontSize: '14px'
                    }}
                >
                    📱 Export GIF
                </button>

                <button
                    onClick={handleExportVideo}
                    disabled={frameCount === 0}
                    style={{
                        padding: '12px 24px',
                        background: frameCount > 0 ? '#8e44ad' : '#555',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: frameCount > 0 ? 'pointer' : 'not-allowed',
                        fontWeight: 'bold',
                        fontSize: '14px'
                    }}
                >
                    🎥 Export Video
                </button>
            </div>

            <div style={{ 
                marginTop: '15px', 
                fontSize: '12px', 
                color: '#aaa',
                lineHeight: '1.4'
            }}>
                <p>📝 Instructions:</p>
                <p>1. Click "Start Recording" before running your algorithm</p>
                <p>2. Run the sorting/searching algorithm</p>
                <p>3. Click "Stop Recording" when done</p>
                <p>4. Export as GIF or Video format</p>
            </div>
        </div>
    );
};

export default SimpleExportControls;
