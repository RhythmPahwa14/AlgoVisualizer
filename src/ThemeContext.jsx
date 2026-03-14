import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from 'prop-types';

const ThemeContext = createContext();

// Helper function to get system theme preference
const getSystemTheme = () => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

// Always use light theme
const getInitialTheme = () => {
  return 'light';
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Always force light theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      return newTheme;
    });
  }, []);

  // Text color adjustment for light mode
  useEffect(() => {
    const WHITE_HEXES = new Set(["#ffffff", "#fff", "#e0e6ed"]);
    const WHITE_RGB = new Set([
      "rgb(255, 255, 255)",
      "rgba(255, 255, 255, 1)",
      "rgb(224, 230, 237)",
      "rgba(224, 230, 237, 1)"
    ]);

    const isWhiteLike = (el) => {
      const cs = window.getComputedStyle(el);
      const rgb = cs.color.trim();
      if (WHITE_RGB.has(rgb)) return true;
      const inline = (el.getAttribute('style') || '').toLowerCase();
      if (WHITE_HEXES.has(inline.match(/color:\s*([^;]+)/)?.[1]?.trim())) return true;
      return false;
    };

    const applyLightOverrides = () => {
      const root = document.body;
      if (!root) return;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, null);
      const toOverride = [];
      while (walker.nextNode()) {
        const el = walker.currentNode;
        if (!(el instanceof HTMLElement)) continue;
        if (el.dataset && (el.dataset.keepColor === 'true' || el.getAttribute('data-keep-color') === 'true')) continue;
        if (isWhiteLike(el)) toOverride.push(el);
      }
      toOverride.forEach((el) => {
        if (!el.dataset.originalColor) {
          const cs = window.getComputedStyle(el);
          el.dataset.originalColor = cs.color;
        }
        el.style.color = '#1a1a1a';
        el.dataset.overriddenText = 'true';
      });
    };

    const removeOverrides = () => {
      const root = document.body;
      if (!root) return;
      const overridden = root.querySelectorAll('[data-overridden-text="true"]');
      overridden.forEach((el) => {
        if (!(el instanceof HTMLElement)) return;
        el.style.removeProperty('color');
        el.removeAttribute('data-overridden-text');
      });
    };

    if (typeof window !== 'undefined') {
      if (theme === 'light') {
        const id = window.requestAnimationFrame(applyLightOverrides);
        return () => window.cancelAnimationFrame(id);
      }
      removeOverrides();
    }
    return undefined;
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

ThemeProvider.propTypes = { children: PropTypes.node };