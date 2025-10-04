// components/NotificationWidget.jsx
import React, { useState, useEffect } from "react";
import { useNotifications } from "../contexts/NotificationsContext";

const NotificationWidget = () => {
  const { notifications, markAsRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Dynamic styles based on screen size
  const containerStyle = {
    position: "fixed",
    top: isMobile ? "80px" : "92px",
    right: isMobile ? "10px" : "20px",
    zIndex: 2001, // Above navbar (z-index: 2000)
  };

  const buttonStyle = {
    padding: isMobile ? "6px 10px" : "8px 12px",
    fontSize: isMobile ? "12px" : "14px",
    borderRadius: "8px",
    border: "1px solid var(--border-color, #ccc)",
    background: "var(--button-bg, #fff)",
    color: "var(--button-text, #333)",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    whiteSpace: "nowrap",
    transition: "all 0.2s ease",
  };

  const panelStyle = {
    position: "absolute",
    top: "100%",
    right: "0",
    marginTop: "8px",
    background: "var(--card-bg, #fff)",
    border: "1px solid var(--border-color, #ccc)",
    borderRadius: "8px",
    padding: isMobile ? "0.75rem" : "1rem",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    width: isMobile ? "min(280px, calc(100vw - 20px))" : "300px",
    maxHeight: isMobile ? "50vh" : "400px",
    overflowY: "auto",
    // Ensure it doesn't conflict with feedback widget
    marginBottom: isMobile ? "80px" : "0",
  };

  return (
    <div style={containerStyle}>
      <button style={buttonStyle} onClick={() => setOpen(!open)}>
        {isMobile ? `🔔 ${unreadCount}` : `Notifications (${unreadCount})`}
      </button>
      {open && (
        <div style={panelStyle}>
          {notifications.length === 0 && (
            <p style={{ 
              margin: 0, 
              color: "var(--text-secondary, #666)",
              fontSize: isMobile ? "13px" : "14px",
              textAlign: "center",
              padding: "1rem 0"
            }}>
              No notifications
            </p>
          )}
          {notifications.map((n) => (
            <div
              key={n.id}
              style={{
                marginBottom: "0.5rem",
                background: n.read ? "var(--bg-secondary, #f9f9f9)" : "var(--bg-accent, #e6f7ff)",
                padding: isMobile ? "0.4rem" : "0.5rem",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: isMobile ? "13px" : "14px",
                lineHeight: "1.4",
                transition: "all 0.2s ease",
                wordWrap: "break-word",
                border: "1px solid transparent",
              }}
              onClick={() => markAsRead(n.id)}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              {n.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationWidget;
