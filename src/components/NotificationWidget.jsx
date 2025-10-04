// components/NotificationWidget.jsx
import React, { useState } from "react";
import { useNotifications } from "../contexts/NotificationsContext";

const NotificationWidget = () => {
  const { notifications, markAsRead } = useNotifications();
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div style={{ position: "fixed", top: 92, right: 20, zIndex: 2001 }}>
      <button onClick={() => setOpen(!open)}>
        Notifications ({unreadCount})
      </button>
      {open && (
        <div style={{ background: "#fff", border: "1px solid #ccc", padding: "1rem", width: "300px" }}>
          {notifications.length === 0 && <p>No notifications</p>}
          {notifications.map((n) => (
            <div
              key={n.id}
              style={{
                marginBottom: "0.5rem",
                background: n.read ? "#f9f9f9" : "#e6f7ff",
                padding: "0.5rem",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => markAsRead(n.id)}
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
