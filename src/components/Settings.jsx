import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import '../styles/Settings.css';

const DEFAULT_SETTINGS = {
  animationSpeed: 300,
  arraySize: 20,
  soundEnabled: false,
};

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  
  // Load settings from localStorage or use defaults
  const [animationSpeed, setAnimationSpeed] = useState(() => {
    const saved = localStorage.getItem('animationSpeed');
    return saved ? parseInt(saved) : DEFAULT_SETTINGS.animationSpeed;
  });
  
  const [arraySize, setArraySize] = useState(() => {
    const saved = localStorage.getItem('arraySize');
    return saved ? parseInt(saved) : DEFAULT_SETTINGS.arraySize;
  });
  
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('soundEnabled');
    return saved === 'true';
  });

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('animationSpeed', animationSpeed.toString());
  }, [animationSpeed]);

  useEffect(() => {
    localStorage.setItem('arraySize', arraySize.toString());
  }, [arraySize]);

  useEffect(() => {
    localStorage.setItem('soundEnabled', soundEnabled.toString());
  }, [soundEnabled]);

  const resetToDefault = () => {
    setAnimationSpeed(DEFAULT_SETTINGS.animationSpeed);
    setArraySize(DEFAULT_SETTINGS.arraySize);
    setSoundEnabled(DEFAULT_SETTINGS.soundEnabled);
    
    // Reset theme to light mode
    if (theme === 'dark') {
      toggleTheme();
    }

    alert('Settings reset to default values!');
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <h1 className="settings-title">Settings</h1>
        <p className="settings-description">
          Customize your visualization experience
        </p>

        <div className="settings-grid">
          {/* Theme Setting */}
          <div className="setting-card">
            <div className="setting-header">
              <h3>Theme</h3>
              <span className="setting-icon">{theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}</span>
            </div>
            <p className="setting-description">
              Switch between light and dark modes
            </p>
            <button className="theme-toggle-btn" onClick={toggleTheme}>
              {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
            <p className="setting-status">
              Current: <strong>{theme === 'dark' ? 'Dark' : 'Light'}</strong>
            </p>
          </div>

          {/* Animation Speed Setting */}
          <div className="setting-card">
            <div className="setting-header">
              <h3>Animation Speed</h3>
              <span className="setting-icon">⚡</span>
            </div>
            <p className="setting-description">
              Default speed for algorithm visualizations
            </p>
            <div className="slider-container">
              <label className="slider-label">
                <span>Faster</span>
                <span className="slider-value">{animationSpeed}ms</span>
                <span>Slower</span>
              </label>
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
                className="settings-slider"
              />
            </div>
            <p className="setting-status">
              Speed: <strong>{animationSpeed <= 200 ? 'Fast' : animationSpeed <= 500 ? 'Normal' : 'Slow'}</strong>
            </p>
          </div>

          {/* Array Size Setting */}
          <div className="setting-card">
            <div className="setting-header">
              <h3>Default Array Size</h3>
              <span className="setting-icon">📊</span>
            </div>
            <p className="setting-description">
              Initial array size for sorting algorithms
            </p>
            <div className="slider-container">
              <label className="slider-label">
                <span>Small</span>
                <span className="slider-value">{arraySize} elements</span>
                <span>Large</span>
              </label>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={arraySize}
                onChange={(e) => setArraySize(parseInt(e.target.value))}
                className="settings-slider"
              />
            </div>
            <p className="setting-status">
              Size: <strong>{arraySize <= 20 ? 'Small' : arraySize <= 50 ? 'Medium' : 'Large'}</strong>
            </p>
          </div>

          {/* Sound Effects Setting */}
          <div className="setting-card">
            <div className="setting-header">
              <h3>Sound Effects</h3>
              <span className="setting-icon">🔊</span>
            </div>
            <p className="setting-description">
              Play sounds during visualizations (coming soon)
            </p>
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                className="settings-checkbox"
              />
              <span className="checkbox-label">
                {soundEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </label>
            <p className="setting-status">
              Status: <strong>{soundEnabled ? '🔊 On' : '🔇 Off'}</strong>
            </p>
          </div>
        </div>

        {/* Reset Button */}
        <div className="settings-actions">
          <button className="reset-btn" onClick={resetToDefault}>
            🔄 Reset to Default
          </button>
          <p className="reset-info">
            This will reset all settings to their default values
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
