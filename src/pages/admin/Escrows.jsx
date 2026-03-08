import { useEffect, useState } from "react";
import api from "../../api/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  Search,
  Package,
  User,
  Calendar,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import StatusBadge from "../../components/StatusBadge";
import { safeArray, safeFilter, safeReduce } from "../../utils/safeArray";

export default function Escrows() {
  const [escrows, setEscrows] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEscrows = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/admin/escrows");
        // Normalize API response to ensure it's always an array
        const normalizedEscrows = safeArray(res.data);
        setEscrows(normalizedEscrows);
      } catch (err) {
        console.error("Failed to fetch escrows:", err);
        setEscrows([]); // Ensure state is always an array even on error
      } finally {
        setLoading(false);
      }
    };
    fetchEscrows();
  }, []);

  const filtered = safeFilter(
    escrows,
    (e) =>
      String(e.id).includes(search) ||
      e.productName?.toLowerCase().includes(search.toLowerCase()),
  );

  // Stats calculations
  const totalAmount = safeReduce(
    filtered,
    (sum, e) => sum + (e.amount || 0),
    0,
  );
  const fundedCount = safeFilter(
    filtered,
    (e) => e.escrowStatus === "FUNDED",
  ).length;
  const completedCount = safeFilter(
    filtered,
    (e) => e.escrowStatus === "DELIVERED" || e.escrowStatus === "RELEASED",
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      style={{ minHeight: "100%" }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #6366f1, #4f46e5)",
              border: "1px solid rgba(99,102,241,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(99,102,241,0.4)",
            }}
          >
            <DollarSign size={16} style={{ color: "#fff" }} />
          </motion.div>
          <div>
            <h2
              className="heading-lg"
              style={{
                fontSize: "18px",
                fontWeight: "800",
                letterSpacing: "-0.02em",
                color: "#f1f5f9",
                margin: 0,
              }}
            >
              Escrow Management
            </h2>
            <p
              style={{
                fontSize: "12px",
                color: "#64748b",
                marginTop: "2px",
                margin: 0,
              }}
            >
              {escrows.length} total escrows
            </p>
          </div>
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          style={{ position: "relative", minWidth: "240px" }}
        >
          <Search
            size={14}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#64748b",
              pointerEvents: "none",
            }}
          />
          <input
            className="saas-input"
            placeholder="Search escrows by ID or product…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              paddingLeft: "36px",
              paddingRight: "12px",
              height: "40px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.05)",
              color: "#f1f5f9",
              fontSize: "13px",
              fontWeight: "500",
              transition: "all 0.2s ease",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            }}
          />
        </motion.div>
      </div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "14px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.06))",
            border: "1px solid rgba(16,185,129,0.25)",
            borderRadius: "14px",
            padding: "16px",
            boxShadow: "0 4px 16px rgba(16,185,129,0.15)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#34d399",
              }}
            >
              Total Volume
            </span>
            <TrendingUp size={16} style={{ color: "#34d399" }} />
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "800",
              color: "#86efac",
              letterSpacing: "-0.02em",
            }}
          >
            ₹{Number(totalAmount).toLocaleString()}
          </div>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(59,130,246,0.06))",
            border: "1px solid rgba(59,130,246,0.25)",
            borderRadius: "14px",
            padding: "16px",
            boxShadow: "0 4px 16px rgba(59,130,246,0.15)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#60a5fa",
              }}
            >
              Funded
            </span>
            <Package size={16} style={{ color: "#60a5fa" }} />
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "800",
              color: "#93c5fd",
              letterSpacing: "-0.02em",
            }}
          >
            {fundedCount}
          </div>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(239,68,68,0.12), rgba(239,68,68,0.06))",
            border: "1px solid rgba(239,68,68,0.25)",
            borderRadius: "14px",
            padding: "16px",
            boxShadow: "0 4px 16px rgba(239,68,68,0.15)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#f87171",
              }}
            >
              Completed
            </span>
            <TrendingDown size={16} style={{ color: "#f87171" }} />
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "800",
              color: "#fca5a5",
              letterSpacing: "-0.02em",
            }}
          >
            {completedCount}
          </div>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "16px",
          padding: "0",
          overflow: "hidden",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {loading ? (
          <div
            style={{
              padding: "48px",
              textAlign: "center",
              color: "#64748b",
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              style={{
                width: "32px",
                height: "32px",
                margin: "0 auto 12px",
                border: "3px solid rgba(99,102,241,0.3)",
                borderTop: "3px solid #6366f1",
                borderRadius: "50%",
              }}
            />
            <p style={{ fontSize: "14px", margin: 0 }}>Loading escrows…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div
            style={{
              padding: "48px",
              textAlign: "center",
              color: "#64748b",
            }}
          >
            <DollarSign
              size={32}
              style={{ margin: "0 auto 12px", opacity: 0.4 }}
            />
            <p style={{ fontSize: "14px", margin: 0 }}>No escrows found</p>
            <p
              style={{
                fontSize: "12px",
                color: "#475569",
                marginTop: "4px",
              }}
            >
              Try adjusting your search criteria
            </p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              className="saas-table"
              style={{
                width: "100%",
                borderCollapse: "separate",
                borderSpacing: "0",
              }}
            >
              <thead>
                <tr
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <th
                    style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      fontSize: "11px",
                      fontWeight: "700",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#64748b",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    ID
                  </th>
                  <th
                    style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      fontSize: "11px",
                      fontWeight: "700",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#64748b",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    Product
                  </th>
                  <th
                    style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      fontSize: "11px",
                      fontWeight: "700",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#64748b",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    Amount
                  </th>
                  <th
                    style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      fontSize: "11px",
                      fontWeight: "700",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#64748b",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    Status
                  </th>
                  <th
                    style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      fontSize: "11px",
                      fontWeight: "700",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#64748b",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    Created
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filtered.map((escrow, i) => (
                    <motion.tr
                      key={escrow.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ delay: i * 0.04 }}
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <td style={{ padding: "14px 16px" }}>
                        <span
                          style={{
                            fontFamily: "monospace",
                            fontSize: "12px",
                            background: "rgba(255,255,255,0.05)",
                            padding: "2px 7px",
                            borderRadius: "5px",
                            color: "#94a3b8",
                            fontWeight: "600",
                          }}
                        >
                          #{escrow.id}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div>
                          <span
                            style={{
                              color: "#f1f5f9",
                              fontWeight: "600",
                              fontSize: "14px",
                              display: "block",
                            }}
                          >
                            {escrow.productName || "—"}
                          </span>
                          <span
                            style={{
                              fontSize: "11px",
                              color: "#64748b",
                              display: "block",
                              marginTop: "2px",
                            }}
                          >
                            Contract:{" "}
                            {escrow.contractAddress
                              ? `${escrow.contractAddress.slice(
                                  0,
                                  6,
                                )}...${escrow.contractAddress.slice(-4)}`
                              : "—"}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: "800",
                              color: "#a5b4fc",
                              fontSize: "14px",
                            }}
                          >
                            ₹{escrow.amount?.toLocaleString() || "0"}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <StatusBadge status={escrow.escrowStatus} />
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <Calendar size={12} style={{ color: "#64748b" }} />
                          <span
                            style={{
                              fontSize: "12px",
                              color: "#94a3b8",
                            }}
                          >
                            {new Date(escrow.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
