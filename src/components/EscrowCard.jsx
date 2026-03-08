import { motion } from "framer-motion";
import { useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { Package, Truck, ShieldCheck, Wallet } from "lucide-react";
import EscrowProgress from "./EscrowProgress";
import StatusBadge from "./StatusBadge";
import EscrowABI from "../contracts/EscrowABI.json";
import { FACTORY_ADDRESS } from "../contracts/config";
import { fundEscrow } from "../api/escrowApi";

/* Status → top border color */
const statusColor = {
  CREATED: "#f59e0b",
  FUNDED: "#6366f1",
  SHIPPED: "#a855f7",
  DELIVERED: "#10b981",
  RELEASED: "#10b981",
};

export default function EscrowCard({ e, user, onDeliver, onConfirm }) {
  const role = user?.role?.replace("ROLE_", "");
  const [loading, setLoading] = useState(false);

  // ================= DEPOSIT =================
  const handleDeposit = async () => {
    try {
      if (!window.ethereum) {
        toast.error("Please install MetaMask to continue");
        return;
      }

      setLoading(true);

      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaa36a7" }],
      });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      if (!e.contractAddress) {
        toast.error("Escrow contract address missing");
        return;
      }

      const contract = new ethers.Contract(
        e.contractAddress,
        EscrowABI,
        signer,
      );

      const tx = await contract.deposit({ value: ethers.parseEther("0.0001") });
      await tx.wait();
      await fundEscrow(e.id);

      toast.success("Deposit successful! Refreshing...");
      setTimeout(() => window.location.reload(), 1200);
    } catch (err) {
      console.error(err);
      toast.error("Deposit failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ================= CONFIRM DELIVERY =================
  const handleConfirmDelivery = async () => {
    try {
      if (!window.ethereum) {
        toast.error("Please install MetaMask to continue");
        return;
      }

      setLoading(true);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        e.contractAddress,
        EscrowABI,
        signer,
      );

      const tx = await contract.confirmDelivery();
      await tx.wait();
      await onConfirm?.(e.id);

      toast.success("Delivery confirmed & payment released!");
      setTimeout(() => window.location.reload(), 1200);
    } catch (err) {
      console.error(err);
      toast.error("Transaction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const borderColor = statusColor[e.escrowStatus] || "#334155";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -3 }}
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.02) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.25s ease, border-color 0.25s ease",
        position: "relative",
        boxShadow:
          "0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
      onHoverStart={(e) => {
        e.currentTarget.style.boxShadow =
          "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.3), 0 0 24px rgba(99,102,241,0.1)";
        e.currentTarget.style.borderColor = "rgba(99,102,241,0.25)";
      }}
      onHoverEnd={(e) => {
        e.currentTarget.style.boxShadow =
          "0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      }}
    >
      {/* Colored top status bar */}
      <div
        style={{
          height: "3px",
          background: borderColor,
          boxShadow: `0 0 12px ${borderColor}60`,
        }}
      />

      {/* Content */}
      <div
        style={{
          padding: "18px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "0",
          flex: 1,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "10px",
            marginBottom: "4px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "9px",
                background: `${borderColor}20`,
                border: `1px solid ${borderColor}40`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Package size={16} style={{ color: borderColor }} />
            </div>
            <div>
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#f1f5f9",
                  letterSpacing: "-0.01em",
                  marginBottom: "1px",
                }}
              >
                {e.productName}
              </h3>
              <p style={{ fontSize: "11px", color: "#475569" }}>ID #{e.id}</p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              alignItems: "flex-end",
            }}
          >
            <StatusBadge status={e.escrowStatus} />
            {e.shipmentStatus && e.shipmentStatus !== "PENDING" && (
              <StatusBadge status={e.shipmentStatus} />
            )}
          </div>
        </div>

        {/* Amount */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 12px",
            background: "rgba(99,102,241,0.07)",
            border: "1px solid rgba(99,102,241,0.15)",
            borderRadius: "10px",
            marginTop: "14px",
            marginBottom: "4px",
          }}
        >
          <Wallet size={13} style={{ color: "#818cf8", flexShrink: 0 }} />
          <span
            style={{
              fontSize: "11px",
              color: "#64748b",
              fontWeight: "600",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Amount
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontSize: "15px",
              fontWeight: "700",
              color: "#a5b4fc",
              letterSpacing: "-0.02em",
            }}
          >
            ₹{e.amount}
          </span>
        </div>

        {/* Progress */}
        <EscrowProgress
          escrowStatus={e.escrowStatus}
          shipmentStatus={e.shipmentStatus}
        />

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginTop: "16px",
            flexWrap: "wrap",
          }}
        >
          {role === "BUYER" && e.escrowStatus === "CREATED" && (
            <button
              className="btn-primary"
              style={{ flex: 1, fontSize: "13px", padding: "9px 16px" }}
              onClick={handleDeposit}
              disabled={loading}
            >
              <Wallet size={13} />
              {loading ? "Processing…" : "Pay Now"}
            </button>
          )}

          {role === "SELLER" &&
            e.shipmentStatus === "PENDING" &&
            e.escrowStatus === "FUNDED" && (
              <button
                className="btn-warning"
                style={{ flex: 1, fontSize: "13px", padding: "9px 16px" }}
                onClick={() => onDeliver?.(e.id)}
              >
                <Truck size={13} />
                Ship Product
              </button>
            )}

          {role === "BUYER" &&
            e.shipmentStatus === "SHIPPED" &&
            e.escrowStatus === "FUNDED" && (
              <button
                className="btn-success"
                style={{ flex: 1, fontSize: "13px", padding: "9px 16px" }}
                onClick={handleConfirmDelivery}
                disabled={loading}
              >
                <ShieldCheck size={13} />
                {loading ? "Processing…" : "Confirm Delivery"}
              </button>
            )}
        </div>
      </div>
    </motion.div>
  );
}
