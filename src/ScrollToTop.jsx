import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);
  const [nearBottom, setNearBottom] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const { pathname } = useLocation();
  const ticking = useRef(false);

  const forceScrollTop = useCallback((smooth = true) => {
    const behavior = smooth ? "smooth" : "auto";

    // Window scroll
    if (typeof window.scrollTo === "function") {
      window.scrollTo({ top: 0, behavior });
    }

    // Document fallback
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Inner container fallback
    const main = document.querySelector(".main-content");
    if (main) {
      if (typeof main.scrollTo === "function") {
        main.scrollTo({ top: 0, behavior });
      } else {
        main.scrollTop = 0;
      }
    }
  }, []);

  const forceScrollBottom = useCallback((smooth = true) => {
    const behavior = smooth ? "smooth" : "auto";

    // Window scroll to bottom
    if (typeof window.scrollTo === "function") {
      window.scrollTo({
        top: document.documentElement.scrollHeight || document.body.scrollHeight,
        behavior
      });
    }

    // Document fallbacks
    document.documentElement.scrollTop =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    document.body.scrollTop = document.body.scrollHeight || document.documentElement.scrollHeight;

    // Inner container fallback
    const main = document.querySelector(".main-content");
    if (main) {
      if (typeof main.scrollTo === "function") {
        main.scrollTo({ top: main.scrollHeight, behavior });
      } else {
        main.scrollTop = main.scrollHeight;
      }
    }
  }, []);

  // Prevent browser auto-restore
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Scroll listener (throttled with rAF)
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const y =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;
          const atBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 100;
          const isAtTop = y <= 200;
          // Show button when scrolled down OR when at top (so user can discover the "go to bottom" action)
          setShowButton(y > 200 || isAtTop);
          setNearBottom(atBottom);
          setAtTop(isAtTop);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    forceScrollTop(false); // jump immediately
    const timeout = setTimeout(() => forceScrollTop(true), 120); // smooth polish
    setShowButton(false);

    return () => clearTimeout(timeout);
  }, [pathname, forceScrollTop]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          // Toggle behavior: when at page top, clicking goes to bottom; otherwise go to top
          if (atTop) {
            forceScrollBottom(true);
          } else {
            forceScrollTop(true);
          }
        }}
        aria-label={atTop ? "Scroll to bottom" : "Scroll to top"}
        title={atTop ? "Go to bottom" : "Back to top"}
        className={`floating-btn scroll-to-top-btn ${showButton ? "show" : ""}`}
      >
        {/* Show down arrow when atTop (suggest go-to-bottom), otherwise up arrow */}
        {atTop ? (
          <i className="fa-solid fa-arrow-down" aria-hidden="true" />
        ) : (
          <i className="fa-solid fa-arrow-up" aria-hidden="true" />
        )}
        <span className="sr-only">Back to top</span>
      </button>

      <style>
        {`
          /* Modern Back to Top Button */
          .floating-btn {
            position: fixed;
            width: 56px;
            height: 56px;
            border-radius: 50%; /* Perfect circle */
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 1001;
            border: none;
            font-family: inherit;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            transform: translateY(0) scale(0.9);
            opacity: 0;
            visibility: hidden;
            animation: none;
            /* Ensure perfect circle */
            min-width: 56px;
            min-height: 56px;
            max-width: 56px;
            max-height: 56px;
            box-sizing: border-box;
          }

          .floating-btn.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0) scale(1);
            animation: gentleFloat 3s ease-in-out infinite;
          }

          /* Light theme styles */
          .scroll-to-top-btn {
            bottom: 14px; /* Positioned at the bottom */
            right: 24px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            font-size: 20px;
            box-shadow: 
              0 8px 32px rgba(102, 126, 234, 0.3),
              0 4px 16px rgba(118, 75, 162, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.2);
          }

          /* Ensure the arrow icon is solid white */
          .scroll-to-top-btn i,
          .scroll-to-top-btn .fa-solid {
            color: #ffffff !important;
          }

          /* Dark theme styles */
          [data-theme="dark"] .scroll-to-top-btn {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            box-shadow: 
              0 8px 32px rgba(79, 70, 229, 0.4),
              0 4px 16px rgba(124, 58, 237, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
          }

          /* Hover effects */
          .scroll-to-top-btn:hover {
            transform: translateY(-4px) scale(1.05);
            box-shadow: 
              0 12px 40px rgba(102, 126, 234, 0.4),
              0 6px 20px rgba(118, 75, 162, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.3);
          }

          [data-theme="dark"] .scroll-to-top-btn:hover {
            box-shadow: 
              0 12px 40px rgba(79, 70, 229, 0.5),
              0 6px 20px rgba(124, 58, 237, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.2);
          }

          /* Active/Click effect */
          .scroll-to-top-btn:active {
            transform: translateY(-2px) scale(0.98);
            transition: all 0.1s ease;
          }

          /* Focus styles for accessibility */
          .scroll-to-top-btn:focus {
            outline: none;
            box-shadow: 
              0 8px 32px rgba(102, 126, 234, 0.3),
              0 4px 16px rgba(118, 75, 162, 0.2),
              0 0 0 3px rgba(102, 126, 234, 0.4);
          }

          [data-theme="dark"] .scroll-to-top-btn:focus {
            box-shadow: 
              0 8px 32px rgba(79, 70, 229, 0.4),
              0 4px 16px rgba(124, 58, 237, 0.3),
              0 0 0 3px rgba(79, 70, 229, 0.4);
          }

          /* Gentle floating animation */
          @keyframes gentleFloat {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-3px) scale(1); }
          }

          /* Responsive design */
          @media (max-width: 768px) {
            .scroll-to-top-btn {
              width: 48px;
              height: 48px;
              min-width: 48px;
              min-height: 48px;
              max-width: 48px;
              max-height: 48px;
              font-size: 18px;
              bottom: 16px;
              right: 20px;
            }
          }

          @media (max-width: 480px) {
            .scroll-to-top-btn {
              width: 44px;
              height: 44px;
              min-width: 44px;
              min-height: 44px;
              max-width: 44px;
              max-height: 44px;
              font-size: 16px;
              bottom: 14px;
              right: 16px;
            }
          }

          /* High contrast mode support */
          @media (prefers-contrast: high) {
            .scroll-to-top-btn {
              background: #000000;
              color: #ffffff;
              border: 2px solid #ffffff;
            }

            [data-theme="dark"] .scroll-to-top-btn {
              background: #ffffff;
              color: #000000;
              border: 2px solid #000000;
            }
          }

          /* Reduced motion support */
          @media (prefers-reduced-motion: reduce) {
            .floating-btn {
              transition: opacity 0.2s ease, visibility 0.2s ease;
              animation: none !important;
            }

            .scroll-to-top-btn:hover {
              transform: none;
            }
          }

          /* Screen reader only text */
          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
          }
        `}
      </style>
    </>
  );
}
