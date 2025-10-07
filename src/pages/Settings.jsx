import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings as SettingsIcon,
  Palette,
  Type,
  Bell,
  Smartphone,
  Mail,
  Download,
  Upload,
  RefreshCw,
  Save,
  Sun,
  Moon,
  Volume2,
  Eye,
  Accessibility,
  Zap,
  Check,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { useSettings, AVAILABLE_LANGUAGES, COLOR_SCHEMES, FONT_SIZES, FONT_FAMILIES } from '../contexts/SettingsContext';
import '../styles/settings.css';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const {
    settings,
    isLoading,
    updateSetting,
    resetSettings,
    exportSettings,
    importSettings,
    getCurrentLanguage,
    getCurrentColorScheme,
  } = useSettings();

  const [message, setMessage] = useState({ text: '', type: '', show: false });
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const showMessage = useCallback((text, type = 'success') => {
    setMessage({ text, type, show: true });
    setTimeout(() => setMessage(prev => ({ ...prev, show: false })), 3000);
  }, []);

  const handleSettingChange = useCallback((key, value) => {
    updateSetting(key, value);
    showMessage(`${key.charAt(0).toUpperCase() + key.slice(1)} updated!`);
  }, [updateSetting, showMessage]);

  const handleReset = useCallback(() => {
    if (window.confirm('Reset all settings to default?')) {
      resetSettings();
      showMessage('Settings reset to default!');
    }
  }, [resetSettings, showMessage]);

  const handleImport = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const success = importSettings(e.target.result);
        showMessage(success ? 'Settings imported!' : 'Import failed!', success ? 'success' : 'error');
      } catch {
        showMessage('Import failed!', 'error');
      }
    };
    reader.readAsText(file);
  }, [importSettings, showMessage]);

  if (isLoading) {
    return (
      <div className="settings-container" >
        <div className="settings-loading">
          <div className="settings-loading-spinner"></div>
          <p>Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-container" style={{ 
    background: "linear-gradient(135deg, #d0e7ff 0%, #e6d4ff 100%)",
    borderRadius: "24px",
    padding: "2rem",
    color: "#333"   
    }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <motion.h1 className="settings-title">
          <SettingsIcon size={40} />Settings
        </motion.h1>

        <AnimatePresence>
          {message.show && (
            <motion.div
              className={`settings-message ${message.type}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {message.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="settings-grid">
          {/* Appearance Settings */}
          <motion.div 
            className="settings-card"
            initial={{ opacity: 0, scale: 0.9, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            whileHover={{ y: -8, rotateX: 2 }}
          >
            <div className="settings-card-header">
              <Palette size={24} />
              <h3>Appearance</h3>
            </div>

            <div className="settings-control-group">
              <label className="settings-label">Theme Preference</label>
              <div className="settings-toggle-container">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Sun size={20} style={{ color: theme === 'light' ? '#f59e0b' : 'var(--theme-text-muted)' }} />
                  <div className={`settings-toggle ${theme === 'dark' ? 'active' : ''}`} onClick={toggleTheme}>
                    <div className="settings-toggle-slider"></div>
                  </div>
                  <Moon size={20} style={{ color: theme === 'dark' ? 'var(--theme-accent)' : 'var(--theme-text-muted)' }} />
                </div>
              </div>
            </div>

            <div className="settings-control-group">
              <label className="settings-label">Color Scheme</label>
              <div className="color-scheme-grid">
                {Object.entries(COLOR_SCHEMES).map(([key, scheme], index) => (
                  <motion.div
                    key={key}
                    className={`color-scheme-option ${settings.colorScheme === key ? 'active' : ''}`}
                    onClick={() => handleSettingChange('colorScheme', key)}
                    style={{ '--scheme-color': scheme.primary }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
                  >
                    <span className="color-scheme-name">{scheme.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="settings-control-group">
              <label className="settings-label">Custom Accent Color</label>
              <div className="color-input-container">
                <input
                  type="color"
                  className="settings-input color-input"
                  value={settings.customAccentColor}
                  onChange={(e) => handleSettingChange('customAccentColor', e.target.value)}
                />
                <div className="color-preview" style={{ '--preview-color': settings.customAccentColor }}></div>
              </div>
            </div>
          </motion.div>

          {/* Typography & Language */}
          <motion.div 
            className="settings-card"
            initial={{ opacity: 0, scale: 0.9, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            whileHover={{ y: -8, rotateX: 2 }}
          >
            <div className="settings-card-header">
              <Type size={24} />
              <h3>Typography & Language</h3>
            </div>

            <div className="settings-control-group">
              <label className="settings-label" htmlFor="font-family">
                Font Family
              </label>
              <select
                id="font-family"
                className="settings-select"
                value={settings.fontFamily}
                onChange={(e) => handleSettingChange('fontFamily', e.target.value)}
              >
                {Object.entries(FONT_FAMILIES).map(([key, config]) => (
                  <option key={key} value={key}>{config.name}</option>
                ))}
              </select>
              <div className="font-family-preview">
                <p className="font-family-preview-text">
                  The quick brown fox jumps over the lazy dog. 1234567890
                </p>
              </div>
              <p className="settings-description">
                Choose your preferred font family for the interface
              </p>
            </div>

            <div className="settings-control-group">
              <label className="settings-label" htmlFor="font-size">
                Font Size
              </label>
              <select
                id="font-size"
                className="settings-select"
                value={settings.fontSize}
                onChange={(e) => handleSettingChange('fontSize', e.target.value)}
              >
                {Object.entries(FONT_SIZES).map(([key, config]) => (
                  <option key={key} value={key}>{config.name} ({config.baseSize})</option>
                ))}
              </select>
              <div className="font-size-preview">
                <p className="font-size-preview-text">
                  Sample text with selected font size. The quick brown fox jumps over the lazy dog.
                </p>
              </div>
              <p className="settings-description">
                Adjust the base font size for better readability
              </p>
            </div>

            <div className="settings-control-group">
              <label className="settings-label" htmlFor="language">
                Interface Language
              </label>
              <select
                id="language"
                className="settings-select"
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
              >
                {Object.entries(AVAILABLE_LANGUAGES).map(([key, lang]) => (
                  <option key={key} value={key}>{lang.flag} {lang.name}</option>
                ))}
              </select>
              <p className="settings-description">
                Selected: {getCurrentLanguage().flag} {getCurrentLanguage().name}
              </p>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div 
            className="settings-card"
            initial={{ opacity: 0, scale: 0.9, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            whileHover={{ y: -8, rotateX: 2 }}
          >
            <div className="settings-card-header">
              <Bell size={24} />
              <h3>Notifications</h3>
            </div>
            
            <motion.div 
              className="notification-item"
              whileHover={{ x: 4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="notification-info">
                <Mail className="notification-icon" size={20} />
                <div className="notification-details">
                  <h4>Email Notifications</h4>
                  <p>Receive updates via email</p>
                </div>
              </div>
              <div
                className={`settings-toggle ${settings.emailNotifications ? 'active' : ''}`}
                onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
              >
                <div className="settings-toggle-slider"></div>
              </div>
            </motion.div>

            <motion.div 
              className="notification-item"
              whileHover={{ x: 4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="notification-info">
                <Smartphone className="notification-icon" size={20} />
                <div className="notification-details">
                  <h4>Push Notifications</h4>
                  <p>Browser notifications</p>
                </div>
              </div>
              <div
                className={`settings-toggle ${settings.pushNotifications ? 'active' : ''}`}
                onClick={() => handleSettingChange('pushNotifications', !settings.pushNotifications)}
              >
                <div className="settings-toggle-slider"></div>
              </div>
            </motion.div>

            <motion.div 
              className="notification-item"
              whileHover={{ x: 4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="notification-info">
                <Volume2 className="notification-icon" size={20} />
                <div className="notification-details">
                  <h4>Sound Effects</h4>
                  <p>Audio feedback</p>
                </div>
              </div>
              <div
                className={`settings-toggle ${settings.soundEnabled ? 'active' : ''}`}
                onClick={() => handleSettingChange('soundEnabled', !settings.soundEnabled)}
              >
                <div className="settings-toggle-slider"></div>
              </div>
            </motion.div>
          </motion.div>

          {/* Performance */}
          <motion.div 
            className="settings-card"
            initial={{ opacity: 0, scale: 0.9, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            whileHover={{ y: -8, rotateX: 2 }}
          >

            <div className="notification-item">
              <div className="notification-info">
                <Save className="notification-icon" size={20} />
                <div className="notification-details">
                  <h4>Auto-save</h4>
                  <p>Automatically save preferences</p>
                </div>
              </div>
              <div
                className={`settings-toggle ${settings.autoSave ? 'active' : ''}`}
                onClick={() => handleSettingChange('autoSave', !settings.autoSave)}
              >
                <div className="settings-toggle-slider"></div>
              </div>
            </div>

            <div className="notification-item">
              <div className="notification-info">
                <Eye className="notification-icon" size={20} />
                <div className="notification-details">
                  <h4>Animations</h4>
                  <p>Enable smooth transitions</p>
                </div>
              </div>
              <div
                className={`settings-toggle ${settings.animationsEnabled ? 'active' : ''}`}
                onClick={() => handleSettingChange('animationsEnabled', !settings.animationsEnabled)}
              >
                <div className="settings-toggle-slider"></div>
              </div>
            </div>

            <div className="notification-item">
              <div className="notification-info">
                <HelpCircle className="notification-icon" size={20} />
                <div className="notification-details">
                  <h4>Show Hints</h4>
                  <p>Display helpful tooltips</p>
                </div>
              </div>
              <div
                className={`settings-toggle ${settings.showHints ? 'active' : ''}`}
                onClick={() => handleSettingChange('showHints', !settings.showHints)}
              >
                <div className="settings-toggle-slider"></div>
              </div>
            </div>
          </motion.div>

          {/* Accessibility */}
          <motion.div className="settings-card"
            initial={{ opacity: 0, scale: 0.9, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            whileHover={{ y: -8, rotateX: 2 }}
          >
            <div className="settings-card-header">
              <Accessibility size={24} />
              <h3>Accessibility</h3>
            </div>
            
            <div className="notification-item">
              <div className="notification-info">
                <Eye className="notification-icon" size={20} />
                <div className="notification-details">
                  <h4>High Contrast</h4>
                  <p>Increase visibility</p>
                </div>
              </div>
              <div
                className={`settings-toggle ${settings.highContrast ? 'active' : ''}`}
                onClick={() => handleSettingChange('highContrast', !settings.highContrast)}
              >
                <div className="settings-toggle-slider"></div>
              </div>
            </div>

            <div className="notification-item">
              <div className="notification-info">
                <Zap className="notification-icon" size={20} />
                <div className="notification-details">
                  <h4>Reduced Motion</h4>
                  <p>Minimize animations</p>
                </div>
              </div>
              <div
                className={`settings-toggle ${settings.reducedMotion ? 'active' : ''}`}
                onClick={() => handleSettingChange('reducedMotion', !settings.reducedMotion)}
              >
                <div className="settings-toggle-slider"></div>
              </div>
            </div>
          </motion.div>

          {/* Manage Settings */}
          <motion.div className="settings-card"
            initial={{ opacity: 0, scale: 0.9, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            whileHover={{ y: -8, rotateX: 2 }}
          >
            <div className="settings-card-header">
              <SettingsIcon size={24} />
              <h3>Manage Settings</h3>
            </div>

            <div className="settings-control-group">
              <label className="settings-label">Import/Export</label>
              <div className="settings-button-grid">
                <motion.button
                  className="settings-btn settings-btn-secondary"
                  onClick={() => fileInputRef.current?.click()}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Upload size={16} />Import
                </motion.button>
                <motion.button
                  className="settings-btn settings-btn-secondary"
                  onClick={() => { exportSettings(); showMessage('Settings exported!'); }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={16} />Export
                </motion.button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                style={{ display: 'none' }}
                onChange={(e) => e.target.files[0] && handleImport(e.target.files[0])}
              />
            </div>

            <div className="settings-control-group">
              <motion.button
                className="settings-btn settings-btn-danger"
                onClick={handleReset}
                style={{ width: '100%' }}
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <RefreshCw size={16} />Reset to Default
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
