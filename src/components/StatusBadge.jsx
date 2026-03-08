import { motion } from "framer-motion";

export default function StatusBadge({ status }) {
  const config = {
    CREATED: {
      dot: "#f59e0b",
      bg: "rgba(245,158,11,0.15)",
      border: "rgba(245,158,11,0.3)",
      text: "#fbbf24",
      gradient:
        "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.05))",
    },
    FUNDED: {
      dot: "#6366f1",
      bg: "rgba(99,102,241,0.15)",
      border: "rgba(99,102,241,0.3)",
      text: "#a5b4fc",
      gradient:
        "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(99,102,241,0.05))",
    },
    SHIPPED: {
      dot: "#a855f7",
      bg: "rgba(168,85,247,0.15)",
      border: "rgba(168,85,247,0.3)",
      text: "#c084fc",
      gradient:
        "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(168,85,247,0.05))",
    },
    DELIVERED: {
      dot: "#10b981",
      bg: "rgba(16,185,129,0.15)",
      border: "rgba(16,185,129,0.3)",
      text: "#34d399",
      gradient:
        "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))",
    },
    RELEASED: {
      dot: "#10b981",
      bg: "rgba(16,185,129,0.15)",
      border: "rgba(16,185,129,0.3)",
      text: "#34d399",
      gradient:
        "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))",
    },
    PENDING: {
      dot: "#64748b",
      bg: "rgba(100,116,139,0.15)",
      border: "rgba(100,116,139,0.25)",
      text: "#94a3b8",
      gradient:
        "linear-gradient(135deg, rgba(100,116,139,0.15), rgba(100,116,139,0.05))",
    },
    OPEN: {
      dot: "#f59e0b",
      bg: "rgba(245,158,11,0.15)",
      border: "rgba(245,158,11,0.3)",
      text: "#fbbf24",
      gradient:
        "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.05))",
    },
    CANCELLED: {
      dot: "#ef4444",
      bg: "rgba(239,68,68,0.15)",
      border: "rgba(239,68,68,0.3)",
      text: "#f87171",
      gradient:
        "linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.05))",
    },
  };

  const c = config[status] || config.PENDING;

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.05 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "6px 12px",
        borderRadius: "16px",
        background: c.gradient,
        border: `1px solid ${c.border}`,
        fontSize: "11px",
        fontWeight: "700",
        letterSpacing: "0.06em",
        color: c.text,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow: `0 4px 16px ${c.border}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated dot */}
      <motion.span
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: c.dot,
          flexShrink: 0,
          boxShadow: `0 0 12px ${c.dot}`,
          position: "relative",
        }}
      >
        {/* Inner glow effect */}
        <span
          style={{
            position: "absolute",
            inset: "-2px",
            borderRadius: "50%",
            border: `1px solid ${c.dot}60`,
            pointerEvents: "none",
          }}
        />
      </motion.span>

      {/* Status text */}
      <span style={{ position: "relative", zIndex: 1 }}>{status}</span>

      {/* Subtle shine effect */}
      <motion.div
        animate={{ x: [-20, 20, -20] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
          pointerEvents: "none",
        }}
      />
    </motion.span>
  );
}
