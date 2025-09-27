import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

const SettingsContext = createContext();

// Default settings configuration
const DEFAULT_SETTINGS = {
  // Appearance
  fontSize: 'medium', // 'small', 'medium', 'large'
  fontFamily: 'inter', // 'inter', 'space-grotesk', 'system', 'serif', 'mono'
  colorScheme: 'default', // 'default', 'blue', 'green', 'purple', 'orange'
  customAccentColor: '#58a6ff',
  
  // Language & Localization
  language: 'en', // 'en', 'hi', 'es', 'fr'
  
  // Notifications
  emailNotifications: true,
  pushNotifications: true,
  soundEnabled: true,
  
  // Performance & Behavior
  animationsEnabled: true,
  autoSave: true,
  showHints: true,
  
  // Accessibility
  highContrast: false,
  reducedMotion: false,
};

// Available languages
export const AVAILABLE_LANGUAGES = {
  en: { name: 'English', flag: '🇺🇸' },
  hi: { name: 'हिंदी', flag: '🇮🇳' },
  es: { name: 'Español', flag: '🇪🇸' },
  fr: { name: 'Français', flag: '🇫🇷' },
};

// Available color schemes
export const COLOR_SCHEMES = {
  default: { name: 'Default', primary: '#58a6ff', secondary: '#79c0ff' },
  blue: { name: 'Ocean Blue', primary: '#2563eb', secondary: '#3b82f6' },
  green: { name: 'Forest Green', primary: '#059669', secondary: '#10b981' },
  purple: { name: 'Royal Purple', primary: '#7c3aed', secondary: '#8b5cf6' },
  orange: { name: 'Sunset Orange', primary: '#ea580c', secondary: '#f97316' },
  pink: { name: 'Cherry Blossom', primary: '#db2777', secondary: '#ec4899' },
  red: { name: 'Crimson Red', primary: '#dc2626', secondary: '#ef4444' },
  teal: { name: 'Teal Wave', primary: '#0d9488', secondary: '#14b8a6' },
  indigo: { name: 'Deep Indigo', primary: '#3730a3', secondary: '#4f46e5' },
  amber: { name: 'Golden Amber', primary: '#d97706', secondary: '#f59e0b' },
};

// Font size configurations
export const FONT_SIZES = {
  small: { name: 'Small', scale: 0.875, baseSize: '14px' },
  medium: { name: 'Medium', scale: 1, baseSize: '16px' },
  large: { name: 'Large', scale: 1.125, baseSize: '18px' },
};

