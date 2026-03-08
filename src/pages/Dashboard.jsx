import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  CheckCircle2,
  PlusCircle,
  LogOut,
  Activity,
  Users,
  DollarSign,
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

/* ── Empty State ─────────────────────────────────── */
function EmptyState({ icon: Icon, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-pro"
      style={{
        padding: "40px 24px",
        textAlign: "center",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background element */}
      <div
        style={{
          position: "absolute",
          top: "-50%",
          right: "-50%",
          width: "200%",
          height: "200%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "16px",
          background:
            "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(16,185,129,0.1))",
          border: "1px solid rgba(99,102,241,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 16px",
          boxShadow: "0 8px 32px rgba(99,102,241,0.2)",
        }}
      >
        <Icon
          size={28}
          style={{
            color: "#818cf8",
            filter: "drop-shadow(0 4px 8px rgba(99,102,241,0.3))",
          }}
        />
      </div>

      <h3
        style={{
          fontSize: "18px",
          fontWeight: "700",
          color: "#f1f5f9",
          marginBottom: "8px",
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "14px",
          color: "#94a3b8",
          lineHeight: "1.6",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        {subtitle}
      </p>
    </motion.div>
  );
}

/* ── Section Header ──────────────────────────────── */
function SectionHeader({ icon: Icon, title, count, color = "#6366f1" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "20px",
        marginTop: "32px",
        padding: "12px 16px",
        borderRadius: "14px",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "12px",
          background: `linear-gradient(135deg, ${color}20, ${color}10)`,
          border: `1px solid ${color}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: `0 4px 16px ${color}20`,
        }}
      >
        <Icon size={16} style={{ color }} />
      </div>
      <h3
        style={{
          fontSize: "16px",
          fontWeight: "700",
          color: "#f1f5f9",
          letterSpacing: "-0.015em",
          margin: 0,
        }}
      >
        {title}
      </h3>
      {count !== undefined && (
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{
            padding: "6px 12px",
            borderRadius: "99px",
            background: `linear-gradient(135deg, ${color}20, ${color}10)`,
            border: `1px solid ${color}30`,
            fontSize: "12px",
            fontWeight: "700",
            color,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            boxShadow: `0 4px 12px ${color}20`,
          }}
        >
          {count}
        </motion.span>
      )}
    </motion.div>
  );
}

/* ── Stat Card ────────────────────────────────────── */
function StatCard({
  icon: Icon,
  label,
  value,
  color = "#6366f1",
  trend,
  trendValue,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.02 }}
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "18px",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: "all 0.3s ease",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
      onHoverStart={(e) => {
        e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px ${color}30, inset 0 1px 0 rgba(255,255,255,0.1)`;
      }}
      onHoverEnd={(e) => {
        e.currentTarget.style.boxShadow =
          "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)";
      }}
    >
      {/* Decorative corner accents */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "60px",
          height: "60px",
          background: `radial-gradient(circle at 0 0, ${color}20, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "60px",
          height: "60px",
          background: `radial-gradient(circle at 100% 100%, ${color}15, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "12px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            background: `linear-gradient(135deg, ${color}25, ${color}15)`,
            border: `1px solid ${color}35`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 8px 24px ${color}25`,
          }}
        >
          <Icon
            size={18}
            style={{
              color: "#fff",
              filter: `drop-shadow(0 2px 4px ${color}40)`,
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "#94a3b8",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            {label}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
        <span
          style={{
            fontSize: "28px",
            fontWeight: "800",
            color: "#f1f5f9",
            letterSpacing: "-0.03em",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
          }}
        >
          {value}
        </span>
        {trend && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 8px",
              borderRadius: "999px",
              background:
                trend === "up"
                  ? "rgba(16,185,129,0.15)"
                  : "rgba(239,68,68,0.15)",
              border:
                trend === "up"
                  ? "1px solid rgba(16,185,129,0.3)"
                  : "1px solid rgba(239,68,68,0.3)",
              fontSize: "11px",
              fontWeight: "700",
              color: trend === "up" ? "#34d399" : "#f87171",
              letterSpacing: "0.04em",
            }}
          >
            {trend === "up" ? "↗" : "↘"}
            {trendValue}%
          </motion.div>
        )}
      </div>
    </motion.div>
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
      const data = res?.data?.data || res?.data || [];
      setEscrows(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Load Escrows Error:", err);
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

  const activeEscrows = escrows.filter((e) => e.escrowStatus !== "DELIVERED");
  const completedEscrows = escrows.filter(
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
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          <StatCard
            icon={DollarSign}
            label="Total Volume"
            value={escrows
              .reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0)
              .toLocaleString()}
            color="#6366f1"
            trend="up"
            trendValue="12.5"
          />
          <StatCard
            icon={Activity}
            label="Active Escrows"
            value={activeEscrows.length}
            color="#f59e0b"
          />
          <StatCard
            icon={CheckCircle2}
            label="Completed"
            value={completedEscrows.length}
            color="#10b981"
            trend="up"
            trendValue="8.2"
          />
          <StatCard
            icon={Users}
            label="Avg Deal Size"
            value={`₹${(escrows.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0) / (escrows.length || 1)).toLocaleString()}`}
            color="#a855f7"
          />
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
