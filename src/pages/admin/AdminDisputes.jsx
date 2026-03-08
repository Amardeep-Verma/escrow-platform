import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Scale, CheckCircle, XCircle, Clock } from "lucide-react";
import { getAllDisputes, resolveDispute } from "../../api/disputeApi";

function DisputeStatusBadge({ status }) {
  const isOpen = status === "OPEN";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "3px 10px",
        borderRadius: "99px",
        background: isOpen ? "rgba(245,158,11,0.1)" : "rgba(16,185,129,0.1)",
        border: `1px solid ${isOpen ? "rgba(245,158,11,0.3)" : "rgba(16,185,129,0.3)"}`,
        fontSize: "11px",
        fontWeight: "600",
        color: isOpen ? "#fbbf24" : "#34d399",
      }}
    >
      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: isOpen ? "#f59e0b" : "#10b981" }} />
      {status}
    </span>
  );
}

export default function AdminDisputes() {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDisputes = async () => {
    try {
      const res = await getAllDisputes();
      setDisputes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDisputes(); }, []);

  const handleDecision = async (id, decision) => {
    try {
      await resolveDispute(id, decision);
      fetchDisputes();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px", color: "#64748b", gap: "10px" }}>
        <Clock size={18} style={{ animation: "spin 1s linear infinite" }} />
        <span>Loading disputes…</span>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Scale size={15} style={{ color: "#f87171" }} />
        </div>
        <div>
          <h2 className="heading-lg" style={{ fontSize: "16px" }}>Dispute Management</h2>
          <p style={{ fontSize: "12px", color: "#475569" }}>{disputes.length} dispute{disputes.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {disputes.length === 0 ? (
        <div className="empty-state">
          <Scale size={32} style={{ color: "#475569", marginBottom: "10px", opacity: 0.4 }} />
          <p style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "500" }}>No disputes found</p>
          <p style={{ color: "#475569", fontSize: "12px", marginTop: "4px" }}>All disputes will appear here</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {disputes.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-pro"
              style={{ padding: "18px 20px" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap" }}>
                <div>
                  <h2 style={{ fontSize: "15px", fontWeight: "600", color: "#f1f5f9", marginBottom: "4px" }}>
                    {d.escrow?.productName || "Unknown Product"}
                  </h2>
                  <p style={{ fontSize: "12px", color: "#64748b" }}>
                    Amount:{" "}
                    <span style={{ color: "#a5b4fc", fontWeight: "600" }}>₹{d.escrow?.amount}</span>
                  </p>
                </div>
                <DisputeStatusBadge status={d.status} />
              </div>

              <div style={{ marginTop: "14px", padding: "12px 14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px" }}>
                <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "4px", fontWeight: "600", letterSpacing: "0.05em", textTransform: "uppercase" }}>Reason</p>
                <p style={{ fontSize: "13.5px", color: "#94a3b8", lineHeight: "20px" }}>{d.reason}</p>
              </div>

              <p style={{ fontSize: "11px", color: "#475569", marginTop: "10px" }}>
                Filed: {new Date(d.createdAt).toLocaleString()}
              </p>

              {d.evidenceUrl && (
                <img
                  src={d.evidenceUrl}
                  alt="Evidence"
                  style={{ marginTop: "12px", width: "120px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}
                />
              )}

              {d.status === "OPEN" && (
                <div style={{ display: "flex", gap: "10px", marginTop: "16px", flexWrap: "wrap" }}>
                  <button
                    className="btn-success"
                    style={{ padding: "8px 16px", fontSize: "13px" }}
                    onClick={() => handleDecision(d.id, "RELEASE_SELLER")}
                  >
                    <CheckCircle size={13} />
                    Release Seller
                  </button>
                  <button
                    className="btn-danger"
                    style={{ padding: "8px 16px", fontSize: "13px" }}
                    onClick={() => handleDecision(d.id, "REFUND_BUYER")}
                  >
                    <XCircle size={13} />
                    Refund Buyer
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
