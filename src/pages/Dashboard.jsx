import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  Package,
  CheckCircle2,
  PlusCircle,
  LogOut,
  Activity,
} from "lucide-react";
import NotificationBell from "../components/NotificationBell";
import { connectWebSocket, disconnectWebSocket } from "../websocket";
import {
  getMyEscrows,
  shipEscrow,
  confirmDelivery,
  releaseEscrow,
  createEscrow,
  fundEscrow,
} from "../api/escrowApi";
import EscrowCard from "../components/EscrowCard";
import "../styles/dashboard.css";
import { ethers } from "ethers";
import FactoryABI from "../contracts/FactoryABI.json";
import { FACTORY_ADDRESS } from "../contracts/config";
import { safeArray } from "../utils/safeArray";

/* ── Empty State ─────────────────────────────────── */
function EmptyState({ icon: Icon, title, subtitle }) {
  return (
    <div className="empty-state">
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "14px",
          background: "rgba(99,102,241,0.1)",
          border: "1px solid rgba(99,102,241,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "12px",
        }}
      >
        <Icon size={22} style={{ color: "#6366f1", opacity: 0.7 }} />
      </div>
      <p
        style={{
          fontSize: "14px",
          fontWeight: "600",
          color: "#94a3b8",
          marginBottom: "4px",
        }}
      >
        {title}
      </p>
      <p style={{ fontSize: "12px", color: "#475569" }}>{subtitle}</p>
    </div>
  );
}

