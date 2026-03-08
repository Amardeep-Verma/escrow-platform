export default function StatusBadge({ status }) {
  const config = {
    CREATED:   { dot: "#f59e0b", bg: "rgba(245,158,11,0.1)",   border: "rgba(245,158,11,0.25)",   text: "#fbbf24" },
    FUNDED:    { dot: "#6366f1", bg: "rgba(99,102,241,0.12)",  border: "rgba(99,102,241,0.3)",    text: "#a5b4fc" },
    SHIPPED:   { dot: "#a855f7", bg: "rgba(168,85,247,0.1)",   border: "rgba(168,85,247,0.25)",   text: "#c084fc" },
    DELIVERED: { dot: "#10b981", bg: "rgba(16,185,129,0.1)",   border: "rgba(16,185,129,0.25)",   text: "#34d399" },
    RELEASED:  { dot: "#10b981", bg: "rgba(16,185,129,0.1)",   border: "rgba(16,185,129,0.25)",   text: "#34d399" },
    PENDING:   { dot: "#64748b", bg: "rgba(100,116,139,0.1)",  border: "rgba(100,116,139,0.2)",   text: "#94a3b8" },
    OPEN:      { dot: "#f59e0b", bg: "rgba(245,158,11,0.1)",   border: "rgba(245,158,11,0.25)",   text: "#fbbf24" },
    CANCELLED: { dot: "#ef4444", bg: "rgba(239,68,68,0.1)",    border: "rgba(239,68,68,0.25)",    text: "#f87171" },
  };

  const c = config[status] || config.PENDING;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "3px 9px",
        borderRadius: "99px",
        background: c.bg,
        border: `1px solid ${c.border}`,
        fontSize: "11px",
        fontWeight: "600",
        letterSpacing: "0.04em",
        color: c.text,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: c.dot,
          flexShrink: 0,
          boxShadow: `0 0 6px ${c.dot}`,
        }}
      />
      {status}
    </span>
  );
}
