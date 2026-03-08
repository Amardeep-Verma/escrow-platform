import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  User,
  Calendar,
  Package,
  MapPin,
  Clock,
  AlertTriangle,
  Eye,
  Shield,
  CheckCircle,
  XCircle,
  MessageSquare,
  FileText,
} from "lucide-react";
import { disputeApi } from "../api/disputeApi";
import { safeArray } from "../utils/safeArray";
import toast from "react-hot-toast";
import DisputeModal from "./DisputeModal";

function EscrowStatusBadge({ status }) {
  const statusConfig = {
    PENDING: {
      label: "Pending",
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.15)",
      border: "rgba(245,158,11,0.3)",
    },
    FUNDED: {
      label: "Funded",
      color: "#10b981",
      bg: "rgba(16,185,129,0.15)",
      border: "rgba(16,185,129,0.3)",
    },
    SHIPPED: {
      label: "Shipped",
      color: "#3b82f6",
      bg: "rgba(59,130,246,0.15)",
      border: "rgba(59,130,246,0.3)",
    },
    DELIVERED: {
      label: "Delivered",
      color: "#22c55e",
      bg: "rgba(34,197,94,0.15)",
      border: "rgba(34,197,94,0.3)",
    },
    RELEASED: {
      label: "Released",
      color: "#8b5cf6",
      bg: "rgba(139,92,246,0.15)",
      border: "rgba(139,92,246,0.3)",
    },
    REFUNDED: {
      label: "Refunded",
      color: "#ef4444",
      bg: "rgba(239,68,68,0.15)",
      border: "rgba(239,68,68,0.3)",
    },
    DISPUTED: {
      label: "Disputed",
      color: "#ef4444",
      bg: "rgba(239,68,68,0.15)",
      border: "rgba(239,68,68,0.3)",
    },
  };

  const config = statusConfig[status] || statusConfig.PENDING;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 10px",
        borderRadius: "12px",
        background: config.bg,
        border: `1px solid ${config.border}`,
        fontSize: "12px",
        fontWeight: "700",
        color: config.color,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
      }}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: config.color,
          boxShadow: `0 0 8px ${config.color}`,
        }}
      />
      {config.label}
    </span>
  );
}

function DisputeCard({ dispute, onResolve }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "12px",
        padding: "12px",
        marginBottom: "8px",
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
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <AlertTriangle size={14} style={{ color: "#ef4444" }} />
          <span
            style={{
              fontSize: "12px",
              fontWeight: "700",
              color: "#f1f5f9",
            }}
          >
            Dispute #{dispute.id}
          </span>
          <EscrowStatusBadge status={dispute.status} />
        </div>
        <span
          style={{
            fontSize: "11px",
            color: "#64748b",
          }}
        >
          {new Date(dispute.createdAt).toLocaleString()}
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "8px",
          marginBottom: "8px",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "10px",
              color: "#64748b",
              fontWeight: "600",
              marginBottom: "4px",
              display: "block",
            }}
          >
            Reason
          </span>
          <span
            style={{
              fontSize: "12px",
              color: "#f1f5f9",
              fontWeight: "600",
            }}
          >
            {dispute.reason}
          </span>
        </div>

        <div>
          <span
            style={{
              fontSize: "10px",
              color: "#64748b",
              fontWeight: "600",
              marginBottom: "4px",
              display: "block",
            }}
          >
            Description
          </span>
          <span
            style={{
              fontSize: "12px",
              color: "#f1f5f9",
            }}
          >
            {dispute.description?.substring(0, 50)}...
          </span>
        </div>
      </div>

      {dispute.status === "OPEN" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "8px",
          }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onResolve(dispute.id, "RESOLVED_BUYER_WIN")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 8px",
              borderRadius: "8px",
              border: "1px solid rgba(16,185,129,0.4)",
              background:
                "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))",
              color: "#34d399",
              fontSize: "11px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.2s ease",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(16,185,129,0.25), rgba(16,185,129,0.15))";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))";
            }}
          >
            <CheckCircle size={10} />
            Buyer Wins
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onResolve(dispute.id, "RESOLVED_SELLER_WIN")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 8px",
              borderRadius: "8px",
              border: "1px solid rgba(59,130,246,0.4)",
              background:
                "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.05))",
              color: "#60a5fa",
              fontSize: "11px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.2s ease",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(59,130,246,0.15))";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.05))";
            }}
          >
            <XCircle size={10} />
            Seller Wins
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

