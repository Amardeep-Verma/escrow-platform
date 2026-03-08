import React, { useEffect, useState, useRef } from "react";
import { Bell, X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

  const getNotificationIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "success":
      case "completed":
        return <CheckCircle size={16} />;
      case "error":
      case "failed":
        return <AlertCircle size={16} />;
      default:
        return <Info size={16} />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type?.toLowerCase()) {
      case "success":
      case "completed":
        return "#10b981";
      case "error":
      case "failed":
        return "#ef4444";
      default:
        return "#6366f1";
    }
  };

  if (!userId) return null;

  return (
    <div className="relative" ref={ref}>
      <motion.button
        onClick={toggle}
        aria-label="Notifications"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: "relative",
          width: "40px",
          height: "40px",
          borderRadius: "12px",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
          border: "1px solid rgba(255,255,255,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.2s ease",
          color: "#94a3b8",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background =
            "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))";
          e.currentTarget.style.color = "#f1f5f9";
          e.currentTarget.style.boxShadow =
            "0 8px 25px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background =
            "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))";
          e.currentTarget.style.color = "#94a3b8";
          e.currentTarget.style.boxShadow =
            "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)";
        }}
      >
        <Bell size={16} strokeWidth={2} />
        {count > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{
              position: "absolute",
              top: "-6px",
              right: "-6px",
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              color: "#fff",
              fontSize: "11px",
              fontWeight: "800",
              minWidth: "20px",
              height: "20px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 4px",
              border: "2px solid #020617",
              boxShadow:
                "0 0 12px rgba(239,68,68,0.6), inset 0 1px 0 rgba(255,255,255,0.3)",
              letterSpacing: "0.02em",
            }}
          >
            {count > 99 ? "99+" : count}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: "absolute",
              right: 0,
              top: "calc(100% + 12px)",
              width: "360px",
              background:
                "linear-gradient(135deg, rgba(13,27,48,0.95), rgba(10,22,40,0.95))",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "16px",
              padding: "16px",
              zIndex: 50,
              boxShadow:
                "0 25px 70px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <h4
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#f1f5f9",
                    letterSpacing: "-0.01em",
                    margin: 0,
                  }}
                >
                  Notifications
                </h4>
                {count > 0 && (
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "#34d399",
                      background: "rgba(52,211,153,0.15)",
                      border: "1px solid rgba(52,211,153,0.3)",
                      padding: "2px 8px",
                      borderRadius: "99px",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {count} new
                  </span>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#64748b",
                  padding: "4px",
                  borderRadius: "8px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#94a3b8")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
              >
                <X size={16} />
              </motion.button>
            </div>

            {notifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  textAlign: "center",
                  padding: "24px 0",
                  color: "#64748b",
                  fontSize: "13px",
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ margin: "0 auto 12px", opacity: 0.6 }}
                >
                  <Bell size={24} />
                </motion.div>
                <p style={{ margin: 0 }}>No notifications yet</p>
                <p
                  style={{ margin: "4px 0 0", fontSize: "11px", opacity: 0.7 }}
                >
                  You'll be notified when something happens
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  maxHeight: "320px",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  padding: "4px",
                }}
              >
                {notifications.map((n, index) => (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      padding: "10px 12px",
                      borderRadius: "12px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: `${getNotificationColor(n.type)}20`,
                        border: `1px solid ${getNotificationColor(n.type)}40`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        boxShadow: `0 4px 12px ${getNotificationColor(n.type)}20`,
                      }}
                    >
                      {getNotificationIcon(n.type)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#f1f5f9",
                          lineHeight: "1.4",
                          margin: 0,
                        }}
                      >
                        {n.message}
                      </p>
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#64748b",
                          marginTop: "4px",
                          marginBottom: 0,
                        }}
                      >
                        {new Date(n.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
