import React, { useEffect, useState, useRef } from "react";
import { Bell, X } from "lucide-react";
import {
  getNotifications,
  getUnreadCount,
  markAllRead,
} from "../api/notificationApi";

const NotificationBell = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!userId) return;
    loadData();
  }, [userId]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const loadData = async () => {
    try {
      const res1 = await getNotifications(userId);
      const res2 = await getUnreadCount(userId);
      setNotifications(res1?.data || []);
      setCount(res2?.data || 0);
    } catch (err) {
      console.error("Notification Error:", err);
    }
  };

  const toggle = async () => {
    setOpen((v) => !v);
    if (userId && count > 0) {
      await markAllRead(userId);
      setCount(0);
    }
  };

  if (!userId) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={toggle}
        aria-label="Notifications"
        style={{
          position: "relative",
          width: "36px",
          height: "36px",
          borderRadius: "10px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.09)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.18s ease",
          color: "#94a3b8",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.1)";
          e.currentTarget.style.color = "#f1f5f9";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.06)";
          e.currentTarget.style.color = "#94a3b8";
        }}
      >
        <Bell size={15} strokeWidth={2} />
        {count > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              background: "#ef4444",
              color: "#fff",
              fontSize: "10px",
              fontWeight: "700",
              minWidth: "17px",
              height: "17px",
              borderRadius: "99px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 3px",
              border: "2px solid #020617",
              boxShadow: "0 0 8px rgba(239,68,68,0.5)",
            }}
          >
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 10px)",
            width: "320px",
            background: "linear-gradient(135deg, #0d1b30, #0a1628)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "14px",
            padding: "16px",
            zIndex: 50,
            boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.2)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <h4 style={{ fontSize: "13px", fontWeight: "600", color: "#f1f5f9" }}>Notifications</h4>
            <button
              onClick={() => setOpen(false)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", padding: "2px" }}
            >
              <X size={14} />
            </button>
          </div>

          {notifications.length === 0 ? (
            <div style={{ textAlign: "center", padding: "20px 0", color: "#64748b", fontSize: "13px" }}>
              <Bell size={22} style={{ margin: "0 auto 8px", opacity: 0.4 }} />
              <p>No notifications yet</p>
            </div>
          ) : (
            <div style={{ maxHeight: "280px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "6px" }}>
              {notifications.map((n) => (
                <div key={n.id} className="notif-item">{n.message}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