export default function EscrowDetails({
  escrow,
  onClose,
  onDisputeCreated,
  isAdmin = false,
}) {
  const [disputes, setDisputes] = useState([]);
  const [loadingDisputes, setLoadingDisputes] = useState(false);
  const [showDisputeModal, setShowDisputeModal] = useState(false);

  useEffect(() => {
    const fetchDisputes = async () => {
      if (!escrow?.id) return;

      try {
        setLoadingDisputes(true);
        const data = await disputeApi.getDisputesForEscrow(escrow.id);
        setDisputes(safeArray(data));
      } catch (err) {
        console.error("Failed to fetch disputes:", err);
        toast.error("Failed to load disputes");
      } finally {
        setLoadingDisputes(false);
      }
    };
    fetchDisputes();
  }, [escrow?.id]);

  const handleDisputeCreated = (dispute) => {
    setDisputes((prev) => [...prev, dispute]);
    onDisputeCreated?.(dispute);
    toast.success("Dispute created successfully!");
  };

  const handleResolveDispute = async (disputeId, resolution) => {
    try {
      await disputeApi.resolveDispute(
        disputeId,
        resolution,
        "Admin resolution",
      );
      setDisputes((prev) =>
        prev.map((dispute) =>
          dispute.id === disputeId
            ? { ...dispute, status: resolution, resolvedAt: new Date() }
            : dispute,
        ),
      );
      toast.success("Dispute resolved successfully!");
    } catch (err) {
      console.error("Failed to resolve dispute:", err);
      toast.error("Failed to resolve dispute");
    }
  };

  const canCreateDispute =
    escrow?.escrowStatus !== "DELIVERED" &&
    escrow?.escrowStatus !== "RELEASED" &&
    escrow?.escrowStatus !== "REFUNDED";

  const hasOpenDispute = disputes.some((d) => d.status === "OPEN");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(800px, 95vw)",
        maxHeight: "85vh",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: "20px",
        padding: "24px",
        boxShadow:
          "0 25px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        zIndex: 1000,
        overflow: "auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
          paddingBottom: "16px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #6366f1, #4f46e5)",
              border: "1px solid rgba(99,102,241,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 25px rgba(99,102,241,0.5)",
            }}
          >
            <Package size={18} style={{ color: "#fff" }} />
          </motion.div>
          <div>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "800",
                letterSpacing: "-0.02em",
                color: "#f1f5f9",
                margin: 0,
                marginBottom: "4px",
              }}
            >
              Escrow Details
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
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
                #{escrow?.id}
              </span>
              <EscrowStatusBadge status={escrow?.escrowStatus} />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              fontSize: "12px",
              color: "#64748b",
              background: "rgba(255,255,255,0.05)",
              padding: "4px 8px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Created:{" "}
            {escrow?.createdAt
              ? new Date(escrow.createdAt).toLocaleString()
              : "—"}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.05)",
              color: "#94a3b8",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.color = "#f1f5f9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              e.currentTarget.style.color = "#94a3b8";
            }}
          >
            <span style={{ fontSize: "14px" }}>×</span>
          </motion.button>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        {/* Product Info */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "16px",
            padding: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "12px",
            }}
          >
            <Package size={16} style={{ color: "#64748b" }} />
            <span
              style={{
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#64748b",
              }}
            >
              Product Information
            </span>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <span
              style={{
                fontSize: "11px",
                color: "#64748b",
                fontWeight: "600",
                marginBottom: "4px",
                display: "block",
              }}
            >
              Product Name
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "#f1f5f9",
                fontWeight: "600",
              }}
            >
              {escrow?.productName || "—"}
            </span>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <span
              style={{
                fontSize: "11px",
                color: "#64748b",
                fontWeight: "600",
                marginBottom: "4px",
                display: "block",
              }}
            >
              Description
            </span>
            <span
              style={{
                fontSize: "13px",
                color: "#e2e8f0",
                lineHeight: "1.4",
              }}
            >
              {escrow?.description || "—"}
            </span>
          </div>

          <div>
            <span
              style={{
                fontSize: "11px",
                color: "#64748b",
                fontWeight: "600",
                marginBottom: "4px",
                display: "block",
              }}
            >
              Contract Address
            </span>
            <span
              style={{
                fontSize: "11px",
                fontFamily: "monospace",
                color: "#94a3b8",
                background: "rgba(255,255,255,0.05)",
                padding: "2px 6px",
                borderRadius: "4px",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {escrow?.contractAddress
                ? `${escrow.contractAddress.slice(0, 6)}...${escrow.contractAddress.slice(-4)}`
                : "—"}
            </span>
          </div>
        </div>

        {/* Financial Info */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "16px",
            padding: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "12px",
            }}
          >
            <DollarSign size={16} style={{ color: "#64748b" }} />
            <span
              style={{
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#64748b",
              }}
            >
              Financial Information
            </span>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <span
              style={{
                fontSize: "11px",
                color: "#64748b",
                fontWeight: "600",
                marginBottom: "4px",
                display: "block",
              }}
            >
              Amount
            </span>
            <span
              style={{
                fontSize: "20px",
                color: "#a5b4fc",
                fontWeight: "800",
                letterSpacing: "-0.02em",
              }}
            >
              ₹{escrow?.amount?.toLocaleString() || "0"}
            </span>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <span
              style={{
                fontSize: "11px",
                color: "#64748b",
                fontWeight: "600",
                marginBottom: "4px",
                display: "block",
              }}
            >
              Buyer Fee
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "#f1f5f9",
                fontWeight: "600",
              }}
            >
              ₹{(escrow?.amount * 0.02)?.toLocaleString() || "0"}
            </span>
          </div>

          <div>
            <span
              style={{
                fontSize: "11px",
                color: "#64748b",
                fontWeight: "600",
                marginBottom: "4px",
                display: "block",
              }}
            >
              Seller Fee
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "#f1f5f9",
                fontWeight: "600",
              }}
            >
              ₹{(escrow?.amount * 0.03)?.toLocaleString() || "0"}
            </span>
          </div>
        </div>

        {/* Parties */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "16px",
            padding: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "12px",
            }}
          >
            <User size={16} style={{ color: "#64748b" }} />
            <span
              style={{
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#64748b",
              }}
            >
              Parties
            </span>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <span
              style={{
                fontSize: "11px",
                color: "#64748b",
                fontWeight: "600",
                marginBottom: "4px",
                display: "block",
              }}
            >
              Buyer
            </span>
            <span
              style={{
                fontSize: "13px",
                color: "#f1f5f9",
                fontWeight: "600",
              }}
            >
              {escrow?.buyerEmail || "—"}
            </span>
          </div>

          <div>
            <span
              style={{
                fontSize: "11px",
                color: "#64748b",
                fontWeight: "600",
                marginBottom: "4px",
                display: "block",
              }}
            >
              Seller
            </span>
            <span
              style={{
                fontSize: "13px",
                color: "#f1f5f9",
                fontWeight: "600",
              }}
            >
              {escrow?.sellerEmail || "—"}
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "16px",
            padding: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "12px",
            }}
          >
            <Clock size={16} style={{ color: "#64748b" }} />
            <span
              style={{
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#64748b",
              }}
            >
              Timeline
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#64748b",
                  boxShadow: "0 0 8px #64748b",
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  color: "#94a3b8",
                }}
              >
                Created:{" "}
                {escrow?.createdAt
                  ? new Date(escrow.createdAt).toLocaleString()
                  : "—"}
              </span>
            </div>

            {escrow?.fundedAt && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#10b981",
                    boxShadow: "0 0 8px #10b981",
                  }}
                />
                <span
                  style={{
                    fontSize: "12px",
                    color: "#94a3b8",
                  }}
                >
                  Funded: {new Date(escrow.fundedAt).toLocaleString()}
                </span>
              </div>
            )}

            {escrow?.shippedAt && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#3b82f6",
                    boxShadow: "0 0 8px #3b82f6",
                  }}
                />
                <span
                  style={{
                    fontSize: "12px",
                    color: "#94a3b8",
                  }}
                >
                  Shipped: {new Date(escrow.shippedAt).toLocaleString()}
                </span>
              </div>
            )}

            {escrow?.deliveredAt && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#22c55e",
                    boxShadow: "0 0 8px #22c55e",
                  }}
                />
                <span
                  style={{
                    fontSize: "12px",
                    color: "#94a3b8",
                  }}
                >
                  Delivered: {new Date(escrow.deliveredAt).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dispute Section */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "16px",
          padding: "16px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <AlertTriangle size={16} style={{ color: "#ef4444" }} />
            <span
              style={{
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#64748b",
              }}
            >
              Dispute Management
            </span>
          </div>

          {canCreateDispute && !hasOpenDispute && !isAdmin && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowDisputeModal(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 12px",
                borderRadius: "10px",
                border: "1px solid rgba(239,68,68,0.4)",
                background:
                  "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))",
                color: "#f87171",
                fontSize: "12px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.2s ease",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(239,68,68,0.25), rgba(239,68,68,0.15))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))";
              }}
            >
              <AlertTriangle size={14} />
              Raise Dispute
            </motion.button>
          )}
        </div>

        {loadingDisputes ? (
          <div
            style={{
              padding: "16px",
              textAlign: "center",
              color: "#64748b",
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              style={{
                width: "20px",
                height: "20px",
                margin: "0 auto 8px",
                border: "2px solid rgba(239,68,68,0.3)",
                borderTop: "2px solid #ef4444",
                borderRadius: "50%",
              }}
            />
            <span style={{ fontSize: "12px" }}>Loading disputes…</span>
          </div>
        ) : disputes.length === 0 ? (
          <div
            style={{
              padding: "16px",
              textAlign: "center",
              color: "#64748b",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <AlertTriangle
              size={16}
              style={{ margin: "0 auto 8px", opacity: 0.4 }}
            />
            <span style={{ fontSize: "12px" }}>
              No disputes for this escrow
            </span>
          </div>
        ) : (
          <div>
            <AnimatePresence>
              {disputes.map((dispute) => (
                <DisputeCard
                  key={dispute.id}
                  dispute={dispute}
                  onResolve={handleResolveDispute}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Actions */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "8px",
        }}
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          style={{
            padding: "8px 16px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.05)",
            color: "#94a3b8",
            fontSize: "12px",
            fontWeight: "700",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            e.currentTarget.style.color = "#f1f5f9";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            e.currentTarget.style.color = "#94a3b8";
          }}
        >
          Close
        </motion.button>
      </div>

      {/* Dispute Modal */}
      <DisputeModal
        isOpen={showDisputeModal}
        onClose={() => setShowDisputeModal(false)}
        escrowId={escrow?.id}
        onDisputeCreated={handleDisputeCreated}
      />
    </motion.div>
  );
}