// Font family configurations
export const FONT_FAMILIES = {
  inter: { name: 'Inter', family: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" },
  'space-grotesk': { name: 'Space Grotesk', family: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif" },
  system: { name: 'System Default', family: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" },
  serif: { name: 'Serif', family: "Georgia, 'Times New Roman', serif" },
  mono: { name: 'Monospace', family: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" },
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('app-settings');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(prevSettings => ({ ...prevSettings, ...parsedSettings }));
      }
    } catch (error) {
      console.warn('Failed to load settings from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save settings to localStorage whenever settings change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('app-settings', JSON.stringify(settings));
      } catch (error) {
        console.warn('Failed to save settings to localStorage:', error);
      }
    }
  }, [settings, isLoading]);

  // Apply font size to document root
  useEffect(() => {
    const fontConfig = FONT_SIZES[settings.fontSize];
    if (fontConfig) {
      document.documentElement.style.setProperty('--base-font-size', fontConfig.baseSize);
      document.documentElement.style.setProperty('--font-scale', fontConfig.scale);
    }
  }, [settings.fontSize]);

  // Apply font family to document root
  useEffect(() => {
    const fontFamilyConfig = FONT_FAMILIES[settings.fontFamily];
    if (fontFamilyConfig) {
      document.documentElement.style.setProperty('--font-family', fontFamilyConfig.family);
    }
  }, [settings.fontFamily]);

  // Apply color scheme to document root
  useEffect(() => {
    const scheme = COLOR_SCHEMES[settings.colorScheme];
    if (scheme) {
      document.documentElement.style.setProperty('--user-accent-primary', scheme.primary);
      document.documentElement.style.setProperty('--user-accent-secondary', scheme.secondary);
    }
    
    // Apply custom accent color if set
    if (settings.customAccentColor) {
      document.documentElement.style.setProperty('--user-custom-accent', settings.customAccentColor);
    }
  }, [settings.colorScheme, settings.customAccentColor]);

  // Apply accessibility settings
  useEffect(() => {
    document.documentElement.style.setProperty('--reduced-motion', settings.reducedMotion ? '1' : '0');
    document.documentElement.style.setProperty('--high-contrast', settings.highContrast ? '1' : '0');
    document.documentElement.style.setProperty('--animations-enabled', settings.animationsEnabled ? '1' : '0');
  }, [settings.reducedMotion, settings.highContrast, settings.animationsEnabled]);

  // Update a specific setting
  const updateSetting = useCallback((key, value) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [key]: value
    }));
  }, []);

  // Update multiple settings at once
  const updateSettings = useCallback((newSettings) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings
    }));
  }, []);

  // Reset settings to default
  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    // Clear localStorage
    try {
      localStorage.removeItem('app-settings');
    } catch (error) {
      console.warn('Failed to clear settings from localStorage:', error);
    }
  }, []);

  // Export settings as JSON
  const exportSettings = useCallback(() => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'algovisualizer-settings.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [settings]);

  // Import settings from JSON
  const importSettings = useCallback((jsonString) => {
    try {
      const importedSettings = JSON.parse(jsonString);
      // Validate that imported settings have valid keys
      const validSettings = {};
      Object.keys(DEFAULT_SETTINGS).forEach(key => {
        if (key in importedSettings) {
          validSettings[key] = importedSettings[key];
        }
      });
      updateSettings(validSettings);
      return true;
    } catch (error) {
      console.error('Failed to import settings:', error);
      return false;
    }
  }, [updateSettings]);

  // Get current language configuration
  const getCurrentLanguage = useCallback(() => {
    return AVAILABLE_LANGUAGES[settings.language] || AVAILABLE_LANGUAGES.en;
  }, [settings.language]);

  // Get current color scheme configuration
  const getCurrentColorScheme = useCallback(() => {
    return COLOR_SCHEMES[settings.colorScheme] || COLOR_SCHEMES.default;
  }, [settings.colorScheme]);

  // Get current font size configuration
  const getCurrentFontSize = useCallback(() => {
    return FONT_SIZES[settings.fontSize] || FONT_SIZES.medium;
  }, [settings.fontSize]);

  // Get current font family configuration
  const getCurrentFontFamily = useCallback(() => {
    return FONT_FAMILIES[settings.fontFamily] || FONT_FAMILIES.inter;
  }, [settings.fontFamily]);

  const value = useMemo(() => ({
    settings,
    isLoading,
    updateSetting,
    updateSettings,
    resetSettings,
    exportSettings,
    importSettings,
    getCurrentLanguage,
    getCurrentColorScheme,
    getCurrentFontSize,
    getCurrentFontFamily,
    // Helper getters
    fontSize: settings.fontSize,
    fontFamily: settings.fontFamily,
    colorScheme: settings.colorScheme,
    language: settings.language,
    emailNotifications: settings.emailNotifications,
    pushNotifications: settings.pushNotifications,
    animationsEnabled: settings.animationsEnabled,
    autoSave: settings.autoSave,
  }), [
    settings,
    isLoading,
    updateSetting,
    updateSettings,
    resetSettings,
    exportSettings,
    importSettings,
    getCurrentLanguage,
    getCurrentColorScheme,
    getCurrentFontSize,
    getCurrentFontFamily,
  ]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};