import { useRef, useCallback, useEffect } from 'react';
import VisualizationExporter from '../utils/visualizationExporter';

export const useVisualizationExport = (containerId = 'visualization-container') => {
    const exporterRef = useRef(new VisualizationExporter());
    const frameIntervalRef = useRef(null);
    const isRecordingRef = useRef(false);

    // Auto-capture frames during recording
    const startAutoCapture = useCallback((frameRate = 2) => {
        if (frameIntervalRef.current) {
            clearInterval(frameIntervalRef.current);
        }

        const interval = 1000 / frameRate; // Convert FPS to milliseconds
        console.log(`Starting auto-capture at ${frameRate} FPS (${interval}ms intervals)`);
        
        frameIntervalRef.current = setInterval(async () => {
            if (isRecordingRef.current) {
                try {
                    await exporterRef.current.captureFrame(containerId);
                    console.log(`Frame captured: ${exporterRef.current.frames?.length || 'unknown'} total frames`);
                } catch (error) {
                    console.error('Auto-capture error:', error);
                }
            }
        }, interval);
    }, [containerId]);

    const stopAutoCapture = useCallback(() => {
        if (frameIntervalRef.current) {
            clearInterval(frameIntervalRef.current);
            frameIntervalRef.current = null;
        }
    }, []);

    const startRecording = useCallback((options = {}) => {
        exporterRef.current.startRecording(options);
        isRecordingRef.current = true;
        startAutoCapture(options.frameRate || 2);
    }, [startAutoCapture]);

    const stopRecording = useCallback(async () => {
        isRecordingRef.current = false;
        stopAutoCapture();
        return await exporterRef.current.stopRecording();
    }, [stopAutoCapture]);

    const captureFrame = useCallback(() => {
        return exporterRef.current.captureFrame(containerId);
    }, [containerId]);

    const downloadSnapshot = useCallback(() => {
        return exporterRef.current.downloadFrame(containerId);
    }, [containerId]);

    const getStatus = useCallback(() => {
        return exporterRef.current.getStatus();
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        const currentExporter = exporterRef.current;
        return () => {
            stopAutoCapture();
            if (isRecordingRef.current && currentExporter) {
                currentExporter.stopRecording();
            }
        };
    }, [stopAutoCapture]);

    return {
        startRecording,
        stopRecording,
        captureFrame,
        downloadSnapshot,
        getStatus,
        isRecording: () => isRecordingRef.current
    };
};

export default useVisualizationExport;
