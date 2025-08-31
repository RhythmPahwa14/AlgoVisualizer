import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from 'prop-types';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme || "light");
  }, []);

  const toggleTheme = useCallback(() => {
    // Use functional update to avoid depending on current theme
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  }, []);

  // When switching themes, adjust only white-like text to black in light mode for readability
  useEffect(() => {
    const WHITE_HEXES = new Set(["#ffffff", "#fff", "#e0e6ed"]);
    const WHITE_RGB = new Set([
      "rgb(255, 255, 255)",
      "rgba(255, 255, 255, 1)",
      "rgb(224, 230, 237)",
      "rgba(224, 230, 237, 1)"
    ]);

    // Helper to determine if an element's effective color is white/off-white
    const isWhiteLike = (el) => {
      const cs = window.getComputedStyle(el);
      const rgb = cs.color.trim();
      if (WHITE_RGB.has(rgb)) return true;
      // Try to compare inline hex if present
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
        // Skip elements that explicitly define non-white brand colors via data-keep-color
        if (el.dataset && (el.dataset.keepColor === 'true' || el.getAttribute('data-keep-color') === 'true')) continue;
        if (isWhiteLike(el)) toOverride.push(el);
      }
      toOverride.forEach((el) => {
        // store original to restore on dark
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
        // Remove inline color override to let original styles apply
        el.style.removeProperty('color');
        el.removeAttribute('data-overridden-text');
        // originalColor kept only for safety; not re-applied to avoid fighting theme CSS
      });
    };

    if (typeof window !== 'undefined') {
      if (theme === 'light') {
        // Defer a tick so styles are applied before measurement
        const id = window.requestAnimationFrame(applyLightOverrides);
        return () => window.cancelAnimationFrame(id);
      }
      // On dark, remove prior overrides
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
