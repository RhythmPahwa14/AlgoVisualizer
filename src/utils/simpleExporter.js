// Simple, working export functionality
class SimpleVisualizationExporter {
    constructor() {
        this.frames = [];
        this.isRecording = false;
        this.startTime = 0;
        this.captureInterval = null;
    }

    // Start recording frames
    startRecording(intervalMs = 500) {
        console.log('🎬 Starting recording...');
        this.frames = [];
        this.isRecording = true;
        this.startTime = Date.now();
        
        // Capture frame immediately
        this.captureFrame();
        
        // Set up interval to capture frames automatically
        this.captureInterval = setInterval(() => {
            this.captureFrame();
        }, intervalMs);
        
        return true;
    }

    // Stop recording
    stopRecording() {
        console.log('🛑 Stopping recording...');
        this.isRecording = false;
        
        if (this.captureInterval) {
            clearInterval(this.captureInterval);
            this.captureInterval = null;
        }
        
        console.log(`📊 Recording complete! Captured ${this.frames.length} frames`);
        return this.frames.length;
    }

    // Capture a single frame
    async captureFrame() {
        if (!this.isRecording) return;

        try {
            const element = document.getElementById('visualization-container');
            if (!element) {
                console.warn('❌ Visualization container not found');
                return;
            }

            // Create canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 800;
            canvas.height = 600;

            // Draw algorithm visualization manually
            await this.drawCurrentVisualization(ctx, canvas, element);

            // Convert to blob and store
            return new Promise((resolve) => {
                canvas.toBlob((blob) => {
                    if (blob) {
                        this.frames.push({
                            blob,
                            canvas,
                            timestamp: Date.now() - this.startTime
                        });
                        console.log(`📸 Frame ${this.frames.length} captured`);
                    }
                    resolve(blob);
                }, 'image/png');
            });

        } catch (error) {
            console.error('❌ Error capturing frame:', error);
        }
    }

    // Draw the current state of the algorithm visualization
    async drawCurrentVisualization(ctx, canvas, element) {
        // Clear canvas
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Try to find sorting bars
        const bars = this.findSortingBars(element);
        
        if (bars.length > 0) {
            console.log(`📊 Drawing ${bars.length} sorting bars`);
            this.drawBars(ctx, canvas, bars);
        } else {
            console.log('⚠️ No bars found, drawing placeholder');
            this.drawPlaceholder(ctx, canvas);
        }
    }

    // Find sorting bars in the DOM
    findSortingBars(element) {
        // Look for divs with height style that look like bars
        const allDivs = element.querySelectorAll('div');
        const bars = [];

        allDivs.forEach(div => {
            const style = div.style;
            const rect = div.getBoundingClientRect();
            
            // Check if this looks like a sorting bar
            if (style.height && 
                style.backgroundColor && 
                rect.height > 20 && 
                rect.width > 5 && 
                rect.width < 100) {
                
                // Extract value
                let value = parseInt(style.height) || rect.height;
                
                // Try to get value from title or text
                const titleMatch = div.title?.match(/Value: (\d+)/);
                if (titleMatch) {
                    value = parseInt(titleMatch[1]);
                }

                bars.push({
                    value,
                    height: parseInt(style.height) || rect.height,
                    color: style.backgroundColor || '#66ccff',
                    element: div
                });
            }
        });

        return bars;
    }

    // Draw bars on canvas
    drawBars(ctx, canvas, bars) {
        const maxValue = Math.max(...bars.map(b => b.value));
        const barWidth = Math.max(15, (canvas.width - 100) / bars.length);
        const maxBarHeight = canvas.height - 150;

        // Title
        ctx.fillStyle = '#66ccff';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Sorting Algorithm', canvas.width / 2, 40);

        // Draw bars
        bars.forEach((bar, index) => {
            const x = 50 + index * barWidth;
            const height = (bar.value / maxValue) * maxBarHeight;
            const y = canvas.height - 50 - height;

            // Bar color
            ctx.fillStyle = bar.color;
            ctx.fillRect(x, y, barWidth - 2, height);

            // Value text
            if (barWidth > 20) {
                ctx.fillStyle = '#ffffff';
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(bar.value, x + barWidth/2, y - 5);
            }
        });

        // Info
        ctx.fillStyle = '#ffffff';
        ctx.font = '14px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Bars: ${bars.length}`, 50, canvas.height - 20);
    }

    // Draw placeholder when no bars found
    drawPlaceholder(ctx, canvas) {
        ctx.fillStyle = '#66ccff';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Algorithm Visualization', canvas.width / 2, canvas.height / 2 - 40);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '16px Arial';
        ctx.fillText('No visualization data found', canvas.width / 2, canvas.height / 2);
        
        ctx.fillStyle = '#888888';
        ctx.font = '12px Arial';
        ctx.fillText(`Frame ${this.frames.length + 1}`, canvas.width / 2, canvas.height / 2 + 40);
    }

