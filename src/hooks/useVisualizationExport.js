import { useRef, useCallback, useEffect } from 'react';
import VisualizationExporter from '../utils/visualizationExporter';

export const useVisualizationExport = (containerId = 'visualization-container') => {
    const exporterRef = useRef(new VisualizationExporter());
    const frameIntervalRef = useRef(null);
    const isRecordingRef = useRef(false);
    const performanceMetricsRef = useRef({
        totalFrames: 0,
        averageCaptureTime: 0,
        lastCaptureTime: 0,
        startTime: null
    });

    // 🎯 Debug logging helper
    const logDebug = useCallback((message, data = null) => {
        console.log(`🎨 ExportDebug: ${message}`, data ? data : '');
    }, []);

    // 🎯 Performance monitoring helper
    const trackPerformance = useCallback((operation, duration) => {
        performanceMetricsRef.current.lastCaptureTime = duration;
        logDebug(`Performance - ${operation} took ${duration}ms`);
    }, [logDebug]);

    // Auto-capture frames during recording
    const startAutoCapture = useCallback((frameRate = 2) => {
        if (frameIntervalRef.current) {
            clearInterval(frameIntervalRef.current);
            logDebug('🔄 Clearing existing auto-capture interval');
        }

        // 🎯 Validate frame rate configuration
        if (frameRate < 1 || frameRate > 60) {
            console.warn('⚠️ Frame rate outside recommended range (1-60 FPS)');
        }

        const interval = 1000 / frameRate; // Convert FPS to milliseconds
        logDebug(`🚀 Starting auto-capture at ${frameRate} FPS`, { intervalMs: interval });
        
        frameIntervalRef.current = setInterval(async () => {
            if (isRecordingRef.current) {
                try {
                    const captureStartTime = performance.now();
                    await exporterRef.current.captureFrame(containerId);
                    const captureDuration = performance.now() - captureStartTime;
                    
                    performanceMetricsRef.current.totalFrames++;
                    trackPerformance('Frame Capture', captureDuration);
                    
                    const frameCount = exporterRef.current.frames?.length || 0;
                    logDebug(`📸 Frame captured`, { 
                        frameNumber: frameCount,
                        totalFrames: performanceMetricsRef.current.totalFrames,
                        captureTime: captureDuration
                    });
                } catch (error) {
                    console.error('❌ Auto-capture error:', error);
                    logDebug('🛑 Frame capture failed', { error: error.message });
                }
            }
        }, interval);
    }, [containerId, logDebug, trackPerformance]);

    const stopAutoCapture = useCallback(() => {
        if (frameIntervalRef.current) {
            clearInterval(frameIntervalRef.current);
            frameIntervalRef.current = null;
            logDebug('🛑 Auto-capture stopped');
        }
    }, [logDebug]);

    const startRecording = useCallback((options = {}) => {
        const recordingOptions = {
            frameRate: 2,
            quality: 'high',
            ...options
        };
        
        logDebug('🎬 Starting recording session', recordingOptions);
        performanceMetricsRef.current.startTime = performance.now();
        performanceMetricsRef.current.totalFrames = 0;
        
        exporterRef.current.startRecording(recordingOptions);
        isRecordingRef.current = true;
        startAutoCapture(recordingOptions.frameRate);
        
        logDebug('✅ Recording session initialized');
    }, [startAutoCapture, logDebug]);

    const stopRecording = useCallback(async () => {
        logDebug('⏹️ Stopping recording session');
        isRecordingRef.current = false;
        stopAutoCapture();
        
        const recordingDuration = performance.now() - (performanceMetricsRef.current.startTime || performance.now());
        logDebug('📊 Recording session summary', {
            totalFrames: performanceMetricsRef.current.totalFrames,
            duration: recordingDuration,
            averageFPS: performanceMetricsRef.current.totalFrames / (recordingDuration / 1000)
        });
        
        try {
            const result = await exporterRef.current.stopRecording();
            logDebug('✅ Recording stopped successfully', { resultType: typeof result });
            return result;
        } catch (error) {
            console.error('❌ Error stopping recording:', error);
            logDebug('🛑 Recording stop failed', { error: error.message });
            throw error;
        }
    }, [stopAutoCapture, logDebug]);

    const captureFrame = useCallback(async () => {
        const captureStartTime = performance.now();
        logDebug('📷 Manual frame capture requested');
        
        try {
            const result = await exporterRef.current.captureFrame(containerId);
            const captureDuration = performance.now() - captureStartTime;
            
            performanceMetricsRef.current.totalFrames++;
            trackPerformance('Manual Capture', captureDuration);
            
            logDebug('✅ Manual frame captured', { 
                captureTime: captureDuration,
                totalFrames: performanceMetricsRef.current.totalFrames
            });
            
            return result;
        } catch (error) {
            console.error('❌ Manual capture error:', error);
            logDebug('🛑 Manual frame capture failed', { error: error.message });
            throw error;
        }
    }, [containerId, logDebug, trackPerformance]);

    const downloadSnapshot = useCallback(() => {
        logDebug('💾 Download snapshot requested');
        try {
            const result = exporterRef.current.downloadFrame(containerId);
            logDebug('✅ Snapshot download initiated');
            return result;
        } catch (error) {
            console.error('❌ Snapshot download error:', error);
            logDebug('🛑 Snapshot download failed', { error: error.message });
            throw error;
        }
    }, [containerId, logDebug]);

    const getStatus = useCallback(() => {
        const status = exporterRef.current.getStatus();
        const enhancedStatus = {
            ...status,
            performanceMetrics: { ...performanceMetricsRef.current },
            isRecording: isRecordingRef.current,
            hasActiveInterval: !!frameIntervalRef.current
        };
        
        logDebug('📊 Status check', enhancedStatus);
        return enhancedStatus;
    }, [logDebug]);

    // 🎯 Get performance metrics
    const getPerformanceMetrics = useCallback(() => {
        return { ...performanceMetricsRef.current };
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        const currentExporter = exporterRef.current;
        logDebug('🔧 Hook mounted', { containerId });
        
        return () => {
            logDebug('🧹 Performing cleanup on unmount');
            stopAutoCapture();
            if (isRecordingRef.current && currentExporter) {
                logDebug('🛑 Stopping active recording during cleanup');
                currentExporter.stopRecording().catch(error => {
                    console.error('❌ Cleanup recording stop error:', error);
                });
            }
        };
    }, [containerId, stopAutoCapture, logDebug]);

    return {
        startRecording,
        stopRecording,
        captureFrame,
        downloadSnapshot,
        getStatus,
        getPerformanceMetrics, // 🎯 New method for performance insights
        isRecording: () => isRecordingRef.current
    };
};

// 🎯 Export hook configuration helper
export const useExportConfig = () => {
    const validateConfig = useCallback((config) => {
        const warnings = [];
        
        if (config.frameRate && (config.frameRate < 1 || config.frameRate > 60)) {
            warnings.push('Frame rate should be between 1 and 60 FPS');
        }
        
        if (config.quality && !['low', 'medium', 'high'].includes(config.quality)) {
            warnings.push('Quality should be one of: low, medium, high');
        }
        
        if (warnings.length > 0) {
            console.warn('⚠️ Export configuration warnings:', warnings);
        }
        
        return { isValid: warnings.length === 0, warnings };
    }, []);

    return { validateConfig };
};

export default useVisualizationExport;