/* ── Section Header ──────────────────────────────── */
function SectionHeader({ icon: Icon, title, count, color = "#6366f1" }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "16px",
        marginTop: "32px",
      }}
    >
      <div
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "8px",
          background: `${color}18`,
          border: `1px solid ${color}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={14} style={{ color }} />
      </div>
      <h3
        style={{
          fontSize: "14px",
          fontWeight: "600",
          color: "#f1f5f9",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h3>
      {count !== undefined && (
        <span
          style={{
            padding: "1px 8px",
            borderRadius: "99px",
            background: `${color}18`,
            border: `1px solid ${color}28`,
            fontSize: "11px",
            fontWeight: "600",
            color,
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
}

/* ── Dashboard ───────────────────────────────────── */
const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userRole = user?.role?.replace("ROLE_", "");

  const [escrows, setEscrows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    sellerEmail: "",
    productName: "",
    amount: "",
  });

  // ── WebSocket ─────────────────────────────────────
  useEffect(() => {
    if (!user?.email) return;
    connectWebSocket(user.email, (updatedEscrow) => {
      setEscrows((prev) => {
        const exists = prev.find((e) => e.id === updatedEscrow.id);
        if (exists)
          return prev.map((e) =>
            e.id === updatedEscrow.id ? updatedEscrow : e,
          );
        return [updatedEscrow, ...prev];
      });
    });
    return () => disconnectWebSocket();
  }, [user?.email]);

  // ── Load escrows ─────────────────────────────────
  const loadEscrows = async () => {
    try {
      if (!user) return;
      setLoading(true);
      const role = userRole === "BUYER" ? "buyer" : "seller";
      const res = await getMyEscrows(role);
      // Normalize API response to ensure it's always an array
      const normalizedData = safeArray(res?.data?.data || res?.data || []);
      setEscrows(normalizedData);
    } catch (err) {
      console.error("Load Escrows Error:", err);
      setEscrows([]); // Ensure state is always an array even on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEscrows();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ── Create escrow ─────────────────────────────────
  const handleCreateEscrow = async (e) => {
    e.preventDefault();
    if (!form.sellerEmail || !form.productName || !form.amount) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      if (!window.ethereum) {
        toast.error("Please install MetaMask to continue");
        return;
      }

      const toastId = toast.loading("Deploying escrow contract…");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const factory = new ethers.Contract(FACTORY_ADDRESS, FactoryABI, signer);
      const sellerWallet = "0x18e28f17850ce30F39962c1c3e914d660366DcF1";
      const tx = await factory.createEscrow(sellerWallet);
      const receipt = await tx.wait();

      const iface = new ethers.Interface(FactoryABI);
      let escrowAddress = null;
      for (const log of receipt.logs) {
        try {
          const parsed = iface.parseLog(log);
          if (parsed && parsed.name === "EscrowCreated")
            escrowAddress = parsed.args[0];
        } catch {}
      }

      if (!escrowAddress) {
        toast.error("Escrow deployed but address not found", { id: toastId });
        return;
      }

      await createEscrow({
        sellerEmail: form.sellerEmail,
        buyerEmail: user.email,
        productName: form.productName,
        amount: form.amount,
        contractAddress: escrowAddress,
      });

      toast.success("Escrow created successfully!", { id: toastId });
      setForm({ sellerEmail: "", productName: "", amount: "" });
      loadEscrows();
    } catch (err) {
      console.error("Create Escrow Error:", err);
      toast.error("Failed to create escrow. Please try again.");
    }
  };

  // ── Actions ───────────────────────────────────────
  const handleShip = async (id) => {
    await shipEscrow(id);
  };
  const handleConfirm = async (id) => {
    await confirmDelivery(id);
  };
  const handleRelease = async (id) => {
    await releaseEscrow(id);
  };
  const handleFund = async (id) => {
    await fundEscrow(id);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const activeEscrows = safeArray(escrows).filter(
    (e) => e.escrowStatus !== "DELIVERED",
  );
  const completedEscrows = safeArray(escrows).filter(
    (e) => e.escrowStatus === "DELIVERED",
  );

  return (
    <div className="dashboard-bg" style={{ minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "24px 20px 48px",
        }}
      >
        {/* ── HEADER ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            marginBottom: "28px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(99,102,241,0.4)",
                flexShrink: 0,
              }}
            >
              <Activity size={18} color="#fff" />
            </div>
            <div>
              <h1
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  letterSpacing: "-0.025em",
                  color: "#f1f5f9",
                  lineHeight: 1.2,
                }}
              >
                Escrow <span className="gradient-text">Dashboard</span>
              </h1>
              <p
                style={{ fontSize: "13px", color: "#64748b", marginTop: "2px" }}
              >
                Welcome back,{" "}
                <strong style={{ color: "#94a3b8", fontWeight: "600" }}>
                  {user?.name}
                </strong>
                <span
                  style={{
                    marginLeft: "6px",
                    padding: "1px 7px",
                    borderRadius: "99px",
                    background: "rgba(99,102,241,0.12)",
                    border: "1px solid rgba(99,102,241,0.25)",
                    fontSize: "10px",
                    fontWeight: "600",
                    color: "#a5b4fc",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {userRole}
                </span>
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <NotificationBell userId={user?.email} />
            <button
              onClick={handleLogout}
              className="btn-secondary"
              style={{ padding: "8px 14px", gap: "7px", fontSize: "13px" }}
            >
              <LogOut size={13} />
              Logout
            </button>
          </div>
        </motion.div>

        {/* ── STATS ROW ───────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "12px",
            marginBottom: "28px",
          }}
        >
          {[
            { label: "Total Escrows", value: escrows.length, color: "#6366f1" },
            { label: "Active", value: activeEscrows.length, color: "#f59e0b" },
            {
              label: "Completed",
              value: completedEscrows.length,
              color: "#10b981",
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="stat-card"
            >
              <p className="label-text" style={{ marginBottom: "8px" }}>
                {stat.label}
              </p>
              <p
                style={{
                  fontSize: "26px",
                  fontWeight: "700",
                  letterSpacing: "-0.03em",
                  color: stat.color,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── CREATE ESCROW FORM ─────────────────────────── */}
        {userRole === "BUYER" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <SectionHeader
              icon={PlusCircle}
              title="Create New Escrow"
              color="#6366f1"
            />
            <form
              onSubmit={handleCreateEscrow}
              className="card"
              style={{ marginBottom: "0" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "14px",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <label className="saas-label">Seller Email</label>
                  <input
                    className="saas-input"
                    name="sellerEmail"
                    type="email"
                    placeholder="seller@example.com"
                    value={form.sellerEmail}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="saas-label">Product Name</label>
                  <input
                    className="saas-input"
                    name="productName"
                    placeholder="e.g. MacBook Pro M3"
                    value={form.productName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="saas-label">Amount (₹)</label>
                  <input
                    className="saas-input"
                    name="amount"
                    type="number"
                    placeholder="0.00"
                    value={form.amount}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: "10px 22px" }}
              >
                <PlusCircle size={14} />
                Create Escrow
              </button>
            </form>
          </motion.div>
        )}

        {/* ── ACTIVE ESCROWS ─────────────────────────────── */}
        <SectionHeader
          icon={Activity}
          title="Active Escrows"
          count={activeEscrows.length}
          color="#f59e0b"
        />

        {loading ? (
          <div style={{ display: "flex", gap: "14px" }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  minWidth: "200px",
                  height: "200px",
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
            ))}
          </div>
        ) : activeEscrows.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No active escrows"
            subtitle="Active escrows will appear here"
          />
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
              gap: "14px",
            }}
          >
            {activeEscrows.map((e) => (
              <EscrowCard
                key={e.id}
                e={e}
                user={user}
                onDeliver={handleShip}
                onConfirm={handleConfirm}
                onRelease={handleRelease}
                onFund={handleFund}
              />
            ))}
          </div>
        )}

        {/* ── COMPLETED ESCROWS ──────────────────────────── */}
        <SectionHeader
          icon={CheckCircle2}
          title="Completed Escrows"
          count={completedEscrows.length}
          color="#10b981"
        />

        {completedEscrows.length === 0 ? (
          <EmptyState
            icon={CheckCircle2}
            title="No completed escrows"
            subtitle="Completed escrows will appear here"
          />
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
              gap: "14px",
            }}
          >
            {completedEscrows.map((e) => (
              <EscrowCard key={e.id} e={e} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
