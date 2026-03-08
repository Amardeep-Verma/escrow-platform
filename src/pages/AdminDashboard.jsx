import React, { useEffect, useState } from "react";
import api from "../api/api";
import { motion } from "framer-motion";
import {
  LineChart, Line, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Legend,
} from "recharts";

const COLORS = ["#f59e0b", "#6366f1", "#10b981", "#ef4444"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#0a1628",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "10px",
          padding: "10px 14px",
          fontSize: "13px",
          color: "#f1f5f9",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        }}
      >
        {label && <p style={{ color: "#64748b", marginBottom: "4px", fontSize: "11px", fontWeight: "600", letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</p>}
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color || "#a5b4fc", fontWeight: "600" }}>
            {p.name}: <span style={{ color: "#f1f5f9" }}>₹{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [escrows, setEscrows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersRes = await api.get("/api/admin/users");
      const escrowRes = await api.get("/api/admin/escrows");
      setUsers(usersRes.data);
      setEscrows(escrowRes.data);
    };
    fetchData();
  }, []);

  const totalVolume = escrows.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const activeEscrows = escrows.filter((e) => e.escrowStatus !== "RELEASED").length;

  const lineData = escrows.map((e, i) => ({ name: `#${i + 1}`, amount: Number(e.amount) }));
  const revenueData = lineData.slice(-6);

  const statusData = [
    { name: "Created",   value: escrows.filter((e) => e.escrowStatus === "CREATED").length },
    { name: "Funded",    value: escrows.filter((e) => e.escrowStatus === "FUNDED").length },
    { name: "Released",  value: escrows.filter((e) => e.escrowStatus === "RELEASED").length },
    { name: "Cancelled", value: escrows.filter((e) => e.escrowStatus === "CANCELLED").length },
  ];

  const stats = [
    { title: "Total Users",    value: users.length,    color: "#6366f1", sub: "registered" },
    { title: "Total Escrows",  value: escrows.length,  color: "#3b82f6", sub: "all time" },
    { title: "Active Escrows", value: activeEscrows,   color: "#f59e0b", sub: "in progress" },
    { title: "Volume",         value: `₹${totalVolume}`, color: "#10b981", sub: "total" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* STATS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px" }}>
        {stats.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ y: -3 }}
            className="glass-pro dashboard-glow"
            style={{ padding: "18px 20px" }}
          >
            <p className="label-text" style={{ marginBottom: "10px" }}>{card.title}</p>
            <p
              style={{
                fontSize: "28px",
                fontWeight: "700",
                letterSpacing: "-0.03em",
                color: card.color,
                fontVariantNumeric: "tabular-nums",
                lineHeight: 1,
              }}
            >
              {card.value}
            </p>
            <p style={{ fontSize: "11px", color: "#475569", marginTop: "5px" }}>{card.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* CHARTS ROW 1 */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "14px" }}>
        {/* Line Chart */}
        <div className="glass-pro dashboard-glow" style={{ padding: "20px 22px" }}>
          <h3 className="heading-lg" style={{ marginBottom: "16px", fontSize: "15px" }}>Transaction Volume</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={lineData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: "#475569", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#475569", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${v}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#6366f1"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#6366f1", strokeWidth: 0 }}
                activeDot={{ r: 5, fill: "#a5b4fc" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="glass-pro dashboard-glow" style={{ padding: "20px 22px" }}>
          <h3 className="heading-lg" style={{ marginBottom: "16px", fontSize: "15px" }}>Escrow Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                outerRadius={80}
                innerRadius={44}
                paddingAngle={3}
              >
                {statusData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
            {statusData.map((s, i) => (
              <div key={s.name} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: COLORS[i] }} />
                <span style={{ fontSize: "11px", color: "#64748b" }}>{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CHARTS ROW 2 */}
      <div className="glass-pro dashboard-glow" style={{ padding: "20px 22px" }}>
        <h3 className="heading-lg" style={{ marginBottom: "16px", fontSize: "15px" }}>Recent Revenue</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={revenueData} margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="amount" fill="url(#barGrad)" radius={[6, 6, 0, 0]} maxBarSize={40} />
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.6} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
