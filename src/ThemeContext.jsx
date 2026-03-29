import { createContext, useContext, useEffect, useMemo, useCallback } from "react";
import PropTypes from 'prop-types';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const theme = 'light';

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  // Single-theme app: keep API compatibility for existing callers.
  const toggleTheme = useCallback(() => {
    document.documentElement.setAttribute("data-theme", "light");
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

    // Tags (and their descendants) whose text color should never be auto-overridden
    const SKIP_TAGS = new Set(['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA', 'LABEL', 'OPTION', 'NAV', 'SVG', 'HEADER', 'FOOTER']);

    const isInsideSkippedTag = (el) => {
      let node = el.parentElement;
      while (node && node !== document.body) {
        if (SKIP_TAGS.has(node.tagName)) return true;
        node = node.parentElement;
      }
      return false;
    };

    const hasExplicitInlineColor = (el) => {
      // If the dev explicitly set a color via inline style, respect it
      const inlineStyle = el.getAttribute('style') || '';
      return /\bcolor\s*:/.test(inlineStyle);
    };

    const isWhiteLike = (el) => {
      const cs = window.getComputedStyle(el);
      return WHITE_RGB.has(cs.color.trim());
    };

    const applyLightOverrides = () => {
      const root = document.body;
      if (!root) return;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, null);
      const toOverride = [];
      while (walker.nextNode()) {
        const el = walker.currentNode;
        if (!(el instanceof HTMLElement)) continue;
        // Skip interactive elements and all their descendants
        if (SKIP_TAGS.has(el.tagName)) continue;
        if (isInsideSkippedTag(el)) continue;
        // Skip elements with an explicitly set inline color (intentional)
        if (hasExplicitInlineColor(el)) continue;
        // Skip elements opted out via data attribute
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
      const id = window.requestAnimationFrame(applyLightOverrides);
      return () => window.cancelAnimationFrame(id);
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