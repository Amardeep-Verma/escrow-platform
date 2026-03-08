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

/* Status → top border color and gradient */
const statusConfig = {
  CREATED: {
    color: "#f59e0b",
    gradient:
      "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.05))",
    border: "rgba(245,158,11,0.3)",
  },
  FUNDED: {
    color: "#6366f1",
    gradient:
      "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(99,102,241,0.05))",
    border: "rgba(99,102,241,0.3)",
  },
  SHIPPED: {
    color: "#a855f7",
    gradient:
      "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(168,85,247,0.05))",
    border: "rgba(168,85,247,0.3)",
  },
  DELIVERED: {
    color: "#10b981",
    gradient:
      "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))",
    border: "rgba(16,185,129,0.3)",
  },
  RELEASED: {
    color: "#10b981",
    gradient:
      "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))",
    border: "rgba(16,185,129,0.3)",
  },
};

export default function EscrowCard({ e, user, onDeliver, onConfirm }) {
  const role = user?.role?.replace("ROLE_", "");
  const [loading, setLoading] = useState(false);

  const config = statusConfig[e.escrowStatus] || statusConfig.CREATED;

  // ================= DEPOSIT =================
  const handleDeposit = async () => {
    try {
      if (!window.ethereum) {
        toast.error("To create an escrow you need a crypto wallet. Install MetaMask or open this site inside a wallet browser.”);
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -3 }}
      style={{
        background: config.gradient,
        border: `1px solid ${config.border}`,
        borderRadius: "18px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        position: "relative",
        boxShadow: `0 10px 30px rgba(0,0,0,0.4), 0 0 0 1px ${config.border}`,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
      onHoverStart={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px ${config.color}40, 0 0 30px ${config.color}20`;
      }}
      onHoverEnd={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = `0 10px 30px rgba(0,0,0,0.4), 0 0 0 1px ${config.border}`;
      }}
    >
      {/* Decorative top accent */}
      <div
        style={{
          height: "4px",
          background: `linear-gradient(90deg, ${config.color}00, ${config.color}60, ${config.color}00)`,
          boxShadow: `0 0 15px ${config.color}40`,
        }}
      />

      {/* Content */}
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          flex: 1,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: `${config.color}20`,
                border: `1px solid ${config.color}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: `0 8px 20px ${config.color}20`,
              }}
            >
              <Package size={18} style={{ color: config.color }} />
            </div>
            <div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#f1f5f9",
                  letterSpacing: "-0.01em",
                  marginBottom: "2px",
                }}
              >
                {e.productName}
              </h3>
              <p style={{ fontSize: "12px", color: "#94a3b8" }}>
                Transaction ID: {e.id}
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
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
            gap: "10px",
            padding: "12px 14px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            backdropFilter: "blur(8px)",
          }}
        >
          <Wallet size={16} style={{ color: config.color }} />
          <span
            style={{
              fontSize: "12px",
              color: "#94a3b8",
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
              fontSize: "18px",
              fontWeight: "800",
              color: config.color,
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
            gap: "10px",
            marginTop: "8px",
            flexWrap: "wrap",
          }}
        >
          {role === "BUYER" && e.escrowStatus === "CREATED" && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary"
              style={{
                flex: 1,
                fontSize: "14px",
                padding: "10px 18px",
                borderRadius: "12px",
                background: `linear-gradient(135deg, ${config.color}, ${config.color}cc)`,
                border: `1px solid ${config.color}40`,
                color: "#fff",
                fontWeight: "700",
                letterSpacing: "0.02em",
                boxShadow: `0 8px 20px ${config.color}30`,
                transition: "all 0.3s ease",
              }}
              onClick={handleDeposit}
              disabled={loading}
            >
              <Wallet size={16} style={{ marginRight: "8px" }} />
              {loading ? "Processing…" : "Fund Escrow"}
            </motion.button>
          )}

          {role === "SELLER" &&
            e.shipmentStatus === "PENDING" &&
            e.escrowStatus === "FUNDED" && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-warning"
                style={{
                  flex: 1,
                  fontSize: "14px",
                  padding: "10px 18px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #f59e0b, #f59e0b80)",
                  border: "1px solid #f59e0b40",
                  color: "#fff",
                  fontWeight: "700",
                  letterSpacing: "0.02em",
                  boxShadow: "0 8px 20px rgba(245,158,11,0.3)",
                  transition: "all 0.3s ease",
                }}
                onClick={() => onDeliver?.(e.id)}
              >
                <Truck size={16} style={{ marginRight: "8px" }} />
                Ship Product
              </motion.button>
            )}

          {role === "BUYER" &&
            e.shipmentStatus === "SHIPPED" &&
            e.escrowStatus === "FUNDED" && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-success"
                style={{
                  flex: 1,
                  fontSize: "14px",
                  padding: "10px 18px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #10b981, #10b98180)",
                  border: "1px solid #10b98140",
                  color: "#fff",
                  fontWeight: "700",
                  letterSpacing: "0.02em",
                  boxShadow: "0 8px 20px rgba(16,185,129,0.3)",
                  transition: "all 0.3s ease",
                }}
                onClick={handleConfirmDelivery}
                disabled={loading}
              >
                <ShieldCheck size={16} style={{ marginRight: "8px" }} />
                {loading ? "Processing…" : "Confirm Delivery"}
              </motion.button>
            )}
        </div>
      </div>
    </motion.div>
  );
}