    // Export as GIF
    async exportAsGIF() {
        if (this.frames.length === 0) {
            alert('No frames to export! Please record some frames first.');
            return;
        }

        console.log(`🎞️ Creating GIF from ${this.frames.length} frames...`);

        try {
            // Create a simple animated "GIF" as HTML file
            const html = this.createAnimatedHTML();
            const blob = new Blob([html], { type: 'text/html' });
            this.downloadFile(blob, 'algorithm-animation.html');
            
            console.log('✅ GIF-like HTML file created successfully!');
        } catch (error) {
            console.error('❌ Error creating GIF:', error);
            alert('Error creating GIF: ' + error.message);
        }
    }

    // Export as Video (HTML format)
    async exportAsVideo() {
        if (this.frames.length === 0) {
            alert('No frames to export! Please record some frames first.');
            return;
        }

        console.log(`🎥 Creating video from ${this.frames.length} frames...`);

        try {
            const html = this.createVideoHTML();
            const blob = new Blob([html], { type: 'text/html' });
            this.downloadFile(blob, 'algorithm-video.html');
            
            console.log('✅ Video HTML file created successfully!');
        } catch (error) {
            console.error('❌ Error creating video:', error);
            alert('Error creating video: ' + error.message);
        }
    }

    // Create animated HTML
    createAnimatedHTML() {
        const frameDataUrls = this.frames.map(frame => {
            return frame.canvas.toDataURL('image/png');
        });

        return `
<!DOCTYPE html>
<html>
<head>
    <title>Algorithm Animation</title>
    <style>
        body { 
            margin: 0; 
            padding: 20px; 
            background: #1a1a2e; 
            color: white; 
            font-family: Arial; 
            text-align: center;
        }
        .animation-container {
            display: inline-block;
            border: 2px solid #66ccff;
            border-radius: 10px;
            padding: 10px;
            background: rgba(26, 26, 46, 0.8);
        }
        .frame {
            display: none;
            max-width: 100%;
            height: auto;
        }
        .frame.active {
            display: block;
        }
        .controls {
            margin: 20px 0;
        }
        button {
            margin: 5px;
            padding: 10px 20px;
            background: #66ccff;
            color: #1a1a2e;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
        }
        button:hover { background: #5ab8e8; }
        .info { margin: 10px 0; color: #66ccff; }
    </style>
</head>
<body>
    <h1>🎬 Algorithm Visualization Animation</h1>
    <div class="animation-container">
        ${frameDataUrls.map((dataUrl, index) => 
            `<img class="frame ${index === 0 ? 'active' : ''}" src="${dataUrl}" alt="Frame ${index + 1}" />`
        ).join('')}
    </div>
    
    <div class="controls">
        <button onclick="play()">▶️ Play</button>
        <button onclick="pause()">⏸️ Pause</button>
        <button onclick="reset()">⏮️ Reset</button>
        <button onclick="nextFrame()">⏭️ Next</button>
        <button onclick="prevFrame()">⏮️ Previous</button>
    </div>
    
    <div class="info">
        Frame: <span id="frameNumber">1</span> / ${frameDataUrls.length} | 
        Speed: <input type="range" id="speedRange" min="100" max="2000" value="500" /> ms
    </div>

    <script>
        let currentFrame = 0;
        let isPlaying = false;
        let playInterval = null;
        const frames = document.querySelectorAll('.frame');
        const totalFrames = ${frameDataUrls.length};

        function showFrame(index) {
            frames.forEach(f => f.classList.remove('active'));
            if (frames[index]) {
                frames[index].classList.add('active');
                document.getElementById('frameNumber').textContent = index + 1;
            }
        }

        function play() {
            if (isPlaying) return;
            isPlaying = true;
            const speed = document.getElementById('speedRange').value;
            playInterval = setInterval(() => {
                currentFrame = (currentFrame + 1) % totalFrames;
                showFrame(currentFrame);
            }, parseInt(speed));
        }

        function pause() {
            isPlaying = false;
            if (playInterval) {
                clearInterval(playInterval);
                playInterval = null;
            }
        }

        function reset() {
            pause();
            currentFrame = 0;
            showFrame(currentFrame);
        }

        function nextFrame() {
            pause();
            currentFrame = (currentFrame + 1) % totalFrames;
            showFrame(currentFrame);
        }

        function prevFrame() {
            pause();
            currentFrame = currentFrame > 0 ? currentFrame - 1 : totalFrames - 1;
            showFrame(currentFrame);
        }

        // Auto-play on load
        setTimeout(play, 1000);
    </script>
</body>
</html>`;
    }

    // Create video HTML (same as animated for now)
    createVideoHTML() {
        return this.createAnimatedHTML();
    }

    // Download file
    downloadFile(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

export default SimpleVisualizationExporter;
