# Export Features Documentation

## 🎥 Visualization Export Features

The AlgoVisualizer now includes powerful export functionality that allows you to capture and share your algorithm visualizations.

### 📸 Available Export Options

#### 1. **Snapshot Export**
- **What it does**: Captures the current state of the visualization as a high-quality PNG image
- **When to use**: Perfect for capturing key moments in an algorithm's execution
- **How to use**: Click the "📸 Take Snapshot" button anytime during or after visualization

#### 2. **Recording Export**
- **What it does**: Records the entire algorithm execution as a series of frames
- **Format options**: 
  - GIF (animated, web-friendly)
  - MP4 (video format, presentation-ready)
- **How to use**: 
  1. Click "📹 Export" to open the export panel
  2. Choose your format and frame rate
  3. Click "🔴 Start Recording"
  4. Run your algorithm visualization
  5. Click "⏹️ Stop Recording" when done

### ⚙️ Export Settings

#### Frame Rate Options
- **1 FPS (Slow)**: Best for detailed step-by-step analysis
- **2 FPS (Normal)**: Good balance between file size and smoothness
- **4 FPS (Fast)**: Smooth animations, larger file sizes
- **8 FPS (Very Fast)**: Professional quality, suitable for presentations

#### Format Selection
- **GIF**: 
  - Pros: Web-friendly, easy to share, automatically loops
  - Cons: Limited colors, larger file sizes for long recordings
  - Best for: Social media, documentation, web embedding
  
- **MP4**: 
  - Pros: High quality, efficient compression, widely supported
  - Cons: May require additional software for some platforms
  - Best for: Presentations, tutorials, professional use

### 🎯 Use Cases

#### **Educational Presentations**
```
1. Set up your algorithm with desired array size
2. Start recording at 2-4 FPS
3. Run the visualization
4. Export as MP4 for classroom presentations
```

#### **Social Media Sharing**
```
1. Use smaller array sizes (15-25 elements)
2. Record at 4-8 FPS for smooth animation
3. Export as GIF for easy sharing
```

#### **Documentation & Tutorials**
```
1. Take snapshots of key algorithm states
2. Record complete runs for step-by-step guides
3. Export as both GIF and MP4 for flexibility
```

#### **Research & Analysis**
```
1. Record multiple algorithm runs
2. Use 1-2 FPS for detailed frame-by-frame analysis
3. Export timing information for performance comparison
```

### 💡 Tips for Best Results

#### **Recording Quality**
- Use Chrome or Edge browsers for best compatibility
- Ensure stable internet connection when loading html2canvas
- Close unnecessary browser tabs to improve performance
- Use fullscreen mode for higher resolution exports

#### **File Size Management**
- Lower frame rates = smaller files
- Shorter recordings = smaller files
- GIF format is generally larger than MP4 for long recordings
- Consider array size impact on visual complexity

#### **Performance Optimization**
- Start recording before running the algorithm
- Avoid switching tabs during recording
- Use moderate animation speeds (100-300ms delay)
- Stop recording promptly when visualization completes

### 🔧 Technical Details

#### **Browser Compatibility**
- **Chrome/Edge**: Full feature support
- **Firefox**: Basic support, some limitations
- **Safari**: Limited support for advanced features
- **Mobile**: Basic snapshot functionality only

#### **Dependencies**
- **html2canvas**: Dynamically loaded for high-quality screenshots
- **Native Canvas API**: Fallback for basic functionality
- **Blob API**: For file downloads and generation

#### **Limitations**
- Large arrays (50+ elements) may impact performance
- Very fast animations (< 50ms delay) may miss frames
- Network connectivity required for html2canvas loading
- Some CSS effects may not capture perfectly

### 🚀 Future Enhancements

Planned features for future releases:
- Real-time GIF generation
- Video editing capabilities
- Cloud storage integration
- Batch export functionality
- Custom watermarks and branding
- Export to various video formats
- Timeline scrubbing for recordings

### 🐛 Troubleshooting

#### **Export Not Working**
1. Check browser console for errors
2. Ensure visualization container is visible
3. Try refreshing the page
4. Use a different browser if issues persist

#### **Poor Quality Exports**
1. Increase browser zoom for higher resolution
2. Use full-screen mode
3. Ensure good lighting if using custom themes
4. Try different export formats

#### **Large File Sizes**
1. Reduce frame rate
2. Shorten recording duration
3. Use smaller array sizes
4. Choose MP4 over GIF for long recordings

For additional support or feature requests, please visit our GitHub repository.
